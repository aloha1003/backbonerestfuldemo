define([
  'text!templates/demo/servernotok.html',
], function(servernotokTemplate){
  var ServerNotOk = Backbone.View.extend({
    el: '.servernotrunning',
    render: function () {
  
       $(this.el).html(_.template(servernotokTemplate));
   
    }
  });
  return ServerNotOk;
});
