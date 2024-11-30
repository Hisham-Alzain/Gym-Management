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
                'thumbnail_path'=>'',
                'calories'=>3.65,
                'protein'=>0.0719,
                'carbs'=>0.755,
                'fat'=>0.0385,
                'GI'=>'Mid',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>0.79,
                'protein'=>0.0158,
                'carbs'=>0.173,
                'fat'=>0.0038,
                'GI'=>'High',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>3.61,
                'protein'=>0.0811,
                'carbs'=>0.799,
                'fat'=>0.0095,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>0.51,
                'protein'=>0.0141,
                'carbs'=>0.0805,
                'fat'=>0.0148,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>3.72,
                'protein'=>0.118,
                'carbs'=>0.759,
                'fat'=>0.0242,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>3.45,
                'protein'=>0.21,
                'carbs'=>0.598,
                'fat'=>0.022,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>2.43,
                'protein'=>0.0735,
                'carbs'=>0.149,
                'fat'=>0.171,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>0.52,
                'protein'=>0.107,
                'carbs'=>0.0236,
                'fat'=>0,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>0.52,
                'protein'=>0.107,
                'carbs'=>0.0236,
                'fat'=>0,
                'GI',
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
                'thumbnail_path'=>'',
                'calories'=>0.5,
                'protein'=>0.0423,
                'carbs'=>0.08,
                'fat'=>0,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>0.78,
                'protein'=>0.0382,
                'carbs'=>0.0557,
                'fat'=>0.05,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>3.25,
                'protein'=>0.245,
                'carbs'=>0.0207,
                'fat'=>0.243,
                'GI',
                "translations" => [
                    [
                        "lang" => "en",
                        "name" => "white cheese",
                        "description" => ""
                    ],
                    [
                        "lang" => "ar",
                        "name" => "جبنة بيضة",
                        "description" => ""
                    ]
                ],
            ],[
                'thumbnail_path'=>'',
                'calories',
                'protein',
                'carbs',
                'fat',
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>2.32,
                'protein'=>0.184,
                'carbs'=>0,
                'fat'=>0.178,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>1.06,
                'protein'=>0.225,
                'carbs'=>0,
                'fat'=>0.0193,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>1.44,
                'protein'=>0.186,
                'carbs'=>0,
                'fat'=>0.0792,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>0.85,
                'protein'=>0.0073,
                'carbs'=>0.201,
                'fat'=>0.0022,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>0.36,
                'protein'=>0.0064,
                'carbs'=>0.0786,
                'fat'=>0.0022,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>0.31,
                'protein'=>0.0083,
                'carbs'=>0.0551,
                'fat'=>0.0063,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>0.52,
                'protein'=>0.0091,
                'carbs'=>0.118,
                'fat'=>0.0015,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>0.65,
                'protein'=>0.0015,
                'carbs'=>0.156,
                'fat'=>0.0016,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>0.83,
                'protein'=>0.0167,
                'carbs'=>0.187,
                'fat'=>0.0117,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>0.879,
                'protein'=>0.0096,
                'carbs'=>0.102,
                'fat'=>0.004,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>0.3,
                'protein'=>0.0061,
                'carbs'=>0.0755,
                'fat'=>0.0015,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>6.09,
                'protein'=>0.19,
                'carbs'=>0.245,
                'fat'=>0.484,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>0.85,
                'protein'=>0.0279,
                'carbs'=>0.147,
                'fat'=>0.0163,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>1.41,
                'protein'=>0.0115,
                'carbs'=>0.05,
                'fat'=>0.129,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>7.3,
                'protein'=>0.146,
                'carbs'=>0.109,
                'fat'=>0.697,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>6.22,
                'protein'=>0.26,
                'carbs'=>0.162,
                'fat'=>0.5,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>6.41,
                'protein'=>0.135,
                'carbs'=>0.26,
                'fat'=>0.53,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>5.65,
                'protein'=>0.174,
                'carbs'=>0.36,
                'fat'=>0.389,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>5.65,
                'protein'=>0.174,
                'carbs'=>0.36,
                'fat'=>0.389,
                'GI',
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
            ],[
                'thumbnail_path'=>'',
                'calories'=>5.65,
                'protein'=>0.174,
                'carbs'=>0.36,
                'fat'=>0.389,
                'GI',
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
                'GI' => $mealData['GI']
            ]);

            foreach ($mealData['translations'] as $translation) {
                MealTranslation::create([
                    'meal_id' => $meal->id,
                    "lang" => $translation["lang"],
                    "meal_name" => $translation["meal_name"],
                    "description" => $translation["description"]
                ]);
            }
        }
    }
}
