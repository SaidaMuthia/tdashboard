<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PageController::class, 'index'])->name('homepage');

// Route::get('/visualization', function () {
//     return view('visualization');
// })->name('visualization');

Route::get('/visualization-rows', function () {
    return view('visualization-rows');
})->name('visualization-rows');

Route::get('/visualization-upgraded', function () {
    return view('visualization-upgraded');
})->name('visualization-upgraded');

Route::get('/visualization', function () {
    return Inertia::render('Visualization');
})->name('visualization');