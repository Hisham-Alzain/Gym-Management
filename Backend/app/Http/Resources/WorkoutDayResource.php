<?php

namespace App\Http\Resources;

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
            'exercises' => new WorkoutExerciseCollection($this->workoutExercises)
        ];
    }
}
