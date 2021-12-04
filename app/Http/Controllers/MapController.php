<?php

namespace App\Http\Controllers;

use App\Map;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MapController extends Controller
{
    public function newLoc(Request $req)
    {

        if ($req->type == 'Events') {
            $data = $req->all();
            unset($data['type']);
            $data['user_id'] = Auth::id();
            $data['type'] = 'Event';
            Post::create($data);
        } else {
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
        }

        return true;
    }

    public function getLoc()
    {
        $map = Map::query()
            ->get();
        $events = Post::query()
            ->where(['type' => 'Event'])
            ->whereNotNull(['lat', 'lng'])
            ->where(function ($q) {
                $q->whereDate('from_date', '>=', now()->format('Y-m-d'))
                    ->orWhereDate('to_date', '>=', now()->format('Y-m-d'));
            })
            ->get();

        return response()->json(['events' => $events, 'structures' => $map]);
    }

    public function deleteLoc($id)
    {
        Map::find($id)->delete();
        return true;
    }
}
