<?php

namespace App\Http\Controllers;

use App\Resident;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResidentController extends Controller
{

    public function getResident($id)
    {

        return Resident::select(
            'id',
            'f_name',
            'b_date',
            'gender',
            'address',
            'contact_no',
            'job',
        )
            ->where('owner_id', $id)
            ->first();
    }

    public function getResidents(Request $req)
    {
        $page = $req->get('page');
        $perPage = $req->get('perPage');
        $order = $req->get('order');
        $sort = $req->get('sort');
        $filter = $req->get('filter');

        $residents = Resident::where('role', '!=', 'Admin')
            ->where('role', '!=', 'Request')
            ->orderBy($sort, $order);

        if (!!isset($filter)) {
            $residents->where('f_name', 'LIKE', '%' . $filter . '%')
                ->orWhere('contact_no', 'LIKE', '%' . $filter . '%')
                ->orWhere('role', 'LIKE', '%' . $filter . '%')
                ->orWhere('address', 'LIKE', '%' . $filter . '%');
        }

        return $residents->paginate($perPage, ['*'], 'page', $page);
    }

    public function getPending(Request $req)
    {
        $page = $req->get('page');
        $perPage = $req->get('perPage');
        $order = $req->get('order');
        $sort = $req->get('sort');
        $filter = $req->get('filter');

        $residents = Resident::where('role', '!=', 'Admin')
            ->where('role', 'Request')
            ->orderBy($sort, $order);

        if (!!isset($filter)) {
            $residents->where('f_name', 'LIKE', '%' . $filter . '%')
                ->orWhere('contact_no', 'LIKE', '%' . $filter . '%')
                ->orWhere('role', 'LIKE', '%' . $filter . '%')
                ->orWhere('address', 'LIKE', '%' . $filter . '%');
        }

        return $residents->paginate($perPage, ['*'], 'page', $page);
    }

    public function approveResident(Request $req)
    {
        $resident =  Resident::find($req->id);
        $resident->update(['role' => 'Resident']);

        $user = User::find($resident->owner_id);
        $user->state = 'verified';
        $user->save();

        return true;
    }

    public function searchResidents($search)
    {
        return Resident::where('f_name', 'LIKE',  '%' . $search . '%')->take(5)->get();
    }

    public function createResident(Request $req)
    {
        if (isset($req->id)) {
            Resident::find($req->id)->update($req->all());
        } else {
            Resident::create($req->all());
        }
        return true;
    }

    public function editResident(Request $req)
    {
        $id = $req->id;
        $temp = $req->all();
        unset($temp['id']);
        Resident::where('id', $id)->update($temp);
        return true;
    }

    public function deleteResident($id)
    {
        Resident::find($id)->delete();
        return true;
    }

    public function assignResident(Request $req)
    {
        $resident = Resident::find($req->id);
        if ($resident->role == 'Staff') {
            $resident->role = 'Resident';
            $resident->save();
            return false;
        } else {
            $resident->role = 'Staff';
            $resident->save();
            return true;
        }
    }
}
