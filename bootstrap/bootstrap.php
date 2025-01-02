<?php

// bootstrap

require_once __DIR__ . '/../vendor/autoload.php';

require_once __DIR__ . '/../src/core/App.php';

use Dotenv\Dotenv;
use App\App;


$dotenv = Dotenv::createImmutable(__DIR__.'/..'); 
$dotenv->load();

// $app = new App();

$APP_CONFIG = require '../config/app.php';
var_dump($APP_CONFIG);
// load config
// return app after loading config and services

