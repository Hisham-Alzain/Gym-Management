<?php

namespace App\Http\Resources\WorkoutsResources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkoutDayResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'day_id' => $this->id,
            'muscle' => $this->muscle,
            'exercises' => WorkoutExerciseResource::collection(
                $this->workoutExercises->map(function ($workoutExercise) {
                    return new WorkoutExerciseResource($workoutExercise, true); // Exclude sets
                })
            )
        ];
    }
}
