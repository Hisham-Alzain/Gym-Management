<?php

namespace App\Http\Resources\DietsResources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DietProgramResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'program_id' => $this->id,
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ],
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'no_meals' => $this->meals()->count(),
            'meals' => new DietMealCollection($this->meals)
        ];
    }
}
