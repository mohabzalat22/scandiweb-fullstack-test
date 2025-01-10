<?php

namespace App\Graphql\Resolvers;

use App\App;

class ProductResolver 
{
    public static function all(string $category = 'all')
    {
        $database = App::init()->getService('database')->orm();

        $sql = "SELECT 
                p.id,
                p.name,
                p.inStock,
                p.gallery,
                p.description,
                p.brand,
                c.name AS category,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', a.id,
                        'name', a.name,
                        'type', a.type,
                        'items', (
                            SELECT JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'id', pa.id,
                                    'value', pa.value,
                                    'displayValue', pa.displayValue
                                )
                            )
                            FROM product_attributes pa
                            WHERE pa.attribute_id = a.id AND pa.product_id = p.id
                        )
                    )
                ) AS attributes,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'currency', JSON_OBJECT(
                            'label', cur.label, 
                            'symbol', cur.symbol 
                        ),
                        'amount', pr.amount
                    )
                ) AS prices
            FROM 
                products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN prices pr ON pr.product_id = p.id
            LEFT JOIN currencies cur ON pr.currency_id = cur.id
            LEFT JOIN product_attributes pa ON pa.product_id = p.id
            LEFT JOIN attributes a ON pa.attribute_id = a.id
            GROUP BY 
                p.id;
        ";
        $category = trim($category);
        if(!empty($category) && $category != 'all' ){
            $selectedCategoryRecord = $database->get('categories', '*', [
                'name' => htmlspecialchars($category)
            ]);

            if($selectedCategoryRecord){
                $sql = "SELECT 
                        p.id,
                        p.name,
                        p.inStock,
                        p.gallery,
                        p.description,
                        p.brand,
                        c.name AS category,
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id', a.id,
                                'name', a.name,
                                'type', a.type,
                                'items', (
                                    SELECT JSON_ARRAYAGG(
                                        JSON_OBJECT(
                                            'id', pa.id,
                                            'value', pa.value,
                                            'displayValue', pa.displayValue
                                        )
                                    )
                                    FROM product_attributes pa
                                    WHERE pa.attribute_id = a.id AND pa.product_id = p.id
                                )
                            )
                        ) AS attributes,
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'currency', JSON_OBJECT(
                                    'label', cur.label, 
                                    'symbol', cur.symbol 
                                ),
                                'amount', pr.amount
                            )
                        ) AS prices
                    FROM 
                        products p
                    LEFT JOIN categories c ON p.category_id = c.id
                    LEFT JOIN prices pr ON pr.product_id = p.id
                    LEFT JOIN currencies cur ON pr.currency_id = cur.id
                    LEFT JOIN product_attributes pa ON pa.product_id = p.id
                    LEFT JOIN attributes a ON pa.attribute_id = a.id
                    WHERE p.category_id = :category_id
                    GROUP BY 
                        p.id;
                ";
                $stmt = $database->pdo->prepare($sql);
                $stmt->execute(['category_id' => $selectedCategoryRecord['id']]);
                $products = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            }
        } else {
            $products = $database->query($sql)->fetchAll();
        }

        // process the results to associative arr
        return array_map(function ($product) {
            if (isset($product['attributes'])) {
                $product['attributes'] = json_decode($product['attributes'], true);
            }
            if (isset($product['prices'])) {
                $product['prices'] = json_decode($product['prices'], true);
            }
            return $product;
        }, $products);
    }
}
