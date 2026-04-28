<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController
{
    /**
     * Display home page
     */
    public function index(Request $request)
    {
        return view('main');
    }
}
