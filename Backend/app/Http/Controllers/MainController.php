<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Policies\AdminPolicy;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Enums\WorkoutMuscle;


class MainController extends Controller
{
    public function generateNumberArray($start, $end)
    {
        $numbers = range($start, $end);
        return $numbers;
    }

    public function IsExpired()
    {
        return response()->json([
            'message' => 'Token is valid',
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

    public function ShowMuscles(Request $request)
    {
        // Get user
        $user = Auth::user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Check user_role
        $policy = new AdminPolicy();
        if (!$policy->Policy(User::find($user->id))) {
            // Response
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        } else {
            // Get Muscles
            $unwantedMuscles=[
                'Arms','Chest_Biceps','Back_Triceps','Legs_Shoulders'
            ];
            $enumNames = WorkoutMuscle::names();
            $enumValues = WorkoutMuscle::values();
            $response = [];
            for ($i = 0; $i < count($enumValues); $i++) {
                if(in_array($enumNames[$i],$unwantedMuscles)){
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
    }
}
