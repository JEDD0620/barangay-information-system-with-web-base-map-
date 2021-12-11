<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Report extends Model
{
    use SoftDeletes;
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
