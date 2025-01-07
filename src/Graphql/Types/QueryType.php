<?php

namespace App\Graphql\Types;

use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ListOfType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Graphql\Types\ProductType;
use App\Models\Product;

final class QueryType extends ObjectType {

    public function __construct()
    {
        parent::__construct([
            'name' => 'Query',
            'fields' => [
                'products' => [
                    'type' => Type::listOf(new ProductType()),
                    'resolve' => function($root, $args){
                        return (new Product)->all();
                    },  
                ]
            ],
        ]);
    }
}
