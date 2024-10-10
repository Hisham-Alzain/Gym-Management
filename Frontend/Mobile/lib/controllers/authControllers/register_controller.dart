import 'package:country_code_picker/country_code_picker.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/customWidgets/custom_dialogs.dart';

class RegisterController extends GetxController {
  late GlobalKey<FormState> formField;
  late Dio dio;
  late CustomDialogs customDialogs;
  late TextEditingController nameController;
  late TextEditingController emailController;
  late TextEditingController phoneNumberController;
  late TextEditingController passwordController;
  late TextEditingController confirmPasswordController;
  late CountryCode countryCode;
  late bool passwordToggle;

  @override
  void onInit() {
    formField = GlobalKey<FormState>();
    dio = Dio();
    customDialogs = CustomDialogs();
    nameController = TextEditingController();
    emailController = TextEditingController();
    phoneNumberController = TextEditingController(text: '+963');
    countryCode = CountryCode(dialCode: '+963');
    passwordController = TextEditingController();
    confirmPasswordController = TextEditingController();
    passwordToggle = true;
    super.onInit();
  }

  @override
  void onClose() {
    nameController.dispose();
    emailController.dispose();
    phoneNumberController.dispose();
    passwordController.dispose();
    confirmPasswordController.dispose();
    super.onClose();
  }

  void selectCountryCode(CountryCode code) {
    countryCode = code;
    phoneNumberController.text = code.dialCode!;
    update();
  }

  InkWell passwordInkwell() {
    return InkWell(
      onTap: () {
        passwordToggle = !passwordToggle;
        update();
      },
      child: Icon(passwordToggle ? Icons.visibility_off : Icons.visibility),
    );
  }

  Future<dynamic> register(
    String fullName,
    String email,
    String password,
    String confirmPassword,
    String phoneNumber,
  ) async {
    customDialogs.showLoadingDialog();
    try {
      var response = await dio.post(
        'https://192.168.43.23/api/register',
        data: {
          "full_name": fullName,
          "email": email,
          "password": password,
          "confirm_password": confirmPassword,
        },
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
          },
        ),
      );
      if (response.statusCode == 201) {
        print(response.data);
        // Get.back();
        // storage!.write('token', response.data);
        // customDialogs.showSuccessDialog('151'.tr, '');
        // Future.delayed(
        //   const Duration(seconds: 1),
        //   () {
        //     Get.offAllNamed('/userEditSkills');
        //   },
        // );
      }
    } on DioException catch (e) {
      customDialogs.showErrorDialog(
        'Error'.tr,
        e.response!.data['errors'].toString(),
      );
    }
  }
}
