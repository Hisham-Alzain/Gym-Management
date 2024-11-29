import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/dietControllers/diets_controller.dart';
import 'package:mobile/customWidgets/custom_containers.dart';
import 'package:mobile/customWidgets/custom_image.dart';
import 'package:mobile/customWidgets/custom_texts.dart';
import 'package:mobile/main.dart';

class MealView extends StatelessWidget {
  const MealView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('50'.tr),
      ),
      body: SizedBox(
        height: Get.height,
        width: Get.width,
        child: DecoratedBox(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/diet_background.jpg'),
              fit: BoxFit.cover,
            ),
          ),
          child: GetBuilder<DietsController>(
            builder: (controller) => SingleChildScrollView(
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(10),
                    child: RedContainer(
                      height: 200,
                      child: controller.selectedMeal.thumbnailPath == null
                          ? const Icon(
                              Icons.fastfood,
                              size: 75,
                            )
                          : CustomImage(
                              path: controller.selectedMeal.thumbnailPath
                                  .toString(),
                              token: storage!.read('token'),
                            ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(10),
                    child: EditContainer(
                      name: '53'.tr,
                      child: Column(
                        children: [
                          TextComponent(
                            icon: Icons.local_restaurant,
                            title: '54'.tr,
                            text: controller.selectedMeal.mealName,
                          ),
                          TextComponent(
                            icon: Icons.balance,
                            title: '55'.tr,
                            text:
                                "${controller.selectedMeal.quantity} ${'70'.tr}",
                          ),
                          TextComponent(
                            icon: Icons.numbers,
                            title: '56'.tr,
                            text: "${controller.selectedMeal.mealNumber}",
                          ),
                          TextComponent(
                            icon: Icons.timelapse,
                            title: '57'.tr,
                            text: controller.selectedMeal.timeAfter,
                          ),
                          TextComponent(
                            icon: Icons.description,
                            title: '58'.tr,
                            text: controller.selectedMeal.description,
                          ),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(10),
                    child: EditContainer(
                      child: Column(
                        children: [
                          TextComponent(
                            icon: Icons.info,
                            title: '59'.tr,
                            text: controller.selectedMeal.details,
                          ),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(10),
                    child: EditContainer(
                      name: '60'.tr,
                      child: Column(
                        children: [
                          TextComponent(
                            title: '61'.tr,
                            text:
                                "${controller.selectedMeal.totalCalories} ${'71'.tr}",
                          ),
                          TextComponent(
                            title: '62'.tr,
                            text:
                                "${controller.selectedMeal.caloriesPerGram} ${'71'.tr}",
                          ),
                          TextComponent(
                            title: '63'.tr,
                            text:
                                "${controller.selectedMeal.totalProtein} ${'70'.tr}",
                          ),
                          TextComponent(
                            title: '64'.tr,
                            text:
                                "${controller.selectedMeal.proteinPerGram} ${'70'.tr}",
                          ),
                          TextComponent(
                            title: '65'.tr,
                            text:
                                "${controller.selectedMeal.totalCarbs} ${'70'.tr}",
                          ),
                          TextComponent(
                            title: '66'.tr,
                            text:
                                "${controller.selectedMeal.carbsPerGram} ${'70'.tr}",
                          ),
                          TextComponent(
                            title: '67'.tr,
                            text:
                                "${controller.selectedMeal.totalFat} ${'70'.tr}",
                          ),
                          TextComponent(
                            title: '68'.tr,
                            text:
                                "${controller.selectedMeal.fatPerGram} ${'70'.tr}",
                          ),
                          TextComponent(
                            title: '69'.tr,
                            text: controller.selectedMeal.gi,
                          ),
                        ],
                      ),
                    ),
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
