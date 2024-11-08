<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Coach Amr',
            'email' => 'test@example.com',
            'phone_number' => '+963958295285',
            'password' => bcrypt('password'),
            'birth_date' => '2003-10-20',
            'gender' => 'MALE',
            'role' => 'Trainer'
        ]);
        $this->call(ExerciseSeeder::class);
    }
}
