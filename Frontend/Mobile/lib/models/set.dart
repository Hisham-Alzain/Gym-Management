import 'package:mobile/models/user_set.dart';

class Sets {
  final int setId;
  final int setNumber;
  final int expectedReps;
  final List<UserSet> userSets;

  Sets({
    required this.setId,
    required this.setNumber,
    required this.expectedReps,
    required this.userSets,
  });

  Sets.fromJson(Map<String, dynamic> json)
      : setId = json['set_id'] as int,
        setNumber = json['set_number'] as int,
        expectedReps = json['expected-reps'] as int,
        userSets = [
          for (var userSet in json['user_sets']) (UserSet.fromJson(userSet)),
        ];
}
