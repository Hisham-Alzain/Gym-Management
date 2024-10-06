<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserInfo;
use Illuminate\Http\Request;
use App\Http\Requests\UserInfoRequest;
use App\Http\Resources\UserInfoResource;
use Illuminate\Support\Facades\Auth;


class TraineeController extends Controller
{
    public function UpdateUserInfo(UserInfoRequest $request)
    {
        // Validate request
        $validated = $request->validated();

        // Get user
        $user = Auth::user();
        $user = User::find($user->id);

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Update user birth_date and gender
        if (isset($validated['birth_date'])) {
            $user->birthdate = $validated['birth_date'];
            $user->save();
        }
        if (isset($validated['gender'])) {
            $user->birthdate = $validated['gender'];
            $user->save();
        }

        // Get userInfo
        $userInfo = UserInfo::where("user_id", $user->id)->first();

        // Check userInfo
        if ($userInfo == null) {
            $userInfo = UserInfo::create($validated);
        } else {
            $userInfo->fill($validated);
            $userInfo->save();
        }

        // Response
        return response()->json([
            "message" => "User info updated successfully",
        ], 200);
    }

    public function GetUserInfo(Request $request)
    {
        // Get user
        $user = Auth::user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], status: 401);
        }

        // Trainer
        if ($user->role == 'trainer') {
            // Response
            return response()->json([
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'role' => $user->role
                ],
                "message" => "Coach info retrieved successfully"
            ], 200);
        }

        // Trainee
        // Response
        return response()->json(
            [
                "data" => new UserInfoResource($user),
                "message" => "User info retrieved successfully"
            ],
            200
        );
    }

    public function ShowWorkoutProgram() {}

    public function ShowDietProgram() {}
}
