<?php
class User extends Control  {
    private $db_obj;
    function __construct() 
    {
       $this->db_obj = newdbclass('user');
    } 
    function restDelete($segments)
    {
      setcookie('user_id','',time()-3600,'/');

      $this->send('{}');
    }
    function restGetnowuser($segments,$args)
    {
      
       $user_obj = null;
       
      // if(isset($args['id']))
       if(isset($args['id']))
       {
             $user_obj =  $this->db_obj->getUser($args['id']);
       }
       elseif (isset($segments[0]))
       {
          
           $user_obj =  $this->db_obj->getUser($segments[0]);
       }
       else
        $user_obj = '{}';
        $this->send($user_obj);
  
       exit;
    }
    function restLogin($args)
    {
      
       $user_obj = null;
      if(isset($_COOKIE['user_id']))
      { //找有沒有正確用戶
        
        $user_obj =   $this->db_obj->getUser($_COOKIE['user_id']);

        $user_obj = json_decode($user_obj);
        $type=$user_obj->type;
       

      }
      else
      {
        $pw = isset($_POST['password']) ? $_POST['password'] : '';
        $type = isset($_POST['type']) ? $_POST['type'] : 0;

        $user_obj =   $this->db_obj->Login($_POST['username'],$pw,$type);
      }
      
        $k='$id';
        if($user_obj!=null)
        {
           $id =  $user_obj->_id->$k;
        setcookie("user_id",$id,time()+3600,'/');
        setcookie("user_type",$type,time()+3600,'/');
      
        }
       $this->send(json_encode($user_obj));
       
         
    }

    
}
?>
