<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserInfo;
use App\Models\DietProgram;
use App\Models\WorkoutProgram;
use Illuminate\Http\Request;
use App\Http\Requests\UserInfoRequest;
use App\Http\Resources\UserInfoResource;
use App\Http\Resources\DietProgramResource;
use App\Http\Resources\DietProgramCollection;
use App\Http\Resources\WorkoutProgramResource;
use App\Http\Resources\WorkoutProgramCollection;
use Illuminate\Support\Facades\Auth;


class TraineeController extends Controller
{
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
            $user->birthdate = $validated['birth_date'];
            $user->save();
        }
        if (isset($validated['gender'])) {
            $user->birthdate = $validated['gender'];
            $user->save();
        }

        // Get userInfo
        $userInfo = UserInfo::where("user_id", $user->id)->first();

        // Check userInfo
        if ($userInfo == null) {
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
        if ($user->role == 'trainer') {
            // Response
            return response()->json([
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'role' => $user->role
                ],
                "message" => "Coach info retrieved successfully"
            ], 200);
        }

        // Trainee
        // Response
        return response()->json(
            [
                "data" => new UserInfoResource($user),
                "message" => "User info retrieved successfully"
            ],
            200
        );
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

        // Get programs
        $programs = WorkoutProgram::where('user_id', $user->id)
            ->orderBy('updated_at')->paginate(10);

        // Response
        return response()->json([
            "message" => "programs fetched",
            "programs" => new WorkoutProgramCollection($programs->items()),
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

        // Get programs
        $program = WorkoutProgram::where('id', $program_id)
            ->where('user_id', $user->id)->first();

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

        // Get programs
        $programs = DietProgram::where('user_id', $user->id)
            ->orderBy('updated_at')->paginate(10);

        // Response
        return response()->json([
            "message" => "programs fetched",
            "programs" => new DietProgramCollection($programs->items()),
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

        // Get programs
        $program = DietProgram::where('id', $program_id)
            ->where('user_id', $user->id)->first();

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

    public function generateNumberArray($start, $end)
    {
        $numbers = range($start, $end);
        return $numbers;
    }
}
