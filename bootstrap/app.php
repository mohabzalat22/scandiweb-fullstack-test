<?php

define('BASE_PATH', __DIR__ . '/..'); 

require_once BASE_PATH . '/vendor/autoload.php';
require_once BASE_PATH . '/src/core/App.php';
require_once BASE_PATH . '/src/core/Database.php';


use Dotenv\Dotenv;
use App\App;


$dotenv = Dotenv::createImmutable(__DIR__.'/..'); 
$dotenv->load();

//create app init
$app = App::init();
$app->bootstrap();

// database start

$database = $app->getService('database');
$orm = $database->orm();

//crud test

return $app;