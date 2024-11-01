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
        Schema::create('diet_meals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('diet_program_id')->constrained('diet_programs')->cascadeOnDelete();
            $table->foreignId('meal_id')->constrained('meals')->cascadeOnDelete();
            $table->integer('meal_number');
            $table->decimal('quantity');
            $table->string('details')->nullable();
            $table->integer('time_after'); # Minutes
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diet_meals');
    }
};
