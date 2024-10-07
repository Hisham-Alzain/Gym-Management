<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Belongsto;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class WorkoutDay extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'workout_program_id',
        'muscle'
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
        return [];
    }

    /* Relations */
    public function workoutProgram(): BelongsTo
    {
        return $this->belongsTo(WorkoutProgram::class, 'workout_program_id', 'id');
    }

    public function workoutExercises(): HasMany
    {
        return $this->hasMany(WorkoutExercise::class, 'workout_day_id', 'id');
    }
}
