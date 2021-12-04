<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Resident;
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

$factory->define(Resident::class, function (Faker $faker) {
    $gender = $faker->randomElement(['Male', 'Female']);

    return [
        'f_name' => $faker->name($gender),
        'b_date' => $faker->date($format = 'Y-m-d', $max = 'now'),
        'residency_date' => $faker->date($format = 'Y-m-d', $max = 'now'),
        'address' => $faker->streetAddress,
        'weight' => random_int(20, 200),
        'height' => random_int(20, 200),
        'civil_status' => $faker->randomElement([
            'Single',
            'Married',
            'Widowed',
            'Separated',
            'Divorced',
        ]),
        'contact_no' => $faker->numerify('092########'),
    ];
});
