<?php

namespace App\Models;

use App\Models\Model;

class Category extends Model {

    protected string $table = 'prices';

    public function __construct(){
        parent::__construct($this->table);
    }
}