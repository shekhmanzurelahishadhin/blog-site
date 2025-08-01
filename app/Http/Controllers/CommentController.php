<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\CommentLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    // List comments + nested replies for a post
    public function index(Request $request,$postId)
    {
        $userId = $request->query('user_id');
        $comments =  $userId = $request->query('user_id');

        $comments = Comment::where('post_id', $postId)
            ->whereNull('parent_id')
            ->with([
                'user',
                'replies' => function ($q) use ($userId) {
                    $q->with('user')
                        ->when($userId, function ($query) use ($userId) {
                            $query->withCount(['likedByUser as is_liked' => function ($q2) use ($userId) {
                                $q2->where('user_id', $userId);
                            }]);
                        });
                }
            ])
            ->when($userId, function ($query) use ($userId) {
                $query->withCount(['likedByUser as is_liked' => function ($q) use ($userId) {
                    $q->where('user_id', $userId);
                }]);
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'message' => 'Comments list fetched.',
            'data' => $comments,
            'user'=>$userId
        ], 200);
    }

    // Store new top-level comment
    public function store(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id',
            'text' => 'required|string',
        ]);

        $comment = Comment::create([
            'user_id' => auth()->id(),
            'post_id' => $request->post_id,
            'text' => $request->text,
            'parent_id' => null,
        ]);

        $comment->load('user','replies');

        return response()->json([
            'message' => 'Commented successfully.',
            'status'  => 'success',
            'data' => $comment
        ], 200);
    }

    // Store reply to a comment
    public function reply(Request $request, $commentId)
    {
        $request->validate([
            'text' => 'required|string',
        ]);

        $parentComment = Comment::findOrFail($commentId);

        $reply = Comment::create([
            'user_id' => auth()->id(),
            'post_id' => $parentComment->post_id,
            'text' => $request->text,
            'parent_id' => $parentComment->id,
        ]);

        $reply->load('user');

        return response()->json([
            'message' => 'Replied successfully.',
            'status'  => 'success',
            'data' => $reply
        ], 200);
    }

    public function destroyComment(Comment $comment)
    {
        $comment->delete();

        return response()->json([
            'message' => 'Comment deleted successfully.'
        ], 200);
    }

    public function toggleLike($id)
    {
        $comment = Comment::findOrFail($id);
        $userId = auth()->id();

        $existingLike = CommentLike::where('comment_id', $id)
            ->where('user_id', $userId)
            ->first();

        if ($existingLike) {
            // Unlike
            $existingLike->delete();
            $comment->decrement('likes');
            return response()->json(['message' => 'Unliked', 'likes' => $comment->likes]);
        } else {
            // Like
            CommentLike::create([
                'comment_id' => $id,
                'user_id' => $userId
            ]);
            $comment->increment('likes');
            return response()->json(['message' => 'Liked', 'likes' => $comment->likes]);
        }
    }

}
