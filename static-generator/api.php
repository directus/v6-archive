<?php
require __DIR__ . '/api/Template.php';
require __DIR__ . '/api/Config.php';
require __DIR__ . '/api/helpers.php';
error_reporting(E_ALL);
use Directus\Util\ArrayUtils;
use League\Flysystem\Filesystem;
use League\Flysystem\Adapter\Local;
use StaticGenerator\Template;
use StaticGenerator\Config;

$app = \Directus\Application\Application::getInstance();

$templateStorageAdapter = new Filesystem( new Local( Template::getTemplateStoragePath() ) );

/*********************************************************************************************************
 * CRON HANDLER                                                                                          *
 * for frequency based generation.                                                                       *
 * To enable on *nix systems, create a cron job using:                                                   *
 *   * * * * * wget -O - http://yoursite.com/api/extensions/static-generator/cron >/dev/null 2>&1        *
 *********************************************************************************************************/
$app->get('/cron', function () use ($app, $templateStorageAdapter) {

    try {
        if( ! Config::readyToGenerate()) {
            die('Not ready to generate.');
        }

        $outputStorageAdapter = new Filesystem( new Local( Template::getOutputDirectoryRoot() . '/' .  Config::getGenerationOutputDirectory()));
        Template::generateSite($templateStorageAdapter, $outputStorageAdapter);

        die('Site successfully generated.');
    }

    catch (Exception $e) {
        die($e->getMessage());
    }
});

/**************************
 * GET                    *
 **************************/
$app->get('/templates/?', function () use ($app, $templateStorageAdapter) {

    try {
        $templates = Template::getAll($templateStorageAdapter);
        $data = [];
        $directoryTree = [];

        if( $templates) {
            foreach($templates as $template) {

                $directoryTree = array_merge_recursive($directoryTree, directusMakeTree(explode('/', $template->filePath . ':::' . $template->id)));
                $filePathParts = explode('/', $template->filePath);

                $data[] = [
                    'id' => $template->id,
                    'route' => $template->route,
                    'file' => $template->filePath,
                    'fileName' => array_pop($filePathParts),
                    'contents' => $template->contents,
                    'exists' => $template->exists(),
                ];
            }
        }

        $data[] = [
            'hasDirectoryTree' => true,
            'directoryTree' => directusToUL($directoryTree),
        ];

        $data[] = [
            'hasConfig' => true,
            'generationMethod' => Config::getGenerationMethod(),
            'generationOutputDirectory' => Config::getGenerationOutputDirectory(),
        ];

        return $app->response($data);
    }

    catch (Exception $e) {

        return $app->response([
            'success' => false,
            'error' => [
                'message' => $e->getMessage(),
            ],
        ])->status(400);
    }
});

/**************************
 * POST                   *
 **************************/
$app->post('/templates', function () use ($app, $templateStorageAdapter) {

    try {
        /**
         * Generate site
         */
        if($app->request()->post('generateSite')) {
            return staticGeneratorGenerateSite($app, $templateStorageAdapter);
        }

        /**
         * Update auto-generation settings
         */
        if($app->request()->post('updateGenerationSettings')) {
            return staticGeneratorUpdateSettings($app, $templateStorageAdapter);
        }
     
        /**
         * Create new template
         */
        // validation
        if( ! $app->request()->post('filePath')) {
            throw new Exception('Please enter a file path.');
        }

        // instantiate
        $template = new Template($templateStorageAdapter, [
            'filePath' => $app->request()->post('filePath'),
            'contents' => $app->request()->post('contents'),
        ]);

        // check and save
        if($template->exists()) {
            throw new Exception('Template already exists.');
        }

        $template->save();

        return $app->response([
            'success' => true,
            'message' => 'Request successfully processed.',
            'id' => $template->id,
        ]);
    }

    catch (Exception $e) {

        return $app->response([
            'success' => false,
            'error' => [
                'message' => $e->getMessage(),
            ],
        ])->status(400);
    }
});

/**************************
 * PUT                    *
 **************************/
$app->put('/templates/:id', function ($id = null) use ($app, $templateStorageAdapter) {

    try {
        /**
         * Generate site
         */
        if($app->request()->post('generateSite')) {
            return staticGeneratorGenerateSite($app, $templateStorageAdapter);
        }

        /**
         * Update auto-generation settings
         */
        if($app->request()->post('updateGenerationSettings')) {
            return staticGeneratorUpdateSettings($app, $templateStorageAdapter);
        }
        
        // validation
        if( ! $app->request()->post('filePath')) {
            throw new Exception('Please enter a file path.');
        }

        // instantiate template
        $template = Template::getById($templateStorageAdapter, $id);

        // save template
        $filePathChanged = false;

        if( $app->request()->post('filePath') && $app->request()->post('filePath') != $template->filePath) {
            $filePathChanged = true;
        }

        if($filePathChanged) {
            $template->filePath = $app->request()->post('filePath');
        }

        $template->contents = $app->request()->post('contents');
        $template->save();

        // if file path is different, delete the old template
        if( $filePathChanged) {
            $template = Template::getById($templateStorageAdapter, $id);
            $template->delete();
        }

        return $app->response([
            'success' => true,
            'message' => 'Request successfully processed.',
        ]);
    }

    catch (Exception $e) {

        return $app->response([
            'success' => false,
            'error' => [
                'message' => $e->getMessage(),
            ],
        ])->status(400);
    }
});

/**************************
 * DELETE                 *
 **************************/
$app->delete('/templates/:id', function ($id = null) use ($app, $templateStorageAdapter) {

    try {
        $template = Template::getById($templateStorageAdapter, $id);
        $template->delete();

        return $app->response([
            'success' => true,
            'message' => 'Request successfully processed.',
        ]);
    }

    catch (Exception $e) {

        return $app->response([
            'success' => false,
            'error' => [
                'message' => $e->getMessage(),
            ],
        ])->status(400);
    }
});

function staticGeneratorUpdateSettings($app, $templateStorageAdapter) {
    
    // normalize posted path
    $outputDirectory = $app->request()->post('outputDirectory');
    $outputDirectory = explode('/', $outputDirectory);
    $outputDirectory = implode('/', $outputDirectory);
    
    if( ! Template::isValidOutputPath($outputDirectory)) {
        throw new Exception('Please enter a valid output path.');
    }
    
    // save settings
    Config::setGenerationMethod($app->request()->post('generationMethod'));
    Config::setGenerationOutputDirectory($outputDirectory);
    
    return $app->response([
        'success' => true,
        'message' => 'Generation settings updated.',
    ]);
}

function staticGeneratorGenerateSite($app, $templateStorageAdapter) {
    
    // normalize posted path
    $outputDirectory = $app->request()->post('outputDirectory');
    $outputDirectory = explode('/', $outputDirectory);
    $outputDirectory = implode('/', $outputDirectory);

    if( ! Template::isValidOutputPath($outputDirectory)) {
        throw new Exception('Please enter a valid output path.');
    }

    // generate site
    $outputStorageAdapter = new Filesystem( new Local( Template::getOutputDirectoryRoot() . '/' .  $outputDirectory) );
    Template::generateSite($templateStorageAdapter, $outputStorageAdapter);

    return $app->response([
        'success' => true,
        'message' => 'Site generated in `' . Template::getOutputDirectoryRoot() . '/' .  $outputDirectory . '`',
    ]);
}
