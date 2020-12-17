<?php


class Router
{
    private $request;

    private $supportedMethods = [
        "GET",
        "POST"
    ];

    private $routes;

    public function __construct($request)
    {
        $this->request = $request;
        $this->bootstrapRoutes();
    }

    public function get($url, $callback)
    {
        $this->routes['GET'][$url] = $callback;
    }

    public function post($url, $callback)
    {
        $this->routes['POST'][$url] = $callback;
    }

    public function resolve($url, $method)
    {
        header('Content-Type: application/json');
        if (!isset($this->routes[strtoupper($method)])) {
            echo json_encode("Unsupported Http Method");
            return;
        }
        $callback = $this->routes[strtoupper($method)][$url] ?? null;
        if (!$callback) {
            echo json_encode("Unsupported Route");
            return;
        }
        echo call_user_func_array($callback, [$this->request]);
    }

    private function bootstrapRoutes()
    {
        foreach ($this->supportedMethods as $method) {
            $this->routes[$method] = [];
        }
    }
}