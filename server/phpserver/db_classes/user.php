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
	function Login($username)
	{	//這裡最後要回傳物件不是json
		$user = $this->UserIsExist($username);
		//echo 'user'.$user;

		if(empty($user))
		{	//註冊
			$doc = array( "username" => $username,
						  'updatetime' => mktime(),
						  'createtime' => mktime()
						);	
			
			$this->insert($doc);
			$user = json_decode($doc);

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

}
?>