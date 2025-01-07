<?php

namespace App;

use App\Controllers\GraphQl;
use FastRoute\Dispatcher;
use FastRoute\RouteCollector;

class App
{
    protected static $instance = null;
    protected $config = [];
    protected $services = [];
    public $bootstraped = false;

    public static function init()
    {
        if(self::$instance == null){
            self::$instance = new self;
        } 

        return self::$instance;
    }

    public function registerDefaultServices()
    {
        $services = require BASE_PATH . '/src/Core/ServiceProvider.php';
        foreach($services as $name=>$value){
            $this->services[$name] = $value;
        }
    }

    public function bootstrap()
    {
        if($this->bootstraped === false){ //first time

            $this->registerConfig();
            $this->registerDefaultServices();
            $this->bootstraped = true;
        }
    }

    public function registerConfig()
    {
        $config = require BASE_PATH . '/config/app.php';
        $this->config = $config;
    }

    public function getConfig($key)
    {
        return $this->config[$key] ?? null;
    }

    public function registerService($name, $service)
    {
        $this->services[$name] = $service;
    }

    public function getService($name)
    {
        return $this->services[$name] ?? null;
    }

    public function run()
    {
        $dispatcher = \FastRoute\simpleDispatcher(function(RouteCollector $r) {
            $r->post('/graphql', [GraphQl::class, 'handle']);
        });
        
        $routeInfo = $dispatcher->dispatch(
            $_SERVER['REQUEST_METHOD'],
            $_SERVER['REQUEST_URI']
        );
        
        switch ($routeInfo[0]) {
            case Dispatcher::NOT_FOUND:
                echo "404 Not Found";
                break;
        
            case Dispatcher::METHOD_NOT_ALLOWED:
                $allowedMethods = $routeInfo[1];
                echo "405 Not Allowed only allow : " . implode(', ', $allowedMethods);
                break;
        
            case Dispatcher::FOUND:
                $handler = $routeInfo[1];
                $vars = $routeInfo[2];
                echo $handler($vars);
                break;
        }
        
    }
}