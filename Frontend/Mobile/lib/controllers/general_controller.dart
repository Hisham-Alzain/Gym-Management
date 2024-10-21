import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:permission_handler/permission_handler.dart';

class GeneralController extends GetxController {
  late ImagePicker picker;

  @override
  void onInit() {
    picker = ImagePicker();
    super.onInit();
  }

  Future<void> requestPermissions() async {
    const photoPermission = Permission.photos;
    const storagePermission = Permission.manageExternalStorage;
    if (await photoPermission.isDenied) {
      await photoPermission.request();
    }
    if (await storagePermission.isDenied) {
      await storagePermission.request();
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
