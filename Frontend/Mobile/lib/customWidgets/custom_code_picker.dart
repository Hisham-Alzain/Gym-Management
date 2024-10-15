import 'package:country_code_picker/country_code_picker.dart';
import 'package:flutter/material.dart';

class CustomCodePicker extends StatelessWidget {
  final void Function(CountryCode)? onChanged;
  const CustomCodePicker({super.key, this.onChanged});

  @override
  Widget build(BuildContext context) {
    return CountryCodePicker(
      onChanged: onChanged,
      initialSelection: '+963',
      dialogBackgroundColor: Colors.grey.shade900,
      textStyle: Theme.of(context).textTheme.bodyLarge,
      searchStyle: Theme.of(context).textTheme.bodyLarge,
      dialogTextStyle: Theme.of(context).textTheme.labelLarge,
      barrierColor: Colors.transparent,
      searchDecoration: InputDecoration(
        iconColor: Colors.red.shade900,
        prefixIconColor: Colors.red.shade900,
        suffixIconColor: Colors.red.shade900,
        border: UnderlineInputBorder(
          borderSide: BorderSide(color: Colors.red.shade900),
        ),
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
        labelText: 'Search',
        labelStyle: Theme.of(context).textTheme.bodyLarge,
      ),
      showDropDownButton: true,
    );
  }
}
