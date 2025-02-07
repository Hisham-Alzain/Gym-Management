<?php

namespace App\Http\Controllers\TraineeControllers;

use App\Http\Controllers\MainController;

use App\Models\WorkoutDay;
use App\Models\WorkoutProgram;
use App\Models\WorkoutExercise;
use App\Models\WorkoutExerciseSet;
use App\Models\WorkoutExerciseRep;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Requests\UserExerciseSetRequest;
use App\Http\Resources\WorkoutsResources\WorkoutDayResource;
use App\Http\Resources\WorkoutsResources\WorkoutExerciseResource;
use App\Http\Resources\WorkoutsResources\WorkoutProgram2Resource;
use App\Http\Resources\WorkoutsResources\WorkoutProgram2Collection;
use App\Http\Resources\WorkoutsResources\WorkoutExerciseSetResource;

class WorkoutsController extends MainController
{
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

        // Get programs
        $programs = WorkoutProgram::where('user_id', $user->id)
            ->orderBy('updated_at')->paginate(10);

        // Response
        return response()->json([
            "message" => "programs fetched",
            "programs" => new WorkoutProgram2Collection($programs),
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

    public function ShowWorkoutDay(Request $request, $day_id)
    {
        // Get user
        $user = Auth::user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Get program day
        $day = WorkoutDay::find($day_id);

        // Check program day
        if ($day == null) {
            return response()->json([
                'errors' => ['day' => 'Workout day was not found'],
            ], 404);
        } else {
            // Response
            return response()->json([
                "message" => "day fetched",
                "day" => new WorkoutDayResource($day),
            ], 200);
        }
    }

    public function ShowWorkoutExercise(Request $request, $workout_exercise_id)
    {
        // Get user
        $user = Auth::user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Get exercise
        $workout_exercise = WorkoutExercise::find($workout_exercise_id);

        // Check exercise
        if ($workout_exercise == null) {
            return response()->json([
                'errors' => ['workout_exercise' => 'Exercise was not found'],
            ], 404);
        }

        // Response
        return response()->json([
            "exercise" => new WorkoutExerciseResource($workout_exercise),
            "message" => 'Exercise has been fetched successfully'
        ], 200);
    }

    public function UpdateExerciseSet(UserExerciseSetRequest $request)
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

        // Get set
        $set = WorkoutExerciseSet::where('id', $validated['set_id'])->first();

        // Check set
        if ($set == null) {
            return response()->json([
                'errors' => ['set' => 'Set was not found'],
            ], 404);
        }

        // Update the same set and rep
        $prev_rep = WorkoutExerciseRep::where('set_id', $set->id)->latest()->first();
        if ($prev_rep != null && $prev_rep['day_date'] == $validated['day_date']) {
            $prev_rep->update($validated);
        } else {
            // Update set by creating a new rep
            $rep = WorkoutExerciseRep::create($validated);
        }

        // Response
        return response()->json([
            'message' => 'Set has been Updated successfully',
            'set' => new WorkoutExerciseSetResource($set)
        ], 200);
    }
}
