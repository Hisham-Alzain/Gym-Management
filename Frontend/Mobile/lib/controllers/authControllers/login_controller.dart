import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/customWidgets/custom_dialogs.dart';
import 'package:mobile/main.dart';

class LoginController extends GetxController {
  late GlobalKey<FormState> loginForm;
  late Dio dio;
  late CustomDialogs customDialogs;
  late TextEditingController emailController;
  late TextEditingController passwordController;
  late bool passwordToggle;
  late bool rememberMe;

  @override
  void onInit() {
    loginForm = GlobalKey<FormState>();
    dio = Dio();
    customDialogs = CustomDialogs();
    emailController = TextEditingController();
    passwordController = TextEditingController();
    passwordToggle = true;
    rememberMe = true;
    super.onInit();
  }

  @override
  void onClose() {
    emailController.dispose();
    passwordController.dispose();
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

  void toggleRemeberMe() {
    rememberMe = !rememberMe;
    update();
  }

  Future<dynamic> login(
    String email,
    String password,
    bool remember,
  ) async {
    customDialogs.showLoadingDialog();
    try {
      var response = await dio.post(
        'http://192.168.137.51:8000/api/login/trainee',
        data: {
          "email": email,
          "password": password,
          "remember": remember,
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
        storage!.write('token', response.data['access_token']);
        customDialogs.showSuccessDialog('Logging in...');
        Future.delayed(
          const Duration(seconds: 1),
          () {
            if (response.data['completed_info']) {
              Get.offAllNamed('/home');
            } else {
              Get.offAllNamed('/personalInfo');
            }
          },
        );
      }
    } on DioException catch (e) {
      customDialogs.showErrorDialog(
        e.response?.data?['errors']?.toString() ?? 'An error occurred',
      );
    }
  }
}
