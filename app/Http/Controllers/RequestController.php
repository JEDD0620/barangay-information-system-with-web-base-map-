<?php

namespace App\Http\Controllers;

use App\Request;
use App\Resident;
use Illuminate\Http\Request as Req;
use Illuminate\Support\Facades\Auth;
use PDF;
use Symfony\Component\HttpFoundation\Response;

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
                'residents.residency_date',
                'residents.civil_status',
                'residents.gender',
                'residents.weight',
                'residents.height',
                'users.username as user_name',
                'requests.*'
            )
            ->orderBy($sort, $order);

        if (Auth::user()->role == 'Resident') {
            $requests->where('requests.user_id', Auth::id());
        }

        if (!!isset($filter)) {
            $requests->where(function ($q) use ($filter) {
                $q->where('residents.f_name', 'LIKE', '%' . $filter . '%')
                    ->orWhere('requests.type', 'LIKE', '%' . $filter . '%')
                    ->orWhere('requests.purpose', 'LIKE', '%' . $filter . '%');
            });
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
                'residents.civil_status',
                'residents.gender',
                'residents.contact_no as resident_contact_no',
                'users.username as user_name',
                'requests.*'
            )
            ->orderBy($sort, $order);

        if (Auth::user()->role == 'Resident') {
            $requests->where('requests.user_id', Auth::id());
        }

        if (!!isset($filter)) {
            $requests->where(function ($q) use ($filter) {
                $q->where('residents.f_name', 'LIKE', '%' . $filter . '%')
                    ->orWhere('requests.type', 'LIKE', '%' . $filter . '%')
                    ->orWhere('requests.purpose', 'LIKE', '%' . $filter . '%');
            });
        }

        return $requests->paginate($perPage, ['*'], 'page', $page);
    }

    public function createRequest(Req $req)
    {

        $data = $req->all();
        if (!isset($data['resident_id']))
            $data['resident_id'] = Resident::where('owner_id', Auth::id())->first()->id;
        // return (Auth::user());
        Auth::user()->requests()->create($data);
        return true;
    }

    public function editRequest(Req $req, $id)
    {
        Request::find($id)->update($req->all());
        return true;
    }

    public function approveRequest(Req $req, $id)
    {
        $request = Request::find($id);
        // if ($request->type == 'Residency') {
        //     Resident::create(
        //         $request->only([
        //             'address',
        //             'b_date',
        //             'contact_no',
        //             'f_name',
        //             'job',
        //         ])
        //     );
        // }

        // if ($request->type == 'Clearance') {
        //     $request = Request::leftJoin('residents', 'requests.resident_id', 'residents.id')
        //         ->select('requests.*', 'residents.f_name')
        //         ->find($id);
        //     $request->update(['status' => 'approved']);
        //     return $this->generatePDF($request);
        // }
        $request->update(['status' => 'approved', 'date' => $req->date]);
        return true;
    }

    public function disapproveRequest(Req $req, $id)
    {
        Request::find($id)->update(['status' => 'disapproved', 'reason' => $req->reason]);
        return true;
    }

    public function cancelRequest($id)
    {
        Request::find($id)->update(['status' => 'cancelled']);
        return true;
    }

    public function generatePDF($data)
    {
        $pdf = PDF::loadView('pdf.certificate', compact('data'));
        $output = $pdf->output();

        return new Response($output, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' =>  'inline; filename="clearance_' . $data->f_name . '.pdf"',
        ]);
    }
}
