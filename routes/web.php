<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Fix: Place specific routes FIRST
Route::get('/auth/google', [AuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);

// Catch-all route should come LAST
Route::get('/{any}', function () {
    return view('welcome'); // React app
})->where('any', '.*');