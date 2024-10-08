import 'package:flutter/material.dart';
import 'package:mobile/customWidgets/custom_containers.dart';
import 'package:mobile/customWidgets/custom_validation.dart';

class CustomDropDownButton extends StatelessWidget {
  final dynamic value;
  final void Function(dynamic) onChanged;
  final List<DropdownMenuItem<dynamic>>? items;
  final String hint;

  const CustomDropDownButton({
    super.key,
    this.value,
    this.items,
    required this.onChanged,
    required this.hint,
  });

  @override
  Widget build(BuildContext context) {
    return FormField(
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
                iconEnabledColor: Colors.redAccent,
                items: items,
                hint: Center(
                  child: Text(
                    hint,
                    style: Theme.of(context).textTheme.bodyLarge,
                  ),
                ),
                menuMaxHeight: 300,
                isExpanded: true,
                dropdownColor: Colors.grey.shade800,
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
