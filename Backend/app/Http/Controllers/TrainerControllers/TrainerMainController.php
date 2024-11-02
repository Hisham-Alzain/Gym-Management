<?php

namespace App\Http\Controllers\TrainerControllers;

use App\Http\Controllers\MainController;

use App\Models\User;
use App\Models\Subscription;
use App\Policies\AdminPolicy;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SubscriptionRequest;
use App\Http\Resources\UserInfoCollection;
use App\Http\Resources\SubscriptionResource;
use App\Http\Resources\SubscriptionCollection;


class TrainerMainController extends MainController
{
    public function TrainerLogin(LoginRequest $request)
    {
        // Validate request
        $validated = $request->validated();
        $remember = $validated['remember'];
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
            // Response
            return response()->json([
                'errors' => ['user' => 'User must be Trainee']
            ], 422);
        }
    }

    public function ShowUsers(Request $request)
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
            // Get all users
            $users = User::where('role', 'Trainee')->paginate(10);

            // Response
            return response()->json([
                "message" => "users fetched",
                "users" => new UserInfoCollection($users),
                'pagination_data' => [
                    'from' => $users->firstItem(),
                    'to' => $users->lastItem(),
                    'total' => $users->total(),
                    'first_page' => 1,
                    'current_page' => $users->currentPage(),
                    'last_page' => $users->lastPage(),
                    'pageNumbers' => $this->generateNumberArray(1, $users->lastPage()),
                    'first_page_url' => $users->url(1),
                    'current_page_url' => $users->url($users->currentPage()),
                    'last_page_url' => $users->url($users->lastPage()),
                    'next_page' => $users->nextPageUrl(),
                    'prev_page' => $users->previousPageUrl(),
                    'path' => $users->path(),
                ],
            ]);
        }
    }

    public function DeleteUser(Request $request, $user_id)
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
            // Get trainee
            $trainee = User::find($user_id);

            // Check Trainee
            if ($trainee == null) {
                // Response
                return response()->json([
                    'errors' => ['user' => 'User was not found'],
                ], 404);
            } else {
                // Delete trainee
                $trainee->delete();

                // Response
                return response()->json([
                    'message' => 'Successfully deleted user'
                ], 204);
            }
        }
    }

    public function StartSubscription(SubscriptionRequest $request)
    {
        // Validate request
        $validated = $request->validated();

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
            // Get Trainee
            $trainee = User::where('id', $validated['user_id'])->first();

            // Check Trainee
            if ($trainee == null) {
                // Response
                return response()->json([
                    'errors' => ['user' => 'User not found'],
                ], 404);
            } else {
                $subscription = Subscription::where('user_id', $trainee->id)
                    ->orderByDesc('end_date')->first();
                if ($subscription == null || $subscription->end_date < today()->toDateString()) {
                    // Create subscription
                    $subscription = Subscription::create([
                        'user_id' => $validated['user_id'],
                        'start_date' => today()->toDateString(),
                        'end_date' => today()->addMonths($validated['duration'])->toDateString()
                    ]);
                } else {
                    // Create subscription
                    $subscription = Subscription::create([
                        'user_id' => $validated['user_id'],
                        'start_date' => $subscription->end_date->toDateString(),
                        'end_date' => $subscription->end_date->addMonths($validated['duration'])->toDateString()
                    ]);
                }

                // Response
                return response()->json([
                    'message' => 'Added the subscription successfully',
                    'subscription' => new SubscriptionResource($subscription)
                ], 201);
            }
        }
    }

    public function ShowUserSubscriptions(Request $request, $user_id)
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
            // Get all subscriptions
            $subscriptions = Subscription::where('user_id', $user_id)->paginate(10);

            // Response
            return response()->json([
                "message" => "Subscriptions fetched",
                "subscriptions" => new SubscriptionCollection($subscriptions),
                'pagination_data' => [
                    'from' => $subscriptions->firstItem(),
                    'to' => $subscriptions->lastItem(),
                    'total' => $subscriptions->total(),
                    'first_page' => 1,
                    'current_page' => $subscriptions->currentPage(),
                    'last_page' => $subscriptions->lastPage(),
                    'pageNumbers' => $this->generateNumberArray(1, $subscriptions->lastPage()),
                    'first_page_url' => $subscriptions->url(1),
                    'current_page_url' => $subscriptions->url($subscriptions->currentPage()),
                    'last_page_url' => $subscriptions->url($subscriptions->lastPage()),
                    'next_page' => $subscriptions->nextPageUrl(),
                    'prev_page' => $subscriptions->previousPageUrl(),
                    'path' => $subscriptions->path(),
                ],
            ], 200);
        }
    }
}
