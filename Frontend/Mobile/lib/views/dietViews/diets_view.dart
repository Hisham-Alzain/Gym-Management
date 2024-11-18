import 'package:flutter/material.dart';
import 'package:get/get.dart';

class DietsView extends StatelessWidget {
  const DietsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SizedBox(
        height: Get.height,
        width: Get.width,
        child: const DecoratedBox(
          decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/diet_background.jpg'),
              fit: BoxFit.cover,
            ),
          ),
        ),
      ),
    );
  }
}