<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserInfoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "phone_number" => $this->phone_number,
            "height"=> $this->userInfo->height,
            "weight"=> $this->userInfo->weight,
            "photos"=> $this->photos,
            "birth_date"=> $this->birth_date,
            "allergies"=> $this->userInfo->allergies,
            "disliked_food"=> $this->userInfo->disliked_food,
            "illnesses"=> $this->userInfo->illnesses,
            "active_days"=> $this->userInfo->active_days,
            "gender"=> $this->gender,
            "subsiption_plan"=> $this->subscription,
        ];
    }
}
