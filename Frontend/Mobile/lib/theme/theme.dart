import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class Themes {
  static final theme = ThemeData(
    colorSchemeSeed: Colors.red.shade900,
    appBarTheme: AppBarTheme(
      color: Colors.red.shade900,
      centerTitle: true,
      iconTheme: const IconThemeData(color: Colors.white),
      toolbarTextStyle: const TextTheme().titleLarge,
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
      bodySmall: GoogleFonts.afacad(color: Colors.white),
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
        textStyle: WidgetStatePropertyAll(const TextTheme().bodyLarge),
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
        textStyle: WidgetStatePropertyAll(const TextTheme().bodyLarge),
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
      labelStyle: const TextTheme().labelLarge,
      unselectedLabelStyle: const TextTheme().labelLarge,
    ),
    radioTheme: RadioThemeData(
      fillColor: WidgetStatePropertyAll(
        Colors.red.shade900,
      ),
    ),
    datePickerTheme: DatePickerThemeData(
      backgroundColor: Colors.grey.shade800,
      dayForegroundColor: const WidgetStatePropertyAll(Colors.white),
      dayStyle: const TextTheme().bodyLarge,
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
    expansionTileTheme: ExpansionTileThemeData(
      iconColor: Colors.red.shade900,
      collapsedIconColor: Colors.red.shade900,
      tilePadding: const EdgeInsets.all(10),
    ),
  );
}
