<?php

namespace App\Http\Controllers;

use App\Feedback;
use App\Post;
use App\Report;
use App\Request as AppRequest;
use App\Resident;
use App\Schedule;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('pages.dashboard');
    }

    public function getdashboard()
    {

        if (Auth::user()->role == 'Admin' || Auth::user()->role == "Staff")
            return [
                'residents_count' => Resident::count(),
                'users_count' => User::count(),
                'schedules_count' => Schedule::count(),
                'events_count' => Post::where('type', 'event')->count(),
                'announcements_count' => Post::where('type', 'announcement')->count(),
                'request_count' => AppRequest::where('status', 'pending')->count(),
                'reports_count' => Report::where('status', 'pending')->count(),
                'feedbacks_count' => Feedback::whereNull('parent_id')->count(),
            ];

        else
            return [
                'request_count' => AppRequest::where('user_id', Auth::id())->where('status', 'pending')->count(),
                'reports_count' => Report::where('user_id', Auth::id())->where('status', 'pending')->count(),
                'schedules_count' => Schedule::count(),
                'events_count' => Post::where('type', 'event')->count(),
                'announcements_count' => Post::where('type', 'announcement')->count(),
                'feedbacks_count' => Feedback::where('user_id', Auth::id())->whereNull('parent_id')->count(),
            ];
    }
}
