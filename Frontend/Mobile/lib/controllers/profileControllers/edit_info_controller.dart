import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/profileControllers/profile_controller.dart';
import 'package:mobile/controllers/general_controller.dart';
import 'package:mobile/customWidgets/custom_dialogs.dart';
import 'package:mobile/main.dart';
import 'package:mobile/models/user.dart';

class EditInfoController extends GetxController {
  late ProfileController profileController;
  late User user;
  late GeneralController generalController;
  late GlobalKey<FormState> personalInfoForm;
  late Dio dio;
  late CustomDialogs customDialogs;
  late List<double> cmList;
  late double? selectedHeight;
  late List<double> kgList;
  late double? selectedWeight;
  late List<int> daysList;
  late int? activeDays;
  late bool hasIllness;
  late bool hasAllergies;
  late bool hasDislikedFood;
  late TextEditingController illnessController;
  late TextEditingController allergiesController;
  late TextEditingController dislikedFoodController;

  @override
  void onInit() {
    profileController = Get.find<ProfileController>();
    user = profileController.user;
    generalController = Get.find<GeneralController>();
    personalInfoForm = GlobalKey<FormState>();
    dio = Dio();
    customDialogs = CustomDialogs();
    cmList = List.generate(
      132,
      (index) => (index + 120).toDouble(),
    );
    selectedHeight = user.height;
    kgList = List.generate(
      261,
      (index) => (index + 40).toDouble(),
    );
    selectedWeight = user.weight;
    daysList = List.generate(6, (index) => index + 2);
    activeDays = user.activeDays;
    hasIllness = user.illnesses != null;
    hasAllergies = user.allergies != null;
    hasDislikedFood = user.dislikedFoods != null;
    illnessController = TextEditingController(text: user.illnesses);
    allergiesController = TextEditingController(text: user.allergies);
    dislikedFoodController = TextEditingController(text: user.dislikedFoods);
    update();
    super.onInit();
  }

  @override
  void onClose() {
    illnessController.dispose();
    allergiesController.dispose();
    dislikedFoodController.dispose();
    super.onClose();
  }

  void selectHeight(double height) {
    selectedHeight = height;
    update();
  }

  void selectWeight(double weight) {
    selectedWeight = weight;
    update();
  }

  void selectDay(int day) {
    activeDays = day;
    update();
  }

  void addIllness(bool value) {
    hasIllness = value;
    update();
  }

  void addAllergies(bool value) {
    hasAllergies = value;
    update();
  }

  void addDislikedFood(bool value) {
    hasDislikedFood = value;
    update();
  }

  Future<dynamic> editInfo(
    double height,
    double weight,
    String illness,
    String allergies,
    String dislikedFood,
    int activeDays,
  ) async {
    customDialogs.showLoadingDialog();
    String token = storage!.read('token');
    try {
      var response = await dio.post(
        'http://192.168.0.105:8000/api/trainee',
        data: {
          "height": height,
          "weight": weight,
          "illnesses": hasIllness ? illness : null,
          "allergies": hasAllergies ? allergies : null,
          "disliked_food": hasDislikedFood ? dislikedFood : null,
          "active_days": activeDays
        },
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      Get.back();
      if (response.statusCode == 200) {
        profileController.refreshIndicatorKey.currentState!.show();
        Get.back();
      } else if (response.statusCode == 401) {
        generalController.handleUnauthorized();
      }
    } on DioException catch (e) {
      Get.back();
      customDialogs.showErrorDialog(
        e.response?.data?['errors']?.toString() ?? 'An error occurred',
      );
    }
  }
}
