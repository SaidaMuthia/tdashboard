<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;
use App\Models\PersonalAccessToken;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //default pattern for id parameter
        Route::pattern('id', '[0-9]+');
        // Sanctum's default model
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
    }
}
