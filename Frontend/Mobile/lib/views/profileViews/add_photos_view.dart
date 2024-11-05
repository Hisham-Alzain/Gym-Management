import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/profileControllers/add_photos_controller.dart';
import 'package:mobile/customWidgets/custom_containers.dart';

class AddPhotosView extends StatelessWidget {
  final AddPhotosController _addPhotosController =
      Get.put(AddPhotosController());

  AddPhotosView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: [
          if (_addPhotosController.generalController.inRegister)
            IconButton(
              onPressed: () => _addPhotosController.skipAddingPhotos(),
              icon: Text(
                'Skip',
                style: Theme.of(context).textTheme.bodyLarge,
              ),
            ),
        ],
      ),
      body: SizedBox(
        height: Get.height,
        width: Get.width,
        child: DecoratedBox(
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/personal_info_background.JPG'),
              fit: BoxFit.cover,
            ),
          ),
          child: RefreshIndicator(
            key: _addPhotosController.refreshIndicatorKey,
            onRefresh: () => _addPhotosController.getPhotos(),
            child: GetBuilder<AddPhotosController>(
              builder: (controller) => controller.loading
                  ? const Center(
                      child: CircularProgressIndicator(),
                    )
                  : SingleChildScrollView(
                      child: Column(
                        children: [
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: Text(
                              'Please add up to 5 photos as shown below',
                              style: Theme.of(context).textTheme.headlineSmall,
                            ),
                          ),
                          SizedBox(
                            height: 500,
                            child: ListView.builder(
                              scrollDirection: Axis.horizontal,
                              itemCount: controller.displayPhotos.isEmpty
                                  ? controller.modelPhotos.length
                                  : controller.displayPhotos.length,
                              itemBuilder: (context, index) {
                                return Padding(
                                  padding: const EdgeInsets.all(10),
                                  child: Column(
                                    children: [
                                      RedContainer(
                                        height: 400,
                                        width: 200,
                                        child: controller.displayPhotos.isEmpty
                                            ? controller.modelPhotos[index]
                                            : controller.displayPhotos[index],
                                      ),
                                      CircleContainer(
                                        child: Text(
                                          (index + 1).toString(),
                                          style: Theme.of(context)
                                              .textTheme
                                              .labelLarge,
                                        ),
                                      )
                                    ],
                                  ),
                                );
                              },
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(10),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                ElevatedButton(
                                  onPressed: () => controller.addPhotos(),
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      const Icon(
                                        Icons.add_a_photo,
                                      ),
                                      Text(
                                        'Add Photos',
                                        style: Theme.of(context)
                                            .textTheme
                                            .labelLarge,
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                          if (controller.selectedPhotos.isNotEmpty)
                            Padding(
                              padding: const EdgeInsets.all(10),
                              child: OutlinedButton(
                                onPressed: () => controller.uploadPhotos(),
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text(
                                      'Submit',
                                      style: Theme.of(context)
                                          .textTheme
                                          .labelLarge,
                                    ),
                                    const Icon(Icons.arrow_forward_ios),
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
