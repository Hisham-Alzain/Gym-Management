import 'package:mobile/models/photo.dart';

class User {
  final int id;
  final String name;
  final String email;
  final String phoneNumber;
  final DateTime birthDate;
  final String gender;
  final double height;
  final double weight;
  final List<Photo> photos;
  final String? illnesses;
  final String? allergies;
  final String? dislikedFoods;
  final int activeDays;
  //TODO: final subscriptionPlan;
  final String role;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.phoneNumber,
    required this.birthDate,
    required this.gender,
    required this.height,
    required this.weight,
    required this.photos,
    required this.illnesses,
    required this.allergies,
    required this.dislikedFoods,
    required this.activeDays,
    required this.role,
  });

  User.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        name = json['name'] as String,
        email = json['email'] as String,
        phoneNumber = json['phone_number'] as String,
        birthDate = DateTime.parse(json['birth_date']),
        gender = json['gender'] as String,
        height = double.parse(json['height'].toString()),
        weight = double.parse(json['weight'].toString()),
        photos = [
          for (var photo in json['photos']) (Photo.fromJson(photo)),
        ],
        illnesses = json['illnesses'] as String?,
        allergies = json['allergies'] as String?,
        dislikedFoods = json['disliked_foods'] as String?,
        activeDays = json['active_days'] as int,
        role = json['role'] as String;
}
