<?php

namespace App\Models;

use Laravel\Sanctum\PersonalAccessToken as SactumPersonalAccessToken;

class PersonalAccessToken extends SactumPersonalAccessToken {
    /**
     * Model represent table
     *
     * protected  @var string $table
     */
    protected $table = 'trans4mers.personal_access_token';
}
