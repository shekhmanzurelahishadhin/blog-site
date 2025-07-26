<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    // List comments + nested replies for a post
    public function index($postId)
    {
        $comments = Comment::where('post_id', $postId)
            ->whereNull('parent_id')
            ->with(['user', 'replies.user'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'message' => 'Comments list fetched.',
            'data' => $comments
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

        $comment->load('user');

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
}
