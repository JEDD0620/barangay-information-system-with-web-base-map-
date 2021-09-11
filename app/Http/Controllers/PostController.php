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

        $events = Post::where('type', 'Event')
            ->whereDate('from_date', '>=', now()->format('Y-m-d'))
            ->leftJoin('users', 'posts.user_id', 'users.id')
            ->select('users.f_name', 'posts.*')
            ->orderBy($sort, $order);

        if (!!isset($filter)) {
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

        $announcements = Post::where('type', 'Announcement')
            ->leftJoin('users', 'posts.user_id', 'users.id')
            ->select('users.f_name', 'posts.*')
            ->orderBy($sort, $order);

        if (!!isset($filter)) {
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
