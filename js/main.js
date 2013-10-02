

// Require.js allows us to configure shortcut alias
require.config({
   urlArgs: "bust="+(new Date()).getTime(),
   shim:{
    'jq_pack/jquery.cookie':['jquery']
   },
  paths: {
    config: 'config',
    jquery: 'libs/jquery/jquery-min',
    jq_pack: 'libs/jquery_package/',
    'jquery.ui.widget'      :'libs/backbone_upload_manager/jquery.ui.widget',
    'jquery.iframe-transport':'libs/backbone_upload_manager/jquery.iframe-transport',
    'jquery.fileupload'      :'libs/backbone_upload_manager/jquery.fileupload',
    uploadmanager: 'libs/backbone_upload_manager/',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    text: 'libs/require/text',
    order: 'libs/require/order',
    app: 'libs/app',
    bootstrap: 'libs/bootstrap/bootstrap.min',
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
  'bootstrap',
  'view'
  ],
  function(config,$,cookie,_,Backbone,AppView,Router,bootstrap,View){
    window.$ = $;
    window.Backbone = Backbone;
     
window._ = _;
window.Router = Router;
window.Config = config;
server = config.server;
file_upload = config.file_upload;
facebookappid = config.facebookappid;
 _.templateSettings = {
        interpolate : /\{\{=(.+?)\}\}/g,
        escape:  /\{\{-([\s\S]+?)\}\}/g, 
        evaluate:  /\{\{([\s\S]+?)\}\}/g
      };
  var appView = View.create({}, 'AppView', AppView);
  Router.initialize({appView: appView});
  appView.render(); 
  
});




