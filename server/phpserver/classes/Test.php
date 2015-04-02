<?php
class Test extends Control  {
    private $db_obj;
    function __construct() 
    {
       $this->db_obj = newdbclass('user');
    } 
    function restTestRedis()
    {
        phpinfo();
        exit;
        $redis = new Redis();

        $redis->connect('127.0.0.1', 6379); 

        $redis->SET("aa","t");
        $re = $redis->get("aa");
        echo $re;
        exit;

    }

    
}
?>
