requirejs.config({
    'waitSeconds' : 25,
    "baseUrl": "",
    "paths": {
        "app": "",
        "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min",
        "tether.min": "https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min", // videme_addons 29072022 remove?
        //BS4 "bootstrap.bundle.min": "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min",
        "bootstrap.bundle.min": "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min",
        "jquery-ui": "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min",
        "jquery.form.min": "https://malsup.github.io/min/jquery.form.min",
        "jquery.validate.min": "https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.15.1/jquery.validate.min",
        "jquery.cookie": "https://ea1116048a2ffc61f8b7-d479f182e30f6e6ac2ebc5ce5ab9de7b.ssl.cf1.rackcdn.com/jquery.cookie",
        "pgwbrowser": "https://api.vide.me/system/pgwbrowser.min",  // videme_addons
        "jssocials.min": "https://cdn.jsdelivr.net/jquery.jssocials/1.5.0/jssocials.min",  // videme_addons
        //"videojs": "https://vjs.zencdn.net/7.7.5/video.min",
        //"video.js": "https://vjs.zencdn.net/7.7.5/video.min",
        //"videojs-overlay.min": "https://cdnjs.cloudflare.com/ajax/libs/videojs-overlay/1.1.4/videojs-overlay",
        //"videojs-overlay.min": "https://players.brightcove.net/videojs-overlay/2/videojs-overlay.min",
        //"chart.js": "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min",
        //"chart.js": "chart",
        //"moment": "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min",
        "moment": "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.3/moment.min",  // videme_addons
        //"moment": "moment",
        "img_cropper": "https://api.vide.me/system/img_cropper", // videme_addons
        "img_cropper_pas": "https://api.vide.me/system/img_cropper_pas", // videme_addons
        "jquery.textcomplete": "https://cdnjs.cloudflare.com/ajax/libs/jquery.textcomplete/1.8.0/jquery.textcomplete",
        "jquery-comments.min": "https://api.vide.me/system/jquery-comments.min",
        //"videojs-vtt-thumbnails": "https://api.vide.me/system/videojs-vtt-thumbnails.min",
        //"videojs-hls-quality-selector": "https://cdn.jsdelivr.net/npm/videojs-hls-quality-selector@1.1.4/dist/videojs-hls-quality-selector.min",
        //"videojs-contrib-quality-levels": "https://cdn.jsdelivr.net/npm/videojs-contrib-quality-levels@2.1.0/dist/videojs-contrib-quality-levels.min",
        //"videme": "https://api.vide.me/system/videme_r",
        "videme_video": "https://api.vide.me/system/videme_video", // videme_video_player
        "videme_jq": "https://api.vide.me/system/videme_jq", // videme_app
        "videme_func1": "https://api.vide.me/system/videme_func1", // videme_app
        "videme_jq_docready": "https://api.vide.me/system/videme_jq_docready", // videme_app
        "videme_jq_click": "https://api.vide.me/system/videme_jq_click", // videme_app
        "videme_upload": "https://api.vide.me/system/videme_upload_r",
        "videme_video_player": "https://api.vide.me/system/videme_video_player",
        //"jquery-ui/ui/widget": "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min",
        "jquery-ui/ui/widget": "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/jquery.ui.widget.min",
        //--"jquery.ui.widget": "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/jquery.ui.widget.min",
        "jquery.fileupload": "https://cdnjs.cloudflare.com/ajax/libs/blueimp-file-upload/9.30.0/js/jquery.fileupload",
        "cropperjs": "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min", // TODO: use vide.me/ only 'cropperjs' name // videme_addons
        "jquery-cropper": "https://fengyuanchen.github.io/jquery-cropper/js/jquery-cropper", // videme_addons
        //"jquery.autosize": "https://api.vide.me/system/jquery.autosize.min",
        //"jquery.autosize": "https://cdn.jsdelivr.net/npm/autosize@5.0.1/dist/autosize.min",
        //"jquery.autosize": "https://cdnjs.cloudflare.com/ajax/libs/autosize.js/4.0.2/autosize",
        //"jquery.hashtags": "https://api.vide.me/system/jquery.hashtags.min",
        "jquery.hashtags.autosize": "https://api.vide.me/system/jquery.hashtags.autosize",
        //"jquery.hashtags": "https://cdn.jsdelivr.net/npm/jquery-hashtags@0.5.0/js/jquery.hashtags.min",
        //"jquery.ui.widget": "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/jquery.ui.widget.min",
        //"jquery.ui.widget": "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min/ui/widget",
        //"jquery.ui.widget": "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min",
        //'jquery.ui.core': 'lib/jquery-ui/1.10.4/ui/minified/jquery.ui.core.min',
        //'jquery.ui.widget': 'lib/jquery-ui/1.10.4/ui/minified/jquery.ui.widget.min',
        "image-picker": "https://api.vide.me/system/image-picker.min", // videme_addons
        "chartjs": "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min", // videme_addons
        //"chart.js": "chart",
        "chartjs-adapter-moment": "https://cdnjs.cloudflare.com/ajax/libs/chartjs-adapter-moment/1.0.0/chartjs-adapter-moment.min" // videme_addons
        //"chartjs-adapter-moment": "chartjs-adapter-moment.min"
        //"chartjs-adapter-moment": "chartjs-adapter-moment"
    },
    map: {
        '*': {
            "video.js": "videme_video",
            "chart.js": "chartjs"
        }
    },
    shim: {
        'jssocials.min': ['jquery'],
        //'videojs-overlay.min': ['video.js'],
        'pgwbrowser': ['jquery'],
        //'videme_upload': ['jquery'],
        //'videme_upload': ['videme'],
        //'jquery-ui': ['jquery'],
        //'videojs-vtt-thumbnails.min': ['video.min'],
        'jquery': { // TODO: remove NOO
            exports: '$'
        },
        //'videme_upload': ['jquery'],
        /*'videojs-overlay.min': {
            exports: 'overlay'
        },*/
        /*'videojs-vtt-thumbnails.min': { // TODO: remove NOO
            exports: 'vttThumbnails'
        },*/
        //'videojs-overlay.min': [ 'jquery', 'video.js' ],
        /*'moment.min': {
            deps: ['jquery']
        },*/
        /*'jquery.ui.widget': {
            deps: ['jquery', 'jquery-ui']
        },*/
        /*'jquery.hashtags': {
            deps: ['jquery.autosize']
        },*/
        //'jquery.hashtags': ['jquery.autosize'],
        'jquery.fileupload': {
            deps: ['jquery', 'jquery-ui/ui/widget' /*, 'jquery.hashtags', 'jquery.autosize'*/]
        },
        'bootstrap.bundle.min': {
            deps: [/*'img_cropper',*/ 'cropperjs', 'jquery-cropper']
        },
        //'jquery.ui.core': ['jquery'],
        //'jquery.ui.widget': ['jquery'],
        'videme_upload': {
            deps: ['videme_jq', 'videme_func1', 'videme_jq_docready', 'videme_jq_click', 'jquery', 'jquery.fileupload', 'jquery-ui']
        },
        'videme_video': {
            deps: ['jquery']
        },
        'videme_video_player': {
            deps: ['videme_video']
        },
        'jquery.hashtags.autosize': {
            deps: ['jquery']
        },
        'image-picker': {
            deps: ['jquery']
        },
        /*'chartjs-adapter-moment': {
            //deps: ['chartjs']
            deps: ['chartjs', 'moment']
        },*/
        /*'chartjs-adapter-moment': {
            //deps: ['chartjs']
            //deps: ['moment']
            deps: ['moment.js']
        },*/
        /*'chart.js': {
            //deps: ['chartjs-adapter-moment']
            deps: ['moment', 'chartjs-adapter-moment']
        },*/
        'img_cropper': {
            deps: ['videme_jq', 'jquery']
        },
        'img_cropper_pas': {
            deps: [/*'videme_jq', */'jquery', 'cropperjs', 'jquery-cropper']
        },
        //'videme': {
        'videme_jq': {
            deps: ['videme_func1', 'videme_jq_docready', 'videme_jq_click', 'jquery', /*"moment.js",*/ 'jquery.cookie', 'jquery.hashtags.autosize', 'image-picker' /*, 'chartjs' ,'chartjs-adapter-moment'*/],
            //deps: ['jquery', "moment", 'video.js'/*, 'videojs-vtt-thumbnails.min'*/]

        },
        'videme_func1': {
            deps: ['jquery', "moment", 'chartjs' ,'chartjs-adapter-moment'],

        },
        'videme_jq_docready': {
            deps: ['videme_func1', /*'videme_jq',*/ 'jquery', "moment", 'img_cropper_pas'/*, 'cropperjs', 'jquery-cropper'*/]
        },
        'videme_jq_click': {
            deps: ['videme_func1', 'jquery', "moment"],

        },
        /*'videme_upload': {
            deps: [/!*'jquery',*!/ 'videme', 'pgwbrowser'],
            //exports: 'Videme_upload'
        },*/
        /*'videme_upload': {
            deps: ['jquery', 'jquery-ui', 'jquery.ui.widget', 'jquery.fileupload', "jquery.autosize", 'jquery.hashtags', 'image-picker'],
        },*/
        /*'image-picker': {
            deps: ['jquery', 'jquery-ui', 'jquery.fileupload', "jquery.autosize", 'jquery.hashtags'],
        },*/
        /*'jquery.fileupload': {
            deps: ['jquery', 'jquery-ui', 'jquery.ui.widget', "jquery.autosize", 'jquery.hashtags'],
        },*/
        /*"jquery-ui": {
            //exports: "jQuery", //Adding this line doesn't fix the problem
            deps: ["jquery"],
        },*/
        /*'videojs-overlay.min': {
            deps: ['video.js']
        },*/
        /*'video.js': {
            exports: ['video.js']
        },*/

        /*'video.min': {
            deps: ['videojs-overlay.min']
        },*/
        deps:["jquery", 'moment', 'pgwbrowser' , 'videme_jq' /*, 'videme_jq_docready'*//*, 'videme_upload'*//* , *//*'videojs-vtt-thumbnails.min'*/ /*, 'jquery.fileupload', 'videme_upload', 'jquery.autosize', 'jquery.hashtags', 'image-picker'*/ /*, 'jquery.hashtags' , 'jquery.autosize'*/], // jquery.highlight dependeps on jquery so it will load after jquery has been loaded
        //exports: "videme"
    }
});

// Load the main app module to start the app
/*requirejs(["jquery"]);
requirejs(["tether.min"]);
requirejs(["bootstrap.bundle.min"]);
requirejs(["jquery-ui"]);
requirejs(["jquery.form.min"]);
requirejs(["jquery.validate.min"]);
requirejs(["jquery.cookie"]);
requirejs(["pgwbrowser"]);
requirejs(["jssocials.min"]);
requirejs(["video.min"]);
requirejs(["videojs-overlay.min"]);
requirejs(["moment.min"]);
requirejs(["jquery.textcomplete"]);
requirejs(["jquery-comments.min"]);*/

requirejs(["tether.min", "bootstrap.bundle.min", "jquery-ui", "jquery.form.min", "jquery.validate.min", "jquery.cookie", "pgwbrowser", "jssocials.min", "moment", "jquery.textcomplete", "jquery-comments.min", 'videme_jq','videme_video_player' /*,'chartjs'*//*,'videme_video'*//*25112021, 'videme_upload'*/]);
//requirejs(["videojs-vtt-thumbnails.min"]);

//requirejs(["videme"]);
//requirejs(["videme_upload"]);

/*define(['videme_upload'], function (Videme_upload) {
    return Videme_upload.Model.extend({});
});*/

// document.js file
define('global/document', ['global/window'], function (window) {
    return window.document;
});

// window.js file
define('global/window', [], function () {
    return window;
});

define('global/document', ['global/window'], function (window) {
    return window.global;
});
/*var global = require("global")
var document = require("global/document")
var window = require("global/window")*/


/*define("videojs-vtt-thumbnails.min",["video.min"], function(video.js) {
    window.video.js = video.js;
});*/
/*define("videojs-vtt-thumbnails.min",["videme"], function(video.js) {
    window.video.js = video.js;
});*/

/*define(,["videojs-vtt-thumbnails.min"], function(vttThumbnails) {
    window.video.js = video.js;
});*/

requirejs.onError = function (err) {
    console.log(err.requireType);
    if (err.requireType === 'timeout') {
        console.log('modules: ' + err.requireModules);
    }

    throw err;
};
