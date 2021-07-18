<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EnsureOwner
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, ...$db)
    {
        $id = $request->route('id');
        $q = DB::table($db[0])->find($id);
        $authRole = Auth::user()->role == 'Admin' || Auth::user()->role == 'Staff';

        if ($q->user_id == Auth::id() || $authRole) {
            return $next($request);
        } else {
            return response('not authorize');
        }
    }
}
