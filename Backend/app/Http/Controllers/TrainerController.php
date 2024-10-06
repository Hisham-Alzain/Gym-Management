<?php

namespace App\Http\Controllers;


use App\Models\User;
use App\Models\Subscription;
use App\Models\WorkoutDay;
use App\Models\WorkoutExercise;
use App\Models\WorkoutExerciseRep;
use App\Models\WorkoutProgram;
use App\Policies\AdminPolicy;
use Illuminate\Http\Request;
use App\Http\Requests\WorkoutRequest;
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
            $users = User::paginate(10);

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

    public function CreateDietProgram()
    {
    }

    public function CreateWorkoutProgram(WorkoutRequest $request)
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
            $program = WorkoutProgram::create([
                'user_id' => $validated['user_id'],
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
                'no_days' => $validated['no_days'],
                'repeat_days' => $validated['repeat_days']
            ]);
            foreach ($validated['days'] as $D) {
                $day = WorkoutDay::create([
                    'workout_program_id' => $program->id,
                    'muscle' => $D['muscle']
                ]);
                foreach ($validated['exercises'] as $E) {
                    $exercise = WorkoutExercise::create([
                        'exercise_id' => $E['exercise_id'],
                        'no_sets' => $E['no_sets']
                    ]);
                    foreach ($E['sets'] as $S) {
                        $set = WorkoutExerciseRep::create([
                            'workout_exercise_id' => $exercise->id,
                            'set_number' => $S['set_no'],
                            'expected_reps' => $S['exp_reps'],
                            'expected_weight' => $S['exp_weight'],
                        ]);
                    }
                }
            }
            return response()->json($validated, 200);
        }
    }

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
            $subscriptions = Subscription::paginate(10);

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

    public function generateNumberArray($start, $end)
    {
        $numbers = range($start, $end);
        return $numbers;
    }
}
