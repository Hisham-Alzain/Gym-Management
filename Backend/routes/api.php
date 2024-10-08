<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TraineeController;
use App\Http\Controllers\TrainerController;

Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'Register');
    Route::post('/login', 'Login');
    Route::get('/isExpired', 'IsExpired')->middleware('auth:sanctum');
});

Route::controller(TraineeController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/trainee', 'GetUserInfo');
        Route::post('/trainee', 'UpdateUserInfo');

        Route::get('/trainee/workouts', 'ShowWorkoutPrograms');
        Route::get('/trainee/workout/{program_id}', 'ShowWorkoutProgram');

        Route::get('/trainee/diets', 'ShowDietPrograms');
        Route::get('/trainee/diet/{program_id}', 'ShowDietProgram');
    });
});

Route::controller(TrainerController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/subscription/start', 'StartSubscription');

        Route::get('/workout_programs', 'ShowWorkoutPrograms');
        Route::post('/workouts/create', 'CreateWorkoutProgram');
        Route::delete('/workouts/{program_id}', 'DeleteWorkoutProgram');

        Route::get('/diet_programs', 'ShowDietPrograms');
        Route::post('/diets/create', 'CreateDietProgram');
        Route::delete('/diets/{program_id}', 'DeleteDietProgram');

        Route::get('/users', 'ShowUsers');
        Route::delete('/users/{user_id}', 'DeleteUser');
    });
});
