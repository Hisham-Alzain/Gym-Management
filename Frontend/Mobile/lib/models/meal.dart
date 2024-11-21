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
  final double totalCalories; //cal
  final double totalProtein; //g
  final double totalCarbs; //g
  final double totalFat; //g
  final String? thumbnailPath;
  final double quantity;
  final int mealNumber;
  final String details; //specail for user
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
    required this.totalCalories,
    required this.totalProtein,
    required this.totalCarbs,
    required this.totalFat,
    required this.thumbnailPath,
    required this.quantity,
    required this.mealNumber,
    required this.details,
    required this.timeAfter,
  });

  Meal.fromJson(Map<String, dynamic> json)
      : mealId = json['meal_id'] as int,
        id = json['meal']['id'] as int,
        gi = json['meal']['GI']['en'] as String,
        mealName = json['meal']['translations']['en']['meal_name'] as String,
        description =
            json['meal']['translations']['en']['description'] as String,
        caloriesPerGram = double.parse(json['meal']['calories_gram']),
        proteinPerGram = double.parse(json['meal']['protein_gram']),
        carbsPerGram = double.parse(json['meal']['carbs_gram']),
        fatPerGram = double.parse(json['meal']['fat_gram']),
        totalCalories = double.parse(json['meal']['calories_total']),
        totalProtein = double.parse(json['meal']['protein_total']),
        totalCarbs = double.parse(json['meal']['carbs_total']),
        totalFat = double.parse(json['meal']['fat_total']),
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
        totalCalories = 0,
        totalProtein = 0,
        totalCarbs = 0,
        totalFat = 0,
        thumbnailPath = '',
        quantity = 0,
        mealNumber = 0,
        details = '',
        timeAfter = '';
}
