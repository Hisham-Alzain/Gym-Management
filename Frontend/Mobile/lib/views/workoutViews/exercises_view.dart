import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:mobile/components/text_componenet.dart';
import 'package:mobile/controllers/workout_controllers.dart/exercises_controller.dart';
import 'package:mobile/customWidgets/custom_containers.dart';
import 'package:mobile/customWidgets/custom_image.dart';

class ExercisesView extends StatelessWidget {
  final ExercisesController _exercisesController =
      Get.put(ExercisesController());
  ExercisesView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.black,
        appBar: AppBar(
          title: const Text('Exercises'),
        ),
        body: SizedBox(
            height: Get.height,
            width: Get.width,
            child: DecoratedBox(
              decoration: const BoxDecoration(
                image: DecorationImage(
                  image: AssetImage('assets/exercises_background.JPG'),
                  fit: BoxFit.cover,
                ),
              ),
              child: RefreshIndicator(
                key: _exercisesController.refreshIndicatorKey,
                onRefresh: () => _exercisesController.getDay(
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
                            return Card(
                              child: Padding(
                                padding: const EdgeInsets.all(10),
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceEvenly,
                                  children: [
                                    controller.exercises[index].thumbnailPath ==
                                            null
                                        ? const Icon(
                                            Icons.fitness_center,
                                            size: 100,
                                          )
                                        : CustomImage(
                                            path: controller
                                                .exercises[index].thumbnailPath
                                                .toString(),
                                          ),
                                    Column(
                                      children: [
                                        Text(
                                          controller.exercises[index].name,
                                          style: Theme.of(context)
                                              .textTheme
                                              .headlineSmall,
                                        ),
                                        Row(
                                          children: [
                                            Text(
                                              controller
                                                  .exercises[index].muscle,
                                              style: Theme.of(context)
                                                  .textTheme
                                                  .bodyLarge
                                                  ?.copyWith(
                                                    color: Colors.white
                                                        .withOpacity(0.5),
                                                  ),
                                            ),
                                            Text(
                                              "${controller.exercises[index].numberOfSets} sets",
                                              style: Theme.of(context)
                                                  .textTheme
                                                  .bodyLarge
                                                  ?.copyWith(
                                                    color: Colors.white
                                                        .withOpacity(0.5),
                                                  ),
                                            ),
                                          ],
                                        )
                                      ],
                                    )
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                ),
              ),
            )));
  }
}
