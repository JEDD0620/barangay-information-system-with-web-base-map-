<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->references('id')->on('users');
            $table->foreignId('resident_id')->nullable()->references('id')->on('residents');
            $table->string('type');
            $table->string('purpose');
            $table->dateTime('date')->nullable();
            $table->string('status')->default('pending');

            $table->string('f_name')->nullable();
            $table->date('b_date')->nullable();
            $table->string('gender')->nullable();
            $table->string('address')->nullable();
            $table->string('contact_no')->nullable();
            $table->string('job')->nullable();
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
        Schema::dropIfExists('requests');
    }
}