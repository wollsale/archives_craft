<?php
/**
 * Craft 3 Multi-Environment
 * Efficient and flexible multi-environment config for Craft 3 CMS
 *
 * @author    byhoffman
 * @copyright Copyright (c) 2017 byhoffman
 * @link      https://byhoffman.com/
 * @package   craft3-multi-environment
 * @since     1.0.5
 * @license   MIT
 */

// Helper: Find your active php.ini file
// echo 'Loaded php.ini: ' . php_ini_loaded_file();die();

// Craft Requirements
// max_execution_time = 120
// memory_limit = 256M

/**
 * Craft web bootstrap file
 */

// Set path constants
define('CRAFT_BASE_PATH', dirname(__DIR__));
define('CRAFT_VENDOR_PATH', CRAFT_BASE_PATH.'/vendor');

// Load Composer's autoloader
require_once CRAFT_VENDOR_PATH.'/autoload.php';

// Load dotenv?
if (file_exists(CRAFT_BASE_PATH.'/.env')) {
    (new Dotenv\Dotenv(CRAFT_BASE_PATH))->load();
}

// Load the local craft3-multi-environment
if (file_exists(CRAFT_BASE_PATH . DIRECTORY_SEPARATOR . '.env.php')) {
    require_once CRAFT_BASE_PATH . DIRECTORY_SEPARATOR . '.env.php';
}

// Default environment
if (!defined('CRAFT_ENVIRONMENT')) {
    define('CRAFT_ENVIRONMENT', getenv('CRAFTENV_CRAFT_ENVIRONMENT'));
}

// Load and run Craft
$app = require CRAFT_VENDOR_PATH.'/craftcms/cms/bootstrap/web.php';
$app->run();
