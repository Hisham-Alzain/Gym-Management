import 'package:flutter/material.dart';
import 'package:mobile/customWidgets/custom_validation.dart';
import 'package:pinput/pinput.dart';

class CustomVerificationCodeField extends StatelessWidget {
  final int length;
  final TextEditingController codeController;
  final String correctCode;
  final void Function(String)? onChanged;

  const CustomVerificationCodeField({
    super.key,
    required this.length,
    required this.codeController,
    required this.correctCode,
    this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Pinput(
      controller: codeController,
      closeKeyboardWhenCompleted: true,
      length: length,
      defaultPinTheme: PinTheme(
        width: 50,
        height: 50,
        textStyle: Theme.of(context).textTheme.bodyLarge,
        decoration: BoxDecoration(
          border: Border.all(color: Colors.red.shade900),
          borderRadius: BorderRadius.circular(5),
          color: Colors.grey.shade900,
        ),
      ),
      errorTextStyle: Theme.of(context).textTheme.labelLarge?.copyWith(
            color: Colors.red,
            fontSize: 15,
          ),
      keyboardType: TextInputType.number,
      validator: (value) =>
          CustomValidation().validateVerificationCode(value, correctCode),
      onChanged: onChanged,
    );
  }
}
