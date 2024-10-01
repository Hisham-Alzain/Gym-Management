import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController controller;
  final TextInputType textInputType;
  final bool obsecureText;
  final String? Function(String?)? validator;
  final String? labelText;
  final IconData icon;
  final InkWell? inkWell;
  final int? maxLength;
  final String? initialValue;
  final String? hintText;
  final void Function(String)? onChanged;
  final TextDirection? textDirection;

  const CustomTextField({
    super.key,
    required this.controller,
    required this.textInputType,
    required this.obsecureText,
    required this.icon,
    this.labelText,
    this.validator,
    this.inkWell,
    this.maxLength,
    this.initialValue,
    this.hintText,
    this.onChanged,
    this.textDirection,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      cursorColor: Colors.redAccent,
      initialValue: initialValue,
      autocorrect: false,
      obscureText: obsecureText,
      controller: controller,
      decoration: InputDecoration(
        hintText: hintText,
        hintStyle: Theme.of(context).textTheme.labelLarge,
        labelText: labelText,
        labelStyle: Theme.of(context).textTheme.labelLarge,
        border: const OutlineInputBorder(),
        prefixIcon: Icon(
          icon,
          color: Colors.redAccent,
        ),
        prefixIconColor: Colors.redAccent,
        suffixIcon: inkWell,
        suffixIconColor: Colors.redAccent,
        enabledBorder: const UnderlineInputBorder(
          borderSide: BorderSide(
            color: Colors.white,
          ),
        ),
        focusedBorder: const UnderlineInputBorder(
          borderSide: BorderSide(
            color: Colors.redAccent,
          ),
        ),
        errorBorder: const UnderlineInputBorder(
          borderSide: BorderSide(
            color: Colors.red,
          ),
        ),
        focusedErrorBorder: const UnderlineInputBorder(
          borderSide: BorderSide(
            color: Colors.red,
          ),
        ),
      ),
      keyboardType: textInputType,
      style: Theme.of(context).textTheme.bodyLarge,
      validator: validator,
      maxLength: maxLength,
      onChanged: onChanged,
      textDirection: textDirection,
    );
  }
}
