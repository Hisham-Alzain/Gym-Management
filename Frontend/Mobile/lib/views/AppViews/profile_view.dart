import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
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
                child: Column(
                  children: [
                    //TODO:add button if there is no photos
                    CarouselSlider(
                      options: CarouselOptions(autoPlay: true),
                      items: [
                        Image.asset('assets/general_background.jpg'),
                        Image.asset('assets/general_background.jpg'),
                        Image.asset('assets/general_background.jpg'),
                        Image.asset('assets/general_background.jpg'),
                        Image.asset('assets/general_background.jpg'),
                      ],
                    ),
                  ],
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
            const Padding(
              padding: EdgeInsets.all(10),
              child: EditContainer(
                name: 'Gym Info',
                child: Center(),
              ),
            )
          ],
        ),
      ),
    );
  }
}
