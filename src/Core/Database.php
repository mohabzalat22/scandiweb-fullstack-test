<?php
namespace App;

use Medoo\Medoo;

class Database
{
    private static $instance = null;
    private $database = null;

    private function __construct()
    {
        $databaseConfig = require BASE_PATH . '/config/database.php';
    
        $config = [
            'type'   => $databaseConfig['db_driver'],
            'host'     => $databaseConfig['db_host'],
            'database'   => $databaseConfig['db_name'],
            'username'     => $databaseConfig['db_user'],
            'password' => $databaseConfig['db_password'],
            'port'     => $databaseConfig['db_port'],
        ];

        //connect starting point
        $database = new Medoo($config);
        $this->database = $database;
    }

    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function orm()
    {
        return $this->database;
    }

}