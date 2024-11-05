<?php

namespace App\Http\Resources\WorkoutsResources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkoutExerciseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'workout_exercise_id' => $this->id,
            'exercise' => [
                'id' => $this->exercise->id,
                'name' => $this->exercise->name,
                'muscle' => $this->exercise->muscle,
                'description' => $this->exercise->description,
                'no_sets' => $this->sets()->count(),
                'sets' => new WorkoutExerciseSetCollection($this->sets),
                'video_path' => $this->exercise->video_path,
                'thumbnail_path' => $this->exercise->thumbnail_path,
            ]
        ];
    }
}
