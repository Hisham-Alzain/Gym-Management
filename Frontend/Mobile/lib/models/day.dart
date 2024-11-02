class Day {
  final int dayId;
  final String muscle;

  Day({
    required this.dayId,
    required this.muscle,
  });

  Day.fromJson(Map<String, dynamic> json)
      : dayId = json['day_id'] as int,
        muscle = json['muscle'] as String;
}
