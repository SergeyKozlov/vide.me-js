/***************************************************************************
 *  Jquery plugin Vide.me
 * *************************************************************************/
console.log("Collaboration http://sergeykozlov.ru/collaboration/");
console.log("videme_jq.js");

//var origin_video_vide_me = 'https://d147uuofapeg23.cloudfront.net/';
//var origin_video_vide_me = 'https://s3.amazonaws.com/video.vide.me/';
//var origin_video_vide_me = 'https://video.vide.me/';
//var origin_video_vide_me = 'https://video.rate-my.life/';
var origin_video_vide_me = 'https://video.videcdn.net/';

//var origin_img_vide_me = 'https://d2chzr75qdz7mo.cloudfront.net/';
//var origin_img_vide_me = 'https://s3.amazonaws.com/img.vide.me/';
//var origin_img_vide_me = 'https://img.vide.me/';
//var origin_img_vide_me = 'https://img.rate-my.life/';
var origin_img_vide_me = 'https://img.videcdn.net/';

//var origin_pre_image_w320_vide_me = 'https://d2z9n0aqp1awf1.cloudfront.net/';
//var origin_pre_image_w320_vide_me = 'https://s3.amazonaws.com/pre-image-w320.vide.me/';
//var origin_pre_image_w320_vide_me = 'https://pre-image-w320.vide.me/';
//var origin_pre_image_w320_vide_me = 'https://pre-image-w320.rate-my.life/';
var origin_pre_image_w320_vide_me = 'https://pre-image-w320.videcdn.net/';

//var origin_pre_video_w320_vide_me = 'https://d87muy94jev0k.cloudfront.net/';
//var origin_pre_video_w320_vide_me = 'https://s3.amazonaws.com/pre-video-w320.vide.me/';
//var origin_pre_video_w320_vide_me = 'https://pre-video-w320.vide.me/';
//var origin_pre_video_w320_vide_me = 'https://pre-video-w320.rate-my.life/';
var origin_pre_video_w320_vide_me = 'https://pre-video-w320.videcdn.net/';

//var origin_sprite_w120_vide_me = 'https://d1orzbl5d7paas.cloudfront.net/';
//var origin_sprite_w120_vide_me = 'https://s3.amazonaws.com/sprite-w120.vide.me/';
//var origin_sprite_w120_vide_me = 'https://sprite-w120.vide.me/';
//var origin_sprite_w120_vide_me = 'https://sprite-w120.rate-my.life/';
var origin_sprite_w120_vide_me = 'https://sprite-w120.videcdn.net/';

//var origin_static_vide_me = 'https://d1orzbl5d7paas.cloudfront.net/';
//var origin_static_vide_me = 'https://s3.amazonaws.com/sprite-w120.vide.me/';
//var origin_static_vide_me = 'https://static.vide.me/';
//var origin_static_vide_me = 'https://static.rate-my.life/';
var origin_static_vide_me = 'https://static.videcdn.net/';

var moment = require('moment');

(function ($) {
    var authorized = false;
    //var authorizedData;
    //var bbb = 'bbb';

    /*var methods = {
        init: function (options) {
            console.log("tooltip -----> init options " + JSON.stringify(options));
        },
        show: function () {
            console.log("tooltip -----> show");
        },

        hide: function () {
            console.log("tooltip -----> hide");
        },
        update: function (content) {
            console.log("tooltip -----> update content " + JSON.stringify(content));
        }
    };

    $.fn.tooltip = function (method) {

        // логика вызова метода
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.tooltip');
        }
    };*/

    $.fn.getAttributes = function () {
        var attributes = {};
        if (this.length) {
            $.each(this[0].attributes, function (index, attr) {
                attributes[attr.name] = attr.value;
            });
        }
        return attributes;
    };

    /*$.fn.getAuthorizedData = function (options) { // Избыточно
        getAuthorizedDataSettings = $.extend({
            url: "https://api.vide.me/user/info/?videmecallback=?",
            data: ""
        }, options);
        if ($.cookie('vide_nad')) {
            /!*$.getJSON("https://api.vide.me/user/info/?videmecallback=?",
                function (data) { // TODO: check return data
                    console.log("user/info authorizedData -----> " + JSON.stringify(data));
                    authorizedData = data;

                }
            );*!/
            /!*Волшебное использование куки ===============================================*!/
            //console.log("vide_nad -----> " + $.cookie('vide_nad'));
            //$('#nad').val($.cookie('vide_nad'));
            /!*============================================================================*!/
            //var result = null;
            //var result = "";
            //return $.ajax({
            $.ajax({
            //return Q($.ajax({
                type: 'GET',
                async: false,
                url: getAuthorizedDataSettings.url,
                data: getAuthorizedDataSettings.data,
                dataType: "json",
                success: function(data){
                    console.log("$.fn.getAuthorizedData data -----> " + JSON.stringify(data));
                    result = data;
                    //return data;
                    //return result;
                },
                error: function(xhr, status, error) {
                    //alert(status);
                }
            });
            //console.log("$.fn.getAuthorizedData result -----> " + JSON.stringify(result));
            //return result;
            //return "Ok";
        }
        //return authorizedData;
    };*/

    $.fn.getAuthorized = function () { // Избыточно
        console.log("$.fn.getAuthorized -----> start ");

        if ($.cookie('vide_nad')) {
            //$.getJSON("https://api.vide.me/user/info/?videmecallback=?",
            $.getJSON("https://api.vide.me/v2/user/info/?videmecallback=?",
                function (data) {
                    //error if (typeof data !== 'undefined' && data.length > 0) {
                    if (!$.isEmptyObject(data)) {
                        //console.log("getAuthorized user/info data -----> " + JSON.stringify(data));
                        //console.log("getAuthorized user/info data.user_display_name -----> " + JSON.stringify(data.user_display_name));
                        //console.log("getAuthorized user/info data.stars_count -----> " + JSON.stringify(data.stars_count));

                        authorized = true;

                        $('.authorize-false').remove();
                        var trueUserInfo = paddingUserInfo(data);
                        //console.log("getAuthorized user/info trueUserInfo -----> " + JSON.stringify(trueUserInfo));

                        /*if (data.user_display_name === null) data.user_display_name = 'No name';

                        console.log("getAuthorized user/info data -----> " + JSON.stringify(data));
                        if (data.hasOwnProperty('user_mail')) { // TODO: Вынести в отдельную функцию
                            console.log("$.fn.getAuthorized -----> yes " + data.user_email);
                            authorized = true;
                        } else {
                            authorized = false;
                            console.log("$.fn.getAuthorized -----> no " + data.user_email);
                        }
                        if (data.user_picture === '') {
                            $('#user_brand').html("<a href='https://api.vide.me/' target='_blank'> <img src='https://ea1116048a2ffc61f8b7-d479f182e30f6e6ac2ebc5ce5ab9de7b.ssl.cf1.rackcdn.com/avatar.png' width='48' height='48' alt='" + data.user_picture + "'></a>");
                            $('#nav_user_brand').attr('src', 'https://ea1116048a2ffc61f8b7-d479f182e30f6e6ac2ebc5ce5ab9de7b.ssl.cf1.rackcdn.com/avatar.png');
                        } else {
                            $('#user_brand').html("<a href='" + data.user_link + "' target='_blank'> <img src='" + data.user_picture + "' width='48' height='48' alt='" + data.user_display_name + "'></a>");
                            $('#nav_user_brand').attr('src', data.user_picture);
                        }
                        $('#user_name').html("<a href='" + data.user_link + "' target='_blank'>" + data.user_display_name + "</a>");
                        $('#user_email').html(data.user_email);
                        if (data.user_picture === '') {
                            $('#form_user_brand').html("<a href='" + data.user_link + "' target='_blank'> <img src='https://ea1116048a2ffc61f8b7-d479f182e30f6e6ac2ebc5ce5ab9de7b.ssl.cf1.rackcdn.com/avatar.png' alt='" + data.userDisplayName + "'></a>");
                            $('#nav_form_user_brand').html("<a href='" + data.user_link + "' target='_blank'> <img src='https://ea1116048a2ffc61f8b7-d479f182e30f6e6ac2ebc5ce5ab9de7b.ssl.cf1.rackcdn.com/avatar.png' alt='" + data.user_display_name + "'></a>");
                        } else {
                            $('#form_user_brand').html("<a href='" + data.user_link + "' target='_blank'> <img src='" + data.user_picture + "' alt='" + data.user_display_name + "'></a>");
                        }*/

                        //==$('#user_brand').html("<a href='" + trueUserInfo.user_link + "' target='_blank'> <img src='" + trueUserInfo.user_picture + "' width='48' height='48' alt='" + trueUserInfo.user_display_name + "'></a>");
                        $('#user_brand').html("<a href='" + trueUserInfo.user_link + "' target='_blank'> <img src='" + origin_img_vide_me + trueUserInfo.user_picture + "' width='48' height='48' alt='" + trueUserInfo.user_display_name + "'></a>");
                        //$('#nav_user_cover').attr('src', trueUserInfo.user_cover);
                        //=$('.videme-you-sign-user_cover').attr('src', trueUserInfo.user_cover);
                        //==$('.videme-you-sign-user_cover').attr('src', 'https://s3.amazonaws.com/img.vide.me/' + trueUserInfo.user_cover);
                        $('.videme-you-sign-user_cover').css('background-image', 'url(' + origin_img_vide_me + trueUserInfo.user_cover + ')');
                        //if (!$.cookie('vide_nad')) $('.videme-you-sign-user_cover').css('height', '7rem');

                        //$('#nav_user_brand').attr('src', trueUserInfo.user_picture);
                        //==$('.videme-you-sign-user_picture').attr('src', trueUserInfo.user_picture);
                        $('.videme-you-sign-user_picture').attr('src', origin_img_vide_me + trueUserInfo.user_picture);
                        //==$('#form_user_brand').html("<a href='" + trueUserInfo.user_link + "' target='_blank'> <img src='" + trueUserInfo.user_picture + "' alt='" + trueUserInfo.user_display_name + "'></a>");
                        $('#form_user_brand').html("<a href='" + trueUserInfo.user_link + "' target='_blank'> <img src='" + origin_img_vide_me + trueUserInfo.user_picture + "' alt='" + trueUserInfo.user_display_name + "'></a>");

                        $('#form_user_name').html("<a href='" + trueUserInfo.user_link + "' target='_blank'>" + trueUserInfo.user_display_name + "</a>");
                        $('#nav_form_user_name').html("<a href='https://www.vide.me/" + trueUserInfo.spring + "'>" + trueUserInfo.user_display_name + "</a>");
                        $('#form_user_email').html(trueUserInfo.user_email);
                        //$('#nav_form_user_email').html(trueUserInfo.user_email);
                        $('.videme-you-sign-bio').html(trueUserInfo.bio);
                        //$('.videme-you-sign-country').html(trueUserInfo.country);
                        //$('.videme-you-sign-city').html(trueUserInfo.city);
                        $('#sidebar_user_name').html(trueUserInfo.user_display_name);
                        //$('#sidebar_user_name_href').attr('href', 'https://www.vide.me/' + trueUserInfo.spring + '/');
                        $('#sidebar_user_name_href').attr('href', 'https://www.vide.me/' + trueUserInfo.spring + '/').attr('spring', trueUserInfo.spring);
                        //$('#sidebar_signin').html('Options').attr('href', 'https://api.vide.me/pas/info/');
                        $('#sidebar_signin').html('<i class="fa fa-cogs fa-lg"></i>').attr('href', 'https://api.vide.me/pas/info/');
                        //if (!$.isEmptyObject(trueUserInfo.user_picture)) {
                        $(".sidebar_user_name_img").removeClass('hidden');
                        $("#sidebar_user_name_img").attr('src', origin_img_vide_me + trueUserInfo.user_picture);
                        //}
                        if (!$.isEmptyObject(trueUserInfo.stars_count) && trueUserInfo.stars_count > 0) {
                            $(".videme_nav_badge_stars_count_place").removeClass('hidden');
                            $(".videme_nav_badge_stars_count").html(trueUserInfo.stars_count);
                        }
                        if (!$.isEmptyObject(trueUserInfo.views_stars)) {
                            $(".videme_nav_badge_views_stars").html(trueUserInfo.views_stars);
                        } else {
                            $(".videme_nav_badge_views_stars").html('0');
                        }
                        if (!$.isEmptyObject(trueUserInfo.tags_conf_count)) {
                            $(".videme_nav_badge_tags_count_place").removeClass('hidden');
                            $(".videme_nav_badge_tags_conf_count").html(trueUserInfo.tags_conf_count);
                        }
                        if (!$.isEmptyObject(trueUserInfo.tags_view_count)) {
                            $(".videme_nav_badge_tags_count_place").removeClass('hidden'); // TODO: dobble
                            $(".videme_nav_badge_tags_view_count").html(trueUserInfo.tags_view_count);
                        }
                        if (!$.isEmptyObject(trueUserInfo.country)) {
                            $(".videme-you-sign-country").html(
                                '<i class="fa fa-globe videme-country-marker"></i>' +
                                '<div class="videme-country-name">' + trueUserInfo.country + '</div>'
                            );
                        }
                        if (!$.isEmptyObject(trueUserInfo.city)) {
                            $(".videme-you-sign-city").html(
                                '<i class="fa fa-map-marker videme-city-marker"></i>' +
                                '<div class="videme-city-name">' + trueUserInfo.city + '</div>'
                            );
                        }
                        $('#videme-feedback-response').removeClass('hidden');
                        $('#response').prop('checked', true);
                        $('#response_user_id').val(trueUserInfo.user_id);
                    } else {
                        console.log("$.fn.getAuthorized -----> getJSON empty");
                        $('.videme-form-user-info').remove();

                    }
                    // asinc exec. return data;

                }
            );
            /*Волшебное использование куки ===============================================*/
            //console.log("vide_nad -----> " + $.cookie('vide_nad'));
            $('#nad').val($.cookie('vide_nad'));
            $('.nad').val($.cookie('vide_nad'));
            /*============================================================================*/
        } else {
            console.log("$.fn.getAuthorized -----> no cookie");
            $('.videme-you-sign-user_cover').css('height', '7rem');
            $('.videme-form-user-info').remove(); // TODO: Why???
            return false; // TODO: ?

        }
        return authorized;
    };

    $.fn.userSpringInfo = function (options) { // 26072022
        var url = parseUrl();
        $.getJSON("https://api.vide.me/v2/spring/info/?spring=" + url.spring + "&videmecallback=?",
            function (data) {
                if (!$.isEmptyObject(data)) {
                    data = paddingUserInfo(data);
                    //if (data.user_cover) {
                    $('.header-site').css('background-image', 'url(' + origin_img_vide_me + data.user_cover_top + ')');
                    //} else {
                    //$('.header-site').css('background-image', 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Starry_Night_Over_the_Rhone.jpg/300px-Starry_Night_Over_the_Rhone.jpg")');
                    //}
                    //if (!$.isEmptyObject(data.user_picture)) {
                    //$("#vide_spring_user_picture").attr('src', data.user_picture);
                    $("#vide_spring_user_picture").attr('src', origin_img_vide_me + data.user_picture);
                    //} else {
                    //$('.header-site').css('background-image', 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Starry_Night_Over_the_Rhone.jpg/300px-Starry_Night_Over_the_Rhone.jpg")');
                    //$("#vide_spring_user_picture").attr('src', 'https://s3.amazonaws.com/vide.me/nonname.jpg');

                    //}
                    //if (!$.isEmptyObject(data.slogan)) {
                    //$("#vide_spring_user_picture").attr('src', data.user_picture);
                    $("#videme-spring-slogan").html(data.slogan);
                    //} else {
                    //$('.header-site').css('background-image', 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Starry_Night_Over_the_Rhone.jpg/300px-Starry_Night_Over_the_Rhone.jpg")');
                    //}
                    //if (data.user_display_name !== '') {
                    $('.videme-spring-user_display_name').html('<a class="videme-spring-user_display_name-val" href=\"https://www.vide.me/' + data.spring + '\">' + data.user_display_name + '</a>');
                    //} else {
                    // $('.user_display_name').html('');
                    //}
                    //$('.spring_relation').html('<a class="btn btn-sm align-middle btn-outline-secondary relation_connect" user_id="' + data.user_id + '" href="https://api.vide.me/v2/relation/connect/?user_id=' + data.user_id + '&nad=' + $.cookie('vide_nad') + '">Follow</a>');
                    //$('.spring_make_friends').html('<a class="btn btn-sm align-middle btn-outline-secondary friend_request" user_id="' + data.user_id + '" href="https://api.vide.me/v2/friendship/request/?user_id=' + data.user_id + '&nad=' + $.cookie('vide_nad') + '">Make friends</a>');

                    //$.fn.ownerSignUserInfo(data);
                } else {
                    console.log("$.fn.userSpringInfo data -----> no");
                    //tempObject.html("No results");
                }
            })
            .done(function (data) {
                //console.log("$.fn.userSpringInfo: " + JSON.stringify(data));

            })
            .fail(function (data) {
                //tempObject.html(showError(data));
            })
            //$.cookie('vide_nad')
            .always(function () {
            });
    };

    /*$.fn.userSpringForMe = function (options) { //TODO: remove
        var url = parseUrl();
        $.getJSON("https://api.vide.me/v2/spring/for_me/?spring=" + url.spring + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.userSpringForMe data -----> ", JSON.stringify(data));
                if (!$.isEmptyObject(data)) {
                    //data = paddingUserInfo(data);
                    if (!$.isEmptyObject(data[0])) {

                        if (data[0] == '1') {
                            $('.spring_make_friends').html('You friends');
                        }
                        if (data[0] == '0') {
                            $('.spring_make_friends').html('Pending friends');
                        }
                        if (data[0] == '2') {
                            $('.spring_make_friends').html('Blocked');
                        }
                    } else {
                        $('.spring_make_friends').html('<a class="btn btn-sm btn-outline-success videme-relation-card-button-connect friend_request" user_id="' + data.user_id + '" href="https://api.vide.me/v2/friendship/request/?user_id=' + data.user_id + '&nad=' + $.cookie('vide_nad') + '">Add friend</a>');
                    }
                    if (!$.isEmptyObject(data[1])) {
                        $('.spring_relation').html('Followed');
                    } else {
                        $('.spring_relation').html('<a class="btn btn-sm btn-outline-success videme-relation-card-button-connect relation_connect" user_id="' + data.user_id + '" href="https://api.vide.me/v2/relation/connect/?user_id=' + data.user_id + '&nad=' + $.cookie('vide_nad') + '">Follow</a>');
                    }
                } else {
                    console.log("$.fn.userSpringForMe data -----> no");
                    //tempObject.html("No results");
                }
            })
            .done(function (data) {
                //console.log("$.fn.userSpringInfo: " + JSON.stringify(data));

            })
            .fail(function (data) {
                //tempObject.html(showError(data));
            })
            //$.cookie('vide_nad')
            .always(function () {
            });
    };*/

    $.fn.userSpringForMeFollow = function (options) { // 26072022
        var url = parseUrl();
        $.getJSON("https://api.vide.me/v2/spring/for_me/follow/?spring=" + url.spring + "&videmecallback=?",
            function (data) {
                console.log("$.fn.userSpringForMeFollow data -----> ", JSON.stringify(data));
                //console.log("$.fn.userSpringForMeFriendship data[3] -----> ", JSON.stringify(data[3]));
                //console.log("$.fn.userSpringForMeFriendship data.user_id -----> ", JSON.stringify(data.user_id));
                //console.log("$.fn.userSpringForMeFriendship data.for_user_id -----> ", JSON.stringify(data.for_user_id));
                if (!$.isEmptyObject(data[0])) {
                    //$('.spring_relation').html('Followed');
                    //$('.spring_relation').html('<a class="btn btn-sm btn-primary videme-relation-card-button-connect" user_id="" href="">Followed</a>');
                    $('.spring_relation').html('' +
                        '<a href="https://api.vide.me/v2/relation/delete/?spring=' + url.spring + '&nad=' + $.cookie("vide_nad") + '" ' +
                        'class="btn btn-sm btn-outline-secondary videme-relation-card-button-connect relation_delete" ' +
                        'user_id="' + $.cookie('vide_nad') + '" ' +
                        'feedback="https://www.vide.me/web/im_following/">' +
                        'Unfollow' +
                        '</a>' +
                        '<a href="https://api.vide.me/v2/relation/delete/?spring=' + url.spring + '&nad=' + $.cookie("vide_nad") + '" ' +
                        'class="btn btn-sm btn-outline-secondary videme-relation-card-button-connect-small videme-round-button relation_delete" ' +
                        'user_id="' + $.cookie('vide_nad') + '" ' +
                        'feedback="https://www.vide.me/web/im_following/">' +
                        '<i class="fa fa-minus" aria-hidden="true"></i>' +
                        '</a>');

                } else {
                    $('.spring_relation').html('' +
                        '<a class="btn btn-sm btn-outline-primary videme-relation-card-button-connect relation_connect" ' +
                        'user_id="' + data.user_id + '" ' +
                        'href="https://api.vide.me/v2/relation/connect/?user_id=' + data.user_id + '&nad=' + $.cookie('vide_nad') + '">' +
                        'Follow' +
                        '</a>' +
                        '<a class="btn btn-sm btn-outline-primary videme-relation-card-button-connect-small videme-round-button relation_connect" ' +
                        'user_id="' + data.user_id + '" ' +
                        'href="https://api.vide.me/v2/relation/connect/?user_id=' + data.user_id + '&nad=' + $.cookie('vide_nad') + '">' +
                        '<i class="fa fa-plus" aria-hidden="true"></i>' +
                        '</a>');
                }
            })
            .done(function (data) {
                //console.log("$.fn.userSpringInfo: " + JSON.stringify(data));

            })
            .fail(function (data) {
                //tempObject.html(showError(data));
            })
            //$.cookie('vide_nad')
            .always(function () {
            });
    };

    $.fn.userSpringForMeFriendship = function (options) { // 26072022
        var url = parseUrl();
        $.getJSON("https://api.vide.me/v2/spring/for_me/friendship/?spring=" + url.spring + "&videmecallback=?",
            function (data) {
                console.log("$.fn.userSpringForMeFriendship data -----> ", JSON.stringify(data));
                //console.log("$.fn.userSpringForMeFriendship data[3] -----> ", JSON.stringify(data[3]));
                console.log("$.fn.userSpringForMeFriendship data.user_id -----> ", JSON.stringify(data.user_id));
                console.log("$.fn.userSpringForMeFriendship data.for_user_id -----> ", JSON.stringify(data.for_user_id));
                if (!$.isEmptyObject(data[0])) {
                    var actionDate;
                    if (!$.isEmptyObject(data[0].created_at) && data[0].created_at != 'null') actionDate = timeToWord(data[0].created_at);
                    console.log("$.fn.userSpringForMeFriendship actionDate -----> ", actionDate);
                    if (!$.isEmptyObject(data[0].updated_at) && data[0].updated_at != 'null') actionDate = timeToWord(data[0].updated_at);
                    console.log("$.fn.userSpringForMeFriendship actionDate -----> ", actionDate);
                    if (!$.isEmptyObject(data[0].friendship_id) &&
                        (!$.isEmptyObject(data.for_user_id) || !$.isEmptyObject(data.user_id))) {
                        var user_display_name = '';
                        //if ($('.videme-spring-user_display_name-val').text()) {
                        user_display_name = $('.videme-spring-user_display_name-val').text();
                        //}

                        //console.log("$.fn.userSpringForMeFriendship data[7].user_id -----> ", JSON.stringify(data[7].user_id));
                        if (data[0].status == '0') {
                            //if (data.for_user_id == data[3]) $('.spring_make_friends').html('You pending friends' + actionDate);
                            //if (data.for_user_id != data[3]) $('.spring_make_friends').html('Request friends' + actionDate);
                            //$('.spring_make_friends').html('Pending');
                            $('.spring_make_friends').html(fReturnButton_friend_pending());
                        }
                        if (data[0].status == '1') {
                            //$('.spring_make_friends').html('<p>You friends<br/><small>' + actionDate + '</small></p>');
                            //$('.spring_make_friends').html('Friends');
                            $('.spring_make_friends').html('' +
                                '<a class="btn btn-sm btn-success friendship-del-toggle videme-relation-card-button-connect"' +
                                ' data-toggle="modal"' +
                                ' data-target="#modal-del-friendship" ' +
                                'user_display_name="' + user_display_name + '"' +
                                'spring="' + url.spring + '"' +
                                'feedback="' + window.location.href + '"' +
                                'user_id="' + data.user_id + '" href="" >Friends</a>');
                        }
                        if (data[0].status == '2') {
                            //if (data.for_user_id == data[3]) $('.spring_make_friends').html('Blocked by you ' + actionDate);
                            //if (data.for_user_id != data[3]) $('.spring_make_friends').html('You Blocked' + actionDate);
                            $('.spring_make_friends').html('Declined');
                        }
                        if (data[0].status == '3') {
                            //if (data.for_user_id == data[3]) $('.spring_make_friends').html('Blocked by you ' + actionDate);
                            //if (data.for_user_id != data[3]) $('.spring_make_friends').html('You Blocked' + actionDate);
                            $('.spring_make_friends').html('Blocked');
                        }
                    } else {
                        $('.spring_make_friends').html(fReturnButton_friend_request(data));
                    }
                } else {
                    console.log("$.fn.userSpringForMe data -----> no");
                    $('.spring_make_friends').html(fReturnButton_friend_request(data));
                    //tempObject.html("No results");
                }
            })
            .done(function (data) {
                //console.log("$.fn.userSpringInfo: " + JSON.stringify(data));

            })
            .fail(function (data) {
                //tempObject.html(showError(data));
            })
            //$.cookie('vide_nad')
            .always(function () {
            });
    };

    $.fn.springActivity = function () { // 26072022
        var url = parseUrl();
        console.log("$.fn.springActivity data: " + JSON.stringify(url));
        if (!$.isEmptyObject(url.show)) {
            if (url.show == 'viewed') $('.spring_activity_viewed').addClass('active');
            if (url.show == 'posts') $('.spring_activity_posts').addClass('active');
            if (url.show == 'video') $('.spring_activity_video').addClass('active');
            if (url.show == 'image') $('.spring_activity_image').addClass('active');
            if (url.show == 'article') $('.spring_activity_article').addClass('active');
            if (url.show == 'event') $('.spring_activity_event').addClass('active');
            if (url.show == 'friends') $('.spring_activity_friends').addClass('active');
            if (url.show == 'followers') $('.spring_activity_followers').addClass('active');
            if (url.show == 'following') $('.spring_activity_following').addClass('active');
            if (url.show == 'tags_conf') $('.spring_activity_tags_confirmed').addClass('active');
        }

        //tempObject.html(VidemeProgress);
        //==return this.each(function () {
        //var tempObject = $(this);
        $.getJSON("https://api.vide.me/v2/spring/activity/?spring=" + url.spring + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.userSpringInfo: " + JSON.stringify(data));
                //data = paddingUserInfo(data);
                console.log("$.fn.springActivity data: " + JSON.stringify(data));
                //$('.header-site').css('background-image', 'url(' + data.user_cover + ')');
                //$('.user_display_name').html('<a href=\"https://www.vide.me/' + data.spring + '\">' + data.user_display_name + '</a>');
                if (!$.isEmptyObject(data)) {
                    /*if (!$.isEmptyObject(data.count_stars) && data.count_stars > 0) {
                        //$('.spring_activity_viewed').attr("href", "https://www.vide.me/" + url.spring + "/?show=viewed");
                        //var art_liked = Math.round(data.count_show / data.posts + data.count_likes);
                        $('#spring_activity_starred_value').html(nFormatter(data.count_stars, 2));
                        $('#spring_activity_starred_label').removeClass('hidden');
                    }*/
                    if (!$.isEmptyObject(data.count_likes) && data.count_likes > 0) {
                        //$('.spring_activity_viewed').attr("href", "https://www.vide.me/" + url.spring + "/?show=viewed");
                        //var art_liked = Math.round(data.count_show / data.posts + data.count_likes);
                        $('#spring_activity_liked_value').html(nFormatter(data.count_likes, 2));
                        $('#spring_activity_liked_label').removeClass('hidden');
                    }
                    if (!$.isEmptyObject(data.count_show)) {
                        if (data.count_show > 0) {
                            $('#videme-v3-spring-activity_viewed_label_place').removeClass('hidden');
                            $('.spring_activity_viewed').attr("href", "https://www.vide.me/" + url.spring + "/?show=viewed");
                            $('.spring_activity_viewed_value').html(nFormatter(data.count_show, 2));
                        }
                    }
                    if (!$.isEmptyObject(data.posts)) {
                        if (data.posts > 0) {
                            $('#videme-v3-spring-activity_posts_label_place').removeClass('hidden');
                            $('.spring_activity_posts').attr("href", "https://www.vide.me/" + url.spring + "/?show=posts");
                            $('.spring_activity_posts_value').html(data.posts);
                        }
                    }
                    if (!$.isEmptyObject(data.videos)) {
                        if (data.videos > 0) {
                            $('#videme-v3-spring-activity_video_label_place').removeClass('hidden');
                            $('.spring_activity_video').attr("href", "https://www.vide.me/" + url.spring + "/?show=video");
                            $('.spring_activity_video_value').html(data.videos);
                        }
                    }
                    if (!$.isEmptyObject(data.images)) {
                        if (data.images > 0) {
                            $('#videme-v3-spring-activity_image_label_place').removeClass('hidden');
                            $('.spring_activity_image').attr("href", "https://www.vide.me/" + url.spring + "/?show=image");
                            $('.spring_activity_image_value').html(data.images);
                        }
                    }
                    if (!$.isEmptyObject(data.articles)) {
                        if (data.articles > 0) {
                            $('#videme-v3-spring-activity_article_label_place').removeClass('hidden');
                            $('.spring_activity_article').attr("href", "https://www.vide.me/" + url.spring + "/?show=article");
                            $('.spring_activity_article_value').html(data.articles);
                        }
                    }
                    if (!$.isEmptyObject(data.events)) {
                        if (data.events > 0) {
                            $('#videme-v3-spring-activity_event_label_place').removeClass('hidden');
                            $('.spring_activity_event').attr("href", "https://www.vide.me/" + url.spring + "/?show=event");
                            $('.spring_activity_event_value').html(data.events);
                        }
                    }
                    if (!$.isEmptyObject(data.friends)) {
                        if (data.friends > 0) {
                            $('#videme-v3-spring-activity_friends_label_place').removeClass('hidden');
                            $('.spring_activity_friends').attr("href", "https://www.vide.me/" + url.spring + "/?show=friends");
                            $('.spring_activity_friends_value').html(data.friends);
                        }
                    }
                    if (!$.isEmptyObject(data.followers)) {
                        if (data.followers > 0) {
                            $('#videme-v3-spring-activity_relation_to_label_place').removeClass('hidden');
                            $('.spring_activity_relation_to').attr("href", "https://www.vide.me/" + url.spring + "/?show=followers");
                            $('.spring_activity_relation_to_value').html(data.followers);
                        }
                    }
                    if (!$.isEmptyObject(data.following)) {
                        if (data.following > 0) {
                            $('#videme-v3-spring-activity_relation_from_label_place').removeClass('hidden');
                            $('.spring_activity_relation_from').attr("href", "https://www.vide.me/" + url.spring + "/?show=following");
                            $('.spring_activity_relation_from_value').html(data.following);
                        }
                    }
                    if (!$.isEmptyObject(data.tags_conf)) {
                        if (data.tags_conf > 0) {
                            $('#videme-v3-spring-activity_tags_confirmed_label_place_top').removeClass('hidden');
                            $('#videme-v3-spring-activity_tags_confirmed_label_place').removeClass('hidden');
                            $('.spring_activity_tags_confirmed_label').attr("href", "https://www.vide.me/" + url.spring + "/?show=tags_conf");
                            $('.spring_activity_tags_confirmed_value').html(data.tags_conf);
                        }
                    }

                    //$.fn.ownerSignUserInfo(data);
                } else {
                    console.log("$.fn.springActivity data -----> no");
                    //tempObject.html("No results");
                }
            })
            .done(function (data) {
                //console.log("$.fn.userSpringInfo: " + JSON.stringify(data));

            })
            .fail(function (data) {
                //tempObject.html(showError(data));
            })
            //$.cookie('vide_nad')
            .always(function () {
            });
    };
// clear 24072022
    $.fn.springEssences = function () { // 26072022
        var url = parseUrl();
        console.log("$.fn.springEssences data: " + JSON.stringify(url));
        //tempObject.html(VidemeProgress);
        //==return this.each(function () {
        //var tempObject = $(this);
        $.getJSON("https://api.vide.me/v2/spring/essences/?spring=" + url.spring + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.springEssences: " + JSON.stringify(data));
                console.log("$.fn.springEssences data: " + JSON.stringify(data));
                if (!$.isEmptyObject(data)) {
                    var html = '<i class="fa fa-briefcase videme-icon-marker" aria-hidden="true"></i><div class="videme-v3-spring-breadcrumb-item">';
                    $.each(data, function (key, value) {
                        if (key != 0) html += ' | ';
                        html += value.title;
                    });
                    html += '</div>';
                    $('.videme-v3-spring-essence-list').html(html);
                } else {
                    console.log("$.fn.springEssences data -----> no");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
            })
            .always(function () {
            });
    };

    $.fn.springService = function (springService) { // 26072022
        $.getJSON("https://api.vide.me/v2/spring/service/?spring=" + springService.spring + "&videmecallback=?",
            function (data) {
                if (!$.isEmptyObject(data)) {
                    $('.videme-owner-sign-service').html(showServiceSpring(data, springService));
                } else {
                    console.log("$.fn.springService data -----> no");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
            })
            .always(function () {
            });
    };

    $.fn.springTalents = function (springTalents) { // 26072022
        $.getJSON("https://api.vide.me/v2/spring/talents/?spring=" + springTalents.spring + "&videmecallback=?",
            function (data) {
                if (!$.isEmptyObject(data)) {
                    $('.videme-owner-sign-talents').html(showTalentsSpring(data, springTalents));
                } else {
                    console.log("$.fn.springTalents data -----> no");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
            })
            .always(function () {
            });
    };

    $.fn.myNetworkActivity = function (url) { // 26072022
        if ($.cookie('vide_nad')) {
            var url = parseUrl();
            $.getJSON("https://api.vide.me/v2/network/activity/?videmecallback=?",
                function (data) {
                    //console.log("$.fn.userSpringInfo: " + JSON.stringify(data));
                    //data = paddingUserInfo(data);
                    console.log("$.fn.myNetworkActivity data: " + JSON.stringify(data));
                    //$('.header-site').css('background-image', 'url(' + data.user_cover + ')');
                    //$('.user_display_name').html('<a href=\"https://www.vide.me/' + data.spring + '\">' + data.user_display_name + '</a>');

                    if (!$.isEmptyObject(data)) {
                        console.log("$.fn.myNetworkActivity data[1]:" + data[1]);

                        if (!$.isEmptyObject(data[0])) {
                            $('.videme_nav_network_badge_friends').html(data[0]);
                        }
                        if (!$.isEmptyObject(data[1])) {
                            if (data[1] > 0) {
                                $('.videme_nav_network_badge_pend_friends').html(data[1]);
                            }
                        }
                        if (!$.isEmptyObject(data[2])) {
                            $('.videme_nav_network_badge_req_friends').html(data[2]);
                        }
                        if (!$.isEmptyObject(data[3])) {
                            $('.videme_nav_network_badge_followers').html(data[3]);
                        }
                        if (!$.isEmptyObject(data[4])) {
                            $('.videme_nav_network_badge_following').html(data[4]);
                        }
                        /*if (!$.isEmptyObject(data[5])) {
                            $(".videme_nav_badge_count_stars_place").removeClass('hidden');
                            $(".videme_nav_badge_count_stars").html(data[5]);
                        }*/
                        //$.fn.ownerSignUserInfo(data);
                    } else {
                        console.log("$.fn.myNetworkActivity data -----> no");
                        //tempObject.html("No results");
                    }
                })
                .done(function (data) {
                    //console.log("$.fn.userSpringInfo: " + JSON.stringify(data));

                })
                .fail(function (data) {
                    //tempObject.html(showError(data));
                })
                //$.cookie('vide_nad')
                .always(function () {
                });
        }
    };

    $.fn.getAuthorized(); // TODO: Убрать повторное использование
    //$.fn.getAuthorizedData(); // TODO: Убрать повторное использование
    //authorizedData = $.fn.getAuthorizedData(); // TODO: Убрать повторное использование

    $.fn.fbSentMessage = function (options) { // recreate 25072022
        fbSentMessageSettings = $.extend({
            file: '',
            messageid: '',
            authorized: authorized
        }, options);
        console.log("$.fn.fbSentMessage fbSentMessageSettings.authorized -----> " + fbSentMessageSettings.authorized);
        console.log("$.fn.fbSentMessage -----> fbSentMessageSettings " + JSON.stringify(fbSentMessageSettings));
        console.log("$.fn.fbSentMessage -----> link " + 'https://vide.me/v?m=' + fbSentMessageSettings.file + '&messageid=' + fbSentMessageSettings.messageid);
        $.ajaxSetup({cache: true});

        $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
            FB.init({
                appId: '1675775936007165',
                //version: 'v2.7' // or v2.1, v2.2, v2.3, ...
                version: 'v2.8' // or v2.1, v2.2, v2.3, ...
            });

            FB.ui({
                method: 'send',
                link: 'https://www.vide.me/v?m=' + fbSentMessageSettings.file + '&messageid=' + fbSentMessageSettings.messageid
            });
        });
    };

    /*$.fn.oneTimeInbox = function (options) {
        oneTimeInboxSettings = $.extend({
            /!*file: '',
             messageid: '',
             updatedAt: '',
             subject: '',
             message: '',
             fromUserName: '',
             toUserName: '',
             recipients: '',
             conferenceId: '',*!/
            authorized: authorized
        }, options);
        //console.log("$.fn.oneTimeInbox oneTimeInboxSettings.authorized -----> " + oneTimeInboxSettings.authorized);
        //console.log("$.fn.oneTimeInbox oneTimeInboxSettings -----> " + JSON.stringify(oneTimeInboxSettings));
        //console.log("$.fn.oneTimeInbox window.location.pathname -----> " + window.location.pathname);
        //if (oneTimeInboxSettings.authorized && window.location.pathname != "/v") {
        /!*if (urlIfParamExist('message_id')) {
            //console.log("$.fn.oneTimeInbox message_id -----> yes ");
            $.fn.showcaseVideoTextButton(paddingButtonOneTime(paddingUserInfo(oneTimeInboxSettings)));
        } else {
            //console.log("$.fn.oneTimeInbox message_id -----> no ");
            $.fn.showcaseVideoTextButton(paddingButtonInbox(paddingUserInfo(oneTimeInboxSettings)));
        }*!/
        $.fn.showcaseVideoTextButton(paddingButtonOneTime(oneTimeInboxSettings));
    };*/

    $.fn.oneTimeV3 = function (options) { // 26072022
        oneTimeV3Settings = $.extend({
            /*file: '',
             messageid: '',
             updatedAt: '',
             subject: '',
             message: '',
             fromUserName: '',
             toUserName: '',
             recipients: '',
             conferenceId: '',*/
            authorized: authorized
        }, options);
        //console.log("$.fn.oneTimeV3 oneTimeV3Settings -----> " + JSON.stringify(oneTimeV3Settings));
        //console.log("$.fn.oneTimeInbox oneTimeInboxSettings -----> " + JSON.stringify(oneTimeInboxSettings));
        //console.log("$.fn.oneTimeInbox window.location.pathname -----> " + window.location.pathname);
        //if (oneTimeInboxSettings.authorized && window.location.pathname != "/v") {
        /*if (urlIfParamExist('message_id')) {
            //console.log("$.fn.oneTimeInbox message_id -----> yes ");
            $.fn.showcaseVideoTextButton(paddingButtonOneTime(paddingUserInfo(oneTimeInboxSettings)));
        } else {
            //console.log("$.fn.oneTimeInbox message_id -----> no ");
            $.fn.showcaseVideoTextButton(paddingButtonInbox(paddingUserInfo(oneTimeInboxSettings)));
        }*/
        //$.fn.showcaseVideoTextButtonV3(paddingButtonOneTime(oneTimeV3Settings));
        $.fn.showcaseVideoTextButtonV3(paddingButtonAction(oneTimeV3Settings));
    };

    /*$.fn.oneTimeV3Embed = function (options) { // TODO: may by true?
        oneTimeV3EmbedSettings = $.extend({
            /!*file: '',
             messageid: '',
             updatedAt: '',
             subject: '',
             message: '',
             fromUserName: '',
             toUserName: '',
             recipients: '',
             conferenceId: '',*!/
            authorized: authorized
        }, options);
        console.log("$.fn.oneTimeV3Embed oneTimeV3EmbedSettings -----> " + JSON.stringify(oneTimeV3EmbedSettings));
        //console.log("$.fn.oneTimeInbox oneTimeInboxSettings -----> " + JSON.stringify(oneTimeInboxSettings));
        //console.log("$.fn.oneTimeInbox window.location.pathname -----> " + window.location.pathname);
        //if (oneTimeInboxSettings.authorized && window.location.pathname != "/v") {
        /!*if (urlIfParamExist('message_id')) {
            //console.log("$.fn.oneTimeInbox message_id -----> yes ");
            $.fn.showcaseVideoTextButton(paddingButtonOneTime(paddingUserInfo(oneTimeInboxSettings)));
        } else {
            //console.log("$.fn.oneTimeInbox message_id -----> no ");
            $.fn.showcaseVideoTextButton(paddingButtonInbox(paddingUserInfo(oneTimeInboxSettings)));
        }*!/
        //$.fn.showcaseVideoTextButtonV3(paddingButtonOneTime(oneTimeV3Settings));
        //$.fn.showcaseVideoTextButtonV3(paddingButtonAction(oneTimeV3EmbedSettings));
        $.fn.showcaseVideoV3Static(oneTimeV3EmbedSettings);
    };*/

    /*
        function paddingButtonAction(value) {
            var action_url_class = value.action_url_class;
            //var value = [];

            if (action_url_class.access == 'public') { // TODO: remove?
                var share = 'share';
                var fa_icon_access = 'fa fa-unlock';
            } else {
                var share = '';
                var fa_icon_access = 'fa fa-lock';
            }
            if (action_url_class.type == 'public') {
                var share = 'share';
                var fa_icon_access = 'fa fa-unlock';
            } else {
                var share = '';
                var fa_icon_access = 'fa fa-lock';
            }

            if (action_url_class == 'file-my-url') { // V2
                value.dropdown = {
                    'dd_item_1': 'edit_my_video',
                    'dd_item_2': 'send',
                    'dd_item_3': 'share',
                    'dd_item_4': 'delete',
                    'dd_item_5': 'copy_link'
                };
                //value.key = key;
                value = paddingButtonMy(value);
            }
            if (action_url_class == 'videme-v3-my-posts-url') { // V3
                value.dropdown = {
                    'dd_item_1': 'edit_my_video',
                    'dd_item_2': 'send',
                    'dd_item_3': 'share',
                    'dd_item_4': 'delete',
                    'dd_item_5': 'copy_link'
                };
                //value.key = key;
                value = paddingButtonMy(value);
            }
            if (action_url_class == 'article-my-url') { // V2
                value.dropdown = {
                    'dd_item_1': 'edit_my_article',
                    'dd_item_2': 'send',
                    'dd_item_3': 'share',
                    'dd_item_4': 'delete',
                    'dd_item_5': 'copy_link'
                };
                //value.key = key;
                value = paddingButtonMy(value);
            }
            if (action_url_class == 'event-url') {
                value.dropdown = {
                    'dd_item_1': 'edit_my_event',
                    'dd_item_2': 'send',
                    'dd_item_3': 'share',
                    'dd_item_4': 'delete_my_event',
                    'dd_item_5': 'copy_link'
                };
                //value.key = key;
                value = paddingButtonMy(value);
            }
            if (action_url_class == 'post-my-url') { // V2
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': 'share',
                    'dd_item_3': my_item_edit_type,
                    'dd_item_4': 'delete_my_post',
                    'dd_item_5': 'copy_link'
                };
                //value.key = key;
                value = paddingButtonMy(value);
            }
            if (action_url_class == 'file-inbox-url') { // TODO: remove
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share,
                    'dd_item_3': 'delete'
                };
                //value.key = key;
                value = paddingButtonInbox(value);
            }
            if (action_url_class == 'message-inbox-url') { // V2
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share,
                    'dd_item_3': 'delete_inbox'
                };
                //value.key = key;
                value = paddingButtonInbox(value);
            }
            if (action_url_class == 'file-sent-url') { // TODO: remove
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share,
                    'dd_item_3': 'delete'
                };
                //value.key = key;
                value = paddingButtonSent(value);
            }
            if (action_url_class == 'message-sent-url') { // V2
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share,
                    'dd_item_3': 'delete_sent'
                };
                //value.key = key;
                value = paddingButtonSent(value);
            }
            if (action_url_class == 'showmulti') { // V2 do V3
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share,
                    'dd_item_3': 'embed',
                    'dd_item_5': 'copy_link'
                };
                //value.key = key;
                value = paddingButtonSent(value);
            }
            if (action_url_class == 'shownext') { // V2
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share
                };
                //value.key = key;
                value = paddingButtonSent(value);
            }
            if (action_url_class == 'file-spring-url') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share
                };
                //value.key = key;
                value = paddingButtonSent(value);
            }
            if (action_url_class == 'article') { // V2
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share
                };
                //value.key = key;
                value = paddingButtonSent(value);
            }
            /!*if (action_url_class == 'my-posts-url') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': 'share',
                    'dd_item_3': 'delete-my-post'
                };
                value.key = key;
                value = paddingButtonMyPosts(value);
                //console.log("showTile value -----> " + JSON.stringify(value));
            }*!/
            if (action_url_class == 'item-card') { // V2
                value.dropdown = {};
            }
            return value;
        }
    */

    /*$.fn.oneTimeInboxTest05022019 = function (options) {
        oneTimeInboxSettings = $.extend({
            authorized: authorized
        }, options);
        $.fn.showcaseVideoTextButtonTest05022019(paddingButtonOneTime(oneTimeInboxSettings));
    };*/

    $.fn.showItemCard = function (options) { // TODO: remove? no!!! remove 17062022 no, recreate 07072022
        showItemCardSettings = $.extend({
            showcaseItemCard: '.videme_item_card'
        }, options);
        //console.log("$.fn.showItemCard options -----> " + JSON.stringify(options));
        console.log("$.fn.showItemCard showItemCardSettings -----> " + JSON.stringify(showItemCardSettings));

        if ($(this).length) {
            //console.log("$.fn.fileMy $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileMy $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showItemCardSettings.showcaseItemCard);
        }
        //console.log("$.fn.fileMy tempObject -----> " + tempObject.length);
        //tempObject.html(VidemeProgress);
        //$.fn.getItemInfo(showItemCardSettings, tempObject);
        $.getJSON("https://api.vide.me/v2/items/info/?item_id=" + options.item_id + "&videmecallback=?",
            function (data) {
                if (!$.isEmptyObject(data)) {
                    console.log("$.fn.showItemCard data -----> " + JSON.stringify(data));
                    tempObject.empty();
                    var array = [];
                    //array[0] = data;
                    if (options.embed) data.embed = true;
                    array.push(data);
                    console.log("$.fn.showItemCard array -----> " + JSON.stringify(array));

                    //var courent_id = 0;
                    var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
                    //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul>");

                    //showTileMultipleLI(parseDataArrayToObject(array), id_list_group, "shownext", 0);
                    //tempObject.html(showListMedia({0: data}));
                    tempObject.html(showListMedia(parseMyChartItemsForDoorbellSign(data)));

                    //var trueValue = paddingUserInfo(data);
                    //tempObject.append(showMediaElementLi(trueValue));
                    //08072022 tempObject.append(showTileTasks(parseDataArrayToObject({0: data})));
                    //tempObject.html(showListMedia(parseMyChartItemsForDoorbellSign({0: data})));

                } else {
                    console.log("$.fn.showItemCard data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                return false;
            });
    };

    $.fn.showItemCardChart = function (options) { // 26072022
        showItemCardSettings = $.extend({
            showcaseItemCard: '.videme_item_card'
        }, options);
        //console.log("$.fn.showItemCard options -----> " + JSON.stringify(options));
        console.log("$.fn.showItemCardChart showItemCardSettings -----> " + JSON.stringify(showItemCardSettings));

        if ($(this).length) {
            //console.log("$.fn.fileMy $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileMy $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showItemCardSettings.showcaseItemCard);
        }
        //console.log("$.fn.fileMy tempObject -----> " + tempObject.length);
        //tempObject.html(VidemeProgress);
        //$.fn.getItemInfo(showItemCardSettings, tempObject);
        $.getJSON("https://api.vide.me/v2/items/info/?item_id=" + options.item_id + "&videmecallback=?",
            function (data) {
                if (!$.isEmptyObject(data)) {
                    console.log("$.fn.showItemCardChart data -----> " + JSON.stringify(data));
                    tempObject.empty();
                    var array = [];
                    //array[0] = data;
                    //if (options.embed) data.embed = true;
                    array.push(data);
                    //console.log("$.fn.showItemCardChart array -----> " + JSON.stringify(array));

                    //var courent_id = 0;
                    //var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
                    //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul>");

                    //showTileMultipleLI(parseDataArrayToObject(array), id_list_group, "shownext", 0);
                    //tempObject.html(showListMedia({0: data}));
                    //tempObject.html(showListMedia(parseMyChartItemsForDoorbellSign(data)));
                    //tempObject.html(showListMedia(parseMyChartItemsForDoorbellSign({0: data})));
                    //tempObject.html(showListMedia(parseMyChartItemsForDoorbellSign(array)));
                    tempObject.html(showListMedia(array));

                    //var trueValue = paddingUserInfo(data);
                    //tempObject.append(showMediaElementLi(trueValue));
                    //08072022 tempObject.append(showTileTasks(parseDataArrayToObject({0: data})));
                    //tempObject.html(showListMedia(parseMyChartItemsForDoorbellSign({0: data})));

                } else {
                    console.log("$.fn.showItemCardChart data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                return false;
            });
    };

    $.fn.showUserCardBySpring = function (options) { // 25072022
        showUserCardBySpringSettings = $.extend({
            showcaseUserCardBySpring: '.videme_user_card'
        }, options);
        console.log("$.fn.showUserCardBySpring showUserCardBySpringSettings -----> " + JSON.stringify(showUserCardBySpringSettings));
        if ($(this).length) {
            //console.log("$.fn.fileMy $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileMy $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showUserCardBySpringSettings.showcaseUserCardBySpring);
        }
        $.getJSON("https://api.vide.me/v2/spring/info/?spring=" + options.spring + "&videmecallback=?",
            function (data) {
                if (!$.isEmptyObject(data)) {
                    var dataArray = [];
                    dataArray[0] = data;
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parseUserForDoorbellSign(dataArray), tempObject
                        )
                    );
                } else {
                    console.warn("$.fn.showFriendsMy data -----> no");
                    //tempObject.html("No friends");
                    tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                return false;
            });
    };

    /*$.fn.getItemInfo = function (options, tempObject) {
        //console.log("$.fn.getItemInfo options -----> " + JSON.stringify(options));
        $.getJSON("https://api.vide.me/v2/items/info/?item_id=" + options.item_id + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.getItemInfo data -----> " + JSON.stringify(data));
                tempObject.html($.fn.itemCard(data, tempObject));
            })
            .done(function (data) {
            })
            .fail(function (data) {
                return false;
            });
    };

    $.fn.itemCard = function (options, tempObject) {
        itemCardSettings = $.extend({
            authorized: authorized
        }, options);
        console.log("$.fn.itemCard itemCardSettings -----> " + JSON.stringify(itemCardSettings));
        //var element = options,
        /!*var attributes = {};
        //$.each(element.get(0).attributes, function(i, attrib){
        $.each(options.get(0).attributes, function (i, attrib) {
            if (attrib.value) {
                attributes[attrib.name] = attrib.value;
            }
        });*!/
        //attributes = filter_array(attributes);
        //attributes = filter_obj(attributes);
        //attributes = attributes.filter(function(e){return e});
        //attributes = jQuery.grep(attributes, function(n){ return (n); });
        /!*var my_array = attributes.filter(function(x){
            return (x !== (undefined || null || ''));
        });*!/
        //var tempObject = $(this);
        var array = [];
        array[0] = options;

        showTileMultiple(parseDataArrayToObject(array), tempObject, "shownext");


        /!*options = paddingUserInfo(options);
        console.log("$.fn.itemCard options -----> " + JSON.stringify(options));

        if (options.type == 'article') var img = 'https://s3.amazonaws.com/img.vide.me/' + options.cover;
        if (options.type == 'video') var img = 'https://s3.amazonaws.com/img.vide.me/' + options.item_id + ".jpg";
        if (options.type == 'image') var img = 'https://s3.amazonaws.com/img.vide.me/' + options.cover;
        //this.html(
        return (
            "<div class=\"card\" style=\"width: 18rem;\">\n" +
            "  <img class=\"card-img-top\" src=\"" + img + "\" alt=\"Card image cap\">\n" +
            "  <div class=\"card-body\">\n" +
            "    <h5 class=\"card-title\">" + options.title + "</h5>\n" +
            "    <p class=\"card-text\">" + options.user_display_name + "</p>\n" +
            "    <p class=\"card-text\">" + options.content + "</p>\n" +
            "    <p class=\"card-text\">" + options.created_at + "</p>\n" +
            "  </div>\n" +
            "</div>");*!/
        //tempObject.html("$.fn.itemCard attributes -----> " + JSON.stringify(attributes));
        //return this;
        //return tempObject;
    };*/

    /*$.fn.showNewRec = function (options) { // keep 25072022
        showNewRecSettings = $.extend({
            subject: '',
            message: '',
            femail: '',
            email: '',
            file: '',
            messageid: '',
            time: '',
            authorized: authorized,
            showNewRecPlace: "#result-new-video"
        }, options);

        console.log("$.fn.showNewRec showNewRecSettings.authorized -----> " + showNewRecSettings.authorized);

        if ($(this).length) {
            console.log("$.fn.showNewRec $(this) -----> yes " + $(this).length);
            var tempObjectPopVideo = $(this);
        } else {
            console.log("$.fn.showNewRec $(this) -----> nooo! " + $(this).length);
            var tempObjectPopVideo = $(showNewRecSettings.showNewRecPlace);
        }
        console.log("$.fn.showNewRec tempObject -----> " + tempObjectPopVideo.length);
        //tempObjectPopVideo.html(VidemeProgress);
        //==tempObjectPopVideo.append('https://api.vide.me/opportunities/?subject=' + showNewRecSettings.subject + "&message=" +showNewRecSettings.message + "&email=" + showNewRecSettings.email + "&m=" + showNewRecSettings.file + "&messageid=" + showNewRecSettings.messageid);
        tempObjectPopVideo.prepend(
            '<hr>' +
            'From: <b>' + showNewRecSettings.femail + '</b>' +
            '<span class="pull-right">To: <b>' + showNewRecSettings.email + '</b></span>' +
            '<br>' +
            '<p class="text-muted">at: ' + convertTimestamp(showNewRecSettings.time) + '</p>' +
            '<strong>' + showNewRecSettings.subject + '</strong>' +
            '<p>' + showNewRecSettings.message + '</p>' +
            '<a href="https://vide.me/v?m=' + showNewRecSettings.file + '" class="thumbnail" target="_blank">' +
            '<img src="https://api.vide.me/img/?i=' + showNewRecSettings.file + '.jpg" alt="..." class="">' +
            '</a>');
        return tempObjectPopVideo;
        //return VidemeProgress;
    };*/

    /*$.fn.showNewRecBS4 = function (options) { // keep
        showNewRecSettings = $.extend({
            subject: '',
            message: '',
            femail: '',
            email: '',
            file: '',
            messageid: '',
            time: '',
            authorized: authorized,
            showNewRecPlace: "#result-new-video"
        }, options);

        console.log("$.fn.showNewRec showNewRecSettings.authorized -----> " + showNewRecSettings.authorized);

        if ($(this).length) {
            console.log("$.fn.showNewRec $(this) -----> yes " + $(this).length);
            var tempObjectPopVideo = $(this);
        } else {
            console.log("$.fn.showNewRec $(this) -----> nooo! " + $(this).length);
            var tempObjectPopVideo = $(showNewRecSettings.showNewRecPlace);
        }
        console.log("$.fn.showNewRec tempObject -----> " + tempObjectPopVideo.length);
        //tempObjectPopVideo.html(VidemeProgress);
        //==tempObjectPopVideo.append('https://api.vide.me/opportunities/?subject=' + showNewRecSettings.subject + "&message=" +showNewRecSettings.message + "&email=" + showNewRecSettings.email + "&m=" + showNewRecSettings.file + "&messageid=" + showNewRecSettings.messageid);
        tempObjectPopVideo.prepend(
            '<hr>' +
            'From: <b>' + showNewRecSettings.femail + '</b>' +
            '<span class="pull-right">To: <b>' + showNewRecSettings.email + '</b></span>' +
            '<br>' +
            '<p class="text-muted">at: ' + convertTimestamp(showNewRecSettings.time) + '</p>' +
            '<strong>' + showNewRecSettings.subject + '</strong>' +
            '<p>' + showNewRecSettings.message + '</p>' +
            '<a href="https://vide.me/v?m=' + showNewRecSettings.file + '" target="_blank">' +
            '<img src="' + origin_img_vide_me + showNewRecSettings.file + '.jpg" alt="..." class="img-thumbnail">' +
            '</a>');
        return tempObjectPopVideo;
        //return VidemeProgress;
    };*/

    /*$.fn.oneTimeInboxAds = function (options) {
        oneTimeInboxSettings = $.extend({
            /!*file: '',
            messageid: '',
            updatedAt: '',
            subject: '',
            message: '',
            fromUserName: '',
            toUserName: '',
            recipients: '',
            conferenceId: '',*!/
            authorized: authorized
        }, options);

        console.log("$.fn.oneTimeInbox oneTimeInboxSettings.authorized -----> " + oneTimeInboxSettings.authorized);

        if (oneTimeInboxSettings.authorized) {
            console.log("$.fn.oneTimeInbox oneTimeInboxSettings.authorized -----> yes " + oneTimeInboxSettings.authorized);
            $.fn.showcaseVideoTextButtonAds(paddingButtonInbox(oneTimeInboxSettings));
        } else {
            console.log("$.fn.oneTimeInbox oneTimeInboxSettings.authorized -----> no " + oneTimeInboxSettings.authorized);
            $.fn.showcaseVideoTextButtonAds(paddingButtonOneTime(oneTimeInboxSettings));
        }

    };*/

    /*272022 $.fn.fileInbox = function (options) {
        console.log("$.fn.fileInbox -----> ok");
        fileInboxSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileInbox $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileInbox $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileInboxSettings.showcaseVideo);
        }
        console.log("$.fn.fileInbox tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        //==return this.each(function () {
        //var tempObject = $(this);
        var start_time = performance.now();
        //$.getJSON("https://api.vide.me/file/inbox/?limit=" + fileInboxSettings.limit + "&videmecallback=?",
        $.getJSON("https://api.vide.me/v2/message/inbox/?limit=" + fileInboxSettings.limit + "&videmecallback=?",
            function (data) {
                var response_time = Math.round(performance.now() - start_time);
                //console.log('doTasks took ' + response_time + ' milliseconds to execute.');
                $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (data) {
                    //console.log("$.fn.fileInbox data -----> yes" + JSON.stringify(data));
                    //console.log("$.fn.fileInbox data[0] -----> " + JSON.stringify(data[0]));
                    tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "file-inbox-url"));
                    $.fn.showcaseVideoTextButton(paddingButtonInbox(data[0]));
                } else {
                    console.log("$.fn.fileInbox data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
        //==});
    };*/

    /* 25072022 $.fn.itemsInboxScroll = function (options) {
        console.log("$.fn.itemsInboxScroll -----> ok");
        fileInboxSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileInbox $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileInbox $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileInboxSettings.showcaseVideo);
        }
        console.log("$.fn.fileInbox tempObject -----> " + tempObject.length);
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = 4;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //tempObject.html("<ul class='list-group' id='" + id_list_group + "'></ul>");
        tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
            "https://api.vide.me/v2/message/inbox/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'message-inbox-url',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            /!*if ($(document).height() - win.height() == win.scrollTop()) {
                //$('#loading').show();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
                    "https://api.vide.me/v2/message/inbox/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'message-inbox-url',
                    offset,
                    tempObject);
                offset = offset + limit;
            }*!/
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.itemsInboxScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyConnectData,
                    "https://api.vide.me/v2/message/inbox/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'message-inbox-url',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };*/

    /*25072022 $.fn.itemsInboxScrollV3 = function (options) {
        console.log("$.fn.itemsInboxScrollV3 -----> ok");
        itemsInboxScrollV3Settings = $.extend({
            limit: 6,
            showcaseVideo: "#videme-tile-v3"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileInbox $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileInbox $(this) -----> nooo! " + $(this).length);
            var tempObject = $(itemsInboxScrollV3Settings.showcaseVideo);
        }
        console.log("$.fn.fileInbox tempObject -----> " + tempObject.length);
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = 4;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileV3(emptyItemsData,
            "https://api.vide.me/v2/message/inbox/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'message-inbox-url',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.itemsInboxScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileV3(emptyConnectData,
                    "https://api.vide.me/v2/message/inbox/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'message-inbox-url',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };*/

    /*25072022 $.fn.itemsSentScroll = function (options) {
        console.log("$.fn.itemsSentScroll -----> ok");
        fileInboxSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileInbox $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileInbox $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileInboxSettings.showcaseVideo);
        }
        console.log("$.fn.itemsSentScroll tempObject -----> " + tempObject.length);
        //tempObject.html(VidemeProgress);
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = 4;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //tempObject.html("<ul class='list-group' id='" + id_list_group + "'></ul>");
        tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
            "https://api.vide.me/v2/message/sent/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'message-sent-url',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            /!*if ($(document).height() - win.height() == win.scrollTop()) {
                //$('#loading').show();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
                    "https://api.vide.me/v2/message/sent/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'message-sent-url',
                    offset,
                    tempObject);
                offset = offset + limit;
            }*!/
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.itemsSentScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyConnectData,
                    "https://api.vide.me/v2/message/sent/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'message-sent-url',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };*/

    /* 25072022 $.fn.itemsSentScrollV3 = function (options) {
        console.log("$.fn.itemsSentScrollV3 -----> ok");
        itemsSentScrollV3Settings = $.extend({
            limit: 6,
            showcaseVideo: "#videme-tile-v3"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileInbox $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileInbox $(this) -----> nooo! " + $(this).length);
            var tempObject = $(itemsSentScrollV3Settings.showcaseVideo);
        }
        console.log("$.fn.itemsSentScrollV3 tempObject -----> " + tempObject.length);
        //tempObject.html(VidemeProgress);
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = 4;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileV3(emptyItemsData,
            "https://api.vide.me/v2/message/sent/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'message-sent-url',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.itemsSentScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileV3(emptyConnectData,
                    "https://api.vide.me/v2/message/sent/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'message-sent-url',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };*/

    /* 25072022 $.fn.itemsMyVideosScroll = function (options) {
        console.log("$.fn.itemsMyVideosScroll -----> ok");
        fileInboxSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 16,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileInbox $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileInbox $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileInboxSettings.showcaseVideo);
        }
        console.log("$.fn.itemsMyVideosScroll tempObject -----> " + tempObject.length);
        //tempObject.html(VidemeProgress);
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = 4;
        //var itemsData = true;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //tempObject.html("<ul class='list-group' id='" + id_list_group + "'></ul>");
        tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
            "https://api.vide.me/v2/items/my/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'file-my-url',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            /!*console.log("win.scroll -----> itemsData" + itemsData);
            if ($(document).height() - win.height() == win.scrollTop()) {
                //$('#loading').show();
                //$('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
                    "https://api.vide.me/v2/items/my/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'file-my-url',
                    offset,
                    tempObject);
                offset = offset + limit;
            }*!/
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.itemsMyVideosScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyConnectData,
                    "https://api.vide.me/v2/items/my/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'file-my-url',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };*/
    $.fn.itemsMyVideosScrollV3 = function (options) { // 25072022
        console.log("$.fn.itemsMyVideosScrollV3 -----> ok");
        itemsMyVideosScrollV3Settings = $.extend({
            limit: 16,
            showcaseVideo: "#videme-tile-v3"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileInbox $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileInbox $(this) -----> nooo! " + $(this).length);
            var tempObject = $(itemsMyVideosScrollV3Settings.showcaseVideo);
        }
        console.log("$.fn.itemsMyVideosScrollV3 tempObject -----> " + tempObject.length);
        //tempObject.html(VidemeProgress);
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        var limit = itemsMyVideosScrollV3Settings.limit;
        //var itemsData = true;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //tempObject.html("<ul class='list-group' id='" + id_list_group + "'></ul>");
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileV3(emptyItemsData,
            "https://api.vide.me/v2/items/my/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            //'videme-v3-my-item-url',
            'showmulti',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.itemsMyVideosScroll onScroll");
                eventScroll(); // TODO: recreate
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileV3(emptyConnectData,
                    "https://api.vide.me/v2/items/my/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    //'videme-v3-my-item-url',
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };

    /* 25072022 $.fn.itemsMyImagesScroll = function (options) {
        console.log("$.fn.itemsMyImagesScroll -----> ok");
        fileInboxSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileInbox $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileInbox $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileInboxSettings.showcaseVideo);
        }
        console.log("$.fn.itemsMyImagesScroll tempObject -----> " + tempObject.length);
        //tempObject.html(VidemeProgress);
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = 4;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //tempObject.html("<ul class='list-group' id='" + id_list_group + "'></ul>");
        tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
            "https://api.vide.me/v2/items/my_images/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'file-my-url',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            /!*if ($(document).height() - win.height() == win.scrollTop()) {
                //$('#loading').show();
                //$('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
                    "https://api.vide.me/v2/items/my_images/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'file-my-url',
                    offset,
                    tempObject);
                offset = offset + limit;
            }*!/
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.itemsMyImagesScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyConnectData,
                    "https://api.vide.me/v2/items/my_images/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'file-my-url',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };*/

    $.fn.itemsMyImagesScrollV3 = function (options) { // 25072022
        console.log("$.fn.itemsMyImagesScrollV3 -----> ok");
        itemsMyImagesScrollV3Settings = $.extend({
            limit: 6,
            showcaseVideo: "#videme-tile-v3"
        }, options);
        if ($(this).length) {
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileInbox $(this) -----> nooo! " + $(this).length);
            var tempObject = $(itemsMyImagesScrollV3Settings.showcaseVideo);
        }
        console.log("$.fn.itemsMyImagesScrollV3 tempObject -----> " + tempObject.length);
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = 4;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileV3(emptyItemsData,
            "https://api.vide.me/v2/items/my_images/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            //'videme-v3-my-posts-url',
            //'videme-v3-my-image-url',
            'showmulti',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.itemsMyImagesScroll onScroll");
                eventScroll(); // TODO: recreate
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileV3(emptyConnectData,
                    "https://api.vide.me/v2/items/my_images/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    //'videme-v3-my-posts-url',
                    //'videme-v3-my-image-url',
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };

    /* 25072022 $.fn.itemsMyArticlesScroll = function (options) {
        console.log("$.fn.itemsMyArticlesScroll -----> ok");
        fileInboxSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileInbox $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileInbox $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileInboxSettings.showcaseVideo);
        }
        console.log("$.fn.itemsMyArticlesScroll tempObject -----> " + tempObject.length);
        //tempObject.html(VidemeProgress);
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = 4;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //tempObject.html("<ul class='list-group' id='" + id_list_group + "'></ul>");
        tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
            "https://api.vide.me/v2/items/my_article/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'article-my-url',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            /!*if ($(document).height() - win.height() == win.scrollTop()) {
                //$('#loading').show();
                //$('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
                    "https://api.vide.me/v2/items/my_article/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'article-my-url',
                    offset,
                    tempObject);
                offset = offset + limit;
            }*!/
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.itemsMyArticlesScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyConnectData,
                    "https://api.vide.me/v2/items/my_article/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'article-my-url',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };*/

    $.fn.itemsMyArticlesScrollV3 = function (options) { // 25072022
        console.log("$.fn.itemsMyArticlesScrollV3 -----> ok");
        itemsMyArticlesScrollV3Settings = $.extend({
            limit: 6,
            showcaseVideo: "#videme-tile-v3"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileInbox $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileInbox $(this) -----> nooo! " + $(this).length);
            var tempObject = $(itemsMyArticlesScrollV3Settings.showcaseVideo);
        }
        console.log("$.fn.itemsMyArticlesScrollV3 tempObject -----> " + tempObject.length);
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = 4;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileV3(emptyItemsData,
            "https://api.vide.me/v2/items/my_article/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            //'videme-v3-my-posts-url',
            //'videme-v3-my-article-url',
            'showmulti',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.itemsMyArticlesScroll onScroll");
                eventScroll(); // TODO: recreate
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileV3(emptyConnectData,
                    "https://api.vide.me/v2/items/my_article/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    //'videme-v3-my-posts-url',
                    //'videme-v3-my-article-url',
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };

    /* 25072022 $.fn.itemsMyEventsScroll = function (options) {
        console.log("$.fn.itemsMyEventsScroll -----> ok");
        myEventsSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileInbox $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileInbox $(this) -----> nooo! " + $(this).length);
            var tempObject = $(myEventsSettings.showcaseVideo);
        }
        console.log("$.fn.itemsMyEventsScroll tempObject -----> " + tempObject.length);
        //tempObject.html(VidemeProgress);
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = 4;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //tempObject.html("<ul class='list-group' id='" + id_list_group + "'></ul>");
        tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden hidden\"></i>");

        videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
            "https://api.vide.me/v2/items/my_events/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'event-url',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            /!*if ($(document).height() - win.height() == win.scrollTop()) {
                //$('#loading').show();
                //$('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
                    "https://api.vide.me/v2/items/my_events/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'event-url',
                    offset,
                    tempObject);
                offset = offset + limit;
            }*!/
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.itemsMyEventsScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyConnectData,
                    "https://api.vide.me/v2/items/my_events/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'event-url',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };*/

    $.fn.itemsMyEventsScrollV3 = function (options) { // 25072022
        console.log("$.fn.itemsMyEventsScrollV3 -----> ok");
        itemsMyEventsScrollV3Settings = $.extend({
            limit: 6,
            showcaseVideo: "#videme-tile-v3"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileInbox $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileInbox $(this) -----> nooo! " + $(this).length);
            var tempObject = $(itemsMyEventsScrollV3Settings.showcaseVideo);
        }
        console.log("$.fn.itemsMyEventsScrollV3 tempObject -----> " + tempObject.length);
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = 4;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //tempObject.html("<ul class='list-group' id='" + id_list_group + "'></ul>");
        tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden hidden\"></i>");

        videmeUI.doGetJSONTileV3(emptyItemsData,
            "https://api.vide.me/v2/items/my_events/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            //'event-url',
            //'event-url',
            'showmulti',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.itemsMyEventsScroll onScroll");
                eventScroll();
                //$('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileV3(emptyConnectData,
                    "https://api.vide.me/v2/items/my_events/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    //'event-url',
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };

    /* 25072022 $.fn.itemsMyPostsScroll = function (options) {
        console.log("$.fn.itemsMyPostsScroll -----> ok");
        fileInboxSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileInbox $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileInbox $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileInboxSettings.showcaseVideo);
        }
        console.log("$.fn.fileInbox tempObject -----> " + tempObject.length);
        //tempObject.html(VidemeProgress);
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = 4;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        tempObject.html("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden hidden\"></i>");

        videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
            "https://api.vide.me/v2/posts/my/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'post-my-url',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            /!*if ($(document).height() - win.height() == win.scrollTop()) {
                //$('#loading').show();
                //$('.videme_tile_loading').toggleClass('hidden');
                //$('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
                    "https://api.vide.me/v2/posts/my/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'post-my-url',
                    offset,
                    tempObject);
                offset = offset + limit;
                //$('.videme_tile_loading').toggleClass('hidden');

            }*!/
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.itemsMyPostsScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyConnectData,
                    "https://api.vide.me/v2/posts/my/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'post-my-url',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };*/

    $.fn.itemsMyPostsScrollV3 = function (options) { // 25072022
        //console.log("$.fn.itemsMyPostsScrollV3 -----> ok");
        itemsMyPostsScrollV3Settings = $.extend({
            limit: 16,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileInbox $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileInbox $(this) -----> nooo! " + $(this).length);
            var tempObject = $(itemsMyPostsScrollV3Settings.showcaseVideo);
        }
        //console.log("$.fn.itemsMyPostsScrollV3Settings tempObject -----> " + tempObject.length);
        //tempObject.html(VidemeProgress);
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        var limit = itemsMyPostsScrollV3Settings.limit;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //tempObject.html("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden hidden\"></i>");

        videmeUI.doGetJSONTileV3(emptyItemsData,
            "https://api.vide.me/v2/posts/my/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            //'post-my-url',
            //'videme-v3-my-posts-url',
            //'videme-v3-my-post-url',
            //'showmulti',
            'post-my-url',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            /*if ($(document).height() - win.height() == win.scrollTop()) {
                //$('#loading').show();
                //$('.videme_tile_loading').toggleClass('hidden');
                //$('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
                    "https://api.vide.me/v2/posts/my/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'post-my-url',
                    offset,
                    tempObject);
                offset = offset + limit;
                //$('.videme_tile_loading').toggleClass('hidden');

            }*/
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.itemsMyPostsScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileV3(emptyConnectData,
                    "https://api.vide.me/v2/posts/my/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    //'post-my-url',
                    //'videme-v3-my-post-url',
                    //'showmulti',
                    'post-my-url',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };

    /* 25072022 $.fn.itemsMyPartnersPendingToMeScrollV3 = function (options) { // TODO: remove!!! 16102021
        //console.log("$.fn.itemsMyPostsScrollV3 -----> ok");
        itemsMyPartnersPendingToMeScrollV3Settings = $.extend({
            limit: 16,
            showcaseVideo: "#videme-tile-v3"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileInbox $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileInbox $(this) -----> nooo! " + $(this).length);
            var tempObject = $(itemsMyPartnersPendingToMeScrollV3Settings.showcaseVideo);
        }
        //console.log("$.fn.itemsMyPostsScrollV3Settings tempObject -----> " + tempObject.length);
        //tempObject.html(VidemeProgress);
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        var limit = itemsMyPartnersPendingToMeScrollV3Settings.limit;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //tempObject.html("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden hidden\"></i>");
        tempObject.empty();

        videmeUI.doGetJSONTileV3(emptyItemsData,
            "https://api.vide.me/v2/partners/pending_to_me/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            //'post-my-url',
            //'videme-v3-my-posts-url',
            //'videme-v3-my-post-url',
            //'showmulti',
            'partner-req-url',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            /!*if ($(document).height() - win.height() == win.scrollTop()) {
                //$('#loading').show();
                //$('.videme_tile_loading').toggleClass('hidden');
                //$('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
                    "https://api.vide.me/v2/posts/my/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'post-my-url',
                    offset,
                    tempObject);
                offset = offset + limit;
                //$('.videme_tile_loading').toggleClass('hidden');

            }*!/
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.itemsMyPostsScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileV3(emptyConnectData,
                    "https://api.vide.me/v2/partners/pending_to_me/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    //'post-my-url',
                    //'videme-v3-my-post-url',
                    //'showmulti',
                    'partner-req-url',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };*/

    /* 25072022 $.fn.itemsMyPartnersPendingFromMeScrollV3 = function (options) { // TODO: remove
        //console.log("$.fn.itemsMyPostsScrollV3 -----> ok");
        itemsMyPartnersPendingFromMeScrollV3Settings = $.extend({
            limit: 16,
            showcaseVideo: "#videme-tile-v3"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileInbox $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileInbox $(this) -----> nooo! " + $(this).length);
            var tempObject = $(itemsMyPartnersPendingFromMeScrollV3Settings.showcaseVideo);
        }
        //console.log("$.fn.itemsMyPostsScrollV3Settings tempObject -----> " + tempObject.length);
        //tempObject.html(VidemeProgress);
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        var limit = itemsMyPartnersPendingFromMeScrollV3Settings.limit;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //tempObject.html("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden hidden\"></i>");
        tempObject.empty();

        videmeUI.doGetJSONTileV3(emptyItemsData,
            "https://api.vide.me/v2/partners/pending_from_me/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            //'post-my-url',
            //'videme-v3-my-posts-url',
            //'videme-v3-my-post-url',
            //'showmulti',
            'partner-req-url',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            /!*if ($(document).height() - win.height() == win.scrollTop()) {
                //$('#loading').show();
                //$('.videme_tile_loading').toggleClass('hidden');
                //$('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
                    "https://api.vide.me/v2/posts/my/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'post-my-url',
                    offset,
                    tempObject);
                offset = offset + limit;
                //$('.videme_tile_loading').toggleClass('hidden');

            }*!/
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.itemsMyPostsScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileV3(emptyConnectData,
                    "https://api.vide.me/v2/partners/pending_from_me/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    //'post-my-url',
                    //'videme-v3-my-post-url',
                    //'showmulti',
                    'partner-req-url',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };*/
    /* 25072022 $.fn.fileSent = function (options) { // TODO: remove
        fileSentSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileSent $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.fileSent $(this) -----> nooo! " + $(this).length);
            //var tempObject = $(fileSentSettings.showcaseVideo);
        }
        console.log("$.fn.fileSent tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/message/sent/?limit=" + fileSentSettings.limit + "&videmecallback=?",
            function (data) {
                var response_time = Math.round(performance.now() - start_time);
                if (!$.isEmptyObject(data)) {
                    $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                    //console.log("$.fn.fileSent data -----> yes" + JSON.stringify(data));
                    tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "file-sent-url"));
                    $.fn.showcaseVideoTextButton(paddingButtonSent(data[0]));
                } else {
                    console.log("$.fn.fileSent data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/

    /* 25072022 $.fn.fileMy = function (options) { // TODO: remove
        fileMySettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileMy $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileMy $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileMySettings.showcaseVideo);
        }
        console.log("$.fn.fileMy tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/items/my/?limit=" + fileMySettings.limit + "&videmecallback=?",
            function (data) {
                var response_time = Math.round(performance.now() - start_time);
                $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    //console.log("$.fn.fileMy data -----> yes" + JSON.stringify(data));
                    tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "file-my-url"));
                    $.fn.showcaseVideoTextButton(paddingButtonMy(data[0]));
                } else {
                    console.log("$.fn.fileMy data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/

    /* 25072022 $.fn.fileMyImages = function (options) { // TODO: remove
        fileMyImagesSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseImages: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileMy $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileMy $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileMyImagesSettings.showcaseImages);
        }
        console.log("$.fn.fileMy tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/items/my_images/?limit=" + fileMyImagesSettings.limit + "&videmecallback=?",
            function (data) {
                var response_time = Math.round(performance.now() - start_time);
                $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    //console.log("$.fn.fileMy data -----> yes" + JSON.stringify(data));
                    tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "file-my-url"));
                    //$.fn.showcaseVideoTextButton(paddingButtonMy(data[0]));
                } else {
                    console.log("$.fn.fileMy data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/

    $.fn.selectFromMyImages = function (options) { // 25072022 public function modalAlbumEdit
        // https://github.com/rvera/image-picker
        selectFromMyVideoSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseImages: "#select-from-my-image"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileMy $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileMy $(this) -----> nooo! " + $(this).length);
            var tempObject = $(selectFromMyVideoSettings.showcaseImages);
        }
        console.log("$.fn.selectFromMyImages tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        //var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/items/my_images/?limit=" + selectFromMyVideoSettings.limit + "&videmecallback=?",
            function (data) {
                //var response_time = Math.round(performance.now() - start_time);
                //$('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    //console.log("$.fn.fileMy data -----> yes" + JSON.stringify(data));
                    //tempObject.imagepicker();

                    //tempObject.html(showItemPrev(data));
                    showItemPrev(data);
                    //tempObject.html(showItemPrev(data)).imagepicker();
                    //$.fn.showcaseVideoTextButton(paddingButtonMy(data[0]));
                    //$(".image-picker").imagepicker();
                    /*$(".image-picker").append($("<option data-img-src='https://s3.amazonaws.com/img.vide.me/" + obj.cover + "'></option>")
                        .attr("value", obj.item_id)
                        .text(obj.title));*/
                    /*$.each(data, function(i, obj) {

                        /!*if(obj.image != null)
                        {
                            var imgSrc = obj.image;
                        }else{
                            imgSrc = '';
                        }*!/
                        //html.push("<img src=\"https://s3.amazonaws.com/img.vide.me/" + trueValue.cover + "\" alt=\"" + trueValue.title + "\" class=\"videme-item-prev-img_zzz img-thumbnail\">");

                        $('.image-picker')
                            .append($("<option data-img-src='https://s3.amazonaws.com/img.vide.me/" + obj.cover + "'></option>")
                                .attr("value", obj.item_id)
                                .text(obj.title));
                    });*/
                    $(".image-picker").imagepicker();

                    //tempObject.imagepicker();
                    //$(".image-picker").data('picker').sync_picker_with_select();
                    //$(tempObject).imagepicker();
                    //tempObject.imagepicker();
                    //tempObject.data('picker').sync_picker_with_select();
                } else {
                    console.log("$.fn.selectFromMyImages data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
        //tempObject.html(showItemPrev(data)).imagepicker();
        /*$.ajax({
            type: "GET",
            url: "https://api.vide.me/v2/items/my_images/",
            dataType: 'json',
            success: function(result){

               $(".image-picker").empty();

                $.each(result, function(i, obj) {

                    if(obj.image != null)
                    {
                        var imgSrc = obj.image;
                    }else{
                        imgSrc = '';
                    }
                    //html.push("<img src=\"https://s3.amazonaws.com/img.vide.me/" + trueValue.cover + "\" alt=\"" + trueValue.title + "\" class=\"videme-item-prev-img_zzz img-thumbnail\">");

           $('.image-picker')
              .append($("<option data-img-src='https://s3.amazonaws.com/img.vide.me/" + obj.cover + "'></option>")
                      .attr("value", obj.item_id)
                       .text(obj.title));
                });

                $(".image-picker").imagepicker({
                    show_label  : true
                });

            }});*/
    };

    /* 25072022 $.fn.fileMyPosts = function (options) { // TODO: remove
        fileMyPostsSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileMy $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileMy $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileMyPostsSettings.showcaseVideo);
        }
        console.log("$.fn.fileMyPosts tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/posts/my/?limit=" + fileMyPostsSettings.limit + "&videmecallback=?",
            function (data) {
                var response_time = Math.round(performance.now() - start_time);
                $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    //console.log("$.fn.fileMy data -----> yes" + JSON.stringify(data));
                    tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "my-posts-url"));
                    //$.fn.showcaseVideoTextButton(paddingButtonMy(data[0]));

                    //tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "file-spring-url"));
                    if (data[0].type == 'video') {
                        $.fn.showcaseVideoTextButton(paddingButtonMyPosts(data[0]));
                    } else {
                        $('.itemscope').addClass('hidden');
                    }
                } else {
                    console.log("$.fn.fileMy data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/

    $.fn.selectFromMyImagesCreateAlbum = function (options) { // 25072022 public function showcasePasList
        selectFromMyVideoSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseImages: "#select-from-my-image-create-album"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileMy $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileMy $(this) -----> nooo! " + $(this).length);
            var tempObject = $(selectFromMyVideoSettings.showcaseImages);
        }
        console.log("$.fn.selectFromMyImages tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        //var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/items/my_images/?limit=" + selectFromMyVideoSettings.limit + "&videmecallback=?",
            function (data) {
                //var response_time = Math.round(performance.now() - start_time);
                //$('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    //console.log("$.fn.fileMy data -----> yes" + JSON.stringify(data));
                    //tempObject.imagepicker();

                    //tempObject.html(showItemPrev(data));
                    showItemPrevCreateAlbum(data);
                    //tempObject.html(showItemPrev(data)).imagepicker();
                    //$.fn.showcaseVideoTextButton(paddingButtonMy(data[0]));
                    //$(".image-picker").imagepicker();
                    /*$(".image-picker").append($("<option data-img-src='https://s3.amazonaws.com/img.vide.me/" + obj.cover + "'></option>")
                        .attr("value", obj.item_id)
                        .text(obj.title));*/
                    /*$.each(data, function(i, obj) {

                        /!*if(obj.image != null)
                        {
                            var imgSrc = obj.image;
                        }else{
                            imgSrc = '';
                        }*!/
                        //html.push("<img src=\"https://s3.amazonaws.com/img.vide.me/" + trueValue.cover + "\" alt=\"" + trueValue.title + "\" class=\"videme-item-prev-img_zzz img-thumbnail\">");

                        $('.image-picker')
                            .append($("<option data-img-src='https://s3.amazonaws.com/img.vide.me/" + obj.cover + "'></option>")
                                .attr("value", obj.item_id)
                                .text(obj.title));
                    });*/
                    $(".image-picker-create-album").imagepicker();

                    //tempObject.imagepicker();
                    //$(".image-picker").data('picker').sync_picker_with_select();
                    //$(tempObject).imagepicker();
                    //tempObject.imagepicker();
                    //tempObject.data('picker').sync_picker_with_select();
                } else {
                    console.log("$.fn.selectFromMyImages data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
        //tempObject.html(showItemPrev(data)).imagepicker();
        /*$.ajax({
            type: "GET",
            url: "https://api.vide.me/v2/items/my_images/",
            dataType: 'json',
            success: function(result){

               $(".image-picker").empty();

                $.each(result, function(i, obj) {

                    if(obj.image != null)
                    {
                        var imgSrc = obj.image;
                    }else{
                        imgSrc = '';
                    }
                    //html.push("<img src=\"https://s3.amazonaws.com/img.vide.me/" + trueValue.cover + "\" alt=\"" + trueValue.title + "\" class=\"videme-item-prev-img_zzz img-thumbnail\">");

           $('.image-picker')
              .append($("<option data-img-src='https://s3.amazonaws.com/img.vide.me/" + obj.cover + "'></option>")
                      .attr("value", obj.item_id)
                       .text(obj.title));
                });

                $(".image-picker").imagepicker({
                    show_label  : true
                });

            }});*/
    };

    $.fn.selectFromMyVideoCreateArticle = function (options) { // 25072022
        selectFromMyVideoSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#select-from-my-video-create-article"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileMy $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileMy $(this) -----> nooo! " + $(this).length);
            var tempObject = $(selectFromMyVideoSettings.showcaseVideo);
        }
        console.log("$.fn.selectFromMyVideoCreateArticle tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        //var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/items/my/?limit=" + selectFromMyVideoSettings.limit + "&videmecallback=?",
            function (data) {
                //var response_time = Math.round(performance.now() - start_time);
                //$('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    //console.log("$.fn.fileMy data -----> yes" + JSON.stringify(data));
                    showItemVideoPrevForArticle(data);
                    $(".video-picker-create-article").imagepicker();
                } else {
                    console.log("$.fn.selectFromMyVideoCreateArticle data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    $.fn.selectFromMyVideoCreateCover = function (options) { // 25072022
        selectFromMyVideoSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#select-from-my-video-create-cover"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileMy $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileMy $(this) -----> nooo! " + $(this).length);
            var tempObject = $(selectFromMyVideoSettings.showcaseVideo);
        }
        console.log("$.fn.selectFromMyVideoCreateCover tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        //var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/items/my/?limit=" + selectFromMyVideoSettings.limit + "&videmecallback=?",
            function (data) {
                //var response_time = Math.round(performance.now() - start_time);
                //$('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    //console.log("$.fn.fileMy data -----> yes" + JSON.stringify(data));
                    showItemVideoPrevForCover(data);
                    $(".video-picker-create-cover").imagepicker();
                } else {
                    console.log("$.fn.selectFromMyVideoCreateCover data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    $.fn.selectFromMyImageCreateArticle = function (options) { // 25072022
        selectFromMyImageCreateArticleSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseImage: "#select-from-my-image-create-article"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileMy $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileMy $(this) -----> nooo! " + $(this).length);
            var tempObject = $(selectFromMyImageCreateArticleSettings.showcaseImage);
        }
        console.log("$.fn.selectFromMyImageCreateArticle tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        //var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/items/my_images/?limit=" + selectFromMyVideoSettings.limit + "&videmecallback=?",
            function (data) {
                //var response_time = Math.round(performance.now() - start_time);
                //$('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    //console.log("$.fn.fileMy data -----> yes" + JSON.stringify(data));
                    showItemImagePrevForArticle(data);
                    $(".my-image-picker-create-article").imagepicker();
                } else {
                    console.log("$.fn.my-image-picker-create-article data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /* 25072022 $.fn.fileMyConnectForFriends = function (options) { // IODO: remove
        fileMyConnectForFriendsSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-update-for-friends-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileMyConnect $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileMy $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileMyConnectForFriendsSettings.showcaseVideo);
        }
        //console.log("$.fn.fileMyConnect tempObject -----> " + tempObject.length);
        if ($.cookie('vide_nad')) {
            $('.videme-update-for-friends').removeClass('hidden');
            tempObject.html(VidemeProgress);
            var start_time = performance.now();
            $.getJSON("https://api.vide.me/v2/items/connect/for_friends/?limit=" + fileMyConnectForFriendsSettings.limit + "&videmecallback=?",
                function (data) {
                    //if (typeof data  !== 'undefined' && data.length > 0) {
                    //if (data.length > 0) {
                    if ($.isEmptyObject(data)) {
                        //console.log("$.fn.fileMyConnect data -----> no");
                        tempObject.empty();
                        $('.itemscope').hide();
                        tempObject.append('Create new connect:');
                        $('#videme-connect').removeClass('hidden');
                        $('#videme-connect').showPopConnect({
                            limit: 18
                        });
                        //$.fn.showPopConnect();
                    } else {
                        var response_time = Math.round(performance.now() - start_time);
                        $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                        //console.log("$.fn.fileMy data -----> yes" + JSON.stringify(data));
                        //tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "shownext"));
                        showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext");
                        /!*$(".video-js").each(function (videoIndex) {
                            console.log("video-js each ");
                            var videoId = $(this).attr("id");
                            videojs(videoId).ready(function(){
                                this.on("play", function(e) {
                                    //pause other video
                                    $(".video-js").each(function (index) {
                                        if (videoIndex !== index) {
                                            this.player.pause();
                                        }
                                    });
                                    videojs.log('postsOfSpringVideoOnlyMultiple play ' + this.currentSrc());
                                });
                            });
                        });*!/
                        //$.fn.showcaseVideoTextButton(paddingButtonMy(data[0]));
                    }
                })
                .done(function (data) {
                })
                .fail(function (data) {
                    tempObject.html(showError(data));
                })
                .always(function () {
                });
        } else {
            //$('#modal-signin').modal('show');
            //$(".signin-toggle").removeClass("hidden");
            $(".itemscope").addClass("hidden");
        }
    };*/

    /* 25072022 $.fn.fileMyConnect = function (options) {
        fileMyConnectSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileMyConnect $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileMy $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileMyConnectSettings.showcaseVideo);
        }
        //console.log("$.fn.fileMyConnect tempObject -----> " + tempObject.length);
        if ($.cookie('vide_nad')) {
            $('.update').removeClass('hidden');
            tempObject.html(VidemeProgress);
            var start_time = performance.now();
            $.getJSON("https://api.vide.me/v2/items/connect/?limit=" + fileMyConnectSettings.limit + "&videmecallback=?",
                function (data) {
                    //if (typeof data  !== 'undefined' && data.length > 0) {
                    //if (data.length > 0) {
                    if ($.isEmptyObject(data)) {
                        tempObject.empty();
                        //console.log("$.fn.fileMyConnect data -----> no");
                        tempObject.html('');
                        $('.itemscope').hide();
                        tempObject.append('Create new connect:');
                        $('#videme-connect').removeClass('hidden');
                        $('#videme-connect').showPopConnect({
                            limit: 18
                        });
                        //$.fn.showPopConnect();
                    } else {
                        var response_time = Math.round(performance.now() - start_time);
                        $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                        tempObject.empty();
                        //console.log("$.fn.fileMy data -----> yes" + JSON.stringify(data));
                        //tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "shownext"));
                        showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext");
                        /!*$(".video-js").each(function (videoIndex) {
                            console.log("video-js each ");
                            var videoId = $(this).attr("id");
                            videojs(videoId).ready(function(){
                                this.on("play", function(e) {
                                    //pause other video
                                    $(".video-js").each(function (index) {
                                        if (videoIndex !== index) {
                                            this.player.pause();
                                        }
                                    });
                                    videojs.log('postsOfSpringVideoOnlyMultiple play ' + this.currentSrc());
                                });
                            });
                        });*!/
                        //$.fn.showcaseVideoTextButton(paddingButtonMy(data[0]));
                    }
                })
                .done(function (data) {
                })
                .fail(function (data) {
                    tempObject.html(showError(data));
                })
                .always(function () {
                });
        } else {
            //$('#modal-signin').modal('show');
            //$(".signin-toggle").removeClass("hidden");
            $(".itemscope").addClass("hidden");
        }
    };*/

    $.fn.showPopConnectDBS = function (options) { // 26072022
        //console.log("$.fn.showConnectRecommended -----> start ");
        var sshowPopConnectDBSSettings = $.extend({
            size: 'small',
            limit: 16,
            showcase: ".videme-now-popular"
        }, options);
        if ($(this).length) {
            //if (jQuery.isEmptyObject($(this))) {
            //console.log("$.fn.showPopConnect $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showPopConnect $(this) -----> nooo! " + $(this).length);
            var tempObject = $(sshowPopConnectDBSSettings.showcase);
        }
        //console.log("$.fn.showPopConnect tempObject -----> " + tempObject.length);
        //console.log("$.fn.showPopConnect showPopConnectSettings -----> " + JSON.stringify(showPopConnectSettings));
        tempObject.html(VidemeProgress);
        //$('#videme-connect-recommended').html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/connect/pop/?limit=" + sshowPopConnectDBSSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showConnectRecommended data -----> " + JSON.stringify(data));
                tempObject.html( // work
                    showTileDoorbellSignSmall(
                        parseRecommConnectForDoorbellSign(data), tempObject
                    )
                );
            })
            .done(function (data) {
                //console.log("$.fn.showConnectRecommended done -----> " + JSON.stringify(data));
            })
            .fail(function (data) {
                //tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /* 25072022 $.fn.showPopConnect = function (options) {
        var showPopConnectSettings = $.extend({
            size: 'small',
            limit: 8,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            //if (jQuery.isEmptyObject($(this))) {
            //console.log("$.fn.showPopConnect $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showPopConnect $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showPopConnectSettings.showcaseVideo);
        }
        //console.log("$.fn.showPopConnect tempObject -----> " + tempObject.length);
        //console.log("$.fn.showPopConnect showPopConnectSettings -----> " + JSON.stringify(showPopConnectSettings));
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/connect/pop/?limit=" + showPopConnectSettings.limit + "&videmecallback=?",
            function (data) {
                if (!$.isEmptyObject(data)) {
                    //console.log("$.fn.showPopConnect data -----> yes" + JSON.stringify(data));
                    tempObject.html(showTileRelation(data, tempObject, showPopConnectSettings.size, 'connect'));
                } else {
                    console.log("$.fn.showPopConnect data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/

    $.fn.showConnectRecommended = function (options) { // 25072022
        //console.log("$.fn.showConnectRecommended -----> start ");
        var showConnectRecommendedSettings = $.extend({
            size: 'small',
            limit: 16,
            showcaseVideo: "#videme-connect-recommended"
        }, options);
        if ($(this).length) {
            //if (jQuery.isEmptyObject($(this))) {
            //console.log("$.fn.showPopConnect $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showPopConnect $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showConnectRecommendedSettings.showcaseVideo);
        }
        //console.log("$.fn.showPopConnect tempObject -----> " + tempObject.length);
        //console.log("$.fn.showPopConnect showPopConnectSettings -----> " + JSON.stringify(showPopConnectSettings));
        tempObject.html(VidemeProgress);
        //$('#videme-connect-recommended').html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/connect/recommended/?limit=" + showConnectRecommendedSettings.limit + "&videmecallback=?",
            //$.getJSON("https://api.vide.me/v2/connect/recommended/?videmecallback=?",
            function (data) {
                //console.log("$.fn.showConnectRecommended data -----> " + JSON.stringify(data));
                if (!$.isEmptyObject(data)) {
                    $('.videme-connect-recommended-panel').removeClass('hidden');
                    tempObject.html(showTileRelation(data, tempObject, showConnectRecommendedSettings.size, 'connect'));
                    /*tempObject.html( // work
                        showTileDoorbellSignSmall(
                            parseRecommConnectForDoorbellSign(data), tempObject
                        )
                    );*/
                    /*tempObject.html(
                        showTileDoorbellSignSmall(
                            parseRelationsToMeForDoorbellSign(data), tempObject
                    ));*/
                    //$('#videme-connect-recommended').html(showTileRelation(data, tempObject, showConnectRecommendedSettings.size));
                    //$('#videme-connect-recommended').html(showTileRelation(data, $('.videme-connect-recommended-panel'), 'small'));
                } else {
                    //console.log("$.fn.showPopConnect data -----> yes" + JSON.stringify(data));
                    $('.videme-connect-recommended-panel').removeClass('hidden');
                    //tempObject.showPopConnect({
                    tempObject.showPopConnect({
                        size: 'small',
                        limit: 18
                    });
                }
            })
            .done(function (data) {
                //console.log("$.fn.showConnectRecommended done -----> " + JSON.stringify(data));
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    $.fn.showTrendsItems = function (options) { // TODO: remove? NOO 25072022
        console.log("$.fn.showTrendsItems -----> start ");
        var showTrendsItemsSettings = $.extend({
            size: 'small',
            limit: 16,
            showcaseVideo: "#videme-trends-items"
        }, options);
        if ($(this).length) {
            //if (jQuery.isEmptyObject($(this))) {
            //console.log("$.fn.showPopConnect $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showPopConnect $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showTrendsItemsSettings.showcaseVideo);
        }
        //console.log("$.fn.showPopConnect tempObject -----> " + tempObject.length);
        //console.log("$.fn.showPopConnect showPopConnectSettings -----> " + JSON.stringify(showPopConnectSettings));
        tempObject.html(VidemeProgress);
        //$('#videme-connect-recommended').html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/trends/items/week/?limit=" + showTrendsItemsSettings.limit + "&videmecallback=?",
            //$.getJSON("https://api.vide.me/v2/connect/recommended/?videmecallback=?",
            function (data) {
                //console.log("$.fn.showConnectRecommended data -----> " + JSON.stringify(data));
                if (!$.isEmptyObject(data)) {
                    //$('.videme-connect-recommended-panel').removeClass('hidden');
                    //=tempObject.html(showTileRelation(data, tempObject, showConnectRecommendedSettings.size, 'connect'));
                    //tempObject.html(JSON.stringify(data));
                    /*tempObject.html( // work
                        showTileTrendsItems(
                            parseTrendsItemsForShowTrendsTile(data), tempObject
                        )
                    );*/
                    var reData = parseTrendsItemsForShowTrendsTile(data);
                    tempObject.html(showTileTrendsItems(reData, tempObject, showTrendsItemsSettings.size, 'connect'));
                } else {
                }
            })
            .done(function (data) {
                //console.log("$.fn.showConnectRecommended done -----> " + JSON.stringify(data));
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    $.fn.showTrendsUsers = function (options) { // 25072022
        //console.log("$.fn.showConnectRecommended -----> start ");
        var showTrendsUsersSettings = $.extend({
            size: 'small',
            limit: 16,
            showcaseVideo: "#videme-trends-users"
        }, options);
        if ($(this).length) {
            //if (jQuery.isEmptyObject($(this))) {
            //console.log("$.fn.showPopConnect $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showPopConnect $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showTrendsUsersSettings.showcaseVideo);
        }
        //console.log("$.fn.showPopConnect tempObject -----> " + tempObject.length);
        //console.log("$.fn.showPopConnect showPopConnectSettings -----> " + JSON.stringify(showPopConnectSettings));
        tempObject.html(VidemeProgress);
        //$('#videme-connect-recommended').html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/trends/users/week/?limit=" + showTrendsUsersSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showConnectRecommended data -----> " + JSON.stringify(data));
                if (!$.isEmptyObject(data)) {
                    //$('.videme-connect-recommended-panel').removeClass('hidden');
                    //=tempObject.html(showTileRelation(data, tempObject, showConnectRecommendedSettings.size, 'connect'));
                    //tempObject.html(JSON.stringify(data));
                    /*tempObject.html( // work
                        showTileTrendsItems(
                            parseTrendsItemsForShowTrendsTile(data), tempObject
                        )
                    );*/
                    tempObject.html(showTileRelation(data, tempObject, showTrendsUsersSettings.size, 'connect'));

                } else {
                }
            })
            .done(function (data) {
                //console.log("$.fn.showConnectRecommended done -----> " + JSON.stringify(data));
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    $.fn.showTrendsTags = function (options) { // 25072022
        //console.log("$.fn.showConnectRecommended -----> start ");
        var showTrendsTagsSettings = $.extend({
            size: 'small',
            limit: 16,
            showcaseVideo: "#videme-trends-tags"
        }, options);
        if ($(this).length) {
            //if (jQuery.isEmptyObject($(this))) {
            //console.log("$.fn.showPopConnect $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showPopConnect $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showTrendsTagsSettings.showcaseVideo);
        }
        //console.log("$.fn.showPopConnect tempObject -----> " + tempObject.length);
        //console.log("$.fn.showPopConnect showPopConnectSettings -----> " + JSON.stringify(showPopConnectSettings));
        tempObject.html(VidemeProgress);
        //$('#videme-connect-recommended').html(VidemeProgress);
        //var html = [];

        $.getJSON("https://api.vide.me/v2/trends/tags/week/?limit=" + showTrendsTagsSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showConnectRecommended data -----> " + JSON.stringify(data));
                if (!$.isEmptyObject(data)) {
                    //$('.videme-connect-recommended-panel').removeClass('hidden');
                    //=tempObject.html(showTileRelation(data, tempObject, showConnectRecommendedSettings.size, 'connect'));
                    //tempObject.html(JSON.stringify(data));
                    /*tempObject.html( // work
                        showTileTrendsItems(
                            parseTrendsItemsForShowTrendsTile(data), tempObject
                        )
                    );*/
                    var html = [];

                    $.each(data, function (key, value) {
                        //console.log("$.fn.showPopTags data.tags -----> cnt: " + value.cnt + " tag " + value.tag);
                        //console.log("$.fn.showPopTags each value -----> " + JSON.stringify(value));
                        //html.push("<a href=\"https://www.vide.me/search/?q=" + value.tag + "\" class=\"badge badge-light\"> " + value.tag + " </a> ");
                        //html.push("<a href=\"https://www.vide.me/search/?q=" + value + "\" class=\"videme-sidebar-hot-tags\">#" + value + " </a> ");
                        //html.push("<a href=\"https://www.vide.me/search/?q=" + value.tag + "\" class=\"videme-sidebar-hot-tags\">#" + value.tag + " </a> ");
                        html.push(returnLinkTagButtonNOA(value));
                    });
                    tempObject.html(html);
                } else {
                }
            })
            .done(function (data) {
                //console.log("$.fn.showConnectRecommended done -----> " + JSON.stringify(data));
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    $.fn.showConnectRecommendedDBS = function (options) { // 26072022
        //console.log("$.fn.showConnectRecommended -----> start ");
        var showConnectRecommendedSettings = $.extend({
            size: 'small',
            limit: 16,
            showcaseVideo: "#videme-connect-recommended"
        }, options);
        if ($(this).length) {
            //if (jQuery.isEmptyObject($(this))) {
            //console.log("$.fn.showPopConnect $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showPopConnect $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showConnectRecommendedSettings.showcaseVideo);
        }
        //console.log("$.fn.showPopConnect tempObject -----> " + tempObject.length);
        //console.log("$.fn.showPopConnect showPopConnectSettings -----> " + JSON.stringify(showPopConnectSettings));
        tempObject.html(VidemeProgress);
        //$('#videme-connect-recommended').html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/connect/recommended/?limit=" + showConnectRecommendedSettings.limit + "&videmecallback=?",
            //$.getJSON("https://api.vide.me/v2/connect/recommended/?videmecallback=?",
            function (data) {
                //console.log("$.fn.showConnectRecommended data -----> " + JSON.stringify(data));
                if (!$.isEmptyObject(data)) {
                    $('.videme-connect-recommended-panel').removeClass('hidden');
                    //tempObject.html(showTileRelation(data, tempObject, showConnectRecommendedSettings.size, 'connect'));
                    tempObject.html( // work
                        showTileDoorbellSignSmall(
                            parseRecommConnectForDoorbellSign(data), tempObject
                        )
                    );
                } else {
                    //console.log("$.fn.showPopConnect data -----> yes" + JSON.stringify(data));
                    $('.videme-connect-recommended-panel').removeClass('hidden');
                    //tempObject.showPopConnect({
                    tempObject.showPopConnect({
                        size: 'small',
                        limit: 18
                    });
                }
            })
            .done(function (data) {
                //console.log("$.fn.showConnectRecommended done -----> " + JSON.stringify(data));
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /* 26072022 $.fn.showFriendsRecommended = function (options) {
        //console.log("$.fn.showConnectRecommended -----> start ");
        var showFriendsRecommendedSettings = $.extend({
            size: 'small',
            limit: 16,
            showcaseVideo: "#videme-friends-recommended"
        }, options);
        if ($(this).length) {
            //if (jQuery.isEmptyObject($(this))) {
            //console.log("$.fn.showPopConnect $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showPopConnect $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showFriendsRecommendedSettings.showcaseVideo);
        }
        //console.log("$.fn.showPopConnect tempObject -----> " + tempObject.length);
        //console.log("$.fn.showPopConnect showPopConnectSettings -----> " + JSON.stringify(showPopConnectSettings));
        tempObject.html(VidemeProgress);
        //$('#videme-connect-recommended').html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/friendship/recommended/?limit=" + showFriendsRecommendedSettings.limit + "&videmecallback=?",
            //$.getJSON("https://api.vide.me/v2/connect/recommended/?videmecallback=?",
            function (data) {
                //console.log("$.fn.showFriendsRecommended data -----> " + JSON.stringify(data));
                if (!$.isEmptyObject(data)) {
                    $('.videme-friends-recommended-panel').removeClass('hidden');
                    tempObject.html(showTileRelation(data, tempObject, showFriendsRecommendedSettings.size, 'friends-recommended'));
                    /!*tempObject.html(
                        showTileDoorbellSignSmall(
                            parseRelationsToMeForDoorbellSign(data), tempObject
                    ));*!/
                    //$('#videme-connect-recommended').html(showTileRelation(data, tempObject, showConnectRecommendedSettings.size));
                    //$('#videme-connect-recommended').html(showTileRelation(data, $('.videme-connect-recommended-panel'), 'small'));
                } else {
                    //console.log("$.fn.showPopConnect data -----> yes" + JSON.stringify(data));
                    /!*$('.videme-friends-recommended-panel').removeClass('hidden');
                    //tempObject.showPopConnect({
                    tempObject.showPopConnect({
                        size: 'small',
                        limit: 18
                    });*!/
                }
            })
            .done(function (data) {
                //console.log("$.fn.showFriendsRecommended done -----> " + JSON.stringify(data));
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/

    $.fn.showFriendsRecommendedDBS = function (options) { // use 25072022
        //console.log("$.fn.showConnectRecommended -----> start ");
        var showFriendsRecommendedSettings = $.extend({
            size: 'small',
            limit: 16,
            showcaseVideo: "#videme-friends-recommended"
        }, options);
        if ($(this).length) {
            //if (jQuery.isEmptyObject($(this))) {
            //console.log("$.fn.showPopConnect $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showPopConnect $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showFriendsRecommendedSettings.showcaseVideo);
        }
        //console.log("$.fn.showPopConnect tempObject -----> " + tempObject.length);
        //console.log("$.fn.showPopConnect showPopConnectSettings -----> " + JSON.stringify(showPopConnectSettings));
        tempObject.html(VidemeProgress);
        //$('#videme-connect-recommended').html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/friendship/recommended/?limit=" + showFriendsRecommendedSettings.limit + "&videmecallback=?",
            //$.getJSON("https://api.vide.me/v2/connect/recommended/?videmecallback=?",
            function (data) {
                //console.log("$.fn.showFriendsRecommended data -----> " + JSON.stringify(data));
                if (!$.isEmptyObject(data)) {
                    $('.videme-friends-recommended-panel').removeClass('hidden');
                    //tempObject.html(showTileRelation(data, tempObject, showFriendsRecommendedSettings.size, 'friends-recommended'));
                    tempObject.html( // work
                        showTileDoorbellSignSmall(
                            parseRecommFriendsForDoorbellSign(data), tempObject
                        )
                    );
                } else {
                    //console.log("$.fn.showPopConnect data -----> yes" + JSON.stringify(data));
                    $('.videme-friends-recommended-panel').removeClass('hidden');
                    //tempObject.showPopConnect({
                    tempObject.showPopConnect({
                        size: 'small',
                        limit: 18
                    });
                }
            })
            .done(function (data) {
                //console.log("$.fn.showFriendsRecommended done -----> " + JSON.stringify(data));
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /* 26072022 $.fn.fileMySpring = function (options) {
        fileMySpringSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileMySpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileMySpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileMySpringSettings.showcaseVideo);
        }
        console.log("$.fn.fileMySpring tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        var start_time = performance.now();
        $.getJSON("https://api.vide.me/file/myspring/?limit=" + fileMySpringSettings.limit + "&videmecallback=?",
            function (data) {
                var response_time = Math.round(performance.now() - start_time);
                $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (data) {
                    //console.log("$.fn.fileMySpring data -----> yes" + JSON.stringify(data));
                    tempObject.html(showTile(parseFileMySpring(data), tempObject, "file-myspring-url"));
                    $.fn.showcaseVideoTextButton(paddingButtonMySpring(data[0]));
                } else {
                    console.log("$.fn.fileMySpring data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/

    /* 26072022 $.fn.itemsOfSpring = function (options) { // TODO: remove
        itemsOfSpringSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        //console.log("$.fn.postsOfSpring -----> ok");

        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileSpringSettings.showcaseVideo);
        }
        //console.log("$.fn.postsOfSpring tempObject -----> " + tempObject.length);
        //console.log("$.fn.postsOfSpring spring -----> " + fileSpringSettings.spring);
        //console.log("$.fn.postsOfSpring list -----> " + fileSpringSettings.list);
        tempObject.html(VidemeProgress);
        //==return this.each(function () {
        //var tempObject = $(this);
        var url = parseUrl();
        //console.log("postsOfSpring url -----> " + JSON.stringify(url));
        var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/spring/items/?spring=" + url.spring + "&list=" + url.list + "&limit=" + itemsOfSpringSettings.limit + "&videmecallback=?",
            function (data) {
                var response_time = Math.round(performance.now() - start_time);
                //console.log('doTasks took ' + response_time + ' milliseconds to execute.');
                if (!$.isEmptyObject(data)) {
                    $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                    //console.log("$.fn.postsOfSpring data -----> yes" + JSON.stringify(data));
                    tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "shownext"));
                    $.fn.showcaseVideoTextButton(paddingButtonMySpring(data[0]));
                } else {
                    console.log("$.fn.postsOfSpring data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
        //==});
    };*/
    /* 26072022 $.fn.postsOfSpring = function (options) { // TODO: remove
        fileSpringSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        //console.log("$.fn.postsOfSpring -----> ok");

        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileSpringSettings.showcaseVideo);
        }
        //console.log("$.fn.postsOfSpring tempObject -----> " + tempObject.length);
        //console.log("$.fn.postsOfSpring spring -----> " + fileSpringSettings.spring);
        //console.log("$.fn.postsOfSpring list -----> " + fileSpringSettings.list);
        tempObject.html(VidemeProgress);
        //==return this.each(function () {
        //var tempObject = $(this);
        var url = parseUrl();
        //console.log("postsOfSpring url -----> " + JSON.stringify(url));
        var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/spring/posts/?spring=" + url.spring + "&album=" + url.album + "&limit=" + fileSpringSettings.limit + "&videmecallback=?",
            function (data) {
                var response_time = Math.round(performance.now() - start_time);
                //console.log('doTasks took ' + response_time + ' milliseconds to execute.');
                $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    tempObject.empty();
                    //console.log("$.fn.postsOfSpring data -----> yes" + JSON.stringify(data));
                    //tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "file-spring-url"));
                    showTileMultiple(parseDataArrayToObject(data), tempObject, "file-spring-url");
                    /!*$(".video-js").each(function (videoIndex) {
                        console.log("video-js each ");
                        var videoId = $(this).attr("id");
                        videojs(videoId).ready(function(){
                            this.on("play", function(e) {
                                //pause other video
                                $(".video-js").each(function (index) {
                                    if (videoIndex !== index) {
                                        this.player.pause();
                                    }
                                });
                                videojs.log('postsOfSpringVideoOnlyMultiple play ' + this.currentSrc());
                            });
                        });
                    });*!/
                    /!*if (data[0].type == 'video') {
                        $.fn.showcaseVideoTextButton(paddingButtonMySpring(data[0]));
                    } else {
                        $('.itemscope').addClass('hidden');
                    }*!/
                } else {
                    console.log("$.fn.postsOfSpring data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
        //==});
    };*/
    /* 26072022 $.fn.postsShowNewScroll = function (options) { // TODO: remove ??? noo!
        fileSpringSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-postsShowNewScroll"
        }, options);
        //console.log("$.fn.postsOfSpring -----> ok");

        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileSpringSettings.showcaseVideo);
        }
        //console.log("$.fn.postsOfSpring tempObject -----> " + tempObject.length);
        //console.log("$.fn.postsOfSpring spring -----> " + fileSpringSettings.spring);
        //console.log("$.fn.postsOfSpring list -----> " + fileSpringSettings.list);
        /!*tempObject.html(VidemeProgress);
        //==return this.each(function () {
        //var tempObject = $(this);
        var url = parseUrl();
        //console.log("postsOfSpring url -----> " + JSON.stringify(url));
        var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/spring/posts/?spring=" + url.spring + "&album=" + url.album + "&limit=" + fileSpringSettings.limit + "&videmecallback=?",
            function (data) {
                var response_time = Math.round(performance.now() - start_time);
                //console.log('doTasks took ' + response_time + ' milliseconds to execute.');
                $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    tempObject.empty();
                    //console.log("$.fn.postsOfSpring data -----> yes" + JSON.stringify(data));
                    //tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "file-spring-url"));
                    showTileMultiple(parseDataArrayToObject(data), tempObject, "file-spring-url");
                    /!*$(".video-js").each(function (videoIndex) {
                        console.log("video-js each ");
                        var videoId = $(this).attr("id");
                        videojs(videoId).ready(function(){
                            this.on("play", function(e) {
                                //pause other video
                                $(".video-js").each(function (index) {
                                    if (videoIndex !== index) {
                                        this.player.pause();
                                    }
                                });
                                videojs.log('postsOfSpringVideoOnlyMultiple play ' + this.currentSrc());
                            });
                        });
                    });*!/
                    /!*if (data[0].type == 'video') {
                        $.fn.showcaseVideoTextButton(paddingButtonMySpring(data[0]));
                    } else {
                        $('.itemscope').addClass('hidden');
                    }*!/
                } else {
                    console.log("$.fn.postsOfSpring data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
        //==});*!/
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = 4;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        var videmeUIpostShowNew = new Thing('Joe');

        //==$('.tile').append("<ul class='list-group' id='" + id_list_group +"'>Page " + getItemOpt.page + "</ul>");
        tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul>");

        videmeUIpostShowNew.doGetJSONTileMultipleLI(emptyConnectData,
            "https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);  // Alerts "Hi Joe" via `foo`

        offset = offset + limit;

// Each time the user scrolls
        win.scroll(function () {
// End of the document reached?
            if ($(document).height() - win.height() == win.scrollTop()) {
                console.log("$.fn.postsShowNewScroll win.scroll");

                //$('#loading').show();
                $('.videme-scroll-progress').html(VidemeProgress);

                /!*$.ajax({
                    url: 'https://api.vide.me/system/test/scroll_pagination.php?page=' + page,
                    dataType: 'html',
                    success: function (html) {
                        $('#posts').append(html);
                        $('#loading').hide();
                    }
                });*!/
                /!*getItem("zzzzzzhttps://api.vide.me/v2/posts/shownew/?page=" + getItemOpt.page + "&limit=" + getItemOpt.limit + "&videmecallback=?",
                    id_list_group,
                    'shownext',
                    page,
                    showRecomendConnect);*!/
                /!*===getItem("https://api.vide.me/v2/posts/shownew/?page=" + getItemOpt.page + "&limit=" + getItemOpt.limit + "&videmecallback=?",
                    id_list_group,
                    'shownext',
                    page,
                    showRecomendConnect());*!/
                videmeUIpostShowNew.doGetJSONTileMultipleLI(emptyConnectData,
                    "https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);  // Alerts "Hi Joe" via `foo`
                offset = offset + limit;
            }
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.postsShowNewScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUIpostShowNew.doGetJSONTileMultipleLI(emptyConnectData,
                    "https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
        /!*********************************!/
        /!*$(document.body).on('touchmove', onScroll); // for mobile
        $(window).on('scroll', onScroll);
        // callback
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.postsShowNewScroll onScroll");

                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUIpostShowNew.doGetJSONTileMultipleLI(emptyConnectData,
                    "https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);  // Alerts "Hi Joe" via `foo`
                offset = offset + limit;
            }
        }*!/
        /!*********************************!/

        /!*===getItem("https://api.vide.me/v2/posts/shownew/?page=" + getItemOpt.page + "&limit=" + getItemOpt.limit + "&videmecallback=?",
            id_list_group,
            'shownext',
            page,
            showRecomendConnect());*!/
        /!*getItem("https://zzzzzzapi.vide.me/v2/posts/shownew/?page=" + getItemOpt.page + "&limit=" + getItemOpt.limit + "&videmecallback=?",
            id_list_group,
            page,
            showRecomendConnect);*!/
        /!*getItem(
            showRecomendConnect('zzz'));*!/
        /!*var callback = function () {
            showRecomendConnect(grading_company);
        };*!/
    };*/

    $.fn.postsShowNewScrollV3 = function (options) { // 26072022
        postsShowNewScrollV3Settings = $.extend({
            limit: 16,
            showcaseVideo: "#videme-v3-shownew-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(postsShowNewScrollV3Settings.showcaseVideo);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        var limit = postsShowNewScrollV3Settings.limit;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        var videmeUIpostShowNew = new Thing('Joe');
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul>");

        videmeUIpostShowNew.doGetJSONTileV3(emptyConnectData,
            "https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);  // Alerts "Hi Joe" via `foo`

        offset = offset + limit;

// Each time the user scrolls
        win.scroll(function () {
// End of the document reached?
            if ($(document).height() - win.height() == win.scrollTop()) {
                console.log("$.fn.postsShowNewScroll win.scroll");

                //$('#loading').show();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUIpostShowNew.doGetJSONTileV3(emptyConnectData,
                    "https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);  // Alerts "Hi Joe" via `foo`
                offset = offset + limit;
            }
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.postsShowNewScrollV3 onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                //videmeUIpostShowNew.doGetJSONTileMultipleLI(emptyConnectData,
                videmeUIpostShowNew.doGetJSONTileV3(emptyConnectData,
                    "https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };

    /* test 26072022 $.fn.postsShowNewScrollV4 = function (options) { // TODO: test
        postsShowNewScrollV3Settings = $.extend({
            limit: 46,
            showcaseVideo: "#videme-v3-shownew-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(postsShowNewScrollV3Settings.showcaseVideo);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        var limit = postsShowNewScrollV3Settings.limit;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        var videmeUIpostShowNew = new Thing('Joe');
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul>");

        videmeUIpostShowNew.doGetJSONTileTestV4(emptyConnectData,
            "https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);  // Alerts "Hi Joe" via `foo`

        offset = offset + limit;

// Each time the user scrolls
        /!*win.scroll(function () {
// End of the document reached?
            if ($(document).height() - win.height() == win.scrollTop()) {
                console.log("$.fn.postsShowNewScroll win.scroll");

                //$('#loading').show();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUIpostShowNew.doGetJSONTileV3(emptyConnectData,
                    "https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);  // Alerts "Hi Joe" via `foo`
                offset = offset + limit;
            }
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.postsShowNewScrollV3 onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUIpostShowNew.doGetJSONTileMultipleLI(emptyConnectData,
                    "https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }*!/
    };*/

    $.fn.postsShowItemsByTagV4 = function (options) { // 26072022
        postsShowItemsByTagV4Settings = $.extend({
            limit: 46,
            showcaseVideo: "#videme-tile-v3"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(postsShowItemsByTagV4Settings.showcaseVideo);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        var limit = postsShowItemsByTagV4Settings.limit;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        var videmeUIpostShowNew = new Thing('Joe');
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");
        tempObject.append("<i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUIpostShowNew.doGetJSONTileTestV4(emptyConnectData,
            "https://api.vide.me/v2/tags/items/?tag=" + postsShowItemsByTagV4Settings.tag + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);
    };

    $.fn.postsShowItemsByTagForSpringV4 = function (options) { // 26072022
        postsShowItemsByTagV4Settings = $.extend({
            limit: 46,
            showcaseVideo: "#videme-tile-v3"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(postsShowItemsByTagV4Settings.showcaseVideo);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        var limit = postsShowItemsByTagV4Settings.limit;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        var videmeUIpostShowNew = new Thing('Joe');
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");
        tempObject.append("<i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");
        var url = parseUrl();
        //videmeUIpostShowNew.doGetJSONTileTestV4(emptyConnectData,
        videmeUIpostShowNew.doGetJSONTileTestV4(emptyItemsData,
            "https://api.vide.me/v2/spring/tags/items/?spring=" + url.spring + "&tag=" + postsShowItemsByTagV4Settings.tag + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);
    };

    $.fn.postsShowNextFromUserV3 = function (options) { // 26072022
        postsShowNextFromUserV3Settings = $.extend({
            limit: 3,
            showcaseVideo: "#videme-v3-show-next-from-user-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(postsShowNextFromUserV3Settings.showcaseVideo);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        var limit = postsShowNextFromUserV3Settings.limit;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        var videmeUIpostShowNextFromUser = new Thing('Joe');
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul>");

        videmeUIpostShowNextFromUser.doGetJSONTileV3(emptyDataNextFromUser,
            "https://api.vide.me/v2/posts/next_from_user/?item_id=" + postsShowNextFromUserV3Settings.item_id + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);  // Alerts "Hi Joe" via `foo`

        //offset = offset + limit;

// Each time the user scrolls
        /*win.scroll(function () {
// End of the document reached?
            if ($(document).height() - win.height() == win.scrollTop()) {
                console.log("$.fn.postsShowNewScroll win.scroll");

                //$('#loading').show();
                //$('.videme-scroll-progress').html(VidemeProgress);
                videmeUIpostShowNextFromUser.doGetJSONTileV3(emptyConnectData,
                    "https://api.vide.me/v2/posts/next_from_user/?item_id=" + postsShowNextFromUserV3Settings.item_id + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);  // Alerts "Hi Joe" via `foo`
                offset = offset + limit;
            }
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.postsShowNewScrollV3 onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUIpostShowNextFromUser.doGetJSONTileMultipleLI(emptyConnectData,
                    "https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }*/
    };

    $.fn.postsShowTrendsItemWeekV3 = function (options) { // 26072022
        postsShowTrendsItemWeekV3Settings = $.extend({
            limit: 6,
            showcaseVideo: "#videme-v3-show-trends-item-week-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(postsShowTrendsItemWeekV3Settings.showcaseVideo);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        //console.info('postsShowTrendsItemWeekV3 videme-v3-show-trends-item-week-tile weight 1 ' + $(tempObject).width());
        //console.info('postsShowTrendsItemWeekV3 videme-v3-show-trends-item-week-tile weight 2 ' + tempObject.width());
        //console.info('postsShowTrendsItemWeekV3 videme-v3-show-trends-item-week-tile weight 3 ' + $('#videme-v3-show-trends-item-week-tile').width());
        //console.info('postsShowTrendsItemWeekV3 videme-v3-show-trends-item-week-tile limit: ' + Math.floor(tempObject.width() / 226) * 3);
        //var limit = postsShowTrendsItemWeekV3Settings.limit;
        var limit = Math.floor(tempObject.width() / 226) * 3;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        var videmeUIpostShowTrendsItemWeek = new Thing('Joe');

        videmeUIpostShowTrendsItemWeek.doGetJSONTileV3(emptyDataTrendsItemWeek,
            "https://api.vide.me/v2/trends/items/week/?limit=" + limit + "&videmecallback=?",
            //"https://api.vide.me/v2/trends/trends_tags_items/?get=items&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);
    };

    $.fn.postsShowTrendsTagsItemV3 = function (options) {  // 26072022
        postsShowTrendsTagsItemV3Settings = $.extend({
            limit: 6,
            showcaseVideo: "#videme-v3-show-trends-tags-item-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(postsShowTrendsTagsItemV3Settings.showcaseVideo);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        //console.info('postsShowTrendsItemWeekV3 videme-v3-show-trends-item-week-tile weight 1 ' + $(tempObject).width());
        //console.info('postsShowTrendsItemWeekV3 videme-v3-show-trends-item-week-tile weight 2 ' + tempObject.width());
        //console.info('postsShowTrendsItemWeekV3 videme-v3-show-trends-item-week-tile weight 3 ' + $('#videme-v3-show-trends-item-week-tile').width());
        //console.info('postsShowTrendsItemWeekV3 videme-v3-show-trends-item-week-tile limit: ' + Math.floor(tempObject.width() / 226) * 3);
        //var limit = postsShowTrendsItemWeekV3Settings.limit;
        var limit = Math.floor(tempObject.width() / 226) * 3;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        /*var videmeUIpostShowTrendsItemWeek = new Thing('Joe');
        videmeUIpostShowTrendsItemWeek.doGetJSONTileV3(emptyDataTrendsItemWeek,
            "https://api.vide.me/v2/trends/tags_items/?limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);*/
        $.getJSON("https://api.vide.me/v2/trends/trends_tags_items/?limit=" + limit + "&videmecallback=?",
            function (JSONdata) {
                //console.log("postsShowTrendsTagsItemV3 data -----> " + JSON.stringify(JSONdata));

                //var response_time = Math.round(performance.now() - start_time);
                //$('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(JSONdata)) {
                    //console.log("postsShowTrendsTagsItemV3 data -----> " + JSON.stringify(JSONdata));
                    //var countTags = Object.keys(JSONdata).length;
                    //console.log("postsShowTrendsTagsItemV3 countTags -----> " + countTags);
                    //tempObject.empty();
                    //console.log("$.fn.postsOfSpring data -----> yes" + JSON.stringify(data));
                    //tempObject.html(showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext"));
                    //===showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext");
                    /*$('#videme-tile-title_updates').html('Updates');

                    showTileMultipleLI(parseDataArrayToObject(data), id_list_group, 'showmulti', offset);
                    //$.fn.showcaseVideoTextButton(paddingButtonMySpring(data[0]));
                    offset = offset + limit;*/
                    if (!$.isEmptyObject(JSONdata.items)) {
                        //console.log("postsShowTrendsTagsItemV3 JSONdata.items -----> " + JSON.stringify(JSONdata.items));
                        //$.each(JSONdata.items, function(key, value) {
                        //console.log('postsShowTrendsTagsItemV3 JSONdata.items each key ' + key);
                        //console.log('postsShowTrendsTagsItemV3 JSONdata.items each value ' + JSON.stringify(value));
                        //showTileTestV4(parseDataArrayToObject(value), tempObject, 'showmulti', offset);
                        //tempObject.append(key);
                        showTileTestV4(parseDataArrayToObject(JSONdata.items), tempObject, 'showmulti', 1);
                        //});
                    }
                    if (!$.isEmptyObject(JSONdata.tags)) {
                        //console.log("postsShowTrendsTagsItemV3 JSONdata.items -----> " + JSON.stringify(JSONdata.items));
                        $.each(JSONdata.tags, function(key, value) {
                            //console.log('postsShowTrendsTagsItemV3 JSONdata.tags each key ' + key);
                            //console.log('postsShowTrendsTagsItemV3 JSONdata.tags each value ' + JSON.stringify(value));
                            //showTileTestV4(parseDataArrayToObject(value), tempObject, 'showmulti', offset);
                            /*tempObject.append('<div class="container"><div class="row videme-ralation-card-small-ttags">\n' +
                                '<div class="col-2 videme-relation-card-1-column-ttags">\n' +
                                '<a href="">\n' +
                                '<i class="fa fa-hashtag videme-tags-title-icon" aria-hidden="true"></i>' +
                                '</a>\n' +
                                '</div>\n' +
                                '<div class="col-10 videme-relation-card-2-column-ttags">\n' +
                                '<div class="d-flex justify-content-between align-items-center">\n' +
                                '<div class="videme-relation-card-user-ttags">\n' +
                                '<a href="">Trend tag</a>\n' +
                                '</div>\n' +
                                '</div>\n' +
                                '<div class="d-flex justify-content-between align-items-center">\n' +
                                '<div class="videme-relation-card-user-ttags">\n' +
                                '<a class="text-muted" href="https://www.vide.me/AbelFranco/">' + key + '</a>\n' +
                                '</div>\n' +
                                '</div>\n' +
                                '</div>\n' +
                                '</div></div>');*/
                            tempObject.append('<div class="container"><div class="row"><div class=\"videme-v3-tile-title\" id=\"\">Popular for the tag <div class="videme-trend-tag-title"><p><strong><a class="" href="https://www.vide.me/search/?q=' + key + '">#' + key + '</a></strong></p></div></div></div></div>');
                            showTileTestV4(parseDataArrayToObject(value), tempObject, 'showmulti', 1);
                        });
                    }
                    if (!$.isEmptyObject(JSONdata.lists)) {
                        //console.log("postsShowTrendsTagsItemV3 JSONdata.lists -----> " + JSON.stringify(JSONdata.lists));
                        $.each(JSONdata.lists, function(key, value) {
                            tempObject.append('<div class="container"><div class="row"><div class=\"videme-v3-tile-title\" id=\"\">Popular for the tag <div class="videme-trend-tag-title"><p><strong><a class="" href="https://www.vide.me/search/?q=' + value.slogan + '">#' + value.slogan + '</a></strong></p></div></div></div></div>');
                            //showTileTestV4(parseDataArrayToObject(value), tempObject, 'showmulti', 1);
                            showListSet(value, tempObject);
                        });
                    }
                    /*$.each(JSONdata, function(key, value) {
                    //console.log("postsShowTrendsTagsItemV3 each key -----> " + key);
                    //==console.log(JSON.stringify(value));
                    //showTileTestV4(parseDataArrayToObject(value), tempObject, 'showmulti', offset);
                    tempObject.append(key);
                    showTileTestV4(parseDataArrayToObject(value), tempObject, 'showmulti', 1);
                });*/

                } else {
                    console.log("$.fn.postsShowTrendsTagsItemV3 JSONdata -----> no");

                }

            })
            .done(function (JSONdata) {
                $('.videme-scroll-progress').empty();
            })
            .fail(function (JSONdata) {
                console.log("$.fn.postsShowTrendsTagsItemV3 JSONdata -----> fail");
                //tempObject.html(showError(data));
                //callback.call(self, url, id_list_group);
                //==Xcallback.call(self, url, tempObject);
            })
            .always(function () {
            });
    };
    /* 26072022 $.fn.showListPanel = function (options) { //TODO: remove
        postsMyConnectV3Settings = $.extend({
            limit: 6,
            showcaseTile: "#videme-v3-show-1st-list"
        }, options);
        //console.log("$.fn.postsOfSpring -----> ok");
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(postsMyConnectV3Settings.showcaseTile);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = postsMyConnectV3Settings.limit;
        //var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //==================
        //if ($.cookie('vide_nad')) {
        //==================
        //$('.videme-my_connect').removeClass('hidden');
        //$('#videme-tile-title_updates').before('<div class="alert alert-primary videme-tips-alert" role="alert">You do not yet have connections. <a href="https://www.vide.me/web/recommended_connection/">Add new connection</a></div><br/>');

        //$.getJSON("https://api.vide.me/v2/posts/shownew/?limit=" + limit + "&videmecallback=?",
        //$.getJSON("https://api.vide.me/v2/list/get_list_comp/?list=0cc92a0c00d6" + limit + "&videmecallback=?",
        //$("#videme-v3-show-1st-list").empty().showListPanel();
        $.getJSON("https://api.vide.me/v2/list/get_list_comp/?list=b4d6a20c7331",
            function (data) {
                //console.log("postsOfSpringVideoOnlyMultiple data -----> " + JSON.stringify(data));
                //return true;
                if (!$.isEmptyObject(data)) {
                    console.log("$.fn.postsMyConnectV3 data -----> yes");
                    //$('#videme-tile-title_updates').html('Updates');
                    //showTileV3(parseDataArrayToObject(data), tempObject, 'showmulti', offset);
                    showListSet(data, tempObject, );
                } else {
                    console.log("$.fn.postsMyConnectV3 data -----> no");
                    //$('.videme-connect').showPopConnect({});
                    //$('#videme-tile-title_updates').before('<div class="alert alert-primary videme-tips-alert" role="alert">You do not yet have connections. <a href="https://www.vide.me/web/recommended_connection/">Add new connection</a></div><br/>');
                    tempObject.before('<div class="alert alert-primary videme-tips-alert" role="alert">You do not yet have connections. <a href="https://www.vide.me/web/recommended_connection/">Add new connection</a></div><br/>');
                }
            })
            .done(function (data) {
                $('.videme-scroll-progress').empty();
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });

    };*/
    /* 26072022 $.fn.postsMyConnectScroll = function (options) {
        fileSpringSettings = $.extend({
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        //console.log("$.fn.postsOfSpring -----> ok");
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileSpringSettings.showcaseVideo);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        var limit = fileSpringSettings.limit;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul>");
        tempObject.html("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");
        //var target = "https://api.vide.me/v2/items/connect/?offset=" + getItemOpt.offset + "&limit=" + getItemOpt.limit + "&videmecallback=?";
        //==========================================
        /!*win.scroll(function () {
            if ($(document).height() - win.height() == win.scrollTop()) {
                //$('#loading').show();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyConnectData,
                    "https://api.vide.me/v2/items/connect/?offset=" + getItemOpt.offset + "&limit=" + getItemOpt.limit + "&videmecallback=?",
                    id_list_group,
                    'shownext',
                    offset,
                    tempObject);
                offset = offset + getItemOpt.limit;
                getItemOpt.offset = getItemOpt.offset + getItemOpt.limit;
            }
        });
        videmeUI.doGetJSONTileMultipleLI(emptyConnectData,
            "https://api.vide.me/v2/items/connect/?offset=" + getItemOpt.offset + "&limit=" + getItemOpt.limit + "&videmecallback=?",
            id_list_group,
            'shownext',
            offset,
            tempObject);
        offset = offset + getItemOpt.limit;
        getItemOpt.offset = getItemOpt.offset + getItemOpt.limit;*!/
        //==================
        $.getJSON("https://api.vide.me/v2/items/connect/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            function (data) {
                //console.log("postsOfSpringVideoOnlyMultiple data -----> " + JSON.stringify(data));
                //var response_time = Math.round(performance.now() - start_time);
                //$('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    //tempObject.empty();
                    //console.log("$.fn.postsOfSpring data -----> yes" + JSON.stringify(data));
                    //tempObject.html(showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext"));
                    //===showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext");
                    $('#videme-tile-title_updates').html('Updates');

                    showTileMultipleLI(parseDataArrayToObject(data), id_list_group, 'showmulti', offset);
                    //$.fn.showcaseVideoTextButton(paddingButtonMySpring(data[0]));
                    offset = offset + limit;

                    win.scroll(function () {
                        /!*if ($(document).height() - win.height() == win.scrollTop()) {
                            //$('#loading').show();
                            $('.videme-scroll-progress').html(VidemeProgress);
                            videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
                                "https://api.vide.me/v2/items/connect/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                                id_list_group,
                                'showmulti',
                                offset,
                                tempObject);
                            offset = offset + limit;
                        }*!/
                        console.log("$.fn.postsMyConnectScroll win.scroll");
                        onScroll();
                    });
                    $(document.body).on('touchmove', onScroll()); // for mobile
                    function onScroll(){
                        if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                            console.log("$.fn.postsMyConnectScroll onScroll");
                            eventScroll();
                            $('.videme-scroll-progress').html(VidemeProgress);
                            videmeUI.doGetJSONTileMultipleLI(emptyConnectData,
                                "https://api.vide.me/v2/items/connect/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                                id_list_group,
                                'showmulti',
                                offset,
                                tempObject);  // Alerts "Hi Joe" via `foo`
                            offset = offset + limit;
                        }
                    }
                } else {
                    console.log("$.fn.postsMyConnectScroll data -----> no");
                    //$('.videme-connect').showPopConnect({});
                    $('#videme-tile-title_updates').html('New posts');
                    if ($.cookie('vide_nad')) {
                        //$('<div class="alert alert-primary" role="alert">You do not yet have connections. <a href="https://www.vide.me/web/recommended_friends/">Add new connection</a></div>').appendTo('.videme-tile-title');
                        $('#videme-tile-title_updates').before('<div class="alert alert-primary videme-tips-alert" role="alert">You do not yet have connections. <a href="https://www.vide.me/web/recommended_connection/">Add new connection</a></div><br/>');
                    }


                    var videmeUIpostShowNew = new Thing('Joe');

                    videmeUIpostShowNew.doGetJSONTileMultipleLI(emptyConnectData,
                        "https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                        id_list_group,
                        'showmulti',
                        offset,
                        tempObject);  // Alerts "Hi Joe" via `foo`

                    offset = offset + limit;
                    win.scroll(function () {
                        // End of the document reached?
                        //console.log("$.fn.postsMyConnectScroll win.scroll");

                        /!*if ($(document).height() - win.height() == win.scrollTop()) {
                            //$('#loading').show();
                            $('.videme-scroll-progress').html(VidemeProgress);
                            videmeUIpostShowNew.doGetJSONTileMultipleLI(emptyConnectData,
                                "https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                                id_list_group,
                                'showmulti',
                                offset,
                                tempObject);  // Alerts "Hi Joe" via `foo`

                            offset = offset + limit;
                        }*!/
                        //eventScroll();
                        //onScroll(videmeUIpostShowNew, offset, limit, id_list_group, tempObject);
                        onScroll();
                        /!*var counter2 = makeCounter();
                        counter2.currentCount = 0;
                        counter2(videmeUIpostShowNew, limit, id_list_group, tempObject);*!/
                    });
                    /!*********************************************!/
                    $(document.body).on('touchmove', onScroll()); // for mobile

                    //var counter2 = makeCounter();
                    //counter2.currentCount = 0;

                    //alert( counter2() ); // 1

                    //counter2.currentCount = 5;

                    //alert( counter2() ); // 5

                    //$(window).on('scroll', onScroll);
                    // callback
                    function onScroll(){
                        if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                            console.log("$.fn.postsMyConnectScroll onScroll");
                            eventScroll();
                            $('.videme-scroll-progress').html(VidemeProgress);
                            videmeUIpostShowNew.doGetJSONTileMultipleLI(emptyConnectData,
                                "https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                                id_list_group,
                                'showmulti',
                                offset,
                                tempObject);  // Alerts "Hi Joe" via `foo`
                            offset = offset + limit;
                        }
                    }
                    /!*********************************************!/
                    /!*$('window').on('touchmove', function(event) {
                        //Prevent the window from being scrolled.
                        event.preventDefault();

                        console.log("$.fn.postsMyConnectScroll onScroll");
                        $('.videme-scroll-progress').html(VidemeProgress);
                        videmeUIpostShowNew.doGetJSONTileMultipleLI(emptyConnectData,
                            "https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                            id_list_group,
                            'showmulti',
                            offset,
                            tempObject);  // Alerts "Hi Joe" via `foo`
                        offset = offset + limit;
                    });*!/
                    /!*********************************************!/
                }

            })
            .done(function (data) {
                $('.videme-scroll-progress').empty();
            })
            .fail(function (data) {
                tempObject.html(showError(data));
                //callback.call(self, url, id_list_group);
                //==Xcallback.call(self, url, tempObject);
            })
            .always(function () {
            });
    };*/

    /* 26072022 $.fn.postsMyConnectScroll_31082019 = function (options) {
        fileSpringSettings = $.extend({
            limit: 6,
            showcaseVideo: "#videme-tile",
            colSet: 'full'
        }, options);
        //console.log("$.fn.postsOfSpring -----> ok");
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileSpringSettings.showcaseVideo);
        }
        /!* 1920x1080   1280x1024
        https://stackoverflow.com/questions/48924751/how-to-create-new-breakpoints-in-bootstrap-4-using-cdn/48976550#48976550
        http://blog.codeply.com/2016/06/06/how-to-create-a-new-breakpoint-in-bootstrap-4/
        * *!/
        var tileStart = '';
        switch (fileSpringSettings.colSet) {
            case 'full':
                tileStart = '<div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 pl-1 pr-1 mb-1">';
                break;
            case '57':
                tileStart = '<div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 pl-1 pr-1 mb-1">';
                break;
            case '39':
                tileStart = '<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 pl-1 pr-1 mb-1">';
                break;
            case '66':
                tileStart = '<div class="col-sm-12 col-md-6 col-lg-4 col-xl-4 pl-1 pr-1 mb-1">';
                break;
            case '75':
                tileStart = '<div class="col-sm-12 col-md-6 col-lg-4 col-xl-6 pl-1 pr-1 mb-1">';
                break;
            default:
                tileStart = '<div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 pl-1 pr-1 mb-1">';
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        var limit = fileSpringSettings.limit;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul>");
        //tempObject.html("<div class='card-columns' id='" + id_list_group + "'></div><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        //==================
        $.getJSON("https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            function (data) {
                //console.log("postsOfSpringVideoOnlyMultiple data -----> " + JSON.stringify(data));
                //var response_time = Math.round(performance.now() - start_time);
                //$('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    //tempObject.empty();
                    console.log("$.fn.postsOfSpring data -----> yes" + JSON.stringify(data));
                    //tempObject.html(showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext"));
                    //===showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext");
                    $('#videme-tile-title_updates').html('Updates');

                    //showTileMultipleLI(parseDataArrayToObject(data), id_list_group, 'showmulti', offset);
                    var showFile = parseDataArrayToObject(data); // TODO: Why?
                    //$.each(showFile, function (key, value) {
                    $.each(data, function (key, value) {
                        //$('#' + id_list_group).append("<li class='list-group-item videme-tile-item' id='" + li_id_list_group_courent_id + "'></li>");
                        /!*$('#' + id_list_group).append("<div class='card'>" +
    "<img src='https://s3.amazonaws.com/img.vide.me/" + value.cover + "' class='card-img-top' alt='...'>" +
    "<div class='card-body'>" +
      "<h5 class='card-title'>" + value.title + "</h5>" +
      "<p class='card-text'>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>" +
      "<p class='card-text'><small class='text-muted'>" + timeToWord(value.created_at) + "</small></p>" +
    "</div>" +
  "</div>");*!/
                        /!*$('#' + id_list_group).append('<div class="col-sm-6 col-md-4 col-lg-3 mt-4">' +*!/
                        /!*tempObject.append('<!--<div class="col-sm-6 col-md-4 col-lg-2 pl-1 pr-1 mb-1">-->' +
                                '<div class="card">' +
                                    '<div class="videme-tile-v3-wrap-card-img-top">' +
                                        '<img class="card-img-top videme-tile-v3-card-img-top" src="https://s3.amazonaws.com/img.vide.me/' + value.item_id + '.jpg">' +
                                    '</div>' +
                                    '<div class="card-block">' +
                                        '<figure class="profile">' +
                                            '<img src="https://s3.amazonaws.com/img.vide.me/' + value.item_user_picture + '" class="profile-avatar" alt="">' +
                                        '</figure>' +
                                    '   <div class="card-title mt-1"><p><strong>' + value.title + '</strong></p></div>' +
                                        '<div class="meta card-text videme-tile-v3-card-text">' +
                                            '<a>' + value.item_user_display_name + '</a>' +
                                        '</div>' +
                                        '<div class="card-text"><p><small>' +
                                            timeToWord(value.created_at) +
                                        '</small></p></div>' +
                                    '</div>' +
                                    '<div class="card-footer">' +
                                        '<!---<small>Last updated 3 mins ago</small>' +
                                        '<button class="btn btn-info float-right btn-sm">Follow</button>-->' +
                                        showItemInfoV3(value) +
                                    '</div>' +
                                '</div>' +
                            '<!--</div>-->');*!/
                        var img = "https://s3.amazonaws.com/img.vide.me/" + value.item_id + ".jpg";
                        if (value.type === 'article') {
                            if (value.post_id && value.post_id != "undefined") {
                                href = "https://www.vide.me/a/?a=" + value.href + "&post_id=" + value.post_id;
                            } else {
                                href = "https://www.vide.me/a/?a=" + value.href;
                            }
                            //img = value.cover;
                            img = 'https://s3.amazonaws.com/img.vide.me/' + value.cover;
                            /!*trueActionClass = 'article-url';
                            videme_tile_class = 'videme_tile_box_img';
                            videme_tile_boxInner_class = 'videme_tile_boxInner_img';
                            mainInsert = "<img class='videme_tile_img_class' src='" + img + "' alt=''></img>";
                            if (value.post_type == 'update') my_item_edit_type = 'edit_my_article';*!/
                        } else if (value.type === 'video') {
                            if (value.message_id && value.message_id != "undefined") {
                                href = "https://www.vide.me/v?m=" + value.href + "&message_id=" + value.message_id;
                            } else {
                                href = "https://www.vide.me/v?m=" + value.href;
                            }
                            if (value.post_id && value.post_id != "undefined") {
                                href = "https://www.vide.me/v?m=" + value.href + "&post_id=" + value.post_id;
                            } else {
                                href = "https://www.vide.me/v?m=" + value.href;
                            }
                            if (!$.isEmptyObject(value.cover)) {
                                img = "https://s3.amazonaws.com/img.vide.me/" + value.cover;
                            } else {
                                img = "https://s3.amazonaws.com/img.vide.me/" + value.item_id + ".jpg";
                            }
                            /!*if (!$.isEmptyObject(value.width) && !$.isEmptyObject(value.height)) {
                                console.log("value.width " + value.width + " value.height " + value.height);
                                var aspect_percent = Math.round(value.width / 100);
                                var height_percent = Math.round(value.height / aspect_percent);
                                //css_aspect_percent = 'style="padding-bottom: ' + height_percent + '%;"';
                                //var video_height = Math.round(width / aspect);
                                console.log("css_aspect_percent " + css_aspect_percent);
                            }
                            trueActionClass = 'multi_video';*!/

                            /!*if (detectBrowser() == 'safari') {
                                mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'>" +
                                    "<source src='https://s3.amazonaws.com/video.vide.me/" + item_video + ".m3u8' type='application/x-mpegURL'>" +
                                    "</video>";
                            } else {
                                mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'></video>";
                            }*!/
                            /!*if (pgwBrowser.os.group !== 'Android' && pgwBrowser.browser.group !== 'Chrome') {
                                source_src = "<source src='https://s3.amazonaws.com/video.vide.me/" + item_video + ".m3u8' type='application/x-mpegURL'>";
                            }
                            mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'>" +
                                source_src +
                                "</video>";
                            item_video = value.item_id;

                            if (value.post_type == 'update') my_item_edit_type = 'edit_my_video';*!/
                        } else if (value.type === 'image') {
                            if (value.message_id && value.message_id != "undefined") {
                                href = "https://www.vide.me/i/?i=" + value.href + "&message_id=" + value.message_id;
                            } else {
                                href = "https://www.vide.me/i/?i=" + value.href;
                            }
                            if (value.post_id && value.post_id != "undefined") {
                                href = "https://www.vide.me/i/?i=" + value.href + "&post_id=" + value.post_id;
                            } else {
                                href = "https://www.vide.me/i/?i=" + value.href;
                            }
                            img = "https://s3.amazonaws.com/img.vide.me/" + value.cover;
                            /!*trueActionClass = 'image-url';
                            videme_tile_class = 'videme_tile_box_img';
                            videme_tile_boxInner_class = 'videme_tile_boxInner_img';
                            mainInsert = "<img class='videme_tile_img_class' src='" + img + "' alt=''></img>";
                            //videme_tile_img_class = 'videme_tile_img_class';

                            if (value.post_type == 'update') my_item_edit_type = 'edit_my_video';*!/
                        } else if (value.type === 'event') {
                            if (!$.isEmptyObject(value.cover)) {
                                img = "https://s3.amazonaws.com/img.vide.me/" + value.cover;
                                /!*trueActionClass = 'event_go_url';
                                videme_tile_class = 'videme_tile_box_img';
                                videme_tile_boxInner_class = 'videme_tile_boxInner_img';
                                mainInsert = "<img class='videme_tile_img_class' src='" + img + "' alt=''></img>";*!/
                                //videme_tile_class = 'videme_tile_box_img';
                                //videme_tile_boxInner_class = 'videme_tile_boxInner_img';
                            }
                            /!*if (!$.isEmptyObject(value.cover_video)) {
                                if (!$.isEmptyObject(value.cover)) {
                                    img = "https://s3.amazonaws.com/img.vide.me/" + value.cover;
                                } else {
                                    img = "https://s3.amazonaws.com/img.vide.me/" + value.cover_video + ".jpg";
                                }
                                trueActionClass = 'multi_video';
                                /!*if (detectBrowser() == 'safari') {
                                    mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'>" +
                                        "<source src='https://s3.amazonaws.com/video.vide.me/" + item_video + ".m3u8' type='application/x-mpegURL'>" +
                                        "</video>";
                                } else {
                                    mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'></video>";
                                }*!/
                                if (pgwBrowser.os.group !== 'Android' && pgwBrowser.browser.group !== 'Chrome') {
                                    source_src = "<source src='https://s3.amazonaws.com/video.vide.me/" + item_video + ".m3u8' type='application/x-mpegURL'>";
                                }
                                mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'>" +
                                    source_src +
                                    "</video>";
                                its_video = true;
                                item_video = value.cover_video;

                            }*!/
                            if (!$.isEmptyObject(value.post_id)) {
                                href = "https://www.vide.me/a/?e=" + value.item_id + "&post_id=" + value.post_id;
                            } else {
                                href = "https://www.vide.me/a/?e=" + value.item_id;
                            }
                            //img = "https://s3.amazonaws.com/img.vide.me/" + value.cover;
                            //href = "https://www.vide.me/i/?i=" + value.href;
                            //trueActionClass = 'image-url';
                            //trueActionClass = 'multi_video';
                            //trueActionClass = 'event-url';

                            //mainInsert = "<img class='videme_tile_img_class' src='" + img + "' alt=''></img>";
                            //videme_tile_img_class = 'videme_tile_img_class';
                            /!*if (value.post_type == 'update') my_item_edit_type = 'edit_my_event';*!/
                        }

                        //tempObject.append('<div class="col-sm-6 col-md-4 col-lg-2 pl-1 pr-1 mb-1">' +
                        //==tempObject.append('<div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 pl-1 pr-1 mb-1">' + // full
                        //tempObject.append('<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 pl-1 pr-1 mb-1">' + //48
                        //tempObject.append(tileStart +
                        tempObject.append(
                            //--tempObject.append('<div class="col-sm-6 col-md-4 col-lg-2 pl-1 pr-1 mb-1">' +
                            // 11102019 '<div class="videme-tile-v3-card">' +
                            '<div class="ml-1 mr-1 mb-1 videme-tile-v3-card">' +
                            '<div class="videme-tile-v3-wrap-card-img-top">' +
                            '<img class="videme-tile-v3-card-img-top" src="' + img + '">' +
                            '</div>' +
                            '<div class="videme-tile-v3-card-block">' +
                            '   <div class="videme-tile-v3-card-title"><p><span>' + value.title + '</span></p></div>' +
                            '<div class="row videme-ralation-card-small222 videme-tile-v3-card-user-place">' +
                            '<div class="col-2 videme-relation-card-1-column222 videme-tile-v3-profile2">' +
                            '<img src="' + origin_img_vide_me + value.item_user_picture + '" class="rounded-circle videme-relation-card-img-tile-v3 profile-avatar2" alt="">' +
                            '</div>' +
                            '<div class="col-10 videme-relation-card-2-column222">' +
                            '<div class="d-flex justify-content-between align-items-center  meta2 videme-tile-v3-card-text-user_display_name2">' +
                            '<a>' + value.item_user_display_name + '</a>' +
                            '</div>' +
                            '<div class="d-flex justify-content-between align-items-center videme-tile-v3-card-text-date"><p><small>' +
                            timeToWord(value.created_at) +
                            '</small></p></div>' +
                            '</div>' +
                            '<div class="videme-tile-v3-card-footer">' +
                            '<!---<small>Last updated 3 mins ago</small>' +
                            '<button class="btn btn-info float-right btn-sm">Follow</button>-->' +
                            showItemInfoV3(value) +
                            '</div>' +
                            '</div>' +
                            '</div>');

                    });
                    //$.fn.showcaseVideoTextButton(paddingButtonMySpring(data[0]));
                    offset = offset + limit;

                    /!*win.scroll(function () {
                        console.log("$.fn.postsMyConnectScroll win.scroll");
                        onScroll();
                    });
                    $(document.body).on('touchmove', onScroll()); // for mobile
                    function onScroll(){
                        if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                            console.log("$.fn.postsMyConnectScroll onScroll");
                            eventScroll();
                            $('.videme-scroll-progress').html(VidemeProgress);
                            videmeUI.doGetJSONTileMultipleLI(emptyConnectData,
                                "https://api.vide.me/v2/items/connect/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                                id_list_group,
                                'showmulti',
                                offset,
                                tempObject);  // Alerts "Hi Joe" via `foo`
                            offset = offset + limit;
                        }
                    }*!/
                }

            })
            .done(function (data) {
                $('.videme-scroll-progress').empty();
            })
            .fail(function (data) {
                tempObject.html(showError(data));
                //callback.call(self, url, id_list_group);
                //==Xcallback.call(self, url, tempObject);
            })
            .always(function () {
            });
    };*/

    /* recreate 26072022 $.fn.postsMyConnectScrollV3 = function (options) {
        postsMyConnectScrollV3Settings = $.extend({
            limit: 46,
            showcaseTile: "#videme-tile"
        }, options);
        //console.log("$.fn.postsOfSpring -----> ok");
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(postsMyConnectScrollV3Settings.showcaseTile);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = postsMyConnectScrollV3Settings.limit;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //==================
        if ($.cookie('vide_nad')) {
            //==================
            $.getJSON("https://api.vide.me/v2/items/connect/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                function (data) {
                    //console.log("postsOfSpringVideoOnlyMultiple data -----> " + JSON.stringify(data));
                    if (!$.isEmptyObject(data)) {
                        $('#videme-tile-title_updates').html('Updates');
                        showTileV3(parseDataArrayToObject(data), tempObject, 'showmulti', offset);
                        offset = offset + limit;
                        win.scroll(function () {
                            console.log("$.fn.postsMyConnectScroll win.scroll");
                            onScroll();
                        });
                        $(document.body).on('touchmove', onScroll()); // for mobile
                        function onScroll() {
                            if ($(window).scrollTop() + window.innerHeight >= document.body.scrollHeight) {
                                console.log("$.fn.postsMyConnectScroll onScroll");
                                eventScroll();
                                $('.videme-scroll-progress').html(VidemeProgress);
                                videmeUI.doGetJSONTileV3(emptyConnectData,
                                    "https://api.vide.me/v2/items/connect/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                                    id_list_group,
                                    'showmulti',
                                    offset,
                                    tempObject);  // Alerts "Hi Joe" via `foo`
                                offset = offset + limit;
                            }
                        }
                    } else {
                        console.log("$.fn.postsMyConnectScroll data -----> no");
                        //$('.videme-connect').showPopConnect({});
                        $('#videme-tile-title_updates').before('<div class="alert alert-primary videme-tips-alert" role="alert">You do not yet have connections. <a href="https://www.vide.me/web/recommended_connection/">Add new connection</a></div><br/>');
                        var videmeUIpostShowNew = new Thing('Joe');
                        videmeUIpostShowNew.doGetJSONTileV3(emptyConnectData,
                            "https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                            id_list_group,
                            'showmulti',
                            offset,
                            tempObject);  // Alerts "Hi Joe" via `foo`

                        offset = offset + limit;
                        win.scroll(function () {
                            onScroll();
                        });
                        /!*********************************************!/
                        $(document.body).on('touchmove', onScroll());
                        function onScroll() {
                            if ($(window).scrollTop() + window.innerHeight >= document.body.scrollHeight) {
                                console.log("$.fn.postsMyConnectScroll onScroll");
                                eventScroll();
                                $('.videme-scroll-progress').html(VidemeProgress);
                                videmeUIpostShowNew.doGetJSONTileV3(emptyConnectData,
                                    "https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                                    id_list_group,
                                    'showmulti',
                                    offset,
                                    tempObject);  // Alerts "Hi Joe" via `foo`
                                offset = offset + limit;
                            }
                        }
                    }
                })
                .done(function (data) {
                    $('.videme-scroll-progress').empty();
                })
                .fail(function (data) {
                    tempObject.html(showError(data));
                })
                .always(function () {
                });
        } else {
            $('#videme-tile-title_updates').html('New posts');
            var videmeUIpostShowNew = new Thing('Joe');

            videmeUIpostShowNew.doGetJSONTileV3(emptyConnectData,
                "https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                id_list_group,
                'showmulti',
                offset,
                tempObject);  // Alerts "Hi Joe" via `foo`

            offset = offset + limit;
            win.scroll(function () {
                onScroll();
            });
            /!*********************************************!/
            $(document.body).on('touchmove', onScroll());
            function onScroll() {
                if ($(window).scrollTop() + window.innerHeight >= document.body.scrollHeight) {
                    console.log("$.fn.postsMyConnectScroll onScroll");
                    eventScroll();
                    $('.videme-scroll-progress').html(VidemeProgress);
                    videmeUIpostShowNew.doGetJSONTileV3(emptyConnectData,
                        "https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                        id_list_group,
                        'showmulti',
                        offset,
                        tempObject);  // Alerts "Hi Joe" via `foo`
                    offset = offset + limit;
                }
            }
        }
    };*/

    $.fn.postsMyConnectV3 = function (options) { // 26072022
        postsMyConnectV3Settings = $.extend({
            limit: 46,
            showcaseTile: "#videme-my_connect-tile"
        }, options);
        //console.log("$.fn.postsOfSpring -----> ok");
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(postsMyConnectV3Settings.showcaseTile);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = postsMyConnectV3Settings.limit;
        //var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //==================
        if ($.cookie('vide_nad')) {
            //==================
            $('.videme-my_connect').removeClass('hidden');
            //$('#videme-tile-title_updates').before('<div class="alert alert-primary videme-tips-alert" role="alert">You do not yet have connections. <a href="https://www.vide.me/web/recommended_connection/">Add new connection</a></div><br/>');

            $.getJSON("https://api.vide.me/v2/items/connect/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                function (data) {
                    //console.log("postsOfSpringVideoOnlyMultiple data -----> " + JSON.stringify(data));
                    if (!$.isEmptyObject(data)) {
                        //$('#videme-tile-title_updates').html('Updates');
                        //showTileV3(parseDataArrayToObject(data), tempObject, 'showmulti', offset);
                        showTileTestV4(parseDataArrayToObject(data), tempObject, 'showmulti', offset);
                    } else {
                        console.log("$.fn.postsMyConnectV3 data -----> no");
                        //$('.videme-connect').showPopConnect({});
                        //$('#videme-tile-title_updates').before('<div class="alert alert-primary videme-tips-alert" role="alert">You do not yet have connections. <a href="https://www.vide.me/web/recommended_connection/">Add new connection</a></div><br/>');
                        tempObject.before('<div class="alert alert-primary videme-tips-alert" role="alert">You do not yet have connections. <a href="https://www.vide.me/web/recommended_connection/">Add new connection</a></div><br/>');
                    }
                })
                .done(function (data) {
                    $('.videme-scroll-progress').empty();
                })
                .fail(function (data) {
                    tempObject.html(showError(data));
                })
                .always(function () {
                });
        } else {

        }
    };


    /*function onScroll(videmeUIpostShowNew, offset, limit, id_list_group, tempObject){
        if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
            console.log("$.fn.postsMyConnectScroll onScroll");
            eventScroll();
            $('.videme-scroll-progress').html(VidemeProgress);
            videmeUIpostShowNew.doGetJSONTileMultipleLI(emptyConnectData,
                "https://api.vide.me/v2/posts/shownew/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                id_list_group,
                'showmulti',
                offset,
                tempObject);  // Alerts "Hi Joe" via `foo`
            offset = offset + limit;
        }
    }

    function makeCounter(videmeUIpostShowNew, limit, id_list_group, tempObject) {
        function counter(limit) {
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                return counter.currentCount = counter.currentCount + limit;
            } else {
                return counter.currentCount;
            }
        };
        //counter.currentCount = 1;

        /!************************************************!/
        if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
            console.log("$.fn.postsMyConnectScroll onScroll");
            eventScroll();
            $('.videme-scroll-progress').html(VidemeProgress);
            videmeUIpostShowNew.doGetJSONTileMultipleLI(emptyConnectData,
                "https://api.vide.me/v2/posts/shownew/?offset=" + counter.currentCount + "&limit=" + limit + "&videmecallback=?",
                id_list_group,
                'showmulti',
                counter.currentCount,
                tempObject);  // Alerts "Hi Joe" via `foo`
            //offset = offset + limit;
        }
        /!************************************************!/

        return counter;
    }*/

    /* 26072022 $.fn.postsOfSpringScroll = function (options) {
        fileSpringSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        //console.log("$.fn.postsOfSpring -----> ok");
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileSpringSettings.showcaseVideo);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = 4;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        var url = parseUrl();
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul>");
        tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
            "https://api.vide.me/v2/spring/posts/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            /!*if ($(document).height() - win.height() == win.scrollTop()) {
                //$('#loading').show();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
                    "https://api.vide.me/v2/spring/posts/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }*!/
            //console.log("$.fn.postsMyConnectScroll win.scroll");
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.postsOfSpringScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyConnectData,
                    "https://api.vide.me/v2/spring/posts/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
        /!******************************************************!/
        /!*$('body').on({
            'touchmove': function(e) {
                console.log($(this).scrollTop()); // Replace this with your code.
                if ($(document).height() - win.height() == win.scrollTop()) {
                    //$('#loading').show();
                    $('.videme-scroll-progress').html(VidemeProgress);
                    videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
                        "https://api.vide.me/v2/spring/posts/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                        id_list_group,
                        'showmulti',
                        offset,
                        tempObject);
                    offset = offset + limit;
                }
            }
        });*!/
        /!******************************************************!/
    };*/

    $.fn.postsOfSpringScrollV3 = function (options) { // 26072022
        postsOfSpringScrollV3Settings = $.extend({
            limit: 16,
            showcaseVideo: "#videme-tile-v3"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(postsOfSpringScrollV3Settings.showcaseVideo);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        var limit = postsOfSpringScrollV3Settings.limit;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        var url = parseUrl();
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileV3(emptyItemsData,
            "https://api.vide.me/v2/spring/posts/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.postsOfSpringScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileV3(emptyConnectData,
                    "https://api.vide.me/v2/spring/posts/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };

    $.fn.postsOfAlbumMyScrollV3 = function (options) { // 26072022 ?????
        postsOfAlbumMyScrollV3Settings = $.extend({
            limit: 16,
            showcaseVideo: "#videme-tile-v3"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(postsOfAlbumMyScrollV3Settings.showcaseVideo);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        var limit = postsOfAlbumMyScrollV3Settings.limit;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //var url = parseUrl();
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileV3(emptyItemsDataTrue,
            "https://api.vide.me/v2/albums/manage/?album=" + postsOfAlbumMyScrollV3Settings.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'album-manage-url',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.postsOfSpringScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileV3(emptyItemsDataTrue,
                    "https://api.vide.me/v2/albums/manage/?album=" + postsOfAlbumMyScrollV3Settings.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'album-manage-url',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };

    /* 26072022 $.fn.postsOfSpringViewedScroll = function (options) {
        fileSpringSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        //console.log("$.fn.postsOfSpring -----> ok");
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileSpringSettings.showcaseVideo);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = 4;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        var url = parseUrl();
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul>");
        tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
            "https://api.vide.me/v2/spring/viewed/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            /!*if ($(document).height() - win.height() == win.scrollTop()) {
                //$('#loading').show();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
                    "https://api.vide.me/v2/spring/viewed/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }*!/
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.postsMyConnectScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyConnectData,
                    "https://api.vide.me/v2/spring/viewed/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };*/
    $.fn.postsOfSpringViewedScrollV3 = function (options) { // 26072022
        postsOfSpringViewedScrollV3Settings = $.extend({
            limit: 16,
            showcaseVideo: "#videme-tile-v3"
        }, options);
        //console.log("$.fn.postsOfSpring -----> ok");
        if ($(this).length) {
            //console.log("$.fn.postsOfSpringViewedScrollV3 $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpringViewedScrollV3 $(this) -----> nooo! " + $(this).length);
            var tempObject = $(postsOfSpringViewedScrollV3Settings.showcaseVideo);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        var limit = postsOfSpringViewedScrollV3Settings.limit;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        var url = parseUrl();
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul>");
        tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileV3(emptyItemsData,
            "https://api.vide.me/v2/spring/viewed/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.postsMyConnectScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileV3(emptyConnectData,
                    "https://api.vide.me/v2/spring/viewed/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };

    /* 26072022 $.fn.postsOfSpringVideoScroll = function (options) {
        fileSpringSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        //console.log("$.fn.postsOfSpring -----> ok");
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileSpringSettings.showcaseVideo);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = 4;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        var url = parseUrl();
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul>");
        tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
            "https://api.vide.me/v2/spring/video/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            /!*if ($(document).height() - win.height() == win.scrollTop()) {
                //$('#loading').show();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
                    "https://api.vide.me/v2/spring/video/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }*!/
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.postsOfSpringVideoScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyConnectData,
                    "https://api.vide.me/v2/spring/video/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };*/

    $.fn.postsOfSpringVideoScrollV3 = function (options) { // 26072022
        postsOfSpringVideoScrollV3Settings = $.extend({
            limit: 16,
            showcaseVideo: "#videme-tile-v3"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(postsOfSpringVideoScrollV3Settings.showcaseVideo);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        var limit = postsOfSpringVideoScrollV3Settings.limit;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        var url = parseUrl();
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul>");
        tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileV3(emptyItemsData,
            "https://api.vide.me/v2/spring/video/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.postsOfSpringVideoScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileV3(emptyConnectData,
                    "https://api.vide.me/v2/spring/video/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };

    /* 26072022 $.fn.postsOfSpringImageScroll = function (options) {
        fileSpringSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        //console.log("$.fn.postsOfSpring -----> ok");
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileSpringSettings.showcaseVideo);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = 4;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        var url = parseUrl();
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul>");
        tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
            "https://api.vide.me/v2/spring/image/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            /!*if ($(document).height() - win.height() == win.scrollTop()) {
                //$('#loading').show();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
                    "https://api.vide.me/v2/spring/image/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }*!/
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.postsOfSpringImageScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyConnectData,
                    "https://api.vide.me/v2/spring/image/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };*/

    $.fn.postsOfSpringImageScrollV3 = function (options) { // 26072022
        postsOfSpringImageScrollV3Settings = $.extend({
            limit: 16,
            showcaseVideo: "#videme-tile-v3"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(postsOfSpringImageScrollV3Settings.showcaseVideo);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        var limit =postsOfSpringImageScrollV3Settings.limit;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        var url = parseUrl();
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileV3(emptyItemsData,
            "https://api.vide.me/v2/spring/image/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.postsOfSpringImageScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileV3(emptyConnectData,
                    "https://api.vide.me/v2/spring/image/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };

    /* 26072022 $.fn.postsOfSpringArticleScroll = function (options) {
        fileSpringSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        //console.log("$.fn.postsOfSpring -----> ok");
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileSpringSettings.showcaseVideo);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = 4;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        var url = parseUrl();
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul>");
        tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
            "https://api.vide.me/v2/spring/article/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            /!*if ($(document).height() - win.height() == win.scrollTop()) {
                //$('#loading').show();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
                    "https://api.vide.me/v2/spring/article/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }*!/
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.postsOfSpringArticleScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyConnectData,
                    "https://api.vide.me/v2/spring/article/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };*/
    $.fn.postsOfSpringArticleScrollV3 = function (options) { // 26072022
        postsOfSpringArticleScrollV3Settings = $.extend({
            limit: 16,
            showcaseVideo: "#videme-tile-v3"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(postsOfSpringArticleScrollV3Settings.showcaseVideo);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        var limit = postsOfSpringArticleScrollV3Settings.limit;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        var url = parseUrl();
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileV3(emptyItemsData,
            "https://api.vide.me/v2/spring/article/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.postsOfSpringArticleScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileV3(emptyConnectData,
                    "https://api.vide.me/v2/spring/article/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };

    /* 26072022 $.fn.postsOfSpringEventScroll = function (options) {
        fileSpringSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseEvent: "#videme-tile"
        }, options);
        //console.log("$.fn.postsOfSpring -----> ok");
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileSpringSettings.showcaseEvent);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        var limit = 4;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        var url = parseUrl();
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul>");
        tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
            "https://api.vide.me/v2/spring/event/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            /!*if ($(document).height() - win.height() == win.scrollTop()) {
                //$('#loading').show();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyItemsData,
                    "https://api.vide.me/v2/spring/event/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }*!/
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.postsOfSpringEventScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileMultipleLI(emptyConnectData,
                    "https://api.vide.me/v2/spring/event/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };*/
    $.fn.postsOfSpringEventScrollV3 = function (options) { // 26072022
        postsOfSpringEventScrollV3Settings = $.extend({
            limit: 16,
            showcaseEvent: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(postsOfSpringEventScrollV3Settings.showcaseEvent);
        }
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        var limit = postsOfSpringEventScrollV3Settings.limit;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        var url = parseUrl();
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileV3(emptyItemsData,
            "https://api.vide.me/v2/spring/event/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.postsOfSpringEventScroll onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileV3(emptyConnectData,
                    "https://api.vide.me/v2/spring/event/?spring=" + url.spring + "&album=" + url.album + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };

    function emptyConnectData(salutation, tempObject) { // 26072022
        //alert(salutation + " " + this.name);
        console.log(salutation + " " + this.name333);
        //$('#' + id_list_group).html('dddsd');
        //tempObject.html('dddsd');
        //==$('.videme-connect').showPopConnect({});
        //==tempObject.append($.fn.postsShowNewScroll({}));
    }
    function emptyDataNextFromUser(salutation, tempObject) { // 26072022
        //alert(salutation + " " + this.name);
        console.log(salutation + " " + this.name333);
        //$('#' + id_list_group).html('dddsd');
        //tempObject.html('dddsd');
        //==$('.videme-connect').showPopConnect({});
        $('#videme-v3-show-next-from-user-place').addClass('hidden');
        //==tempObject.append($.fn.postsShowNewScroll({}));
    }
    function emptyDataSearchItemByText(salutation, tempObject) { // 26072022
        //alert(salutation + " " + this.name);
        console.log(salutation + " " + this.name333);
        //$('#' + id_list_group).html('dddsd');
        //tempObject.html('dddsd');
        //==$('.videme-connect').showPopConnect({});
        //$('#videme-v3-show-next-from-user-place').addClass('hidden');
        //==tempObject.append($.fn.postsShowNewScroll({}));
        /*if (!$.isEmptyObject(data)) {
            tempObject.parent().toggleClass('hidden');
            var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
            tempObject.html("<ul class='list-group' id='" + id_list_group + "'></ul>");
            showTileMultipleLI(parseDataArrayToObject(data), id_list_group, 'showmulti', 0);
        } else {*/
        //console.log("$.fn.showSearchItemByText No results" + $(this).length);
        var q = getParameterByName('q');

        //tempObject.parent().addClass('hidden');
        tempObject.html("<ul class='list-group' id='" + id_list_group + "'><li class='list-group-item'>Nothing found for <b>" + q + "</b></li></ul>");
        //tempObject.html("No results");
        //
        // 78f5
        // 6
        // 5655555}
    }

    function emptyDataTrendsItemWeek(salutation, tempObject) { // 26072022
        //alert(salutation + " " + this.name);
        console.log('postsShowTrendsItemWeekV3 empty');
        console.log(salutation + " " + this.name333);
        //$('#' + id_list_group).html('dddsd');
        //tempObject.html('dddsd');
        //==$('.videme-connect').showPopConnect({});
        $('#videme-v3-show-trends-item-week-place').addClass('hidden');
        //==tempObject.append($.fn.postsShowNewScroll({}));
    }

    var itemsData = true;

    function emptyItemsData(salutation, tempObject) { // 26072022
        //alert(salutation + " " + this.name);
        console.log('emptyItemsData --->' + salutation + " " + this.name333);
        console.log('emptyItemsData itemData --->' + itemsData);
        //$('#' + id_list_group).html('dddsd');
        //tempObject.html('No public items ');
        //$('.videme-connect').showPopConnect({});
        // erase of tile tempObject.html('No items');
        $('.videme_tile_loading').addClass('hidden');
        itemsData = false;
    }
    function emptyItemsDataTrue(salutation, tempObject) { // 26072022 ?????? for elbums
        //alert(salutation + " " + this.name);
        console.log('emptyItemsData --->' + salutation + " " + this.name333);
        console.log('emptyItemsData itemData --->' + itemsData);
        //$('#' + id_list_group).html('dddsd');
        //tempObject.html('No public items ');
        //$('.videme-connect').showPopConnect({});
        // erase of tile tempObject.html('No items');
        $('.videme_tile_loading').addClass('hidden');
        //itemsData = false;
    }

    /* 26072022 $.fn.postsOfSpringVideoOnly = function (options) { // TODO: remove
        fileSpringSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 16,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileSpringSettings.showcaseVideo);
        }
        tempObject.html(VidemeProgress);
        var url = parseUrl();
        var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/spring/video/?spring=" + url.spring + "&album=" + url.album + "&limit=" + fileSpringSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("postsOfSpringVideoOnly data -----> " + JSON.stringify(data));
                var response_time = Math.round(performance.now() - start_time);
                $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    tempObject.empty();
                    //console.log("$.fn.postsOfSpring data -----> yes" + JSON.stringify(data));
                    //tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "shownext"));
                    showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext");
                    //$.fn.showcaseVideoTextButton(paddingButtonMySpring(data[0]));
                } else {
                    console.log("$.fn.postsOfSpring data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/
    /* 26072022 $.fn.postsOfSpringVideoOnlyMultiple = function (options) {
        //console.log("$.fn.postsOfSpringVideoOnlyMultiple -----> yes");

        fileSpringSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 16,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileSpringSettings.showcaseVideo);
        }
        tempObject.html(VidemeProgress);
        var url = parseUrl();
        var start_time = performance.now();
        //$.getJSON("https://api.vide.me/v2/spring/video/?spring=" + url.spring + "&album=" + url.album + "&limit=" + fileSpringSettings.limit + "&videmecallback=?",
        $.getJSON("https://api.vide.me/v2/spring/video/?spring=julianoferreira&album=" + url.album + "&limit=" + fileSpringSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("postsOfSpringVideoOnlyMultiple data -----> " + JSON.stringify(data));
                var response_time = Math.round(performance.now() - start_time);
                $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    tempObject.empty();
                    //console.log("$.fn.postsOfSpring data -----> yes" + JSON.stringify(data));
                    //tempObject.html(showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext"));
                    showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext");
                    //$.fn.showcaseVideoTextButton(paddingButtonMySpring(data[0]));
                } else {
                    console.log("$.fn.postsOfSpring data -----> no");
                    tempObject.html("No results");
                }
                /!*$(".video-js").each(function (videoIndex) {
                    // true place
                    console.log("video-js each ");

                    var videoId = $(this).attr("id");

                    //var video_player = videojs(videoId).ready(function(){
                    videojs(videoId).ready(function(){
                        this.on("play", function(e) {
                            //pause other video
                            $(".video-js").each(function (index) {
                                if (videoIndex !== index) {
                                    this.player.pause();
                                }
                            });
                            //var pl = this;
                            videojs.log('postsOfSpringVideoOnlyMultiple play ' + this.currentSrc());
                            //videojs.log('postsOfSpringVideoOnlyMultiple play ' + this.player.currentTime());
                            //videojs.log('postsOfSpringVideoOnlyMultiple play ' + this.currentTime());
                            //scrollSetting(miniPlayer);                            //miniPlayer.hide();
                            /!*miniPlayer.muted(true);
                            miniPlayer.src({
                                //type: "video/mp4",
                                type: "application/x-mpegURL",
                                //src: sourseURL + showcaseVideoSettings.file + messageAdd
                                //src: sourseURL + showcaseVideoSettings.video + '.mp4' // TODO: add message_id
                                src: this.currentSrc()
                                /!*"width": width,
                                "height": width * (360 / 640)*!/
                            });
                            miniPlayer.load();
                            miniPlayer.play();*!/

                        });

                    });

                    /!*video_player.src({
                        //type: "video/mp4",
                        type: "application/x-mpegURL",
                        //src: sourseURL + showcaseVideoSettings.file + messageAdd
                        //src: sourseURL + showcaseVideoSettings.video + '.mp4' // TODO: add message_id
                        src: 'https://s3.amazonaws.com/video.vide.me/' + showcaseVideoSettings.video + '.m3u8' // TODO: add message_id
                    });
                    video_player.controls(true);
                    video_player.load();
                    video_player.play();
                    /!*video_player.on('ended', function () {
                        /!*
                         showcasePlayerFunc.src({
                         type: "video/mp4",
                         src: "https://r7.cf1.rackcdn.com/.mp4"
                         });
                         showcasePlayerFunc.load();
                         showcasePlayerFunc.play();*!/
                    });*!/

                    video_player.on('ended', function() {
                        videojs.log('Awww...over so soon?!');
                    });*!/

                });*!/

                //var miniPlayer = videojs('my_video2');
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });

        /!*function resizeVideoJS(myPlayer) { // TODO: Их два тут
            // TODO: На как-то так $(this).parent().width()
            var width = document.getElementById(myPlayer.id()).parentElement.offsetWidth;
            myPlayer.width(width).height(width * (360 / 640));
        }*!/

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
    };*/
    /* 26072022 $.fn.postsOfSpringImageOnly = function (options) { // TODO: remove
        fileSpringSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 16,
            showcaseImage: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileSpringSettings.showcaseImage);
        }
        tempObject.html(VidemeProgress);
        var url = parseUrl();
        var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/spring/image/?spring=" + url.spring + "&album=" + url.album + "&limit=" + fileSpringSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("postsOfSpringVideoOnly data -----> " + JSON.stringify(data));
                var response_time = Math.round(performance.now() - start_time);
                $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    tempObject.empty();
                    //console.log("$.fn.postsOfSpring data -----> yes" + JSON.stringify(data));
                    //tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "shownext"));
                    showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext");
                    //$.fn.showcaseVideoTextButton(paddingButtonMySpring(data[0]));
                } else {
                    console.log("$.fn.postsOfSpring data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/
    /* 26072022 $.fn.postsOfSpringVideoOnlyForFriends = function (options) {
        postsOfSpringVideoOnlyForFriendsSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile-for-friends"
        }, options);
        //console.log("$.fn.postsOfSpringVideoOnlyForFriends -----> ok");
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(postsOfSpringVideoOnlyForFriendsSettings.showcaseVideo);
        }
        //console.log("$.fn.postsOfSpring tempObject -----> " + tempObject.length);
        //console.log("$.fn.postsOfSpring spring -----> " + fileSpringForFriendsSettings.spring);
        //console.log("$.fn.postsOfSpring list -----> " + fileSpringForFriendsSettings.list);
        //tempObject.html(VidemeProgress);
        //==return this.each(function () {
        //var tempObject = $(this);
        var url = parseUrl();
        console.log("postsOfSpringVideoOnlyForFriends url -----> " + JSON.stringify(url));
        var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/spring/video/for_friends/?spring=" + url.spring + "&list=" + url.list + "&limit=" + postsOfSpringVideoOnlyForFriendsSettings.limit + "&videmecallback=?",
            function (data) {
                var response_time = Math.round(performance.now() - start_time);
                //console.log('doTasks took ' + response_time + ' milliseconds to execute.');
                $('#result-response-for-friends').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    console.log("$.fn.postsOfSpringVideoOnlyForFriends data -----> yes" + JSON.stringify(data));
                    tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "file-spring-url"));
                    $.fn.showcaseVideoTextButton(paddingButtonMySpring(data[0]));
                } else {
                    console.log("$.fn.postsOfSpringVideoOnlyForFriends data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/
    /* 26072022 $.fn.postsOfSpringArticleOnly = function (options) { // TODOL remove
        postsOfSpringArticleOnlySettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 16,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(postsOfSpringArticleOnlySettings.showcaseVideo);
        }
        tempObject.html(VidemeProgress);
        var url = parseUrl();
        var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/spring/article/?spring=" + url.spring + "&album=" + url.album + "&limit=" + postsOfSpringArticleOnlySettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("postsOfSpringVideoOnly data -----> " + JSON.stringify(data));
                var response_time = Math.round(performance.now() - start_time);
                $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    tempObject.empty();
                    //tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "shownext"));
                    showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext");
                    //$.fn.showcaseVideoTextButton(paddingButtonMySpring(data[0]));
                } else {
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/

    $.fn.showMyTask = function (options) { // 26072022 ???? showMyTaskActive ?
        showMyTaskByIdSettings = $.extend({
            limit: 6,
            showcaseMyTask: "#videme-my-task"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showMyTask $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showMyTask $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showMyTaskByIdSettings.showcaseMyTask);
        }
        $.getJSON("https://api.vide.me/upload/getmytask/?limit=" + showMyTaskByIdSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showMyTask -----> typeof " + typeof data);
                if (data) {
                    /*var htmlResult = [];
                    var rowClass;
                    $.each(data, function (key, value) {
                        //console.log("showMyTask value.value.type -----> " + JSON.stringify(value.value.type));
                        //console.log("showMyTask value.value.status -----> " + JSON.stringify(value.value.status));
                        //switch (value.value.type) {
                        switch (value.task_status) {
                            case "awaiting":
                                rowClass = "active";
                                break;
                            case "success":
                                rowClass = "success";
                                break;
                            case "error":
                                rowClass = "danger";
                                break;
                            default:
                                rowClass = "";
                        }
                        htmlResult.push("\
                    <tr class=\"" + rowClass + "\">\
                        <td>" + value['created_at'] + "</td>\
                        <td>" + value['task_status'] + "</td>\
                        <!--<td>" + value['file_size_start'] + "</td>\
                        <td>" + value['file_size_done'] + "</td>\
                        <td>" + value['file'] + "</td>-->\
                        <td>" + value['title'] + "</td>\
                        <td>" + value['content'] + "</td>\
                        <td>" + sec2str(value['video_duration']) + "</td>\
                    </tr>")
                    });*/
                    //console.log("showMyTask value -----> html" + "<table>" + htmlResult.join("") + "</table>");
                    //console.log('showMyTask data.0 --->', JSON.stringify(data[0]));

                    //showLastTask(data[0]);
                    /* 24052022 var db = (
                        showTileTasks(parseMyTaskForDoorbellSign(data))

                    );*/
                    var db = (
                        //showListMedia(parseMyTaskForDoorbellSign(parseDataArrayToObject(data)))
                        showListMedia(parseMyTaskForDoorbellSign(data))

                    );
                    /*tempObject.html("<table class=\"table\" >\
                                <tr class=\"\">\
                        <td>created_at</td>\
                        <td>status</td>\
                        <!--<td>fileSizeStart</td>\
                        <td>fileSizeDone</td>\
                        <td>file</td>-->\
                        <td>subject</td>\
                        <td>message</td>\
                        <td>videoDuration</td>\
                    </tr>" + htmlResult.join("") + "</table> " +
                        db);*/

                    tempObject.html(db);
                    //tempObject.html(showTileTasks(parseDataArrayToObject(data), tempObject));

                    //});
                } else {
                    //console.log("$.fn.showMyTask data -----> no");
                    tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    $.fn.showChartItems = function (options) { // 26072022
        showMyTaskByIdSettings = $.extend({
            limit: 6,
            showcaseMyTask: "#videme-my-task"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showMyTask $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showMyTask $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showMyTaskByIdSettings.showcaseMyTask);
        }
        $.getJSON("https://api.vide.me/v2/items/my/?limit=" + showMyTaskByIdSettings.limit + "&videmecallback=?",
            function (data) {
                if (data) {
                    tempObject.html(showListMedia(parseMyChartItemsForDoorbellSign(data)));
                } else {
                    tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    $.fn.showLSsearch = function (options) { // 26072022
        showMyTaskByIdSettings = $.extend({
            limit: 6,
            showcaseMyTask: "#videme-search-items-landscape"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showMyTask $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showMyTask $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showMyTaskByIdSettings.showcaseMyTask);
        }
        $.getJSON("https://api.vide.me/v2/posts/search/?q=" + showMyTaskByIdSettings.q + "&videmecallback=?",
            function (JSONdata) {
                //console.log("$.fn.showMyTask -----> typeof " + typeof data);
                if (!$.isEmptyObject(JSONdata)) {
                    //tempObject.html(showTileTasks(parseItemsForDoorbellSign(JSONdata), tempObject));
                    $('#videme-v3-tile-title-res-for').html('Search result for "' + showMyTaskByIdSettings.q + '"');
                    tempObject.html(showTileTasks(parseDataArrayToObject(JSONdata)));
                } else {
                    //console.log("$.fn.showMyTask data -----> no");
                    $('#videme-v3-tile-title-res-for').html('No search results for "' + showMyTaskByIdSettings.q + '"');
                    tempObject.html("");
                }
                videoThumbnail();
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    $.fn.showMyTaskActiveOnly = function (options) { // 26072022
        showMyTaskActiveOnlySettings = $.extend({
            limit: 6,
            showcaseMyTask: "#videme-my-task"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showMyTask $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showMyTask $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showMyTaskActiveOnlySettings.showcaseMyTask);
        }
        if ($.cookie('videme_last_upload')) {

            $.getJSON("https://api.vide.me/upload/getmytask/?limit=" + showMyTaskActiveOnlySettings.limit + "&videmecallback=?",
                function (data) {
                    //console.log("$.fn.showMyTask -----> typeof " + typeof data);
                    if (data) {
                        /*var htmlResult = [];
                        var rowClass;
                        $.each(data, function (key, value) {
                            //console.log("showMyTask value.value.type -----> " + JSON.stringify(value.value.type));
                            //console.log("showMyTask value.value.status -----> " + JSON.stringify(value.value.status));
                            //switch (value.value.type) {
                            switch (value.task_status) {
                                case "awaiting":
                                    rowClass = "active";
                                    break;
                                case "success":
                                    rowClass = "success";
                                    break;
                                case "error":
                                    rowClass = "danger";
                                    break;
                                default:
                                    rowClass = "";
                            }
                            htmlResult.push("\
                        <tr class=\"" + rowClass + "\">\
                            <td>" + value['created_at'] + "</td>\
                            <td>" + value['task_status'] + "</td>\
                            <!--<td>" + value['file_size_start'] + "</td>\
                            <td>" + value['file_size_done'] + "</td>\
                            <td>" + value['file'] + "</td>-->\
                            <td>" + value['title'] + "</td>\
                            <td>" + value['content'] + "</td>\
                            <td>" + sec2str(value['video_duration']) + "</td>\
                        </tr>")
                        });*/
                        //console.log("showMyTask value -----> html" + "<table>" + htmlResult.join("") + "</table>");
                        //console.log('showMyTask data.0 --->', JSON.stringify(data[0]));

                        //showLastTask(data[0]);
                        var db = (
                            showTileTasksActiveOnly(parseMyTaskForDoorbellSign(data))
                        );
                        /*tempObject.html("<table class=\"table\" >\
                                    <tr class=\"\">\
                            <td>created_at</td>\
                            <td>status</td>\
                            <!--<td>fileSizeStart</td>\
                            <td>fileSizeDone</td>\
                            <td>file</td>-->\
                            <td>subject</td>\
                            <td>message</td>\
                            <td>videoDuration</td>\
                        </tr>" + htmlResult.join("") + "</table> " +
                            db);*/

                        tempObject.html(db);

                        //});
                    } else {
                        //console.log("$.fn.showMyTask data -----> no");
                        tempObject.html("");
                    }
                })
                .done(function (data) {
                })
                .fail(function (data) {
                    tempObject.html(showError(data));
                })
                .always(function () {
                });
        } else {
            //console.log("$.fn.showMyTaskActiveOnly no cookie -----> ");
        }
    };

    $.fn.showMyTaskById = function (options) { // TODO: why??? // 26072022
        showMyTaskByIdSettings = $.extend({
            limit: 6,
            showcaseMyTask: ".videme_last_task_icon"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showMyTask $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showMyTask $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showMyTaskByIdSettings.showcaseMyTask);
        }
        //$('.videme_nav_badge_last_upload').html('?');
        console.log("$.fn.showMyTaskById showMyTaskByIdSettings.task_id -----> ", showMyTaskByIdSettings.task_id);
        if ($.cookie('videme_last_upload')) {

            $.getJSON("https://api.vide.me/upload/get_task_status/?task_id=" + showMyTaskByIdSettings.task_id + "&videmecallback=?",
                function (data) {
                    //console.log("$.fn.showMyTask -----> typeof " + typeof data);
                    if (!$.isEmptyObject(data)) {
                        console.log("$.fn.showMyTaskById data.task_id -----> " + data.task_id);
                        console.log("$.fn.showMyTaskById data.task_type -----> " + data.task_type);
                        console.log("$.fn.showMyTaskById data.task_status -----> " + data.task_status);
                        //$('.videme-browse-media-button').attr('disabled', true); // <--------------------------- 1 upload
                        //$('.videme-file-input').attr('disabled', true); // <--------------------------- 1 upload
                        /***********************************************************************************************/
                        if (!$.isEmptyObject(data.task_type)) {
                            if (data.task_type == 'fileSendToS3') {
                                if (!$.isEmptyObject(data.task_status)) {
                                    if (data.task_status == 'success') {
                                        console.log("$.fn.showMyTaskById -----> fileSendToS3 success");
                                        cookieLastUploadRemove();
                                        $('#videme-tile').empty();
                                        $('#videme-tile').itemsMyVideosScroll({});
                                        //$('#videme-tile-spring-video').postsOfSpringVideoScroll({});
                                    }
                                }
                            }
                        }
                        /***********************************************************************************************/
                        /*var htmlResult = [];
                        var rowClass;
                        $.each(data, function (key, value) {
                            //console.log("showMyTask value.value.type -----> " + JSON.stringify(value.value.type));
                            //console.log("showMyTask value.value.status -----> " + JSON.stringify(value.value.status));
                            //switch (value.value.type) {
                            switch (value.task_status) {
                                case "awaiting":
                                    rowClass = "active";
                                    break;
                                case "success":
                                    rowClass = "success";
                                    break;
                                case "error":
                                    rowClass = "danger";
                                    break;
                                default:
                                    rowClass = "";
                            }
                            htmlResult.push("\
                        <tr class=\"" + rowClass + "\">\
                            <td>" + value['created_at'] + "</td>\
                            <td>" + value['task_status'] + "</td>\
                            <!--<td>" + value['file_size_start'] + "</td>\
                            <td>" + value['file_size_done'] + "</td>\
                            <td>" + value['file'] + "</td>-->\
                            <td>" + value['title'] + "</td>\
                            <td>" + value['content'] + "</td>\
                            <td>" + sec2str(value['video_duration']) + "</td>\
                        </tr>")
                        });*/
                        //console.log("showMyTask value -----> html" + "<table>" + htmlResult.join("") + "</table>");
                        //console.log('showMyTask data.0 --->', JSON.stringify(data[0]));
                        /*if (!$.isEmptyObject(data[0].task_type) && data[0].task_type == 'fileUploadVideoTest') {
                            document.title = data[0].percentage + ' % ' + data[0].title;
                        }*/
                        /*var db = (
                            showTileTasks(parseMyTaskForDoorbellSign(data), tempObject)
                        );*/
                        /*tempObject.html("<table class=\"table\" >\
                                    <tr class=\"\">\
                            <td>created_at</td>\
                            <td>status</td>\
                            <!--<td>fileSizeStart</td>\
                            <td>fileSizeDone</td>\
                            <td>file</td>-->\
                            <td>subject</td>\
                            <td>message</td>\
                            <td>videoDuration</td>\
                        </tr>" + htmlResult.join("") + "</table> " +
                            db);*/

                        /***********************************************************************************************/
                        var percentage = 0;
                        if (!$.isEmptyObject(data.task_status)) {
                            $('.videme_nav_badge_last_upload').html('+1');
                        }
                        if (!$.isEmptyObject(data.percentage)) {
                            //console.log("$.fn.showMyTaskById data.percentage -----> ", data.percentage);

                            if (data.percentage > 0) {

                                $('#videme_upload_progress')
                                    .addClass('bg-success')
                                    .addClass('progress-bar-striped')
                                    .addClass('progress-bar-animated');

                                percentage = data.percentage;
                                if (data.percentage > 97) {
                                    percentage = 100;
                                    $('#videme_upload_progress')
                                        .html('Successfully converted')
                                        .removeClass('progress-bar-striped')
                                        .removeClass('progress-bar-animated');
                                    //$('.videme-uploader-status').html('Successfully converted');
                                    document.title = 'Successfully converted ' + $('#title_for_video').val();
                                    //cookieLastUploadRemove();
                                } else {
                                    //$('#videme_upload_progress').html('Converted ' + percentage + '%');
                                    //$('.videme-uploader-status').html('Converted ' + percentage + '%');
                                    document.title = 'Converted ' + percentage + '% ' + $('#title_for_video').val();
                                    //console.log("$.fn.showMyTaskById data.percentage videme_nav_badge_last_upload -----> ", percentage);

                                    $('.videme_nav_badge_last_upload').html(percentage + '%');
                                    //$('.videme-browse-media-button').attr('disabled', true); // <---------
                                    /* *************************************/
                                    //$('#videme_last_upload_li').html(db);
                                    /* *************************************/

                                }
                                $('#videme_upload_progress').css('width', percentage + '%').attr('aria-valuenow', percentage);

                            }
                        } else {
                            //$('#videme_conversion_progress').html('Awaiting conversion');
                            //$('.videme-uploader-status').html('Awaiting conversion');
                            //console.log("$.fn.showMyTaskById data.percentage empty -----> ", data.percentage);
                            //cookieLastUploadRemove();

                        }
                        //$('#videme_upload_progress').css('width', percentage + '%').attr('aria-valuenow', percentage);

                        /*$("#videme_upload_progress")
                            .animate({
                                "value": data.percentage + "%"
                            }, {
                                duration: 600,
                                easing: 'linear'
                            });*/
                        /***********************************************************************************************/
                        var videme_last_task = [];
                        //var videme_last_task = {};
                        //videme_last_task.push = data;
                        videme_last_task.push(data);
                        //videme_last_task[0] = data;

                        //tempObject.html(showIconForTask(paddingUserInfo(parseMyTaskForDoorbellSign(videme_last_task))));
                        var iconArray = parseMyTaskForDoorbellSign(videme_last_task);
                        var icon = paddingUserInfo(iconArray[0]);
                        //tempObject.html(showIconForTask(parseMyTaskForDoorbellSign(videme_last_task)));
                        //console.log("$.fn.showMyTaskById icon -----> ", JSON.stringify(icon));

                        //tempObject.html(showIconForTask(icon[0]));
                        tempObject.html(showIconForTask(icon)); // TODO: why?
                        //});
                    } else {
                        console.log("$.fn.showMyTaskById data -----> no");
                        //tempObject.html("No results");
                        cookieLastUploadRemove();

                    }
                })
                .done(function (data) {
                })
                .fail(function (data) {
                    tempObject.html(showError(data));
                })
                .always(function () {
                });
        } else {
            console.log("$.fn.showMyTaskById no cookie -----> ");

        }
    };

    /* 26072022 $.fn.showMyTaskSendmail = function (options) { // TODO: remove
        showMyTaskVideoSettings = $.extend({
            limit: 6,
            showcaseMyTaskVideo: "#videme-my-task"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showMyTask $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showMyTask $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showMyTaskVideoSettings.showcaseMyTaskVideo);
        }
        $.getJSON("https://api.vide.me/upload/getmytask/sendmail/?limit=" + showMyTaskVideoSettings.limit + "&videmecallback=?",
            function (data) {
                if (data) {
                    //var htmlResult = [];
                    //var rowClass;
                    /!*tempObject.html(showTileDoorbellSignSmall(parseMyTaskSendmailForDoorbellSign(data), tempObject));*!/
                    tempObject.html(showTileTasks(parseMyTaskSendmailForDoorbellSign(data)));
                    //tempObject.html(db);
                } else {
                    tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/

    /* 26072022 $.fn.showMyStarred = function (options) {
        showMyStarredSettings = $.extend({
            limit: 18,
            showcaseMyStarred: "#videme-my-starred"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showMyTask $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showMyTask $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showMyStarredSettings.showcaseMyStarred);
        }
        $.getJSON("https://api.vide.me/v2/stars/history/?limit=" + showMyStarredSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("showMyStarred data -----> " + JSON.stringify(data));
                if (!$.isEmptyObject(data)) {
                    /!*var reData = parseTrendsItemsForShowTrendsTile(data);
                    tempObject.html(showTileTrendsItems(reData, tempObject, 'small', 'connect'));*!/
                    tempObject.html(showTileTasks(parseMyStarredForDoorbellSign(data)));
                } else {
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/

    $.fn.showMyTagged = function (options) { // 26072022
        showMyTaggedSettings = $.extend({
            limit: 18,
            showcaseMyTagged: "#videme-my-tagged"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showMyTask $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showMyTask $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showMyTaggedSettings.showcaseMyTagged);
        }
        $.getJSON("https://api.vide.me/v2/tags/history/?limit=" + showMyTaggedSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("showMyStarred data -----> " + JSON.stringify(data));
                if (!$.isEmptyObject(data)) {
                    /*var reData = parseTrendsItemsForShowTrendsTile(data);
                    tempObject.html(showTileTrendsItems(reData, tempObject, 'small', 'connect'));*/
                    tempObject.html(showTileTasks(parseMyTaggedForDoorbellSign(data)));
                    //tempObject.html(showTileTasks(data));
                } else {
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    $.fn.showMyTagsConfirmed = function (options) { // 26072022
        showMyTagsConfirmedSettings = $.extend({
            limit: 18,
            showcaseMyTagged: "#videme-my-tagged-conf"
        }, options);
        if ($(this).length) {
            var tempObject = $(this);
        } else {
            var tempObject = $(showMyTagsConfirmedSettings.showcaseMyTagged);
        }
        $.getJSON("https://api.vide.me/v2/tags/confirmed_by/?limit=" + showMyTagsConfirmedSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("showMyStarred data -----> " + JSON.stringify(data));
                if (!$.isEmptyObject(data)) {
                    tempObject.html(fShowcaseEachConfirmTagButton(data));
                } else {
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };
    $.fn.showMyTagsConfirmedForSpring = function (options) { // 26072022
        showMyTagsConfirmedSettings = $.extend({
            limit: 18,
            showcaseMyTagged: "#videme-my-tagged-conf"
        }, options);
        if ($(this).length) {
            var tempObject = $(this);
        } else {
            var tempObject = $(showMyTagsConfirmedSettings.showcaseMyTagged);
        }
        var url = parseUrl();
        $.getJSON("https://api.vide.me/v2/spring/tags/confirmed/?spring=" + url.spring + "&limit=" + showMyTagsConfirmedSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("showMyStarred data -----> " + JSON.stringify(data));
                if (!$.isEmptyObject(data)) {
                    tempObject.html(fShowcaseEachConfirmTagForSpringButton(data));
                } else {
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /* 26072022 $.fn.showMyLikes = function (options) {
        showMyLikesSettings = $.extend({
            limit: 18,
            showcaseMyLikes: "#videme-my-likes"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showMyTask $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showMyTask $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showMyLikesSettings.showcaseMyLikes);
        }
        $.getJSON("https://api.vide.me/v2/likes/history/?limit=" + showMyLikesSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("showMyStarred data -----> " + JSON.stringify(data));
                if (!$.isEmptyObject(data)) {
                    /!*var reData = parseTrendsItemsForShowTrendsTile(data);
                    tempObject.html(showTileTrendsItems(reData, tempObject, 'small', 'connect'));*!/
                    tempObject.html(showTileTasks(parseMyLikesForDoorbellSign(data)));
                } else {
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/

    /* 26072022 $.fn.showNewVideo = function (options) {
        console.log("$.fn.showNewVideo -----> ok");
        showNewVideoSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            skip: 0,
            showNewVideo: ".videme-shownew-tile",
            data: []
        }, options);
        if ($(this).length) {
            console.log("$.fn.showNewVideo $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.showNewVideo $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showNewVideoSettings.showNewVideo);
        }
        console.log("$.fn.showNewVideo tempObject -----> " + tempObject.length);
        //this.each(function(){
        tempObject.html(VidemeProgress);
        /!*

         getNewVideo2 = [];
         getNewVideo2.skip = 0;
         var data = getNewVideo(getNewVideo2);
         *!/

        console.log("$.fn.showNewVideo showNewVideoSettings.data -----> " + JSON.stringify(showNewVideoSettings.data));
        showNewVideoSettings.data = 55555;
        console.log("$.fn.showNewVideo showNewVideoSettings.data -----> " + JSON.stringify(showNewVideoSettings.data));

        $.getJSON("https://api.vide.me/file/shownew/?skip=" + showNewVideoSettings.skip + "&videmecallback=?",
            function (json) {

                showNewVideoSettings.data = json;
                /!*
                 if (json.results) {
                 console.log("$.fn.showNewVideo data -----> yes " + JSON.stringify(json));
                 //showNewVideoSettings.data = data;
                 //return showNewVideoSettings;
                 //retval = data;
                 //console.log("$.fn.showNewVideo retval -----> " + JSON.stringify(retval));
                 //return retval;

                 } else {
                 console.log("$.fn.showNewVideo data -----> no");
                 tempObject.html("No results");
                 //retval = data;

                 }*!/
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
        console.log("$.fn.showNewVideo showNewVideoSettings.data -----> " + JSON.stringify(showNewVideoSettings.data));

        //tempObject.html(showTile(parseShowNewVideo(data), tempObject, "file-shownewvideo-url"));

        //$.fn.showcaseVideoTextButton(paddingButtonMySpring(data[0]));

    };*/

    /* 26072022 function getNewVideo(getNewVideo) {
        var retval;

        /!*        $.getJSON("https://api.vide.me/file/shownew/?skip=" + getNewVideo.skip + "&videmecallback=?",
         function (json) {

         retval = json;
         /!*
         if (json.results) {
         console.log("$.fn.showNewVideo data -----> yes " + JSON.stringify(json));
         //showNewVideoSettings.data = data;
         //return showNewVideoSettings;
         //retval = data;
         //console.log("$.fn.showNewVideo retval -----> " + JSON.stringify(retval));
         //return retval;

         } else {
         console.log("$.fn.showNewVideo data -----> no");
         tempObject.html("No results");
         //retval = data;

         }*!/
         })
         .done(function (data) {
         })
         .fail(function (data) {
         tempObject.html(showError(data));
         })
         .always(function () {
         });*!/


        console.log("$.fn.getNewVideo return getformid -----> " + JSON.stringify(getformid));

        return getformid;
    }*/

    /* 26072022 $.fn.showNewVideoPagination = function (options) { // TODO: Remove
        console.log("$.fn.showNewVideoPagination -----> ok");
        showNewVideoPaginationSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 3,
            showNewVideo: ".videme-shownew-tile"
        }, options);
        if ($(this).length) {
            console.log("$.fn.showNewVideoPagination $(this) -----> yes " + $(this).length);
            var tempObjectNewVideo = $(this);
        } else {
            console.log("$.fn.showNewVideoPagination $(this) -----> nooo! " + $(this).length);
            var tempObjectNewVideo = $(showNewVideoPaginationSettings.showNewVideo);
        }
        console.log("$.fn.showNewVideo tempObject -----> " + tempObjectNewVideo.length);
        tempObjectNewVideo.html(VidemeProgress);
        //==return this.each(function () {
        //var tempObject = $(this);
        /!* Сделать запрос *!/
        /!*
                var data = $.fn.showNewVideo({
                    //msg: msg
                });*!/
        //console.log("$.fn.showNewVideoPagination showNewVideoSettings -----> " + JSON.stringify(showNewVideoSettings));
        //console.log("$.fn.showNewVideoPagination data -----> " + JSON.stringify(data));
        // TODO: Add limit
        $.getJSON("https://api.vide.me/file/shownew/?videmecallback=?",
            function (jsonData) {
                /!* Показать первый расклад *!/

                /!* Всё слепить и показать *!/
                tempObjectNewVideo.html(showTile(parseFileMy(jsonData.slice(0, showNewVideoPaginationSettings.limit)), tempObjectNewVideo, "shownext"));

                /!* Вычисилить максимальное число страниц *!/
                var pagetotal = Math.ceil(jsonData.length / showNewVideoPaginationSettings.limit);
                /!* Объявить экземпляр пейджинатора *!/
                $('.videme-shownew-pagination').jqPagination({
                    //link_string	: '/?page={page_number}',
                    max_page: pagetotal,
                    paged: function (page) {
                        var skip = (page - 1) * showNewVideoPaginationSettings.limit;
                        skip2 = skip;
                        limit = skip2 + showNewVideoPaginationSettings.limit;
                        console.log("$.fn.showNewVideoPagination jqPagination -----> skip: " + skip);
                        tempObjectNewVideo.html(showTile(parseFileMy(jsonData.slice(skip2, limit)), tempObjectNewVideo, "shownext"));
                    }
                });
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObjectNewVideo.html(showError(data));
            })
            .always(function () {
            });
        //==});
    };*/

    /* 26072022 $.fn.showNewPostsPagination = function (options) {
        console.log("$.fn.showNewPostsPagination -----> ok");
        showNewPostsPaginationSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 3,
            showNewPosts: ".videme-shownew-tile"
        }, options);
        if ($(this).length) {
            console.log("$.fn.showNewPostsPagination $(this) -----> yes " + $(this).length);
            var tempObjectNewPosts = $(this);
        } else {
            console.log("$.fn.showNewPostsPagination $(this) -----> nooo! " + $(this).length);
            var tempObjectNewPosts = $(showNewPostsPaginationSettings.showNewPosts);
        }
        console.log("$.fn.showNewPosts tempObject -----> " + tempObjectNewPosts.length);
        tempObjectNewPosts.html(VidemeProgress);
        //==return this.each(function () {
        //var tempObject = $(this);
        /!* Сделать запрос *!/
        /!*
                var data = $.fn.showNewVideo({
                    //msg: msg
                });*!/
        //console.log("$.fn.showNewVideoPagination showNewVideoSettings -----> " + JSON.stringify(showNewVideoSettings));
        //console.log("$.fn.showNewVideoPagination data -----> " + JSON.stringify(data));
        // TODO: Add limit
        $.getJSON("https://api.vide.me/v2/posts/shownew/?videmecallback=?",
            function (jsonData) {
                //console.log("$.fn.showNewPostsPagination data -----> " + JSON.stringify(jsonData));
                tempObjectNewPosts.empty();
                if (!$.isEmptyObject(jsonData)) {

                    /!* Показать первый расклад *!/

                    /!* Всё слепить и показать *!/
                    //tempObjectNewPosts.html(showTile(parseDataArrayToObject(jsonData.slice(0, showNewPostsPaginationSettings.limit)), tempObjectNewPosts, "shownext"));
                    showTileMultiple(parseDataArrayToObject(jsonData.slice(0, showNewPostsPaginationSettings.limit)), tempObjectNewPosts, "shownext");
                    /!*$(".video-js").each(function (videoIndex) {
                        console.log("video-js each ");
                        var videoId = $(this).attr("id");
                        videojs(videoId).ready(function(){
                            this.on("play", function(e) {
                                //pause other video
                                $(".video-js").each(function (index) {
                                    if (videoIndex !== index) {
                                        this.player.pause();
                                        //--this.pause();
                                    }
                                });
                                videojs.log('postsOfSpringVideoOnlyMultiple play ' + this.currentSrc());
                            });
                        });
                    });*!/
                    /!* Вычисилить максимальное число страниц *!/
                    var pagetotal = Math.ceil(jsonData.length / showNewPostsPaginationSettings.limit);
                    /!* Объявить экземпляр пейджинатора *!/
                    $('.videme-shownew-pagination').jqPagination({
                        //link_string	: '/?page={page_number}',
                        max_page: pagetotal,
                        paged: function (page) {
                            var skip = (page - 1) * showNewPostsPaginationSettings.limit;
                            skip2 = skip;
                            limit = skip2 + showNewPostsPaginationSettings.limit;
                            console.log("$.fn.showNewPostsPagination jqPagination -----> skip: " + skip);
                            //tempObjectNewPosts.html(showTile(parseDataArrayToObject(jsonData.slice(skip2, limit)), tempObjectNewPosts, "shownext"));
                            showTileMultiple(parseDataArrayToObject(jsonData.slice(skip2, limit)), tempObjectNewPosts, "shownext");
                            /!*$(".video-js").each(function (videoIndex) {
                                console.log("video-js each ");
                                var videoId = $(this).attr("id");
                                videojs(videoId).ready(function(){
                                    this.on("play", function(e) {
                                        //pause other video
                                        $(".video-js").each(function (index) {
                                            if (videoIndex !== index) {
                                                this.player.pause();
                                            }
                                        });
                                        videojs.log('postsOfSpringVideoOnlyMultiple play ' + this.currentSrc());
                                    });
                                });
                            });*!/
                        }
                    });
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObjectNewPosts.html(showError(data));
            })
            .always(function () {
            });
        //==});
    };*/

    /* 26072022 $.fn.showNewArticlePagination = function (options) {
        console.log("$.fn.showNewPostsPagination -----> ok");
        showNewArticlePaginationSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 3,
            showNewPosts: ".videme-new-article-bottom"
        }, options);
        if ($(this).length) {
            console.log("$.fn.showNewArticlePagination $(this) -----> yes " + $(this).length);
            var tempObjectNewPosts = $(this);
        } else {
            console.log("$.fn.showNewArticlePagination $(this) -----> nooo! " + $(this).length);
            var tempObjectNewPosts = $(showNewPostsPaginationSettings.showNewPosts);
        }
        console.log("$.fn.showNewArticlePagination tempObject -----> " + tempObjectNewPosts.length);
        tempObjectNewPosts.html(VidemeProgress);
        //==return this.each(function () {
        //var tempObject = $(this);
        /!* Сделать запрос *!/
        /!*
                var data = $.fn.showNewVideo({
                    //msg: msg
                });*!/
        //console.log("$.fn.showNewVideoPagination showNewVideoSettings -----> " + JSON.stringify(showNewVideoSettings));
        //console.log("$.fn.showNewVideoPagination data -----> " + JSON.stringify(data));
        // TODO: Add limit
        $.getJSON("https://api.vide.me/v2/posts/new_article/?videmecallback=?",
            function (jsonData) {
                //console.log("$.fn.showNewArticlePagination data -----> " + JSON.stringify(jsonData));

                /!* Показать первый расклад *!/

                /!* Всё слепить и показать *!/
                //tempObjectNewPosts.html(showTile(parseArticleShowNew(jsonData.slice(0, showNewArticlePaginationSettings.limit)), tempObjectNewPosts, "article"));
                tempObjectNewPosts.html(showTile(parseDataArrayToObject(jsonData.slice(0, showNewArticlePaginationSettings.limit)), tempObjectNewPosts, "article"));

                /!* Вычисилить максимальное число страниц *!/
                var pagetotal = Math.ceil(jsonData.length / showNewArticlePaginationSettings.limit);
                /!* Объявить экземпляр пейджинатора *!/
                $('.videme-new-article-bottom-pagination').jqPagination({
                    //link_string	: '/?page={page_number}',
                    max_page: pagetotal,
                    paged: function (page) {
                        var skip = (page - 1) * showNewArticlePaginationSettings.limit;
                        skip2 = skip;
                        limit = skip2 + showNewArticlePaginationSettings.limit;
                        console.log("$.fn.showNewArticlePagination jqPagination -----> skip: " + skip);
                        //tempObjectNewPosts.html(showTile(parseArticleShowNew(jsonData.slice(skip2, limit)), tempObjectNewPosts, "article"));
                        tempObjectNewPosts.html(showTile(parseDataArrayToObject(jsonData.slice(skip2, limit)), tempObjectNewPosts, "article"));
                    }
                });
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObjectNewPosts.html(showError(data));
            })
            .always(function () {
            });
        //==});
    };*/

    /* 26072022 $.fn.showPopPostsPagination = function (options) {
        console.log("$.fn.showPopVideoPagination -----> ok");
        showPopPostsPaginationSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 3,
            showPopVideo: ".videme-showpop-tile"
        }, options);
        if ($(this).length) {
            console.log("$.fn.showPopVideoPagination $(this) -----> yes " + $(this).length);
            var tempObjectPopPosts = $(this);
        } else {
            console.log("$.fn.showPopVideoPagination $(this) -----> nooo! " + $(this).length);
            var tempObjectPopPosts = $(showPopPostsPaginationSettings.showPopVideo);
        }
        console.log("$.fn.showNewVideo tempObject -----> " + tempObjectPopPosts.length);
        tempObjectPopPosts.html(VidemeProgress);
        //==return this.each(function () {
        //var tempObject = $(this);
        /!* Сделать запрос *!/
        /!*
         var data = $.fn.showNewVideo({
         //msg: msg
         });*!/
        //console.log("$.fn.showPopVideoPagination showPopVideoPaginationSettings -----> " + JSON.stringify(showPopVideoPaginationSettings));
        //console.log("$.fn.showPopVideoPagination data -----> " + JSON.stringify(data));

        //$.getJSON("https://api.vide.me/file/showpop/?videmecallback=?",
        $.getJSON("https://api.vide.me/v2/posts/showpop/?videmecallback=?",
            function (jsonData) {
                //console.log("$.fn.showPopVideoPagination data -----> " + JSON.stringify(jsonData));
                //tempObjectPopVideo.html(showTile(parseFileMy(jsonData.slice(0, showPopVideoPaginationSettings.limit)), tempObjectPopVideo, "shownext"));
                tempObjectPopPosts.html(showTile(parseDataArrayToObject(jsonData.slice(0, showPopPostsPaginationSettings.limit)), tempObjectPopPosts, "shownext"));
                var pagetotal = Math.ceil(jsonData.length / showPopPostsPaginationSettings.limit); //example=2
                $('.videme-showpop-pagination').jqPagination({
                    //link_string	: '/?page={page_number}',
                    max_page: pagetotal,
                    paged: function (page) {
                        var skip = (page - 1) * showPopPostsPaginationSettings.limit;
                        skip2 = skip;
                        limit = skip2 + showPopPostsPaginationSettings.limit;
                        console.log("$.fn.showPopVideoPagination jqPagination -----> skip: " + skip);
                        //tempObjectPopVideo.html(showTile(parseFileMy(b.slice(skip2, limit)), tempObjectPopVideo, "shownext"));
                        tempObjectPopPosts.html(showTile(parseDataArrayToObject(jsonData.slice(skip2, limit)), tempObjectPopPosts, "shownext"));
                    }
                });
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObjectPopPosts.html(showError(data));
            })
            .always(function () {
            });
        //==});
    };*/

    /* 26072022 $.fn.showPopVideoPagination = function (options) {
        console.log("$.fn.showPopVideoPagination -----> ok");
        showPopVideoPaginationSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 3,
            showPopVideo: ".videme-showpop-tile"
        }, options);
        if ($(this).length) {
            console.log("$.fn.showPopVideoPagination $(this) -----> yes " + $(this).length);
            var tempObjectPopVideo = $(this);
        } else {
            console.log("$.fn.showPopVideoPagination $(this) -----> nooo! " + $(this).length);
            var tempObjectPopVideo = $(showPopVideoPaginationSettings.showPopVideo);
        }
        console.log("$.fn.showNewVideo tempObject -----> " + tempObjectPopVideo.length);
        tempObjectPopVideo.html(VidemeProgress);
        //==return this.each(function () {
        //var tempObject = $(this);
        /!* Сделать запрос *!/
        /!*
         var data = $.fn.showNewVideo({
         //msg: msg
         });*!/
        //console.log("$.fn.showPopVideoPagination showPopVideoPaginationSettings -----> " + JSON.stringify(showPopVideoPaginationSettings));
        //console.log("$.fn.showPopVideoPagination data -----> " + JSON.stringify(data));

        //$.getJSON("https://api.vide.me/file/showpop/?videmecallback=?",
        $.getJSON("https://api.vide.me/v2/posts/show_pop_video/?videmecallback=?",
            function (jsonData) {
                tempObjectPopVideo.empty();
                if (!$.isEmptyObject(jsonData)) {

                    //console.log("$.fn.showPopVideoPagination data -----> " + JSON.stringify(jsonData));
                    //tempObjectPopVideo.html(showTile(parseFileMy(jsonData.slice(0, showPopVideoPaginationSettings.limit)), tempObjectPopVideo, "shownext"));
                    //tempObjectPopVideo.html(showTile(parseDataArrayToObject(jsonData.slice(0, showPopVideoPaginationSettings.limit)), tempObjectPopVideo, "shownext"));
                    showTileMultiple(parseDataArrayToObject(jsonData.slice(0, showPopVideoPaginationSettings.limit)), tempObjectPopVideo, "shownext");
                    /!*$(".video-js").each(function (videoIndex) {
                        console.log("video-js each ");
                        var videoId = $(this).attr("id");
                        videojs(videoId).ready(function(){
                            this.on("play", function(e) {
                                //pause other video
                                $(".video-js").each(function (index) {
                                    if (videoIndex !== index) {
                                        this.player.pause();
                                        //this.pause();
                                    }
                                });
                                videojs.log('postsOfSpringVideoOnlyMultiple play ' + this.currentSrc());
                            });
                        });
                    });*!/
                    var pagetotal = Math.ceil(jsonData.length / showPopVideoPaginationSettings.limit); //example=2
                    $('.videme-showpop-pagination').jqPagination({
                        //link_string	: '/?page={page_number}',
                        max_page: pagetotal,
                        paged: function (page) {
                            var skip = (page - 1) * showPopVideoPaginationSettings.limit;
                            skip2 = skip;
                            limit = skip2 + showPopVideoPaginationSettings.limit;
                            console.log("$.fn.showPopVideoPagination jqPagination -----> skip: " + skip);
                            //tempObjectPopVideo.html(showTile(parseFileMy(b.slice(skip2, limit)), tempObjectPopVideo, "shownext"));
                            //tempObjectPopVideo.html(showTile(parseDataArrayToObject(jsonData.slice(skip2, limit)), tempObjectPopVideo, "shownext"));
                            showTileMultiple(parseDataArrayToObject(jsonData.slice(skip2, limit)), tempObjectPopVideo, "shownext");
                            /!*$(".video-js").each(function (videoIndex) {
                                console.log("video-js each ");
                                var videoId = $(this).attr("id");
                                videojs(videoId).ready(function(){
                                    this.on("play", function(e) {
                                        //pause other video
                                        $(".video-js").each(function (index) {
                                            if (videoIndex !== index) {
                                                this.player.pause();
                                            }
                                        });
                                        videojs.log('postsOfSpringVideoOnlyMultiple play ' + this.currentSrc());
                                    });
                                });
                            });*!/
                        }
                    });
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObjectPopVideo.html(showError(data));
            })
            .always(function () {
            });
        //==});
    };*/

    /* 26072022 $.fn.showNextVideoPagination = function (options) { // TODO: recreate / remove
        console.log("$.fn.showNextVideoPagination -----> ok");
        showNextVideoPaginationSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 3,
            showNextVideo: ".videme-shownext-tile"
        }, options);
        if ($(this).length) {
            console.log("$.fn.showNextVideoPagination $(this) -----> yes " + $(this).length);
            var tempObjectNextVideo = $(this);
        } else {
            console.log("$.fn.showNextVideoPagination $(this) -----> nooo! " + $(this).length);
            var tempObjectNextVideo = $(showNextVideoPaginationSettings.showNextVideo);
        }
        console.log("$.fn.showNewVideo tempObject -----> " + tempObjectNextVideo.length);
        tempObjectNextVideo.html(VidemeProgress);
        //==return this.each(function () {
        //var tempObject = $(this);
        /!* Сделать запрос *!/
        /!*
         var data = $.fn.showNewVideo({
         //msg: msg
         });*!/
        //console.log("$.fn.showNextVideoPagination showNextVideoPaginationSettings -----> " + JSON.stringify(showNextVideoPaginationSettings));
        //console.log("$.fn.showNextVideoPagination data -----> " + JSON.stringify(data));

        //==var prevfile = $.cookie('vide_prev_file');
        //==var file = showNextVideoPaginationSettings.file;
        //$.cookie("vide_prev_file", file);
        //==$.cookie("vide_prev_file", file, {expires: 14, path: '/', domain: 'vide.me', secure: true});

        //$.getJSON("https://api.vide.me/file/shownext/?prevfile=" + prevfile + "&file=" + file + "&videmecallback=?",
        $.getJSON("https://api.vide.me/v2/posts/shownext/?prev_item_id=" + showNextVideoPaginationSettings.prev_item_id + "&next_item_id=" + showNextVideoPaginationSettings.next_item_id + "&videmecallback=?",

            function (jsonData) {
                console.log("$.fn.showNextVideoPagination data -----> " + JSON.stringify(jsonData));
                if (jsonData !== undefined) {

                    console.log("$.fn.showNextVideoPagination length -----> " + jsonData.length);

                    tempObjectNextVideo.html(showTile(parseDataArrayToObject(jsonData.slice(0, showNextVideoPaginationSettings.limit)), tempObjectNextVideo, "shownext"));

                    var pagetotal = Math.ceil(jsonData.length / showNextVideoPaginationSettings.limit); //example=2

                    $('.videme-shownext-pagination').jqPagination({
                        //link_string	: '/?page={page_number}',
                        max_page: pagetotal,
                        paged: function (page) {
                            var skip = (page - 1) * showNextVideoPaginationSettings.limit;
                            skip2 = skip;
                            limit = skip2 + showNextVideoPaginationSettings.limit;
                            console.log("$.fn.showNextVideoPagination jqPagination -----> skip: " + skip);
                            tempObjectNextVideo.html(showTile(parseDataArrayToObject(jsonData.slice(skip2, limit)), tempObjectNextVideo, "shownext"));
                        }
                    });
                } else {
                    tempObjectNextVideo.parent().hide("slow");
                    //$('.videme-shownext-pagination').parent().hide("slow");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                //tempObject.html(showError(data));
                tempObjectNextVideo.html("...");
            })
            .always(function () {
            });
        //==});
    };*/

    /* 26072022 $.fn.showNext = function (options) {
        console.log("$.fn.showNext -----> ok");
        showNextSettings = $.extend({
            limit: 3,
            showNextShowcase: ".videme-shownext-tile"
        }, options);
        if ($(this).length) {
            console.log("$.fn.showNext $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.showNextVideo $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showNextSettings.showNextShowcase);
        }
        console.log("$.fn.showNext tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/posts/shownext/?prev_item_id=" + showNextSettings.prev_item_id + "&next_item_id=" + showNextSettings.next_item_id + "&limit=" + showNextSettings.limit + "&videmecallback=?",
            function (jsonData) {
                console.log("$.fn.showNext data -----> " + JSON.stringify(jsonData));
                if (!$.isEmptyObject(jsonData)) {
                    //tempObject.parent().toggleClass('hidden');
                    $('.videme-shownext').toggleClass('hidden');
                    var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
                    tempObject.html("<ul class='list-group' id='" + id_list_group + "'></ul>");
                    showTileMultipleLI(parseDataArrayToObject(jsonData), id_list_group, 'shownext', 0);
                } else {
                    tempObject.parent().hide("slow");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html("...");
            })
            .always(function () {
            });
        //==});
    };*/

    $.fn.showNextV3 = function (options) { // 26072022
        //console.log("$.fn.showNextV3 -----> ok");
        showNextV3Settings = $.extend({
            limit: 3,
            showcaseTile: ".videme-v3-shownext-tile"
        }, options);
        if ($(this).length) {
            console.log("$.fn.showNextV3 $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.showNextV3 $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showNextV3Settings.showcaseTile);
        }
        //console.log("$.fn.showNextV3 tempObject -----> " + tempObject.length);
        //tempObject.html(VidemeProgress);
        //var file = getParameterByName('m');
        var prev_item_id = $.cookie('vide_prev_item_id');
        //var prev_item_id = '';
        var next_item_id = getParameterByName('m');
        if (!$.isEmptyObject(prev_item_id)) {
            //if ($.cookie('vide_prev_item_id')) {
            //if (prev_item_id) {
            //console.log('showNextV3 next item prev_item_id cookie yes -----> ' + $.cookie('vide_prev_item_id'));
            //prev_item_id = $.cookie('vide_prev_item_id');
            //prev_item_id = getParameterByName('m');
        } else {
            //console.log('showNextV3 next item prev_item_id cookie no -----> ');
            prev_item_id = getParameterByName('m');
        }
        //console.log('showNextV3 prev_item_id - ' + prev_item_id + ' , next_item_id ' + next_item_id);
        if (prev_item_id == next_item_id) {
            //prev_item_id = getParameterByName('m');
            prev_item_id = '';
            //next_item_id = '';
            next_item_id = getParameterByName('m');
        } else { // TODO: not worked
            //console.log('showNextV3 $.cookie ');
            $.cookie('vide_prev_item_id', next_item_id, {expires: 14, path: '/', domain: 'vide.me', secure: true});

        }
        //console.log('next item prev_item_id -----> ' + prev_item_id + ' next_item_id ----->' + next_item_id);


        $.getJSON("https://api.vide.me/v2/posts/shownext/?prev_item_id=" + prev_item_id + "&next_item_id=" + next_item_id + "&limit=" + showNextV3Settings.limit + "&videmecallback=?",
            function (jsonData) {
                //console.log("$.fn.showNextV3 data -----> " + JSON.stringify(jsonData));
                if (!$.isEmptyObject(jsonData)) {
                    //console.log("$.fn.showNextV3 data -----> yes data");
                    //tempObject.parent().toggleClass('hidden');
                    $('.videme-shownext').removeClass('hidden');
                    //var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
                    //tempObject.html("<ul class='list-group' id='" + id_list_group + "'></ul>");
                    //showTileMultipleLI(parseDataArrayToObject(jsonData), id_list_group, 'shownext', 0);

                    showTileV3(parseDataArrayToObject(jsonData), tempObject, 'showmulti', 1);
                } else {
                    //tempObject.parent().hide("slow");
                    //console.log("$.fn.showNextV3 data -----> no data");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html("...");
            })
            .always(function () {
            });
        //==});
    };

    /*

        $.fn.showNextVideoPagination = function (options) {
            console.log("$.fn.showNewVideoPagination -----> ok");
            showNextVideoPaginationSettings = $.extend({
                // TODO: добавить limit в NAD
                limit: 6,
                showNextVideo: ".videme-shownext-tile"
            }, options);
            /!*        if ($(this).length) {
             console.log("$.fn.showNewVideo $(this) -----> yes " + $(this).length);
             var tempObject = $(this);
             } else {
             console.log("$.fn.showNewVideo $(this) -----> nooo! " + $(this).length);
             var tempObject = $(showNewVideoPaginationSettings.showNewVideo);
             }
             console.log("$.fn.showNewVideo tempObject -----> " + tempObject.length);
             tempObject.html(VidemeProgress);*!/
            //==return this.each(function () {
            //var tempObject = $(this);
            /!* Сделать запрос *!/
            /!*
             var data = $.fn.showNewVideo({
             //msg: msg
             });*!/
            //console.log("$.fn.showPopVideoPagination showPopVideoPaginationSettings -----> " + JSON.stringify(showPopVideoPaginationSettings));
            //console.log("$.fn.showPopVideoPagination data -----> " + JSON.stringify(data));
            var prevfile = $.cookie('vide_prev_file');
            var file = showNextVideoPaginationSettings.file;
            var ticketname = showNextVideoPaginationSettings.ticketName;
            var messageid = showNextVideoPaginationSettings.messageid;
            $.cookie("vide_prev`_file", file);

    //	var updatedAt = $this.attr('updatedAt-value');
    //	var Subject = $this.attr('Subject-value');
    //	var Message = $this.attr('Message-value');
    //	var href = $this.attr('href');


            /!*
             $('.videme-video-element-center').html("\
             <video controls autoplay>\
             <source src='https://gu.vide.me/vic?m=" + ticketname + "&messageid=" + messageid + "' type='video/mp4'>\
             Your browser does not support the <code>video</code> element.\
             </video>\
             ");
             *!/


            /!* ==
             $('.videme-panel-actor2').html(b['results'][0]['FromUserName']);
             $('.videme-panel-date2').html(b['results'][0]['updatedAt']);
             $('.videme-panel-subject2').html(b['results'][0]['Subject']);
             $('.videme-panel-message2').html(b['results'][0]['Message']);
             *!/
            $(".videme-shownext-tile").html("<img src='data:image/gif;base64,R0lGODlhDQAMAKIAAP///7W1ta2trXNzczExMf4BAgAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAFACwAAAAADQAMAAADIgi6zCIghDilejRbgK2fHPRloVaB3Umm5iWqGzuW49bcQAIAIfkEBQoABQAsAAABAAMACgAAAwhYRMrb8ElHEwAh+QQFCgAFACwAAAEADAAKAAADHlgzRVRCQLnai1Mxl3HlmLddkmh11IhqZ5i25QvGCQAh+QQFCgAFACwAAAEACQAKAAADGVgiNVOEKOagXO3FmS2vGwZelEZ2YemJZgIAIfkEBQoABQAsBAABAAgACgAAAxYYUTNFRDEHZXtx3appnpjliWFXglACACH5BAUKAAUALAcAAQAFAAoAAAMNGFEzym61N2WE9FZsEwA7' />");

            /!* Вставить проверку одинаковости файлов*!/

            /!* Сделать запрос *!/
            $.getJSON("https://api.vide.me/file/shownext/?limit=12&prevfile=" + prevfile + "&file=" + file + "&videmecallback=?",
                function (b) {

                    if (b.results.length > 2) {

                        /!* Показать первый расклад *!/
                        var a = [];
                        $.each(b.results, function (d, c) {
                            /!* Выйти после 3 интерации *!/
                            if (d > 2) return false;
                            a.push("\
    <div class='box'>\
        <div class='boxInner'>\
            <a class='shownext' \
    file-value='#" + c.File + "' \
    messageid-value='#" + c.objectId + "' \
    FromUserName-value='#" + c.FromUserName + "' \
    updatedAt-value='#" + c.updatedAt + "' \
    Subject-value='#" + c.Subject + "' \
    Message-value='#" + c.Message + "' \
    href='https://vide.me/v?m=" + c.File + "' \
    target='_blank'>\
                <img src=\"https://api.vide.me/img/?i=" + c.File + ".jpg\" alt=\"" + c.updatedAt + "\" title=\"" + c.updatedAt + "\" onerror='imgError(this);'>\
            <div class='videme-tile-signboard-true'>" + c.updatedAt + "</div>\
            <div class=''>" + c.File + "</div>\
            </a>\
        </div>\
    </div>\
                    ")
                        });
                        /!* Всё слепить и показать *!/
                        $(".videme-shownext-tile").html(a.join(""));
                        /!* Вычисилить максимальное число страниц *!/
                        var pagetotal = Math.ceil(b.results.length / 3); //example=2
                        /!* Объявить экземпляр пейджинатора *!/
                        $('.videme-shownext-pagination').jqPagination({
                            //link_string	: '/?page={page_number}',
                            max_page: pagetotal,
                            paged: function (page) {
                                /!* Пропустить страниц = текущая страница * элементов на странице *!/
                                //var skip = (page - 1) * 4;
                                var skip = (page - 1) * 3;
                                $.getJSON("https://api.vide.me/file/shownext/?limit=12&skip=" + skip + "&prevfile=" + prevfile + "&file=" + file + "&videmecallback=?",
                                    function (b) {

                                        var a = [];
                                        $.each(b.results, function (d, c) {
                                            /!* Выйти после 3 интерации *!/
                                            if (d > 2) return false;
                                            a.push("\
    <div class='box'>\
        <div class='boxInner'>\
            <a class='shownext' \
    file-value='#" + c.File + "' \
    messageid-value='#" + c.objectId + "' \
    FromUserName-value='#" + c.FromUserName + "' \
    updatedAt-value='#" + c.updatedAt + "' \
    Subject-value='#" + c.Subject + "' \
    Message-value='#" + c.Message + "' \
    href='https://vide.me/v?m=" + c.File + "' \
    target='_blank'>\
                <img src=\"https://api.vide.me/img/?i=" + c.File + ".jpg\" alt=\"" + c.updatedAt + "\" title=\"" + c.updatedAt + "\" onerror='imgError(this);'>\
            <div class='videme-tile-signboard-true'>" + c.updatedAt + "</div>\
            <div class=''>" + c.File + "</div>\
            </a>\
        </div>\
    </div>\
                        ")
                                        });
                                        /!* Всё слепить и показать *!/
                                        $(".videme-shownext-tile").html(a.join(""));

                                    });
                            }
                        });
                    } else {
                        $('.videme-shownext-pagination').hide('fast');
                    }

                })
                .done(function (data) {
                })
                .fail(function (data) {
                    tempObject.html(showError(data));
                })
                .always(function () {
                });
            //==});
        };
    */

    /* 26072022 function showTile(showFile, tempObject, actionUrlClass) { // TODO: remove
        console.log("showTile tempObject.width() -----> " + tempObject.width());
        if (tempObject.width() < 500) {
            var tempObjectClass = " videme-narrow-tile";
        } else {
            var tempObjectClass = "";
        }
        var html = [];
        console.log("showTile showFile.length -----> " + showFile.length);
        //console.log("showTile showFile -----> " + JSON.stringify(showFile));
        //showFile = $.parseJSON(showFile);
        //console.log("showTile showFile parseJSON -----> " + JSON.stringify(showFile));
        //maxTile = (maxTile - 1) || 18;
        html.push("<ul class='list-group'>");
        $.each(showFile, function (key, value) {
            //console.log("value.Message --- " + JSON.stringify(value.Message));
            //console.log("showTile value ---> " + JSON.stringify(value));
            //console.log("showTile value.video_duration ---> " + JSON.stringify(value.created_at));
            //if (d > maxTile) return false;
            var a;
            if (value.a) {
                a = value.a + "<br>";
            } else {
                a = "";
            }
            var b;
            if (value.b) {
                b = value.b + "<br>";
            } else {
                b = "";
            }
            var c;
            if (value.c) {
                c = value.c + "<br>";
            } else {
                c = "";
            }
            var d;
            if (value.d) {
                //d = convertTimestamp(value.d) + "<br>";
                d = value.d + "<br>";
            } else {
                d = "";
            }
            /!*var spring;
            if (value.spring) {
                spring = value.spring;
            } else {
                spring = '';
            }
            var videoDuration;
            if (value.video_duration) {
                videoDuration = sec2str(value.video_duration) + "<br>";
            } else {
                videoDuration = "";
            }
            var created_at;
            if (value.created_at) {
                var currentTime = Date();
                //created_at = timeToWord(value.created_at);
                created_at = value.created_at;
            } else {
                created_at = "";
            }*!/
            var href;
            var img;
            var trueActionClass;
            //if (value.messageid) {
            //if (value.indexOf("messageid")) {
            //if ("messageid" in value) {
            if (value.type === 'article') {
                if (value.post_id && value.post_id != "undefined") {
                    href = "https://www.vide.me/a/?a=" + value.href + "&post_id=" + value.post_id;
                } else {
                    href = "https://www.vide.me/a/?a=" + value.href;
                }
                //img = value.cover;
                img = 'https://s3.amazonaws.com/img.vide.me/' + value.cover;
                trueActionClass = 'article-url';
            } else if (value.type === 'video') {
                if (value.message_id && value.message_id != "undefined") {
                    href = "https://www.vide.me/v?m=" + value.href + "&message_id=" + value.message_id;
                } else {
                    href = "https://www.vide.me/v?m=" + value.href;
                }
                if (value.post_id && value.post_id != "undefined") {
                    href = "https://www.vide.me/v?m=" + value.href + "&post_id=" + value.post_id;
                } else {
                    href = "https://www.vide.me/v?m=" + value.href;
                }
                img = "https://s3.amazonaws.com/img.vide.me/" + value.item_id + ".jpg";
                trueActionClass = actionUrlClass;
            } else if (value.type === 'image') {
                if (value.message_id && value.message_id != "undefined") {
                    href = "https://www.vide.me/i/?i=" + value.href + "&message_id=" + value.message_id;
                } else {
                    href = "https://www.vide.me/i/?i=" + value.href;
                }
                if (value.post_id && value.post_id != "undefined") {
                    href = "https://www.vide.me/i/?i=" + value.href + "&post_id=" + value.post_id;
                } else {
                    href = "https://www.vide.me/i/?i=" + value.href;
                }
                img = "https://s3.amazonaws.com/img.vide.me/" + value.cover;
                trueActionClass = 'image-url';
            }
            if (value.tags) {
                //console.log("showTile value.tags -----> " + JSON.stringify(value.tags));
            } else {
                //console.log("showTile value.tags -----> empty");
            }
            if (value.count) {
                count = value.count
            } else {
                count = '' + '<br>';
            }
            //console.log("showTile spring -----> <a href='https://www.vide.me/" + spring + "'>" + a + "</a>");
            /!*html.push("<div class='box" + tempObjectClass + "'>\
                <div class='boxInner'>\
				<a class='" + actionUrlClass + "' \
						video='" + value.video + "' \
						message_id='" + value.message_id + "' \
						user_display_name='" + value.user_display_name + "' \
						created_at='" + value.created_at + "' \
						updated_at='" + value.updated_at + "' \
						title='" + value.title + "' \
						content='" + value.content + "' \
                        cover='" + value.cover + "' \
                        item_id='" + value.item_id + "' \
                        post_id='" + value.post_id + "' \
                        spring='" + value.spring + "' \
                        user_picture='" + value.user_picture + "' \
                        to_user_id='" + value.to_user_id + "' \
                        from_user_id='" + value.from_user_id + "' \
                        from_user_display_name='" + value.from_user_display_name + "' \
                        from_user_name='" + value.user_display_name + "' \
                        file='" + value.item_id + "' \
                        video_duration='" + value.video_duration + "' \
                        count='" + value.item_count_show + "' \
                        access='" + value.access + "' \
                        tags='" + JSON.stringify(value.tags) + "' \
						href='" + href + "' id='el_" + key + "' target='_blank'>\
			<div class='titleTop'>\
						 " + a + "\
						 " + b + "\
						 " + c + "\
						 " + d + "\
						 " + videoDuration + "\
						 " + count + "\
			</div>\
						 <img src='" + img + "' alt=''>\
						 </img>\
                <div class='videme-tile-signboard-true'></div>\
				</a>\
			</div>\
				</div>");
            //$("#el_" + key).attr(value);
        });*!/
            if (value.access == 'public') {
                var share = 'share';
                var fa_icon_access = 'fa fa-unlock';
            } else {
                var share = '';
                var fa_icon_access = 'fa fa-lock';
                //value.access = 'private';
            }
            if (actionUrlClass == 'file-my-url') {
                value.dropdown = {
                    'dd_item_1': 'edit_my_video',
                    'dd_item_2': 'send',
                    'dd_item_3': 'share',
                    'dd_item_4': 'delete'
                };
                value.key = key;
                value = paddingButtonMy(value);
                //console.log("showTile value -----> " + JSON.stringify(value));
            }

            if (actionUrlClass == 'file-inbox-url') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share,
                    'dd_item_3': 'delete'
                };
                value.key = key;
                value = paddingButtonInbox(value);
                //console.log("showTile value -----> " + JSON.stringify(value));
            }

            if (actionUrlClass == 'file-sent-url') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share,
                    'dd_item_3': 'delete'
                };
                value.key = key;
                value = paddingButtonSent(value);
                //console.log("showTile value -----> " + JSON.stringify(value));
            }
            if (actionUrlClass == 'shownext') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share
                };
                value.key = key;
                value = paddingButtonSent(value);
                //console.log("showTile value -----> " + JSON.stringify(value));
            }
            if (actionUrlClass == 'file-spring-url') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share
                };
                value.key = key;
                value = paddingButtonSent(value);
                //console.log("showTile value -----> " + JSON.stringify(value));
            }
            if (actionUrlClass == 'article') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share
                };
                value.key = key;
                value = paddingButtonSent(value);
                //console.log("showTile value -----> " + JSON.stringify(value));
            }

            if (actionUrlClass == 'my-posts-url') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': 'share',
                    'dd_item_3': 'delete-my-post'
                };
                value.key = key;
                value = paddingButtonMyPosts(value);
                //console.log("showTile value -----> " + JSON.stringify(value));
            }

            html.push("<li class='list-group-item videme-tile-item'>" +
                "<a href='https://www.vide.me/" + value.spring + "'>" +
                "<img src='https://s3.amazonaws.com/img.vide.me/" + value.user_picture + "' alt='' class='img-thumbnail videme-relation-card-img'>" +
                "</a>" +
                "<div class='videme-tile-item-1-line'>" +
                "<div class='font-weight-bold videme-tile-item-user'>" +
                "<a href='https://www.vide.me/" + value.spring + "' class='tile-item-owner'>"
                + value.user_display_name +
                "</a>" +
                "</div>" +
                "<div class='text-right videme-tile-item-created-at'>" + timeToWord(value.created_at) + "</div>" +
                showDropdownForDoorbelSign(value) +
                "</div>" +
                "<div class='videme-tile-item-2-line'>" +
                "<div class='videme-tile-item-title'>" + value.title + "</div>" +
                "<span class='iconic' data-glyph='star' title='star' aria-hidden='true'></span>" +
                "</div>" +
                "<div class='box" + tempObjectClass + "'>\
                <div class='boxInner'>\
				<a class='" + trueActionClass + "' \
						video='" + value.video + "' \
						message_id='" + value.message_id + "' \
						user_display_name='" + value.user_display_name + "' \
						created_at='" + value.created_at + "' \
						updated_at='" + value.updated_at + "' \
						title='" + value.title + "' \
						content='" + value.content + "' \
                        cover='" + value.cover + "' \
                        item_id='" + value.item_id + "' \
                        post_id='" + value.post_id + "' \
                        spring='" + value.spring + "' \
                        user_picture='https://s3.amazonaws.com/img.vide.me/" + value.user_picture + "'\
                        to_user_id='" + value.to_user_id + "' \
                        from_user_id='" + value.from_user_id + "' \
                        from_user_display_name='" + value.from_user_display_name + "' \
                        from_user_name='" + value.user_display_name + "' \
                        file='" + value.item_id + "' \
                        video_duration='" + value.video_duration + "' \
                        count='" + value.item_count_show + "' \
                        access='" + value.access + "' \
                        tags='" + JSON.stringify(value.tags) + "' \
						href='" + href + "' id='el_" + key + "'>\
			<div class='titleTop'>\
						 " + value.type + "\
			</div>\
						 <img src='" + img + "' alt=''>\
						 </img>\
                <div class='videme-tile-signboard-true'></div>\
				</a>\
			</div>\
				</div>\
				<i class='fa fa-eye'></i>\
				" + value.item_count_show + "\
				<i class='fa fa-clock-o'></i>\
				" + sec2str(value.video_duration) + "\
				<i class='" + fa_icon_access + "'></i>\
				" + value.access + "\
				</li>\
				");
            //$("#el_" + key).attr(value);
        });
        html.push("</ul>");

        //console.log("showTile html -----> " + html);

        //return "<ul class='list-group'>" + html + "</ul>";
        //return html;
        return html.join('');
    }*/

    /* 26072022 function showTileMultiple(showFile, tempObject, actionUrlClass) { // TODO: remove
        //console.log("showTile tempObject.width() -----> " + tempObject.width());
        if (tempObject.width() < 500) {
            var tempObjectClass = " videme-narrow-tile";
        } else {
            var tempObjectClass = "";
        }
        var html = [];
        var courent_id = 0;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //var $newdiv1 = $( "<ul class='list-group'>" ),
        //    newdiv2 = document.createElement( "li" )/!*,
        //    existingdiv1 = document.getElementById( "foo" )*!/;

        //var cList = $('ul.videme-list-g');

        console.log("showTile showFile.length -----> " + showFile.length);
        //console.log("showTile showFile -----> " + JSON.stringify(showFile));
        //showFile = $.parseJSON(showFile);
        //console.log("showTile showFile parseJSON -----> " + JSON.stringify(showFile));
        //maxTile = (maxTile - 1) || 18;
        //html.push("<ul class='list-group' id='" + id_list_group +"'>ddd");
        //html.push("<ul class='list-group' id='tile_video'>");
        //==tempObject.append("<ul class='list-group' id='tile_video'>ttteeesssttt</ul>");
        //tempObject.append("<p>test</p>");
        tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul>");
        $.each(showFile, function (key, value) {
            courent_id = courent_id + 1;
            //console.log("value.Message --- " + JSON.stringify(value.Message));
            //console.log("showTile value ---> " + JSON.stringify(value));
            //console.log("showTile value.video_duration ---> " + JSON.stringify(value.created_at));
            //if (d > maxTile) return false;
            var a;
            if (value.a) {
                a = value.a + "<br>";
            } else {
                a = "";
            }
            var b;
            if (value.b) {
                b = value.b + "<br>";
            } else {
                b = "";
            }
            var c;
            if (value.c) {
                c = value.c + "<br>";
            } else {
                c = "";
            }
            var d;
            if (value.d) {
                //d = convertTimestamp(value.d) + "<br>";
                d = value.d + "<br>";
            } else {
                d = "";
            }
            /!*var spring;
            if (value.spring) {
                spring = value.spring;
            } else {
                spring = '';
            }
            var videoDuration;
            if (value.video_duration) {
                videoDuration = sec2str(value.video_duration) + "<br>";
            } else {
                videoDuration = "";
            }
            var created_at;
            if (value.created_at) {
                var currentTime = Date();
                //created_at = timeToWord(value.created_at);
                created_at = value.created_at;
            } else {
                created_at = "";
            }*!/
            var href;
            var img;
            var trueActionClass;
            var likes = '';
            var post_type = '';
            var reposts_count = '';
            if (value.likes_count == 0) {
                likes = '';
            } else {
                likes = value.likes_count;
            }
            if (value.reposts_count == 0) {
                reposts_count = '';
            } else {
                reposts_count = value.reposts_count;
            }
            if (value.post_type == 'update') {
                post_type = 'Update';
            } else if (value.post_type == 'item_like') {
                post_type = 'Liked';
            } else if (value.post_type == 'item_repost') {
                post_type = 'Repost';
            } else if (value.post_type == 'update_user_picture') {
                post_type = 'Update picture';
            } else if (value.post_type == 'update_user_cover') {
                post_type = 'Update cover';
            } else if (value.post_type == 'user_cover_top') {
                post_type = 'Update cover';
            }
            //if (value.messageid) {
            //if (value.indexOf("messageid")) {
            //if ("messageid" in value) {
            if (value.type === 'article') {
                if (value.post_id && value.post_id != "undefined") {
                    href = "https://www.vide.me/a/?a=" + value.href + "&post_id=" + value.post_id;
                } else {
                    href = "https://www.vide.me/a/?a=" + value.href;
                }
                //img = value.cover;
                img = 'https://s3.amazonaws.com/img.vide.me/' + value.cover;
                trueActionClass = 'article-url';
            } else if (value.type === 'video') {
                if (value.message_id && value.message_id != "undefined") {
                    href = "https://www.vide.me/v?m=" + value.href + "&message_id=" + value.message_id;
                } else {
                    href = "https://www.vide.me/v?m=" + value.href;
                }
                if (value.post_id && value.post_id != "undefined") {
                    href = "https://www.vide.me/v?m=" + value.href + "&post_id=" + value.post_id;
                } else {
                    href = "https://www.vide.me/v?m=" + value.href;
                }
                img = "https://s3.amazonaws.com/img.vide.me/" + value.item_id + ".jpg";
                //trueActionClass = actionUrlClass;
                if (actionUrlClass == 'shownext') {
                    trueActionClass = actionUrlClass;
                }
                if (actionUrlClass == 'showmulti') {
                    trueActionClass = 'multi_video';
                }
            } else if (value.type === 'image') {
                if (value.message_id && value.message_id != "undefined") {
                    href = "https://www.vide.me/i/?i=" + value.href + "&message_id=" + value.message_id;
                } else {
                    href = "https://www.vide.me/i/?i=" + value.href;
                }
                if (value.post_id && value.post_id != "undefined") {
                    href = "https://www.vide.me/i/?i=" + value.href + "&post_id=" + value.post_id;
                } else {
                    href = "https://www.vide.me/i/?i=" + value.href;
                }
                img = "https://s3.amazonaws.com/img.vide.me/" + value.cover;
                trueActionClass = 'image-url';
            }
            if (value.tags) {
                //console.log("showTile value.tags -----> " + JSON.stringify(value.tags));
            } else {
                //console.log("showTile value.tags -----> empty");
            }
            if (value.count) {
                count = value.count
            } else {
                count = '' + '<br>';
            }
            //console.log("showTile spring -----> <a href='https://www.vide.me/" + spring + "'>" + a + "</a>");
            /!*html.push("<div class='box" + tempObjectClass + "'>\
                <div class='boxInner'>\
				<a class='" + actionUrlClass + "' \
						video='" + value.video + "' \
						message_id='" + value.message_id + "' \
						user_display_name='" + value.user_display_name + "' \
						created_at='" + value.created_at + "' \
						updated_at='" + value.updated_at + "' \
						title='" + value.title + "' \
						content='" + value.content + "' \
                        cover='" + value.cover + "' \
                        item_id='" + value.item_id + "' \
                        post_id='" + value.post_id + "' \
                        spring='" + value.spring + "' \
                        user_picture='" + value.user_picture + "' \
                        to_user_id='" + value.to_user_id + "' \
                        from_user_id='" + value.from_user_id + "' \
                        from_user_display_name='" + value.from_user_display_name + "' \
                        from_user_name='" + value.user_display_name + "' \
                        file='" + value.item_id + "' \
                        video_duration='" + value.video_duration + "' \
                        count='" + value.item_count_show + "' \
                        access='" + value.access + "' \
                        tags='" + JSON.stringify(value.tags) + "' \
						href='" + href + "' id='el_" + key + "' target='_blank'>\
			<div class='titleTop'>\
						 " + a + "\
						 " + b + "\
						 " + c + "\
						 " + d + "\
						 " + videoDuration + "\
						 " + count + "\
			</div>\
						 <img src='" + img + "' alt=''>\
						 </img>\
                <div class='videme-tile-signboard-true'></div>\
				</a>\
			</div>\
				</div>");
            //$("#el_" + key).attr(value);
        });*!/
            if (value.access == 'public') {
                var share = 'share';
                var fa_icon_access = 'fa fa-unlock';
            } else {
                var share = '';
                var fa_icon_access = 'fa fa-lock';
                //value.access = 'private';
            }
            if (actionUrlClass == 'file-my-url') {
                value.dropdown = {
                    'dd_item_1': 'edit_my_video',
                    'dd_item_2': 'send',
                    'dd_item_3': 'share',
                    'dd_item_4': 'delete'
                };
                value.key = key;
                value = paddingButtonMy(value);
                //console.log("showTile value -----> " + JSON.stringify(value));
            }

            if (actionUrlClass == 'file-inbox-url') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share,
                    'dd_item_3': 'delete'
                };
                value.key = key;
                value = paddingButtonInbox(value);
                //console.log("showTile value -----> " + JSON.stringify(value));
            }

            if (actionUrlClass == 'file-sent-url') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share,
                    'dd_item_3': 'delete'
                };
                value.key = key;
                value = paddingButtonSent(value);
                //console.log("showTile value -----> " + JSON.stringify(value));
            }
            if (actionUrlClass == 'shownext') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share
                };
                value.key = key;
                value = paddingButtonSent(value);
                //console.log("showTile value -----> " + JSON.stringify(value));
            }
            if (actionUrlClass == 'showmulti') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share
                };
                value.key = key;
                value = paddingButtonSent(value);
                //console.log("showTile value -----> " + JSON.stringify(value));
            }
            if (actionUrlClass == 'file-spring-url') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share
                };
                value.key = key;
                value = paddingButtonSent(value);
                //console.log("showTile value -----> " + JSON.stringify(value));
            }
            if (actionUrlClass == 'article') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share
                };
                value.key = key;
                value = paddingButtonSent(value);
                //console.log("showTile value -----> " + JSON.stringify(value));
            }

            if (actionUrlClass == 'my-posts-url') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': 'share',
                    'dd_item_3': 'delete-my-post'
                };
                value.key = key;
                value = paddingButtonMyPosts(value);
                //console.log("showTile value -----> " + JSON.stringify(value));
            }

            if (actionUrlClass == 'item-card') {
                value.dropdown = {};
                //value.key = key;
                //value = paddingButtonMyPosts(value);
                //console.log("showTile value -----> " + JSON.stringify(value));
            }
            //html.push("<li class='list-group-item videme-tile-item'>");
            //tempObject.append("<li class='list-group-item videme-tile-item' id='li_" + courent_id + "'>");
            $('#' + id_list_group).append("<li class='list-group-item videme-tile-item' id='li_" + id_list_group + "_" + courent_id + "'></li>");
            if (value.type !== 'video') {
                $('#li_' + id_list_group + '_' + courent_id).append("<a href='https://www.vide.me/" + value.spring + "'>" +
                    "<img src='https://s3.amazonaws.com/img.vide.me/" + value.user_picture + "' alt='' class='img-thumbnail videme-relation-card-img'>" +
                    "</a>" +
                    "<div class='videme-tile-item-1-line'>" +
                    "<div class='font-weight-bold videme-tile-item-user'>" +
                    "<a href='https://www.vide.me/" + value.spring + "' class='tile-item-owner'>"
                    + value.user_display_name +
                    "</a>" +
                    "</div>" +
                    "<div class='post_type'> " + post_type + "</div>" +
                    "<div class='text-right videme-tile-item-created-at'>" + timeToWord(value.created_at) + "</div>" +
                    showDropdownForDoorbelSign(value) +
                    "</div>" +
                    "<div class='videme-tile-item-2-line'>" +
                    "<div class='videme-tile-item-title'>" + value.title + "</div>" +
                    "<span class='iconic' data-glyph='star' title='star' aria-hidden='true'></span>" +
                    "</div>" +
                    "<div class='box" + tempObjectClass + "'>\
                <div class='boxInner'>\
				<a class='" + trueActionClass + "' \
						video='" + value.video + "' \
						message_id='" + value.message_id + "' \
						user_display_name='" + value.user_display_name + "' \
						created_at='" + value.created_at + "' \
						updated_at='" + value.updated_at + "' \
						title='" + value.title + "' \
						content='" + value.content + "' \
                        cover='" + value.cover + "' \
                        item_id='" + value.item_id + "' \
                        post_id='" + value.post_id + "' \
                        spring='" + value.spring + "' \
                        user_picture='https://s3.amazonaws.com/img.vide.me/" + value.user_picture + "'\
                        to_user_id='" + value.to_user_id + "' \
                        from_user_id='" + value.from_user_id + "' \
                        from_user_display_name='" + value.from_user_display_name + "' \
                        from_user_name='" + value.user_display_name + "' \
                        file='" + value.item_id + "' \
                        video_duration='" + value.video_duration + "' \
                        count='" + value.item_count_show + "' \
                        access='" + value.access + "' \
                        tags='" + JSON.stringify(value.tags) + "' \
						href='" + href + "' id='el_" + key + "'>\
			<div class='titleTop'>\
						 " + value.type + "\
			</div>\
						 <img src='" + img + "' alt=''>\
						 </img>\
                <div class='videme-tile-signboard-true'></div>\
				</a>\
			</div>\
				</div>\
				<i class='fa fa-eye'></i>\
				" + value.item_count_show + "\
				<i class='fa fa-clock-o'></i>\
				" + sec2str(value.video_duration) + "\
				<i class='" + fa_icon_access + "'></i>\
				" + value.access + "\
                <i class='fa fa-thumbs-o-up'></i>\
				" + likes + "\
            <button type='button' class='btn btn-primary btn-sm set_like' id='like_" + id_list_group + "_" + courent_id + "' item_id='" + value.item_id + "'>Like</button>\
            <a href='https://api.vide.me/v2/items/share/?item_id=" + value.item_id + "&nad=" + $.cookie('vide_nad') + "' class='btn btn-outline-secondary btn-sm list-url'>Repost</a>");

                //$("#el_" + key).attr(value);
            } else {
                //tempObject.append("<li class='list-group-item videme-tile-item' id='li_" + courent_id + "'>");

                //$('.videme-tile').append("<video id='tile_multiple_video" + courent_id + "' class='video-js' controls  preload='auto' width='220' height='100'></video>");
                //$('#tile_video').append("<video id='tile_multiple_video" + courent_id + "' class='video-js' controls  preload='auto' width='220' height='100'></video>");
                //html.push("<video id='tile_multiple_video" + courent_id + "' class='video-js' controls  preload='auto' width='220' height='100'></video>");
                //tempObject.append("<video id='tile_multiple_video" + courent_id + "' class='video-js' controls  preload='auto' width='220' height='100'></video>");
                //$('#' + id_list_group).appendTo("<video id='tile_multiple_video" + courent_id + "' class='video-js' controls  preload='auto' width='220' height='100'></video>");
                //--$('#tile_video').appendTo("<p>" + courent_id + "</p>");
                //==$('#tile_video').append("<p>" + courent_id + "</p>");
                //===$('#' + id_list_group).append("<p>" + courent_id + "</p>");
                //$('#tile_video').append("<video id='tile_multiple_video" + courent_id + "' class='video-js' controls  preload='auto' width='220' height='100'></video>");
                //===$('#' + id_list_group).append("<video id='tile_multiple_video" + courent_id + "' class='video-js' controls  preload='auto' width='220' height='100'></video>");
                //$('#videme-tile').appendTo("<video id='tile_multiple_video" + courent_id + "' class='video-js' controls  preload='auto' width='220' height='100'></video>");
                //$("#" + id_list_group + "").append("<video id='tile_multiple_video" + courent_id + "' class='video-js' controls  preload='auto' width='220' height='100'></video>");
                //document.getElementById(id_list_group).append("<video id='tile_multiple_video" + courent_id + "' class='video-js' controls  preload='auto' width='220' height='100'></video>");
                //var ligrid = document.getElementById(id_list_group);
                //var ligrid = document.getElementById("li_" + courent_id);
                //ligrid.append("<video id='tile_multiple_video" + courent_id + "' class='video-js' controls  preload='auto' width='220' height='100'></video>");

                //document.getElementById("li_" + courent_id).innerHTML = "<video id='tile_multiple_video" + courent_id + "' class='video-js' controls  preload='auto' width='220' height='100'></video>";

                $('#li_' + id_list_group + '_' + courent_id).append("<a href='https://www.vide.me/" + value.spring + "'>" +
                    "<img src='https://s3.amazonaws.com/img.vide.me/" + value.user_picture + "' alt='' class='img-thumbnail videme-relation-card-img'>" +
                    "</a>" +
                    "<div class='videme-tile-item-1-line'>" +
                    "<div class='font-weight-bold videme-tile-item-user'>" +
                    "<a href='https://www.vide.me/" + value.spring + "' class='tile-item-owner'>"
                    + value.user_display_name +
                    "</a>" +
                    "</div>" +
                    "<div class='post_type'> " + post_type + "</div>" +
                    "<div class='text-right videme-tile-item-created-at'>" + timeToWord(value.created_at) + "</div>" +
                    showDropdownForDoorbelSign(value) +
                    "</div>" +
                    "<div class='videme-tile-item-2-line'>" +
                    "<div class='videme-tile-item-title'>" + value.title + "</div>" +
                    "<span class='iconic' data-glyph='star' title='star' aria-hidden='true'></span>" +
                    "</div>" +
                    "<div class='box" + tempObjectClass + "'>\
                <div class='boxInner'>\
				<a class='" + trueActionClass + "' \
						video='" + value.video + "' \
						message_id='" + value.message_id + "' \
						user_display_name='" + value.user_display_name + "' \
						created_at='" + value.created_at + "' \
						updated_at='" + value.updated_at + "' \
						title='" + value.title + "' \
						content='" + value.content + "' \
                        cover='" + value.cover + "' \
                        item_id='" + value.item_id + "' \
                        post_id='" + value.post_id + "' \
                        spring='" + value.spring + "' \
                        user_picture='https://s3.amazonaws.com/img.vide.me/" + value.user_picture + "'\
                        to_user_id='" + value.to_user_id + "' \
                        from_user_id='" + value.from_user_id + "' \
                        from_user_display_name='" + value.from_user_display_name + "' \
                        from_user_name='" + value.user_display_name + "' \
                        file='" + value.item_id + "' \
                        video_duration='" + value.video_duration + "' \
                        count='" + value.item_count_show + "' \
                        access='" + value.access + "' \
                        tags='" + JSON.stringify(value.tags) + "' \
						href='" + href + "' id='el_" + key + "'>\
			<div class='titleTop'>\
						 " + value.type + "\
			</div>\
			<div class='videme-tile-signboard-true'></div>\
						 <video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls  preload='auto'></video>\
						 <!--<div id='videme-minivideo'><div>-->\
				</a>\
			</div>\
				</div>\
				<i class='fa fa-eye'></i>\
				" + value.item_count_show + "\
				<i class='fa fa-clock-o'></i>\
				" + sec2str(value.video_duration) + "\
				<i class='" + fa_icon_access + "'></i>\
				" + value.access + "\
				<i class='fa fa-thumbs-o-up'></i>\
				" + likes + "\
				<button type='button' class='btn btn-primary btn-sm set_like' id='like_" + id_list_group + "_" + courent_id + "' item_id='" + value.item_id + "'>Like</button>\
                    <a href='https://api.vide.me/v2/items/share/?item_id=" + value.item_id + "&nad=" + $.cookie('vide_nad') + "' class=\"btn btn-outline-secondary btn-sm list-url\">Repost</a>"
                );

                /!*var li = $('<li/>')
                    .addClass('list-group-item')
                    .attr('role', 'menuitem')
                    .appendTo(cList);

                /!*var aaa = $('<a/>')
                    .addClass('ui-all')
                    .text(countries[i])
                    .appendTo(li);*!/

                var aaa = $('<a/>')
                    .addClass('ui-all')
                    .text('test')
                    .appendTo(li);*!/

                /!*$("#videme-minivideo").html("<video id=\"my_video2\" class=\"video-js vjs-default-skin video-down\"></video> \
				<button id=\"closevideo\" type=\"button\" class=\"close closevideo hidden\" aria-label=\"Close\"> \
					<span aria-hidden=\"true\">&times;</span> \
				</button> \
			");*!/

                //var width = document.getElementById('tile_multiple_video' + courent_id).parentElement.offsetWidth;
                var width = document.getElementById('li_' + id_list_group + '_' + courent_id).parentElement.offsetWidth;
                //var video_player = videojs('tile_multiple_video' + courent_id);
                console.log('width ---> ' + width);

                var opions = {
                    "width": width,
                    "height": width * (360 / 640)
                };
                //var video_player = videojs('tile_multiple_video' + courent_id);
                //var video_player = videojs('tile_multiple_video' + courent_id, opions);
                var video_player = videojs('tile_multiple_video_' + id_list_group + '_' + courent_id, opions, function onPlayerReady() {
                    videojs.log('Your player is ready!');

                    // In this context, `this` is the player that was created by Video.js.
                    //this.play();

                    // How about an event listener?
                    this.on('ended', function () {
                        videojs.log('Awww...over so soon?!');
                    })
                    this.on('play', function () {
                        videojs.log('play ' + value.item_id);
                        videojs.log('postsOfSpringVideoOnlyMultiple play ' + this.currentSrc());
                        //videojs.log('postsOfSpringVideoOnlyMultiple play ' + this.player.currentTime());
                        //videojs.log('postsOfSpringVideoOnlyMultiple play ' + this.currentTime());
                        //scrollSetting(miniPlayer);                            //miniPlayer.hide();
                        /!*                     miniPlayer.muted(true);
                                             miniPlayer.src({
                                                 //type: "video/mp4",
                                                 type: "application/x-mpegURL",
                                                 //src: sourseURL + showcaseVideoSettings.file + messageAdd
                                                 //src: sourseURL + showcaseVideoSettings.video + '.mp4' // TODO: add message_id
                                                 src: this.currentSrc()
                                                 /!*"width": width,
                                                 "height": width * (360 / 640)*!/
                                             });
                                             miniPlayer.load();
                                             miniPlayer.play();*!/
                    });
                });
                video_player.on("play", function () {
                    goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + value.item_id);

                    /!*miniPlayer.muted(true);
                    miniPlayer.src({
                        //type: "video/mp4",
                        type: "application/x-mpegURL",
                        //src: sourseURL + showcaseVideoSettings.file + messageAdd
                        //src: sourseURL + showcaseVideoSettings.video + '.mp4' // TODO: add message_id
                        src: this.currentSrc()
                        /!*"width": width,
                        "height": width * (360 / 640)*!/
                    });
                    miniPlayer.load();
                    miniPlayer.play();*!/
                });
                //myPlayer.width(width).height(width * (360 / 640));


                video_player.src({
                    //type: "video/mp4",
                    type: "application/x-mpegURL",
                    //src: sourseURL + showcaseVideoSettings.file + messageAdd
                    //src: sourseURL + showcaseVideoSettings.video + '.mp4' // TODO: add message_id
                    src: 'https://s3.amazonaws.com/video.vide.me/' + value.item_id + '.m3u8', // TODO: add message_id
                    /!*"width": width,
                    "height": width * (360 / 640)*!/
                });
                video_player.controls(true);
                //video_player.load(); // TODO: preload??? no
                //video_player.play();
                /!*video_player.on('ended', function () {
                    /!*
                     showcasePlayerFunc.src({
                     type: "video/mp4",
                     src: "https://r7.cf1.rackcdn.com/.mp4"
                     });
                     showcasePlayerFunc.load();
                     showcasePlayerFunc.play();*!/
                });*!/

                video_player.on('ended', function () {
                    videojs.log('Awww...over so soon?!');
                });

            }
            //html.push("</li>\
            //tempObject.append("</li>\
            //	");
        });

        $(".video-js").each(function (videoIndex) {
            // wrong place
            console.log("video-js each ");
            var videoId = $(this).attr("id");
            videojs(videoId).ready(function () {
                this.on("play", function (e) {
                    //pause other video
                    $(".video-js").each(function (index) {
                        if (videoIndex !== index) {
                            this.player.pause();
                        }
                    });
                    videojs.log('postsOfSpringVideoOnlyMultiple play ' + this.currentSrc());
                });
            });
        });
        //html.push("</ul>");
        //tempObject.append("</ul>");


        //console.log("showTile html -----> " + html);

        //return "<ul class='list-group'>" + html + "</ul>";
        //return html;
        //return html.join('');
    }*/


    /* 26072022 function getItem(getItemURL, id_list_group, classM, page, callback) { // TODO: remove
        $.getJSON(getItemURL,
            function (data) {
                //console.log("postsOfSpringVideoOnlyMultiple data -----> " + JSON.stringify(data));
                //var response_time = Math.round(performance.now() - start_time);
                //$('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    //tempObject.empty();
                    //console.log("$.fn.postsOfSpring data -----> yes" + JSON.stringify(data));
                    //tempObject.html(showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext"));
                    //===showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext");
                    showTileMultipleLI(parseDataArrayToObject(data), id_list_group, classM, page);
                    //$.fn.showcaseVideoTextButton(paddingButtonMySpring(data[0]));
                } else {
                    console.log("$.fn.postsOfSpring data -----> no");
                    //tempObject.html("No results");
                    //$('#' + id_list_group).html("No results");
                    callback();
                }

            })
            .done(function (data) {
                $('.videme-scroll-progress').empty();
            })
            .fail(function (data) {
                //tempObject.html(showError(data));
                callback();

            })
            .always(function () {
            });

    }*/

    /*function showRecomendConnect(msg) {/!*========================================================= remove ======*!/

        //tempObject.html('Recomend connect:')
        //$('.videme-newpost-scroll').html(msg);
        //alert('sdfsdf');
        console.log('showRecomendConnect');
    }*/

    /*    function Thing(name333) {
            this.name333 = name333;
        }*/

    /* 26072022 Thing.prototype.doGetJSONTileMultipleLI = function (callback, url, id_list_group, classM, offset, tempObject) {
        // Call our callback, but using our own instance as the context
        //callback.call(this, salutation);
        $('.videme_tile_loading').removeClass('hidden');
        var self = $(this); // using self to store $(this)
        if (itemsData !== false) {
            $.getJSON(url,
                function (data) {
                    //console.log("postsOfSpringVideoOnlyMultiple data -----> " + JSON.stringify(data));
                    //var response_time = Math.round(performance.now() - start_time);
                    //$('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                    if (!$.isEmptyObject(data)) {
                        //tempObject.empty();
                        //console.log("doGetJSONTileMultipleLI data -----> yes" + JSON.stringify(data));
                        //tempObject.html(showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext"));
                        //===showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext");
                        showTileMultipleLI(parseDataArrayToObject(data), id_list_group, classM, offset);
                        //$.fn.showcaseVideoTextButton(paddingButtonMySpring(data[0]));
                    } else {
                        console.log("$.fn.postsOfSpring data -----> no");
                        //tempObject.html("No results");
                        //$('#' + id_list_group).html("No results");
                        //callback();
                        //callback.call(this, url);
                        callback.call(self, url, tempObject);
                    }

                })
                .done(function (data) {
                    //$('.videme-scroll-progress').empty();
                    $('.videme_tile_loading').addClass('hidden');
                })
                .fail(function (data) {
                    tempObject.html(showError(data));
                    //callback.call(self, url, id_list_group);
                    //==Xcallback.call(self, url, tempObject);
                })
                .always(function () {
                });
        } else {
            $('.videme_tile_loading').addClass('hidden');
        }
        //callback.call(this, url);
    }*/

    Thing.prototype.doGetJSONTileV3 = function (callback, url, id_list_group, classM, offset, tempObject) { // 26072022
        // Call our callback, but using our own instance as the context
        //callback.call(this, salutation);
        $('.videme_tile_loading').removeClass('hidden');
        var self = $(this); // using self to store $(this)
        if (itemsData !== false) {
            $.getJSON(url,
                function (data) {
                    //console.log("Thing.prototype.doGetJSONTileV3 data -----> url " + url + ' data ' + JSON.stringify(data));
                    //console.log("postsOfSpringVideoOnlyMultiple data -----> " + JSON.stringify(data));
                    //var response_time = Math.round(performance.now() - start_time);
                    //$('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                    if (!$.isEmptyObject(data)) {
                        //tempObject.empty();
                        //console.log("Thing.prototype.doGetJSONTileV3 data -----> url " + url + ' data ' + JSON.stringify(data));
                        //tempObject.html(showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext"));
                        //===showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext");
                        //showTileV3(parseDataArrayToObject(data), tempObject, classM, offset);
                        showTileTestV4(parseDataArrayToObject(data), tempObject, classM, offset);
                        //$.fn.showcaseVideoTextButton(paddingButtonMySpring(data[0]));
                    } else {
                        console.log("$.fn.doGetJSONTileV3 data -----> no");
                        //tempObject.html("No results");
                        //$('#' + id_list_group).html("No results");
                        //callback();
                        //callback.call(this, url);
                        callback.call(self, url, tempObject);
                    }
                })
                .done(function (data) {
                    //$('.videme-scroll-progress').empty();
                    $('.videme_tile_loading').addClass('hidden');
                })
                .fail(function (data) {
                    tempObject.html(showError(data));
                    //callback.call(self, url, id_list_group);
                    //==Xcallback.call(self, url, tempObject);
                })
                .always(function () {
                });
        } else {
            $('.videme_tile_loading').addClass('hidden');
        }
        //callback.call(this, url);
    }
    /* 26072022 Thing.prototype.doGetJSONTileV4landscape = function (callback, url, id_list_group, classM, offset, tempObject) {
        // Call our callback, but using our own instance as the context
        //callback.call(this, salutation);
        $('.videme_tile_loading').removeClass('hidden');
        var self = $(this); // using self to store $(this)
        if (itemsData !== false) {
            $.getJSON(url,
                function (data) {
                    //console.log("Thing.prototype.doGetJSONTileV3 data -----> url " + url + ' data ' + JSON.stringify(data));
                    //console.log("postsOfSpringVideoOnlyMultiple data -----> " + JSON.stringify(data));
                    //var response_time = Math.round(performance.now() - start_time);
                    //$('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                    if (!$.isEmptyObject(data)) {
                        //tempObject.empty();
                        //console.log("Thing.prototype.doGetJSONTileV3 data -----> url " + url + ' data ' + JSON.stringify(data));
                        //tempObject.html(showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext"));
                        //===showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext");
                        //showTileV3(parseDataArrayToObject(data), tempObject, classM, offset);
                        showTileTestV4(parseDataArrayToObject(data), tempObject, classM, offset);
                        //$.fn.showcaseVideoTextButton(paddingButtonMySpring(data[0]));
                    } else {
                        console.log("$.fn.doGetJSONTileV3 data -----> no");
                        //tempObject.html("No results");
                        //$('#' + id_list_group).html("No results");
                        //callback();
                        //callback.call(this, url);
                        callback.call(self, url, tempObject);
                    }
                })
                .done(function (data) {
                    //$('.videme-scroll-progress').empty();
                    $('.videme_tile_loading').addClass('hidden');
                })
                .fail(function (data) {
                    tempObject.html(showError(data));
                    //callback.call(self, url, id_list_group);
                    //==Xcallback.call(self, url, tempObject);
                })
                .always(function () {
                });
        } else {
            $('.videme_tile_loading').addClass('hidden');
        }
        //callback.call(this, url);
    }*/

    Thing.prototype.doGetJSONTileTestV4 = function (callback, url, id_list_group, classM, offset, tempObject) { // TODO: test v4 // 26072022
        // Call our callback, but using our own instance as the context
        //callback.call(this, salutation);
        $('.videme_tile_loading').removeClass('hidden');
        var self = $(this); // using self to store $(this)
        if (itemsData !== false) {
            $.getJSON(url,
                function (data) {
                    //console.log("Thing.prototype.doGetJSONTileV3 data -----> url " + url + ' data ' + JSON.stringify(data));
                    //console.log("postsOfSpringVideoOnlyMultiple data -----> " + JSON.stringify(data));
                    //var response_time = Math.round(performance.now() - start_time);
                    //$('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                    if (!$.isEmptyObject(data)) {
                        //tempObject.empty();
                        //console.log("Thing.prototype.doGetJSONTileV3 data -----> url " + url + ' data ' + JSON.stringify(data));
                        //tempObject.html(showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext"));
                        //===showTileMultiple(parseDataArrayToObject(data), tempObject, "shownext");
                        showTileTestV4(parseDataArrayToObject(data), tempObject, classM, offset);
                        //$.fn.showcaseVideoTextButton(paddingButtonMySpring(data[0]));
                    } else {
                        console.log("$.fn.doGetJSONTileV3 data -----> no");
                        //tempObject.html("No results");
                        //$('#' + id_list_group).html("No results");
                        //callback();
                        //callback.call(this, url);
                        callback.call(self, url, tempObject);
                    }
                })
                .done(function (data) {
                    //$('.videme-scroll-progress').empty();
                    $('.videme_tile_loading').addClass('hidden');
                })
                .fail(function (data) {
                    tempObject.html(showError(data));
                    //callback.call(self, url, id_list_group);
                    //==Xcallback.call(self, url, tempObject);
                })
                .always(function () {
                });
        } else {
            $('.videme_tile_loading').addClass('hidden');
        }
        //callback.call(this, url);
    }

    /* 26072022 function showTileMultipleLI(showFile, id_list_group, actionUrlClass, offset) {
        var html = [];
        var courent_id = offset;
        $.each(showFile, function (key, value) {
            //console.log("showTileMultipleLI each value -----> " + JSON.stringify(value));
            var a;
            if (value.a) {
                a = value.a + "<br>";
            } else {
                a = "";
            }
            var b;
            if (value.b) {
                b = value.b + "<br>";
            } else {
                b = "";
            }
            var c;
            if (value.c) {
                c = value.c + "<br>";
            } else {
                c = "";
            }
            var d;
            if (value.d) {
                d = value.d + "<br>";
            } else {
                d = "";
            }
            var href;
            var img;
            var trueActionClass;
            var likes = '';
            var post_type = '';
            var reposts_count = '';
            var mainInsert = '';

            var item_user_display_name = '';
            var item_user_picture = '';
            var item_spring = '';

            var post_user_display_name = '';
            var post_user_picture = '';
            var post_spring = '';

            var user_display_name = '';

            var videme_tile_class = 'videme-tile-box';
            var videme_tile_boxInner_class = 'videme-tile-boxInner';
            //var videme_tile_img_class = '';
            var its_video = false;
            var item_video = '';

            var item_country = '';
            var item_city = '';
            var place = '';
            var started_at = '';
            var stopped_at = '';

            var my_item_edit_type = '';

            var css_aspect_percent = '';

            if (!$.isEmptyObject(value.user_display_name)) {
                user_display_name = value.user_display_name;
            }

            if (!$.isEmptyObject(value.item_user_display_name)) {
                user_display_name = value.item_user_display_name;
            }

            if (!$.isEmptyObject(value.item_user_display_name) &&
                value.post_type != 'update' &&
                value.post_type != 'update_user_picture' &&
                value.post_type != 'update_user_cover' &&
                value.post_type != 'user_cover_top') {
                item_user_display_name = value.item_user_display_name;
                //user_display_name = value.item_user_display_name;
            }
            if (!$.isEmptyObject(value.item_user_picture) &&
                value.post_type != 'update' &&
                value.post_type != 'update_user_picture' &&
                value.post_type != 'update_user_cover' &&
                value.post_type != 'user_cover_top') {
                item_user_picture = value.item_user_picture;
            }
            if (!$.isEmptyObject(value.item_spring) &&
                value.post_type != 'update' &&
                value.post_type != 'update_user_picture' &&
                value.post_type != 'update_user_cover' &&
                value.post_type != 'user_cover_top') {
                item_spring = value.item_spring;
            }
            if (!$.isEmptyObject(value.post_user_display_name)) {
                post_user_display_name = value.post_user_display_name;
            } else {
                post_user_display_name = value.user_display_name;
            }
            if (!$.isEmptyObject(value.post_user_picture)) {
                post_user_picture = value.post_user_picture;
            } else {
                post_user_picture = value.user_picture;
            }
            if (!$.isEmptyObject(value.post_spring)) {
                post_spring = value.post_spring;
            } else {
                post_spring = value.spring;
            }

            if (!$.isEmptyObject(value.post_user_picture)) {
                post_user_picture = value.post_user_picture;
            }
            if (!$.isEmptyObject(value.post_spring)) {
                post_spring = value.post_spring;
            }
            /!*if (!$.isEmptyObject(value.item_country)) {
                item_country = value.item_country;
            }
            if (!$.isEmptyObject(value.item_city)) {
                item_city = value.item_city;
            }
            if (!$.isEmptyObject(value.place)) {
                place = value.place;
            }*!/
            if (!$.isEmptyObject(value.started_at)) {
                started_at = value.started_at;
            }
            if (!$.isEmptyObject(value.stopped_at)) {
                stopped_at = value.stopped_at;
            }

            if (value.likes_count == 0) {
                likes = '';
            } else {
                likes = value.likes_count;
            }
            if (value.reposts_count == 0) {
                reposts_count = '';
            } else {
                reposts_count = value.reposts_count;
            }
            if (value.post_type == 'update') {
                post_type = 'update';
            } else if (value.post_type == 'item_like') {
                post_type = 'liked';
            } else if (value.post_type == 'item_repost') {
                post_type = 'repost';
            } else if (value.post_type == 'update_user_picture') {
                post_type = 'update picture';
            } else if (value.post_type == 'update_user_cover') {
                post_type = 'update cover';
            } else if (value.post_type == 'user_cover_top') {
                post_type = 'update cover';
            }
            var source_src = '';
            var pgwBrowser = $.pgwBrowser();
            if (value.type === 'article') {
                if (value.post_id && value.post_id != "undefined") {
                    href = "https://www.vide.me/a/?a=" + value.href + "&post_id=" + value.post_id;
                } else {
                    href = "https://www.vide.me/a/?a=" + value.href;
                }
                //img = value.cover;
                img = origin_img_vide_me + value.cover;
                trueActionClass = 'article-url';
                videme_tile_class = 'videme_tile_box_img';
                videme_tile_boxInner_class = 'videme_tile_boxInner_img';
                mainInsert = "<img class='videme_tile_img_class' src='" + img + "' alt=''></img>";

                if (value.post_type == 'update') my_item_edit_type = 'edit_my_article';
            } else if (value.type === 'video') {
                if (value.message_id && value.message_id != "undefined") {
                    href = "https://www.vide.me/v?m=" + value.href + "&message_id=" + value.message_id;
                } else {
                    href = "https://www.vide.me/v?m=" + value.href;
                }
                if (value.post_id && value.post_id != "undefined") {
                    href = "https://www.vide.me/v?m=" + value.href + "&post_id=" + value.post_id;
                } else {
                    href = "https://www.vide.me/v?m=" + value.href;
                }
                if (!$.isEmptyObject(value.cover)) {
                    img = origin_img_vide_me + value.cover;
                } else {
                    img = origin_img_vide_me + value.item_id + ".jpg";
                }
                if (!$.isEmptyObject(value.width) && !$.isEmptyObject(value.height)) {
                    console.log("value.width " + value.width + " value.height " + value.height);

                    var aspect_percent = Math.round(value.width / 100);
                    var height_percent = Math.round(value.height / aspect_percent);
                    //css_aspect_percent = 'style="padding-bottom: ' + height_percent + '%;"';
                    //var video_height = Math.round(width / aspect);
                    //console.log("css_aspect_percent " + css_aspect_percent);

                }
                trueActionClass = 'multi_video';

                /!*if (detectBrowser() == 'safari') {
                    mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'>" +
                        "<source src='https://s3.amazonaws.com/video.vide.me/" + item_video + ".m3u8' type='application/x-mpegURL'>" +
                        "</video>";
                } else {
                    mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'></video>";
                }*!/

                if (pgwBrowser.os.group !== 'Android' && pgwBrowser.browser.group !== 'Chrome') {
                    source_src = "<source src='https://s3.amazonaws.com/video.vide.me/" + item_video + ".m3u8' type='application/x-mpegURL'>";
                }
                mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'>" +
                    source_src +
                    "</video>";
                item_video = value.item_id;

                if (value.post_type == 'update') my_item_edit_type = 'edit_my_video';
            } else if (value.type === 'image') {
                if (value.message_id && value.message_id != "undefined") {
                    href = "https://www.vide.me/i/?i=" + value.href + "&message_id=" + value.message_id;
                } else {
                    href = "https://www.vide.me/i/?i=" + value.href;
                }
                if (value.post_id && value.post_id != "undefined") {
                    href = "https://www.vide.me/i/?i=" + value.href + "&post_id=" + value.post_id;
                } else {
                    href = "https://www.vide.me/i/?i=" + value.href;
                }
                img = "https://s3.amazonaws.com/img.vide.me/" + value.cover;
                trueActionClass = 'image-url';
                videme_tile_class = 'videme_tile_box_img';
                videme_tile_boxInner_class = 'videme_tile_boxInner_img';
                mainInsert = "<img class='videme_tile_img_class' src='" + img + "' alt=''></img>";
                //videme_tile_img_class = 'videme_tile_img_class';

                if (value.post_type == 'update') my_item_edit_type = 'edit_my_video';
            } else if (value.type === 'event') {
                if (!$.isEmptyObject(value.cover)) {
                    img = "https://s3.amazonaws.com/img.vide.me/" + value.cover;
                    trueActionClass = 'event_go_url';
                    videme_tile_class = 'videme_tile_box_img';
                    videme_tile_boxInner_class = 'videme_tile_boxInner_img';
                    mainInsert = "<img class='videme_tile_img_class' src='" + img + "' alt=''></img>";
                    //videme_tile_class = 'videme_tile_box_img';
                    //videme_tile_boxInner_class = 'videme_tile_boxInner_img';
                }
                if (!$.isEmptyObject(value.cover_video)) {
                    if (!$.isEmptyObject(value.cover)) {
                        img = "https://s3.amazonaws.com/img.vide.me/" + value.cover;
                    } else {
                        img = "https://s3.amazonaws.com/img.vide.me/" + value.cover_video + ".jpg";
                    }
                    trueActionClass = 'multi_video';
                    /!*if (detectBrowser() == 'safari') {
                        mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'>" +
                            "<source src='https://s3.amazonaws.com/video.vide.me/" + item_video + ".m3u8' type='application/x-mpegURL'>" +
                            "</video>";
                    } else {
                        mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'></video>";
                    }*!/
                    if (pgwBrowser.os.group !== 'Android' && pgwBrowser.browser.group !== 'Chrome') {
                        source_src = "<source src='https://s3.amazonaws.com/video.vide.me/" + item_video + ".m3u8' type='application/x-mpegURL'>";
                    }
                    mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'>" +
                        source_src +
                        "</video>";
                    its_video = true;
                    item_video = value.cover_video;

                }
                if (!$.isEmptyObject(value.post_id)) {
                    href = "https://www.vide.me/a/?e=" + value.item_id + "&post_id=" + value.post_id;
                } else {
                    href = "https://www.vide.me/a/?e=" + value.item_id;
                }
                //img = "https://s3.amazonaws.com/img.vide.me/" + value.cover;
                //href = "https://www.vide.me/i/?i=" + value.href;
                //trueActionClass = 'image-url';
                //trueActionClass = 'multi_video';
                //trueActionClass = 'event-url';

                //mainInsert = "<img class='videme_tile_img_class' src='" + img + "' alt=''></img>";
                //videme_tile_img_class = 'videme_tile_img_class';
                if (value.post_type == 'update') my_item_edit_type = 'edit_my_event';
            }
            if (!$.isEmptyObject(value.src)) {
                //console.log("value.src -----> " + JSON.stringify(value.src));
                var array_src = [];
                array_src = $.parseJSON(value.src);
                //source_src += "<source src=\"" + sourseURL + showcaseVideoSettings.video + "\" type=\"video/mp4\">";
                $.each(array_src, function (key, value) {
                    //console.log("$.fn.showPopTags data.tags -----> cnt: " + value.cnt + " tag " + value.tag);
                    //console.log("$.fn.showPopTags each value -----> " + JSON.stringify(value));
                    source_src += "<source src=\"https://s3.amazonaws.com/video.vide.me/" + value + "\" type=\"video/mp4\">";
                });
            }

            if (value.tags) {
            } else {
            }
            if (value.count) { // TODO: remove?
                count = value.count
            } else {
                count = '' + '<br>';
            }
            if (value.access == 'public') { // TODO: remove?
                var share = 'share';
                var fa_icon_access = 'fa fa-unlock';
            } else {
                var share = '';
                var fa_icon_access = 'fa fa-lock';
            }
            if (value.type == 'public') {
                var share = 'share';
                var fa_icon_access = 'fa fa-unlock';
            } else {
                var share = '';
                var fa_icon_access = 'fa fa-lock';
            }
            if (actionUrlClass == 'file-my-url') {
                value.dropdown = {
                    'dd_item_1': 'edit_my_video',
                    'dd_item_2': 'send',
                    'dd_item_3': 'share',
                    'dd_item_4': 'delete',
                    'dd_item_5': 'copy_link'
                };
                value.key = key;
                value = paddingButtonMy(value);
            }
            if (actionUrlClass == 'article-my-url') {
                value.dropdown = {
                    'dd_item_1': 'edit_my_article',
                    'dd_item_2': 'send',
                    'dd_item_3': 'share',
                    'dd_item_4': 'delete',
                    'dd_item_5': 'copy_link'
                };
                value.key = key;
                value = paddingButtonMy(value);
            }
            if (actionUrlClass == 'event-url') {
                value.dropdown = {
                    'dd_item_1': 'edit_my_event',
                    'dd_item_2': 'send',
                    'dd_item_3': 'share',
                    'dd_item_4': 'delete_my_event',
                    'dd_item_5': 'copy_link'
                };
                value.key = key;
                value = paddingButtonMy(value);
            }
            if (actionUrlClass == 'post-my-url') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': 'share',
                    'dd_item_3': my_item_edit_type,
                    'dd_item_4': 'delete_my_post',
                    'dd_item_5': 'copy_link'
                };
                value.key = key;
                value = paddingButtonMy(value);
            }
            if (actionUrlClass == 'file-inbox-url') { // TODO: remove
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share,
                    'dd_item_3': 'delete'
                };
                value.key = key;
                value = paddingButtonInbox(value);
            }
            if (actionUrlClass == 'message-inbox-url') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share,
                    'dd_item_3': 'delete_inbox'
                };
                value.key = key;
                value = paddingButtonInbox(value);
            }
            if (actionUrlClass == 'file-sent-url') { // TODO: remove
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share,
                    'dd_item_3': 'delete'
                };
                value.key = key;
                value = paddingButtonSent(value);
            }
            if (actionUrlClass == 'message-sent-url') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share,
                    'dd_item_3': 'delete_sent'
                };
                value.key = key;
                value = paddingButtonSent(value);
            }
            if (actionUrlClass == 'showmulti') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share,
                    'dd_item_3': 'embed',
                    'dd_item_5': 'copy_link'
                };
                value.key = key;
                value = paddingButtonSent(value);
            }
            if (actionUrlClass == 'shownext') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share
                };
                value.key = key;
                value = paddingButtonSent(value);
            }
            if (actionUrlClass == 'file-spring-url') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share
                };
                value.key = key;
                value = paddingButtonSent(value);
            }
            if (actionUrlClass == 'article') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share
                };
                value.key = key;
                value = paddingButtonSent(value);
            }
            /!*if (actionUrlClass == 'my-posts-url') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': 'share',
                    'dd_item_3': 'delete-my-post'
                };
                value.key = key;
                value = paddingButtonMyPosts(value);
                //console.log("showTile value -----> " + JSON.stringify(value));
            }*!/
            if (actionUrlClass == 'item-card') {
                value.dropdown = {};
            }
            var true_created_at = moment(value.created_at);
            //console.log('true_created_at', true_created_at.format("dddd, MMMM Do YYYY, h:mm:ss a"));
            //console.log('fromNow', true_created_at.fromNow());
            var li_id_list_group_courent_id = "li_" + id_list_group + "_" + courent_id;
            value.nest_li = li_id_list_group_courent_id; // for embed get size
            value.actionUrlClass = actionUrlClass; // for edit post

            $('#' + id_list_group).append("<li class='list-group-item videme-tile-item' id='" + li_id_list_group_courent_id + "'></li>");

            /!*var li_width = Math.round($('#' + li_id_list_group_courent_id).width());
            var li_height = Math.round($('#' + li_id_list_group_courent_id).height());
            console.log('1 ' + li_id_list_group_courent_id + ' 1 --- ' + li_width + 'x' + li_height);*!/

            $('#li_' + id_list_group + '_' + courent_id).append("<a href='https://www.vide.me/" + post_spring + "'>" +
                "<img src='" + origin_img_vide_me + post_user_picture + "' alt='' class='rounded-circle videme-relation-card-img-tile'/>" +
                "</a>" +
                "<div class='videme-tile-item-1-line'>" +
                "<div class='videme-tile-item-1-line-bar'>" +
                "<div class='font-weight-bold videme-tile-item-user'>" +
                "<a href='https://www.vide.me/" + post_spring + "' class='videme-tile-post-owner'>"
                + post_user_display_name +
                "</a>" +
                "</div>" +
                "<div class='text-muted videme-tile-post-type'>&nbsp;" + post_type + "</div>" +
                "&nbsp;" + "<a href='https://www.vide.me/" + item_spring + "' class='videme-tile-item-owner'>"
                + item_user_display_name +
                "</a>" +
                "</div>" +
                "<div class='text-right text-muted videme-tile-item-created-at'>" + timeToWord(value.created_at) + "</div>" +
                showDropdownForDoorbelSign(value) +
                "</div>" +
                "<div class='videme-tile-item-2-line'>" +
                "<a class='shownext' href='" + href + "'><div class='videme-tile-item-title'>" + value.title + "</div></a>" +
                "<span class='iconic' data-glyph='star' title='star' aria-hidden='true'></span>" +
                "</div>" +
                "<div class='" + videme_tile_class + "' " + css_aspect_percent + ">\
            <div class='" + videme_tile_boxInner_class + "'>\
            <a class='" + trueActionClass + "' \
						video='" + value.video + "' \
						message_id='" + value.message_id + "' \
						user_display_name='" + user_display_name + "' \
						created_at='" + value.created_at + "' \
						updated_at='" + value.updated_at + "' \
						title='" + value.title + "' \
						content='" + value.content + "' \
                        cover='" + value.cover + "' \
                        item_id='" + value.item_id + "' \
                        post_id='" + value.post_id + "' \
                        spring='" + post_spring + "' \
                        user_picture = '" + post_user_picture + "'\
                        to_user_id='" + value.to_user_id + "' \
                        from_user_id='" + value.from_user_id + "' \
                        from_user_display_name='" + value.from_user_display_name + "' \
                        from_user_name='" + value.user_display_name + "' \
                        file='" + value.item_id + "' \
                        video_duration='" + value.video_duration + "' \
                        count='" + value.item_count_show + "' \
                        access='" + value.access + "' \
                        tags='" + JSON.stringify(value.tags) + "' \
                        ext_links='" + value.ext_links + "' \
						href='" + href + "' id='el_" + key + "'>\
			<div class='videme-tile-signboard-true' id='videme-tile-signboard-true_" + value.item_id + "'></div>\
						 " + mainInsert + "\
				</a>\
			</div>\
				</div>\
				<div class='videme_showcase_item_info'>\
				" + showItemInfo(value) +
                "</div>");

            /!*var li_width = Math.round($('#' + li_id_list_group_courent_id).width());
            var li_height = Math.round($('#' + li_id_list_group_courent_id).height());
            console.log('1 ' + li_id_list_group_courent_id + ' 1 --- ' + li_width + 'x' + li_height);*!/

            if (value.type == 'video' || its_video) {
                console.log('showTileMultipleLI width - ' + value.width + ' height - ' + value.height);

                var width = document.getElementById(li_id_list_group_courent_id).parentElement.offsetWidth;
                //var aspect = Math.round(value.width / value.height);
                //var video_height = Math.round(width / aspect);
                var video_height = Math.round(width * (360 / 640));
                //var video_height = 450;
                var opions = {
                    "width": width,
                    //"height": width * (360 / 640),
                    //"height": video_height,
                    "poster": img
                };
                if (detectBrowser() !== 'firefox') {
                    console.log('detectBrowser firefox');

                    var opions = {
                        "width": width,
                        //"height": width * (360 / 640),
                        //"height": video_height,
                        "poster": img,
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
                    var opions = {
                        "width": width,
                        //"height": width * (360 / 640),
                        //"height": video_height,
                        "poster": img
                    };
                }
                var video_player = videojs('tile_multiple_video_' + id_list_group + '_' + courent_id, opions, function onPlayerReady() {
                    videojs.log('tile_multiple_video_' + id_list_group + '_' + courent_id, ' is ready!');
                    this.on('ended', function () {
                        videojs.log('end');
                    })
                    this.on('play', function () {
                        //videojs.log('play ' + value.item_id);
                        videojs.log('play ' + item_video);
                        videojs.log('postsOfSpringVideoOnlyMultiple play ' + this.currentSrc());
                        //videojs.log('postsOfSpringVideoOnlyMultiple play ' + this.player.currentTime());
                        //videojs.log('postsOfSpringVideoOnlyMultiple play ' + this.currentTime());
                    });
                    /!* text overlay *!/
                    /!*var overlay_content = '<div class="videme-tile-signboard-overlay">' + item_country + '<br/>' + item_city + '<br/>' + place + '<br/>' + started_at + '<br/>' + stopped_at + '<br/>' + commonDate + '</div>';
                    this.overlay({
                        overlays: [{
                            start: 'loadstart',
                            content: overlay_content,
                            //end: 'playing',
                            end: 3,
                            align: 'bottom-left',
                            showBackground: false
                        }, {
                            start: 'pause',
                            content: overlay_content,
                            //end: 'playing',
                            end: 3,
                            align: 'bottom-left',
                            showBackground: false
                        }]
                    });*!/
                    /!* text overlay *!/
                });
                video_player.on("play", function () {
                    //goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + value.item_id);
                    goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + item_video + '&title=' + value.title + '&user_display_name=' + user_display_name + '&spring=' + value.spring + '&user_picture=' + post_user_picture + '&type_item=video' + '&nad=' + $.cookie('vide_nad'));
                    //ga('send', 'event', 'video', 'play', value.item_id);
                    ga('send', 'event', 'video', 'play', item_video);
                });

                var src_array = [];
                src_array.push({
                    type: "application/x-mpegURL",
                    src: 'https://s3.amazonaws.com/video.vide.me/' + item_video + '.m3u8', // TODO: add message_id
                });

                /!*video_player.src({
                    type: "application/x-mpegURL",
                    //src: 'https://s3.amazonaws.com/video.vide.me/' + value.item_id + '.m3u8', // TODO: add message_id
                    src: 'https://s3.amazonaws.com/video.vide.me/' + item_video + '.m3u8', // TODO: add message_id
                });*!/
                //video_player.src(src_array);
                if (!$.isEmptyObject(value.src)) {
                    //console.log("value.src -----> " + JSON.stringify(value.src));
                    var array_src = [];
                    array_src = $.parseJSON(value.src);
                    //console.log("value.src array_src -----> " + JSON.stringify(array_src));
                    //source_src += "<source src=\"" + sourseURL + showcaseVideoSettings.video + "\" type=\"video/mp4\">";

                    $.each(array_src, function (key, value) {
                        //console.log("showTileMultipleLI each value -----> " + value);
                        //source_src += "<source src=\"" + value + "\" type=\"video/mp4\">";
                        /!*video_player.src({
                            type: "video/mp4",
                            //type: "application/x-mpegURL",
                            //src: sourseURL + showcaseVideoSettings.file + messageAdd
                            //src: sourseURL + showcaseVideoSettings.video + '.mp4' // TODO: add message_id
                            src: 'https://s3.amazonaws.com/video.vide.me/' + value
                        });*!/
                        src_array.push({
                            type: "video/mp4",
                            src: 'https://s3.amazonaws.com/video.vide.me/' + value
                        });

                    });
                    //console.log("src_array -----> " + JSON.stringify(src_array));
                }
                //video_player.src(JSON.stringify(src_array));
                video_player.src(src_array);

                video_player.controls(true);
                video_player.on('ended', function () {
                    videojs.log('end');
                });
            }
            if (value.type == 'event') {
                //var commonDate = periodToWord(started_at, stopped_at);
                //$('#videme-tile-signboard-true_' + value.item_id).html('<div class="videme-tile-signboard-overlay">' + item_country + ', ' + item_city + ', ' + place + '<br/>' + commonDate + '</div>');
                $('#videme-tile-signboard-true_' + value.item_id).html(text_overlay(value));
                if (its_video) {
                    /!* text overlay *!/
                    //var overlay_content = '<div class="videme-tile-signboard-overlay">' + item_country + '<br/>' + item_city + '<br/>' + place + '<br/>' + started_at + '<br/>' + stopped_at + '<br/>' + commonDate + '</div>';
                    var overlay_content = text_overlay(value);
                    video_player.overlay({
                        overlays: [{
                            start: 'loadstart',
                            content: overlay_content,
                            //end: 'playing',
                            end: 3,
                            align: 'bottom-left',
                            showBackground: false
                        }, {
                            start: 'pause',
                            content: overlay_content,
                            //end: 'playing',
                            end: 3,
                            align: 'bottom-left',
                            showBackground: false
                        }]
                    });
                    /!* text overlay *!/
                }
            }
            /!* Overlay for embed **************************************************************************************!/
            if (value.embed) {
                console.log("showTileMultipleLI value.embed -----> " + value.embed);
                //var commonDate = periodToWord(started_at, stopped_at);
                //$('#videme-tile-signboard-true_' + value.item_id).html('<div class="videme-tile-signboard-overlay">' + item_country + ', ' + item_city + ', ' + place + '<br/>' + commonDate + '</div>');
                $('#videme-tile-signboard-true_' + value.item_id).html(embed_text_overlay(value));
                if (value.type == 'video' || its_video) {
                    /!* text overlay *!/
                    //var overlay_content = '<div class="videme-tile-signboard-overlay">' + item_country + '<br/>' + item_city + '<br/>' + place + '<br/>' + started_at + '<br/>' + stopped_at + '<br/>' + commonDate + '</div>';
                    var overlay_content = embed_text_overlay(value);
                    //var overlay_content = 'Vide.me';
                    video_player.overlay({
                        overlays: [{
                            start: 'loadstart',
                            content: overlay_content,
                            //end: 'playing',
                            end: 3,
                            align: 'tor-left',
                            showBackground: false
                        }, {
                            start: 'pause',
                            //content: overlay_content,
                            end: 'playing',
                            //end: 3,
                            align: 'top-left',
                            showBackground: false
                        }]
                    });
                    /!* text overlay *!/
                }
                /!*****************!/
                /!*$('a').live('click', function() {
                    window.open($(this).attr('href'));
                    return false;
                });*!/
                $('a').setAttribute('target','_blank');
            }
            /!* Overlay for embed **************************************************************************************!/
            courent_id = courent_id + 1;
        });

        $(".video-js").each(function (videoIndex) {
            // wrong place
            console.log("video-js each ");
            var videoId = $(this).attr("id");
            videojs(videoId).ready(function () {
                this.on("play", function (e) {
                    //pause other video
                    $(".video-js").each(function (index) {
                        if (videoIndex !== index) {
                            this.player.pause();
                        }
                    });
                    videojs.log('postsOfSpringVideoOnlyMultiple play ' + this.currentSrc());
                });
            });
        });
    }*/

    function showTileV3(showFile, tempObject, actionUrlClass, offset) { // 26072022
        var html = [];
        var courent_id = offset;
        $.each(showFile, function (key, value) {
            //console.log("showTileV3 each value -----> " + JSON.stringify(value));
            var a;
            if (value.a) {
                a = value.a + "<br>";
            } else {
                a = "";
            }
            var b;
            if (value.b) {
                b = value.b + "<br>";
            } else {
                b = "";
            }
            var c;
            if (value.c) {
                c = value.c + "<br>";
            } else {
                c = "";
            }
            var d;
            if (value.d) {
                d = value.d + "<br>";
            } else {
                d = "";
            }
            var href;
            var img;
            var trueActionClass;
            var item_type = '';
            var likes = '';
            var post_type = '';
            var reposts_count = '';
            var mainInsert = '';

            var item_user_display_name = '';
            var item_user_picture = '';
            var item_spring = '';

            var post_user_display_name = '';
            var post_user_picture = '';
            var post_spring = '';

            var user_display_name = '';

            var videme_tile_class = 'videme-tile-box';
            var videme_tile_boxInner_class = 'videme-tile-boxInner';
            //var videme_tile_img_class = '';
            var its_video = false;
            var item_video = '';

            var item_country = '';
            var item_city = '';
            var place = '';
            var started_at = '';
            var stopped_at = '';

            var my_item_edit_type = '';

            var css_aspect_percent = '';

            if (!$.isEmptyObject(value.user_display_name)) {
                user_display_name = value.user_display_name;
            }

            if (!$.isEmptyObject(value.item_user_display_name)) {
                user_display_name = value.item_user_display_name;
            }

            if (!$.isEmptyObject(value.item_user_display_name) &&
                value.post_type != 'update' &&
                value.post_type != 'update_user_picture' &&
                value.post_type != 'update_user_cover' &&
                value.post_type != 'user_cover_top') {
                item_user_display_name = value.item_user_display_name;
                //user_display_name = value.item_user_display_name;
            }
            if (!$.isEmptyObject(value.item_user_picture) &&
                value.post_type != 'update' &&
                value.post_type != 'update_user_picture' &&
                value.post_type != 'update_user_cover' &&
                value.post_type != 'user_cover_top') {
                item_user_picture = value.item_user_picture;
            }
            if (!$.isEmptyObject(value.item_spring) &&
                value.post_type != 'update' &&
                value.post_type != 'update_user_picture' &&
                value.post_type != 'update_user_cover' &&
                value.post_type != 'user_cover_top') {
                item_spring = value.item_spring;
            }
            if (!$.isEmptyObject(value.post_user_display_name)) {
                post_user_display_name = value.post_user_display_name;
            } else {
                post_user_display_name = value.user_display_name;
            }
            if (!$.isEmptyObject(value.post_user_picture)) {
                post_user_picture = value.post_user_picture;
            } else {
                post_user_picture = value.user_picture;
            }
            if (!$.isEmptyObject(value.post_spring)) {
                post_spring = value.post_spring;
            } else {
                post_spring = value.spring;
            }

            if (!$.isEmptyObject(value.post_user_picture)) {
                post_user_picture = value.post_user_picture;
            }
            if (!$.isEmptyObject(value.post_spring)) {
                post_spring = value.post_spring;
            }
            /*if (!$.isEmptyObject(value.item_country)) {
                item_country = value.item_country;
            }
            if (!$.isEmptyObject(value.item_city)) {
                item_city = value.item_city;
            }
            if (!$.isEmptyObject(value.place)) {
                place = value.place;
            }*/
            if (!$.isEmptyObject(value.started_at)) {
                started_at = value.started_at;
            }
            if (!$.isEmptyObject(value.stopped_at)) {
                stopped_at = value.stopped_at;
            }

            if (value.likes_count == 0) { // TODO: remove to showItemInfoV3
                likes = '';
            } else {
                likes = value.likes_count;
            }
            if (value.reposts_count == 0) {
                reposts_count = '';
            } else {
                reposts_count = value.reposts_count;
            }
            if (value.post_type == 'update') {
                post_type = 'update';
            } else if (value.post_type == 'item_like') {
                post_type = 'liked';
            } else if (value.post_type == 'item_repost') {
                post_type = 'repost';
            } else if (value.post_type == 'update_user_picture') {
                post_type = 'update picture';
            } else if (value.post_type == 'update_user_cover') {
                post_type = 'update cover';
            } else if (value.post_type == 'user_cover_top') {
                post_type = 'update cover';
            }
            var source_src = '';
            var pgwBrowser = $.pgwBrowser();
            if (value.type === 'article') {
                if (value.post_id && value.post_id != "undefined") {
                    href = "https://www.vide.me/a/?a=" + value.href + "&post_id=" + value.post_id;
                } else {
                    href = "https://www.vide.me/a/?a=" + value.href;
                }
                //img = value.cover;
                img = origin_img_vide_me + value.cover;
                trueActionClass = 'article-url';
                videme_tile_class = 'videme_tile_box_img';
                videme_tile_boxInner_class = 'videme_tile_boxInner_img';
                mainInsert = "<img class='videme_tile_img_class' src='" + img + "' alt=''></img>";
                item_type = 'article';

                if (value.post_type == 'update') my_item_edit_type = 'edit_my_article';
            } else if (value.type === 'video') {
                if (value.message_id && value.message_id != "undefined") {
                    href = "https://www.vide.me/v?m=" + value.href + "&message_id=" + value.message_id;
                } else {
                    href = "https://www.vide.me/v?m=" + value.href;
                }
                if (value.post_id && value.post_id != "undefined") {
                    href = "https://www.vide.me/v?m=" + value.href + "&post_id=" + value.post_id;
                } else {
                    href = "https://www.vide.me/v?m=" + value.href;
                }
                if (!$.isEmptyObject(value.cover)) {
                    img = origin_img_vide_me + value.cover;
                } else {
                    img = origin_img_vide_me + value.item_id + ".jpg";
                }
                if (!$.isEmptyObject(value.width) && !$.isEmptyObject(value.height)) {
                    //console.log("value.width " + value.width + " value.height " + value.height);

                    var aspect_percent = Math.round(value.width / 100);
                    var height_percent = Math.round(value.height / aspect_percent);
                    //css_aspect_percent = 'style="padding-bottom: ' + height_percent + '%;"';
                    //var video_height = Math.round(width / aspect);
                    //console.log("css_aspect_percent " + css_aspect_percent);

                }
                trueActionClass = 'multi_video';

                /*if (detectBrowser() == 'safari') {
                    mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'>" +
                        "<source src='https://s3.amazonaws.com/video.vide.me/" + item_video + ".m3u8' type='application/x-mpegURL'>" +
                        "</video>";
                } else {
                    mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'></video>";
                }*/

                if (pgwBrowser.os.group !== 'Android' && pgwBrowser.browser.group !== 'Chrome') {
                    source_src = "<source src='https://s3.amazonaws.com/video.vide.me/" + item_video + ".m3u8' type='application/x-mpegURL'>";
                }
                /*mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'>" +
                    source_src +
                    "</video>";*/
                item_video = value.item_id;
                item_type = '';

                if (value.post_type == 'update') my_item_edit_type = 'edit_my_video';
            } else if (value.type === 'image') {
                if (value.message_id && value.message_id != "undefined") {
                    href = "https://www.vide.me/i/?i=" + value.href + "&message_id=" + value.message_id;
                } else {
                    href = "https://www.vide.me/i/?i=" + value.href;
                }
                if (value.post_id && value.post_id != "undefined") {
                    href = "https://www.vide.me/i/?i=" + value.href + "&post_id=" + value.post_id;
                } else {
                    href = "https://www.vide.me/i/?i=" + value.href;
                }
                img = origin_img_vide_me + value.cover;
                trueActionClass = 'image-url';
                videme_tile_class = 'videme_tile_box_img';
                videme_tile_boxInner_class = 'videme_tile_boxInner_img';
                mainInsert = "<img class='videme_tile_img_class' src='" + img + "' alt=''></img>";
                //videme_tile_img_class = 'videme_tile_img_class';
                item_type = 'image';

                if (value.post_type == 'update') my_item_edit_type = 'edit_my_video';
            } else if (value.type === 'event') {
                if (!$.isEmptyObject(value.cover)) {
                    img = origin_img_vide_me + value.cover;
                    trueActionClass = 'event_go_url';
                    videme_tile_class = 'videme_tile_box_img';
                    videme_tile_boxInner_class = 'videme_tile_boxInner_img';
                    mainInsert = "<img class='videme_tile_img_class' src='" + img + "' alt=''></img>";
                    //videme_tile_class = 'videme_tile_box_img';
                    //videme_tile_boxInner_class = 'videme_tile_boxInner_img';
                }
                if (!$.isEmptyObject(value.cover_video)) {
                    if (!$.isEmptyObject(value.cover)) {
                        img = origin_img_vide_me + value.cover;
                    } else {
                        img = origin_img_vide_me + value.cover_video + ".jpg";
                    }
                    trueActionClass = 'multi_video';
                    /*if (detectBrowser() == 'safari') {
                        mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'>" +
                            "<source src='https://s3.amazonaws.com/video.vide.me/" + item_video + ".m3u8' type='application/x-mpegURL'>" +
                            "</video>";
                    } else {
                        mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'></video>";
                    }*/
                    if (pgwBrowser.os.group !== 'Android' && pgwBrowser.browser.group !== 'Chrome') {
                        source_src = "<source src='https://s3.amazonaws.com/video.vide.me/" + item_video + ".m3u8' type='application/x-mpegURL'>";
                    }
                    /*mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'>" +
                        source_src +
                        "</video>";*/
                    its_video = true;
                    item_video = value.cover_video;

                }
                if (!$.isEmptyObject(value.post_id)) {
                    href = "https://www.vide.me/a/?e=" + value.item_id + "&post_id=" + value.post_id;
                } else {
                    href = "https://www.vide.me/a/?e=" + value.item_id;
                }
                //img = "https://s3.amazonaws.com/img.vide.me/" + value.cover;
                //href = "https://www.vide.me/i/?i=" + value.href;
                //trueActionClass = 'image-url';
                //trueActionClass = 'multi_video';
                //trueActionClass = 'event-url';

                //mainInsert = "<img class='videme_tile_img_class' src='" + img + "' alt=''></img>";
                //videme_tile_img_class = 'videme_tile_img_class';
                item_type = 'event';

                if (value.post_type == 'update') my_item_edit_type = 'edit_my_event';
            }
            if (!$.isEmptyObject(value.src)) {
                //console.log("value.src -----> " + JSON.stringify(value.src));
                var array_src = [];
                array_src = $.parseJSON(value.src);
                //source_src += "<source src=\"" + sourseURL + showcaseVideoSettings.video + "\" type=\"video/mp4\">";
                $.each(array_src, function (key, value) {
                    //console.log("$.fn.showPopTags data.tags -----> cnt: " + value.cnt + " tag " + value.tag);
                    //console.log("$.fn.showPopTags each value -----> " + JSON.stringify(value));
                    source_src += "<source src=\"https://s3.amazonaws.com/video.vide.me/" + value + "\" type=\"video/mp4\">";
                });
            }

            if (value.tags) {
            } else {
            }
            if (value.count) { // TODO: remove?
                count = value.count
            } else {
                count = '' + '<br>';
            }

            /*if (value.access == 'public') { // TODO: remove?
                var share = 'share';
                var fa_icon_access = 'fa fa-unlock';
            } else {
                var share = '';
                var fa_icon_access = 'fa fa-lock';
            }
            if (value.type == 'public') {
                var share = 'share';
                var fa_icon_access = 'fa fa-unlock';
            } else {
                var share = '';
                var fa_icon_access = 'fa fa-lock';
            }
            if (actionUrlClass == 'file-my-url') {
                value.dropdown = {
                    'dd_item_1': 'edit_my_video',
                    'dd_item_2': 'send',
                    'dd_item_3': 'share',
                    'dd_item_4': 'delete',
                    'dd_item_5': 'copy_link'
                };
                value.key = key;
                value = paddingButtonMy(value);
            }
            if (actionUrlClass == 'article-my-url') {
                value.dropdown = {
                    'dd_item_1': 'edit_my_article',
                    'dd_item_2': 'send',
                    'dd_item_3': 'share',
                    'dd_item_4': 'delete',
                    'dd_item_5': 'copy_link'
                };
                value.key = key;
                value = paddingButtonMy(value);
            }
            if (actionUrlClass == 'event-url') {
                value.dropdown = {
                    'dd_item_1': 'edit_my_event',
                    'dd_item_2': 'send',
                    'dd_item_3': 'share',
                    'dd_item_4': 'delete_my_event',
                    'dd_item_5': 'copy_link'
                };
                value.key = key;
                value = paddingButtonMy(value);
            }
            if (actionUrlClass == 'post-my-url') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': 'share',
                    'dd_item_3': my_item_edit_type,
                    'dd_item_4': 'delete_my_post',
                    'dd_item_5': 'copy_link'
                };
                value.key = key;
                value = paddingButtonMy(value);
            }
            if (actionUrlClass == 'file-inbox-url') { // TODO: remove
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share,
                    'dd_item_3': 'delete'
                };
                value.key = key;
                value = paddingButtonInbox(value);
            }
            if (actionUrlClass == 'message-inbox-url') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share,
                    'dd_item_3': 'delete_inbox'
                };
                value.key = key;
                value = paddingButtonInbox(value);
            }
            if (actionUrlClass == 'file-sent-url') { // TODO: remove
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share,
                    'dd_item_3': 'delete'
                };
                value.key = key;
                value = paddingButtonSent(value);
            }
            if (actionUrlClass == 'message-sent-url') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share,
                    'dd_item_3': 'delete_sent'
                };
                value.key = key;
                value = paddingButtonSent(value);
            }
            if (actionUrlClass == 'showmulti') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share,
                    'dd_item_3': 'embed',
                    'dd_item_5': 'copy_link'
                };
                value.key = key;
                value = paddingButtonSent(value);
            }
            if (actionUrlClass == 'shownext') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share
                };
                value.key = key;
                value = paddingButtonSent(value);
            }
            if (actionUrlClass == 'file-spring-url') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share
                };
                value.key = key;
                value = paddingButtonSent(value);
            }
            if (actionUrlClass == 'article') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': share
                };
                value.key = key;
                value = paddingButtonSent(value);
            }
            /!*if (actionUrlClass == 'my-posts-url') {
                value.dropdown = {
                    'dd_item_1': 'send',
                    'dd_item_2': 'share',
                    'dd_item_3': 'delete-my-post'
                };
                value.key = key;
                value = paddingButtonMyPosts(value);
                //console.log("showTile value -----> " + JSON.stringify(value));
            }*!/
            if (actionUrlClass == 'item-card') {
                value.dropdown = {};
            }*/
            /*if (actionUrlClass == 'event-url') {
                href = "https://www.vide.me/web/my_event/?item=" + value.item_id;
            }*/
            var true_created_at = moment(value.created_at); // TODO: why
            //console.log('true_created_at', true_created_at.format("dddd, MMMM Do YYYY, h:mm:ss a"));
            //console.log('fromNow', true_created_at.fromNow());
            /*var li_id_list_group_courent_id = "li_" + id_list_group + "_" + courent_id;
            value.nest_li = li_id_list_group_courent_id; // for embed get size
            value.actionUrlClass = actionUrlClass; // for edit post*/
            var tags = '';
            if (!$.isEmptyObject(value.tags)) tags = JSON.stringify(value.tags);
            var ext_links = '';
            if (!$.isEmptyObject(value.ext_links)) {
                var tmpData = JSON.parse(value.ext_links);
                ext_links = JSON.stringify(tmpData, null, '\t');
                //ext_links = JSON.stringify(value.ext_links);
            }


            /* Tile V3 ******************************************************/
            /*$('#li_' + id_list_group + '_' + courent_id).append("<a href='https://www.vide.me/" + post_spring + "'>" */
            /*<div class='videme-tile-signboard-true' id='videme-tile-signboard-true_" + value.item_id + "'></div>*/
            tempObject.append(
                //--tempObject.append('<div class="col-sm-6 col-md-4 col-lg-2 pl-1 pr-1 mb-1">' +
                // 11102019 '<div class="videme-tile-v3-card">' +
                '<div class="ms-1 me-1 mb-1 videme-tile-v3-card">' +
                //'<a class="shownext" href="' + href + '"><img class="videme-tile-v3-card-img-top" src="' + img + '"/></a>' +
                //'<a class="' + trueActionClass + '"' +
                '<a class="' + actionUrlClass + '"' +
                'action_url_class="' + actionUrlClass + '"' +
                'video="' + value.video + '"' +
                'type="' + value.type + '"' +
                'message_id="' + value.message_id + '"' +
                'user_display_name="' + user_display_name + '"' +
                'created_at="' + value.created_at + '"' +
                'updated_at="' + value.updated_at + '"' +
                'title="' + value.title + '"' +
                'content="' + value.content + '"' +
                'cover="' + value.cover + '"' +
                'item_id="' + value.item_id + '"' +
                'post_id="' + value.post_id + '"' +
                'spring="' + post_spring + '"' +
                'user_picture = "' + post_user_picture + '"' +
                'to_user_id="' + value.to_user_id + '"' +
                'from_user_id="' + value.from_user_id + '"' +
                'from_user_display_name="' + value.from_user_display_name + '"' +
                'from_user_name="' + value.user_display_name + '"' +
                'file="' + value.item_id + '"' +
                'video_duration="' + value.video_duration + '"' +
                'item_count_show="' + value.item_count_show + '"' +
                'access="' + value.access + '"' +
                //'tags="' + tags + '"' +
                //'ext_links="' + ext_links + '"' +
                'href="' + href + '" id="el_' + key + '">' +
                '<div class="videme-tile-v3-wrap-card-img-top" style="background-image: url(\'' + img + '\')">' +
                '<!--<img class="videme-tile-v3-card-img-top" src="' + img + '"/>-->' +
                '<div class="videme-tile-v3-card-item-type">' + item_type + '</div>' +
                '</div>' +
                '</a>' +
                '<div class="videme-tile-v3-card-block">' +
                '   <div class="videme-tile-v3-card-title"><p><span><a class="videme-v3-link shownext" href="' + href + '">' + value.title + '</a></span></p></div>' +
                '<div class="row videme-ralation-card-small222 videme-tile-v3-card-user-place">' +
                '<div class="col-2 videme-relation-card-1-column222 videme-tile-v3-profile2">' +
                '<img src="' + origin_img_vide_me + post_user_picture + '" class="rounded-circle videme-relation-card-img-tile-v3 profile-avatar2" alt="">' +
                '</div>' +
                '<div class="col-10 videme-relation-card-2-column222">' +
                '<div class="d-flex justify-content-between align-items-center  meta2 videme-tile-v3-card-text-user_display_name2">' +
                '<a class="videme-v3-link" href="https://www.vide.me/' + post_spring + '">' + post_user_display_name + '</a>' +
                '</div>' +
                '<div class="d-flex justify-content-between align-items-center videme-tile-v3-card-text-date"><p><small>' +
                timeToWord(value.created_at) +
                '</small></p></div>' +
                '</div>' +
                '<div class="videme-tile-v3-card-footer">' +
                '<!---<small>Last updated 3 mins ago</small>' +
                '<button class="btn btn-info float-right btn-sm">Follow</button>-->' +
                showItemInfoV3(value) +
                '</div>' +
                '</div>' +
                '</div>');
            /* **************************************************************/

            courent_id = courent_id + 1;
        });

        /*$(".video-js").each(function (videoIndex) { // TODO: remove, why
            // wrong place
            console.log("video-js each ");
            var videoId = $(this).attr("id");
            videojs(videoId).ready(function () {
                this.on("play", function (e) {
                    //pause other video
                    $(".video-js").each(function (index) {
                        if (videoIndex !== index) {
                            this.player.pause();
                        }
                    });
                    videojs.log('postsOfSpringVideoOnlyMultiple play ' + this.currentSrc());
                });
            });
        });*/
    }

    function showTileTestV4(showFile, tempObject, actionUrlClass, offset) { // 26072022
        var html = [];
        var courent_id = offset;
        $.each(showFile, function (key, value) {
            //console.log("showTileTestV4 each value -----> " + JSON.stringify(value));
            var a;
            if (value.a) {
                a = value.a + "<br>";
            } else {
                a = "";
            }
            var b;
            if (value.b) {
                b = value.b + "<br>";
            } else {
                b = "";
            }
            var c;
            if (value.c) {
                c = value.c + "<br>";
            } else {
                c = "";
            }
            var d;
            if (value.d) {
                d = value.d + "<br>";
            } else {
                d = "";
            }
            var videme_tile_class = 'videme-tile-box';
            var videme_tile_boxInner_class = 'videme-tile-boxInner';
            var its_video = false;
            var item_video = '';
            var css_aspect_percent = '';
            var retFirstSet = itemTileParamFirstSet(value);
            var source_src = '';
            var retSet = itemTileParamSet(value);
            if (value.tags) {
            } else {
            }
            if (value.count) { // TODO: remove?
                count = value.count
            } else {
                count = '' + '<br>';
            }
            if (value.access == 'public') { // TODO: remove? NOOO!
                var share = 'share';
                var fa_icon_access = 'fa fa-unlock';
            } else {
                var share = '';
                var fa_icon_access = 'fa fa-lock';
            }
            if (value.type == 'public') {
                var share = 'share';
                var fa_icon_access = 'fa fa-unlock';
            } else {
                var share = '';
                var fa_icon_access = 'fa fa-lock';
            }
            value = parseDropdown(actionUrlClass, key, value);
            var true_created_at = moment(value.created_at); // TODO: why
            var tags = '';
            if (!$.isEmptyObject(value.tags)) tags = JSON.stringify(value.tags);
            var ext_links = '';
            if (!$.isEmptyObject(value.ext_links)) {
                var tmpData = JSON.parse(value.ext_links);
                ext_links = JSON.stringify(tmpData, null, '\t');
            }
            itemTileElementReturn(tempObject, key, value, actionUrlClass, retSet.href, retSet.img, retFirstSet.user_display_name, retFirstSet.post_spring, retFirstSet.post_user_picture, retSet.video_thumbnail, retSet.item_type, retFirstSet.post_user_display_name, retFirstSet.user_tags_conf, retFirstSet.user_tags_conf_new, retSet);
            courent_id = courent_id + 1;
        });
        videoThumbnail();
    }

    function showListSet(showFile, tempObject) { // 26072022
        //console.log("showListSet showFile -----> " + JSON.stringify(showFile));
        var html = [];
        let listTileElement = [];
        listTileElement.avatar_wight_start = 111;
        listTileElement.avatar_margin_left = -55;
        listTileElement.avatar_rotatey = 0;//-65 // -20;
        //showFile.items_array.reverse();
        if (showFile === undefined || showFile.length == 0) {
        } else {
            showFile.items_array = showFile.items_array.reverse().slice(0, 5);
            showFile.covers_array = showFile.covers_array.reverse().slice(0, 5);
            html.push('<div class="row videme-list-panel"><div class="col-lg-4 col-sm-12 avatars">');
            //$.each(showFile.items_array, function (key, value) {
            var items_array = showFile.items_array;
            console.log("showListSet items_array -----> " + JSON.stringify(items_array));
            $.each(items_array, function (key, value) {
                listTileElement.cover = showFile.covers_array[key];
                //console.log("showTileTestV4 each value -----> " + JSON.stringify(value));
                html.push(listTileElementReturn(listTileElement));

                listTileElement.avatar_wight_start = listTileElement.avatar_wight_start - 5;
                //listTileElement.avatar_margin_left = listTileElement.avatar_margin_left + 5;
                listTileElement.avatar_rotatey = listTileElement.avatar_rotatey - 5;//+ 5;
            });
            html.push('</div>' + listTileContentReturn(showFile) + '</div>');

            tempObject.append(html.join(''));
        }
        //videoThumbnail();
    }

//function itemTileElementReturn(tempObj
    function listTileElementReturn(listTileElement) { // 26072022
        //console.log("listTileElement value -----> " + JSON.stringify(listTileElement));
        return '<div class="avatar" style="width: ' + listTileElement.avatar_wight_start + 'px;/*! height: 55%; */margin-left: ' + listTileElement.avatar_margin_left + 'px;opacity: 0.8;transform: perspective(300px) rotatey(' + listTileElement.avatar_rotatey + 'deg);">' +
            '<img src="' + origin_img_vide_me + listTileElement.cover + '">' +
            '</div>';
    }

    function listTileContentReturn(listTileElement) { // 26072022
        //console.log("listTileContentReturn value -----> " + JSON.stringify(listTileElement));
        return '<div class="col-lg-8 col-sm-12 videme-list-content"><a href="https://www.vide.me/v?m=' + listTileElement.items_array[0] +  '&list=' + listTileElement.li_id +  '"><figure><blockquote class="blockquote"><p>' + listTileElement.contents_array.join(' | ') + '</p></blockquote><figcaption class="blockquote-footer">' + listTileElement.titles_array.join(' | ') + '<cite title="' + listTileElement.titles_array.join(' | ') + '">...</cite></figcaption></figure></a></div>';
    }


    function showItemPrev(showItemPrev) { // 26072022
        var html = [];
        //html.push('<div class="container"><select class="image-picker" multiple>');
        $.each(showItemPrev, function (key, value) {
            //console.log('showTileRelation each key ---> ' + key);
            //console.log('showTileRelation each value ---> ' + JSON.stringify(value));
            var trueValue = paddingUserInfo(value);
            //var trueValue = JSON.stringify(value);
            //html.push("<option data-img-src=\"https://s3.amazonaws.com/img.vide.me/" + trueValue.cover + "\" alt=\"" + trueValue.title + "\" class=\"videme-item-prev-img img-thumbnail\" value='" + trueValue.item_id + "'>");
            $('.image-picker')
                //tempObject
                .append($("<option data-img-src='" + origin_img_vide_me + trueValue.cover + "' data-img-class=\"\"></option>")
                    .attr("name", 'cover')
                    .attr("value", trueValue.cover)
                    .text(trueValue.title));
            /*html.push(
                showTileDoorbellSignSmall(
                    parsePopRelationsForDoorbellSign(relationArray)
            ));*/
        });
        //html.push('</select></div>');
        //console.log('showSelectImage html ---> ' + html);
        //return html.join('');
    }

    function showItemPrevCreateAlbum(showItemPrev) { // 26072022
        var html = [];
        //html.push('<div class="container"><select class="image-picker" multiple>');
        $.each(showItemPrev, function (key, value) {
            //console.log('showTileRelation each key ---> ' + key);
            //console.log('showTileRelation each value ---> ' + JSON.stringify(value));
            var trueValue = paddingUserInfo(value);
            //var trueValue = JSON.stringify(value);
            //html.push("<option data-img-src=\"https://s3.amazonaws.com/img.vide.me/" + trueValue.cover + "\" alt=\"" + trueValue.title + "\" class=\"videme-item-prev-img img-thumbnail\" value='" + trueValue.item_id + "'>");
            $('.image-picker-create-album')
                //tempObject
                .append($("<option data-img-src='" + origin_img_vide_me + trueValue.cover + "' data-img-class=\"\"></option>")
                    .attr("name", 'cover')
                    .attr("value", trueValue.cover)
                    .text(trueValue.title));
            /*html.push(
                showTileDoorbellSignSmall(
                    parsePopRelationsForDoorbellSign(relationArray)
            ));*/
        });
        //html.push('</select></div>');
        //console.log('showSelectImage html ---> ' + html);
        //return html.join('');
    }

    function showItemVideoPrevForArticle(showItemPrev) { // 26072022
        var html = [];
        //html.push('<div class="container"><select class="image-picker" multiple>');
        $.each(showItemPrev, function (key, value) {
            //console.log('showTileRelation each key ---> ' + key);
            //console.log('showTileRelation each value ---> ' + JSON.stringify(value));
            var trueValue = paddingUserInfo(value);
            $('.video-picker-create-article')
                .append($("<option data-img-src='" + origin_img_vide_me + trueValue.item_id + ".jpg' data-img-class=\"\"></option>")
                    .attr("name", 'item_id')
                    .attr("value", trueValue.item_id)
                    .text(trueValue.title));
        });
    }

    function showItemVideoPrevForCover(showItemPrev) { // 26072022
        var html = [];
        //html.push('<div class="container"><select class="image-picker" multiple>');
        $.each(showItemPrev, function (key, value) {
            //console.log('showTileRelation each key ---> ' + key);
            //console.log('showTileRelation each value ---> ' + JSON.stringify(value));
            var trueValue = paddingUserInfo(value);
            $('.video-picker-create-cover')
                .append($("<option data-img-src='" + origin_img_vide_me + trueValue.item_id + ".jpg' data-img-class=\"\"></option>")
                    .attr("name", 'item_id')
                    .attr("value", trueValue.item_id)
                    .text(trueValue.title));
        });
    }

    function showItemImagePrevForArticle(showItemPrev) { // 26072022
        var html = [];
        //html.push('<div class="container"><select class="image-picker" multiple>');
        $.each(showItemPrev, function (key, value) {
            //console.log('showTileRelation each key ---> ' + key);
            //console.log('showTileRelation each value ---> ' + JSON.stringify(value));
            var trueValue = paddingUserInfo(value); // TODO: take this
            $('.my-image-picker-create-article')
                .append($("<option data-img-src='" + origin_img_vide_me + trueValue.cover + "' data-img-class=\"\"></option>")
                    .attr("name", 'item_id')
                    .attr("value", trueValue.item_id)
                    .text(trueValue.title));
        });
    }

    function showTileRelation(relationArray, tempObject, size, typeCard) { // 26072022
        //console.log('showTileRelation relationArray ---> ' + JSON.stringify(relationArray));
        //console.log('showTileRelation tempObject.width ---> ' + tempObject.width());
        //console.log('showTileRelation size ---> ' + size);
        var html = [];
        //if (tempObject.width() < 500) {
        html.push('<div class="container">');
        if (size == 'small') {
            $.each(relationArray, function (key, value) {
                //console.log('showTileRelation each key ---> ' + key);
                //console.log('showTileRelation each value ---> ' + JSON.stringify(value));
                var trueValue = paddingUserInfo(value);
                //var trueValue = JSON.stringify(value);
                html.push(showRelationCardSmall(trueValue, typeCard));
                /*html.push(
                    showTileDoorbellSignSmall(
                        parsePopRelationsForDoorbellSign(relationArray)
                ));*/
            });
        } else {
            $.each(relationArray, function (key, value) {
                var trueValue = paddingUserInfo(value);
                html.push(showRelationCard(trueValue, typeCard));
            });
        }
        html.push('</div>');
        return html.join('');
    }

    function showRelationCard(showRelationCard, typeCard) { // 26072022
        return "<div class=\"card\" style=\"width: 50%;float: left;\">\n" +
            "  <img class=\"card-img-top\" src=\"" + origin_img_vide_me + trueUserInfo.user_picture + "\" alt=\"Card image cap\">\n" +
            "  <div class=\"card-body\">\n" +
            "    <h5 class=\"card-title\"><a href='https://www.vide.me/" + showRelationCard.spring + "/' target='_blank'>" + showRelationCard.user_display_name + "</a></h5>\n" +
            "    <p class=\"card-text\"></p>\n" +
            showPostCountForRelationCardSmall(showRelationCardSmall) +
            RelationCardButton(showRelationCardSmall, typeCard) +
            "  </div>\n" +
            "</div>";
    }

    /* 26072022 function showRelationCardSmall_Old08062019(showRelationCardSmall, typeCard) {
        //console.log('showRelationCardSmall ---> ' + JSON.stringify(showRelationCardSmall));
        /!*var action_url = '';
        var action_button = '';
        var class_button = '';
        if (typeCard === 'connect') {
            action_url = 'https://api.vide.me/v2/relation/connect/?user_id=';
            action_button = 'Connect';
            class_button = 'relation_connect';
        }
        if (typeCard === 'friends-recommended') {
            action_url = 'https://api.vide.me/v2/friendship/request/?user_id=';
            action_button = 'Frindship';
            class_button = 'friend_request';
        }*!/
        return "\
            <hr class='videme-relation-card-hr'/>\
            <div class=\"row videme-ralation-card-small\">\
                <div class=\"col-4 videme-relation-card-1-column\">\
                    <a href='https://www.vide.me/" + showRelationCardSmall.spring + "'><img class=\"rounded-circle videme-relation-card-img-tile\" src=\"https://s3.amazonaws.com/img.vide.me/" + showRelationCardSmall.user_picture + "\" alt=\"\" /></a>\
                </div>\
                <div class=\"col-8 videme-relation-card-2-column\">\
                    <div class=\"row\">\
                        <div class=\"videme-relation-card-user\">\
                        <a href='https://www.vide.me/" + showRelationCardSmall.spring + "/'>" + showRelationCardSmall.user_display_name + "</a>\
                        </div>\
                    </div>\
                    <div class=\"row videme-relation-card-2-line\">\
                        " + showPostCountForRelationCardSmall(showRelationCardSmall) + "\
                        " + RelationCardButton(showRelationCardSmall, typeCard) + "\
                    </div>\
                </div>\
            </div>";
    }*/

    function showRelationCardSmall(showRelationCardSmall, typeCard) { // 26072022
        //console.log('showRelationCardSmall ---> ' + JSON.stringify(showRelationCardSmall));
        /*var action_url = '';
        var action_button = '';
        var class_button = '';
        if (typeCard === 'connect') {
            action_url = 'https://api.vide.me/v2/relation/connect/?user_id=';
            action_button = 'Connect';
            class_button = 'relation_connect';
        }
        if (typeCard === 'friends-recommended') {
            action_url = 'https://api.vide.me/v2/friendship/request/?user_id=';
            action_button = 'Frindship';
            class_button = 'friend_request';
        }*/
        return "\
            <hr class='videme-relation-card-hr'/>\
            <div class=\"row videme-ralation-card-small\">\
                <div class=\"col-2 videme-relation-card-1-column\">\
                    <a href='https://www.vide.me/" + showRelationCardSmall.spring + "'><img class=\"rounded-circle videme-relation-card-img-tile\" src=\"" + origin_img_vide_me + showRelationCardSmall.user_picture + "\" alt=\"\" /></a>\
                </div>\
                <div class=\"col-10 videme-relation-card-2-column\">\
                    <div class=\"d-flex justify-content-between align-items-center\">\
                        <div class=\"videme-relation-card-user\">\
                        <a href='https://www.vide.me/" + showRelationCardSmall.spring + "/'>" + showRelationCardSmall.user_display_name + "</a>\
                        </div>\
                    </div>\
                    <div class=\"d-flex justify-content-between align-items-center\">\
                        <div class=\"videme-relation-card-user\">\
                        <a class='text-muted' href='https://www.vide.me/" + showRelationCardSmall.spring + "/'>@" + showRelationCardSmall.spring + "</a>\
                        </div>\
                        " + showPostCountForRelationCardSmall(showRelationCardSmall) + "\
                        " + RelationCardButton(showRelationCardSmall, typeCard) + "\
                    </div>\
                </div>\
            </div>";
    }

    function RelationCardButton(showRelationCardSmall, typeCard) { // 26072022
        var action_url = '';
        var action_button = '';
        var class_button = '';
        if (typeCard === 'connect') {
            action_url = 'https://api.vide.me/v2/relation/connect/?user_id=';
            action_button = 'Follow';
            class_button = 'relation_connect';
        }
        if (typeCard === 'friends-recommended') {
            action_url = 'https://api.vide.me/v2/friendship/request/?user_id=';
            action_button = 'Frindship';
            class_button = 'friend_request';
        }
        return "<a href=\"" + action_url + showRelationCardSmall.user_id + "&nad=" + $.cookie('vide_nad') + "\" class=\"btn btn-outline-primary btn-sm videme-relation-card-button-connect " + class_button + "\" user_id='" + showRelationCardSmall.user_id + "' feedback='https://www.vide.me/" + showRelationCardSmall.spring + "'>" + action_button + "</a>"
    }

    function showPostCountForRelationCardSmall(showPostCountForRelationCardSmall) { // 26072022
        //console.log('showIconForDoorbelSign ---> ' + JSON.stringify(showIconForDoorbelSign));
        var postCount = ' '
        if (!$.isEmptyObject(showPostCountForRelationCardSmall.posts_count)) {
            postCount =
                "<div class='videme-relation-card-post-count-wrap'>" +
                "<div class='videme-relation-card-post-count-icon'>" +
                "<i class=\"fa fa-film\"></i>" +
                "</div>" +
                "<div class='videme-relation-card-post-count'>"
                + showPostCountForRelationCardSmall.posts_count + "" +
                "</div>" +
                "</div>";
        }
        return postCount;
    }

    function showTileTrendsItems(trendsArray, tempObject, size, typeCard) { // 26072022
        //console.log('showTileRelation trendsArray ---> ' + JSON.stringify(trendsArray));
        //console.log('showTileRelation tempObject.width ---> ' + tempObject.width());
        //console.log('showTileRelation size ---> ' + size);
        var html = [];
        //if (tempObject.width() < 500) {
        html.push('<div class="container">');
        if (size == 'small') {
            $.each(trendsArray, function (key, value) {
                //console.log('showTileRelation each key ---> ' + key);
                //console.log('showTileRelation each value ---> ' + JSON.stringify(value));
                //var trueValue = paddingUserInfo(value);
                //var trueValue = JSON.stringify(value);
                html.push(showTrendsItemsCardSmall(value, typeCard));
                /*html.push(
                    showTileDoorbellSignSmall(
                        parsePopRelationsForDoorbellSign(trendsArray)
                ));*/
            });
        } else {
            $.each(trendsArray, function (key, value) {
                var trueValue = paddingUserInfo(value);
                html.push(showTrendsItemsCard(trueValue, typeCard));
            });
        }
        html.push('</div>');
        return html.join('');
    }

    function showTrendsItemsCard(showTrendsItemsCard, typeCard) { // 26072022
        return "<div class=\"card\" style=\"width: 50%;float: left;\">\n" +
            "  <img class=\"card-img-top\" src=\"" + origin_img_vide_me + trueUserInfo.user_picture + "\" alt=\"Card image cap\">\n" +
            "  <div class=\"card-body\">\n" +
            "    <h5 class=\"card-title\"><a href='https://www.vide.me/" + showTrendsItemsCard.spring + "/' target='_blank'>" + showTrendsItemsCard.user_display_name + "</a></h5>\n" +
            "    <p class=\"card-text\"></p>\n" +
            showPostCountForRelationCardSmall(showRelationCardSmall) +
            RelationCardButton(showRelationCardSmall, typeCard) +
            "  </div>\n" +
            "</div>";
    }

    function showTrendsItemsCardSmall(showTrendsItemsCardSmall, typeCard) { // 26072022
        //console.log('showTrendsItemsCardSmall ---> ' + JSON.stringify(showTrendsItemsCardSmall));
        var title = '';
        var user_display_name = '';
        var type_item = 'v/?m=';
        /*if (!$.isEmptyObject(tempObject)) {
            //console.log('showDoorbellSignSmall tempObject.width() ---> ' + tempObject.width());
            if (tempObject.width() < 300) {
                var tempObjectClass = "";
            } else {
                var tempObjectClass = " d-flex";
            }
        } else {
            var tempObjectClass = " d-flex";
        }*/
        if (!$.isEmptyObject(showTrendsItemsCardSmall.type_item)) {
            switch (showTrendsItemsCardSmall.type_item) {
                case "image":
                    type_item = "i/?i=";
                    break;
                case "article":
                    type_item = "a/?a=";
                    break;
                case "event":
                    type_item = "e/?e=";
                    break;
                default:
                    type_item = "v/?m=";
            }
        }
        if (!$.isEmptyObject(showTrendsItemsCardSmall.item_id) && !$.isEmptyObject(showTrendsItemsCardSmall.title)) {
            title = "<a class='' href='https://www.vide.me/" + type_item + showTrendsItemsCardSmall.item_id + "'>" + showTrendsItemsCardSmall.title + "</a>";
        } else {
            title = showTrendsItemsCardSmall.title;
        }
        if (!$.isEmptyObject(showTrendsItemsCardSmall.spring) && !$.isEmptyObject(showTrendsItemsCardSmall.user_display_name)) {
            user_display_name = "<a href='https://www.vide.me/" + showTrendsItemsCardSmall.spring + "'>" + showTrendsItemsCardSmall.user_display_name + "</a>";
        }
        /*return "\
            <div class=\"row videme-ralation-card-small\">\
                <div class=\"col-4 videme-relation-card-1-column\">\
                    <a href='https://www.vide.me/" + showRelationCardSmall.spring + "'><img class=\"rounded-circle videme-relation-card-img-tile\" src=\"https://s3.amazonaws.com/img.vide.me/" + showRelationCardSmall.user_picture + "\" alt=\"\" /></a>\
                </div>\
                <div class=\"col-8 videme-relation-card-2-column\">\
                    <div class=\"row\">\
                        <div class=\"videme-relation-card-user\">\
                        <a href='https://www.vide.me/" + showRelationCardSmall.spring + "/'>" + showRelationCardSmall.user_display_name + "</a>\
                        </div>\
                    </div>\
                    <div class=\"row videme-relation-card-2-line\">\
                        " + showPostCountForRelationCardSmall(showRelationCardSmall) + "\
                        " + RelationCardButton(showRelationCardSmall, typeCard) + "\
                    </div>\
                </div>\
            </div>\
            <hr class='videme-relation-card-hr'/>\
            ";*/
        return "\
            <hr class='videme-relation-card-hr'/>\
            <div class=\"row videme-ralation-card-small\">\
                <div class='col-12 '>\
                    <div class='row videme-doorbell-sign-row-trend'>\
                        <div class='videme-doorbell-sign-1st-line-trend-title'>\
                            " + title + "\
                        </div>\
                        <div class='videme-doorbell-sign-2nd-line-trend-user-display-name'>\
                            " + user_display_name + "\
                        </div>\
                    </div>\
                </div>\
            </div>\
            ";
    }

    /* 26072022 function convertTimestamp(timestamp) {
        var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
            dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    }*/

    /* 26072022 function parseFileInbox(parseFileInbox) {
        $.each(parseFileInbox, function (key, value) {
            //console.log("parseFileInbox[key] ----->" + JSON.stringify(parseFileInbox[key]));
            //console.log("parseFileInbox paddingData ----->" + paddingData(value)); // <<-------------------
            //console.log("parseFileInbox value ----->" + JSON.stringify(value));
            parseFileInbox[key] = {
                'a': value.user_display_name,
                'b': value.title,
                'c': value.content,
                'd': value.updated_at,
                'img': value.item_id,
                'href': value.item_id,
                'from_user_name': value.user_display_name,
                'file': value.item_id, // TODO: remove
                'video_duration': value.video_duration,
                'tags': value.tags
            };
        });
        //delete parseFileInbox.results;
        //console.log("parseFileInbox ----->" + JSON.stringify(parseFileInbox));
        return parseFileInbox;
    }*/

    /* 26072022 function parseFileSent(parseFileSent) {
        $.each(parseFileSent, function (key, value) {
            parseFileSent[key] = {
                'a': value.value.toUserName,
                'b': value.value.subject,
                'c': value.value.message,
                'd': value.value.updatedAt,
                'img': value.value.file,
                'href': value.value.file,
                'to_user_name': value.value.toUserName,
                'subject': value.value.subject,
                'message': value.value.message,
                'created_at': value.value.createdAt,
                'updated_at': value.value.updatedAt,
                'file': value.value.file,
                //'objectId': value.objectId
                'message_id': value.id,
                'video_duration': value.value.videoDuration,
                'tags': value.value.tags
            };
        });
        //delete parseFileSent.results;
        return parseFileSent;
    }*/

    /* 26072022 function parseFileMy(parseFileMy) {
        console.log("parseFileMy ----->" + JSON.stringify(parseFileMy));

        $.each(parseFileMy, function (key, value) {
            console.log("parseFileMy key ----->" + JSON.stringify(key));
            console.log("parseFileMy value ----->" + JSON.stringify(value));
            console.log("parseFileMy value.item_id ----->" + value.item_id);

            var title;
            if (value.title) {
                title = value.title;
            } else {
                title = "";
            }
            var content;
            if (value.content) {
                content = value.content;
            } else {
                content = "";
            }
            parseFileMy[key] = {
                //'a': value.ToUserName,
                'a': title,
                'b': content,
                'd': value.created_at,
                'img': value.item_id,
                'href': value.item_id,
                'post_id': value.post_id,
                //'toUserName': value.ToUserName,
                'message': value.message,
                'created_at': value.created_at,
                'updated_at': value.updated_at,
                'video': value.item_id,
                'video_duration': value.video_duration,
                'tags': value.tags,
                'count': value.item_count_show
            };
        });
        //delete parseFileMy.results;
        return parseFileMy;
    }*/
    /* 26072022 $.fn.provideVidemeFunction = function (name, options) {
        console.log("$.fn.provideVidemeFunction options -----> " + JSON.stringify(options));
        //return [name(options)];
        //return [name];
        //return [name](options);
        //--return [fn][name](options);
        var res = parseDataArrayToObject(options);
        console.log("$.fn.provideVidemeFunction res -----> " + JSON.stringify(res));
        return res;
    };*/
    /*function parseDataArrayToObject(parseDataArrayToObject) { // TODO: why for?!
        console.log('videme_jq.js function parseDataArrayToObject');
        //console.log("parseDataArrayToObject before -----> " + JSON.stringify(parseDataArrayToObject));
        $.each(parseDataArrayToObject, function (key, value) {
            //console.log("parseFileInbox[key] ----->" + JSON.stringify(parseFileInbox[key]));
            //console.log("parseFileInbox paddingData ----->" + paddingData(value)); // <<-------
            //console.log("parseFileInbox value ----->" + JSON.stringify(value));
            // Array to Object Recognize
            /!*$.each(value, function (key2, value2) {
                //console.log("parseFileInbox each value ----->" + key2 + " - " + value2);
                //console.log("parseFileInbox paddingUserInfo(value2) ----->" + paddingUserInfo(value2));
                //value.key2 = paddingUserInfo(value2);
                //value[key2] = paddingUserInfo(value2);
                parseDataArrayToObject[key2] = paddingUserInfo(value);

            })*!/
            //parseDataArrayToObject[key] = paddingUserInfo(value);
            value = paddingUserInfo(value);
            parseDataArrayToObject[key] = {
                'a': value.user_display_name,
                'b': value.title,
                'c': value.content,
                'd': value.updated_at,
                'img': value.item_id,
                'src': value.src,
                'cover': value.cover,
                'cover_video': value.cover_video,
                'country': value.country,
                'item_country': value.item_country,
                'city': value.city,
                'item_city': value.item_city,
                'place': value.place,
                'started_at': value.started_at,
                'stopped_at': value.stopped_at,
                'type': value.type,
                'href': value.item_id,
                'item_id': value.item_id,
                'video': value.item_id,
                'post_id': value.post_id,
                'message_id': value.message_id,
                'user_picture': value.user_picture,
                'item_user_picture': value.item_user_picture,
                'post_user_picture': value.post_user_picture,
                'created_at': value.created_at,
                'updated_at': value.updated_at,
                'title': value.title,
                'content': value.content,
                'spring': value.spring,
                'item_spring': value.item_spring,
                'post_spring': value.post_spring,
                'user_email': value.user_email,
                //'user_picture': value.user_picture,
                'to_user_id': value.to_user_id,
                'from_user_id': value.from_user_id,
                'from_user_display_name': value.from_user_display_name,
                'from_user_name': value.user_display_name,
                'user_display_name': value.user_display_name,
                'item_user_display_name': value.item_user_display_name,
                'post_user_display_name': value.post_user_display_name,
                'file': value.item_id, // TODO: remove
                'video_duration': value.video_duration,
                'width': value.width,
                'height': value.height,
                'item_count_show': value.item_count_show,
                'count': value.item_count_show,
                'likes_count': value.likes_count,
                'stars_count': value.stars_count,
                'tags_conf': value.tags_conf,
                'user_tags_conf': value.user_tags_conf,
                'user_tags_conf_new': value.user_tags_conf_new,
                'reposts_count': value.reposts_count,
                'its_like': value.its_like,
                'post_type': value.post_type,
                'access': value.access,
                'ext_links': value.ext_links,
                'tags': value.tags,
                //'tags': value.tags,
                'dropdown': value.dropdown,
                'pre_v_w320': value.pre_v_w320,
                'pre_i_w320': value.pre_i_w320,
                'spr_w120': value.spr_w120,
                'vtt_w120': value.vtt_w120,
                'array_tags': value.array_tags,
                'album': value.album,
                'albums_title': value.albums_title,
                'albums_sets_id': value.albums_sets_id,
                'ip_id': value.ip_id
            };
        });
        //delete parseFileInbox.results;
        //console.log("parseDataArrayToObject after ----->" + JSON.stringify(parseDataArrayToObject));
        return parseDataArrayToObject;
    }*/

    /* 26072022 function parseFileMySpring(parseFileMySpring) {
        $.each(parseFileMySpring, function (key, value) {
            console.log("parseFileMySpring[key] ----->" + JSON.stringify(parseFileMySpring[key]));
            parseFileMySpring[key] = {
                //'a': value.ToUserName,
                'a': value.value.subject,
                'b': value.value.message,
                'd': value.value.updatedAt,
                'img': value.value.file,
                'href': value.value.file,
                //'toUserName': value.ToUserName,
                'subject': value.value.subject,
                'message': value.value.message,
                'created_at': value.value.createdAt,
                'updated_at': value.value.updatedAt,
                'file': value.file,
                'video_duration': value.value.videoDuration,
                'tags': value.value.tags
            };
        });
        delete parseFileMySpring.results;
        console.log("parseFileMySpring ----->" + JSON.stringify(parseFileMySpring));
        return parseFileMySpring;
    }*/

    /* 26072022 function parseFileSpring(parseFileSpring) {
        $.each(parseFileSpring, function (key, value) {
            console.log("parseFileSpring[key] ----->" + JSON.stringify(parseFileSpring[key]));
            parseFileSpring[key] = {
                //'a': value.ToUserName,
                'a': value.value.subject,
                'b': value.value.message,
                'd': value.value.updatedAt,
                'img': value.value.file,
                'href': value.value.file,
                //'toUserName': value.ToUserName,
                'subject': value.value.subject,
                'message': value.value.message,
                'created_at': value.value.createdAt,
                'updated_at': value.value.updatedAt,
                'file': value.value.file,
                'video_duration': value.value.videoDuration,
                'tags': value.value.tags
            };
        });
        delete parseFileSpring.results;
        console.log("parseFileSpring ----->" + JSON.stringify(parseFileSpring));
        return parseFileSpring;
    }*/

    /* 26072022 function parseShowNewVideo(parseShowNewVideo) {
        $.each(parseFileMySpring.results, function (key, value) {
            console.log("parseShowNewVideo.results[key] ----->" + JSON.stringify(parseShowNewVideo.results[key]));
            parseShowNewVideo[key] = {
                //'a': value.ToUserName,
                'a': value.Subject,
                'b': value.Message,
                'c': value.updatedAt,
                'img': value.File,
                'href': value.File,
                //'toUserName': value.ToUserName,
                'subject': value.Subject,
                'message': value.Message,
                'created_at': value.createdAt,
                'updated_at': value.updatedAt,
                'file': value.File
            };
        });
        delete parseShowNewVideo.results;
        console.log("parseShowNewVideo ----->" + JSON.stringify(parseShowNewVideo));
        return parseShowNewVideo;
    }*/

/*    function parseUrl() {
        console.log('videme_jq.js function parseUrl');
        var parseUrl = {};
        parseUrl.location = window.location.pathname;
        parseUrl.path = parseUrl.location.substring(0, parseUrl.location.lastIndexOf("/"));
        //springRaw = parseUrl.path.substring(parseUrl.path.lastIndexOf("/")+1);
        parseUrl.spring = parseUrl.location.replace(/^\/|\/$/g, '').toLowerCase();
        if (getParameterByName('album')) {
            parseUrl.album = getParameterByName('album');
        } else {
            parseUrl.album = '';
        }
        if (getParameterByName('show')) {
            parseUrl.show = getParameterByName('show');
        } else {
            parseUrl.show = '';
        }
        if (getParameterByName('list')) {
            parseUrl.list = getParameterByName('list');
        } else {
            parseUrl.list = '';
        }
        if (getParameterByName('index')) {
            parseUrl.index = getParameterByName('index');
        } else {
            parseUrl.index = '';
        }
        return parseUrl;
    }*/

    /* 26072022 function paddingButtonOneTime(paddingButtonOneTime) {
        /!*file: '',
         messageid: '',
         updatedAt: '',
         subject: '',
         message: '',
         fromUserName: '',
         toUserName: '',
         recipients: '',
         conferenceId: '',*!/
        //console.log("paddingButtonOneTime before -----> " + JSON.stringify(paddingButtonOneTime));
        paddingButtonOneTime.showcaseButton = {
            /!*'reply-toggle': {
                'video': paddingButtonInbox.video,
                'title': paddingButtonInbox.title,
                'content': paddingButtonInbox.content,
                'message_id': paddingButtonInbox.message_id,
                'id': paddingButtonInbox.id,
                'recipients': paddingButtonInbox.recipients,
                'to_user_id': paddingButtonInbox.to_user_id,
                'from_user_id': paddingButtonInbox.from_user_id,
                'from_user_display_name': paddingButtonInbox.from_user_display_name,
                'conference_id': paddingButtonInbox.conference_id
            },*!/
            /!*'contact-toggle': {
                'item_id': paddingButtonOneTime.item_id,
                'title': paddingButtonOneTime.title,
                'content': paddingButtonOneTime.content,
                'created_at': paddingButtonOneTime.created_at,
                'updated_at': paddingButtonOneTime.updated_at
            },
            'fb-send-message': {
                'item_id': paddingButtonOneTime.item_id,
                'created_at': paddingButtonOneTime.created_at,
                'updated_at': paddingButtonOneTime.updated_at
            },
            'list-toggle': {
                'item_id': paddingButtonOneTime.item_id,
                'title': paddingButtonOneTime.title,
                'content': paddingButtonOneTime.content,
                'created_at': paddingButtonOneTime.created_at,
                'updated_at': paddingButtonOneTime.updated_at
            }*!/
        };
        //console.log("paddingButtonOneTime after -----> " + JSON.stringify(paddingButtonOneTime));
        return paddingButtonOneTime;
    }*/


    /* 26072022 $.fn.showcaseVideo = function (options) {
        showcaseVideoSettings = $.extend({
            video: "no_video",
            miniVideo: true,
            //showcaseVideo: "videme-showcase-video",
            showcaseVideo: "#videme-showcase-video",
            authorized: true
        }, options);

        console.log("$.fn.showcaseVideo showcaseVideoSettings -----> " + showcaseVideoSettings);

        if (showcaseVideoSettings.authorized) { // TODO: remove
            console.log("authorized -----> true");
            //var sourseURL = "https://gu.vide.me/vic?m=";
            var sourseURL = "https://s3.amazonaws.com/video.vide.me/";
        } else {
            console.log("authorized ------> false");
            //var sourseURL = "https://gu.vide.me/vi?m=";
            var sourseURL = "https://s3.amazonaws.com/video.vide.me/";
        }
        //console.log("$.fn.showcaseVideo urlExists: " + urlExists(sourseURL + showcaseVideoSettings.video + '.mp4'));
        if ($(this).length) {
            console.log("$.fn.showcaseVideo $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.showcaseVideo $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showcaseVideoSettings.showcaseVideo);
            console.log("$.fn.showcaseVideo tempObject -----> " + tempObject.length);
        }

        var source_src = '';
        var img = '';
        var pgwBrowser = $.pgwBrowser();
        //console.log("$.fn.showcaseVideo pgwBrowser.os.group -----> " + pgwBrowser.os.group);
        //console.log("$.fn.showcaseVideo pgwBrowser.browser.group -----> " + pgwBrowser.browser.group);

        if (pgwBrowser.os.group !== 'Android' && pgwBrowser.browser.group !== 'Chrome') {
            source_src = "<source src=\"" + sourseURL + showcaseVideoSettings.video + ".m3u8\" type=\"video/mp4\">";
        }
        //console.log("$.fn.showcaseVideo showcaseVideoSettings.video -----> " + showcaseVideoSettings.video);
        /!*tempObject.html("<video id=\"videme-showcasevideo\" class=\"video-js vjs-default-skin\" autoplay>" +
            source_src +
            "</video>" + "<div id=\"videme-minivideo\"><div>");
        var oldShowcasePlayer = document.getElementById('videme-showcasevideo');
        videojs(oldShowcasePlayer).dispose();*!/
        /!*tempObject.html("<video id=\"videme-showcasevideo\" class=\"video-js vjs-default-skin\"></video>" +
            "<div id=\"videme-minivideo\"><div>");*!/
        /!*tempObject.html("<video id=\"videme-showcasevideo\" class=\"video-js vjs-default-skin\" autoplay>" +
            "<source src=\"" + sourseURL + showcaseVideoSettings.video + ".m3u8\" type=\"video/mp4\">" +
            "</video>" +
            "<div id=\"videme-minivideo\"><div>");*!/
        if (!$.isEmptyObject(showcaseVideoSettings.src)) {
            //source_src += "<source src=\"" + sourseURL + showcaseVideoSettings.video + "\" type=\"video/mp4\">";
            $.each(showcaseVideoSettings.src, function (key, value) {
                //console.log("$.fn.showPopTags data.tags -----> cnt: " + value.cnt + " tag " + value.tag);
                //console.log("$.fn.showPopTags each value -----> " + JSON.stringify(value));
                source_src += "<source src=\"" + sourseURL + value + "\" type=\"video/mp4\">";
            });
        }
        if (!$.isEmptyObject(showcaseVideoSettings.cover)) {
            img = "https://s3.amazonaws.com/img.vide.me/" + showcaseVideoSettings.cover;
        } else {
            img = "https://s3.amazonaws.com/img.vide.me/" + showcaseVideoSettings.item_id + ".jpg";
        }
        tempObject.html("<video id=\"videme-showcasevideo\" class=\"video-js vjs-default-skin vjs-big-play-centered\">" +
            source_src +
            "</video>" +
            "<div id=\"videme-minivideo\"><div>");
        if ($('#videme-showcasevideo').length) {
            console.log("$.fn.showcaseVideo (\"#videme-showcasevideo\").length) -----> yes " + $("#videme-showcasevideo").length);
        } else {
            console.log("$.fn.showcaseVideo (\"#videme-showcasevideo\").length) -----> nooo! " + $("#videme-showcasevideo").length);
        }
        //goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + showcaseVideoSettings.video + '&title=' + showcaseVideoSettings.title + '&user_display_name=' + showcaseVideoSettings.user_display_name + '&spring=' + showcaseVideoSettings.spring + '&user_picture=' + showcaseVideoSettings.user_picture + '&type_item=video');

        var width = document.getElementById('videme-showcasevideo').parentElement.offsetWidth;
        //myPlayer.width(width).height(width * (360 / 640));
        console.log("$.fn.showcaseVideo width -----> " + width);
        var opions = {
            "poster": img,
            "preload": "auto",
            "autoplay": true,
            "width": width/!*,
            "height": width * (360 / 640)*!/
        };
        if (detectBrowser() !== 'firefox') {
            opions = {
                "poster": img,
                "preload": "auto",
                "autoplay": true,
                "width": width/!*,
                "height": width * (360 / 640)*!/,
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
                "poster": img,
                "preload": "auto",
                "autoplay": true,
                "width": width/!*,
                "height": width * (360 / 640)*!/
            };
        }
        if (pgwBrowser.browser.group == 'Firefox') {
            opions = {
                "poster": img,
                "preload": "auto",
                "autoplay": false,
                "width": width/!*,
                "height": width * (360 / 640)*!/
            };
        }
        var showcasePlayer = videojs('videme-showcasevideo', opions, function () {
            var showcasePlayerFunc = this;
            //resizeVideoJS(showcasePlayerFunc); // TODO: Remove ?

            //if (showcaseVideoSettings.messageid.length > 0) {
            if (showcaseVideoSettings.message_id && showcaseVideoSettings.message_id != "undefined") {
                messageAdd = "&messageid=" + showcaseVideoSettings.message_id;
            } else {
                messageAdd = "";
            }

            /!*showcasePlayerFunc.src({
                //type: "video/mp4",
                type: "application/x-mpegURL",
                //src: sourseURL + showcaseVideoSettings.file + messageAdd
                //src: sourseURL + showcaseVideoSettings.video + '.mp4' // TODO: add message_id
                src: sourseURL + showcaseVideoSettings.video + '.m3u8' // TODO: add message_id
            });
            if (!$.isEmptyObject(showcaseVideoSettings.src)) {
                console.log("$.fn.showcaseVideo showcaseVideoSettings.src value -----> " + JSON.stringify(showcaseVideoSettings.src));
                //source_src += "<source src=\"" + sourseURL + showcaseVideoSettings.video + "\" type=\"video/mp4\">";
                $.each(showcaseVideoSettings.src, function (key, value) {
                    console.log("$.fn.showcaseVideo showcaseVideoSettings.src each value -----> " + value);
                    //console.log("$.fn.showPopTags data.tags -----> cnt: " + value.cnt + " tag " + value.tag);
                    //console.log("$.fn.showPopTags each value -----> " + JSON.stringify(value));
                    //source_src += "<source src=\"" + value + "\" type=\"video/mp4\">";
                    showcasePlayerFunc.src({
                        type: "video/mp4",
                        //type: "application/x-mpegURL",
                        //src: sourseURL + showcaseVideoSettings.file + messageAdd
                        //src: sourseURL + showcaseVideoSettings.video + '.mp4' // TODO: add message_id
                        src: sourseURL + value
                    });
                });
            }*!/

            var src_array = [];
            src_array.push({
                type: "application/x-mpegURL",
                src: sourseURL + showcaseVideoSettings.video + '.m3u8', // TODO: add message_id
            });

            /!*video_player.src({
                type: "application/x-mpegURL",
                //src: 'https://s3.amazonaws.com/video.vide.me/' + value.item_id + '.m3u8', // TODO: add message_id
                src: 'https://s3.amazonaws.com/video.vide.me/' + item_video + '.m3u8', // TODO: add message_id
            });*!/
            //video_player.src(src_array);
            if (!$.isEmptyObject(showcaseVideoSettings.src)) {
                //console.log("showcaseVideo value.src -----> " + JSON.stringify(showcaseVideoSettings.src));
                //var array_src = [];
                //array_src = $.parseJSON(showcaseVideoSettings.src);
                //console.log("showcaseVideoSettings.src array_src -----> " + JSON.stringify(array_src));
                //source_src += "<source src=\"" + sourseURL + showcaseVideoSettings.video + "\" type=\"video/mp4\">";

                $.each(showcaseVideoSettings.src, function (key, value) {
                    console.log("showcaseVideo each value -----> " + value);
                    //source_src += "<source src=\"" + value + "\" type=\"video/mp4\">";
                    /!*video_player.src({
                        type: "video/mp4",
                        //type: "application/x-mpegURL",
                        //src: sourseURL + showcaseVideoSettings.file + messageAdd
                        //src: sourseURL + showcaseVideoSettings.video + '.mp4' // TODO: add message_id
                        src: 'https://s3.amazonaws.com/video.vide.me/' + value
                    });*!/
                    src_array.push({
                        type: "video/mp4",
                        src: sourseURL + value
                    });

                });
                //console.log("src_array -----> " + JSON.stringify(src_array));
            }
            //video_player.src(JSON.stringify(src_array));
            showcasePlayerFunc.src(src_array);

            showcasePlayerFunc.controls(true);
            showcasePlayerFunc.on('playing', function () {
                //goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + showcaseVideoSettings.video + '&title=' + showcaseVideoSettings.title + '&user_display_name=' + showcaseVideoSettings.user_display_name + '&spring=' + showcaseVideoSettings.spring + '&user_picture=' + showcaseVideoSettings.user_picture + '&type_item=video');
                goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + showcaseVideoSettings.video + "&nad=" + $.cookie('vide_nad'));
            });
            showcasePlayerFunc.on('ended', function () {
                videojs.log('end');
            });
            showcasePlayerFunc.controls(true);
            showcasePlayerFunc.load();
            showcasePlayerFunc.play();
            showcasePlayerFunc.on('ended', function () {
                /!*
                 showcasePlayerFunc.src({
                 type: "video/mp4",
                 src: "https://r7.cf1.rackcdn.com/.mp4"
                 });
                 showcasePlayerFunc.load();
                 showcasePlayerFunc.play();*!/
            });
        });
        $(window).resize(function () {
            //resizeVideoJS(showcasePlayer); // TODO: Remove ?
        });
        console.log("$.fn.showcaseVideo showcaseVideoSettings.miniVideo -----> " + showcaseVideoSettings.miniVideo);

        /!*if (showcaseVideoSettings.miniVideo) {
            $("#videme-minivideo").html("<video id=\"my_video2\" class=\"video-js vjs-default-skin video-down\"></video> \
				<button id=\"closevideo\" type=\"button\" class=\"close closevideo hidden\" aria-label=\"Close\"> \
					<span aria-hidden=\"true\">&times;</span> \
				</button> \
			");
            var oldMiniPlayer = document.getElementById('my_video2');
            videojs(oldMiniPlayer).dispose();
            console.log("$.fn.showcaseVideo showcaseVideoSettings.file -----> " + showcaseVideoSettings.video);
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
                //miniPlayerFunc.src({type: "video/mp4", src: sourseURL + showcaseVideoSettings.file});
                //miniPlayerFunc.src({type: "video/mp4", src: sourseURL + showcaseVideoSettings.video + '.mp4'});
                miniPlayerFunc.src({
                    type: "application/x-mpegURL",
                    src: sourseURL + showcaseVideoSettings.video + '.m3u8'
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
        }*!/

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
    };*/

    /* 26072022 $.fn.showcaseVideoV3Static = function (options) {
        showcaseVideoV3StaticSettings = $.extend({
            video: "no_video",
            miniVideo: true,
            //showcaseVideo: "videme-showcase-video",
            // error? showcaseVideo: "#videme-v3-player",
            showcaseVideo: "#my-player",
            authorized: true
        }, options);

        //console.log("$.fn.showcaseVideoV3Static showcaseVideoV3StaticSettings -----> start");
        $('.videme-showcase-video-main').removeClass('hidden');
        $('.videme-showcase-image-main').addClass('hidden');
        $('.videme-showcase-article-main').addClass('hidden');
        $('.videme-showcase-event-main').addClass('hidden');

        /!*if (showcaseVideoV3StaticSettings.authorized) { // TODO: remove
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
        }*!/
        var sourseURL = origin_video_vide_me;

        //console.log("$.fn.showcaseVideo urlExists: " + urlExists(sourseURL + showcaseVideoV3StaticSettings.video + '.mp4'));
        if ($(this).length) {
            //console.log("$.fn.showcaseVideoV3Static $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showcaseVideoV3Static $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showcaseVideoV3StaticSettings.showcaseVideo);
            //console.log("$.fn.showcaseVideoV3Static tempObject -----> " + tempObject.length);
        }

        /!*var player = videojs('videme-v3-player');
        //player.dispose();
        player.reset();*!/

        var source_src = '';
        var img = '';
        var pgwBrowser = $.pgwBrowser();
        //console.log("$.fn.showcaseVideoV3Static pgwBrowser.os.group -----> " + pgwBrowser.os.group);
        //console.log("$.fn.showcaseVideoV3Static pgwBrowser.browser.group -----> " + pgwBrowser.browser.group);

        if (pgwBrowser.os.group !== 'Android' && pgwBrowser.browser.group !== 'Chrome') {
            source_src = "<source src=\"" + sourseURL + showcaseVideoV3StaticSettings.video + ".m3u8\" type=\"video/mp4\">";
        }
        //console.log("$.fn.showcaseVideo showcaseVideoV3StaticSettings.video -----> " + showcaseVideoV3StaticSettings.video);
        /!*tempObject.html("<video id=\"videme-showcasevideo\" class=\"video-js vjs-default-skin\" autoplay>" +
            source_src +
            "</video>" + "<div id=\"videme-minivideo\"><div>");
        var oldShowcasePlayer = document.getElementById('videme-showcasevideo');
        videojs(oldShowcasePlayer).dispose();*!/
        /!*tempObject.html("<video id=\"videme-showcasevideo\" class=\"video-js vjs-default-skin\"></video>" +
            "<div id=\"videme-minivideo\"><div>");*!/
        /!*tempObject.html("<video id=\"videme-showcasevideo\" class=\"video-js vjs-default-skin\" autoplay>" +
            "<source src=\"" + sourseURL + showcaseVideoV3StaticSettings.video + ".m3u8\" type=\"video/mp4\">" +
            "</video>" +
            "<div id=\"videme-minivideo\"><div>");*!/
        if (!$.isEmptyObject(showcaseVideoV3StaticSettings.src)) { // TODO: remove
            //source_src += "<source src=\"" + sourseURL + showcaseVideoV3StaticSettings.video + "\" type=\"video/mp4\">";
            $.each(showcaseVideoV3StaticSettings.src, function (key, value) {
                //console.log("$.fn.showPopTags data.tags -----> cnt: " + value.cnt + " tag " + value.tag);
                //console.log("$.fn.showPopTags each value -----> " + JSON.stringify(value));
                source_src += "<source src=\"" + sourseURL + value + "\" type=\"video/mp4\">";
            });
        }
        if (!$.isEmptyObject(showcaseVideoV3StaticSettings.cover)) {
            img = origin_img_vide_me + showcaseVideoV3StaticSettings.cover;
        } else {
            img = origin_img_vide_me + showcaseVideoV3StaticSettings.item_id + ".jpg";
        }
        /!*tempObject.html("<video id=\"videme-showcasevideo\" class=\"video-js vjs-default-skin vjs-big-play-centered\">" +
            source_src +
            "</video>" +
            "<div id=\"videme-minivideo\"><div>");*!/
        if ($('#videme-showcasevideo').length) { // TODO: remove
            //console.log("$.fn.showcaseVideoV3Static (\"#videme-showcasevideo\").length) -----> yes " + $("#videme-showcasevideo").length);
        } else {
            //console.log("$.fn.showcaseVideoV3Static (\"#videme-showcasevideo\").length) -----> nooo! " + $("#videme-showcasevideo").length);
        }
        //goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + showcaseVideoV3StaticSettings.video + '&title=' + showcaseVideoV3StaticSettings.title + '&user_display_name=' + showcaseVideoV3StaticSettings.user_display_name + '&spring=' + showcaseVideoV3StaticSettings.spring + '&user_picture=' + showcaseVideoV3StaticSettings.user_picture + '&type_item=video');

        //var width = document.getElementById('videme-showcasevideo').parentElement.offsetWidth;
        //var width = document.getElementById('videme-v3-player').parentElement.offsetWidth; // TODO: this -> videme-showcase-video
        //var width = 300;

        /!*if( $('#videme-showcase-video').is(':empty') ) {
            $('#videme-showcase-video').html('<video id="my-player" class="video-js vjs-default-skin vjs-big-play-centered" controls="controls" preload="auto" poster="' + img + '" data-setup=\'{"fluid": true}\'>' +
                '<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p></video>');
        }*!/
        var width = document.getElementById('my-player').parentElement.offsetWidth; // TODO: this -> videme-showcase-video
        //var width = document.getElementById('videme-v3-player').parentElement.offsetWidth; // TODO: this -> videme-showcase-video
        //---var width = document.getElementById(tempObject).parentElement.offsetWidth;
        //myPlayer.width(width).height(width * (360 / 640));
        //console.log("$.fn.showcaseVideoV3Static width -----> " + width);
        var opions = {
            "poster": img,
            "preload": "auto",
            "autoplay": true,
            "width": width/!*,
            "height": width * (360 / 640)*!/
        };
        if (detectBrowser() !== 'firefox') {
            opions = {
                "poster": img,
                "preload": "auto",
                "autoplay": true,
                "width": width/!*,
                "height": width * (360 / 640)*!/,
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
                "poster": img,
                //"poster": img,
                "preload": "auto",
                "autoplay": true,
                "width": width/!*,
                "height": width * (360 / 640)*!/
            };
        }
        if (pgwBrowser.browser.group == 'Firefox') {
            opions = {
                "poster": img,
                "preload": "auto",
                "autoplay": false,
                "width": width/!*,
                "height": width * (360 / 640)*!/
                /!*plugins:{thumbnails:{width:120,height:90}}*!/
            };
        }
        //console.log("$.fn.showcaseVideoV3Static opions -----> " + JSON.stringify(opions));
        var options = {}; // TODO: remove

        //var showcasePlayer = videojs('videme-showcasevideo', opions, function () {
        //--var showcasePlayer = videojs(tempObject, opions, function () {
        /!*if (showcasePlayer) {
            console.log("$.fn.showcaseVideoV3Static showcasePlayer -----> already exist");
            showcasePlayer.dispose();
        } else {
            console.log("$.fn.showcaseVideoV3Static showcasePlayer -----> no exist");
            var showcasePlayer;
        };*!/
        //var oldPlayer = document.getElementById('my-player');
        //videojs(oldPlayer).dispose();
        //oldPlayer.dispose();

        //var getPlayers = getPlayers();
        //console.info('getPlayers' + getPlayers);


        // getPlayers() returns an object containing all players, not a player.
        //var showcasePlayer = videojs('videme-v3-player', opions, function () { // TODO: this -> videme-showcase-video
        /!*videojs.Hls.xhr.beforeRequest = function (opions) {
            console.log('before XHR Call');
            opions.headers = {
                "Access-Control-Allow-Origin": "*",
            };
            console.log('before XHR Call opions ' + JSON.stringify(opions));
            return opions;
        };*!/
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

                var showcasePlayerFunc = this;
                /!*showcasePlayerFunc.xhr({
                    //body: someJSONString,
                    body: '',
                    //uri: "/foo",
                    uri: origin_video_vide_me,
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    }
                }, function (err, resp, body) {
                    // check resp.statusCode
                });*!/
                //showcasePlayerFunc.dispose();
                //resizeVideoJS(showcasePlayerFunc); // TODO: Remove ?

                //if (showcaseVideoV3StaticSettings.messageid.length > 0) {
                if (showcaseVideoV3StaticSettings.message_id && showcaseVideoV3StaticSettings.message_id != "undefined") {
                    messageAdd = "&messageid=" + showcaseVideoV3StaticSettings.message_id;
                } else {
                    messageAdd = "";
                }

                /!*showcasePlayerFunc.src({
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
                }*!/

                var src_array = [];
                src_array.push({
                    type: "application/x-mpegURL",
                    src: sourseURL + showcaseVideoV3StaticSettings.video + '.m3u8', // TODO: add message_id
                });

                /!*video_player.src({
                    type: "application/x-mpegURL",
                    //src: 'https://s3.amazonaws.com/video.vide.me/' + value.item_id + '.m3u8', // TODO: add message_id
                    src: 'https://s3.amazonaws.com/video.vide.me/' + item_video + '.m3u8', // TODO: add message_id
                });*!/
                //video_player.src(src_array);
                if (!$.isEmptyObject(showcaseVideoV3StaticSettings.src)) {
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
                        src_array.push({
                            type: "video/mp4",
                            src: sourseURL + value
                        });

                    });
                }
                console.log("src_array -----> " + JSON.stringify(src_array));
                //video_player.src(JSON.stringify(src_array));
                /!***************************************************!/
                //=showcasePlayerFunc.pause();
                //var new_url = $(this).attr("data-url");
                //showcasePlayerFunc.src(new_url);
                // set src track corresponding to new movie //

                //v22showcasePlayerFunc.src(src_array);
                showcasePlayerFunc.pause();
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
                showcasePlayerFunc.play();
                /!*v33 **************************************************!/

                //this.src(src_array);
                /!***************************************************!/
                //=showcasePlayerFunc.load();
                //=showcasePlayerFunc.play();
                /!***************************************************!/

                showcasePlayerFunc.controls(true);
                //this.controls(true);
                //showcasePlayerFunc.on('playing', function () {
                /!* play list start ************************************************!/
                let url = parseUrl();
                let list = {};
                let videmeCurrentShocaseItem = 0;
                let list_array_items = [];
                console.log('url: ' + JSON.stringify(url));
                if (url.list) {
                    //console.log('url.list: ' + url.list);
                    list = url.list;
                    let list_array = [];

                    $.getJSON("https://api.vide.me/v2/posts/shownext/?prev_item_id=&next_item_id=8e6a132ded8c&limit=16",
                        function (jsonData) {
                            //console.log("list data -----> " + JSON.stringify(jsonData));
                            if (!$.isEmptyObject(jsonData)) {
                                //let list_array = [];

                                $.each(jsonData, function (key, value) {
                                    //console.log("list each value -----> " + JSON.stringify(value));
                                    let src_array2 = [];
                                    let src_array4 = [];
                                    src_array2.push({
                                        type: "application/x-mpegURL",
                                        src: sourseURL + value.item_id + '.m3u8',
                                    });
                                    if (!$.isEmptyObject(value.src)) {
                                        //console.log("list each value.src -----> " + JSON.stringify(value.src));
                                        let temp_array3 = value.src;
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
                                                src: sourseURL + value2
                                            });

                                        });
                                        //console.log("src_array2 -----> " + JSON.stringify(src_array2));
                                    }
                                    let list_array_item = {'sources': src_array2, 'poster': origin_img_vide_me + value.item_id};
                                    list_array.push(list_array_item);
                                    list_array_items.push(value.item_id);
                                });
                                //console.log("list list_array -----> " + JSON.stringify(list_array));
                                //console.log("list list_array_items -----> " + JSON.stringify(list_array_items));
                                showcasePlayerFunc.playlist(list_array);
                                if (url.index) {
                                    if (url.index <= list_array.length) {
                                        videmeCurrentShocaseItem = url.index;
                                    } else {
                                        videmeCurrentShocaseItem = list_array.length;
                                    }
                                }
                                /!* playlist panel start ******************************************************************!/
                                let tempObject = $('#videme-shownext-tile');
                                tempObject.html(showListMedia(parseDataArrayToObject(jsonData)));

                                /!* playlist panel stop ********************************************************************!/
                                /!*videmeCurrentShocaseItem = showcasePlayerFunc.playlist.currentItem();
                                //console.log('url.index -----> ' + url.index);
                                if (url.index){
                                    showcasePlayerFunc.playlist.currentItem(url.index);
                                }*!/
                                /!*************************************************************
                                 Nas  Press
                                 **************************************************************!/
                                /!*$(document).on('click', '.videme-list-media-li', function (event) {
                                    console.log(".videme-list-media-li in getjson -----> click");
                                    event.preventDefault();
                                    var $this = $(this);
                                    let playlist_number = $this.attr('data-videme-playlist-number');
                                    console.log(".videme-list-media-li in getjson data-videme-playlist-number -----> " + playlist_number);
                                    //showcasePlayerFunc.playlist.currentItem(3);
                                });*!/
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
                    /!* playlist end *********************************************!/
                    /!* Test hlsQualitySelector ********************************************************************************!/
                    /!*player.hlsQualitySelector({
                        displayCurrentQuality: true,
                    });*!/
                    /!* Test hlsQualitySelector ********************************************************************************!/
                    /!*************************************************************
                     Nas  Press
                     **************************************************************!/
                    $(document).on('click', '.videme-list-media-li', function (event) {
                        console.log(".videme-list-media-li out getjson -----> click");
                        event.preventDefault();
                        var $this = $(this);
                        let playlist_number = parseInt($this.attr('data-videme-playlist-number'));
                        console.log(".videme-list-media-li out getjson data-videme-playlist-number -----> " + playlist_number);
                        showcasePlayerFunc.playlist.currentItem(playlist_number);
                    });

//let videmeCurrentShocaseItem = player.playlist.currentItem();
//console.log('url.index ' + url.index);
//player.currentItem(url.index);

                    /!***************************************!/
                    var Button = videojs.getComponent('Button');
                    var MyButton = videojs.extend(Button, {
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
                    showcasePlayerFunc.getChild('controlBar').addChild('myButton', {});
                    /!***************************************!/


                    var closeButton = videojs.extend(Button, {
                        constructor: function() {
                            Button.apply(this, arguments);
                            this.controlText("Exit Course");
                            this.addClass('vjs-icon-cancel');
                        },
                        handleClick: function() {
                            console.log('player handleClick dispose');
                            this.player().dispose();
                        }
                    });

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

                    videojs.registerComponent('closeButton', closeButton);
                    videojs.registerComponent('nextItemButton', nextItemButton);
                    videojs.registerComponent('prevItemButton', prevItemButton);
                    showcasePlayerFunc.getChild('controlBar').addChild('prevItemButton', {}, 0);
                    showcasePlayerFunc.getChild('controlBar').addChild('nextItemButton', {}, 2);
                    showcasePlayerFunc.getChild('controlBar').addChild('closeButton', {}, 3);
                    /!***************************************!/
//player.controlBar.el().insertBefore(button.el(), player.controlBar.el().firstChild);
//this.controlBar.el().appendChild(nextButton.el());
                    /!***************************************!/
                    /!*player.vttThumbnails({
                        //src: 'https://s3.amazonaws.com/vtt-w120.vide.me/' + showcaseVideoV3StaticSettings.item_id + '-spr-w120.vtt'
                        src: 'https://sprite-w120.rate-my.life/c5d7f04248a7-spr-w120.vtt'
                    });*!/

                    /!***************************************!/

                    showcasePlayerFunc.on('playlistitem', function(){
                        console.log( 'player.playlist.currentItem ---> ');
                        //videmeCurrentShocaseItem = showcasePlayerFunc.playlist.currentItem();
                        updateShowcaseItemInfo();
                    });
                    //player.next();

                    //showcasePlayerFunc.poster();
                    showcasePlayerFunc.load();
                    showcasePlayerFunc.play();
                    showcasePlayerFunc.on('play', function () {
                        console.info('showcaseVideoV3Static showcasePlayerFunc.on playing');
                        videojs.log('showcaseVideoV3Static play ' + this.currentSrc());
                    });
                    /!*player.next();*!/


                    function updateShowcaseItemInfo() {
                        console.log('function updateShowcaseItemInfo videmeCurrentShocaseItem: ' + videmeCurrentShocaseItem + ' showcasePlayerFunc.playlist.currentItem: ' + showcasePlayerFunc.playlist.currentItem());
                        //console.log('function updateShowcaseItemInfo list_array_items videmeCurrentShocaseItem: ' + list_array_items[videmeCurrentShocaseItem] + ' currentItem: ' + player.playlist.currentItem());
                        console.log('function updateShowcaseItemInfo list_array: ' + JSON.stringify(list_array));
                        showcasePlayerFunc.poster(list_array[showcasePlayerFunc.playlist.currentItem()]['poster']);
                        showcasePlayerFunc.load();
                        showcasePlayerFunc.play();
                        showcasePlayerFunc.on('play', function () {
                            console.info('showcaseVideoV3Static showcasePlayerFunc.on playing');
                            videojs.log('showcaseVideoV3Static play ' + this.currentSrc());
                        });
                        if (videmeCurrentShocaseItem !== showcasePlayerFunc.playlist.currentItem()) {

                            $('.videme-ralation-card-small').html('');
                        }

                        $.getJSON("https://api.vide.me/v2/items/info/?item_id=" + list_array_items[showcasePlayerFunc.playlist.currentItem()],
                            function (jsonData) {
                                //console.log("list data -----> " + JSON.stringify(jsonData));
                                if (!$.isEmptyObject(jsonData)) {
                                    console.log('function updateShowcaseItemInfo getJSON jsonData: ' + JSON.stringify(jsonData));
                                    $.fn.showcaseUserPicture(jsonData); // TODO: why for?
                                    $.fn.showcaseTagsConfCountIcon(jsonData);
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
                } else {
                    console.log('list: empty');
                }
                /!* play list start ************************************************!/

                showcasePlayerFunc.on('play', function () {
                    //console.info('showcaseVideoV3Static showcasePlayerFunc.on playing');
                    videojs.log('showcaseVideoV3Static play ' + this.currentSrc());
                    //this.on('playing', function () {
                    //goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + showcaseVideoV3StaticSettings.video + '&title=' + showcaseVideoV3StaticSettings.title + '&user_display_name=' + showcaseVideoV3StaticSettings.user_display_name + '&spring=' + showcaseVideoV3StaticSettings.spring + '&user_picture=' + showcaseVideoV3StaticSettings.user_picture + '&type_item=video');
                    //==goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + showcaseVideoV3StaticSettings.video + "&nad=" + $.cookie('vide_nad'));
                    item_count_add(showcaseVideoV3StaticSettings.video);
                });
                /!*this.on('playing', function () {
                    console.info('showcaseVideoV3Static showcasePlayerFunc.on playing');
                    videojs.log('showcaseVideoV3Static play ');

                    //this.on('playing', function () {
                    //goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + showcaseVideoV3StaticSettings.video + '&title=' + showcaseVideoV3StaticSettings.title + '&user_display_name=' + showcaseVideoV3StaticSettings.user_display_name + '&spring=' + showcaseVideoV3StaticSettings.spring + '&user_picture=' + showcaseVideoV3StaticSettings.user_picture + '&type_item=video');
                    goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + showcaseVideoV3StaticSettings.video + "&nad=" + $.cookie('vide_nad'));
                });*!/
                showcasePlayerFunc.on('ended', function () {
                    //this.on('ended', function () {
                    videojs.log('end');
                    if (list) countdownShowcase(showcaseVideoV3StaticSettings);
                });
                //showcasePlayerFunc.controls(true);
                showcasePlayerFunc.load();
                //this.load();
                showcasePlayerFunc.play();
                //this.play();
                showcasePlayerFunc.on('ended', function () {
                    //this.on('ended', function () {
                    /!*
                     showcasePlayerFunc.src({
                     type: "video/mp4",
                     src: "https://r7.cf1.rackcdn.com/.mp4"
                     });
                     showcasePlayerFunc.load();
                     showcasePlayerFunc.play();*!/
                });

                //define([ 'videojs-overlay.min' ], function( overlay ){
                /!*require([ 'videojs-overlay.min' ], function( overlay ){
                    //showcasePlayer.overlay = overlay;*!/
                /!*showcasePlayer.overlay({
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
                });*!/
                //});
                //showcasePlayer.hlsQualitySelector();
                /!* Test hlsQualitySelector ********************************************************************************!/
                //showcasePlayer.hlsQualitySelector({
                showcasePlayerFunc.hlsQualitySelector({
                    displayCurrentQuality: true,
                });
                /!* Test hlsQualitySelector ********************************************************************************!/
                /!* Test vttThumbnails. on seeking bar **********************************************************************************!/
                if (!$.isEmptyObject(showcaseVideoV3StaticSettings.vtt_w120)) {
                    //console.log("showcaseVideoV3Static showcaseVideoV3StaticSettings.vtt_w120 -----> " + showcaseVideoV3StaticSettings.vtt_w120);
                    //showcasePlayer.vttThumbnails({
                    showcasePlayerFunc.vttThumbnails({
                        //src: 'https://s3.amazonaws.com/vtt-w120.vide.me/' + showcaseVideoV3StaticSettings.item_id + '-spr-w120.vtt'
                        src: origin_sprite_w120_vide_me + showcaseVideoV3StaticSettings.item_id + '-spr-w120.vtt'
                    });
                    //showcasePlayerFunc.vttThumbnails();
                }
                /!* Test vttThumbnails. on seeking bar **********************************************************************************!/
            });

            //LoadProgressBar(showcasePlayerFunc, {});

            /!*showcasePlayer.hlsQualitySelector({
                displayCurrentQuality: true,
            });*!/

            /!* Test prev. on seeking bar **********************************************************************************!/
            if (!$.isEmptyObject(showcaseVideoV3StaticSettings.seek_srcZZZ)) {
                console.log("showcaseVideoV3Static showcaseVideoV3StaticSettings.seek_src -----> " + showcaseVideoV3StaticSettings.seek_src);
                /!*showcasePlayer.thumbnails({
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
                });*!/
            }
            /!* Test prev. on seeking bar **********************************************************************************!/


            /!* Overlay for embed **************************************************************************************!/
            if (showcaseVideoV3StaticSettings.embed) {
                //if (true) {
                console.log("showcaseVideoV3Static showcaseVideoV3StaticSettings.embed -----> " + showcaseVideoV3StaticSettings.embed);
                //var commonDate = periodToWord(started_at, stopped_at);
                //$('#videme-tile-signboard-true_' + value.item_id).html('<div class="videme-tile-signboard-overlay">' + item_country + ', ' + item_city + ', ' + place + '<br/>' + commonDate + '</div>');
                //$('#videme-tile-signboard-true_' + showcaseVideoV3StaticSettings.item_id).html(embed_text_overlay(showcaseVideoV3StaticSettings));
                //if (showcaseVideoV3StaticSettings.type == 'video' || its_video) {
                //if (showcaseVideoV3StaticSettings.type == 'video') {
                /!* text overlay *!/
                //var overlay_content = '<div class="videme-tile-signboard-overlay">' + item_country + '<br/>' + item_city + '<br/>' + place + '<br/>' + started_at + '<br/>' + stopped_at + '<br/>' + commonDate + '</div>';
                var overlay_content = embed_text_overlay(showcaseVideoV3StaticSettings);
                //console.log("showcaseVideoV3Static overlay_content -----> " + overlay_content);

                //var overlay_content = 'Vide.me';
                //showcasePlayerFunc.overlay({
                /!*showcasePlayer.overlay({
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
                });*!/
                /!* text overlay *!/
                //}
                /!*****************!/
                /!*$('a').live('click', function() {
                    window.open($(this).attr('href'));
                    return false;
                });*!/
                //$('a').setAttribute('target','_blank');
                /!* Overlay for embed **************************************************************************************!/
            } else {
                $.getJSON("https://api.vide.me/v2/posts/shownext/?next_item_id=" + showcaseVideoV3StaticSettings.video + "&limit=1&videmecallback=?",
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
                            var overlay_content = embed_text_overlay_next(jsonData[0]);
                            $('#showcaseNext').data('showcase_next_item', jsonData[0]);
                            //var overlay_content = jsonData[0].item_id;
                            //console.log("jQuery.showcaseVideoV3Static overlay_content -----> " + overlay_content);

                            //var overlay_content = 'Vide.me';
                            //showcasePlayerFunc.overlay({
                            /!*define([ 'videojs-overlay.min' ], function( overlay ){*!/

                            showcasePlayer.overlay({
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
        });

        $(window).resize(function () {
            //resizeVideoJS(showcasePlayer); // TODO: Remove ?
        });
        //console.log("$.fn.showcaseVideoV3Static showcaseVideoV3StaticSettings.miniVideo -----> " + showcaseVideoV3StaticSettings.miniVideo);

        /!*if (showcaseVideoV3StaticSettings.miniVideo) {
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
        }*!/

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
    };*/

    /* 26072022 $.fn.showcaseImageV3Static = function (options) {
        showcaseImageV3StaticSettings = $.extend({}, options);
        console.log("$.fn.showcaseImageV3Static showcaseImageV3StaticSettings -----> " + JSON.stringify(showcaseImageV3StaticSettings));
        $('.videme-showcase-video-main').addClass('hidden');
        $('.videme-showcase-image-main').removeClass('hidden');
        $('.videme-showcase-article-main').addClass('hidden');
        $('.videme-showcase-event-main').addClass('hidden');
        $('.image-url').attr({
            'user_display_name': showcaseImageV3StaticSettings.user_display_name,
            'created_at': showcaseImageV3StaticSettings.created_at,
            'title': showcaseImageV3StaticSettings.title,
            'content': showcaseImageV3StaticSettings.content,
            'user_picture': showcaseImageV3StaticSettings.user_picture,
            'item_id': showcaseImageV3StaticSettings.item_id,
            'cover': showcaseImageV3StaticSettings.cover,
            'href': showcaseImageV3StaticSettings.href,
        });
        $(".videme-modal-item-image-place").html("<img src='" + origin_img_vide_me + showcaseImageV3StaticSettings.cover + "' class='videme-modal-item-image'>");
    };*/

    /* 26072022 $.fn.showcaseArticleV3Static = function (options) {
        showcaseArticleV3StaticSettings = $.extend({}, options);
        console.log("$.fn.showcaseArticleV3Static showcaseArticleV3StaticSettings -----> " + showcaseArticleV3StaticSettings);
        if (showcaseArticleV3StaticSettings.item_id) {

            $('.videme-showcase-video-main').addClass('hidden');
            $('.videme-showcase-image-main').addClass('hidden');
            $('.videme-showcase-article-main').removeClass('hidden');
            $('.videme-showcase-event-main').addClass('hidden');
            /!*var cover = '';
            var category = '';
            var title = '';*!/
            //goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + $this.attr('item_id'));

            //$(".videme-list-list").html(VidemeProgress);
            //$(".videme-modal-article-content-place").html(VidemeProgress);
            $(".videme-modal-article-content-place").html("<img src='data:image/gif;base64,R0lGODlhQAAwAPQAAAAAAHx8fHl9j5WVlaCjraqqqrGxsby8vL+/v8jIyMvLy9ra2t3d3eLi4urq6vPz8/b29vf39/j4+Pn5+fr6+vz8/P7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+EUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAAQAAwAAAF/6AgjmRpnmiqosTqvvDbxnQNz3auk/ju172f0BUcGk/Fo1KUXB6bziE0+ptSd9ZrLqsFdpXc701sDJNX5nMqrUa2fYSLfE6v2+/4vD6vAPj/gIGCg4SFhoIBFwwDjI2Oj5CRkpOUkAYXFA+am5ydnp+goaKeEBd9h6ipqoaJDQWvsLGys7S1trezCHu7vL2+FQvBwsPExcbHyMnFDhcTB8/Q0dLT1NXW19MLvtvc3BQK4OHi4+Tl5ufo5A2Y6e3u7+nr3fP09fb3dRAB+/z9/v8AAwoc+E8XvoMIEyLUR7Chw4cDDSqcSLFingiVMmrcWCnBBQujQoocOUqCxZMMIQ2qXElQ4smXMGPK9BUCADs=' />");
            /!*if ($this.attr('cover')) cover = $this.attr('cover');
            if ($this.attr('category')) category = $this.attr('category');
            if ($this.attr('title')) title = $this.attr('title');*!/
            //$(".videme-modal-item-image-place").html("<img src='https://s3.amazonaws.com/img.vide.me/" + $this.attr('item_id') + ".jpg' class='videme-modal-item-image'>");
            //console.log(".article-url -----> ", '"https://s3.amazonaws.com/img.vide.me/' + cover + '"');
            /!*if ($this.attr('title')) $(".videme-modal-item-title-place").append("<b>" + $this.attr('title') + "</b><br>");
            if ($this.attr('content')) $(".videme-modal-item-content-place").append($this.attr('content') + "<br>");
            if ($this.attr('created_at')) $(".videme-modal-item-created_at-place").append($this.attr('created_at') + "<br>");*!/

            $.getJSON("https://api.vide.me/v2/items/info/?item_id=" + showcaseArticleV3StaticSettings.item_id + "&videmecallback=?",
                function (data) {
                    $(".videme-modal-article-content-place").empty();

                    //console.log("showcaseArticleV3Static data -----> " + JSON.stringify(data));

                    //var data = parseDataArrayToObject(data);
                    //data = JSON.stringify(data);
                    //if ($.isEmptyObject(data)) {
                    if (!$.isEmptyObject(data)) {
                        //console.log("article-url data -----> " + JSON.stringify(data));
                        goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + data.item_id + '&title=' + data.title + '&user_display_name=' + data.user_display_name + '&spring=' + data.spring + '&user_picture=' + showcaseArticleV3StaticSettings.user_picture + '&type_item=article' + '&nad=' + $.cookie('vide_nad'));

                        if (!$.isEmptyObject(data.user_display_name)) $(".videme_img_modal_title").html(data.user_display_name);
                        $(".videme-modal-article-content-place").append(
                            '<div class="videme-cover-image" style="background-image: url(\'' + origin_img_vide_me + data.cover + '\')">' +
                            /!*'<div class="category">' + data.category + '</div>' +*!/
                            '</div>' +
                            '<h3>' + data.title + '</h3>' +
                            '<div class="d-flex justify-content-end align-items-center videme-v3-item-action-button-place">' +
                            '        <div class="videme_showcase_item_info videme-v3-item-action-button"></div>\n' +
                            '        <div class="videme-showcase-stars-v3 videme-v3-item-action-button"></div>\n' +
                            '        <div class="videme-showcase-reposts-v3 videme-v3-item-action-button"></div>\n' +
                            '        <div class="show_action_button_showcase videme-v3-item-action-button"></div>\n' +
                            '        <div class="videme-showcase-follow-v3 videme-v3-item-action-button"></div>\n' +
                            '</div>' +
                            '<div class="videme-article-center">');

                        //var body = $.parseJSON(data.body);
                        var bodyJ = JSON.stringify(data.body);
                        //tags = $.parseJSON(tagsR);
                        var body = $.parseJSON(bodyJ);
                        console.log("showcaseArticleV3Static body -----> " + JSON.stringify(body));


                        $.each(body, function (key, value) {
                            $.each(value, function (key2, value2) {
                                /!*if (value.text) {
                                    $(".videme-modal-article-content-place").append('<p>' + value.text + '</p>');
                                }*!/
                                console.log("showcaseArticleV3Static value2 -----> " + JSON.stringify(value2));

                                switch (key2) {

                                    case 'text':
                                        $(".videme-modal-article-content-place").append('<p>' + value.text + '</p>');
                                        break;
                                    case 'YTVideo':
                                        $(".videme-modal-article-content-place").append('<div class="videoWrapper">' +
                                            '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + value.YTVideo + '" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div>');
                                        break;
                                    case 'url':
                                        $(".videme-modal-article-content-place").append('<div class="videoWrapper">' +
                                            '<iframe width="560" height="315" src="' + value.url + '" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div>');
                                        break;
                                    case 'img':
                                        $(".videme-modal-article-content-place").append('<img src="' + value.img + '" alt="" title="" />');
                                        break;
                                    case 'VMVideo':
                                        $(".videme-modal-article-content-place").append('<div class=\"videoWrapper\">' +
                                            '<iframe src="https://www.vide.me/embed/?i=' + value.VMVideo + '" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div>');
                                        break;
                                    case 'VMImage':
                                        $(".videme-modal-article-content-place").append('<div class=\"videoWrapper\">' +
                                            '<iframe src="https://www.vide.me/embed/?i=' + value.VMImage + '" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div>');
                                        break;
                                    //default:
                                    //dropdownDS = " ";
                                }
                            });


                        });
                        if (!$.isEmptyObject(data.tags)) {
                            $(".videme-modal-article-content-place").append('<h5>Tags:</h5>');
                            var tags = $.parseJSON(data.tags);
                            $.each(tags, function (key3, value3) {
                                $(".videme-modal-article-content-place").append('<a href=\"https://vide.me/search/?q=' + value3 + '" class=\"badge badge-primary\"> ' + value3 + ' </a>&nbsp;');
                            });
                        }
                        if (!$.isEmptyObject(data.ext_links)) { // TODO: dobble
                            //console.log("showItemInfo ----->" + JSON.stringify(showItemInfo.ext_links));
                            $(".videme-modal-article-content-place").append('<h5>External links:</h5>');
                            var links = '';
                            array_ext_links = $.parseJSON(data.ext_links);
                            $.each(array_ext_links, function (key, value) {
                                //console.log("$.fn.showcaseText tags -----> " + value);
                                links += '&nbsp;<a href="' + value.link + '" target="_blank" class="badge badge-primary">' + value.title + '</span> ';
                            });
                            $(".videme-modal-article-content-place").append(links);
                        }
                    } else {
                        $('.videme-modal-article-content-place').html('No data');
                    }
                    $.fn.showcaseStarsV3(showcaseArticleV3StaticSettings); // TODO: recreate
                    $('.show_action_button_showcase').html(showDropdownForDoorbelSignV3(showcaseArticleV3StaticSettings));
                })
                .done(function (data) {
                })
                .fail(function (data) {
                    return false;
                });


        } else {
            console.log("showcaseArticleV3Static -----> no item_id");
            $('.videme-modal-article-content-place').html(showError("No file"));
        }

    };*/

    /* 26072022 $.fn.showcaseVideoTest05022019 = function (options) {
        showcaseVideoSettings = $.extend({
            video: "no_video",
            miniVideo: true,
            //showcaseVideo: "videme-showcase-video",
            showcaseVideo: "#videme-showcase-video",
            authorized: true
        }, options);

        console.log("$.fn.showcaseVideo showcaseVideoSettings -----> " + showcaseVideoSettings);

        if (showcaseVideoSettings.authorized) { // TODO: remove
            console.log("authorized -----> true");
            //var sourseURL = "https://gu.vide.me/vic?m=";
            var sourseURL = "https://s3.amazonaws.com/video.vide.me/";
        } else {
            console.log("authorized ------> false");
            //var sourseURL = "https://gu.vide.me/vi?m=";
            var sourseURL = "https://s3.amazonaws.com/video.vide.me/";
        }
        //console.log("$.fn.showcaseVideo urlExists: " + urlExists(sourseURL + showcaseVideoSettings.video + '.mp4'));
        if ($(this).length) {
            console.log("$.fn.showcaseVideo $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.showcaseVideo $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showcaseVideoSettings.showcaseVideo);
            console.log("$.fn.showcaseVideo tempObject -----> " + tempObject.length);
        }

        //console.log("$.fn.showcaseVideo showcaseVideoSettings.video -----> " + showcaseVideoSettings.video);
        /!*tempObject.html("<video id=\"videme-showcasevideo\" class=\"video-js vjs-default-skin\" autoplay>" +
            "<source src=\"" + sourseURL + showcaseVideoSettings.video + ".m3u8\" type=\"video/mp4\">" +
            "</video>" +
            "<div id=\"videme-minivideo\"><div>");
        var oldShowcasePlayer = document.getElementById('videme-showcasevideo');
        videojs(oldShowcasePlayer).dispose();*!/
        tempObject.html("<video id=\"videme-showcasevideo\" class=\"video-js vjs-default-skin\"></video>" +
            "<div id=\"videme-minivideo\"><div>");
        var pgwBrowser = $.pgwBrowser();
        if (pgwBrowser.os.group == 'Android' && pgwBrowser.browser.group == 'Chrome') {

        }
        //tempObject.append('pgwBrowser: ', JSON.stringify(pgwBrowser));
        //tempObject.append('pgwBrowser: pgwBrowser.os.group ', pgwBrowser.os.group);
        if ($('#videme-showcasevideo').length) {
            console.log("$.fn.showcaseVideo (\"#videme-showcasevideo\").length) -----> yes " + $("#videme-showcasevideo").length);
        } else {
            console.log("$.fn.showcaseVideo (\"#videme-showcasevideo\").length) -----> nooo! " + $("#videme-showcasevideo").length);
        }
        goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + showcaseVideoSettings.video + '&title=' + showcaseVideoSettings.title + '&user_display_name=' + showcaseVideoSettings.user_display_name + '&spring=' + showcaseVideoSettings.spring + '&user_picture=' + showcaseVideoSettings.user_picture + '&type_item=video');

        var width = document.getElementById('videme-showcasevideo').parentElement.offsetWidth;
        //myPlayer.width(width).height(width * (360 / 640));
        //console.log("$.fn.showcaseVideo width -----> " + width);

        var showcasePlayer = videojs('videme-showcasevideo', {
            /!* Options *!/
            /!*autoHeight: true*!/
            "autoplay": true,
            "width": width,
            "height": width * (360 / 640)/!*,
            html5: {
                hls: {
                    overrideNative: true
                },
                nativeVideoTracks: false,
                nativeAudioTracks: false,
                nativeTextTracks: false
            }*!/
        }, function () {
            var showcasePlayerFunc = this;
            //resizeVideoJS(showcasePlayerFunc); // TODO: Remove ?

            //if (showcaseVideoSettings.messageid.length > 0) {
            if (showcaseVideoSettings.message_id && showcaseVideoSettings.message_id != "undefined") {
                messageAdd = "&messageid=" + showcaseVideoSettings.message_id;
            } else {
                messageAdd = "";
            }

            showcasePlayerFunc.src({
                /!*not for m3u8 type: "video/mp4",*!/
                type: "application/x-mpegURL",
                //src: sourseURL + showcaseVideoSettings.file + messageAdd
                //src: sourseURL + showcaseVideoSettings.video + '.mp4' // TODO: add message_id
                src: sourseURL + showcaseVideoSettings.video + '.m3u8' // TODO: add message_id
            });
            showcasePlayerFunc.controls(true);
            showcasePlayerFunc.load();
            showcasePlayerFunc.play();
            showcasePlayerFunc.on('ended', function () {
                /!*
                 showcasePlayerFunc.src({
                 type: "video/mp4",
                 src: "https://r7.cf1.rackcdn.com/.mp4"
                 });
                 showcasePlayerFunc.load();
                 showcasePlayerFunc.play();*!/
            });
        });
        tempObject.append('showcasePlayer.browser: ', JSON.stringify(showcasePlayer.browser));

        $(window).resize(function () {
            //resizeVideoJS(showcasePlayer); // TODO: Remove ?
        });
        console.log("$.fn.showcaseVideo showcaseVideoSettings.miniVideo -----> " + showcaseVideoSettings.miniVideo);

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
    };*/

    /* 26072022 $.fn.showcaseVideoAds = function (options) {
        showcaseVideoSettings = $.extend({
            file: "9566b5a3475c25aa",
            miniVideo: true,
            //showcaseVideo: "videme-showcase-video",
            showcaseVideo: "#videme-showcase-video",
            authorized: true
        }, options);

        if (showcaseVideoSettings.authorized) {
            console.log("authorized -----> true");
            var sourseURL = "https://gu.vide.me/vic?m=";
        } else {
            console.log("authorized ------> false");
            var sourseURL = "https://gu.vide.me/vi/?m=";
        }
        if ($(this).length) {
            console.log("$.fn.showcaseVideo $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.showcaseVideo $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showcaseVideoSettings.showcaseVideo);
            console.log("$.fn.showcaseVideo tempObject -----> " + tempObject.length);
        }
        console.log("$.fn.showcaseVideo showcaseVideoSettings.file -----> " + showcaseVideoSettings.file);
        tempObject.html("<video id=\"videme-showcasevideo\" class=\"video-js vjs-default-skin\"></video>" +
            "<div id=\"videme-minivideo\"><div>");
        var oldShowcasePlayer = document.getElementById('videme-showcasevideo');
        videojs(oldShowcasePlayer).dispose();
        tempObject.html("<video id=\"videme-showcasevideo\" class=\"video-js vjs-default-skin\"></video>" +
            "<div id=\"videme-minivideo\"><div>");
        if ($('#videme-showcasevideo').length) {
            console.log("$.fn.showcaseVideo (\"#videme-showcasevideo\").length) -----> yes " + $("#videme-showcasevideo").length);
        } else {
            console.log("$.fn.showcaseVideo (\"#videme-showcasevideo\").length) -----> nooo! " + $("#videme-showcasevideo").length);
        }
        var showcasePlayer = videojs('videme-showcasevideo', {
            /!* Options *!/
        }, function () {
            var showcasePlayerFunc = this;
            /!* Ads ********************************************************!/
            showcasePlayerFunc.ads(); // initialize the ad framework

            // request ads whenever there's new video content
            showcasePlayerFunc.on('contentupdate', function () {
                // fetch ad inventory asynchronously, then ...
                showcasePlayerFunc.trigger('adsready');
            });

            showcasePlayerFunc.on('readyforpreroll', function () {
                showcasePlayerFunc.ads.startLinearAdMode();
                // play your linear ad content
                showcasePlayerFunc.src('https://gu.vide.me/vi/?m=9069ab08e968');

                // when all your linear ads have finished… do not confuse this with `ended`
                showcasePlayerFunc.one('adended', function () {
                    showcasePlayerFunc.ads.endLinearAdMode();
                });
            });
            /!* Ads ********************************************************!/

            resizeVideoJS(showcasePlayerFunc);

            if (showcaseVideoSettings.messageid.length > 0) {
                messageAdd = "&messageid=" + showcaseVideoSettings.messageid;
            } else {
                messageAdd = "";
            }

            showcasePlayerFunc.src({
                type: "video/mp4",
                src: sourseURL + showcaseVideoSettings.file + messageAdd
            });
            showcasePlayerFunc.controls(true);
            showcasePlayerFunc.load();
            showcasePlayerFunc.play();
            showcasePlayerFunc.on('ended', function () {
                /!*
                 showcasePlayerFunc.src({
                 type: "video/mp4",
                 src: "https://r7.cf1.rackcdn.com/.mp4"
                 });
                 showcasePlayerFunc.load();
                 showcasePlayerFunc.play();*!/
            });
        });
        $(window).resize(function () {
            resizeVideoJS(showcasePlayer);
        });
        console.log("$.fn.showcaseVideo showcaseVideoSettings.miniVideo -----> " + showcaseVideoSettings.miniVideo);
        if (showcaseVideoSettings.miniVideo) {
            $("#videme-minivideo").html("<video id=\"my_video2\" class=\"video-js vjs-default-skin video-down\"></video> \
				<button id=\"closevideo\" type=\"button\" class=\"close closevideo hidden\" aria-label=\"Close\"> \
					<span aria-hidden=\"true\">&times;</span> \
				</button> \
			");
            var oldMiniPlayer = document.getElementById('my_video2');
            videojs(oldMiniPlayer).dispose();
            console.log("$.fn.showcaseVideo showcaseVideoSettings.file -----> " + showcaseVideoSettings.file);
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
                //miniPlayerFunc.muted(true);
                miniPlayerFunc.src({type: "video/mp4", src: sourseURL + showcaseVideoSettings.file});
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
        }

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

        function resizeVideoJS(myPlayer) {
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
    };*/

    $.fn.showcaseText = function (options) { // 26072022
        showcaseTextSettings = $.extend({}, options);
        //console.log("$.fn.showcaseText showcaseTextSettings -----> " + JSON.stringify(showcaseTextSettings));
        $(".videme-showcase-subject").html(showcaseTextSettings.title);
        $(".videme-showcase-message").html(showcaseTextSettings.content);
        //$(".videme-showcase-createdat").html(convertTimestamp(showcaseTextSettings.created_at));
        $(".videme-showcase-createdat").html(timeToWord(showcaseTextSettings.created_at));
        //$(".videme_showcase_item_info").html(showItemInfo(showcaseTextSettings));

        //if (showcaseTextSettings.tags) {
        /*if (!$.isEmptyObject(showcaseTextSettings.tags)) {

            console.log("$.fn.showcaseText showcaseTextSettings.tags -----> " + JSON.stringify(showcaseTextSettings.tags));
            $(".videme-showcase-tags").removeClass('hidden');

            var tags = [];
            //tags = $.parseJSON(showcaseTextSettings.tags);
            //console.log("$.fn.showcaseText tags -----> " + tags);
            //$.each(tags, function (key, value) {
            $.each(showcaseTextSettings.tags, function (key, value) {
                //console.log("$.fn.showcaseText tags -----> " + value);
                $(".videme-showcase-tags").append('&nbsp;<a href="https://vide.me/search/?q=' + value + '" class="badge badge-primary">' + value + '</span> ');

            });
        } else {
            //console.log("$.fn.showcaseText showcaseTextSettings.tags -----> empty");
        }*/
    };

    /* 26072022 $.fn.showcaseTags = function (options) {
        showcaseTagsSettings = $.extend({}, options);
        if (!$.isEmptyObject(showcaseTagsSettings.tags)) {
            //console.log("$.fn.showcaseTags showcaseTagsSettings.tags -----> " + JSON.stringify(showcaseTagsSettings.tags));
            $(".videme-showcase-tags").removeClass('hidden'); // TODO: do <--------------------------------------

            var tags = [];
            //tags = $.parseJSON(showcaseTextSettings.tags);
            //console.log("$.fn.showcaseText tags -----> " + tags);
            //$.each(tags, function (key, value) {
            $.each(showcaseTagsSettings.tags, function (key, value) {
                //console.log("$.fn.showcaseText tags -----> " + value);
                //$(".videme-showcase-tags").append('&nbsp;<a href="https://vide.me/search/?q=' + value + '" class="badge badge-primary">#' + value + '</span> ');
                $(".videme-showcase-tags").append('&nbsp;<a href="https://vide.me/search/?q=' + value + '" class="videme-sidebar-hot-tags">#' + value + '</a> ');

            });
        } else {
            //console.log("$.fn.showcaseText showcaseTextSettings.tags -----> empty");
        }
    };*/

    //$.fn.showcaseTagsUsers = function (options, showItemTagsUsersSettings) {
    $.fn.showcaseTagsUsers = function (options) { // 26072022
        //$.fn.showcaseTagsUsers = function (options, tempObject) { // TODO: remove
        //showcaseTagsSettings = $.extend({}, options);
        showcaseTagsUsersSettings = $.extend({
            showcaseTagsUsersPlace: "#videme-earned-tags"
        }, options);
        if ($(this).length) {
            console.log("$.fn.showcaseTagsUsers $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.showcaseTagsUsers $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showcaseTagsUsersSettings.showcaseTagsUsersPlace);
            console.log("$.fn.showcaseVideo tempObject -----> " + tempObject.length);
        }
        //if (!$.isEmptyObject(showcaseTagsSettings.tags)) {
        //var tags = [];
        //var html = [];
        //var oldTags = [];
        //if (!$.isEmptyObject(showcaseTagsSettings)) {
        console.log("$.fn.showcaseTagsUsers showcaseTagsUsersSettings -----> " + JSON.stringify(showcaseTagsUsersSettings));
        //console.log("$.fn.showcaseTagsUsers showItemTagsUsersSettings -----> " + JSON.stringify(showItemTagsUsersSettings));
        //console.log("$.fn.showcaseTagsUsers showItemTagsUsersSettings.tags -----> " + JSON.stringify(showItemTagsUsersSettings.tags));
        //var tagsOldArray = showItemTagsUsersSettings.tags;
        //console.log("$.fn.showcaseTagsUsers tagsOldArray -----> " + tagsOldArray);

        //====?????$(".videme-showcase-tags-item").removeClass('hidden'); // TODO: do <--------------------------------------
        //tags = $.parseJSON(showcaseTextSettings.tags);
        //$.each(showItemTagsUsersSettings.tags, function (key, value) {
        /*$.each(tagsOldArray, function (key, value) {
            console.log("$.fn.showcaseTagsUsers key, value -----> " + key, value);

            //oldTags.push.item_id = showItemTagsUsersSettings.item_id;
            //oldTags.push.tag = value;
            //oldTags.push.tags_count = '';
            //oldTags.push.its_tag = '';
            //oldTags.push['tag'] = value;
            /!*oldTags.push({'item_id': showItemTagsUsersSettings.item_id});
            oldTags.push({'tag': value});
            oldTags.push({'tags_count': 0});
            oldTags.push({'its_tag': ''});*!/
            //oldTags.push({'item_id': showItemTagsUsersSettings.item_id, 'tag': value, 'tags_count': 0, 'its_tag': ''});
            oldTags.push({key:{'item_id': showItemTagsUsersSettings.item_id, 'tag': value, 'tags_count': 0, 'its_tag': ''}});
        });
        console.log("$.fn.showcaseTagsUsers oldTags -----> " + JSON.stringify(oldTags));
        //var concTags = showcaseTagsSettings.concat(oldTags);
        var resultTags = Object.keys(showcaseTagsSettings).map(function(key) {
            return [Number(key), showcaseTagsSettings[key]];
        });
        console.log("$.fn.showcaseTagsUsers resultTags -----> " + JSON.stringify(resultTags));
        var concTags = oldTags.concat(resultTags);*/
        //console.log("$.fn.showcaseTagsUsers concTags -----> " + JSON.stringify(concTags));
        //console.log("$.fn.showcaseText tags -----> " + tags);
        //$.each(tags, function (key, value) {
        //$.each(showcaseTagsSettings.tags, function (key, value) {
        if ($.cookie('vide_nad')) {
            //var testetest = '';

            $.getJSON("https://api.vide.me/v2/tags/my/?videmecallback=?",
                function (JSON_tags_my) {
                    //console.log("$.fn.showcaseTagsUsers JSON_tags_my -----> " + JSON.stringify(JSON_tags_my));
                    //return fShowcaseEachTagButtonAuth(showcaseTagsSettings, JSON_tags_my);
                    //testetest = fShowcaseEachTagButton(showcaseTagsSettings);
                    //tempObject.html(fShowcaseEachTagButton(showcaseTagsSettings));
                    //tempObject.html(fShowcaseEachTagButtonAuth(showcaseTagsSettings, JSON_tags_my));
                    if (!$.isEmptyObject(JSON_tags_my)) {
                        //$('.videme-showcase-tags-user_place').html(fShowcaseEachMyTagButton(showcaseTagsSettings, JSON_tags_my)).removeClass('hidden');
                        tempObject.html(fShowcaseEachEarnedTagButton(JSON_tags_my));
                    } else {
                        tempObject.html('You don\'t have earned tags');
                    }
                })
                .done(function (data) {
                })
                .fail(function (data) {
                    //tempObject.html(showError(data));
                })
                .always(function () {
                });
            //return testetest;
        } else {
            //return fShowcaseEachTagButton(showcaseTagsSettings);
            //tempObject.html(fShowcaseEachTagButton(showcaseTagsSettings));
        }

        /*} else {
            //console.log("$.fn.showcaseText showcaseTextSettings.tags -----> empty");
        }*/
        //return html;
    };

    $.fn.showcaseComments = function (options) { // 26072022
        showcaseCommentsSettings = $.extend({
            showcaseCommentsPlace: "#videme-showcase-comments-container",
            user_picture: 'https://viima-app.s3.amazonaws.com/media/public/defaults/user-icon.png'
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showcaseComments $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showcaseComments $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showcaseCommentsSettings.showcaseCommentsPlace);
            //console.log("$.fn.showcaseComments tempObject -----> " + tempObject.length);
        }
        var readOnly = true;
        //var urlCommentsGetAddon = '';
        if ($.cookie('vide_nad')) {
            readOnly = false;
            //urlCommentsGetAddon = '&nad=' + $.cookie('vide_nad');
        }
        //console.log("$.fn.showcaseComments urlCommentsGetAddon -----> " + urlCommentsGetAddon);
        //console.log("$.fn.showcaseComments showcaseCommentsSettings -----> " + JSON.stringify(showcaseCommentsSettings));
        /*var saveComment = function (data) {

            // Convert pings to human readable format
            $(Object.keys(data.pings)).each(function (index, userId) {
                var fullname = data.pings[userId];
                var pingText = '@' + fullname;
                data.content = data.content.replace(new RegExp('@' + userId, 'g'), pingText);
            });

            return data;
        }*/
        $('#videme-showcase-comments-container').comments({
            /*profilePictureURL: 'https://viima-app.s3.amazonaws.com/media/public/defaults/user-icon.png',
            currentUserId: 1,
            roundProfilePictures: true,
            textareaRows: 1,
            enableAttachments: true,
            enableHashtags: true,
            enablePinging: true,
            scrollContainer: $(window),
            searchUsers: function(term, success, error) {
                setTimeout(function() {
                    success(usersArray.filter(function(user) {
                        var containsSearchTerm = user.fullname.toLowerCase().indexOf(term.toLowerCase()) != -1;
                        var isNotSelf = user.id != 1;
                        return containsSearchTerm && isNotSelf;
                    }));
                }, 500);
            },
            getComments: function(success, error) {
                setTimeout(function() {
                    success(commentsArray);
                }, 500);
            },*/
            fieldMappings: {
                id: 'comment_id',
                //parent: 'comment_id',
                created: 'created_at',
                modified: 'updated_at',
                content: 'content',
                file: 'file',
                fileURL: 'file_url',
                fileMimeType: 'file_mime_type',
                pings: 'pings',
                creator: 'creator',
                fullname: 'user_display_name',
                profileURL: 'spring',
                profilePictureURL: 'user_picture',
                isNew: 'is_new',
                createdByAdmin: 'created_by_admin',
                createdByCurrentUser: 'its_comment',
                upvoteCount: 'upvote_count',
                userHasUpvoted: 'user_has_upvoted',
                fullname: 'user_display_name', // for ping
                email: 'user_email',
                profile_picture_url: origin_img_vide_me + 'user_picture'
            },
            timeFormatter: function (time) {
                return moment(time).fromNow();
            },
            readOnly: readOnly,
            enableUpvoting: false,
            enableReplying: false,
            enableEditing: true,
            enableDeleting: true,
            enableAttachments: false,
            enableNavigation: false,
            roundProfilePictures: true,
            profilePictureURL: showcaseCommentsSettings.user_picture,
            spinnerIconURL: '',
            enablePinging: false,
            /*searchUsers: function(term, success, error) {
                console.log("$.fn.jQuery.showcaseComments searchUsers term -----> " + JSON.stringify(term));
                $.ajax({
                    type: 'get',
                    url: 'https://api.vide.me/v2/user/search/',
                    data: {'q': term},
                    success: function(userArray) {
                        console.log('$.fn.jQuery.showcaseComments searchUsers userArray ' + JSON.stringify(userArray));
                        success(userArray)
                    },
                    /!*success: function(usersArray) {
                        success(usersArray.filter(function(user) {
                            var containsSearchTerm = user.user_display_name.toLowerCase().indexOf(term.toLowerCase()) != -1;
                            var isNotSelf = user.id != 460;
                            return containsSearchTerm && isNotSelf;
                        }));
                    },*!/
                    error: error
                });
            },*/
            getComments: function (success, error) {
                $.ajax({
                    type: 'get',
                    url: 'https://api.vide.me/v2/comments/get/',
                    data: {'item_id': showcaseCommentsSettings.item_id, 'nad': $.cookie('vide_nad')},
                    success: function (commentsArray) {
                        /*console.log('getComments commentsArray ' + JSON.stringify(commentsArray));
                        var array = $.map(commentsArray, function (value, index) {
                            return [value];
                        });
                        console.log('getComments array ' + array);
                        var commTest = JSON.stringify(commentsArray);
                        console.log('getComments commTest ' + commTest);
                        var obj = $.parseJSON(commTest);
                        console.log('getComments obj ' + obj);*/
                        /*var arraycommTest = $.map(commTest, function(value, index) {
                        return [value];
                    });
                console.log('getComments arraycommTest ' + arraycommTest);*/
                        //if (!$.isEmptyObject(commentsArray)) {
                        if ($.isArray(commentsArray)) {
                            //console.log('getComments commentsArray not empty');
                            success(commentsArray);
                        } else {
                            //console.log('getComments commentsArray empty');
                            success([]);
                        }
                        //success(array)
                        //success(commTest);
                        //success(obj);
                        //success(arraycommTest)
                    },
                    error: error
                });
            },
            postComment: function (commentJSON, success, error) {
                /*setTimeout(function () {
                    success(saveComment(data));
                }, 500);*/
                console.log("$.fn.jQuery.showcaseComments postComment commentJSON -----> " + JSON.stringify(commentJSON));
                $.ajax({
                    type: 'post',
                    url: 'https://api.vide.me/v2/comments/post/',
                    //data: commentJSON + { \"CVM\": commentJSON, \"articleId\": 'sdf' },
                    data: { 'commentJSON': commentJSON, 'item_id': showcaseCommentsSettings.item_id, 'nad': $.cookie('vide_nad') }, // work
                    //data: { 'commentJSON': commentJSON, 'nad': $.cookie('vide_nad') }, // NOT work
                    //data: { \"CVM\": 'teted', \"articleId\": 'sdf' }, // work
                    //data: commentJSON + {\"articleId\": 'sdf'},
                    //data: commentJSON,
                    success: function(comment) {
                        //--success(comment);
                        success(commentJSON);
                        /*setTimeout(function() {
                success(saveComment(comment));
            }, 500);*/
                        /*success(comment);
                        console.log('comment' + comment);
                        console.log('data' + data);*/
                        //--console.log('postComment comment ' + JSON.stringify(comment));
                        //console.log('postComment commentJSON ' + JSON.stringify(commentJSON));
                        //var commentArray = jQuery.parseJSON(comment);
                        //==var commentArray = $.parseJSON(comment);
                        /*var commentArray= $.map(comment, function(value, index) {
                            return [[index,value]];
                        });

                        console.log(commentArray);*/

                        /*$('#comments-container').comments({
                            profilePictureURL: showcaseCommentsSettings.user_picture,
                            getComments: function(success, error) {

                                //success(comment);
                                //success(JSON.parse(comment));
                                console.log('getComments comment ' + comment);
                                //console.log('getComments commentArray ' + commentArray);
                                success(commentArray);
                                //console.log('getComments comment ' + JSON.parse(comment));

                            }
                        });*/

                    },
                    error: error
                });
            },
            putComment: function (commentJSON, success, error) {
                console.log('putComment data ' + JSON.stringify(commentJSON));
                /*setTimeout(function () {
                    console.log('putComment data ' + JSON.stringify(commentJSON));
                    success(saveComment(commentJSON));
                }, 500);*/
                console.log("$.fn.jQuery.showcaseComments putComment commentJSON -----> " + JSON.stringify(commentJSON));
                $.ajax({
                    type: 'post',
                    url: 'https://api.vide.me/v2/comments/update/',
                    //data: commentJSON,
                    data: { 'commentJSON': commentJSON, 'nad': $.cookie('vide_nad') }, // work
                    success: function(comment) {
                        //success(comment);
                        success(commentJSON);
                    },
                    error: error
                });
            },
            deleteComment: function (commentJSON, success, error) {
                /*setTimeout(function () {
                    success();
                }, 500);*/
                console.log("$.fn.jQuery.showcaseComments deleteComment commentJSON -----> " + JSON.stringify(commentJSON));
                $.ajax({
                    type: 'post',
                    url: 'https://api.vide.me/v2/comments/delete/',
                    //data: commentJSON,
                    //data: { 'commentJSON': commentJSON, 'item_id': showcaseCommentsSettings.item_id, 'nad': $.cookie('vide_nad') }, // work
                    //data: {'comment_id': commentJSON.comment_id, 'nad': $.cookie('vide_nad')},
                    data: { 'commentJSON': commentJSON, 'nad': $.cookie('vide_nad') }, // work
                    success: success,
                    error: error
                });
            },
            upvoteComment: function (commentJSON, success, error) {
                setTimeout(function () {
                    success(data);
                }, 500);
            },
            validateAttachments: function (attachments, callback) {
                setTimeout(function () {
                    callback(attachments);
                }, 500);
            },
        });
    };

    /* 2672022 $.fn.showcaseStars = function (options) {
        showcaseStarsSettings = $.extend({}, options);
        //var stars_count = 0;
        var html = '';
        //if (!$.isEmptyObject(showcaseStarsSettings.stars_count)) stars_count = showcaseStarsSettings.stars_count;
        if (!$.isEmptyObject(showcaseStarsSettings.stars_count)) {
            showcaseStarsSettings.stars_count = showcaseStarsSettings.stars_count;
        } else {
            showcaseStarsSettings.stars_count = 0;
        }
        if (!$.isEmptyObject(showcaseStarsSettings.its_star)) {
            //console.log("$.fn.showcaseStars showcaseStarsSettings.tags -----> " + JSON.stringify(showcaseStarsSettings.tags));
            /!*$(".videme-showcase-stars").html('<div class="btn-group" role="group" aria-label="Stars">\
                    <button type="button" class="btn btn-secondary btn-sm delete_star" stars_count="' + stars_count + '" item_id="' + showcaseStarsSettings.item_id + '"><i id="videme_showcase_stars_icon" class="fa fa-star-o" aria-hidden="true"></i>&nbsp;Unstar</button>\
                    <button type="button" class="btn btn-light btn-sm">' + stars_count + '</button>\
                    </div>');*!/
            /!*html = '<div class="videme_item_info_element">' +
                '<i class="fa fa-star-o btn-link videme_item_info_icon delete_star" stars_count="' + stars_count + '" item_id="' + showcaseStarsSettings.item_id + '" href="#" role="button" aria-hidden="true">' +
                '</i>' +
                '<div class="videme_item_info_val">' + stars_count + '</div>' +
                '</div>';*!/
            html = returnDeleteStarButton(showcaseStarsSettings);
        } else {
            /!*$(".videme-showcase-stars").html('<div class="btn-group" role="group" aria-label="Stars">\
                <button type="button" class="btn btn-secondary btn-sm set_star" stars_count="' + stars_count + '" item_id="' + showcaseStarsSettings.item_id + '"><i id="videme_showcase_stars_icon" class="fa fa-star" aria-hidden="true"></i>&nbsp;Star</button>\
                <button type="button" class="btn btn-light btn-sm videme_showcase_stars_count">' + stars_count + '</button>\
                </div>');*!/
            /!*html = '<div class="videme_item_info_element">' +
                '<i class="fa fa-star btn-link videme_item_info_icon set_star" stars_count="' + stars_count + '" item_id="' + showcaseStarsSettings.item_id + '" href="#" role="button" aria-hidden="true">' +
                '</i>' +
                '<div class="videme_item_info_val">' + stars_count + '</div>' +
                '</div>';*!/
            html = returnSetStarButton(showcaseStarsSettings);
        }
        $(".videme-showcase-stars").html(html);
    };*/

    /* 26072022 $.fn.showcaseStarsV3 = function (options) {
        showcaseStarsV3Settings = $.extend({}, options);
        //console.log("$.fn.showcaseStarsV3 showcaseStarsV3Settings -----> " + JSON.stringify(showcaseStarsV3Settings));
        //var stars_count = 0;
        var html = '';
        //if (!$.isEmptyObject(showcaseStarsSettings.stars_count)) stars_count = showcaseStarsSettings.stars_count;
        if (!$.isEmptyObject(showcaseStarsV3Settings.stars_count)) {
            showcaseStarsV3Settings.stars_count = showcaseStarsV3Settings.stars_count;
        } else {
            showcaseStarsV3Settings.stars_count = 0;
        }
        if (!$.isEmptyObject(showcaseStarsV3Settings.its_star)) {
            //console.log("$.fn.showcaseStars showcaseStarsSettings.tags -----> " + JSON.stringify(showcaseStarsSettings.tags));
            /!*$(".videme-showcase-stars").html('<div class="btn-group" role="group" aria-label="Stars">\
                    <button type="button" class="btn btn-secondary btn-sm delete_star" stars_count="' + stars_count + '" item_id="' + showcaseStarsSettings.item_id + '"><i id="videme_showcase_stars_icon" class="fa fa-star-o" aria-hidden="true"></i>&nbsp;Unstar</button>\
                    <button type="button" class="btn btn-light btn-sm">' + stars_count + '</button>\
                    </div>');*!/
            /!*html = '<div class="videme_item_info_element">' +
                '<i class="fa fa-star-o btn-link videme_item_info_icon delete_star" stars_count="' + stars_count + '" item_id="' + showcaseStarsSettings.item_id + '" href="#" role="button" aria-hidden="true">' +
                '</i>' +
                '<div class="videme_item_info_val">' + stars_count + '</div>' +
                '</div>';*!/
            html = returnDeleteStarButtonV3(showcaseStarsV3Settings);
        } else {
            /!*$(".videme-showcase-stars").html('<div class="btn-group" role="group" aria-label="Stars">\
                <button type="button" class="btn btn-secondary btn-sm set_star" stars_count="' + stars_count + '" item_id="' + showcaseStarsSettings.item_id + '"><i id="videme_showcase_stars_icon" class="fa fa-star" aria-hidden="true"></i>&nbsp;Star</button>\
                <button type="button" class="btn btn-light btn-sm videme_showcase_stars_count">' + stars_count + '</button>\
                </div>');*!/
            /!*html = '<div class="videme_item_info_element">' +
                '<i class="fa fa-star btn-link videme_item_info_icon set_star" stars_count="' + stars_count + '" item_id="' + showcaseStarsSettings.item_id + '" href="#" role="button" aria-hidden="true">' +
                '</i>' +
                '<div class="videme_item_info_val">' + stars_count + '</div>' +
                '</div>';*!/
            html = returnSetStarButtonV3(showcaseStarsV3Settings);
        }
        $(".videme-showcase-stars-v3").html(html);
        //$(".videme-showcase-stars-v3").html(returnSetStarButtonV3(showcaseStarsV3Settings));
    };*/

    $.fn.showcaseFollow = function (options) { // 26072022 ???
        showcaseFollowSettings = $.extend({}, options);
        //var stars_count = 0;

        //$(".videme-showcase-stars").html(html);
        $(".videme-showcase-follow-v3").html(returnSetFollowButtonV3(showcaseFollowSettings));
    };

    /* 27072022 $.fn.showcaseLikes = function (options) {
        showcaseLikesSettings = $.extend({}, options);
        //var likes_count = 0;
        var html = '';
        if (!$.isEmptyObject(showcaseLikesSettings.likes_count)) {
            showcaseLikesSettings.likes_count = showcaseLikesSettings.likes_count;
        } else {
            showcaseLikesSettings.likes_count = 0;
        }
        //if (!$.isEmptyObject(showcaseLikesSettings.stars_count)) likes_count = showcaseLikesSettings.likes_count;
        if (!$.isEmptyObject(showcaseLikesSettings.its_like)) {
            //console.log("$.fn.showcaseLikes showcaseLikesSettings.stars_count -----> " + showcaseLikesSettings.stars_count);
            /!*$(".videme-showcase-likes").html('<div class="btn-group" role="group" aria-label="likes">\
                    <button type="button" class="btn btn-secondary btn-sm delete_like_showcase" likes_count="' + likes_count + '" item_id="' + showcaseLikesSettings.item_id + '"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>&nbsp;Dislike</button>\
                    <button type="button" class="btn btn-light btn-sm">' + likes_count + '</button>\
                    </div>');*!/
            html = returnDeleteLikeButton(showcaseLikesSettings);
        } else {
            /!*$(".videme-showcase-likes").html('<div class="btn-group" role="group" aria-label="likes">\
                <button type="button" class="btn btn-secondary btn-sm set_like_showcase" likes_count="' + likes_count + '" item_id="' + showcaseLikesSettings.item_id + '"><i class="fa fa-thumbs-up" aria-hidden="true"></i>&nbsp;Like</button>\
                <button type="button" class="btn btn-light btn-sm videme_showcase_likes_count">' + likes_count + '</button>\
                </div>');*!/
            html = returnSetLikeButton(showcaseLikesSettings);
        }
        $(".videme-showcase-likes").html(html);
    };*/

    /* 27072022 $.fn.showcaseReposts = function (options) {
        showcaseRepostsSettings = $.extend({}, options);
        //var reposts_count = 0;
        //if (!$.isEmptyObject(showcaseRepostsSettings.reposts_count)) reposts_count = showcaseRepostsSettings.reposts_count;
        //if (!$.isEmptyObject(showcaseRepostsSettings.its_like)) {
        //console.log("$.fn.showcaseReposts showcaseRepostsSettings.reposts_count -----> " + showcaseRepostsSettings.reposts_count);
        /!*$(".videme-showcase-reposts").html('<div class="btn-group" role="group" aria-label="reposts">\
                <button type="button" class="btn btn-secondary btn-sm set_repost_showcase" reposts_count="' + reposts_count + '" item_id="' + showcaseRepostsSettings.item_id + '"><i class="fa fa-retweet" aria-hidden="true"></i>&nbsp;Repost</button>\
                <button type="button" class="btn btn-light btn-sm">' + reposts_count + '</button>\
                </div>');*!/
        /!*} else {
                $(".videme-showcase-likes").html('<div class="btn-group" role="group" aria-label="likes">\
                    <button type="button" class="btn btn-secondary btn-sm set_like_showcase" likes_count="' + likes_count + '" item_id="' + showcaseRepostsSettings.item_id + '"><i class="fa fa-thumbs-up" aria-hidden="true"></i>&nbsp;Like</button>\
                    <button type="button" class="btn btn-light btn-sm videme_showcase_likes_count">' + likes_count + '</button>\
                    </div>');
        }*!/
        if (!$.isEmptyObject(showcaseRepostsSettings.reposts_count)) {
            showcaseRepostsSettings.reposts_count = showcaseRepostsSettings.reposts_count;
        } else {
            showcaseRepostsSettings.reposts_count = 0;
        }
        $(".videme-showcase-reposts").html(returnSetRepostButton(showcaseRepostsSettings));
    };*/

    /* 27072022 $.fn.showcaseShare = function (options) {
        showcaseShareSettings = $.extend({}, options);
        $(".videme-showcase-share").html(returnShareButton(showcaseShareSettings));
        $(".videme-showcase-reposts-v3").html(returnSetRepostButtonV3(showcaseRepostsSettings));
    };*/

    /* 27072022 $.fn.showcaseExtLinks = function (options) { // TODO: why?
        showcaseExtLinksSettings = $.extend({}, options);
        if (!$.isEmptyObject(showcaseExtLinksSettings.ext_links)) {
            console.log("$.fn.showcaseExtLinks showcaseExtLinksSettings.tags -----> " + JSON.stringify(showcaseTagsSettings.ext_links));
            $(".videme-showcase-ext_links-title").removeClass('hidden');

            var element = '';
            array_ext_links2 = $.parseJSON(showcaseExtLinksSettings.ext_links);
            $.each(array_ext_links2, function (key, value) {
                element += "\
<a class=\"badge badge-primary videme-edit-ext_link\" href='" + value.link + "' target='_blank'> " +
                    value.title +
                    "</a>";
            });
            $(".videme-showcase-ext_links").html('&nbsp;' + element); // TODO: add common var
        } else {
            //console.log("$.fn.showcaseText showcaseTextSettings.tags -----> empty");
        }
    };*/

    /* 27072022 $.fn.showcaseUserInfo = function (options) {
        showcaseUserInfoSettings = $.extend({}, options);
        //console.log("$.fn.showcaseUserInfo showcaseUserInfoSettings -----> " + JSON.stringify(showcaseUserInfoSettings));
        //if (showcaseUserInfoSettings.spring.length > 0) {
        if (!$.isEmptyObject(showcaseUserInfoSettings.spring)) {
            $(".videme-showcase-from_user_name").html("<a href='https://vide.me/" + showcaseUserInfoSettings.spring + "'>" + showcaseUserInfoSettings.from_user_name + "</a>");
        } else {
            $(".videme-showcase-from_user_name").html(showcaseUserInfoSettings.from_user_name);
        }
        //if (!$.isEmptyObject(showcaseUserInfoSettings.bio)) $(".videme-showcase-bio").html(showcaseUserInfoSettings.bio);
        //if (!$.isEmptyObject(showcaseUserInfoSettings.country)) $(".videme-showcase-country").html(showcaseUserInfoSettings.country);
        //if (!$.isEmptyObject(showcaseUserInfoSettings.city)) $(".videme-showcase-city").html(showcaseUserInfoSettings.city);
        //$('#nav_form_user_name').html("<a href='" + showcaseUserInfoSettings.spring + "'>" + showcaseUserInfoSettings.from_user_name + "</a>");
        //$('#nav_form_user_email').html(showcaseUserInfoSettings.user_email);
    };*/

    /* 27072022$.fn.ownerSignUserInfo = function (options) { // TODO: remove
        ownerSignUserInfoSettings = $.extend({}, options);
        //console.log("$.fn.ownerSignUserInfo ownerSignUserInfoSettings -----> " + JSON.stringify(ownerSignUserInfoSettings));
        trueUserInfo = paddingUserInfo(ownerSignUserInfoSettings);
        /!*if (!$.isEmptyObject(ownerSignUserInfoSettings.user_cover)) {
            //console.log("$.fn.showcaseUserPicture user_cover.length > 0 -----> " + JSON.stringify(showcaseUserPictureSettings));
            $(".videme-owner-sign-user_cover").attr('src', 'https://s3.amazonaws.com/img.vide.me/' + trueUserInfo.user_cover);
        }*!/
        //==$(".videme-owner-sign-user_cover").attr('src', 'https://s3.amazonaws.com/img.vide.me/' + trueUserInfo.user_cover);
        $('.videme-owner-sign-user_cover').css('background-image', 'url(' + origin_img_vide_me + trueUserInfo.user_cover + ')');
        /!*
        if (!$.isEmptyObject(ownerSignUserInfoSettings.user_picture)) {
            $(".videme-owner-sign-user_picture").attr('src', ownerSignUserInfoSettings.user_picture);
        }*!/
        $(".videme-owner-sign-user_picture").attr('src', origin_img_vide_me + trueUserInfo.user_picture);

        /!*if (!$.isEmptyObject(ownerSignUserInfoSettings.spring)) {
            $(".videme-owner-sign_display_name").html("<a href='https://vide.me/" + ownerSignUserInfoSettings.spring + "'>" + ownerSignUserInfoSettings.user_display_name + "</a>");
        } else {
            $(".videme-owner-sign_display_name").html(ownerSignUserInfoSettings.user_display_name);
        }*!/
        $(".videme-owner-sign_display_name").html("<a href='https://vide.me/" + trueUserInfo.spring + "'>" + trueUserInfo.user_display_name + "</a>");
        //if (!$.isEmptyObject(ownerSignUserInfoSettings.bio)) $(".videme-owner-sign-bio").html(ownerSignUserInfoSettings.bio);
        $(".videme-owner-sign-bio").html(trueUserInfo.bio);
        /!*if (!$.isEmptyObject(ownerSignUserInfoSettings.country)) $(".videme-owner-sign-country").html(
            '<i class="fa fa-globe videme-country-marker"></i>' +
            '<div class="videme-country-name">' + ownerSignUserInfoSettings.country + '</div>'
        );*!/
        $(".videme-owner-sign-country").html(
            '<i class="fa fa-globe videme-country-marker"></i>' +
            '<div class="videme-country-name">' + trueUserInfo.country + '</div>'
        );
        /!*if (!$.isEmptyObject(ownerSignUserInfoSettings.city)) $(".videme-owner-sign-city").html(
            '<i class="fa fa-map-marker videme-city-marker"></i>' +
            '<div class="videme-city-name">' + ownerSignUserInfoSettings.city + '</div>'
        );*!/
        $(".videme-owner-sign-city").html(
            '<i class="fa fa-map-marker videme-city-marker"></i>' +
            '<div class="videme-city-name">' + trueUserInfo.city + '</div>'
        );
        $(".videme-owner-sign-city").html(
            '<i class="fa fa-map-marker videme-city-marker"></i>' +
            '<div class="videme-city-name">' + trueUserInfo.city + '</div>'
        );
        $(".videme-owner-sign-user_link").html(
            '<i class="fa fa-external-link videme-user_link-marker"></i>' +
            '<a class="videme-user_link-name" href="' + trueUserInfo.user_link + '" target="_blank">' + trueUserInfo.user_link + '</a>');
        $(".videme-owner-sign-full-info").html('<a href="https://www.vide.me/' + trueUserInfo.spring + '/?show=about">Full info</a>');
    };*/

    /* 27072022 $.fn.showcaseUserPicture = function (options) {
        showcaseUserPictureSettings = $.extend({}, options);
        //console.log("$.fn.showcaseUserPicture -----> " + JSON.stringify(showcaseUserPictureSettings));
        //if (showcaseUserPictureSettings.user_picture.length > 0) {
        /!*if (!$.isEmptyObject(showcaseUserPictureSettings.user_picture)) {
            //$(".videme-owner-sign-user_picture").attr('src', showcaseUserPictureSettings.user_picture);
            $("#videme_showcase_use_picture").attr('src', "https://s3.amazonaws.com/img.vide.me/" + showcaseUserPictureSettings.user_picture);
        }
        //if (showcaseUserPictureSettings.user_cover.length > 0) {
        if (!$.isEmptyObject(showcaseUserPictureSettings.user_cover)) {
            //console.log("$.fn.showcaseUserPicture user_cover.length > 0 -----> " + JSON.stringify(showcaseUserPictureSettings));
            //$(".videme-owner-sign-user_cover").attr('src', showcaseUserPictureSettings.user_cover);
        }*!/
        //$('#nav_user_brand').attr('src', showcaseUserPictureSettings.user_picture);
        //$('.videme-you-sign-user_picture').attr('src', showcaseUserPictureSettings.user_picture);
        trueUserInfo = paddingUserInfo(showcaseUserPictureSettings);
        //$("#videme_showcase_user_picture").attr('src', "https://s3.amazonaws.com/img.vide.me/" + showcaseUserPictureSettings.user_picture);
        $('.videme-owner-sign-user_cover').css('background-image', 'url(' + origin_img_vide_me + trueUserInfo.user_cover + ')');
    };*/
    $.fn.showcaseTagsConfCountIcon = function (options) { // TODO: add trueItemInfo.user_tags_conf_new (not working) 27072022
        showcaseTagsConfCountIconSettings = $.extend({}, options);
        //console.log("$.fn.showcaseTagsConfCountIcon -----> " + JSON.stringify(showcaseTagsConfCountIconSettings));
        trueItemInfo = paddingUserInfo(showcaseTagsConfCountIconSettings);
        if (!$.isEmptyObject(trueItemInfo.user_tags_conf_new)) {
            if (trueItemInfo.user_tags_conf_new > 0) {
                $('#videme-v3-spring-activity_tags_confirmed_label_place_top').removeClass('hidden');
                //$('#videme-v3-spring-activity_tags_confirmed_label_place').removeClass('hidden');
                //$('.spring_activity_tags_confirmed_label').attr("href", "https://www.vide.me/" + url.spring + "/?show=tags_conf");
                $('.spring_activity_tags_confirmed_value').html('+' + trueItemInfo.user_tags_conf_new);
            }
        }
    };


    /*function getAuthorizedData (handleData) { // Избыточно
        /!*getAuthorizedDataSettings = $.extend({
         url: "https://api.vide.me/user/info/?videmecallback=?",
         data: ""
         }, options);*!/
        if ($.cookie('vide_nad')) {
            var result = "";

            /!*            /!*$.getJSON("https://api.vide.me/user/info/?videmecallback=?",
             function (data) { // TODO: check return data
             console.log("user/info authorizedData -----> " + JSON.stringify(data));
             authorizedData = data;

             }
             );*!/
             /!*Волшебное использование куки ===============================================*!/
             //console.log("vide_nad -----> " + $.cookie('vide_nad'));
             //$('#nad').val($.cookie('vide_nad'));
             /!*============================================================================*!/
             //var result = null;
             var result = "";
             //return $.ajax({
             //return Promise.resolve($.ajax({
             //return Q($.ajax({
             $.ajax({
             async: false,
             type: 'GET',
             url: "https://api.vide.me/user/info/?videmecallback=?",
             data: "",
             dataType: "json",
             success: function(data){
             console.log("getAuthorizedData data -----> " + JSON.stringify(data));
             result = data;
             //return data;
             //return result;
             //handleData(data);
             },
             error: function(xhr, status, error) {
             //alert(status);
             }
             });
             //console.log("$.fn.getAuthorizedData result -----> " + JSON.stringify(result));
             //return result;
             //return "Ok";*!/

            $.get( "https://api.vide.me/user/info/?videmecallback=?", function( data ) {
                /!*$( "body" )
                 .append( "Name: " + data.name ) // John
                 .append( "Time: " + data.time ); //  2pm*!/
                result = data;
            }, "json" );
        }
        return result;


    }

    function Check_production(order_number){

        var result = false;
        $.ajax({
            url: "https://api.vide.me/user/info/?videmecallback=?",
            cache: false,
            async: false,
            //data: {zakaz_number:zakaz_number},
            type: 'POST',
            dataType: "json",
            success: function(data){
                /!*if (data == "true"){
                 result = true;
                 }else {
                 result = false;
                 }*!/
                console.log("getAuthorizedData data -----> " + JSON.stringify(data));
                result = data;
                //return data;
                //result = JSON.stringify(data);
                //return JSON.stringify(data);
            }
        });

        return result;

    }

    function SomethingInit(id){

        this.init = function(id) {
            // Загрузка с сервера информации
            this.load(id).done(function() {
                // ... здесь продолжается инициализация ...
                console.log("продолжаем после успешного запроса");
            }).fail(function(message) {
                console.log('ошибка..')
            });
        };

        this.load=function(teamId){
            var dfr = $.Deferred();
            console.log('посылаем запрос');
            $.ajax({
                dataType: "json",
                url: 'https://api.vide.me/user/info/?videmecallback=?',
                success: function(response, status, jqXHR){ dfr.resolve();},
                error: function(jqXHR, status, error) { dfr.reject() ; }
            });
            console.log("SomethingInit dfr -----> " + JSON.stringify(dfr));

            return dfr; //dfr.promise();
        };

        this.init();

    }*/

    /* 27072022 $.fn.showcaseButton = function (options) {
        showcaseButtonSettings = $.extend({}, options);
        //console.log("$.fn.showcaseButton showcaseButtonSettings -----> " + JSON.stringify(showcaseButtonSettings));
        // For reply button


        if (showcaseButtonSettings.showcaseButton['reply-toggle']) {
            console.log("$.fn.showcaseButton showcaseButtonSettings.conferenceId -----> " + showcaseButtonSettings.conferenceId);

            //var rec = jQuery.parseJSON(showcaseButtonSettings.recipients);
            //console.log("$.fn.showcaseButton showcaseButtonSettings.recipients[0] stringify -----> " + rec[0]);
            //var emails = "";
            /!*rec.forEach(function(item, i, arr) {
                console.log( i + ": " + item + " (массив:" + arr + ")" );
                var numEmail = i + 1;
                if (numEmail == 1) numEmail = "";
                //console.log("&email" + numEmail + "=" + item);
                emails += "&email" + numEmail + "=" + item;
            });*!/

            //console.log("$.fn.showcaseButton emails -----> " + emails);

            /!*var authorizedData2 = $.fn.getAuthorizedData(); // TODO: Убрать повторное использование

            //console.log("$.fn.showcaseButton authorizedData.userEmail -----> " + authorizedData.userEmail); ////////// =======================
            console.log("$.fn.showcaseButton JSON.stringify(authorizedData) -----> " + JSON.stringify(authorizedData2)); ////////// =======================
            var myEmailKey = jQuery.inArray(authorizedData2.userEmail, rec);
            console.log("$.fn.showcaseButton myEmailKey -----> " + myEmailKey);
                rec[myEmailKey] = rec[0];
            rec[0] = authorizedData.userEmail;

            console.log("$.fn.showcaseButton rec -----> " + rec);*!/
            //var authorizedData = $.fn.getAuthorizedData(); // TODO: Убрать повторное использование
            //var authorizedData = Check_production(); // TODO: Убрать повторное использование
            //var authorizedData = SomethingInit(); // TODO: Убрать повторное использование
            //var authorizedData = getAuthorizedData(); // TODO: Убрать повторное использование

            //console.log("$.fn.showcaseButton authorizedData.userEmail -----> " + authorizedData.userEmail); ////////// =======================
            //console.log("$.fn.showcaseButton JSON.stringify(authorizedData) -----> " + JSON.stringify(authorizedData)); ////////// =======================
            //console.log("$.fn.showcaseButton rec Old -----> " + rec);

            console.log("$.fn.showcaseButton showcaseButtonSettings.toUserName -----> " + showcaseButtonSettings.toUserName);
            console.log("$.fn.showcaseButton showcaseButtonSettings.fromUserName -----> " + showcaseButtonSettings.fromUserName);
            var emails = "";
            var hrefConferenceId = "";
            var hrefMessageId = "";
            var hrefSubject = "";
            console.log("$.fn.showcaseButton showcaseButtonSettings.recipients.length -----> " + showcaseButtonSettings.recipients);
            var recipients = showcaseButtonSettings.recipients;

            //error if (showcaseButtonSettings.recipients.length.isArray) {
            if (!$.isEmptyObject(recipients)) {

                var rec = $.parseJSON(showcaseButtonSettings.recipients);

                // Поставить в recipients вместо своего адреса адрес отправителя
                var myEmailKey = $.inArray(showcaseButtonSettings.from_user_display_name, rec);
                console.log("$.fn.showcaseButton myEmailKey -----> " + myEmailKey);
                rec[myEmailKey] = showcaseButtonSettings.user_email;
                //rec[0] = showcaseButtonSettings.toUserName;

                console.log("$.fn.showcaseButton rec New -----> " + rec);

                rec.forEach(function (item, i, arr) {
                    console.log(i + ": " + item + " ($.fn.showcaseButton rec массив:" + arr + ")");
                    var numEmail = i + 1;
                    if (numEmail == 1) numEmail = "";
                    console.log("$.fn.showcaseButton rec &email" + numEmail + "=" + item);
                    emails += "&email" + numEmail + "=" + item;
                });
                console.log("$.fn.showcaseButton emails -----> " + emails);
            } else {
                emails += "&email=" + showcaseButtonSettings.user_email;

            }

            if (showcaseButtonSettings.conferenceId) {
                hrefMessageId = "&conferenceid=" + showcaseButtonSettings.conferenceId;
            } else {
                hrefMessageId = "";
            }

            if (showcaseButtonSettings.messageid) {
                hrefConferenceId = "&inreplyto=" + showcaseButtonSettings.messageid;
            } else {
                hrefConferenceId = "";
            }

            if (showcaseButtonSettings.subject) {
                hrefSubject = "&subject=" + showcaseButtonSettings.subject;
            } else {
                hrefSubject = "";
            }

            $(".reply-toggle").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['reply-toggle']);
            $(".reply-toggle").attr("href", "https://vide.me/rec/?" + emails + hrefConferenceId + hrefMessageId + hrefSubject);

        }
        if (showcaseButtonSettings.showcaseButton['contact-toggle']) $("#contact-toggle-showcase").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['contact-toggle']);
        if (showcaseButtonSettings.showcaseButton['share-toggle']) $(".share-toggle").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['share-toggle']);
        if (showcaseButtonSettings.showcaseButton['list-toggle']) $("#list-toggle-showcase").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['list-toggle']); // TODO: why?
        //if (showcaseButtonSettings.showcaseButton['del-inbox-toggle']) $(".del-inbox-toggle").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['del-inbox-toggle']);
        //if (showcaseButtonSettings.showcaseButton['del-sent-toggle']) $(".del-sent-toggle").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['del-sent-toggle']);
        //if (showcaseButtonSettings.showcaseButton['del-my-toggle']) $(".del-my-toggle").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['del-my-toggle']); // TODO: remove
        if (showcaseButtonSettings.showcaseButton['item-edit-toggle']) $("#item-edit-toggle-showcase").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['item-edit-toggle']);
        if (showcaseButtonSettings.showcaseButton['del-sharefile-toggle']) $(".del-sharefile-toggle").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['del-sharefile-toggle']);
        if (showcaseButtonSettings.showcaseButton['fb-send-message']) $(".fb-send-message").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['fb-send-message']);
    };*/

    // TODO: Можно убрать
    /* 27072022 $.fn.disabledButton = function (options) {
        disabledButtonSettings = $.extend({
            button: 'submit'
        }, options);
        $(this).html(VidemeProgress);
        return this.each(function () {
            console.log("disabled: ");
            $('#' + disabledButtonSettings.button).removeAttr('disabled');
        });
    };*/

    /* 26072022 $.fn.showcaseVideoTextButton = function (options) {
        showcaseVideoTextButtonSettings = $.extend({}, options);
        //console.log("$.fn.videme-showcase-user_picture showcaseVideoTextButtonSettings -----> " + JSON.stringify(showcaseVideoTextButtonSettings));
        $.fn.showcaseVideo(showcaseVideoTextButtonSettings);
        //$.fn.ownerSignUserInfo(showcaseVideoTextButtonSettings);
        $.fn.showcaseUserPicture(showcaseVideoTextButtonSettings);
        //$.fn.showcaseUserInfo(showcaseVideoTextButtonSettings);
        //$.fn.showcaseText(showcaseVideoTextButtonSettings); // TODO: why?
        $(".videme_showcase_item_info").html(showItemInfoShowcase(showcaseVideoTextButtonSettings));
        $.fn.showcaseStars(showcaseVideoTextButtonSettings);
        $.fn.showcaseLikes(showcaseVideoTextButtonSettings);
        $.fn.showcaseReposts(showcaseVideoTextButtonSettings);
        //$.fn.showcaseShare(showcaseVideoTextButtonSettings);
        $.fn.showcaseTags(showcaseVideoTextButtonSettings);
        $('.show_comment_showcase').attr('item_id', showcaseVideoTextButtonSettings.item_id);
        //$.fn.showcaseExtLinks(showcaseVideoTextButtonSettings);
        //$.fn.showcaseButton(showcaseVideoTextButtonSettings);
    };*/
    $.fn.showcaseVideoTextButtonV3 = function (options) { // 26072022
        showcaseVideoTextButtonSettings = $.extend({}, options);
        //console.log("$.fn.videme-showcase-user_picture showcaseVideoTextButtonSettings -----> " + JSON.stringify(showcaseVideoTextButtonSettings));
        //console.log("$.fn.showcaseVideoTextButtonV3 showcaseVideoTextButtonSettings -----> " + JSON.stringify(showcaseVideoTextButtonSettings));
        //$.fn.showcaseVideo(showcaseVideoTextButtonSettings);
        if (showcaseVideoTextButtonSettings.type == 'video' || showcaseVideoTextButtonSettings.type == 'videoEmail') {
            //$.fn.showcaseVideoV3Static(showcaseVideoTextButtonSettings);
            require(['videme_video_player'], function(videme_video_player) {
                videme_video_player.videmeVideoPlayerInit(showcaseVideoTextButtonSettings);
            });
        }
        if (showcaseVideoTextButtonSettings.type == 'image') {
            $.fn.showcaseImageV3Static(showcaseVideoTextButtonSettings);
        }
        //if (showcaseVideoTextButtonSettings.type == 'article') {
        if (showcaseVideoTextButtonSettings.type == 'article' && showcaseVideoTextButtonSettings.action_url_class == 'videme-v3-my-item-url') {
            $.fn.showcaseArticleV3Static(showcaseVideoTextButtonSettings);
        }
        if (showcaseVideoTextButtonSettings.type == 'event' && showcaseVideoTextButtonSettings.action_url_class == 'videme-v3-my-item-url') {
            //window.location = 'https://www.vide.me/web/my_event/?item=' + showcaseVideoTextButtonSettings.item_id;
        }
        //$.fn.ownerSignUserInfo(showcaseVideoTextButtonSettings);
        //$.fn.showcaseUserPicture(showcaseVideoTextButtonSettings); // TODO: why for?
        $.fn.showcaseTagsConfCountIcon(showcaseVideoTextButtonSettings); // TODO: add trueItemInfo.user_tags_conf_new (not orking)
        //$.fn.showcaseUserInfo(showcaseVideoTextButtonSettings);
        //$.fn.showcaseText(showcaseVideoTextButtonSettings); // TODO: why?
        $(".videme_showcase_item_info").html(showItemInfoShowcase(showcaseVideoTextButtonSettings));
        //$.fn.showcaseStarsV3(showcaseVideoTextButtonSettings);
        $.fn.showcaseFollow(showcaseVideoTextButtonSettings);
        //$.fn.showcaseLikes(showcaseVideoTextButtonSettings);
        //==$.fn.showcaseReposts(showcaseVideoTextButtonSettings); // TODO: return
        //$.fn.showcaseShare(showcaseVideoTextButtonSettings);
        //$.fn.showcaseTags(showcaseVideoTextButtonSettings);
        $.fn.showItemTagsUsers(showcaseVideoTextButtonSettings);
        $.fn.showItemPartnersUsers(showcaseVideoTextButtonSettings);
        $.fn.showItemPartnerSign(showcaseVideoTextButtonSettings);
        $('.show_comment_showcase').attr('item_id', showcaseVideoTextButtonSettings.item_id);
        $('.show_action_button_showcase').html(showDropdownForDoorbelSignV3(showcaseVideoTextButtonSettings));
        //$.fn.showcaseExtLinks(showcaseVideoTextButtonSettings);
        //$.fn.showcaseButton(showcaseVideoTextButtonSettings);
    };

    /* 26072022 $.fn.showcaseItemInfoTags = function (options) {
        showcaseItemInfoTagsSettings = $.extend({}, options);
        //console.log("$.fn.videme-showcase-user_picture showcaseVideoTextButtonSettings -----> " + JSON.stringify(showcaseVideoTextButtonSettings));
        //$.fn.showcaseVideo(showcaseVideoTextButtonSettings);
        //$.fn.ownerSignUserInfo(showcaseVideoTextButtonSettings);
        //$.fn.showcaseUserPicture(showcaseVideoTextButtonSettings);
        //$.fn.showcaseUserInfo(showcaseVideoTextButtonSettings);
        //$.fn.showcaseText(showcaseVideoTextButtonSettings); // TODO: why?
        $(".videme_showcase_item_info").html(showItemInfo(showcaseItemInfoTagsSettings));
        $.fn.showcaseTags(showcaseItemInfoTagsSettings);
        //$.fn.showcaseExtLinks(showcaseVideoTextButtonSettings);
        //$.fn.showcaseButton(showcaseVideoTextButtonSettings);
    };*/

    /* 26072022 $.fn.showcaseVideoTextButtonTest05022019 = function (options) {
        showcaseVideoTextButtonSettings = $.extend({}, options);
        $.fn.showcaseVideoTest05022019(showcaseVideoTextButtonSettings);
        $.fn.showcaseUserPicture(showcaseVideoTextButtonSettings);
        $.fn.showcaseText(showcaseVideoTextButtonSettings);
        $.fn.showcaseButton(showcaseVideoTextButtonSettings);
    };*/

    /* 26072022 $.fn.showcaseVideoTextButtonAds = function (options) {
        showcaseVideoTextButtonSettings = $.extend({}, options);
        console.log("$.fn.showcaseVideoTextButton showcaseVideoTextButtonSettings -----> " + JSON.stringify(showcaseVideoTextButtonSettings));
        $.fn.showcaseVideoAds(showcaseVideoTextButtonSettings);
        $.fn.showcaseText(showcaseVideoTextButtonSettings);
        $.fn.showcaseButton(showcaseVideoTextButtonSettings);
    };*/
    /*

        $.fn.showNewArticle = function (options) {
            showNewArticleSettings = $.extend({
                showcase: 'videme-new-article-bottom',
                limit: 3
            }, options);
            if ($(this).length) {
                console.log("$.fn.showNewArticle $(this) -----> yes " + $(this).length);
                var tempObject = $(this);
            } else {
                console.log("$.fn.showNewArticle $(this) -----> nooo! " + $(this).length);
                var tempObject = $(showNewArticleSettings.showcase);
            }
            console.log("$.fn.showNewArticle tempObject -----> " + tempObject.length);
            tempObject.html(VidemeProgress);        return this.each(function () {
                var tempObject = $(this);
                $.getJSON("https://api.vide.me/article/shownew/?limit=" + showNewArticleSettings.limit + "&videmecallback=?",
                    function (data) {
                        tempObject.html($.fn.showArticleTile({
                            showArticleTile: parseArticleShowNew(data),
                            tempObject: tempObject,
                            button: "new"
                        }));
                    })
                    .done(function () {
                    })
                    .fail(function (data) {
                        tempObject.html(showError(data));
                    })
                    .always(function () {
                    });
            });
        };
    */

    /* 26072022 $.fn.showSearchArticle = function (options) { // TODO: Remove
        showSearchArticleSettings = $.extend({
            limit: 3,
            showcaseSearchArticle: "#videme-search-article-tile"
        }, options);
        //$(this).html(VidemeProgress);
        //return this.each(function () {
        //var tempObject = $(this);
        if ($(this).length) {
            console.log("$.fn.showSearchArticle $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.showSearchArticle $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showSearchArticleSettings.showcaseSearchArticle);
        }
        console.log("$.fn.showSearchArticle tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        var start_time = performance.now();
        $.getJSON("https://api.vide.me/article/search/?q=" + showSearchArticleSettings.q + "&limit=" + showSearchArticleSettings.limit + "&videmecallback=?",
            function (data) {
                var response_time = Math.round(performance.now() - start_time);
                //console.log('doTasks took ' + response_time + ' milliseconds to execute.');
                //$('#article-search-result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                $(showSearchArticleSettings.showcaseResultResponse).append('<small>API response time: ' + response_time + ' milliseconds. ' + data.length + ' items. </small>');
                if (data) {
                    tempObject.html($.fn.showArticleTile({
                        showArticleTile: parseSearchArticle(data),
                        tempObject: tempObject,
                        button: "new"
                    }));
                    /!*console.log("$.fn.showSearchArticle parseSearchArticle -----> " + $.fn.showArticleTile({
                        showArticleTile: parseSearchArticle(data),
                        tempObject: tempObject,
                        button: "new"
                    }));*!/

                } else {
                    console.log("$.fn.showSearchArticle data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function () {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/

    $.fn.showSearchPeoples = function (options) { // 26072022
        showSearchPeoplesSettings = $.extend({
            limit: 3,
            showcaseResultSearchPeoples: ".videme-search-peoples-tile"
        }, options);
        if ($(this).length) {
            var tempObject = $(this);
        } else {
            var tempObject = $(showSearchPeoplesSettings.showcaseResultSearchPeoples);
        }
        tempObject.html(VidemeProgress);
        //var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/user/search/?q=" + showSearchPeoplesSettings.q + "&limit=" + showSearchPeoplesSettings.limit + "&videmecallback=?",
            function (data) {
                //var response_time = Math.round(performance.now() - start_time);
                //$(showSearchItemByTextSettings.showcaseResultResponse).append('<small>API response time: ' + response_time + ' milliseconds. ' + data.length + ' items. </small>');
                if (!$.isEmptyObject(data)) {
                    tempObject.parent().toggleClass('hidden');
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parseSearchPeoplesForDoorbellSign(data), tempObject
                        )
                    );
                } else {
                    //tempObject.html("No results");
                    //$('.pioples-search-title').addClass('hidden');
                }
            })
            .done(function () {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    $.fn.showSearchEssences = function (options) { // 26072022
        showSearchEssencesSettings = $.extend({
            limit: 3,
            showcaseResultSearchEssences: ".videme-search-essences-tile"
        }, options);
        if ($(this).length) {
            var tempObject = $(this);
        } else {
            var tempObject = $(showSearchEssencesSettings.showcaseResultSearchEssences);
        }
        tempObject.html(VidemeProgress);
        //var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/essences/search/?q=" + showSearchEssencesSettings.q + "&limit=" + showSearchEssencesSettings.limit + "&videmecallback=?",
            function (JSONdata) {
                //var response_time = Math.round(performance.now() - start_time);
                //$(showSearchItemByTextSettings.showcaseResultResponse).append('<small>API response time: ' + response_time + ' milliseconds. ' + data.length + ' items. </small>');
                //console.log("$.fn.showSearchEssences -----> data " + JSON.stringify(JSONdata));
                if (!$.isEmptyObject(JSONdata)) {
                    tempObject.parent().removeClass('hidden');
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parseSearchEssencesForDoorbellSign(JSONdata), tempObject
                        )
                    );
                } else {
                    tempObject.parent().removeClass('hidden');
                    tempObject.html("No results");
                    //$('.pioples-search-title').addClass('hidden');
                }
            })
            .done(function () {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    $.fn.showSearchUsersForPartners = function (options) { // 26072022
        showSearchPartnersSettings = $.extend({
            limit: 3,
            showcaseResultSearchPartners: ".videme-search-partners-tile"
        }, options);
        if ($(this).length) {
            var tempObject = $(this);
        } else {
            var tempObject = $(showSearchPartnersSettings.showcaseResultSearchPartners);
        }
        tempObject.html(VidemeProgress);
        //var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/user/search/?q=" + showSearchPartnersSettings.q + "&limit=" + showSearchPartnersSettings.limit + "&videmecallback=?",
            function (JSONdata) {
                //var response_time = Math.round(performance.now() - start_time);
                //$(showSearchItemByTextSettings.showcaseResultResponse).append('<small>API response time: ' + response_time + ' milliseconds. ' + data.length + ' items. </small>');
                //console.log("$.fn.showSearchEssences -----> data " + JSON.stringify(JSONdata));
                if (!$.isEmptyObject(JSONdata)) {
                    JSONdata['item_id'] = showSearchPartnersSettings.item_id;
                    tempObject.parent().removeClass('hidden');
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parseSearchPartnersItemsForDoorbellSign(JSONdata), tempObject
                        )
                    );
                } else {
                    tempObject.parent().removeClass('hidden');
                    tempObject.html("No results");
                    //$('.pioples-search-title').addClass('hidden');
                }
            })
            .done(function () {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /* 26072022$.fn.showSearchItemByText = function (options) {
        showSearchItemByTextSettings = $.extend({
            limit: 3,
            showcaseSearchArticle: "#videme-search-items-tile"
        }, options);
        if ($(this).length) {
            var tempObject = $(this);
        } else {
            var tempObject = $(showSearchItemByTextSettings.showcaseSearchArticle);
        }
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/posts/search/?q=" + showSearchItemByTextSettings.q + "&limit=" + showSearchItemByTextSettings.limit + "&videmecallback=?",
            function (data) {
                if (!$.isEmptyObject(data)) {
                    tempObject.parent().toggleClass('hidden');
                    var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
                    tempObject.html("<ul class='list-group' id='" + id_list_group + "'></ul>");
                    showTileMultipleLI(parseDataArrayToObject(data), id_list_group, 'showmulti', 0);
                } else {
                    //console.log("$.fn.showSearchItemByText No results" + $(this).length);
                    tempObject.parent().toggleClass('hidden');
                    tempObject.html("<ul class='list-group' id='" + id_list_group + "'><li class='list-group-item'>Nothing found for <b>" + showSearchItemByTextSettings.q + "</b></li></ul>");
                    //tempObject.html("No results");
                }
            })
            .done(function () {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/

    /* 26072022 $.fn.showSearchItemByTextScrollV3 = function (options) {
        console.log("$.fn.showSearchItemByTextScrollV3 -----> ok");
        showSearchItemByTextScrollV3Settings = $.extend({
            limit: 16,
            showcaseVideo: "#videme-search-items-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileInbox $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileInbox $(this) -----> nooo! " + $(this).length);
            var tempObject = $(itemsMyVideosScrollV3Settings.showcaseVideo);
        }
        console.log("$.fn.showSearchItemByTextScrollV3 tempObject -----> " + tempObject.length);
        //tempObject.html(VidemeProgress);
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        var limit = showSearchItemByTextScrollV3Settings.limit;
        //var itemsData = true;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //tempObject.html("<ul class='list-group' id='" + id_list_group + "'></ul>");
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileV3(emptyDataSearchItemByText,
            //"https://api.vide.me/v2/items/my/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            "https://api.vide.me/v2/posts/search/?q=" + showSearchItemByTextScrollV3Settings.q + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'showmulti',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.showSearchItemByTextScrollV3 onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileV3(emptyDataSearchItemByText,
                    "https://api.vide.me/v2/posts/search/?q=" + showSearchItemByTextScrollV3Settings.q + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'showmulti',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
    };*/

    /* 26072022 $.fn.showSearchItemByTextScrollV4landscape = function (options) {
        console.log("$.fn.showSearchItemByTextScrollV4landscape -----> ok");
        showSearchItemByTextScrollV3Settings = $.extend({
            limit: 16,
            showcaseVideo: "#videme-search-items-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileInbox $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileInbox $(this) -----> nooo! " + $(this).length);
            var tempObject = $(itemsMyVideosScrollV3Settings.showcaseVideo);
        }
        console.log("$.fn.showSearchItemByTextScrollV3 tempObject -----> " + tempObject.length);
        //tempObject.html(VidemeProgress);
        var li = 1;
        var win = $(window);
        var getItemOpt = [];
        var offset = 0;
        //var limit = 4;
        var limit = showSearchItemByTextScrollV3Settings.limit;
        //var itemsData = true;
        var id_list_group = 'list-group_' + Math.floor(Math.random() * 100);
        //tempObject.html("<ul class='list-group' id='" + id_list_group + "'></ul>");
        //tempObject.append("<ul class='list-group' id='" + id_list_group + "'></ul><i class=\"videme_tile_loading fa fa-circle-o-notch fa-spin hidden\"></i>");

        videmeUI.doGetJSONTileV3(emptyDataSearchItemByText,
            //"https://api.vide.me/v2/items/my/?offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            "https://api.vide.me/v2/posts/search/?q=" + showSearchItemByTextScrollV3Settings.q + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
            id_list_group,
            'landscape',
            offset,
            tempObject);
        offset = offset + limit;

        win.scroll(function () {
            onScroll();
        });
        $(document.body).on('touchmove', onScroll()); // for mobile
        function onScroll(){
            if( $(window).scrollTop() + window.innerHeight >= document.body.scrollHeight ) {
                console.log("$.fn.showSearchItemByTextScrollV3 onScroll");
                eventScroll();
                $('.videme-scroll-progress').html(VidemeProgress);
                videmeUI.doGetJSONTileV3(emptyDataSearchItemByText,
                    "https://api.vide.me/v2/posts/search/?q=" + showSearchItemByTextScrollV3Settings.q + "&offset=" + offset + "&limit=" + limit + "&videmecallback=?",
                    id_list_group,
                    'landscape',
                    offset,
                    tempObject);
                offset = offset + limit;
            }
        }
        //tempObject.html(showTileTasks(parseMyTaskForDoorbellSign(data), tempObject));

    };*/

    /* 26072022 $.fn.showPopTags = function (options) {
        showMostPopTagsSettings = $.extend({
            /!*limit: 3,*!/
            showcaseMostPopTags: "#videme-pop-tags"
        }, options);
        //$(this).html(VidemeProgress);
        //return this.each(function () {
        //var tempObject = $(this);
        if ($(this).length) {
            //console.log("$.fn.showPopTags $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showPopTags $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showMostPopTagsSettings.showcaseMostPopTags);
        }
        //console.log("$.fn.showPopTags tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        var html = [];
        //==var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/posts/show_pop_tags/?videmecallback=?",
            function (data) {
                //console.log("$.fn.showPopTags getJSON -----> " + JSON.stringify(data));
                //console.log("$.fn.showPopTags getJSON data.tags -----> " + JSON.stringify(data.tags));
                //==var response_time = Math.round(performance.now() - start_time);
                //console.log('doTasks took ' + response_time + ' milliseconds to execute.');
                //==$(showMostPopTagsSettings.showcaseResultResponse).append('<p><small>API response time: ' + response_time + ' milliseconds</small></p>');
                //if (data.tags) {
                if (!$.isEmptyObject(data)) {
                    //console.log("$.fn.showPopTags data.tags -----> yes");

                    //$.each(data.tags, function (key, value) {
                    $.each(data, function (key, value) {
                        //console.log("$.fn.showPopTags data.tags -----> cnt: " + value.cnt + " tag " + value.tag);
                        //console.log("$.fn.showPopTags each value -----> " + JSON.stringify(value));
                        //html.push("<a href=\"https://www.vide.me/search/?q=" + value.tag + "\" class=\"badge badge-light\"> " + value.tag + " </a> ");
                        html.push("<a href=\"https://www.vide.me/search/?q=" + value.tag + "\" class=\"h5\">#" + value.tag + " </a> ");
                    });
                    tempObject.html(html);
                } else {
                    //console.log("$.fn.showPopTags data.tags -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function () {
            })
            .fail(function (data) {
                tempObject.html(showError(data)); // TODO: Not worked
            })
            .always(function () {
            });
    };*/

    /* 26072022 $.fn.showMyArticle = function (options) {
        /!*articleShowMySettings = $.extend({
            limit: 12
        }, options);
        $(this).html(VidemeProgress);
        //return this.each(function () {
        var tempObject = $(this);
        $.getJSON("https://api.vide.me/v2/items/my_article/?limit=" + articleShowMySettings.limit + "&videmecallback=?",
            function (data) {
                tempObject.html($.fn.showArticleTile({
                    showArticleTile: parseArticleShowNew(data),
                    tempObject: tempObject,
                    button: "own"
                }));
            })
            .done(function () {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
        //});*!/

        articleShowMySettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.fileMy $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileMy $(this) -----> nooo! " + $(this).length);
            var tempObject = $(articleShowMySettings.showcaseVideo);
        }
        console.log("$.fn.fileMy tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/items/my_article/?limit=" + articleShowMySettings.limit + "&videmecallback=?",
            function (data) {
                var response_time = Math.round(performance.now() - start_time);
                $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (data) {
                    //console.log("$.fn.fileMy data -----> yes" + JSON.stringify(data));
                    tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "file-my-url"));
                    //$.fn.showcaseVideoTextButton(paddingButtonMy(data[0]));
                } else {
                    console.log("$.fn.fileMy data -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/

    /* 26072022 $.fn.showMyArticleDraft = function (options) {
        articleShowMyDraftSettings = $.extend({
            limit: 12
        }, options);
        $(this).html(VidemeProgress);
        //return this.each(function () {
        var tempObject = $(this);
        $.getJSON("https://api.vide.me/article/mydraft/?limit=" + articleShowMyDraftSettings.limit + "&videmecallback=?",
            function (data) {
                tempObject.html($.fn.showArticleTile({
                    showArticleTile: parseArticleShowNew(data),
                    tempObject: tempObject,
                    button: "own"
                }));
            })
            .done(function () {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
        //});
    };*/

    /* 26072022 $.fn.showCountUserArticle = function (options) {
        showCountUserArticle = $.extend({
            limit: 100,
            showcaseCount: "#videme-count-user-article"
        }, options);
        if ($(this).length) {
            console.log("$.fn.showCountUserArticle $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.showCountUserArticle $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showCountUserArticle.showcaseCount);
        }
        if (showCountUserArticle.spring) {
            console.log("$.fn.showCountUserArticle $(this) -----> showCountUserArticle.spring " + showCountUserArticle.spring);
            tempObject.html(VidemeProgress);
            $.getJSON("https://api.vide.me/article/byuser/?spring=" + showCountUserArticle.spring + "&limit=" + showCountUserArticle.limit + "&videmecallback=?",
                function (obj) {
                    if (obj.length) {
                        console.log("$.fn.showCountUserArticle data -----> yes" + obj.length);
                        tempObject.html(obj.length);
                    } else {
                        console.log("$.fn.showCountUserArticle data -----> no");
                        tempObject.html("No Article");
                    }
                })
                .done(function (data) {
                })
                .fail(function (data) {
                    tempObject.html("Error");
                })
                .always(function () {
                });
        } else {
            tempObject.append("No spring");
        }
    };*/


    /* 26072022 $.fn.showTileButton = function (options) {
        showTileButtonSettings = $.extend({}, options);
        console.log("$.fn.showTileButton ----->  start");
        //$(this).html(VidemeProgress);
        //var tempObject = $(this);

        //return this.each(function () {
        console.log("$.fn.showTileButton showTileButtonSettings.button -----> " + showTileButtonSettings.button);
        //var tempObject = $(this);
        //var button = [];
        switch (showTileButtonSettings.button) {
            case 'own':
                console.log("$.fn.showTileButton showTileButtonSettings.button -----> case \"own\"");
                button = "\
                        <div class=\"videme-article-down\">\
                        <a class=\"btn btn-default\" href=\"https://vide.me/article/update/html/?article=" + showTileButtonSettings.article + "\" role=\"button\">Edit</a>\
                        </div>\
		 	        ";
                break;
            case 'new':
                // share button
                button = " ";
                break;
            default:
                //console.log("Sorry, we are out of " + expr + ".");
                button = " ";
        }
        //});
        //console.log("$.fn.showTileButton button -----> " + button);
        //return tempObject;
        return button;
    };*/

    /* 26072022 $.fn.showArticleTile = function (options) {
        showArticleSettings = $.extend({}, options);
        // TODO: при развороте на большой экран маленькие артикли становятся очень маленькими
        console.log("$.fn.showArticle showArticleSettings.tempObject.width() -----> " + showArticleSettings.tempObject.width());
        if (showArticleSettings.tempObject.width() < 580) {
            var tempObjectClass = " videme-narrow-tile";
        } else {
            var tempObjectClass = "";
        }
        //console.log("$.fn.showArticle showArticleSettings.button -----> " + showArticleSettings.button);
        var html = [];
        var button = $.fn.showTileButton(showArticleSettings);
        console.log("$.fn.showArticle showArticleSettings.showArticleTile -----> " + JSON.stringify(showArticleSettings.showArticleTile));

        $.each(showArticleSettings.showArticleTile, function (key, value) {
            showArticleSettings.article = value.href;

            html.push("\
				<div class='box" + tempObjectClass + "'>\
				<div class='boxInner'>\
									<a class='' href='https://vide.me/article/" + value.href + "'>\
					<div class='titleTop'>\
						 " + convertTimestamp(value.a) + "<br>\
						 " + value.b + "<br>\
						 " + value.c + "<br>\
					</div>\
						 <img src='" + value.img + "' alt=''>\
						 </img>\
					 <div class='videme-tile-signboard-true'></div>\
									</a></div>\
									"
                + $.fn.showTileButton(showArticleSettings) +
                "</div>\
                    ");
        });
        console.log("$.fn.showArticle html -----> " + html);
        return html;
    };*/

    /* 26072022 function parseArticleShowNew(parseArticleShowNew) {
        console.log("parseArticleShowNew -----> " + JSON.stringify(parseArticleShowNew));
        $.each(parseArticleShowNew, function (key, value) {
            parseArticleShowNew[key] = {
                'a': value.updated_at,
                'b': value.user_display_name,
                'c': value.title,
                'img': value.cover,
                'href': value.item_id
            };
        });
        return parseArticleShowNew;
    }*/

    /* 26072022 function parseSearchArticle(parseSearchArticle) {
        console.log("parseSearchArticle -----> " + JSON.stringify(parseSearchArticle));
        $.each(parseSearchArticle, function (key, value) {
            parseSearchArticle[key] = {
                'a': value.updatedAt,
                'b': value.userDisplayName,
                'c': value.title,
                'img': value.cover,
                'href': value.id
            };
        });
        console.log("parseSearchArticle parseSearchArticle -----> " + JSON.stringify(parseSearchArticle));
        return parseSearchArticle;
    }*/

    /***************************************************************************
     v2 Функция показать Контакты
     ***************************************************************************/
    /* 26072022 $.fn.showRelation = function (options) { // TODO: remove
        //console.log("$.fn.showRelation -----> ok");
        showContactSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showRelation: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showContactSettings.showRelation);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/relation/?limit=" + showContactSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parseMyRelationsForDoorbellSign(data), tempObject
                        )
                    );
                    //tempObject.html(results.join(""));
                } else {
                    console.log("$.fn.showRelation data -----> no");
                    tempObject.html("No contact");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/

    /***************************************************************************
     v2 I'm following
     ***************************************************************************/
    $.fn.showImFollowing = function (options) { // 26072022
        //console.log("$.fn.showRelation -----> ok");
        showImFollowingSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showImFollowing: "#videme-tile"
        }, options);
        if ($(this).length) {
            var tempObject = $(this);
        } else {
            var tempObject = $(showImFollowingSettings.showImFollowing);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/relation/from_me/?limit=" + showImFollowingSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parseRelationsForMeForDoorbellSign(data), tempObject
                        )
                    );
                } else {
                    console.warn("$.fn.showRelation data -----> no");
                    tempObject.html("empty");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 My followers
     ***************************************************************************/
    $.fn.showMyFollowers = function (options) { // 26072022
        //console.log("$.fn.showRelation -----> ok");
        showMyFollowersSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showMyFollowers: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showMyFollowersSettings.showMyFollowers);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/relation/relations_to_me/?limit=" + showMyFollowersSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parseRelationsToMeForDoorbellSign(data), tempObject
                        )
                    );
                } else {
                    console.warn("$.fn.showRelation data -----> no");
                    tempObject.html("empty");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Friends of Spring
     ***************************************************************************/
    $.fn.showFriendsOfSpring = function (options) { // 26072022
        //console.log("$.fn.showRelation -----> ok");
        showFriendsOfSpringSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showFriendsMy: "#videme-my-friends-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showFriendsOfSpringSettings.showFriendsMy);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        var url = parseUrl();

        $.getJSON("https://api.vide.me/v2/spring/friends/?spring=" + url.spring + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parseFriendshipForDoorbellSign(data), tempObject
                        )
                    );
                } else {
                    console.warn("$.fn.showFriendsOfSpringSettings data -----> no");
                    //tempObject.html("No friends");
                    tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Friends My
     ***************************************************************************/
    $.fn.showFriendsMy = function (options) { // 26072022
        //console.log("$.fn.showRelation -----> ok");
        showFriendsMySettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showFriendsMy: "#videme-my-friends-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showFriendsMySettings.showFriendsMy);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/friendship/my/?limit=" + showFriendsMySettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parseFriendshipMyForDoorbellSign(data), tempObject
                        )
                    );
                } else {
                    console.warn("$.fn.showFriendsMy data -----> no");
                    //tempObject.html("No friends");
                    tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Denial of friendship
     ***************************************************************************/
    $.fn.showDenialOfFriendship = function (options) { // 27072022
        //console.log("$.fn.showRelation -----> ok");
        showDenialOfFriendshipSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showFriendsMy: "#videme-my-friends-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showDenialOfFriendshipSettings.showFriendsMy);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/friendship/my_declined/?limit=" + showDenialOfFriendshipSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parseFriendshipForDoorbellSign(data), tempObject
                        )
                    );
                } else {
                    console.warn("$.fn.showDenialOfFriendship data -----> no");
                    //tempObject.html("No friends");
                    tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Friends Pending request for me
     ***************************************************************************/
    $.fn.showFriendsMyPendingRequest = function (options) { // 27072022
        //console.log("$.fn.showRelation -----> ok");
        showFriendsMyPendingRequestCountSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showFriendsMyPendingRequest: "#videme-friends-my-pending-request-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showFriendsMyPendingRequestCountSettings.showFriendsMyPendingRequest);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/friendship/my_pending_request/?limit=" + showFriendsMyPendingRequestCountSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parseFriendshipAcceptForDoorbellSign(data), tempObject
                        )
                    );
                } else {
                    console.warn("$.fn.showFriendsMyPendingRequest data -----> no");
                    tempObject.html("No pending request");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Friends Requests friendships
     ***************************************************************************/
    $.fn.showRequestsFriendships = function (options) { // 27072022
        //console.log("$.fn.showRelation -----> ok");
        showRequestsFriendshipsSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showRequestsFriendships: "#videme-friends-my-pending-request-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showRequestsFriendshipsSettings.showRequestsFriendships);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/friendship/my_request/?limit=" + showRequestsFriendshipsSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parseMyRequestsFriendshipForDoorbellSign(data), tempObject
                        )
                    );
                } else {
                    console.warn("$.fn.showFriendsMyPendingRequest data -----> no");
                    tempObject.html("No pending request");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Chart Share item
     ***************************************************************************/
    $.fn.showChartShareItem = function (options) { // 27072022
        console.log("$.fn.showChartShareItem -----> ok");
        showChartShareItemSettings = $.extend({
            showChartShareItemId: "videme-item-chart-canvas_"
        }, options);
        //var placeId = "videme-share-item";
        //placeId = showChartShareItemSettings.showChartShareItemId;
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            //var tempObject = $(this);
            var placeId = $(this).attr('id');
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $('#' + showChartShareItemSettings.showChartShareItemId);
            var placeId = showChartShareItemSettings.showChartShareItemId;
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        //$('.videme-media-info').showItemCard({'item_id': showChartShareItemSettings.item});
        //$.getJSON("https://insight.vide.me/v2/chart/item/?" + $.param(showChartShareItemSettings) + "&videmecallback=?",
        $.getJSON("https://api.vide.me/v2/chart/item/?" + $.param(showChartShareItemSettings) + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    $('#' + showChartShareItemSettings.showChartShareItemId).remove();
                    $('#videme-item-chart-canvas-place_' + showChartShareItemSettings.item).append('<canvas id="videme-item-chart-canvas_' + showChartShareItemSettings.item + '"></canvas>');
                    showChartItem(data, placeId);
                } else {
                    $('#' + showChartShareItemSettings.showChartShareItemId).remove();
                    $('#videme-item-chart-canvas-place_' + showChartShareItemSettings.item).html('No data...');
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 get chart pop states
     ***************************************************************************/
    $.fn.showChartPopStates = function (options) { // 27072022
        //console.log("$.fn.showRelation -----> ok");
        showChartPopStatesSettings = $.extend({
            showChartPopStatesId: "videme-chart-pop-states-place"
        }, options);
        //var placeId = "videme-share-item";
        //placeId = showChartShareItemSettings.showChartShareItemId;
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            //var tempObject = $(this);
            //var placeId = $(this).attr('id');
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $('#' + showChartPopStatesSettings.showChartPopStatesId);
            //var placeId = showChartPopStatesSettings.showChartPopStatesId;
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        //$('.videme-media-info').showItemCard({'item_id': showChartPopStatesSettings.item});

        //$.getJSON("https://insight.vide.me/v2/chart/item/pop_states/?" + $.param(showChartPopStatesSettings) + "&videmecallback=?",
        $.getJSON("https://api.vide.me/v2/chart/item/pop_states/?" + $.param(showChartPopStatesSettings) + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showChartPopStates data -----> " + JSON.stringify(data));
                if (!$.isEmptyObject(data)) {
                    tempObject.html(showChartPopStates(data, showChartPopStatesSettings));
                } else {
                    console.warn("$.fn.showChartPopStates data -----> no");
                    //tempObject.html("No friends");
                    tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Relations to Spring
     ***************************************************************************/
    $.fn.showRelationToSpring = function (options) { // 27072022
        //console.log("$.fn.showRelation -----> ok");
        showMyFollowersSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showMyFollowers: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showMyFollowersSettings.showRelationToSpring);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        var url = parseUrl();

        $.getJSON("https://api.vide.me/v2/relation/relations_to_spring/?spring=" + url.spring + "&limit=" + showMyFollowersSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parseRelationsToMeForDoorbellSign(data), tempObject
                        )
                    );
                } else {
                    console.warn("$.fn.showRelation data -----> no");
                    tempObject.html("empty");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Relations from Spring
     ***************************************************************************/
    $.fn.showRelationFromSpring = function (options) { // 27072022
        //console.log("$.fn.showRelation -----> ok");
        showMyFollowersSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showMyFollowers: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showMyFollowersSettings.showRelationToSpring);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        var url = parseUrl();

        $.getJSON("https://api.vide.me/v2/relation/relations_from_spring/?spring=" + url.spring + "&limit=" + showMyFollowersSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parseRelationsToMeForDoorbellSign(data), tempObject
                        )
                    );
                } else {
                    console.warn("$.fn.showRelation data -----> no");
                    tempObject.html("empty");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Partners Pending request for me <-???????????????????????
     ***************************************************************************/
    /* 27072022 $.fn.showPartnersAll = function (options) { // TODO: remove
        //console.log("$.fn.showRelation -----> ok");
        showPartnersAllSettings = $.extend({
            limit: 100,
            showPartnersAllRequest: "#videme-partners-list"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showPartnersAllSettings.showPartnersAllRequest);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/partners/item/all/?item_id=" + showPartnersAllSettings.item_id + "&limit=" + showPartnersAllSettings.limit + "&videmecallback=?",
            function (data) {
                console.log("$.fn.showPartnersAll data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    $('.videme-partners-list-place').removeClass('hidden');
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parsePartnersItemsForDoorbellSignInteractive(data), tempObject
                        )
                    );
                } else {
                    console.warn("$.fn.showPartnersAll data -----> no");
                    tempObject.html("No partners");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/

    /***************************************************************************
     v2 Partners Pending request for me
     ***************************************************************************/
    $.fn.showItemPartnersMy = function (options) { // 27072022
        //console.log("$.fn.showRelation -----> ok");
        showItemPartnersMy = $.extend({
            limit: 100,
            showItemPartnersMyRequest: "#videme-partners-list"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showItemPartnersMy.showItemPartnersMyRequest);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/partners/item/my/?item_id=" + showItemPartnersMy.item_id + "&limit=" + showItemPartnersMy.limit + "&videmecallback=?",
            function (data) {
                console.log("$.fn.showPartnersAll data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    $('.videme-partners-list-place').removeClass('hidden');
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parsePartnersItemsForDoorbellSignInteractive(data), tempObject
                        )
                    );
                } else {
                    console.warn("$.fn.showPartnersAll data -----> no");
                    tempObject.html("No partners");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Partners Pending request from me
     ***************************************************************************/
    $.fn.showPartnersPendingFromMe = function (options) { // 27072022
        //console.log("$.fn.showRelation -----> ok");
        showPartnersPendingFromMeSettings = $.extend({
            limit: 100,
            showPartnersPendingFromMePlace: "#videme-tile-v3"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showPartnersPendingFromMeSettings.showPartnersPendingFromMePlace);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/partners/pending_from_me/?videmecallback=?",
            function (data) {
                console.log("$.fn.showPartnersPendingFromMe data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    //$('.videme-partners-list-place').removeClass('hidden');
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parsePartnersPendingFromMeForDoorbellSignDelete(data), tempObject
                        )
                    );
                } else {
                    console.warn("$.fn.showPartnersPendingFromMe data -----> no");
                    tempObject.html("No partners");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Partners Pending request to me
     ***************************************************************************/
    $.fn.showPartnersPendingToMe = function (options) { // 27072022
        //console.log("$.fn.showRelation -----> ok");
        showPartnersPendingToMeSettings = $.extend({
            limit: 100,
            showPartnersPendingToMePlace: "#videme-tile-v3"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showPartnersPendingToMeSettings.showPartnersPendingToMePlace);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/partners/pending_to_me/?videmecallback=?",
            function (data) {
                console.log("$.fn.showPartnersPendingToMe data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    //$('.videme-partners-list-place').removeClass('hidden');
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parsePartnersPendingForDoorbellSignInteractive(data), tempObject
                        )
                    );
                } else {
                    console.warn("$.fn.showPartnersPendingFromMe data -----> no");
                    tempObject.html("No partners");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Partners Pending request common
     ***************************************************************************/
    $.fn.showPartnersPending = function (options) { // 27072022
        //console.log("$.fn.showRelation -----> ok");
        showPartnersPending = $.extend({
            limit: 100,
            showPartnersPendingPlace: "#videme-tile-v3"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showPartnersPending.showPartnersPendingPlace);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/partners/pending/?videmecallback=?",
            function (data) {
                console.log("$.fn.showPartnersPending data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    //$('.videme-partners-list-place').removeClass('hidden');
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parsePartnersPendingForDoorbellSignInteractive(data), tempObject
                        )
                    );
                } else {
                    console.warn("$.fn.showPartnersPendingFromMe data -----> no");
                    tempObject.html("No partners");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Partners Pending Declined
     ***************************************************************************/
    $.fn.showPartnersDeclined = function (options) { // 27072022
        //console.log("$.fn.showRelation -----> ok");
        showPartnersDeclinedSettings = $.extend({
            limit: 100,
            showPartnersDeclinedPlace: "#videme-tile-v3"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showPartnersDeclinedSettings.showPartnersDeclinedPlace);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/partners/declined/?videmecallback=?",
            function (data) {
                console.log("$.fn.showPartnersDeclined data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    //$('.videme-partners-list-place').removeClass('hidden');
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parsePartnersPendingFromMeForDoorbellSignDelete(data), tempObject
                        )
                    );
                } else {
                    console.warn("$.fn.showPartnersDecline data -----> no");
                    tempObject.html("No partners");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Partners Pending Accepted
     ***************************************************************************/
    $.fn.showPartnersAccepted = function (options) { // 27072022
        //console.log("$.fn.showRelation -----> ok");
        showPartnersAcceptedSettings = $.extend({
            limit: 100,
            showPartnersAcceptedPlace: "#videme-tile-v3"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showPartnersAcceptedSettings.showPartnersAcceptedPlace);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/partners/accepted/?videmecallback=?",
            function (data) {
                console.log("$.fn.showPartnersAccepted data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    //$('.videme-partners-list-place').removeClass('hidden');
                    data.callback_function = 'test_function';
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parsePartnersPendingFromMeForDoorbellSignDelete(data), tempObject
                        )
                    );
                } else {
                    console.warn("$.fn.showPartnersAccepted data -----> no");
                    tempObject.html("No partners");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Show Albums
     ***************************************************************************/
    $.fn.showList = function (options) { //26072022
        //console.log("$.fn.showList -----> ok");
        showListSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showList: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showList $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showList $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showListSettings.showList);
        }
        //console.log("$.fn.showList tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/albums/?limit=" + showListSettings.limit + "&videmecallback=?",
            function (data) {
                if (!$.isEmptyObject(data)) {
                    //console.log("$.fn.showList data -----> yes " + JSON.stringify(data));
                    /*tempObject.html(
                        showTileDoorbellSignSmall(
                            parseSignsForDoorbellSign(data), tempObject
                        )
                    );*/
                    /*tempObject.html(
                        showTileShowcasePanelList(
                            parseSignsForDoorbellSign(data), tempObject
                        )
                    );*/
                    tempObject.html(
                        showTileRelationModernAlbums(
                            //parseSignsForDoorbellSign(data)
                            parseSignsForDoorbellSignManager(data)
                        )
                    );
                } else {
                    console.log("$.fn.showList data -----> no");
                    tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };


    /***************************************************************************
     v2 Show Album of Spring
     ***************************************************************************/
    $.fn.showAlbumOfSpring = function (options) { // 27072022
        console.log("$.fn.showAlbumOfSpring -----> ok");
        showListOfSpringSettings = $.extend({
            // TODO: добавить limit в NAD
            //limit: 6,
            showSignsOfSpringForPublic: "#videme-album-of-spring"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showSignsOfSpringForPublic $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showSignsOfSpringForPublic $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showListOfSpringSettings.showSignsOfSpringForPublic);
        }
        //console.log("$.fn.showSignsOfSpringForPublic tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        var url = parseUrl();
        $.getJSON("https://api.vide.me/v2/spring/albums/?spring=" + url.spring + "&videmecallback=?",
            function (data) {
                if (!$.isEmptyObject(data)) {
                    /*console.log("$.fn.showSignsOfSpringForPublic data -----> yes" + JSON.stringify(data));
                    $('.videme-showcase-list-of-spring-public').removeClass('hidden');
                    var results = [];
                    //$.each(data['results'], function (key, value) {
                    results.push("<ul class=\"list-group\">");
                    $.each(data, function (key, value) {
                        results.push("\
                        <li class=\"list-group-item\">\
                            <a href='https://www.vide.me/" + url.spring + "/?list=" + value.title + "'>\
                                " + value.title + "\
                            </a>\
                        </li>\
                        ");
                    });
                    results.push("</ul>");
                    tempObject.html(results.join(""));*/
                    $('.videme-spring-album').removeClass('hidden');
                    /*tempObject.html(
                        showTileDoorbellSignSmall(
                            parseSignsForDoorbellSignSpring(data), tempObject
                        )
                    );*/
                    /*tempObject.html(
                        showTileShowcasePanelList(
                            parseSignsForDoorbellSignSpring(data), tempObject
                        )
                    );*/
                    /*tempObject.html(
                        showTilePanelList(
                            parseSignsForDoorbellSignSpring(data), tempObject
                        )
                    );*/
                    tempObject.html(
                        showTileRelationModernAlbums(
                            parseSignsForDoorbellSignSpring(data), tempObject, 'connect'
                        )
                    );
                } else {
                    console.log("$.fn.showList data -----> no");
                    tempObject.html("No albums");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Service My
     ***************************************************************************/
    $.fn.showServiceMy = function (options) { // 27072022
        //console.log("$.fn.showRelation -----> ok");
        showServiceMySettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showServiceMy: "#videme-my-service-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showServiceMySettings.showServiceMy);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/service/my/?videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        showServiceMy(data)
                    );
                } else {
                    console.warn("$.fn.showServiceMy data -----> no");
                    //tempObject.html("No friends");
                    tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Essence My
     ***************************************************************************/
    $.fn.showEssenceMy = function (options) { // 27072022
        //console.log("$.fn.showRelation -----> ok");
        showEssenceMySettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showEssenceMy: "#videme-my-essence-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showEssenceMySettings.showEssenceMy);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/essences/my/?videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        showEssenceMy(data)
                    );
                } else {
                    console.warn("$.fn.showEssenceMy data -----> no");
                    //tempObject.html("No friends");
                    tempObject.html("Empty");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Essence To Me
     ***************************************************************************/
    $.fn.showEssenceToMe = function (options) { // 27072022
        //console.log("$.fn.showRelation -----> ok");
        showEssenceMyRefSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showEssenceMyRef: "#videme-essence-to-me-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showEssenceMyRefSettings.showEssenceMyRef);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/essences/to_me/?videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        //showEssenceMy(data)
                        showTileDoorbellSignSmall(
                            parseEssencesMyRefForDoorbellSign(data), tempObject)
                    );
                } else {
                    console.warn("$.fn.showEssenceMyRef data -----> no");
                    //tempObject.html("No friends");
                    tempObject.html("Empty");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Essence To Me Pending
     ***************************************************************************/
    $.fn.showEssenceToMePending = function (options) { // 27072022
        //console.log("$.fn.showRelation -----> ok");
        showEssenceMyPendingfSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showEssenceMyRef: "#videme-essence-to-me-pending-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showEssenceMyPendingfSettings.showEssenceMyRef);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/essences/to_me_pending/?videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        //showEssenceMy(data)
                        showTileDoorbellSignSmall(
                            parsEssencesToMeRefForDoorbellSign(data), tempObject)
                    );
                } else {
                    console.warn("$.fn.showEssenceMyRef data -----> no");
                    //tempObject.html("No friends");
                    tempObject.html("Empty");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };


    /***************************************************************************
     v2 Essence From Me
     ***************************************************************************/
    $.fn.showEssenceFromMe = function (options) { // 27072022
        //console.log("$.fn.showRelation -----> ok");
        showEssenceMyRefSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showEssenceMyRef: "#videme-essence-from-me-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showEssenceMyRefSettings.showEssenceMyRef);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/essences/from_me/?videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        //showEssenceMy(data)
                        showTileDoorbellSignSmall(
                            parseEssencesMyRefForDoorbellSign(data), tempObject)
                    );
                } else {
                    console.warn("$.fn.showEssenceMyRef data -----> no");
                    //tempObject.html("No friends");
                    tempObject.html("Empty");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Essence From Me Pending
     ***************************************************************************/
    $.fn.showEssenceFromMePending = function (options) { // 27072022
        //console.log("$.fn.showRelation -----> ok");
        showEssenceMyRefSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showEssenceMyRef: "#videme-essence-from-me-pending-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showEssenceMyRefSettings.showEssenceMyRef);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/essences/pending/?videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        //showEssenceMy(data)
                        showTileDoorbellSignSmall(
                            parseEssencesFromMePendingForDoorbellSign(data), tempObject)
                    );
                } else {
                    console.warn("$.fn.showEssenceMyRef data -----> no");
                    //tempObject.html("No friends");
                    tempObject.html("Empty");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Essence From Me Spring
     ***************************************************************************/
    $.fn.showEssenceFromMeSpring = function (options) { // 27072022
        //console.log("$.fn.showRelation -----> ok");
        var url = parseUrl();
        showEssenceFromMeSpringSettings = $.extend({
            limit: 100,
            showEssenceMyRef: "#videme-essence-from-me-tile-spring"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showEssenceFromMeSpringSettings.showEssenceMyRef);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        //tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/spring/essences/from/?spring=" + url.spring + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        //showEssenceMy(data)
                        showTileDoorbellSignSmall(
                            parseEssencesMySpringRefForDoorbellSign(data), tempObject)
                    );
                } else {
                    console.warn("$.fn.showEssenceMyRef data -----> no");
                    //tempObject.html("No friends");
                    tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                //tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Essence To Me Spring
     ***************************************************************************/
    $.fn.showEssenceToMeSpring = function (options) { // 27072022
        //console.log("$.fn.showRelation -----> ok");
        var url = parseUrl();
        showEssenceToMeSpringSettings = $.extend({
            limit: 100,
            showEssenceMyRef: "#videme-essence-to-me-tile-spring"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showEssenceToMeSpringSettings.showEssenceMyRef);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        //tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/spring/essences/to/?spring=" + url.spring + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        //showEssenceMy(data)
                        showTileDoorbellSignSmall(
                            parseEssencesMySpringRefToDoorbellSign(data), tempObject)
                    );
                } else {
                    console.warn("$.fn.showEssenceMyRef data -----> no");
                    //tempObject.html("No friends");
                    tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                //tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Service My for sign
     ***************************************************************************/
    /* 28072022 $.fn.showServiceMySign = function (options) {
        //console.log("$.fn.showRelation -----> ok");
        showServiceMySignSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showServiceMy: "#videme-my-service-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showServiceMySignSettings.showServiceMy);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        //tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/service/my/?videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        showServiceSpring(data, showServiceMySignSettings)
                    );
                } else {
                    console.warn("$.fn.showServiceMySign data -----> no");
                    //tempObject.html("No friends");
                    //tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                //tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/

    /***************************************************************************
     v2 Service select
     ***************************************************************************/
    $.fn.showServiceSelect = function (options) { // 28072022
        //console.log("$.fn.showRelation -----> ok");
        showServiceSelecttSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showServiceSelect: "#videme-select-service-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showServiceSelecttSettings.showServiceSelect);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/service/?videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    //tempObject.html(
                    showServiceSelect(data)
                    //);
                } else {
                    console.warn("$.fn.showFriendsMy data -----> no");
                    //tempObject.html("No friends");
                    tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Essence select
     ***************************************************************************/
    /* 28072022 $.fn.showEssenceSelect = function (options) {
        //console.log("$.fn.showRelation -----> ok");
        showEssenceSelecttSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showEssenceSelect: "#videme-select-essence-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showEssenceSelecttSettings.showEssenceSelect);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/essences/?videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    //tempObject.html(
                    showEssenceSelect(data)
                    //);
                } else {
                    console.warn("$.fn.showEssenceSelect data -----> no");
                    //tempObject.html("No friends");
                    tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/

    /***************************************************************************
     v2 Talents My
     ***************************************************************************/
    $.fn.showTalentsMy = function (options) { // 28072022
        //console.log("$.fn.showRelation -----> ok");
        showTalentsMySettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showTalentsMy: "#videme-my-talents-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showTalentsMySettings.showTalentsMy);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/talents/my/?videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        showTalentsMy(data)
                    );
                } else {
                    console.warn("$.fn.showTalentsMy data -----> no");
                    //tempObject.html("No friends");
                    tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v2 Talents My for Sign
     ***************************************************************************/
    /* 28072022 $.fn.showTalentsMySign = function (options) {
        //console.log("$.fn.showRelation -----> ok");
        showTalentsMySignSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showTalentsMy: "#videme-my-talents-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showTalentsMySignSettings.showTalentsMy);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        //tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/talents/my/?videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        showTalentsSpring(data, showTalentsMySignSettings)
                    );
                } else {
                    //console.warn("$.fn.showTalentsMy data -----> no");
                    //tempObject.html("No friends");
                    //tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                //tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/

    /***************************************************************************
     v2 Talents select
     ***************************************************************************/
    $.fn.showTalentsSelect = function (options) { // 28072022
        //console.log("$.fn.showRelation -----> ok");
        showTalentsSelectSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showTalentsSelect: "#videme-select-talents-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showTalentsSelectSettings.showTalentsSelect);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/talents/?videmecallback=?",
            function (data) {
                //console.log("$.fn.showRelation data -----> " + data);
                if (!$.isEmptyObject(data)) {
                    //tempObject.html(
                    showTalentsSelect(data)
                    //);
                } else {
                    console.warn("$.fn.showTalentsSelect data -----> no");
                    //tempObject.html("No friends");
                    tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     * REMOVE
     v2 Show List of Spring
     https://github.com/SergeyKozlov/vide.me-js/wiki/en:API_All#show-list-of-spring
     ***************************************************************************/
    /* 28072022 $.fn.showSignsOfSpringForPublic = function (options) { // TODO: remove
        console.log("$.fn.showSignsOfSpringForPublic -----> ok");
        showListOfSpringSettings = $.extend({
            // TODO: добавить limit в NAD
            //limit: 6,
            showSignsOfSpringForPublic: "#videme-list-of-spring-public"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showSignsOfSpringForPublic $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showSignsOfSpringForPublic $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showListOfSpringSettings.showSignsOfSpringForPublic);
        }
        //console.log("$.fn.showSignsOfSpringForPublic tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        var url = parseUrl();
        $.getJSON("https://api.vide.me/v2/spring/signs/?spring=" + url.spring + "&videmecallback=?",
            function (data) {
                if (!$.isEmptyObject(data)) {
                    /!*console.log("$.fn.showSignsOfSpringForPublic data -----> yes" + JSON.stringify(data));
                    $('.videme-showcase-list-of-spring-public').removeClass('hidden');
                    var results = [];
                    //$.each(data['results'], function (key, value) {
                    results.push("<ul class=\"list-group\">");
                    $.each(data, function (key, value) {
                        results.push("\
                        <li class=\"list-group-item\">\
                            <a href='https://www.vide.me/" + url.spring + "/?list=" + value.title + "'>\
                                " + value.title + "\
                            </a>\
                        </li>\
                        ");
                    });
                    results.push("</ul>");
                    tempObject.html(results.join(""));*!/
                    $('.videme-showcase-list-of-spring-public').removeClass('hidden');
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parseSignsForDoorbellSign(data), tempObject
                        )
                    );
                } else {
                    console.log("$.fn.showList data -----> no");
                    tempObject.html("No list");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showError(data));
            })
            .always(function () {
            });
    };*/

    /***************************************************************************
     *      * REMOVE

     v2 Show List of Spring For Friends
     ***************************************************************************/
    /* 28072022 $.fn.showSignsOfSpringForFriends = function (options) {
        console.log("$.fn.showSignsOfSpringForFriends -----> ok");
        showListOfSpringForFriendsSettings = $.extend({
            // TODO: добавить limit в NAD
            //limit: 6,
            showSignsOfSpringForPublic: "#videme-list-of-spring-friends"
        }, options);
        if ($(this).length) {
            var tempObject = $(this);
        } else {
            var tempObject = $(showListOfSpringForFriendsSettings.showSignsOfSpringForPublic);
        }
        tempObject.html(VidemeProgress);
        var url = parseUrl();
        $.getJSON("https://api.vide.me/v2/spring/signs/for_friends/?spring=" + url.spring + "&videmecallback=?",
            function (data) {
                if (!$.isEmptyObject(data)) {
                    /!*console.log("$.fn.showSignsOfSpringForFriends data -----> yes" + JSON.stringify(data));
                    $('.videme-showcase-list-of-spring-friends').removeClass('hidden');
                    var results = [];
                    //$.each(data['results'], function (key, value) {
                    results.push("<ul class=\"list-group\">");
                    $.each(data, function (key, value) {
                        results.push("\
                        <li class=\"list-group-item\">\
                            <a href='https://www.vide.me/" + url.spring + "/?list=" + value.title + "'>\
                                " + value.title + "\
                            </a>\
                        </li>\
                        ");
                    });
                    results.push("</ul>");
                    tempObject.html(results.join(""));*!/
                    $('.videme-showcase-list-of-spring-friends').removeClass('hidden');
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parseSignsForDoorbellSign(data), tempObject
                        )
                    );
                } else {
                    console.log("$.fn.showSignsOfSpringForFriends data -----> no");
                    tempObject.html("No list");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showEmpty(data));
            })
            .always(function () {
            });
    };*/

    /***************************************************************************
     *      * REMOVE

     v2 Show List of Spring Private
     ***************************************************************************/
    /* 28072022 $.fn.showSignsOfSpringForPrivate = function (options) {
        console.log("$.fn.showSignsOfSpringForPrivate -----> ok");
        showSignsOfSpringForPrivateSettings = $.extend({
            // TODO: добавить limit в NAD
            //limit: 6,
            showSignsOfSpringPrivate: "#videme-list-of-spring-private"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showSignsOfSpringForPrivate $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showSignsOfSpringForPrivate $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showSignsOfSpringForPrivateSettings.showSignsOfSpringPrivate);
        }
        //console.log("$.fn.showSignsOfSpringForPrivate tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        var url = parseUrl();
        $.getJSON("https://api.vide.me/v2/spring/signs/private/?spring=" + url.spring + "&videmecallback=?",
            function (data) {
                if (!$.isEmptyObject(data)) {
                    /!*console.log("$.fn.showSignsOfSpringForPrivate data -----> yes" + JSON.stringify(data));
                    $('.videme-showcase-list-of-spring-private').removeClass('hidden');
                    var results = [];
                    //$.each(data['results'], function (key, value) {
                    results.push("<ul class=\"list-group\">");
                    $.each(data, function (key, value) {
                        results.push("\
                        <li class=\"list-group-item\">\
                            <a href='https://www.vide.me/" + url.spring + "/?list=" + value.title + "'>\
                                " + value.title + "\
                            </a>\
                        </li>\
                        ");
                    });
                    results.push("</ul>");
                    tempObject.html(results.join(""));*!/
                    $('.videme-showcase-list-of-spring-private').removeClass('hidden');
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parseSignsForDoorbellSign(data), tempObject
                        )
                    );
                } else {
                    console.log("$.fn.showSignsOfSpringForPrivate data -----> no");
                    tempObject.html("No list");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObject.html(showEmpty(data));
            })
            .always(function () {
            });
    };*/

    /* 28072022 $.fn.getShareByOwnerId = function (options) {
        getShareByOwnerId = $.extend({
            limit: 100,
            showcaseCount: "#videme-count-user-lists"
        }, options);
        if ($(this).length) {
            console.log("$.fn.getShareByOwnerId $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.getShareByOwnerId $(this) -----> nooo! " + $(this).length);
            var tempObject = $(getShareByOwnerId.showcaseCount);
        }
        if (getShareByOwnerId.spring) {
            console.log("$.fn.getShareByOwnerId  -----> getShareByOwnerId.userId " + getShareByOwnerId.spring);
            tempObject.html(VidemeProgress);
            $.getJSON("https://api.vide.me/file/byuser/?spring=" + getShareByOwnerId.spring + "&limit=" + getShareByOwnerId.limit + "&videmecallback=?",
                function (obj) {
                    if (obj.length) {
                        console.log("$.fn.getShareByOwnerId length -----> " + obj.length);
                        tempObject.html("<b>" + obj.length + "</b>");
                    } else {
                        console.log("$.fn.getShareByOwnerId data -----> no");
                        tempObject.html("No files");
                    }
                })
                .done(function (data) {
                })
                .fail(function (data) {
                    tempObject.html("Error");
                })
                .always(function () {
                });
        } else {
            tempObject.append("No spring");
        }
    };*/

    /***************************************************************************
     v4 Show Item Tags Users
     ***************************************************************************/
    $.fn.showItemTagsUsers = function (options) { // 28072022
        console.log("$.fn.showItemTagsUsers -----> ok");
        showItemTagsUsersSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showItemTagsUsers: ".videme-showcase-tags-item_place"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showItemTagsUsersSettings.showItemTagsUsers);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        //===tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/items/tags/?item_id=" + showItemTagsUsersSettings.item_id + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showItemTagsUsers data -----> " + JSON.stringify(data));
                if (!$.isEmptyObject(data)) {
                    //tempObject.html(
                    //$.fn.showcaseTagsUsers(data, tempObject)
                    showcaseTagsUsers(data);
                    //);
                } else {
                    //console.warn("$.fn.showItemTagsUsers data -----> no");
                    //tempObject.html("No friends");
                    tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                //tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v4 Show Item Partners Users
     ***************************************************************************/
    $.fn.showItemPartnersUsers = function (options) { // 28072022
        console.log("$.fn.showItemPartnersUsers -----> ok");
        showItemPartnersUsersSettings = $.extend({
            limit: 100,
            showItemPartnersUsers: ".videme-showcase-partners-item_place"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showItemPartnersUsersSettings.showItemPartnersUsers);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        //===tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/partners/item/?item_id=" + showItemPartnersUsersSettings.item_id + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showItemTagsUsers data -----> " + JSON.stringify(data));
                if (!$.isEmptyObject(data)) {
                    $("#videme-showcase-partners-item").removeClass('hidden'); // TODO: do <---------------------------
                    if (data.length > 0) $('#videme-showcase-partners_count').html(data.length + '&nbsp;');
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parsePartnersItemsForDoorbellSign(data), tempObject
                        )
                    );
                } else {
                    //console.warn("$.fn.showItemTagsUsers data -----> no");
                    //tempObject.html("No friends");
                    tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                //tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v4 Show Tags of Spring
     ***************************************************************************/
    $.fn.showTagsOfSpring = function (options) { // 28072022
        //console.log("$.fn.showItemTagsUsers -----> ok");
        showTagsOfSpringSettings = $.extend({
            limit: 100,
            showTagsOfSpring: "#videme-tags-of-spring"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showTagsOfSpringSettings.showTagsOfSpring);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        //===tempObject.html(VidemeProgress);
        var url = parseUrl();
        $.getJSON("https://api.vide.me/v2/spring/tags/?spring=" + url.spring + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showItemTagsUsers data -----> " + JSON.stringify(data));
                if (!$.isEmptyObject(data)) {
                    //tempObject.html(
                    //$.fn.showcaseTagsUsers(data, tempObject)
                    $('.videme-tags-of-spring_place').removeClass('hidden');
                    //showcaseTagsUsers(data);
                    tempObject.html(fShowcaseEachAllTagForSpringButton(data, url.spring));
                    //);
                } else {
                    //console.warn("$.fn.showItemTagsUsers data -----> no");
                    //tempObject.html("No friends");
                    tempObject.html("");
                }
            })
            .done(function (data) {
            })
            .fail(function (data) {
                //tempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    /***************************************************************************
     v4 Show Partners Sign
     ***************************************************************************/
    $.fn.showItemPartnerSign = function (options) { // 28072022
        //console.log("$.fn.showItemPartnerSign -----> ok");
        showItemPartnerSignSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showItemPartnerSignPlace: ".videme-showcase-partnership-review-place"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showItemPartnerSignSettings.showItemPartnerSignPlace);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        //===tempObject.html(VidemeProgress);
        var ip_id = getParameterByName('ip_id');
        if (ip_id) {
            //console.log("$.fn.showItemPartnerSign ip_id -----> set");
            //return true;
            $.getJSON("https://api.vide.me/v2/partners/item/review/?ip_id=" + ip_id + "&nad=" + $.cookie('vide_nad') + "&videmecallback=?",
                function (data) {
                    //console.log("$.fn.showItemPartnerSign data -----> " + JSON.stringify(data));
                    if (!$.isEmptyObject(data)) {
                        var userDBS = '';
                        var title = '';
                        var button = '';
                        if (data.partnership_type == 'from_me') {
                            //console.log("$.fn.showItemPartnerSign data.owner_info -----> " + JSON.stringify(data.owner_info));
                            //console.log("$.fn.showItemPartnerSign data.owner_info.user_display_name -----> " + JSON.stringify(data.owner_info.user_display_name));
                            title = 'You requested a partnership for this media item.';
                            button = '<a href="" class="btn-sm btn-outline-light videme-relation-card-button-connect partner_delete" ip_id="' + ip_id + '" item_id="' + data.item_info.item_id + '" partner_id="' + data.partner_info.user_id + '" spring="' + data.owner_info.spring + '" data-toggle="modal" data-target="#modal-partner-delete"><div class="videme-progress"></div>Revoke</a>';

                        }
                        if (data.partnership_type == 'to_me') {
                            //console.log("$.fn.showItemPartnerSign data.owner_info -----> " + JSON.stringify(data.owner_info));
                            //console.log("$.fn.showItemPartnerSign data.owner_info.user_display_name -----> " + JSON.stringify(data.owner_info.user_display_name));
                            //title = data.partner_info.user_display_name + ' has requested a partnership for this media item.';
                            title = ' has requested a partnership for this media item.';
                            data.partner_info.dbs_type = 'partnership_to_me';
                            //var userDBSdata = {0: data.partner_info};
                            var userDBSdata = data.partner_info;
                            //userDBS = showMiniDBS(parsePartnersItemsForDoorbellSignInteractive(userDBSdata));
                            userDBS = showMiniDBS(userDBSdata);
                        }
                        tempObject.html("<div class='alert alert-info videme-showcase-partnership-review' role='alert'><div class='videme-showcase-partnership-review-content'>" + userDBS + title + "</div></div>" + button);

                    } else {
                        //console.warn("$.fn.showItemTagsUsers data -----> no");
                        //tempObject.html("No friends");
                        tempObject.html("");
                    }
                })
                .done(function (data) {
                })
                .fail(function (data) {
                    //tempObject.html(showError(data));
                })
                .always(function () {
                });
        } else {
            console.log("$.fn.showItemPartnerSign ip_id -----> empty");
        }
    };


    /***************************************************************************
     Функции Нотификации
     ***************************************************************************/
    $.fn.processNotification = function (options) {
        //console.log("$.fn.processNotification -----> ok");
        /*processNotificationSettings = $.extend({
            processNotification: "#process_notification",
            videmeProgress: ".videme-progress",
            do: "#do"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.processNotification $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.processNotification $(this) -----> nooo! " + $(this).length);
            var tempObject = $(processNotificationSettings.processNotification);
        }
        //console.log("$.fn.processNotification tempObject -----> " + tempObject.length);
        $(processNotificationSettings.videmeProgress).html(VidemeProgress);
        $(processNotificationSettings.do).attr("disabled", true);
        tempObject.append();
        if (!tempObject.is('.in')) {
            tempObject.addClass('in');
            setTimeout(function () {
                tempObject.removeClass('in');
            }, 2200);
        }*/
        $('.videme-nav-spinner').removeClass('hidden');
    };

    $.fn.successNotification = function (options) {
        //console.log("$.fn.successNotification -----> ok");
        /*successNotificationSettings = $.extend({
            successNotification: "#success_notification",
            videmeProgress: ".videme-progress",
            do: "#do"
        }, options);
        //console.log("$.fn.successNotification -----> successNotificationSettings: " + JSON.stringify(successNotificationSettings));
        if ($(this).length) {
            //console.log("$.fn.successNotification $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.successNotification $(this) -----> nooo! " + $(this).length);
            var tempObject = $(successNotificationSettings.successNotification);
        }
        //console.log("$.fn.successNotification tempObject -----> " + tempObject.length);
        //console.log("$.fn.successNotification successNotificationSettings.msg -----> " + successNotificationSettings.msg);
        $(successNotificationSettings.videmeProgress).empty();
        $(successNotificationSettings.do).attr("disabled", false);
        $.fn.lastNotification({
            msg: successNotificationSettings.msg
        });
        //tempObject.append(successNotificationSettings.msg + "<br>");
        tempObject.html(successNotificationSettings.msg + "<br>");
        if (!tempObject.is('.in')) {
            tempObject.addClass('in');
            setTimeout(function () {
                tempObject.removeClass('in');
            }, 3200);
        }*/
        $('.videme-nav-spinner').addClass('hidden');
        $('#videme-toast-success').toast('show');

    };

    $.fn.errorNotification = function (options) {
        //console.log("$.fn.errorNotification -----> ok");
        /*errorNotificationSettings = $.extend({
            successNotification: "#error_notification",
            videmeProgress: ".videme-progress",
            do: "#do"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.errorNotification $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.errorNotification $(this) -----> nooo! " + $(this).length);
            var tempObject = $(errorNotificationSettings.successNotification);
        }
        //console.log("$.fn.errorNotification tempObject -----> " + tempObject.length);
        $(errorNotificationSettings.videmeProgress).empty();
        $(errorNotificationSettings.do).attr("disabled", false);
        /!*        $.fn.lastNotification({
         msg: errorNotificationSettings.msg
         });*!/
        $.fn.lastNotification({
            msg: "<div class='alert alert-error span3'>Failed from timeout. Please try again later. " + JSON.stringify(errorNotificationSettings.msg) + " <span id='timer'></span> sec.</div><script type='text/javascript'>setTimeout('window.location.reload()', 6000); var t=5; function refr_time(){ if (t>1) { t--;  document.getElementById('timer').innerHTML=t; document.getElementById('timer').style.color = '#FF0000'; } else { document.getElementById('timer').style.color = '#FFA122'; } } var tm=setInterval('refr_time();' ,1000); </script>"
        });
        tempObject.append(JSON.stringify(errorNotificationSettings.msg) + "<br>");
        if (!tempObject.is('.in')) {
            tempObject.addClass('in');
            setTimeout(function () {
                tempObject.removeClass('in');
            }, 3200);
        }*/
        $('.videme-nav-spinner').addClass('hidden');

    };

    $.fn.lastNotification = function (options) {
        //console.log("$.fn.lastNotification -----> ok");
        lastNotificationSettings = $.extend({
            lastNotification: "#videme-result"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.errorNotification $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.errorNotification $(this) -----> nooo! " + $(this).length);
            var tempObject = $(lastNotificationSettings.lastNotification);
        }
        //console.log("$.fn.errorNotification tempObject -----> " + tempObject.length);
        tempObject.html(lastNotificationSettings.msg);
    };

    $.fn.countChar = function () { // 28072022
        //console.log("$.fn.countChar -----> start");
        var $this = $(this);
        return this.each(function (i, element) {
            renewCount($this);
            $(element).keyup(function updateCharCounter() {
                renewCount($this);
                //$counter.text('limit: ' + maxLength + ' characters. remaining: ' + (maxLength - charCount));
            });
        });
        function renewCount(renewCount) {
            var maxLength = parseInt(renewCount.attr('maxlength'), 10),
                charCount = renewCount.val().length;
            $counter = $('#' + renewCount.attr('id') + '_counter');
            $counter.text(charCount + ' / ' + maxLength);
        }
    };
}
(jQuery));
