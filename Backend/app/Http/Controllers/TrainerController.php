<?php

namespace App\Http\Controllers;


use App\Models\User;
use App\Models\Subscription;
use App\Policies\AdminPolicy;
use Illuminate\Http\Request;
use App\Http\Requests\SubscriptionRequest;
use App\Http\Resources\SubscriptionCollection;
use App\Http\Resources\UserInfoCollection;
use Illuminate\Support\Facades\Auth;

class TrainerController extends Controller
{
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
                    'errors' => ['user' => 'user not found'],
                ], 404);
            } else {
                $start_date = $validated['start_date'];
                $month = date('m', strtotime($start_date));
                $new_month = $month + $validated['duration'];
                if ($new_month > 12) {
                    $remaining = $new_month - 12;
                    $end_date = $start_date->addYear();
                    $end_date = $end_date->addMonth($remaining);
                } else {
                    $end_date = $start_date->addMonth($new_month);
                }

                // Create subscription
                $subscription = Subscription::create([
                    'user_id' => $validated['user_id'],
                    'start_date' => $start_date,
                    'end_date' => $end_date
                ]);

                // Response
                return response()->json([
                    'message' => 'added the subscription successfully'
                ], 200);
            }
        }
    }

    public function ShowUsers()
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
            $users = User::all();

            // Response
            return response()->json([
                "users" => new UserInfoCollection($users),
            ]);
        }
    }

    public function DeleteUser(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'user_id' => 'required',
        ]);

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
            $trainee = User::where('id', $validated['user_id'])->first();

            // Check Trainee
            if ($trainee == null) {
                // Response
                return response()->json([
                    'errors' => ['user' => 'user not found'],
                ], 404);
            } else {
                // Delete trainee
                $trainee->delete();

                // Response
                return response()->json([
                    'message' => 'Successfully deleted user'
                ], 200);
            }
        }
    }

    public function CreateDietProgram() {}

    public function CreateWorkoutProgram() {}

    public function ShowAllSubscriptions()
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
            $subscriptions = Subscription::all();

            // Response
            return response()->json([
                "message" => "all subscriptions fetched",
                "data" => new SubscriptionCollection($subscriptions)
            ], 200);
        }
    }
}
