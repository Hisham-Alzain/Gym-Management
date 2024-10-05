import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/views/authViews/auth_view.dart';

Future<void> main() async {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      home: const AuthView(),
      getPages: getPages,
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorSchemeSeed: Colors.redAccent,
        appBarTheme: const AppBarTheme(
          color: Colors.redAccent,
          centerTitle: true,
          iconTheme: IconThemeData(color: Colors.white),
        ),
        scaffoldBackgroundColor: Colors.grey.shade900,
        textTheme: TextTheme(
          titleLarge: GoogleFonts.oswald(color: Colors.white),
          headlineLarge: GoogleFonts.oswald(color: Colors.white),
          labelLarge: GoogleFonts.afacad(color: Colors.white),
          bodyLarge: GoogleFonts.afacad(color: Colors.white),
        ),
        outlinedButtonTheme: OutlinedButtonThemeData(
          style: ButtonStyle(
            backgroundColor: const WidgetStatePropertyAll(Colors.redAccent),
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
          labelColor: Colors.redAccent,
          unselectedLabelColor: Colors.white,
          indicatorSize: TabBarIndicatorSize.tab,
          dividerColor: Colors.white,
          indicatorColor: Colors.redAccent,
          labelStyle: Theme.of(context).textTheme.labelLarge,
          unselectedLabelStyle: Theme.of(context).textTheme.labelLarge,
        ),
        radioTheme: const RadioThemeData(
          fillColor: WidgetStatePropertyAll(
            Colors.redAccent,
          ),
        ),
      ),
    );
  }
}
