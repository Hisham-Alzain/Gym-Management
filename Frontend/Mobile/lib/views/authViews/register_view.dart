import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/authControllers/register_controller.dart';
import 'package:mobile/customWidgets/custom_code_picker.dart';
import 'package:mobile/customWidgets/custom_text_field.dart';
import 'package:mobile/customWidgets/custom_validation.dart';

class RegisterView extends StatelessWidget {
  final RegisterController _registerController = Get.put(RegisterController());

  RegisterView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SizedBox(
        height: Get.height,
        width: Get.width,
        child: DecoratedBox(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/auth_background2.jpg'),
              fit: BoxFit.cover,
            ),
          ),
          child: Center(
            child: SingleChildScrollView(
              child: Form(
                key: _registerController.formField,
                child: GetBuilder<RegisterController>(
                  builder: (controller) => Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(20),
                        child: CustomTextField(
                          controller: controller.nameController,
                          textInputType: TextInputType.emailAddress,
                          obsecureText: false,
                          icon: Icons.abc,
                          labelText: 'Full Name',
                          validator: (p0) =>
                              CustomValidation().validateRequiredField(p0),
                          maxLines: 1,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(20),
                        child: CustomTextField(
                          controller: controller.emailController,
                          textInputType: TextInputType.emailAddress,
                          obsecureText: false,
                          icon: Icons.email,
                          labelText: 'Email',
                          validator: (p0) =>
                              CustomValidation().validateEmail(p0),
                          maxLines: 1,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(20),
                        child: Row(
                          children: [
                            Expanded(
                              flex: 1,
                              child: CustomTextField(
                                controller: controller.phoneNumberController,
                                textInputType: TextInputType.phone,
                                obsecureText: false,
                                labelText: 'Phone Number',
                                icon: Icons.phone,
                                suffixIcon: CustomCodePicker(
                                  onChanged: (value) =>
                                      controller.selectCountryCode(value),
                                ),
                                validator: (p0) =>
                                    CustomValidation().validatePhoneNumber(p0),
                                maxLines: 1,
                              ),
                            ),
                          ],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(20),
                        child: CustomTextField(
                          controller: controller.passwordController,
                          textInputType: TextInputType.visiblePassword,
                          obsecureText: controller.passwordToggle,
                          icon: Icons.key,
                          labelText: 'Password',
                          validator: (p0) =>
                              CustomValidation().validateRequiredField(p0),
                          suffixIcon: controller.passwordInkwell(),
                          maxLines: 1,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(20),
                        child: CustomTextField(
                          controller: controller.confirmPasswordController,
                          textInputType: TextInputType.visiblePassword,
                          obsecureText: controller.passwordToggle,
                          icon: Icons.key,
                          labelText: 'Confrim Password',
                          validator: (p0) =>
                              CustomValidation().validateConfirmPassword(
                            p0,
                            controller.passwordController.text,
                          ),
                          suffixIcon: controller.passwordInkwell(),
                          maxLines: 1,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10),
                        child: OutlinedButton(
                          onPressed: () {
                            if (controller.formField.currentState?.validate() ==
                                true) {
                              controller.register(
                                controller.nameController.text,
                                controller.emailController.text,
                                controller.passwordController.text,
                                controller.confirmPasswordController.text,
                                controller.phoneNumberController.text,
                              );
                            }
                          },
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Register',
                              ),
                              Icon(Icons.arrow_forward_ios),
                            ],
                          ),
                        ),
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
