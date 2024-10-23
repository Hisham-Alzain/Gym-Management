import 'package:flutter/material.dart';

class MenuListTile extends StatelessWidget {
  final String title;
  final IconData icon;
  final void Function()? onTap;

  const MenuListTile({
    super.key,
    required this.title,
    required this.icon,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Row(
        children: [
          Text(
            title,
            style: Theme.of(context).textTheme.bodyLarge,
          ),
        ],
      ),
      leading: Icon(
        icon,
        color: Colors.red.shade900,
      ),
      onTap: onTap,
    );
  }
}
