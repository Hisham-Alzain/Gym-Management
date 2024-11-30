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
                "thumbnail_path"=>"",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Leg Extension",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "طاولة أمامي",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Legs",
                "thumbnail_path"=>"",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Leg curls",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "طاولة خلفي",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Chest",
                "thumbnail_path"=>"",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Machine Chest Press",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "ضغط صدر",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Chest",
                "thumbnail_path"=>"",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Chest Fly",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "فراشة صدر",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Back",
                "thumbnail_path"=>"",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Lat Pulldown",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "سحب بكرة أمامي",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Back",
                "thumbnail_path"=>"",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Rows",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "تجديف أرضي",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Shoulders",
                "thumbnail_path"=>"",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Shoulder Press Machine",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "ضغط اكتاف ألة",
                        "description" => ""
                    ]
                ],
            ],
            [
                "muscle" => "Shoulders",
                "thumbnail_path"=>"",
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Lateral Raise",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "رفرفة جانبي",
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
                        "name" => "تبادل دامبل",
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
                        "name" => "مسطرة تراي",
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
                        "name" => "ضغط بار علوي",
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
                        "name" => "ضغط دامبل صدر ",
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
                        "name" => "فتح دامبل مستوي",
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
                        "name" => "فتح دامبل علوي",
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
                        "name" => "متوازي",
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
                        "name" => "روماني",
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
                        "name" => "دامبل سكوات",
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
                        "name" => "بيك ديك كتف خلفي",
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
                        "name" => "مطرقة",
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
                        "name" => "سحب بكرة مسكة مثلث",
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
                        "name" => "تجديف مطرقة",
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
                        "name" => "سكوات بالبار",
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
                        "name" => "تدلية دامبل",
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
                        "name" => "بطات",
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
                        "name" => "رفرفة أمامي مطرقة",
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
