import 'package:flutter/material.dart';
import 'package:get/get.dart';

class PersonalInfoController extends GetxController {
  late GlobalKey<FormState> formField;
  late String? selectedGender;
  late Map<String, String> genders;
  late int? selectedHeight;
  late List<int> cmList;
  late int? selectedWeight;
  late List<int> kgList;

  @override
  void onInit() {
    formField = GlobalKey<FormState>();
    selectedGender = null;
    genders = {'Male': 'MALE', 'Female': 'FEMALE'};
    selectedHeight = null;
    cmList = List.generate(251, (index) => 0 + index);
    selectedWeight = null;
    kgList = List.generate(251, (index) => 0 + index);
    super.onInit();
  }

  void selectGender(String gender) {
    selectedGender = gender;
    update();
  }

  void selectHeight(int height) {
    selectedHeight = height;
    update();
  }

  void selectWeight(int weight) {
    selectedWeight = weight;
    update();
  }
}
