import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/components/text_componenet.dart';
import 'package:mobile/controllers/appControllers/profileControllers/profile_controller.dart';
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
              image: AssetImage('assets/app_background.JPG'),
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
                            child: RedContainer(
                              height: 200,
                              child: IconButton(
                                onPressed: () => Get.toNamed('/addPhotos'),
                                icon: controller.user.photos.isEmpty
                                    ? Column(
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        children: [
                                          const Icon(Icons.add_a_photo),
                                          Text(
                                            'Add photos',
                                            style: Theme.of(context)
                                                .textTheme
                                                .bodyLarge,
                                          )
                                        ],
                                      )
                                    : ListView.builder(
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
                              name: 'Basic Info',
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  ProfileTextComponent(
                                    icon: Icons.abc,
                                    title: 'Name',
                                    text: controller.user.name,
                                  ),
                                  ProfileTextComponent(
                                    icon: Icons.email,
                                    title: 'Email',
                                    text: controller.user.email,
                                  ),
                                  ProfileTextComponent(
                                    icon: Icons.phone,
                                    title: 'Phone number',
                                    text: controller.user.phoneNumber,
                                  ),
                                  ProfileTextComponent(
                                    icon: Icons.male,
                                    title: 'Gender',
                                    text: controller.user.gender,
                                  ),
                                  ProfileTextComponent(
                                    icon: Icons.cake,
                                    title: 'Birthdate',
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
                              name: 'Gym Info',
                              buttonText: 'Edit',
                              icon: Icons.edit,
                              onPressed: () => Get.toNamed('/editInfo'),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  ProfileTextComponent(
                                    icon: Icons.height,
                                    title: 'Height',
                                    text: '${controller.user.height} cm',
                                  ),
                                  ProfileTextComponent(
                                    icon: Icons.monitor_weight,
                                    title: 'Weight',
                                    text: '${controller.user.weight} kg',
                                  ),
                                  ProfileTextComponent(
                                    icon: Icons.healing,
                                    title: 'Illnesses',
                                    text:
                                        ' ${controller.user.illnesses ?? 'None'}',
                                  ),
                                  ProfileTextComponent(
                                    icon: Icons.sick,
                                    title: 'Allergies',
                                    text:
                                        ' ${controller.user.allergies ?? 'None'}',
                                  ),
                                  ProfileTextComponent(
                                    icon: Icons.no_food,
                                    title: 'Disliked foods',
                                    text:
                                        ' ${controller.user.dislikedFoods ?? 'None'}',
                                  ),
                                  ProfileTextComponent(
                                    icon: Icons.directions_run_rounded,
                                    title: 'Active days',
                                    text: ' ${controller.user.activeDays} days',
                                  ),
                                ],
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: EditContainer(
                              name: 'Subscription plan',
                              onPressed: () {},
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  ProfileTextComponent(
                                    icon: Icons.calendar_today,
                                    title: 'Start date',
                                    text:
                                        ' ${controller.user.subscriptionPlan?.startDate.toString().split(' ')[0] ?? 'None'}',
                                  ),
                                  ProfileTextComponent(
                                    icon: Icons.calendar_today,
                                    title: 'End date',
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
