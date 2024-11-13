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

    // public static function values(): array
    // {
    //     return array_column(self::cases(), 'value');
    // }

    public static function values(): array
    {
        return [
            ['en' => 'Male', 'ar' => 'ذكر'],
            ['en' => 'Female', 'ar' => 'انثى'],
        ];
    }

    public function value(): array
    {
        return match ($this) {
            self::MALE => ['en' => 'Male', 'ar' => 'ذكر'],
            self::FEMALE => ['en' => 'Female', 'ar' => 'انثى'],
        };
    }
}
