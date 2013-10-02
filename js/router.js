// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'view'
], function ($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      'post/add'      :    'addpost',
      'post/:id' : 'getpost',
      'post/edit/:id' : 'editpost',
      'post/del/:id'  : 'delpost',
      'user/logout'   : 'logout',
      'user/edit'     : 'user_edit',
      'list/:page' : 'list',
      'list/u/:user/:page' : 'ulist',
      'list/k/:key/:page' : 'klist',
      'list/i/:id/:page' : 'ilist',
      'list' : 'list',
      'list/u/:user/' : 'ulist',
      'list/k/:key/' : 'klist',
      'list/i/:id/' : 'ilist',
      'list/u/:user' : 'ulist',
      'list/k/:key' : 'klist',
      'list/i/:id' : 'ilist',
      '*actions'      : 'defaultAction' 
    }

  });

  var initialize = function(options){
    var appView = options.appView;
    var router = new AppRouter;

    //先檢查cookie有沒有在
    router.on('route:logout',function(id){
       require(['models/user'], function (UserModel) {
            var user = new UserModel({id:$.cookie('user_id')});
            user.destroy({
              success:function(model,res){
                console.log('sus');
                console.log(res);
                //處理臉書登出
                
                 Backbone.history.navigate('/',true);
              },
              error:function(model,res){
                console.log('err');
                console.log(res);
                 Backbone.history.navigate('/',true);
              }
            });
       });
    });
    router.on("route:list",function(page){
      var opt = {};
       opt.p=(page==undefined) ?  1 : page;

        require(['views/demo/page'], function (DashboardPage) {
        var dashboardPage = Vm.create(appView, 'DashboardPage', DashboardPage,opt);
        dashboardPage.render();
      });
     });
    router.on("route:ulist",function(user,page){
      var opt = {};
      opt.p=(page==undefined) ?  1 : page;
      opt.u=user;
        require(['views/demo/page'], function (DashboardPage) {
        var dashboardPage = Vm.create(appView, 'DashboardPage', DashboardPage,opt);
        
        dashboardPage.render();
      });
     });
    router.on("route:klist",function(key,page){
      var opt = {};
      console.info(arguments.length);
       opt.p=(page==undefined) ?  1 : page;
      opt.k=key;
        require(['views/demo/page'], function (DashboardPage) {
        var dashboardPage = Vm.create(appView, 'DashboardPage', DashboardPage,opt);
        
        dashboardPage.render();
      });
     });
    router.on("route:ilist",function(id,page){
        var opt = {};
       opt.p=(page==undefined) ?  1 : page;
      opt.i=id;
        require(['views/demo/page'], function (DashboardPage) {
        var dashboardPage = Vm.create(appView, 'DashboardPage', DashboardPage,opt);
        
        dashboardPage.render();
      });
     });
    router.on("route:editpost",function(id){
        if($.cookie('user_id')==undefined || $.cookie('user_id') ==null)
      {
        router.navigate('/',{trigger: false, replace: true});
      }
      else
      {
        var opt = {};
            opt._id = id;
         require(['views/demo/post_edit_page'], function (PostEditPage) {
          
          var  postEditPage = Vm.create(appView, 'PostEditPage', PostEditPage,opt);
            postEditPage.render();
        }); 
      }
    });
    router.on("route:addpost",function(){
      console.log('cookie is :'+$.cookie('user_id'));

      if($.cookie('user_id')==undefined || $.cookie('user_id') =='null')
      {
        router.navigate('/',{trigger: true, replace: true});
      }
      else
      {
      require(['views/demo/post_add_page'],function(page){
            var post_add = Vm.create(appView, 'post_add', page);
        post_add.render();
       });
    }
    });
    router.on("route:delpost",function(id){
      if($.cookie('user_id')==undefined || $.cookie('user_id') ==null)
      {
        router.navigate('/',{trigger: false, replace: true});
      }
      else
      {
        
         require(['models/post'], function (PostModel) {
            var post = new PostModel({id:id});
          post.destroy({
            success:function(model,res){
              console.log('sus');
              console.log(res);
              Backbone.history.navigate('/',true);
            },
            error:function(model,res){
                 console.log('err');
                 console.log(res);
                  Backbone.history.navigate('/',true);
            }     
            });
        }); 
      }
      
    });
    router.on("route:getpost",function(id){
      if($.cookie('user_id')==undefined || $.cookie('user_id') =='null')
      {
        router.navigate('/',{trigger: true, replace: true});
      }
      else
      {
        var opt = {};
            opt._id = id;
         require(['views/demo/post_detail_page'], function (PostDetailPage) {
            
          var  postDetailPage = Vm.create(appView, 'PostDetailPage', PostDetailPage,opt);
            postDetailPage.render();
        }); 
      } 
    });
    router.on('route:defaultAction', function (actions) {

      require(['views/demo/page'], function (DashboardPage) {
        var dashboardPage = Vm.create(appView, 'DashboardPage', DashboardPage);
        
        dashboardPage.render();
      });
    });
    
  };
  return {

    initialize: initialize
  };
});
