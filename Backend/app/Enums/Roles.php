<?php

namespace App\Enums;

enum Roles: string
{
    case Trainer = 'Trainer';
    case Trainee = 'Trainee';

    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return [
            ['en' => 'Trainer', 'ar' => 'مدرب'],
            ['en' => 'Trainee', 'ar' => 'متدرب'],
        ];
    }
}
