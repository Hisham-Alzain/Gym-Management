<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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

        Route::get('/trainee/photos', 'GetUserPhotos');
        Route::post('/trainee/photos', 'UploadPhotos');
        Route::delete('/trainee/photos/{photo_id}', 'DeletePhoto');

        Route::get('/trainee/workouts/{user_id}', 'ShowWorkoutPrograms');
        Route::get('/trainee/workout/{program_id}', 'ShowWorkoutProgram');
        Route::post('/trainee/workout/set', 'UpdateExerciseSet');

        Route::get('/trainee/diets', 'ShowDietPrograms');
        Route::get('/trainee/diet/{program_id}', 'ShowDietProgram');
    });
});

Route::controller(TrainerController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/users', 'ShowUsers');
        Route::delete('/users/{user_id}', 'DeleteUser');

        Route::get('/subscription/{user_id}', 'ShowUserSubscriptions');
        Route::post('/subscription/start', 'StartSubscription');

        Route::get('/workout_programs', 'ShowWorkoutPrograms');
        Route::post('/workouts/create', 'CreateWorkoutProgram');
        Route::delete('/workouts/{program_id}', 'DeleteWorkoutProgram');

        Route::get('/exercises', 'ShowExercises');
        Route::post('/exercise/create', 'AddExercise');
        Route::post('/exercise/update', 'UpdateExercise');
        Route::post('/exercise/video','UploadExerciseVideo');
        Route::delete('/exercises/{exercise_id}', 'DeleteExercise');

        Route::get('/diet_programs', 'ShowDietPrograms');
        Route::post('/diets/create', 'CreateDietProgram');
        Route::delete('/diets/{program_id}', 'DeleteDietProgram');

        Route::post('/meals/create', 'CreateDietMeal');
        Route::post('/meals/update', 'UpdateDietMeal');
        Route::delete('/meals/{meal_id}', 'DeleteDietMeal');
    });
});

Route::get(
    '/image/{folder}/{user_id?}/{file}',
    function (Request $request, $folder, $user_id, $file) {
        if ($user_id == null) {
            $path = storage_path('app/private/' . $folder . '/' . $file);
        } else {
            $path = storage_path('app/private/' . $folder . '/' . $user_id . '/' . $file);
        }

        if (!file_exists($path)) {
            abort(404);
        }

        $ext = pathinfo($path, PATHINFO_EXTENSION);
        return response()->file($path, [
            'Content-Type' => 'image/' . $ext,
            'Access-Control-Allow-Origin' => '*'
        ]);
    }
)->middleware('auth:sanctum');

Route::get(
    '/video/{folder}/{file}',
    function (Request $request, $folder, $file) {
        $path = storage_path('app/private/' . $folder . '/' . $file);
        if (!file_exists($path)) {
            abort(404);
        }

        $ext = pathinfo($path, PATHINFO_EXTENSION);
        return response()->stream(function () use ($path) {
            try {
                $stream = fopen($path, 'rb');
                fpassthru($stream);
                fclose($stream);
            } catch (Exception $e) {
                Log::error($e);
            }
        }, 200, [
            'Content-Type' => 'video/' . $ext,
            'Access-Control-Allow-Origin' => '*'
        ]);
    }
)->middleware('auth:sanctum');
