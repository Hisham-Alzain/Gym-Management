import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:mobile/customWidgets/custom_texts.dart';
import 'package:mobile/controllers/workout_controllers.dart/workouts_controller.dart';

class WorkoutsView extends StatelessWidget {
  final WorkoutsController _workoutsController = Get.put(WorkoutsController());

  WorkoutsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: SizedBox(
        height: Get.height,
        width: Get.width,
        child: DecoratedBox(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/app_background.JPG'),
              fit: BoxFit.cover,
            ),
          ),
          child: RefreshIndicator(
            key: _workoutsController.refreshIndicatorKey,
            onRefresh: () => _workoutsController.refreshView(),
            child: GetBuilder<WorkoutsController>(
              builder: (controller) => controller.loading
                  ? const Center(
                      child: CircularProgressIndicator(),
                    )
                  : SingleChildScrollView(
                      controller: controller.scrollController,
                      child: Column(
                        children: [
                          ListView.builder(
                            physics: const NeverScrollableScrollPhysics(),
                            shrinkWrap: true,
                            itemCount: controller.programs.length,
                            itemBuilder: (context, index) {
                              return Card(
                                child: ExpansionTile(
                                  title: Row(
                                    children: [
                                      Expanded(
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            Text(
                                              'Program ${index + 1}:',
                                              style: Theme.of(context)
                                                  .textTheme
                                                  .titleLarge,
                                            ),
                                            TextComponent(
                                              icon: FontAwesomeIcons
                                                  .calendarCheck,
                                              title: 'Start date',
                                              text: controller
                                                  .programs[index].startDate
                                                  .toString()
                                                  .split(' ')[0],
                                            ),
                                            TextComponent(
                                              icon: FontAwesomeIcons
                                                  .calendarXmark,
                                              title: 'End date',
                                              text: controller
                                                  .programs[index].endDate
                                                  .toString()
                                                  .split(' ')[0],
                                            ),
                                            TextComponent(
                                              icon:
                                                  FontAwesomeIcons.calendarDays,
                                              title: 'Number of days',
                                              text: controller
                                                  .programs[index].numberOfDays
                                                  .toString(),
                                            ),
                                            TextComponent(
                                              icon: FontAwesomeIcons.repeat,
                                              title: 'Repeat days',
                                              text: controller
                                                  .programs[index].repeatDays
                                                  .toString(),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                  children: [
                                    Padding(
                                      padding: const EdgeInsets.all(10),
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            'Days:',
                                            style: Theme.of(context)
                                                .textTheme
                                                .titleLarge,
                                          ),
                                          ListView.builder(
                                            itemCount: controller
                                                .programs[index].days.length,
                                            shrinkWrap: true,
                                            padding: const EdgeInsets.all(10),
                                            itemBuilder: (context, index2) {
                                              return Padding(
                                                padding:
                                                    const EdgeInsets.all(10),
                                                child: ElevatedButton(
                                                  onPressed: () =>
                                                      controller.viewDay(
                                                    controller.programs[index]
                                                        .days[index2],
                                                  ),
                                                  child: TextComponent(
                                                    icon: FontAwesomeIcons
                                                        .calendarDay,
                                                    title: 'Day ${index2 + 1}',
                                                    text: controller
                                                        .programs[index]
                                                        .days[index2]
                                                        .muscle,
                                                  ),
                                                ),
                                              );
                                            },
                                          )
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              );
                            },
                          ),
                          if (controller.paginationData.hasMorePages)
                            const Center(
                              child: CircularProgressIndicator(),
                            )
                          else
                            SingleChildScrollView(
                              child: SizedBox(
                                height: Get.height,
                                child: Center(
                                  child: Text(
                                    controller.programs.isEmpty
                                        ? 'No programs to show'.tr
                                        : 'No more workouts'.tr,
                                    style: Theme.of(context)
                                        .textTheme
                                        .headlineSmall,
                                  ),
                                ),
                              ),
                            )
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
