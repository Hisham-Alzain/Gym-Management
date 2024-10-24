import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/appControllers/home_controller.dart';
import 'package:mobile/customWidgets/custom_list_tiles.dart';
import 'package:mobile/views/AppViews/profile_view.dart';

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
        bottomNavigationBar: Padding(
          padding: const EdgeInsets.all(2),
          child: TabBar(
            tabs: <Widget>[
              const Tab(
                icon: Icon(
                  Icons.fitness_center,
                ),
                text: 'Workouts',
              ),
              const Tab(
                icon: Icon(
                  Icons.fastfood,
                ),
                text: 'Food',
              ),
              Tab(
                icon: const Icon(
                  Icons.person,
                ),
                text: 'Profile'.tr,
              ),
            ],
          ),
        ),
        body: const TabBarView(
          children: [
            Scaffold(),
            Scaffold(),
            ProfileView(),
          ],
        ),
      ),
    );
  }
}
