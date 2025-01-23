<?php

namespace App\Models;

use App\Models\Model;

class Currency extends Model
{

    protected string $table = 'currencies';

    public function __construct()
    {
        parent::__construct($this->table);
    }
}
