<?php
error_reporting(E_ALL);

ini_set('display_errors','ON');

header("Access-Control-Allow-Origin", "*"); 
header("Access-Control-Allow-Headers", "X-Requested-With");
header('Access-Control-Allow-Credentials', "true");
// header('Access-Control-Allow-Origin', req.headers.origin);
header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

class Control {
    static function exceptionResponse($statusCode, $message) {
        header("HTTP/1.0 {$statusCode} {$message}");
        echo "{$statusCode} {$message}";
        exit;
    }

    function index() {
        echo 'index...';
    }
    function send($obj)
    {
            if($obj=='null')
            {   
                $obj = '{}';
            }
        echo ($obj);
    }
}



class Container extends Control {
    private $control = false;
    private $segments = false;

    function __construct() {
        if ( !isset($_SERVER['PATH_INFO']) or $_SERVER['PATH_INFO'] == '/') {
           
            // $this->control = $this->segments = false;
            return;
        }

        $this->segments = explode('/', $_SERVER['PATH_INFO']);

        array_shift($this->segments); // first element always is an empty string.

        $controlName = ucfirst(array_shift($this->segments));

        if ( !class_exists($controlName) ) {
            $controlFilepath = './classes/'.$controlName . '.php';

            if ( file_exists($controlFilepath) ) { // 載入客戶要求的 control
                require_once $controlFilepath;
            }
            else { // 找不到客戶要求的 control
                self::exceptionResponse(503, 'Service Unavailable!');
                // 回傳 501 (Not Implemented) 或 503.
                // See also: RFC 2616
            }
        }

        $this->control = new $controlName;
    }

    function index() {
        //echo 'index.php/{control name}/{object id}';
        $msg = 'index.php/{control name}/{object id}';
        echo json_encode($msg);
       
        
    }
    
    function run() {

        if ( $this->control === false) {
            return $this->index();
        }

        if ( empty($this->segments) ) { // Without parameter
            return $this->control->index();
        }

        //request resource by RESTful way.
       
        //正統的REST
        /*test($_SERVER);
        test($_POST);
        exit;*/
        
        $_SERVER['REQUEST_METHOD'] = isset($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'])   ? $_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE']  :   $_SERVER['REQUEST_METHOD'];
        
        $method = 'rest'. ucfirst(strtolower($_SERVER['REQUEST_METHOD']));
        
        if ( method_exists($this->control, $method) ) {
                
        }
        else
        {
            $method = 'rest'. ucfirst(strtolower($this->segments[0]));
        
            if ( !method_exists($this->control, $method) ) {
                self::exceptionResponse(405, 'Method not Allowed!');
            }
             array_shift($this->segments);  
        }


       

        $arguments = (isset($this->segments[0])) ?   $this->localgetvar($this->segments[0])  :   array();
        $this->getpostvar();
        $this->control->$method($this->segments, $arguments);
    }
    function getpostvar()
    {

         $data = json_decode(file_get_contents('php://input'));

         if($data!=NULL)
         {
            foreach($data as $k => $v)
            {
                
                $_POST[$k] = $v;
            } 
        }  
       
    }
    function localgetvar($str){
        
        parse_str($str,$arr);
        
        return $arr;
    }
} //end class Container

require_once('db.php');

$container = new Container();

$container->run();


function newdbclass($cls,$params=array())
{
    global $container;
    $dcls = 'd'.$cls;
    if ( !class_exists($dcls) ) {
            $controlFilepath = './db_classes/'.$cls . '.php';

            if ( file_exists($controlFilepath) ) { // 載入客戶要求的 control
                require_once $controlFilepath;
            }
            else { // 找不到客戶要求的 control
               
                $container->exceptionResponse(503, 'Service Unavailable!');
                // 回傳 501 (Not Implemented) 或 503.
                // See also: RFC 2616
            }
        }
        $cls = 'd'.ucfirst($cls);

        $t = new $cls;
        return $t;
}
function test($obj)
{
    echo '<pre>';
    print_r($obj);
    echo '</pre>';
}
?>
