<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function categoryList()
    {
        $categories = Category::latest()->get();
        return response()->json([
            'message' => 'Category list fetched.',
            'data' => $categories,
        ], 200);
    }
    public function postList()
    {
        $posts = Post::with('categories:id,name,color')->where('active',1)->latest()->take(6)->get();
        return response()->json([
            'message' => 'Post list fetched.',
            'data' => $posts,
        ], 200);
    }

    public function showPostDetails($slug)
    {
        $post = Post::with('categories:id,name,color', 'user:id,name')->where('slug', $slug)->firstOrFail();
          return response()->json([
            'message' => 'Post list fetched.',
            'data' => $post,
        ], 200);
    }
}
