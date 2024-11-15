import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/general_controller.dart';
import 'package:mobile/customWidgets/custom_dialogs.dart';
import 'package:mobile/main.dart';
import 'package:mobile/models/user.dart';

class ProfileController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late GeneralController generalController;
  late Dio dio;
  late CustomDialogs customDialogs;
  late User user;
  bool loading = true;

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    generalController = Get.find<GeneralController>();
    dio = Dio();
    customDialogs = CustomDialogs();
    await getUserInfo();
    loading = false;
    update();
    super.onInit();
  }

  Future<dynamic> getUserInfo() async {
    String token = storage?.read('token');
    try {
      var response = await dio.get(
        'http://192.168.0.103:8000/api/trainee',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        user = User.fromJson(response.data['user']);
        update();
      } else if (response.statusCode == 401) {
        generalController.handleUnauthorized();
      }
    } on DioException catch (e) {
      customDialogs.showErrorDialog(
        e.response?.data?.toString() ?? 'An error occurred',
      );
    }
  }
}
