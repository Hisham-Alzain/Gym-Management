import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/profileControllers/add_info_controller.dart';
import 'package:mobile/customWidgets/custom_containers.dart';
import 'package:mobile/customWidgets/custom_drop_down_button.dart';
import 'package:mobile/customWidgets/custom_radio_button.dart';
import 'package:mobile/customWidgets/custom_text_field.dart';
import 'package:mobile/customWidgets/custom_validation.dart';

class AddInfoView extends StatelessWidget {
  final AddInfoController _personalInfoController =
      Get.put(AddInfoController());

  AddInfoView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        title: const Text('Add Information'),
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
          key: _personalInfoController.personalInfoForm,
          child: GetBuilder<AddInfoController>(
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
                      hintTcon: FontAwesomeIcons.venusMars,
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
                      hintTcon: FontAwesomeIcons.weightScale,
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
                        RedContainer(
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
                        child: CustomRadioButton(
                          text: 'No illness',
                          value: false,
                          groupValue: controller.hasIllness,
                          onChanged: (p0) => controller.addIllness(p0!),
                        ),
                      ),
                      Expanded(
                        child: CustomRadioButton(
                          text: 'Illnesses',
                          value: true,
                          groupValue: controller.hasIllness,
                          onChanged: (p0) => controller.addIllness(p0!),
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
                        child: CustomRadioButton(
                          text: 'No allergies',
                          value: false,
                          groupValue: controller.hasAllergies,
                          onChanged: (p0) => controller.addAllergies(p0!),
                        ),
                      ),
                      Expanded(
                        child: CustomRadioButton(
                          text: 'Allergies',
                          value: true,
                          groupValue: controller.hasAllergies,
                          onChanged: (p0) => controller.addAllergies(p0!),
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
                        child: CustomRadioButton(
                          text: 'No disliked foods',
                          value: false,
                          groupValue: controller.hasDislikedFood,
                          onChanged: (p0) => controller.addDislikedFood(p0!),
                        ),
                      ),
                      Expanded(
                        child: CustomRadioButton(
                          text: 'Disliked foods',
                          value: true,
                          groupValue: controller.hasDislikedFood,
                          onChanged: (p0) => controller.addDislikedFood(p0!),
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
                      if (controller.personalInfoForm.currentState
                              ?.validate() ==
                          true) {
                        controller.addInfo(
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
