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

    // public static function values(): array
    // {
    //     return array_column(self::cases(), 'value');
    // }

    public static function values(): array
    {
        return [
            ['en' => 'Trainer', 'ar' => 'مدرب'],
            ['en' => 'Trainee', 'ar' => 'متدرب'],
        ];
    }

    public function value(): array
    {
        return match ($this) {
            self::Trainer => ['en' => 'Trainer', 'ar' => 'مدرب'],
            self::Trainee => ['en' => 'Trainee', 'ar' => 'متدرب'],
        };
    }
}
