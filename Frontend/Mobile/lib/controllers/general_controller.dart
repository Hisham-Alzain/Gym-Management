import 'dart:io';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile/customWidgets/custom_dialogs.dart';
import 'package:mobile/main.dart';
import 'package:permission_handler/permission_handler.dart';

class GeneralController extends GetxController {
  late Locale locale;
  late String selectedLang;
  late Map<String, String> langs;
  late CustomDialogs customDialogs;
  late bool inRegister;
  late ImagePicker picker;

  @override
  void onInit() {
    if (storage?.read("lang") != null) {
      if (storage?.read("lang") == "en") {
        locale = const Locale("en");
        selectedLang = 'en';
      } else {
        locale = const Locale("ar");
        selectedLang = 'ar';
      }
    } else {
      locale = const Locale('en');
      selectedLang = 'en';
    }
    langs = {
      'English': 'en',
      'العربية': 'ar',
    };
    customDialogs = CustomDialogs();
    inRegister = false;
    picker = ImagePicker();
    super.onInit();
  }

  Future<void> changeLang(String lang) async {
    Locale locale = Locale(lang);
    selectedLang = lang;
    storage?.write("lang", lang);
    await Get.updateLocale(locale);
    update();
  }

  void handleUnauthorized() {
    Get.back();
    customDialogs.showSesionExpiredDialog();
    Future.delayed(const Duration(seconds: 1), () {
      Get.offAllNamed('/login');
    });
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
