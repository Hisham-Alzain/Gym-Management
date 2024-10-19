import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController controller;
  final TextInputType textInputType;
  final bool obsecureText;
  final String? Function(String?)? validator;
  final String? labelText;
  final IconData icon;
  final Widget? suffixIcon;
  final String? initialValue;
  final String? hintText;
  final void Function(String)? onChanged;
  final TextDirection? textDirection;
  final int? maxLines;

  const CustomTextField({
    super.key,
    required this.controller,
    required this.textInputType,
    required this.obsecureText,
    required this.icon,
    this.labelText,
    this.validator,
    this.suffixIcon,
    this.initialValue,
    this.hintText,
    this.onChanged,
    this.textDirection,
    this.maxLines,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      cursorColor: Colors.red.shade900,
      initialValue: initialValue,
      autocorrect: false,
      obscureText: obsecureText,
      controller: controller,
      decoration: InputDecoration(
        filled: true,
        fillColor: Colors.grey.shade900,
        hintText: hintText,
        hintStyle: Theme.of(context).textTheme.labelLarge,
        labelText: labelText,
        labelStyle: Theme.of(context).textTheme.labelLarge,
        errorStyle: Theme.of(context).textTheme.labelLarge?.copyWith(
              color: Colors.red,
              fontSize: 15,
            ),
        border: const OutlineInputBorder(),
        prefixIcon: Icon(
          icon,
          color: Colors.red.shade900,
        ),
        prefixIconColor: Colors.red.shade900,
        suffixIcon: suffixIcon,
        suffixIconColor: Colors.red.shade900,
        enabledBorder: OutlineInputBorder(
          borderSide: BorderSide(
            color: Colors.red.shade900,
          ),
        ),
        focusedBorder: UnderlineInputBorder(
          borderSide: BorderSide(
            color: Colors.red.shade900,
          ),
        ),
        errorBorder: const OutlineInputBorder(
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
      onChanged: onChanged,
      textDirection: textDirection,
      maxLines: maxLines,
    );
  }
}
