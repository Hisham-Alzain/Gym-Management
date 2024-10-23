import 'package:get/get.dart';
import 'package:mobile/middleware/middleware.dart';
import 'package:mobile/views/AppViews/add_photos_view.dart';
import 'package:mobile/views/AppViews/home_view.dart';
import 'package:mobile/views/AppViews/personal_info_view.dart';
import 'package:mobile/views/AppViews/profile_view.dart';
import 'package:mobile/views/authViews/auth_view.dart';
import 'package:mobile/views/authViews/change_password_view.dart';
import 'package:mobile/views/authViews/forgot_passwrod_view.dart';
import 'package:mobile/views/authViews/login_view.dart';
import 'package:mobile/views/authViews/register_view.dart';
import 'package:mobile/views/splash_screen.dart';

List<GetPage<dynamic>>? getPages = [
  GetPage(
    name: '/splashScreen',
    page: () => const SplashScreen(),
    middlewares: [Middleware()],
  ),
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
  GetPage(
    name: '/forgotPassword',
    page: () => ForgotPasswordView(),
  ),
  GetPage(
    name: '/changePassword',
    page: () => ChangePasswordView(),
  ),
  GetPage(
    name: '/personalInfo',
    page: () => PersonalInfoView(),
  ),
  GetPage(
    name: '/addPhotos',
    page: () => AddPhotosView(),
  ),
  GetPage(
    name: '/home',
    page: () => HomeView(),
  ),
  GetPage(
    name: '/profile',
    page: () => ProfileView(),
  ),
];
