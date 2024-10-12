<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserInfo;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function Register(RegisterRequest $request)
    {
        // Validate request
        $validated = $request->validated();

        // Hash password and remove confirm password
        $validated['password'] = Hash::make($validated['password']);
        $validated = Arr::except($validated, 'confirm_password');

        // Create user
        $user = User::create($validated);

        // Check user
        if ($user == null) {
            // Response
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Create Token
        $token = $user->createToken("api_token")->plainTextToken;

        // Response
        return response()->json([
            "message" => "user created successfully",
            "access_token" => $token,
            "token_type" => "bearer"
        ], 201);
    }

    public function Login(LoginRequest $request)
    {
        // Validate request
        $validated = $request->validated();
        $remember = $validated['remember'];
        unset($validated['remember']);

        // Check user
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Prepare token
        $token = $user->createToken("api_token")->plainTextToken;

        if ($user->role == 'Trainer') {
            // Response
            return response()->json([
                "message" => "user logged in successfully",
                "access_token" => $token,
                "token_type" => "bearer",
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'role' => $user->role
                ],
            ], 200);
        } else {
            // Check user_info
            $info = UserInfo::where('user_id', $user->id)->first();

            if ($info == null) {
                $completed_info = false;
            } else {
                $completed_info = true;
            }

            // Response
            return response()->json([
                "message" => "user logged in successfully",
                "completed_info" => $completed_info,
                "access_token" => $token,
                "token_type" => "bearer"
            ], 200);
        }
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
        $request->user()->token()->delete();

        // Response
        return response()->json([
            "message" => "Logged Out Successfully",
        ], 200);
    }
}
