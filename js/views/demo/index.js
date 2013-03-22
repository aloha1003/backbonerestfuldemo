define([
  'view',
  'collections/getnowuser',
  'models/user',
  'views/demo/post',
  'text!templates/demo/index.html',
], function( Vm,UserCollection,UserModel,PostView, indexTemplate){
  
  var NowUserIsExist = Backbone.View.extend({
    el: '.inner_container',
    render: function () {
      var that = this;
      var user = new UserCollection();
     
      console.log('user:'+$.cookie('user_id'));
      //var user_id = ($.cookie('user_id') !=undefined) ? $.cookie('user_id') : undefined;
      //user.setUid(user_id);
     var user = user.fetch({
        success:function(col,res){
         
          console.log('res');
          console.log(res);
          col.user = res;
        
          if(res._id!=undefined)
          { //
            
            var postView =  Vm.create(that,'PostView', PostView,{user:res});
             postView.render();
          }
          else
            $(that.el).html(_.template(indexTemplate, {user:res, _:_}));

        }
      });

    },
    events:{
      'click .submit' : 'login',

    },
    login:function(){
        var that = this ;
        var user = new UserModel();
        user.setAct('login');
        user.save({ username:$('#username').val() },{
          
          success:function(model, res){
           // console.log(response);
              //$.cookie()
              var username = res.username;
              var user_id = res._id.$id;
              console.log('sus');
                Backbone.history.navigate('#list',true);
             
            },
          error: function (model, response){
            //console.log(model);
            //console.log(response);
          }
          
          });
    }
  });
  function customEventHandler() {
    // do stuff
    console.log('in cust');
  } 
  NowUserIsExist.bind('customEvent', customEventHandler);
  return NowUserIsExist;
});
