<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\ContactMessage;
use App\Models\Post;
use App\Models\Subscribe;
use Illuminate\Http\Request;
use Validator;

class HomeController extends Controller
{
    public function categoryList(Request $request)
    {
        $limit = $request->query('limit'); // may be null
        $sort = $request->query('sort', 'desc'); // default desc if not sent


        $query = Category::withCount('posts')->latest()
            ->orderBy('created_at', $sort);

        if ($limit) {
            $query->take($limit);
        }

        $categories = $query->get();
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
            ->where('active', 1);

        if ($sort === 'popular') {
            $query->orderBy('views', 'desc'); // Most viewed first
        } elseif (in_array($sort, ['asc', 'desc'])) {
            $query->orderBy('created_at', $sort); // By date
        } else {
            // fallback to newest first
            $query->orderBy('created_at', 'desc');
        }

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
        $post->increment('views');
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
            ->where('active', 1)
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

    public function sendMessage(Request $request)
    {
        // Validate input fields
        $validator = Validator::make($request->all(), [
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }

        ContactMessage::create($request->all());

        // Return success response
        return response()->json([
            'status'  => 'success',
            'message' => 'Message sent successfully!',
        ]);
    }

    public function subscribe(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'   => 'required|email|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }

        Subscribe::create($request->all());

        // Return success response
        return response()->json([
            'status'  => 'success',
            'message' => 'Subscribed successfully!',
        ]);
    }
}
