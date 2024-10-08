import 'package:flutter/material.dart';

class RedContainer extends StatelessWidget {
  final Widget? child;
  final double? width;
  final EdgeInsetsGeometry? padding;

  const RedContainer({
    super.key,
    required this.child,
    this.width,
    this.padding,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      padding: padding,
      decoration: BoxDecoration(
        border: Border.all(
          color: Colors.redAccent,
        ),
        borderRadius: const BorderRadius.all(
          Radius.circular(5),
        ),
      ),
      child: child,
    );
  }
}
