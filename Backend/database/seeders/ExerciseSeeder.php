<?php

namespace Database\Seeders;

use App\Models\Exercise;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $exercises = [
            [
                "name" => "Leg Extension",
                "muscle" => "Legs",
                "description" => ""
            ],
            [
                "name" => "Leg curls",
                "muscle" => "Legs",
                "description" => ""
            ],
            [
                "name" => "Machine Chest Press",
                "muscle" => "Chest",
                "description" => ""
            ],
            [
                "name" => "Chest Fly",
                "muscle" => "Chest",
                "description" => ""
            ],
            [
                "name" => "Lat Pulldown",
                "muscle" => "Back",
                "description" => ""
            ],
            [
                "name" => "Rows",
                "muscle" => "Back",
                "description" => ""
            ],
            [
                "name" => "Shoulder Press Machine",
                "muscle" => "Shoulders",
                "description" => ""
            ],
            [
                "name" => "Lateral Raise",
                "muscle" => "Shoulders",
                "description" => ""
            ],
            [
                "name" => "Dumbell curl",
                "muscle" => "Biceps",
                "description" => ""
            ],
            [
                "name" => "Push down",
                "muscle" => "Triceps",
                "description" => ""
            ],
            [
                "name" => "Incline bench press",
                "muscle" => "Chest",
                "description" => ""
            ],
            [
                "name" => "Dumbell Chest Press",
                "muscle" => "Chest",
                "description" => ""
            ],
            [
                "name" => "Flat Dumbell Fly",
                "muscle" => "Chest",
                "description" => ""
            ],
            [
                "name" => "Incline Dumbell Fly",
                "muscle" => "Chest",
                "description" => ""
            ],
            [
                "name" => "Dips",
                "muscle" => "Chest",
                "description" => ""
            ],
            [
                "name" => "Roman Chair",
                "muscle" => "Back",
                "description" => ""
            ],
            [
                "name" => "Dumbel Squat V",
                "muscle" => "Legs",
                "description" => ""
            ],
            [
                "name" => "Pec deck",
                "muscle" => "Shoulders",
                "description" => ""
            ],
            [
                "name" => "Biceps Hammer",
                "muscle" => "Biceps",
                "description" => ""
            ],
            [
                "name" => "Lat Pulldown triangle grip",
                "muscle" => "Back",
                "description" => ""
            ],
            [
                "name" => "Hammer Row",
                "muscle" => "Back",
                "description" => ""
            ],
            [
                "name" => "Bar Squat",
                "muscle" => "Legs",
                "description" => ""
            ],
            [
                "name" => "Over head extention",
                "muscle" => "Triceps",
                "description" => ""
            ],
            [
                "name" => "Calfs",
                "muscle" => "Legs",
                "description" => ""
            ],
            [
                "name" => "Front Lateral Raise",
                "muscle" => "Shoulders",
                "description" => ""
            ]
        ];
        foreach ($exercises as $exerciseData) {
            Exercise::create($exerciseData);
        }
    }
}
