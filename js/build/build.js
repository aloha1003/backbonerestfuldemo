({
    baseUrl: "../../js/",
    name: "main",
    out: "../../js/main-build.js",
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
  },
    mainConfigFile: "../../js/main.js"
})