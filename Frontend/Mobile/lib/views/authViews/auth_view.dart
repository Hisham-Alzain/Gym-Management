import 'package:flutter/material.dart';
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
          backgroundColor: Colors.black,
          appBar: const TabBar(
            tabs: <Widget>[
              Tab(
                icon: Icon(
                  Icons.login,
                ),
                text: 'Login',
              ),
              Tab(
                icon: Icon(
                  Icons.group_add,
                ),
                text: 'Register',
              ),
            ],
          ),
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
