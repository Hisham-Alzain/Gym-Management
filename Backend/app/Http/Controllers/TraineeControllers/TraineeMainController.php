<?php

namespace App\Http\Controllers\TraineeControllers;

use App\Http\Controllers\MainController;

use App\Models\User;
use App\Models\UserInfo;
use App\Models\UserPhoto;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Notifications\ResetPassword;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\PhotosRequest;
use App\Http\Requests\UserInfoRequest;
use App\Http\Resources\UserInfoResource;


class TraineeMainController extends MainController
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
        $rememberMe = $validated['remember'];
        unset($validated['remember']);

        // Check user
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            // Response
            return response()->json([
                'errors' => ['email' => 'Invalid email']
            ], 422);
        } else if (!Hash::check($validated['password'], $user->password)) {
            // Response
            return response()->json([
                'errors' => ['password' => 'Invalid password']
            ], 422);
        }

        // Handle Remember Me functionality
        if ($rememberMe) {
            $token = $user->createToken(name: 'auth_token', expiresAt: now()->addMonth())->plainTextToken;
        } else {
            $token = $user->createToken(name: 'auth_token', expiresAt: now()->addDay())->plainTextToken;
        }

        if ($user->role == 'Trainer') {
            // Response
            return response()->json([
                'errors' => ['user' => 'User must be Trainee']
            ], 422);
        } else {
            // Check user_info
            $info = UserInfo::where('user_id', $user->id)->first();

            if ($info == null) {
                $completed_info = false;
            } else {
                if (
                    $user->gender == null
                    || $user->birthdate == null
                    || $info->height == null
                    || $info->weight == null
                ) {
                    $completed_info = false;
                } else {
                    $completed_info = true;
                }
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

    public function ForgotPassword(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            "email" => "required|email|exists:users,email"
        ]);

        // Get User
        $user = User::where("email", $validated['email'])->first();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['email' => 'Email was not found']
            ], 404);
        }

        // Sent code
        $code = rand(100000, 999999);
        $user->notify(new ResetPassword($code));

        // Response
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
        if ($user->role == 'Trainer') {
            // Response
            return response()->json([
                "message" => "Coach info retrieved successfully",
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'role' => $user->role
                ]
            ], 200);
        }

        // Trainee
        // Response
        return response()->json([
            "message" => "User retrieved successfully",
            "user" => new UserInfoResource($user)
        ], 200);
    }

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
            $user->birth_date = $validated['birth_date'];
            $user->save();
        }
        if (isset($validated['gender'])) {
            $user->gender = $validated['gender'];
            $user->save();
        }

        // Get userInfo
        $userInfo = UserInfo::where("user_id", $user->id)->first();

        // Check userInfo
        if ($userInfo == null) {
            $validated['user_id'] = $user->id;
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

    public function GetUserPhotos(Request $request)
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
        return response()->json([
            "message" => "Photos retrieved successfully",
            'photos' => $user->userInfo->photos->take(5),
        ], 200);
    }

    public function UploadPhotos(PhotosRequest $request)
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

        // Handle file uploads if present in the request
        if ($request->hasFile('photos')) {
            // Get Uploaded photos
            $photos = $request->file('photos');

            // Set destination
            $destination = 'users_photos/' . $user->id;

            foreach ($photos as $photo) {
                // Get file name
                $extension = $photo->getClientOriginalName();

                // Set file name
                $fileName = now()->format('Y_m_d_His') . $extension;

                // Store file and get path
                $path = $photo->storeAs($destination, $fileName);

                // Create and associate path with user_info
                $userInfo = $user->userInfo;

                UserPhoto::create([
                    'photo_path' => $path,
                    'info_id' => $userInfo->id
                ]);
            }
        }

        // Response
        return response()->json([
            "message" => "Successfully uploaded photos"
        ], 201);
    }

    public function DeletePhoto(Request $request, $photo_id)
    {
        // Get photo
        $photo = UserPhoto::find($photo_id);

        // Check photo
        if ($photo == null) {
            return response()->json([
                "errors" => "photo not found"
            ], 404);
        }

        // Delete Photo
        $photo->delete();

        // Response
        return response()->json([
            "message" => "photo deleted successfully"
        ], 204);
    }
}
