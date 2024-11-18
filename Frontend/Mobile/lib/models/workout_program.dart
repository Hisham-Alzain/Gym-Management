import 'package:mobile/models/day.dart';

class WorkoutProgram {
  final int programId;
  final int userId;
  final String userName;
  final DateTime startDate;
  final DateTime endDate;
  final int repeatDays;
  final int numberOfDays;
  final List<Day> days;

  WorkoutProgram({
    required this.programId,
    required this.userId,
    required this.userName,
    required this.startDate,
    required this.endDate,
    required this.repeatDays,
    required this.numberOfDays,
    required this.days,
  });

  WorkoutProgram.fromJson(Map<String, dynamic> json)
      : programId = json['program_id'] as int,
        userId = json['user']['id'] as int,
        userName = json['user']['name'] as String,
        startDate = DateTime.parse(json['start_date']),
        endDate = DateTime.parse(json['end_date']),
        repeatDays = json['repeat_days'] as int,
        numberOfDays = json['no_days'] as int,
        days = [
          for (var day in json['days']) (Day.fromJson(day)),
        ];
}
