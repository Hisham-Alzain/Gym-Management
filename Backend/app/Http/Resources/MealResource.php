<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MealResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "meal_id" => $this->id,
            "translations" => new MealTranslationsCollection($this->translations),
            'calories_per_gram' => $this->calories,
            'protein_per_gram' => $this->protein,
            'carbs_per_gram' => $this->carbs,
            'fat_per_gram' => $this->fat,
            'GI' => $this->GI->value(),
            'thumbnail_path' => $this->thumbnail_path
        ];
    }
}
