<?php

namespace App\Http\Resources\WorkoutsResources;

use App\Models\User;
use Illuminate\Http\Request;
use App\Policies\AdminPolicy;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkoutExerciseSetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user=Auth::user();
        // Check user_role
        $policy = new AdminPolicy();
        if (!$policy->Policy(User::find($user->id))) {
            $latestRep = $this->workoutExerciseReps()->latest()->first();
            $user_sets = $latestRep ? new WorkoutExerciseRepResource($latestRep) : null;
        } else {
            $user_sets=new WorkoutExerciseRepCollection($this->workoutExerciseReps);
        }
        return [
            'set_id' => $this->id,
            'set_number' => $this->set_number,
            'expected_reps' => $this->expected_reps,
            'user_sets' => $user_sets
        ];
    }
}
