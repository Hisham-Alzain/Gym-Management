import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';

class CustomDialogs {
  Future<void> showLoadingDialog() async {
    Get.defaultDialog(
      backgroundColor: Colors.grey.shade800,
      title: '10'.tr,
      titleStyle: TextStyle(color: Colors.red.shade900),
      content: const CircularProgressIndicator(),
    );
  }

  Future<void> showErrorDialog(String? content) async {
    Get.defaultDialog(
      backgroundColor: Colors.grey.shade800,
      title: '11'.tr,
      titleStyle: const TextStyle(
        color: Colors.red,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      content: Column(
        children: [
          const Icon(
            FontAwesomeIcons.circleExclamation,
            color: Colors.red,
            size: 40,
          ),
          Padding(
            padding: const EdgeInsets.all(10),
            child: Text(
              content ?? '12'.tr,
              style: const TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }

  Future<void> showSuccessDialog(
    String content,
  ) async {
    Get.defaultDialog(
      backgroundColor: Colors.grey.shade800,
      title: '13'.tr,
      titleStyle: const TextStyle(
        color: Colors.green,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      content: Column(
        children: [
          const Icon(
            FontAwesomeIcons.circleCheck,
            color: Colors.green,
            size: 40,
          ),
          Padding(
            padding: const EdgeInsets.all(10),
            child: Text(
              content,
              style: const TextStyle(color: Colors.white),
            ),
          )
        ],
      ),
    );
  }

  Future<void> showSesionExpiredDialog() async {
    Get.defaultDialog(
      backgroundColor: Colors.grey.shade800,
      title: '14'.tr,
      titleStyle: const TextStyle(
        color: Colors.red,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      content: Column(
        children: [
          const Icon(
            Icons.timer_off,
            color: Colors.red,
            size: 40,
          ),
          Padding(
            padding: const EdgeInsets.all(10),
            child: Text(
              '15'.tr,
              style: const TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }

  Future<void> showLogoutDialog(void Function()? onTap) async {
    Get.defaultDialog(
      backgroundColor: Colors.grey.shade800,
      title: '16'.tr,
      titleStyle: const TextStyle(color: Colors.red),
      content: Text(
        '17'.tr,
        style: const TextStyle(
          color: Colors.white,
        ),
      ),
      confirm: GestureDetector(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
          child: Text(
            '18'.tr,
            style: const TextStyle(
              color: Colors.white,
            ),
          ),
        ),
      ),
      cancel: GestureDetector(
        onTap: () => Get.back(),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
          child: Text(
            '19'.tr,
            style: const TextStyle(
              color: Colors.white,
            ),
          ),
        ),
      ),
    );
  }
}
