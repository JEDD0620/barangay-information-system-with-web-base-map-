<?php

namespace App\Http\Controllers;

use App\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ScheduleController extends Controller
{
    public function getSchedules(Request $req)
    {
        $order = $req->get('order');
        $sort = $req->get('sort');
        $filter = $req->get('filter');
        $multiplier = $req->get('multiplier');

        $now = now()->addWeek($multiplier);

        $residents = Schedule::whereBetween(DB::raw('DATE(schedules.duty)'), [$now->format('Y-m-d'), $now->addDay(6)->format('Y-m-d')])
            ->orWhere('recurence', '!=', 'none')
            ->leftJoin('residents', 'schedules.resident_id', 'residents.id')
            ->select('residents.f_name', 'schedules.*')
            ->orderBy($sort, $order);

        if (!!isset($filter)) {
            $residents->where('f_name', 'LIKE', '%' . $filter . '%')
                ->orWhere('contact_no', 'LIKE', '%' . $filter . '%')
                ->orWhere('role', 'LIKE', '%' . $filter . '%')
                ->orWhere('address', 'LIKE', '%' . $filter . '%');
        }

        return $residents->get();
    }

    public function newSchedule(Request $req)
    {
        Schedule::create($req->all());
        return true;
    }

    public function editSchedule(Request $req, $id)
    {
        Schedule::find($id)->update($req->all());
        return true;
    }

    public function deleteSchedule($id)
    {
        Schedule::find($id)->delete();
        return true;
    }
}
