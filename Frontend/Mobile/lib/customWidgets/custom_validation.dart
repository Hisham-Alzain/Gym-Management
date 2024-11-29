import 'package:get/get.dart';

class CustomValidation {
  String? validateRequiredField(String? value) {
    if (value!.isEmpty) {
      return '20'.tr;
    }
    return null;
  }

  String? validateEmail(String? value) {
    if (value!.isEmpty) {
      return '20'.tr;
    } else if (!value.isEmail) {
      return '21'.tr;
    }
    return null;
  }

  String? validateConfirmPassword(String? value, String? value2) {
    if (value!.isEmpty) {
      return '20'.tr;
    } else if (value != value2) {
      return "22".tr;
    }
    return null;
  }

  String? validateNumber(String? value) {
    if (value!.isEmpty) {
      return '20'.tr;
    } else if (!value.isNum) {
      return '23'.tr;
    }
    return null;
  }

  String? validateRequiredDropDown(dynamic value) {
    if (value == null) {
      return '20'.tr;
    }
    return null;
  }

  String? validateVerificationCode(dynamic value, dynamic value2) {
    if (value == null) {
      return '20'.tr;
    } else if (value != value2) {
      return '24'.tr;
    }
    return null;
  }
}
