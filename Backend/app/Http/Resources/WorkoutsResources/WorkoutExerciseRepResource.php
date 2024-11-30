<?php

namespace App\Http\Resources\WorkoutsResources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkoutExerciseRepResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'date' => $this->day_date,
            'reps' => $this->user_reps,
            'rest_time' => $this->user_rest_time,
            'rep_weight' => number_format($this->user_rep_weight, 2, '.', ''),
        ];
    }
}
