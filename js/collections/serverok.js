define([], function( ) {
  var Server = Backbone.Collection.extend({
      url: function(data){
      	return server;
      }
  });
  return Server;
});
