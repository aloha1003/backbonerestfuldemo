define([
  'backbone'
], function(Backbone) {
  var User = Backbone.Model.extend({
      
  	  defaults:{
              act: "" 
        },
      setAct:function(act){
      	console.log('act:'+act);
      	this.set('act',act);
      },
      url: function(){     	
      		return server+'user/'+((this.get('id')!=undefined) ? this.get('id')+'/' :'') +this.get('act');
      }
  });
  return User;
});
