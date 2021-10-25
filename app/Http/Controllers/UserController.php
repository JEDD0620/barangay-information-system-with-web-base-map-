<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function getUser()
    {
        return Auth::user();
    }

    public function getUsers(Request $req)
    {
        $page = $req->get('page');
        $perPage = $req->get('perPage');
        $order = $req->get('order');
        $sort = $req->get('sort');
        $filter = $req->get('filter');

        $users = User::orderBy($sort, $order);

        if (!!isset($filter)) {
            $users->where('f_name', 'LIKE', '%' . $filter . '%')
                ->orWhere('username', 'LIKE', '%' . $filter . '%')
                ->orWhere('email', 'LIKE', '%' . $filter . '%');
        }

        return $users->paginate($perPage, ['*'], 'page', $page);
    }

    public function deleteUser($id)
    {
        User::find($id)->delete();
        return true;
    }

    public function updateUser(Request $req, $id)
    {
        $user = User::find($id);
        $user->username = $req->username;
        $user->f_name = $req->f_name;
        $user->contact_no = $req->contact_no;
        $user->email = $req->email;

        if (isset($req->password)) {
            $user->password = Hash::make($req->password);
        }

        $user->save();
        return $user;
    }

    public function assignUser(Request $req)
    {
        $user = User::find($req->id);

        if ($user->role == 'Staff') {
            $user->role = 'Resident';
            $user->save();
            return false;
        } else {
            $user->role = 'Staff';
            $user->save();
            return true;
        }
    }
}
