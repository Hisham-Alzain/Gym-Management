import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mobile/controllers/general_controller.dart';
import 'package:mobile/enums/enums.dart';
import 'package:mobile/middleware/middleware_controller.dart';
import 'package:mobile/routes/routes.dart';

GetStorage? storage;
late MiddlewareCases middlewareCase;

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  storage = GetStorage();
  await storage?.initStorage;
  MiddlewareController middlewareController = Get.put(MiddlewareController());
  middlewareCase = await middlewareController.checkToken();
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    final GeneralController generalController = Get.put(GeneralController());
    return GetMaterialApp(
      initialRoute: '/splashScreen',
      getPages: getPages,
      debugShowCheckedModeBanner: false,
      onReady: () => generalController.requestPermissions(),
      theme: ThemeData(
        colorSchemeSeed: Colors.red.shade900,
        appBarTheme: AppBarTheme(
          color: Colors.red.shade900,
          centerTitle: true,
          iconTheme: const IconThemeData(color: Colors.white),
          toolbarTextStyle: Theme.of(context).textTheme.titleLarge,
          foregroundColor: Colors.white,
        ),
        scaffoldBackgroundColor: Colors.grey.shade900,
        drawerTheme: DrawerThemeData(
          backgroundColor: Colors.grey.shade900,
        ),
        textTheme: TextTheme(
          titleLarge: GoogleFonts.oswald(color: Colors.white),
          headlineSmall: GoogleFonts.oswald(color: Colors.white),
          labelLarge: GoogleFonts.afacad(color: Colors.white, fontSize: 15),
          bodyLarge: GoogleFonts.afacad(color: Colors.white),
          bodyMedium: GoogleFonts.afacad(color: Colors.white, fontSize: 18),
        ),
        outlinedButtonTheme: OutlinedButtonThemeData(
          style: ButtonStyle(
            backgroundColor: WidgetStatePropertyAll(Colors.red.shade900),
            shape: WidgetStatePropertyAll(
              RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
                side: BorderSide.none,
              ),
            ),
            fixedSize: const WidgetStatePropertyAll(
              Size(300, 50),
            ),
            foregroundColor: const WidgetStatePropertyAll(Colors.white),
            textStyle:
                WidgetStatePropertyAll(Theme.of(context).textTheme.bodyLarge),
            iconColor: const WidgetStatePropertyAll(Colors.white),
            overlayColor: const WidgetStatePropertyAll(Colors.red),
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ButtonStyle(
            backgroundColor: WidgetStatePropertyAll(Colors.red.shade900),
            shape: WidgetStatePropertyAll(
              RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
                side: BorderSide.none,
              ),
            ),
            foregroundColor: const WidgetStatePropertyAll(Colors.white),
            textStyle:
                WidgetStatePropertyAll(Theme.of(context).textTheme.bodyLarge),
            iconColor: const WidgetStatePropertyAll(Colors.white),
            overlayColor: const WidgetStatePropertyAll(Colors.red),
          ),
        ),
        textButtonTheme: const TextButtonThemeData(
          style: ButtonStyle(
            foregroundColor: WidgetStatePropertyAll(Colors.white),
          ),
        ),
        tabBarTheme: TabBarTheme(
          labelColor: Colors.red.shade900,
          unselectedLabelColor: Colors.white,
          indicatorSize: TabBarIndicatorSize.tab,
          dividerColor: Colors.white,
          indicatorColor: Colors.red.shade900,
          labelStyle: Theme.of(context).textTheme.labelLarge,
          unselectedLabelStyle: Theme.of(context).textTheme.labelLarge,
        ),
        radioTheme: RadioThemeData(
          fillColor: WidgetStatePropertyAll(
            Colors.red.shade900,
          ),
        ),
        datePickerTheme: DatePickerThemeData(
          backgroundColor: Colors.grey.shade800,
          dayForegroundColor: const WidgetStatePropertyAll(Colors.white),
          dayStyle: Theme.of(context).textTheme.bodyLarge,
          dividerColor: Colors.white,
          headerForegroundColor: Colors.white,
          weekdayStyle: const TextStyle(
            color: Colors.white,
          ),
          yearForegroundColor: const WidgetStatePropertyAll(Colors.white),
        ),
        progressIndicatorTheme:
            ProgressIndicatorThemeData(color: Colors.red.shade900),
        iconTheme: IconThemeData(color: Colors.red.shade900),
        cardTheme: CardTheme(
          color: Colors.grey.shade900,
          margin: const EdgeInsets.all(10),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
            side: BorderSide(
              color: Colors.red.shade900,
            ),
          ),
        ),
      ),
    );
  }
}
