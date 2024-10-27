import 'package:flutter/material.dart';
import 'package:mobile/customWidgets/custom_containers.dart';

class CustomRadioButton extends StatelessWidget {
  final String text;
  final bool value;
  final bool? groupValue;
  final void Function(bool?)? onChanged;

  const CustomRadioButton({
    super.key,
    required this.text,
    required this.value,
    this.groupValue,
    this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return RadioListTile<bool>(
      title: RedContainer(
        padding: const EdgeInsets.all(1),
        child: Text(
          text,
          style: Theme.of(context).textTheme.bodyLarge,
        ),
      ),
      value: value,
      groupValue: groupValue,
      onChanged: onChanged,
    );
  }
}
