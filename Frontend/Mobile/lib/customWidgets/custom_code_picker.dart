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
    );
  }
}
