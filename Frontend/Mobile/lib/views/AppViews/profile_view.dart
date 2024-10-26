import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/customWidgets/custom_containers.dart';

class ProfileView extends StatelessWidget {
  const ProfileView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: DecoratedBox(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/app_background.JPG'),
            fit: BoxFit.cover,
            alignment: Alignment(0, 2),
          ),
        ),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(10),
              child: RedContainer(
                height: 200,
                width: 200,
                child: IconButton(
                  onPressed: () => Get.toNamed('/addPhotos'),
                  icon: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.add_a_photo),
                      Text(
                        'Add photos',
                        style: Theme.of(context).textTheme.bodyLarge,
                      )
                    ],
                  ),
                ),
              ),
            ),
            const Padding(
              padding: EdgeInsets.all(10),
              child: EditContainer(
                name: 'Basic Info',
                child: Center(),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(10),
              child: EditContainer(
                name: 'Gym Info',
                buttonText: 'Edit',
                icon: Icons.edit,
                onPressed: () {},
                child: Center(),
              ),
            )
          ],
        ),
      ),
    );
  }
}
