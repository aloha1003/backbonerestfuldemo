define([
  'view',
  'text!templates/demo/post_edit.html',
  'jquery.iframe-transport',
  'jquery.fileupload'  ,
  'collections/post',
], function( Vm, postdetailTemplate,iframe,fileupload,postCollection){
 
  var Page = Backbone.View.extend({
    initialize: function(options )
    {
        options || (options = {});
        this.options = options;  
    },
    events:{
      'submit #post_edit' : 'post_edit'
     
    },
    post_edit : function(e){
      e.preventDefault();
       require(['models/post'],function(Post){
          var post = new Post({act:'edit'});
          var data = {title:$('#title').val(),content:$('#content').val(),type:$('#ptype').val(),
          _id:$('#_id').val()};
          //轉成陣列
          var files=new Array();
          $.each($('input[name=imgname\\[\\]]'), function(index,file){
              var img  = new Object();
                img.name= $(file).val();
                img.url= $(file).attr('url');
                img.deleteurl= $(file).attr('deleteurl');
                img.thumbnailurl= $(file).attr('thumbnailurl');
              files[index] = img;
          });
            
            data.files = files;
          console.log(data);
          post.save(data,{
            success:function(model, response){
              console.log('suc');
              console.log(Router);
             
             Backbone.history.navigate('#list/',true);
            },
            error:function(model,response){
              console.log('err');
              console.log(response);
            }
          });
         });
    },
    el: '.inner_container',
    render: function () {
      var that = this ;
      var post = new postCollection({act:"detail",i: that.options._id});
     
        post.fetch({
          success:function(col,res){   
           
              $(that.el).html(_.template(postdetailTemplate,{post:res}));
              $('#del_confirm').click(function(e){
                require(['models/post'], function (PostModel) {
                    var post = new PostModel({id:that.options._id});
                    post.destroy({
                                success:function(model,res){
                                  console.info('sus');
                                  $('#myconfirm .modal-body p').text('刪除成功');
                                  $('#del_confirm').hide();
                                  $('#myconfirm').on('hidden',function(){
                                      Backbone.history.navigate('/',true);
                                  });
                                },
                                error:function(model,res){
                                     console.log('err');
                                     console.log(res);
                                     $('#myconfirm .modal-body p').text('刪除失敗，請聯絡管理員');      
                                }     
                                });
                });
              
              });
                $('#files').fileupload({
            dataType: 'json',
            autoUpload: true,
            url:file_upload,
            disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
             done:function(e,data){
              $.each(data.result.files,function(index,file){
                //console.info(data.result.files);
                var del_btn = $('<button/>')
                .attr('type','button')
                .addClass('btn btn-warning cancel')
                .text('刪除')
                .attr('url',file.deleteUrl)
                .on('click',function(e){
                  e.stopPropagation();
                  $delbtn = $(this);
                  $.ajax({
                          url: file.deleteUrl,
                          type: file.deleteType,
                         
                          success:function(){
                           
                            $delbtn.parent('div').remove();
                          }
                          });
                });
                 var imgview = $('<div class="span1" > <div style="width:60px;height:80px;"><img src="'+file.thumbnailUrl+'" alt="" /></div> </div>');
                $(imgview)
                          
                          .append('<input type="hidden" url="'+file.url+'" name="imgname[]" deleteurl="'+file.deleteUrl+'"  thumbnailurl="'+file.thumbnailUrl+'" value="'+file.name+'"" />')
                          .append(del_btn);
                 $('#filelists').append(imgview);
              });
            },
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
          });
              $('.thumbnailurl').on('error',function(){

                $(this).parent('div').parent('div').remove();
              });
              $('.editdelete').on('click',function(e){
                var delbtn = $(this);
                 $.ajax({
                        url: delbtn.attr('url'),
                        type: 'DELETE',
                       
                        success:function(){
                         
                         delbtn.parent('div').remove();
                        }
                        });
                 }); 
          },
          error:function(col,res){
            console.log('err'); 
            console.log(res);
          }
        });
      }
    
  });
  return Page;
});
