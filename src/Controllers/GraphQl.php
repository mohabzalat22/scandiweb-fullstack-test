<?php

namespace App\Controllers;

use App\Controllers\Controller;
use App\Graphql\Types\QueryType;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use RuntimeException;
use Throwable;
use GraphQL\Type\SchemaConfig;
use App\App;

class GraphQL extends Controller
{
    public static function handle() {
        try {
            $logger = App::init()->getService('logger');

            $queryType = new QueryType();
        
            $mutationType = new ObjectType([
                'name' => 'Mutation',
                'fields' => [
                    'sum' => [
                        'type' => Type::int(),
                        'args' => [
                            'x' => ['type' => Type::int()],
                            'y' => ['type' => Type::int()],
                        ],
                        'resolve' => static fn ($calc, array $args): int => $args['x'] + $args['y'],
                    ],
                ],
            ]);
        
            $schema = new Schema(
                (new SchemaConfig())
                    ->setQuery($queryType)
                    ->setMutation($mutationType)
            );
        
            $rawInput = file_get_contents('php://input');

            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }
        
            $input = json_decode($rawInput, true);
            if (!is_array($input)) {
                throw new RuntimeException('Invalid JSON input.');
            }

            if (!isset($input['query']) || !$input['query']) {
                throw new RuntimeException('GraphQL query not found in input.');
            }

            $variableValues = $input['variables'] ?? null;
        
            $query = $input['query'] ?? null;

            if (!$query) {
                throw new RuntimeException('Query is missing in the input JSON.');
            }

            $result = GraphQLBase::executeQuery($schema, $query, null, null, $variableValues);
            $output = $result->toArray();
            $logger->debug(json_encode($output));
        } catch (Throwable $e) {
            $logger->error('An error occurred: ' . $e->getMessage(), [
                'exception' => $e,
                'stack_trace' => $e->getTraceAsString(),
            ]);            
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }
}