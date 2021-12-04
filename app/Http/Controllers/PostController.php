<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function getEvents(Request $req)
    {
        $page = $req->get('page');
        $perPage = $req->get('perPage');
        $order = $req->get('order');
        $sort = $req->get('sort');
        $filter = $req->get('filter');
        $dateSet = $req->get('dateSet');

        $events = Post::where('type', 'Event')
            ->leftJoin('users', 'posts.user_id', 'users.id')
            ->select('users.username', 'posts.*')
            ->orderBy($sort, $order);

        if (isset($dateSet) && $dateSet == 'done') {
            $events->where(function ($q) {
                $q->where(function ($q2) {
                    $q2->whereDate('from_date', '<', now()->format('Y-m-d'))
                        ->where('to_date', null);
                })
                    ->orWhere(function ($q2) {
                        $q2->whereDate('to_date', '<', now()->format('Y-m-d'));
                    });
            });
        } else {
            $events->where(function ($q) {
                $q->whereDate('from_date', '>=', now()->format('Y-m-d'))
                    ->orWhereDate('to_date', '>=', now()->format('Y-m-d'));
            });
        }

        if (isset($filter) && $filter != "") {
            $events->where('title', 'LIKE', '%' . $filter . '%');
        }

        return $events->paginate($perPage, ['*'], 'page', $page);
    }

    public function getAnnouncements(Request $req)
    {
        $page = $req->get('page');
        $perPage = $req->get('perPage');
        $order = $req->get('order');
        $sort = $req->get('sort');
        $filter = $req->get('filter');
        $dateSet = $req->get('dateSet');

        $announcements = Post::where('type', 'Announcement');

        if (isset($dateSet) && $dateSet == 'done') {
            $announcements->where(function ($q) {
                $q->where(function ($q2) {
                    $q2->whereDate('from_date', '<', now()->format('Y-m-d'))
                        ->where('to_date', null);
                })
                    ->orWhere(function ($q2) {
                        $q2->whereDate('to_date', '<', now()->format('Y-m-d'));
                    });
            });
        } else {
            $announcements->where(function ($q) {
                $q->whereDate('from_date', '>=', now()->format('Y-m-d'))
                    ->orWhereDate('to_date', '>=', now()->format('Y-m-d'));
            });
        }

        $announcements->leftJoin('users', 'posts.user_id', 'users.id')
            ->select('users.username', 'posts.*')
            ->orderBy($sort, $order);

        if (isset($filter) && $filter != "") {
            $announcements->where('title', 'LIKE', '%' . $filter . '%');
        }

        return $announcements->paginate($perPage, ['*'], 'page', $page);
    }

    public function createPost(Request $req)
    {
        Auth::user()->post()->create($req->all());
        return true;
    }

    public function editPost(Request $req)
    {
        $id = $req->id;
        $temp = $req->all();
        unset($temp['id']);
        Post::where('id', $id)->update($temp);
        return true;
    }

    public function deletePost($id)
    {
        Post::find($id)->delete();
        return true;
    }
}
