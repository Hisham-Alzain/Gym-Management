import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/enums/enums.dart';
import 'package:mobile/main.dart';

class Middleware extends GetMiddleware {
  @override
  RouteSettings? redirect(String? route) {
    switch (middlewareCase) {
      case MiddlewareCases.noToken:
        return const RouteSettings(name: '/auth');
      case MiddlewareCases.validToken:
        return const RouteSettings(name: '/home');
      case MiddlewareCases.incompleteInfo:
        return const RouteSettings(name: '/addInfo');
      case MiddlewareCases.invalidToken:
        return const RouteSettings(name: '/auth');
      default:
        return super.redirect(route);
    }
  }
}
