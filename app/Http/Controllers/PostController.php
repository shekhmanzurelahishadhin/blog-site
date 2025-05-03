<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('categories', 'user')->latest()->get();

        return response()->json([
            'message' => 'Post list fetched.',
            'data' => $posts
        ], 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'slug' => 'required|unique:posts',
            'meta' => 'required',
            'description' => 'required',
            'category_ids' => 'required|array',
            'category_ids.*' => 'exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'active' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('posts', 'public');
        }

        $data['user_id'] = Auth::id();
        $data['active'] = $data['active'] ?? false;

        $post = Post::create($data);
        $post->categories()->sync($data['category_ids']);

        return response()->json([
            'message' => 'Post created successfully.',
            'data' => $post->load('categories', 'user')
        ], 201);
    }

    public function show(Post $post)
    {
        return response()->json([
            'message' => 'Post fetched.',
            'data' => $post->load('categories', 'user')
        ], 200);
    }

    public function update(Request $request, Post $post)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string|unique:posts,slug,' . $post->id,
            'meta' => 'required|string',
            'description' => 'required|string',
            'category_ids' => 'required|array',
            'category_ids.*' => 'exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'active' => 'boolean',
            'published_at' => 'nullable|date',
        ]);


        if ($request->hasFile('image')) {
            if ($post->image && Storage::disk('public')->exists($post->image)) {
                Storage::disk('public')->delete($post->image);
            }

            $data['image'] = $request->file('image')->store('posts', 'public');
        }

        $post->update($data);
        $post->categories()->sync($data['category_ids']);

        return response()->json([
            'message' => 'Post updated successfully.',
            'data' => $post->load('categories', 'user')
        ], 200);
    }

    public function destroy(Post $post)
    {
        if ($post->image && Storage::disk('public')->exists($post->image)) {
            Storage::disk('public')->delete($post->image);
        }

        $post->categories()->detach();
        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully.'
        ], 200);
    }
    public function showBySlug($slug)
    {
        $post = Post::where('slug', $slug)->with('categories', 'user')->firstOrFail();

        return response()->json([
            'message' => 'Post details fetched.',
            'data' => $post
        ]);
    }

}
