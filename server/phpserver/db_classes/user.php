<?php
class dUser  extends Db {
	function __construct() 
	{
       $this->DB('users');
    }
	function getUser($_id)
	{
		$qry = array(
					'_id'=> new MongoId($_id)
				);
		
		$cursor = $this->findOne($qry);
		
		return $cursor;	
	}
	function Login($username,$password='',$type='0')
	{	//這裡最後要回傳物件不是json
		$user = $this->UserIsExist($username);
		

		if(empty($user) || $user==NULL)
		{	//註冊
			$doc = array( 'username' => $username,
						  'password' =>	md5($password),
						  'type' =>	$type,
						  'updatetime' => mktime(),
						  'createtime' => mktime()
						);	
			
			$this->insert($doc);
			
			$user = $this->UserIsExist($username);
			//$user = json_encode($doc);

		}
		else
		{	//檢查密碼
			if($type!=1)
			{
			if($user->password != md5($password))
			{
				$user = NULL;
			}
		}
		}
		

		return $user;
	}
	function UserIsExist($username)
	{
		$qry = array(
					'username'=> $username
				);

		$cursor = $this->findOne($qry);

		$cursor = json_decode($cursor);

		return $cursor;
	}
	function onremove($id)
	{
		$where = array(
				
				);
		$this->remove($where);
	}

}
?>