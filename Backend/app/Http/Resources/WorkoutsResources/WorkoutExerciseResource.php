<?php

namespace App\Http\Resources\WorkoutsResources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkoutExerciseResource extends JsonResource
{
    protected $excludeSets;

    public function __construct($resource, $excludeSets = false)
    {
        parent::__construct($resource);
        $this->excludeSets = $excludeSets;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $exerciseArray = [
            'id' => $this->exercise->id,
            'name' => $this->exercise->name,
            'muscle' => $this->exercise->muscle,
            'description' => $this->exercise->description,
            'video_path' => $this->exercise->video_path,
            'thumbnail_path' => $this->exercise->thumbnail_path,
        ];

        if (!$this->excludeSets) {
            $exerciseArray['no_sets'] = $this->sets()->count();
            $exerciseArray['sets'] = new WorkoutExerciseSetCollection($this->sets);
        }

        return [
            'workout_exercise_id' => $this->id,
            'exercise' => $exerciseArray,
        ];
    }
}
