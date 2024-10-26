class Photo {
  final int id;
  final int infoId;
  final String photoPath;

  Photo({
    required this.id,
    required this.infoId,
    required this.photoPath,
  });

  Photo.fromJson(Map<String, dynamic> json)
      : id = json['id'] as int,
        infoId = json['info_id'] as int,
        photoPath = json['photo_path'] as String;
}
