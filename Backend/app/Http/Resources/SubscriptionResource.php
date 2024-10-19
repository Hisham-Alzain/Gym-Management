<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubscriptionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "user_id" => $this->user_id,
            "user_name" => $this->user->name,
            "start_date" => $this->start_date->format('Y-m-d'),
            "end_date" => $this->end_date->format('Y-m-d')
        ];
    }
}
