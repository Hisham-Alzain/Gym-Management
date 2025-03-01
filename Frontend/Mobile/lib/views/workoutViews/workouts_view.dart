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
              image: AssetImage('assets/app_photos/app_background.jpg'),
              fit: BoxFit.cover,
            ),
          ),
          child: RefreshIndicator(
            onRefresh: () async => await _workoutsController.refreshView(),
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
                                              '${'45'.tr} ${index + 1}:',
                                              style: Theme.of(context)
                                                  .textTheme
                                                  .titleLarge,
                                            ),
                                            TextComponent(
                                              icon: FontAwesomeIcons
                                                  .calendarCheck,
                                              title: '46'.tr,
                                              text: controller
                                                  .programs[index].startDate
                                                  .toString()
                                                  .split(' ')[0],
                                            ),
                                            TextComponent(
                                              icon: FontAwesomeIcons
                                                  .calendarXmark,
                                              title: '47'.tr,
                                              text: controller
                                                  .programs[index].endDate
                                                  .toString()
                                                  .split(' ')[0],
                                            ),
                                            TextComponent(
                                              icon:
                                                  FontAwesomeIcons.calendarDays,
                                              title: '105'.tr,
                                              text: controller
                                                  .programs[index].numberOfDays
                                                  .toString(),
                                            ),
                                            TextComponent(
                                              icon: FontAwesomeIcons.repeat,
                                              title: '106'.tr,
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
                                            '${'49'.tr}:',
                                            style: Theme.of(context)
                                                .textTheme
                                                .titleLarge,
                                          ),
                                          ListView.builder(
                                            physics:
                                                const NeverScrollableScrollPhysics(),
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
                                                  child: CenterTextComponent(
                                                    icon: FontAwesomeIcons
                                                        .calendarDay,
                                                    title:
                                                        '${'107'.tr} ${index2 + 1}',
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
                                        ? '51'.tr
                                        : '108'.tr,
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
