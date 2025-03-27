<?php

use Illuminate\Support\Facades\Route;


Route::get('/{any}', function () {
    return view('welcome'); // loads your React app
})->where('any', '.*');