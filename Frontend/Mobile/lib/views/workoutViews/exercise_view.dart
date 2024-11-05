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
      appBar: AppBar(
        title: Text(_exerciseController.exercise.name),
      ),
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
                                  // child: VideoPlayer(
                                  //   controller.videoPlayerController,
                                  // ),
                                  ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: EditContainer(
                              name: 'Exercise Information',
                              child: Column(
                                children: [
                                  TextComponent(
                                    title: 'Muscle',
                                    text: controller.exercise.muscle,
                                  ),
                                  TextComponent(
                                    title: 'Description',
                                    text: controller.exercise.description,
                                  ),
                                  TextComponent(
                                    title: 'Number of sets',
                                    text:
                                        "${controller.exercise.numberOfSets} sets",
                                  ),
                                ],
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: EditContainer(
                              name: 'Sets',
                              child: ListView.builder(
                                itemCount: controller.exercise.sets.length,
                                shrinkWrap: true,
                                itemBuilder: (context, index) {
                                  final repsController =
                                      TextEditingController();
                                  final weightController =
                                      TextEditingController();
                                  return Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Padding(
                                        padding: const EdgeInsets.all(10),
                                        child: Row(
                                          children: [
                                            Text(
                                              "Set ${controller.exercise.sets[index].setNumber}: ",
                                              style: Theme.of(context)
                                                  .textTheme
                                                  .titleLarge,
                                            ),
                                            Text(
                                              "${controller.exercise.sets[index].expectedReps} expected reps",
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
                                              icon: FontAwesomeIcons.arrowUp91,
                                              labelText: 'Reps',
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
                                              labelText: 'Weight',
                                              validator: (p0) =>
                                                  CustomValidation()
                                                      .validateNumber(p0),
                                              maxLines: 1,
                                            ),
                                          ),
                                          IconButton(
                                            onPressed: () {},
                                            icon: const Icon(
                                                Icons.add_circle_outline),
                                            iconSize: 30,
                                          )
                                        ],
                                      ),
                                    ],
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
