<?php

namespace App\Http\Controllers;


use App\Models\User;
use App\Models\Subscription;
use Illuminate\Http\Request;
use App\Policies\AdminPolicy;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\SubscriptionRequest;
use App\Http\Resources\UserInfoCollection;

class TrainerController extends Controller
{
    public function StartSubscription(SubscriptionRequest $request)
    {
        $validated = $request->validated();
        // Get user
        $user = Auth::user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }
        // Check user role
        $policy = new AdminPolicy();
        if (!$policy->Policy(User::find($user->id))) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        } else {
            $trainee = User::where('id', $validated['user_id'])->first();
            if ($trainee == null) {
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
        // Check user role
        $policy = new AdminPolicy();
        if (!$policy->Policy(User::find($user->id))) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        } else {
            $users = User::all();
            return response()->json([
                "users" => new UserInfoCollection($users),
            ]);
        }
    }

    public function DeleteUser(Request $request)
    {
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
        // Check user role
        $policy = new AdminPolicy();
        if (!$policy->Policy(User::find($user->id))) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        } else {
            $trainee = User::where('id', $validated['user_id'])->first();
            if ($trainee == null) {
                return response()->json([
                    'errors' => ['user' => 'user not found'],
                ], 404);
            } else {
                $trainee->delete();
                // Response
                return response()->json([
                    'message' => 'Successfully deleted user'
                ], 200);
            }
        }
    }
}
