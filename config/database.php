<?php

return [
    'db_driver'   => $_ENV['DB_CONNECTION'] ?? 'mysql',
    'db_user'     => $_ENV['DB_USERNAME'] ?? 'root',
    'db_password' => $_ENV['DB_PASSWORD'] ?? '',
    'db_name'     => $_ENV['DB_DATABASE'] ?? 'my_database',
    'db_host'     => $_ENV['DB_HOST'] ?? '127.0.0.1',
    'db_port'     => $_ENV['DB_PORT'] ?? '3306',
];
