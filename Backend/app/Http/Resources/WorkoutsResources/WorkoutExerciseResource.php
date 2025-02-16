<?php

namespace App\Http\Resources\WorkoutsResources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ExerciseTranslationsCollection;

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
                'muscle' => $this->exercise->muscle->value(),
                'translations' => new ExerciseTranslationsCollection($this->exercise->translations),
                'no_sets' => $this->sets()->count(),
                'sets' => new WorkoutExerciseSetCollection($this->sets),
                'thumbnail_path' => $this->exercise->thumbnail_path,

                'video_path' => $this->exercise->video_path,
                'video_ext' => pathinfo(storage_path($this->exercise->video_path), PATHINFO_EXTENSION),
            ]
        ];
    }
}
