define([
  'view',
	'events',
  'text!templates/layout.html' 
], function( Vm, Events, layoutTemplate){
  

  var AppView = Backbone.View.extend({
    el: '.container',
    initialize: function () {
      
    },
    render: function () {
			var that = this;
      $(this.el).html(layoutTemplate);
     
      Backbone.history.start();
		} 
	});
  return AppView;
});
