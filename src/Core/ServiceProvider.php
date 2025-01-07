<?php

use App\Database;
use App\Logger\MyLogger;

return [
    'database' => Database::getInstance(),
    'logger' => MyLogger::init()
];