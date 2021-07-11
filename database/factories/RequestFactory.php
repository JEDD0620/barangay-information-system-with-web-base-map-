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
        'resident_id' => $type == 'Residency' ? null : $faker->randomElement($residents),
        'type' =>  $type,
        'purpose' => $faker->realText($maxNbChars = 20, $indexSize = 1),
        'updated_at' => now()->subWeek(rand(1, 52))->format('Y-m-d'),

        'f_name' => $type == 'Residency' ? $faker->name($gender) : null,
        'address' => $type == 'Residency' ? $faker->streetAddress : null,
        'b_date' => $type == 'Residency' ? $faker->date($format = 'Y-m-d', $max = 'now') : null,
        'gender' => $type == 'Residency' ? $gender : null,
        'contact_no' => $type == 'Residency' ? $faker->numerify('092########') : null,
        'job' => $type == 'Residency' ? $faker->randomElement([$faker->jobTitle, null]) : null,
    ];
});
