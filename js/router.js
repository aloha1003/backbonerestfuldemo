// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'view'
], function ($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      'post/:id' : 'getpost',
      'post/edit/:id' : 'editpost',
      'post/del/:id'  : 'delpost',
      'user/logout'   : 'logout',
      'user/edit'     : 'user_edit',
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
            console.log(opt);
          var  postEditPage = Vm.create(appView, 'PostEditPage', PostEditPage,opt);
            postEditPage.render();
        }); 
      }
    });
    router.on("route:delpost",function(id){
      console.log('cookie is :'+$.cookie('user_id'));
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
      console.log('cookie is :'+$.cookie('user_id'));
      if($.cookie('user_id')==undefined || $.cookie('user_id') ==null)
      {
        router.navigate('/',{trigger: false, replace: true});
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
      // console.log(actions);
      
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
