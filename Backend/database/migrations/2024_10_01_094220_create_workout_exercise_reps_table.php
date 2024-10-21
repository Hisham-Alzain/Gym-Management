<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('workout_exercise_reps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('set_id')->constrained('workout_exercise_sets')->cascadeOnDelete();
            $table->date('day_date');
            $table->integer('user_reps');
            $table->decimal('user_rep_weight');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workout_exercise_reps');
    }
};
