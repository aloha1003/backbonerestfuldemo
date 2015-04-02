define([
  'backbone'
], function(Backbone) {
  //Backbone.emulateHTTP = true;
  var Reply = Backbone.Model.extend({
  	  id:null,
      
      setAct:function(act){
      	console.log('act:'+act);
      	this.set('act',act);
      },
      url: function(){
        console.log(this.id);
        var query ='';

      		return server+'reply/add/'+((this.get('id')!=null) ? this.get('id'): '');
      },
      initialize: function(options)
      {
          console.log(options);
          options || (options = {});
         
        
      }
  });
  return Reply;
});
