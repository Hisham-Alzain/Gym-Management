import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/appControllers/personal_info_controller.dart';
import 'package:mobile/customWidgets/custom_drop_down_button.dart';

class PersonalInfoView extends StatelessWidget {
  final PersonalInfoController _personalInfoController =
      Get.put(PersonalInfoController());

  PersonalInfoView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Personal Information'),
      ),
      body: Form(
        key: _personalInfoController.formField,
        child: GetBuilder<PersonalInfoController>(
          builder: (controller) => Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(10),
                child: Text(
                  'All informatiom below is required',
                  style: Theme.of(context).textTheme.headlineSmall,
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: CustomDropDownButton(
                  value: controller.selectedGender,
                  items: controller.genders.entries.map(
                    (entry) {
                      return DropdownMenuItem<String>(
                        value: entry.value,
                        child: Center(
                          child: Text(
                            entry.key,
                            style: Theme.of(context).textTheme.bodyLarge,
                          ),
                        ),
                      );
                    },
                  ).toList(),
                  onChanged: (p0) => controller.selectGender(p0),
                  hint: 'Gender',
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: CustomDropDownButton(
                  value: controller.selectedHeight,
                  items: controller.cmList
                      .map(
                        (cm) => DropdownMenuItem<int>(
                          value: cm,
                          child: Center(
                            child: Text(
                              '$cm cm',
                              style: Theme.of(context).textTheme.bodyLarge,
                            ),
                          ),
                        ),
                      )
                      .toList(),
                  onChanged: (p0) => controller.selectHeight(p0),
                  hint: 'Height',
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: CustomDropDownButton(
                  value: controller.selectedWeight,
                  items: controller.kgList
                      .map(
                        (kg) => DropdownMenuItem<int>(
                          value: kg,
                          child: Center(
                            child: Text(
                              '$kg kg',
                              style: Theme.of(context).textTheme.bodyLarge,
                            ),
                          ),
                        ),
                      )
                      .toList(),
                  onChanged: (p0) => controller.selectWeight(p0),
                  hint: 'Weight',
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: OutlinedButton(
                  onPressed: () {
                    if (controller.formField.currentState?.validate() == true) {
                      Get.toNamed('/auth');
                    }
                  },
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
