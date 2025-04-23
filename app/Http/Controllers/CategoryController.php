<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index() {
        $categories = Category::latest()->get();
        return response()->json([
            'message' => 'Category list fetched.',
            'data' => $categories,
        ], 200);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'name' => 'required',
            'slug' => 'required|unique:categories'
        ]);

        $category = Category::create($data);

        return response()->json([
            'message' => 'Category created successfully.',
            'data' => $category
        ], 201);
    }

    public function show(Category $category) {
        return response()->json([
            'message' => 'Category fetched.',
            'data' => $category
        ], 200);
    }

    public function update(Request $request, Category $category) {
        $data = $request->validate([
            'name' => 'required',
            'slug' => 'required|unique:categories,slug,' . $category->id
        ]);

        $category->update($data);

        return response()->json([
            'message' => 'Category updated successfully.',
            'data' => $category
        ], 200);
    }

    public function destroy(Category $category) {
        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully.'
        ], 200);
    }
}
