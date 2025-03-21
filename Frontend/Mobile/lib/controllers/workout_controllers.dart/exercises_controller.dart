import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/general_controller.dart';
import 'package:mobile/controllers/workout_controllers.dart/workouts_controller.dart';
import 'package:mobile/customWidgets/custom_dialogs.dart';
import 'package:mobile/main.dart';
import 'package:mobile/models/exercise.dart';

class ExercisesController extends GetxController {
  late GeneralController generalController;
  late WorkoutsController workoutsController;
  late Dio dio;
  late CustomDialogs customDialogs;
  List<Exercise> exercises = [];
  int exerciseId = 0;
  bool loading = true;

  @override
  Future<void> onInit() async {
    generalController = Get.find<GeneralController>();
    workoutsController = Get.find<WorkoutsController>();
    dio = Dio();
    customDialogs = CustomDialogs();
    await getDay(workoutsController.dayId);
    loading = false;
    update();
    super.onInit();
  }

  @override
  void onClose() {
    exercises.clear();
    super.onClose();
  }

  void viewExercise(Exercise exercise) {
    exerciseId = exercise.workoutExerciseId;
    Get.toNamed('/exercise');
  }

  Future<dynamic> getDay(int id) async {
    String token = storage?.read('token');
    try {
      var response = await dio.get(
        'https://olive-salmon-530757.hostingersite.com/api/trainee/workout/$id',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        exercises = [
          for (var exercise in response.data['day']['exercises'])
            Exercise.fromJson(exercise),
        ];
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
