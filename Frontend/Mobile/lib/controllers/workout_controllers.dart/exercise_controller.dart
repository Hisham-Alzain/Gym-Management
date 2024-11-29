import 'dart:developer';
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
  late Exercise exercise;
  // late VideoPlayerController videoPlayerController;
  bool loading = true;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    generalController = Get.find<GeneralController>();
    exercisesController = Get.find<ExercisesController>();
    dio = Dio();
    customDialogs = CustomDialogs();
    exercise = Exercise.empty();
    await getExercise(exercisesController.exerciseId);
    log(exercise.videoPath.toString());
    // videoPlayerController = VideoPlayerController.networkUrl(
    //   Uri(
    //     path: 'http://192.168.43.23:8000/api/video/${exercise.videoPath}',
    //   ),
    // )..initialize().then((_) {
    //     update();
    //   });
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
      if (response.statusCode == 200) {
        log(response.data.toString());
        exercise = Exercise.fromJson(response.data['exercise']);
        update();
      } else if (response.statusCode == 401) {
        generalController.handleUnauthorized();
      }
    } on DioException catch (e) {
      customDialogs.showErrorDialog(
        e.response?.data?.toString() ?? 'An error occurred',
      );
    }
  }

  Future<dynamic> addSet(
    int setId,
    int reps,
    double weight,
  ) async {
    String token = storage?.read('token');
    try {
      var response = await dio.post(
        'http://192.168.43.23:8000/api/trainee/workout/set',
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
          "user_rep_weight": weight,
        },
      );
      if (response.statusCode == 200) {
        refreshIndicatorKey.currentState!.show();
        update();
      } else if (response.statusCode == 401) {
        generalController.handleUnauthorized();
      }
    } on DioException catch (e) {
      customDialogs.showErrorDialog(
        e.response?.data?.toString() ?? 'An error occurred',
      );
    }
  }
}
