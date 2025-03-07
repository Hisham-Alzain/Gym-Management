import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart' hide FormData, MultipartFile;
import 'package:image_picker/image_picker.dart';
import 'package:mobile/controllers/general_controller.dart';
import 'package:mobile/customWidgets/custom_dialogs.dart';
import 'package:mobile/customWidgets/custom_image.dart';
import 'package:mobile/main.dart';
import 'package:mobile/models/photo.dart';

class AddPhotosController extends GetxController {
  late GeneralController generalController;
  late Dio dio;
  late CustomDialogs customDialogs;
  List<Widget> modelPhotos = [];
  List<XFile> selectedPhotos = [];
  List<Widget> displayPhotos = [];
  List<Photo> uploadedPhotos = [];
  bool loading = true;

  @override
  Future<void> onInit() async {
    generalController = Get.find<GeneralController>();
    dio = Dio();
    customDialogs = CustomDialogs();
    modelPhotos = [
      for (int i = 1; i <= 6; i++)
        Image.asset(
          'assets/model_photos/$i.png',
          fit: BoxFit.fill,
        ),
    ];
    if (!generalController.inRegister) {
      await getPhotos();
    }
    loading = false;
    update();
    super.onInit();
  }

  void skipAddingPhotos() {
    generalController.inRegister = false;
    Get.offAllNamed('/home');
  }

  Future<void> addPhotos() async {
    List<XFile>? pickedPhotos = await generalController.pickPhotoFromGallery();
    if (pickedPhotos == null || pickedPhotos.isEmpty) return;
    selectedPhotos.clear();
    displayPhotos.clear();
    selectedPhotos.addAll(pickedPhotos.take(6));
    displayPhotos = [
      for (var photo in selectedPhotos)
        Image.memory(
          await photo.readAsBytes(),
          fit: BoxFit.fill,
        ),
    ];
    update();
  }

  Future<dynamic> uploadPhotos() async {
    customDialogs.showLoadingDialog();
    String token = storage?.read('token');

    final data = FormData();
    final List<MultipartFile> imageFiles = await Future.wait(
      selectedPhotos.map((image) => MultipartFile.fromFile(image.path)),
    );
    data.files.addAll(
      [
        for (int i = 0; i < imageFiles.length; i++)
          MapEntry('photos[$i]', imageFiles[i])
      ],
    );

    try {
      var response = await dio.post(
        'https://olive-salmon-530757.hostingersite.com/api/trainee/photos',
        data: data,
        options: Options(
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      Get.back();
      if (response.statusCode == 201) {
        customDialogs.showSuccessDialog('7'.tr);
        selectedPhotos.clear();
        if (generalController.inRegister) {
          generalController.inRegister = false;
          Future.delayed(
            const Duration(seconds: 1),
            () {
              Get.offAllNamed('/home');
            },
          );
        } else {
          await getPhotos();
        }
      } else if (response.statusCode == 401) {
        generalController.handleUnauthorized();
      }
    } on DioException catch (e) {
      Get.back();
      customDialogs.showErrorDialog(
        e.response?.data?.toString(),
      );
    }
  }

  Future<dynamic> getPhotos() async {
    String token = storage?.read('token');
    try {
      var response = await dio.get(
        'https://olive-salmon-530757.hostingersite.com/api/trainee/photos',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );

      if (response.statusCode == 200) {
        uploadedPhotos = [
          for (var photo in response.data['photos']) Photo.fromJson(photo),
        ];
        for (var photo in uploadedPhotos) {
          if (displayPhotos.length < 6) {
            displayPhotos.add(
              CustomImage(
                path: photo.photoPath,
                token: token,
              ),
            );
          } else {
            break;
          }
        }
        update();
      } else if (response.statusCode == 401) {
        generalController.handleUnauthorized();
      }
    } on DioException catch (e) {
      Get.back();
      customDialogs.showErrorDialog(
        e.response?.data?.toString(),
      );
    }
  }
}
