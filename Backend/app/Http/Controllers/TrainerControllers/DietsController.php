<?php

namespace App\Http\Controllers\TrainerControllers;

use App\Http\Controllers\MainController;

use App\Models\User;
use APP\Models\Meal;
use App\Models\DietMeal;
use App\Models\DietProgram;
use App\Policies\AdminPolicy;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Http\Requests\MealRequest;
use App\Http\Requests\DietRequest;
use App\Http\Resources\MealResource;
use App\Http\Resources\MealCollection;
use App\Http\Resources\DietsResources\DietProgramResource;
use App\Http\Resources\DietsResources\DietProgramCollection;


class DietsController extends MainController
{
    public function CreateDefaultDietProgram(Request $request)
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
            //to be implented when defaultDiet json is filled with data
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
                    'has_more_pages' => $meals->hasMorePages(),
                    'pageNumbers' => $this->generateNumberArray(1, $meals->lastPage()),
                    'first_page_url' => $meals->url(1),
                    'current_page_url' => $meals->url($meals->currentPage()),
                    'last_page_url' => $meals->url($meals->lastPage()),
                    'next_page_url' => $meals->nextPageUrl(),
                    'prev_page_url' => $meals->previousPageUrl(),
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
}
