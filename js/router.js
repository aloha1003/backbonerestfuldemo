// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'view'
], function ($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      'product/add'      :    'addproduct',
      /*'product/:id' : 'getproduct',*/
      'product/edit/:id' : 'editproduct',
      'product/del/:id'  : 'delproduct',
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
    router.on("route:editproduct",function(id){
        if($.cookie('user_id')==undefined || $.cookie('user_id') ==null)
      {
        router.navigate('/',{trigger: false, replace: true});
      }
      else
      {
        var opt = {};
            opt._id = id;

         require(['views/demo/product_edit_page'], function (productEditPage) {
          
          var  productEditPage = Vm.create(appView, 'productEditPage', productEditPage,opt);
            productEditPage.render();
        }); 
      }
    });
    router.on("route:addproduct",function(){
      console.log('cookie is :'+$.cookie('user_id'));

      if($.cookie('user_id')==undefined || $.cookie('user_id') =='null')
      {
        router.navigate('/',{trigger: true, replace: true});
      }
      else
      {
      require(['views/demo/product_add_page'],function(page){
            var product_add = Vm.create(appView, 'product_add', page);
        product_add.render();
       });
    }
    });
    router.on("route:delproduct",function(id){
      if($.cookie('user_id')==undefined || $.cookie('user_id') ==null)
      {
        router.navigate('/',{trigger: false, replace: true});
      }
      else
      {
        
         require(['models/product'], function (productModel) {
            var product = new productModel({id:id});
          product.destroy({
            success:function(model,res){
              console.info('sus');
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
    router.on("route:getproduct",function(id){
      if($.cookie('user_id')==undefined || $.cookie('user_id') =='null')
      {
        router.navigate('/',{trigger: true, replace: true});
      }
      else
      {
        var opt = {};
            opt._id = id;
         require(['views/demo/product_detail_page'], function (productDetailPage) {
            
          var  productDetailPage = Vm.create(appView, 'productDetailPage', productDetailPage,opt);
            productDetailPage.render();
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
