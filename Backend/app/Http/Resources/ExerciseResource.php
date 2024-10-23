<?php

namespace App\Http\Resources;

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
            "name" => $this->name,
            "muscle" => $this->muscle,
            "Description" => $this->description,
            "photo" => $this->thumbnail_path,
            "video" => $this->video_path,
        ];
    }
}
