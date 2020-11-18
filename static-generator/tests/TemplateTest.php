<?php
require_once __DIR__ . '/../../../../phpunit.php';

use PHPUnit\Framework\TestCase;
use Directus\Util\ArrayUtils;
use League\Flysystem\Filesystem;
use League\Flysystem\Adapter\Local;
use Directus\Database\TableGatewayFactory as TableFactory;
use Directus\Database\TableGateway\RelationalTableGateway;
use StaticGenerator\Template;

// run out of `static-generator`: ../../../vendor/bin/phpunit
class TemplateTest extends TestCase
{

    public function __construct()
    {
        $this->templateStoragePath = __DIR__ . '/templates';
        $this->outputStoragePath = __DIR__ . '/output';
    }

    public function testConstruct()
    {
        $templateStorageAdapter = new Filesystem( new Local( $this->templateStoragePath ) );

        // instantiate with `type` and `filePath`
        $instance = new Template($templateStorageAdapter, ['type' => 'page', 'filePath' => 'test.html']);
        $this->assertInstanceOf(Template::class, $instance);

        // instantiate with `id` and check decoding
        $instance = new Template($templateStorageAdapter, ['id' => 'cGFnZS90ZXN0Lmh0bWw=']);
        $this->assertInstanceOf(Template::class, $instance);
        $this->assertEquals('page', $instance->type);
        $this->assertEquals('test.html', $instance->filePath);

        // fail
        $this->expectException(Exception::class);
        new Template($templateStorageAdapter, []);
    }

    public function testCRUD()
    {
        $templateStorageAdapter = new Filesystem( new Local( $this->templateStoragePath ) );

        $instance = new Template($templateStorageAdapter, ['type' => 'page', 'filePath' => 'test.html', 'contents' => 'contents']);
        $this->assertEquals($instance->exists(), false);

        // create
        $instance->save();

        $newInstance = new Template($templateStorageAdapter, ['id' => $instance->id]);
        $this->assertEquals($newInstance->exists(), true);

        // read
        $this->assertEquals($newInstance->contents, 'contents');

        // update
        $newInstance->contents = 'updated contents';
        $newInstance->save();
        $this->assertEquals($newInstance->contents, 'updated contents');

        // delete
        $newInstance->delete();
        $this->assertEquals($instance->exists(), false);
        $this->assertEquals($newInstance->exists(), false);
    }

    // Route syntax:  <!--- directus_route: /your/route/{{ some.expression }} --->  (note the 3 dashes as opposed to html comments, which have 2 dashes);
    public function testGetRoute()
    {
        $templateStorageAdapter = new Filesystem( new Local( $this->templateStoragePath ) );

        $instance = new Template($templateStorageAdapter, ['type' => 'page', 'filePath' => 'test.html', 'contents' => "<!--- directus_route: /articles/{{articles.id | filters[date_published][gt]=now()}} --->"]);
        $this->assertEquals($instance->route, '/articles/{{articles.id | filters[date_published][gt]=now()}}');

        $instance->save();

        $newInstance = new Template($templateStorageAdapter, ['id' => $instance->id]);
        $this->assertEquals($instance->route, '/articles/{{articles.id | filters[date_published][gt]=now()}}');

        $newInstance->delete();
    }

    public function testGenerateSinglePage()
    {
        $mock = \Mockery::mock('TableFactory');

        $templateStorageAdapter = new Filesystem( new Local( $this->templateStoragePath ) );

        $instance = new Template($templateStorageAdapter, ['type' => 'page', 'filePath' => 'users.html']);

        // test template tokenization
        $tokens = $instance->tokenizeTemplate();
        $this->assertEquals(json_encode($tokens), '[{"table":"this","field":null,"param":"","expression":"this"},{"table":"directus_users","field":null,"param":"filters[id][gt]=0","expression":"directus_users(\"filters[id][gt]=0\")"},{"table":"directus_users","field":null,"param":"","expression":"directus_users"}]');

        foreach($tokens as $key => $token) {

            if( ArrayUtils::get($token, 'table') == 'this') {
                unset($tokens[$key]);
                continue;
            }
            $tokens[$key]['tableObj'] = \Mockery::mock('RelationalTableGateway');

            $tokens[$key]['tableObj']->shouldReceive('getItems')->withAnyArgs()->andReturn([
                'data' => json_decode('[{"id":1,"status":1,"first_name":"Admin","last_name":"User","email":"admin@test.com","token":"iKORC7vUMgEWNqrkBNEep11ADUvHIV5g","access_token":"b17a70625d1c254746374677ba98b50bc07b73d1","reset_token":"DDYGuEamokkDNJahWQBwpyctYPl5wG","reset_expiration":"2017-08-03T23:50:47-04:00","position":"","email_messages":1,"last_login":"2017-09-19T16:35:53-04:00","last_access":"2017-09-19T16:35:58-04:00","last_page":"{\"path\":\"users\",\"route\":\"users\"}","ip":"10.1.1.1","group":{"meta":{"table":"directus_groups","type":"item"},"data":{"id":1,"name":"Administrator","description":"Admins have access to all managed data within the system by default","restrict_to_ip_whitelist":null,"nav_override":null,"nav_blacklist":null}},"avatar":"\/\/www.gravatar.com\/avatar\/41650203504000102e83e5ae927a9807?s=200&d=identicon&r=g","avatar_file_id":null,"location":null,"phone":null,"address":null,"city":null,"state":null,"country":null,"zip":null,"language":"en","timezone":"America\/New_York","invite_token":null,"invite_date":null,"invite_sender":null,"invite_accepted":null}]', true),
            ]);
        }

        $res = $instance->parseTemplate($tokens);
        $this->assertContains('admin@test.com', ArrayUtils::get($res, '0.contents'));
        $this->assertEquals('/users/index.html', ArrayUtils::get($res, '0.routePath'));
    }

    public function testGenerateMultiPage()
    {
        $mock = \Mockery::mock('TableFactory');

        $templateStorageAdapter = new Filesystem( new Local( $this->templateStoragePath ) );

        $instance = new Template($templateStorageAdapter, ['type' => 'page', 'filePath' => 'user.html']);

        $routeTokens = $instance->tokenizeRoute();
        $this->assertEquals('{{directus_users.id | filters[id][gt]=0}}', ArrayUtils::get($routeTokens, 'routeExpression'));
        $routeTokens['tableObj'] = \Mockery::mock('RelationalTableGateway');
        $routeTokens['tableObj']->shouldReceive('getItems')->withAnyArgs()->andReturn([
            'data' => json_decode('[{"id":1,"status":1,"first_name":"Admin","last_name":"User","email":"admin@test.com","token":"iKORC7vUMgEWNqrkBNEep11ADUvHIV5g","access_token":"b17a70625d1c254746374677ba98b50bc07b73d1","reset_token":"DDYGuEamokkDNJahWQBwpyctYPl5wG","reset_expiration":"2017-08-03T23:50:47-04:00","position":"","email_messages":1,"last_login":"2017-09-19T16:35:53-04:00","last_access":"2017-09-19T16:35:58-04:00","last_page":"{\"path\":\"users\",\"route\":\"users\"}","ip":"10.1.1.1","group":{"meta":{"table":"directus_groups","type":"item"},"data":{"id":1,"name":"Administrator","description":"Admins have access to all managed data within the system by default","restrict_to_ip_whitelist":null,"nav_override":null,"nav_blacklist":null}},"avatar":"\/\/www.gravatar.com\/avatar\/41650203504000102e83e5ae927a9807?s=200&d=identicon&r=g","avatar_file_id":null,"location":null,"phone":null,"address":null,"city":null,"state":null,"country":null,"zip":null,"language":"en","timezone":"America\/New_York","invite_token":null,"invite_date":null,"invite_sender":null,"invite_accepted":null}]', true),
        ]);

        // test template tokenization
        $tokens = $instance->tokenizeTemplate(['this' => $routeTokens]);
        $this->assertEquals(json_encode($tokens), '[{"table":"directus_users","field":"id","param":"filters[id][gt]=0","expression":"directus_users(\"filters[id][gt]=0\")"},{"table":"directus_users","field":null,"param":"filters[id][gt]=0","expression":"directus_users(\"filters[id][gt]=0\")"},{"table":"directus_users","field":null,"param":"","expression":"directus_users"}]');

        foreach($tokens as $key => $token) {

            if( ArrayUtils::get($token, 'table') == 'this') {
                unset($tokens[$key]);
                continue;
            }

            $tokens[$key]['tableObj'] = \Mockery::mock('RelationalTableGateway');

            $tokens[$key]['tableObj']->shouldReceive('getItems')->withAnyArgs()->andReturn([
                'data' => json_decode('[{"id":1,"status":1,"first_name":"Admin","last_name":"User","email":"admin@test.com","token":"iKORC7vUMgEWNqrkBNEep11ADUvHIV5g","access_token":"b17a70625d1c254746374677ba98b50bc07b73d1","reset_token":"DDYGuEamokkDNJahWQBwpyctYPl5wG","reset_expiration":"2017-08-03T23:50:47-04:00","position":"","email_messages":1,"last_login":"2017-09-19T16:35:53-04:00","last_access":"2017-09-19T16:35:58-04:00","last_page":"{\"path\":\"users\",\"route\":\"users\"}","ip":"10.1.1.1","group":{"meta":{"table":"directus_groups","type":"item"},"data":{"id":1,"name":"Administrator","description":"Admins have access to all managed data within the system by default","restrict_to_ip_whitelist":null,"nav_override":null,"nav_blacklist":null}},"avatar":"\/\/www.gravatar.com\/avatar\/41650203504000102e83e5ae927a9807?s=200&d=identicon&r=g","avatar_file_id":null,"location":null,"phone":null,"address":null,"city":null,"state":null,"country":null,"zip":null,"language":"en","timezone":"America\/New_York","invite_token":null,"invite_date":null,"invite_sender":null,"invite_accepted":null}]', true),
            ]);
        }

        $res = $instance->parseTemplate($tokens, $routeTokens);
        $this->assertContains('admin@test.com', ArrayUtils::get($res, '0.contents'));
        $this->assertEquals('/users/1/index.html', ArrayUtils::get($res, '0.routePath'));
    }
}
?>
