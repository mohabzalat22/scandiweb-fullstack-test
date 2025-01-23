<?php

namespace App\Graphql\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

final class AttributeType extends ObjectType
{

    public function __construct()
    {
        parent::__construct([
            'name' => 'Attribute',
            'fields' => [
                'id' => Type::string(),
                'attribute_id' => Type::string(),
                'product_id' => Type::string(),
                'displayValue' => Type::string(),
                'value' => Type::string(),
            ],
        ]);
    }
}
