import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/general_controller.dart';
import 'package:mobile/customWidgets/custom_dialogs.dart';
import 'package:mobile/enums/enums.dart';
import 'package:mobile/main.dart';

class HomeController extends GetxController {
  late GeneralController generalController;
  late Dio dio;
  late CustomDialogs customDialogs;

  @override
  void onInit() {
    generalController = Get.find<GeneralController>();
    dio = Dio();
    customDialogs = CustomDialogs();
    super.onInit();
  }

  Future<dynamic> logout() async {
    customDialogs.showLoadingDialog();
    String token = storage!.read('token');
    try {
      var response = await dio.get(
        'https://olive-salmon-530757.hostingersite.com/api/logout',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      Get.back();
      if (response.statusCode == 200) {
        await storage!.remove('token');
        middlewareCase = MiddlewareCases.invalidToken;
        customDialogs.showSuccessDialog('8'.tr);
        Future.delayed(
          const Duration(seconds: 1),
          () {
            Get.offAllNamed('/auth');
          },
        );
      }
    } on DioException catch (e) {
      Get.back();
      customDialogs.showErrorDialog(
        e.response?.data?['errors']?.toString(),
      );
    }
  }
}
