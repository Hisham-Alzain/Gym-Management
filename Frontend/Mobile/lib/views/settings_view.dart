import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/settings_controller.dart';
import 'package:mobile/customWidgets/custom_drop_down_button.dart';
import 'package:mobile/customWidgets/custom_list_tiles.dart';

class SettingsView extends StatelessWidget {
  const SettingsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('109'.tr),
      ),
      body: DecoratedBox(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/app_photos/general_background.jpg'),
            fit: BoxFit.cover,
          ),
        ),
        child: GetBuilder<SettingsController>(
          builder: (controller) => Center(
            child: ListView(
              physics: const NeverScrollableScrollPhysics(),
              children: [
                Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: Text(
                        '114'.tr,
                        style: Theme.of(context).textTheme.headlineSmall,
                      ),
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        SettingsListTile(
                          title: '115'.tr,
                          icon: Icons.language,
                        ),
                        CustomDropDownButton(
                          value: controller.selectedLang,
                          items: controller.langs.entries.map((entry) {
                            return DropdownMenuItem<String>(
                              value: entry.value,
                              child: Center(
                                child: Text(
                                  entry.key,
                                  style: Theme.of(context).textTheme.bodyLarge,
                                ),
                              ),
                            );
                          }).toList(),
                          onChanged: (p0) async =>
                              await controller.changeLang(p0),
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
