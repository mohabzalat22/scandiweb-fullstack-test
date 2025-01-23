<?php

namespace App\Graphql\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

final class CurrencyType extends ObjectType
{

    public function __construct()
    {
        parent::__construct([
            'name' => 'Currency',
            'fields' => [
                'id' => Type::nonNull(Type::int()),
                'label' => Type::string(),
                'symbol' => Type::string(),
            ],
        ]);
    }
}
