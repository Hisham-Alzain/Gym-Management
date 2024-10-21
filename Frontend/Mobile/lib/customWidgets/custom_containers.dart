import 'package:flutter/material.dart';

class RedContainer extends StatelessWidget {
  final Widget? child;
  final double? width;
  final double? height;
  final EdgeInsetsGeometry? padding;

  const RedContainer({
    super.key,
    required this.child,
    this.width,
    this.height,
    this.padding,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,
      padding: padding,
      decoration: BoxDecoration(
        color: Colors.grey.shade900,
        border: Border.all(
          color: Colors.red.shade900,
        ),
        borderRadius: const BorderRadius.all(
          Radius.circular(5),
        ),
      ),
      child: child,
    );
  }
}
