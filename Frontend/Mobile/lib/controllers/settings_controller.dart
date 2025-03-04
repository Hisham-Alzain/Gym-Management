import 'dart:ui';
import 'package:get/get.dart';
import 'package:mobile/controllers/dietControllers/diets_controller.dart';
import 'package:mobile/controllers/workout_controllers.dart/workouts_controller.dart';
import 'package:mobile/customWidgets/custom_dialogs.dart';
import 'package:mobile/main.dart';

class SettingsController extends GetxController {
  late CustomDialogs customDialogs;
  late Locale locale;
  late String selectedLang;
  late Map<String, String> langs;

  @override
  void onInit() {
    customDialogs = CustomDialogs();
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
    super.onInit();
  }

  Future<void> changeLang(String lang) async {
    customDialogs.showLoadingDialog();
    Locale locale = Locale(lang);
    selectedLang = lang;
    storage?.write("lang", lang);
    await Get.updateLocale(locale);
    WorkoutsController workoutsController = Get.find<WorkoutsController>();
    DietsController dietsController = Get.find<DietsController>();
    await workoutsController.refreshView();
    await dietsController.refreshView();
    Get.back();
    update();
  }
}
