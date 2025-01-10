<?php

namespace App\Models;

use App\Models\Model;

class AttributeSet extends Model {

    protected string $table = 'products_attributes';

    public function __construct(){
        parent::__construct($this->table);
    }
}