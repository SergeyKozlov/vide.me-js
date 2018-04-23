/***************************************************************************
 *  Jquery plugin Vide.me
 * *************************************************************************/
console.log("Collaboration http://sergeykozlov.ru/collaboration/");

(function ($) {
    var authorized = false;
    //var authorizedData;

    var methods = {
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
    };

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
                        authorized = true;

                        $('.authorize-false').remove();
                        var trueUserInfo = paddingUserInfo(data);
                        /*if (data.user_display_name === null) data.user_display_name = 'No name';

                        //console.log("user/info data -----> " + JSON.stringify(data));
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

                        $('#user_brand').html("<a href='" + trueUserInfo.user_link + "' target='_blank'> <img src='" + trueUserInfo.user_picture + "' width='48' height='48' alt='" + trueUserInfo.user_display_name + "'></a>");
                        //$('#nav_user_cover').attr('src', trueUserInfo.user_cover);
                        $('.videme-you-sign-user_cover').attr('src', trueUserInfo.user_cover);
                        //$('#nav_user_brand').attr('src', trueUserInfo.user_picture);
                        $('.videme-you-sign-user_picture').attr('src', trueUserInfo.user_picture);
                        $('#form_user_brand').html("<a href='" + trueUserInfo.user_link + "' target='_blank'> <img src='" + trueUserInfo.user_picture + "' alt='" + trueUserInfo.user_display_name + "'></a>");

                        $('#form_user_name').html("<a href='" + trueUserInfo.user_link + "' target='_blank'>" + trueUserInfo.user_display_name + "</a>");
                        $('#nav_form_user_name').html("<a href='https://www.vide.me/" + trueUserInfo.spring + "'>" + trueUserInfo.user_display_name + "</a>");
                        $('#form_user_email').html(trueUserInfo.user_email);
                        //$('#nav_form_user_email').html(trueUserInfo.user_email);
                        $('.videme-you-sign-bio').html(trueUserInfo.bio);
                        $('.videme-you-sign-country').html(trueUserInfo.country);
                        $('.videme-you-sign-city').html(trueUserInfo.city);
                        $('#sidebar_user_name').html(trueUserInfo.user_display_name);
                    } else {
                        console.log("$.fn.getAuthorized -----> getJSON empty");
                        $('.videme-form-user-info').remove();

                    }

                }
            );
            /*Волшебное использование куки ===============================================*/
            //console.log("vide_nad -----> " + $.cookie('vide_nad'));
            $('#nad').val($.cookie('vide_nad'));
            /*============================================================================*/
        } else {
            console.log("$.fn.getAuthorized -----> no cookie");
            $('.videme-form-user-info').remove();

        }
        return authorized;
    };

    $.fn.userSpringInfo = function (options) {
        var url = parseUrl();
        $.getJSON("https://api.vide.me/v2/spring/info/?spring=" + url.spring + "&videmecallback=?",
            function (data) {
                if (!$.isEmptyObject(data)) {
                    data = paddingUserInfo(data);
                    if (data.user_cover) {
                        $('.header-site').css('background-image', 'url(' + data.user_cover + ')');
                    } else {
                        //$('.header-site').css('background-image', 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Starry_Night_Over_the_Rhone.jpg/300px-Starry_Night_Over_the_Rhone.jpg")');
                    }
                    if (!$.isEmptyObject(data.user_picture)) {
                        $("#vide_spring_user_picture").attr('src', data.user_picture);
                    } else {
                        //$('.header-site').css('background-image', 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Starry_Night_Over_the_Rhone.jpg/300px-Starry_Night_Over_the_Rhone.jpg")');
                    }
                    if (data.user_display_name !== '') {
                        $('.user_display_name').html('<a href=\"https://www.vide.me/' + data.spring + '\">' + data.user_display_name + '</a>');
                    } else {
                        $('.user_display_name').html('');
                    }
                    $('.spring_relation').html('<a class="btn btn-sm align-middle btn-outline-secondary relation_connect" user_id="' + data.user_id + '" href="https://api.vide.me/v2/relation/connect/?user_id=' + data.user_id + '&nad=' + $.cookie('vide_nad') + '">Connect at  ' + data.user_display_name + '</a>');

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

    $.fn.springActivity = function () {
        var url = parseUrl();
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
                    if (!$.isEmptyObject(data[0])) {
                        $('.spring_activity_posts').attr("href", "https://www.vide.me/" + url.spring + "/?show=posts");

                        $('.spring_activity_posts_value').html(data[1]);
                    }
                    if (!$.isEmptyObject(data[1])) {
                        $('.spring_activity_video').attr("href", "https://www.vide.me/" + url.spring + "/?show=video");
                        $('.spring_activity_video_value').html(data[0]);
                    }
                    if (!$.isEmptyObject(data[2])) {
                        $('.spring_activity_article').attr("href", "https://www.vide.me/" + url.spring + "/?show=article");
                        $('.spring_activity_article_value').html(data[0]);
                    }
                    if (!$.isEmptyObject(data[3])) {
                        $('.spring_activity_relation_to').attr("href", "https://www.vide.me/" + url.spring + "/?show=followers");
                        $('.spring_activity_relation_to_value').html(data[2]);
                    }
                    if (!$.isEmptyObject(data[4])) {
                        $('.spring_activity_relation_from').attr("href", "https://www.vide.me/" + url.spring + "/?show=following");
                        $('.spring_activity_relation_from_value').html(data[3]);
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

    $.fn.getAuthorized(); // TODO: Убрать повторное использование
    //$.fn.getAuthorizedData(); // TODO: Убрать повторное использование
    //authorizedData = $.fn.getAuthorizedData(); // TODO: Убрать повторное использование

    $.fn.fbSentMessage = function (options) {
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

    $.fn.oneTimeInbox = function (options) {
        oneTimeInboxSettings = $.extend({
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
        //console.log("$.fn.oneTimeInbox oneTimeInboxSettings.authorized -----> " + oneTimeInboxSettings.authorized);
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
        $.fn.showcaseVideoTextButton(paddingButtonOneTime(oneTimeInboxSettings));
    };

    $.fn.showItemCard = function (options) {
        showItemCardSettings = $.extend({
            showcaseItemCard: '#item-card'
        }, options);
        //console.log("$.fn.showItemCard options -----> " + JSON.stringify(options));
        //console.log("$.fn.showItemCard showItemCardSettings -----> " + JSON.stringify(showItemCardSettings));

        if ($(this).length) {
            //console.log("$.fn.fileMy $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.fileMy $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showItemCardSettings.showcaseItemCard);
        }
        //console.log("$.fn.fileMy tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.fn.getItemInfo(showItemCardSettings, tempObject);
    };

    $.fn.getItemInfo = function (options, tempObject) {
        //console.log("$.fn.getItemInfo options -----> " + JSON.stringify(options));
        $.getJSON("https://api.vide.me/v2/items/info/?item_id=" + options.item_id + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.getItemInfo data -----> " + JSON.stringify(data));
                tempObject.html($.fn.itemCard(data));
            })
            .done(function (data) {
            })
            .fail(function (data) {
                return false;
            });
    };

    $.fn.itemCard = function (options) {
        itemCardSettings = $.extend({
            authorized: authorized
        }, options);
        console.log("$.fn.itemCard itemCardSettings -----> " + JSON.stringify(itemCardSettings));
        //var element = options,
        /*var attributes = {};
        //$.each(element.get(0).attributes, function(i, attrib){
        $.each(options.get(0).attributes, function (i, attrib) {
            if (attrib.value) {
                attributes[attrib.name] = attrib.value;
            }
        });*/
        //attributes = filter_array(attributes);
        //attributes = filter_obj(attributes);
        //attributes = attributes.filter(function(e){return e});
        //attributes = jQuery.grep(attributes, function(n){ return (n); });
        /*var my_array = attributes.filter(function(x){
            return (x !== (undefined || null || ''));
        });*/
        //var tempObject = $(this);
        options = paddingUserInfo(options);
        console.log("$.fn.itemCard options -----> " + JSON.stringify(options));

        if (options.type == 'article') var img = options.cover;
        if (options.type == 'video') var img = 'https://s3.amazonaws.com/img.vide.me/' + options.item_id + '.jpg';
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
            "</div>");
        //tempObject.html("$.fn.itemCard attributes -----> " + JSON.stringify(attributes));
        //return this;
        //return tempObject;
    };

    $.fn.showNewRec = function (options) {
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
    };

    $.fn.showNewRecBS4 = function (options) {
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
            '<img src="https://s3.amazonaws.com/img.vide.me/' + showNewRecSettings.file + '.jpg" alt="..." class="img-thumbnail">' +
            '</a>');
        return tempObjectPopVideo;
        //return VidemeProgress;
    };

    $.fn.oneTimeInboxAds = function (options) {
        oneTimeInboxSettings = $.extend({
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

        console.log("$.fn.oneTimeInbox oneTimeInboxSettings.authorized -----> " + oneTimeInboxSettings.authorized);

        if (oneTimeInboxSettings.authorized) {
            console.log("$.fn.oneTimeInbox oneTimeInboxSettings.authorized -----> yes " + oneTimeInboxSettings.authorized);
            $.fn.showcaseVideoTextButtonAds(paddingButtonInbox(oneTimeInboxSettings));
        } else {
            console.log("$.fn.oneTimeInbox oneTimeInboxSettings.authorized -----> no " + oneTimeInboxSettings.authorized);
            $.fn.showcaseVideoTextButtonAds(paddingButtonOneTime(oneTimeInboxSettings));
        }

    };

    $.fn.fileInbox = function (options) {
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
    };

    $.fn.fileSent = function (options) {
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
                $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (data) {
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
    };

    $.fn.fileMy = function (options) {
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
                if (data) {
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
    };

    $.fn.fileMyConnectForFriends = function (options) {
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
                        //console.log("$.fn.fileMy data -----> yes" + JSON.stringify(data));
                        tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "shownext"));
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
    };

    $.fn.fileMyConnect = function (options) {
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
                        //console.log("$.fn.fileMy data -----> yes" + JSON.stringify(data));
                        tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "shownext"));
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
    };

    $.fn.showPopConnect = function (options) {
        /*showPopConnectSettings = $.extend({
            size: '',
            limit: 16,
            showcaseVideo: "#videme-tile"
        }, options);*/
        var showPopConnectSettings = $.extend({
            size: '',
            limit: 16,
            showcaseVideo: "#videme-tile"
        }, $.fn.showPopConnect.defaults, options);
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
        $.getJSON("https://api.vide.me/v2/connect/pop/?videmecallback=?",
            function (data) {
                if ($.isEmptyObject(data)) {
                    console.log("$.fn.showPopConnect data -----> no");
                    tempObject.html("No results");
                } else {
                    //console.log("$.fn.showPopConnect data -----> yes" + JSON.stringify(data));
                    tempObject.html(showTileRelation(data, tempObject, showPopConnectSettings.size));
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

    $.fn.fileMySpring = function (options) {
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
    };

    $.fn.itemsOfSpring = function (options) {
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
                    tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "file-spring-url"));
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
    };
    $.fn.postsOfSpring = function (options) {
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
        $.getJSON("https://api.vide.me/v2/spring/posts/?spring=" + url.spring + "&list=" + url.list + "&limit=" + fileSpringSettings.limit + "&videmecallback=?",
            function (data) {
                var response_time = Math.round(performance.now() - start_time);
                //console.log('doTasks took ' + response_time + ' milliseconds to execute.');
                $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    //console.log("$.fn.postsOfSpring data -----> yes" + JSON.stringify(data));
                    tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "file-spring-url"));
                    if (data[0].type == 'video') {
                        $.fn.showcaseVideoTextButton(paddingButtonMySpring(data[0]));
                    } else {
                        $('.itemscope').addClass('hidden');
                    }
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
    };
    $.fn.postsOfSpringVideoOnly = function (options) {
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
        $.getJSON("https://api.vide.me/v2/spring/video/?spring=" + url.spring + "&list=" + url.list + "&limit=" + fileSpringSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("postsOfSpringVideoOnly data -----> " + JSON.stringify(data));
                var response_time = Math.round(performance.now() - start_time);
                $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    console.log("$.fn.postsOfSpring data -----> yes" + JSON.stringify(data));
                    tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "file-spring-url"));
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
    };
    $.fn.postsOfSpringVideoOnlyForFriends = function (options) {
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
    };
    $.fn.postsOfSpringArticleOnly = function (options) {
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
        $.getJSON("https://api.vide.me/v2/spring/article/?spring=" + url.spring + "&list=" + url.list + "&limit=" + postsOfSpringArticleOnlySettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("postsOfSpringVideoOnly data -----> " + JSON.stringify(data));
                var response_time = Math.round(performance.now() - start_time);
                $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (!$.isEmptyObject(data)) {
                    tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "file-spring-url"));
                    $.fn.showcaseVideoTextButton(paddingButtonMySpring(data[0]));
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
    };

    $.fn.showMyTask = function (options) {
        showMyTaskSettings = $.extend({
            limit: 6,
            showcaseMyTask: "#videme-my-task"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showMyTask $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showMyTask $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showMyTaskSettings.showcaseMyTask);
        }
        $.getJSON("https://api.vide.me/upload/getmytask/?limit=" + showMyTaskSettings.limit + "&videmecallback=?",
            function (data) {
                //console.log("$.fn.showMyTask -----> typeof " + typeof data);
                if (data) {
                    var htmlResult = [];
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
                        <td>" + value['video_duration'] + "</td>\
                    </tr>")
                    });
                    //console.log("showMyTask value -----> html" + "<table>" + htmlResult.join("") + "</table>");
                    var db = (
                        showTileDoorbellSignSmall(parseMyTaskForDoorbellSign(data), tempObject)
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

    $.fn.showMyTaskSendmail = function (options) {
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
                    var htmlResult = [];
                    var rowClass;

                    var db = (
                        showTileDoorbellSignSmall(
                            parseMyTaskSendmailForDoorbellSign(data), tempObject
                        )
                    );
                    tempObject.html(db);
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
    };

    $.fn.showNewVideo = function (options) {
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
        /*

         getNewVideo2 = [];
         getNewVideo2.skip = 0;
         var data = getNewVideo(getNewVideo2);
         */

        console.log("$.fn.showNewVideo showNewVideoSettings.data -----> " + JSON.stringify(showNewVideoSettings.data));
        showNewVideoSettings.data = 55555;
        console.log("$.fn.showNewVideo showNewVideoSettings.data -----> " + JSON.stringify(showNewVideoSettings.data));

        $.getJSON("https://api.vide.me/file/shownew/?skip=" + showNewVideoSettings.skip + "&videmecallback=?",
            function (json) {

                showNewVideoSettings.data = json;
                /*
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

                 }*/
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

    };

    function getNewVideo(getNewVideo) {
        var retval;

        /*        $.getJSON("https://api.vide.me/file/shownew/?skip=" + getNewVideo.skip + "&videmecallback=?",
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
         });*/


        console.log("$.fn.getNewVideo return getformid -----> " + JSON.stringify(getformid));

        return getformid;
    }

    $.fn.showNewVideoPagination = function (options) { // TODO: Remove
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
        /* Сделать запрос */
        /*
                var data = $.fn.showNewVideo({
                    //msg: msg
                });*/
        //console.log("$.fn.showNewVideoPagination showNewVideoSettings -----> " + JSON.stringify(showNewVideoSettings));
        //console.log("$.fn.showNewVideoPagination data -----> " + JSON.stringify(data));
        // TODO: Add limit
        $.getJSON("https://api.vide.me/file/shownew/?videmecallback=?",
            function (jsonData) {
                /* Показать первый расклад */

                /* Всё слепить и показать */
                tempObjectNewVideo.html(showTile(parseFileMy(jsonData.slice(0, showNewVideoPaginationSettings.limit)), tempObjectNewVideo, "shownext"));

                /* Вычисилить максимальное число страниц */
                var pagetotal = Math.ceil(jsonData.length / showNewVideoPaginationSettings.limit);
                /* Объявить экземпляр пейджинатора */
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
    };

    $.fn.showNewPostsPagination = function (options) {
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
        /* Сделать запрос */
        /*
                var data = $.fn.showNewVideo({
                    //msg: msg
                });*/
        //console.log("$.fn.showNewVideoPagination showNewVideoSettings -----> " + JSON.stringify(showNewVideoSettings));
        //console.log("$.fn.showNewVideoPagination data -----> " + JSON.stringify(data));
        // TODO: Add limit
        $.getJSON("https://api.vide.me/v2/post/shownew/?videmecallback=?",
            function (jsonData) {
                //console.log("$.fn.showNewPostsPagination data -----> " + JSON.stringify(jsonData));

                /* Показать первый расклад */

                /* Всё слепить и показать */
                tempObjectNewPosts.html(showTile(parseDataArrayToObject(jsonData.slice(0, showNewPostsPaginationSettings.limit)), tempObjectNewPosts, "shownext"));

                /* Вычисилить максимальное число страниц */
                var pagetotal = Math.ceil(jsonData.length / showNewPostsPaginationSettings.limit);
                /* Объявить экземпляр пейджинатора */
                $('.videme-shownew-pagination').jqPagination({
                    //link_string	: '/?page={page_number}',
                    max_page: pagetotal,
                    paged: function (page) {
                        var skip = (page - 1) * showNewPostsPaginationSettings.limit;
                        skip2 = skip;
                        limit = skip2 + showNewPostsPaginationSettings.limit;
                        console.log("$.fn.showNewPostsPagination jqPagination -----> skip: " + skip);
                        tempObjectNewPosts.html(showTile(parseDataArrayToObject(jsonData.slice(skip2, limit)), tempObjectNewPosts, "shownext"));
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
    };

    $.fn.showNewArticlePagination = function (options) {
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
        /* Сделать запрос */
        /*
                var data = $.fn.showNewVideo({
                    //msg: msg
                });*/
        //console.log("$.fn.showNewVideoPagination showNewVideoSettings -----> " + JSON.stringify(showNewVideoSettings));
        //console.log("$.fn.showNewVideoPagination data -----> " + JSON.stringify(data));
        // TODO: Add limit
        $.getJSON("https://api.vide.me/v2/post/new_article/?videmecallback=?",
            function (jsonData) {
                //console.log("$.fn.showNewArticlePagination data -----> " + JSON.stringify(jsonData));

                /* Показать первый расклад */

                /* Всё слепить и показать */
                //tempObjectNewPosts.html(showTile(parseArticleShowNew(jsonData.slice(0, showNewArticlePaginationSettings.limit)), tempObjectNewPosts, "article"));
                tempObjectNewPosts.html(showTile(parseDataArrayToObject(jsonData.slice(0, showNewArticlePaginationSettings.limit)), tempObjectNewPosts, "article"));

                /* Вычисилить максимальное число страниц */
                var pagetotal = Math.ceil(jsonData.length / showNewArticlePaginationSettings.limit);
                /* Объявить экземпляр пейджинатора */
                $('.videme-new-article-pagination').jqPagination({
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
    };

    $.fn.showPopVideoPagination = function (options) {
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
        /* Сделать запрос */
        /*
         var data = $.fn.showNewVideo({
         //msg: msg
         });*/
        //console.log("$.fn.showPopVideoPagination showPopVideoPaginationSettings -----> " + JSON.stringify(showPopVideoPaginationSettings));
        //console.log("$.fn.showPopVideoPagination data -----> " + JSON.stringify(data));

        //$.getJSON("https://api.vide.me/file/showpop/?videmecallback=?",
        $.getJSON("https://api.vide.me/v2/post/showpop/?videmecallback=?",
            function (jsonData) {
                //console.log("$.fn.showPopVideoPagination data -----> " + JSON.stringify(jsonData));
                //tempObjectPopVideo.html(showTile(parseFileMy(jsonData.slice(0, showPopVideoPaginationSettings.limit)), tempObjectPopVideo, "shownext"));
                tempObjectPopVideo.html(showTile(parseDataArrayToObject(jsonData.slice(0, showPopVideoPaginationSettings.limit)), tempObjectPopVideo, "shownext"));
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
                        tempObjectPopVideo.html(showTile(parseDataArrayToObject(b.slice(skip2, limit)), tempObjectPopVideo, "shownext"));
                    }
                });
            })
            .done(function (data) {
            })
            .fail(function (data) {
                tempObjectPopVideo.html(showError(data));
            })
            .always(function () {
            });
        //==});
    };

    $.fn.showNextVideoPagination = function (options) {
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
        /* Сделать запрос */
        /*
         var data = $.fn.showNewVideo({
         //msg: msg
         });*/
        //console.log("$.fn.showNextVideoPagination showNextVideoPaginationSettings -----> " + JSON.stringify(showNextVideoPaginationSettings));
        //console.log("$.fn.showNextVideoPagination data -----> " + JSON.stringify(data));

        //==var prevfile = $.cookie('vide_prev_file');
        //==var file = showNextVideoPaginationSettings.file;
        //$.cookie("vide_prev_file", file);
        //==$.cookie("vide_prev_file", file, {expires: 14, path: '/', domain: 'vide.me', secure: true});

        //$.getJSON("https://api.vide.me/file/shownext/?prevfile=" + prevfile + "&file=" + file + "&videmecallback=?",
        $.getJSON("https://api.vide.me/v2/post/shownext/?prev_item_id=" + showNextVideoPaginationSettings.prev_item_id + "&next_item_id=" + showNextVideoPaginationSettings.next_item_id + "&videmecallback=?",

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

    function showTile(showFile, tempObject, actionUrlClass) {
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
        html.push("<ul class=\'list-group\'>");
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
            /*var spring;
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
            }*/
            var href;
            var img;
            //if (value.messageid) {
            //if (value.indexOf("messageid")) {
            //if ("messageid" in value) {
            if (value.type === 'article') {
                if (value.post_id && value.post_id != "undefined") {
                    href = "https://www.vide.me/a/?a=" + value.href + "&post_id=" + value.post_id;
                } else {
                    href = "https://www.vide.me/a/?a=" + value.href;
                }
                img = value.cover;
            } else {
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
                img = "https://s3.amazonaws.com/img.vide.me/" + value.img + ".jpg";
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
            /*html.push("<div class='box" + tempObjectClass + "'>\
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
        });*/
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

            html.push("<li class='list-group-item videme-tile-item'>" +
                "<a href='https://www.vide.me/" + value.spring + "'>" +
                "<img src='" + value.user_picture + "' alt='' class='img-thumbnail videme-relation-card-img'>" +
                "</a>" +
                "<div class='videme-tile-item-1-line'>" +
                "<div class='font-weight-bold videme-tile-item-user'>" +
                "<a href='https://www.vide.me/" + value.spring + "'>"
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
				" + value.video_duration + "\
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
    }

    function showTileRelation(relationArray, tempObject, size) {
        console.log('showTileRelation tempObject.width ---> ' + tempObject.width());
        console.log('showTileRelation size ---> ' + size);
        var html = [];
        //if (tempObject.width() < 500) {
        if (size == 'small') {
            $.each(relationArray, function (key, value) {
                var trueValue = paddingUserInfo(value);
                html.push(showRelationCardSmall(trueValue));
                /*html.push(
                    showTileDoorbellSignSmall(
                        parsePopRelationsForDoorbellSign(relationArray)
                ));*/
            });
        } else {
            $.each(relationArray, function (key, value) {
                var trueValue = paddingUserInfo(value);
                html.push(showRelationCard(trueValue));
            });
        }
        return html;
    }

    function showRelationCard(showRelationCard) {
        return "<div class=\"card\" style=\"width: 50%;float: left;\">\n" +
            "  <img class=\"card-img-top\" src=\"" + showRelationCard.user_cover + "\" alt=\"Card image cap\">\n" +
            "  <div class=\"card-body\">\n" +
            "    <h5 class=\"card-title\"><a href='https://www.vide.me/" + showRelationCard.spring + "/' target='_blank'>" + showRelationCard.user_display_name + "</a></h5>\n" +
            "    <p class=\"card-text\"></p>\n" +
            "    <a href=\"https://api.vide.me/v2/relation/connect/?user_id=" + showRelationCard.user_id + "&nad=" + $.cookie('vide_nad') + "\" class=\"btn btn-primary relation_connect\" user_id='" + showRelationCard.user_id + "' feedback='https://www.vide.me/\" + showRelationCardSmall.spring + \"'>Connect</a>\n" +
            "  </div>\n" +
            "</div>";
    }

    function showRelationCardSmall(showRelationCardSmall) {
        return "\
            <div class=\"videme-ralation-card-small\">\
              <img class=\"img-thumbnail videme-relation-card-img\" src=\"" + showRelationCardSmall.user_picture + "\" alt=\"\" />\
                <div class=\"videme-relation-card-user\"><a href='https://www.vide.me/" + showRelationCardSmall.spring + "/' target='_blank'>" + showRelationCardSmall.user_display_name + "</a></div>\
                <p class=\"\"></p>\
                <a href=\"https://api.vide.me/v2/relation/connect/?user_id=" + showRelationCardSmall.user_id + "&nad=" + $.cookie('vide_nad') + "\" class=\"btn btn-outline-primary btn-sm videme-relation-card-button-connect relation_connect\" user_id='" + showRelationCardSmall.user_id + "' feedback='https://www.vide.me/" + showRelationCardSmall.spring + "'>Connect</a>\
            </div>";
    }

    function convertTimestamp(timestamp) {
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
    }

    function sec2str(t) {
        var d = Math.floor(t / 86400),
            h = ('0' + Math.floor(t / 3600) % 24).slice(-2),
            m = ('0' + Math.floor(t / 60) % 60).slice(-2),
            s = ('0' + t % 60).slice(-2);
        //return (d>0?d+'d ':'')+(h>0?h+':':'')+(m>0?m+':':'')+(t>60?s:s+'s');
        return (d > 0 ? d + 'd ' : '') + (h > 0 ? h + ':' : '') + (m > 0 ? m + ':' : '') + (t > 60 ? s : s + 's');
    }

    function parseFileInbox(parseFileInbox) {
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
    }

    function parseFileSent(parseFileSent) {
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
    }

    function parseFileMy(parseFileMy) {
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
    }

    function parseDataArrayToObject(parseDataArrayToObject) {
        //console.log("parseDataArrayToObject before -----> " + JSON.stringify(parseDataArrayToObject));
        $.each(parseDataArrayToObject, function (key, value) {
            //console.log("parseFileInbox[key] ----->" + JSON.stringify(parseFileInbox[key]));
            //console.log("parseFileInbox paddingData ----->" + paddingData(value)); // <<-------
            //console.log("parseFileInbox value ----->" + JSON.stringify(value));
            // Array to Object Recognize
            /*$.each(value, function (key2, value2) {
                //console.log("parseFileInbox each value ----->" + key2 + " - " + value2);
                //console.log("parseFileInbox paddingUserInfo(value2) ----->" + paddingUserInfo(value2));
                //value.key2 = paddingUserInfo(value2);
                //value[key2] = paddingUserInfo(value2);
                parseDataArrayToObject[key2] = paddingUserInfo(value);

            })*/
            //parseDataArrayToObject[key] = paddingUserInfo(value);
            value = paddingUserInfo(value);
            parseDataArrayToObject[key] = {
                'a': value.user_display_name,
                'b': value.title,
                'c': value.content,
                'd': value.updated_at,
                'img': value.item_id,
                'cover': value.cover,
                'type': value.type,
                'href': value.item_id,
                'item_id': value.item_id,
                'video': value.item_id,
                'post_id': value.post_id,
                'message_id': value.message_id,
                'created_at': value.created_at,
                'updated_at': value.updated_at,
                'title': value.title,
                'content': value.content,
                'spring': value.spring,
                'user_email': value.user_email,
                'user_picture': value.user_picture,
                'to_user_id': value.to_user_id,
                'from_user_id': value.from_user_id,
                'from_user_display_name': value.from_user_display_name,
                'from_user_name': value.user_display_name,
                'user_display_name': value.user_display_name,
                'file': value.item_id, // TODO: remove
                'video_duration': value.video_duration,
                'item_count_show': value.item_count_show,
                'count': value.item_count_show,
                'access': value.access,
                'tags': value.tags,
                'dropdown': value.dropdown

            };
        });
        //delete parseFileInbox.results;
        //console.log("parseDataArrayToObject after ----->" + JSON.stringify(parseDataArrayToObject));
        return parseDataArrayToObject;
    }

    function parseFileMySpring(parseFileMySpring) {
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
    }

    function parseSignsForDoorbellSign(parseSignsForDoorbellSign) {
        //console.log("parseSignsForDoorbellSign Before----->" + JSON.stringify(parseSignsForDoorbellSign));
        $.each(parseSignsForDoorbellSign, function (key, value) {
            parseSignsForDoorbellSign[key] = {
                //'a': value.ToUserName,
                'image': value.image,
                'cover': value.cover,
                'title': value.title,
                'href': value.spring + '/?list=' + value.title,
                'additional': value.access,
                'count': '',
                'date': value.created_at,
                'access': value.access,
                /*'buttons': {'sign'},*/
                'dropdown': {'dd_item': 'sign'}
            };
        });
        //delete parseSignsForDoorbellSign.results;
        //console.log("parseSignsForDoorbellSign ----->" + JSON.stringify(parseSignsForDoorbellSign));
        return parseSignsForDoorbellSign;
    }

    function parseFileSpring(parseFileSpring) {
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
    }

    function parseShowNewVideo(parseShowNewVideo) {
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
    }

    function parseUrl() {
        var parseUrl = {};
        parseUrl.location = window.location.pathname;
        parseUrl.path = parseUrl.location.substring(0, parseUrl.location.lastIndexOf("/"));
        //springRaw = parseUrl.path.substring(parseUrl.path.lastIndexOf("/")+1);
        parseUrl.spring = parseUrl.location.replace(/^\/|\/$/g, '');
        if (getParameterByName('list')) {
            parseUrl.list = getParameterByName('list');
        } else {
            parseUrl.list = '';
        }
        return parseUrl;
    }

    function paddingButtonOneTime(paddingButtonOneTime) {
        /*file: '',
         messageid: '',
         updatedAt: '',
         subject: '',
         message: '',
         fromUserName: '',
         toUserName: '',
         recipients: '',
         conferenceId: '',*/
        //console.log("paddingButtonOneTime before -----> " + JSON.stringify(paddingButtonOneTime));
        paddingButtonOneTime.showcaseButton = {
            /*'reply-toggle': {
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
            },*/
            /*'contact-toggle': {
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
            }*/
        };
        //console.log("paddingButtonOneTime after -----> " + JSON.stringify(paddingButtonOneTime));
        return paddingButtonOneTime;
    }


    $.fn.showcaseVideo = function (options) {
        showcaseVideoSettings = $.extend({
            video: "no_video",
            miniVideo: true,
            //showcaseVideo: "videme-showcase-video",
            showcaseVideo: "#videme-showcase-video",
            authorized: true
        }, options);

        console.log("$.fn.showcaseVideo showcaseVideoSettings -----> " + showcaseVideoSettings);

        if (showcaseVideoSettings.authorized) {
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

        console.log("$.fn.showcaseVideo showcaseVideoSettings.video -----> " + showcaseVideoSettings.video);
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
            /* Options */
        }, function () {
            var showcasePlayerFunc = this;
            resizeVideoJS(showcasePlayerFunc);

            //if (showcaseVideoSettings.messageid.length > 0) {
            if (showcaseVideoSettings.message_id && showcaseVideoSettings.message_id != "undefined") {
                messageAdd = "&messageid=" + showcaseVideoSettings.message_id;
            } else {
                messageAdd = "";
            }

            showcasePlayerFunc.src({
                //type: "video/mp4",
                type: "application/x-mpegURL",
                //src: sourseURL + showcaseVideoSettings.file + messageAdd
                //src: sourseURL + showcaseVideoSettings.video + '.mp4' // TODO: add message_id
                src: sourseURL + showcaseVideoSettings.video + '.m3u8' // TODO: add message_id
            });
            showcasePlayerFunc.controls(true);
            showcasePlayerFunc.load();
            showcasePlayerFunc.play();
            showcasePlayerFunc.on('ended', function () {
                /*
                 showcasePlayerFunc.src({
                 type: "video/mp4",
                 src: "https://r7.cf1.rackcdn.com/.mp4"
                 });
                 showcasePlayerFunc.load();
                 showcasePlayerFunc.play();*/
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
            console.log("$.fn.showcaseVideo showcaseVideoSettings.file -----> " + showcaseVideoSettings.video);
            $("#videme-minivideo").html("<video id=\"my_video2\" class=\"video-js vjs-default-skin video-down\"></video> \
				<button id=\"closevideo\" type=\"button\" class=\"close closevideo hidden\" aria-label=\"Close\"> \
					<span aria-hidden=\"true\">&times;</span> \
				</button> \
			");
            var miniPlayer = videojs('my_video2', {
                /* Options */
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
                    /*
                     miniPlayerFunc.src({
                     type: "video/mp4",
                     src: "https://r7.cf1.rackcdn.com/.mp4"
                     });
                     miniPlayerFunc.load();
                     miniPlayerFunc.play();*/
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
    };

    $.fn.showcaseVideoAds = function (options) {
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
            /* Options */
        }, function () {
            var showcasePlayerFunc = this;
            /* Ads ********************************************************/
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
            /* Ads ********************************************************/

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
                /*
                 showcasePlayerFunc.src({
                 type: "video/mp4",
                 src: "https://r7.cf1.rackcdn.com/.mp4"
                 });
                 showcasePlayerFunc.load();
                 showcasePlayerFunc.play();*/
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
                /* Options */
            }, function () {
                var miniPlayerFunc = this;
                scrollSetting(miniPlayerFunc);
                //miniPlayer.hide();
                miniPlayerFunc.muted(true);
                miniPlayerFunc.src({type: "video/mp4", src: sourseURL + showcaseVideoSettings.file});
                miniPlayerFunc.load();
                miniPlayerFunc.play();
                miniPlayerFunc.on('ended', function () {
                    /*
                     miniPlayerFunc.src({
                     type: "video/mp4",
                     src: "https://r7.cf1.rackcdn.com/.mp4"
                     });
                     miniPlayerFunc.load();
                     miniPlayerFunc.play();*/
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
    };

    $.fn.showcaseText = function (options) {
        showcaseTextSettings = $.extend({}, options);
        //console.log("$.fn.showcaseText showcaseTextSettings -----> " + JSON.stringify(showcaseTextSettings));
        $(".videme-showcase-subject").html(showcaseTextSettings.title);
        $(".videme-showcase-message").html(showcaseTextSettings.content);
        //$(".videme-showcase-createdat").html(convertTimestamp(showcaseTextSettings.created_at));
        $(".videme-showcase-createdat").html(timeToWord(showcaseTextSettings.created_at));
        if (showcaseTextSettings.tags) {
            console.log("$.fn.showcaseText showcaseTextSettings.tags -----> " + JSON.stringify(showcaseTextSettings.tags));
            var tags = [];
            tags = $.parseJSON(showcaseTextSettings.tags);
            //console.log("$.fn.showcaseText tags -----> " + tags);
            $.each(tags, function (key, value) {
                //console.log("$.fn.showcaseText tags -----> " + value);
                $(".videme-showcase-tags").append('<a href="https://vide.me/search/?q=' + value + '" class="badge badge-primary">' + value + '</span> ');

            });
        } else {
            //console.log("$.fn.showcaseText showcaseTextSettings.tags -----> empty");
        }
    };

    $.fn.showcaseUserInfo = function (options) {
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
    };

    $.fn.ownerSignUserInfo = function (options) {
        ownerSignUserInfoSettings = $.extend({}, options);
        //console.log("$.fn.ownerSignUserInfo ownerSignUserInfoSettings -----> " + JSON.stringify(ownerSignUserInfoSettings));
        if (!$.isEmptyObject(ownerSignUserInfoSettings.user_cover)) {
            //console.log("$.fn.showcaseUserPicture user_cover.length > 0 -----> " + JSON.stringify(showcaseUserPictureSettings));
            $(".videme-owner-sign-user_cover").attr('src', ownerSignUserInfoSettings.user_cover);
        }
        if (!$.isEmptyObject(ownerSignUserInfoSettings.user_picture)) {
            $(".videme-owner-sign-user_picture").attr('src', ownerSignUserInfoSettings.user_picture);
        }
        if (!$.isEmptyObject(ownerSignUserInfoSettings.spring)) {
            $(".videme-owner-sign_display_name").html("<a href='https://vide.me/" + ownerSignUserInfoSettings.spring + "'>" + ownerSignUserInfoSettings.user_display_name + "</a>");
        } else {
            $(".videme-owner-sign_display_name").html(ownerSignUserInfoSettings.user_display_name);
        }
        if (!$.isEmptyObject(ownerSignUserInfoSettings.bio)) $(".videme-owner-sign-bio").html(ownerSignUserInfoSettings.bio);
        if (!$.isEmptyObject(ownerSignUserInfoSettings.country)) $(".videme-owner-sign-country").html(
            '<i class="fa fa-globe videme-country-marker"></i>' +
            '<div class="videme-country-name">' + ownerSignUserInfoSettings.country + '</div>'
        );
        if (!$.isEmptyObject(ownerSignUserInfoSettings.city)) $(".videme-owner-sign-city").html(
            '<i class="fa fa-map-marker videme-city-marker"></i>' +
            '<div class="videme-city-name">' + ownerSignUserInfoSettings.city + '</div>'
        );
    };

    $.fn.showcaseUserPicture = function (options) {
        showcaseUserPictureSettings = $.extend({}, options);
        //console.log("$.fn.showcaseUserPicture -----> " + JSON.stringify(showcaseUserPictureSettings));
        //if (showcaseUserPictureSettings.user_picture.length > 0) {
        if (!$.isEmptyObject(showcaseUserPictureSettings.user_picture)) {
            //$(".videme-owner-sign-user_picture").attr('src', showcaseUserPictureSettings.user_picture);
            $(".videme-showcase-user_picture").attr('src', showcaseUserPictureSettings.user_picture);
        }
        //if (showcaseUserPictureSettings.user_cover.length > 0) {
        if (!$.isEmptyObject(showcaseUserPictureSettings.user_cover)) {
            //console.log("$.fn.showcaseUserPicture user_cover.length > 0 -----> " + JSON.stringify(showcaseUserPictureSettings));
            //$(".videme-owner-sign-user_cover").attr('src', showcaseUserPictureSettings.user_cover);
        }
        //$('#nav_user_brand').attr('src', showcaseUserPictureSettings.user_picture);
        //$('.videme-you-sign-user_picture').attr('src', showcaseUserPictureSettings.user_picture);
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

    $.fn.showcaseButton = function (options) {
        showcaseButtonSettings = $.extend({}, options);
        //console.log("$.fn.showcaseButton showcaseButtonSettings -----> " + JSON.stringify(showcaseButtonSettings));
        // For reply button


        if (showcaseButtonSettings.showcaseButton['reply-toggle']) {
            console.log("$.fn.showcaseButton showcaseButtonSettings.conferenceId -----> " + showcaseButtonSettings.conferenceId);

            //var rec = jQuery.parseJSON(showcaseButtonSettings.recipients);
            //console.log("$.fn.showcaseButton showcaseButtonSettings.recipients[0] stringify -----> " + rec[0]);
            //var emails = "";
            /*rec.forEach(function(item, i, arr) {
                console.log( i + ": " + item + " (массив:" + arr + ")" );
                var numEmail = i + 1;
                if (numEmail == 1) numEmail = "";
                //console.log("&email" + numEmail + "=" + item);
                emails += "&email" + numEmail + "=" + item;
            });*/

            //console.log("$.fn.showcaseButton emails -----> " + emails);

            /*var authorizedData2 = $.fn.getAuthorizedData(); // TODO: Убрать повторное использование

            //console.log("$.fn.showcaseButton authorizedData.userEmail -----> " + authorizedData.userEmail); ////////// =======================
            console.log("$.fn.showcaseButton JSON.stringify(authorizedData) -----> " + JSON.stringify(authorizedData2)); ////////// =======================
            var myEmailKey = jQuery.inArray(authorizedData2.userEmail, rec);
            console.log("$.fn.showcaseButton myEmailKey -----> " + myEmailKey);
                rec[myEmailKey] = rec[0];
            rec[0] = authorizedData.userEmail;

            console.log("$.fn.showcaseButton rec -----> " + rec);*/
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
    };

    // TODO: Можно убрать
    $.fn.disabledButton = function (options) {
        disabledButtonSettings = $.extend({
            button: 'submit'
        }, options);
        $(this).html(VidemeProgress);
        return this.each(function () {
            console.log("disabled: ");
            $('#' + disabledButtonSettings.button).removeAttr('disabled');
        });
    };

    $.fn.showcaseVideoTextButton = function (options) {
        showcaseVideoTextButtonSettings = $.extend({}, options);
        //console.log("$.fn.videme-showcase-user_picture showcaseVideoTextButtonSettings -----> " + JSON.stringify(showcaseVideoTextButtonSettings));
        $.fn.showcaseVideo(showcaseVideoTextButtonSettings);
        $.fn.ownerSignUserInfo(showcaseVideoTextButtonSettings);
        $.fn.showcaseUserPicture(showcaseVideoTextButtonSettings);
        $.fn.showcaseUserInfo(showcaseVideoTextButtonSettings);
        $.fn.showcaseText(showcaseVideoTextButtonSettings);
        $.fn.showcaseButton(showcaseVideoTextButtonSettings);
    };

    $.fn.showcaseVideoTextButtonAds = function (options) {
        showcaseVideoTextButtonSettings = $.extend({}, options);
        console.log("$.fn.showcaseVideoTextButton showcaseVideoTextButtonSettings -----> " + JSON.stringify(showcaseVideoTextButtonSettings));
        $.fn.showcaseVideoAds(showcaseVideoTextButtonSettings);
        $.fn.showcaseText(showcaseVideoTextButtonSettings);
        $.fn.showcaseButton(showcaseVideoTextButtonSettings);
    };
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

    $.fn.showSearchArticle = function (options) { // TODO: Remove
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
                    /*console.log("$.fn.showSearchArticle parseSearchArticle -----> " + $.fn.showArticleTile({
                        showArticleTile: parseSearchArticle(data),
                        tempObject: tempObject,
                        button: "new"
                    }));*/

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
    };

    $.fn.showSearchPeoples = function (options) {
        showSearchPeoplesSettings = $.extend({
            limit: 3,
            showcaseResultSearchPeoples: "#videme-search-peoples-tile"
        }, options);
        if ($(this).length) {
            var tempObject = $(this);
        } else {
            var tempObject = $(showSearchPeoplesSettings.showcaseResultSearchPeoples);
        }
        tempObject.html(VidemeProgress);
        var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/user/search/?q=" + showSearchPeoplesSettings.q + "&limit=" + showSearchPeoplesSettings.limit + "&videmecallback=?",
            function (data) {
                var response_time = Math.round(performance.now() - start_time);
                $(showSearchItemByTextSettings.showcaseResultResponse).append('<small>API response time: ' + response_time + ' milliseconds. ' + data.length + ' items. </small>');
                if (!$.isEmptyObject(data)) {
                    tempObject.html(
                        showTileDoorbellSignSmall(
                            parseSearchPeoplesForDoorbellSign(data), tempObject
                        )
                    );
                } else {
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
    };

    $.fn.showSearchItemByText = function (options) {
        showSearchItemByTextSettings = $.extend({
            limit: 3,
            showcaseSearchArticle: "#videme-search-article-tile"
        }, options);
        if ($(this).length) {
            var tempObject = $(this);
        } else {
            var tempObject = $(showSearchItemByTextSettings.showcaseSearchArticle);
        }
        tempObject.html(VidemeProgress);
        var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/post/search/?q=" + showSearchItemByTextSettings.q + "&limit=" + showSearchItemByTextSettings.limit + "&videmecallback=?",
            function (data) {
                if (!$.isEmptyObject(data)) {
                    var response_time = Math.round(performance.now() - start_time);
                    $(showSearchItemByTextSettings.showcaseResultResponse).append('<small>API response time: ' + response_time + ' milliseconds. ' + data.length + ' items. </small>');
                    tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "shownext"));            } else {
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
    };

    $.fn.showPopTags = function (options) {
        showMostPopTagsSettings = $.extend({
            /*limit: 3,*/
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
        var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/post/show_pop_tags/?videmecallback=?",
            function (data) {
                //console.log("$.fn.showPopTags getJSON -----> " + JSON.stringify(data));
                //console.log("$.fn.showPopTags getJSON data.tags -----> " + JSON.stringify(data.tags));
                var response_time = Math.round(performance.now() - start_time);
                //console.log('doTasks took ' + response_time + ' milliseconds to execute.');
                $(showMostPopTagsSettings.showcaseResultResponse).append('<p><small>API response time: ' + response_time + ' milliseconds</small></p>');
                //if (data.tags) {
                if (!$.isEmptyObject(data)) {
                    //console.log("$.fn.showPopTags data.tags -----> yes");

                    //$.each(data.tags, function (key, value) {
                    $.each(data, function (key, value) {
                        //console.log("$.fn.showPopTags data.tags -----> cnt: " + value.cnt + " tag " + value.tag);
                        //console.log("$.fn.showPopTags each value -----> " + JSON.stringify(value));
                        html.push("<a href=\"https://www.vide.me/search/?q=" + value.tag + "\" class=\"badge badge-primary\"> " + value.tag + " </a> ");
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
    };

    $.fn.showMyArticle = function (options) {
        /*articleShowMySettings = $.extend({
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
        //});*/

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
    };

    $.fn.showMyArticleDraft = function (options) {
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
    };

    $.fn.showCountUserArticle = function (options) {
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
    };


    $.fn.showTileButton = function (options) {
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
    };

    $.fn.showArticleTile = function (options) {
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
    };

    function parseArticleShowNew(parseArticleShowNew) {
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
    }

    function parseSearchArticle(parseSearchArticle) {
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
    }

    /***************************************************************************
     v2 Функция показать Контакты
     ***************************************************************************/
    $.fn.showRelation = function (options) {
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
    };

    /***************************************************************************
     v2 Relations to me
     ***************************************************************************/
    $.fn.showRelationToMe = function (options) {
        //console.log("$.fn.showRelation -----> ok");
        showRelationFromSpringSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showRelationToMe: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showRelationFromSpringSettings.showRelationToMe);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/relation/relations_to_me/?limit=" + showRelationFromSpringSettings.limit + "&videmecallback=?",
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
                    tempObject.html("Relations to me empty");
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
    $.fn.showRelationToSpring = function (options) {
        //console.log("$.fn.showRelation -----> ok");
        showRelationFromSpringSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showRelationToMe: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showRelationFromSpringSettings.showRelationToSpring);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        var url = parseUrl();

        $.getJSON("https://api.vide.me/v2/relation/relations_to_spring/?spring=" + url.spring + "&limit=" + showRelationFromSpringSettings.limit + "&videmecallback=?",
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
                    tempObject.html("Relations to me empty");
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
    $.fn.showRelationFromSpring = function (options) {
        //console.log("$.fn.showRelation -----> ok");
        showRelationFromSpringSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 100,
            showRelationToMe: "#videme-tile"
        }, options);
        if ($(this).length) {
            //console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showRelationFromSpringSettings.showRelationToSpring);
        }
        //console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        var url = parseUrl();

        $.getJSON("https://api.vide.me/v2/relation/relations_from_spring/?spring=" + url.spring + "&limit=" + showRelationFromSpringSettings.limit + "&videmecallback=?",
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
                    tempObject.html("Relations to me empty");
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
     v2 Функция показать List
     ***************************************************************************/
    $.fn.showList = function (options) {
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
        $.getJSON("https://api.vide.me/v2/list/?limit=" + showListSettings.limit + "&videmecallback=?",
            function (data) {
                if (!$.isEmptyObject(data)) {
                    //console.log("$.fn.showList data -----> yes " + JSON.stringify(data));
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
    };


    /***************************************************************************
     v2 Show List of Spring
     https://github.com/SergeyKozlov/vide.me-js/wiki/en:API_All#show-list-of-spring
     ***************************************************************************/
    $.fn.showSignsOfSpringForPublic = function (options) {
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
    };

    /***************************************************************************
     v2 Show List of Spring For Friends
     ***************************************************************************/
    $.fn.showSignsOfSpringForFriends = function (options) {
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
                    /*console.log("$.fn.showSignsOfSpringForFriends data -----> yes" + JSON.stringify(data));
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
                    tempObject.html(results.join(""));*/
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
    };

    /***************************************************************************
     v2 Show List of Spring Private
     ***************************************************************************/
    $.fn.showSignsOfSpringForPrivate = function (options) {
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
                    /*console.log("$.fn.showSignsOfSpringForPrivate data -----> yes" + JSON.stringify(data));
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
                    tempObject.html(results.join(""));*/
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
    };

    $.fn.getShareByOwnerId = function (options) {
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
    };

    /***************************************************************************
     Функции Нотификации
     ***************************************************************************/
    $.fn.processNotification = function (options) {
        console.log("$.fn.processNotification -----> ok");
        processNotificationSettings = $.extend({
            processNotification: "#process_notification",
            videmeProgress: ".videme-progress",
            do: "#do"
        }, options);
        if ($(this).length) {
            console.log("$.fn.processNotification $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.processNotification $(this) -----> nooo! " + $(this).length);
            var tempObject = $(processNotificationSettings.processNotification);
        }
        console.log("$.fn.processNotification tempObject -----> " + tempObject.length);
        $(processNotificationSettings.videmeProgress).html(VidemeProgress);
        $(processNotificationSettings.do).attr("disabled", true);
        tempObject.append();
        if (!tempObject.is('.in')) {
            tempObject.addClass('in');
            setTimeout(function () {
                tempObject.removeClass('in');
            }, 3200);
        }
    };

    $.fn.successNotification = function (options) {
        console.log("$.fn.successNotification -----> ok");
        successNotificationSettings = $.extend({
            successNotification: "#success_notification",
            videmeProgress: ".videme-progress",
            do: "#do"
        }, options);
        console.log("$.fn.successNotification -----> successNotificationSettings: " + JSON.stringify(successNotificationSettings));
        if ($(this).length) {
            console.log("$.fn.successNotification $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.successNotification $(this) -----> nooo! " + $(this).length);
            var tempObject = $(successNotificationSettings.successNotification);
        }
        console.log("$.fn.successNotification tempObject -----> " + tempObject.length);
        console.log("$.fn.successNotification successNotificationSettings.msg -----> " + successNotificationSettings.msg);
        $(successNotificationSettings.videmeProgress).empty();
        $(successNotificationSettings.do).attr("disabled", false);
        $.fn.lastNotification({
            msg: successNotificationSettings.msg
        });
        tempObject.append(successNotificationSettings.msg + "<br>");
        if (!tempObject.is('.in')) {
            tempObject.addClass('in');
            setTimeout(function () {
                tempObject.removeClass('in');
            }, 3200);
        }
    };

    $.fn.errorNotification = function (options) {
        console.log("$.fn.errorNotification -----> ok");
        errorNotificationSettings = $.extend({
            successNotification: "#error_notification",
            videmeProgress: ".videme-progress",
            do: "#do"
        }, options);
        if ($(this).length) {
            console.log("$.fn.errorNotification $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.errorNotification $(this) -----> nooo! " + $(this).length);
            var tempObject = $(errorNotificationSettings.successNotification);
        }
        console.log("$.fn.errorNotification tempObject -----> " + tempObject.length);
        $(errorNotificationSettings.videmeProgress).empty();
        $(errorNotificationSettings.do).attr("disabled", false);
        /*        $.fn.lastNotification({
         msg: errorNotificationSettings.msg
         });*/
        $.fn.lastNotification({
            msg: "<div class='alert alert-error span3'>Failed from timeout. Please try again later. " + JSON.stringify(errorNotificationSettings.msg) + " <span id='timer'></span> sec.</div><script type='text/javascript'>setTimeout('window.location.reload()', 6000); var t=5; function refr_time(){ if (t>1) { t--;  document.getElementById('timer').innerHTML=t; document.getElementById('timer').style.color = '#FF0000'; } else { document.getElementById('timer').style.color = '#FFA122'; } } var tm=setInterval('refr_time();' ,1000); </script>"
        });
        tempObject.append(JSON.stringify(errorNotificationSettings.msg) + "<br>");
        if (!tempObject.is('.in')) {
            tempObject.addClass('in');
            setTimeout(function () {
                tempObject.removeClass('in');
            }, 3200);
        }
    };

    $.fn.lastNotification = function (options) {
        console.log("$.fn.lastNotification -----> ok");
        lastNotificationSettings = $.extend({
            lastNotification: "#videme-result"
        }, options);
        if ($(this).length) {
            console.log("$.fn.errorNotification $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.errorNotification $(this) -----> nooo! " + $(this).length);
            var tempObject = $(lastNotificationSettings.lastNotification);
        }
        console.log("$.fn.errorNotification tempObject -----> " + tempObject.length);
        tempObject.html(lastNotificationSettings.msg);
    };

})
(jQuery);

/***************************************************************************
 *  Конец Jquery plugin Vide.me
 * *************************************************************************/

/*************************************************************
 tooltip go test
 **************************************************************/
$(document).on('click', '.go_test', function (event) {
    event.preventDefault();
    console.log("tooltip go_test -----> click");
    //$.fn.tooltip('hide');
    //$.fn.tooltip('update', 'test options');
    $.fn.tooltip('update', {'option1': 'val1', 'opt2': 'val2'});

});
/*************************************************************
 v2 Событие 4: нажата ссылка из списка контактов Contact
 **************************************************************/
$(document).on('click', 'a.showContactsItem', function (event) {
    event.preventDefault();
    console.log("a.contact-url -----> click");
    var $this = $(this);
    //var href = $this.attr('href');
    var email = $this.attr('email');
    $('#email').val(email);
    $('#modal-contacts').modal('hide');
    console.log("a.contact-url -----> email" + email);
});

/*************************************************************
 v2 Событие 2: нажата кнопка Редактировать контакт,
 отрисовка формы и кнопок в модальное окно
 **************************************************************/
$(document).on('click', '.contact-edit-toggle', function (event) {
    //console.log("a.contact-edit-toggle -----> click");
    event.preventDefault();
    var $this = $(this);
    var from_user_id = $this.attr('from_user_id');
    var to_user_id = $this.attr('to_user_id');
    var relation_email = $this.attr('relation_email');
    var relation = $this.attr('relation');
    $('#from_user_id').val(from_user_id);
    $('#to_user_id').val(to_user_id);
    $('#relation_email').val(relation_email);
    $('#relation').val(relation);
    $(".contact-del-toggle").attr("email", email);
    $(".contact-del-toggle").attr("to_user_id", $this.attr('to_user_id'));
});

/*************************************************************
 v2 Событие 4: нажата кнопка вызова и отрисовки
 кнопки удалить Contact во втором модальном окне
 **************************************************************/
$(document).on('click', '.contact-del-toggle', function (event) {
    event.stopPropagation();
    $('.videme-display').html($(".contact-del-toggle").attr("email"));
    $('#to_user_id').val($(".contact-del-toggle").attr("to_user_id"));
});

/*************************************************************
 v2 Событие 2: нажата ссылка на файл из плитки Inbox,
 отрисовка текста и кнопок в панель
 **************************************************************/
$(document).on('click', 'a.file-inbox-url', function (event) {
    console.log("a.file-inbox-url -----> click");
    console.log("a.file-inbox-url $(this).getAttributes() -----> " + JSON.stringify($(this).getAttributes()));
    event.preventDefault();
    $('html, body').animate({scrollTop: '0px'}, 300);
    $.fn.showcaseVideoTextButton(paddingButtonInbox($(this).getAttributes()));
});

/*************************************************************
 v2 Событие 2: нажата ссылка на файл из плитки Sent,
 отрисовка текста и кнопок в панель
 **************************************************************/
$(document).on('click', 'a.file-sent-url', function (event) {
    console.log("a.file-sent-url -----> click");
    event.preventDefault();
    $('html, body').animate({scrollTop: '0px'}, 300);
    $.fn.showcaseVideoTextButton(paddingButtonSent($(this).getAttributes()));
});

/*************************************************************
 v2 Событие 2: нажата ссылка на файл из плитки My,
 отрисовка текста и кнопок в панель
 **************************************************************/
$(document).on('click', 'a.file-my-url', function (event) {
    console.log("a.file-my-url -----> click");
    event.preventDefault();
    $('html, body').animate({scrollTop: '0px'}, 300);
    $.fn.showcaseVideoTextButton(paddingButtonMy($(this).getAttributes()));
});

/*************************************************************
 v2 Событие 2: нажата ссылка на файл из плитки MySpring,
 отрисовка текста и кнопок в панель
 **************************************************************/
$(document).on('click', 'a.file-myspring-url', function (event) {
    console.log("a.file-myspring-url -----> click");
    event.preventDefault();
    $('html, body').animate({scrollTop: '0px'}, 300);
    $.fn.showcaseVideoTextButton(paddingButtonMySpring($(this).getAttributes()));
});

/*************************************************************
 v2 Событие 2: нажата ссылка на файл из плитки Spring,
 отрисовка текста и кнопок в панель
 **************************************************************/
$(document).on('click', 'a.file-spring-url', function (event) {
    console.log("a.file-spring-url -----> click");
    event.preventDefault();
    $('html, body').animate({scrollTop: '0px'}, 300);
    $.fn.showcaseVideoTextButton(paddingButtonSpring($(this).getAttributes()));
});

/*************************************************************
 v2 Событие 3: нажата кнопка вызова и отрисовки контактов в модальном окне
 **************************************************************/
// TODO: Попробовать так:
/*
$('#myTabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
});
*/
$(document).on('click', '.contact-toggle', function (event) {
    console.log(".contact-toggle -----> click");
    event.stopPropagation();
    var $this = $(this);
    //var feedback = $this.attr('feedback');
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            $("#item-card").showItemCard({'item_id': $this.attr('item_id')});
            //$(".videme_item_card").itemCard($this);
            $(".videme-contact-list").html(VidemeProgress);
            $.getJSON("https://api.vide.me/v2/relation/?videmecallback=?",
                function (data) {
                    // TODO: Попробовать без куки nad
                    if (data) {
                        console.log(".contact-toggle data -----> yes" + JSON.stringify(data));
                        results = [];
                        $.each(data, function (key, value) {
                            if ($.isEmptyObject(value.user_display_name)) {
                                var user_display_name = value.user_email;
                            } else {
                                var user_display_name = value.user_display_name;
                            }
                            results.push("<a class='badge badge-primary contact-url' href='https://api.vide.me/v2/email/share/?user_id=" + value.user_id + "&item_id=" + $this.attr('item_id') + "&subject=Re: " + $this.attr('title') + "&message=" + $this.attr('content') + "&nad=" + $.cookie('vide_nad') + "' target='_blank'>" + user_display_name + "</a> ");
                        });
                        $('.videme-contact-list').html(results.join(""));
                    } else {
                        console.log(".contact-toggle data -----> no");
                        $('.videme-contact-list').html("No contact");
                    }
                })
                .done(function (data) {
                })
                .fail(function (data) {
                    $('.videme-contact-list').html(showError(data));
                })
                .always(function () {
                });
        } else {
            $('.videme-contact-list').html(showError("No file"));
        }
    } else {
        $('#modal-contact').modal('hide');
        $('#modal-signin').modal('show');
        $('#feedback').val(window.location.href);
    }
});

/*************************************************************
 v2 Событие 3: нажата кнопка вызова и отрисовки листов в модальном окне
 **************************************************************/
$(document).on('click', '.list-toggle', function (event) {
    console.log(".list-toggle -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            $(".videme-list-list").html(VidemeProgress);
            $(".videme-mini-img").html(VidemeProgress);
            $(".videme-mini-img").html("<img src='https://s3.amazonaws.com/img.vide.me/" + $this.attr('item_id') + ".jpg' class='videme-img-tile-my' width='190' height='108'>");
            if ($this.attr('title')) $(".videme-file-info").append("<b>" + $this.attr('title') + "</b><br>");
            if ($this.attr('content')) $(".videme-file-info").append($this.attr('content') + "<br>");
            if ($this.attr('created_at')) $(".videme-file-info").append($this.attr('created_at') + "<br>");

            //$(".videme-file-info").html("<b>" + $this.attr('title') + "</b><br>" + $this.attr('content') + "<br>" + $this.attr('created_at') + "<br>");
            $('#file').val($this.attr('file'));
            $.getJSON("https://api.vide.me/v2/list/?videmecallback=?",
                function (data) {
                    if (data) {
                        console.log(".list-toggle data -----> yes" + JSON.stringify(data));
                        var results = [];
                        $.each(data, function (key, value) {
                            results.push("<a class='list-url' href='https://api.vide.me/v2/items/share/?item=" + $this.attr('item_id') + "&list=" + value.title + "&nad=" + $.cookie('vide_nad') + "' target='_blank'><span class='label label-primary'>" + value.title + "</span></a> ");
                        });
                        //$(".videme-list-list").html("empty");
                        $('.videme-list-list').html(results.join(""));
                    } else {
                        console.log(".list-toggle data -----> no");
                        $('.videme-list-list').html("No list");
                    }
                })
                .done(function (data) {
                })
                .fail(function (data) {
                    $('.videme-list-list').html(showError(data));
                })
                .always(function () {
                });
        } else {
            $('.videme-list-list').html(showError("No file"));
        }
    } else {
        $('#modal-list').modal('hide');
        $('#modal-signin').modal('show');
        $('#feedback').val(window.location.href);
    }
});

/*************************************************************
 v2 Событие 3: нажата кнопка вызова и отрисовки
 кнопки удалить Inbox в модальном окне
 **************************************************************/
$(document).on('click', '.del-inbox-toggle', function (event) {
    console.log(".del-inbox-toggle -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($this.attr('message_id')) {
        $(".videme_item_card").itemCard($this);
        $('.videme-del-list').html("\
                <button type='button' class='btn btn-primary' data-dismiss='modal'>\
                    Сancel\
                </button> \
                <a class='del-inbox-url' message_id='https://api.vide.me/v2/message/inbox/delete/?message_id=" + $this.attr('message_id') + "&nad=" + $.cookie('vide_nad') + "' target='_blank'>\
                <button type='button' class='btn btn-danger' id='do'>\
                Delete\
                <div class='videme-progress'></div>\
                </button>\
                </a>");
    } else {
        $('.videme-del-list').html(showError("No file"));
    }
});

/*************************************************************
 v2 Событие 3: нажата кнопка вызова и отрисовки
 кнопки удалить Sent в модальном окне
 **************************************************************/
$(document).on('click', '.del-sent-toggle', function (event) {
    console.log(".del-sent-toggle -----> click");
    event.stopPropagation();
    if ($('.del-sent-toggle').attr('message_id')) {
        $(".videme_item_card").itemCard($('.del-sent-toggle'));
        $('.videme-del-list').html("\
                <button type='button' class='btn btn-primary' data-dismiss='modal'>\
                    Сancel\
                </button> \
                <a class='del-sent-url' item_id='https://api.vide.me/v2/message/sent/delete/?message_id=" + $('.del-sent-toggle').attr('message_id') + "&nad=" + $.cookie('vide_nad') + "' target='_blank'>\
                <button type='button' class='btn btn-danger' id='do'>\
                Delete\
                <div class='videme-progress'></div>\
                </button>\
                </a>");
    } else {
        $('.videme-del-list').html(showError("No file"));
    }
});

/*************************************************************
 v2 Событие 3: нажата кнопка вызова и отрисовки
 кнопки удалить MY в модальном окне
 **************************************************************/
$(document).on('click', '.del-my-toggle', function (event) {
    console.log(".del-my-toggle -----> click");
    event.stopPropagation();
    var $this = $(this);

    if ($this.attr('item_id')) {
        $(".videme_item_card").itemCard($this);
        $('.videme-del-list').html("\
                <button type='button' class='btn btn-primary' data-dismiss='modal'>\
                    Сancel\
                </button> \
                <a class='del-my-url' item_id='https://api.vide.me/v2/items/my/delete/?item_id=" + $this.attr('item_id') + "&nad=" + $.cookie('vide_nad') + "' target='_blank'>\
                <button type='button' class='btn btn-danger' id='do'>\
                Delete\
                <div class='videme-progress'></div>\
                </button>\
                </a>");
    } else {
        $('.videme-del-list').html(showError("No file"));
    }
});

/*************************************************************
 v2 Событие 1: нажата кнопка вызова и отрисовки
 кнопки edit MY
 **************************************************************/
$(document).on('click', '.item-edit-toggle', function (event) {
    console.log(".item-edit-toggle -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($this.attr('item_id')) {
        if ($.cookie('vide_nad')) {
            $('#nad').val($.cookie('vide_nad'));
        } else {
            console.log("item-edit-toggle -----> no cookie");
        }
        $('#item_id').val($this.attr('item_id'));
        $('#cover').attr('src', 'https://s3.amazonaws.com/img.vide.me/' + $this.attr('item_id') + '.jpg');
        $('#title').val($this.attr('title'));
        $('#content').val($this.attr('content'));
        $('#access').val($this.attr('access'));
        $('.del-my-toggle').attr('item_id', $this.attr('item_id'));
        $('.del-my-toggle').attr('user_display_name', $this.attr('user_display_name'));
        $('.del-my-toggle').attr('title', $this.attr('title'));
        $('.del-my-toggle').attr('content', $this.attr('content'));
        $('.del-my-toggle').attr('created_at', $this.attr('created_at'));
        var tagsR = $this.attr('tags');
        if (tags) {
            var tags = [];
            tags = $.parseJSON(tagsR);
            //console.log("$.fn.showcaseText tags -----> " + tags);
            $.each(tags, function (key, value) {
                //console.log("$.fn.showcaseText tags -----> " + value);
                $("#tags").append('<a href="https://www.vide.me/search/?q=' + value + '" class="badge badge-primary">' + value + '</span> ');

            });
        } else {
            //console.log("$.fn.showcaseText showcaseTextSettings.tags -----> empty");
        }
    } else {
        $('.title').html(showError("No file"));
    }
});

/*************************************************************
 v2 Событие 3: нажата кнопка вызова и отрисовки
 кнопки удалить sharefile в модальное окно
 **************************************************************/
$(document).on('click', '.del-sharefile-toggle', function (event) {
    console.log(".del-sharefile-toggle -----> click");
    event.stopPropagation();
    $(".videme-mini-img").html(VidemeProgress);
    $(".videme-mini-img").html("<img src='https://api.vide.me/img/?i=" + $('.del-sharefile-toggle').attr('file') + ".jpg' class='videme-mini-img' width='190' height='108'>");
    $('.videme-del-list').html("\
<button type='button' class='btn btn-primary' data-dismiss='modal'>\
	Сancel\
</button> \
<a class='del-sharefile-url' file='https://api.vide.me/file/noshare/?file=" + $('.del-sharefile-toggle').attr('file') + "&nad=" + $.cookie('vide_nad') + "' target='_blank'>\
<button type='button' class='btn btn-danger' id='do'>\
Delete\
<div class='videme-progress'></div>\
</button>\
</a>\
");
});

/*************************************************************
 v2 Событие 3: нажата кнопка вызова и отрисовки
 кнопки удалить article
 **************************************************************/
$(document).on('click', '.del-article-toggle', function (event) {
    console.log(".del-article-toggle -----> click");
    event.stopPropagation();
    if ($('.del-article-toggle').attr('article')) {
        $(".videme-mini-img").html(VidemeProgress);
        $(".videme-mini-img").html("<img src='" + $('.del-article-toggle').attr('cover') + "' class='videme-mini-img' width='190' height='108'>");
        $('.videme-del-list').html("\
<button type='button' class='btn btn-primary' data-dismiss='modal'>\
	Сancel\
</button> \
<a class='del-article-url' article='https://api.vide.me/article/remove/?article=" + $('.del-article-toggle').attr('article') + "&nad=" + $.cookie('vide_nad') + "' target='_blank'>\
<button type='button' class='btn btn-danger' id='do'>\
Delete\
<div class='videme-progress'></div>\
</button>\
</a>\
");
    } else {
        $('.videme-del-list').html(showError("No file"));
    }
});

/*************************************************************
 v2 Событие 4: нажата ссылка из кнопки relation_connect
 **************************************************************/
$(document).on('click', 'a.relation_connect', function (event) {
    console.log("a.relation_connect -----> click");
    event.preventDefault();
    var $this = $(this);
    var feedback = $this.attr('feedback');
    if ($.cookie('vide_nad')) {
        var user_id = $this.attr('user_id');
        user_id.replace(/.*(?=#[^\s]+$)/, '');
        $.ajax({
            //type: 'post',
            url: 'https://api.vide.me/v2/relation/connect/?user_id=' + user_id + '&nad=' + $.cookie('vide_nad'),
            beforeSend: function () {
                $.fn.processNotification();
            },
            success: function (msg) {
                //$('#modal-del').modal('hide');
                //$.fn.showRelation();
                $.fn.successNotification({
                    msg: msg
                });
            },
            error: function (msg) {
                //$('#modal-del').modal('hide');
                //$.fn.showRelation();
                $.fn.errorNotification({
                    msg: msg
                });
            }
        });
    } else {
        $('#modal-signin').modal('show');
        $('#feedback').val(feedback);
    }
});
/*************************************************************
 v2 click on create_new_article
 **************************************************************/
$(document).on('click', 'a.create_new_article', function (event) {
    console.log("a.create_new_article -----> click");
    event.preventDefault();
    ifAutorisedGotoUrl($(this));
});
/*************************************************************
 v2 Событие 4: нажата ссылка из кнопки удалить файл Inbox
 **************************************************************/
$(document).on('click', 'a.del-inbox-url', function (event) {
    console.log("a.del-inbox-url -----> click");
    event.preventDefault();
    var $this = $(this);
    var href = $this.attr('message_id');
    href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        //type: 'post',
        url: href,
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $('#modal-del').modal('hide');
            $.fn.fileInbox();
            $.fn.successNotification({
                msg: msg
            });
        },
        error: function (msg) {
            $('#modal-del').modal('hide');
            $.fn.fileInbox();
            $.fn.errorNotification({
                msg: msg
            });
        }
    });
});

/*************************************************************
 v2 Событие 4: нажата ссылка из кнопки удалить файл Sent
 **************************************************************/
$(document).on('click', 'a.del-sent-url', function (event) {
    console.log("a.del-sent-url -----> click");
    event.preventDefault();
    var $this = $(this);
    var href = $this.attr('message_id');
    href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        type: 'post',
        url: href,
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $('#modal-del').modal('hide');
            $.fn.fileSent();
            $.fn.successNotification({
                msg: msg
            });
        },
        error: function (msg) {
            $('#modal-del').modal('hide');
            $.fn.fileSent();
            $.fn.errorNotification({
                msg: msg
            });
        }
    });
});

/*************************************************************
 v2 Событие 4: нажата ссылка из кнопки удалить файл My
 **************************************************************/
$(document).on('click', 'a.del-my-url', function (event) {
    console.log("a.del-my-url -----> click");
    event.preventDefault();
    var $this = $(this);
    var href = $this.attr('item_id');
    href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        type: 'post',
        url: href,
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $('#modal-del').modal('hide');
            $.fn.fileMy();
            $.fn.successNotification({
                msg: msg
            });
        },
        error: function (msg) {
            $('#modal-del').modal('hide');
            $.fn.fileMy();
            $.fn.errorNotification({
                msg: msg
            });
        }
    });
});

/*************************************************************
 v2 Событие 4: нажата ссылка из кнопки удалить файл sharefile
 **************************************************************/
$(document).on('click', 'a.del-sharefile-url', function (event) {
    console.log("a.del-sharefile-url -----> click");
    event.preventDefault();
    var $this = $(this);
    var href = $this.attr('file');
    href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        type: 'post',
        url: href,
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $('#modal-del').modal('hide');
            $.fn.fileMySpring();
            $.fn.successNotification({
                msg: msg
            });
        },
        error: function (msg) {
            $('#modal-del').modal('hide');
            $.fn.fileMySpring();
            $.fn.errorNotification({
                msg: msg
            });
        }
    });
});

/*************************************************************
 v2 Событие 4: нажата ссылка из кнопки удалить файл Inbox
 **************************************************************/
$(document).on('click', 'a.del-article-url', function (event) {
    console.log("a.del-article-url -----> click");
    event.preventDefault();
    var $this = $(this);
    var href = $this.attr('article');
    href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        //type: 'post',
        url: href,
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $('#modal-del-article').modal('hide');
            $.fn.successNotification({
                msg: msg
            });
            window.location.href = "https://vide.me/article/my/html/";
        },
        error: function (msg) {
            $('#modal-del-article').modal('hide');
            $.fn.errorNotification({
                msg: msg
            });
            window.location.href = "https://vide.me/article/my/html/";
        }
    });
});

/*************************************************************
 v2 Событие 4: нажата ссылка из списка контактов
 **************************************************************/
$(document).on('click', 'a.contact-url', function (event) {
    console.log("a.contact-url -----> click");
    event.preventDefault();
    var $this = $(this);
    var href = $this.attr('href');
    href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        //type: 'post',
        url: href,
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $('#modal-contact').modal('hide');
            $.fn.successNotification({
                msg: msg
            });
        },
        error: function (msg) {
            $('#modal-contact').modal('hide');
            $.fn.errorNotification({
                msg: msg
            });
        }
    });
});

/*************************************************************
 v2 Событие 4: нажата ссылка из списка листов
 **************************************************************/
$(document).on('click', 'a.list-url', function (event) {
    var $this = $(this);
    var href = $this.attr('href');
    event.preventDefault();
    href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        url: href,
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $('#modal-list').modal('hide');
            $.fn.successNotification({
                msg: msg
            });
        },
        error: function (msg) {
            $('#modal-list').modal('hide');
            $.fn.errorNotification({
                msg: msg
            });
        }
    });
});


/*
 Copyright (c) 2012, Northfield X Ltd
 All rights reserved.

 Modified BSD License

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.
 Neither the name of the <organization> nor the
 names of its contributors may be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
(function (d) {
    var k = {
        seconds: 10,
        color: "rgba(255, 255, 255, 0.8)",
        height: null,
        width: null
    }, e = 3 * Math.PI / 2, g = Math.PI / 180, f = function (b, a, c) {
        null === a.width && (a.width = b.width());
        null === a.height && (a.height = b.height());
        this.settings = a;
        this.jquery_object = b;
        this.interval_id = null;
        this.current_value = 360;
        this.initial_time = new Date;
        this.accrued_time = 0;
        this.callback = c;
        this.is_paused = !0;
        this.is_reversed = "undefined" != typeof a.is_reversed ? a.is_reversed : !1;
        this.jquery_object.html('<canvas class="pie_timer" width="' + a.width +
            '" height="' + a.height + '"></canvas>');
        this.canvas = this.jquery_object.children(".pie_timer")[0]
    };
    f.prototype = {
        start: function () {
            this.is_paused && (this.initial_time = new Date - this.accrued_time, 0 >= this.current_value && (this.current_value = 360), this.interval_id = setInterval(d.proxy(this.run_timer, this), 40), this.is_paused = !1)
        }, pause: function () {
            this.is_paused || (this.accrued_time = new Date - this.initial_time, clearInterval(this.interval_id), this.is_paused = !0)
        }, run_timer: function () {
            if (this.canvas.getContext) if (this.elapsed_time =
                (new Date - this.initial_time) / 1E3, this.current_value = 360 * Math.max(0, this.settings.seconds - this.elapsed_time) / this.settings.seconds, 0 >= this.current_value) clearInterval(this.interval_id), this.canvas.width = this.settings.width, d.isFunction(this.callback) && this.callback.call(), this.is_paused = !0; else {
                this.canvas.width = this.settings.width;
                var b = this.canvas.getContext("2d"), a = [this.canvas.width, this.canvas.height],
                    c = Math.min(a[0], a[1]) / 2, a = [a[0] / 2, a[1] / 2], h = this.is_reversed;
                b.beginPath();
                b.moveTo(a[0], a[1]);
                b.arc(a[0], a[1], c, h ? e - (360 - this.current_value) * g : e - this.current_value * g, e, h);
                b.closePath();
                b.fillStyle = this.settings.color;
                b.fill()
            }
        }
    };
    var l = function (b, a) {
        var c = d.extend({}, k, b);
        return this.each(function () {
            var b = d(this), e = new f(b, c, a);
            b.data("pie_timer", e)
        })
    }, m = function (b) {
        b in f.prototype || d.error("Method " + b + " does not exist on jQuery.pietimer");
        var a = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var c = d(this).data("pie_timer");
            if (!c) return !0;
            c[b].apply(c, a)
        })
    };
    d.fn.pietimer =
        function (b) {
            return "object" === typeof b || !b ? l.apply(this, arguments) : m.apply(this, arguments)
        }
})(jQuery);

/************************************************************************
 * Vide.me
 * **********************************************************************/

var VidemeProgress = "<img src='data:image/gif;base64,R0lGODlhDQAMAKIAAP///7W1ta2trXNzczExMf4BAgAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAFACwAAAAADQAMAAADIgi6zCIghDilejRbgK2fHPRloVaB3Umm5iWqGzuW49bcQAIAIfkEBQoABQAsAAABAAMACgAAAwhYRMrb8ElHEwAh+QQFCgAFACwAAAEADAAKAAADHlgzRVRCQLnai1Mxl3HlmLddkmh11IhqZ5i25QvGCQAh+QQFCgAFACwAAAEACQAKAAADGVgiNVOEKOagXO3FmS2vGwZelEZ2YemJZgIAIfkEBQoABQAsBAABAAgACgAAAxYYUTNFRDEHZXtx3appnpjliWFXglACACH5BAUKAAUALAcAAQAFAAoAAAMNGFEzym61N2WE9FZsEwA7' />";

/***************************************************************************
 * Функции Vide.me
 ***************************************************************************/

$(document).ready(function () {

    // Шаги алгоритма ECMA-262, 5-е издание, 15.4.4.18
    // Ссылка (en): http://es5.github.io/#x15.4.4.18
    // Ссылка (ru): http://es5.javascript.ru/x15.4.html#x15.4.4.18
    if (!Array.prototype.forEach) {

        Array.prototype.forEach = function (callback, thisArg) {

            var T, k;

            if (this == null) {
                throw new TypeError(' this is null or not defined');
            }

            // 1. Положим O равным результату вызова ToObject passing the |this| value as the argument.
            var O = Object(this);

            // 2. Положим lenValue равным результату вызова внутреннего метода Get объекта O с аргументом "length".
            // 3. Положим len равным ToUint32(lenValue).
            var len = O.length >>> 0;

            // 4. Если IsCallable(callback) равен false, выкинем исключение TypeError.
            // Смотрите: http://es5.github.com/#x9.11
            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            // 5. Если thisArg присутствует, положим T равным thisArg; иначе положим T равным undefined.
            if (arguments.length > 1) {
                T = thisArg;
            }

            // 6. Положим k равным 0
            k = 0;

            // 7. Пока k < len, будем повторять
            while (k < len) {

                var kValue;

                // a. Положим Pk равным ToString(k).
                //   Это неявное преобразование для левостороннего операнда в операторе in
                // b. Положим kPresent равным результату вызова внутреннего метода HasProperty объекта O с аргументом Pk.
                //   Этот шаг может быть объединён с шагом c
                // c. Если kPresent равен true, то
                if (k in O) {

                    // i. Положим kValue равным результату вызова внутреннего метода Get объекта O с аргументом Pk.
                    kValue = O[k];

                    // ii. Вызовем внутренний метод Call функции callback с объектом T в качестве значения this и
                    // списком аргументов, содержащим kValue, k и O.
                    callback.call(T, kValue, k, O);
                }
                // d. Увеличим k на 1.
                k++;
            }
            // 8. Вернём undefined.
        };
    }

    /*
     theDate = new Date();
     theHours = theDate.getHours();
     if (theHours >= 0 ) {$('body').css('background-image', 'url(https://ea1116048a2ffc61f8b7-d479f182e30f6e6ac2ebc5ce5ab9de7b.ssl.cf1.rackcdn.com/bgn.png)');}
     if (theHours >= 0 ) {$('body').css('background-color', '#9baecb');}
     if (theHours >= 0 ) {$('.navbar-inner').css('background-image', 'url(https://ea1116048a2ffc61f8b7-d479f182e30f6e6ac2ebc5ce5ab9de7b.ssl.cf1.rackcdn.com/bgn.png)');}
     if (theHours >= 4 ) {$('body').css('background-image', 'url(https://ea1116048a2ffc61f8b7-d479f182e30f6e6ac2ebc5ce5ab9de7b.ssl.cf1.rackcdn.com/bgm.png)');}
     if (theHours >= 4 ) {$('body').css('background-color', '#c2cd7b');}
     if (theHours >= 4 ) {$('.navbar-inner').css('background-image', 'url(https://ea1116048a2ffc61f8b7-d479f182e30f6e6ac2ebc5ce5ab9de7b.ssl.cf1.rackcdn.com/bgm.png)');}
     if (theHours >= 9 ) {$('body').css('background-image', 'url(https://ea1116048a2ffc61f8b7-d479f182e30f6e6ac2ebc5ce5ab9de7b.ssl.cf1.rackcdn.com/bgd.png)');}
     if (theHours >= 9 ) {$('body').css('background-color', '#d9eefa');}
     if (theHours >= 9 ) {$('.navbar-inner').css('background-image', 'url(https://ea1116048a2ffc61f8b7-d479f182e30f6e6ac2ebc5ce5ab9de7b.ssl.cf1.rackcdn.com/bgd.png)');}
     if (theHours >= 18 ) {$('body').css('background-image', 'url(https://ea1116048a2ffc61f8b7-d479f182e30f6e6ac2ebc5ce5ab9de7b.ssl.cf1.rackcdn.com/bge.png)');}
     if (theHours >= 18 ) {$('body').css('background-color', '#bcd9ea');}
     if (theHours >= 18 ) {$('.navbar-inner').css('background-image', 'url(https://ea1116048a2ffc61f8b7-d479f182e30f6e6ac2ebc5ce5ab9de7b.ssl.cf1.rackcdn.com/bge.png)');}
     if (theHours >= 22 ) {$('body').css('background-image', 'url(https://ea1116048a2ffc61f8b7-d479f182e30f6e6ac2ebc5ce5ab9de7b.ssl.cf1.rackcdn.com/bgn.png)');}
     if (theHours >= 22 ) {$('body').css('background-color', '#9baecb');}
     if (theHours >= 22 ) {$('.navbar-inner').css('background-image', 'url(https://ea1116048a2ffc61f8b7-d479f182e30f6e6ac2ebc5ce5ab9de7b.ssl.cf1.rackcdn.com/bgn.png)');}
     */
    /*
     if ($.cookie('vide_nad') == null) {
     $('#user_brand').hide('slow');
     $('#user_info').hide('slow');
     $('#user_hello').hide('slow');
     $('#user_name').hide('slow');
     $('#user_email').hide('slow');
     }
     if ($.cookie('vide_nad')) {
     $('#oa').hide('slow');
     $('#nav_no_login').hide('slow');
     }
     */
    /*******************************************************************************
     Sidebar
     *******************************************************************************/
    $.fn.getAuthorized();

    /*var authorized;

    if ($.cookie('vide_nad')) {
        $.getJSON("https://api.vide.me/user/info/?videmecallback=?",
            function (data) { // TODO: check return data
                console.log("user/info data -----> " + JSON.stringify(data));
                if (data.userEmail) { // TODO: Вынести в отдельную функцию
                    authorized = true;
                } else {
                    authorized = false;
                }
                if (data.userPicture === '') {
                    $('#user_brand').html("<a href='https://api.vide.me/' target='_blank'> <img src='https://ea1116048a2ffc61f8b7-d479f182e30f6e6ac2ebc5ce5ab9de7b.ssl.cf1.rackcdn.com/avatar.png' width='48' height='48' alt='" + data.userPicture + "'></a>");
                } else {
                    $('#user_brand').html("<a href='" + data.userLink + "' target='_blank'> <img src='" + data.userPicture + "' width='48' height='48' alt='" + data.userDisplayName + "'></a>");
                }
                $('#user_name').html("<a href='" + data.userLink + "' target='_blank'>" + data.userDisplayName + "</a>");
                $('#user_email').html(data.userEmail);
                if (data.userPicture === '') {
                    $('#form_user_brand').html("<a href='" + data.userLink + "' target='_blank'> <img src='https://ea1116048a2ffc61f8b7-d479f182e30f6e6ac2ebc5ce5ab9de7b.ssl.cf1.rackcdn.com/avatar.png' alt='" + data.userDisplayName + "'></a>");
                } else {
                    $('#form_user_brand').html("<a href='" + data.userLink + "' target='_blank'> <img src='" + data.userPicture + "' alt='" + data.userDisplayName + "'></a>");
                }
                $('#form_user_name').html("<a href='" + data.userLink + "' target='_blank'>" + data.userDisplayName + "</a>");
                $('#form_user_email').html(data.userEmail);
            }
        );
        /!*Волшебное использование куки ===============================================*!/
        //console.log("vide_nad -----> " + $.cookie('vide_nad'));
        $('#nad').val($.cookie('vide_nad'));
        /!*============================================================================*!/
    }*/

    // Используется выше $.fn.getAuthorized();


    //console.log("cookie: " + $.cookie('vide_nad'));
    $('#submit').removeAttr('disabled');
    $('#cform').validate({
        rules: {
            "name": {
                required: true,
                maxlength: 40
            },
            "femail": {
                required: true,
                email: true,
                maxlength: 60
            },
            "email": {
                required: true,
                email: true,
                maxlength: 60
            },
            "subject": {
                required: true,
                maxlength: 40
            },
            "message": {
                maxlength: 100
            },
            "lang": {}
        }, /*
         messages:{
         "name":{
         required:"<-"
         },
         "femail":{
         required:"<-",
         email:"Enter true email"
         },
         "email":{
         required:"<-",
         email:"Enter true email"
         },
         "subject":{
         required:"<-"
         }
         },*/
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/sendmail/',
                timeout: 40000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $("#submit").attr('disabled', true);
                    $('#videme-progress').html(VidemeProgress);
                    $.fn.processNotification();
                },
                success: function (msg) {
                    //console.log("Data Saved: " + msg);
                    $('#videme-progress').empty();
                    $('#cform').hide('slow');
                    $('#progress').hide('slow');
                    $('#result').html(msg);
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    //$('#cform').find(':input').prop('disabled', true);
                    $('#submit').attr('disabled', true);
                    $('#result').html("<div class='alert alert-error span3'>Failed from timeout. Please try again later. <span id='timer'></span> sec.</div><script type='text/javascript'>setTimeout('window.location.reload()', 6000); var t=5; function refr_time(){ if (t>1) { t--;  document.getElementById('timer').innerHTML=t; document.getElementById('timer').style.color = '#FF0000'; } else { document.getElementById('timer').style.color = '#FFA122'; } } var tm=setInterval('refr_time();' ,1000); </script>");
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });


    $('a.set_language_en').click(function () {
        $.cookie("vide_lang", "en");
        location.reload();
    });
    $('a.set_language_ru').click(function () {
        $.cookie("vide_lang", "ru");
        location.reload();
    });
    $('a.set_language_es').click(function () {
        $.cookie("vide_lang", "es");
        location.reload();
    });
    $('a.set_language_pt').click(function () {
        $.cookie("vide_lang", "pt");
        location.reload();
    });
    $('a.set_language_fr').click(function () {
        $.cookie("vide_lang", "fr");
        location.reload();
    });
    $('a.set_language_zh').click(function () {
        $.cookie("vide_lang", "zh");
        location.reload();
    });
    $('a.set_language_cs').click(function () {
        $.cookie("vide_lang", "cs");
        location.reload();
    });

    function imgError(image) {
        image.onerror = "";
        image.src = "https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/19420853_248196038918942_1112423914215028182_n.jpg?_nc_cat=0&oh=cfd439f4f2d525976a4597cc3cce46ae&oe=5B6E3F6C";
        return true;
    }

    /*************************************************************
     Событие 2: нажата ссылка на файл из плитки Next
     **************************************************************/
    $(document).on('click', 'a.shownext', function (event) {
        console.log('a.shownext click');
        event.preventDefault();
        var $this = $(this);
        var href = $this.attr('href');
        window.location.href = href;
    });
    /*************************************************************
     Событие 2: нажата ссылка на файл из плитки Next, New, Pop
     lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
     lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
     **************************************************************/
    $(document).on('click', 'a.showpop-url', function (event) {
        event.preventDefault();
        var $this = $(this);
        var file = $this.attr('file-value');
        var messageid = $this.attr('messageid-value');
        var FromUserName = $this.attr('FromUserName-value');
        var updatedAt = $this.attr('updatedAt-value');
        var Subject = $this.attr('Subject-value');
        var Message = $this.attr('Message-value');
        var href = $this.attr('href');

        var prev_file = $(".prev_file-value").data("prev_file-value");

        file.replace(/.*(?=#[^\s]+$)/, '');
        messageid.replace(/.*(?=#[^\s]+$)/, '');
        FromUserName.replace(/.*(?=#[^\s]+$)/, '');
        updatedAt.replace(/.*(?=#[^\s]+$)/, '');
        Subject.replace(/.*(?=#[^\s]+$)/, '');
        Message.replace(/.*(?=#[^\s]+$)/, '');

        prev_file.replace(/.*(?=#[^\s]+$)/, '');

        //var nad = $.cookie('vide_nad');

        $('.videme-brand-panel-element-center').html("\
<video controls autoplay>\
  <source src='https://gu.vide.me/vic?m=" + file.substr(1) + "&messageid=" + messageid.substr(1) + "' type='video/mp4'>\
  Your browser does not support the <code>video</code> element.\
</video>\
");
        $('.videme-brand-panel-element-right').html("\
<div class='videme-panel-message'>Share: </div>\
<br>\
<button type='button' \
class='btn btn-primary contact-toggle' data-toggle='modal' \
data-target='#modal-contact'>\
<span class='glyphicon glyphicon-envelope'></span> contact\
</button>\
");
        $(".contact-toggle").data("file-value", file.substr(1));
        $(".contact-toggle").data("subject-value", Subject.substr(1));
        $(".contact-toggle").data("message-value", Message.substr(1));

        $(".videme-shownext-tile").html("<img src='data:image/gif;base64,R0lGODlhDQAMAKIAAP///7W1ta2trXNzczExMf4BAgAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAFACwAAAAADQAMAAADIgi6zCIghDilejRbgK2fHPRloVaB3Umm5iWqGzuW49bcQAIAIfkEBQoABQAsAAABAAMACgAAAwhYRMrb8ElHEwAh+QQFCgAFACwAAAEADAAKAAADHlgzRVRCQLnai1Mxl3HlmLddkmh11IhqZ5i25QvGCQAh+QQFCgAFACwAAAEACQAKAAADGVgiNVOEKOagXO3FmS2vGwZelEZ2YemJZgIAIfkEBQoABQAsBAABAAgACgAAAxYYUTNFRDEHZXtx3appnpjliWFXglACACH5BAUKAAUALAcAAQAFAAoAAAMNGFEzym61N2WE9FZsEwA7' />");

        /* Вставить проверку одинаковости файлов*/

        $.getJSON("https://api.vide.me/file/shownext/?number=12&prev_file=" + prev_file + "&file=" + file.substr(1) + "&videmecallback=?",
            function (b) {
                $(".prev_file-value").data("prev_file-value", b['results'][0]['File']);

                $('.videme-prev').html(prev_file);
                $('.videme-this').html(file.substr(1));

                //==alert("bbb = " + b.results.length);
                if (b.results.length > 3) {


                    var a = [];
                    $.each(b.results, function (d, c) {
                        /* Выйти после третей интерации */
                        if (d > 3) return false;
                        a.push("\
<div class='box'>\
	<div class='boxInner'>\
		<a class='showpop-url' \
file-value='#" + c.File + "' \
messageid-value='#" + c.objectId + "' \
FromUserName-value='#" + c.FromUserName + "' \
updatedAt-value='#" + c.updatedAt + "' \
Subject-value='#" + c.Subject + "' \
Message-value='#" + c.Message + "' \
href='https://vide.me/v?m=" + c.File + "&messageid=" + c.objectId + "' \
target='_blank'>\
			<img src=\"https://api.vide.me/img/?i=" + c.File + ".jpg\" alt=\"" + c.updatedAt + "\" title=\"" + c.updatedAt + "\" onerror='imgError(this);'>\
		<div class='videme-tile-signboard-true'><span class=\"label label-primary\">" + c.Case + "</span>" + c.updatedAt + "</div>\
		</a>\
	</div>\
</div>\
			")
                    });
                    /* Всё слепить и показать */
                    $(".videme-shownext-tile").html(a.join(""));

                    /* Вычисилить максимальное число страниц */
                    var pagetotal = Math.ceil(b.results.length / 4);
                    /* Объявить экземпляр пейджинатора */
                    $('.videme-shownext-pagination').jqPagination({
                        //link_string	: '/?page={page_number}',
                        max_page: pagetotal,
                        paged: function (page) {
                            /* Пропустить страниц = текущая страница * элементов на странице */
                            var skip = page * 4;
                            $.getJSON("https://api.vide.me/file/shownext/?skip=" + skip + "&videmecallback=?",
                                function (b) {
                                    var a = [];
                                    $.each(b.results, function (d, c) {
                                        /* Выйти после третей интерации */
                                        if (d > 3) return false;
                                        a.push("\
<div class='box'>\
	<div class='boxInner'>\
		<a class='showpop-url' \
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
                                    /* Всё слепить и показать */
                                    $('.videme-shownext-pagination').show('fast');
                                    $("#my-div").removeClass('hide');
                                    $(".videme-shownext-tile").html(a.join(""));
                                });
                        }
                    });
                } else {
                    $('.videme-shownext-pagination').hide('fast');
                }
            });

    });

    /*************************************************************

     Удалить 888888888888888888888888888888888888888888888888888
     НЕТ """"""""!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     Событие 2: нажата ссылка на файл из плитки Spring,
     отрисовка текста и кнопок в панель
     **************************************************************/
    $(document).on('click', 'a.file-spring-url', function (event) {
        event.preventDefault();
        var $this = $(this);
        var file = $this.attr('file-value');
        var messageid = $this.attr('messageid-value');
        var FromUserName = $this.attr('FromUserName-value');
        var updatedAt = $this.attr('updatedAt-value');
        var Subject = $this.attr('Subject-value');
        var Message = $this.attr('Message-value');
        var href = $this.attr('href');

        file.replace(/.*(?=#[^\s]+$)/, '');
        messageid.replace(/.*(?=#[^\s]+$)/, '');
        FromUserName.replace(/.*(?=#[^\s]+$)/, '');
        updatedAt.replace(/.*(?=#[^\s]+$)/, '');
        Subject.replace(/.*(?=#[^\s]+$)/, '');
        Message.replace(/.*(?=#[^\s]+$)/, '');

        //var nad = $.cookie('vide_nad');

//	$(".video-container").html(VidemeProgress);
//	$(".video-container").html("<img src='https://api.vide.me/img/?i=" + file.substr(1) + ".jpg'");

        $('.videme-brand-panel-element-left').html("\
<div class='videme-panel-date'>" + updatedAt.substr(1) + "</div>\
");

        $('.videme-brand-panel-element-center').html("\
<video controls autoplay>\
  <source src='https://gum.vide.me/vic?m=" + file.substr(1) + "&messageid=" + messageid.substr(1) + "' type='video/mp4'>\
  Your browser does not support the <code>video</code> element.\
</video>\
");
        $('.videme-brand-panel-element-right').html("\
<div class='videme-panel-message'>Share: </div>\
<br>\
<button type='button' \
class='btn btn-primary contact-toggle' data-toggle='modal' \
data-target='#modal-contact' \
file-value='#" + file.substr(1) + "' \
subject-value='#" + Subject.substr(1) + "' \
message-value='#" + Message.substr(1) + "'>\
<span class='glyphicon glyphicon-envelope'></span> contact\
</button>\
");
    });

    /*************************************************************
     v2 Событие 4: нажата кнопка Сохранить Contact в первом модальном окне
     **************************************************************/
    $('#item-edit-form').validate({
        rules: {
            "title": {
                required: true,
                maxlength: 40
            }
        },
        messages: {
            "title": {
                required: "<-",
                //email: "Enter true title"
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/items/update/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $('#modal-item-edit').modal('hide');
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    $('#modal-item-edit').modal('hide');
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });

    /*************************************************************
     v2 Событие 4: нажата кнопка Сохранить Contact в первом модальном окне
     **************************************************************/
    $('#contact-edit-form').validate({
        rules: {
            "newemail": {
                required: true,
                email: true,
                maxlength: 40
            }
        },
        messages: {
            "newemail": {
                required: "",
                email: "Enter true email"
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/relation/update/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $('#modal-edit-contact').modal('hide');
                    $.fn.showRelation();
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    $('#modal-edit-contact').modal('hide');
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });

    /*************************************************************
     v2 Событие 5: нажата кнопка удалить Contact во втором модальном окне
     **************************************************************/
    $('#contact-del-form').validate({
        rules: {
            "email": {
                required: true,
                email: true,
                maxlength: 40
            }
        },
        messages: {
            "email": {
                required: "",
                email: "Enter true email"
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/relation/delete/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $('#modal-del-contact').modal('hide');
                    $('#modal-edit-contact').modal('hide');
                    $.fn.showRelation();
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    $('#modal-del-contact').modal('hide');
                    $('#modal-edit-contact').modal('hide');
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });

    /*************************************************************
     v2 Событие 2: нажата кнопка создать Contact в 1 модальном окне
     **************************************************************/
    $('#contact-create-form').validate({
        rules: {
            "email": {
                required: true,
                email: true,
                maxlength: 40
            }
        },
        messages: {
            "email": {
                required: "",
                email: "Enter true email"
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/contact/create/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $('#modal-create-contact').modal('hide');
                    $.fn.showRelation();
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });

    /*************************************************************
     v2 Событие 2: нажата кнопка Редактировать лист,
     отрисовка формы и кнопок в модальное окно
     **************************************************************/
    $(document).on('click', '.list-edit-toggle', function (event) {
        event.preventDefault();
        var $this = $(this);
        //var list = $this.attr('list');
        console.log(".list-edit-toggle click list: -----> " + $this.attr('list'));
        //list.replace(/.*(?=#[^\s]+$)/, '');
        $('#editlist').val($this.attr('list'));
        $('#newlist').val($this.attr('list'));
        $('#access').val($this.attr('access'));
        $(".list-del-toggle").attr("list", $this.attr('access'));
    });

    /*************************************************************
     v2 Событие 4: нажата кнопка Изменить List в первом модальном окне
     **************************************************************/
    $('#list-edit-form').validate({
        rules: {
            "newlist": {
                required: true,
                //email:true,
                maxlength: 40
            }
        },
        messages: {
            "newlist": {
                required: "<-"
                //email:"Enter true list"
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/list/update/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $('#modal-edit-list').modal('hide');
                    $.fn.showList();
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    $('#modal-edit-list').modal('hide');
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });

    /*************************************************************
     v2 Событие 4: нажата кнопка вызова и отрисовки
     кнопки удалить List во втором модальном окне
     **************************************************************/
    $(document).on('click', '.list-del-toggle', function (event) {
        event.stopPropagation();
        $('.videme-display').html($(".list-del-toggle").attr("list"));
        $('#del-list').val($(".list-del-toggle").attr("list"));
    });

    /*************************************************************
     v2 Событие 5: нажата кнопка удалить List во втором модальном окне
     **************************************************************/
    $('#list-del-form').validate({
        rules: {
            "list": {
                required: true,
                //email:true,
                maxlength: 40
            }
        },
        messages: {
            "list": {
                required: "<-"
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/list/remove/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $('#modal-del-list').modal('hide');
                    $('#modal-edit-list').modal('hide');
                    $.fn.showList();
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    $('#modal-del-list').modal('hide');
                    $('#modal-edit-list').modal('hide');
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });

    /*************************************************************
     v2 Событие 2: нажата кнопка создать List в 1 модальном окне
     **************************************************************/
    $('#list-create-form').validate({
        rules: {
            "list": {
                required: true,
                //email:true,
                maxlength: 40
            }
        },
        messages: {
            "list": {
                required: "<-"
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/list/create/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $('#modal-create-list').modal('hide');
                    $.fn.showList();
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    $('#modal-create-list').modal('hide');
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });

    /*************************************************************
     Событие XX: нажата кнопка Login
     **************************************************************/
    $('#user-login-form').validate({
        rules: {
            "username": {
                required: true,
                email: true,
                maxlength: 40
            },
            "password": {
                required: true,

                maxlength: 60
            }
        },
        messages: {
            "username": {
                required: "",
                email: "Enter true email"
            },
            "password": {
                required: "",
                email: "Enter true password"
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/user/login/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });
    /*************************************************************
     Modal Signin
     **************************************************************/
    $('#signin').validate({
        rules: {
            "username": {
                required: true,
                email: true,
                maxlength: 40
            },
            "password": {
                required: true,

                maxlength: 60
            }
        },
        messages: {
            "username": {
                required: "",
                email: "Enter true email"
            },
            "password": {
                required: "",
                email: "Enter true password"
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/user/login/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $.fn.successNotification({
                        msg: msg
                    });
                    $('#modal-signin').modal('hide');
                    //$(".signin-toggle").addClass("hidden");
                    //location.reload();
                },
                error: function (msg) {
                    $.fn.errorNotification({
                        msg: msg
                    });
                    $('#modal-signin').modal('hide');
                    location.reload();
                }
            });
        }
    });

    /*************************************************************
     Событие XX: нажата кнопка user-restore-form
     **************************************************************/
    /*
    $('#user-restore-form').validate({
        rules: {
            "username": {
                required: true,
                email: true,
                maxlength: 40
            }
        },
        messages: {
            "username": {
                required: "",
                email: "Enter true email"
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/user/restore/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });
    */
    /*************************************************************
     Событие XX: нажата кнопка изменить информацию о пользователе
     **************************************************************/
    $('#user-info-form').validate({
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/user/update/info/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });

    /*************************************************************
     Событие XX: нажата кнопка изменить Spring
     **************************************************************/
    $('#user-spring-form').validate({
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/user/update/spring/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });

    /*************************************************************
     Событие XX: нажата кнопка изменить пароль
     **************************************************************/
    $('#user-pas-form').validate({
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/user/update/pas/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });

    /***************************************************************************
     Редактор артиклей
     ***************************************************************************/
    var awaitingCopy = false;
    $("#NewArticleDate").val(getRealDate());
    $("#NewArticleTime").val(getRealTime());
    $(".ArticleDate").each(function () {
        $(this).datepicker({
            dateFormat: "yy/mm/dd"
        });
    });

    $(".ArticleCover").change(function () {
        $("#background-image").css("background-image", "url(" + $("#ArticleCover").val() + ")");

    });

    $(function () {
        $(".column").sortable({
            revert: true,
            opacity: 0.6,
            start: StartDrag,
            stop: StopDrag,
            connectWith: ".column",
            handle: ".portlet-header",
            cancel: ".portlet-close",
            placeholder: "portlet-placeholder ui-corner-all"

        });

        $("#PanelCopyItem").droppable({
            hoverClass: "PanelCopyItemActive",
            drop: function (event, ui) {
                awaitingCopy = true;
            }
        });

        $("#NewItemText").click(function (event) {
            //var element;
            event.preventDefault();
            var element = $("\
<div class=\"portlet ui-widget ui-widget-content ui-helper-clearfix ui-corner-all\">\
  <div class=\"portlet-header ui-widget-header ui-corner-all\">Text\
    <span class='ui-icon ui-icon-closethick portlet-close'></span>\
  </div>\
    <div class=\"portlet-content\">\
      <textarea class=\"form-control\" name=\"article[body][][text]\" rows=\"3\"></textarea>\
    </div>\
</div>\
");
            $(".column").append(element);
            element.hide().slideDown(500);
        });

        $("#NewItemImg").click(function (event) {
            event.preventDefault();
            // itemCount++;
            var element = $("\
<div class=\"portlet ui-widget ui-widget-content ui-helper-clearfix ui-corner-all\">\
  <div class=\"portlet-header ui-widget-header ui-corner-all\">Image\
    <span class='ui-icon ui-icon-closethick portlet-close'></span>\
  </div>\
    <div class=\"portlet-content\">\
  <div class=\"form-group\">\
    <input type=\"text\" class=\"form-control\" name=\"article[body][][img]\" id=\"ImageURL\" placeholder=\"Image URL\">\
  </div>\
  <button type=\"button\" class=\"btn btn-default SetImageURL\">Submit</button>\
<img class=\"NewImageURLPlace\" src=\"\" onerror=\"imgError(this);\">\
    </div>\
</div>\
");

            $(".column").append(element);
            element.hide().slideDown(500);
        });

        $("body").on('click', '.column .SetImageURL', function () {
            $(this).siblings("img").attr("src", $(this).parent().find('#ImageURL').val());
            $(this).siblings("img").show();
            $(this).parent().find(".form-control").hide();
            $(this).parent().find(".SetImageURL").hide();
        });

        $("#NewItemEmbed").click(function (event) {
            event.preventDefault();
            //EmbeditemCount++;
            var element = $("\
<div class=\"portlet ui-widget ui-widget-content ui-helper-clearfix ui-corner-all\">\
  <div class=\"portlet-header ui-widget-header ui-corner-all\">Embed URL or HTML\
    <span class='ui-icon ui-icon-closethick portlet-close'></span>\
  </div>\
    <div class=\"portlet-content\">\
  <div class=\"form-group\">\
    <input type=\"text\" class=\"form-control\" name=\"\" id=\"EmbedURL\" placeholder=\"Embed URL\">\
  </div>\
  <button type=\"button\" class=\"btn btn-default SetEmbedURL\">Submit</button>\
  <div class=\"NewEmbedPlace\"></div>\
  <div class=\"NewEmbedInputPlace\"></div>\
    </div>\
</div>\
");

            $(".column").append(element);
            element.hide().slideDown(500);
        });

        $("body").on('click', '.column .SetEmbedURL', function () {

            $(this).siblings(".NewEmbedPlace").append("\
			<iframe src=\"https://www.youtube.com/embed/"
                + YouTubeGetID($(this).parent().find('#EmbedURL').val()) +
                "\" frameborder=\"0\" allowfullscreen></iframe>");

            $(this).siblings(".NewEmbedInputPlace").append("\
			<input type=\"hidden\" id=\"YTVideo\" name=\"article[body][][YTVideo]\" value=\"" + YouTubeGetID($(this).parent().find('#EmbedURL').val()) + "\">");

            $(this).parent().find(".form-control").hide();
            $(this).parent().find(".SetEmbedURL").hide();

        });

        $("#NewItemVideo").click(function (event) {
            event.preventDefault();
            //EmbeditemCount++;
            var element = $("\
 <div class=\"portlet ui-widget ui-widget-content ui-helper-clearfix ui-corner-all\">\
  <div class=\"portlet-header ui-widget-header ui-corner-all\">Video \
    <span class='ui-icon ui-icon-closethick portlet-close'></span>\
  </div>\
    <div class=\"portlet-content\">\
  <div class=\"form-group\">\
    <input type=\"text\" class=\"form-control\" name=\"article[body][][video]\" id=\"\" placeholder=\"Video\">\
  </div>\
    </div>\
</div>\
");

            $(".column").append(element);
            element.hide().slideDown(500);
        });

        $("#NewItemRelated").click(function (event) {
            event.preventDefault();
            var element = $("\
<input type=\"hidden\" class=\"\" name=\"article[related][][" + $("#RelatedTitle").val() + "]\" value=\"" + $("#RelatedValue").val() + "\">\
<a href=\"" + $("#RelatedValue").val() + "\">" + $("#RelatedTitle").val() + "</a>\
");

            $(".related").append(element);
            element.hide().slideDown(500);
        });

        $("#NewItemTag").click(function (event) {
            event.preventDefault();
            var element = $("\
<input type=\"hidden\" name=\"article[tags][" + $("#TagValue").val() + "]\" value=\"" + $("#TagValue").val() + "\">\
<span class=\"label label-primary\">" + $("#TagValue").val() + "</span>\
");

            $(".tag").append(element);
            element.hide().slideDown(500);
        });

        /*
         <iframe width="560" height="315" src="https://www.youtube.com/embed/hASaT5rOudQ" frameborder="0" allowfullscreen></iframe>
         <iframe width="420" height="315" src="https://www.youtube.com/embed/bTyw7ljad2Q" frameborder="0" allowfullscreen></iframe>
         */

        function PanelCopyItem(element) {
            awaitingCopy = false;
            var clone = element.clone();
            $(".column").append(clone);
            clone.hide().slideDown(500);
        }

        function StartDrag() {
            $("#PanelNewItem").hide();
            $("#PanelCopyItem").show();
        }

        function StopDrag(event, ui) {
            if (awaitingCopy) {
                $(this).sortable('cancel');
                PanelCopyItem($(ui.item));
            }
            $("#PanelNewItem").show();
            $("#PanelCopyItem").hide();
        }

        /*============================================================================*/

        $(".portlet")
            .addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
            .find(".portlet-header")
            .addClass("ui-widget-header ui-corner-all")
            .prepend("<span class='ui-icon ui-icon-closethick portlet-close'></span>");
        /*
         $( ".portlet-toggle" ).click(function() {
         var icon = $( this );
         icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
         icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
         });
         */
//$(".column  .portlet-toggle").click(function() {
        $("body").on('click', '.column  .portlet-close', function () {
            //$(this).parent().remove();
            $(this).closest(".portlet").remove();

        });
    });

    //$('#user_pas_nad').val($.cookie('vide_nad'));
    $('#article-update').validate({
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/article/update/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });

    $('#article-new').validate({
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/article/new/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    $.fn.successNotification({
                        msg: msg
                    });
                }
            });
        }
    });

    /***************************************************************************
     Конец Редактора артиклей
     ***************************************************************************/

    /***************************************************************************
     Sidebar
     ***************************************************************************/

    $("#videme-sidebar-button").on('click', function () {
        sidebarToggleShow();
        sidebarToggleHidde();
        sidebarToggleButton()
        //console.log('click');
//        $('.videme-content-toggle').removeClass('tmpEvent');
        /*

         $(".videme-content-toggle").animate(
         {
         right: '-150px'
         }, {
         duration: 500,
         easing: 'swing',
         complete: function () {
         $('.videme-content-toggle').addClass('tmpEvent');
         //console.log('pull');
         }
         }
         );

         // TODO: Добавить событие 222цццйцй22ц	2 перехода в большой экран
         $('#videme-sidebar-button-icon').toggleClass('glyphicon-menu-hamburger');
         $('#videme-sidebar-button-icon').toggleClass('glyphicon-menu-left');

         $('.tmpEvent').animate(
         {
         right: '0px'
         }, {
         duration: 300,
         easing: 'swing',
         complete: function () {
         $(this).removeClass('tmpEvent');
         }
         }
         );
         */
    });

    // TODO: сделать общий windows resize
    $(window).resize(function () {
        //console.log("window).resize -----> tmpEvent').animate");
        sidebarToggleHidde();
        sidebarToggleButton();
    });

    /***************************************************************************
     * Конец Sidebar
     ***************************************************************************/

    /*************************************************************
     Фокусы в модальные окна
     **************************************************************/

    $("#modal-edit-contact").on('shown.bs.modal', function () {
        $(this).find('#newemail').focus();
    });
    $("#modal-create-contact").on('shown.bs.modal', function () {
        $(this).find('#email').focus();
    });
    $("#modal-create-list").on('shown.bs.modal', function () {
        $(this).find('#createlist').focus();
    });
    $("#modal-edit-list").on('shown.bs.modal', function () {
        $(this).find('#newlist').focus();
    });


    /*************************************************************
     нажата кнопка send feedback
     **************************************************************/
    $('#modal-feedback').on('shown.bs.modal', function () {
        console.log("modal-feedback -----> shown.bs.modal");
        $('#feedback-message').focus();
        $("#feedback-location").val(window.location.href);
    });

    /*************************************************************
     нажата кнопка send feedback
     **************************************************************/
    $('#feedback-form').validate({
        /*        rules: {
         "email": {
         required: true,
         email: true,
         maxlength: 40
         }
         },
         messages: {
         "email": {
         required: "",
         email: "Enter true email"
         }
         },*/
        submitHandler: function (form) {
            $.ajax({
                //type: "get",
                url: 'https://api.vide.me/feedback/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $('#modal-feedback').modal('hide');
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    $('#modal-feedback').modal('hide');
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });


    /*************************************************************
     нажата кнопка показать контакты Google
     **************************************************************/
    $(document).on('click', 'a.showContactsGoogle', function (event) {
        event.preventDefault();
        console.log("showContactsGoogle -----> click ");
        //$('#videme-showcontacts').showContactsGoogle({
        //});
        $('#modal-contacts').modal('show')
        getContactsGoogle();
    });

    /*************************************************************
     v2 Событие 4: нажата ссылка из списка контактов Contact Google
     **************************************************************/
    $(document).on('click', 'a.showContactsItem', function (event) {
        event.preventDefault();
        console.log("a.contact-url -----> click");
        var $this = $(this);
        //var href = $this.attr('href');
        var email = $this.attr('email');
        $('#email-to').html(email);
        $('#modal-contacts').modal('hide');
        console.log("a.contact-url -----> email" + email);


    });


    /*************************************************************
     Событие 1: Click button FB send message
     **************************************************************/
    $("#fb-send-message").click(function () {
        //$("#fb-send-message-by-url").on('click', function () {
        console.log("a.fb-send-message-by-url -----> click");
        console.log("a.fb-send-message-by-url -----> m " + $(this).attr('m'));
        console.log("a.fb-send-message-by-url -----> messageid " + $(this).attr('messageid'));
        $.fn.fbSentMessage({
            //file: getParameterByName('m'),
            file: $(this).attr('file'),
            //messageid: getParameterByName('messageid')
            messageid: $(this).attr('messageid')
        });
    });


// Конец автозагрузки
});

/* Browser detect*/
function detectBrowser() {
    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]"
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    if (isOpera) return 'opera';
    if (isFirefox) return 'firefox';
    if (isSafari) return 'safari';
    if (isIE) return 'ie';
    if (isEdge) return 'edge';
    if (isChrome) return 'chrome';
    if (isBlink) return 'blink';
}
function showTileDoorbellSignSmall(showTileDoorbellSignSmall, tempObject) {
    //console.log('showTileDoorbellSignSmall ---> ' + JSON.stringify(showTileDoorbellSignSmall));
    var html = [];
    html.push("<ul class=\"list-group videme-doorbell-sign-small\">");
    $.each(showTileDoorbellSignSmall, function (key, value) {
        var trueValue = paddingUserInfo(value);
        html.push(showDoorbellSignSmall(trueValue, tempObject));
    });
    html.push("</ul>");
    return html.join('');
}

function showDoorbellSignSmall(showDoorbellSignSmall, tempObject) {
    //console.log('showDoorbellSignSmall ---> ' + JSON.stringify(showDoorbellSignSmall));
    //console.log('showDoorbellSignSmall showDoorbellSignSmall.title ---> ' + showDoorbellSignSmall.title);
    if (!$.isEmptyObject(tempObject)) {
        console.log('showDoorbellSignSmall tempObject.width() ---> ' + tempObject.width());
        if (tempObject.width() < 300) {
            var tempObjectClass = "";
        } else {
            var tempObjectClass = " d-flex";
        }
    } else {
        var tempObjectClass = " d-flex";
    }
    if (!$.isEmptyObject(showDoorbellSignSmall.href)) {
        var title = "<a href='https://www.vide.me/" + showDoorbellSignSmall.href + "'>" + showDoorbellSignSmall.title + "</a>";
    } else {
        var title = showDoorbellSignSmall.title;
    }
    return "\
        <li type=\"button\" class=\"list-group-item list-group-item-action\">\
            <div class='videme-doorbell-sign-image'>\
              " + showIconForDoorbelSign(showDoorbellSignSmall) + "\
            </div>\
            <div class='videme-doorbell-sign-1st-line'>\
                <div class='videme-doorbell-sign-1st-line-title-date" + tempObjectClass + "'>\
                    <div class=\"videme-doorbell-sign-title\">" + title + "</div>\
                    <div class=\"text-muted videme-doorbell-sign-date\">" + showDoorbellSignSmall.date + "</div>\
                </div>\
                " + showDropdownForDoorbelSign(showDoorbellSignSmall) + "\
            </div>\
            <div class='videme-doorbell-sign-2st-line'>\
                <div class=\"videme-doorbell-sign-additional\">" + showDoorbellSignSmall.additional + "</div>\
                <div class=\"text-muted videme-doorbell-sign-count\">" + showDoorbellSignSmall.count + "</div>\
            </div>\
                " + showButtonForDoorbelSign(showDoorbellSignSmall) + "\
        </li>\
            ";
}

function showDropdownForDoorbelSign(showDropdownForDoorbelSign) {
    //console.log('showDropdownForDoorbelSign ---> ' + JSON.stringify(showDropdownForDoorbelSign));
    //console.log('showDropdownForDoorbelSign.dropdown ---> ' + JSON.stringify(showDropdownForDoorbelSign.dropdown));
    //console.log('showDropdownForDoorbelSign.key ---> ' + showDropdownForDoorbelSign.key);
    //console.log('showDropdownForDoorbelSign.showcaseButton[\'item-edit-toggle\'] ---> ' + JSON.stringify(showDropdownForDoorbelSign.showcaseButton['item-edit-toggle']));
    //console.log('showDropdownForDoorbelSign.showcaseButton ---> ' + JSON.stringify(showDropdownForDoorbelSign.showcaseButton));
    var dropdownDS = '';
    var dropdownMain = '';
    $.each(showDropdownForDoorbelSign.dropdown, function (key, value) {
        switch (value) {
            case 'sign':
                dropdownDS += "\
    <a type='button' \
        class='dropdown-item list-edit-toggle' data-toggle='modal' \
        data-target='#modal-edit-list' \
        list='" + showDropdownForDoorbelSign.title + "'\
        access='" + showDropdownForDoorbelSign.access + "'>\
        Edit\
    </a>";
                break;
            case 'edit_relation':
                dropdownDS += "\
	<a type='button' \
		class='dropdown-item contact-edit-toggle' data-toggle='modal' \
		data-target='#modal-edit-contact' \
		from_user_id='" + showDropdownForDoorbelSign.from_user_id + "'\
		to_user_id='" + showDropdownForDoorbelSign.to_user_id + "'\
		relation_email='" + showDropdownForDoorbelSign.relation_email + "'\
		relation='" + showDropdownForDoorbelSign.relation + "'>\
		Edit\
	</a>";
                break;
            case 'edit_my_video':
                dropdownDS += "\
	<a type='button' \
		class='dropdown-item item-edit-toggle'\
		id='" + showDropdownForDoorbelSign.key + "' \
		data-toggle='modal' \
		data-target='#modal-item-edit'\
		item_id='" + showDropdownForDoorbelSign.item_id + "'\
		title='" + showDropdownForDoorbelSign.title + "'\
		content='" + showDropdownForDoorbelSign.content + "'\
		access='" + showDropdownForDoorbelSign.access + "'\
		tags='" + showDropdownForDoorbelSign.tags + "'>\
		Edit\
	</a>";
                break;
            case 'send':
                dropdownDS += "\
	<a type='button' \
		class='dropdown-item contact-toggle'\
		id='" + showDropdownForDoorbelSign.key + "' \
		data-toggle='modal' \
		data-target='#modal-contact'\
		item_id='" + showDropdownForDoorbelSign.item_id + "'\
		title='" + showDropdownForDoorbelSign.title + "'\
		content='" + showDropdownForDoorbelSign.content + "'\
        created_at='" + showDropdownForDoorbelSign.created_at + "'>\
		Send\
	</a>";
                break;
            case 'share':
                dropdownDS += "\
	<a type='button' \
		class='dropdown-item list-toggle'\
		id='" + showDropdownForDoorbelSign.key + "' \
		data-toggle='modal' \
		data-target='#modal-list'\
		item_id='" + showDropdownForDoorbelSign.item_id + "'\
		title='" + showDropdownForDoorbelSign.title + "'\
		content='" + showDropdownForDoorbelSign.content + "'\
		created_at='" + showDropdownForDoorbelSign.created_at + "'>\
		Share\
	</a>";
                break;
            case 'delete':
                dropdownDS += "\
	<a type='button' \
		class='dropdown-item del-my-toggle'\
		id='" + showDropdownForDoorbelSign.key + "' \
		data-toggle='modal' \
		data-target='#modal-del'\
		item_id='" + showDropdownForDoorbelSign.item_id + "'\
		user_display_name='" + showDropdownForDoorbelSign.user_display_name + "'\
		title='" + showDropdownForDoorbelSign.title + "'\
		content='" + showDropdownForDoorbelSign.content + "'\
		created_at='" + showDropdownForDoorbelSign.created_at + "'>\
		Delete\
	</a>";
                break;
            //default:
            //dropdownDS = " ";
        }
    });
    if (dropdownDS.trim()) {
        dropdownMain = '\
        <div class="videme-doorbell-sign-action">\
            <div class="dropdown">\
                <a class="fa fa-sort-down" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                </a>\
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">\
                    ' + dropdownDS + '\
                </div>\
            </div>\
        </div>\
        ';
    }

    return dropdownMain;
}

function showButtonForDoorbelSign(showButtonForDoorbelSign) {
    //console.log('showButtonForDoorbelSign ---> ' + JSON.stringify(showButtonForDoorbelSign));
    //console.log('showButtonForDoorbelSign.buttons ---> ' + JSON.stringify(showButtonForDoorbelSign.buttons));
    var buttonDS = '';
    $.each(showButtonForDoorbelSign.buttons, function (key, value) {
        switch (value) {
            case 'send_message':
                buttonDS += "\
		<a class=\"btn btn-primary pull-right btn-sm\" href=\"https://vide.me/rec/?email=" + showButtonForDoorbelSign.relation_email + "\" role=\"button\">Send video email</a>";
                break;
            case 'pop_relations':
                buttonDS += "\
	<a href=\"https://api.vide.me/v2/relation/connect/?user_id=" + showButtonForDoorbelSign.user_id + "&nad=" + $.cookie('vide_nad') + "\" class=\"btn btn-outline-primary btn-sm videme-relation-card-button-connect relation_connect\" user_id='" + showButtonForDoorbelSign.user_id + "' feedback='https://www.vide.me/" + showButtonForDoorbelSign.spring + "'>Connect</a>";
                break;
            case 'new':
                // share button
                buttonDS += "...";
                break;
            default:
                buttonDS = " ";
        }
    });
    return buttonDS;
}

function showIconForDoorbelSign(showIconForDoorbelSign) {
    //console.log('showIconForDoorbelSign ---> ' + JSON.stringify(showIconForDoorbelSign));
    if (!$.isEmptyObject(showIconForDoorbelSign.image)) {
        if (!$.isEmptyObject(showIconForDoorbelSign.href)) {
            var dbImage = "<a href='https://www.vide.me/" + showIconForDoorbelSign.href + "'><img class=\"img-thumbnail videme-doorbell-sign-img\" src=\"" + showIconForDoorbelSign.image + "\" alt=\"\" /></a>";
        } else {
            var dbImage = "<img class=\"img-thumbnail videme-doorbell-sign-img\" src=\"" + showIconForDoorbelSign.image + "\" alt=\"\" />";
        }
    }
    if (!$.isEmptyObject(showIconForDoorbelSign.icon)) {
        var dbImage = "<i class='img-thumbnail fa fa-" + showIconForDoorbelSign.icon + " fa-2x fa-pull-left text-center align-items-center d-flex justify-content-center videme-doorbell-sign-icon'></i>";
    }
    return dbImage;
}

function parseMyTaskForDoorbellSign(parseMyTaskForDoorbellSign) {
    console.log("parseMyTaskForDoorbellSign ----->" + JSON.stringify(parseMyTaskForDoorbellSign));
    //if ($.isPlainObject(parseMyTaskForDoorbellSign)) {
    $.each(parseMyTaskForDoorbellSign, function (key, value) {
        var taskImage = '';
        var taskIcon = '';
        if (!$.isEmptyObject(value.task_status)) {
            if (value.task_status == 'awaiting') {
                taskIcon = 'clock-o';
            }
            if (value.task_status == 'worked') {
                //taskImage = 'https://lh3.googleusercontent.com/Q-TyP-0iMexxAQDt7N81PLjLCrkoBkZVuSxP_1laOHxmctHhwJKsOXC9DYeBGXs8NIM=w300';
                taskIcon = 'cogs';
            }
            if (value.task_status == 'success') {
                taskImage = 'https://s3.amazonaws.com/img.vide.me/' + value.task_item_id + '.jpg';
            }
            if (value.task_status == 'error') {
                taskIcon = 'frown-o';
            }
        }
        parseMyTaskForDoorbellSign[key] = {
            //'a': value.ToUserName,
            'image': taskImage,
            'icon': taskIcon,
            'cover': '',
            'title': value.title,
            /*'href': value.title,*/
            'additional': value.task_status,
            'count': value.video_duration,
            'date': value.created_at,
            'edit_button': ''
        };

    });
    /*} else {
        console.error("parseMyTaskForDoorbellSign -----> not plaint object " + parseMyTaskForDoorbellSign);
    }*/
    //delete parseSignsForDoorbellSign.results;
    //console.log("parseSignsForDoorbellSign ----->" + JSON.stringify(parseMyTaskForDoorbellSign));
    return parseMyTaskForDoorbellSign;
}

function parseMyRelationsForDoorbellSign(parseMyRelationsForDoorbellSign) {
    console.log("parseMyRelationsForDoorbellSign ----->" + JSON.stringify(parseMyRelationsForDoorbellSign));
    $.each(parseMyRelationsForDoorbellSign, function (key, value) {
        parseMyRelationsForDoorbellSign[key] = {
            'image': value.user_picture,
            'cover': '',
            'title': value.user_display_name,
            'additional': value.relation_email,
            'from_user_id': value.from_user_id,
            'to_user_id': value.to_user_id,
            'relation': value.relation,
            'relation_email': value.relation_email,
            /*'additional': value.task_status,
            'count': value.video_duration,*/
            'date': value.created_at,
            'dropdown': {'dd_item': 'edit_relation'}, // <-- work
            'buttons': {'button': 'send_message'}
        };
    });
    return parseMyRelationsForDoorbellSign;
}

function parseRelationsToMeForDoorbellSign(parseRelationsToMeForDoorbellSign) {
    console.log("parseMyRelationsForDoorbellSign ----->" + JSON.stringify(parseRelationsToMeForDoorbellSign));
    $.each(parseRelationsToMeForDoorbellSign, function (key, value) {
        parseRelationsToMeForDoorbellSign[key] = {
            'image': value.user_picture,
            'cover': '',
            'title': value.user_display_name,
            'additional': value.relation_email,
            'from_user_id': value.from_user_id,
            'to_user_id': value.to_user_id,
            'relation': value.relation,
            'relation_email': value.relation_email,
            /*'additional': value.task_status,
            'count': value.video_duration,*/
            'date': value.created_at,
            /*'dropdown': {'dd_item': 'edit_relation'}, // <-- work
            'buttons': {'button': 'send_message'}*/
        };
    });
    return parseRelationsToMeForDoorbellSign;
}

function parseSearchPeoplesForDoorbellSign(parseSearchPeoplesForDoorbellSign) {
    console.log("parseSearchPeoplesForDoorbellSign ----->" + JSON.stringify(parseSearchPeoplesForDoorbellSign));
    $.each(parseSearchPeoplesForDoorbellSign, function (key, value) {
        parseSearchPeoplesForDoorbellSign[key] = {
            'image': value.user_picture,
            'cover': '',
            'title': value.user_display_name,
            'additional': value.city,
            'count': value.country,
            /*'from_user_id': value.from_user_id,
            'to_user_id': value.to_user_id,
            'relation': value.relation,
            'relation_email': value.relation_email,
            'additional': value.task_status,
            'count': value.video_duration,*/
            'date': value.created_at,
            'spring': value.spring,
            'href': value.spring,
            'country': value.country,
            'city': value.city,
            'bio': value.bio
            /*'dropdown': {'dd_item': 'edit_relation'}, // <-- work
            'buttons': {'button': 'send_message'}*/
        };
    });
    return parseSearchPeoplesForDoorbellSign;
}

function parsePopRelationsForDoorbellSign(parsePopRelationsForDoorbellSign) {
    console.log("parsePopRelationsForDoorbellSign ----->" + JSON.stringify(parsePopRelationsForDoorbellSign));
    $.each(parsePopRelationsForDoorbellSign, function (key, value) {
        parsePopRelationsForDoorbellSign[key] = {
            'image': value.user_picture,
            'cover': '',
            'title': value.user_display_name,
            'user_id': value.user_id,
            'spring': value.spring,
            /*'href': value.relation_email,
            'additional': value.task_status,
            'count': value.video_duration,
            'date': value.created_at,*/
            'edit_button': 'pop_relations'
        };
    });
    return parsePopRelationsForDoorbellSign;
}

function parseMyTaskSendmailForDoorbellSign(parseMyTaskSendmailForDoorbellSign) {
    //console.log("parseMyTaskSendmailForDoorbellSign ----->" + JSON.stringify(parseMyTaskSendmailForDoorbellSign));
    //if ($.isPlainObject(parseMyTaskSendmailForDoorbellSign)) {
    $.each(parseMyTaskSendmailForDoorbellSign, function (key, value) {
        var taskImage = '';
        var taskIcon = '';
        if (!$.isEmptyObject(value.task_status)) {
            if (value.task_status == 'awaiting') {
                //taskImage = 'https://lh3.googleusercontent.com/Q-TyP-0iMexxAQDt7N81PLjLCrkoBkZVuSxP_1laOHxmctHhwJKsOXC9DYeBGXs8NIM=w300';
                taskIcon = 'clock-o';
            }
            if (value.task_status == 'worked') {
                //taskImage = 'https://lh3.googleusercontent.com/Q-TyP-0iMexxAQDt7N81PLjLCrkoBkZVuSxP_1laOHxmctHhwJKsOXC9DYeBGXs8NIM=w300';
                taskIcon = 'cogs';
            }
            if (value.task_status == 'success') {
                taskImage = 'https://s3.amazonaws.com/img.vide.me/' + value.task_item_id + '.jpg';
            }
            if (value.task_status == 'error') {
                taskIcon = 'frown-o';
            }
        }
        parseMyTaskSendmailForDoorbellSign[key] = {
            //'a': value.ToUserName,
            'image': taskImage,
            'icon': taskIcon,
            'cover': '',
            'title': value.title,
            'href': value.title,
            'additional': value.task_status,
            'count': value.to_user_email,
            'date': value.created_at,
            'edit_button': ''
        };

    });
    /*} else {
        console.error("parseMyTaskSendmailForDoorbellSign -----> not plaint object " + parseMyTaskSendmailForDoorbellSign);
    }*/
    //delete parseSignsForDoorbellSign.results;
    //console.log("parseSignsForDoorbellSign ----->" + JSON.stringify(parseMyTaskSendmailForDoorbellSign));
    return parseMyTaskSendmailForDoorbellSign;
}

function parseSendForDoorbellSign(parseSendForDoorbellSign) {
    console.log("parseSendForDoorbellSign ----->" + JSON.stringify(parseSendForDoorbellSign));
    var date = new Date(2011, 0, 1, 0, 0, 0, 0);
    parseSendForDoorbellSign = {
        'icon': 'cogs',
        'cover': '',
        'title': parseSendForDoorbellSign.title,
        /*'href': parseMyTaskForDoorbellSign.title,*/
        'additional': 'send',
        'count': parseSendForDoorbellSign.to_user_email,
        'date': date,
        'edit_button': ''
    };
    return parseSendForDoorbellSign;
}

function showSendVideo(showSendVideo) {
    if ($.fn.getAuthorized()) {

    } else {
        console.log("showSendVideo -----> " + JSON.stringify(showSendVideo));
        var showTileDoorbellSignSmall = parseSendForDoorbellSign(showSendVideo);
        //$.each(showTileDoorbellSignSmall, function (key, value) {
        var trueValue = paddingUserInfo(showTileDoorbellSignSmall);
        return showDoorbellSignSmall(trueValue);
    }

}

function urlExists(url) {
    console.log("urlExists url:" + url);
    $.ajax({
        type: 'HEAD',
        url: url,
        success: function (data) {
            console.log("urlExists: success" + JSON.stringify(data));
            //callback(true);
            return true;
        },
        error: function (data) {
            console.log("urlExists: error" + JSON.stringify(data));
            //callback(false);
            return false;
        }
    });
    /*$.ajax({
        url: url,
        type: "HEAD"
    }).then(
        function() { console.log("File is present"); },
        function() { console.log("File not present"); }
    );*/
    /*var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;*/
}


/* If User autorisid */
function ifAutorisedGotoUrl(target) {
    if ($.cookie('vide_nad')) {
        window.location = target.attr('href');
        //windo

    } else {
        $('#modal-signin').modal('show');
    }
}


function showError(data) {
    var html = [];
    html.push("\
			<div class=\"alert alert-warning alert-dismissible\" role=\"alert\">\
				<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\
					<span aria-hidden=\"true\">&times;</span>\
				</button>\
				<strong>Warning!</strong>\
				Network error. <a href=\"" + document.URL + "\" class=\"alert-link\">Please reload the page.</a> <a href='https://api.vide.me/enter/' class=\"alert-link\"> Or Sign in.</a>\
				<p>" + JSON.stringify(data) + "</p>\
			</div>\
		")
    return html;
}

function showEmpty(data) {
    return '';
}

function sidebarToggleShow() {
    $(".videme-content-toggle").animate(
        {
            right: '-150px'
        }, {
            duration: 500,
            easing: 'swing',
            complete: function () {
                $('.videme-content-toggle').addClass('tmpEvent');
                //console.log('pull');
            }
        }
    );
    $(".videme-sidebar-toggle").animate(
        {
            left: '150px'
        }, {
            duration: 500,
            easing: 'swing',
            complete: function () {
                $('.videme-sidebar-toggle').addClass('tmpEventSidebarToggle');
                //console.log('pull');
            }
        }
    );
}

function paddingButtonInbox(paddingButtonInbox) {
    //console.log("paddingButtonInbox before -----> " + JSON.stringify(paddingButtonInbox));
    paddingButtonInbox.showcaseButton = {
        'reply-toggle': {
            'item_id': paddingButtonInbox.item_id,
            'title': paddingButtonInbox.title,
            'content': paddingButtonInbox.content,
            'message_id': paddingButtonInbox.message_id,
            'recipients': paddingButtonInbox.recipients,
            'to_user_id': paddingButtonInbox.to_user_id,
            'from_user_id': paddingButtonInbox.from_user_id,
            'from_user_display_name': paddingButtonInbox.from_user_display_name,
            'conference_id': paddingButtonInbox.conference_id
        },
        'contact-toggle': {
            'item_id': paddingButtonInbox.item_id,
            'user_display_name': paddingButtonInbox.user_display_name,
            'title': paddingButtonInbox.title,
            'content': paddingButtonInbox.content,
            'created_at': paddingButtonInbox.created_at,
            'updated_at': paddingButtonInbox.updated_at
        },
        'fb-send-message': {
            'item_id': paddingButtonInbox.item_id,
            'message_id': paddingButtonInbox.message_id
        },
        'list-toggle': {
            'item_id': paddingButtonInbox.item_id,
            'title': paddingButtonInbox.title,
            'content': paddingButtonInbox.content
        },
        'del-inbox-toggle': {
            'message_id': paddingButtonInbox.message_id,
            'item_id': paddingButtonInbox.item_id,
            'user_display_name': paddingButtonInbox.user_display_name,
            'title': paddingButtonInbox.title,
            'content': paddingButtonInbox.content,
            'created_at': paddingButtonInbox.created_at,
            'updated_at': paddingButtonInbox.updated_at
        }
    };
    //console.log("paddingButtonInbox after ----->" + JSON.stringify(paddingButtonInbox));
    return paddingButtonInbox;
}

function paddingButtonSent(paddingButtonSend) {
    paddingButtonSend.showcaseButton = {
        'contact-toggle': {
            'item_id': paddingButtonSend.item_id,
            'title': paddingButtonSend.title,
            'content': paddingButtonSend.content
        },
        'fb-send-message': {
            'item_id': paddingButtonSend.item_id,
            'message_id': paddingButtonSend.message_id
        },
        'list-toggle': {
            'item_id': paddingButtonSend.item_id,
            'title': paddingButtonSend.title,
            'content': paddingButtonSend.content
        },
        'del-sent-toggle': {
            'message_id': paddingButtonSend.message_id,
            'item_id': paddingButtonSend.item_id,
            'user_display_name': paddingButtonSend.user_display_name,
            'title': paddingButtonSend.title,
            'content': paddingButtonSend.content,
            'created_at': paddingButtonSend.created_at,
            'updated_at': paddingButtonSend.updated_at
        }
    };
    return paddingButtonSend;
}

function paddingButtonMy(paddingButtonMy) {
    //console.log("paddingButtonMy -----> " + JSON.stringify(paddingButtonMy));
    paddingButtonMy.showcaseButton = {
        'contact-toggle': {
            'item_id': paddingButtonMy.item_id,
            'title': paddingButtonMy.title,
            'content': paddingButtonMy.content,
            'created_at': paddingButtonMy.created_at,
            'updated_at': paddingButtonMy.updated_at
        },
        'fb-send-message': {
            'item_id': paddingButtonMy.item_id,
            'created_at': paddingButtonMy.created_at,
            'updated_at': paddingButtonMy.updated_at
        },
        'list-toggle': {
            'item_id': paddingButtonMy.item_id,
            'title': paddingButtonMy.title,
            'content': paddingButtonMy.content,
            'created_at': paddingButtonMy.created_at,
            'updated_at': paddingButtonMy.updated_at
        },
        'del-my-toggle': {
            'item_id': paddingButtonMy.item_id,
            'user_display_name': paddingButtonMy.user_display_name,
            'title': paddingButtonMy.title,
            'content': paddingButtonMy.content,
            'created_at': paddingButtonMy.created_at,
            'updated_at': paddingButtonMy.updated_at
        },
        'item-edit-toggle': {
            'item_id': paddingButtonMy.item_id,
            'title': paddingButtonMy.title,
            'content': paddingButtonMy.content,
            'access': paddingButtonMy.access,
            'tags': paddingButtonMy.tags
        }
    };
    return paddingButtonMy;
}

function paddingUserInfo(paddingUserInfo) {
    //console.log('paddingUserInfo paddingUserInfo ---> ' + JSON.stringify(paddingUserInfo));
    var trueUserInfo = {};
    if (!$.isEmptyObject(paddingUserInfo.user_id)) {
        trueUserInfo.user_id = paddingUserInfo.user_id;
    } else {
        trueUserInfo.user_id = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.user_email)) {
        trueUserInfo.user_email = paddingUserInfo.user_email;
    } else {
        trueUserInfo.user_email = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.user_display_name)) {
        trueUserInfo.user_display_name = paddingUserInfo.user_display_name;
    } else {
        trueUserInfo.user_display_name = 'No name';
    }
    if (!$.isEmptyObject(paddingUserInfo.user_first_name)) {
        trueUserInfo.user_first_name = paddingUserInfo.user_first_name;
    } else {
        trueUserInfo.user_first_name = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.user_last_name)) {
        trueUserInfo.user_last_name = paddingUserInfo.user_last_name;
    } else {
        trueUserInfo.user_last_name = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.user_link)) {
        trueUserInfo.user_link = paddingUserInfo.user_link;
    } else {
        trueUserInfo.user_link = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.user_gender)) {
        trueUserInfo.user_gender = paddingUserInfo.user_gender;
    } else {
        trueUserInfo.user_gender = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.user_birthday)) {
        trueUserInfo.user_birthday = paddingUserInfo.user_birthday;
    } else {
        trueUserInfo.user_birthday = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.user_locale)) {
        trueUserInfo.user_locale = paddingUserInfo.user_locale;
    } else {
        trueUserInfo.user_locale = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.user_picture)) {
        trueUserInfo.user_picture = paddingUserInfo.user_picture;
    } else {
        trueUserInfo.user_picture = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Antu_im-invisible-user.svg/2000px-Antu_im-invisible-user.svg.png';
    }
    if (!$.isEmptyObject(paddingUserInfo.spring)) {
        trueUserInfo.spring = paddingUserInfo.spring;
    } else {
        trueUserInfo.spring = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.facebook)) {
        trueUserInfo.facebook = paddingUserInfo.facebook;
    } else {
        trueUserInfo.facebook = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.google)) {
        trueUserInfo.google = paddingUserInfo.google;
    } else {
        trueUserInfo.google = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.microsoft)) {
        trueUserInfo.microsoft = paddingUserInfo.microsoft;
    } else {
        trueUserInfo.microsoft = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.last_login)) {
        trueUserInfo.last_login = paddingUserInfo.last_login;
    } else {
        trueUserInfo.last_login = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.last_active)) {
        trueUserInfo.last_active = paddingUserInfo.last_active;
    } else {
        trueUserInfo.last_active = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.user_cover)) {
        trueUserInfo.user_cover = paddingUserInfo.user_cover;
    } else {
        trueUserInfo.user_cover = getRandomCover();
    }
    if (!$.isEmptyObject(paddingUserInfo.country)) {
        trueUserInfo.country = paddingUserInfo.country;
    } else {
        trueUserInfo.country = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.city)) {
        trueUserInfo.city = paddingUserInfo.city;
    } else {
        trueUserInfo.city = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.bio)) {
        trueUserInfo.bio = paddingUserInfo.bio;
    } else {
        trueUserInfo.bio = '';
    }
    /* Tile ************************************ */

    if (!$.isEmptyObject(paddingUserInfo.item_id)) {
        trueUserInfo.item_id = paddingUserInfo.item_id;
    } else {
        trueUserInfo.item_id = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.post_id)) {
        trueUserInfo.post_id = paddingUserInfo.post_id;
    } else {
        trueUserInfo.post_id = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.type)) {
        trueUserInfo.type = paddingUserInfo.type;
    } else {
        trueUserInfo.type = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.item_count_show)) {
        trueUserInfo.item_count_show = paddingUserInfo.item_count_show;
    } else {
        trueUserInfo.item_count_show = '';
    }
    /* ****************************************** */
    if (!$.isEmptyObject(paddingUserInfo.video)) {
        trueUserInfo.video = paddingUserInfo.video;
    } else {
        trueUserInfo.video = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.message_id)) {
        trueUserInfo.message_id = paddingUserInfo.message_id;
    } else {
        trueUserInfo.message_id = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.created_at)) {
        trueUserInfo.created_at = paddingUserInfo.created_at;
    } else {
        trueUserInfo.created_at = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.updated_at)) {
        trueUserInfo.updated_at = paddingUserInfo.updated_at;
    } else {
        trueUserInfo.updated_at = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.title)) {
        trueUserInfo.title = paddingUserInfo.title;
    } else {
        trueUserInfo.title = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.content)) {
        trueUserInfo.content = paddingUserInfo.content;
    } else {
        trueUserInfo.content = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.to_user_id)) {
        trueUserInfo.to_user_id = paddingUserInfo.to_user_id;
    } else {
        trueUserInfo.to_user_id = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.from_user_id)) {
        trueUserInfo.from_user_id = paddingUserInfo.from_user_id;
    } else {
        trueUserInfo.from_user_id = '';
    }
    /* remove ****************************************** */
    if (!$.isEmptyObject(paddingUserInfo.from_user_display_name)) {
        trueUserInfo.from_user_display_name = paddingUserInfo.from_user_display_name;
    } else {
        trueUserInfo.from_user_display_name = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.from_user_name)) {
        trueUserInfo.from_user_name = paddingUserInfo.from_user_name;
    } else {
        trueUserInfo.from_user_name = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.recipients)) {
        trueUserInfo.recipients = paddingUserInfo.recipients;
    } else {
        trueUserInfo.recipients = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.conference_id)) {
        trueUserInfo.conference_id = paddingUserInfo.conference_id;
    } else {
        trueUserInfo.conference_id = '';
    }
    /* Doorbell sign ****************************************** */

    if (!$.isEmptyObject(paddingUserInfo.href)) {
        trueUserInfo.href = paddingUserInfo.href;
    } else {
        trueUserInfo.href = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.image)) {
        trueUserInfo.image = paddingUserInfo.image;
    } else {
        trueUserInfo.image = getRandomImage();
    }
    if (!$.isEmptyObject(paddingUserInfo.cover)) {
        trueUserInfo.cover = paddingUserInfo.cover;
    } else {
        trueUserInfo.cover = getRandomCover();
    }
    if (!$.isEmptyObject(paddingUserInfo.access)) {
        trueUserInfo.access = paddingUserInfo.access;
    } else {
        trueUserInfo.access = 'private';
    }
    if (!$.isEmptyObject(paddingUserInfo.date)) {
        trueUserInfo.date = timeToWord(paddingUserInfo.date);
    } else {
        trueUserInfo.date = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.additional)) {
        trueUserInfo.additional = paddingUserInfo.additional;
    } else {
        trueUserInfo.additional = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.count)) {
        trueUserInfo.count = paddingUserInfo.count;
    } else {
        trueUserInfo.count = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.dropdown)) {
        trueUserInfo.dropdown = paddingUserInfo.dropdown;
    } else {
        trueUserInfo.dropdown = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.buttons)) {
        trueUserInfo.buttons = paddingUserInfo.buttons;
    } else {
        trueUserInfo.buttons = '';
    }
    /* Doorbell Relation ****************************************** */

    if (!$.isEmptyObject(paddingUserInfo.from_user_id)) {
        trueUserInfo.from_user_id = paddingUserInfo.from_user_id;
    } else {
        trueUserInfo.from_user_id = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.relation_email)) {
        trueUserInfo.relation_email = paddingUserInfo.relation_email;
    } else {
        trueUserInfo.relation_email = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.relation)) {
        trueUserInfo.relation = paddingUserInfo.relation;
    } else {
        trueUserInfo.relation = '';
    }
    /* Doorbell Task ****************************************** */

    if (!$.isEmptyObject(paddingUserInfo.video_duration)) {
        trueUserInfo.video_duration = paddingUserInfo.video_duration;
    } else {
        trueUserInfo.video_duration = '';
    }
    if (!$.isEmptyObject(paddingUserInfo.task_status)) {
        trueUserInfo.task_status = paddingUserInfo.task_status;
    } else {
        trueUserInfo.task_status = '';
    }
    /* Doorbell Icon ****************************************** */
    if (!$.isEmptyObject(paddingUserInfo.icon)) {
        trueUserInfo.icon = paddingUserInfo.icon;
    } else {
        trueUserInfo.icon = '';
    }
    /* Doorbell Relations ****************************************** */
    if (!$.isEmptyObject(paddingUserInfo.relation_email)) {
        trueUserInfo.relation_email = paddingUserInfo.relation_email;
    } else {
        trueUserInfo.relation_email = '';
    }
    //console.log('paddingUserInfo trueUserInfo ---> ' + JSON.stringify(trueUserInfo));
    return trueUserInfo;
}

function getRandomCover() {
    var cover = [
        'https://www.japan-guide.com/thumb/interest_flowers.jpg',
        'https://thumbs.dreamstime.com/z/kiwi-fruit-228928.jpg',
        'https://assets.answersingenesis.org/img/cms/content/contentnode/header_image/aquatic-animals.jpg',
        'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX2255721.jpg',
        'https://media.mnn.com/assets/images/2014/11/burrowing-owls-parliament.jpg.653x0_q80_crop-smart.jpg',
        'https://climatekids.nasa.gov/review/tree-rings/trees.jpg',
        'https://t-ec.bstatic.com/images/hotel/max1024x768/788/78809294.jpg',
        'https://cdn.shopify.com/s/files/1/0690/0531/files/sand-01_1024x1024.jpg',
        'https://uiuccmda.files.wordpress.com/2012/01/winter-scene.jpg',
        'https://media.cntraveler.com/photos/58af182429676a553e60cedf/master/w_775,c_limit/nemophila-hitachi-seaside-park-japan-GettyImages-545033958.jpg',
        'https://localtvwghp.files.wordpress.com/2015/06/hot1.jpg',
        'http://res.freestockphotos.biz/pictures/12/12734-fall-landscape-reflecting-on-a-lake-pv.jpg'
    ];
    return cover[Math.floor(Math.random() * cover.length)];
}

function getRandomImage() {
    var image = [
        'https://kolonial.no/media/uploads/public/132/24/643224-f617a-product_detail.jpg',
        'https://www.freewebheaders.com/wordpress/wp-content/gallery/clouds-sky/clouds-sky-header-2067-1024x300.jpg',
        'https://www.agropopular.com/wp-content/audios_agropopular/2017/04/6naranja-696x708.png'
    ];
    return image[Math.floor(Math.random() * image.length)];
}

function paddingButtonMySpring(paddingButtonMySpring) {
    //console.log("paddingButtonMySpring -----> " + JSON.stringify(paddingButtonMySpring));
    paddingButtonMySpring.showcaseButton = {
        'contact-toggle': {
            'item_id': paddingButtonMySpring.item_id,
            'title': paddingButtonMySpring.title,
            'content': paddingButtonMySpring.content
        },
        'fb-send-message': {
            'item_id': paddingButtonMySpring.item_id
        },
        'list-toggle': {
            'item_id': paddingButtonMySpring.item_id,
            'title': paddingButtonMySpring.title,
            'content': paddingButtonMySpring.content
        },
        'del-sharefile-toggle': {
            'item_id': paddingButtonMySpring.item_id
        }
    };
    return paddingButtonMySpring;
}

function paddingButtonSpring(paddingButtonSpring) { // not work into jquery block
    console.log("paddingButtonSpring -----> " + JSON.stringify(paddingButtonSpring));
    paddingButtonSpring.showcaseButton = {
        'contact-toggle': {
            'item_id': paddingButtonSpring.item_id,
            'title': paddingButtonSpring.title,
            'content': paddingButtonSpring.content
        },
        'fb-send-message': {
            'item_id': paddingButtonSpring.item_id
        },
        'list-toggle': {
            'item_id': paddingButtonSpring.item_id,
            'title': paddingButtonSpring.title,
            'content': paddingButtonSpring.content
        }
    };
    return paddingButtonSpring;
}

function sidebarToggleButton() {
    $('#videme-sidebar-button-icon').toggleClass('glyphicon-menu-hamburger');
    $('#videme-sidebar-button-icon').toggleClass('glyphicon-menu-left');
}

function sidebarToggleHidde() {
    $('.tmpEvent').animate(
        {
            right: '0px'
        }, {
            duration: 300,
            easing: 'swing',
            complete: function () {
                $(this).removeClass('tmpEvent');
            }
        }
    );
    $('.tmpEventSidebarToggle').animate(
        {
            left: '0px'
        }, {
            duration: 300,
            easing: 'swing',
            complete: function () {
                $(this).removeClass('tmpEvent');
            }
        }
    );
}

/***************************************************************************
 * Выжимка Id видео из ссылки/вставки youtube
 ***************************************************************************/
// TODO: Добавить - (минус) в ссылке
// https://gist.githubusercontent.com/takien/4077195/raw/0a02f407796f8d538531821ab99109b57924f607/youtubeID.js
function YouTubeGetID(url) {
    var ID = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_]/i);
        ID = ID[0];
    }
    else {
        ID = url;
    }
    return ID;
}

/***************************************************************************
 * Узнать дату
 ***************************************************************************/
function getRealDate() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();

    if (month.toString().length == 1) {
        var month = '0' + month;
    }
    if (day.toString().length == 1) {
        var day = '0' + day;
    }
    var getRealDate = year + '/' + month + '/' + day;
    return getRealDate;
}

/***************************************************************************
 * Узнать время
 ***************************************************************************/
function getRealTime() {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    if (hour.toString().length == 1) {
        var hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        var minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        var second = '0' + second;
    }
    var getRealTime = hour + ':' + minute + ':' + second;
    return getRealTime;
}

function timeToWord(timeToWord) {
    var current = Math.floor(Date.now() / 1000);
    timeToWord = timeToWord.substr(0, 19);
    var previousMs = new Date(timeToWord);
    var previous = previousMs.getTime() / 1000;
    var elapsed = current - previous;
    //console.log("timeToWord current --->" + current);
    //console.log("timeToWord previous --->" + previous);
    //console.log("timeToWord elapsed --->" + elapsed);
    var perMinute = 60;
    var perHour = perMinute * 60;
    var perDay = perHour * 24;
    var perMonth = perDay * 30;
    var perYear = perDay * 365;

    if (elapsed < perMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < perHour) {
        return Math.round(elapsed / perMinute) + ' minutes ago';
    }

    else if (elapsed < perDay) {
        return Math.round(elapsed / perHour) + ' hours ago';
    }

    else if (elapsed < perMonth) {
        return Math.round(elapsed / perDay) + ' days ago';
    }

    else if (elapsed < perYear) {
        return Math.round(elapsed / perMonth) + ' months ago';
    }

    else {
        return Math.round(elapsed / perYear) + ' years ago';
    }
}

/*
 How can I get query string values in JavaScript?
 */
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function urlIfParamExist(paramName) {
    var url = window.location.href;
    if (url.indexOf('?' + paramName + '=') != -1)
        return true;
    else if (url.indexOf('&' + paramName + '=') != -1)
        return true;
    return false
}

function getContactsGoogle() {
    var config = {
        'client_id': '415758327138-lddhq1t058os5o8b6lrmja75t56hi0el.apps.googleusercontent.com',
        'scope': 'https://www.google.com/m8/feeds'
    };
    gapi.auth.authorize(config, function () {
        fetch(gapi.auth.getToken());

    });
}

function fetch(token) {
    $.ajax({
        url: "https://www.google.com/m8/feeds/contacts/default/full?access_token=" + token.access_token + "&alt=json",
        dataType: "jsonp",
        success: function (data) {
            contacts = [];
            $.each(data.feed.entry, function (key, value) {
                if (value['gd\$email']) {
                    var contact = {
                        'name': value['title']['\$t'],
                        'id': value['id']['\$t'],
                        'emails': []
                    };
                    if (!contact['name']) {
                        contact['name'] = contact['emails'][0] || "...";
                    }
                    var emails = value['gd\$email'];
                    for (var j = 0, email; email = emails[j]; j++) {
                        contact['emails'].push(email['address']);
                    }
                    var link = value['link'];
                    $('#videme-showcontacts').append("---<br><a href=\"\"class='showContactsItem' email='" + contact.emails + "'>name: " + contact.name + "<br> email " + JSON.stringify(contact.emails) + "</a><br>");
                    /*for (var j = 0, item; item = link[j]; j++) {
                     console.log("contact item -----> " + JSON.stringify(item));
                     console.log("contact item.type -----> " + item.type);
                     $('#videme-showcontacts').append("<a href=\"\"class='showContactsItem' email='" + contact.name + "'>GET CONTACTS FEED</a><br>name: " + contact.name + " email " + JSON.stringify(contact.emails)+ "<br>");
                     if (item.type == 'image/!*') {
                     //if (item.type == 'href') {
                     console.log("contact image/!* -----> " + item.href);
                     //$('#videme-showcontacts').append("<br>image<img src='" + item.href + "&access_token=" + token.access_token + "' width='189' height='255' alt=''><br>");
                     }
                     }*/
                    console.log("contact contact -----> " + JSON.stringify(contact));
                }
                contacts.push(contact);
            });
        }
    });
}

function filter_array(test_array) {
    var index = -1,
        arr_length = test_array ? test_array.length : 0,
        resIndex = -1,
        result = [];

    while (++index < arr_length) {
        var value = test_array[index];

        if (value) {
            result[++resIndex] = value;
        }
    }

    return result;
}

function filter_obj(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
}
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};
function padding_item_object(padding_item_object) { // TODO: delete
    if (padding_item_object.item_id)
        true_item.item_id = padding_item_object.item_id;
    if (padding_item_object.cover)
        true_item.cover = padding_item_object.cover;
    if (padding_item_object.href)
        true_item.href = padding_item_object.href;
    if (padding_item_object.post_id)
        true_item.post_id = padding_item_object.post_id;
    if (padding_item_object.message_id)
        true_item.message_id = padding_item_object.message_id;
    if (padding_item_object.created_at)
        true_item.created_at = padding_item_object.created_at;
    if (padding_item_object.updated_at)
        true_item.updated_at = padding_item_object.updated_at;
    if (padding_item_object.title)
        true_item.title = padding_item_object.title;
    if (padding_item_object.content)
        true_item.content = padding_item_object.content;
    if (padding_item_object.spring)
        true_item.spring = padding_item_object.spring;
    if (padding_item_object.user_email)
        true_item.user_email = padding_item_object.user_email;
    if (padding_item_object.user_picture)
        true_item.user_picture = padding_item_object.user_picture;
    if (padding_item_object.to_user_id)
        true_item.to_user_id = padding_item_object.to_user_id;
    if (padding_item_object.from_user_id)
        true_item.from_user_id = padding_item_object.from_user_id;
    if (padding_item_object.from_user_display_name)
        true_item.from_user_display_name = padding_item_object.from_user_display_name;
    if (padding_item_object.from_user_name)
        true_item.from_user_name = padding_item_object.from_user_name;
    if (padding_item_object.video_duration)
        true_item.video_duration = padding_item_object.video_duration;
    if (padding_item_object.count)
        true_item.count = padding_item_object.count;
    if (padding_item_object.tags)
        true_item.tags = padding_item_object.tags;
}