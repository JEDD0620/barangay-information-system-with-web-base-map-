<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    protected $fillable = [
        'user_id',
        'owner_id',
        'role',
        'f_name',
        'b_date',
        'job',
        'gender',
        'address',
        'contact_no',
    ];
}
