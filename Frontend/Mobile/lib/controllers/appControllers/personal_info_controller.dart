import 'package:flutter/material.dart';
import 'package:get/get.dart';

class PersonalInfoController extends GetxController {
  late GlobalKey<FormState> formField;
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
    formField = GlobalKey<FormState>();
    selectedGender = null;
    genders = {'Male': 'MALE', 'Female': 'FEMALE'};
    selectedHeight = null;
    cmList = List.generate(
      301,
      (index) => index.toDouble(),
    );
    selectedWeight = null;
    kgList = List.generate(
      301,
      (index) => index.toDouble(),
    );
    activeDays = null;
    daysList = List.generate(7, (index) => index + 1);
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
}
