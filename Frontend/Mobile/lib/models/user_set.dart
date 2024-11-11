class UserSet {
  final DateTime date;
  final int reps;
  final double repWeight;

  UserSet({
    required this.date,
    required this.reps,
    required this.repWeight,
  });

  UserSet.fromJson(Map<String, dynamic> json)
      : date = DateTime.parse(json['date']),
        reps = json['reps'] as int,
        repWeight = double.parse(json['rep_weight']);
}
