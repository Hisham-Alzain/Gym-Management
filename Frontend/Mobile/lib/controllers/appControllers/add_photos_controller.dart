import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart' hide FormData, MultipartFile;
import 'package:image_picker/image_picker.dart';
import 'package:mobile/controllers/general_controller.dart';
import 'package:mobile/customWidgets/custom_dialogs.dart';
import 'package:mobile/main.dart';

class AddPhotosController extends GetxController {
  late GeneralController generalController;
  late Dio dio;
  late CustomDialogs customDialogs;
  late List<Widget> modelImages;
  List<XFile> images = [];
  List<Widget> displayImages = [];

  @override
  void onInit() {
    generalController = Get.find<GeneralController>();
    dio = Dio();
    customDialogs = CustomDialogs();
    modelImages = [
      Image.asset('assets/general_background.jpg'),
      Image.asset('assets/general_background.jpg'),
      Image.asset('assets/general_background.jpg'),
      Image.asset('assets/general_background.jpg'),
      Image.asset('assets/general_background.jpg'),
    ];
    super.onInit();
  }

  void skipAddingPhotos() {
    generalController.inRegister = false;
    Get.offAllNamed('/home');
  }

  Future<void> addPhotos() async {
    images = (await generalController.pickPhotoFromGallery())!;
    for (var i = 0; i < 5; i++) {
      displayImages.add(
        Image.memory(
          await images[i].readAsBytes(),
        ),
      );
    }
    update();
  }

  Future<void> removePhotos() async {
    images = [];
    displayImages = [];
    update();
  }

  Future<dynamic> uploadPhotos(List<XFile> images) async {
    customDialogs.showLoadingDialog();
    String token = storage!.read('token');
    final List<MultipartFile> imageFiles = [];
    for (var i = 0; i < 5; i++) {
      imageFiles.add(
        await MultipartFile.fromFile(images[i].path),
      );
    }
    try {
      var response = await dio.post(
        'http://192.168.43.23:8000/api/trainee/photos',
        data: {'photos': imageFiles},
        options: Options(
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        Get.back();
        customDialogs.showSuccessDialog('Success', '');
        Future.delayed(
          const Duration(seconds: 1),
          () {
            Get.offAllNamed('/home');
          },
        );
      } else if (response.statusCode == 401) {
        Get.back();
        customDialogs.showSesionExpiredDialog();
        Future.delayed(
          const Duration(seconds: 1),
          () {
            Get.offAllNamed('/login');
          },
        );
      }
    } on DioException catch (e) {
      customDialogs.showErrorDialog(
        'Error',
        e.response!.data.toString(),
      );
    }
  }
}
