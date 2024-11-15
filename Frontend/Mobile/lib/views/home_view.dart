import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/home_controller.dart';
import 'package:mobile/customWidgets/custom_list_tiles.dart';
import 'package:mobile/views/dietViews/diets_view.dart';
import 'package:mobile/views/profileViews/profile_view.dart';
import 'package:mobile/views/workoutViews/workouts_view.dart';

class HomeView extends StatelessWidget {
  final HomeController _homeController = Get.put(HomeController());
  HomeView({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      initialIndex: 0,
      child: Scaffold(
        appBar: AppBar(),
        drawer: SafeArea(
          child: Drawer(
            child: ListView(
              children: [
                MenuListTile(
                  title: 'Settings',
                  icon: Icons.settings,
                  onTap: () {},
                ),
                MenuListTile(
                  title: 'Logout',
                  icon: Icons.logout,
                  onTap: () => _homeController.customDialogs.showLogoutDialog(
                    () => _homeController.logout(),
                  ),
                ),
              ],
            ),
          ),
        ),
        bottomNavigationBar: const Padding(
          padding: EdgeInsets.all(2),
          child: TabBar(
            tabs: <Widget>[
              Tab(
                icon: Icon(
                  FontAwesomeIcons.dumbbell,
                ),
                text: 'Workouts',
              ),
              Tab(
                icon: Icon(
                  Icons.fastfood,
                ),
                text: 'Diet',
              ),
              Tab(
                icon: Icon(
                  Icons.person,
                ),
                text: 'Profile',
              ),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            WorkoutsView(),
            DietsView(),
            ProfileView(),
          ],
        ),
      ),
    );
  }
}
