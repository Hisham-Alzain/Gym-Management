import 'package:get/get.dart';
import 'package:mobile/views/authViews/auth_view.dart';
import 'package:mobile/views/authViews/login_view.dart';
import 'package:mobile/views/authViews/register_view.dart';

List<GetPage<dynamic>>? getPages = [
  GetPage(
    name: '/auth',
    page: () => const AuthView(),
  ),
  GetPage(
    name: '/login',
    page: () => LoginView(),
  ),
  GetPage(
    name: '/register',
    page: () => RegisterView(),
  ),
];
