<?php

namespace App\Models;

use App\Models\Model;

class Product extends Model {

    protected string $table = 'products';

    public function __construct(){
        parent::__construct($this->table);
    }
}