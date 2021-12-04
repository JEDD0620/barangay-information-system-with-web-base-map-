<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'user_id',
        'resident_id',
        'case',
        'status',
        'staff_id',
        'reason',
        'photo',
        'anonymous',
    ];
}
