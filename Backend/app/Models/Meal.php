<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'thumbnail_path',
        'calories',
        'protein',
        'carbs',
        'fat'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'calories' => 'decimal:2',
            'protein' => 'decimal:2',
            'carbs' => 'decimal:2',
            'fat' => 'decimal:2'
        ];
    }

    /* Relations */
    public function translations(): HasMany
    {
        return $this->hasMany(MealTranslation::class, 'meal_id', 'id');
    }

    public function dietMeals(): HasMany
    {
        return $this->hasMany(DietMeal::class, 'meal_id', 'id');
    }
}
