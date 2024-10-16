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
      backgroundColor: Colors.black,
      appBar: AppBar(
        title: const Text('Personal Information'),
      ),
      body: DecoratedBox(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/personal_info_background.JPG'),
            fit: BoxFit.cover,
            alignment: Alignment(0, 2),
          ),
        ),
        child: Form(
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
                    padding: const EdgeInsets.all(5),
                    child: CustomDropDownButton(
                      value: controller.selectedGender,
                      items: controller.genders.entries.map(
                        (gender) {
                          return DropdownMenuItem<String>(
                            value: gender.value,
                            child: Center(
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    gender.key,
                                    style:
                                        Theme.of(context).textTheme.bodyLarge,
                                  ),
                                  Icon(
                                    gender.value == 'MALE'
                                        ? Icons.man
                                        : Icons.woman,
                                  ),
                                ],
                              ),
                            ),
                          );
                        },
                      ).toList(),
                      onChanged: (p0) => controller.selectGender(p0),
                      hintText: 'Gender',
                      hintTcon: Icons.male,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(5),
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
                      hintText: 'Height',
                      hintTcon: Icons.height,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(5),
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
                      hintText: 'Weight',
                      hintTcon: Icons.monitor_weight_outlined,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(5),
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
                      hintText: 'Active Days',
                      hintTcon: Icons.directions_run_rounded,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(5),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        GreyContainer(
                          width: 300,
                          padding: const EdgeInsets.all(10),
                          child: Center(
                            child: GestureDetector(
                              onTap: () => controller.selectDate(context),
                              child: Text(
                                "Birthdate: ${controller.birthdate.toString().split(' ')[0]}",
                                style: Theme.of(context).textTheme.bodyLarge,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Row(
                    children: [
                      Expanded(
                        child: RadioListTile<bool>(
                          title: Text('No illness',
                              style: Theme.of(context).textTheme.bodyLarge),
                          value: false,
                          groupValue: controller.hasIllness,
                          onChanged: (value) => controller.addIllness(value!),
                        ),
                      ),
                      Expanded(
                        child: RadioListTile<bool>(
                          title: Text('Illnesses',
                              style: Theme.of(context).textTheme.bodyLarge),
                          value: true,
                          groupValue: controller.hasIllness,
                          onChanged: (value) => controller.addIllness(value!),
                        ),
                      ),
                    ],
                  ),
                  if (controller.hasIllness)
                    Padding(
                      padding: const EdgeInsets.all(20),
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
                    children: [
                      Expanded(
                        child: RadioListTile<bool>(
                          title: Text('No Allergies',
                              style: Theme.of(context).textTheme.bodyLarge),
                          value: false,
                          groupValue: controller.hasAllergies,
                          onChanged: (value) => controller.addAllergies(value!),
                        ),
                      ),
                      Expanded(
                        child: RadioListTile<bool>(
                          title: Text('Allergies',
                              style: Theme.of(context).textTheme.bodyLarge),
                          value: true,
                          groupValue: controller.hasAllergies,
                          onChanged: (value) => controller.addAllergies(value!),
                        ),
                      ),
                    ],
                  ),
                  if (controller.hasAllergies)
                    Padding(
                      padding: const EdgeInsets.all(20),
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
                    children: [
                      Expanded(
                        child: RadioListTile<bool>(
                          title: Text('No disliked foods',
                              style: Theme.of(context).textTheme.bodyLarge),
                          value: false,
                          groupValue: controller.hasDislikedFood,
                          onChanged: (value) =>
                              controller.addDislikedFood(value!),
                        ),
                      ),
                      Expanded(
                        child: RadioListTile<bool>(
                          title: Text('Disliked foods',
                              style: Theme.of(context).textTheme.bodyLarge),
                          value: true,
                          groupValue: controller.hasDislikedFood,
                          onChanged: (value) =>
                              controller.addDislikedFood(value!),
                        ),
                      ),
                    ],
                  ),
                  if (controller.hasDislikedFood)
                    Padding(
                      padding: const EdgeInsets.all(20),
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
                  OutlinedButton(
                    onPressed: () {
                      if (controller.formField.currentState?.validate() ==
                          true) {
                        controller.addPersonalInfo(
                          controller.birthdate,
                          controller.selectedGender.toString(),
                          controller.selectedHeight!.toDouble(),
                          controller.selectedWeight!.toDouble(),
                          controller.illnessController.text,
                          controller.allergiesController.text,
                          controller.dislikedFoodController.text,
                          controller.activeDays!.toInt(),
                        );
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
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
