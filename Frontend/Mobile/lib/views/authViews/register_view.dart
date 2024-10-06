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
          child: SingleChildScrollView(
            child: Form(
              key: _registerController.formField,
              child: GetBuilder<RegisterController>(
                builder: (controller) => Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Padding(
                      padding: const EdgeInsets.fromLTRB(20, 10, 20, 10),
                      child: CustomTextField(
                        controller: controller.emailController,
                        textInputType: TextInputType.emailAddress,
                        obsecureText: false,
                        icon: Icons.abc,
                        labelText: 'Full Name',
                        validator: (p0) =>
                            CustomValidation().validateRequiredField(p0),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(20, 10, 20, 10),
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
                      padding: const EdgeInsets.all(10),
                      child: Row(
                        children: [
                          CustomCodePicker(
                            onChanged: (value) =>
                                controller.selectCountryCode(value),
                          ),
                          Expanded(
                            flex: 1,
                            child: Padding(
                              padding: const EdgeInsets.fromLTRB(20, 0, 20, 0),
                              child: CustomTextField(
                                controller: controller.phoneNumberController,
                                textInputType: TextInputType.phone,
                                obsecureText: false,
                                labelText: 'Phone Number',
                                icon: Icons.phone,
                                validator: (p0) =>
                                    CustomValidation().validatePhoneNumber(p0),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(20, 10, 20, 10),
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
                    Padding(
                      padding: const EdgeInsets.fromLTRB(20, 10, 20, 10),
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
                        inkWell: controller.passwordInkwell(),
                      ),
                    ),
                    OutlinedButton(
                      onPressed: () {
                        if (controller.formField.currentState?.validate() ==
                            true) {}
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
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
