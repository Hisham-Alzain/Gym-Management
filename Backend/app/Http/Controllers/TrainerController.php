<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\SubscriptionRequest;
use App\Models\User;
use App\Models\Subscription;

class TrainerController extends Controller
{
    public function StartSubscription(SubscriptionRequest $request)
    {
        $validated = $request->validated();
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }
        // Check user role
        if ($user->role == 'Trainer') {
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
        } else {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }
    }
}
