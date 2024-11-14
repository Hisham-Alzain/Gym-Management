<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserInfo;
use Illuminate\Http\Request;
use App\Enums\WorkoutMuscle;
use App\Enums\DefaultWorkouts;
use Illuminate\Support\Facades\Auth;


class MainController extends Controller
{
    public function generateNumberArray($start, $end)
    {
        $numbers = range($start, $end);
        return $numbers;
    }

    public function CheckToken(Request $request)
    {
        // Get user
        $user = Auth::user();
        $user = User::find($user->id);

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Check user_info
        $info = UserInfo::where('user_id', $user->id)->first();

        if ($info == null) {
            $completed_info = false;
        } else {
            $completed_info = true;
        }

        return response()->json([
            'message' => 'Token is valid',
            "completed_info" => $completed_info,
        ], 200);
    }

    public function Logout(Request $request)
    {
        // Delete Token
        $request->user('sanctum')->currentAccessToken()->delete();

        // Response
        return response()->json([
            "message" => "Logged Out Successfully",
        ], 200);
    }

    public function ShowMuscles(Request $request, $addingExercise)
    {
        // Get user
        $user = Auth::user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Get Muscles
        $unwantedMuscles = [
            'Arms',
            'Chest_Biceps',
            'Back_Triceps',
            'Leg_Shoulders',
            'Chest_Back_Triceps',
            'Legs_Shoulders_Biceps',
            'ALL'
        ];

        // Array
        $enumNames = WorkoutMuscle::names();
        $enumValues = WorkoutMuscle::values();
        $response = [];
        for ($i = 0; $i < count($enumValues); $i++) {
            if ($addingExercise && in_array($enumNames[$i], $unwantedMuscles)) {
                continue;
            }
            array_push(
                $response,
                [
                    'id' => $i + 1,
                    'name' => $enumNames[$i],
                    'value' => $enumValues[$i]
                ]
            );
        }

        // Response
        return response()->json([
            "muscles" => $response,
        ], 200);
    }

    public function DefaultWorkouts(Request $request)
    {
        // Get user
        $user = Auth::user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Array
        $enumNames = DefaultWorkouts::names();
        $enumValues = DefaultWorkouts::values();
        $response = [];
        for ($i = 0; $i < count($enumValues); $i++) {
            array_push(
                $response,
                [
                    'id' => $i + 1,
                    'name' => $enumNames[$i],
                    'value' => $enumValues[$i]
                ]
            );
        }

        // Response
        return response()->json([
            "workouts" => $response,
        ], 200);
    }
}
