<?php

namespace App\Http\Requests;

use App\Enums\GI;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class MealRequest extends FormRequest
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
            'en_meal_name' => ['required', 'string', 'unique:meal_translations'],
            'ar_meal_name' => ['required', 'string', 'unique:meal_translations'],
            'en_description' => ['required'],
            'ar_description' => ['required'],
            'calories' => ['required', ' numeric'],
            'protein' => ['required', ' numeric'],
            'carbs' => ['required', ' numeric'],
            'fat' => ['required', ' numeric'],
            'GI' => ['required', Rule::in(GI::names())],
            'thumbnail_path' => ['sometimes', 'max:4096']
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 422));
    }
}
