import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/workout_controllers.dart/exercises_controller.dart';
import 'package:mobile/customWidgets/custom_image.dart';
import 'package:mobile/main.dart';

class ExercisesView extends StatelessWidget {
  final ExercisesController _exercisesController =
      Get.put(ExercisesController());

  ExercisesView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        title: Text('104'.tr),
      ),
      body: SizedBox(
        height: Get.height,
        width: Get.width,
        child: DecoratedBox(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/app_photos/exercises_background.jpg'),
              fit: BoxFit.cover,
            ),
          ),
          child: RefreshIndicator(
            onRefresh: () async => await _exercisesController.getDay(
              _exercisesController.workoutsController.dayId,
            ),
            child: GetBuilder<ExercisesController>(
              builder: (controller) => controller.loading
                  ? const Center(
                      child: CircularProgressIndicator(),
                    )
                  : ListView.builder(
                      itemCount: controller.exercises.length,
                      shrinkWrap: true,
                      itemBuilder: (context, index) {
                        return GestureDetector(
                          onTap: () => controller.viewExercise(
                            controller.exercises[index],
                          ),
                          child: Card(
                            child: Padding(
                              padding: const EdgeInsets.all(10),
                              child: Row(
                                children: [
                                  SizedBox(
                                    height: 125,
                                    width: 125,
                                    child: controller.exercises[index]
                                                .thumbnailPath ==
                                            null
                                        ? const Icon(
                                            Icons.fitness_center,
                                            size: 75,
                                          )
                                        : CustomImage(
                                            path: controller
                                                .exercises[index].thumbnailPath
                                                .toString(),
                                            token: storage!.read('token'),
                                          ),
                                  ),
                                  Expanded(
                                    child: Column(
                                      children: [
                                        Text(
                                          ' ${controller.exercises[index].name}',
                                          style: Theme.of(context)
                                              .textTheme
                                              .bodyLarge,
                                        ),
                                      ],
                                    ),
                                  ),
                                  const Icon(
                                    Icons.arrow_forward_ios,
                                    size: 50,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        );
                      },
                    ),
            ),
          ),
        ),
      ),
    );
  }
}
