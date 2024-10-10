import 'package:flutter/material.dart';
import 'package:get/get.dart';

class CustomDialogs {
  Future<void> showLoadingDialog() async {
    Get.defaultDialog(
      backgroundColor: Colors.grey.shade800,
      title: 'Loading...',
      titleStyle: const TextStyle(color: Colors.redAccent),
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
            child: Text(content),
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
}
