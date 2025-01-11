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
                'gallery' => Type::listOf(Type::string()),
                'description' => Type::string(), //can be null
                'category' => Type::nonNull(Type::string()),
                'attributes' => Type::listOf(new AttributeSetType),
                'brand' => Type::nonNull(Type::string()),
                'prices' => Type::listOf(new PriceType)
            ],
        ]);
    }
}
