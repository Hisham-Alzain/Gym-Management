import 'package:mobile/models/meal.dart';

class DietProgram {
  final int programId;
  final int userId;
  final String userName;
  final DateTime startDate;
  final DateTime endDate;
  final int numberOfMeals;
  final List<Meal> meals;

  DietProgram({
    required this.programId,
    required this.userId,
    required this.userName,
    required this.startDate,
    required this.endDate,
    required this.numberOfMeals,
    required this.meals,
  });

  DietProgram.fromJson(Map<String, dynamic> json)
      : programId = json['program_id'] as int,
        userId = json['user']['id'] as int,
        userName = json['user']['name'] as String,
        startDate = DateTime.parse(json['start_date']),
        endDate = DateTime.parse(json['end_date']),
        numberOfMeals = json['no_meals'] as int,
        meals = [
          for (var meal in json['meals']) (Meal.fromJson(meal)),
        ];
}
