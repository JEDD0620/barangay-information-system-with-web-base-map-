<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Auth::routes(['verify' => true]);



Route::middleware('verified')->group(function () {
    Route::get('/', 'HomeController@index')->name('home');

    //admin routes
    Route::middleware('admin')->group(function () {
        Route::view('/dashboard', 'admin.dashboard');
        Route::view('/residents', 'admin.residents');
        Route::view('/users', 'admin.users');
        Route::view('/map', 'admin.map');
        Route::view('/schedules', 'admin.schedules');
        Route::view('/events', 'admin.events');
        Route::view('/announcements', 'admin.announcements');
        Route::view('/feedbacks', 'admin.feedbacks');
        Route::view('/requests', 'admin.requests');
        Route::view('/reports', 'admin.reports');
    });

    //user routes
    // Route::get('/residents', 'HomeController@index');
    // Route::get('/users', 'HomeController@index');
    // Route::get('/map', 'HomeController@index');
    // Route::get('/schedules', 'HomeController@index');
    // Route::get('/events', 'HomeController@index');
    // Route::get('/announcement', 'HomeController@index');
    // Route::get('/feedbacks', 'HomeController@index');
    // Route::get('/request', 'HomeController@index');
    // Route::get('/reports', 'HomeController@index');
});
