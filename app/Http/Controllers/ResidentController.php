<?php

namespace App\Http\Controllers;

use App\Resident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResidentController extends Controller
{
    public function getResident()
    {
        return Auth::resident();
    }

    public function getResidents(Request $req)
    {
        $page = $req->get('page');
        $perPage = $req->get('perPage');
        $order = $req->get('order');
        $sort = $req->get('sort');
        $filter = $req->get('filter');

        $residents = Resident::where('role', '!=', 'Admin')->orderBy($sort, $order);

        if (!!isset($filter)) {
            $residents->where('f_name', 'LIKE', '%' . $filter . '%')
                ->orWhere('contact_no', 'LIKE', '%' . $filter . '%')
                ->orWhere('role', 'LIKE', '%' . $filter . '%')
                ->orWhere('address', 'LIKE', '%' . $filter . '%');
        }

        return $residents->paginate($perPage, ['*'], 'page', $page);
    }

    public function createResident(Request $req)
    {
        Resident::create($req->all());
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
