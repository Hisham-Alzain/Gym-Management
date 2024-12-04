<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;
use App\Http\Controllers\TraineeControllers\TraineeMainController;
use App\Http\Controllers\TrainerControllers\TrainerMainController;
use App\Http\Controllers\TraineeControllers\WorkoutsController as TraineeWorkoutsController;
use App\Http\Controllers\TraineeControllers\DietsController as TraineeDietsController;
use App\Http\Controllers\TrainerControllers\WorkoutsController as TrainerWorkoutsController;
use App\Http\Controllers\TrainerControllers\DietsController as TrainerDietsController;


Route::controller(MainController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/muscles/{addingExercise}', 'ShowMuscles');
        Route::get('/workouts/default', 'DefaultWorkouts');
        Route::get('/meal/GI', 'MealGIs');
        Route::get('/check_token', 'CheckToken');
        Route::get('/logout', 'Logout');
    });
});

/* Trainee (Mobile Only) */
Route::controller(TraineeMainController::class)->group(function () {
    Route::post('/register', 'Register');
    Route::post('/login/trainee', 'Login');
    Route::post('/forgotPassword', 'ForgotPassword');
    Route::post('/changePassword', 'ChangePassword');
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/trainee', 'GetUserInfo');
        Route::post('/trainee', 'UpdateUserInfo');

        Route::get('/trainee/photos', 'GetUserPhotos');
        Route::post('/trainee/photos', 'UploadPhotos');
        Route::delete('/trainee/photos/{photo_id}', 'DeletePhoto');
    });
});

Route::controller(TrainerMainController::class)->group(function () {
    Route::post('/login/trainer', 'Login');
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/users', 'ShowUsers');
        Route::delete('/users/{user_id}', 'DeleteUser');

        Route::get('/subscription/{user_id}', 'ShowUserSubscriptions');
        Route::post('/subscription/start', 'StartSubscription');
    });
});

Route::controller(TraineeWorkoutsController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/trainee/workouts', 'ShowWorkoutPrograms');
        Route::get('/trainee/workout/{day_id}', 'ShowWorkoutDay');
        Route::get('/trainee/exercise/{workout_exercise_id}', 'ShowWorkoutExercise');
        Route::post('/trainee/workout/set', 'UpdateExerciseSet');

        Route::get('/trainee/diets', 'ShowDietPrograms');
        Route::get('/trainee/diet/{program_id}', 'ShowDietProgram');
    });
});

Route::controller(TraineeDietsController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/trainee/diets', 'ShowDietPrograms');
        Route::get('/trainee/diet/{program_id}', 'ShowDietProgram');
    });
});

Route::controller(TrainerWorkoutsController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/workouts/{user_id}', 'ShowWorkoutPrograms');
        Route::get('/workout/{program_id}', 'ShowWorkoutProgram');
        Route::post('/workouts/create', 'CreateWorkoutProgram');
        Route::post('/workouts/create/default', 'CreateDefaultWorkoutProgram');
        Route::delete('/workouts/{program_id}', 'DeleteWorkoutProgram');

        Route::get('/exercises', 'ShowExercises');
        Route::post('/exercise/create', 'AddExercise');
        Route::post('/exercise/update', 'UpdateExercise');
        Route::post('/exercise/video', 'UploadExerciseVideo');
        Route::delete('/exercises/{exercise_id}', 'DeleteExercise');
    });
});

Route::controller(TrainerDietsController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/diets/{user_id}', 'ShowDietPrograms');
        Route::get('/diet/{program_id}', 'ShowDietProgram');
        Route::post('/diets/create', 'CreateDietProgram');
        Route::delete('/diets/{program_id}', 'DeleteDietProgram');

        Route::get('/meals', 'ShowMeals');
        Route::post('/meals/create', 'AddMeal');
        Route::post('/meals/update', 'UpdateMeal');
        Route::delete('/meals/{meal_id}', 'DeleteMeal');
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
    '/image/{folder}/{file}',
    function (Request $request, $folder, $file) {
        $path = storage_path('app/private/' . $folder . '/' . $file);
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
        if ($ext == 'gif') {
            $type = 'image/' . $ext;
        } else {
            $type = 'video/' . $ext;
        }

        return response()->stream(function () use ($path) {
            try {
                $stream = fopen($path, 'rb');
                fpassthru($stream);
                fclose($stream);
            } catch (Exception $e) {
                Log::error($e);
            }
        }, 200, [
            'Content-Type' => $type,
            'Access-Control-Allow-Origin' => '*'
        ]);
    }
)->middleware('auth:sanctum');
