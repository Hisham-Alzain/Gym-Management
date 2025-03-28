import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/authControllers/login_controller.dart';
import 'package:mobile/customWidgets/custom_text_field.dart';
import 'package:mobile/customWidgets/custom_validation.dart';

class LoginView extends StatelessWidget {
  final LoginController _loginController = Get.put(LoginController());

  LoginView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SizedBox(
        height: Get.height,
        width: Get.width,
        child: DecoratedBox(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/app_photos/auth_background1.jpg'),
              fit: BoxFit.cover,
            ),
          ),
          child: Center(
            child: SingleChildScrollView(
              child: Form(
                key: _loginController.loginForm,
                child: GetBuilder<LoginController>(
                  builder: (controller) => Column(
                    children: [
                      Image.asset(
                        'assets/app_photos/white_logo.png',
                        height: 180,
                      ),
                      Padding(
                        padding: const EdgeInsets.all(20),
                        child: CustomTextField(
                          controller: controller.emailController,
                          textInputType: TextInputType.emailAddress,
                          obsecureText: false,
                          icon: Icons.email,
                          labelText: '34'.tr,
                          validator: (p0) =>
                              CustomValidation().validateEmail(p0),
                          maxLines: 1,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(20, 20, 20, 0),
                        child: CustomTextField(
                          controller: controller.passwordController,
                          textInputType: TextInputType.visiblePassword,
                          obsecureText: controller.passwordToggle,
                          icon: Icons.key,
                          labelText: '38'.tr,
                          validator: (p0) =>
                              CustomValidation().validateRequiredField(p0),
                          suffixIcon: controller.passwordInkwell(),
                          maxLines: 1,
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          Padding(
                            padding: const EdgeInsets.fromLTRB(20, 0, 20, 0),
                            child: TextButton(
                              child: Text(
                                '32'.tr,
                                style: Theme.of(context)
                                    .textTheme
                                    .bodyLarge
                                    ?.copyWith(
                                      decoration: TextDecoration.underline,
                                      color: Colors.red.shade900,
                                      decorationColor: Colors.red.shade900,
                                    ),
                              ),
                              onPressed: () => Get.offNamed('/forgotPassword'),
                            ),
                          ),
                        ],
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: OutlinedButton(
                          onPressed: () async {
                            if (controller.loginForm.currentState?.validate() ==
                                true) {
                              await controller.login(
                                controller.emailController.text,
                                controller.passwordController.text,
                                controller.rememberMe,
                              );
                            }
                          },
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                '39'.tr,
                              ),
                              const Icon(Icons.arrow_forward_ios),
                            ],
                          ),
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Row(
                            children: [
                              Text(
                                '40'.tr,
                                style: Theme.of(context).textTheme.labelLarge,
                              ),
                              Checkbox(
                                value: controller.rememberMe,
                                activeColor: Colors.red.shade900,
                                onChanged: (value) =>
                                    controller.toggleRemeberMe(),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
