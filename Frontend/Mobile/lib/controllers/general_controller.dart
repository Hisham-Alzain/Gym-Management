import 'dart:io';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:permission_handler/permission_handler.dart';

class GeneralController extends GetxController {
  late bool inRegister;
  late ImagePicker picker;

  @override
  void onInit() {
    inRegister = false;
    picker = ImagePicker();
    super.onInit();
  }

  Future<void> requestPermissions() async {
    if (Platform.isIOS) {
      const photoPermission = Permission.photos;
      const mediaPermission = Permission.mediaLibrary;
      if (await photoPermission.isDenied) {
        await photoPermission.request();
      }
      if (await mediaPermission.isDenied) {
        await mediaPermission.request();
      }
    } else {
      const photoPermission = Permission.photos;
      const storagePermission = Permission.storage;
      const externalStoragePermission = Permission.manageExternalStorage;
      if (await photoPermission.isDenied) {
        await photoPermission.request();
      }
      if (await storagePermission.isDenied) {
        await storagePermission.request();
      }
      if (await externalStoragePermission.isDenied) {
        await externalStoragePermission.request();
      }
    }
  }

  Future<List<XFile>?> pickPhotoFromGallery() async {
    const permission = Permission.photos;
    if (await permission.isDenied) {
      final result = await permission.request();
      if (result.isPermanentlyDenied) {
        openAppSettings();
      }
    } else if (await permission.isGranted) {
      List<XFile> images;
      images = await picker.pickMultiImage(
        limit: 5,
      );
      return images;
    }
    return null;
  }
}
