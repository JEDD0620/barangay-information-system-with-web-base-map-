<?php

use App\Http\Controllers\RequestController;
use App\Http\Controllers\WebController;
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
Route::get('/logout', '\App\Http\Controllers\Auth\LoginController@logout');

// Route::view('test', 'pdf/certificate');
Route::get('test/{id}', [RequestController::class, "approveRequest"]);

Route::middleware('verified')->group(function () {
    Route::get('/', 'HomeController@index')->name('home');

    //admin routes
    Route::view('/account', 'pages.account');
    Route::view('/dashboard', 'pages.dashboard');
    Route::view('/residents', 'pages.residents')->middleware('staff');
    Route::view('/users', 'pages.users')->middleware('admin');
    Route::view('/map', 'pages.map');
    Route::view('/schedules', 'pages.schedules');
    Route::view('/events', 'pages.events');
    Route::view('/announcements', 'pages.announcements');
    Route::view('/feedbacks', 'pages.feedbacks');
    Route::view('/feedback/{title}.{id}', 'pages.feedback');
    Route::view('/requests', 'pages.requests');
    Route::view('/reports', 'pages.reports');
});
