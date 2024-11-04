import 'package:mobile/models/set.dart';

class Exercise {
  final int exerciseId;
  final int id;
  final String name;
  final String muscle;
  final String description;
  final int numberOfSets;
  final List<Sets> sets;
  final String? videoPath;
  final String? thumbnailPath;

  Exercise({
    required this.exerciseId,
    required this.id,
    required this.name,
    required this.muscle,
    required this.description,
    required this.numberOfSets,
    required this.sets,
    required this.videoPath,
    required this.thumbnailPath,
  });

  Exercise.fromJson(Map<String, dynamic> json)
      : exerciseId = json['exercise_id'] as int,
        id = json['exercise']['id'] as int,
        name = json['exercise']['name'] as String,
        muscle = json['exercise']['muscle'] as String,
        description = json['exercise']['description'] as String,
        numberOfSets = json['exercise']['no_sets'] as int,
        sets = [
          for (var sets in json['exercise']['sets']) (Sets.fromJson(sets)),
        ],
        videoPath = json['exercise']['video_path'],
        thumbnailPath = json['exercise']['thumbnail_path'];
}
