<?php

namespace App\Http\Resources;

use App\Enums\WorkoutMuscle;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExerciseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "exercise_id" => $this->id,
            "translations" => new ExerciseTranslationsCollection($this->translations),
            "muscle" => $this->muscle->value(),
            "photo" => $this->thumbnail_path,
            "video" => $this->video_path,
        ];
    }
}
