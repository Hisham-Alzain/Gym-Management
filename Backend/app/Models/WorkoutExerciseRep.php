<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Belongsto;
use Illuminate\Database\Eloquent\Model;

class WorkoutExerciseRep extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'set_id',
        'user_reps',
        'user_rep_weight',
        'day_date'
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
    public function workoutExerciseSet(): BelongsTo
    {
        return $this->belongsTo(WorkoutExerciseSet::class, 'set_id', 'id');
    }
}
