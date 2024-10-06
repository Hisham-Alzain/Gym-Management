<?php

namespace App\Http\Requests;

use App\Enums\Genders;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserInfoRequest extends FormRequest
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
            // users table
            'birth_date' => ['sometimes', 'date_format:Y-m-d'],
            'gender' => ['sometimes', Rule::in(Genders::names())],

            // user_infos table
            'height' => ["sometimes", "numeric", "between:120,210"],
            'weight' => ["sometimes", "numeric", "between:40,200"],
            'ilness' => ["sometimes"],
            'allergies' => ["sometimes"],
            'disliked_food' => ["sometimes"],
            'active_days' => ["sometimes", "integer", "between:2,7"],
            'photos' => ['sometimes', 'array', 'max:3'],
            'photos.*' => ['image', 'max:2048'],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 422));
    }
}
