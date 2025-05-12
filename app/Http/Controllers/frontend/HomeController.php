<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::latest()->get();
        return response()->json([
            'message' => 'Category list fetched.',
            'data' => $categories,
        ], 200);
    }
}
