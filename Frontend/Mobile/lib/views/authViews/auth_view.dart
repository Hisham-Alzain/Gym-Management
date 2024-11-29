import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/views/authViews/login_view.dart';
import 'package:mobile/views/authViews/register_view.dart';

class AuthView extends StatelessWidget {
  const AuthView({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: DefaultTabController(
        length: 2,
        initialIndex: 0,
        child: Scaffold(
          bottomNavigationBar: TabBar(
            tabs: <Widget>[
              Tab(
                icon: const Icon(
                  Icons.login,
                ),
                text: '25'.tr,
              ),
              Tab(
                icon: const Icon(
                  Icons.group_add,
                ),
                text: '26'.tr,
              ),
            ],
          ),
          backgroundColor: Colors.black,
          body: TabBarView(
            children: [
              LoginView(),
              RegisterView(),
            ],
          ),
        ),
      ),
    );
  }
}
