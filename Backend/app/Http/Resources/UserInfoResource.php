<?php

namespace App\Http\Resources;

use App\Models\UserInfo;
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
        $userInfo=$this->userInfo;
        if($userInfo==null){
            $userInfo=UserInfo::create(["user_id"=>$this->id]);
        }
        return [
            "id" => $this->id,
            "name" => $this->name,
            "phone_number" => $this->phone_number,
            "height"=> $userInfo->height,
            "weight"=> $userInfo->weight,
            "photos"=> $this->photos,
            "birth_date"=> $this->birth_date,
            "allergies"=> $userInfo->allergies,
            "disliked_food"=> $userInfo->disliked_food,
            "illnesses"=> $userInfo->illnesses,
            "active_days"=> $userInfo->active_days,
            "gender"=> $this->gender,
            "subsiption_plan"=> $this->subscription,
        ];
    }
}
