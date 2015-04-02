<?php
class Reply extends Control  {
    private $db_obj;
    private $per_page;
    function __construct($per_page=10) 
    {
       $this->db_obj = newdbclass('reply');
       $this->per_page  =$per_page;
    } 
    function restAdd($segments,$args)
    {
      if(isset($_COOKIE['user_id']))
      { 
          $_POST['user_id']  = $_COOKIE['user_id'];

          $res = $this->db_obj->oninsert($_POST);

      }
      $this->send($res);
    }

    function restDetail($segments,$args)
    {
      if(isset($segments[0]))
      {
        $where =array(
          '_id' =>  new MongoId($segments[0])  
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
    private function rebuildquery($count,$res)
    {
      
       $tmp =json_decode($res);
       $new_res->list = $tmp;
       $new_res->count = $count;
      return json_encode($new_res);
     // $this->send(json_encode($new_res));
    }
    private function joinUsers($res)
    {
      $tmp = json_decode($res);
       $user  = newdbclass('user');
      foreach($tmp as $k => $v)
      {
         $tmp->$k->user= json_decode($user->getUser($v->user_id));

      }

      $tmp = json_encode($tmp); 
      return $tmp;
    }
    function restList($segments,$args)
    {
      
      //檢查長度
      $sc = count($segments);
      $page =($sc>1) ?  intval($segments[$sc-1])  : 1;
      $page = ($page<=1)  ? 1 : $page;
      $res = '{}';
      $pid = $segments[0];
      $where = array('pid'=> $pid);
      switch($sc)
      {
        default:
          
        break;
        case 1:
        case 2:
          $count = $this->db_obj->findcount($where);
          if($count>0)
          {
            $res = $this->db_obj->find($where,$page,$this->per_page);
             $user  = newdbclass('user');
             $res  = $this->joinUsers($res);
            $res = $this->rebuildquery($count,$res);
          }
          

        break;
        

      }
       $this->send($res);
      exit;
    }

    
}
?>
