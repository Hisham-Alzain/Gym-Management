<?php

namespace App\Http\Resources\DietsResources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\MealTranslationsCollection;

class DietMealResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $total_calories = $this->quantity * $this->meal->calories;
        $total_protein = $this->quantity * $this->meal->protein;
        $total_carbs = $this->quantity * $this->meal->carbs;
        $total_fat = $this->quantity * $this->meal->fat;

        // Calculate time
        $time_after_hours = (int) ($this->time_after / 60);
        $time_after_minutes = (int) ($this->time_after % 60);
        if ($time_after_hours == 1) {
            $time_after = '1 hour';
        } else {
            $time_after = $time_after_hours . ' hours ';
        }

        if ($time_after_minutes == 1) {
            $time_after = $time_after . '1 minutes';
        } else if ($time_after_minutes > 1) {
            $time_after = $time_after . $time_after_minutes . ' minutes';
        }


        return [
            'meal_id' => $this->id,
            'meal' => [
                // Meal Model
                'id' => $this->meal->id,
                "translations" => new MealTranslationsCollection($this->meal->translations),

                'calories_gram' => number_format($this->meal->calories, 2, '.', ''),
                'protein_gram' => number_format($this->meal->protein, 2, '.', ''),
                'carbs_gram' => number_format($this->meal->carbs, 2, '.', ''),
                'fat_gram' => number_format($this->meal->fat, 2, '.', ''),
                'calories_total' => number_format($total_calories, 2, '.', ''),
                'protein_total' => number_format($total_protein, 2, '.', ''),
                'carbs_total' => number_format($total_carbs, 2, '.', ''),
                'fat_total' => number_format($total_fat, 2, '.', ''),
                'thumbnail_path' => $this->meal->thumbnail_path,

                // DietMeal Model
                'quantity' => number_format($this->quantity, 2, '.', ''),
                'meal_number' => $this->meal_number,
                'details' => $this->details,
                'time_after' => $time_after
            ]
        ];
    }
}
