define([
  'view',
  'text!templates/demo/post_list.html',
  'collections/post'
], function( Vm, postlistTemplate,postCollection){
  var DashboardPage = Backbone.View.extend({
   initialize: function(option)
    {
        if(option==undefined)   
          {
            option={}; 
            option.p=1;
          }
        this.opt =  option;
    },
    events:{
      'click a.page_item':'pushstateClick'
    },
    pushstateClick:function(event){
        //event.preventDefault();
        
       // window.location.hash = $(event.currentTarget).attr('href');
        //window.history.pushState(null, null,window.location );
    },
    el: '.inner_container',
    render: function () {
      var post = new postCollection(this.opt);
      var that = this ;
        post.fetch({
          success:function(col,res){
            console.info(that.opt);
           page_count = Math.ceil(res.count/10);
           var now_page = 1;
            if(that.opt.p!=undefined)
              now_page = that.opt.p;
            var page_pre_href = '#list';
            if(that.opt.u!=undefined)
              page_pre_href+='u/'+that.opt.u;
            if(that.opt.k!=undefined)
              page_pre_href+='k/'+that.opt.k;
            if(that.opt.i!=undefined)
              page_pre_href+='i/'+that.opt.i;
              page_pre_href+='/';
              $(that.el).html(_.template(postlistTemplate,{now_page:now_page,page_pre_href:page_pre_href,posts:res.res,count:res.count,page_count:page_count}));
              $('.carousel').carousel();

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
