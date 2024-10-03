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
      body: DecoratedBox(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/auth_background1.jpg'),
            fit: BoxFit.cover,
          ),
        ),
        child: Form(
          key: _loginController.formField,
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(10, 150, 10, 0),
                  child: CustomTextField(
                    controller: TextEditingController(),
                    textInputType: TextInputType.emailAddress,
                    obsecureText: false,
                    icon: Icons.email,
                    labelText: 'Email',
                    validator: (p0) => CustomValidation().validateEmail(p0),
                  ),
                ),
                GetBuilder<LoginController>(
                  builder: (controller) => Padding(
                    padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
                    child: CustomTextField(
                      controller: TextEditingController(),
                      textInputType: TextInputType.visiblePassword,
                      obsecureText: true,
                      icon: Icons.key,
                      labelText: 'Password',
                      validator: (p0) =>
                          CustomValidation().validateRequiredField(p0),
                      inkWell: controller.passwordInkwell(),
                    ),
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    TextButton(
                      child: const Text(
                        'Forgot Password',
                        style: TextStyle(
                          decoration: TextDecoration.underline,
                          color: Colors.red,
                          decorationColor: Colors.red,
                        ),
                      ),
                      onPressed: () {},
                    ),
                  ],
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(0, 130, 0, 0),
                  child: SizedBox(
                    height: 50,
                    width: 350,
                    child: OutlinedButton(
                      onPressed: () {
                        if (_loginController.formField.currentState
                                ?.validate() ==
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
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
