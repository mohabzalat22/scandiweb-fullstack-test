<?php

namespace App\Graphql\Types;

use App\Graphql\Resolvers\OrderResolver;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

use App\Graphql\Types\OrderType;
use App\Graphql\Types\OrderItemType;

final class MutationType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Mutation',
            'fields' => [
                'sum' => [
                    'type' => Type::int(),
                    'args' => [
                        'x' => ['type' => Type::int()],
                        'y' => ['type' => Type::int()],
                    ],
                    'resolve' => static fn($calc, array $args): int => $args['x'] + $args['y'],
                ],
                'createOrder' => [
                    'type' => Type::string(),
                    'args' => [
                        'order' => [
                            'type' => new OrderType()
                        ]
                    ],

                    'resolve' => function ($root, $args) {
                        $order = $args['order'];
                        return OrderResolver::CreateOrder($order);
                    }

                ]
            ]
        ]);
    }
}
