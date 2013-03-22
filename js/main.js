

// Require.js allows us to configure shortcut alias
require.config({
   urlArgs: "bust="+(new Date()).getTime(),
  paths: {
    config: 'config',
    jquery: 'libs/jquery/jquery-min',
    jq_pack: 'libs/jquery_package/',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    text: 'libs/require/text',
    order: 'libs/require/order',
    app: 'libs/app',
    templates: '../templates'
  }
});

require([
  'config',
  'jquery',
  'jq_pack/jquery.cookie',
  'underscore',
  'backbone',
  'views/app',
  'router',
  'view'
  ],
  function(config,$,cookie,_,Backbone,AppView,Router,View){
    window.$ = $;
    window.Backbone = Backbone;
window._ = _;
window.Router = Router;
window.Config = config;
server = config.server;


 _.templateSettings = {
        interpolate : /\{\{=(.+?)\}\}/g,
        escape:  /\{\{-([\s\S]+?)\}\}/g, 
        evaluate:  /\{\{([\s\S]+?)\}\}/g
      };
  var appView = View.create({}, 'AppView', AppView);
  Router.initialize({appView: appView});
  appView.render(); 
  
});




