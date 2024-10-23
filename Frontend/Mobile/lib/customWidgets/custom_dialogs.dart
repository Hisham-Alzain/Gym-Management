import 'package:flutter/material.dart';
import 'package:get/get.dart';

class CustomDialogs {
  Future<void> showLoadingDialog() async {
    Get.defaultDialog(
      backgroundColor: Colors.grey.shade800,
      title: 'Loading...',
      titleStyle: TextStyle(color: Colors.red.shade900),
      content: const CircularProgressIndicator(),
    );
  }

  Future<void> showErrorDialog(String title, String content) async {
    Get.defaultDialog(
      backgroundColor: Colors.grey.shade800,
      title: title,
      titleStyle: const TextStyle(
        color: Colors.red,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      content: Column(
        children: [
          const Icon(
            Icons.cancel_outlined,
            color: Colors.red,
            size: 40,
          ),
          Padding(
            padding: const EdgeInsets.all(10),
            child: Text(
              content,
              style: const TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }

  Future<void> showSuccessDialog(
    String title,
    String content,
  ) async {
    Get.defaultDialog(
      backgroundColor: Colors.grey.shade800,
      title: title,
      titleStyle: const TextStyle(
        color: Colors.green,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      content: Column(
        children: [
          const Icon(
            Icons.check_circle_outline,
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
      title: 'Session expired',
      titleStyle: const TextStyle(
        color: Colors.red,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
      content: const Column(
        children: [
          Icon(
            Icons.timer_off,
            color: Colors.red,
            size: 40,
          ),
          Padding(
            padding: EdgeInsets.all(10),
            child: Text(
              'Please login again',
              style: TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }

  Future<void> showLogoutDialog(void Function()? onTap) async {
    Get.defaultDialog(
      backgroundColor: Colors.grey.shade800,
      title: 'Notice:',
      titleStyle: const TextStyle(color: Colors.white),
      content: const Text(
        'Are you sure you want to logout?',
        style: TextStyle(
          color: Colors.white,
        ),
      ),
      confirm: GestureDetector(
        onTap: onTap,
        child: const Padding(
          padding: EdgeInsets.fromLTRB(10, 0, 10, 0),
          child: Text(
            'Yes',
            style: TextStyle(
              color: Colors.white,
            ),
          ),
        ),
      ),
      cancel: GestureDetector(
        onTap: () => Get.back(),
        child: const Padding(
          padding: EdgeInsets.fromLTRB(10, 0, 10, 0),
          child: Text(
            'No',
            style: TextStyle(
              color: Colors.white,
            ),
          ),
        ),
      ),
    );
  }
}
