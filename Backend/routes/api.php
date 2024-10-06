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
    });
});

Route::controller(TrainerController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/subscription/start', 'StartSubscription');
        Route::post('/workout/create', 'CreateWorkoutProgram');

        Route::get('/users',  'ShowUsers');
        Route::delete('/delete', 'DeleteUser');
    });
});
