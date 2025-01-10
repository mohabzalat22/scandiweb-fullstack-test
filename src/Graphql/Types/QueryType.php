<?php

namespace App\Graphql\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use Exception;
use App\Graphql\Resolvers\ProductResolver;
use App\Models\Category;

final class QueryType extends ObjectType {

    public function __construct()
    {
        $productType = new ProductType();
        parent::__construct([
            'name' => 'Query',
            'fields' => [
                'echo' => [
                    'type' => Type::string(),
                    'args' => [
                        'message' => ['type' => Type::string()],
                    ],
                    'resolve' => static fn ($rootValue, array $args): string => $rootValue['prefix'] . $args['message'],
                ],
                'categories' => [
                    'type' => Type::listOf(new CategoryType()),
                    'resolve' => function(){
                        return (new Category())->all();
                    }
                ],
                'products' => [
                    'type' => Type::listOf($productType),
                    'args' => [
                        'category' =>[
                            'type' => Type::string()
                            ]
                        ],
                    'resolve' => function($root, $args){
                        return ProductResolver::all($args['category']);
                    },  
                ],
                'product' => [
                    'type' => $productType,
                    'args' => [
                        'id' => [
                            'type' => Type::nonNull(Type::string())
                        ]
                    ],
                    'resolve' => function($root, $args){
                        $product = ProductResolver::find($args['id']);
                        return $product;
                    }
                ]
            ],
        ]);
    }
}
