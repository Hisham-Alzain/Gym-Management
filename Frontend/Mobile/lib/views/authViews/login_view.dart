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
              image: AssetImage('assets/auth_background1.jpg'),
              fit: BoxFit.cover,
            ),
          ),
          child: Form(
            key: _loginController.formField,
            child: GetBuilder<LoginController>(
              builder: (controller) => Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(20),
                    child: CustomTextField(
                      controller: controller.emailController,
                      textInputType: TextInputType.emailAddress,
                      obsecureText: false,
                      icon: Icons.email,
                      labelText: 'Email',
                      validator: (p0) => CustomValidation().validateEmail(p0),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(20, 0, 20, 0),
                    child: CustomTextField(
                      controller: controller.passwordController,
                      textInputType: TextInputType.visiblePassword,
                      obsecureText: controller.passwordToggle,
                      icon: Icons.key,
                      labelText: 'Password',
                      validator: (p0) =>
                          CustomValidation().validateRequiredField(p0),
                      inkWell: controller.passwordInkwell(),
                    ),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
                        child: TextButton(
                          child: Text('Forgot Password',
                              style: Theme.of(context)
                                  .textTheme
                                  .bodyLarge
                                  ?.copyWith(
                                    decoration: TextDecoration.underline,
                                    color: Colors.redAccent,
                                    decorationColor: Colors.redAccent,
                                  )),
                          onPressed: () {},
                        ),
                      ),
                    ],
                  ),
                  Padding(
                    padding: const EdgeInsets.all(10),
                    child: OutlinedButton(
                      onPressed: () {
                        if (controller.formField.currentState?.validate() ==
                            true) {}
                      },
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Login',
                          ),
                          Icon(Icons.arrow_forward_ios),
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
                            'Remeber Me?',
                            style: Theme.of(context).textTheme.labelLarge,
                          ),
                          Checkbox(
                            value: controller.remeberMe,
                            activeColor: Colors.redAccent,
                            onChanged: (value) => controller
                                .toggleRemeberMe(controller.remeberMe),
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
    );
  }
}
