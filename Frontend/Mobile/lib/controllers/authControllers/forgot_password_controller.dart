import 'dart:async';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/customWidgets/custom_dialogs.dart';

class ForgotPasswordController extends GetxController {
  late GlobalKey<FormState> emailForm;
  late GlobalKey<FormState> passwordForm;
  late Dio dio;
  late CustomDialogs customDialogs;
  late TextEditingController emailController;
  late TextEditingController codeController;
  late TextEditingController newPasswordController;
  late TextEditingController confirmNewPasswordController;
  late bool emailSent;
  late bool resendEmail;
  late int seconds;
  late int code;
  late bool passwordToggle;

  @override
  void onInit() {
    emailForm = GlobalKey<FormState>();
    passwordForm = GlobalKey<FormState>();
    dio = Dio();
    customDialogs = CustomDialogs();
    emailController = TextEditingController();
    codeController = TextEditingController();
    newPasswordController = TextEditingController();
    confirmNewPasswordController = TextEditingController();
    emailSent = false;
    resendEmail = false;
    seconds = 5;
    code = 0;
    passwordToggle = true;
    super.onInit();
  }

  @override
  void onClose() {
    emailController.dispose();
    codeController.dispose();
    newPasswordController.dispose();
    confirmNewPasswordController.dispose();
    super.onClose();
  }

  InkWell passwordInkwell() {
    return InkWell(
      onTap: () {
        passwordToggle = !passwordToggle;
        update();
      },
      child: Icon(passwordToggle ? Icons.visibility_off : Icons.visibility),
    );
  }

  Future<dynamic> sendEmail(
    String email,
  ) async {
    customDialogs.showLoadingDialog();
    resendEmail = false;
    try {
      var response = await dio.post(
        'http://192.168.0.103:8000/api/forgetPassword',
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
      Get.back();
      if (response.statusCode == 200) {
        Future.delayed(
          const Duration(seconds: 1),
          () {
            emailSent = true;
            code = response.data['code'];
            seconds = 5;
            Timer.periodic(
              const Duration(seconds: 5),
              (timer) {
                if (seconds == 0) {
                  timer.cancel();
                  resendEmail = true;
                } else {
                  seconds--;
                }
                update();
              },
            );
            update();
          },
        );
      }
    } on DioException catch (e) {
      Get.back();
      customDialogs.showErrorDialog(
        e.response?.data?['errors']?.toString() ?? 'An error occurred',
      );
    }
  }

  Future<dynamic> changePasssword(
    String email,
    String newPassword,
    String confirmNewPassword,
  ) async {
    customDialogs.showLoadingDialog();

    try {
      var response = await dio.post(
        'http://192.168.0.103:8000/api/changePassword',
        data: {
          "email": email,
          "password": newPassword,
          "confirm_password": confirmNewPassword,
        },
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      Get.back();
      if (response.statusCode == 200) {
        Future.delayed(
          const Duration(seconds: 1),
          () {
            Get.offNamed('/auth');
          },
        );
      }
    } on DioException catch (e) {
      Get.back();
      customDialogs.showErrorDialog(
        e.response?.data?['errors']?.toString() ?? 'An error occurred',
      );
    }
  }
}
