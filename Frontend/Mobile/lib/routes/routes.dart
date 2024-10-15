import 'package:get/get.dart';
import 'package:mobile/middleware/middleware.dart';
import 'package:mobile/views/AppViews/home_view.dart';
import 'package:mobile/views/AppViews/personal_info_view.dart';
import 'package:mobile/views/authViews/auth_view.dart';
import 'package:mobile/views/authViews/login_view.dart';
import 'package:mobile/views/authViews/register_view.dart';

List<GetPage<dynamic>>? getPages = [
  GetPage(
    name: '/auth',
    page: () => const AuthView(),
    middlewares: [Middleware()],
  ),
  GetPage(
    name: '/login',
    page: () => LoginView(),
  ),
  GetPage(
    name: '/register',
    page: () => RegisterView(),
  ),
  GetPage(
    name: '/personalInfo',
    page: () => PersonalInfoView(),
  ),
  GetPage(
    name: '/home',
    page: () => const HomeView(),
  ),
];
