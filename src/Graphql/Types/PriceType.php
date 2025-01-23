<?php

namespace App\Graphql\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

final class PriceType extends ObjectType
{

    public function __construct()
    {
        parent::__construct([
            'name' => 'Price',
            'fields' => [
                'id' => Type::nonNull(Type::int()),
                'amount' => Type::string(),
                'currency' => new CurrencyType
            ],
        ]);
    }
}
