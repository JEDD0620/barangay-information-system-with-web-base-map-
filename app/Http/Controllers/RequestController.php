<?php

namespace App\Http\Controllers;

use App\Request;
use App\Resident;
use Illuminate\Http\Request as Req;
use Illuminate\Support\Facades\Auth;

class RequestController extends Controller
{
    public function getPendings(Req $req)
    {
        $page = $req->get('page');
        $perPage = $req->get('perPage');
        $order = $req->get('order');
        $sort = $req->get('sort');
        $filter = $req->get('filter');

        $requests = Request::where('status', 'pending')
            ->leftJoin('users', 'requests.user_id', 'users.id')
            ->leftJoin('residents', 'requests.resident_id', 'residents.id')
            ->select(
                'residents.f_name as resident_name',
                'residents.address as resident_address',
                'residents.contact_no as resident_contact_no',
                'users.f_name as user_name',
                'requests.*'
            )
            ->orderBy($sort, $order);

        if (Auth::user()->role == 'Resident') {
            $requests->where('requests.user_id', Auth::id());
        }

        if (!!isset($filter)) {
            $requests->where('residents.f_name', 'LIKE', '%' . $filter . '%')
                ->orWhere('requests.type', 'LIKE', '%' . $filter . '%')
                ->orWhere('requests.purpose', 'LIKE', '%' . $filter . '%');
        }

        return $requests->paginate($perPage, ['*'], 'page', $page);
    }

    public function getNotPendings(Req $req)
    {
        $page = $req->get('page');
        $perPage = $req->get('perPage');
        $order = $req->get('order');
        $sort = $req->get('sort');
        $filter = $req->get('filter');

        $requests = Request::where('status', '!=', 'pending')
            ->leftJoin('users', 'requests.user_id', 'users.id')
            ->leftJoin('residents', 'requests.resident_id', 'residents.id')
            ->select(
                'residents.f_name as resident_name',
                'residents.address as resident_address',
                'residents.contact_no as resident_contact_no',
                'users.f_name as user_name',
                'requests.*'
            )
            ->orderBy($sort, $order);

        if (Auth::user()->role == 'Resident') {
            $requests->where('requests.user_id', Auth::id());
        }

        if (!!isset($filter)) {
            $requests->where('residents.f_name', 'LIKE', '%' . $filter . '%')
                ->orWhere('requests.type', 'LIKE', '%' . $filter . '%')
                ->orWhere('requests.purpose', 'LIKE', '%' . $filter . '%');
        }

        return $requests->paginate($perPage, ['*'], 'page', $page);
    }

    public function createRequest(Req $req)
    {
        Auth::user()->requests()->create($req->all());
        return true;
    }

    public function editRequest(Req $req, $id)
    {
        Request::find($id)->update($req->all());
        return true;
    }

    public function approveRequest($id)
    {
        $request = Request::find($id);
        if ($request->type == 'Residency') {
            Resident::create(
                $request->only([
                    'address',
                    'b_date',
                    'contact_no',
                    'f_name',
                    'gender',
                    'job',
                ])
            );
        }

        $request->update(['status' => 'approved']);
        return true;
    }

    public function disapproveRequest($id)
    {
        Request::find($id)->update(['status' => 'disapproved']);
        return true;
    }

    public function cancelRequest($id)
    {
        Request::find($id)->update(['status' => 'cancelled']);
        return true;
    }
}
