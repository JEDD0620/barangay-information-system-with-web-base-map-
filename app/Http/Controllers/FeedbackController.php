<?php

namespace App\Http\Controllers;

use App\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FeedbackController extends Controller
{
    public function getFeedbacks(Request $req)
    {
        $page = $req->get('page');
        $perPage = $req->get('perPage');
        $order = $req->get('order');
        $sort = $req->get('sort');
        $filter = $req->get('filter');

        $events = Feedback::where('parent_id', null)
            ->leftJoin('users', 'feedbacks.user_id', 'users.id')
            ->select('users.f_name', 'feedbacks.*')
            ->withCount('comment')
            ->orderBy($sort, $order);

        if (!!isset($filter)) {
            $events->where('title', 'LIKE', '%' . $filter . '%');
        }

        return $events->paginate($perPage, ['*'], 'page', $page);
    }

    public function getFeedback(Request $req, $id)
    {
        $page = $req->get('page');
        $perPage = $req->get('perPage');
        $order = $req->get('order');
        $sort = $req->get('sort');
        $filter = $req->get('filter');

        $events = Feedback::where('feedbacks.id', $id)
            ->leftJoin('users', 'feedbacks.user_id', 'users.id')
            ->select('users.f_name', 'feedbacks.*')
            ->with(['comment' =>  function ($q) {
                $q->leftJoin('users', 'feedbacks.user_id', 'users.id')
                    ->select('users.f_name', 'feedbacks.*')
                    ->orderBy('created_at', 'asc')
                    ->with(['comment' =>  function ($q) {
                        $q->leftJoin('users', 'feedbacks.user_id', 'users.id')
                            ->select('users.f_name', 'feedbacks.*')
                            ->orderBy('created_at', 'asc');
                    }]);;
            }]);

        if (!!isset($filter)) {
            $events->where('title', 'LIKE', '%' . $filter . '%');
        }

        return $events->first();
    }

    public function newFeedback(Request $req)
    {
        Feedback::create([
            'title' => $req->title,
            'body' => $req->body,
            'user_id' => Auth::id(),
        ]);
    }

    public function newComment($id, Request $req)
    {
        return Feedback::find($id)->comment()->create([
            'body' => $req->body,
            'user_id' => Auth::id()
        ]);
    }

    public function editFeedback($id, Request $req)
    {
        Feedback::find($id)->update([
            'title' => $req->title,
            'body' => $req->body,
        ]);

        return true;
    }

    public function deleteComment($id)
    {
        $feedback = Feedback::find($id);
        $feedback->comment()->delete();
        $feedback->delete();
        return true;
    }
}
