<?php

namespace App\Http\Requests;

use App\Enums\WorkoutMuscle;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class WorkoutRequest extends FormRequest
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
            // Workout_programs table
            'user_id' => ['required'],
            'start_date' => ['required', 'date_format:Y-m-d'],
            'end_date' => ['required', 'date_format:Y-m-d'],
            'no_days' => ['required', 'integer', 'min:1', 'max:7'],
            'repeat_days' => ['required', 'integer', 'min:1', 'max:7'],

            // Workout_days table
            'days' => ['required', 'array'],
            'days.*.muscle' => ['required', Rule::in(WorkoutMuscle::names())],

            // Workout_excercises table
            'days.*.exercises' => ['required', 'array'],
            'days.*.exercises.*.exercise_id' => ['required'],
            'days.*.exercises.*.no_sets' => ['required', 'integer'],

            // Workout_excercise_reps table
            'days.*.exercises.*.sets' => ['required', 'array'],
            'days.*.exercises.*.sets.*.set_no' => ['required', 'integer'],
            'days.*.exercises.*.sets.*.exp_reps' => ['required', 'integer'],
            'days.*.exercises.*.sets.*.exp_weight' => ['required', 'numeric'],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 422));
    }
}
