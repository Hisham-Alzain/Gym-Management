<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateUserInfoRequest extends FormRequest
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
            "height" => ["sometimes","numeric","between:120,210"],
            "weight" => ["sometimes","numeric","between:40,200"],
            "ilness" => ["sometimes","text"],
            "allergies" => ["sometimes","text"],
            "disliked_food"=>["sometimes","text"],
            "active_days"=>["sometimes","integer","between:2:7"],
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
