<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\frontend\HomeController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\CommentController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// frontend api
Route::get('/category-list', [HomeController::class, 'categoryList']);
Route::get('/post-list', [HomeController::class, 'postList']);
Route::get('/posts/{slug}', [HomeController::class, 'showPostDetails']);
Route::get('/posts/related/{slug}', [HomeController::class, 'relatedPosts']);
Route::post('/send-message', [HomeController::class, 'sendMessage']);
Route::post('/subscribe', [HomeController::class,'subscribe']);
Route::get('/posts/{post}/comments', [CommentController::class, 'index']);
Route::post('/comments/{comment}/reply', [CommentController::class, 'reply']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('posts', PostController::class);
    Route::get('/posts/slug/{slug}', [PostController::class, 'showBySlug']);
    Route::apiResource('contact-messages', ContactMessageController::class);
    Route::get('subscriber-list', [ContactMessageController::class, 'subscriberList']);
    Route::delete('destroy-subscriber/{subscribe}', [ContactMessageController::class, 'subscriberDestroy']);


    Route::post('/comments', [CommentController::class, 'store']);

});


