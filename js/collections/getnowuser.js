define([], function( ) {
  var User = Backbone.Collection.extend({

      url: function(data){
      		
      	console.log('cookie:'+this.uid);
      if(this.uid!=undefined)
      	return server+'user/getnowuser/'+this.uid;
      else
        return server+'user/getnowuser';
      },
      initialize: function(options) {

      	 options || (options = {});
            this.uid = (options.uid == undefined)  ? ( ($.cookie('user_id') != null) ?  $.cookie('user_id') : undefined ) : undefined;
      },
    	setUid: function(uid) {
    		uid || (uid = {});
    		this.uid = uid;
      }
  });
  return User;
});


