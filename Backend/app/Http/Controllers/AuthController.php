<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Hash;
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

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Prepare token
        $token = $user->createToken("api_token")->plainTextToken;

        // Response
        return response()->json([
            "message" => "user logged in successfully",
            "access_token" => $token,
            "token_type" => "bearer"
        ], 200);
    }
    public function IsExpired()
    {
        return response()->json([
            'message' => 'Token is valid',
        ], 200);
    }
}
