<?php

namespace App\Http\Controllers\TrainerControllers;

use App\Http\Controllers\MainController;

use App\Models\User;
use App\Models\Exercise;
use App\Models\ExerciseTranslation;
use App\Models\WorkoutExercise;
use App\Models\WorkoutExerciseSet;
use App\Models\WorkoutDay;
use App\Models\WorkoutProgram;
use App\Policies\AdminPolicy;
use App\Filters\ExerciseFilter;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use App\Http\Requests\ExerciseRequest;
use App\Http\Requests\ExercisePhotoRequest;
use App\Http\Requests\WorkoutRequest;
use App\Http\Requests\DefaultWorkoutRequest;
use App\Http\Requests\VideoRequest;
use App\Http\Resources\ExerciseResource;
use App\Http\Resources\ExerciseCollection;
use App\Http\Resources\WorkoutsResources\WorkoutProgramResource;
use App\Http\Resources\WorkoutsResources\WorkoutProgramCollection;

class WorkoutsController extends MainController
{
    public function CreateDefaultWorkoutProgram(DefaultWorkoutRequest $request)
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
            // Get json path
            $filePath = base_path('defaultWorkouts.json');

            // Open json
            $jsonData = File::get($filePath);
            $data = json_decode($jsonData, true);
            $data = $data[$validated['program_name']];

            // Create program
            $program = WorkoutProgram::create([
                'user_id' => $validated['user_id'],
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
                'repeat_days' => $data['repeat_days'],
            ]);

            // Create days
            foreach ($data['days'] as $D) {
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
                            'expected_rest_time' => $S['expected_rest_time'],
                            'tempo' => $S['tempo']
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
                    $exercise_fetched = Exercise::where('id', $E['exercise_id'])->first();
                    $exercise = WorkoutExercise::create([
                        'workout_day_id' => $day->id,
                        'exercise_id' => $exercise_fetched->id,
                    ]);
                    foreach ($E['sets'] as $S) {
                        $set = WorkoutExerciseSet::create([
                            'workout_exercise_id' => $exercise->id,
                            'set_number' => $S['set_no'],
                            'expected_reps' => $S['exp_reps'],
                            'expected_rest_time' => $S['exp_rest'],
                            'tempo' => $S['tempo']
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
                    'has_more_pages' => $programs->hasMorePages(),
                    'pageNumbers' => $this->generateNumberArray(1, $programs->lastPage()),
                    'first_page_url' => $programs->url(1),
                    'current_page_url' => $programs->url($programs->currentPage()),
                    'last_page_url' => $programs->url($programs->lastPage()),
                    'next_page_url' => $programs->nextPageUrl(),
                    'prev_page_url' => $programs->previousPageUrl(),
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
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Filter exercises based on request parameters
        $filter = new ExerciseFilter();
        $queryItems = $filter->transform($request);
        $exercises = [];

        // Query exercises based on filter
        if (empty($queryItems)) {
            // Get all exercises if no filters are applied
            $exercises = Exercise::paginate(10);
        } else {
            // Apply filters to the Exercise model
            $query = Exercise::query();

            // Get exercise based on filter
            $query->where(function ($q) use ($queryItems) {
                foreach ($queryItems as $queryItem) {
                    if (count($queryItem) === 3) {
                        $q->orWhere($queryItem[0], $queryItem[1], $queryItem[2]);
                    }
                }
            });

            $exercises = $query->paginate(10);
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
                'next_page_url' => $exercises->nextPageUrl(),
                'prev_page_url' => $exercises->previousPageUrl(),
                'path' => $exercises->path(),
            ],
        ]);
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
                    if (file_exists(storage_path('app/public/' . $previous_path))) {
                        unlink(storage_path('app/public/' . $previous_path));
                    }
                    if (file_exists(storage_path('app/private/' . $previous_path))) {
                        unlink(storage_path('app/private/' . $previous_path));
                    }
                }

                // Store file and get path
                $video->storeAs($destination, $fileName, options: ['disk' => 'local']);
                $path = $video->storeAs($destination, $fileName, options: ['disk' => 'public']);
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

    public function UpdateExercisePhoto(ExercisePhotoRequest $request)
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
            if ($request->hasFile('thumbnail_path')) {
                // Get Uploaded photos
                $thumbnail = $request->file('thumbnail_path');

                // Set destination
                $destination = 'exercises_thumbnails';

                // Get file name
                $extension = $thumbnail->getClientOriginalName();

                // Set file name
                $fileName = now()->format('Y_m_d_His') . $extension;

                // Check and delete previous video
                $previous_path = $exercise->thumbnail_path;
                if ($previous_path != null) {
                    if (file_exists(storage_path('app/public/' . $previous_path))) {
                        unlink(storage_path('app/public/' . $previous_path));
                    }
                    if (file_exists(storage_path('app/private/' . $previous_path))) {
                        unlink(storage_path('app/private/' . $previous_path));
                    }
                }

                // Store file and get path
                $thumbnail->storeAs($destination, $fileName, ['disk' => 'local']);
                $path = $thumbnail->storeAs($destination, $fileName, ['disk' => 'public']);
                $exercise->thumbnail_path = $path;
                $exercise->save();
            } else {
                // Response
                return response()->json([
                    'errors' => ['thumbnail' => 'Invalid thumbnail'],
                ], 401);
            }

            // Response
            return response()->json([
                "message" => "exercise thumbnail updated successfully"
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
                $thumbnail->storeAs($thumbnail_destination, $photoName, ['disk' => 'local']);
                $thumbnail_path = $thumbnail->storeAs($thumbnail_destination, $photoName, ['disk' => 'public']);
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
                $thumbnail->storeAs($video_destination, $fileName, ['disk' => 'local']);
                $video_path = $thumbnail->storeAs($video_destination, $fileName, ['disk' => 'public']);
                $validated['video_path'] = $video_path;
            }

            // Create exercise
            $exercise = Exercise::create($validated);
            ExerciseTranslation::create([
                "exercise_id" => $exercise->id,
                "lang" => "en",
                "name" => $validated['en_name'],
                "description" => $validated['en_description']
            ]);
            ExerciseTranslation::create([
                "exercise_id" => $exercise->id,
                "lang" => "ar",
                "name" => $validated['ar_name'],
                "description" => $validated['ar_description']
            ]);

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
            'lang' => ['required'],
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
            $translation = ExerciseTranslation::where('exercise_id', $validated['exercise_id'])
                ->where('lang', $validated['lang'])->first();

            // Check exercise
            if ($exercise == null || $translation == null) {
                return response()->json([
                    'errors' => ['exercise' => 'Exercise was not found'],
                ], 404);
            }

            // Update exercise
            $translation->description = $validated['description'];
            $translation->save();

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
            $exercise = Exercise::find($exercise_id);

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
                    'message' => 'Program has been deleted successfully'
                ], 204);
            }
        }
    }
}
