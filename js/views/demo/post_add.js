define([
  'view',
  'text!templates/demo/post_add.html'
], function( Vm, postaddTemplate){
	var Page = Backbone.View.extend({
		el: '.inner_container',
	    render: function () {
	    	$(this.el).html(_.template(postaddTemplate));
	    },
	    events:{
	    	'submit': 'add_submit'
	    },
	    add_submit: function(e){
	    	e.preventDefault();
	    	 require(['models/post'],function(Post){
	    	 	var post = new Post({act:'create'});
	    	 	var data = {title:$('#title').val(),content:$('#content').val(),type:$('ptype').val()}
			    console.log(data);
	    	 	post.save(data,{
	    	 		success:function(model, response){
	    	 			//console.log('suc');
	    	 			//console.log(response);
	    	 			 Backbone.history.navigate('#list/'+$('#_id').val(),true);
	    	 			location.href='#list';
	    	 		},
	    	 		error:function(model,response){
	    	 			console.log('err');
	    	 			console.log(response);
	    	 		}
	    	 	});
	    	 	post.save(data,{
	    	 		success:function(model, response){
	    	 			//console.log('suc');
	    	 			//console.log(response);
	    	 			location.href='#list';
	    	 		},
	    	 		error:function(model,response){
	    	 			console.log('err');
	    	 			console.log(response);
	    	 		}
	    	 	});
	    	 });

	    }
	});
	return Page;
});
 