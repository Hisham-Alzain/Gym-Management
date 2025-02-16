import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/splash_screen_controller.dart';
import 'package:mobile/customWidgets/custom_video_player.dart';

class SplashScreen extends StatelessWidget {
  final SplashScreenController _splashScreenController =
      Get.put(SplashScreenController());

  SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GetBuilder<SplashScreenController>(
        builder: (controller) => SafeArea(
          child: Center(
            child: CustomVideoPlayer(
              videoPlayerController: controller.videoPlayerController,
            ),
          ),
        ),
      ),
    );
  }
}
