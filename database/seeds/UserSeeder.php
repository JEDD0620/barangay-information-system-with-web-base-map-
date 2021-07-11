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
            'f_name' => 'Administrator',
            'username' => 'admin',
            'email' => 'admin@sfbis.tk',
            'email_verified_at' => now(),
            'password' => Hash::make('admin123'),
            'role' => 'Admin',
        ]);
    }
}
