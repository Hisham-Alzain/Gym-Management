import 'package:flutter/material.dart';

class CustomImage extends StatelessWidget {
  final String path;
  final String? token;
  final double? height;
  final double? width;

  const CustomImage({
    super.key,
    required this.path,
    this.token,
    this.height,
    this.width,
  });

  @override
  Widget build(BuildContext context) {
    return Image.network(
      'https://olive-salmon-530757.hostingersite.com/api/image/$path',
      errorBuilder: (context, error, stackTrace) {
        return Text(
          error.toString(),
          style: Theme.of(context).textTheme.bodyLarge,
        );
      },
      height: height,
      width: width,
      fit: BoxFit.fill,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'image/*; charset=UTF-8',
        'Accept': 'image/*,application/json',
        'Connection': 'Keep-Alive',
        'Authorization': 'Bearer $token',
      },
    );
  }
}
