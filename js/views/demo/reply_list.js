define([
  'text!templates/demo/reply_list.html',
  'text!templates/common/date.html',
  'collections/reply',
  
], function(  replyTemplate,commonTemplateDir,replyCollection){
 
  var Page = Backbone.View.extend({
    initialize: function(options )
    {
        options || (options = {});
        this.options = options;
    },
    el: '.reply_contaner',
    render: function () {
      console.log(this.options);
      var reply = new replyCollection({pid: this.options.pid});
      var that = this ;
        reply.fetch({
          success:function(col,res){     
            
             console.log(commonTemplateDir);
             $(that.el).html(_.template(replyTemplate,{count:res.count,list:res.list,commonDir:commonTemplateDir}));
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
