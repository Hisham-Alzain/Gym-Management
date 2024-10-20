<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Models\User;
use App\Models\UserInfo;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Notifications\ResetPassword;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ForgetPasswordRequest;
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

        if (!$user) {
            return response()->json([
                "errors" => "Invalid email"
            ], 422);
        } else if (!Hash::check($validated['password'], $user->password)) {
            return response()->json([
                "errors" => "Invalid password"
            ], 422);
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
    public function ForgotPassword(ForgetPasswordRequest $request)
    {
        // Validate request
        $validated = $request->validated();
        // Get User
        $user = User::where("email", $validated['email'])->first();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['email' => 'Email was not found']
            ], 404);
        }

        $code = rand(100000, 999999);
        $user->notify(new ResetPassword($code));

        return response()->json([
            'message' => 'Reset Password code has been sent to your email',
            'code' => $code
        ], 200);
    }
    public function ChangePassword(ChangePasswordRequest $request)
    {
        // Validate request
        $validated = $request->validated();
        // Get user
        $user = User::where("email", $validated['email'])->first();
        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['email' => 'Email was not found']
            ], 404);
        }
        // Update user
        $validated['password'] = bcrypt($validated['password']);
        $user->update($validated);

        // Prepare token
        $token = $user->createToken("api_token")->plainTextToken;
        // Response
        return response()->json([
            "data" => $user,
            "access_token" => $token,
            "token_type" => "bearer"
        ], 200);
    }
}
