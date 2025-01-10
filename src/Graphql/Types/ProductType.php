<?php

namespace App\Graphql\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

final class ProductType extends ObjectType {

    public function __construct()
    {
        parent::__construct([
            'name' => 'Product',
            'fields' => [
                'id' => Type::nonNull(Type::string()),
                'name' => Type::nonNull(Type::string()),
                'inStock' => Type::nonNull(Type::boolean()),
                'gallery' => Type::nonNull(Type::string()),
                'description' => Type::string(), //can be null
                'category' => Type::string(),
                'attributes' => Type::listOf(new AttributeType),
                'brand' => Type::nonNull(Type::string()),
                'prices' => Type::listOf(new PriceType)
            ],
        ]);
    }
}
