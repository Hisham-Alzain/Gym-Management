import 'package:get/get.dart';
import 'package:mobile/middleware/middleware.dart';
import 'package:mobile/views/dietViews/diets_view.dart';
import 'package:mobile/views/profileViews/add_photos_view.dart';
import 'package:mobile/views/home_view.dart';
import 'package:mobile/views/profileViews/edit_info_view.dart';
import 'package:mobile/views/profileViews/add_info_view.dart';
import 'package:mobile/views/profileViews/profile_view.dart';
import 'package:mobile/views/workoutViews/exercise_view.dart';
import 'package:mobile/views/workoutViews/exercises_view.dart';
import 'package:mobile/views/workoutViews/workouts_view.dart';
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
    page: () => AddInfoView(),
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
  GetPage(
    name: '/editInfo',
    page: () => EditInfoView(),
  ),
  GetPage(
    name: '/workouts',
    page: () => WorkoutsView(),
  ),
  GetPage(
    name: '/exercises',
    page: () => ExercisesView(),
  ),
  GetPage(
    name: '/exercise',
    page: () => ExerciseView(),
  ),
  GetPage(
    name: '/diets',
    page: () => DietsView(),
  ),
];
