<?php

namespace App\Graphql\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

final class OrderItemType extends InputObjectType 
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'OrderItem',
            'fields' => [
                'order_id' => Type::int(),
                'product_id' => Type::int(),
                'attributes' => Type::string(),
                'quantity' => Type::int(),
                'price' => Type::float(),
            ]
        ]);
    }
}
