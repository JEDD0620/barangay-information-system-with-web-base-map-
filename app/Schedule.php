<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = [
        'resident_id',
        'duty',
        'recurence',
        'in',
        'out',
        'note'
    ];
}
