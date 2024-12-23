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
    case Abs = 'Abs';
    case ALL = 'ALL';
    case Chest_Biceps = 'Chest_Biceps';
    case Back_Triceps = 'Back_Triceps';
    case Legs_Shoulders = 'Legs_Shoulders';
    case Chest_Back_Triceps = 'Chest_Back_Triceps';
    case Legs_Shoulders_Biceps = 'Legs_Shoulders_Biceps';

    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    // public static function values(): array
    // {
    //     return array_column(self::cases(), 'value');
    // }

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
            ['en' => 'Abs', 'ar' => 'معدة'],
            ['en' => 'All', 'ar' => 'كل العضلات'],
            ['en' => 'Chest_Biceps', 'ar' => 'صدر ويدين أمامي'],
            ['en' => 'Back_Triceps', 'ar' => 'ظهر ويدين خلفي'],
            ['en' => 'Legs_Shoulders', 'ar' => 'رجلين وأكتاف'],
            ['en' => 'Chest_Back_Triceps', 'ar' => 'صدر ويدين خلفي وظهر'],
            ['en' => 'Legs_Shoulders_Biceps', 'ar' => 'رجلين وأكتاف ويدين أمامي'],
        ];
    }

    public function value(): array
    {
        return match ($this) {
            self::Chest => ['en' => 'Chest', 'ar' => 'صدر'],
            self::Back => ['en' => 'Back', 'ar' => 'ظهر'],
            self::Shoulders => ['en' => 'Shoulders', 'ar' => 'أكتاف'],
            self::Biceps => ['en' => 'Biceps', 'ar' => 'يدين أمامي'],
            self::Triceps => ['en' => 'Triceps', 'ar' => 'يدين خلفي'],
            self::Arms => ['en' => 'Arms', 'ar' => 'يدين'],
            self::Legs => ['en' => 'Legs', 'ar' => 'رجلين'],
            self::Abs => ['en' => 'Abs', 'ar' => 'معدة'],
            self::ALL => ['en' => 'All', 'ar' => 'كل العضلات'],
            self::Chest_Biceps => ['en' => 'Chest_Biceps', 'ar' => 'صدر ويدين أمامي'],
            self::Back_Triceps => ['en' => 'Back_Triceps', 'ar' => 'ظهر ويدين خلفي'],
            self::Legs_Shoulders => ['en' => 'Legs_Shoulders', 'ar' => 'رجلين وأكتاف'],
            self::Chest_Back_Triceps => ['en' => 'Chest_Back_Triceps', 'ar' => 'صدر ويدين خلفي وظهر'],
            self::Legs_Shoulders_Biceps => ['en' => 'Legs_Shoulders_Biceps', 'ar' => 'رجلين وأكتاف ويدين أمامي'],
        };
    }
}
