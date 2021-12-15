<?php

namespace App\Http\Controllers;

use App\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Mockery\Undefined;

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
            ->leftJoin('residents as complainant', 'reports.user_id', 'complainant.id')
            ->leftJoin('users', 'reports.user_id', 'users.id')
            ->select(
                'complainant.f_name as complainant_name',
                'users.username as reporter_name',
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
            ->leftJoin('residents as complainant', 'reports.user_id', 'complainant.id')
            ->leftJoin('users as staff', 'reports.staff_id', 'staff.id')
            ->leftJoin('users as reporter', 'reports.user_id', 'reporter.id')
            ->select(
                'complainant.f_name as complainant_name',
                'residents.f_name as resident_name',
                'residents.address as resident_address',
                'residents.contact_no as resident_contact_no',
                'staff.username as staff_name',
                'reporter.username as reporter_name',
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
                ->orWhere('status', 'cancelled')
                ->orWhere('status', 'archived');
        })
            ->leftJoin('residents', 'reports.resident_id', 'residents.id')
            ->leftJoin('residents as complainant', 'reports.user_id', 'complainant.id')
            ->leftJoin('users as staff', 'reports.staff_id', 'staff.id')
            ->leftJoin('users as reporter', 'reports.user_id', 'reporter.id')
            ->select(
                'complainant.f_name as complainant_name',
                'residents.f_name as resident_name',
                'residents.address as resident_address',
                'residents.contact_no as resident_contact_no',
                'staff.username as staff_name',
                'reporter.username as reporter_name',
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
        $data = $req->only('case', 'resident_id', 'anonymous');
        if ($req->file('photo')) {
            Storage::disk('reports')->putFileAs('', $req->file('photo'), $req->file('photo')->getClientOriginalName());
            $data['photo'] = "/images/reports/" . $req->file('photo')->getClientOriginalName();
        }

        if (!isset($req->resident_id) || $req->resident_id == 'undefined') {
            unset($data['resident_id']);
        }


        if ($data['anonymous'] == "true") {
            $data['anonymous'] = true;
        } else {
            $data['anonymous'] = false;
            $data['user_id'] = Auth::id();
        }

        Auth::user()->reports()->create($data);
        return true;
    }

    public function editReport(Request $req, $id)
    {
        $data = $req->only('case', 'resident_id', 'anonymous');

        if ($req->file('photo')) {
            Storage::disk('reports')->putFileAs('', $req->file('photo'), $req->file('photo')->getClientOriginalName());
            $data['photo'] = "/images/reports/" . $req->file('photo')->getClientOriginalName();
        }

        if (!isset($req->resident_id) || $req->resident_id == 'undefined') {
            unset($data['resident_id']);
        }

        if ($data['anonymous'] == 'true')
            $data['anonymous'] = true;
        else
            $data['anonymous'] = false;


        Report::find($id)->update($data);
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
    public function deleteReport($id)
    {
        Report::find($id)->update(['status' => 'archived']);
        return true;
    }
}
