<?php

namespace App\Http\Controllers\TraineeControllers;

use App\Http\Controllers\MainController;

use App\Models\DietProgram;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Resources\DietsResources\DietProgramResource;
use App\Http\Resources\DietsResources\DietProgramCollection;


class DietsController extends MainController
{
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
                "program" => new DietProgramResource($program),
            ], 200);
        }
    }
}
