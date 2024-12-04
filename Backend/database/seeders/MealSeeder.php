<?php

namespace Database\Seeders;

use App\Models\Meal;
use App\Models\MealTranslation;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class MealSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $meals = [
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806rice_photo.jpg',
                'calories' => 3.65,
                'protein' => 0.0719,
                'carbs' => 0.755,
                'fat' => 0.0385,
                'GI' => 'Mid',
                'K' => 0.00265,
                'Na' => 0,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Rice",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "أرز",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806sweetPotato_photo.jpg',
                'calories' => 0.79,
                'protein' => 0.0158,
                'carbs' => 0.173,
                'fat' => 0.0038,
                'GI' => 'High',
                'K' => 0.0127,
                'Na' => 0,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Sweet potato",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "بطاطا حلوة",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806potato_photo.jpg',
                'calories' => 3.61,
                'protein' => 0.0811,
                'carbs' => 0.799,
                'fat' => 0.0095,
                'GI' => 'High',
                'K' => 0.0127,
                'Na' => 0,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Potato",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "بطاطا عادية",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806pasta_photo.jpg',
                'calories' => 0.51,
                'protein' => 0.0141,
                'carbs' => 0.0805,
                'fat' => 0.0148,
                'GI' => 'Mid',
                'K' => 0.00319,
                'Na' => 0.00419,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Spagetti",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "معكرونة",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806bulgur_photo.jpg',
                'calories' => 3.72,
                'protein' => 0.118,
                'carbs' => 0.759,
                'fat' => 0.0242,
                'GI' => 'Low',
                'K' => 0.00358,
                'Na' => 0,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "bulgur",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "برغل",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806beans_photo.jpg',
                'calories' => 3.45,
                'protein' => 0.21,
                'carbs' => 0.598,
                'fat' => 0.022,
                'GI' => 'Low',
                'K' => 0.0142,
                'Na' => 0,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Beans",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "فول",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806hummus_photo.jpg',
                'calories' => 2.43,
                'protein' => 0.0735,
                'carbs' => 0.149,
                'fat' => 0.171,
                'GI' => 'Low',
                'K' => 0.0029,
                'Na' => 0.0044,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Hummus",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "حمص",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806omlette_photo.jpg',
                'calories' => 0.52,
                'protein' => 0.107,
                'carbs' => 0.0236,
                'fat' => 0,
                'GI' => 'Low',
                'K' => 0.0013,
                'Na' => 0.0013,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Omelette",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "بيض مقلي",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806boiledEggs_photo.jpg',
                'calories' => 0.52,
                'protein' => 0.107,
                'carbs' => 0.0236,
                'fat' => 0,
                'GI' => 'Low',
                'K' => 0.0013,
                'Na' => 0.0013,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "boiled eggs",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "بيض مسلوق",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806yogurt_photo.jpg',
                'calories' => 0.5,
                'protein' => 0.0423,
                'carbs' => 0.08,
                'fat' => 0,
                'GI' => 'Low',
                'K' => 0.0021,
                'Na' => 0.0005,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Yogurt",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "لبن",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806milk_photo.jpg',
                'calories' => 0.78,
                'protein' => 0.0382,
                'carbs' => 0.0557,
                'fat' => 0.05,
                'GI' => 'Low',
                'K' => 0.0023,
                'Na' => 0.001,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Milk",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "حليب",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806cheese_photo.jpg',
                'calories' => 3.25,
                'protein' => 0.245,
                'carbs' => 0.0207,
                'fat' => 0.243,
                'GI' => 'Low',
                'K' => 0.0012,
                'Na' => 0.0181,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "white cheese",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "جبنة بيضاء",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806lamp_photo.jpg',
                'calories' => 2.43,
                'protein' => 0.17,
                'carbs' => 0,
                'fat' => 0.194,
                'GI' => 'Low',
                'K' => 0.0027,
                'Na' => 0.0006,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Lamp meat",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "لحم خاروف",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806beef_photo.jpg',
                'calories' => 2.32,
                'protein' => 0.184,
                'carbs' => 0,
                'fat' => 0.178,
                'GI' => 'Low',
                'K' => 0.0028,
                'Na' => 0.0006,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Beef",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "لحم عجل",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806chickenBreast_photo.jpg',
                'calories' => 1.06,
                'protein' => 0.225,
                'carbs' => 0,
                'fat' => 0.0193,
                'GI' => 'Low',
                'K' => 0.0033,
                'Na' => 0.0007,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Chicken breasts",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "صدر دجاج",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806chickenThigh_photo.jpg',
                'calories' => 1.44,
                'protein' => 0.186,
                'carbs' => 0,
                'fat' => 0.0792,
                'GI' => 'Low',
                'K' => 0.0027,
                'Na' => 0.0006,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Chicken thighs",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "أفخاذ دجاج",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806banana_photo.jpg',
                'calories' => 0.85,
                'protein' => 0.0073,
                'carbs' => 0.201,
                'fat' => 0.0022,
                'GI' => 'High',
                'K' => 0.0033,
                'Na' => 0,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Banana",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "موز",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806strawberry_photo.jpg',
                'calories' => 0.36,
                'protein' => 0.0064,
                'carbs' => 0.0786,
                'fat' => 0.0022,
                'GI' => 'Low',
                'K' => 0.0016,
                'Na' => 0,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Strawbery",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "فريز",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806grapes_photo.jpg',
                'calories' => 0.31,
                'protein' => 0.0083,
                'carbs' => 0.0551,
                'fat' => 0.0063,
                'GI' => 'Mid',
                'K' => 0.0022,
                'Na' => 0,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Grapes",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "عنب",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806orange_photo.jpg',
                'calories' => 0.52,
                'protein' => 0.0091,
                'carbs' => 0.118,
                'fat' => 0.0015,
                'GI' => 'Low',
                'K' => 0.0017,
                'Na' => 0.0001,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Orange",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "برتقال",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806apple_photo.jpg',
                'calories' => 0.65,
                'protein' => 0.0015,
                'carbs' => 0.156,
                'fat' => 0.0016,
                'GI' => 'Low',
                'K' => 0.0011,
                'Na' => 0,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "ِApple",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "تفاح",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806pomegranate_photo.jpg',
                'calories' => 0.83,
                'protein' => 0.0167,
                'carbs' => 0.187,
                'fat' => 0.0117,
                'GI' => 'Low',
                'K' => 0.0024,
                'Na' => 0,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Pomegranate",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "رمان",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806apricot_photo.jpg',
                'calories' => 0.879,
                'protein' => 0.0096,
                'carbs' => 0.102,
                'fat' => 0.004,
                'GI' => 'Low',
                'K' => 0.0026,
                'Na' => 0,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Apricot",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "مشمش",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806watermelon_photo.jpg',
                'calories' => 0.3,
                'protein' => 0.0061,
                'carbs' => 0.0755,
                'fat' => 0.0015,
                'GI' => 'High',
                'K' => 0.0011,
                'Na' => 0,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "WaterMelon",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "بطيخ",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806seeds_photo.jpg',
                'calories' => 6.09,
                'protein' => 0.19,
                'carbs' => 0.245,
                'fat' => 0.484,
                'GI' => 'Mid',
                'K' => 0.0066,
                'Na' => 0,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Sunflower seeds",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "بذر دوار القمر",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806corn_photo.jpg',
                'calories' => 0.85,
                'protein' => 0.0279,
                'carbs' => 0.147,
                'fat' => 0.0163,
                'GI' => 'Mid',
                'K' => 0.0014,
                'Na' => 0,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Corn",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "ذرة",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806olives_photo.jpg',
                'calories' => 1.41,
                'protein' => 0.0115,
                'carbs' => 0.05,
                'fat' => 0.129,
                'GI' => 'Low',
                'K' => 0.0004,
                'Na' => 0.0162,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Olives",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "زيتون",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806walnut_photo.jpg',
                'calories' => 7.3,
                'protein' => 0.146,
                'carbs' => 0.109,
                'fat' => 0.697,
                'GI' => 'Mid',
                'K' => 0.0042,
                'Na' => 0,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Walnut",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "جوز",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806almonds_photo.jpg',
                'calories' => 6.22,
                'protein' => 0.26,
                'carbs' => 0.162,
                'fat' => 0.5,
                'GI' => 'Mid',
                'K' => 0.0067,
                'Na' => 0,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Almonds",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "لوز",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806hazelnut_photo.jpg',
                'calories' => 6.41,
                'protein' => 0.135,
                'carbs' => 0.26,
                'fat' => 0.53,
                'GI' => 'Mid',
                'K' => 0.063,
                'Na' => 0,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Hazelnut",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "بندق",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806nuts_photo.jpg',
                'calories' => 5.65,
                'protein' => 0.174,
                'carbs' => 0.36,
                'fat' => 0.389,
                'GI' => 'Mid',
                'K' => 0.0638,
                'Na' => 0,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Nuts",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "فستق",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806pistachio_photo.jpg',
                'calories' => 5.65,
                'protein' => 0.174,
                'carbs' => 0.36,
                'fat' => 0.389,
                'GI' => 'Mid',
                'K' => 0.1,
                'Na' => 0,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Pistachio",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "فستق حلبي",
                        "description" => ""
                    ]
                ],
            ],
            [
                'thumbnail_path' => 'meals_thumbnails/2024_11_05_182806cashew_photo.jpg',
                'calories' => 5.65,
                'protein' => 0.174,
                'carbs' => 0.36,
                'fat' => 0.389,
                'GI' => 'Mid',
                'K' => 0.0638,
                'Na' => 0,
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "Cashew",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "كاجو",
                        "description" => ""
                    ]
                ],
            ],
        ];
        // Create meals
        foreach ($meals as $mealData) {
            $meal = Meal::create([
                'thumbnail_path' => $mealData['thumbnail_path'],
                'calories' => $mealData['calories'],
                'protein' => $mealData['protein'],
                'carbs' => $mealData['carbs'],
                'fat' => $mealData['fat'],
                'GI' => $mealData['GI'],
                'Na' => $mealData['Na'],
                'K' => $mealData['K']
            ]);

            foreach ($mealData['translations'] as $translation) {
                MealTranslation::create([
                    'meal_id' => $meal->id,
                    "lang" => $translation["lang"],
                    "meal_name" => $translation["name"],
                    "description" => $translation["description"]
                ]);
            }
        }
    }
}
