import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/general_controller.dart';
import 'package:mobile/controllers/workout_controllers.dart/workouts_controller.dart';
import 'package:mobile/customWidgets/custom_dialogs.dart';
import 'package:mobile/main.dart';
import 'package:mobile/models/exercise.dart';

class ExercisesController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late GeneralController generalController;
  late WorkoutsController workoutsController;
  late Dio dio;
  late CustomDialogs customDialogs;
  List<Exercise> exercises = [];
  bool loading = true;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
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

  Future<dynamic> getDay(int id) async {
    String token = storage?.read('token');
    try {
      var response = await dio.get(
        'http://192.168.0.105:8000/api/trainee/workout/$id',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        for (var exercise in response.data['day']['exercises']) {
          exercises.add(
            Exercise.fromJson(exercise),
          );
        }
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
