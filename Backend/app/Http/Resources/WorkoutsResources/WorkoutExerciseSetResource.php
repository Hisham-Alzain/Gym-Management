<?php

namespace App\Http\Resources\WorkoutsResources;

use Illuminate\Http\Request;
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
        return [
            'set_id' => $this->id,
            'set_number' => $this->set_number,
            'expected_reps' => $this->expected_reps,
            'user_sets' => new WorkoutExerciseRepCollection($this->workoutExerciseReps)
        ];
    }
}
