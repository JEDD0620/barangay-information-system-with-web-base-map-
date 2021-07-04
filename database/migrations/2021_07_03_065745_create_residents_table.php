<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResidentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('residents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->references('id')->on('users');
            $table->foreignId('owner_id')->nullable()->references('id')->on('users');
            $table->string('role')->default('Resident');
            $table->string('f_name');
            $table->date('b_date');
            $table->string('job')->nullable();
            $table->string('gender');
            $table->string('address');
            $table->string('contact_no');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('residents');
    }
}
