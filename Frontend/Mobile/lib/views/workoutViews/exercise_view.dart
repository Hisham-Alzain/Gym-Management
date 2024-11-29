import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:mobile/customWidgets/custom_texts.dart';
import 'package:mobile/controllers/workout_controllers.dart/exercise_controller.dart';
import 'package:mobile/customWidgets/custom_containers.dart';
import 'package:mobile/customWidgets/custom_text_field.dart';
import 'package:mobile/customWidgets/custom_validation.dart';

class ExerciseView extends StatelessWidget {
  final ExerciseController _exerciseController = Get.put(ExerciseController());
  ExerciseView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: SizedBox(
        height: Get.height,
        width: Get.width,
        child: DecoratedBox(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/general_background.jpg'),
              fit: BoxFit.cover,
            ),
          ),
          child: RefreshIndicator(
            key: _exerciseController.refreshIndicatorKey,
            onRefresh: () => _exerciseController.getExercise(
              _exerciseController.exercisesController.exerciseId,
            ),
            child: GetBuilder<ExerciseController>(
              builder: (controller) => controller.loading
                  ? const Center(
                      child: CircularProgressIndicator(),
                    )
                  : SingleChildScrollView(
                      child: Column(
                        children: [
                          const Padding(
                            padding: EdgeInsets.all(10),
                            child: RedContainer(
                              height: 300,
                              child: Center(
                                  // child: controller.videoPlayerController.value
                                  //         .isInitialized
                                  //     ? Stack(
                                  //         children: [
                                  //           // AspectRatio(
                                  //           //   aspectRatio: controller
                                  //           //       .videoPlayerController
                                  //           //       .value
                                  //           //       .aspectRatio,
                                  //           //   child: VideoPlayer(controller
                                  //           //       .videoPlayerController),
                                  //           // ),
                                  //           FloatingActionButton(
                                  //             onPressed: () {
                                  //               controller.videoPlayerController
                                  //                       .value.isPlaying
                                  //                   ? controller
                                  //                       .videoPlayerController
                                  //                       .pause()
                                  //                   : controller
                                  //                       .videoPlayerController
                                  //                       .play();
                                  //             },
                                  //             child: Icon(
                                  //               controller.videoPlayerController
                                  //                       .value.isPlaying
                                  //                   ? Icons.pause
                                  //                   : Icons.play_arrow,
                                  //             ),
                                  //           ),
                                  //         ],
                                  //       )
                                  //     : const CircularProgressIndicator(),
                                  ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: EditContainer(
                              name: '${'97'.tr} ${controller.exercise.name}',
                              child: Column(
                                children: [
                                  TextComponent(
                                    icon: Icons.fitness_center,
                                    title: '98'.tr,
                                    text: controller.exercise.muscle,
                                  ),
                                  TextComponent(
                                    icon: Icons.description,
                                    title: '58'.tr,
                                    text: controller.exercise.description,
                                  ),
                                  TextComponent(
                                    icon: Icons.numbers,
                                    title: '99'.tr,
                                    text:
                                        "${controller.exercise.numberOfSets} ${'100'.tr}",
                                  ),
                                ],
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: EditContainer(
                              name: '100'.tr,
                              child: ListView.builder(
                                itemCount: controller.exercise.sets.length,
                                shrinkWrap: true,
                                itemBuilder: (context, index) {
                                  final repsController = TextEditingController(
                                    text: controller
                                        .exercise.sets[index].userSets?.reps
                                        .toString(),
                                  );
                                  final weightController =
                                      TextEditingController(
                                    text: controller.exercise.sets[index]
                                        .userSets?.repWeight
                                        .toString(),
                                  );
                                  final GlobalKey<FormState> setsForm =
                                      GlobalKey<FormState>();
                                  return Form(
                                    key: setsForm,
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Padding(
                                          padding: const EdgeInsets.all(10),
                                          child: Row(
                                            children: [
                                              Text(
                                                "${'101'.tr} ${controller.exercise.sets[index].setNumber}: ",
                                                style: Theme.of(context)
                                                    .textTheme
                                                    .titleLarge,
                                              ),
                                              Text(
                                                "${controller.exercise.sets[index].expectedReps} ${'102'.tr}",
                                                style: Theme.of(context)
                                                    .textTheme
                                                    .titleLarge,
                                              ),
                                            ],
                                          ),
                                        ),
                                        Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceAround,
                                          children: [
                                            SizedBox(
                                              width: 130,
                                              child: CustomTextField(
                                                controller: repsController,
                                                textInputType:
                                                    TextInputType.number,
                                                obsecureText: false,
                                                icon:
                                                    FontAwesomeIcons.arrowUp91,
                                                labelText: '103'.tr,
                                                validator: (p0) =>
                                                    CustomValidation()
                                                        .validateNumber(p0),
                                                maxLines: 1,
                                              ),
                                            ),
                                            SizedBox(
                                              width: 130,
                                              child: CustomTextField(
                                                controller: weightController,
                                                textInputType:
                                                    TextInputType.number,
                                                obsecureText: false,
                                                icon: FontAwesomeIcons
                                                    .weightHanging,
                                                labelText: '78'.tr,
                                                validator: (p0) =>
                                                    CustomValidation()
                                                        .validateNumber(p0),
                                                maxLines: 1,
                                              ),
                                            ),
                                            IconButton(
                                              onPressed: () {
                                                if (setsForm.currentState
                                                        ?.validate() ==
                                                    true) {
                                                  controller.addSet(
                                                    controller.exercise
                                                        .sets[index].setId,
                                                    int.parse(
                                                        repsController.text),
                                                    double.parse(
                                                        weightController.text),
                                                  );
                                                }
                                              },
                                              icon: const Icon(
                                                  Icons.add_circle_outline),
                                              iconSize: 30,
                                            )
                                          ],
                                        ),
                                      ],
                                    ),
                                  );
                                },
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
            ),
          ),
        ),
      ),
    );
  }
}
