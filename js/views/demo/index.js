define([
  'view',
  'collections/getnowuser',
  'models/user',
  'views/demo/post',
  'text!templates/demo/index.html',

], function( Vm,UserCollection,UserModel,PostView, indexTemplate){
  
  var NowUserIsExist = Backbone.View.extend({
    el: '.inner_container',
     initialize: function(opt)
    {
        this.opt =opt;
    },
    render: function () {
      var that = this;
      var user = new UserCollection();
     
      //console.log('user:'+$.cookie('user_id'));
     
       user.fetch({
        success:function(col,res){
         // console.log(res);
          col.user = res;
          if(res._id!=undefined)
          { //    
            var postView =  Vm.create(that,'PostView', PostView,that.opt);
             postView.render();
          }
          else
          {
             $(that.el).html(_.template(indexTemplate, {user:res, _:_}));
              var button;
            var userInfo;
 
            window.fbAsyncInit = function() {
                FB.init({ appId: facebookappid,
                    status: true,
                    cookie: true,
                    xfbml: true,
                    oauth: true});
 
           
 
               function updateButton(response) {
                    button       =   document.getElementById('fb-auth');
                   // userInfo     =   document.getElementById('user-info');
 
                    if (response.authResponse) {
                      console.info(' facebook login');
                        //user is already logged in and connected
                        FB.api('/me', function(info) {
                            fblogin(response, info);
                        });
 
                        button.onclick = function() {
                            FB.logout(function(response) {
                                
                            });
                        };
                    } else {
                        //user is not connected to your app or logged out
                        button.innerHTML = '用臉書登入';
                       
                        button.onclick = function() {
                           
                            FB.login(function(response) {
                                if (response.authResponse) {
                                    FB.api('/me', function(info) {
                                        fblogin(response, info);
                                    });
                                } else {
                                    //user cancelled login or did not grant authorization
                                    
                                }
                            }, {scope:'email,user_birthday,status_update,publish_stream,user_about_me'});
                        }
                    }
                }
 
                // run once with current status and whenever the status changes
                FB.getLoginStatus(updateButton);
                FB.Event.subscribe('auth.statusChange', updateButton);
            };
            (function() {
                var e = document.createElement('script'); e.async = true;
                e.src = document.location.protocol
                    + '//connect.facebook.net/en_US/all.js';
                document.getElementById('fb-root').appendChild(e);
            }());
 
            function fblogin(response, info){
                if (response.authResponse) {
                    console.info(response);
                    console.info(info);
                    var user = new UserModel();
                        user.setAct('login');
                      user.save(
                        { username:info.name ,
                          password:response.authResponse.accessToken,
                          type:1
                        },
                      {
                        success:function(model, res){
                          console.info(res);
                            var username = res.username;
                            var user_id = res._id.$id;
                              Backbone.history.navigate('#list',true);
                          },
                        error: function (model, response){
                          console.log(response);
                        }
                        });
                }
            }
          }
           

        }
      });

    },
    events:{
      'click .submit' : 'login',
      'submit .loginform': 'login'
    },
    login:function(ev){
        var that = this ;

        var user = new UserModel();
        user.setAct('login');
       ev.preventDefault();
        user.save({ username:$('#username').val() ,password:$('#password').val(),type:0},{
          
          success:function(model, res){
           console.log(res);
              //$.cookie()
             if(res._id !==undefined)
             {
              var username = res.username;

              var user_id = res._id.$id;
              
                Backbone.history.navigate('#list',true);
              
                ev.stopPropagation();
              }
              else
              {
                $('#password_help').text('密碼錯誤');
              }
             
            },
          error: function (model, response){
            
            //console.log(model);
            console.log(response);
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
