<?php

namespace App\Graphql\Resolvers;

use App\App;
use App\Models\Attribute;
use App\Models\Product;
use Exception;

class ProductResolver 
{
    public static function all(string $category = 'all')
    {
        $database = App::init()->getService('database')->orm();

        $sql = "WITH attribute_items AS (
                SELECT 
                    pa.attribute_id,
                    pa.product_id,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', pa.id,
                            'value', pa.value,
                            'displayValue', pa.displayValue
                        )
                    ) AS items
                FROM product_attributes pa
                GROUP BY pa.attribute_id, pa.product_id
            ),
            product_prices AS (
                SELECT 
                    pr.product_id,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'currency', JSON_OBJECT(
                                'id', cur.id,
                                'label', cur.label, 
                                'symbol', cur.symbol
                            ),
                            'amount', pr.amount
                        )
                    ) AS prices
                FROM prices pr
                LEFT JOIN currencies cur ON pr.currency_id = cur.id
                GROUP BY pr.product_id
            )
            SELECT 
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
                        'items', ai.items
                    )
                ) AS attributes,
                pp.prices
            FROM 
                products p
            LEFT JOIN categories c ON p.category_id = c.id 
            LEFT JOIN product_prices pp ON pp.product_id = p.id
            LEFT JOIN attributes a ON a.id IN (
                SELECT DISTINCT pa.attribute_id 
                FROM product_attributes pa 
                WHERE pa.product_id = p.id
            )
            LEFT JOIN attribute_items ai ON ai.attribute_id = a.id AND ai.product_id = p.id
            GROUP BY 
                p.id, c.name; 
            ";
        $category = trim($category);
        if(!empty($category) && $category != 'all' ){
            $selectedCategoryRecord = $database->get('categories', '*', [
                'name' => htmlspecialchars($category)
            ]);

            if($selectedCategoryRecord){
                $sql = "WITH attribute_items AS (
                        SELECT 
                            pa.attribute_id,
                            pa.product_id,
                            JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'id', pa.id,
                                    'value', pa.value,
                                    'displayValue', pa.displayValue
                                )
                            ) AS items
                        FROM product_attributes pa
                        GROUP BY pa.attribute_id, pa.product_id
                    ),
                    product_prices AS (
                        SELECT 
                            pr.product_id,
                            JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'currency', JSON_OBJECT(
                                        'id', cur.id,
                                        'label', cur.label, 
                                        'symbol', cur.symbol
                                    ),
                                    'amount', pr.amount
                                )
                            ) AS prices
                        FROM prices pr
                        LEFT JOIN currencies cur ON pr.currency_id = cur.id
                        GROUP BY pr.product_id
                    )
                    SELECT 
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
                                'items', ai.items
                            )
                        ) AS attributes,
                        pp.prices
                    FROM 
                        products p
                    LEFT JOIN categories c ON p.category_id = c.id 
                    LEFT JOIN product_prices pp ON pp.product_id = p.id
                    LEFT JOIN attributes a ON a.id IN (
                        SELECT DISTINCT pa.attribute_id 
                        FROM product_attributes pa 
                        WHERE pa.product_id = p.id
                    )
                    LEFT JOIN attribute_items ai ON ai.attribute_id = a.id AND ai.product_id = p.id
                    WHERE c.name = :category
                    GROUP BY 
                        p.id, c.name; 

                ";
                $stmt = $database->pdo->prepare($sql);
                $stmt->execute(['category' => $selectedCategoryRecord['name']]);
                $products = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            }
        } else {
            $products = $database->query($sql)->fetchAll();
        }

        // process the results to associative arr
        return array_map(function ($product) {
            $attributeStatusOk = json_decode($product['attributes'])[0]->id != null;
            if(isset($product['gallery'])){
                $product['gallery'] = json_decode($product['gallery']) ?? [];
            }
            if(!$attributeStatusOk){
                $product['attributes'] = [];
            }
            if (isset($product['attributes']) && $attributeStatusOk) {
                $product['attributes'] = json_decode($product['attributes'], true);
            }
            if (isset($product['prices'])) {
                $product['prices'] = json_decode($product['prices'], true) ?? [];
            }
            return $product;
        }, $products);
    }

    public static function find(string $id){
        $database = App::init()->getService('database')->orm();
        try{
            $sql = "WITH attribute_items AS (
                SELECT 
                    pa.attribute_id,
                    pa.product_id,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', pa.id,
                            'value', pa.value,
                            'displayValue', pa.displayValue
                        )
                    ) AS items
                FROM product_attributes pa
                GROUP BY pa.attribute_id, pa.product_id
            ),
            product_prices AS (
                SELECT 
                    pr.product_id,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'currency', JSON_OBJECT(
                                'id', cur.id,
                                'label', cur.label, 
                                'symbol', cur.symbol
                            ),
                            'amount', pr.amount
                        )
                    ) AS prices
                FROM prices pr
                LEFT JOIN currencies cur ON pr.currency_id = cur.id
                GROUP BY pr.product_id
            )
            SELECT 
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
                        'items', ai.items
                    )
                ) AS attributes,
                pp.prices
            FROM 
                products p
            LEFT JOIN categories c ON p.category_id = c.id 
            LEFT JOIN product_prices pp ON pp.product_id = p.id
            LEFT JOIN attributes a ON EXISTS (
                SELECT 1
                FROM product_attributes pa
                WHERE pa.product_id = p.id AND pa.attribute_id = a.id
            )
            LEFT JOIN attribute_items ai ON ai.attribute_id = a.id AND ai.product_id = p.id
            WHERE 
                p.id = :product_id
            GROUP BY 
                p.id, c.name;
            ";
            $id = trim($id);
            if($id && !empty($id)){
                $stmt = $database->pdo->prepare($sql);
                $stmt->execute(['product_id' => $id]);
                $product = $stmt->fetch(\PDO::FETCH_ASSOC);
                // assoc array
                $attributeStatusOk = json_decode($product['attributes'])[0]->id != null;
                if(isset($product['gallery'])){
                    $product['gallery'] = json_decode($product['gallery']) ?? [];
                }
                if(!$attributeStatusOk){
                    $product['attributes'] = [];
                }
                if (isset($product['attributes']) && $attributeStatusOk) {
                    $product['attributes'] = json_decode($product['attributes'], true);
                }
                if (isset($product['prices'])) {
                    $product['prices'] = json_decode($product['prices'], true) ?? [];
                }
                return $product;
            }
        } catch (Exception $e){
            \App\App::init()->getService('logger')->error($e->getMessage());
        }
    }
}
