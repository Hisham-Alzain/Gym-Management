import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/general_controller.dart';
import 'package:mobile/customWidgets/custom_dialogs.dart';
import 'package:mobile/main.dart';
import 'package:mobile/models/diet_program.dart';
import 'package:mobile/models/meal.dart';
import 'package:mobile/models/pagination_data.dart';

class DietsController extends GetxController {
  late GlobalKey<RefreshIndicatorState> refreshIndicatorKey;
  late GeneralController generalController;
  late Dio dio;
  late CustomDialogs customDialogs;
  late PaginationData paginationData;
  late ScrollController scrollController;
  List<DietProgram> programs = [];
  bool loading = true;
  Meal selectedMeal = Meal.empty();

  @override
  Future<void> onInit() async {
    refreshIndicatorKey = GlobalKey<RefreshIndicatorState>();
    generalController = Get.find<GeneralController>();
    dio = Dio();
    customDialogs = CustomDialogs();
    await getPrograms(1);
    scrollController = ScrollController()..addListener(scrollListener);
    loading = false;
    update();
    super.onInit();
  }

  Future<void> refreshView() async {
    programs.clear();
    Future.delayed(const Duration(milliseconds: 100));
    await getPrograms(1);
  }

  Future<void> scrollListener() async {
    if (scrollController.position.pixels ==
            scrollController.position.maxScrollExtent &&
        paginationData.hasMorePages) {
      await getPrograms(paginationData.currentPage + 1);
    }
  }

  void viewMeal(Meal meal) {
    selectedMeal = meal;
    Get.toNamed('/meal');
  }

  Future<dynamic> getPrograms(int page) async {
    String token = storage?.read('token');
    try {
      var response = await dio.get(
        'https://olive-salmon-530757.hostingersite.com/api/trainee/diets?page=$page',
        options: Options(
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ),
      );
      if (response.statusCode == 200) {
        for (var program in response.data['programs']) {
          programs.add(
            DietProgram.fromJson(program),
          );
        }
        paginationData =
            PaginationData.fromJson(response.data['pagination_data']);
        update();
      } else if (response.statusCode == 401) {
        generalController.handleUnauthorized();
      }
    } on DioException catch (e) {
      customDialogs.showErrorDialog(
        e.response?.data?.toString(),
      );
    }
  }
}
