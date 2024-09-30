<?php

namespace App;

enum WorkoutMuscle :string
{
    case Chest = 'Chest';
    case Back = 'Back';
    case Shoulders = 'Shoulders';
    case Legs = 'Legs';
    case Arms = 'Arms';
    case Chest_Biceps = 'Chest_Biceps';
    case Back_Triceps = 'Back_Triceps';
    case Leg_Shoulders = 'Leg_Shoulders';
    case Abs = 'Abs';

    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }
}
