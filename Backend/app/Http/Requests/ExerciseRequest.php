<?php

namespace App\Http\Requests;

use App\Enums\WorkoutMuscle;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ExerciseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'en_name' => ['required', 'string', 'unique:exercises'],
            'ar_name' => ['required', 'string', 'unique:exercises'],
            'muscle' => ['required', Rule::in(WorkoutMuscle::names())],
            'en_description' => ['required'],
            'ar_description' => ['required'],
            'video_path' => ['sometimes'],
            'thumbnail_path' => ['sometimes', 'max:4096']
        ];
    }
}
