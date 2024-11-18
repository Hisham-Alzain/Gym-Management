import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/dietControllers/diets_controller.dart';
import 'package:mobile/customWidgets/custom_texts.dart';

class DietsView extends StatelessWidget {
  final DietsController _dietsController = Get.put(DietsController());

  DietsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
          child: RefreshIndicator(
            key: _dietsController.refreshIndicatorKey,
            onRefresh: () => _dietsController.refreshView(),
            child: GetBuilder<DietsController>(
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
                                              icon: Icons.numbers,
                                              title: 'Number of meals',
                                              text: controller
                                                  .programs[index].numberOfMeals
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
                                                .programs[index].meals.length,
                                            shrinkWrap: true,
                                            padding: const EdgeInsets.all(10),
                                            itemBuilder: (context, index2) {
                                              return Padding(
                                                padding:
                                                    const EdgeInsets.all(10),
                                                child: ElevatedButton(
                                                  onPressed: () {},
                                                  child: TextComponent(
                                                    icon: FontAwesomeIcons
                                                        .bowlFood,
                                                    title: 'Meal ${index2 + 1}',
                                                    text: controller
                                                        .programs[index]
                                                        .meals[index2]
                                                        .mealName,
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
                                        : 'No more diets'.tr,
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
