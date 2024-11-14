<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MealTranslationsCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        $translations = [];

        foreach ($this->collection as $t) {
            $translation = [
                'meal_name' => $t->meal_name,
                'description' => $t->description
            ];
            $translations = array_merge($translations, [$t->lang->value() => $translation]);
        }

        return $translations;
    }
}
