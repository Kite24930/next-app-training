<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PageController::class, 'home']);
Route::get('/chapters', [PageController::class, 'chapters']);
Route::get('/chapters/{number}', [PageController::class, 'chapter'])->where('number', '[1-8]');
Route::get('/demo', [PageController::class, 'demo']);
Route::get('/about', [PageController::class, 'about']);
