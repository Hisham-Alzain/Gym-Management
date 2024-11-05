import 'package:flutter/material.dart';

class TextComponent extends StatelessWidget {
  final IconData? icon;
  final String title;
  final String text;

  const TextComponent({
    super.key,
    this.icon,
    required this.title,
    required this.text,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        if (icon != null)
          Icon(
            icon,
            size: 30,
          ),
        Padding(
          padding: const EdgeInsets.all(5),
          child: Text(
            '$title: ',
            style: Theme.of(context).textTheme.labelLarge,
          ),
        ),
        Flexible(
          child: Text(
            text,
            style: Theme.of(context).textTheme.bodyLarge,
          ),
        ),
      ],
    );
  }
}

class OpacityTextComponent extends StatelessWidget {
  final String text;

  const OpacityTextComponent({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: Theme.of(context).textTheme.bodyLarge?.copyWith(
            color: Colors.white.withOpacity(0.5),
          ),
    );
  }
}
