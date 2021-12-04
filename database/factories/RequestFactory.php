<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Request;
use App\Resident;
use App\User;
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

$factory->define(Request::class, function (Faker $faker) {
    $users = User::where('role', '!=', 'Admin')->pluck('id')->toArray();
    $residents = Resident::pluck('id')->toArray();
    $type = $faker->randomElement(['Residency', 'Indigency', 'Clearance', 'Permit']);
    $gender = $faker->randomElement(['Male', 'Female']);

    return [
        'user_id' => $faker->randomElement($users),
        'resident_id' =>  $faker->randomElement($residents),
        'type' =>  $type,
        'purpose' => $faker->realText($maxNbChars = 20, $indexSize = 1),
        'updated_at' => now()->subWeek(rand(1, 52))->format('Y-m-d'),
    ];
});
