<?php

namespace App\Enums;

enum DefaultDiets: string
{
    case Default = 'Default';

    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
