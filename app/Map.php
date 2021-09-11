<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Map extends Model
{
    protected $fillable = [
        'resident_id',
        'lat',
        'lng',
        'details',
        'label',
        'type',
        'photo',
    ];
}
