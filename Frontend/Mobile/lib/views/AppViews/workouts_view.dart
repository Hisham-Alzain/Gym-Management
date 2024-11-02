import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:mobile/components/text_componenet.dart';

class WorkoutsView extends StatelessWidget {
  const WorkoutsView({super.key});

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
          child: ListView.builder(
            shrinkWrap: true,
            itemCount: 2,
            itemBuilder: (context, index) {
              return GestureDetector(
                onTap: () => print('gg'),
                child: Card(
                  child: Padding(
                    padding: const EdgeInsets.all(10),
                    child: Row(
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Program ${index + 1}:',
                                style: Theme.of(context).textTheme.titleLarge,
                              ),
                              const TextComponent(
                                icon: FontAwesomeIcons.calendarCheck,
                                title: 'Start date',
                                text: '3/3/2003',
                              ),
                              const TextComponent(
                                icon: FontAwesomeIcons.calendarXmark,
                                title: 'End date',
                                text: '3/3/2003',
                              ),
                              const TextComponent(
                                icon: FontAwesomeIcons.repeat,
                                title: 'Repeat days',
                                text: '3',
                              ),
                            ],
                          ),
                        ),
                        const Icon(
                          Icons.arrow_forward_ios,
                          size: 40,
                        )
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}
