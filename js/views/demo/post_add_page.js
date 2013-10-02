define([
  'view',
  'text!templates/demo/template.html',
  'views/demo/header',
  'views/demo/servernotok',
  'collections/serverok', 
  'views/demo/index',
  'views/demo/post_add'
], function( Vm, indexTemplate,HeaderView,ServerNotOkView,ServerOkCollection,IndexView,PostAddView){
  var DashboardPage = Backbone.View.extend({
    el: '.page',
     initialize: function(options)
      {
          
          options || (options = {});
          this.options = options;
      },
    render: function () {
    
     var that = this;
      $(this.el).html(indexTemplate);
      var serverok = new ServerOkCollection();
        serverok.fetch({
          success:function(res){
              var headerView =  Vm.create(this,'HeaderView', HeaderView);
              headerView.render();
              var pageView =  Vm.create(this,'pageView', PostAddView,that.options);
              pageView.render();
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
