import 'package:flutter/material.dart';

class GreyContainer extends StatelessWidget {
  final Widget? child;
  final double? width;
  final EdgeInsetsGeometry? padding;

  const GreyContainer({
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
