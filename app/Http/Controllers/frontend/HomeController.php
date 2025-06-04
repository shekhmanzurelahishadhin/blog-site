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
        $categories = Category::withCount('posts')->latest()->get();
        return response()->json([
            'message' => 'Category list fetched.',
            'data' => $categories,
        ], 200);
    }

    public function postList(Request $request)
    {
        $limit = $request->query('limit'); // may be null
        $sort = $request->query('sort', 'desc'); // default desc if not sent

        $query = Post::with('categories:id,name,color')
            ->where('active', 1)
            ->orderBy('created_at', $sort);

        if ($limit) {
            $query->take($limit);
        }

        $posts = $query->get();

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
