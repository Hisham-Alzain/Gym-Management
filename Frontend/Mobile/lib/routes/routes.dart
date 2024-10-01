import 'package:get/get.dart';
import 'package:mobile/views/authViews/login_view.dart';

List<GetPage<dynamic>>? getPages = [
  GetPage(
    name: '/splashScreen',
    page: () => LoginView(),
  ),
];
