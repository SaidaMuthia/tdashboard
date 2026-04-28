<?php

namespace App\View\Components\Test;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\View\Component;

class CardComponent extends Component
{

    protected $except = ['request'];

    /**
     * Create a new component instance.
     */
    public function __construct(
        public Request $request,
        public string $cardTitle = 'Card Title',
        public string $cardText = 'Card Text'
    ) {}


    /**
     * Component method
     */
    public function cardTitleCheck($title): bool
    {
        return $title === $this->cardTitle;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.test.card-component');
    }
}
