<?php

namespace App\Enums;

enum DefaultWorkouts: string
{
    case beginner = 'beginner';
    case semi_beginner = 'semi_beginner';
    case first_program = 'first_program';

    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return [
            ['en' => 'beginner', 'ar' => 'دائري'],
            ['en' => 'semi_beginner', 'ar' => 'نصف دائري'],
            ['en' => 'first_program', 'ar' => 'أول برنامج'],
        ];
    }
}
