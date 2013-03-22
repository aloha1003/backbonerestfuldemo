define([
  'view',
  'text!templates/demo/post_list.html',
  'collections/post'
], function( Vm, postlistTemplate,postCollection){
 
  var DashboardPage = Backbone.View.extend({
   initialize: function(options)
    {
       

    },
    el: '.inner_container',
    render: function () {
      var post = new postCollection();
      var that = this ;
        post.fetch({
          success:function(col,res){
            console.log(res);
           
              $(that.el).html(_.template(postlistTemplate,{posts:res.res,count:res.count}));
          },
          error:function(col,res){
            console.log('err'); 
            console.log(res);
            
           // console.log(err);
          }
        });
      }
    
  });
  return DashboardPage;
});
