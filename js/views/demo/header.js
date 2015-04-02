
define([
  'view',
  'collections/getnowuser',
  'text!templates/demo/header.html'
], function( Vm, UserCollection, headerTemplate){
   
  var NowUserIsExist = Backbone.View.extend({
    el: '.header_container',
    render: function () {
      var that = this;
      var user = new UserCollection();
      user.fetch({
        success:function(col,ruser){
          console.log(ruser);
          console.info('head');
          $(that.el).html(_.template(headerTemplate, {user:ruser, _:_}));
          if($.cookie('type')==1)
          { //是臉書的話，顯示隱藏的登出按鈕
            window.fbAsyncInit = function() {
                 FB.init({ appId: facebookappid,
                    status: true,
                    cookie: true,
                    xfbml: true,
                    oauth: true});
            };
            (function() {
                var e = document.createElement('script'); e.async = true;
                e.src = document.location.protocol
                    + '//connect.facebook.net/en_US/all.js';
                document.getElementById('fb-root').appendChild(e);
            }());
          }
        }
      });
    },
    events:{
      'click #post_add' : 'post_add',
      'click #logout' :'logout'
    },
    'logout'  :function(event){
      event.preventDefault();
     
       if($.cookie('type')==1)
       {
      FB.logout(function(response) {
                               console.info("FBLOGOUT");
                               console.info(response);
                                Backbone.history.navigate($(event.currentTarget).attr('href'),true);
                            });
    }
    else
       Backbone.history.navigate($(event.currentTarget).attr('href'),true);

    },
    'post_add'  :function(){
       require(['views/demo/post_add'],function(page){
        console.log('post_add');
            var post_add = Vm.create(this, 'post_add', page);
        
        post_add.render();
       });
    }

  });
  return NowUserIsExist;
});
