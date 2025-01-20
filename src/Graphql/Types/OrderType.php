<?php
namespace App\Graphql\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

final class OrderType extends InputObjectType 
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Order',
            'fields' => [
                // 'order_number' => Type::int(),
                'total_amount' => Type::float(),
                'currency_id' => Type::int(),
                // 'status' => Type::string()
                'items' => Type::listOf(new OrderItemType)
            ]
        ]);
    }
}
