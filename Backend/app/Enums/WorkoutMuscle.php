<?php

namespace App\Enums;

enum WorkoutMuscle: string
{
    case Chest = 'Chest';
    case Back = 'Back';
    case Shoulders = 'Shoulders';
    case Biceps = 'Biceps';
    case Triceps = 'Triceps';
    case Arms = 'Arms';
    case Legs = 'Legs';
    case Chest_Biceps = 'Chest_Biceps';
    case Back_Triceps = 'Back_Triceps';
    case Legs_Shoulders = 'Legs_Shoulders';
    case Abs = 'Abs';
    case ALL='ALL';
    case Chest_Back_Triceps = 'Chest_Back_Triceps';
    case Biceps_Legs_Shoulders = 'Biceps_Legs_Shoulders';

    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return [
            ['en' => 'Chest', 'ar' => 'صدر'],
            ['en' => 'Back', 'ar' => 'ظهر'],
            ['en' => 'Shoulders', 'ar' => 'أكتاف'],
            ['en' => 'Biceps', 'ar' => 'يدين أمامي'],
            ['en' => 'Triceps', 'ar' => 'يدين خلفي'],
            ['en' => 'Arms', 'ar' => 'يدين'],
            ['en' => 'Legs', 'ar' => 'رجلين'],
            ['en' => 'Chest_Biceps', 'ar' => 'صدر و يدين أمامي'],
            ['en' => 'Back_Triceps', 'ar' => 'ظهر و يدين خلفي'],
            ['en' => 'Legs_Shoulders', 'ar' => 'رجلين و أكتاف'],
            ['en' => 'Abs', 'ar' => 'معدة'],
            ['en' => 'All', 'ar' => 'كل العضلات'],
            ['en' => 'Chest_Back_Triceps', 'ar' => 'صدر و يدين خلفي و ظهر'],
            ['en' => 'Biceps_Legs_Shoulders', 'ar' => 'رجلين و أكتاف ويدين أمامي'],
        ];
    }
}
