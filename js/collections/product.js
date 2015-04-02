define([], function( ) {
  var Product = Backbone.Collection.extend({

      url: function(data){
      
      //if(this.data!={})
       var query = '';
      if(this.uid!=undefined)
       query += '/u/'+this.uid;
      if(this.key!=undefined)
       query += '/k/'+this.key;
      if(this._id!=undefined)
       query += '/i/'+this._id;
     if(this.page!=undefined)
       query += '/p/'+this.page;
      
      	return server+'product/'+this.act+query;
      },
      initialize: function(options) {
      	 options || (options = {});
           // this.uid = (options.uid == undefined)  ? ( ($.cookie('user_id') != null) ?  $.cookie('user_id') : undefined ) : undefined;
            this.act = (options.act == undefined)  ? 'list' : options.act;
            this.page = (options.p == undefined)  ? '1' : options.p;
            this.uid = (options.u == undefined)  ?undefined : options.u;
            this.key = (options.k == undefined)  ?undefined : options.k;
            this._id = (options.i == undefined)  ?undefined : options.i;
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
  return Product;
});


