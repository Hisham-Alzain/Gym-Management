<?php

namespace App\Policies;

use App\Models\DietProgram;
use App\Models\User;
use App\Models\WorkoutProgram;

class ProgramPloicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }
    public function WorkoutPolicy(User $user, WorkoutProgram $workoutProgram)
    {
        if ($user->role == 'Trainer' || $user->id == $workoutProgram->user_id) {
            return true;
        }
        return false;
    }
    public function DietPolicy(User $user, DietProgram $dietProgram)
    {
        if ($user->role == 'Trainer' || $user->id == $dietProgram->user_id) {
            return true;
        }
        return false;
    }
}
