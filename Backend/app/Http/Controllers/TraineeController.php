<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UpdateUserInfoRequest;
use App\Http\Resources\UserInfoResource;
use App\Models\UserInfo;

class TraineeController extends Controller
{
    public function UpdateUserInfo(UpdateUserInfoRequest $request)
    {
        $validated = $request->validated();
        // Get user
        $user = Auth::user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }
        $userInfo = UserInfo::where("user_id", $user->id)->first();
        if ($userInfo == null) {
            $userInfo = UserInfo::create($validated);
        } else {
            $userInfo->fill($validated);
            $userInfo->save();
        }
        return response()->json([
            "message" => "User info updated successfully",
        ],201);
    }
    public function GetUserInfo(){
        $user = Auth::user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], status: 401);
        }
        return response()->json([
            "data" => new UserInfoResource($user),
            "message" => "User info retrieved successfully"
        ]
        , 200);
    }
    public function ShowWorkoutProgram(){
        
    }
    public function ShowDietProgram(){
        
    }
}
