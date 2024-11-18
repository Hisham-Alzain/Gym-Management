<?php

namespace Database\Seeders;

use App\Models\Exercise;
use App\Models\ExerciseTranslation;
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
                "muscle" => "Legs",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Leg Extension",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Legs",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Leg curls",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Chest",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Machine Chest Press",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Chest",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Chest Fly",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Back",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Lat Pulldown",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Back",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Rows",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Shoulders",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Shoulder Press Machine",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Shoulders",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Lateral Raise",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Biceps",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Dumbell curl",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Triceps",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Push down",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Chest",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Incline bench press",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Chest",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Dumbell Chest Press",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Chest",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Flat Dumbell Fly",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Chest",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Incline Dumbell Fly",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Chest",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Dips",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Back",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Roman Chair",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Legs",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Dumbel Squat V",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Shoulders",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Pec deck",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Biceps",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Biceps Hammer",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Back",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Lat Pulldown triangle grip",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Back",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Hammer Row",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Legs",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Bar Squat",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Triceps",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Over head extention",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Legs",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Calfs",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Shoulders",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Front Lateral Raise",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "",
                        "description" => ""
                    ]
                ],
            ]
        ];

        // Create exercises
        foreach ($exercises as $exerciseData) {
            $exercise = Exercise::create([
                "muscle" => $exerciseData["muscle"]
            ]);

            foreach ($exerciseData['translations'] as $translation) {
                ExerciseTranslation::create([
                    'exercise_id' => $exercise->id,
                    "lang" => $translation["lang"],
                    "name" => $translation["name"],
                    "description" => $translation["description"]
                ]);
            }
        }
    }
}
