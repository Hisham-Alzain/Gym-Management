import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/appControllers/add_photos_controller.dart';

class AddPhotosView extends StatelessWidget {
  final AddPhotosController _addPhotosController =
      Get.put(AddPhotosController());

  AddPhotosView({super.key});

  @override
  Widget build(BuildContext context) {
    int current = 0;
    return Scaffold(
      appBar: AppBar(
        actions: [
          IconButton(
            onPressed: () => Get.offAllNamed('/home'),
            icon: Text(
              'Skip',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: GetBuilder<AddPhotosController>(
          builder: (controller) => Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(10),
                child: Text(
                  'Please add 5 photos as shown below',
                  style: Theme.of(context).textTheme.headlineSmall,
                ),
              ),
              CarouselSlider(
                options: CarouselOptions(
                  aspectRatio: 1,
                  enlargeCenterPage: true,
                  onPageChanged: (index, reason) {
                    current = index;
                    controller.update();
                  },
                ),
                items: controller.images.isEmpty
                    ? controller.modelImages
                    : controller.displayImages,
              ),
              SizedBox(
                height: 50,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  shrinkWrap: true,
                  itemCount: controller.images.isEmpty
                      ? controller.modelImages.length
                      : controller.displayImages.length,
                  itemBuilder: (context, index) {
                    return Container(
                      width: 10,
                      height: 10,
                      margin: const EdgeInsets.all(5),
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: Colors.white.withOpacity(
                          current == index ? 0.9 : 0.5,
                        ),
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
                            style: Theme.of(context).textTheme.labelLarge,
                          )
                        ],
                      ),
                    ),
                    ElevatedButton(
                      onPressed: () => controller.removePhotos(),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(
                            Icons.delete,
                          ),
                          Text(
                            'Delete Photos',
                            style: Theme.of(context).textTheme.labelLarge,
                          )
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              if (controller.images.isNotEmpty)
                Padding(
                  padding: const EdgeInsets.all(10),
                  child: OutlinedButton(
                    onPressed: () {},
                    child: const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Submit',
                        ),
                        Icon(Icons.arrow_forward_ios),
                      ],
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
