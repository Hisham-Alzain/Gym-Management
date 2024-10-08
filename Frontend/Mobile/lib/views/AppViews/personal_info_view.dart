import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/appControllers/personal_info_controller.dart';
import 'package:mobile/customWidgets/custom_containers.dart';
import 'package:mobile/customWidgets/custom_drop_down_button.dart';
import 'package:mobile/customWidgets/custom_text_field.dart';
import 'package:mobile/customWidgets/custom_validation.dart';

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
          builder: (controller) => SingleChildScrollView(
            child: Column(
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
                          (cm) => DropdownMenuItem<double>(
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
                          (kg) => DropdownMenuItem<double>(
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
                  child: CustomDropDownButton(
                    value: controller.activeDays,
                    items: controller.daysList
                        .map(
                          (day) => DropdownMenuItem<int>(
                            value: day,
                            child: Center(
                              child: Text(
                                '$day Days',
                                style: Theme.of(context).textTheme.bodyLarge,
                              ),
                            ),
                          ),
                        )
                        .toList(),
                    onChanged: (p0) => controller.selectDay(p0),
                    hint: 'Active Days',
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Select birthdate:',
                      style: Theme.of(context).textTheme.bodyLarge,
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10),
                      child: RedContainer(
                        padding: const EdgeInsets.all(5),
                        child: GestureDetector(
                          onTap: () => controller.selectDate(context),
                          child: Text(
                            "${controller.birthdate}".split(' ')[0],
                            style: Theme.of(context).textTheme.bodyLarge,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    RadioMenuButton(
                      value: false,
                      groupValue: controller.hasIllness,
                      onChanged: (value) => controller.addIllness(value!),
                      child: Text(
                        'No illness',
                        style: Theme.of(context).textTheme.bodyLarge,
                      ),
                    ),
                    RadioMenuButton(
                      value: true,
                      groupValue: controller.hasIllness,
                      onChanged: (value) => controller.addIllness(value!),
                      child: Text(
                        'illnesses',
                        style: Theme.of(context).textTheme.bodyLarge,
                      ),
                    ),
                  ],
                ),
                if (controller.hasIllness)
                  Padding(
                    padding: const EdgeInsets.fromLTRB(50, 0, 50, 0),
                    child: CustomTextField(
                      controller: controller.illnessController,
                      textInputType: TextInputType.multiline,
                      obsecureText: false,
                      icon: Icons.healing,
                      labelText: 'Illnesses',
                      validator: (p0) =>
                          CustomValidation().validateRequiredField(p0),
                    ),
                  ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    RadioMenuButton(
                      value: false,
                      groupValue: controller.hasAllergies,
                      onChanged: (value) => controller.addAllergies(value!),
                      child: Text(
                        'No Allergies',
                        style: Theme.of(context).textTheme.bodyLarge,
                      ),
                    ),
                    RadioMenuButton(
                      value: true,
                      groupValue: controller.hasAllergies,
                      onChanged: (value) => controller.addAllergies(value!),
                      child: Text(
                        'Allergies',
                        style: Theme.of(context).textTheme.bodyLarge,
                      ),
                    ),
                  ],
                ),
                if (controller.hasAllergies)
                  Padding(
                    padding: const EdgeInsets.fromLTRB(50, 0, 50, 0),
                    child: CustomTextField(
                      controller: controller.allergiesController,
                      textInputType: TextInputType.multiline,
                      obsecureText: false,
                      icon: Icons.sick,
                      labelText: 'Allergies',
                      validator: (p0) =>
                          CustomValidation().validateRequiredField(p0),
                    ),
                  ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    RadioMenuButton(
                      value: false,
                      groupValue: controller.hasDislikedFood,
                      onChanged: (value) => controller.addDislikedFood(value!),
                      child: Text(
                        'No disliked foods',
                        style: Theme.of(context).textTheme.bodyLarge,
                      ),
                    ),
                    RadioMenuButton(
                      value: true,
                      groupValue: controller.hasDislikedFood,
                      onChanged: (value) => controller.addDislikedFood(value!),
                      child: Text(
                        'Disliked foods',
                        style: Theme.of(context).textTheme.bodyLarge,
                      ),
                    ),
                  ],
                ),
                if (controller.hasDislikedFood)
                  Padding(
                    padding: const EdgeInsets.fromLTRB(50, 0, 50, 0),
                    child: CustomTextField(
                      controller: controller.dislikedFoodController,
                      textInputType: TextInputType.multiline,
                      obsecureText: false,
                      icon: Icons.no_food,
                      labelText: 'Disliked Foods',
                      validator: (p0) =>
                          CustomValidation().validateRequiredField(p0),
                    ),
                  ),
                Padding(
                  padding: const EdgeInsets.all(10),
                  child: OutlinedButton(
                    onPressed: () {
                      if (controller.formField.currentState?.validate() ==
                          true) {}
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
      ),
    );
  }
}
