<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Menu extends Component
{
    /**
     * segment property
     *
     * @var string
     */
    public string $segment;

    /**
     * Create a new component instance.
     */
    public function __construct(string $segment)
    {
        // receive data from template and assign to component public property
        $this->segment = $segment;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {

        return view('components.menu');
    }
}
