<?php

namespace App\Http\Controllers;

use App\Map;
use Illuminate\Http\Request;

class MapController extends Controller
{
    public function newLoc(Request $req)
    {
        Map::create($req->all());

        return true;
    }

    public function getLoc()
    {
        return Map::leftJoin('residents', 'maps.resident_id', 'residents.id')
            ->select('maps.*', 'residents.f_name')
            ->get();
    }

    public function deleteLoc($id)
    {
        Map::find($id)->delete();
        return true;
    }
}
