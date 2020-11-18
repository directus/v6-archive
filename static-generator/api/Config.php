<?php
namespace StaticGenerator;

use Directus\Util\ArrayUtils;
use Exception;

class Config {

    public static function getGenerationMethod()
    {
        $config = self::getConfig();
        return ArrayUtils::get($config, 'generationMethod');
    }

    public static function setGenerationMethod($method = 'manually')
    {
        $config = self::getConfig();
        $config['generationMethod'] = $method;
        $json = json_encode($config);

        $f = fopen(__DIR__ . '/../config.json', 'w');
        fwrite($f, $json);
        fclose($f);
    }

    public static function getGenerationOutputDirectory()
    {
        $config = self::getConfig();
        return ArrayUtils::get($config, 'generationOutputDirectory');
    }

    public static function setGenerationOutputDirectory($directory)
    {
        $config = self::getConfig();
        $config['generationOutputDirectory'] = $directory;
        $json = json_encode($config);

        $f = fopen(__DIR__ . '/../config.json', 'w');
        fwrite($f, $json);
        fclose($f);
    }

    public static function translateGenerationFrequency($frequency)
    {
        switch($frequency) {
            case 'frequency-minute':
                $frequency = '* * * * *';
                break;
            case 'frequency-hour':
                $frequency = '0 * * * *';
                break;
            case 'frequency-weekly':
                $frequency = '0 0 0 * *';
                break;
            case 'frequency-daily':
            default:
                $frequency = '0 0 * * *';
                break;

        }
        $config = self::getConfig();
        $config['generationFrequency'] = $frequency;
        $json = json_encode($config);

        $f = fopen(__DIR__ . '/../config.json', 'w');
        fwrite($f, $json);
        fclose($f);
    }

    public static function getLastGenerated()
    {
        $config = self::getConfig();
        return ArrayUtils::get($config, 'lastGenerated');
    }

    public static function setLastGenerated()
    {
        $config = self::getConfig();
        $config['lastGenerated'] = time();
        $json = json_encode($config);

        $f = fopen(__DIR__ . '/../config.json', 'w');
        fwrite($f, $json);
        fclose($f);
    }

    public static function readyToGenerate()
    {
        $lastGenerated = self::getLastGenerated();
        $method = self::getGenerationMethod();

        if( in_array($method, ['manually', 'update'])) {
            return false;
        }

        switch($method) {
            case 'frequency-minute':
                return time() - $lastGenerated > 60;
                break;
            case 'frequency-hour':
                return time() - $lastGenerated > 3600;
                break;
            case 'frequency-weekly':
                return time() - $lastGenerated > 604800;
                break;
            case 'frequency-daily':
                return time() - $lastGenerated > 86400;
                break;
            default:
                return true;
                break;
        }
    }

    public static function getConfig()
    {
        return json_decode( file_get_contents(__DIR__ . '/../config.json'), true);
    }
}