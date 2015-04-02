define([
  'view',
  'jquery.iframe-transport',
  'jquery.fileupload'  ,
  'text!templates/demo/product_add.html'
], function( Vm, iframe,fileupload,productaddTemplate){
	var forEach  = Array.prototype.forEach;
	var Page = Backbone.View.extend({
		el: '.inner_container',
	    render: function () {
	    	$(this.el).html(_.template(productaddTemplate));
	    	 self= this;
	    	var uploadBtn = $('<button/>')
	    					.addClass('btn btn-primary')
	    					.prop('disabled',true)
	    					.text('上傳')
	    					.on('click',function(){
	    						var $this = $(this),
	    							data=$this.data();
	    						$this
	    							.off('click')
	    							.text('Abort')
	    							.on('click',function(){
	    								$this.remove();
	    								data.abort();
	    							});
	    						data.submit().always(function(){
	    							$this.remove();
	    						});
	    					});
			var cancelBtn = $('<button/>')
	    					.addClass('btn btn-warning cancel')
	    					.text('取消')
	    					.on('click',function(){
	    						var $this = $(this),
	    							data=$this.data();
	    							$this
	    							.off('click')
	    							.text('Abort');
	    							$this.parents('p').remove();
	    							$this.remove();
	    							data.abort();
	    							
	    					});
		            
	    	  $('#files').fileupload({
            dataType: 'json',
            autoUpload: true,
            url:file_upload,
            disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
	           done:function(e,data){
              $.each(data.result.files,function(index,file){
              	console.info(file);
                var del_btn = $('<button/>')
                .attr('type','button')
                .addClass('btn btn-warning cancel')
                .text('刪除')
                .attr('url',file.deleteUrl)
                .on('click',function(e){
                	e.stopPropagation();
                  $delbtn = $(this);

                  $.ajax({
                          url: file.deleteUrl,
                          type: file.deleteType,
                          success:function(){
                            $delbtn.parent('div').remove();
                          }
                          });

                });
                var imgview = $('<div class="span1" > <div style="width:60px;height:80px;"><img  class="img-responsive" src="'+file.thumbnailUrl+'" alt="" /></div> </div>');
                $(imgview).append('<input type="hidden" url="'+file.url+'" name="imgname[]" deleteurl="'+file.deleteUrl+'"  thumbnailurl="'+file.thumbnailUrl+'" value="'+file.name+'"" />')
						  .append(del_btn);
                 $('#filelists').append(imgview);
              });
             
            },
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
	        });

	    },
	    events:{
	    	'submit': 'add_submit'
	    },
	    add_submit: function(e){
	    	e.preventDefault();
	    	 require(['models/product'],function(Product){
	    	 	var product = new Product({act:'create'});
	    	 	var data = {title:$('#title').val(),
	    	 				content:$('#content').val(),
	    	 				type:$('ptype').val(),
	    	 				cost:$('#cost').val()
	    	 				};
	    	 	//轉成陣列
	    	 	var files=new Array();
	    	 	$.each($('input[name=imgname\\[\\]]'), function(index,file){
	    	 			var img  = new Object();
	    	 				img.name= $(file).val();
	    	 				img.url= $(file).attr('url');
	    	 				img.deleteurl= $(file).attr('deleteurl');
	    	 				img.thumbnailurl= $(file).attr('thumbnailurl');
	    	 			files[index] = img;
	    	 	});
	    	 		data.files = files;
	    	 	product.save(data,{
	    	 		success:function(model, response){
	    	 			console.log(response);
	    	 			 Backbone.history.navigate('#list/'+$('#_id').val(),true);
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
 