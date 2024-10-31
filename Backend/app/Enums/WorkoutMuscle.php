<?php

namespace App\Enums;

enum WorkoutMuscle: string
{
    case Chest = 'Chest';
    case Back = 'Back';
    case Shoulders = 'Shoulders';
    case Arms = 'Arms';
    case Legs = 'Legs';
    case Chest_Biceps = 'Chest_Biceps';
    case Back_Triceps = 'Back_Triceps';
    case Leg_Shoulders = 'Legs_Shoulders';
    case Abs = 'Abs';

    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return [
            ['en' => 'Chest', 'ar' => 'صدر'],
            ['en' => 'Back', 'ar' => 'ضهر'],
            ['en' => 'Shoulders', 'ar' => 'أكتاف'],
            ['en' => 'Arms', 'ar' => 'يدين'],
            ['en' => 'Legs', 'ar' => 'رجلين'],
            ['en' => 'Chest_Biceps', 'ar' => 'صدر و يدين أمامي'],
            ['en' => 'Back_Triceps', 'ar' => 'ضهر و يدين خلفي'],
            ['en' => 'Legs_Shoulders', 'ar' => 'رجلين و أكتاف'],
            ['en' => 'Abs', 'ar' => 'معدة'],
        ];
    }
}
