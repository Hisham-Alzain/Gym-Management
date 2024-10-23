<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TraineeController;
use App\Http\Controllers\TrainerController;

Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'Register');
    Route::post('/login/trainer', 'TrainerLogin');
    Route::post('/login/trainee', 'TraineeLogin');
    Route::post('/forgotPassword', 'ForgotPassword');
    Route::post('/changePassword', 'ChangePassword');
    Route::get('/isExpired', 'IsExpired')->middleware('auth:sanctum');
    Route::get('/logout', 'Logout')->middleware('auth:sanctum');
});

Route::controller(TraineeController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/trainee', 'GetUserInfo');
        Route::post('/trainee', 'UpdateUserInfo');
        Route::post('/trainee/photos', 'UploadPhotos');

        Route::get('/trainee/workouts/{user_id}', 'ShowWorkoutPrograms');
        Route::get('/trainee/workout/{program_id}', 'ShowWorkoutProgram');
        Route::post('/trainee/workout/set', 'UpdateExerciseSet');

        Route::get('/trainee/diets', 'ShowDietPrograms');
        Route::get('/trainee/diet/{program_id}', 'ShowDietProgram');
    });
});

Route::controller(TrainerController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/subscription/{user_id}', 'ShowUserSubscriptions');
        Route::post('/subscription/start', 'StartSubscription');

        Route::get('/workout_programs', 'ShowWorkoutPrograms');
        Route::post('/workouts/create', 'CreateWorkoutProgram');
        Route::post('/exercise/create', 'AddExercise');
        Route::delete('/workouts/{program_id}', 'DeleteWorkoutProgram');

        Route::get('/diet_programs', 'ShowDietPrograms');
        Route::post('/diets/create', 'CreateDietProgram');
        Route::delete('/diets/{program_id}', 'DeleteDietProgram');

        Route::post('/meals/create', 'CreateDietMeal');
        Route::post('/meals/update', 'UpdateDietMeal');
        Route::delete('/meals/{meal_id}', 'DeleteDietMeal');

        Route::get('/users', 'ShowUsers');
        Route::delete('/users/{user_id}', 'DeleteUser');
    });
});

Route::get(
    '/image/{folder}/{user_id}/{image}',
    function (Request $request, $folder, $user_id, $image) {
        $path = storage_path('app/private/' . $folder . '/' . $user_id . '/' . $image);
        if ($path == null) {
            return null;
        }
        return response()->file($path);
    }
);
