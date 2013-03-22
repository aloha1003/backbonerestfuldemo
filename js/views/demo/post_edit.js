define([
  'view',
  'text!templates/demo/post_edit.html',
  'collections/post',
], function( Vm, postdetailTemplate,postCollection,replyView,replyFormView){
 
  var Page = Backbone.View.extend({
    initialize: function(options )
    {
        options || (options = {});
        this.options = options;  
    },
    events:{
      'submit #post_edit' : 'post_edit'
    },
    post_edit : function(e){
      e.preventDefault();
       require(['models/post'],function(Post){
          var post = new Post({act:'edit'});
          var data = {title:$('#title').val(),content:$('#content').val(),type:$('#ptype').val(),
          _id:$('#_id').val()}
          console.log(data);
          post.save(data,{
            success:function(model, response){
              console.log('suc');
              console.log(Router);
             
             Backbone.history.navigate('#post/'+$('#_id').val(),true);
            },
            error:function(model,response){
              console.log('err');
              console.log(response);
            }
          });
         });
    },
    el: '.inner_container',
    render: function () {
      console.log(this.options);
      var post = new postCollection({act:"detail",_id: this.options._id});
      var that = this ;
        post.fetch({
          success:function(col,res){   
          console.log(res._id);  
              $(that.el).html(_.template(postdetailTemplate,{post:res}));  
          },
          error:function(col,res){
            console.log('err'); 
            console.log(res);
          }
        });
      }
    
  });
  return Page;
});
