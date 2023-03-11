console.log('videme_video_player.js');
define('videme_video_player', function(videme_video_player) {
    //require(['videme', 'jquery.fileupload'], function(videme, jquery_fileupload) {
    //??==require(['videme', 'jquery.fileupload'], function(videme) {
//var upload_player;
    let showcasePlayerFunc;
    let videmeVideoPlayerProperties = {};
    let videmeVideoPlayerPropertiesTrue = {};
    let vtt_w120URL = '';
    let url = parseUrl();
    let list = {};
    var overlay_content = '';

    var videme_video_player = {
        videmeVideoPlayerInit: function (showcaseVideoV3StaticSettings) {
            //console.log('formUploadInit *************************************************** ');

            //console.log("$.fn.showcaseVideoV3Static showcaseVideoV3StaticSettings -----> start");
            $('.videme-showcase-video-main').removeClass('hidden');
            $('.videme-showcase-image-main').addClass('hidden');
            $('.videme-showcase-article-main').addClass('hidden');
            $('.videme-showcase-event-main').addClass('hidden');

            /*if (showcaseVideoV3StaticSettings.authorized) { // TODO: remove
                //console.log("authorized -----> true");
                //var sourseURL = "https://gu.vide.me/vic?m=";
                //var sourseURL = "https://s3.amazonaws.com/video.vide.me/";
                //var sourseURL = "https://d147uuofapeg23.cloudfront.net/";
                //var sourseURL = "https://d147uuofapeg23.cloudfront.net/";
            } else {
                //console.log("authorized ------> false");
                //var sourseURL = "https://gu.vide.me/vi?m=";
                var sourseURL = "https://s3.amazonaws.com/video.vide.me/";
                //var sourseURL = "https://d147uuofapeg23.cloudfront.net/";
            }*/
            //var sourseURL = origin_video_vide_me;

            //console.log("$.fn.showcaseVideo urlExists: " + urlExists(sourseURL + showcaseVideoV3StaticSettings.video + '.mp4'));
            /*if ($(this).length) {
                //console.log("$.fn.showcaseVideoV3Static $(this) -----> yes " + $(this).length);
                var tempObject = $(this);
            } else {
                //console.log("$.fn.showcaseVideoV3Static $(this) -----> nooo! " + $(this).length);
                var tempObject = $(showcaseVideoV3StaticSettings.showcaseVideo);
                //console.log("$.fn.showcaseVideoV3Static tempObject -----> " + tempObject.length);
            }*/

            /*var player = videojs('videme-v3-player');
            //player.dispose();
            player.reset();*/

            var source_src = '';
            var img = '';
            var pgwBrowser = $.pgwBrowser();
            //console.log("$.fn.showcaseVideoV3Static pgwBrowser.os.group -----> " + pgwBrowser.os.group);
            //console.log("$.fn.showcaseVideoV3Static pgwBrowser.browser.group -----> " + pgwBrowser.browser.group);

            if (pgwBrowser.os.group !== 'Android' && pgwBrowser.browser.group !== 'Chrome') {
                source_src = "<source src=\"" + origin_video_vide_me + showcaseVideoV3StaticSettings.video + ".m3u8\" type=\"video/mp4\">";
            }
            //console.log("$.fn.showcaseVideo showcaseVideoV3StaticSettings.video -----> " + showcaseVideoV3StaticSettings.video);
            /*tempObject.html("<video id=\"videme-showcasevideo\" class=\"video-js vjs-default-skin\" autoplay>" +
                source_src +
                "</video>" + "<div id=\"videme-minivideo\"><div>");
            var oldShowcasePlayer = document.getElementById('videme-showcasevideo');
            videojs(oldShowcasePlayer).dispose();*/
            /*tempObject.html("<video id=\"videme-showcasevideo\" class=\"video-js vjs-default-skin\"></video>" +
                "<div id=\"videme-minivideo\"><div>");*/
            /*tempObject.html("<video id=\"videme-showcasevideo\" class=\"video-js vjs-default-skin\" autoplay>" +
                "<source src=\"" + sourseURL + showcaseVideoV3StaticSettings.video + ".m3u8\" type=\"video/mp4\">" +
                "</video>" +
                "<div id=\"videme-minivideo\"><div>");*/
            if (!$.isEmptyObject(showcaseVideoV3StaticSettings.src)) { // TODO: remove
                //source_src += "<source src=\"" + sourseURL + showcaseVideoV3StaticSettings.video + "\" type=\"video/mp4\">";
                $.each(showcaseVideoV3StaticSettings.src, function (key, value) {
                    //console.log("$.fn.showPopTags data.tags -----> cnt: " + value.cnt + " tag " + value.tag);
                    //console.log("$.fn.showPopTags each value -----> " + JSON.stringify(value));
                    source_src += "<source src=\"" + origin_video_vide_me + value + "\" type=\"video/mp4\">";
                });
            }

            /*tempObject.html("<video id=\"videme-showcasevideo\" class=\"video-js vjs-default-skin vjs-big-play-centered\">" +
                source_src +
                "</video>" +
                "<div id=\"videme-minivideo\"><div>");*/
            if ($('#videme-showcasevideo').length) { // TODO: remove
                //console.log("$.fn.showcaseVideoV3Static (\"#videme-showcasevideo\").length) -----> yes " + $("#videme-showcasevideo").length);
            } else {
                //console.log("$.fn.showcaseVideoV3Static (\"#videme-showcasevideo\").length) -----> nooo! " + $("#videme-showcasevideo").length);
            }
            //goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + showcaseVideoV3StaticSettings.video + '&title=' + showcaseVideoV3StaticSettings.title + '&user_display_name=' + showcaseVideoV3StaticSettings.user_display_name + '&spring=' + showcaseVideoV3StaticSettings.spring + '&user_picture=' + showcaseVideoV3StaticSettings.user_picture + '&type_item=video');

            //var width = document.getElementById('videme-showcasevideo').parentElement.offsetWidth;
            //var width = document.getElementById('videme-v3-player').parentElement.offsetWidth; // TODO: this -> videme-showcase-video
            //var width = 300;

            /*if( $('#videme-showcase-video').is(':empty') ) {
                $('#videme-showcase-video').html('<video id="my-player" class="video-js vjs-default-skin vjs-big-play-centered" controls="controls" preload="auto" poster="' + img + '" data-setup=\'{"fluid": true}\'>' +
                    '<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p></video>');
            }*/
            var width = document.getElementById('my-player').parentElement.offsetWidth; // TODO: this -> videme-showcase-video
            //var width = document.getElementById('videme-v3-player').parentElement.offsetWidth; // TODO: this -> videme-showcase-video
            //---var width = document.getElementById(tempObject).parentElement.offsetWidth;
            //myPlayer.width(width).height(width * (360 / 640));
            //console.log("$.fn.showcaseVideoV3Static width -----> " + width);
            videmeVideoPlayerPropertiesTrue = videme_video_player.videmeVideoPlayer_set_options(showcaseVideoV3StaticSettings);
            var opions = {
                "poster": videmeVideoPlayerPropertiesTrue.img,
                "preload": "auto",
                "autoplay": true,
                "width": width/*,
            "height": width * (360 / 640)*/
            };
            if (detectBrowser() !== 'firefox') {
                opions = {
                    "poster": videmeVideoPlayerPropertiesTrue.img,
                    "preload": "auto",
                    "autoplay": true,
                    "width": width/*,
                "height": width * (360 / 640)*/,
                    html5: {
                        hls: {
                            overrideNative: true
                        },
                        nativeVideoTracks: false,
                        nativeAudioTracks: false,
                        nativeTextTracks: false
                    }
                };
            }

            if (pgwBrowser.os.group == 'Android' && pgwBrowser.browser.group == 'Chrome') {
                opions = {
                    "poster": videmeVideoPlayerPropertiesTrue.img,
                    //"poster": img,
                    "preload": "auto",
                    "autoplay": true,
                    "width": width/*,
                "height": width * (360 / 640)*/
                };
            }
            if (pgwBrowser.browser.group == 'Firefox') {
                opions = {
                    "poster": videmeVideoPlayerPropertiesTrue.img,
                    "preload": "auto",
                    "autoplay": false,
                    "width": width/*,
                "height": width * (360 / 640)*/
                    /*plugins:{thumbnails:{width:120,height:90}}*/
                };
            }
            //console.log("$.fn.showcaseVideoV3Static opions -----> " + JSON.stringify(opions));
            var options = {}; // TODO: remove

            //var showcasePlayer = videojs('videme-showcasevideo', opions, function () {
            //--var showcasePlayer = videojs(tempObject, opions, function () {
            /*if (showcasePlayer) {
                console.log("$.fn.showcaseVideoV3Static showcasePlayer -----> already exist");
                showcasePlayer.dispose();
            } else {
                console.log("$.fn.showcaseVideoV3Static showcasePlayer -----> no exist");
                var showcasePlayer;
            };*/
            //var oldPlayer = document.getElementById('my-player');
            //videojs(oldPlayer).dispose();
            //oldPlayer.dispose();

            //var getPlayers = getPlayers();
            //console.info('getPlayers' + getPlayers);


            // getPlayers() returns an object containing all players, not a player.
            //var showcasePlayer = videojs('videme-v3-player', opions, function () { // TODO: this -> videme-showcase-video
            /*videojs.Hls.xhr.beforeRequest = function (opions) {
                console.log('before XHR Call');
                opions.headers = {
                    "Access-Control-Allow-Origin": "*",
                };
                console.log('before XHR Call opions ' + JSON.stringify(opions));
                return opions;
            };*/
            require(['videojs', 'videojs-vtt-thumbnails', 'videojs-hls-quality-selector', 'videojs-overlay.min', 'videojs-playlist'], function(videojs) {
                //require(['video.js', 'videojs-vtt-thumbnails', 'videojs-hls-quality-selector', 'videojs-overlay.min'], function(videojs, thumbnails, selector, overlay) {
                //require(['video.js', 'videojs-vtt-thumbnails', 'videojs-hls-quality-selector'], function(videojs) {
                //console.info('showcasePlayer overlay' + JSON.stringify(overlay));

                var showcasePlayer = videojs('my-player', opions, function () { // TODO: this -> videme-showcase-video
                    //var showcasePlayer = videojs('my-player',{plugins:{thumbnails:{width:120,height:90}}});
                    //showcasePlayer = videojs('my-player', opions, function () { // TODO: this -> videme-showcase-video
                    //var showcasePlayer = videojs('my-player', {}, function () { // TODO: this -> videme-showcase-video
                    //showcasePlayer = videojs('videme-v3-player', opions, function () { // TODO: this -> videme-showcase-video
                    //var showcasePlayer = videojs('my-player333', opions, function onPlayerReady() {

                    console.info('showcasePlayer opions' + JSON.stringify(opions));
                    //console.info('showcaseVideoV3Static videojs' + showcasePlayer);
                    //videojs.log('showcaseVideoV3Static videojs ' + showcasePlayer);

                    //var showcasePlayerFunc = this;
                    showcasePlayerFunc = this;
                    //showcasePlayerFunc.vttThumbnails(); // <--- magic 07032022
                    /*showcasePlayerFunc.xhr({
                        //body: someJSONString,
                        body: '',
                        //uri: "/foo",
                        uri: origin_video_vide_me,
                        headers: {
                            "Access-Control-Allow-Origin": "*"
                        }
                    }, function (err, resp, body) {
                        // check resp.statusCode
                    });*/
                    //showcasePlayerFunc.dispose();
                    //resizeVideoJS(showcasePlayerFunc); // TODO: Remove ?

                    //if (showcaseVideoV3StaticSettings.messageid.length > 0) {
                    if (showcaseVideoV3StaticSettings.message_id && showcaseVideoV3StaticSettings.message_id != "undefined") {
                        messageAdd = "&messageid=" + showcaseVideoV3StaticSettings.message_id;
                    } else {
                        messageAdd = "";
                    }

                    /*showcasePlayerFunc.src({
                        //type: "video/mp4",
                        type: "application/x-mpegURL",
                        //src: sourseURL + showcaseVideoV3StaticSettings.file + messageAdd
                        //src: sourseURL + showcaseVideoV3StaticSettings.video + '.mp4' // TODO: add message_id
                        src: sourseURL + showcaseVideoV3StaticSettings.video + '.m3u8' // TODO: add message_id
                    });
                    if (!$.isEmptyObject(showcaseVideoV3StaticSettings.src)) {
                        console.log("$.fn.showcaseVideo showcaseVideoV3StaticSettings.src value -----> " + JSON.stringify(showcaseVideoV3StaticSettings.src));
                        //source_src += "<source src=\"" + sourseURL + showcaseVideoV3StaticSettings.video + "\" type=\"video/mp4\">";
                        $.each(showcaseVideoV3StaticSettings.src, function (key, value) {
                            console.log("$.fn.showcaseVideo showcaseVideoV3StaticSettings.src each value -----> " + value);
                            //console.log("$.fn.showPopTags data.tags -----> cnt: " + value.cnt + " tag " + value.tag);
                            //console.log("$.fn.showPopTags each value -----> " + JSON.stringify(value));
                            //source_src += "<source src=\"" + value + "\" type=\"video/mp4\">";
                            showcasePlayerFunc.src({
                                type: "video/mp4",
                                //type: "application/x-mpegURL",
                                //src: sourseURL + showcaseVideoV3StaticSettings.file + messageAdd
                                //src: sourseURL + showcaseVideoV3StaticSettings.video + '.mp4' // TODO: add message_id
                                src: sourseURL + value
                            });
                        });
                    }*/

                    //var src_array = [];

                    //video_player.src(JSON.stringify(src_array));
                    /***************************************************/
                    //=showcasePlayerFunc.pause();
                    //var new_url = $(this).attr("data-url");
                    //showcasePlayerFunc.src(new_url);
                    // set src track corresponding to new movie //

                    //v22showcasePlayerFunc.src(src_array);
                    /*showcasePlayerFunc.pause();
                    //var attr = $(this).getAttributes();
                    //var new_url = 'https://s3.amazonaws.com/video.vide.me/' + $(this).attr("item_id") + '.m3u8';
                    //var new_url = 'https://s3.amazonaws.com/video.vide.me/' + attr.item_id + '.m3u8';
                    //player.src(new_url);
                    showcasePlayerFunc.reset();
                    /!*v33 **************************************************!/
                    showcasePlayerFunc.poster(img);
                    showcasePlayerFunc.src(src_array);
                    // set src track corresponding to new movie //
                    showcasePlayerFunc.load();
                    showcasePlayerFunc.play();*/
                    //videme_video_player.videmeVideoPlayerBuild(videmeVideoPlayerPropertiesTrue);
                    /*v33 **************************************************/

                    //this.src(src_array);
                    /***************************************************/
                    //=showcasePlayerFunc.load();
                    //=showcasePlayerFunc.play();
                    /***************************************************/

                    //showcasePlayerFunc.controls(true);
                    //this.controls(true);
                    //showcasePlayerFunc.on('playing', function () {
                    /* play list start ************************************************/

                    let videmeCurrentShocaseItem = 0;
                    let list_array_items = [];
                    console.log('url: ' + JSON.stringify(url));
                    if (url.list) {
                        //console.log('url.list: ' + url.list);
                        list = url.list;
                        let list_array = [];
                        let list_array_json = [];

                        //$.getJSON("https://api.vide.me/v2/posts/shownext/?prev_item_id=&next_item_id=8e6a132ded8c&limit=16",
                        $.getJSON("https://api.vide.me/v2/list/get_list_details/?list=" + list,

                                function (jsonData) {
                                //console.log("list data -----> " + JSON.stringify(jsonData));
                                if (!$.isEmptyObject(jsonData)) {
                                    //list_array_json = jsonData;
                                    //let list_array = [];
                                    //let items_array = [];
                                    //let items_array = {};
                                    //let prop_true = [];
                                    //$.each(jsonData, function (key, value) {
                                    let items_array = jsonData.items_array;
                                    let list_details = jsonData.list;
                                    //console.log("list items_array -----> " + JSON.stringify(items_array));
                                    //console.log("list list_details -----> " + JSON.stringify(list_details));
                                    $.each(items_array, function (key, value) {
                                        //console.log("items_array each value -----> " + JSON.stringify(value));
                                        let src_array2 = [];
                                        //let src_array4 = [];
                                        src_array2.push({
                                            type: "application/x-mpegURL",
                                            src: origin_video_vide_me + value.item_id + '.m3u8',
                                        });
                                        if (!$.isEmptyObject(value.src)) {
                                            //console.log("list each value.src -----> " + JSON.stringify(value.src));
                                            //let temp_array3 = value.src;
                                            //let temp_array4 = temp_array3.replace(/\\/g, '');
                                            //let temp_array4 = temp_array3.replace(/\\/g, '');
                                            //let temp_array4 = temp_array3.replace(/(^|[^\\])"/g, '\'');
                                            //let temp_array4 = value.src.replace(/\"/g, '\'');
                                            //let temp_array4 = $.parseJSON(value.src.replace(/\"/g, '\''));
                                            let temp_array4 = $.parseJSON(value.src.replaceAll("^\"|\"$", ""));
                                            //console.log("list temp_array4 -----> " + JSON.stringify(temp_array4));
                                            //console.log("list value.src -----> " + JSON.stringify(value.src));
                                            $.each(temp_array4, function (key2, value2) {
                                                src_array2.push({
                                                    type: "video/mp4",
                                                    src: origin_video_vide_me + value2
                                                });

                                            });
                                            //console.log("src_array2 -----> " + JSON.stringify(src_array2));
                                        }
                                        videmeVideoPlayerProperties = videme_video_player.videmeVideoPlayer_set_options(value);
                                        //let list_array_item = {'sources': src_array2, 'poster': origin_img_vide_me + value.item_id};
                                        let list_array_item = {'sources': videmeVideoPlayerProperties.src, 'poster': origin_img_vide_me + value.item_id};
                                        list_array.push(list_array_item);
                                        list_array_items.push(value.item_id);
                                        list_array_json.push(value);
                                    });
                                    //console.log("list list_array -----> " + JSON.stringify(list_array));
                                    //console.log("list list_array_items -----> " + JSON.stringify(list_array_items));
                                    showcasePlayerFunc.playlist(list_array);
                                    //showcasePlayerFunc.playlist.autoplay(true);
                                    showcasePlayerFunc.playlist.autoadvance(0);
                                    showcasePlayerFunc.playlist.repeat(true);
                                    if (url.index) {
                                        if (url.index <= list_array.length) {
                                            videmeCurrentShocaseItem = url.index;
                                        } else {
                                            videmeCurrentShocaseItem = list_array.length;
                                        }
                                    }
                                    /* playlist panel start ******************************************************************/
                                    let tempObject = $('#videme-shownext-tile');
                                    //tempObject.html(showListMedia(parseDataArrayToObject(jsonData)));
                                    //tempObject.html(showListMedia(parseDataArrayToObject(items_array)));
                                    tempObject.html(showListMediaForPlayer(parseDataArrayToObject(items_array), list_details));
                                    videme_video_player.videmeVideoPlayer_overlay(showcaseVideoV3StaticSettings);

                                    /* playlist panel stop ********************************************************************/
                                    /*videmeCurrentShocaseItem = showcasePlayerFunc.playlist.currentItem();
                                    //console.log('url.index -----> ' + url.index);
                                    if (url.index){
                                        showcasePlayerFunc.playlist.currentItem(url.index);
                                    }*/
                                    /*************************************************************
                                     Nas  Press
                                     **************************************************************/
                                    /*$(document).on('click', '.videme-list-media-li', function (event) {
                                        console.log(".videme-list-media-li in getjson -----> click");
                                        event.preventDefault();
                                        var $this = $(this);
                                        let playlist_number = $this.attr('data-videme-playlist-number');
                                        console.log(".videme-list-media-li in getjson data-videme-playlist-number -----> " + playlist_number);
                                        //showcasePlayerFunc.playlist.currentItem(3);
                                    });*/
                                } else {
                                    //tempObject.parent().hide("slow");
                                    console.log("list_array getJSON -----> no data");
                                }
                            })
                            .done(function (data) {
                            })
                            .fail(function (data) {
                                //tempObject.html("...");
                            })
                            .always(function () {
                            });
                        //} else {
                        //    console.log('list: empty');
                        //}

                        //player.playlist(list_array);
                        //player.playlist.autoadvance(0);
                        /* playlist end *********************************************/
                        /* Test hlsQualitySelector ********************************************************************************/
                        /*player.hlsQualitySelector({
                            displayCurrentQuality: true,
                        });*/
                        /* Test hlsQualitySelector ********************************************************************************/
                        /*************************************************************
                         Nas  Press
                         **************************************************************/
                        $(document).on('click', '.videme-list-media-li', function (event) {
                            //console.log(".videme-list-media-li out getjson -----> click");
                            event.preventDefault();
                            var $this = $(this);
                            let playlist_number = parseInt($this.attr('data-videme-playlist-number'));
                            console.log(".videme-list-media-li out getjson data-videme-playlist-number -----> " + playlist_number);
                            showcasePlayerFunc.playlist.currentItem(playlist_number);
                        });

//let videmeCurrentShocaseItem = player.playlist.currentItem();
//console.log('url.index ' + url.index);
//player.currentItem(url.index);

                        /***************************************/
                        var Button = videojs.getComponent('Button');
                        /*var MyButton = videojs.extend(Button, {
                            constructor: function() {
                                Button.apply(this, arguments);
                                /!* initialize your button *!/
                                console.log('initialize your button');
                            },
                            handleClick: function() {
                                /!* do something on click *!/
                                console.log('do something on click');
                            }
                        });
                        videojs.registerComponent('MyButton', MyButton);
                        showcasePlayerFunc.getChild('controlBar').addChild('myButton', {});*/
                        /***************************************/


                        /*var closeButton = videojs.extend(Button, {
                            constructor: function() {
                                Button.apply(this, arguments);
                                this.controlText("Exit Course");
                                this.addClass('vjs-icon-cancel');
                            },
                            handleClick: function() {
                                console.log('player handleClick dispose');
                                this.player().dispose();
                            }
                        });*/

                        var nextItemButton = videojs.extend(Button, {
                            constructor: function() {
                                Button.apply(this, arguments);
                                this.controlText("Next item");
                                this.addClass('vjs-icon-next-item');
                            },
                            handleClick: function() {
                                showcasePlayerFunc.playlist.next();
                                console.log('player handleClick playlist.next');
                            }
                        });

                        var prevItemButton = videojs.extend(Button, {
                            constructor: function() {
                                Button.apply(this, arguments);
                                this.controlText("Prev item");
                                this.addClass('vjs-icon-previous-item');
                            },
                            handleClick: function() {
                                showcasePlayerFunc.playlist.previous();
                                console.log('player handleClick playlist.previous');
                            }
                        });

                        //videojs.registerComponent('closeButton', closeButton);
                        videojs.registerComponent('nextItemButton', nextItemButton);
                        videojs.registerComponent('prevItemButton', prevItemButton);
                        //showcasePlayerFunc.getChild('controlBar').addChild('closeButton', {}, 3);
                        showcasePlayerFunc.getChild('controlBar').addChild('prevItemButton', {}, 0);
                        showcasePlayerFunc.getChild('controlBar').addChild('nextItemButton', {}, 2);
                        /***************************************/
//player.controlBar.el().insertBefore(button.el(), player.controlBar.el().firstChild);
//this.controlBar.el().appendChild(nextButton.el());
                        /***************************************/
                        /*player.vttThumbnails({
                            //src: 'https://s3.amazonaws.com/vtt-w120.vide.me/' + showcaseVideoV3StaticSettings.item_id + '-spr-w120.vtt'
                            src: 'https://sprite-w120.rate-my.life/c5d7f04248a7-spr-w120.vtt'
                        });*/

                        /***************************************/

                        showcasePlayerFunc.on('playlistitem', function(){
                            //console.log( 'player.playlist.currentItem ---> ');
                            //videmeCurrentShocaseItem = showcasePlayerFunc.playlist.currentItem();
                            //videojs.log('showcasePlayerFunc.on(playlistitem ' + this.currentSrc());
                            /*showcasePlayerFunc.vttThumbnails({
                                //src: 'https://s3.amazonaws.com/vtt-w120.vide.me/' + showcaseVideoV3StaticSettings.item_id + '-spr-w120.vtt'
                                src: origin_sprite_w120_vide_me +  list_array_items[showcasePlayerFunc.playlist.currentItem()] + '-spr-w120.vtt'
                            });*/
                            updateShowcaseItemInfo(this);
                            //videme_video_player.videmeVideoPlayer_overlay2();
                            videmeVideoPlayer_overlay2();
                        });
                        //player.next();

                        //showcasePlayerFunc.poster();
                        //showcasePlayerFunc.load();
                        //showcasePlayerFunc.play();
                        showcasePlayerFunc.on('play', function () {
                            console.info('showcaseVideoV3Static showcasePlayerFunc.on playing');
                            videojs.log('showcaseVideoV3Static play ' + this.currentSrc());
                        });
                        /*player.next();*/


                        function updateShowcaseItemInfo(showcasePlayerFunc2) {
                            console.log('function updateShowcaseItemInfo videmeCurrentShocaseItem: ' + videmeCurrentShocaseItem + ' showcasePlayerFunc.playlist.currentItem: ' + showcasePlayerFunc.playlist.currentItem());
                            //console.log('function updateShowcaseItemInfo list_array_items videmeCurrentShocaseItem: ' + list_array_items[videmeCurrentShocaseItem] + ' currentItem: ' + player.playlist.currentItem());
                            console.log('function updateShowcaseItemInfo list_array: ' + JSON.stringify(list_array));
                            console.log('function updateShowcaseItemInfo list array json: ' + JSON.stringify(list_array_json));
                            /*showcasePlayerFunc.poster(list_array[showcasePlayerFunc.playlist.currentItem()]['poster']);
                            showcasePlayerFunc.load();
                            showcasePlayerFunc.play();
                            showcasePlayerFunc.on('play', function () {
                                console.info('showcaseVideoV3Static showcasePlayerFunc.on playing');
                                videojs.log('showcaseVideoV3Static play ' + this.currentSrc());
                            });*/
                            if (videmeCurrentShocaseItem !== showcasePlayerFunc2.playlist.currentItem()) {

                                $('.videme-ralation-card-small').html('');
                            }

                            $.getJSON("https://api.vide.me/v2/items/info/?item_id=" + list_array_items[showcasePlayerFunc2.playlist.currentItem()],
                                function (jsonData) {
                                    //console.log("list data -----> " + JSON.stringify(jsonData));
                                    if (!$.isEmptyObject(jsonData)) {
                                        console.log('function updateShowcaseItemInfo getJSON jsonData: ' + JSON.stringify(jsonData));
                                        //$.fn.showcaseUserPicture(jsonData); // TODO: why for?
                                        $.fn.showcaseTagsConfCountIcon(jsonData); // TODO: add trueItemInfo.user_tags_conf_new (not orking)
                                        $.fn.showcaseText(jsonData);
                                        titleUpdate(jsonData);
                                        URLUpdate('index', showcasePlayerFunc.playlist.currentItem());
                                        activeLiSelect('videme-list-media-li', list_array_items[showcasePlayerFunc2.playlist.currentItem()]);
                                        //$.fn.showcaseUserInfo(showcaseVideoTextButtonSettings);
                                        //$.fn.showcaseText(showcaseVideoTextButtonSettings); // TODO: why?
                                        $(".videme_showcase_item_info").html(showItemInfoShowcase(jsonData));
                                        //$.fn.showcaseStarsV3(showcaseVideoTextButtonSettings);
                                        $.fn.showcaseFollow(jsonData);
                                        //$.fn.showcaseLikes(showcaseVideoTextButtonSettings);
                                        //==$.fn.showcaseReposts(showcaseVideoTextButtonSettings); // TODO: return
                                        //$.fn.showcaseShare(showcaseVideoTextButtonSettings);
                                        //$.fn.showcaseTags(showcaseVideoTextButtonSettings);
                                        $.fn.showItemTagsUsers(jsonData);
                                        $.fn.showItemPartnersUsers(jsonData);
                                        $.fn.showItemPartnerSign(jsonData);
                                        $('.show_comment_showcase').attr('item_id', jsonData.item_id);
                                        $('.show_action_button_showcase').html(showDropdownForDoorbelSignV3(jsonData));
                                        videme_video_player.videmeVideoPlayerBuild(jsonData);
                                        videme_video_player.videmeVideoPlayer_vttThumbnails(jsonData);
                                        /*showcasePlayerFunc.vttThumbnails({
                                            //src: 'https://s3.amazonaws.com/vtt-w120.vide.me/' + showcaseVideoV3StaticSettings.item_id + '-spr-w120.vtt'
                                            src: origin_sprite_w120_vide_me + jsonData.item_id + '-spr-w120.vtt'
                                        });*/
                                        //videme_video_player.videmeVideoPlayerBuild(jsonData);
                                    } else {
                                        //tempObject.parent().hide("slow");
                                        console.log("list_array getJSON -----> no data");
                                    }
                                })
                                .done(function (data) {
                                })
                                .fail(function (data) {
                                    //tempObject.html("...");
                                })
                                .always(function () {
                                });
                        }
                        function videmeVideoPlayer_overlay2() {
                            console.log("videme_video_player.js videmeVideoPlayer_overlay2 -----> " );
                            if (!$.isEmptyObject(list)) {
                                console.log("videme_video_player.js videmeVideoPlayer_overlay2 list NOT EMPTY");

                                overlay_content = '<div class="test3">' + embed_text_overlay_next(list_array_json[showcasePlayerFunc.playlist.currentItem()]) + '</div>';
                                //$('#showcaseNext').data('showcase_next_item', jsonData[0]);
                                //var overlay_content = jsonData[0].item_id;
                                //console.log("jQuery.showcaseVideoV3Static overlay_content -----> " + overlay_content);

                                //var overlay_content = 'Vide.me';
                                //showcasePlayerFunc.overlay({
                                /*define([ 'videojs-overlay.min' ], function( overlay ){*/

                                showcasePlayerFunc.overlay({
                                    content: '',
                                    overlays: [{
                                        start: 'end',
                                        content: overlay_content,
                                        //content: 'vide.me ',
                                        //end: 'playing',
                                        end: 10,
                                        align: 'bottom-left',
                                        showBackground: false
                                    }, {
                                        start: 'pause',
                                        //start: 3,
                                        //start: 'end',
                                        content: overlay_content,
                                        end: 'playing',
                                        //end: 1,
                                        align: 'bottom-left',
                                        showBackground: false
                                    }]
                                });
                            } else {

                            }
                        }
                    } else {
                        console.log('list: empty');
                    }
                    /* play list start ************************************************/

                    videme_video_player.videmeVideoPlayerBuild(showcaseVideoV3StaticSettings);
                    showcasePlayerFunc.on('play', function () {
                        //console.info('showcaseVideoV3Static showcasePlayerFunc.on playing');
                        videojs.log('showcaseVideoV3Static play ' + this.currentSrc());
                        //this.on('playing', function () {
                        //goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + showcaseVideoV3StaticSettings.video + '&title=' + showcaseVideoV3StaticSettings.title + '&user_display_name=' + showcaseVideoV3StaticSettings.user_display_name + '&spring=' + showcaseVideoV3StaticSettings.spring + '&user_picture=' + showcaseVideoV3StaticSettings.user_picture + '&type_item=video');
                        //==goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + showcaseVideoV3StaticSettings.video + "&nad=" + $.cookie('vide_nad'));
                        item_count_add(showcaseVideoV3StaticSettings.video);
                    });
                    /*this.on('playing', function () {
                        console.info('showcaseVideoV3Static showcasePlayerFunc.on playing');
                        videojs.log('showcaseVideoV3Static play ');

                        //this.on('playing', function () {
                        //goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + showcaseVideoV3StaticSettings.video + '&title=' + showcaseVideoV3StaticSettings.title + '&user_display_name=' + showcaseVideoV3StaticSettings.user_display_name + '&spring=' + showcaseVideoV3StaticSettings.spring + '&user_picture=' + showcaseVideoV3StaticSettings.user_picture + '&type_item=video');
                        goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + showcaseVideoV3StaticSettings.video + "&nad=" + $.cookie('vide_nad'));
                    });*/
                    showcasePlayerFunc.on('ended', function () {
                        //this.on('ended', function () {
                        videojs.log('end');
                        //if (list) countdownShowcase(showcaseVideoV3StaticSettings);
                        if ($.isEmptyObject(list)) {
                            countdownShowcase(showcaseVideoV3StaticSettings);
                        } else {

                        }
                        });
                    //showcasePlayerFunc.controls(true);
                    //showcasePlayerFunc.load();
                    //this.load();
                    //showcasePlayerFunc.play();
                    //this.play();
                    showcasePlayerFunc.on('ended', function () {
                        //this.on('ended', function () {
                        /*
                         showcasePlayerFunc.src({
                         type: "video/mp4",
                         src: "https://r7.cf1.rackcdn.com/.mp4"
                         });
                         showcasePlayerFunc.load();
                         showcasePlayerFunc.play();*/
                    });

                    //define([ 'videojs-overlay.min' ], function( overlay ){
                    /*require([ 'videojs-overlay.min' ], function( overlay ){
                        //showcasePlayer.overlay = overlay;*/
                    /*showcasePlayer.overlay({
                        overlays: [{
                            start: 'loadstart',
                            //content: overlay_content,
                            content: 'vide.me',
                            //end: 'playing',
                            end: 3,
                            align: 'tor-left',
                            showBackground: false
                        }, {
                            start: 'pause',
                            content: 'overlay_content',
                            //end: 'playing',
                            end: 3,
                            align: 'top-left',
                            showBackground: false
                        }]
                    });*/
                    //});
                    //showcasePlayer.hlsQualitySelector();
                    /* Test hlsQualitySelector ********************************************************************************/
                    //showcasePlayer.hlsQualitySelector({
                    showcasePlayerFunc.hlsQualitySelector({
                        displayCurrentQuality: true,
                    });
                    /* Test hlsQualitySelector ********************************************************************************/
                    /* Test vttThumbnails. on seeking bar **********************************************************************************/
                    /*if (!$.isEmptyObject(showcaseVideoV3StaticSettings.vtt_w120)) {
                        //console.log("showcaseVideoV3Static showcaseVideoV3StaticSettings.vtt_w120 -----> " + showcaseVideoV3StaticSettings.vtt_w120);
                        //showcasePlayer.vttThumbnails({
                        showcasePlayerFunc.vttThumbnails({
                            //src: 'https://s3.amazonaws.com/vtt-w120.vide.me/' + showcaseVideoV3StaticSettings.item_id + '-spr-w120.vtt'
                            src: origin_sprite_w120_vide_me + showcaseVideoV3StaticSettings.item_id + '-spr-w120.vtt'
                        });
                        //showcasePlayerFunc.vttThumbnails();
                    }*/
                    videme_video_player.videmeVideoPlayer_vttThumbnails(showcaseVideoV3StaticSettings);
                    /* Test vttThumbnails. on seeking bar **********************************************************************************/
                });

                //LoadProgressBar(showcasePlayerFunc, {});

                /*showcasePlayer.hlsQualitySelector({
                    displayCurrentQuality: true,
                });*/

                /* Test prev. on seeking bar **********************************************************************************/
                if (!$.isEmptyObject(showcaseVideoV3StaticSettings.seek_srcZZZ)) {
                    console.log("showcaseVideoV3Static showcaseVideoV3StaticSettings.seek_src -----> " + showcaseVideoV3StaticSettings.seek_src);
                    /*showcasePlayer.thumbnails({
                        0: {
                            src: showcaseVideoV3StaticSettings.seek_src,
                            style: {
                                left: '-60px',
                                width: '600px',
                                height: '68px',
                                clip: 'rect(0, 120px, 68px, 0)'
                            }
                        },
                        10: {
                            style: {
                                left: '-180px',
                                clip: 'rect(0, 240px, 68px, 120px)'
                            }
                        },
                        20: {
                            style: {
                                left: '-300px',
                                clip: 'rect(0, 360px, 68px, 240px)'
                            }
                        },
                        30: {
                            style: {
                                left: '-420px',
                                clip: 'rect(0, 480px, 68px, 360px)'
                            }
                        },
                        40: {
                            style: {
                                left: '-540px',
                                clip: 'rect(0, 600px, 68px, 480px)'
                            }
                        }
                    });*/
                }
                /* Test prev. on seeking bar **********************************************************************************/
videme_video_player.videmeVideoPlayer_overlay(showcaseVideoV3StaticSettings);


            });

            $(window).resize(function () {
                //resizeVideoJS(showcasePlayer); // TODO: Remove ?
            });
            //console.log("$.fn.showcaseVideoV3Static showcaseVideoV3StaticSettings.miniVideo -----> " + showcaseVideoV3StaticSettings.miniVideo);

            /*if (showcaseVideoV3StaticSettings.miniVideo) {
                $("#videme-minivideo").html("<video id=\"my_video2\" class=\"video-js vjs-default-skin video-down\"></video> \
                    <button id=\"closevideo\" type=\"button\" class=\"close closevideo hidden\" aria-label=\"Close\"> \
                        <span aria-hidden=\"true\">&times;</span> \
                    </button> \
                ");
                var oldMiniPlayer = document.getElementById('my_video2');
                videojs(oldMiniPlayer).dispose();
                console.log("$.fn.showcaseVideo showcaseVideoV3StaticSettings.file -----> " + showcaseVideoV3StaticSettings.video);
                $("#videme-minivideo").html("<video id=\"my_video2\" class=\"video-js vjs-default-skin video-down\"></video> \
                    <button id=\"closevideo\" type=\"button\" class=\"close closevideo hidden\" aria-label=\"Close\"> \
                        <span aria-hidden=\"true\">&times;</span> \
                    </button> \
                ");
                var miniPlayer = videojs('my_video2', {
                    /!* Options *!/
                }, function () {
                    var miniPlayerFunc = this;
                    scrollSetting(miniPlayerFunc);
                    //miniPlayer.hide();
                    miniPlayerFunc.muted(true);
                    //miniPlayerFunc.src({type: "video/mp4", src: sourseURL + showcaseVideoV3StaticSettings.file});
                    //miniPlayerFunc.src({type: "video/mp4", src: sourseURL + showcaseVideoV3StaticSettings.video + '.mp4'});
                    miniPlayerFunc.src({
                        type: "application/x-mpegURL",
                        src: sourseURL + showcaseVideoV3StaticSettings.video + '.m3u8'
                    });
                    miniPlayerFunc.load();
                    miniPlayerFunc.play();
                    miniPlayerFunc.on('ended', function () {
                        /!*
                         miniPlayerFunc.src({
                         type: "video/mp4",
                         src: "https://r7.cf1.rackcdn.com/.mp4"
                         });
                         miniPlayerFunc.load();
                         miniPlayerFunc.play();*!/
                    });
                });
                showcasePlayer.on('pause', function () {
                    checkPausePlay(showcasePlayer);
                });
                showcasePlayer.on('play', function () {
                    checkPausePlay(showcasePlayer);
                });
                showcasePlayer.on('seeked', function () {
                    miniPlayer.currentTime(showcasePlayer.currentTime());
                });
                $(window).scroll(function () {
                    scrollSetting(miniPlayer);
                });
            } else {
                console.log("$.fn.showcaseVideo -----> no miniVideo");
            }*/

            function checkPausePlay(myPlayer) {
                var isPaused = myPlayer.paused();
                var time_video = myPlayer.currentTime();
                if (isPaused === true) {
                    console.log('Pause' + time_video);
                    miniPlayer.pause();
                } else {
                    miniPlayer.play();
                }
            }

            function resizeVideoJS(myPlayer) { // TODO: Их два тут 3
                // TODO: На как-то так $(this).parent().width()
                var width = document.getElementById(myPlayer.id()).parentElement.offsetWidth;
                myPlayer.width(width).height(width * (360 / 640));
            }

            function scrollSetting(miniPlayer) {
                if ($(window).scrollTop() > 100) {
                    $("#closevideo").removeClass('hidden');
                    miniPlayer.show();
                } else {
                    $("#closevideo").addClass('hidden');
                    // $( \"video-down\" ).addClass(\"my_video_hidden\");
                    miniPlayer.hide();
                }
            }

        },
        videmeVideoPlayer_vttThumbnails: function (showcaseVideoV3StaticSettings) {
            //console.log("videme_video_player.js videmeVideoPlayer_vttThumbnails showcaseVideoV3StaticSettings.vtt_w120 -----> " + showcaseVideoV3StaticSettings.vtt_w120);
            //console.log("videme_video_player.js videmeVideoPlayer_vttThumbnails showcaseVideoV3StaticSettings.item_id -----> " + showcaseVideoV3StaticSettings.item_id);
            //console.log("videme_video_player.js videmeVideoPlayer_vttThumbnails showcaseVideoV3StaticSettings -----> " + JSON.stringify(showcaseVideoV3StaticSettings));

            if (!$.isEmptyObject(showcaseVideoV3StaticSettings.vtt_w120)) {
                console.log("videme_video_player.js videmeVideoPlayer_vttThumbnails showcaseVideoV3StaticSettings.vtt_w120 -----> true");
                vtt_w120URL = origin_sprite_w120_vide_me + showcaseVideoV3StaticSettings.item_id + '-spr-w120.vtt';
                //console.log("showcaseVideoV3Static showcaseVideoV3StaticSettings.vtt_w120 -----> " + showcaseVideoV3StaticSettings.vtt_w120);
                //showcasePlayer.vttThumbnails({
            } else {
                console.log("videme_video_player.js videmeVideoPlayer_vttThumbnails showcaseVideoV3StaticSettings.vtt_w120 -----> false");
                vtt_w120URL = '';
            }
            if (typeof showcasePlayerFunc.vttThumbnails !== 'undefined' && $.isFunction(showcasePlayerFunc.vttThumbnails)) {
                console.log("videme_video_player.js videmeVideoPlayer_vttThumbnails exist");
                showcasePlayerFunc.vttThumbnails({
                    //src: 'https://s3.amazonaws.com/vtt-w120.vide.me/' + showcaseVideoV3StaticSettings.item_id + '-spr-w120.vtt'
                    src: vtt_w120URL
                });
            } else {
                console.log("videme_video_player.js videmeVideoPlayer_vttThumbnails NOT exist");
                //showcasePlayerFunc.vttThumbnails();
                showcasePlayerFunc.vttThumbnails.src(vtt_w120URL);
            }
        },
        videmeVideoPlayerBuild: function (showcaseVideoV3StaticSettings) {
            //console.log("videme_video_player.js videmeVideoPlayerBuild showcaseVideoV3StaticSettings -----> " + JSON.stringify(showcaseVideoV3StaticSettings));
            videmeVideoPlayerPropertiesTrue = videme_video_player.videmeVideoPlayer_set_options(showcaseVideoV3StaticSettings);

            showcasePlayerFunc.pause();
            //var attr = $(this).getAttributes();
            //var new_url = 'https://s3.amazonaws.com/video.vide.me/' + $(this).attr("item_id") + '.m3u8';
            //var new_url = 'https://s3.amazonaws.com/video.vide.me/' + attr.item_id + '.m3u8';
            //player.src(new_url);
            showcasePlayerFunc.reset();
            showcasePlayerFunc.controls(true);
            /*v33 **************************************************/
            showcasePlayerFunc.poster(videmeVideoPlayerPropertiesTrue.img);
            //showcasePlayerFunc.src(videmeVideoPlayerPropertiesTrue.src_array);
            showcasePlayerFunc.src(videmeVideoPlayerPropertiesTrue.src);
            // set src track corresponding to new movie //
            showcasePlayerFunc.load();
            showcasePlayerFunc.play();
        },
        videmeVideoPlayer_set_options: function (showcaseVideoV3StaticSettings) {
            //console.log("videme_video_player.js videmeVideoPlayer_set_options showcaseVideoV3StaticSettings -----> " + JSON.stringify(showcaseVideoV3StaticSettings));
            if (!$.isEmptyObject(showcaseVideoV3StaticSettings.cover)) {
                videmeVideoPlayerProperties.img = origin_img_vide_me + showcaseVideoV3StaticSettings.cover;
            } else {
                videmeVideoPlayerProperties.img = origin_img_vide_me + showcaseVideoV3StaticSettings.item_id + ".jpg";
            }

            /*videmeVideoPlayerProperties.src_array = []; 08032022
            //src_array.push({
            videmeVideoPlayerProperties.src_array.push({
                type: "application/x-mpegURL",
                src: origin_video_vide_me + showcaseVideoV3StaticSettings.video + '.m3u8', // TODO: add message_id
            });*/

            /*video_player.src({
                type: "application/x-mpegURL",
                //src: 'https://s3.amazonaws.com/video.vide.me/' + value.item_id + '.m3u8', // TODO: add message_id
                src: 'https://s3.amazonaws.com/video.vide.me/' + item_video + '.m3u8', // TODO: add message_id
            });*/
            //video_player.src(src_array);
            /*if (!$.isEmptyObject(showcaseVideoV3StaticSettings.src)) { // DRY array from HTML
                //console.log("showcaseVideo value.src -----> " + JSON.stringify(showcaseVideoV3StaticSettings.src));
                //var array_src = [];
                //array_src = $.parseJSON(showcaseVideoV3StaticSettings.src);
                //console.log("showcaseVideoV3StaticSettings.src array_src -----> " + JSON.stringify(array_src));
                //source_src += "<source src=\"" + sourseURL + showcaseVideoV3StaticSettings.video + "\" type=\"video/mp4\">";

                $.each(showcaseVideoV3StaticSettings.src, function (key, value) {
                    //console.log("showcaseVideoV3StaticSettings.src each value -----> " + value);
                    //source_src += "<source src=\"" + value + "\" type=\"video/mp4\">";
                    /!*video_player.src({
                        type: "video/mp4",
                        //type: "application/x-mpegURL",
                        //src: sourseURL + showcaseVideoV3StaticSettings.file + messageAdd
                        //src: sourseURL + showcaseVideoV3StaticSettings.video + '.mp4' // TODO: add message_id
                        src: 'https://s3.amazonaws.com/video.vide.me/' + value
                    });*!/
                    //src_array.push({
                    videmeVideoPlayerProperties.src_array.push({
                        type: "video/mp4",
                        src: origin_video_vide_me + value
                    });

                });
            }*/
            videmeVideoPlayerProperties.src = [];
            //let src_array4 = [];
            videmeVideoPlayerProperties.src.push({
                type: "application/x-mpegURL",
                src: origin_video_vide_me + showcaseVideoV3StaticSettings.item_id + '.m3u8',
            });
            if (!$.isEmptyObject(showcaseVideoV3StaticSettings.src)) { // raw array from base
                //console.log("list videme_video_player.js videmeVideoPlayer_set_options videmeVideoPlayerProperties showcaseVideoV3StaticSettings.src -----> " + JSON.stringify(showcaseVideoV3StaticSettings.src));
                //let temp_array3 = value.src;
                //let temp_array4 = temp_array3.replace(/\\/g, '');
                //let temp_array4 = temp_array3.replace(/\\/g, '');
                //let temp_array4 = temp_array3.replace(/(^|[^\\])"/g, '\'');
                //let temp_array4 = value.src.replace(/\"/g, '\'');
                //let temp_array4 = $.parseJSON(value.src.replace(/\"/g, '\''));
                //let temp_val = '';
                //temp_val = $.parseJSON(showcaseVideoV3StaticSettings.src);
                let temp_array4 = [];

                if (!$.isArray(showcaseVideoV3StaticSettings.src)) {
                    //console.log("list videme_video_player.js videmeVideoPlayer_set_options showcaseVideoV3StaticSettings.src NOT array -----> " + JSON.stringify(showcaseVideoV3StaticSettings.src));
                    temp_array4 = $.parseJSON(showcaseVideoV3StaticSettings.src.replaceAll("^\"|\"$", ""));
                } else {
                    //console.log("list videme_video_player.js videmeVideoPlayer_set_options showcaseVideoV3StaticSettings.src YES array -----> " + JSON.stringify(showcaseVideoV3StaticSettings.src));
                    temp_array4 = showcaseVideoV3StaticSettings.src;
                }
                //console.log("list videme_video_player.js videmeVideoPlayer_set_options temp_array4 -----> " + JSON.stringify(temp_array4));

                //console.log("list temp_array4 -----> " + JSON.stringify(temp_array4));
                //console.log("list value.src -----> " + JSON.stringify(value.src));
                $.each(temp_array4, function (key2, value2) {
                    videmeVideoPlayerProperties.src.push({
                        type: "video/mp4",
                        src: origin_video_vide_me + value2
                    });

                });
                //console.log("src_array2 -----> " + JSON.stringify(src_array2));
            }
            //console.log("src_array -----> " + JSON.stringify(src_array));
            //console.log("videme_video_player.js videmeVideoPlayer_set_options videmeVideoPlayerProperties -----> " + JSON.stringify(videmeVideoPlayerProperties));
            return videmeVideoPlayerProperties;
        },
        videmeVideoPlayer_overlay: function (videmeVideoPlayer_overlay) {
            //console.log("videme_video_player.js videmeVideoPlayer_overlay -----> " + JSON.stringify(videmeVideoPlayer_overlay));
            if ($.isEmptyObject(list)) {
                //console.log("videme_video_player.js videmeVideoPlayer_overlay list EMPTY");

                /* Overlay for embed **************************************************************************************/
            if (videmeVideoPlayer_overlay.embed) {
                //if (true) {
                //console.log("videmeVideoPlayer_overlay videmeVideoPlayer_overlay.embed -----> " + videmeVideoPlayer_overlay.embed);
                //var commonDate = periodToWord(started_at, stopped_at);
                //$('#videme-tile-signboard-true_' + value.item_id).html('<div class="videme-tile-signboard-overlay">' + item_country + ', ' + item_city + ', ' + place + '<br/>' + commonDate + '</div>');
                //$('#videme-tile-signboard-true_' + showcaseVideoV3StaticSettings.item_id).html(embed_text_overlay(showcaseVideoV3StaticSettings));
                //if (showcaseVideoV3StaticSettings.type == 'video' || its_video) {
                //if (showcaseVideoV3StaticSettings.type == 'video') {
                /* text overlay */
                //var overlay_content = '<div class="videme-tile-signboard-overlay">' + item_country + '<br/>' + item_city + '<br/>' + place + '<br/>' + started_at + '<br/>' + stopped_at + '<br/>' + commonDate + '</div>';
                var overlay_content = embed_text_overlay(videmeVideoPlayer_overlay);
                //console.log("showcaseVideoV3Static overlay_content -----> " + overlay_content);

                //var overlay_content = 'Vide.me';
                //showcasePlayerFunc.overlay({
                /*showcasePlayer.overlay({
                    overlays: [{
                        start: 'loadstart',
                        //content: overlay_content,
                        content: 'vide.me',
                        //end: 'playing',
                        end: 3,
                        align: 'tor-left',
                        showBackground: false
                    }, {
                        start: 'pause',
                        content: overlay_content,
                        //end: 'playing',
                        end: 3,
                        align: 'top-left',
                        showBackground: false
                    }]
                });*/
                /* text overlay */
                //}
                /*****************/
                /*$('a').live('click', function() {
                    window.open($(this).attr('href'));
                    return false;
                });*/
                //$('a').setAttribute('target','_blank');
                /* Overlay for embed **************************************************************************************/
            } else {
                $.getJSON("https://api.vide.me/v2/posts/shownext/?next_item_id=" + videmeVideoPlayer_overlay.video + "&limit=1&videmecallback=?",
                    function (jsonData) {
                        //console.log("$.fn.showNextV3 data -----> " + JSON.stringify(jsonData));
                        if (!$.isEmptyObject(jsonData)) {
                            //console.log("jQuery.showcaseVideoV3Static jsonData -----> " + JSON.stringify(jsonData));
                            //console.log("jQuery.showcaseVideoV3Static jsonData[0] -----> " + JSON.stringify(jsonData[0]));
                            //var resTemp = JSON.parse(jsonData);
                            //var result = resTemp[0];
                            //tempObject.parent().toggleClass('hidden');
                            //$('.videme-shownext').removeClass('hidden');
                            //var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
                            //tempObject.html("<ul class='list-group' id='" + id_list_group + "'></ul>");
                            //showTileMultipleLI(parseDataArrayToObject(jsonData), id_list_group, 'shownext', 0);
                            //showTileV3(parseDataArrayToObject(jsonData), tempObject, 'showmulti', 1);
                            overlay_content = embed_text_overlay_next(jsonData[0]);
                            $('#showcaseNext').data('showcase_next_item', jsonData[0]);
                            //var overlay_content = jsonData[0].item_id;
                            //console.log("jQuery.showcaseVideoV3Static overlay_content -----> " + overlay_content);

                            //var overlay_content = 'Vide.me';
                            //showcasePlayerFunc.overlay({
                            /*define([ 'videojs-overlay.min' ], function( overlay ){*/

                            showcasePlayerFunc.overlay({
                                content: '',
                                overlays: [{
                                    start: 'end',
                                    content: overlay_content,
                                    //content: 'vide.me ',
                                    //end: 'playing',
                                    end: 10,
                                    align: 'bottom-right',
                                    showBackground: false
                                }, {
                                    start: 'pause',
                                    //start: 3,
                                    //start: 'end',
                                    content: overlay_content,
                                    end: 'playing',
                                    //end: 1,
                                    align: 'bottom-right',
                                    showBackground: false
                                }]
                            });
                            //});
                        } else {
                            //tempObject.parent().hide("slow");
                            //console.log("jQuery.showcaseVideoV3Static jsonData -----> no data");
                        }
                    })
                    .done(function (data) {
                    })
                    .fail(function (data) {
                        //tempObject.html("...");
                    })
                    .always(function () {
                    });
            }
            } else {
                //console.log("videme_video_player.js videmeVideoPlayer_overlay list NOT EMPTY");
                showcasePlayerFunc.overlay({
                    content: '',
                    overlays: [{
                        start: 'end',
                        content: overlay_content,
                        //content: 'vide.me ',
                        //end: 'playing',
                        end: 10,
                        align: 'bottom-right',
                        showBackground: false
                    }, {
                        start: 'pause',
                        //start: 3,
                        //start: 'end',
                        content: overlay_content,
                        end: 'playing',
                        //end: 1,
                        align: 'bottom-right',
                        showBackground: false
                    }]
                });
            }
        }


        //});
    };

    return videme_video_player;
});