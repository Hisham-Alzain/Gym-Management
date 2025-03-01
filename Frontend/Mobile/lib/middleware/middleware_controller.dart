import 'dart:developer';
import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:mobile/customWidgets/custom_dialogs.dart';
import 'package:mobile/enums/enums.dart';
import 'package:mobile/main.dart';

class MiddlewareController extends GetxController {
  late Dio dio;
  late CustomDialogs customDialogs;

  @override
  onInit() {
    dio = Dio();
    dio.options.connectTimeout = const Duration(seconds: 5);
    customDialogs = CustomDialogs();
    super.onInit();
  }

  Future<MiddlewareCases> checkToken() async {
    String? token = storage?.read('token');
    log("token: $token");
    if (token != null) {
      try {
        var response = await dio.get(
          'https://olive-salmon-530757.hostingersite.com/api/check_token',
          options: Options(
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json',
              'Authorization': 'Bearer $token'
            },
          ),
        );
        if (response.statusCode == 200) {
          if (!response.data['completed_info']) {
            return MiddlewareCases.incompleteInfo;
          } else {
            return MiddlewareCases.validToken;
          }
        }
      } on DioException catch (e) {
        if (e.response?.statusCode == 401) {
          Future.delayed(const Duration(seconds: 1), () {
            customDialogs.showSesionExpiredDialog();
          });
          return MiddlewareCases.invalidToken;
        }
        return MiddlewareCases.invalidToken;
      }
    }
    return MiddlewareCases.invalidToken;
  }
}
