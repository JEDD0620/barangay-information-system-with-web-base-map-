<?php

use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MapController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
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

// Auth::routes(['verify' => true]);


Route::middleware('verified')->group(function () {

    //user, usercontroller
    Route::prefix('dashboard')->group(function () {
        Route::get('/', [HomeController::class, "getdashboard"]);
    });

    Route::get('/users', [UserController::class, "getUsers"])->middleware('staff');
    Route::prefix('user')->group(function () {
        Route::get('/', [UserController::class, "getUser"]);
        Route::delete('/{id}', [UserController::class, "deleteUser"])->middleware('admin');
        Route::put('/{id}', [UserController::class, "updateUser"]);
        Route::put('/assign', [UserController::class, "assignUser"])->middleware('admin');
    });

    Route::prefix('resident')->group(function () {
        Route::get('/', [ResidentController::class, "getResidents"])->middleware('staff');
        Route::get('/search/{search}', [ResidentController::class, "searchResidents"]);
        Route::post('/', [ResidentController::class, "createResident"])->middleware('staff');
        Route::put('/', [ResidentController::class, "editResident"])->middleware('staff');
        Route::delete('/{id}', [ResidentController::class, "deleteResident"])->middleware('staff');
        Route::put('/assign', [ResidentController::class, "assignResident"])->middleware('admin');
    });

    Route::prefix('post')->group(function () {
        Route::get('/events', [PostController::class, "getEvents"]);
        Route::get('/announcements', [PostController::class, "getAnnouncements"]);

        Route::get('/{id}', [PostController::class, "getEvent"]);
        Route::post('/', [PostController::class, "createPost"])->middleware('staff');;
        Route::put('/', [PostController::class, "editPost"])->middleware('staff');
        Route::delete('/{id}', [PostController::class, "deletePost"])->middleware('staff');
    });

    Route::prefix('request')->group(function () {
        Route::get('/pending', [RequestController::class, "getPendings"]);
        Route::get('/not-pending', [RequestController::class, "getNotPendings"]);
        Route::put('/{id}/approve', [RequestController::class, "approveRequest"])->middleware('staff');
        Route::put('/{id}/disapprove', [RequestController::class, "disapproveRequest"])->middleware('staff');
        Route::put('/{id}/cancel', [RequestController::class, "cancelRequest"])->middleware('owner:requests');
        Route::get('/{id}', [RequestController::class, "getRequest"])->middleware('owner:requests');
        Route::post('/', [RequestController::class, "createRequest"]);
        Route::put('/{id}', [RequestController::class, "editRequest"])->middleware('owner:requests');
    });

    Route::prefix('report')->group(function () {
        Route::get('/pending', [ReportController::class, "getPendings"]);
        Route::get('/ongoing', [ReportController::class, "getOngoings"]);
        Route::get('/closed', [ReportController::class, "getClosed"]);
        Route::put('/{id}/investigate', [ReportController::class, "investigateReport"])->middleware('staff');
        Route::put('/{id}/close', [ReportController::class, "closeReport"])->middleware('staff');
        Route::put('/{id}/cancel', [ReportController::class, "cancelReport"])->middleware('owner:reports');
        Route::get('/{id}', [ReportController::class, "getReport"]);
        Route::post('/', [ReportController::class, "createReport"]);
        Route::put('/{id}', [ReportController::class, "editReport"])->middleware('owner:reports');
    });

    Route::prefix('feedback')->group(function () {
        Route::get('/', [FeedbackController::class, "getFeedbacks"]);
        Route::get('/{id}', [FeedbackController::class, "getFeedback"]);
        Route::post('/', [FeedbackController::class, "newFeedback"]);
        Route::put('/{id}', [FeedbackController::class, "editFeedback"])->middleware('owner:feedbacks');
        Route::post('/{id}/comment', [FeedbackController::class, "newComment"]);
        Route::delete('/{id}', [FeedbackController::class, "deleteComment"])->middleware('owner:feedbacks');
    });

    Route::prefix('schedule')->group(function () {
        Route::get('/', [ScheduleController::class, "getSchedules"]);
        Route::post('/', [ScheduleController::class, "newSchedule"])->middleware('staff');
        Route::put('/{id}', [ScheduleController::class, "editSchedule"])->middleware('staff');
        Route::delete('/{id}', [ScheduleController::class, "deleteSchedule"])->middleware('staff');
    });

    Route::prefix('map')->group(function () {
        Route::get('/', [MapController::class, "getLoc"]);
        Route::post('/', [MapController::class, "newLoc"])->middleware('staff');
        Route::delete('/{id}', [MapController::class, "deleteLoc"])->middleware('staff');
    });
});
