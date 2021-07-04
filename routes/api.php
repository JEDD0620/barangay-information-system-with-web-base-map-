<?php

use App\Http\Controllers\ResidentController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/




Route::middleware('verified')->group(function () {

    //user, usercontroller
    Route::get('/users', [UserController::class, "getUsers"]);
    Route::prefix('user')->group(function () {
        Route::get('/', [UserController::class, "getUser"]);
        Route::delete('/{id}', [UserController::class, "deleteUser"])->middleware('admin');
        Route::put('/assign', [UserController::class, "assignUser"])->middleware('admin');
    });

    Route::prefix('resident')->group(function () {
        Route::get('/', [ResidentController::class, "getResidents"]);
        Route::get('/{id}', [ResidentController::class, "getResident"]);
        Route::post('/', [ResidentController::class, "createResident"]);
        Route::put('/', [ResidentController::class, "editResident"]);
        Route::delete('/{id}', [ResidentController::class, "deleteResident"])->middleware('admin');
        Route::put('/assign', [ResidentController::class, "assignResident"])->middleware('admin');
    });
});
