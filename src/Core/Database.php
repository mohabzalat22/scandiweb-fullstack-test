<?php
namespace App;

use RedBeanPHP\R;

class Database
{
    private static $instance = null;

    private function __construct()
    {
        $this->init();
    }

    public static function init()
    {
        if (!R::testConnection()) {
            $databaseConfig = require BASE_PATH . '/config/database.php';
    
            $config = [
                'driver'   => $databaseConfig['db_driver'],
                'user'     => $databaseConfig['db_user'],
                'password' => $databaseConfig['db_password'],
                'dbname'   => $databaseConfig['db_name'],
                'host'     => $databaseConfig['db_host'],
                'port'     => $databaseConfig['db_port'],
            ];
    
            //connect starting point
    
            R::setup(
                $config['driver'] .
                ":host=" . $config['host'] .
                ";port=" . $config['port'] .
                ";dbname=" . $config['dbname'], $config['user'], $config['password']
            );
    
            if (!R::testConnection()) {
                throw new \Exception("Failed to connect to the database.");
            }
        }
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
        return R::class;
    }

}