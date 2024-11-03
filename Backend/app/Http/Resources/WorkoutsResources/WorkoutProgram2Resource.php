<?php

namespace App\Http\Resources\WorkoutsResources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkoutProgram2Resource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $days = [];
        foreach ($this->workoutDays as $day) {
            array_push($days, [
                'day_id' => $day->id,
                'muscle' => $day->muscle,
            ]);
        }

        return [
            'program_id' => $this->id,
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ],
            'start_date' => $this->start_date->format('Y-m-d'),
            'end_date' => $this->end_date->format('Y-m-d'),
            'repeat_days' => $this->repeat_days,
            'no_days' => $this->workoutDays()->count(),
            'days' => $days,
        ];
    }
}
