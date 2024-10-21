import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/controllers/general_controller.dart';

class AddPhotosController extends GetxController {
  late GeneralController generalController;
  late Dio dio;
  late List<Widget> modelImages;
  List<XFile> images = [];
  List<Widget> displayImages = [];

  @override
  void onInit() {
    generalController = Get.find<GeneralController>();
    dio = Dio();
    modelImages = [
      Image.asset('assets/general_background.jpg'),
      Image.asset('assets/general_background.jpg'),
      Image.asset('assets/general_background.jpg'),
      Image.asset('assets/general_background.jpg'),
      Image.asset('assets/general_background.jpg'),
    ];
    super.onInit();
  }

  Future<void> addPhotos() async {
    images = (await generalController.pickPhotoFromGallery())!;
    for (var image in images) {
      displayImages.add(
        Image.memory(
          await image.readAsBytes(),
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
}
