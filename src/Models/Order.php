<?php

namespace App\Models;

use App\Models\Model;

class Order extends Model {

    protected string $table = 'orders';

    public function __construct(){
        parent::__construct($this->table);
    }
}