import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mobile/routes/routes.dart';
import 'package:mobile/views/authViews/login_view.dart';

Future<void> main() async {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      home: const LoginView(),
      getPages: getPages,
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        appBarTheme: const AppBarTheme(
          color: Colors.redAccent,
          centerTitle: true,
          iconTheme: IconThemeData(color: Colors.white),
        ),
        scaffoldBackgroundColor: Colors.grey.shade900,
        textTheme: TextTheme(
          titleLarge: GoogleFonts.oswald(color: Colors.white),
          headlineLarge: GoogleFonts.oswald(color: Colors.white),
          labelLarge: GoogleFonts.oswald(color: Colors.white),
          bodyLarge: GoogleFonts.oswald(color: Colors.white),
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
            iconColor: const WidgetStatePropertyAll(Colors.white),
            overlayColor: const WidgetStatePropertyAll(Colors.red),
          ),
        ),
      ),
    );
  }
}
