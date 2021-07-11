<?php

use Illuminate\Database\Seeder;

class FactorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory('App\User', 50)->create();
        factory('App\Resident', 50)->create();
        factory('App\Post', 50)->create();
        factory('App\Report', 50)->create();
        factory('App\Request', 50)->create();
    }
}
