import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/authControllers/forgot_password_controller.dart';
import 'package:mobile/customWidgets/custom_text_field.dart';
import 'package:mobile/customWidgets/custom_validation.dart';

class ChangePasswordView extends StatelessWidget {
  final ForgotPasswordController _forgotPasswordController =
      Get.find<ForgotPasswordController>();

  ChangePasswordView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Change Password',
        ),
      ),
      body: SizedBox(
        height: Get.height,
        width: Get.width,
        child: DecoratedBox(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/general_background.jpg'),
              fit: BoxFit.cover,
            ),
          ),
          child: Form(
            key: _forgotPasswordController.passwordForm,
            child: GetBuilder<ForgotPasswordController>(
              builder: (controller) => Column(
                children: [
                  Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: Text(
                          'Enter your new password',
                          style: Theme.of(context).textTheme.headlineSmall,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
                        child: CustomTextField(
                          controller: controller.newPasswordController,
                          textInputType: TextInputType.visiblePassword,
                          obsecureText: controller.passwordToggle,
                          icon: Icons.lock,
                          labelText: 'New password',
                          validator: (p0) =>
                              CustomValidation().validateRequiredField(p0),
                          maxLines: 1,
                          suffixIcon: controller.passwordInkwell(),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
                        child: CustomTextField(
                          controller: controller.confirmNewPasswordController,
                          textInputType: TextInputType.visiblePassword,
                          obsecureText: controller.passwordToggle,
                          icon: Icons.lock,
                          labelText: 'Confirm new password',
                          validator: (p0) =>
                              CustomValidation().validateConfirmPassword(
                            p0,
                            controller.newPasswordController.text,
                          ),
                          maxLines: 1,
                          suffixIcon: controller.passwordInkwell(),
                        ),
                      ),
                      OutlinedButton(
                        onPressed: () {
                          if (controller.passwordForm.currentState
                                  ?.validate() ==
                              true) {
                            controller.changePasssword(
                                controller.emailController.text,
                                controller.newPasswordController.text,
                                controller.newPasswordController.text);
                          }
                        },
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'change password',
                            ),
                            Icon(Icons.arrow_forward_ios),
                          ],
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
