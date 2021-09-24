<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Schedule;
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

$factory->define(Schedule::class, function (Faker $faker) {
    $residents = App\Resident::pluck('id')->toArray();
    $recurence = $faker->randomElement(['weekdays', 'weekends','daily', 'weekly', 'monthly', 'none']);
    // $recurence = $faker->randomElement(['weekdays', 'daily', 'none']);

    return [
        'resident_id' => $faker->randomElement($residents),
        'duty' =>  now()->addDay(rand(0, 30)),
        'recurence' => $recurence,
        'times' => rand(1, 2),
        'in' => now()->addHour(rand(1, 24))->setSecond(0)->setMinute(0),
        'out' => now()->addHour(rand(1, 24))->setSecond(0)->setMinute(0),
        'note' => $faker->realText($maxNbChars = 500, $indexSize = 2),


        'created_at' => now()->subWeek(rand(1, 52))->format('Y-m-d')
    ];
});
