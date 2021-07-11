<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Post;
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

$factory->define(Post::class, function (Faker $faker) {
    $users = App\User::where('role', 'Staff')->pluck('id')->toArray();
    $fromDate  = Carbon::create(2021, 7, 10, 0, 0, 0);
    $getTime = $faker->time($format = 'H:i', $max = null, $min = 'now');
    $fromTime = $faker->randomElement([$getTime, null]);

    return [
        'user_id' => $faker->randomElement($users),
        'type' => $faker->randomElement(['Event', 'Announcement']),
        'title' => $faker->realText($maxNbChars = 20, $indexSize = 1),
        'body' => $faker->realText($maxNbChars = 500, $indexSize = 2),
        'venue' => $faker->address,
        'from_date' => $fromDate->format('Y-m-d'),
        'to_date' => $faker->randomElement([$fromDate->addWeek(rand(1, 52))->format('Y-m-d'), null]),
        'from_time' => $fromTime,
        'to_time' => $fromTime === null ? null : $faker->randomElement([$faker->time($format = 'H:i', $max = null, $min = $getTime), null]),
        'updated_at' => now()->subWeek(rand(1, 52))->format('Y-m-d'),
    ];
});
