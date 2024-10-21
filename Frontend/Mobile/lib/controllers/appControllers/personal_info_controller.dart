import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/customWidgets/custom_dialogs.dart';
import 'package:mobile/main.dart';

class PersonalInfoController extends GetxController {
  late GlobalKey<FormState> personalInfoForm;
  late Dio dio;
  late CustomDialogs customDialogs;
  late String? selectedGender;
  late Map<String, String> genders;
  late double? selectedHeight;
  late List<double> cmList;
  late double? selectedWeight;
  late List<double> kgList;
  late int? activeDays;
  late List<int> daysList;
  late DateTime birthdate;
  late bool hasIllness;
  late bool hasAllergies;
  late bool hasDislikedFood;
  late TextEditingController illnessController;
  late TextEditingController allergiesController;
  late TextEditingController dislikedFoodController;

  @override
  void onInit() {
    personalInfoForm = GlobalKey<FormState>();
    dio = Dio();
    customDialogs = CustomDialogs();
    selectedGender = null;
    genders = {'Male': 'MALE', 'Female': 'FEMALE'};
    selectedHeight = null;
    cmList = List.generate(
      132,
      (index) => (index + 120).toDouble(),
    );
    selectedWeight = null;
    kgList = List.generate(
      261,
      (index) => (index + 40).toDouble(),
    );
    activeDays = null;
    daysList = List.generate(6, (index) => index + 2);
    birthdate = DateTime.now();
    hasIllness = false;
    hasAllergies = false;
    hasDislikedFood = false;
    illnessController = TextEditingController();
    allergiesController = TextEditingController();
    dislikedFoodController = TextEditingController();
    super.onInit();
  }

  @override
  void onClose() {
    illnessController.dispose();
    allergiesController.dispose();
    dislikedFoodController.dispose();
    super.onClose();
  }

  void selectGender(String gender) {
    selectedGender = gender;
    update();
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

  Future<void> selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      firstDate: DateTime(1900),
      lastDate: DateTime(2100),
      currentDate: DateTime.now(),
      initialEntryMode: DatePickerEntryMode.calendarOnly,
    );
    if (picked != null && picked != birthdate) {
      birthdate = picked;
      update();
    }
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

  Future<dynamic> addPersonalInfo(
    DateTime birthDate,
    String gender,
    double height,
    double weight,
    String illness,
    String allergies,
    String dislikedFood,
    int activeDyas,
  ) async {
    customDialogs.showLoadingDialog();
    String token = storage!.read('token');
    try {
      var response = await dio.post(
        'http://192.168.43.23:8000/api/trainee',
        data: {
          "birth_date": birthDate.toString().split(' ')[0],
          "gender": gender,
          "height": height,
          "weight": weight,
          "illnesses": hasIllness ? illness : null,
          "allergies": hasAllergies ? allergies : null,
          "disliked_food": hasDislikedFood ? dislikedFood : null,
          "active_days": activeDyas
        },
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        Get.back();
        customDialogs.showSuccessDialog('Success', '');
        Future.delayed(
          const Duration(seconds: 1),
          () {
            Get.offAllNamed('/home');
          },
        );
      } else if (response.statusCode == 401) {
        Get.back();
        customDialogs.showSesionExpiredDialog();
        Future.delayed(
          const Duration(seconds: 1),
          () {
            Get.offAllNamed('/login');
          },
        );
      }
    } on DioException catch (e) {
      customDialogs.showErrorDialog(
        'Error',
        e.response!.data.toString(),
      );
    }
  }
}
