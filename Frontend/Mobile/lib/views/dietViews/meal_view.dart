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
        title: const Text('Meal'),
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
                      name: 'Meal Information',
                      child: Column(
                        children: [
                          TextComponent(
                            icon: Icons.local_restaurant,
                            title: 'Name',
                            text: controller.selectedMeal.mealName,
                          ),
                          TextComponent(
                            icon: Icons.balance,
                            title: 'Quantity',
                            text: "${controller.selectedMeal.quantity} g",
                          ),
                          TextComponent(
                            icon: Icons.numbers,
                            title: 'Meal Number',
                            text: "${controller.selectedMeal.mealNumber}",
                          ),
                          TextComponent(
                            icon: Icons.timelapse,
                            title: 'After Time:',
                            text: controller.selectedMeal.timeAfter,
                          ),
                          TextComponent(
                            icon: Icons.description,
                            title: 'Description',
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
                            title: 'Special Details',
                            text: controller.selectedMeal.details,
                          ),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(10),
                    child: EditContainer(
                      name: 'Nutrition Facts',
                      child: Column(
                        children: [
                          TextComponent(
                            title: 'Total Calories',
                            text:
                                "${controller.selectedMeal.totalCalories} cal",
                          ),
                          TextComponent(
                            title: 'Calories Per Gram',
                            text:
                                "${controller.selectedMeal.caloriesPerGram} cal",
                          ),
                          TextComponent(
                            title: 'Total Protein',
                            text: "${controller.selectedMeal.totalProtein} g",
                          ),
                          TextComponent(
                            title: 'Protein Per Gram',
                            text: "${controller.selectedMeal.proteinPerGram} g",
                          ),
                          TextComponent(
                            title: 'Total Carbs',
                            text: "${controller.selectedMeal.totalCarbs} g",
                          ),
                          TextComponent(
                            title: 'Carbs Per Gram',
                            text: "${controller.selectedMeal.carbsPerGram} g",
                          ),
                          TextComponent(
                            title: 'Total Fat',
                            text: "${controller.selectedMeal.totalFat} g",
                          ),
                          TextComponent(
                            title: 'Fat Per Gram',
                            text: "${controller.selectedMeal.fatPerGram} g",
                          ),
                          TextComponent(
                            title: 'GI',
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
