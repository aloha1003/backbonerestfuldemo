<?php
class dPost  extends Db {
		function __construct() 
		{
		   $this->DB('posts');
		}
		function oninsert($arr)
		{
			$post = '{}';

			if(isset($arr['user_id']))
			{
				$doc = array(
						'title'	=>	(isset($arr['title'])	?	$arr['title']	:	''),
						'ptype'	=>	(isset($arr['ptype'])	?	$arr['ptype']	:	0),
						'content'	=>	(isset($arr['content'])	?	$arr['content']	:	''),
						'user_id'	=>	(isset($arr['user_id'])	?	$arr['user_id']	:	''),
						'files'	=>	(isset($arr['files'])	?	$arr['files']	:	''),
						'updatetime' => mktime(),
						'createtime' => mktime()
					);

				$this->insert($doc);

				$post = json_encode($doc);
			}
			return $post;

			
		}	
		function onupdate($arr)
		{
			$post = '{}';

			if(isset($arr['_id']))
			{
				$doc = array(
						'title'	=>	(isset($arr['title'])	?	$arr['title']	:	''),
						'ptype'	=>	(isset($arr['ptype'])	?	$arr['ptype']	:	0),
						'content'	=>	(isset($arr['content'])	?	$arr['content']	:	''),
						'files'	=>	(isset($arr['files'])	?	$arr['files']	:	''),
						
						'updatetime' => mktime()
						
					);
				$where =array(
          				'_id' =>  new MongoId($arr['_id'])  
       			 );
				$this->update($where,$doc, array("upsert" => true));
				$post = json_encode($doc);
			}
			return $post;	
		}
		function onremove($id)
		{
			$where = array(
					'_id'=>	new MongoId($id)
					);
			$this->remove($where);
		}
}
?>