<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    public function comment()
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    protected $fillable = [
        'user_id',
        'parent_id',
        'staff_id',
        'title',
        'body',
        'state',
    ];

    protected $table = 'feedbacks';
}
