import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/general_controller.dart';
import 'package:mobile/controllers/workout_controllers.dart/exercises_controller.dart';
import 'package:mobile/customWidgets/custom_dialogs.dart';
import 'package:mobile/main.dart';
import 'package:mobile/models/exercise.dart';

class ExerciseController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late GeneralController generalController;
  late ExercisesController exercisesController;
  late Dio dio;
  late CustomDialogs customDialogs;
  Exercise exercise = Exercise.empty();
  // VideoPlayerController videoPlayerController =
  //     VideoPlayerController.networkUrl(
  //   Uri(
  //     path:
  //         "https://flutter.github.io/assets-for-api-docs/assets/videos/bee.mp4",
  //   ),
  // );
  bool loading = true;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    generalController = Get.find<GeneralController>();
    exercisesController = Get.find<ExercisesController>();
    dio = Dio();
    customDialogs = CustomDialogs();
    await getExercise(exercisesController.exerciseId);
    loading = false;
    update();
    super.onInit();
  }

  Future<dynamic> getExercise(int id) async {
    String token = storage?.read('token');
    try {
      var response = await dio.get(
        'http://192.168.43.23:8000/api/trainee/exercise/$id',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      print(response.data.toString());
      if (response.statusCode == 200) {
        update();
      } else if (response.statusCode == 401) {
        generalController.handleUnauthorized();
      }
    } on DioException catch (e) {
      Get.back();
      customDialogs.showErrorDialog(
        e.response?.data?.toString() ?? 'An error occurred',
      );
    }
  }
}
