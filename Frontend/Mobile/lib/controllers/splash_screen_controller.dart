import 'package:get/get.dart';
import 'package:video_player/video_player.dart';

class SplashScreenController extends GetxController {
  final VideoPlayerController videoPlayerController;

  SplashScreenController({required this.videoPlayerController});

  @override
  Future<void> onInit() async {
    super.onInit();
    videoPlayerController.setLooping(false);
    await videoPlayerController.play();
    update();
    setupVideoEndListener();
  }

  @override
  void onClose() {
    videoPlayerController.dispose();
    super.onClose();
  }

  void setupVideoEndListener() {
    videoPlayerController.addListener(() {
      if (videoPlayerController.value.position >=
          videoPlayerController.value.duration) {
        Get.offNamed('/auth');
      }
    });
  }
}
