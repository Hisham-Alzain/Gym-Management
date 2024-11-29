import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:mobile/customWidgets/custom_texts.dart';
import 'package:mobile/controllers/profileControllers/profile_controller.dart';
import 'package:mobile/customWidgets/custom_containers.dart';
import 'package:mobile/customWidgets/custom_image.dart';
import 'package:mobile/main.dart';

class ProfileView extends StatelessWidget {
  final ProfileController _profileController = Get.put(ProfileController());

  ProfileView({super.key});

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
              image: AssetImage('assets/app_background.jpg'),
              fit: BoxFit.cover,
            ),
          ),
          child: RefreshIndicator(
            key: _profileController.refreshIndicatorKey,
            onRefresh: () => _profileController.getUserInfo(),
            child: GetBuilder<ProfileController>(
              builder: (controller) => controller.loading
                  ? const Center(
                      child: CircularProgressIndicator(),
                    )
                  : SingleChildScrollView(
                      child: Column(
                        children: [
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: EditContainer(
                              name: '91'.tr,
                              buttonText: controller.user.photos.isEmpty
                                  ? null
                                  : '92'.tr,
                              icon: Icons.edit,
                              onPressed: () => Get.toNamed('/addPhotos'),
                              child: controller.user.photos.isEmpty
                                  ? Center(
                                      child: IconButton(
                                        onPressed: () =>
                                            Get.toNamed('/addPhotos'),
                                        icon: Column(
                                          children: [
                                            const Icon(
                                              Icons.add_a_photo,
                                              size: 40,
                                            ),
                                            Text(
                                              '89'.tr,
                                              style: Theme.of(context)
                                                  .textTheme
                                                  .bodyLarge,
                                            )
                                          ],
                                        ),
                                      ),
                                    )
                                  : SizedBox(
                                      height: 200,
                                      child: ListView.builder(
                                        shrinkWrap: true,
                                        scrollDirection: Axis.horizontal,
                                        itemCount:
                                            controller.user.photos.length,
                                        itemBuilder: (context, index) {
                                          return Padding(
                                            padding: const EdgeInsets.all(10),
                                            child: Center(
                                              child: CustomImage(
                                                path: controller.user
                                                    .photos[index].photoPath,
                                                token: storage!.read('token'),
                                              ),
                                            ),
                                          );
                                        },
                                      ),
                                    ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: EditContainer(
                              name: '93'.tr,
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  TextComponent(
                                    icon: Icons.abc,
                                    title: '41'.tr,
                                    text: controller.user.name,
                                  ),
                                  TextComponent(
                                    icon: Icons.email,
                                    title: '34'.tr,
                                    text: controller.user.email,
                                  ),
                                  TextComponent(
                                    icon: Icons.phone,
                                    title: '42'.tr,
                                    text: controller.user.phoneNumber,
                                  ),
                                  TextComponent(
                                    icon: FontAwesomeIcons.venusMars,
                                    title: '74'.tr,
                                    text: controller.user.gender,
                                  ),
                                  TextComponent(
                                    icon: Icons.cake,
                                    title: '80'.tr,
                                    text: controller.user.birthDate
                                        .toString()
                                        .split(' ')[0],
                                  ),
                                ],
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: EditContainer(
                              name: '94'.tr,
                              buttonText: '92'.tr,
                              icon: Icons.edit,
                              onPressed: () => Get.toNamed('/editInfo'),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  TextComponent(
                                    icon: Icons.height,
                                    title: '76'.tr,
                                    text:
                                        '${controller.user.height} ${'75'.tr}',
                                  ),
                                  TextComponent(
                                    icon: FontAwesomeIcons.weightScale,
                                    title: '78'.tr,
                                    text:
                                        '${controller.user.weight} ${'77'.tr}',
                                  ),
                                  TextComponent(
                                    icon: Icons.healing,
                                    title: '81'.tr,
                                    text:
                                        ' ${controller.user.illnesses} ?? ${'95'.tr}',
                                  ),
                                  TextComponent(
                                    icon: Icons.sick,
                                    title: '83'.tr,
                                    text:
                                        ' ${controller.user.allergies} ?? ${'95'.tr}',
                                  ),
                                  TextComponent(
                                    icon: Icons.no_food,
                                    title: '85'.tr,
                                    text:
                                        ' ${controller.user.dislikedFoods} ?? ${'95'.tr}',
                                  ),
                                  TextComponent(
                                    icon: Icons.directions_run_rounded,
                                    title: '79'.tr,
                                    text:
                                        ' ${controller.user.activeDays} ${'49'.tr}',
                                  ),
                                ],
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: EditContainer(
                              name: '96'.tr,
                              onPressed: () {},
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  TextComponent(
                                    icon: FontAwesomeIcons.calendarCheck,
                                    title: '46'.tr,
                                    text:
                                        ' ${controller.user.subscriptionPlan?.startDate.toString().split(' ')[0] ?? 'None'}',
                                  ),
                                  TextComponent(
                                    icon: FontAwesomeIcons.calendarXmark,
                                    title: '47'.tr,
                                    text:
                                        ' ${controller.user.subscriptionPlan?.endDate.toString().split(' ')[0] ?? 'None'}',
                                  ),
                                ],
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
