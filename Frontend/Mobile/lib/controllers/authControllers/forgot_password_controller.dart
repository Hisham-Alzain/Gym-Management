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
  late bool emailSent;
  late int code;

  @override
  void onInit() {
    formField = GlobalKey<FormState>();
    dio = Dio();
    customDialogs = CustomDialogs();
    emailController = TextEditingController();
    codeController = TextEditingController();
    emailSent = false;
    code = 0;
    super.onInit();
  }

  @override
  void onClose() {
    emailController.dispose();
    super.onClose();
  }

  Future<dynamic> sendEmail(
    String email,
  ) async {
    customDialogs.showLoadingDialog();
    try {
      var response = await dio.post(
        'http://192.168.43.23:8000/api/forgetPassword',
        data: {
          "email": email,
        },
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 200) {
        Get.back();
        customDialogs.showSuccessDialog('Email sent', '');
        Future.delayed(
          const Duration(seconds: 1),
          () {
            emailSent = true;
            code = response.data['code'];
            update();
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
