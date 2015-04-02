<?php
class dReply  extends Db {
		function __construct() 
		{
		   $this->DB('replys');
		}
		function oninsert($arr)
		{
			$post = '{}';

			if(isset($arr['user_id']))
			{
				$doc = array(
						'content' => $arr['content'],
						'pid'	=>	$arr['pid'],
						'user_id'	=>	(isset($arr['user_id'])	?	$arr['user_id']	:	''),
						'updatetime' => time(),
						'createtime' => time()
					);

				$this->insert($doc);

				$post = json_encode($doc);
			}
			return $post;

			
		}	
		function onupdate()
		{

		}
		function ondelete()
		{

		}
}
?>