class UserSet {
  final DateTime date;
  final int reps;
  final int restTime;
  final double repWeight;

  UserSet({
    required this.date,
    required this.reps,
    required this.restTime,
    required this.repWeight,
  });

  UserSet.fromJson(Map<String, dynamic> json)
      : date = DateTime.parse(json['date']),
        reps = json['reps'] as int,
        restTime = json['rest_time'] as int,
        repWeight = double.parse(json['rep_weight']);
}
