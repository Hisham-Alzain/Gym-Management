import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:mobile/controllers/general_controller.dart';
import 'package:mobile/controllers/splash_screen_controller.dart';
import 'package:mobile/enums/enums.dart';
import 'package:mobile/l10n/local.dart';
import 'package:mobile/middleware/middleware_controller.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/theme/theme.dart';
import 'package:video_player/video_player.dart';

GetStorage? storage;
late VideoPlayerController videoPlayerController;
late MiddlewareCases middlewareCase;

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  storage = GetStorage();
  await storage?.initStorage;
  videoPlayerController =
      VideoPlayerController.asset('assets/app_photos/splashScreenVideo.mp4');
  await videoPlayerController.initialize();
  MiddlewareController middlewareController = Get.put(MiddlewareController());
  middlewareCase = await middlewareController.checkToken();
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    final GeneralController generalController = Get.put(GeneralController());
    return GetMaterialApp(
      initialRoute: '/splashScreen',
      getPages: getPages,
      debugShowCheckedModeBanner: false,
      onInit: () {
        Get.put(SplashScreenController(
            videoPlayerController: videoPlayerController));
      },
      onReady: () async => await generalController.requestPermissions(),
      theme: Themes.theme,
      locale: generalController.locale,
      translations: Local(),
    );
  }
}
