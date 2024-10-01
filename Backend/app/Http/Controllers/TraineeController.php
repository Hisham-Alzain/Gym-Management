<?php

namespace App\Http\Controllers;

use App\Models\UserInfo;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateUserInfoRequest;
use App\Http\Resources\UserInfoResource;
use Illuminate\Support\Facades\Auth;


class TraineeController extends Controller
{
    public function UpdateUserInfo(UpdateUserInfoRequest $request)
    {
        // Validate request
        $validated = $request->validated();

        // Get user
        $user = Auth::user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
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
        ], 201);
    }

    public function GetUserInfo()
    {
        // Get user
        $user = Auth::user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], status: 401);
        }

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
