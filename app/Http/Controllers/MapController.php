<?php

namespace App\Http\Controllers;

use App\Map;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MapController extends Controller
{
    public function newLoc(Request $req)
    {
        $map = Map::create($req->except('photo'));

        if (isset($req->photo)) {

            $photo = str_replace('data:image/jpeg;base64,', '', $req->photo);
            $photo = str_replace(' ', '+', $photo);
            $photoName = Str::random(15) . '.' . 'jpeg';
            Storage::disk('map')->put($photoName, base64_decode($photo));
            $photoUrl = '/images/map/' . $photoName;
            $data['photo'] = $photoUrl;
            $map->photo = $photoUrl;
            $map->save();
        }

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
