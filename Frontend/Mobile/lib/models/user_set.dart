class UserSet {
  final DateTime date;
  final int reps;
  final int repWeight;

  UserSet({
    required this.date,
    required this.reps,
    required this.repWeight,
  });

  UserSet.fromJson(Map<String, dynamic> json)
      : date = DateTime.parse(json['date']),
        reps = json['reps'] as int,
        repWeight = json['rep_weight'] as int;
}
