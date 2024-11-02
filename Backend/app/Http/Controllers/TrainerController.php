<?php

namespace App\Http\Controllers;


use App\Models\User;
use App\Models\Subscription;
use APP\Models\Meal;
use App\Models\DietMeal;
use App\Models\DietProgram;
use App\Models\Exercise;
use App\Models\WorkoutExercise;
use App\Models\WorkoutExerciseSet;
use App\Models\WorkoutDay;
use App\Models\WorkoutProgram;
use App\Enums\WorkoutMuscle;
use App\Policies\AdminPolicy;
use App\Filters\ExerciseFilter;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Http\Requests\SubscriptionRequest;
use App\Http\Requests\DietRequest;
use App\Http\Requests\MealRequest;
use App\Http\Requests\WorkoutRequest;
use App\Http\Requests\ExerciseRequest;
use App\Http\Requests\DefaultWorkoutRequest;
use App\Http\Requests\VideoRequest;
use App\Http\Resources\UserInfoCollection;
use App\Http\Resources\SubscriptionResource;
use App\Http\Resources\SubscriptionCollection;
use App\Http\Resources\MealResource;
use App\Http\Resources\MealCollection;
use App\Http\Resources\DietProgramResource;
use App\Http\Resources\DietProgramCollection;
use App\Http\Resources\ExerciseResource;
use App\Http\Resources\ExerciseCollection;
use App\Http\Resources\WorkoutProgramResource;
use App\Http\Resources\WorkoutProgramCollection;


class TrainerController extends Controller
{
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

    public function ShowWorkoutPrograms(Request $request, $user_id)
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
            // Check user
            $wantedUser = User::find($user_id);
            if ($wantedUser == null) {
                return response()->json([
                    'errors' => ['user' => 'User was not user'],
                ], 404);
            }

            // Get user programs
            $programs = WorkoutProgram::where('user_id', $wantedUser->id)
                ->orderBy('updated_at')->paginate(10);

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

    public function ShowWorkoutProgram(Request $request, $program_id)
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
            $program = WorkoutProgram::find($program_id);

            // Check program
            if ($program == null) {
                return response()->json([
                    'errors' => ['program' => 'program was not found'],
                ], 404);
            } else {
                // Response
                return response()->json([
                    "message" => "program fetched",
                    "program" => new WorkoutProgramResource($program),
                ], 200);
            }
        }
    }

    public function CreateDefaultWorkoutProgram(DefaultWorkoutRequest $request)
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

        // Check user_role
        $policy = new AdminPolicy();
        if (!$policy->Policy(User::find($user->id))) {
            // Response
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        } else {
            //to be implented when defaultWorkout json is filled with data
        }
    }

    public function ShowExerciseMuscles(Request $request)
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
            // Get Muscles
            $enumNames = WorkoutMuscle::names();
            $enumValues = WorkoutMuscle::values();
            $response = [];
            for ($i = 0; $i < count($enumValues); $i++) {
                array_push($response, ['id' => $i + 1, 'name' => $enumNames[$i], 'value' => $enumValues[$i]]);
            }

            // Response
            return response()->json([
                "muscles" => $response,
            ], 200);
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
            // Filter skills based on type
            $filter = new ExerciseFilter();
            $queryItems = $filter->transform($request);

            // Response
            if (empty($queryItems)) {
                // Get all exercises
                $exercises = Exercise::paginate(10);
                $message = 'idk but 1';
            } else {
                $exercises = Exercise::where($queryItems)->paginate(10);
                $message = 'idk but 2';
            }
            // Response
            return response()->json([
                "message" => $queryItems,
                "exercises" => new ExerciseCollection($exercises),
                'pagination_data' => [
                    'from' => $exercises->firstItem(),
                    'to' => $exercises->lastItem(),
                    'total' => $exercises->total(),
                    'first_page' => 1,
                    'current_page' => $exercises->currentPage(),
                    'last_page' => $exercises->lastPage(),
                    'has_more_pages' => $exercises->hasMorePages(),
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

    public function UploadExerciseVideo(VideoRequest $request)
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
            // Get exercise
            $exercise = Exercise::find($validated['exercise_id']);

            // Check exercise
            if ($exercise == null) {
                return response()->json([
                    'errors' => ['exercise' => 'Exercise was not found'],
                ], 404);
            }

            // Handle file uploads if present in the request
            if ($request->hasFile('video')) {
                // Get Uploaded photos
                $video = $request->file('video');

                // Set destination
                $destination = 'exercises_videos';

                // Get file name
                $extension = $video->getClientOriginalName();

                // Set file name
                $fileName = now()->format('Y_m_d_His') . $extension;

                // Check and delete previous video
                $previous_path = $exercise->video_path;
                if ($previous_path != null) {
                    if (file_exists(storage_path('app/private/' . $previous_path))) {
                        unlink(storage_path('app/private/' . $previous_path));
                    }
                }

                // Store file and get path
                $path = $video->storeAs($destination, $fileName);
                $exercise->video_path = $path;
                $exercise->save();
            } else {
                // Response
                return response()->json([
                    'errors' => ['video' => 'Invalid video'],
                ], 401);
            }

            // Response
            return response()->json([
                "message" => "exercise video updated successfully"
            ], 200);
        }
    }

    public function AddExercise(ExerciseRequest $request)
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
            // Handle file uploads if present in the request
            if ($request->hasFile('thumbnail_path')) {
                // Get Uploaded photos
                $thumbnail = $request->file('thumbnail_path');

                // Set destination
                $thumbnail_destination = 'exercises_thumbnails';

                // Get file name
                $thumbnail_extension = $thumbnail->getClientOriginalName();

                // Set file name
                $photoName = now()->format('Y_m_d_His') . $thumbnail_extension;

                // Store file and get path
                $thumbnail_path = $thumbnail->storeAs($thumbnail_destination, $photoName);
                $validated['thumbnail_path'] = $thumbnail_path;
            }

            // Handle file uploads if present in the request
            if ($request->hasFile('video_path')) {
                // Get Uploaded photos
                $video = $request->file('video_path');

                // Set destination
                $video_destination = 'exercises_videos';

                // Get file name
                $video_extension = $video->getClientOriginalName();

                // Set file name
                $fileName = now()->format('Y_m_d_His') . $video_extension;

                // Store file and get path
                $video_path = $thumbnail->storeAs($video_destination, $fileName);
                $validated['video_path'] = $video_path;
            }

            // Create exercise
            $exercise = Exercise::create($validated);

            // Response
            return response()->json([
                'message' => 'Exercise has been created successfully',
                'exercise' => new ExerciseResource($exercise)
            ], 201);
        }
    }

    public function UpdateExercise(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'exercise_id' => ['required'],
            'description' => ['required']
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
            // Get exercise
            $exercise = Exercise::find($validated['exercise_id']);

            // Check exercise
            if ($exercise == null) {
                return response()->json([
                    'errors' => ['exercise' => 'Exercise was not found'],
                ], 404);
            }

            // Update exercise
            $exercise->description = $validated['description'];
            $exercise->save();

            // Response
            return response()->json([
                "message" => "Exercise has been updated successfully"
            ], 200);
        }
    }

    public function DeleteExercise(Request $request, $exercise_id)
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
            // Response
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        } else {
            // Get exercise
            $exercise = Exercise::find('id', $exercise_id);

            // Check exercise
            if ($exercise == null) {
                // Response
                return response()->json([
                    'errors' => ['exercise' => 'Exercise was not found'],
                ], 404);
            } else {
                // Delete exercise
                $exercise->delete();

                // Response
                return response()->json([
                    'message' => 'Exercise has been deleted successfully',
                ], 204);
            }
        }
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
            // Get program
            $program = WorkoutProgram::find($program_id);

            // Check program
            if ($program == null) {
                // Response
                return response()->json([
                    'errors' => ['program' => 'Program was not found'],
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
                    'meal_id' => $M['meal_id'],
                    'meal_number' => $M['meal_number'],
                    'quantity' => $M['quantity'],
                    'details' => $M['details'],
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

    public function ShowDietPrograms(Request $request, $user_id)
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
            // Check user
            $wantedUser = User::find($user_id);
            if ($wantedUser == null) {
                return response()->json([
                    'errors' => ['user' => 'User was not user'],
                ], 404);
            }

            // Get user programs
            $programs = DietProgram::where('user_id', $wantedUser->id)
                ->orderBy('updated_at')->paginate(10);

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

    public function ShowDietProgram(Request $request, $program_id)
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
                return response()->json([
                    'errors' => ['program' => 'program was not found'],
                ], 404);
            } else {
                // Response
                return response()->json([
                    "message" => "program fetched",
                    "program" => new DietProgramResource($program),
                ], 200);
            }
        }
    }

    public function ShowMeals(Request $request)
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
            $meals = Meal::paginate(10);

            // Response
            return response()->json([
                "message" => "exercises fetched",
                "exercises" => new MealCollection($meals),
                'pagination_data' => [
                    'from' => $meals->firstItem(),
                    'to' => $meals->lastItem(),
                    'total' => $meals->total(),
                    'first_page' => 1,
                    'current_page' => $meals->currentPage(),
                    'last_page' => $meals->lastPage(),
                    'pageNumbers' => $this->generateNumberArray(1, $meals->lastPage()),
                    'first_page_url' => $meals->url(1),
                    'current_page_url' => $meals->url($meals->currentPage()),
                    'last_page_url' => $meals->url($meals->lastPage()),
                    'next_page' => $meals->nextPageUrl(),
                    'prev_page' => $meals->previousPageUrl(),
                    'path' => $meals->path(),
                ],
            ]);
        }
    }

    public function AddMeal(MealRequest $request)
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
            $meal = Meal::create($validated);

            // Response
            return response()->json([
                'message' => 'Meal has been created successfully',
                'meal' => new MealResource($meal)
            ], 201);
        }
    }

    public function UpdateMeal(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'meal_id' => ['required'],
            'description' => ['sometimes'],
            'calories' => ['sometimes'],
            'protein' => ['sometimes'],
            'carbs' => ['sometimes'],
            'fat' => ['sometimes']
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
            // Get Meal
            $meal = Meal::find($validated['meal_id']);

            // Check exercise
            if ($meal == null) {
                return response()->json([
                    'errors' => ['meal' => 'Meal was not found'],
                ], 404);
            }

            // Update meal
            $validated = Arr::except($validated, 'meal_id');
            $meal->fill($validated);
            $meal->save();

            // Response
            return response()->json([
                "message" => "Meal has been updated successfully"
            ], 200);
        }
    }

    public function DeleteMeal(Request $request, $meal_id)
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
            $meal = Meal::find($meal_id);

            // Check meal
            if ($meal == null) {
                // Response
                return response()->json([
                    'errors' => ['meal' => 'Meal was not found'],
                ], 404);
            } else {
                // Delete meal
                $meal->delete();

                // Response
                return response()->json([
                    'message' => 'Meas has been deleted successfully'
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
                    'errors' => ['program' => 'Program was not found'],
                ], 404);
            } else {
                // Delete program
                $program->delete();

                // Response
                return response()->json([
                    'message' => 'Program has been deleted successfully'
                ], 204);
            }
        }
    }

    public function generateNumberArray($start, $end)
    {
        $numbers = range($start, $end);
        return $numbers;
    }
}
