<?php

define('BASE_PATH', __DIR__ . '/..'); 

require_once BASE_PATH . '/vendor/autoload.php';

require_once BASE_PATH . '/src/core/App.php';
require_once BASE_PATH . '/src/core/Database.php';


use Dotenv\Dotenv;
use App\App;
use App\Database;

$dotenv = Dotenv::createImmutable(__DIR__.'/..'); 
$dotenv->load();

// config files
$APP_CONFIG = require BASE_PATH . '/config/app.php';

//create app init
$app = App::init();

// making database
$database = new Database();

// registeration
$app->registerConfig($APP_CONFIG);

//create database querybuilder

return $app;