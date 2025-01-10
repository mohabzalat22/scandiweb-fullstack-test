<?php

namespace App\Models;

use App\Models\Model;

class OrderItem extends Model {

    protected string $table = 'order_items';

    public function __construct(){
        parent::__construct($this->table);
    }
}