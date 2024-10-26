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

class EditContainer extends StatelessWidget {
  final String? name;
  final Widget? child;
  final void Function()? onPressed;
  final String? buttonText;
  final IconData? icon;
  final double? width;
  final double? height;
  final EdgeInsetsGeometry? padding;

  const EditContainer({
    super.key,
    this.name,
    required this.child,
    this.onPressed,
    this.buttonText,
    this.icon,
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
        borderRadius: BorderRadius.circular(5),
        border: Border.all(
          color: Colors.red.shade900,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(10),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                if (name != null)
                  Text(
                    '$name:',
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                if (buttonText != null)
                  TextButton(
                    onPressed: onPressed,
                    child: Row(
                      children: [
                        Text(
                          buttonText.toString(),
                          style: Theme.of(context).textTheme.labelLarge,
                        ),
                        Padding(
                          padding: const EdgeInsets.all(5),
                          child: Icon(
                            icon,
                          ),
                        ),
                      ],
                    ),
                  ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(10, 0, 10, 10),
            child: child,
          )
        ],
      ),
    );
  }
}

class CircleContainer extends StatelessWidget {
  final Widget? child;

  const CircleContainer({
    super.key,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: const EdgeInsets.all(10),
        padding: const EdgeInsets.all(5),
        alignment: Alignment.center,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border.all(
            color: Colors.red,
            width: 1,
          ),
        ),
        child: child);
  }
}
