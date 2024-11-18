<?php

namespace App\Enums;

enum GI: string
{
    case High = 'High';
    case Mid = 'Mid';
    case Low = 'Low';

    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return [
            ['en' => 'High', 'ar' => 'مرتفع'],
            ['en' => 'Mid', 'ar' => 'متوسط'],
            ['en' => 'Low', 'ar' => 'منخفض'],
        ];
    }

    public function value(): array
    {
        return match ($this) {
            self::High => ['en' => 'High', 'ar' => 'مرتفع'],
            self::Mid => ['en' => 'Mid', 'ar' => 'متوسط'],
            self::Low => ['en' => 'Low', 'ar' => 'منخفض'],
        };
    }
}
