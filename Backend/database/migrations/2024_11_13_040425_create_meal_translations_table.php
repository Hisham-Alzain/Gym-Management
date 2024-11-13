<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\Languages;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('meal_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('meal_id')->constrained('meals')->cascadeOnDelete();
            $table->enum('lang', Languages::names());
            $table->string('meal_name');
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meal_translations');
    }
};
