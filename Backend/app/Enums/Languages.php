<?php

namespace App\Enums;

enum Languages: string
{
    case en = 'en';
    case ar = 'ar';

    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public function value(): string
    {
        return match ($this) {
            self::en => 'en',
            self::ar => 'ar',
        };
    }
}
