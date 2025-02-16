import 'package:get/get.dart';
import 'package:video_player/video_player.dart';

class SplashScreenController extends GetxController {
  late VideoPlayerController videoPlayerController;

  @override
  Future<void> onInit() async {
    super.onInit();
    videoPlayerController =
        VideoPlayerController.asset('assets/splashScreenVideo.mp4');
    await videoPlayerController.initialize();
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
