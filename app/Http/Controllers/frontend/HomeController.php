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

    public function relatedPosts($slug)
    {
        $currentPost = Post::with('categories')->where('slug', $slug)->firstOrFail();

        // Get IDs of current post's categories
        $categoryIds = $currentPost->categories->pluck('id');

        // Get related posts with at least one matching category
        $relatedPosts = Post::with(['categories', 'user'])
            ->where('posts.id', '!=', $currentPost->id) // Explicitly specify table
            ->whereHas('categories', function($query) use ($categoryIds) {
                $query->whereIn('categories.id', $categoryIds); // Explicitly specify table
            })
            ->orderBy('posts.created_at', 'desc') // Explicitly specify table
            ->limit(5)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $relatedPosts
        ]);
    }
}
