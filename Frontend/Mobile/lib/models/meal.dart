import 'package:get/get.dart';

class Meal {
  final int mealId;
  final int id;
  final String gi;
  final String mealName;
  final String description;
  final double caloriesPerGram; // cal
  final double proteinPerGram; //g
  final double carbsPerGram; //g
  final double fatPerGram; //g
  final double calciumPerGram; //g
  final double sodiumPerGram; //g
  final double totalCalories; //cal
  final double totalProtein; //g
  final double totalCarbs; //g
  final double totalFat; //g
  final double totalCalcium; //g
  final double totalSodium; //g
  final String? thumbnailPath;
  final double quantity;
  final int mealNumber;
  final String? details; //special for user
  final String timeAfter;

  Meal({
    required this.mealId,
    required this.id,
    required this.gi,
    required this.mealName,
    required this.description,
    required this.caloriesPerGram,
    required this.proteinPerGram,
    required this.carbsPerGram,
    required this.fatPerGram,
    required this.calciumPerGram,
    required this.sodiumPerGram,
    required this.totalCalories,
    required this.totalProtein,
    required this.totalCarbs,
    required this.totalFat,
    required this.totalCalcium,
    required this.totalSodium,
    required this.thumbnailPath,
    required this.quantity,
    required this.mealNumber,
    required this.details,
    required this.timeAfter,
  });

  Meal.fromJson(Map<String, dynamic> json)
      : mealId = json['meal_id'] as int,
        id = json['meal']['id'] as int,
        gi = json['meal']['GI']['1'.tr] as String,
        mealName = json['meal']['translations']['1'.tr]['meal_name'] as String,
        description =
            json['meal']['translations']['1'.tr]['description'] as String,
        caloriesPerGram = double.parse(json['meal']['calories_gram']),
        proteinPerGram = double.parse(json['meal']['protein_gram']),
        carbsPerGram = double.parse(json['meal']['carbs_gram']),
        fatPerGram = double.parse(json['meal']['fat_gram']),
        calciumPerGram = double.parse(json['meal']['Ca_gram']),
        sodiumPerGram = double.parse(json['meal']['Na_gram']),
        totalCalories = double.parse(json['meal']['calories_total']),
        totalProtein = double.parse(json['meal']['protein_total']),
        totalCarbs = double.parse(json['meal']['carbs_total']),
        totalFat = double.parse(json['meal']['fat_total']),
        totalCalcium = double.parse(json['meal']['Ca_total']),
        totalSodium = double.parse(json['meal']['Na_total']),
        thumbnailPath = json['meal']['thumbnail_path'] as String,
        quantity = double.parse(json['meal']['quantity']),
        mealNumber = json['meal']['meal_number'] as int,
        details = json['meal']['details'] as String,
        timeAfter = json['meal']['time_after'] as String;

  Meal.empty()
      : mealId = 0,
        id = 0,
        gi = '',
        mealName = '',
        description = '',
        caloriesPerGram = 0,
        proteinPerGram = 0,
        carbsPerGram = 0,
        fatPerGram = 0,
        calciumPerGram = 0,
        sodiumPerGram = 0,
        totalCalories = 0,
        totalProtein = 0,
        totalCarbs = 0,
        totalFat = 0,
        totalCalcium = 0,
        totalSodium = 0,
        thumbnailPath = '',
        quantity = 0,
        mealNumber = 0,
        details = '',
        timeAfter = '';
}
