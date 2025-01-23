<?php

return [

    'name' => $_ENV['APP_NAME'] ?? 'Test',
    'environment' => $_ENV['APP_ENV'] ?? 'development',
    'debug' => $_ENV['APP_DEBUG'] ?? false,
    'timezone' => $_ENV['APP_TIMEZONE'] ?? 'UTC',
    'locale' => $_ENV['APP_LOCALE'] ?? 'en',
    'url' => $_ENV['APP_URL'] ?? 'http://localhost',
    // 'log_level' => 'error', 
];
