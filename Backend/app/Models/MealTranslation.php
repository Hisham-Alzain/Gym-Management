<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Belongsto;
use Illuminate\Database\Eloquent\Model;
use App\Enums\Languages;

class MealTranslation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'meal_id',
        'lang',
        'meal_name',
        'description'
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
            'lang' => Languages::class
        ];
    }

    /* Relations */
    public function meal(): BelongsTo
    {
        return $this->belongsTo(Meal::class, 'meal_id', 'id');
    }
}
