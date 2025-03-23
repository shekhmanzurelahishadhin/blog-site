<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index() {
        $posts = Post::with('category')->latest()->get();
        return response()->json([
            'message' => 'Post list fetched.',
            'data' => $posts
        ], 200);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'title' => 'required',
            'slug' => 'required|unique:posts',
            'meta' => 'required',
            'description' => 'required',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('posts', 'public');
        }

        $post = Post::create($data);

        return response()->json([
            'message' => 'Post created successfully.',
            'data' => $post
        ], 201);
    }

    public function show(Post $post) {
        return response()->json([
            'message' => 'Post fetched.',
            'data' => $post->load('category')
        ], 200);
    }

    public function update(Request $request, Post $post) {
        $data = $request->validate([
            'title' => 'required',
            'slug' => 'required|unique:posts,slug,' . $post->id,
            'meta' => 'required',
            'description' => 'required',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('posts', 'public');
        }

        $post->update($data);

        return response()->json([
            'message' => 'Post updated successfully.',
            'data' => $post
        ], 200);
    }

    public function destroy(Post $post) {
        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully.'
        ], 200);
    }
}
