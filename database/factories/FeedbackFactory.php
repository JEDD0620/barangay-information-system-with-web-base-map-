<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Feedback;
use Carbon\Carbon;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(Feedback::class, function (Faker $faker) {
    $users = App\User::where('role', 'Staff')->pluck('id')->toArray();
    $parentID = $faker->randomElement([rand(1, 50), null]);

    return [
        'user_id' => $faker->randomElement($users),
        'parent_id' =>  $parentID,
        'title' => empty($parentID) ? $faker->realText($maxNbChars = 100, $indexSize = 1) : null,
        'body' => $faker->realText($maxNbChars = 500, $indexSize = 2),
        'created_at' => now()->subWeek(rand(1, 52))->format('Y-m-d')
    ];
});
