/***************************************************************************
 *  Jquery plugin Vide.me
 * *************************************************************************/

(function ($) {
    var authorized = false;
    //var authorizedData;

    var methods = {
        init : function( options ) {
            console.log("tooltip -----> init options " + JSON.stringify(options));
        },
        show : function( ) {
            console.log("tooltip -----> show");
        },

        hide : function( ) {
            console.log("tooltip -----> hide");
        },
        update : function( content ) {
            console.log("tooltip -----> update content " + JSON.stringify(content));
        }
    };

    $.fn.tooltip = function( method ) {

        // логика вызова метода
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод с именем ' +  method + ' не существует для jQuery.tooltip' );
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
                        $('.authorize-false').remove();
                        if (data.user_display_name === null) data.user_display_name = 'No name';

                        console.log("user/info data -----> " + JSON.stringify(data));
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
                        }
                        $('#form_user_name').html("<a href='" + data.user_link + "' target='_blank'>" + data.user_display_name + "</a>");
                        $('#nav_form_user_name').html("<a href='" + data.user_link + "' target='_blank'>" + data.user_display_name + "</a>");
                        $('#form_user_email').html(data.user_email);
                        $('#nav_form_user_email').html(data.user_email);
                        $('#sidebar_user_name').html(data.user_display_name);
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
        userSpringInfoSettings = $.extend({}, options);
        console.log("$.fn.userSpringInfo -----> ok");
        if ($(this).length) {
            //console.log("$.fn.postsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            //console.log("$.fn.postsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileSpringSettings.showcaseVideo);
        }
        var url = parseUrl();
        //tempObject.html(VidemeProgress);
        //==return this.each(function () {
        //var tempObject = $(this);
        $.getJSON("https://api.vide.me/v2/spring/info/?spring=" + url.spring + "&videmecallback=?",
            function (data) {
                console.log("$.fn.userSpringInfo: " + JSON.stringify(data));
                if (data) {
                    if (data.user_cover) {
                        $('.header-site').css('background-image', 'url(' + data.user_cover + ')');
                    } else {
                        $('.header-site').css('background-image', 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Starry_Night_Over_the_Rhone.jpg/300px-Starry_Night_Over_the_Rhone.jpg")');
                    }
                    if (data.user_display_name !== '') {
                        $('.user_display_name').html('<a href=\"https://www.vide.me/' + data.spring + '\">' + data.user_display_name + '</a>');
                    } else {
                        $('.user_display_name').html('');
                    }
                    $('.spring_relation').html('<a class="btn btn-sm align-middle btn-outline-secondary relation_connect" user_id="' + data.user_id + '" href="https://api.vide.me/v2/relation/connect/?user_id=' + data.user_id + '&nad=' + $.cookie('vide_nad') + '">Connect at  ' + data.user_display_name + '</a>');

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

        console.log("$.fn.oneTimeInbox oneTimeInboxSettings.authorized -----> " + oneTimeInboxSettings.authorized);

        console.log("$.fn.oneTimeInbox window.location.pathname -----> " + window.location.pathname);
        if (oneTimeInboxSettings.authorized && window.location.pathname != "/v") {
            console.log("$.fn.oneTimeInbox oneTimeInboxSettings.authorized -----> yes " + oneTimeInboxSettings.authorized);
            $.fn.showcaseVideoTextButton(paddingButtonInbox(oneTimeInboxSettings));
        } else {
            console.log("$.fn.oneTimeInbox oneTimeInboxSettings.authorized -----> no " + oneTimeInboxSettings.authorized);
            $.fn.showcaseVideoTextButton(paddingButtonOneTime(oneTimeInboxSettings));
        }
    };

    $.fn.itemCard = function (options) {
        itemCardSettings = $.extend({
            authorized: authorized
        }, options);

        //console.log("$.fn.itemCard itemCardSettings -----> " + JSON.stringify(itemCardSettings));
        //var element = options,
        var attributes = {};
        //$.each(element.get(0).attributes, function(i, attrib){
        $.each(options.get(0).attributes, function (i, attrib) {
            if (attrib.value) {
                attributes[attrib.name] = attrib.value;
            }
        });
        //attributes = filter_array(attributes);
        //attributes = filter_obj(attributes);
        //attributes = attributes.filter(function(e){return e});
        //attributes = jQuery.grep(attributes, function(n){ return (n); });
        /*var my_array = attributes.filter(function(x){
            return (x !== (undefined || null || ''));
        });*/
        console.log("$.fn.itemCard attributes -----> " + JSON.stringify(attributes));
        //var tempObject = $(this);

        this.html(
            "<div class=\"card\" style=\"width: 18rem;\">\n" +
            "  <img class=\"card-img-top\" src=\"https://s3.amazonaws.com/img.vide.me/" + attributes.item_id + ".jpg\" alt=\"Card image cap\">\n" +
            "  <div class=\"card-body\">\n" +
            "    <h5 class=\"card-title\">" + attributes.title + "</h5>\n" +
            "    <p class=\"card-text\">" + attributes.user_display_name + "</p>\n" +
            "    <p class=\"card-text\">" + attributes.content + "</p>\n" +
            "    <p class=\"card-text\">" + attributes.created_at + "</p>\n" +
            "  </div>\n" +
            "</div>");
        //tempObject.html("$.fn.itemCard attributes -----> " + JSON.stringify(attributes));
        return this;
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
                    console.log("$.fn.fileInbox data[0] -----> " + JSON.stringify(data[0]));
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
                    if (jQuery.isEmptyObject(data)) {
                        console.log("$.fn.fileMyConnect data -----> no");
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
                        tempObject.html(showTile(parseDataArrayToObject(data), tempObject, "file-my-url"));
                        $.fn.showcaseVideoTextButton(paddingButtonMy(data[0]));
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
        var showPopConnectSettings = $.extend( {
            size: '',
            limit: 16,
            showcaseVideo: "#videme-tile"
        }, $.fn.showPopConnect.defaults, options );
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
                if (jQuery.isEmptyObject(data)) {
                    console.log("$.fn.showPopConnect data -----> no");
                    tempObject.html("No results");
                } else {
                    console.log("$.fn.fileMy data -----> yes" + JSON.stringify(data));
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

    $.fn.postsOfSpring = function (options) {
        fileSpringSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        console.log("$.fn.postsOfSpring -----> ok");

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
        console.log("postsOfSpring url -----> " + JSON.stringify(url));
        var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/spring/items/?spring=" + url.spring + "&list=" + url.list + "&limit=" + fileSpringSettings.limit + "&videmecallback=?",
            function (data) {
                var response_time = Math.round(performance.now() - start_time);
                //console.log('doTasks took ' + response_time + ' milliseconds to execute.');
                $('#result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                if (data) {
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
        //==});
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
                    tempObject.html("<table class=\"table\" >\
                                <tr class=\"\">\
                        <td>created_at</td>\
                        <td>status</td>\
                        <!--<td>fileSizeStart</td>\
                        <td>fileSizeDone</td>\
                        <td>file</td>-->\
                        <td>subject</td>\
                        <td>message</td>\
                        <td>videoDuration</td>\
                    </tr>" + htmlResult.join("") + "</table>");
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
                console.log("$.fn.showNewPostsPagination data -----> " + JSON.stringify(jsonData));

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
                console.log("$.fn.showNewArticlePagination data -----> " + JSON.stringify(jsonData));

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
                console.log("$.fn.showPopVideoPagination data -----> " + JSON.stringify(jsonData));
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

                    tempObjectNextVideo.html(showTile(parseFileMy(jsonData.slice(0, showNextVideoPaginationSettings.limit)), tempObjectNextVideo, "shownext"));

                    var pagetotal = Math.ceil(jsonData.length / showNextVideoPaginationSettings.limit); //example=2

                    $('.videme-shownext-pagination').jqPagination({
                        //link_string	: '/?page={page_number}',
                        max_page: pagetotal,
                        paged: function (page) {
                            var skip = (page - 1) * showNextVideoPaginationSettings.limit;
                            skip2 = skip;
                            limit = skip2 + showNextVideoPaginationSettings.limit;
                            console.log("$.fn.showNextVideoPagination jqPagination -----> skip: " + skip);
                            tempObjectNextVideo.html(showTile(parseFileMy(jsonData.slice(skip2, limit)), tempObjectNextVideo, "shownext"));
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
            var spring;
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
                created_at = timeToWord(value.created_at);
            } else {
                created_at = "";
            }
            var href;
            var img;
            //if (value.messageid) {
            //if (value.indexOf("messageid")) {
            //if ("messageid" in value) {
            if (actionUrlClass === 'article') {
                if (value.post_id && value.post_id != "undefined") {
                    href = "https://vide.me/a/?a=" + value.href + "&post_id=" + value.post_id;
                } else {
                    href = "https://vide.me/a/?a=" + value.href;
                }
                img = value.cover;
            } else {
                if (value.message_id && value.message_id != "undefined") {
                    href = "https://vide.me/v?m=" + value.href + "&message_id=" + value.message_id;
                } else {
                    href = "https://vide.me/v?m=" + value.href;
                }
                if (value.post_id && value.post_id != "undefined") {
                    href = "https://vide.me/v?m=" + value.href + "&post_id=" + value.post_id;
                } else {
                    href = "https://vide.me/v?m=" + value.href;
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
            html.push("<li class='list-group-item'>" +
                "<img src='" + value.user_picture + "' alt='' class='img-thumbnail videme-relation-card-img'>" +
                "<div class='font-weight-bold videme-relation-card-user'>" + value.user_display_name + "</div>" +
                "<div class='text-right videme-tile-item-created-at'>" + created_at + "</div>" +
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
				</div>\
				</li>\
				");
            //$("#el_" + key).attr(value);
        });
        html.push("</ul>");

        console.log("showTile html -----> " + html);

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
            "    <a href=\"https://api.vide.me/v2/relation/connect/?user_id=" + showRelationCard.user_id + "&nad=" + $.cookie('vide_nad') + "\" class=\"btn btn-primary relation_connect\" user_id='" + showRelationCard.user_id + "'>Connect</a>\n" +
            "  </div>\n" +
            "</div>";
    }

    function showRelationCardSmall(showRelationCardSmall) {
        return "\
            <div class=\"videme-ralation-card-small\">\
              <img class=\"img-thumbnail videme-relation-card-img\" src=\"" + showRelationCardSmall.user_picture + "\" alt=\"\" />\
                <div class=\"videme-relation-card-user\"><a href='https://www.vide.me/" + showRelationCardSmall.spring + "/' target='_blank'>" + showRelationCardSmall.user_display_name + "</a></div>\
                <p class=\"\"></p>\
                <a href=\"https://api.vide.me/v2/relation/connect/?user_id=" + showRelationCardSmall.user_id + "&nad=" + $.cookie('vide_nad') + "\" class=\"btn btn-outline-primary btn-sm videme-relation-card-button-connect relation_connect\" user_id='" + showRelationCardSmall.user_id + "'>Connect</a>\
            </div>";
    }

    function paddingUserInfo(paddingUserInfo) {
        console.log('paddingUserInfo paddingUserInfo ---> ' + JSON.stringify(paddingUserInfo));
        var trueUserInfo = {};
        if (!jQuery.isEmptyObject(paddingUserInfo.user_id)) {
            trueUserInfo.user_id = paddingUserInfo.user_id;
        } else {
            trueUserInfo.user_id = '';
        }
        if (!jQuery.isEmptyObject(paddingUserInfo.user_email)) {
            trueUserInfo.user_email = paddingUserInfo.user_email;
        } else {
            trueUserInfo.user_email = '';
        }
        if (!jQuery.isEmptyObject(paddingUserInfo.user_display_name)) {
            trueUserInfo.user_display_name = paddingUserInfo.user_display_name;
        } else {
            trueUserInfo.user_display_name = '';
        }
        if (!jQuery.isEmptyObject(paddingUserInfo.user_first_name)) {
            trueUserInfo.user_first_name = paddingUserInfo.user_first_name;
        } else {
            trueUserInfo.user_first_name = '';
        }
        if (!jQuery.isEmptyObject(paddingUserInfo.user_last_name)) {
            trueUserInfo.user_last_name = paddingUserInfo.user_last_name;
        } else {
            trueUserInfo.user_last_name = '';
        }
        if (!jQuery.isEmptyObject(paddingUserInfo.user_link)) {
            trueUserInfo.user_link = paddingUserInfo.user_link;
        } else {
            trueUserInfo.user_link = '';
        }
        if (!jQuery.isEmptyObject(paddingUserInfo.user_gender)) {
            trueUserInfo.user_gender = paddingUserInfo.user_gender;
        } else {
            trueUserInfo.user_gender = '';
        }
        if (!jQuery.isEmptyObject(paddingUserInfo.user_birthday)) {
            trueUserInfo.user_birthday = paddingUserInfo.user_birthday;
        } else {
            trueUserInfo.user_birthday = '';
        }
        if (!jQuery.isEmptyObject(paddingUserInfo.user_locale)) {
            trueUserInfo.user_locale = paddingUserInfo.user_locale;
        } else {
            trueUserInfo.user_locale = '';
        }
        if (!jQuery.isEmptyObject(paddingUserInfo.user_picture)) {
            trueUserInfo.user_picture = paddingUserInfo.user_picture;
        } else {
            trueUserInfo.user_picture = '';
        }
        if (!jQuery.isEmptyObject(paddingUserInfo.spring)) {
            trueUserInfo.spring = paddingUserInfo.spring;
        } else {
            trueUserInfo.spring = '';
        }
        if (!jQuery.isEmptyObject(paddingUserInfo.facebook)) {
            trueUserInfo.facebook = paddingUserInfo.facebook;
        } else {
            trueUserInfo.facebook = '';
        }
        if (!jQuery.isEmptyObject(paddingUserInfo.google)) {
            trueUserInfo.google = paddingUserInfo.google;
        } else {
            trueUserInfo.google = '';
        }
        if (!jQuery.isEmptyObject(paddingUserInfo.microsoft)) {
            trueUserInfo.microsoft = paddingUserInfo.microsoft;
        } else {
            trueUserInfo.microsoft = '';
        }
        if (!jQuery.isEmptyObject(paddingUserInfo.last_login)) {
            trueUserInfo.last_login = paddingUserInfo.last_login;
        } else {
            trueUserInfo.last_login = '';
        }
        if (!jQuery.isEmptyObject(paddingUserInfo.last_active)) {
            trueUserInfo.last_active = paddingUserInfo.last_active;
        } else {
            trueUserInfo.last_active = '';
        }
        if (!jQuery.isEmptyObject(paddingUserInfo.user_cover)) {
            trueUserInfo.user_cover = paddingUserInfo.user_cover;
        } else {
            trueUserInfo.user_cover = getRandomImage();
        }
        console.log('paddingUserInfo trueUserInfo ---> ' + JSON.stringify(trueUserInfo));
        return trueUserInfo;
    }

    function getRandomImage() {
        var image = [
            'https://www.japan-guide.com/thumb/interest_flowers.jpg',
            'https://www.freewebheaders.com/wordpress/wp-content/gallery/clouds-sky/clouds-sky-header-2067-1024x300.jpg',
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
        return image[Math.floor(Math.random() * image.length)];
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
        console.log("parseDataArrayToObject -----> " + JSON.stringify(parseDataArrayToObject));
        $.each(parseDataArrayToObject, function (key, value) {
            //console.log("parseFileInbox[key] ----->" + JSON.stringify(parseFileInbox[key]));
            //console.log("parseFileInbox paddingData ----->" + paddingData(value)); // <<-------
            //console.log("parseFileInbox value ----->" + JSON.stringify(value));
            // Array to Object Recognize
            parseDataArrayToObject[key] = {
                'a': value.user_display_name,
                'b': value.title,
                'c': value.content,
                'd': value.updated_at,
                'img': value.item_id,
                'cover': value.cover,
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
                'count': value.item_count_show,
                'access': value.access,
                'tags': value.tags
            };
        });
        //delete parseFileInbox.results;
        console.log("parseFileInbox ----->" + JSON.stringify(parseDataArrayToObject));
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
        paddingButtonOneTime.showcaseButton = {
            'reply-toggle': {
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
            },
            'fb-send-message': {
                'video': paddingButtonInbox.video,
                'message_id': paddingButtonInbox.message_id
            }
        };
        return paddingButtonOneTime;
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
        console.log("paddingButtonMy -----> " + JSON.stringify(paddingButtonMy));
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
                'access': paddingButtonMy.access
            }
        };
        return paddingButtonMy;
    }

    function paddingButtonMySpring(paddingButtonMySpring) {
        console.log("paddingButtonMySpring -----> " + JSON.stringify(paddingButtonMySpring));
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

    function paddingButtonSpring(paddingButtonSpring) {
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
                type: "video/mp4",
                //src: sourseURL + showcaseVideoSettings.file + messageAdd
                src: sourseURL + showcaseVideoSettings.video + '.mp4' // TODO: add message_id
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
                miniPlayerFunc.src({type: "video/mp4", src: sourseURL + showcaseVideoSettings.video + '.mp4'});
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
        $(".videme-showcase-createdat").html(showcaseTextSettings.created_at);
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
        console.log("$.fn.showcaseUserInfo showcaseUserInfoSettings -----> " + JSON.stringify(showcaseUserInfoSettings));
        $(".videme-showcase-from_user_name").html(showcaseUserInfoSettings.from_user_name);
        $('#nav_form_user_name').html("<a href='" + showcaseUserInfoSettings.spring + "'>" + showcaseUserInfoSettings.from_user_name + "</a>");
        //$('#nav_form_user_email').html(showcaseUserInfoSettings.user_email);
    };

    $.fn.showcaseUserPicture = function (options) {
        showcaseUserPictureSettings = $.extend({}, options);
        console.log("$.fn.showcaseUserPicture -----> " + JSON.stringify(showcaseUserPictureSettings));
        $(".videme-showcase-user_picture").html('<a href="https://www.vide.me/' + showcaseUserPictureSettings.spring + '" ><img src="' + showcaseUserPictureSettings.user_picture + '" width="46" height="46" alt="' + showcaseUserPictureSettings.from_user_name + '"></a>');
        $('#nav_user_brand').attr('src', showcaseUserPictureSettings.user_picture);
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
        console.log("$.fn.showcaseButton showcaseButtonSettings -----> " + JSON.stringify(showcaseButtonSettings));
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
                rec[myEmailKey] = showcaseButtonSettings.fromUserName;
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
                emails += "&email=" + showcaseButtonSettings.fromUserName;

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
        if (showcaseButtonSettings.showcaseButton['contact-toggle']) $(".contact-toggle").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['contact-toggle']);
        if (showcaseButtonSettings.showcaseButton['share-toggle']) $(".share-toggle").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['share-toggle']);
        if (showcaseButtonSettings.showcaseButton['list-toggle']) $(".list-toggle").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['list-toggle']);
        if (showcaseButtonSettings.showcaseButton['del-inbox-toggle']) $(".del-inbox-toggle").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['del-inbox-toggle']);
        if (showcaseButtonSettings.showcaseButton['del-sent-toggle']) $(".del-sent-toggle").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['del-sent-toggle']);
        if (showcaseButtonSettings.showcaseButton['del-my-toggle']) $(".del-my-toggle").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['del-my-toggle']);
        if (showcaseButtonSettings.showcaseButton['item-edit-toggle']) $(".item-edit-toggle").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['item-edit-toggle']);
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
        console.log("$.fn.showcaseVideoTextButton showcaseVideoTextButtonSettings -----> " + JSON.stringify(showcaseVideoTextButtonSettings));
        $.fn.showcaseVideo(showcaseVideoTextButtonSettings);
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
                var TempObject = $(this);
                $.getJSON("https://api.vide.me/article/shownew/?limit=" + showNewArticleSettings.limit + "&videmecallback=?",
                    function (data) {
                        TempObject.html($.fn.showArticleTile({
                            showArticleTile: parseArticleShowNew(data),
                            TempObject: TempObject,
                            button: "new"
                        }));
                    })
                    .done(function () {
                    })
                    .fail(function (data) {
                        TempObject.html(showError(data));
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
        //var TempObject = $(this);
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
                        TempObject: tempObject,
                        button: "new"
                    }));
                    /*console.log("$.fn.showSearchArticle parseSearchArticle -----> " + $.fn.showArticleTile({
                        showArticleTile: parseSearchArticle(data),
                        TempObject: tempObject,
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
                TempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    $.fn.showSearchItemByTag = function (options) {
        showSearchItemByTagSettings = $.extend({
            limit: 3,
            showcaseSearchArticle: "#videme-search-article-tile"
        }, options);
        //$(this).html(VidemeProgress);
        //return this.each(function () {
        //var TempObject = $(this);
        if ($(this).length) {
            console.log("$.fn.showSearchArticle $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.showSearchArticle $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showSearchItemByTagSettings.showcaseSearchArticle);
        }
        console.log("$.fn.showSearchArticle tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        var start_time = performance.now();
        $.getJSON("https://api.vide.me/v2/post/search/?q=" + showSearchItemByTagSettings.q + "&limit=" + showSearchItemByTagSettings.limit + "&videmecallback=?",
            function (data) {
                var response_time = Math.round(performance.now() - start_time);
                //console.log('doTasks took ' + response_time + ' milliseconds to execute.');
                //$('#article-search-result-response').append('<p><small>' + data.length + ' messages. API response time: ' + response_time + ' milliseconds</small></p>');
                $(showSearchItemByTagSettings.showcaseResultResponse).append('<small>API response time: ' + response_time + ' milliseconds. ' + data.length + ' items. </small>');
                if (data) {
                    /*tempObject.html($.fn.showArticleTile({
                        showArticleTile: parseSearchArticle(data),
                        TempObject: tempObject,
                        button: "new"
                    }));*/
                    tempObject.html(showTile(parseFileMy(data), tempObject, "shownext"));
                    /*console.log("$.fn.showSearchArticle parseSearchArticle -----> " + $.fn.showArticleTile({
                        showArticleTile: parseSearchArticle(data),
                        TempObject: tempObject,
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
                TempObject.html(showError(data));
            })
            .always(function () {
            });
    };

    $.fn.showArticleMostPopTags = function (options) {
        showArticleMostPopTagsSettings = $.extend({
            /*limit: 3,*/
            showcaseArticleMostPopTags: "#videme-article-pop-tags"
        }, options);
        //$(this).html(VidemeProgress);
        //return this.each(function () {
        //var TempObject = $(this);
        if ($(this).length) {
            console.log("$.fn.showArticleMostPopTags $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.showArticleMostPopTags $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showArticleMostPopTagsSettings.showcaseArticleMostPopTags);
        }
        console.log("$.fn.showArticleMostPopTags tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        var html = [];
        var start_time = performance.now();
        $.getJSON("https://api.vide.me/article/getpoptags/?videmecallback=?",
            function (data) {
                //console.log("$.fn.showArticleMostPopTags getJSON -----> " + JSON.stringify(data));
                //console.log("$.fn.showArticleMostPopTags getJSON data.tags -----> " + JSON.stringify(data.tags));
                var response_time = Math.round(performance.now() - start_time);
                //console.log('doTasks took ' + response_time + ' milliseconds to execute.');
                $(showArticleMostPopTagsSettings.showcaseResultResponse).append('<p><small>API response time: ' + response_time + ' milliseconds</small></p>');
                if (data.tags) {
                    //console.log("$.fn.showArticleMostPopTags data.tags -----> yes");

                    $.each(data.tags, function (key, value) {
                        //console.log("$.fn.showArticleMostPopTags data.tags -----> cnt: " + value.cnt + " tag " + value.tag);
                        html.push("<a href=\"https://vide.me/search/?q=" + value.tag + "\" class=\"badge badge-primary\"> " + value.tag + " </a> ");
                    });
                    tempObject.html(html);
                } else {
                    console.log("$.fn.showArticleMostPopTags data.tags -----> no");
                    tempObject.html("No results");
                }
            })
            .done(function () {
            })
            .fail(function (data) {
                TempObject.html(showError(data)); // TODO: Not worked
            })
            .always(function () {
            });
    };

    $.fn.showMyArticle = function (options) {
        articleShowMySettings = $.extend({
            limit: 12
        }, options);
        $(this).html(VidemeProgress);
        //return this.each(function () {
        var TempObject = $(this);
        $.getJSON("https://api.vide.me/article/my/?limit=" + articleShowMySettings.limit + "&videmecallback=?",
            function (data) {
                TempObject.html($.fn.showArticleTile({
                    showArticleTile: parseArticleShowNew(data),
                    TempObject: TempObject,
                    button: "own"
                }));
            })
            .done(function () {
            })
            .fail(function (data) {
                TempObject.html(showError(data));
            })
            .always(function () {
            });
        //});
    };

    $.fn.showMyArticleDraft = function (options) {
        articleShowMyDraftSettings = $.extend({
            limit: 12
        }, options);
        $(this).html(VidemeProgress);
        //return this.each(function () {
        var TempObject = $(this);
        $.getJSON("https://api.vide.me/article/mydraft/?limit=" + articleShowMyDraftSettings.limit + "&videmecallback=?",
            function (data) {
                TempObject.html($.fn.showArticleTile({
                    showArticleTile: parseArticleShowNew(data),
                    TempObject: TempObject,
                    button: "own"
                }));
            })
            .done(function () {
            })
            .fail(function (data) {
                TempObject.html(showError(data));
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
        //var TempObject = $(this);
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
        console.log("$.fn.showArticle showArticleSettings.TempObject.width() -----> " + showArticleSettings.TempObject.width());
        if (showArticleSettings.TempObject.width() < 580) {
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
        console.log("$.fn.showRelation -----> ok");
        showContactSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showRelation: "#videme-tile"
        }, options);
        if ($(this).length) {
            console.log("$.fn.showRelation $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.showRelation $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showContactSettings.showRelation);
        }
        console.log("$.fn.showRelation tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/relation/?limit=" + showContactSettings.limit + "&videmecallback=?",
            function (data) {
                // TODO: Попробовать без куки nad
                console.log("$.fn.showRelation data -----> " + data);
                if (data) {
                    console.log("$.fn.showRelation data -----> yes" + JSON.stringify(data));
                    var results = [];
                    //$.each(data['results'], function (key, value) {
                    $.each(data, function (key, value) {
                        results.push("\
                        <div class='well well-lg'>\
                            <span class=\"badge\">" + (key + 1) + "</span>\
	<a href='https://vide.me/rec/?email=" + value.relation_email + "'>\
		" + value.relation_email + "\
		<button type='button' \
			class='btn btn-default pull-right btn-sm' data-toggle='modal' \
			email-value='#" + value.relation_email + "'> \
			<span class='glyphicon glyphicon-envelope'></span> Send video email\
		</button>\
	</a>\
	<button type='button' \
		class='btn btn-default pull-right btn-sm contact-edit-toggle' data-toggle='modal' \
		data-target='#modal-edit-contact' \
		email='" + value.relation_email + "'\
		to_user_id='" + value.to_user_id + "'>\
		<span class='glyphicon glyphicon-edit'></span> Edit\
	</button>\
	(Created at: " + value.created_at + ")\
</div>\
");
                    });
                    tempObject.html(results.join(""));
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
     v2 Функция показать List
     ***************************************************************************/
    $.fn.showList = function (options) {
        console.log("$.fn.showList -----> ok");
        showListSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showList: "#videme-tile"
        }, options);
        if ($(this).length) {
            console.log("$.fn.showList $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.showList $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showListSettings.showList);
        }
        console.log("$.fn.showList tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/list/?limit=" + showListSettings.limit + "&videmecallback=?",
            function (data) {
                if (data) {
                    console.log("$.fn.showList data -----> yes " + JSON.stringify(data));
                    var results = [];
                    //$.each(data['results'], function (key, value) {
                    $.each(data, function (key, value) {
                        console.log("$.fn.showList data -----> key " + key);
                        console.log("$.fn.showList data -----> value " + value);
                        console.log("$.fn.showList data -----> value " + JSON.stringify(value));

                        results.push("\
<div class='well well-lg'>\
  <span class=\"badge\">" + (key + 1) + "</span>\
	<a href='#" + value.title + "'>\
		" + value.title + "\
	</a>\
	<button type='button' \
		class='btn btn-primary pull-right list-edit-toggle' data-toggle='modal' \
		data-target='#modal-edit-list' \
		list='" + value.title + "'>\
		<span class='glyphicon glyphicon-edit'></span> Edit\
	</button>\
</div>\
");
                    });
                    tempObject.html(results.join(""));
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
    $.fn.showSignsOfSpring = function (options) {
        console.log("$.fn.showSignsOfSpring -----> ok");
        showListOfSpringSettings = $.extend({
            // TODO: добавить limit в NAD
            //limit: 6,
            showSignsOfSpring: "#videme-list-of-spring"
        }, options);
        if ($(this).length) {
            console.log("$.fn.showSignsOfSpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.showSignsOfSpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showListOfSpringSettings.showSignsOfSpring);
        }
        console.log("$.fn.showSignsOfSpring tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        var url = parseUrl();
        $.getJSON("https://api.vide.me/v2/spring/signs/?spring=" + url.spring + "&videmecallback=?",
            function (data) {
                if (data) {
                    console.log("$.fn.showSignsOfSpring data -----> yes" + JSON.stringify(data));
                    var results = [];
                    //$.each(data['results'], function (key, value) {
                    results.push("<ul class=\"list-group\">");
                    $.each(data, function (key, value) {
                        results.push("\
                        <li class=\"list-group-item\">\
                            <a href='https://vide.me/" + url.spring + "/?list=" + value.title + "'>\
                                " + value.title + "\
                            </a>\
                        </li>\
                        ");
                    });
                    results.push("</ul>");
                    tempObject.html(results.join(""));
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
    event.preventDefault();
    var $this = $(this);
    var email = $this.attr('email');
    $('#edit-email').val(email);
    $('#new-email').val(email);
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
    if ($('.contact-toggle').attr('item_id')) {
        $(".videme_item_card").itemCard($('.contact-toggle'));
        $(".videme-contact-list").html(VidemeProgress);
        $.getJSON("https://api.vide.me/v2/relation/?videmecallback=?",
            function (data) {
                // TODO: Попробовать без куки nad
                if (data) {
                    console.log(".contact-toggle data -----> yes" + JSON.stringify(data));
                    var results = [];
                    $.each(data, function (key, value) {
                        results.push("<a class='badge badge-primary contact-url' href='https://api.vide.me/v2/items/resend/?email=" + value.user_email + "&item_id=" + $('.contact-toggle').attr('item_id') + "&subject=Re: " + $('.contact-toggle').attr('title') + "&message=" + $('.contact-toggle').attr('content') + "&nad=" + $.cookie('vide_nad') + "' target='_blank'>" + value.user_email + "</a> ");
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
});

/*************************************************************
 v2 Событие 3: нажата кнопка вызова и отрисовки листов в модальном окне
 **************************************************************/
$(document).on('click', '.list-toggle', function (event) {
    console.log(".list-toggle -----> click");
    event.stopPropagation();
    if ($('.list-toggle').attr('item_id')) {
        $(".videme-list-list").html(VidemeProgress);
        $(".videme-mini-img").html(VidemeProgress);
        $(".videme-mini-img").html("<img src='https://s3.amazonaws.com/img.vide.me/" + $('.list-toggle').attr('item_id') + ".jpg' class='videme-img-tile-my' width='190' height='108'>");
        if ($('.list-toggle').attr('title')) $(".videme-file-info").append("<b>" + $('.list-toggle').attr('title') + "</b><br>");
        if ($('.list-toggle').attr('content')) $(".videme-file-info").append($('.list-toggle').attr('content') + "<br>");
        if ($('.list-toggle').attr('created_at')) $(".videme-file-info").append($('.list-toggle').attr('created_at') + "<br>");

        //$(".videme-file-info").html("<b>" + $('.list-toggle').attr('title') + "</b><br>" + $('.list-toggle').attr('content') + "<br>" + $('.list-toggle').attr('created_at') + "<br>");
        $('#file').val($('.list-toggle').attr('file'));
        $.getJSON("https://api.vide.me/v2/list/?videmecallback=?",
            function (data) {
                if (data) {
                    console.log(".list-toggle data -----> yes" + JSON.stringify(data));
                    var results = [];
                    $.each(data, function (key, value) {
                        results.push("<a class='list-url' href='https://api.vide.me/v2/items/share/?item=" + $('.list-toggle').attr('item_id') + "&list=" + value.title + "&nad=" + $.cookie('vide_nad') + "' target='_blank'><span class='label label-primary'>" + value.title + "</span></a> ");
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
});

/*************************************************************
 v2 Событие 3: нажата кнопка вызова и отрисовки
 кнопки удалить Inbox в модальном окне
 **************************************************************/
$(document).on('click', '.del-inbox-toggle', function (event) {
    console.log(".del-inbox-toggle -----> click");
    event.stopPropagation();
    if ($('.del-inbox-toggle').attr('message_id')) {
        $(".videme_item_card").itemCard($('.del-inbox-toggle'));
        $('.videme-del-list').html("\
                <button type='button' class='btn btn-primary' data-dismiss='modal'>\
                    Сancel\
                </button> \
                <a class='del-inbox-url' message_id='https://api.vide.me/v2/message/inbox/delete/?message_id=" + $('.del-inbox-toggle').attr('message_id') + "&nad=" + $.cookie('vide_nad') + "' target='_blank'>\
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
    if ($('.del-my-toggle').attr('item_id')) {
        $(".videme_item_card").itemCard($('.del-my-toggle'));
        $('.videme-del-list').html("\
                <button type='button' class='btn btn-primary' data-dismiss='modal'>\
                    Сancel\
                </button> \
                <a class='del-my-url' item_id='https://api.vide.me/v2/items/my/delete/?item_id=" + $('.del-my-toggle').attr('item_id') + "&nad=" + $.cookie('vide_nad') + "' target='_blank'>\
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
    if ($('.item-edit-toggle').attr('item_id')) {
        if ($.cookie('vide_nad')) {
            $('#nad').val($.cookie('vide_nad'));
        } else {
            console.log("item-edit-toggle -----> no cookie");
        }
        $('#item_id').val($('.item-edit-toggle').attr('item_id'));
        $('#cover').attr('src', 'https://s3.amazonaws.com/img.vide.me/' + $('.item-edit-toggle').attr('item_id') + '.jpg');
        $('#title').val($('.item-edit-toggle').attr('title'));
        $('#content').val($('.item-edit-toggle').attr('content'));
        $('#access').val($('.item-edit-toggle').attr('access'));
        console.log("item-edit-toggle access -----> " + $('.item-edit-toggle').attr('access'));
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
    }
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
        image.src = "https://api.vide.me/img/?i=undefined.gif";
        return true;
    }

    /*************************************************************
     Событие 2: нажата ссылка на файл из плитки Next
     **************************************************************/
    $(document).on('click', 'a.shownext', function (event) {
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
                url: 'https://api.vide.me/contact/update/',
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
        var list = $this.attr('list');
        console.log(".list-edit-toggle click list: -----> " + $this.attr('list'));
        list.replace(/.*(?=#[^\s]+$)/, '');
        $('#editlist').val(list);
        $('#newlist').val(list);
        $(".list-del-toggle").attr("list", list);
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
                    location.reload();
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
     Событие XX: нажата кнопка изменить пароль
     **************************************************************/
    $('#user-pas-form').validate({
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/user/update/pas/',
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

/***************************************************************************
 * Функции Vide.me
 ***************************************************************************/

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

function timeToWord(previous) {
    //var currentCommon = new Date();
    //var current = currentCommon.toISOString();
    //var prevCommon = new Date(previous);
    //previous = prevCommon.toISOString();
    //var current = (new Date()).toLocaleDateString();
    var current = new Date().toISOString().slice(0, 19).replace('T', ' ');
    //var current = new Date('dd/MM/yyyy HH:mm:ss fff');
    //var current = new Date().format("yyyy-mm-dd HH:MM:ss l");
    previous = previous.substr(0, 19);
    console.log("timeToWord current --->" + current);
    console.log("timeToWord previous --->" + previous);

    return previous;

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
        return Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
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

function padding_item_object(padding_item_object) {
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