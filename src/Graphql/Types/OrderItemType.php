<?php
use GraphQL\Type\Definition\ObjectType;

final final class OrderItemType extends ObjectType 
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'OrderItem',
            'fields' => []
        ]);
    }
}
