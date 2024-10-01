<?php

namespace App\Http\Requests;

use App\Enums\Genders;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterRequest extends FormRequest
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
            "name" => ["required", "string"],
            "email" => ["required", "email", "unique:users"],
            'phone_number' => ['required', 'unique:users', 'min:11', 'max:14', 'regex:/^\+/'],
            'password' => ['required'],
            'confirm_password' => ['required', 'same:password'],
            'birth_date' => ['required', 'date_format:Y-m-d'],
            'gender' => ['required', Rule::in(Genders::names())],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 422));
    }
}
