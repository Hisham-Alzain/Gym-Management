class SubscriptionPlan {
  final int userId;
  final String userName;
  final DateTime startDate;
  final DateTime endDate;

  SubscriptionPlan({
    required this.userId,
    required this.userName,
    required this.startDate,
    required this.endDate,
  });

  SubscriptionPlan.fromJson(Map<String, dynamic> json)
      : userId = json['user_id'] as int,
        userName = json['user_name'] as String,
        startDate = DateTime.parse(json['start_date']),
        endDate = DateTime.parse(json['end_date']);
}
