import 'package:flutter/material.dart';
import 'package:mobile/customWidgets/custom_text_field.dart';
import 'package:mobile/customWidgets/custom_validation.dart';

class LoginView extends StatelessWidget {
  const LoginView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Login',
          style: Theme.of(context).textTheme.titleLarge,
        ),
      ),
      //TODO:add Form
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.all(10),
              child: CustomTextField(
                controller: TextEditingController(),
                textInputType: TextInputType.emailAddress,
                obsecureText: false,
                icon: Icons.email,
                labelText: 'Email',
                validator: (p0) => CustomValidation().validateEmail(p0),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(10),
              child: CustomTextField(
                controller: TextEditingController(),
                textInputType: TextInputType.visiblePassword,
                obsecureText: true,
                icon: Icons.key,
                labelText: 'Password',
                validator: (p0) => CustomValidation().validateRequiredField(p0),
                //TODO: inkWell: ,
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(10),
              child: SizedBox(
                height: 50,
                width: 350,
                child: OutlinedButton(
                  onPressed: () {},
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Login',
                        style: Theme.of(context).textTheme.bodyLarge,
                      ),
                      const Icon(Icons.arrow_forward_ios),
                    ],
                  ),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
