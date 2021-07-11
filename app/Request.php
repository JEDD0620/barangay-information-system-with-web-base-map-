<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    protected $fillable = [
        'user_id',
        'resident_id',
        'type',
        'purpose',
        'date',
        'status',
        
        'f_name',
        'b_date',
        'gender',
        'address',
        'contact_no',
        'job',
    ];
}
