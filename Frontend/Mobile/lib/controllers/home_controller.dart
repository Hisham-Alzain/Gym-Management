import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/general_controller.dart';
import 'package:mobile/customWidgets/custom_dialogs.dart';
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
        'http://192.168.0.101:8000/api/logout',
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
        storage!.remove('token');
        customDialogs.showSuccessDialog('Logging out...');
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
        e.response?.data?['errors']?.toString() ?? 'An error occurred',
      );
    }
  }
}
