<?php

namespace App\Http\Controllers;

use App\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    public function getPendings(Request $req)
    {
        $page = $req->get('page');
        $perPage = $req->get('perPage');
        $order = $req->get('order');
        $sort = $req->get('sort');
        $filter = $req->get('filter');

        $reports = Report::where('status', 'pending')
            ->leftJoin('residents', 'reports.resident_id', 'residents.id')
            ->select(
                'residents.f_name as resident_name',
                'residents.address as resident_address',
                'residents.contact_no as resident_contact_no',
                'reports.*'
            )
            ->orderBy($sort, $order);

        if (Auth::user()->role == 'Resident') {
            $reports->where('reports.user_id', Auth::id());
        }

        if (!!isset($filter)) {
            $reports->where('residents.f_name', 'LIKE', '%' . $filter . '%');
        }

        return $reports->paginate($perPage, ['*'], 'page', $page);
    }

    public function getOnGoings(Request $req)
    {
        $page = $req->get('page');
        $perPage = $req->get('perPage');
        $order = $req->get('order');
        $sort = $req->get('sort');
        $filter = $req->get('filter');

        $reports = Report::where('status', 'ongoing')
            ->leftJoin('residents', 'reports.resident_id', 'residents.id')
            ->leftJoin('users', 'reports.staff_id', 'users.id')
            ->select(
                'residents.f_name as resident_name',
                'residents.address as resident_address',
                'residents.contact_no as resident_contact_no',
                'users.f_name as staff_name',
                'reports.*'
            )
            ->orderBy($sort, $order);

        if (Auth::user()->role == 'Resident') {
            $reports->where('reports.user_id', Auth::id());
        }

        if (!!isset($filter)) {
            $reports->where('residents.f_name', 'LIKE', '%' . $filter . '%');
        }

        return $reports->paginate($perPage, ['*'], 'page', $page);
    }

    public function getClosed(Request $req)
    {
        $page = $req->get('page');
        $perPage = $req->get('perPage');
        $order = $req->get('order');
        $sort = $req->get('sort');
        $filter = $req->get('filter');

        $reports = Report::where(function ($q) {
            $q->where('status',  'closed')
                ->orWhere('status', 'cancelled');
        })
            ->leftJoin('residents', 'reports.resident_id', 'residents.id')
            ->leftJoin('users', 'reports.staff_id', 'users.id')
            ->select(
                'residents.f_name as resident_name',
                'residents.address as resident_address',
                'residents.contact_no as resident_contact_no',
                'users.f_name as staff_name',
                'reports.*'
            )
            ->orderBy($sort, $order);

        if (Auth::user()->role == 'Resident') {
            $reports->where('reports.user_id', Auth::id());
        }

        if (!!isset($filter)) {
            $reports->where('residents.f_name', 'LIKE', '%' . $filter . '%');
        }

        return $reports->paginate($perPage, ['*'], 'page', $page);
    }

    public function createReport(Request $req)
    {
        Auth::user()->reports()->create($req->all());
        return true;
    }

    public function editReport(Request $req, $id)
    {
        Report::find($id)->update($req->all());
        return true;
    }

    public function investigateReport($id)
    {
        $staffID = Auth::id();
        Report::find($id)->update(['status' => 'ongoing', 'staff_id' => $staffID]);
        return true;
    }

    public function closeReport($id)
    {
        $staffID = Auth::id();
        Report::find($id)->update(['status' => 'closed', 'staff_id' => $staffID]);
        return true;
    }

    public function cancelReport($id)
    {
        Report::find($id)->update(['status' => 'cancelled']);
        return true;
    }
}
