<?php

namespace App\Controllers;

use App\Controllers\Controller;
use App\Graphql\Types\QueryType;
use App\Graphql\Types\MutationType;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Schema;
use RuntimeException;
use Throwable;
use GraphQL\Type\SchemaConfig;
use App\App;


class GraphQL extends Controller
{
    public static function handle() {
        header('Content-Type: application/json; charset=UTF-8');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;
        }

        try {
            $logger = App::init()->getService('logger');

            $queryType = new QueryType();
        
            $mutationType = new MutationType();
        
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
            $logger->info(json_encode($output));
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

        return json_encode($output);
    }
}