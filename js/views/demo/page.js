define([
  'view',
  'text!templates/demo/template.html',
  'views/demo/header',
  'views/demo/servernotok',
  'collections/serverok',
  'collections/getnowuser',
  'views/demo/index'
], function( Vm, indexTemplate,HeaderView,ServerNotOkView,ServerOkCollection,UserCollection,IndexView){
 
  var DashboardPage = Backbone.View.extend({

    el: '.page',
    initialize: function(opt)
    {
        this.opt = opt;
    },
    render: function () {
      $(this.el).html(indexTemplate);
      var that = this;
      var serverok = new ServerOkCollection();
        serverok.fetch({
          success:function(res){
             var indexView =  Vm.create(this,'IndexView', IndexView,that.opt);
                indexView.render();
                var headerView =  Vm.create(this,'HeaderView', HeaderView);
                headerView.render();
          },
          error:function(col,err){
            console.log('Error:');
            console.log(err);
            var serverNotOkView =  Vm.create(this,'ServerNotOkView', ServerNotOkView);
            serverNotOkView.render();
          }
        });   
      }
    
  });
  return DashboardPage;
});
