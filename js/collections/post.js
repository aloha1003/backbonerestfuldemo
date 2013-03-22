define([], function( ) {
  var Post = Backbone.Collection.extend({

      url: function(data){
      		
      //	console.log(this.data);
      //if(this.data!={})
       var query = '';
      if(this.uid!=undefined)
       query += '/u/'+this.uid;
      if(this.key!=undefined)
       query += '/k/'+this.key;
      if(this._id!=undefined)
       query += '/'+this._id;
      console.log('query:'+query);
      	return server+'post/'+this.act+query;
      },
      initialize: function(options) {
      	 options || (options = {});
         console.log(options);
           // this.uid = (options.uid == undefined)  ? ( ($.cookie('user_id') != null) ?  $.cookie('user_id') : undefined ) : undefined;
            this.act = (options.act == undefined)  ? 'list' : options.act;
            this.uid = (options.uid == undefined)  ?undefined : options.uid;
            this.key = (options.key == undefined)  ?undefined : options.key;
            this._id = (options._id == undefined)  ?undefined : options._id;
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
  return Post;
});


