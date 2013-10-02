<?php
class Db   {
	public  $db ;
	private $host='127.0.0.1';
	private $port='27017';
	private $user = '';
	private $pw = '';
	private $redis;
	private $select_db='backbonewithrestful';
	public $collection ;
	public $collection_name ;
	public $using_redis = false;
	public $page ;
	function DB($collection='',$page=20,$host='',$port='',$select_db='',$user='',$pw='',$using_redis='')
	{	

		

		if(!empty($_SERVER['VCAP_SERVICES']))
		{
			$serverices = json_decode($_SERVER['VCAP_SERVICES']);
			$ver = 'mongodb-1.8';
			$mongodb = $serverices->$ver;	
			$tmp = $mongodb[0];

			$credentials = $tmp->credentials;
			
			$this->host = $credentials->host;
			$this->port = $credentials->port;
			$this->user = $credentials->username;
			$this->pw = $credentials->password;
			$this->select_db = $credentials->db;

		}
		$this->page = $page;
		$host = ($host =='')	?	$this->host	:	$host;
		$port = ($port =='')	?	$this->port	:	$port;
		$select_db = ($select_db =='')	?	$this->select_db	:	$select_db;
		$user = ($user =='')	?	$this->user	:	$user;
		$pw = ($pw =='')		?	$this->pw	:	$pw;
		$this->using_redis = 	($using_redis =='') ?	$this->using_redis	:	$using_redis;

		$db_str = 'mongodb://';
		if( $user !='')
		{
			if($pw !='')
				$db_str .= $user.':'.$pw;
			else
				$db_str .= $user;
			$db_str .='@';
		}
		$db_str .= $host.':'.$port;
		$db_str .= '/'.$select_db;

		$mongo =  new Mongo($db_str);
		//$mongo =  new Mongo($credentials->url);
		
		
		$this->db = $mongo->selectDB($select_db);
		if($collection !='')
		{
			$this->collection_name = $collection;
			$this->collection = $this->db->selectCollection( $collection );
		}
		if($this->using_redis)
		{
			$this->redis = new Redis();
			$this->redis->connect('127.0.0.1', 6379); 
		}
		
		//$redis->SET('user_name_1', 'admin');
	}
	function findOne($where=array())
	{
		//將條件searial化之後
		//$this->collection_name

		if($this->using_redis)
		{

			$key = trim($this->collection_name.':'.serialize($where));
			$result = $this->redis->get($key);
			if(!$result)
			{	
				$result = $this->__findOne($where);
				$this->__setcache($key,$result);
				
			}	
		}
		else
			$result =  json_encode($this->collection->findOne($where));


		 return $result;

	}
	function insert($doc)
	{
		if(!empty($doc))
		$this->collection->insert( $doc );
		if($this->using_redis)
		{

			$keys = $this->redis->keys($this->collection_name.':*');
			$this->redis->delete($keys);
		}
		return $doc;
		//刪除該collection的快取
	}
	function update($where,$doc,$opt)
	{
		if(!empty($doc))
		{

		}
		$this->collection->update( $where,array('$set'=>$doc),$opt );
		if($this->using_redis)
		{

			$keys = $this->redis->keys($this->collection_name.':*');
			$this->redis->delete($keys);
		}
		return $doc;
	}
	function remove($where,$opt=array("justOne" => true))
	{
		 $this->collection->remove($where, $opt);
    	if($this->using_redis)
		{
			$keys = $this->redis->keys($this->collection_name.':*');
			$this->redis->delete($keys);
		}
	}
	private function __findcount($where)
	{
		$count = $this->collection->find($where)->count(true);
		return $count;
	}
	function findcount($where=array())
	{
		if($this->using_redis)
		{
			$key = trim($this->collection_name.':count:'.serialize($where));
			$result = $this->redis->get($key);
			if(!$result)
			{
				
				$result = $this->__findcount($where);
				$this->__setcache($key,$result);
			}
		}
		else
		{
			$result = $this->__findcount($where);
		}
		return $result;
	}
	
	function find($where=array(),$skip='1',$limit='20',$sort='')
	{
		if($this->using_redis)
		{
			$key = '';
			$key .= $this->collection_name.':';
			$key .= $skip.':';
			$key .= $limit.':';
			$key .= $sort.':';
			$key .= serialize($where);
			$key = trim($key);


			$result = $this->redis->get($key);
			if(!$result)
			{
				
				$result = $this->__find($where,$skip,$limit,$sort);
				$this->__setcache($key,$result);
			}
		}
		else
		{

			$result = $this->__find($where,$skip,$limit,$sort);
		}
		return $result;
	}
	private function __setcache($key,$res)
	{
		$this->redis->SET($key,$res);
	}

	private function __find($where,$skip,$limit,$sort)
	{


		//$where = '{$or:[{title:/tesg/},{content:\'1234\'}]}';
		if($sort!='')
			$cursor = $this->collection->find($where)->skip(($skip-1)*$this->page)->limit($limit)->sort($sort);
		else
			$cursor = $this->collection->find($where)->skip(($skip-1)*$this->page)->limit($limit);
		$res_arr = array();
		foreach ($cursor as $id => $value) 
		{
			$res_arr[$id] = $value;
		}
		return json_encode($res_arr);
	}
	private function __findOne($where)
	{
		$result =  json_encode($this->collection->findOne($where));
				return $result;
	}
}
?>