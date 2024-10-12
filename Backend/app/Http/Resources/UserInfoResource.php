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
        $userInfo = $this->userInfo;
        if ($userInfo == null) {
            $userInfo = UserInfo::create(['user_id' => $this->id]);
        }
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'birth_date' => $this->birth_date,
            'gender' => $this->gender,
            'height' => $userInfo->height,
            'weight' => $userInfo->weight,
            'photos' => $userInfo->photos,
            'illnesses' => $userInfo->illnesses,
            'allergies' => $userInfo->allergies,
            'disliked_food' => $userInfo->disliked_food,
            'active_days' => $userInfo->active_days,
            'subscription_plan' => new SubscriptionResource($this->subscriptions->last()),
            'role'=> $this->role
        ];
    }
}
