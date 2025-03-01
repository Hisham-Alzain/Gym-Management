import 'dart:developer';
import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/general_controller.dart';
import 'package:mobile/controllers/workout_controllers.dart/exercises_controller.dart';
import 'package:mobile/customWidgets/custom_dialogs.dart';
import 'package:mobile/main.dart';
import 'package:mobile/models/exercise.dart';
import 'package:video_player/video_player.dart';

class ExerciseController extends GetxController {
  late GeneralController generalController;
  late ExercisesController exercisesController;
  late Dio dio;
  late CustomDialogs customDialogs;
  late Exercise exercise;
  late VideoPlayerController videoPlayerController;
  bool loading = true;

  @override
  Future<void> onInit() async {
    generalController = Get.find<GeneralController>();
    exercisesController = Get.find<ExercisesController>();
    dio = Dio();
    customDialogs = CustomDialogs();
    exercise = Exercise.empty();
    await getExercise(exercisesController.exerciseId);
    log(exercise.videoPath.toString());
    if (exercise.videoExt == 'mp4') {
      try {
        String token = storage!.read('token');
        videoPlayerController = VideoPlayerController.networkUrl(
          Uri.parse(
            'https://olive-salmon-530757.hostingersite.com/api/image/${exercise.videoPath}',
          ),
          httpHeaders: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'image/*; charset=UTF-8',
            'Accept': 'image/*,application/json',
            'Connection': 'Keep-Alive',
            'Authorization': 'Bearer $token',
          },
        );
        await videoPlayerController.initialize();
      } catch (e) {
        log('Error initializing video player: $e');
      }
    }
    loading = false;
    update();
    super.onInit();
  }

  Future<dynamic> getExercise(int id) async {
    String token = storage?.read('token');
    try {
      var response = await dio.get(
        'https://olive-salmon-530757.hostingersite.com/api/trainee/exercise/$id',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        exercise = Exercise.fromJson(response.data['exercise']);
        update();
      } else if (response.statusCode == 401) {
        generalController.handleUnauthorized();
      }
    } on DioException catch (e) {
      customDialogs.showErrorDialog(
        e.response?.data?.toString(),
      );
    }
  }

  Future<dynamic> addSet(
    int setId,
    int reps,
    double weight,
    int restTime,
  ) async {
    String token = storage?.read('token');
    try {
      var response = await dio.post(
        'https://olive-salmon-530757.hostingersite.com/api/trainee/workout/set',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
        data: {
          "set_id": setId,
          "day_date": DateTime.now().toString().split(' ')[0],
          "user_reps": reps,
          "user_rest_time": restTime,
          "user_rep_weight": weight,
        },
      );
      if (response.statusCode == 200) {
        await getExercise(exercisesController.exerciseId);
        update();
      } else if (response.statusCode == 401) {
        generalController.handleUnauthorized();
      }
    } on DioException catch (e) {
      customDialogs.showErrorDialog(
        e.response?.data?.toString(),
      );
    }
  }
}
