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
            'calories_per_gram' => number_format($this->calories, 2, '.', ''),
            'protein_per_gram' => number_format($this->protein, 2, '.', ''),
            'carbs_per_gram' => number_format($this->carbs, 2, '.', ''),
            'fat_per_gram' => number_format($this->fat, 2, '.', ''),
            'K_per_gram' => number_format($this->K, 2, '.', ''),
            'Na_per_gram' => number_format($this->Na, 2, '.', ''),
            'GI' => $this->GI->value(),
            'thumbnail_path' => $this->thumbnail_path
        ];
    }
}
