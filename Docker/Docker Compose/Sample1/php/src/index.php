<?php
include "CurlHttp.php";
include "Router.php";
include "vendor/predis/predis/autoload.php";

define("ASP_CONTAINER", "aspnetcore");
$url = $_SERVER['REQUEST_URI'];
$request = json_decode(file_get_contents('php://input'), true);
$router = new Router($request);

$router->get('/notes', function ($request) {
    $curl = new CurlHttp(ASP_CONTAINER);
    $redis = new \Predis\Client([
        'scheme' => 'tcp',
        'host'   => 'redis',
        'port'   => '6379',
    ]);

    $redisKey = 'notes-key';
    $result = [
        'from_cache' => true,
        'data'       => json_decode($redis->get($redisKey)),
    ];
    if (!$result['data']) {
        $data = $curl->request('GET', 'notes');
        $result = [
            'from_cache' => false,
            'data'       => json_decode($data),
        ];
        $redis->set($redisKey, $data);
        $redis->expire($redisKey, 30);
    }
    return json_encode($result);
});

$router->post('/notes', function ($request) {
    $curl = new CurlHttp(ASP_CONTAINER);
    $postData = [
        'title' => $request['title'],
        'text' => $request['text'],
    ];
    return $curl->request('POST', 'notes', $postData);
});

$router->resolve($url, $_SERVER['REQUEST_METHOD']);