<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    protected $fillable = [
        'user_id',
        'type',
        'title',
        'body',
        'venue',
        'from_date',
        'to_date',
        'from_time',
        'to_time',
        'lat',
        'lng',
    ];
}
