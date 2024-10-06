import 'package:flutter/material.dart';
import 'package:get/get.dart';

class PersonalInfoController extends GetxController {
  late GlobalKey<FormState> formField;
  late String? selectedGender;
  late Map<String, String> genders;

  @override
  void onInit() {
    formField = GlobalKey<FormState>();
    selectedGender = null;
    genders = {'Male': 'MALE', 'Female': 'FEMALE'};
    super.onInit();
  }

  Future<void> selectGender(String gender) async {
    selectedGender = gender;
    update();
  }
}
