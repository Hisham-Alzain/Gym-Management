<?php

namespace App\Enums;

enum Genders: string
{
    case MALE = 'MALE';
    case FEMALE = 'FEMALE';

    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return [
            ['en' => 'Male', 'ar' => 'ذكر'],
            ['en' => 'Female', 'ar' => 'انثى'],
        ];
    }
}
