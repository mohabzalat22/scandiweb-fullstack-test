<?php

namespace App\Logger;

use Monolog\Logger;
use Monolog\Handler\StreamHandler;

class MyLogger
{

    private static $instance = null;

    public static function init()
    {
        if (self::$instance == null) {
            $logger = new Logger('app');
            $logFile = BASE_PATH . '/src/logger/app.log';
            $logger->pushHandler(new StreamHandler($logFile, Logger::DEBUG));
            self::$instance = $logger;
        }
        return self::$instance;
    }
}
