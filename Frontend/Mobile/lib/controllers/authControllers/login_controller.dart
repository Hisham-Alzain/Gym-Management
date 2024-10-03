import 'package:flutter/material.dart';
import 'package:get/get.dart';

class LoginController extends GetxController {
  late GlobalKey<FormState> formField;
  late TextEditingController emailController;
  late TextEditingController passwordController;
  late bool passwordToggle;
  late bool remeberMe;

  @override
  void onInit() {
    formField = GlobalKey<FormState>();
    emailController = TextEditingController();
    passwordController = TextEditingController();
    passwordToggle = true;
    remeberMe = false;
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
}
