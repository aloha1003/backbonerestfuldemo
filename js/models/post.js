define([
  'backbone'
], function(Backbone) {
   Backbone.emulateHTTP = true;
  var Post = Backbone.Model.extend({
      id:null,
  	  defaults:{
              act: "" 
        },
      setAct:function(act){
      	console.log('act:'+act);
      	this.set('act',act);
      },
      url: function(){

      		return server+'post/'+this.get('act')+((this.id!=null) ? this.id : '');
      },
      initialize: function(options)
      {
       
          options || (options = {});
          if(options.act!=undefined)
        this.set('act',options.act);
      }
  });
  return Post;
});
