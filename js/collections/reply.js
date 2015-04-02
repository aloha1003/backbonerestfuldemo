define([], function( ) {
  var Reply = Backbone.Collection.extend({
      url: function(data){
       var query = '';
     
      if(this.pid!=undefined)
       query += '/'+this.pid;
     else
        return {};
      console.log('query:'+query);
      	return server+'reply/list'+query;
      },
      initialize: function(options) {
      	 options || (options = {});
         console.log(options);
            this.pid = (options.pid == undefined)  ?undefined : options.pid;
      },
      setUid: function(uid) {
        uid || (uid = {});
        this.uid = uid;
      },
      setkey:function(key){
        key ||(key={});
        this.key =key;
      }

  });
  return Reply;
});


