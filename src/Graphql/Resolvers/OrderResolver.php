<?php

namespace App\Graphql\Resolvers;

use Rakit\Validation\Validator;
use Exception;
use App\App;
use App\Models\Order;
use App\Models\OrderItem;
use Ramsey\Uuid\Uuid;

class OrderResolver
{
    public static function CreateOrder($order): string
    {
        // orderValidation layer
        // creation
        // return data with unique key

        // key exists value too

        $validator = new Validator;
        $orderValidation = $validator->make($order, [
            'total_amount' => 'required|numeric',
            'currency_id' => 'required|numeric',
            'items' => 'required|array|min:1'
        ]);

        $orderValidation->validate();

        if ($orderValidation->fails()) {
            return "Error Occured Try Again.";
        }

        $orderData = $orderValidation->getValidData();
        $orderItems = $orderData['items'];

        if (!is_array($orderItems) || empty($orderItems)) {
            return "Error Occurred: Try Again.";
        }

        $orderItemsAreValid = array_reduce($orderItems, function ($acc, $el) use ($validator) {
            if (!is_array($el)) {
                return false;
            }
            $itemValidation = $validator->make($el, [
                'product_id' => 'required',
                'quantity' => 'required|numeric|min:1',
                'price' => 'required|numeric|min:1',
                'attributes' => 'required'
            ]);
            $itemValidation->validate();
            return $acc && !$itemValidation->fails();
        }, true);

        if ($orderItemsAreValid) {
            // total validation vs items
            $totalAmountCalculated = array_reduce($orderItems, function ($acc, $el) {
                return $acc + $el['price'] * $el['quantity'];
            }, 0);

            if ($totalAmountCalculated == $orderData['total_amount']) {
                return static::insertRecords($orderData, $orderItems);
            }
        }
        return "Error Occurred: Try Again.";
    }

    private static function insertRecords($orderData, $orderItemsData): string
    {
        $orderModel = new Order();
        $uuid = Uuid::uuid4();

        $orderRecord = $orderModel->create([
            'order_number' => $uuid->toString(),
            'total_amount' => $orderData['total_amount'],
            'currency_id' => $orderData['currency_id'],
        ]);

        $orderItemModel = new OrderItem();
        $orderItemsSaved = true;

        foreach ($orderItemsData as $itemData) {
            $orderItemRecord = $orderItemModel->create([
                'order_id' => $orderRecord['id'],
                'product_id' => $itemData['product_id'],
                'attributes' => json_encode($itemData['attributes']),
                'quantity' => $itemData['quantity'],
                'price' => $itemData['price'],
            ]);

            if (!$orderItemRecord) {
                $orderItemsSaved = false;
            }
        }


        if ($orderRecord && $orderItemsSaved) {
            return "Your Order ID IS: " . $orderRecord['order_number'];
        }
        return "ERROR DURING MAKING ORDER.";
    }
}
