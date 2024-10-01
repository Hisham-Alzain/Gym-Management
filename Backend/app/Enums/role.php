<?php

namespace App\Enums;

enum role: string
{
    case Trainer = 'Trainer';

    case Trainee = 'Trainee';

    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }
}
