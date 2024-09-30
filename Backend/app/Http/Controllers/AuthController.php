<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function Login(Request $request)
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
        $token = $user->createToken($request->device_name)->plainTextToken;

        // Response
        return response()->json([
            "user" => $user,
            "access_token" => $token->accessToken,
            "token_type" => "bearer",
        ], 200);
    }
}
