<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\frontend\HomeController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('posts', PostController::class);
    Route::get('/posts/slug/{slug}', [PostController::class, 'showBySlug']);
});

// frontend api
Route::get('/category-list', [HomeController::class, 'categoryList']);
Route::get('/post-list', [HomeController::class, 'postList']);
Route::get('/posts/{slug}', [HomeController::class, 'showPostDetails']);
