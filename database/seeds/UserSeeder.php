<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'username' => 'admin',
                'email' => 'admin@sfbis.test',
                'email_verified_at' => now(),
                'password' => Hash::make('admin123'),
                'role' => 'Admin',
                'state' => 'verified',
            ],

            [
                'username' => 'resident',
                'email' => 'resident@sfbis.test',
                'email_verified_at' => now(),
                'password' => Hash::make('resident123'),
                'role' => 'Resident',
                'state' => 'verified',
            ]
        ]);
    }
}
