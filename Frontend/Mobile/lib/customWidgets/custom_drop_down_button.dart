import 'package:flutter/material.dart';
import 'package:mobile/customWidgets/custom_containers.dart';
import 'package:mobile/customWidgets/custom_validation.dart';

class CustomDropDownButton extends StatelessWidget {
  final dynamic value;
  final void Function(dynamic) onChanged;
  final List<DropdownMenuItem<dynamic>>? items;
  final String? hintText;
  final IconData? hintTcon;

  const CustomDropDownButton({
    super.key,
    this.value,
    this.items,
    required this.onChanged,
    this.hintText,
    this.hintTcon,
  });

  @override
  Widget build(BuildContext context) {
    return FormField(
      initialValue: value,
      validator: (value) => CustomValidation().validateRequiredDropDown(value),
      builder: (FormFieldState<dynamic> state) {
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            RedContainer(
              width: 300,
              child: DropdownButton<dynamic>(
                value: value,
                onChanged: (newValue) {
                  onChanged(newValue);
                  state.didChange(newValue);
                },
                iconEnabledColor: Colors.red.shade900,
                items: items,
                hint: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      hintText.toString(),
                      style: Theme.of(context).textTheme.bodyLarge,
                    ),
                    Icon(hintTcon)
                  ],
                ),
                menuMaxHeight: 300,
                isExpanded: true,
                dropdownColor: Colors.grey.shade900,
                underline: const SizedBox.shrink(),
              ),
            ),
            Text(
              state.errorText ?? '',
              style: Theme.of(context).textTheme.labelLarge?.copyWith(
                    color: Colors.red,
                    fontSize: 15,
                  ),
            )
          ],
        );
      },
    );
  }
}
