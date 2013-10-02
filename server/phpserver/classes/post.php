<?php
class Post extends Control  {
    private $db_obj;
    private $per_page;
    function __construct($per_page=10) 
    {
       $this->db_obj = newdbclass('post');
       $this->per_page  =$per_page;
    } 
    function restCreate($segments,$args)
    {
      if(isset($_COOKIE['user_id']))
      { 
          $_POST['user_id']  = $_COOKIE['user_id'];
          $res = $this->db_obj->oninsert($_POST);

      }
      $this->send($res);
    }
    private function checkUser($_id)
    {
      return true;
      if(isset($_COOKIE['user_id']))
      {
          $where =array(
          '_id' =>  new MongoId($_id)  
        );
        $post = $this->db_obj->findOne($where);
        $res = json_decode($post);
       

        if($_COOKIE['user_id'] == $res->user_id )
        {
            return true;
        }
        else
          return false;
      }
      else
        return false;
    }
    function restDelete($segments)
    {
      $id = $segments[0];
      if($this->checkUser($id) )
      {
        $this->db_obj->onremove($id);
      }
    }
    function restDetail($segments,$args)
    {
      
      if(isset($segments[1]))
      {
        $where =array(
          '_id' =>  new MongoId($segments[1])  
        );
        $post = $this->db_obj->findOne($where);
        $res = json_decode($post);
        $user_db = newdbclass('user'); 

        $user =  $user_db->getUser($res->user_id);
        $res->user = json_decode($user);
        $res = json_encode($res);

      }
      else
        $res = '{}';
      $this->send($res);
      
    }
    function restEdit($segments)
    {
        $res = '{}';
        $id = $_POST['_id'];

      if($this->checkUser($id) )
      { //取得這一筆

             $res = $this->db_obj->onupdate($_POST);
      }

      $this->send($res);
    } 
    private function rebuildquery($count,$res)
    {
      
      $tmp =json_decode($res);

     
       $new_res->res = $tmp;
      $new_res->count = $count;
      return json_encode($new_res);
     // $this->send(json_encode($new_res));
    }
    function restList($segments,$args)
    {
      
      //檢查長度
      $sc = count($segments);
      $page =($sc>0) ?  intval($segments[$sc-1])  : 1;
      $page = ($page<=1)  ? 1 : $page;
      $where = array();

      switch($sc)
      {
        default:
        case 0:
        case 1:
       
          $count = $this->db_obj->findcount();
          if($count>0)
          {
            $res = $this->db_obj->find(array(),$page,$this->per_page);
            $res = $this->rebuildquery($count,$res);

          }
        break;
        case 2:
        case 3:
        case 4:
          //檢查第一個是什麼
        
        if($segments[0] == 'u')
        { //查詢人
          $where = array(
            'user_id' =>  $segments[1]
              );
          

        }
        else if($segments[0] == 'k')
        {
         
           $or = array(
            array('content' =>   new MongoRegex('/'.$segments[1].'/')),
            array('title' =>   new MongoRegex('/'.$segments[1].'/'))
              );
           $where = array(
            '$or'=>$or
            );

        }
        
        if(true)
        {
           $count = $this->db_obj->findcount($where);
            $res = $this->db_obj->find($where,$page,$this->per_page);
            $res = $this->rebuildquery($count,$res);
             
              
        }
        else
          $res = '{}';
         
         

        break;

      }
       $this->send($res);
      exit;
      

    }

    
}
?>
