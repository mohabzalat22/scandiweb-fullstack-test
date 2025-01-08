<?php

namespace App\Graphql\Types;

use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ListOfType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Graphql\Types\ProductType;
use App\Models\Product;
use Exception;
use Throwable;

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
                'products' => [
                    'type' => Type::listOf($productType),
                    'resolve' => function($root, $args){
                        return (new Product)->all();
                    },  
                ],
                'product' => [
                    'type' => Type::getNullableType($productType),
                    'args' => [
                        'id' => [
                            'type' => Type::nonNull(Type::string())
                        ]
                    ],
                    'resolve' => function($root, $args){
                        try{
                            $product = (new Product)->find($args['id']);
                            if(!$product || empty($product)){
                                throw new Exception('unable to find product with id :'.$args['id']);
                            }
                            return $product;
                        } catch (Throwable $e){
                            \App\App::init()->getService('logger')->error($e->getMessage());
                        }
                    }
                ]
            ],
        ]);
    }
}
