import 'package:get/get.dart';

class CustomValidation {
  String? validateRequiredField(String? value) {
    if (value!.isEmpty) {
      return 'Required Field';
    }
    return null;
  }

  String? validateEmail(String? value) {
    if (value!.isEmpty) {
      return 'Required Field';
    } else if (!value.isEmail) {
      return 'Invalid Email';
    }
    return null;
  }

  String? validateConfirmPassword(String? value, String? value2) {
    if (value!.isEmpty) {
      return 'Required Field';
    } else if (value != value2) {
      return "Confirm Passsword doesn't match Password";
    }
    return null;
  }

  String? validatePhoneNumber(String? value) {
    if (value!.isEmpty) {
      return 'Required Field'.tr;
    } else if (!value.isNum) {
      return 'Invalid NUmber'.tr;
    }
    return null;
  }

  String? validateRequiredDropDown(dynamic value) {
    if (value == null) {
      return 'Required Field';
    }
    return null;
  }

  String? validateVerificationCode(dynamic value, dynamic value2) {
    if (value == null) {
      return 'Required Field';
    } else if (value != value2) {
      return 'Wrong code';
    }
    return null;
  }
}
