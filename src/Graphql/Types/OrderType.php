<?php
use GraphQL\Type\Definition\ObjectType;

final final class OrderType extends ObjectType 
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Order',
            'fields' => []
        ]);
    }
}
