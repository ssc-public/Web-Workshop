<?php


class CurlHttp
{
    private $base;
    public function __construct($base)
    {
        $this->base = $base;
    }

    public function request($type, $url, $params = [])
    {
        switch (strtoupper($type)) {
            case "GET":
                return $this->getReq($url, $params);
                break;
            case "POST":
                return $this->postReq($url, $params);
                break;
            default:
                throw new Exception("Undefined Request Type");
        }
    }

    private function getReq($url, $params = [])
    {
        $ch = curl_init($this->generateUrl($url));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        $response = curl_exec($ch);
        curl_close($ch);

        return $response;
    }

    private function postReq($url, $params = [])
    {
        $ch = curl_init($this->generateUrl($url));
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params));
        curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        $response = curl_exec($ch);
        curl_close($ch);

        return $response;
    }

    private function generateUrl($url)
    {
        return $this->base."/".$url;
    }
}