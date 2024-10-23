<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\DietMeal;
use App\Models\Exercise;
use App\Models\WorkoutDay;
use App\Models\DietProgram;
use App\Models\Subscription;
use App\Models\WorkoutProgram;
use App\Models\WorkoutExercise;
use App\Models\WorkoutExerciseSet;
use App\Policies\AdminPolicy;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Requests\DietRequest;
use App\Http\Requests\MealRequest;
use App\Http\Requests\U_MealRequest;
use App\Http\Requests\WorkoutRequest;
use App\Http\Requests\AddExerciseRequest;
use App\Http\Requests\SubscriptionRequest;
use App\Http\Resources\DietMealResource;
use App\Http\Resources\ExerciseCollection;
use App\Http\Resources\UserInfoCollection;
use App\Http\Resources\DietProgramResource;
use App\Http\Resources\SubscriptionResource;
use App\Http\Resources\DietProgramCollection;
use App\Http\Resources\SubscriptionCollection;
use App\Http\Resources\WorkoutProgramResource;
use App\Http\Resources\WorkoutProgramCollection;


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
                    'errors' => ['user' => 'user was not found'],
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
            // Create program
            $program = WorkoutProgram::create([
                'user_id' => $validated['user_id'],
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
                'repeat_days' => $validated['repeat_days']
            ]);
            // Create days
            foreach ($validated['days'] as $D) {
                $day = WorkoutDay::create([
                    'workout_program_id' => $program->id,
                    'muscle' => $D['muscle']
                ]);
                foreach ($D['exercises'] as $E) {
                    $exercise = WorkoutExercise::create([
                        'workout_day_id' => $day->id,
                        'exercise_id' => $E['exercise_id'],
                    ]);
                    foreach ($E['sets'] as $S) {
                        $set = WorkoutExerciseSet::create([
                            'workout_exercise_id' => $exercise->id,
                            'set_number' => $S['set_no'],
                            'expected_reps' => $S['exp_reps'],
                        ]);
                    }
                }
            }

            // Response
            return response()->json([
                'message' => 'Workout program has been created successfully',
                'program' => new WorkoutProgramResource($program)
            ], 201);
        }
    }

    public function ShowWorkoutPrograms(Request $request)
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
            // Get all programs
            $programs = WorkoutProgram::paginate(10);

            // Response
            return response()->json([
                "message" => "programs fetched",
                "programs" => new WorkoutProgramCollection($programs),
                'pagination_data' => [
                    'from' => $programs->firstItem(),
                    'to' => $programs->lastItem(),
                    'total' => $programs->total(),
                    'first_page' => 1,
                    'current_page' => $programs->currentPage(),
                    'last_page' => $programs->lastPage(),
                    'pageNumbers' => $this->generateNumberArray(1, $programs->lastPage()),
                    'first_page_url' => $programs->url(1),
                    'current_page_url' => $programs->url($programs->currentPage()),
                    'last_page_url' => $programs->url($programs->lastPage()),
                    'next_page' => $programs->nextPageUrl(),
                    'prev_page' => $programs->previousPageUrl(),
                    'path' => $programs->path(),
                ],
            ]);
        }
    }

    public function ShowExercises(Request $request)
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
            // Get all exercises
            $exercises = Exercise::paginate(10);

            // Response
            return response()->json([
                "message" => "exercises fetched",
                "exercises" => new ExerciseCollection($exercises),
                'pagination_data' => [
                    'from' => $exercises->firstItem(),
                    'to' => $exercises->lastItem(),
                    'total' => $exercises->total(),
                    'first_page' => 1,
                    'current_page' => $exercises->currentPage(),
                    'last_page' => $exercises->lastPage(),
                    'pageNumbers' => $this->generateNumberArray(1, $exercises->lastPage()),
                    'first_page_url' => $exercises->url(1),
                    'current_page_url' => $exercises->url($exercises->currentPage()),
                    'last_page_url' => $exercises->url($exercises->lastPage()),
                    'next_page' => $exercises->nextPageUrl(),
                    'prev_page' => $exercises->previousPageUrl(),
                    'path' => $exercises->path(),
                ],
            ]);
        }
    }

    public function AddExercise(AddExerciseRequest $request)
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
            Exercise::create($validated);
            return response()->json([
                "message" => "exercise created successfully"
            ], 201);
        }
    }

    public function DeleteExercise(Request $request, $exercise_id)
    {
        $exercise = Exercise::where('id', $exercise_id)->first();
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
            // Response
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        } else {
            $exercise->delete();
            return response()->json([
                'message' => 'exercise deleted successfully',
            ], 204);
        }
    }

    public function CreateExerciseSet(Request $request, $program_id)
    {
    }

    public function UpdateExerciseSet(Request $request, $program_id)
    {
    }

    public function DeleteExerciseSet(Request $request, $program_id)
    {
    }

    public function DeleteWorkoutProgram(Request $request, $program_id)
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
            $program = WorkoutProgram::find($program_id);

            // Check Trainee
            if ($program == null) {
                // Response
                return response()->json([
                    'errors' => ['program' => 'program was not found'],
                ], 404);
            } else {
                // Delete trainee
                $program->delete();

                // Response
                return response()->json([
                    'message' => 'Successfully deleted program'
                ], 204);
            }
        }
    }

    public function CreateDietProgram(DietRequest $request)
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
            // Create program
            $program = DietProgram::create([
                'user_id' => $validated['user_id'],
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
            ]);
            // Create meals
            foreach ($validated['meals'] as $M) {
                $meal = DietMeal::create([
                    'diet_program_id' => $program->id,
                    'meal_number' => $M['meal_number'],
                    'meal_name' => $M['meal_name'],
                    'description' => $M['description'],
                    'time_after' => $M['time_after']
                ]);
            }

            // Response
            return response()->json([
                'message' => 'Diet program has been created successfully',
                'program' => new DietProgramResource($program)
            ], 201);
        }
    }

    public function ShowDietPrograms(Request $request)
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
            // Get all programs
            $programs = DietProgram::paginate(10);

            // Response
            return response()->json([
                "message" => "programs fetched",
                "programs" => new DietProgramCollection($programs),
                'pagination_data' => [
                    'from' => $programs->firstItem(),
                    'to' => $programs->lastItem(),
                    'total' => $programs->total(),
                    'first_page' => 1,
                    'current_page' => $programs->currentPage(),
                    'last_page' => $programs->lastPage(),
                    'pageNumbers' => $this->generateNumberArray(1, $programs->lastPage()),
                    'first_page_url' => $programs->url(1),
                    'current_page_url' => $programs->url($programs->currentPage()),
                    'last_page_url' => $programs->url($programs->lastPage()),
                    'next_page' => $programs->nextPageUrl(),
                    'prev_page' => $programs->previousPageUrl(),
                    'path' => $programs->path(),
                ],
            ]);
        }
    }

    public function CreateDietMeal(MealRequest $request)
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
            // Create meal
            $meal = DietMeal::create([
                'diet_program_id' => $validated['program_id'],
                'meal_number' => $validated['meal_number'],
                'meal_name' => $validated['meal_name'],
                'description' => $validated['description'],
                'time_after' => $validated['time_after']
            ]);

            // Response
            return response()->json([
                'message' => 'Meal has been created successfully',
                'meal' => new DietMealResource($meal)
            ], 201);
        }
    }

    public function UpdateDietMeal(U_MealRequest $request)
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
            // Find meal
            $meal = DietMeal::find($validated['meal_id']);

            // Check meal
            if ($meal == null) {
                return response()->json([
                    'errors' => ['meal' => 'Meal was not found'],
                ], 404);
            }

            // Update meal
            $meal->fill($validated);
            $meal->save();

            // Response
            return response()->json([
                'message' => 'Meal has been updated successfully',
                'meal' => new DietMealResource($meal)
            ], 200);
        }
    }

    public function DeleteDietMeal(Request $request, $meal_id)
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
            // Get meal
            $meal = DietMeal::find($meal_id);

            // Check meal
            if ($meal == null) {
                // Response
                return response()->json([
                    'errors' => ['meal' => 'meal was not found'],
                ], 404);
            } else {
                // Delete meal
                $meal->delete();

                // Response
                return response()->json([
                    'message' => 'Successfully deleted meal'
                ], 204);
            }
        }
    }

    public function DeleteDietProgram(Request $request, $program_id)
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
            // Get program
            $program = DietProgram::find($program_id);

            // Check program
            if ($program == null) {
                // Response
                return response()->json([
                    'errors' => ['program' => 'program was not found'],
                ], 404);
            } else {
                // Delete program
                $program->delete();

                // Response
                return response()->json([
                    'message' => 'Successfully deleted program'
                ], 204);
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

    public function generateNumberArray($start, $end)
    {
        $numbers = range($start, $end);
        return $numbers;
    }
}
