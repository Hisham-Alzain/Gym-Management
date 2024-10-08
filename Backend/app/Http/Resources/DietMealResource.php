<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DietMealResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'meal_id' => $this->id,
            'meal_number' => $this->meal_number,
            'meal_name' => $this->meal_name,
            'description' => $this->description,
            'time_after' => $this->time_after
        ];
    }
}
