<?php
use GraphQL\Type\Definition\ObjectType;

final final class MutationType extends ObjectType 
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Mutation',
            'fields' => []
        ]);
    }
}
