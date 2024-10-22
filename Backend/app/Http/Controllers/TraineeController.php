<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserInfo;
use App\Models\UserPhoto;
use App\Models\DietProgram;
use Illuminate\Http\Request;
use App\Models\WorkoutProgram;
use App\Policies\ProgramPloicy;
use App\Models\WorkoutExerciseRep;
use App\Models\WorkoutExerciseSet;
use App\Http\Requests\PhotosRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UserInfoRequest;
use App\Http\Resources\UserInfoResource;
use App\Http\Resources\DietProgramResource;
use App\Http\Requests\UserExerciseSetRequest;
use App\Http\Resources\DietProgramCollection;
use App\Http\Resources\WorkoutProgramResource;
use App\Http\Resources\WorkoutProgramCollection;
use App\Http\Resources\WorkoutExerciseSetResource;


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
            $user->birth_date = $validated['birth_date'];
            $user->save();
        }
        if (isset($validated['gender'])) {
            $user->gender = $validated['gender'];
            $user->save();
        }

        // Get userInfo
        $userInfo = UserInfo::where("user_id", $user->id)->first();

        // Check userInfo
        if ($userInfo == null) {
            $validated['user_id'] = $user->id;
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

    public function UploadPhotos(PhotosRequest $request)
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
        // Handle file uploads if present in the request
        if ($request->hasFile('photos')) {
            $photos = $request->file('photos');

            foreach ($photos as $photo) {
                $path = $photo->storeAs('usersPhotos/' . $user->id, $photo->getClientOriginalName());
                $userInfo = UserInfo::where('id', $user->id)->first();
                // Create and associate a new file instance with the portfolio
                UserPhoto::create([
                    'photo_path' => $path,
                    'info_id' => $userInfo->id
                ]);
            }
        }
        return response()->json([
            "message" => "Successfully uploaded photos"
        ], 201);
    }

    public function DeletePhoto(Request $request, $photo_id)
    {
        $photo = UserPhoto::where('id', $photo_id)->first();
        if ($photo == null) {
            return response()->json([
                "errors" => "photo not found"
            ], 404);
        }
        $photo->delete();
        return response()->json([
            "message" => "photo deleted successfully"
        ], 204);
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
        if ($user->role == 'Trainer') {
            // Response
            return response()->json([
                "message" => "Coach info retrieved successfully",
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'role' => $user->role
                ]
            ], 200);
        }

        // Trainee
        // Response
        return response()->json([
            "message" => "User retrieved successfully",
            "user" => new UserInfoResource($user)
        ], 200);
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

        if ($user->role == 'Trainer') {
            $user = User::where('id', $user_id)->first();
            if ($user == null) {
                return response()->json([
                    'errors' => ['user' => 'Invalid user'],
                ], 401);
            }
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

        // Get program
        $program = WorkoutProgram::where('id', $program_id)->first();

        // Check program
        if ($program == null) {
            return response()->json([
                'errors' => ['program' => 'program was not found'],
            ], 404);
        } else {
            // Check user_role
            $policy = new ProgramPloicy();
            if (!$policy->WorkoutPolicy(User::find($user->id), $program)) {
                // Response
                return response()->json([
                    'errors' => ['user' => 'Invalid user'],
                ], 401);
            } else {
                // Response
                return response()->json([
                    "message" => "program fetched",
                    "program" => new WorkoutProgramResource($program),
                ], 200);
            }
        }
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

        // Update set
        // Get rep
        $rep = WorkoutExerciseRep::create($validated);

        // Response
        return response()->json([
            'message' => 'Set has been Updated successfully',
            'set' => new WorkoutExerciseSetResource($set)
        ], 200);
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
