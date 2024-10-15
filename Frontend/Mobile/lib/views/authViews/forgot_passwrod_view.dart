import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/authControllers/forgot_password_controller.dart';
import 'package:mobile/customWidgets/custom_text_field.dart';
import 'package:mobile/customWidgets/custom_validation.dart';
import 'package:mobile/customWidgets/custom_verification_code_field.dart';

class ForgotPasswordView extends StatelessWidget {
  final ForgotPasswordController _forgotPasswordController =
      Get.put(ForgotPasswordController());

  ForgotPasswordView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Forgot Password',
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
          child: SingleChildScrollView(
            child: Form(
              key: _forgotPasswordController.formField,
              child: GetBuilder<ForgotPasswordController>(
                builder: (controller) => Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: Text(
                        'Please Enter your email so we can send you a verification code',
                        style: Theme.of(context).textTheme.headlineSmall,
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
                        validator: (p0) => CustomValidation().validateEmail(p0),
                        maxLines: 1,
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
                            'Send',
                          ),
                          Icon(Icons.arrow_forward_ios),
                        ],
                      ),
                    ),
                    //TODO: add bool
                    const SizedBox(
                      height: 150,
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: CustomVerificationCodeField(
                        codeController: controller.codeController,
                        correctCode: '',
                        onSubmitted: (p0) {},
                      ),
                    )
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
