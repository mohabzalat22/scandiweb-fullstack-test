-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for scandiweb
CREATE DATABASE IF NOT EXISTS `scandiweb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `scandiweb`;

-- Dumping structure for table scandiweb.attributes
CREATE TABLE IF NOT EXISTS `attributes` (
  `id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table scandiweb.attributes: ~5 rows (approximately)
INSERT INTO `attributes` (`id`, `name`, `type`, `created_at`, `updated_at`) VALUES
	('Capacity', 'Capacity', 'text', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('Color', 'Color', 'swatch', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('Size', 'Size', 'text', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('Touch ID in keyboard', 'Touch ID in keyboard', 'text', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('With USB 3 ports', 'With USB 3 ports', 'text', '2025-01-20 22:55:13', '2025-01-20 22:55:13');

-- Dumping structure for table scandiweb.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table scandiweb.categories: ~2 rows (approximately)
INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
	(1, 'clothes', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	(2, 'tech', '2025-01-20 22:55:13', '2025-01-20 22:55:13');

-- Dumping structure for table scandiweb.currencies
CREATE TABLE IF NOT EXISTS `currencies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(100) NOT NULL,
  `symbol` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table scandiweb.currencies: ~0 rows (approximately)
INSERT INTO `currencies` (`id`, `label`, `symbol`, `created_at`, `updated_at`) VALUES
	(1, 'USD', '$', '2025-01-20 22:55:13', '2025-01-20 22:55:13');

-- Dumping structure for table scandiweb.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_number` varchar(255) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `currency_id` int NOT NULL,
  `status` enum('pending','confirmed','shipped','delivered','canceled') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_number` (`order_number`),
  KEY `currency_id` (`currency_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table scandiweb.orders: ~20 rows (approximately)

-- Dumping structure for table scandiweb.order_items
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` varchar(50) NOT NULL,
  `attributes` json NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table scandiweb.order_items: ~2 rows (approximately)

-- Dumping structure for table scandiweb.prices
CREATE TABLE IF NOT EXISTS `prices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` varchar(50) NOT NULL,
  `currency_id` int NOT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `currency_id` (`currency_id`),
  CONSTRAINT `prices_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `prices_ibfk_2` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table scandiweb.prices: ~8 rows (approximately)
INSERT INTO `prices` (`id`, `product_id`, `currency_id`, `amount`, `created_at`, `updated_at`) VALUES
	(1, 'huarache-x-stussy-le', 1, 144.69, '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	(2, 'jacket-canada-goosee', 1, 518.47, '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	(3, 'ps-5', 1, 844.02, '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	(4, 'xbox-series-s', 1, 333.99, '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	(5, 'apple-imac-2021', 1, 1688.03, '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	(6, 'apple-iphone-12-pro', 1, 1000.76, '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	(7, 'apple-airpods-pro', 1, 300.23, '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	(8, 'apple-airtag', 1, 120.57, '2025-01-20 22:55:13', '2025-01-20 22:55:13');

-- Dumping structure for table scandiweb.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` varchar(50) NOT NULL,
  `category_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `inStock` tinyint(1) NOT NULL DEFAULT '1',
  `gallery` json NOT NULL,
  `brand` varchar(100) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table scandiweb.products: ~8 rows (approximately)
INSERT INTO `products` (`id`, `category_id`, `name`, `inStock`, `gallery`, `brand`, `description`, `created_at`, `updated_at`) VALUES
	('apple-airpods-pro', 2, 'AirPods Pro', 0, '["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000"]', 'Apple', '\r\n<h3>Magic like you’ve never heard</h3>\r\n<p>AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And they’re ready to use right out of the case.</p>\r\n\r\n<h3>Active Noise Cancellation</h3>\r\n<p>Incredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what you’re listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation. By continuously adapting to the geometry of your ear and the fit of the ear tips, Active Noise Cancellation silences the world to keep you fully tuned in to your music, podcasts, and calls.</p>\r\n\r\n<h3>Transparency mode</h3>\r\n<p>Switch to Transparency mode and AirPods Pro let the outside sound in, allowing you to hear and connect to your surroundings. Outward- and inward-facing microphones enable AirPods Pro to undo the sound-isolating effect of the silicone tips so things sound and feel natural, like when you’re talking to people around you.</p>\r\n\r\n<h3>All-new design</h3>\r\n<p>AirPods Pro offer a more customizable fit with three sizes of flexible silicone tips to choose from. With an internal taper, they conform to the shape of your ear, securing your AirPods Pro in place and creating an exceptional seal for superior noise cancellation.</p>\r\n\r\n<h3>Amazing audio quality</h3>\r\n<p>A custom-built high-excursion, low-distortion driver delivers powerful bass. A superefficient high dynamic range amplifier produces pure, incredibly clear sound while also extending battery life. And Adaptive EQ automatically tunes music to suit the shape of your ear for a rich, consistent listening experience.</p>\r\n\r\n<h3>Even more magical</h3>\r\n<p>The Apple-designed H1 chip delivers incredibly low audio latency. A force sensor on the stem makes it easy to control music and calls and switch between Active Noise Cancellation and Transparency mode. Announce Messages with Siri gives you the option to have Siri read your messages through your AirPods. And with Audio Sharing, you and a friend can share the same audio stream on two sets of AirPods — so you can play a game, watch a movie, or listen to a song together.</p>\r\n', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('apple-airtag', 2, 'AirTag', 1, '["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000"]', 'Apple', '\r\n<h1>Lose your knack for losing things.</h1>\r\n<p>AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they’re on your radar in the Find My app. AirTag has your back.</p>\r\n', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('apple-imac-2021', 2, 'iMac 2021', 1, '["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000"]', 'Apple', 'The new iMac!', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('apple-iphone-12-pro', 2, 'iPhone 12 Pro', 1, '["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000"]', 'Apple', 'This is iPhone 12. Nothing else to say.', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('huarache-x-stussy-le', 1, 'Nike Air Huarache Le', 1, '["https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087", "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087", "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087", "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087", "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087"]', 'Nike x Stussy', '<p>Great sneakers for everyday use!</p>', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('jacket-canada-goosee', 1, 'Jacket', 1, '["https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg", "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg", "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg", "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg", "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg", "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png", "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png"]', 'Canada Goose', '<p>Awesome winter jacket</p>', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('ps-5', 2, 'PlayStation 5', 1, '["https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg", "https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg", "https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg", "https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg", "https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg"]', 'Sony', '<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('xbox-series-s', 2, 'Xbox Series S 512GB', 0, '["https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg", "https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg", "https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg", "https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg", "https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg"]', 'Microsoft', '<div>\r\n    <ul>\r\n        <li><span>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</span></li>\r\n        <li><span>Spiele Games mit bis zu 120 Bilder pro Sekunde</span></li>\r\n        <li><span>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</span></li>\r\n        <li><span>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</span></li>\r\n        <li><span>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen.</span></li>\r\n        <li><span>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</span></li>\r\n        <li><span>Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus</span></li>\r\n        <li><span>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</span></li>\r\n        <li><span>Verwende dein Xbox One-Gaming-Zubehör -einschließlich Controller, Headsets und mehr</span></li>\r\n        <li><span>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies &amp; TV und mehr</span></li>\r\n    </ul>\r\n</div>', '2025-01-20 22:55:13', '2025-01-20 22:55:13');

-- Dumping structure for table scandiweb.product_attributes
CREATE TABLE IF NOT EXISTS `product_attributes` (
  `id` varchar(50) NOT NULL,
  `product_id` varchar(50) NOT NULL,
  `attribute_id` varchar(50) NOT NULL,
  `displayValue` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `attribute_id` (`attribute_id`),
  CONSTRAINT `product_attributes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_attributes_ibfk_2` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table scandiweb.product_attributes: ~35 rows (approximately)
INSERT INTO `product_attributes` (`id`, `product_id`, `attribute_id`, `displayValue`, `value`, `created_at`, `updated_at`) VALUES
	('40', 'huarache-x-stussy-le', 'Size', '40', '40', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('41', 'huarache-x-stussy-le', 'Size', '41', '41', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('42', 'huarache-x-stussy-le', 'Size', '42', '42', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('43', 'huarache-x-stussy-le', 'Size', '43', '43', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('apple-imac-2021-256GB', 'apple-imac-2021', 'Capacity', '256GB', '256GB', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('apple-imac-2021-512GB', 'apple-imac-2021', 'Capacity', '512GB', '512GB', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('apple-imac-2021-Keyboard-Yes', 'apple-imac-2021', 'Touch ID in keyboard', 'Yes', 'Yes', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('apple-imac-2021-Keyoard-No', 'apple-imac-2021', 'Touch ID in keyboard', 'No', 'No', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('apple-imac-2021-USB-No', 'apple-imac-2021', 'With USB 3 ports', 'No', 'No', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('apple-imac-2021-USB-Yes', 'apple-imac-2021', 'With USB 3 ports', 'Yes', 'Yes', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('apple-iphone-12-pro-1T', 'apple-iphone-12-pro', 'Capacity', '1T', '1T', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('apple-iphone-12-pro-512G', 'apple-iphone-12-pro', 'Capacity', '512G', '512G', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('apple-iphone-12-pro-Black', 'apple-iphone-12-pro', 'Color', 'Black', '#000000', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('apple-iphone-12-pro-Blue', 'apple-iphone-12-pro', 'Color', 'Blue', '#030BFF', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('apple-iphone-12-pro-Cyan', 'apple-iphone-12-pro', 'Color', 'Cyan', '#03FFF7', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('apple-iphone-12-pro-Green', 'apple-iphone-12-pro', 'Color', 'Green', '#44FF03', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('apple-iphone-12-pro-White', 'apple-iphone-12-pro', 'Color', 'White', '#FFFFFF', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('jacket-canada-goosee-Extra Large', 'jacket-canada-goosee', 'Size', 'Extra Large', 'XL', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('jacket-canada-goosee-Large', 'jacket-canada-goosee', 'Size', 'Large', 'L', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('jacket-canada-goosee-Medium', 'jacket-canada-goosee', 'Size', 'Medium', 'M', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('jacket-canada-goosee-Small', 'jacket-canada-goosee', 'Size', 'Small', 'S', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('ps-5-1T', 'ps-5', 'Capacity', '1T', '1T', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('ps-5-512G', 'ps-5', 'Capacity', '512G', '512G', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('ps-5-Black', 'ps-5', 'Color', 'Black', '#000000', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('ps-5-Blue', 'ps-5', 'Color', 'Blue', '#030BFF', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('ps-5-Cyan', 'ps-5', 'Color', 'Cyan', '#03FFF7', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('ps-5-Green', 'ps-5', 'Color', 'Green', '#44FF03', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('ps-5-White', 'ps-5', 'Color', 'White', '#FFFFFF', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('xbox-series-s-1T', 'xbox-series-s', 'Capacity', '1T', '1T', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('xbox-series-s-512G', 'xbox-series-s', 'Capacity', '512G', '512G', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('xbox-series-s-Black', 'xbox-series-s', 'Color', 'Black', '#000000', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('xbox-series-s-Blue', 'xbox-series-s', 'Color', 'Blue', '#030BFF', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('xbox-series-s-Cyan', 'xbox-series-s', 'Color', 'Cyan', '#03FFF7', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('xbox-series-s-Green', 'xbox-series-s', 'Color', 'Green', '#44FF03', '2025-01-20 22:55:13', '2025-01-20 22:55:13'),
	('xbox-series-s-White', 'xbox-series-s', 'Color', 'White', '#FFFFFF', '2025-01-20 22:55:13', '2025-01-20 22:55:13');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
