import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/customWidgets/custom_dialogs.dart';

class ForgotPasswordController extends GetxController {
  late GlobalKey<FormState> formField;
  late Dio dio;
  late CustomDialogs customDialogs;
  late TextEditingController emailController;
  late TextEditingController codeController;

  @override
  void onInit() {
    formField = GlobalKey<FormState>();
    dio = Dio();
    customDialogs = CustomDialogs();
    emailController = TextEditingController();
    codeController = TextEditingController();
    super.onInit();
  }

  @override
  void onClose() {
    emailController.dispose();
    super.onClose();
  }
}
