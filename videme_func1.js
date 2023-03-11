console.log("videme_func1.js");

//var origin_video_vide_me = 'https://d147uuofapeg23.cloudfront.net/';
//var origin_video_vide_me = 'https://s3.amazonaws.com/video.vide.me/';
//var origin_video_vide_me = 'https://video.vide.me/';
//var origin_video_vide_me = 'https://video.rate-my.life/';

//var origin_img_vide_me = 'https://d2chzr75qdz7mo.cloudfront.net/';
//var origin_img_vide_me = 'https://s3.amazonaws.com/img.vide.me/';
//var origin_img_vide_me = 'https://img.vide.me/';
//var origin_img_vide_me = 'https://img.rate-my.life/';

//var origin_pre_image_w320_vide_me = 'https://d2z9n0aqp1awf1.cloudfront.net/';
//var origin_pre_image_w320_vide_me = 'https://s3.amazonaws.com/pre-image-w320.vide.me/';
//var origin_pre_image_w320_vide_me = 'https://pre-image-w320.vide.me/';
//var origin_pre_image_w320_vide_me = 'https://pre-image-w320.rate-my.life/';

//var origin_pre_video_w320_vide_me = 'https://d87muy94jev0k.cloudfront.net/';
//var origin_pre_video_w320_vide_me = 'https://s3.amazonaws.com/pre-video-w320.vide.me/';
//var origin_pre_video_w320_vide_me = 'https://pre-video-w320.vide.me/';
//var origin_pre_video_w320_vide_me = 'https://pre-video-w320.rate-my.life/';

//var origin_sprite_w120_vide_me = 'https://d1orzbl5d7paas.cloudfront.net/';
//var origin_sprite_w120_vide_me = 'https://s3.amazonaws.com/sprite-w120.vide.me/';
//var origin_sprite_w120_vide_me = 'https://sprite-w120.vide.me/';
//var origin_sprite_w120_vide_me = 'https://sprite-w120.rate-my.life/';

//var origin_static_vide_me = 'https://d1orzbl5d7paas.cloudfront.net/';
//var origin_static_vide_me = 'https://s3.amazonaws.com/sprite-w120.vide.me/';
//var origin_static_vide_me = 'https://static.vide.me/';
var origin_static_vide_me = 'https://static.rate-my.life/';

var moment = require('moment');


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

var VidemeAlertLogin = '<div class="alert alert-warning alert-dismissible fade show" role="alert">' +
    '  Please <strong><a href="https://www.vide.me/web/enter/" class="alert-link"> log in </a></strong> first!' +
    '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
    '    <span aria-hidden="true">&times;</span>' +
    '  </button>' +
    '</div>';

/***************************************************************************
 * Функции Vide.me
 ***************************************************************************/

function gotoLogin() { // 31072022
    window.location.href = 'https://www.vide.me/web/enter/';
}

function pas_info() { // 31072022
    if ($.cookie('vide_nad')) {
        $.getJSON("https://api.vide.me/v2/user/info/?videmecallback=?",
            function (data) {
                if (!$.isEmptyObject(data)) {
                    var trueUserInfo = paddingUserInfo(data);
                    $('.pas_info_heading').html(trueUserInfo.user_display_name);
                    $('.pas_info_user_id_face_img').attr('src', origin_img_vide_me + trueUserInfo.user_picture);
                    $('.pas_info_user_cover').attr('src', origin_img_vide_me + trueUserInfo.user_cover);
                    $('.pas_info_user_cover_top').attr('src', origin_img_vide_me + trueUserInfo.user_cover_top);
                    $('#user_display_name').val(trueUserInfo.user_display_name);
                    $('#user_first_name').val(trueUserInfo.user_first_name);
                    $('#user_last_name').val(trueUserInfo.user_last_name);
                    $('#user_link').val(trueUserInfo.user_link);
                    $('input:radio[name=user_gender]').val([trueUserInfo.user_gender]);
                    $('#user_locale').val(trueUserInfo.user_locale);
                    //$('#user_picture').val(trueUserInfo.user_picture);
                    //$('#user_cover').val(trueUserInfo.user_cover);
                    $('#country').val(trueUserInfo.country);
                    $('#city').val(trueUserInfo.city);
                    $('#bio').val(trueUserInfo.bio);
                    $('#slogan').val(trueUserInfo.slogan);
                } else {
                    console.log("$.fn.getAuthorized -----> getJSON empty");
                    $('.videme-form-user-info').remove();
                }
            }
        );
    } else {
        console.log("$.fn.getAuthorized -----> no cookie");
        $('.pas_info_heading').html('authorise please');
    }
    console.log('pas_info' + $.fn.getAuthorized());
}

function itemEdit() { // 31072022
    if ($.cookie('vide_nad')) {
        var i = getParameterByName('i'); // TODO: why?
        $.getJSON("https://api.vide.me/v2/items/info/?item_id=" + i + "&videmecallback=?",
            function (data) {
                if (!$.isEmptyObject(data)) {
                    console.log(".itemEdit -----> data: ", data);
                    console.log(".itemEdit -----> data: ", JSON.stringify(data));
                    var trueUserInfo = paddingUserInfo(data);
                    //console.log(".itemEdit -----> trueUserInfo: ", trueUserInfo);
                    /*$(".videme_item_card_edit").showItemCard({'item_id': $this.attr('item_id')});*/
                    //$(".videme_item_card").itemCard($this);
                    $('#nad').val($.cookie('vide_nad'));
                    $('#item_id').val(trueUserInfo.item_id);
                    $('#videme-form-partners-search-btn').attr('item_id', trueUserInfo.item_id);

                    $('#item_type').val(trueUserInfo.type);

                    if (trueUserInfo.cover) {
                        $('#videme_item_edit_image').attr('src', origin_img_vide_me + trueUserInfo.cover).removeClass('hidden');
                        //$('#videme_item_edit_image_now').attr('src', 'https://s3.amazonaws.com/img.vide.me/' + $this.attr('cover'));
                    } else {
                        //$('#videme_item_edit_image').attr('src', 'https://s3.amazonaws.com/vide.me/select_image.png');
                        //$('#videme_item_edit_image_now').attr('src', 'https://s3.amazonaws.com/img.vide.me/' + $this.attr('item_id') + '.jpg');
                    }
                    $('#videme_item_edit_image_item').attr('src', origin_img_vide_me + trueUserInfo.item_id + '.jpg');

                    $('#cover').val(trueUserInfo.cover);
                    $('#item_edit_title').val(trueUserInfo.title);
                    $('#item_edit_content_edit').val(trueUserInfo.content);
                    //$('#access').val(trueUserInfo.access);
                    if (trueUserInfo.access) {
                        $("input[name=access][value=" + trueUserInfo.access + "]").prop('checked', true);
                    } else {
                        $("input[name=access][value=public]").prop('checked', true);
                    }
                    $('.del-my-toggle').attr('item_id', trueUserInfo.item_id);
                    $('.del-my-toggle').attr('user_display_name', trueUserInfo.user_display_name);
                    $('.del-my-toggle').attr('title', trueUserInfo.title);
                    $('.del-my-toggle').attr('content', trueUserInfo.content);
                    $('.del-my-toggle').attr('created_at', trueUserInfo.created_at);
                    /*var tagsR = trueUserInfo.tags;
                    if (tags) {
                        var tags = [];
                        tags = $.parseJSON(tagsR);
                        //console.log("$.fn.showcaseText tags -----> " + tags);
                        $.each(tags, function (key, value) {
                            //console.log("$.fn.showcaseText tags -----> " + value);
                            $("#tags").html('<a href="https://www.vide.me/search/?q=' + value + '" class="badge badge-primary">' + value + '</span> ');

                        });
                    } else {
                        //console.log("$.fn.showcaseText showcaseTextSettings.tags -----> empty");
                    }*/
                    if (trueUserInfo.tags) {
                        //console.log("function itemEdit tags ----->" + JSON.stringify(trueUserInfo.tags));
                        //var links = '';
                        var element_tags = '';
                        var web_id_tags = '';
                        array_tags = $.parseJSON(trueUserInfo.tags);
                        $.each(array_tags, function (key, value) {
                            //console.log("function itemEdit each value tags -----> " + value);
                            //links += '&nbsp;<a href="' + value.link + '" target="_blank" class="badge badge-primary">' + value.title + '</span> ';
                            /*element += "\
<input type=\"hidden\" name=\"ext_links[" + value.title + "][title]\" value=\"" + value.title + "\" class='" + value.title + "'\">\
<input type=\"hidden\" name=\"ext_links[" + value.title + "][link]\" value=\"" + value.link + "\" class='" + value.title + "'\">\
<a class=\"badge badge-primary videme-edit-ext_link " + value.title + "\" href='" + value.link + "' target='_blank'> " +
                                value.title +
                                "<a class=\"ext_link_remove\" href=\"#\" ext_link_title=\"" + value.title + "\"><i class=\"fa fa-remove\"></i></a></a>";*/
                            web_id_tags = makeid();
                            //element_tags += value ;
                            element_tags +=
                                "<input type='hidden' name='tags[" + value + "]' value='" + value + "' class='" + web_id_tags + "'/>" +
                                "<span class='badge badge-pill badge-secondary videme-edit-tag " + web_id_tags + "' >" +
                                value +
                                "    <a class='tag_remove' href='#' tag_remove_title='" + web_id_tags + "'>" +
                                "        <i class='fa fa-remove'></i>" +
                                "    </a>" +
                                "</span>&nbsp;";
                        });
                        //$(".add_ext_links").append('<div class="videme_item_info_element"><i class="fa fa-external-link videme_item_info_icon" item_id="' + $this.attr('item_id') + '"><div class="videme_item_info_val">' + links + '</div></i></div>');
                        //console.log("function itemEdit element_tags tags -----> " + element_tags);
                        $("#videme-item-edit-tags_edit").html(element_tags);
                        //element.hide().slideDown(500);
                    }
                    if (trueUserInfo.ext_links) {
                        console.log("function itemEdit ext_links ----->" + JSON.stringify(trueUserInfo.ext_links));
                        var links = '';
                        var element = '';
                        var web_id = '';
                        array_ext_links2 = $.parseJSON(trueUserInfo.ext_links);
                        $.each(array_ext_links2, function (key, value) {
                            //console.log("$.fn.showcaseText tags -----> " + value);
                            //links += '&nbsp;<a href="' + value.link + '" target="_blank" class="badge badge-primary">' + value.title + '</span> ';
                            /*element += "\
<input type=\"hidden\" name=\"ext_links[" + value.title + "][title]\" value=\"" + value.title + "\" class='" + value.title + "'\">\
<input type=\"hidden\" name=\"ext_links[" + value.title + "][link]\" value=\"" + value.link + "\" class='" + value.title + "'\">\
<a class=\"badge badge-primary videme-edit-ext_link " + value.title + "\" href='" + value.link + "' target='_blank'> " +
                                value.title +
                                "<a class=\"ext_link_remove\" href=\"#\" ext_link_title=\"" + value.title + "\"><i class=\"fa fa-remove\"></i></a></a>";*/
                            web_id = makeid();
                            element += "\
<input type=\"hidden\" name=\"ext_links[" + value.title + "][title]\" value=\"" + value.title + "\" class='" + web_id + "'>\
<input type=\"hidden\" name=\"ext_links[" + value.title + "][link]\" value=\"" + value.link + "\" class='" + web_id + "'>\
<a class=\"badge badge-primary videme-edit-ext_link " + web_id + "\" href='" + value.link + "' target='_blank'> " + value.title + "<a class=\"ext_link_remove\" href=\"#\" ext_link_title=\"" + web_id + "\"><i class=\"fa fa-remove\"></i></a></a>";

                        });
                        //$(".add_ext_links").append('<div class="videme_item_info_element"><i class="fa fa-external-link videme_item_info_icon" item_id="' + $this.attr('item_id') + '"><div class="videme_item_info_val">' + links + '</div></i></div>');


                        $("#add_ext_links").html('&nbsp;' + element);
                        //element.hide().slideDown(500);
                    }
                } else {
                    console.log("$.fn.getAuthorized -----> getJSON empty");
                    $('.videme-form-user-info').remove();
                }
            }
        );
    } else {
        //$('#modal-item-edit').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();

    }
}

/* Browser detect*/
function detectBrowser() { // 310720211 ???
    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]"
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

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

function showTileDoorbellSignSmall(showTileDoorbellSignSmall, tempObject) { // 31072022
    //console.log('showTileDoorbellSignSmall ---> ' + JSON.stringify(showTileDoorbellSignSmall));
    var html = [];
    let li_id = '';
    html.push("<ul class=\"list-group videme-doorbell-sign-small\">");
    $.each(showTileDoorbellSignSmall, function (key, value) {
        var trueValue = paddingUserInfo(value); // TODO: Dobble? noo
        if (!$.isEmptyObject(showDoorbellSignSmall.web_parent_id)) {
            li_id = showDoorbellSignSmall.web_parent_id;
        } else {
            li_id = makeid();
            showDoorbellSignSmall.web_parent_id = li_id;
        }
        html.push('<li type="button" class="list-group-item list-group-item-action videme-list-group" id="' + li_id + '">');
        html.push(showDoorbellSignSmall(trueValue, tempObject));
        html.push('</li>');
    });
    html.push("</ul>");
    return html.join('');
}

function showDoorbellSignSmall(showDoorbellSignSmall, tempObject) { // 31072022
    console.log('showDoorbellSignSmall ---> ' + JSON.stringify(showDoorbellSignSmall));
    //console.log('showDoorbellSignSmall showDoorbellSignSmall.title ---> ' + showDoorbellSignSmall.title);
    //var accessIcon;
    var tempObjectClass = '',
        title = '',
        dbs_image_class = 'videme-doorbell-sign-image',
        spring_show = '',
        country_show = '',
        city_show = '';

    if (!$.isEmptyObject(tempObject)) {
        //console.log('showDoorbellSignSmall tempObject.width() ---> ' + tempObject.width());
        if (tempObject.width() < 300) {
            tempObjectClass = "";
        } else {
            //==tempObjectClass = " d-flex";
        }
    } else {
        tempObjectClass = " d-flex";
    }
    if (!$.isEmptyObject(showDoorbellSignSmall.href)) {
        title = "<a href='https://www.vide.me/" + showDoorbellSignSmall.href + "'>" + showDoorbellSignSmall.title + "</a>";
    } else {
        title = showDoorbellSignSmall.title;
    }
    if (!$.isEmptyObject(showDoorbellSignSmall.dbs_type)) {
    }

    /*if (!$.isEmptyObject(showDoorbellSignSmall.access)) {
        accessIcon = accessToIcon(showDoorbellSignSmall);
    } else {
        var title = showDoorbellSignSmall.title;
    }*/
    // <div class='text-muted videme-doorbell-sign-date'>" + showDoorbellSignSmall.date + "</div>\
    spring_show = getHtmlSpringDBS(showDoorbellSignSmall);
    //var spring_user_name = getHtmlUserNameDBS(showDoorbellSignSmall);
    country_show = getHtmlCountryDBS(showDoorbellSignSmall);
    city_show = getHtmlCityDBS(showDoorbellSignSmall);
    return "<div class='" + dbs_image_class + "'>\
              " + showIconForDoorbelSign(showDoorbellSignSmall) + "\
            </div>\
            <div class='videme-doorbell-sign-1st-line'>\
                <div class='videme-doorbell-sign-1st-line-title-date" + tempObjectClass + "'>\
                    <div class=\"videme-doorbell-sign-title\">" + title + showStatusForDoorbellSign(showDoorbellSignSmall) + "</div>\
                </div>\
                 " + showMiniDBS(showDoorbellSignSmall) + "\
            </div>\
            <div class='videme-doorbell-sign-2st-line'>\
                    " + spring_show + "\
                    <div class='videme-relation-card-user-geo'>\
                    " + country_show + "\
                    " + city_show + "\
                    </div>\
                " + showButtonForDoorbelSign(showDoorbellSignSmall) + "\
                " + showDropdownForDoorbelSign(showDoorbellSignSmall) + "\
                <div class='videme-doorbell-sign-additional'>" + accessToIcon(showDoorbellSignSmall) + "</div>\
                <div class='text-muted videme-doorbell-sign-count'>" + showDoorbellSignSmall.count + "</div>\
            </div>\
            <ul class='videme-doorbell-sign-additional-line'>\
                " + showFooterAdditionalForDoorbellSign(showDoorbellSignSmall) + "\
            </ul>\
            </div>";
}

function showChartItem(showChartItem, chart_id) { // 31072022
    console.log('showChartItem ---> ' + JSON.stringify(showChartItem));
    console.log('showChartItem chart_id ---> ' + chart_id);
    //var chartData = JSON.stringify(showChartItem);
    //console.log('showChartItem chartData ---> ' + chartData);
    /*var data = tempObject.map(function(e) {
        return e;
    });
    console.log('showChartItem data ---> ' + JSON.stringify(data));*/
    //var html = [];
    var data = {
        datasets: [{
            data: showChartItem
        }]
    };
    //var ctx = document.getElementById(tempObject).getContext('2d');
    //var ctx = document.getElementById('videme-share-item').getContext('2d');
    //var ctx = $("#" + tempObject);
    //var ctx = $("#" + tempObject).getContext('2d');
    //var ctx = $("#" + tempObject)[0].getContext('2d');
    const canvas = $('#' + chart_id);
    const ctx = canvas[0].getContext('2d');
    //html.push("<ul class=\"list-group videme-doorbell-sign-small\">");
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            maintainAspectRatio: false,
            //responsive: true,
            backgroundColor: 'rgb(203,76,76)',
            borderColor: 'rgb(101,39,39)',
            borderWidth: 1,
            borderRadius: 12,
            borderSkipped: false,
            aspectRatio: 5,
            scales: {
                x: {
                    type: 'timeseries',
                }
            },
            plugins: {
                legend:
                    {
                        display: false
                    }
            }
        }
    });
    //html.push("</ul>");
    //return html.join('');
}

function showChartPopStates(showChartPopStates, param) { // 31072022
    //console.log('showChartPopStates ---> ' + JSON.stringify(showChartPopStates));
    //console.log('showChartPopStates chart_id ---> ' + chart_id);
    var html = [];
    if (!$.isEmptyObject(showChartPopStates)) {
        html.push("<div class='videme-chart-filter-pop-states'>");
        html.push("<div class='videme-v3-tile-title'>Popular regions:</div>");
        html.push("<span id='' class='badge rounded-pill text-bg-primary videme-chart-pop-state-button videme-chart-pop-state-button_" + param.item + "' state='' item_id='" + param.item + "'>All</span>");

        $.each(showChartPopStates, function (key, value) {
            //console.log('showChartPopStates value ---> ' + JSON.stringify(value));
            var obj_names = jQuery.parseJSON(value['names']);
            //html.push(" State # " + key + " Name: " + obj_names['en']);
            html.push("<span id='' class='badge rounded-pill text-bg-secondary videme-chart-pop-state-button videme-chart-pop-state-button_" + param.item + "' state='" + value['state'] + "' item_id='" + param.item + "'>" + obj_names['en'] + " - " + value['count_state'] + "</span>");
        });
        html.push("</div>");
    }
    return html.join('');
}

/*function jason_padding_to_div(json) {
    console.log('jason_padding_to_div ---> ' + JSON.stringify(json));
    var html = [];
    $.each(json, function (key, value) {
        html.push(" vide-prop-" + key + "=\" + value + \"");
    });
    return html.join('');
}*/

function showMiniDBS(showDoorbellSignSmall) { // 31072022
    console.log('showMiniDBS ---> ' + JSON.stringify(showDoorbellSignSmall));
    //console.log('showDoorbellSignSmall showDoorbellSignSmall.title ---> ' + showDoorbellSignSmall.title);
    //var accessIcon;
    var owner_picture = '', html = '';
    if (!$.isEmptyObject(showDoorbellSignSmall.dbs_type)) {
        switch (showDoorbellSignSmall.dbs_type) {
            case 'essence_to':
                /*if (!$.isEmptyObject(showDoorbellSignSmall.owner_picture)) {
                    owner_picture = "<img class='rounded-circle videme-relation-card-img-tile' src='https://s3.amazonaws.com/img.vide.me/" + showDoorbellSignSmall.owner_picture + "' alt='' style='width: 1rem;height: 1rem;'/>";
                    html = "(" + showDoorbellSignSmall.essence_title + ")\
            <div class='videme-doorbell-sign-image hidden'>\
              " + owner_picture + "\
            </div>\
              " + showDoorbellSignSmall.owner_display_name + showDoorbellSignSmall.ref_title;
                }*/
                if (!$.isEmptyObject(showDoorbellSignSmall.user_picture)) {
                    owner_picture = "<img class='rounded-circle videme-relation-card-img-tile' src='" + origin_img_vide_me + showDoorbellSignSmall.user_picture + "' alt='' style='width: 1rem;height: 1rem;'/>";
                    html = showDoorbellSignSmall.ref_title + " at \
            <div class='videme-doorbell-sign-image hidden'>\
              " + owner_picture + "\
            </div>\
              " + getHtmlUserNameDBS(showDoorbellSignSmall) + "(" + showDoorbellSignSmall.essence_title + ")";
                }
                break;
            case 'essence_from':
                if (!$.isEmptyObject(showDoorbellSignSmall.owner_picture)) {
                    owner_picture = "<img class='rounded-circle videme-relation-card-img-tile' src='" + origin_img_vide_me + showDoorbellSignSmall.owner_picture + "' alt='' style='width: 1rem;height: 1rem;'/>";
                    html = "\
              " + showDoorbellSignSmall.ref_title + " at \
            <div class='videme-doorbell-sign-image'>\
              " + owner_picture + "\
            </div>\
              " + showDoorbellSignSmall.owner_display_name + "\
              (" + showDoorbellSignSmall.essence_title + ")\
            ";
                }
                break;
            case 'partnership_to_me':
                if (!$.isEmptyObject(showDoorbellSignSmall.user_picture)) {
                    owner_picture = "<img class='rounded-circle videme-relation-card-img-tile-v3' src='" + origin_img_vide_me + showDoorbellSignSmall.user_picture + "' alt=''/>";
                    html = owner_picture + getHtmlUserNameDBS(showDoorbellSignSmall);
                }
                break;
            default:
        }
    }
    return html;
}

function showDropdownForDoorbelSign(showDropdownForDoorbelSign) { // 31072022
    //console.log('showDropdownForDoorbelSign ---> ' + JSON.stringify(showDropdownForDoorbelSign));
    //console.log('showDropdownForDoorbelSign.dropdown ---> ' + JSON.stringify(showDropdownForDoorbelSign.dropdown));
    //console.log('showDropdownForDoorbelSign.key ---> ' + showDropdownForDoorbelSign.key);
    //console.log('showDropdownForDoorbelSign.showcaseButton[\'item-edit-toggle\'] ---> ' + JSON.stringify(showDropdownForDoorbelSign.showcaseButton['item-edit-toggle']));
    //console.log('showDropdownForDoorbelSign.showcaseButton ---> ' + JSON.stringify(showDropdownForDoorbelSign.showcaseButton));
    var dropdownDS = '';
    var dropdownMain = '';
    $.each(showDropdownForDoorbelSign.dropdown, function (key, value) {
        switch (value) {
            case 'album':
                dropdownDS += "\
    <a \
        class='dropdown-item album-edit-toggle' data-toggle='modal' \
        data-target='#modal-edit-list' \
        title='" + showDropdownForDoorbelSign.title + "'\
        access='" + showDropdownForDoorbelSign.access + "'>\
        Edit\
    </a>";
                break;
            case 'edit_relation':
                dropdownDS += "\
	<a \
		class='dropdown-item contact-edit-toggle' data-toggle='modal' \
		data-target='#modal-edit-contact' \
		from_user_id='" + showDropdownForDoorbelSign.from_user_id + "'\
		to_user_id='" + showDropdownForDoorbelSign.to_user_id + "'\
		relation_email='" + showDropdownForDoorbelSign.relation_email + "'\
		relation='" + showDropdownForDoorbelSign.relation + "'>\
		Edit\
	</a>";
                break;
            case 'del_friendship':
                dropdownDS += "\
	<a \
		class='dropdown-item friendship-del-toggle' data-toggle='modal' \
		data-target='#modal-del-friendship' \
		user_display_name='" + showDropdownForDoorbelSign.user_display_name + "'\
		spring='" + showDropdownForDoorbelSign.spring + "'\
		user_id='" + showDropdownForDoorbelSign.user_id + "'>\
		Delete\
	</a>";
                break;
            /*case 'edit_my_video':
                dropdownDS += "\
	<a \
		class='dropdown-item item-edit-toggle'\
		id='" + showDropdownForDoorbelSign.key + "' \
		data-toggle='modal' \
		data-target='#modal-item-edit'\
		item_id='" + showDropdownForDoorbelSign.item_id + "'\
		cover='" + showDropdownForDoorbelSign.cover + "'\
		title='" + showDropdownForDoorbelSign.title + "'\
		content='" + showDropdownForDoorbelSign.content + "'\
		access='" + showDropdownForDoorbelSign.access + "'\
		tags='" + showDropdownForDoorbelSign.tags + "'\
		ext_links='" + showDropdownForDoorbelSign.ext_links + "'\
		feedback='" + showDropdownForDoorbelSign.feedback + "'>\
		Edit\
	</a>";
                break;*/
            case 'edit_my_video':
                dropdownDS += "<a class='dropdown-item item-edit-toggle' href='https://api.vide.me/web/item_edit/?i=" + showDropdownForDoorbelSign.item_id + "'>Edit</a>";
                break;
            case 'edit_my_article':
                dropdownDS += "\
	<a \
		class='dropdown-item article-edit-toggle'\
		href='https://api.vide.me/article/update/html/?a=" + showDropdownForDoorbelSign.item_id + "' \
		id='" + showDropdownForDoorbelSign.key + "' \
		item_id='" + showDropdownForDoorbelSign.item_id + "'\
		cover='" + showDropdownForDoorbelSign.cover + "'\
		title='" + showDropdownForDoorbelSign.title + "'\
		content='" + showDropdownForDoorbelSign.content + "'\
		access='" + showDropdownForDoorbelSign.access + "'\
		tags='" + showDropdownForDoorbelSign.tags + "'>\
		Edit\
	</a>";
                // TODO: remove id ... tags
                break;
            case 'edit_my_event':
                dropdownDS += "\
	<a \
		class='dropdown-item event-edit-toggle'\
		href='https://api.vide.me/web/event_update/?e=" + showDropdownForDoorbelSign.item_id + "' \
		id='" + showDropdownForDoorbelSign.key + "' \
		item_id='" + showDropdownForDoorbelSign.item_id + "'\
		cover='" + showDropdownForDoorbelSign.cover + "'\
		title='" + showDropdownForDoorbelSign.title + "'\
		content='" + showDropdownForDoorbelSign.content + "'\
		access='" + showDropdownForDoorbelSign.access + "'\
		tags='" + showDropdownForDoorbelSign.tags + "'>\
		Edit\
	</a>";
                // TODO: remove id ... tags
                break;
            case 'send':
                dropdownDS += "\
	<a \
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
	<a \
		class='dropdown-item list-toggle'\
		id='" + showDropdownForDoorbelSign.key + "' \
		data-toggle='modal' \
		data-target='#modal-list'\
		item_id='" + showDropdownForDoorbelSign.item_id + "'\
		title='" + showDropdownForDoorbelSign.title + "'\
		content='" + showDropdownForDoorbelSign.content + "'\
		created_at='" + showDropdownForDoorbelSign.created_at + "'>\
		Save to album\
	</a>";
                break;
            case 'delete':
                dropdownDS += "\
	<a \
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
            case 'delete-my-post': // TODO: remove NOOO
                dropdownDS += "\
	<a \
		class='dropdown-item del-my-post-toggle'\
		id='" + showDropdownForDoorbelSign.key + "' \
		data-toggle='modal' \
		data-target='#modal-del-post'\
		item_id='" + showDropdownForDoorbelSign.item_id + "'\
		post_id='" + showDropdownForDoorbelSign.post_id + "'\
		user_display_name='" + showDropdownForDoorbelSign.user_display_name + "'\
		title='" + showDropdownForDoorbelSign.title + "'\
		content='" + showDropdownForDoorbelSign.content + "'\
		created_at='" + showDropdownForDoorbelSign.created_at + "'>\
		Delete\
	</a>";
                break;
            case 'delete_my_post':
                dropdownDS += "\
	<a \
		class='dropdown-item del-my-post-toggle'\
		id='" + showDropdownForDoorbelSign.key + "' \
		data-toggle='modal' \
		data-target='#modal-del-post'\
		item_id='" + showDropdownForDoorbelSign.item_id + "'\
		post_id='" + showDropdownForDoorbelSign.post_id + "'\
		user_display_name='" + showDropdownForDoorbelSign.user_display_name + "'\
		title='" + showDropdownForDoorbelSign.title + "'\
		content='" + showDropdownForDoorbelSign.content + "'\
		created_at='" + showDropdownForDoorbelSign.created_at + "'>\
		Delete\
	</a>";
                break;
            case 'delete_my_event':
                dropdownDS += "\
	<a \
		class='dropdown-item del-my-toggle'\
		id='" + showDropdownForDoorbelSign.key + "' \
		data-toggle='modal' \
		data-target='#modal-del'\
		item_id='" + showDropdownForDoorbelSign.item_id + "'\
		user_display_name='" + showDropdownForDoorbelSign.user_display_name + "'\
		title='" + showDropdownForDoorbelSign.title + "'\
		content='" + showDropdownForDoorbelSign.content + "'\
		created_at='" + showDropdownForDoorbelSign.created_at + "'\
		feedback='https://www.vide.me/web/my_event/'>\
		Delete\
	</a>";
                break;
            case 'delete_inbox':
                dropdownDS += "\
	<a \
		class='dropdown-item del-inbox-toggle'\
		id='" + showDropdownForDoorbelSign.key + "' \
		data-toggle='modal' \
		data-target='#modal-del-inbox'\
		item_id='" + showDropdownForDoorbelSign.item_id + "'\
		message_id='" + showDropdownForDoorbelSign.message_id + "'\
		user_display_name='" + showDropdownForDoorbelSign.user_display_name + "'\
		title='" + showDropdownForDoorbelSign.title + "'\
		content='" + showDropdownForDoorbelSign.content + "'\
		created_at='" + showDropdownForDoorbelSign.created_at + "'>\
		Delete\
	</a>";
                break;
            case 'delete_sent':
                dropdownDS += "\
	<a \
		class='dropdown-item del-sent-toggle'\
		id='" + showDropdownForDoorbelSign.key + "' \
		data-toggle='modal' \
		data-target='#modal-del-sent'\
		item_id='" + showDropdownForDoorbelSign.item_id + "'\
		message_id='" + showDropdownForDoorbelSign.message_id + "'\
		user_display_name='" + showDropdownForDoorbelSign.user_display_name + "'\
		title='" + showDropdownForDoorbelSign.title + "'\
		content='" + showDropdownForDoorbelSign.content + "'\
		created_at='" + showDropdownForDoorbelSign.created_at + "'>\
		Delete\
	</a>";
                break;
            case 'embed':
                dropdownDS += "\
	<a \
		class='dropdown-item embed-code-toggle'\
		id='" + showDropdownForDoorbelSign.key + "' \
		data-toggle='modal' \
		data-target='#modal-show-embed-code'\
		item_id='" + showDropdownForDoorbelSign.item_id + "'\
		spring='" + showDropdownForDoorbelSign.spring + "'\
		user_display_name='" + showDropdownForDoorbelSign.user_display_name + "'\
		title='" + showDropdownForDoorbelSign.title + "'\
		content='" + showDropdownForDoorbelSign.content + "'\
		created_at='" + showDropdownForDoorbelSign.created_at + "'\
		nest_li='" + showDropdownForDoorbelSign.nest_li + "'>\
		Embed\
	</a>";
                break;
            case 'copy_link':
                dropdownDS += "\
	<a \
		class='dropdown-item copy-link-toggle'\
		id='" + showDropdownForDoorbelSign.key + "' \
		data-toggle='modal' \
		data-target='#modal-show-copy-link'\
		item_id='" + showDropdownForDoorbelSign.item_id + "'\
		type='" + showDropdownForDoorbelSign.type + "'\
		spring='" + showDropdownForDoorbelSign.spring + "'\
		user_display_name='" + showDropdownForDoorbelSign.user_display_name + "'\
		title='" + showDropdownForDoorbelSign.title + "'\
		content='" + showDropdownForDoorbelSign.content + "'\
		created_at='" + showDropdownForDoorbelSign.created_at + "'\
		nest_li='" + showDropdownForDoorbelSign.nest_li + "'>\
		Copy link\
	</a>";
                break;
            //default:
            //dropdownDS = " ";
        }
    });
    if (dropdownDS.trim()) {
        dropdownMain = '\
        <div class="videme-doorbell-sign-action text-right">\
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

/*************************************************************
 paddingButtonAction for onetimev3
 **************************************************************/
function paddingButtonAction(value) { // 31072022
    //console.log('paddingButtonAction value ---> ' + JSON.stringify(value));
    var action_url_class = value.action_url_class;
    //var value = [];

    if (value.access == 'public') { // TODO: remove?
        var share = 'share';
        var fa_icon_access = 'fa fa-unlock';
    } else {
        var share = '';
        var fa_icon_access = 'fa fa-lock';
    }
    /*if (action_url_class.type == 'public') {
        var share = 'share';
        var fa_icon_access = 'fa fa-unlock';
    } else {
        var share = '';
        var fa_icon_access = 'fa fa-lock';
    }*/
    //console.log('paddingButtonAction share ---> ' + share);

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
    if (action_url_class == 'videme-v3-my-item-url') { // V3
        value.dropdown = {
            'dd_item_1': 'edit_my_video',
            'dd_item_2': 'send',
            'dd_item_3': 'share',
            'dd_item_4': 'delete_my_item',
            'dd_item_5': 'copy_link'
        };
        //value.key = key;
        value = paddingButtonMy(value);
    }
    if (action_url_class == 'videme-v3-my-post-url') { // V3
        value.dropdown = {
            'dd_item_1': 'edit_my_video',
            'dd_item_2': 'send',
            'dd_item_3': 'share',
            'dd_item_4': 'delete_my_post',
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
            'dd_item_4': 'request_partnership',
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
    /*if (action_url_class == 'my-posts-url') {
        value.dropdown = {
            'dd_item_1': 'send',
            'dd_item_2': 'share',
            'dd_item_3': 'delete-my-post'
        };
        value.key = key;
        value = paddingButtonMyPosts(value);
        //console.log("showTile value -----> " + JSON.stringify(value));
    }*/
    if (action_url_class == 'item-card') { // V2
        value.dropdown = {};
    }
    //console.log('paddingButtonAction return value ---> ' + JSON.stringify(value));
    return value;
}

function showDropdownForDoorbelSignV3(showDropdownForDoorbelSignV3) { // 31072022
    //console.log('showDropdownForDoorbelSignV3 ---> ' + JSON.stringify(showDropdownForDoorbelSignV3));
    //console.log('showDropdownForDoorbelSignV3.dropdown ---> ' + JSON.stringify(showDropdownForDoorbelSignV3.dropdown));
    //console.log('showDropdownForDoorbelSignV3.key ---> ' + showDropdownForDoorbelSignV3.key);
    //console.log('showDropdownForDoorbelSignV3.showcaseButton[\'item-edit-toggle\'] ---> ' + JSON.stringify(showDropdownForDoorbelSignV3.showcaseButton['item-edit-toggle']));
    //console.log('showDropdownForDoorbelSignV3.showcaseButton ---> ' + JSON.stringify(showDropdownForDoorbelSignV3.showcaseButton));
    var dropdownDS = '';
    var dropdownMain = '';
    $.each(showDropdownForDoorbelSignV3.dropdown, function (key, value) {
        switch (value) {
            case 'album':
                dropdownDS += "\
    <li><a \
        class='dropdown-item album-edit-toggle' data-bs-toggle='modal' \
        data-bs-target='#modal-edit-list' \
        title='" + showDropdownForDoorbelSignV3.title + "'\
        access='" + showDropdownForDoorbelSignV3.access + "'>\
        Edit\
    </a></li>";
                break;
            case 'edit_relation':
                dropdownDS += "\
	<li><a \
		class='dropdown-item contact-edit-toggle' data-bs-toggle='modal' \
		data-bs-target='#modal-edit-contact' \
		from_user_id='" + showDropdownForDoorbelSignV3.from_user_id + "'\
		to_user_id='" + showDropdownForDoorbelSignV3.to_user_id + "'\
		relation_email='" + showDropdownForDoorbelSignV3.relation_email + "'\
		relation='" + showDropdownForDoorbelSignV3.relation + "'>\
		Edit\
	</a></li>";
                break;
            case 'del_friendship':
                dropdownDS += "\
	<li><a \
		class='dropdown-item friendship-del-toggle' data-bs-toggle='modal' \
		data-bs-target='#modal-del-friendship' \
		user_display_name='" + showDropdownForDoorbelSignV3.user_display_name + "'\
		spring='" + showDropdownForDoorbelSignV3.spring + "'\
		user_id='" + showDropdownForDoorbelSignV3.user_id + "'>\
		Delete\
	</a></li>";
                break;
            /*case 'edit_my_video':
                dropdownDS += "\
	<a \
		class='dropdown-item item-edit-toggle'\
		id='" + showDropdownForDoorbelSignV3.key + "' \
		data-toggle='modal' \
		data-target='#modal-item-edit'\
		item_id='" + showDropdownForDoorbelSignV3.item_id + "'\
		cover='" + showDropdownForDoorbelSignV3.cover + "'\
		title='" + showDropdownForDoorbelSignV3.title + "'\
		content='" + showDropdownForDoorbelSignV3.content + "'\
		access='" + showDropdownForDoorbelSignV3.access + "'\
		tags='" + showDropdownForDoorbelSignV3.tags + "'\
		ext_links='" + showDropdownForDoorbelSignV3.ext_links + "'\
		feedback='" + showDropdownForDoorbelSignV3.feedback + "'>\
		Edit\
	</a>";
                break;*/
            case 'edit_my_video':
                dropdownDS += "<li><a class='dropdown-item item-edit-toggle' href='https://api.vide.me/web/item_edit/?i=" + showDropdownForDoorbelSignV3.item_id + "'>Edit</a></li>";
                break;
            case 'edit_my_article':
                dropdownDS += "\
	<li><a \
		class='dropdown-item article-edit-toggle'\
		href='https://api.vide.me/article/update/html/?a=" + showDropdownForDoorbelSignV3.item_id + "' \
		id='" + showDropdownForDoorbelSignV3.key + "' \
		item_id='" + showDropdownForDoorbelSignV3.item_id + "'\
		cover='" + showDropdownForDoorbelSignV3.cover + "'\
		title='" + showDropdownForDoorbelSignV3.title + "'\
		content='" + showDropdownForDoorbelSignV3.content + "'\
		access='" + showDropdownForDoorbelSignV3.access + "'\
		tags='" + showDropdownForDoorbelSignV3.tags + "'>\
		Edit\
	</a></li>";
                // TODO: remove id ... tags
                break;
            case 'edit_my_event':
                dropdownDS += "\
	<li><a \
		class='dropdown-item event-edit-toggle'\
		href='https://api.vide.me/web/event_update/?e=" + showDropdownForDoorbelSignV3.item_id + "' \
		id='" + showDropdownForDoorbelSignV3.key + "' \
		item_id='" + showDropdownForDoorbelSignV3.item_id + "'\
		cover='" + showDropdownForDoorbelSignV3.cover + "'\
		title='" + showDropdownForDoorbelSignV3.title + "'\
		content='" + showDropdownForDoorbelSignV3.content + "'\
		access='" + showDropdownForDoorbelSignV3.access + "'\
		tags='" + showDropdownForDoorbelSignV3.tags + "'>\
		Edit\
	</a></li>";
                // TODO: remove id ... tags
                break;
            case 'send':
                dropdownDS += "\
	<li><a \
		class='dropdown-item contact-toggle'\
		id='" + showDropdownForDoorbelSignV3.key + "' \
		data-bs-toggle='modal' \
		data-bs-target='#modal-contact'\
		item_id='" + showDropdownForDoorbelSignV3.item_id + "'\
		title='" + showDropdownForDoorbelSignV3.title + "'\
		content='" + showDropdownForDoorbelSignV3.content + "'\
        created_at='" + showDropdownForDoorbelSignV3.created_at + "'>\
		Send\
	</a></li>";
                break;
            case 'share':
                dropdownDS += "\
	<li><a \
		class='dropdown-item list-toggle'\
		id='" + showDropdownForDoorbelSignV3.key + "' \
		data-bs-toggle='modal' \
		data-bs-target='#modal-list'\
		item_id='" + showDropdownForDoorbelSignV3.item_id + "'\
		title='" + showDropdownForDoorbelSignV3.title + "'\
		content='" + showDropdownForDoorbelSignV3.content + "'\
		created_at='" + showDropdownForDoorbelSignV3.created_at + "'>\
		Save to album\
	</a></li>";
                break;
            case 'delete': // TODO: remove
                dropdownDS += "\
	<li><a \
		class='dropdown-item del-my-toggle'\
		id='" + showDropdownForDoorbelSignV3.key + "' \
		data-bs-toggle='modal' \
		data-bs-target='#modal-del'\
		item_id='" + showDropdownForDoorbelSignV3.item_id + "'\
		user_display_name='" + showDropdownForDoorbelSignV3.user_display_name + "'\
		title='" + showDropdownForDoorbelSignV3.title + "'\
		content='" + showDropdownForDoorbelSignV3.content + "'\
		created_at='" + showDropdownForDoorbelSignV3.created_at + "'>\
		Delete\
	</a></li>";
                break;
            case 'delete-my-post_old26042020': // TODO: remove
                dropdownDS += "\
	<li><a \
		class='dropdown-item del-my-post-toggle'\
		id='" + showDropdownForDoorbelSignV3.key + "' \
		data-toggle='modal' \
		data-target='#modal-del-post'\
		item_id='" + showDropdownForDoorbelSignV3.item_id + "'\
		post_id='" + showDropdownForDoorbelSignV3.post_id + "'\
		user_display_name='" + showDropdownForDoorbelSignV3.user_display_name + "'\
		title='" + showDropdownForDoorbelSignV3.title + "'\
		content='" + showDropdownForDoorbelSignV3.content + "'\
		created_at='" + showDropdownForDoorbelSignV3.created_at + "'>\
		Delete\
	</a></li>";
                break;
            case 'delete_my_item':
                dropdownDS += "\
	<li><a \
		class='dropdown-item del-my-toggle'\
		id='" + showDropdownForDoorbelSignV3.key + "' \
		data-bs-toggle='modal' \
		data-bs-target='#modal-del'\
		item_id='" + showDropdownForDoorbelSignV3.item_id + "'\
		user_display_name='" + showDropdownForDoorbelSignV3.user_display_name + "'\
		title='" + showDropdownForDoorbelSignV3.title + "'\
		content='" + showDropdownForDoorbelSignV3.content + "'\
		created_at='" + showDropdownForDoorbelSignV3.created_at + "'>\
		Delete item\
	</a></li>";
                break;
            case 'delete_my_post':
                dropdownDS += "\
	<li><a \
		class='dropdown-item del-my-post-toggle'\
		id='" + showDropdownForDoorbelSignV3.key + "' \
		data-bs-toggle='modal' \
		data-bs-target='#modal-del-post'\
		item_id='" + showDropdownForDoorbelSignV3.item_id + "'\
		post_id='" + showDropdownForDoorbelSignV3.post_id + "'\
		user_display_name='" + showDropdownForDoorbelSignV3.user_display_name + "'\
		title='" + showDropdownForDoorbelSignV3.title + "'\
		content='" + showDropdownForDoorbelSignV3.content + "'\
		created_at='" + showDropdownForDoorbelSignV3.created_at + "'>\
		Delete post\
	</a></li>";
                break;
            case 'delete_my_partner_req':
                dropdownDS += "\
	<li><a \
		class='dropdown-item partner_delete'\
		id='" + showDropdownForDoorbelSignV3.key + "' \
		data-bs-toggle='modal' \
		data-bs-target='#modal-partner-delete'\
		ip_id='" + showDropdownForDoorbelSignV3.ip_id + "'\
		item_id='" + showDropdownForDoorbelSignV3.item_id + "'\
		partner_id='" + showDropdownForDoorbelSignV3.partner_id + "'\
		spring='" + showDropdownForDoorbelSignV3.post_spring + "'\
		title='" + showDropdownForDoorbelSignV3.title + "'\
		content='" + showDropdownForDoorbelSignV3.content + "'\
		created_at='" + showDropdownForDoorbelSignV3.created_at + "'>\
		Delete request\
	</a></li>";
                break;
            case 'delete_my_album_set':
                dropdownDS += "\
	<li><a \
		class='dropdown-item delete_my_album_set'\
		id='" + showDropdownForDoorbelSignV3.key + "' \
		albums_sets_id='" + showDropdownForDoorbelSignV3.albums_sets_id + "'\
		album='" + showDropdownForDoorbelSignV3.albums_title + "'\
		item_id='" + showDropdownForDoorbelSignV3.item_id + "'\
		post_id='" + showDropdownForDoorbelSignV3.post_id + "'\
		user_display_name='" + showDropdownForDoorbelSignV3.user_display_name + "'\
		title='" + showDropdownForDoorbelSignV3.title + "'\
		content='" + showDropdownForDoorbelSignV3.content + "'\
		created_at='" + showDropdownForDoorbelSignV3.created_at + "'>\
		Delete \
	</a></li>";
                break;
            case 'delete_my_event':
                dropdownDS += "\
	<li><a \
		class='dropdown-item del-my-toggle'\
		id='" + showDropdownForDoorbelSignV3.key + "' \
		data-bs-toggle='modal' \
		data-bs-target='#modal-del'\
		item_id='" + showDropdownForDoorbelSignV3.item_id + "'\
		user_display_name='" + showDropdownForDoorbelSignV3.user_display_name + "'\
		title='" + showDropdownForDoorbelSignV3.title + "'\
		content='" + showDropdownForDoorbelSignV3.content + "'\
		created_at='" + showDropdownForDoorbelSignV3.created_at + "'\
		feedback='https://www.vide.me/web/my_event/'>\
		Delete\
	</a></li>";
                break;
            case 'delete_inbox':
                dropdownDS += "\
	<li><a \
		class='dropdown-item del-inbox-toggle'\
		id='" + showDropdownForDoorbelSignV3.key + "' \
		data-bs-toggle='modal' \
		data-bs-target='#modal-del-inbox'\
		item_id='" + showDropdownForDoorbelSignV3.item_id + "'\
		message_id='" + showDropdownForDoorbelSignV3.message_id + "'\
		user_display_name='" + showDropdownForDoorbelSignV3.user_display_name + "'\
		title='" + showDropdownForDoorbelSignV3.title + "'\
		content='" + showDropdownForDoorbelSignV3.content + "'\
		created_at='" + showDropdownForDoorbelSignV3.created_at + "'>\
		Delete\
	</a></li>";
                break;
            case 'delete_sent':
                dropdownDS += "\
	<li><a \
		class='dropdown-item del-sent-toggle'\
		id='" + showDropdownForDoorbelSignV3.key + "' \
		data-bs-toggle='modal' \
		data-bs-target='#modal-del-sent'\
		item_id='" + showDropdownForDoorbelSignV3.item_id + "'\
		message_id='" + showDropdownForDoorbelSignV3.message_id + "'\
		user_display_name='" + showDropdownForDoorbelSignV3.user_display_name + "'\
		title='" + showDropdownForDoorbelSignV3.title + "'\
		content='" + showDropdownForDoorbelSignV3.content + "'\
		created_at='" + showDropdownForDoorbelSignV3.created_at + "'>\
		Delete\
	</a></li>";
                break;
            /*case 'delete_item_from_album':
                dropdownDS += "\
	<a \
		class='dropdown-item del-sent-toggle'\
		id='" + showDropdownForDoorbelSignV3.key + "' \
		data-toggle='modal' \
		data-target='#modal-del-sent'\
		item_id='" + showDropdownForDoorbelSignV3.item_id + "'\
		message_id='" + showDropdownForDoorbelSignV3.message_id + "'\
		user_display_name='" + showDropdownForDoorbelSignV3.user_display_name + "'\
		title='" + showDropdownForDoorbelSignV3.title + "'\
		content='" + showDropdownForDoorbelSignV3.content + "'\
		created_at='" + showDropdownForDoorbelSignV3.created_at + "'>\
		Delete\
	</a>";
                break;*/
            case 'embed':
                dropdownDS += "\
	<li><a \
		class='dropdown-item embed-code-toggle-v3'\
		id='" + showDropdownForDoorbelSignV3.key + "' \
		data-bs-toggle='modal' \
		data-bs-target='#modal-show-embed-code'\
		item_id='" + showDropdownForDoorbelSignV3.item_id + "'\
		spring='" + showDropdownForDoorbelSignV3.spring + "'\
		user_display_name='" + showDropdownForDoorbelSignV3.user_display_name + "'\
		title='" + showDropdownForDoorbelSignV3.title + "'\
		content='" + showDropdownForDoorbelSignV3.content + "'\
		created_at='" + showDropdownForDoorbelSignV3.created_at + "'\
		nest_li='" + showDropdownForDoorbelSignV3.nest_li + "'>\
		Embed\
	</a></li>";
                break;
            case 'request_partnership':
                dropdownDS += "\
	<li><a \
		class='dropdown-item partner_invite_request'\
		id='" + showDropdownForDoorbelSignV3.key + "' \
		item_id='" + showDropdownForDoorbelSignV3.item_id + "'>\
		Request partnership\
	</a></li>";
                break;
            case 'copy_link':
                dropdownDS += "\
	<li><a \
		class='dropdown-item copy-link-toggle'\
		id='" + showDropdownForDoorbelSignV3.key + "' \
		data-bs-toggle='modal' \
		data-bs-target='#modal-show-copy-link'\
		item_id='" + showDropdownForDoorbelSignV3.item_id + "'\
		type='" + showDropdownForDoorbelSignV3.type + "'\
		spring='" + showDropdownForDoorbelSignV3.spring + "'\
		user_display_name='" + showDropdownForDoorbelSignV3.user_display_name + "'\
		title='" + showDropdownForDoorbelSignV3.title + "'\
		content='" + showDropdownForDoorbelSignV3.content + "'\
		created_at='" + showDropdownForDoorbelSignV3.created_at + "'\
		nest_li='" + showDropdownForDoorbelSignV3.nest_li + "'>\
		Copy link\
	</a></li>";
                break;
            case 'repost': // TODO: why
                dropdownDS += "\
	<li><a \
		class='dropdown-item copy-link-toggle'\
		id='" + showDropdownForDoorbelSignV3.key + "' \
		data-toggle='modal' \
		data-target='#modal-show-copy-link'\
		item_id='" + showDropdownForDoorbelSignV3.item_id + "'\
		type='" + showDropdownForDoorbelSignV3.type + "'\
		spring='" + showDropdownForDoorbelSignV3.spring + "'\
		user_display_name='" + showDropdownForDoorbelSignV3.user_display_name + "'\
		title='" + showDropdownForDoorbelSignV3.title + "'\
		content='" + showDropdownForDoorbelSignV3.content + "'\
		created_at='" + showDropdownForDoorbelSignV3.created_at + "'\
		nest_li='" + showDropdownForDoorbelSignV3.nest_li + "'>\
		Copy link\
	</a></li>";
                break;
            //default:
            //dropdownDS = " ";
        }
    });
    if (dropdownDS.trim()) {
        dropdownMain = '\
        <div class="videme-doorbell-sign-action text-right">\
            <div class="dropdown">\
            <!--<button class="btn btn-outline-primary btn-sm videme-round-button">-->\
              <!--<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">-->\
                <button class="fa fa-ellipsis-h btn btn-outline-primary btn-sm videme-round-button" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="padding: .4rem .5rem;">\
                </button>\
                <!--</button>-->\
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">\
                    ' + dropdownDS + '\
                </ul>\
            </div>\
        </div>\
        ';
    }

    return dropdownMain;
}

function showButtonForDoorbelSign(showButtonForDoorbelSign) { // 31072022
    //console.log('showButtonForDoorbelSign ---> ' + JSON.stringify(showButtonForDoorbelSign));
    //console.log('showButtonForDoorbelSign.buttons ---> ' + JSON.stringify(showButtonForDoorbelSign.buttons));
    var buttonDS = '';
    $.each(showButtonForDoorbelSign.buttons, function (key, value) {
        switch (value) {
            case 'send_message':
                buttonDS += "\
		<a class='btn btn-primary videme-relation-card-button-connect' href=\"https://vide.me/rec/?email=" + showButtonForDoorbelSign.relation_email + "\" role='button'>Send video email</a>";
                break;
            case 'item_send_message':
                buttonDS += "\
		<a class='btn btn-primary videme-relation-card-button-connect contact-url' href='https://api.vide.me/v2/email/share/?user_id=" + showButtonForDoorbelSign.to_user_id + "&item_id=" + showButtonForDoorbelSign.item_id + "&subject=Re: " + showButtonForDoorbelSign.title + "&message=" + showButtonForDoorbelSign.content + "&nad=" + $.cookie('vide_nad') + "' role='button'>Send</a>";
                break;
            case 'pop_relations':
                buttonDS += "\
	<a href='https://api.vide.me/v2/relation/connect/?user_id=" + showButtonForDoorbelSign.user_id + "&nad=" + $.cookie('vide_nad') + "' class='btn btn-outline-primary videme-relation-card-button-connect relation_connect' user_id='" + showButtonForDoorbelSign.user_id + "' feedback='https://www.vide.me/" + showButtonForDoorbelSign.spring + "'>Connect</a>";
                break;
            case 'friendship_accept':
                buttonDS += "\
	<a href='https://api.vide.me/v2/friendship/accept/?user_id=" + showButtonForDoorbelSign.user_id + "&nad=" + $.cookie('vide_nad') + "' class='btn btn-outline-primary videme-relation-card-button-connect friendship_accept' user_id='" + showButtonForDoorbelSign.user_id + "' feedback='https://www.vide.me/" + showButtonForDoorbelSign.spring + "'>Accept</a>";
                break;
            case 'friendship_declined':
                buttonDS += "\
	<a href='https://api.vide.me/v2/friendship/declined/?user_id=" + showButtonForDoorbelSign.user_id + "&nad=" + $.cookie('vide_nad') + "' class='btn btn-outline-secondary videme-relation-card-button-connect friendship_declined' user_id='" + showButtonForDoorbelSign.user_id + "' feedback='https://www.vide.me/" + showButtonForDoorbelSign.spring + "'>Declined</a>";
                break;
            case 'del_friendship':
                buttonDS += "\
	<a \
		class='btn btn-outline-secondary videme-relation-card-button-connect friendship-del-toggle' data-bs-toggle='modal' \
		data-bs-target='#modal-del-friendship' \
		user_display_name='" + showButtonForDoorbelSign.user_display_name + "'\
		spring='" + showButtonForDoorbelSign.spring + "'\
		user_id='" + showButtonForDoorbelSign.user_id + "'>\
		Delete\
	</a>";
                break;
            case 'item_add_to_album':
                buttonDS += "\
	<a href='https://api.vide.me/v2/items/share/?item_id=" + showButtonForDoorbelSign.item_id + "&album_id=" + showButtonForDoorbelSign.album_id + "&nad=" + $.cookie('vide_nad') + "' class='btn btn-outline-secondary videme-relation-card-button-connect list-url'>Add</a>";
                break;
            case 'friendship':
                buttonDS += "\
	<a href='https://api.vide.me/v2/friendship/request/?user_id=" + showButtonForDoorbelSign.user_id + "&nad=" + $.cookie('vide_nad') + "' class='btn btn-outline-secondary videme-relation-card-button-connect list-url'>Frindship</a>";
                break;
            case 'essence_join':
                buttonDS += "\
	<a href='https://api.vide.me/v2/essences/join/?ue_id=" + showButtonForDoorbelSign.ue_id + "&nad=" + $.cookie('vide_nad') + "' class='btn btn-outline-secondary videme-relation-card-button-connect essence_join' ue_id='" + showButtonForDoorbelSign.ue_id + "' spring='" + showButtonForDoorbelSign.spring + "' data-bs-toggle='modal' data-bs-target='#modal-create-new-essence-to-me'>Join</a>";
                break;
            case 'partner_invite':
                /*buttonDS += "\
	<div class='btn btn-outline-secondary videme-relation-card-button-connect partner_add' user_id='" + showButtonForDoorbelSign.user_id + "' spring='" + showButtonForDoorbelSign.spring + "' user_display_name='" + showButtonForDoorbelSign.user_display_name + "' user_picture='" + showButtonForDoorbelSign.user_picture + "' country='" + showButtonForDoorbelSign.country + "' city='" + showButtonForDoorbelSign.city + "' web_parent_id='" + showButtonForDoorbelSign.web_parent_id + "' id='partner_add-" + showButtonForDoorbelSign.user_id + "' data-toggle='modal' data-target='#modal-create-new-essence-to-me'>Add</div>";*/
                buttonDS += "\
	<a href='' class='btn btn-outline-secondary videme-relation-card-button-connect partner_invite' item_id='" + showButtonForDoorbelSign.item_id + "' partner_id='" + showButtonForDoorbelSign.user_id + "' spring='" + showButtonForDoorbelSign.spring + "' data-bs-toggle='modal' data-bs-target='#modal-partner-invite'>Invite</a>";
                break;
            case 'partner_delete':
                buttonDS += "\
	<a href='' class='btn btn-outline-secondary videme-relation-card-button-connect partner_delete' ip_id='" + showButtonForDoorbelSign.ip_id + "' item_id='" + showButtonForDoorbelSign.item_id + "' partner_id='" + showButtonForDoorbelSign.partner_id + "' spring='" + showButtonForDoorbelSign.spring + "'>Delete</a>";
                break;
            case 'partner_accept':
                buttonDS += "\
	<a href='' class='btn btn-outline-secondary videme-relation-card-button-connect partner_accept' ip_id='" + showButtonForDoorbelSign.ip_id + "'>Accept</a>";
                break;
            case 'partner_decline':
                buttonDS += "\
	<a href='' class='btn btn-outline-secondary videme-relation-card-button-connect partner_decline' ip_id='" + showButtonForDoorbelSign.ip_id + "'>Decline</a>";
                break;
            case 'follow':
                buttonDS += "\
	<a href='https://api.vide.me/v2/relation/connect/?user_id=" + showButtonForDoorbelSign.user_id + "&nad=" + $.cookie('vide_nad') + "' class='btn btn-outline-primary videme-relation-card-button-connect list-url'>Follow</a>";
                break;
            case 'relation_delete':
                buttonDS += "\
	<a href='https://api.vide.me/v2/relation/delete/?to_user_id=" + showButtonForDoorbelSign.user_id + "&nad=" + $.cookie('vide_nad') + "' class='btn btn-outline-secondary videme-relation-card-button-connect relation_delete' user_id='" + showButtonForDoorbelSign.user_id + "' feedback='https://www.vide.me/web/im_following/'>Unfollow</a>";
                break;
            case 'del_task':
                buttonDS += "\
	<a href='https://api.vide.me/v2/tasks/delete/?task_id=" + showButtonForDoorbelSign.task_id + "&nad=" + $.cookie('vide_nad') + "' class='btn btn-outline-primary btn-sm float-right videme-relation-card-button-connect task_delete' user_id='" + showButtonForDoorbelSign.user_id + "' feedback=''>Hide</a>";
                break;
            case 'del_star':
                var btn_group_stars_id = 'btn_proup_stars_' + Math.floor(Math.random() * 100);
                buttonDS += '<div class="btn-group float-right" role="group" aria-label="Stars" id="' + btn_group_stars_id + '">\
                    <button type="button" class="btn btn-secondary btn-sm videme-relation-card-button-connect delete_star_multy" \
                    stars_count="' + showButtonForDoorbelSign.stars_count + '" item_id="' + showButtonForDoorbelSign.item_id + '"\
                    btn_group_stars_id="' + btn_group_stars_id + '">\
                    <i id="videme_showcase_stars_icon" class="fa fa-star-o" aria-hidden="true"></i>&nbsp;Unstar</button>\
                    <button type="button" class="btn btn-light btn-sm videme-relation-card-button-connect">' + showButtonForDoorbelSign.stars_count + '</button>\
                    </div>';
                break;
            case 'del_tag':
                //var btn_group_stars_id = 'btn_proup_stars_' + Math.floor(Math.random() * 100);
                buttonDS += returnDeleteTagButton(showButtonForDoorbelSign);
                break;
            case 'del_like':
                let btn_group_likes_id = 'btn_proup_likes_' + Math.floor(Math.random() * 100);
                buttonDS += '<div class="btn-group float-right" role="group" aria-label="likes" id="' + btn_group_likes_id + '">\
                    <button type="button" class="btn btn-secondary btn-sm videme-relation-card-button-connect delete_like_multy" \
                    likes_count="' + showButtonForDoorbelSign.likes_count + '" item_id="' + showButtonForDoorbelSign.item_id + '"\
                    btn_group_likes_id="' + btn_group_likes_id + '">\
                    <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>&nbsp;Dislike</button>\
                    <button type="button" class="btn btn-light btn-sm videme-relation-card-button-connect">' + showButtonForDoorbelSign.likes_count + '</button>\
                    </div>';
                break;
            case 'album_edit':
                buttonDS += "<a class='btn btn-outline-secondary videme-relation-card-button-connect album-edit-toggle' data-bs-toggle='modal' data-bs-target='#modal-edit-list' " +
                    "title='" + showButtonForDoorbelSign.title + "' " +
                    "access='" + showButtonForDoorbelSign.access + "'>Edit</a>";
                break;
            case 'new':
                // share button
                buttonDS += "...";
                break;
            case 'essence_from_me_accept_ref':
                buttonDS += "\
	<a href='https://api.vide.me/v2/essences/accept/?ure_id=" + showButtonForDoorbelSign.ure_id + "&nad=" + $.cookie('vide_nad') + "' class='btn btn-outline-primary videme-relation-card-button-connect essence_from_me_accept_ref' ure_id='" + showButtonForDoorbelSign.ure_id + "' ue_id='" + showButtonForDoorbelSign.ue_id + "'>Accept</a>";
                break;
            case 'essence_from_me_delete':
                buttonDS += "\
	<a href='https://api.vide.me/v2/essences/delete_from/?ure_id=" + showButtonForDoorbelSign.ure_id + "&nad=" + $.cookie('vide_nad') + "' class='btn btn-outline-primary videme-relation-card-button-connect essence_from_me_delete' ure_id='" + showButtonForDoorbelSign.ure_id + "' ue_id='" + showButtonForDoorbelSign.ue_id + "'>Delete</a>";
                break;
            case 'essence_to_me_delete':
                buttonDS += "\
	<a href='https://api.vide.me/v2/essences/delete_to/?ure_id=" + showButtonForDoorbelSign.ure_id + "&nad=" + $.cookie('vide_nad') + "' class='btn btn-outline-primary videme-relation-card-button-connect essence_to_me_delete' ure_id='" + showButtonForDoorbelSign.ure_id + "'>Delete</a>";
                break;
            case 'chart_item_mel_toggle':
                buttonDS += "\
	            <button class='btn btn-primary chart_item_mel_toggle' type='button' data-bs-toggle='collapse' data-bs-target='#videme_mel_collapse_" + showButtonForDoorbelSign.item_id + "' aria-expanded='false' aria-controls='videme_mel_collapse_" + showButtonForDoorbelSign.item_id + "' item_id='" + showButtonForDoorbelSign.item_id + "'>\
                  <span class='btn-label'><i class='fa fa-bar-chart'></i></span>\
                </button>";
                break;
            default:
                buttonDS = " ";
        }
    });
    return buttonDS;
}

function showFooterForDoorbellSign(showFooterForDoorbellSign) { // 31072022
    //console.log('showButtonForDoorbelSign ---> ' + JSON.stringify(showButtonForDoorbelSign));
    //console.log('showButtonForDoorbelSign.buttons ---> ' + JSON.stringify(showButtonForDoorbelSign.buttons));
    var footerDS = '';
    $.each(showFooterForDoorbellSign.footer, function (key, value) {
        switch (value) {
            case 'partner_edit':
                footerDS += "\
	<div class='videme-partner-item-edit-panel' id='videme-partner-item-edit-panel_" + showFooterForDoorbellSign.user_id + "'>\
	  <a class='' data-toggle='collapse' href='#videme-partner-item-edit-collapse_" + showFooterForDoorbellSign.user_id + "' role='button' aria-expanded='false' aria-controls='collapseExample'>Options</a>\
	  <div class='collapse' id='videme-partner-item-edit-collapse_" + showFooterForDoorbellSign.user_id + "'>\
  <div class='card card-body'>\
  <input type='hidden2' name='partners[" + showFooterForDoorbellSign.user_id + "][user_id]' value='" + showFooterForDoorbellSign.user_id + "'/>\
	  <div class='mb-3'>\
            <label for='create-new-essence-to-me-title' class='form-label'>Essence title</label>\
                <input type='text' class='form-control' id='create-new-essence-to-me-title' aria-describedby='title' name='partners[" + showFooterForDoorbellSign.user_id + "][title]'/>\
            </div>\
                <div class='mb-3'>\
                    <label for='create-new-essence-to-me-content' class='form-label'>Essence content</label>\
                    <textarea class='form-control' id='create-new-essence-to-me-content' rows='3' name='partners[" + showFooterForDoorbellSign.user_id + "][content]'></textarea>\
                </div>\
                </div>\
                </div>\
</div>";
                break;
            case 'chart_item_mel_toggle':
                footerDS += "\
		        <div class='collapse' id='videme_mel_collapse_" + showFooterForDoorbellSign.item_id + "'>\
                <div class='videme_mel_card_collapse' id='videme_mel_card_collapse_" + showFooterForDoorbellSign.item_id + "'>\
                  " + chartButtonComposition(showFooterForDoorbellSign.item_id) + "\
                </div>\
                </div>";
                break;
            default:
                footerDS = " ";
        }
    });
    return footerDS;
}

function showFooterAdditionalForDoorbellSign(showFooterAdditionalForDoorbellSign) { // 31072022
    console.log('showFooterAdditionalForDoorbellSign ---> ' + JSON.stringify(showFooterAdditionalForDoorbellSign));
    console.log('showFooterAdditionalForDoorbellSign.additional_item ---> ' + JSON.stringify(showFooterAdditionalForDoorbellSign.additional_item));
    var html = '';
    if (!$.isEmptyObject(showFooterAdditionalForDoorbellSign.additional_item)) {
        console.log('showFooterAdditionalForDoorbellSign additional_item ---> NOT empty');
        //--html = showTileTasks(parseDataArrayToObject(showFooterAdditionalForDoorbellSign.additional_item));
        //html = showTileTasks(showFooterAdditionalForDoorbellSign.item_info);
        //==html = showTask(showFooterAdditionalForDoorbellSign);
        //--html = showTask(showFooterAdditionalForDoorbellSign.item_info);
        //--var param = showFooterAdditionalForDoorbellSign.item_info;
        //--var param = JSON.parse(showFooterAdditionalForDoorbellSign.additional_item);
        //--var param = parseJSON(showFooterAdditionalForDoorbellSign.item_info);
        var param = [];
        param = showFooterAdditionalForDoorbellSign.additional_item;
        //var param = $.fn.provideVidemeFunction('parseDataArrayToObject', showFooterAdditionalForDoorbellSign.additional_item);
        console.log('showFooterAdditionalForDoorbellSign param ---> ' + param);
        html = "<div class='videme-card-list-group'>" + showTask(param) + "</div>";
        //console.log('showFooterAdditionalForDoorbellSign additional_item html ---> ' + JSON.stringify(html));

    } else {
        console.log('showFooterAdditionalForDoorbellSign additional_item ---> empty');
    }

    return html;
}

function showStatusForDoorbellSign(showStatusForDoorbellSign) { // 31072022
    //console.log('showStatusForDoorbellSign ---> ' + JSON.stringify(showStatusForDoorbellSign));
    console.log('showStatusForDoorbellSign showStatusForDoorbellSign.partner_status ---> ' + showStatusForDoorbellSign.partner_status);
    var buttonStatus = '';
    switch (showStatusForDoorbellSign.partner_status) {
        case '0':
            buttonStatus += "<span class=\"badge bg-warning\"><i class=\"fa fa-info-circle px-1\" aria-hidden=\"true\"></i>pending</span>";
            break;
        case '1':
            buttonStatus += "<span class=\"badge bg-success\"><i class=\"fa fa-check-circle-o px-1\" aria-hidden=\"true\"></i>confirmed</span>";
            break;
        case '2':
            buttonStatus += "<span class=\"badge bg-danger\"><i class=\"fa fa-ban px-1\" aria-hidden=\"true\"></i>declined</span>";
            break;
        default:
            buttonStatus = " ";
    }
    return buttonStatus;
}

function showIconForDoorbelSign(showIconForDoorbelSign) { // 31072022 ??
    //console.log('showIconForDoorbelSign ---> ' + JSON.stringify(showIconForDoorbelSign));
    var dbImage,
        img_class = 'rounded-circle';
    if (!$.isEmptyObject(showIconForDoorbelSign.dbs_type)) {
        if (showIconForDoorbelSign.dbs_type == 'square') img_class = '';
    }
    if (!$.isEmptyObject(showIconForDoorbelSign.image)) {
        if (!$.isEmptyObject(showIconForDoorbelSign.href)) {
            dbImage = "<a href='https://www.vide.me/" + showIconForDoorbelSign.href + "'><img class='" + img_class + " videme-relation-card-img-tile' src='" + showIconForDoorbelSign.image + "' alt='' /></a>";
        } else {
            dbImage = "<img class='" + img_class + " videme-relation-card-img-tile' src='" + showIconForDoorbelSign.image + "' alt='' />";
        }
    }
    if (!$.isEmptyObject(showIconForDoorbelSign.icon)) {
        dbImage = "<i class='img-thumbnail fa fa-" + showIconForDoorbelSign.icon + " fa-2x fa-pull-left text-center align-items-center d-flex justify-content-center videme-doorbell-sign-icon'></i>";
    }
    return dbImage;
}


/* 31072022 function showTileShowcasePanelList(showTileShowcasePanelList, tempObject) { // TODO: remove
    //console.log('showTileShowcasePanelList ---> ' + JSON.stringify(showTileShowcasePanelList));
    var html = [];
    html.push("<ul class=\"list-group videme-doorbell-sign-small\">");
    $.each(showTileShowcasePanelList, function (key, value) {
        var trueValue = paddingUserInfo(value); // TODO: Dobble?
        html.push(showShowcasePanelList(trueValue, tempObject));
    });
    html.push("</ul>");
    return html.join('');
}*/

/* 31072022 function showShowcasePanelList(showShowcasePanelList, tempObject) { // TODO: remove
    //console.log('showShowcasePanelList ---> ' + JSON.stringify(showShowcasePanelList));
    //console.log('showShowcasePanelList showShowcasePanelList.title ---> ' + showShowcasePanelList.title);
    //var accessIcon;
    var tempObjectClass = '',
        title = '',
        dbs_image_class = 'videme-doorbell-sign-image';
    var dateWord = '';

    if (!$.isEmptyObject(tempObject)) {
        //console.log('showShowcasePanelList tempObject.width() ---> ' + tempObject.width());
        if (tempObject.width() < 300) {
            tempObjectClass = "";
        } else {
            tempObjectClass = " d-flex";
        }
    } else {
        tempObjectClass = " d-flex";
    }
    if (!$.isEmptyObject(showShowcasePanelList.href)) {
        title = "<a href='https://www.vide.me/" + showShowcasePanelList.href + "'>" + showShowcasePanelList.title + "</a>";
    } else {
        title = showShowcasePanelList.title;
    }
    if (!$.isEmptyObject(showShowcasePanelList.dbs_type)) {
        if (showShowcasePanelList.dbs_type == 'square') dbs_image_class = 'videme-doorbell-sign-image_square';
    }
    if (!$.isEmptyObject(showShowcasePanelList.created_at)) {
        dateWord = timeToWord(showShowcasePanelList.created_at);
    }
    if (!$.isEmptyObject(showShowcasePanelList.updated_at)) {
        dateWord = timeToWord(showShowcasePanelList.updated_at);
    }
    /!*if (!$.isEmptyObject(showShowcasePanelList.access)) {
        accessIcon = accessToIcon(showShowcasePanelList);
    } else {
        var title = showShowcasePanelList.title;
    }*!/
    // <div class='text-muted videme-doorbell-sign-date'>" + showShowcasePanelList.date + "</div>\
    return "\
        <li type=\"button\" class=\"list-group-item list-group-item-action videme-list-group_showcase_panel_list\">\
            <div class='videme-showcase_panel_list-image_square'>\
              <a href='https://www.vide.me/" + showShowcasePanelList.href + "'><img class='videme-showcase_panel_list-img' src='" + showShowcasePanelList.image + "' alt='' /></a>\
            </div>\
            <div class='showcase_panel_list-text'>\
                <div class='videme-showcase_panel-1st-line text-center'>\
                    <div class='videme-showcase_panel_list-1st-line-title-date'>\
                        <div class=\"videme-showcase_panel-title\">" + title + "</div>\
                    </div>\
                    " + showButtonForDoorbelSign(showShowcasePanelList) + "\
                    <div class='videme-showcase_panel-dropdown-place'>" + showDropdownForDoorbelSign(showShowcasePanelList) + "</div>                \
                </div>\
                <div class='videme-showcase_panel-2st-line text-right'>\
                    <!--<div class='videme-doorbell-sign-additional'>" + accessToIcon(showShowcasePanelList) + "</div>-->\
                    <div class='text-muted videme-showcase_panel-count'>" + showShowcasePanelList.count + " - " + dateWord + "</div>\
                </div>\
            </div>\
        </li>";
}*/

/* 31072022 function showTilePanelList(showTilePanelList, tempObject) {
    //console.log('showTileShowcasePanelList ---> ' + JSON.stringify(showTileShowcasePanelList));
    var html = [];
    html.push("<div class=\"row\">");
    $.each(showTilePanelList, function (key, value) {
        var trueValue = paddingUserInfo(value); // TODO: Dobble?
        html.push(showPanelList(trueValue, tempObject));
    });
    html.push("</div>");
    return html.join('');
}*/

/* 31072022 function showPanelList(showShowcasePanelList, tempObject) {
    //console.log('showShowcasePanelList ---> ' + JSON.stringify(showShowcasePanelList));
    //console.log('showShowcasePanelList showShowcasePanelList.title ---> ' + showShowcasePanelList.title);
    //var accessIcon;
    var tempObjectClass = '',
        title = '',
        dbs_image_class = 'videme-doorbell-sign-image';

    if (!$.isEmptyObject(tempObject)) {
        //console.log('showShowcasePanelList tempObject.width() ---> ' + tempObject.width());
        if (tempObject.width() < 300) {
            tempObjectClass = "";
        } else {
            tempObjectClass = " d-flex";
        }
    } else {
        tempObjectClass = " d-flex";
    }
    if (!$.isEmptyObject(showShowcasePanelList.href)) {
        title = "<a href='https://www.vide.me/" + showShowcasePanelList.href + "'>" + showShowcasePanelList.title + "</a>";
    } else {
        title = showShowcasePanelList.title;
    }
    if (!$.isEmptyObject(showShowcasePanelList.dbs_type)) {
        if (showShowcasePanelList.dbs_type == 'square') dbs_image_class = 'videme-doorbell-sign-image_square';
    }
    /!*if (!$.isEmptyObject(showShowcasePanelList.access)) {
        accessIcon = accessToIcon(showShowcasePanelList);
    } else {
        var title = showShowcasePanelList.title;
    }*!/
    // <div class='text-muted videme-doorbell-sign-date'>" + showShowcasePanelList.date + "</div>\
    return "\
      <div class=\"col-sm-6\">\
<div class=\"card\">\
  <img src=\"" + showShowcasePanelList.image + "\" class=\"card-img-top\" alt=\"...\">\
  <div class=\"card-body\">\
    <p class=\"card-text\">" + title + "</p>\
  </div>\
</div>\
  </div>";
}*/

function showTileRelationModernAlbums(relationArray) { // 31072022
    //console.log('showTileRelation relationArray ---> ' + JSON.stringify(relationArray));
    //console.log('showTileRelation tempObject.width ---> ' + tempObject.width());
    //console.log('showTileRelation size ---> ' + size);
    var html = [];
    //if (tempObject.width() < 500) {
    html.push('<div class="container">');

    $.each(relationArray, function (key, value) {
        //console.log('showTileRelation each key ---> ' + key);
        //console.log('showTileRelation each value ---> ' + JSON.stringify(value));
        var trueValue = paddingUserInfo(value);
        //var trueValue = JSON.stringify(value);
        html.push(showRelationCardSmallModernAlbums(trueValue));
        /*html.push(
            showTileDoorbellSignSmall(
                parsePopRelationsForDoorbellSign(relationArray)
        ));*/
    });
    html.push('</div>');
    return html.join('');
}

function showRelationCardSmallModernAlbums(showRelationCardSmallModernAlbums) { // parrent above // 31072022
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
    var dateWord = '', edit_link = '', access_icon = '', album_href_class = '';
    if (!$.isEmptyObject(showRelationCardSmallModernAlbums.href)) {
        title = "<a href='https://www.vide.me/" + showRelationCardSmallModernAlbums.href + "'>" + showRelationCardSmallModernAlbums.title + "</a>";
    } else {
        title = showRelationCardSmallModernAlbums.title;
    }

    if (!$.isEmptyObject(showRelationCardSmallModernAlbums.created_at)) {
        dateWord = timeToWord(showRelationCardSmallModernAlbums.created_at);
    }
    if (!$.isEmptyObject(showRelationCardSmallModernAlbums.updated_at)) {
        dateWord = timeToWord(showRelationCardSmallModernAlbums.updated_at);
    }
    if (!$.isEmptyObject(showRelationCardSmallModernAlbums.dbs_type)) {
        if (showRelationCardSmallModernAlbums.dbs_type === 'album_edit') {
            edit_link = "<a class='album-edit-toggle' data-toggle='modal' data-target='#modal-edit-list' " +
                "title='" + showRelationCardSmallModernAlbums.title + "' " +
                "access='" + showRelationCardSmallModernAlbums.access + "'>Edit</a>";
            access_icon = "<div class='videme-doorbell-sign-additional'>" + accessToIcon(showRelationCardSmallModernAlbums) + "</div>";
        }
        ;
        switch (showRelationCardSmallModernAlbums.dbs_type) {
            case 'album_manager':
                album_href_class = 'album_manager_open'
                break;
            default:
        }
    }
    return "\
            <hr class='videme-relation-card-hr'/>\
            <div class=\"row videme-ralation-card-small\">\
                <div class=\"col-4 videme-relation-card-1-column\">\
                    <a href='https://www.vide.me/" + showRelationCardSmallModernAlbums.href + "' class='" + album_href_class + "' album='" + showRelationCardSmallModernAlbums.title + "'><img class=\"rounded-circle2 videme-relation-card-img-tile_modern\" src=\"" + showRelationCardSmallModernAlbums.image + "\" alt=\"\"/></a>\
                </div>\
                <div class=\"col-8 videme-relation-card-2-column\">\
                    <div class=\"d-flex justify-content-between align-items-center\">\
                        <div class=\"videme-relation-card-user\">\
                        " + title + "\
                        </div>\
                    </div>\
                    <div class=\"d-flex justify-content-between align-items-center\">\
                        " + access_icon + "\
                        <div class=''>" + showRelationCardSmallModernAlbums.count + "</div>\
                        <div class=\"videme-relation-card-user\">\
                            <a class='text-muted' href='https://www.vide.me/" + showRelationCardSmallModernAlbums.href + "/'>" + dateWord + "</a>\
                        </div>\
                        " /*+ edit_link */ + "\
                " + showButtonForDoorbelSign(showRelationCardSmallModernAlbums) + "\
                    </div>\
                </div>\
            </div>";
}

/*function showImageForShowcasePanelList(showImageForShowcasePanelList) {
    //console.log('showImageForShowcasePanelList ---> ' + JSON.stringify(showImageForShowcasePanelList));
    var dbImage,
        img_class = 'rounded-circle';
    if (!$.isEmptyObject(showImageForShowcasePanelList.dbs_type)) {
        if (showImageForShowcasePanelList.dbs_type == 'square') img_class = '';
    }
    if (!$.isEmptyObject(showImageForShowcasePanelList.image)) {
        if (!$.isEmptyObject(showImageForShowcasePanelList.href)) {
            dbImage = "<a href='https://www.vide.me/" + showImageForShowcasePanelList.href + "'><img class='" + img_class + " videme-relation-card-img-tile' src='" + showImageForShowcasePanelList.image + "' alt='' /></a>";
        } else {
            dbImage = "<img class='" + img_class + " videme-relation-card-img-tile' src='" + showImageForShowcasePanelList.image + "' alt='' />";
        }
    }
    if (!$.isEmptyObject(showImageForShowcasePanelList.icon)) {
        dbImage = "<i class='img-thumbnail fa fa-" + showImageForShowcasePanelList.icon + " fa-2x fa-pull-left text-center align-items-center d-flex justify-content-center videme-doorbell-sign-icon'></i>";
    }
    return dbImage;
}*/

//function showTileTasks(showTileTasks, tempObject) {
function showTileTasks(showTileTasks) { // 31072022 ??
    //console.log('showTileTasks ---> ' + JSON.stringify(showTileTasks));
    var html = [];
    //var videme_last_task = paddingUserInfo(showTileTasks[0]);
    //$('.videme_last_task').html(showIconForTask(videme_last_task));
    html.push("<ul class=\"list-group videme-doorbell-sign-small\">");
    //$('.videme_last_task').html(showTileTasks[0].icon);
    //$('.videme_last_task').html(JSON.stringify(showTileTasks[0]));

    $.each(showTileTasks, function (key, value) {
        var trueValue = paddingUserInfo(value); // TODO: dobble?
        //trueValue = parseDropdown(actionUrlClass, key, trueValue);
        //==trueValue = parseDropdown('post-my-url', key, trueValue);
        html.push("<li type=\"button\" class=\"list-group-item list-group-item-action videme-card-list-group\">");
        html.push(showTask(trueValue));
        html.push("</li>");
    });
    html.push("</ul>");
    return html.join('');
}

function showTileTasksActiveOnly(showTileTasks) { // 31072022
    console.log('showTileTasksActiveOnly');
    //console.log('showTileTasksActiveOnly ---> ' + JSON.stringify(showTileTasks));
    var html = [];
    //var videme_last_task = paddingUserInfo(showTileTasks[0]);
    //$('.videme_last_task').html(showIconForTask(videme_last_task));
    html.push("<ul class=\"list-group videme-doorbell-sign-small\">");
    //$('.videme_last_task').html(showTileTasks[0].icon);
    //$('.videme_last_task').html(JSON.stringify(showTileTasks[0]));

    $.each(showTileTasks, function (key, value) {
        //console.log('showTileTasksActiveOnly value.task_status ---> ' + value.task_status);
        //console.log('showTileTasksActiveOnly value ---> ' + JSON.stringify(value));

        if (value.task_status == 'worked' || value.task_status == 'awaiting') {
            //if (value.task_type !== 'fileUploadVideo_force_mp4') {

            var trueValue = paddingUserInfo(value); // TODO: Dobble? No!
            html.push("<li type=\"button\" class=\"list-group-item list-group-item-action videme-card-list-group\">");
            //html.push(showTask(trueValue));
            html.push(showMediaElementLi(trueValue));
            html.push("</li>");
            //}
        }
    });
    html.push("</ul>");
    return html.join('');
}

function showListMedia(showListMedia) { // 31072022
    //console.log('showTileTasks ---> ' + JSON.stringify(showTileTasks));
    //console.log('showListMedia showListMedia ---> ' + JSON.stringify(showListMedia));
    var html = [];
    //var videme_last_task = paddingUserInfo(showTileTasks[0]);
    //$('.videme_last_task').html(showIconForTask(videme_last_task));
    html.push("<ul class=\"list-group videme-doorbell-sign-small222\">");
    //$('.videme_last_task').html(showTileTasks[0].icon);
    //$('.videme_last_task').html(JSON.stringify(showTileTasks[0]));

    $.each(showListMedia, function (key, value) {
        var trueValue = paddingUserInfo(value);
        //trueValue = parseDropdown(actionUrlClass, key, trueValue);
        //==trueValue = parseDropdown('post-my-url', key, trueValue);
        html.push("<li data-videme-playlist-number='" + key + "' class=\"list-group-item list-group-item-action d-flex align-items-center videme-list-media-li p-2\" id='videme-list-media-li_" + value.item_id + "'>");
        html.push(showMediaElementLi(trueValue));
        html.push("</li>");
    });
    html.push("</ul>");
    //return html.join('');
    //let titles_array = list_details.titles_array;
    //let titles = titles_array.join(' | ');
    let htmlList = html.join('');
    return htmlList;
}

function showListMediaForPlayer(showListMediaData, list_details) { // 31072022
    //console.log('showTileTasks ---> ' + JSON.stringify(showTileTasks));
    console.log('showListMediaForPlayer list_details ---> ' + JSON.stringify(list_details));
    let htmlList = showListMedia(showListMediaData);
    let htmlPlaylistPlace = '<div class="accordion" id="accordionVidePlaylist">\
  <div class="accordion-item">\
    <h2 class="accordion-header" id="headingOne">\
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">\
        ' + list_details.slogan + '\
        ' + list_details.titles_array.join(' | ') + '\
      </button>\
    </h2>\
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionVidePlaylist">\
      <div class="accordion-body p-0">\
        ' + htmlList + '\
      </div>\
    </div>\
  </div>\
</div>';
    return htmlPlaylistPlace;
}

//function showTask(showTask, tempObject) {
function showTask(showTask) { // 31072022 ??
    //console.log('showTask ---> ' + JSON.stringify(showTask));
    //console.log('showDoorbellSignSmall showDoorbellSignSmall.title ---> ' + showDoorbellSignSmall.title);
    //var accessIcon;
    var tempObjectClass = "";
    var title = '';
    var content = '';
    var progress_convert = '';
    //var spring_show = '';
    var imageThumbnail = '';
    var res_accessToIcon = '';
    var res_itemTileElementCardUserCard = '';
    var res_showItemInfoV3 = '';
    var res_count = '';
    //var video_thumbnail = '';
    var itemImage = '';
    //var array_tagsDiv = '';
    var array_tagsDiv = [];
    var array_tagsDivJoin = '';
    //var retParam = [];
    //var button_item_count_show = '';
    //var itsTask = false;
    /*if (!$.isEmptyObject(tempObject)) {
        //console.log('showDoorbellSignSmall tempObject.width() ---> ' + tempObject.width());
        if (tempObject.width() < 300) {
            tempObjectClass = "";
        } else {
            tempObjectClass = " d-flex";
        }
    } else {
        tempObjectClass = " d-flex";
    }*/
    if (!$.isEmptyObject(showTask.percentage)) {
        /*progress_convert = '<div class="progress videme-convert-progress" style="height: .2rem; margin-top: .2rem;">' +
            '<div aria-valuemax="100" aria-valuemin="0" ' +
            'class="progress-bar progress-bar-striped progress-bar-animated" id="videme_convert_progress" ' +
            'role="progressbar" style=""></div>' +
            '</div>';*/

        if (showTask.percentage > 0) {

            /*$('#videme_convert_progress')
                .addClass('bg-success')
                .addClass('progress-bar-striped')
                .addClass('progress-bar-animated');*/
            var addClass = 'progress-bar-striped progress-bar-animated ';

            var percentage = showTask.percentage;
            if (showTask.percentage > 97) {
                percentage = 100;
                //addClass = addClass + ' bg-success';
                addClass = 'bg-success';
                /*$('#videme_convert_progress')
                    .html('Successfully converted')
                    .removeClass('progress-bar-striped')
                    .removeClass('progress-bar-animated');*/
                //$('.videme-uploader-status').html('Successfully converted');
                //document.title = 'Successfully converted ' + $('#title_for_video').val();
                //cookieLastUploadRemove();
            } else {
                //$('#videme_upload_progress').html('Converted ' + percentage + '%');
                //$('.videme-uploader-status').html('Converted ' + percentage + '%');
                //document.title = 'Converted ' + percentage + '% ' + $('#title_for_video').val();
                //console.log("$.fn.showMyTaskById data.percentage videme_nav_badge_last_upload -----> ", percentage);

                //$('.videme_nav_badge_last_upload').html(percentage + '%');

                /* *************************************/
                //$('#videme_last_upload_li').html(db);
                /* *************************************/

            }
            //$('#videme_convert_progress').css('width', percentage + '%').attr('aria-valuenow', percentage);
            progress_convert = '<div class="progress videme-convert-progress" style="height: .2rem; margin-top: .5rem;">' +
                '<div aria-valuemax="100" aria-valuemin="0" ' +
                'class="progress-bar ' + addClass + '" id="videme_convert_progress" ' +
                'role="progressbar" style="width: ' + percentage + '%" aria-valuenow="' + percentage + '"></div>' +
                '</div>';
        }
    }
    //if (!$.isEmptyObject(showTask.spring)) {
    //spring_show = '<div class="videme-relation-card-user"><a class="text-muted" href="https://www.vide.me/' + showTask.spring + '/">@' + showTask.spring + '</a></div>';
    //spring_show = getHtmlSpringDBS(showTask);
    //}
    /*if (!$.isEmptyObject(showDoorbellSignSmall.access)) {
        accessIcon = accessToIcon(showDoorbellSignSmall);
    } else {
        var title = showDoorbellSignSmall.title;
    }*/
    if (!$.isEmptyObject(showTask.img)) {
        itemImage = showTask.img;
    } else {
        itemImage = showTask.image;
    }
    if (!$.isEmptyObject(showTask.array_tags)) {
        //console.log('showTask showTask.array_tags ---> ' + JSON.stringify(showTask.array_tags));
        //console.log('showTask showTask.array_tags ---> ' + JSON.stringify(showTask.array_tags.match(/[\w.-]+/g).map(showTask.array_tags)));
        //fShowcaseEachEarnedTagButton(JSON_tags_my)
        var entryTags = showTask.array_tags;
        var entryArray = entryTags.split("; ");
        //--var entryArray = entryTags.split(";");
        //var entryArray = entryArray1.join("");
        //var entryArray2 = entryTags.split("; ");
        //console.log('showTask entryArray ---> ' + JSON.stringify(entryArray));
        //console.log('showTask entryArray 0 ---> ' + entryArray[0]);
        //console.log('showTask entryArray 1 ---> ' + entryArray[1]);
        /*var entryArrayTrue = [];
        var entryArrayTrue2 = [];
        //var entryArrayTrue = {};
        var start = 0;
        entryArray2.forEach(function(value, index, array) {
            //console.log('showTask entryArray value, index, array ' + value, index, array);
            //entryArrayTrue.push['tag'] = entry;
            //entryArrayTrue['tag'] = entry;
            //entryArrayTrue2[start]['tag'] = value;
            //entryArrayTrue2[index]['tag'] = value;
            //entryArrayTrue.tag = entry;
            //entryArrayTrue.push({'tag': entry});
            //entryArrayTrue.push(['tag': entry]);
            //entryArrayTrue.push(tag.entry);
        });*/

        $.each(entryArray, function (index, value) {
            //console.log('showTask each(start ---> ' + start);
            //console.log('showTask each(entryArray index, value ---> ' + index, value);
            //entryArrayTrue.push(index);
            //entryArrayTrue[index]['tag'] = value;
            //entryArrayTrue.index.tag = value;
            //entryArrayTrue.push(tag.value);
            //==entryArrayTrue.push({'tag': value});
            //==entryArrayTrue.push({'tag': value, 'tag_count': '', 'item_id': ''});
            //entryArrayTrue.index.push({'tag': value, 'tag_count': '', 'item_id': ''});
            //array_tagsDiv.push(returnLinkTagButtonNOA(entryArrayTrue));

            array_tagsDiv.push(returnLinkTagButtonNOA({'tag': value, 'tag_count': '', 'item_id': ''}));
            //array_tagsDiv.push(' ');
            //start ++;

        });
        //var newStr = array_tagsDiv.replace(/,/g, '-');
        //console.log('showTask newStr ---> ' + JSON.stringify(newStr));
        //var s_array_tagsDiv = array_tagsDiv.replace(/,/g,'');
        //array_tagsDiv.map(e => e.replace(/(,\s*)+/, ','));
        //var arrJson = JSON.stringify(entryArrayTrue);

        /*console.log('showTask JSON.stringify entryArrayTrue ---> ' + JSON.stringify(entryArrayTrue));
        console.log('showTask JSON.stringify entryArrayTrue2 ---> ' + JSON.stringify(entryArrayTrue2));

        console.log('showTask JSON.stringify array_tagsDiv ---> ' + JSON.stringify(array_tagsDiv));
        console.log('showTask array_tagsDiv ---> ' + array_tagsDiv);*/
        //var array_tagsDiv2 = array_tagsDiv.split(",");

        var array_tagsDivJoin = array_tagsDiv.join('');
        /*entryArrayTrue.join('');
        var arrrr = array_tagsDiv.join('');
        console.log('showTask array_tagsDiv2.join ---> ' + array_tagsDiv2);*/
        //console.log('showTask entryArrayTrue.join ---> ' + JSON.stringify(entryArrayTrue));
        /*$.each(arrrr, function (index, value) {
            array_tagsDiv.push(returnLinkTagButtonNOA(value));
        });*/
        //array_tagsDiv = fShowcaseEachEarnedTagButton(entryArrayTrue);
        //var array_tagsDiv3 = '';
        /*$.each(arrJson, function (key, value) {
            console.log('showTask each(entryArray key, value ---> ' + key, value);
            //entryArrayTrue.push(index);
            //entryArrayTrue[index]['tag'] = value;
            //entryArrayTrue.index.tag = value;
            //entryArrayTrue.push(tag.value);
            //==entryArrayTrue.push({'tag': value});
            //==entryArrayTrue.push({'tag': value, 'tag_count': '', 'item_id': ''});
            array_tagsDiv3.push(returnLinkTagButtonNOA(entryArrayTrue));

            //array_tagsDiv.push(returnLinkTagButtonNOA({'tag': value, 'tag_count': '', 'item_id': ''}));
            //array_tagsDiv.push(' ');

        });*/

    }
    /*if (!$.isEmptyObject(showTask.pre_v_w320)) {
        //console.log("showTileTestV4 value.pre_v_w320 " + value.pre_v_w320);
        video_thumbnail = '<div class="videme-v4-tile-video_thumbnail-outer"><div class="videme-v4-tile-video_thumbnail-middle"><div class="videme-v4-tile-video_thumbnail-inner"><video item_id="' + value.item_id + '" src="https://s3.amazonaws.com/pre-video-w320.vide.me/' + value.item_id + '-pre-v-w320.mp4" poster="' + img + '" loop muted class="videme-v4-tile-video"></video></div></div></div>' +
            '<div class="progress videme-v4-tile-video_thumbnail-load-progress hidden" id="videme-v4-tile-video_thumbnail-load-progress-item-' + value.item_id + '">' +
            '  <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" id="videme-v4-tile-video_thumbnail-load-progress-item-now-' + value.item_id + '"></div>' +
            '</div>';
    } else {
        //console.log("showTileTestV4 value.pre_v_w320 empty");
    }*/
    var retFirstSet = itemTileParamFirstSet(showTask);
    var retSet = itemTileParamSet(showTask);


    if (!$.isEmptyObject(showTask.task_status)) { // The task
        if (!$.isEmptyObject(showTask.additional)) {
            if (showTask.additional == 'success') {
                imageThumbnail = itemTileElementCardA('tempObject', showTask.key, showTask, 'retParam.actionUrlClass', retSet.href, itemImage, retFirstSet.user_display_name, retFirstSet.post_spring, retFirstSet.post_user_picture, '', retSet.item_type, retFirstSet.post_user_display_name, retSet);
            } else {
                imageThumbnail = showIconForTask(showTask);
            }
        } else {
            imageThumbnail = showIconForTask(showTask);
        }
        res_accessToIcon = accessToIcon(showTask);
        res_count = showTask.count;
        if (!$.isEmptyObject(showTask.href)) {
            title = "<a href='https://www.vide.me/" + showTask.href + "'>" + showTask.title + "</a>";
            content = "<a href='https://www.vide.me/" + showTask.href + "'>" + showTask.content + "</a>";
        } else {
            title = showTask.title;
            content = showTask.content;
        }
    } else {
        //imageThumbnail = itemTileElementCardA('tempObject', showTask.key, showTask, 'retSet.actionUrlClass', retSet.href, retSet.img, retFirstSet.user_display_name, retFirstSet.post_spring, retFirstSet.post_user_picture, retSet.video_thumbnail, retSet.item_type, retFirstSet.post_user_display_name);
        imageThumbnail = itemMediaListImage(retSet.img);

        res_itemTileElementCardUserCard = itemTileElementCardUserCard(showTask, retFirstSet.post_spring, retFirstSet.post_user_picture, retFirstSet.post_user_display_name);
        res_showItemInfoV3 = showItemInfoV3(showTask);
        if (!$.isEmptyObject(showTask.href)) {
            title = "<a href='" + retSet.href + "'>" + showTask.title + "</a>";
            content = "<a href='" + retSet.href + "'>" + showTask.content + "</a>";
        } else {
            title = showTask.title;
            content = showTask.content;
        }
    }
    /*if (!$.isEmptyObject(showTask.item_count_show)) {
        button_item_count_show =
    }*/

    // <div class='text-muted videme-doorbell-sign-date'>" + showDoorbellSignSmall.date + "</div>\
    //$('.videme_last_task').html(showIconForTask(showTask));
    //$('.videme_last_task').html('showTask.icon', showTask.icon);
    return "<div class='videme-doorbell-sign-image'>\
              " + imageThumbnail + "\
            </div>\
            <div class='videme-doorbell-sign-right-block-main'>\
                <div class='videme-doorbell-sign-text-block'>\
                    " + showButtonForDoorbelSign(showTask) + "\
                    <div class='videme-doorbell-sign-1st-line'>\
                        <div class='videme-card-1st-line-title-date" + tempObjectClass + "'>\
                            <div class='videme-doorbell-sign-title-sub'>\
                            " + res_itemTileElementCardUserCard + "\
                            " + res_showItemInfoV3 + "\
                            </div>\
                            <div class=\"videme-doorbell-sign-title h5 my-1\">" + title + "</div>\
                            <div class=\"videme-doorbell-sign-content\">" + content + "</div>\
                               " + /*itemTileElementCardTitle(showTask, showTask.href) +*/ "\
                        </div>\
                        " + /*showDropdownForDoorbelSign(showTask) +*/ "\
                        " + showDropdownForDoorbelSignV3(showTask) + "\
                    </div>\
                    <div class='videme-doorbell-sign-2st-line'>\
                        <div class='videme-doorbell-sign-additional'>" + res_accessToIcon + "</div>\
                        " + /*spring_show +*/ "\
                        <div class='text-muted videme-doorbell-sign-count'>" + res_count + "</div>\
                    </div>\
                </div>\
                    <div class='videme-doorbell-sign-right-block-footer'>\
                        " + progress_convert + "\
                        " + array_tagsDivJoin + "\
                    </div>\
                </div>";
}

function showMediaElementLi(showTask) { // parent above ^ // 31072022
    console.log('showMediaElementLi');
    //console.log('showMediaElementLi ---> ' + JSON.stringify(showTask));
    //var accessIcon;
    var tempObjectClass = "";
    var title = '';
    var content = '';
    var progress_convert = '';
    //var spring_show = '';
    var imageThumbnail = '';
    var res_accessToIcon = '';
    var res_itemTileElementCardUserCard = '';
    var res_showItemInfoV3 = '';
    var res_count = '';
    //var video_thumbnail = '';
    var itemImage = '';
    //var array_tagsDiv = '';
    var array_tagsDiv = [];
    var array_tagsDivJoin = '';
    let button_group_class = ' hidden';

    //var retParam = [];
    //var button_item_count_show = '';
    //var itsTask = false;
    /*if (!$.isEmptyObject(tempObject)) {
        //console.log('showDoorbellSignSmall tempObject.width() ---> ' + tempObject.width());
        if (tempObject.width() < 300) {
            tempObjectClass = "";
        } else {
            tempObjectClass = " d-flex";
        }
    } else {
        tempObjectClass = " d-flex";
    }*/
    if (!$.isEmptyObject(showTask.percentage)) {
        /*progress_convert = '<div class="progress videme-convert-progress" style="height: .2rem; margin-top: .2rem;">' +
            '<div aria-valuemax="100" aria-valuemin="0" ' +
            'class="progress-bar progress-bar-striped progress-bar-animated" id="videme_convert_progress" ' +
            'role="progressbar" style=""></div>' +
            '</div>';*/

        if (showTask.percentage > 0) {

            /*$('#videme_convert_progress')
                .addClass('bg-success')
                .addClass('progress-bar-striped')
                .addClass('progress-bar-animated');*/
            var addClass = 'progress-bar-striped progress-bar-animated ';

            var percentage = showTask.percentage;
            if (showTask.percentage > 97) {
                percentage = 100;
                //addClass = addClass + ' bg-success';
                addClass = 'bg-success';
                /*$('#videme_convert_progress')
                    .html('Successfully converted')
                    .removeClass('progress-bar-striped')
                    .removeClass('progress-bar-animated');*/
                //$('.videme-uploader-status').html('Successfully converted');
                //document.title = 'Successfully converted ' + $('#title_for_video').val();
                //cookieLastUploadRemove();
            } else {
                //$('#videme_upload_progress').html('Converted ' + percentage + '%');
                //$('.videme-uploader-status').html('Converted ' + percentage + '%');
                //document.title = 'Converted ' + percentage + '% ' + $('#title_for_video').val();
                //console.log("$.fn.showMyTaskById data.percentage videme_nav_badge_last_upload -----> ", percentage);

                //$('.videme_nav_badge_last_upload').html(percentage + '%');

                /* *************************************/
                //$('#videme_last_upload_li').html(db);
                /* *************************************/

            }
            //$('#videme_convert_progress').css('width', percentage + '%').attr('aria-valuenow', percentage);
            progress_convert = '<div class="progress videme-convert-progress" style="height: .2rem; margin-top: .5rem;">' +
                '<div aria-valuemax="100" aria-valuemin="0" ' +
                'class="progress-bar ' + addClass + '" id="videme_convert_progress" ' +
                'role="progressbar" style="width: ' + percentage + '%" aria-valuenow="' + percentage + '"></div>' +
                '</div>';
        }
    }
    //if (!$.isEmptyObject(showTask.spring)) {
    //spring_show = '<div class="videme-relation-card-user"><a class="text-muted" href="https://www.vide.me/' + showTask.spring + '/">@' + showTask.spring + '</a></div>';
    //spring_show = getHtmlSpringDBS(showTask);
    //}
    /*if (!$.isEmptyObject(showDoorbellSignSmall.access)) {
        accessIcon = accessToIcon(showDoorbellSignSmall);
    } else {
        var title = showDoorbellSignSmall.title;
    }*/
    if (!$.isEmptyObject(showTask.img)) {
        itemImage = showTask.img;
    } else {
        itemImage = showTask.image;
    }
    if (!$.isEmptyObject(showTask.array_tags)) {
        //console.log('showTask showTask.array_tags ---> ' + JSON.stringify(showTask.array_tags));
        //console.log('showTask showTask.array_tags ---> ' + JSON.stringify(showTask.array_tags.match(/[\w.-]+/g).map(showTask.array_tags)));
        //fShowcaseEachEarnedTagButton(JSON_tags_my)
        var entryTags = showTask.array_tags;
        var entryArray = entryTags.split("; ");
        //--var entryArray = entryTags.split(";");
        //var entryArray = entryArray1.join("");
        //var entryArray2 = entryTags.split("; ");
        //console.log('showTask entryArray ---> ' + JSON.stringify(entryArray));
        //console.log('showTask entryArray 0 ---> ' + entryArray[0]);
        //console.log('showTask entryArray 1 ---> ' + entryArray[1]);
        /*var entryArrayTrue = [];
        var entryArrayTrue2 = [];
        //var entryArrayTrue = {};
        var start = 0;
        entryArray2.forEach(function(value, index, array) {
            //console.log('showTask entryArray value, index, array ' + value, index, array);
            //entryArrayTrue.push['tag'] = entry;
            //entryArrayTrue['tag'] = entry;
            //entryArrayTrue2[start]['tag'] = value;
            //entryArrayTrue2[index]['tag'] = value;
            //entryArrayTrue.tag = entry;
            //entryArrayTrue.push({'tag': entry});
            //entryArrayTrue.push(['tag': entry]);
            //entryArrayTrue.push(tag.entry);
        });*/

        $.each(entryArray, function (index, value) {
            //console.log('showTask each(start ---> ' + start);
            //console.log('showTask each(entryArray index, value ---> ' + index, value);
            //entryArrayTrue.push(index);
            //entryArrayTrue[index]['tag'] = value;
            //entryArrayTrue.index.tag = value;
            //entryArrayTrue.push(tag.value);
            //==entryArrayTrue.push({'tag': value});
            //==entryArrayTrue.push({'tag': value, 'tag_count': '', 'item_id': ''});
            //entryArrayTrue.index.push({'tag': value, 'tag_count': '', 'item_id': ''});
            //array_tagsDiv.push(returnLinkTagButtonNOA(entryArrayTrue));

            array_tagsDiv.push(returnLinkTagButtonNOA({'tag': value, 'tag_count': '', 'item_id': ''}));
            //array_tagsDiv.push(' ');
            //start ++;

        });
        //var newStr = array_tagsDiv.replace(/,/g, '-');
        //console.log('showTask newStr ---> ' + JSON.stringify(newStr));
        //var s_array_tagsDiv = array_tagsDiv.replace(/,/g,'');
        //array_tagsDiv.map(e => e.replace(/(,\s*)+/, ','));
        //var arrJson = JSON.stringify(entryArrayTrue);

        /*console.log('showTask JSON.stringify entryArrayTrue ---> ' + JSON.stringify(entryArrayTrue));
        console.log('showTask JSON.stringify entryArrayTrue2 ---> ' + JSON.stringify(entryArrayTrue2));

        console.log('showTask JSON.stringify array_tagsDiv ---> ' + JSON.stringify(array_tagsDiv));
        console.log('showTask array_tagsDiv ---> ' + array_tagsDiv);*/
        //var array_tagsDiv2 = array_tagsDiv.split(",");

        var array_tagsDivJoin = array_tagsDiv.join('');
        /*entryArrayTrue.join('');
        var arrrr = array_tagsDiv.join('');
        console.log('showTask array_tagsDiv2.join ---> ' + array_tagsDiv2);*/
        //console.log('showTask entryArrayTrue.join ---> ' + JSON.stringify(entryArrayTrue));
        /*$.each(arrrr, function (index, value) {
            array_tagsDiv.push(returnLinkTagButtonNOA(value));
        });*/
        //array_tagsDiv = fShowcaseEachEarnedTagButton(entryArrayTrue);
        //var array_tagsDiv3 = '';
        /*$.each(arrJson, function (key, value) {
            console.log('showTask each(entryArray key, value ---> ' + key, value);
            //entryArrayTrue.push(index);
            //entryArrayTrue[index]['tag'] = value;
            //entryArrayTrue.index.tag = value;
            //entryArrayTrue.push(tag.value);
            //==entryArrayTrue.push({'tag': value});
            //==entryArrayTrue.push({'tag': value, 'tag_count': '', 'item_id': ''});
            array_tagsDiv3.push(returnLinkTagButtonNOA(entryArrayTrue));

            //array_tagsDiv.push(returnLinkTagButtonNOA({'tag': value, 'tag_count': '', 'item_id': ''}));
            //array_tagsDiv.push(' ');

        });*/

    }
    /*if (!$.isEmptyObject(showTask.pre_v_w320)) {
        //console.log("showTileTestV4 value.pre_v_w320 " + value.pre_v_w320);
        video_thumbnail = '<div class="videme-v4-tile-video_thumbnail-outer"><div class="videme-v4-tile-video_thumbnail-middle"><div class="videme-v4-tile-video_thumbnail-inner"><video item_id="' + value.item_id + '" src="https://s3.amazonaws.com/pre-video-w320.vide.me/' + value.item_id + '-pre-v-w320.mp4" poster="' + img + '" loop muted class="videme-v4-tile-video"></video></div></div></div>' +
            '<div class="progress videme-v4-tile-video_thumbnail-load-progress hidden" id="videme-v4-tile-video_thumbnail-load-progress-item-' + value.item_id + '">' +
            '  <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" id="videme-v4-tile-video_thumbnail-load-progress-item-now-' + value.item_id + '"></div>' +
            '</div>';
    } else {
        //console.log("showTileTestV4 value.pre_v_w320 empty");
    }*/
    let retFirstSet = itemTileParamFirstSet(showTask);
    let retSet = itemTileParamSet(showTask);


    if (!$.isEmptyObject(showTask.task_status)) { // The task
        console.log('showMediaElementLi showTask.task_status true ---> ' + showTask.task_status);
        console.log('showMediaElementLi retFirstSet ---> ' + JSON.stringify(retFirstSet));
        console.log('showMediaElementLi retSet ---> ' + JSON.stringify(retSet));
        //if (!$.isEmptyObject(showTask.task_status)) {
        showTask.icon = iconDefineForMediaElementLi(showTask);
        if (showTask.task_status == 'success') {
            //imageThumbnail = itemTileElementCardA('tempObject', showTask.key, showTask, '', retSet.href, itemImage, retFirstSet.user_display_name, retFirstSet.post_spring, retFirstSet.post_user_picture, '', retSet.item_type, retFirstSet.post_user_display_name);
            //imageThumbnail = itemTileElementCardA('tempObject', showTask.key, showTask, '', retSet.href, retSet.img, retFirstSet.user_display_name, retFirstSet.post_spring, retFirstSet.post_user_picture, retSet.video_thumbnail, retSet.item_type, retFirstSet.post_user_display_name);
            imageThumbnail = itemMediaListImage(retSet.img);

        } else {
            imageThumbnail = showIconForTask(showTask);
        }
        /*} else {
            imageThumbnail = showIconForTask(showTask); // <------- NOOOO
        }*/
        res_accessToIcon = accessToIcon(showTask);
        res_count = showTask.count;
        if (!$.isEmptyObject(showTask.href)) {
            title = "<a href='https://www.vide.me/" + showTask.href + "'>" + showTask.title + "</a>";
            content = "<a href='https://www.vide.me/" + showTask.href + "'>" + showTask.content + "</a>";
        } else {
            title = showTask.title;
            content = showTask.content;
        }
    } else {
        console.log('showMediaElementLi showTask.task_status ---> empty');
        imageThumbnail = itemMediaListImage(retSet.img);
        //res_itemTileElementCardUserCard = itemTileElementCardUserCard(showTask, retFirstSet.post_spring, retFirstSet.post_user_picture, retFirstSet.post_user_display_name);
        //res_showItemInfoV3 = showItemInfoV3(showTask);
        if (!$.isEmptyObject(showTask.href)) {
            title = "<a href='" + retSet.href + "'>" + showTask.title + "</a>";
            content = "<a href='" + retSet.href + "'>" + showTask.content + "</a>";
        } else {
            title = showTask.title;
            content = showTask.content;
        }
    }
    if (!$.isEmptyObject(showTask.buttons)) {
        button_group_class = '';
    }
    /*if (!$.isEmptyObject(showTask.item_count_show)) {
        button_item_count_show =
    }*/

    // <div class='text-muted videme-doorbell-sign-date'>" + showDoorbellSignSmall.date + "</div>\
    //$('.videme_last_task').html(showIconForTask(showTask));
    //$('.videme_last_task').html('showTask.icon', showTask.icon);
    /*return "<div class=\"flex-shrink-0 videme-list-media-preposter\"><a href=\"https://www.vide.me/v?m=" + showTask.href + "\"><img class=\"videme-list-media-prepostr-img\" src=\"" + retSet.img + "\" alt=\"\"></a>            </div>\
    <div class='flex-grow-1 ms-3 videme-list-media-right-wrap'>\
    <div class=\"d-flex w-100 justify-content-between videme-list-media-title-wrap\">\
      <h5 class=\"mb-1 videme-list-media-title\">" + title + "</h5>\
      " + showButtonForDoorbelSign(showTask) + "\
    </div>\
    <small class=\"text-muted videme-list-media-user-name\">" + retFirstSet.post_user_display_name + "</small></div>"*/
    return "<input class='custom-control-input visually-hidden' id='customCheck1' type='checkbox'>\
          <div class='videme-list-media-preposter videme-list-media-preposter-on-left me-md-0'>\
            <label class='videme-1st-line-media-lits custom-control-label' for='customCheck1'>\
              <a href=\"https://www.vide.me/v?m=" + showTask.item_id + "\">\
                " + imageThumbnail + "\
              </a>\
            </label>\
          </div>\
          <div class='container'>\
            <div class='row justify-content-between'>\
              <div class='col me-auto d-flex align-items-center px-md-1 px-sm-0 px-lg-4'>\
                <div class='videme-list-media-preposter videme-list-media-preposter-on-title me-sm-1'>\
                    <label class='videme-1st-line-media-lits custom-control-label' for='customCheck1'>\
                        <a href=\"https://www.vide.me/v?m=" + showTask.item_id + "\">\
                        " + imageThumbnail + "\
                        </a>\
                    </label>\
                </div>\
                <label class='videme-1st-line-media-lits custom-control-label' for='customCheck1'>\
                  " + title + "\
                </label>\
              </div>\
              <div class='col-auto d-flex align-items-center" + button_group_class + "'>\
                " + showButtonForDoorbelSign(showTask) + "\
                " + showDropdownForDoorbelSignV3(showTask) + "\
              </div>\
            </div>\
            <div class='videme-2nd-line-media-list'>\
               " + showFooterForDoorbellSign(showTask) + "\
            </div>\
          </div>";
}

function chartButtonComposition(item_id) { // 31072022
    return "<div id='videme-item-chart-canvas-place_" + item_id + "' class='videme-item-chart-canvas-place'>\
            </div>\
            <div id='videme-chart-stump_" + item_id + "' class='hidden' item_id='" + item_id + "'></div>\
            <span id='videme-chart-button-1st2weeks_" + item_id + "' class='badge rounded-pill text-bg-secondary videme-chart-button videme-chart-button_" + item_id + "' item_id='" + item_id + "' time_shift_type='w_stop' time_shift_val='2'>First 2 weeks</span>\
            <span id='videme-chart-button-1st1months_" + item_id + "' class='badge rounded-pill text-bg-secondary videme-chart-button videme-chart-button_" + item_id + "' item_id='" + item_id + "' time_shift_type='m_stop' time_shift_val='1'>First 1 months</span>\
            <span id='videme-chart-button-last2weeks_" + item_id + "' class='badge rounded-pill text-bg-secondary videme-chart-button videme-chart-button_" + item_id + "' item_id='" + item_id + "' time_shift_type='w_stop' time_shift_val='-2'>Last 2 weeks</span>\
            <span id='videme-chart-button-last1months_" + item_id + "' class='badge rounded-pill text-bg-secondary videme-chart-button videme-chart-button_" + item_id + "' item_id='" + item_id + "' time_shift_type='m_stop' time_shift_val='-1'>Last 1 months</span>\
            <div id='videme-chart-pop-states-place_" + item_id + "' class='videme-chart-pop-states-place'></div>";
}

function iconDefineForMediaElementLi(value) { // TODO: clear nonuse
    let taskIcon = '', task_status = '';
    if (!$.isEmptyObject(value)) {

        if (!$.isEmptyObject(value.task_type)) {
            if (value.task_type == 'fileUploadVideoPre') {
                taskIcon = 'cloud-upload';
            }
            /*if (value.task_type == 'fileUploadVideo_force_mp4') {
                taskIcon = 'clock-o';
            }*/
            //if (value.task_type == 'fileUploadVideo' || value.task_type == 'fileUploadVideoTest') {
            if (value.task_type == 'fileUploadVideo' || value.task_type == 'fileUploadVideo_force_mp4') {
                //console.log("parseMyTaskForDoorbellSign -----> value.task_type", value.task_type);

                if (value.task_status == 'awaiting') {
                    taskIcon = 'clock-o';
                }
                if (value.task_status == 'worked') {
                    taskIcon = 'cogs';
                }
            }
            if (value.task_type == 'fileSendToS3') {
                if (value.task_status == 'success') {
                    taskImage = value.task_item_id + '.jpg';
                }
                if (value.task_status == 'awaiting') {
                    taskIcon = 'cloud-upload';
                }
            }
            /*if (value.task_type == 'fileSendBases') {
                if (value.task_status == 'success') {
                    taskImage = value.task_item_id + '.jpg';
                } else {
                    taskIcon = 'external-link-square';
                }
            }*/
            //if (!$.isEmptyObject(value.task_status)) {
            //if (value.task_status) {
            if (value.task_status == 'awaiting') {
                //taskIcon = 'clock-o';
                task_status == 'awaiting';
            }
            if (value.task_status == 'worked') {
                //taskImage = 'https://lh3.googleusercontent.com/Q-TyP-0iMexxAQDt7N81PLjLCrkoBkZVuSxP_1laOHxmctHhwJKsOXC9DYeBGXs8NIM=w300';
                //taskIcon = 'cogs';
                task_status == 'worked';
            }
            if (value.task_status == 'success') { // TODO: remove
                taskImage = value.task_item_id + '.jpg';
            }
            if (value.task_status == 'error') {
                taskIcon = 'frown-o';
                task_status == 'error';
            }
            //}
            /*if (!$.isEmptyObject(value.percentage)) {
                if (value.percentage < 98) percentage = '(' + value.percentage + '%) ';
            }
            if (!$.isEmptyObject(value.title)) {
                title = value.title;
            }*/
        }
    }
    return taskIcon;
}

function getHtmlSpringDBS(getHtmlSpringDBS) { // 31072022
    var spring_show = '';
    if (!$.isEmptyObject(getHtmlSpringDBS.spring)) {
        spring_show = '<div class="videme-relation-card-user"><a class="text-muted" href="https://www.vide.me/' + getHtmlSpringDBS.spring + '/">@' + getHtmlSpringDBS.spring + '</a></div>';
    }
    return spring_show;
}

function getHtmlUserNameDBS(getHtmlUserNameDBS) { // 31072022
    var spring_user_name = '';
    if (!$.isEmptyObject(getHtmlUserNameDBS.spring)) {
        spring_user_name = '<a class="text-muted" href="https://www.vide.me/' + getHtmlUserNameDBS.spring + '/">' + getHtmlUserNameDBS.user_display_name + '</a>';
    }
    return spring_user_name;
}

function getHtmlCountryDBS(getHtmlCountryDBS) { // 31072022
    var country_show = '';
    if (!$.isEmptyObject(getHtmlCountryDBS.country)) {
        country_show = '<div class="videme-relation-card-user-country"><i class="fa fa-globe videme-relation-card-user-geo-marker"></i>' + getHtmlCountryDBS.country + '</div>';
    }
    return country_show;
}

function getHtmlCityDBS(getHtmlCityDBS) { // 31072022
    var city_show = '';
    if (!$.isEmptyObject(getHtmlCityDBS.city)) {
        city_show = '<div class="videme-relation-card-user-city"><i class="fa fa-map-marker videme-relation-card-user-geo-marker"></i>' + getHtmlCityDBS.city + '</div>';
    }
    return city_show;
}

/* 31072022 function showLastTask(showLastTask) {
    //console.log("$.fn.showLastTask -----> ", JSON.stringify(showLastTask));

    if (!$.isEmptyObject(showLastTask.percentage)) {

        $('#videme_upload_progress').css('width', showLastTask.percentage + '%').attr('aria-valuenow', showLastTask.percentage);
        //$('#videme_upload_progress').html('Converted ', showLastTask.percentage + '%');
    }

    var videme_last_task = [];
    //var videme_last_task = {};
    //videme_last_task.push = data;
    videme_last_task.push(showLastTask);
    //videme_last_task[0] = data;

    //tempObject.html(showIconForTask(paddingUserInfo(parseMyTaskForDoorbellSign(videme_last_task))));
    var iconArray = parseMyTaskForDoorbellSign(videme_last_task);
    var icon = paddingUserInfo(iconArray[0]);
    //tempObject.html(showIconForTask(parseMyTaskForDoorbellSign(videme_last_task)));
    //console.log("$.fn.showMyTaskById icon -----> ", JSON.stringify(icon));

    //tempObject.html(showIconForTask(icon[0]));
    $('.videme_last_task').html(showIconForTask(icon));
}*/

function showIconForTask(showIconForTask) { // 01082022 ???
    console.log('showIconForTask ---> ' + JSON.stringify(showIconForTask));
    if (!$.isEmptyObject(showIconForTask.image)) {
        if (!$.isEmptyObject(showIconForTask.href)) {
            var dbImage = "<a href='https://www.vide.me/" + showIconForTask.href + "'><img class=\"videme-task-img-tile\" src=\"" + showIconForTask.image + "\" alt=\"\" /></a>";
        } else {
            var dbImage = "<img class=\"videme-task-img-tile\" src=\"" + showIconForTask.image + "\" alt=\"\" />";
        }
    }
    if (!$.isEmptyObject(showIconForTask.icon)) {
        var dbImage = "<i class='img-thumbnail fa fa-" + showIconForTask.icon + " fa-2x fa-pull-left text-center align-items-center d-flex justify-content-center videme-doorbell-sign-icon'></i>";
    }
    return dbImage;
}

/* 01082022 function showTileTrendsItemsLI(showTileTrendsItems, tempObject) { // TODO: remove
    //console.log('showTileDoorbellSignSmall ---> ' + JSON.stringify(showTileDoorbellSignSmall));
    var html = [];
    html.push("<ul class=\"list-group videme-doorbell-sign-small\">");
    $.each(showTileTrendsItems, function (key, value) {
        //var trueValue = paddingUserInfo(value); // TODO: Dobble?
        html.push(showTrendsItems(value, tempObject));
    });
    html.push("</ul>");
    return html.join('');
}*/

/* 01082022 function showTrendsItems(showTrendsItems, tempObject) { // TODO: remove
    //console.log('showDoorbellSignSmall ---> ' + JSON.stringify(showDoorbellSignSmall));
    //console.log('showDoorbellSignSmall showDoorbellSignSmall.title ---> ' + showDoorbellSignSmall.title);
    //var accessIcon;
    var title = '';
    var user_display_name = '';
    var type_item = 'v/?m=';
    if (!$.isEmptyObject(tempObject)) {
        //console.log('showDoorbellSignSmall tempObject.width() ---> ' + tempObject.width());
        if (tempObject.width() < 300) {
            var tempObjectClass = "";
        } else {
            var tempObjectClass = " d-flex";
        }
    } else {
        var tempObjectClass = " d-flex";
    }
    if (!$.isEmptyObject(showTrendsItems.type_item)) {
        switch (showTrendsItems.type_item) {
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
    if (!$.isEmptyObject(showTrendsItems.item_id) && !$.isEmptyObject(showTrendsItems.title)) {
        title = "<a href='https://www.vide.me/" + type_item + showTrendsItems.item_id + "'>" + showTrendsItems.title + "</a>";
    } else {
        title = showTrendsItems.title;
    }
    if (!$.isEmptyObject(showTrendsItems.spring) && !$.isEmptyObject(showTrendsItems.user_display_name)) {
        user_display_name = "<a href='https://www.vide.me/" + showTrendsItems.spring + "'>" + showTrendsItems.user_display_name + "</a>";
    }
    /!*if (!$.isEmptyObject(showDoorbellSignSmall.access)) {
        accessIcon = accessToIcon(showDoorbellSignSmall);
    } else {
        var title = showDoorbellSignSmall.title;
    }*!/
    // <div class='text-muted videme-doorbell-sign-date'>" + showDoorbellSignSmall.date + "</div>\
    return "\
        <li type=\"button\" class=\"list-group-item list-group-item-action videme-list-group\">\
            <!--<div class='videme-doorbell-sign-image'>\
              " + showIconForTrendsItems(showTrendsItems) + "\
            </div>-->\
            <div class='videme-doorbell-sign-1st-line'>\
                <div class='videme-doorbell-sign-1st-line-title-date" + tempObjectClass + "'>\
                    <div class=\"videme-doorbell-sign-title\">" + title + "</div>\
                </div>\
                <!--" + showButtonForDoorbelSign(showTrendsItems) + "\
                " + showDropdownForDoorbelSign(showTrendsItems) + "-->\
            </div>\
            <div class='videme-doorbell-sign-2st-line'>\
                <!--<div class='videme-doorbell-sign-additional'>" + user_display_name + "</div>-->\
                <!--<div class='text-muted videme-doorbell-sign-count'>" + user_display_name + "</div>-->\
                <small>" + user_display_name + "</small>\
            </div>\
        </li>";
}*/

/* 01082022 function showIconForTrendsItems(showIconForTrendsItems) { // TODO: remove
    //console.log('showIconForDoorbelSign ---> ' + JSON.stringify(showIconForDoorbelSign));
    if (!$.isEmptyObject(showIconForTrendsItems.image)) {
        if (!$.isEmptyObject(showIconForTrendsItems.href)) {
            var dbImage = "<a href='https://www.vide.me/" + showIconForTrendsItems.href + "'><img class=\"videme-task-img-tile\" src=\"" + showIconForTrendsItems.image + "\" alt=\"\" /></a>";
        } else {
            var dbImage = "<img class=\"videme-task-img-tile\" src=\"" + showIconForTrendsItems.image + "\" alt=\"\" />";
        }
    }
    if (!$.isEmptyObject(showIconForTrendsItems.icon)) {
        var dbImage = "<i class='img-thumbnail fa fa-" + showIconForTrendsItems.icon + " fa-2x fa-pull-left text-center align-items-center d-flex justify-content-center videme-doorbell-sign-icon'></i>";
    }
    return dbImage;
}*/

function showServiceMy(showServiceMy) { // 01082022
    //console.log('showServiceMy ---> ' + JSON.stringify(showServiceMy));
    var html = [];
    //html.push("<ul class=\"list-group videme-doorbell-sign-small\">");
    $.each(showServiceMy, function (key, value) {
        //console.log('showServiceMy value ---> ' + JSON.stringify(value));
        //console.log('showServiceMy value.service_title ---> ' + value.service_title);
        html.push('<span class="badge badge-pill badge-primary videme-badge-service service1">' +
            value.service_title +
            '<a class="delete_service_action" href="https://api.vide.me/v2/service/delete/?service_id=' + value.service_id + '&nad=' + $.cookie('vide_nad') + '" service_id="' + value.service_id + '"><i class="fa fa-remove"></i></a>' +
            '</span>');
    });
    //html.push("</ul>");
    return html.join('');
}

function showEssenceMy(showEssenceMy) { // 01082022
    //console.log('showServiceMy ---> ' + JSON.stringify(showServiceMy));
    var html = [];
    //html.push("<ul class=\"list-group videme-doorbell-sign-small\">");
    $.each(showEssenceMy, function (key, value) {
        //console.log('showServiceMy value ---> ' + JSON.stringify(value));
        //console.log('showServiceMy value.service_title ---> ' + value.service_title);
        html.push('<span class="badge badge-pill badge-primary videme-badge-service service1">' +
            value.title +
            '<a class="delete_service_action" href="https://api.vide.me/v2/essences/delete/?essence_id=' + value.essence_id + '&nad=' + $.cookie('vide_nad') + '" essence_id="' + value.essence_id + '"><i class="fa fa-remove"></i></a>' +
            '</span>');
    });
    //html.push("</ul>");
    return html.join('');
}

function showServiceSpring(showServiceSpring, springInfo) { // 01082022
    //console.log('showServiceSpring ---> ' + JSON.stringify(showServiceMy));
    var html = [];
    //var url = parseUrl();
    $.each(showServiceSpring, function (key, value) {
        //console.log('showServiceMy value ---> ' + JSON.stringify(value));
        //console.log('showServiceMy value.service_title ---> ' + value.service_title);
        html.push('<a class="badge badge-pill badge-light videme-badge-service" href="https://www.vide.me/' + springInfo.spring + '/?show=about">' + value.service_title + '</a> ');
    });
    return html.join('');
}

function showTalentsSpring(showTalentsSpring, springInfo) { // 01082022
    //console.log('showServiceSpring ---> ' + JSON.stringify(showServiceMy));
    var html = [];
    //var url = parseUrl();
    $.each(showTalentsSpring, function (key, value) {
        //console.log('showServiceMy value ---> ' + JSON.stringify(value));
        //console.log('showServiceMy value.service_title ---> ' + value.service_title);
        html.push('<a class="badge badge-pill badge-light videme-badge-tallent" href="https://www.vide.me/' + springInfo.spring + '/?show=about">' + value.talent_title + '</a> ');
    });
    return html.join('');
}

function showServiceSelect(showServiceSelect) { // 01082022
    //console.log('showServiceMy ---> ' + JSON.stringify(showServiceMy));
    var html = [];
    var service1 = '';
    var service2 = '';
    //service1 += ('<div class="row">');
    //service2 += ('<div class="row">');
    $.each(showServiceSelect, function (key, value) {
        if ($.isEmptyObject(value.parent_id)) {
            //list_group.push('<a class="list-group-item list-group-item-action" data-toggle="list" href="#' + value.service_id + '" role="tab">' + value.service_title + '</a>\n');
            service1 += '<span class="badge badge-pill badge-light service1-select service1" order_key="' + value.order_key + '" id="' + value.service_id + '">' + value.service_title + '<a class="add_service_action" href="https://api.vide.me/v2/service/create/?service_id=' + value.service_id + '&nad=' + $.cookie('vide_nad') + '" service_id="' + value.service_id + '"><i class="fa fa-plus text-white"></i></a></span>';
        } else {
            //tab_panes.push('<div class="tab-pane" id="' + value.parent_id + '" role="tabpanel">' + value.service_title + '</div>\n');
            service2 += '<span class="badge badge-pill badge-secondary service2-select service2 ' + value.order_key + ' hidden" order_key="' + value.order_key + '" id="' + value.service_id + '">' + value.service_title + '<a class="add_service_action" href="https://api.vide.me/v2/service/create/?service_id=' + value.service_id + '&nad=' + $.cookie('vide_nad') + '" service_id="' + value.service_id + '"><i class="fa fa-plus text-white"></i></a></span>';

        }
    });
    //service1 += ('</div>');
    //console.log('showServiceSelect service1 ---> ' + JSON.stringify(service1));
    //service2 += ('</div>');
    html.push(service1, service2);
    //console.log('showServiceSelect html ---> ' + JSON.stringify(html));
    //return html.join('');
    $('#videme-select-service-tile').html(service1);
    $('#videme-select-service2-tile').html(service2);
}

/* 01082022 function showEssenceSelect(showEssenceSelect) {
    //console.log('showServiceMy ---> ' + JSON.stringify(showServiceMy));
    var html = [];
    var service1 = '';
    var service2 = '';
    //service1 += ('<div class="row">');
    //service2 += ('<div class="row">');
    $.each(showEssenceSelect, function (key, value) {
        if ($.isEmptyObject(value.parent_id)) {
            //list_group.push('<a class="list-group-item list-group-item-action" data-toggle="list" href="#' + value.service_id + '" role="tab">' + value.service_title + '</a>\n');
            service1 += '<span class="badge badge-pill badge-light service1-select service1" order_key="' + value.order_key + '" id="' + value.essence_id + '">' + value.title + '<a class="add_service_action" href="https://api.vide.me/v2/essences/create/?essence_id=' + value.essence_id + '&nad=' + $.cookie('vide_nad') + '" essence_id="' + value.essence_id + '"><i class="fa fa-plus text-white"></i></a></span>';
        } else {
            //tab_panes.push('<div class="tab-pane" id="' + value.parent_id + '" role="tabpanel">' + value.service_title + '</div>\n');
            service2 += '<span class="badge badge-pill badge-secondary service2-select service2 ' + value.order_key + ' hidden" order_key="' + value.order_key + '" id="' + value.essence_id + '">' + value.title + '<a class="add_service_action" href="https://api.vide.me/v2/essences/create/?essence_id=' + value.essence_id + '&nad=' + $.cookie('vide_nad') + '" essence_id="' + value.essence_id + '"><i class="fa fa-plus text-white"></i></a></span>';
        }
    });
    //service1 += ('</div>');
    //console.log('showServiceSelect service1 ---> ' + JSON.stringify(service1));
    //service2 += ('</div>');
    html.push(service1, service2);
    //console.log('showServiceSelect html ---> ' + JSON.stringify(html));
    //return html.join('');
    $('#videme-select-essence-tile').html(service1);
    $('#videme-select-essence2-tile').html(service2);
}*/

function showTalentsMy(showTalentsMy) { // 01082022
    //console.log('showTalentsMy ---> ' + JSON.stringify(showTalentsMy));
    var html = [];
    //html.push("<ul class=\"list-group videme-doorbell-sign-small\">");
    $.each(showTalentsMy, function (key, value) {
        //console.log('showTalentsMy value ---> ' + JSON.stringify(value));
        //console.log('showTalentsMy value.talent_title ---> ' + value.talent_title);
        html.push('<span class="badge badge-pill badge-primary videme-badge-tallent service1">' +
            value.talent_title +
            '<a class="delete_service_action" href="https://api.vide.me/v2/talents/delete/?talent_id=' + value.talent_id + '&nad=' + $.cookie('vide_nad') + '" talent_id="' + value.talent_id + '"><i class="fa fa-remove"></i></a>' +
            '</span>');
    });
    //html.push("</ul>");
    return html.join('');
}

function showTalentsSelect(showTalentsSelect) { // 01082022
    console.log('showTalentsSelect ---> ' + JSON.stringify(showTalentsSelect));
    var html = [];
    var talents1 = '';
    var talents2 = '';
    //talents1 += ('<div class="row">');
    //talents2 += ('<div class="row">');
    $.each(showTalentsSelect, function (key, value) {
        if ($.isEmptyObject(value.parent_id)) {
            //list_group.push('<a class="list-group-item list-group-item-action" data-toggle="list" href="#' + value.service_id + '" role="tab">' + value.service_title + '</a>\n');
            talents1 += '<span class="badge badge-pill badge-light talent1-select service1 " order_key="' + value.order_key + '" id="' + value.talent_id + '">' + value.talent_title + '<a class="add_service_action" href="https://api.vide.me/v2/talents/create/?talent_id=' + value.talent_id + '&nad=' + $.cookie('vide_nad') + '" talent_id="' + value.talent_id + '"><i class="fa fa-plus text-white"></i></a></span>';
        } else {
            //tab_panes.push('<div class="tab-pane" id="' + value.parent_id + '" role="tabpanel">' + value.service_title + '</div>\n');
            talents2 += '<span class="badge badge-pill badge-secondary talent2-select service2 ' + value.order_key + ' hidden" order_key="' + value.order_key + '" id="' + value.talent_id + '">' + value.talent_title + '<a class="add_service_action" href="https://api.vide.me/v2/talents/create/?talent_id=' + value.talent_id + '&nad=' + $.cookie('vide_nad') + '" talent_id="' + value.talent_id + '"><i class="fa fa-plus text-white"></i></a></span>';

        }
    });
    //talents1 += ('</div>');
    //console.log('showTalentsSelect talents1 ---> ' + JSON.stringify(talents1));
    //talents2 += ('</div>');
    html.push(talents1, talents2);
    //console.log('showTalentsSelect html ---> ' + JSON.stringify(html));
    //return html.join('');
    $('#videme-select-talents-tile').html(talents1);
    $('#videme-select-talents2-tile').html(talents2);
}

/* 01082022 function showItemInfo(showItemInfo) {
    //console.log('showItemInfo ---> ' + JSON.stringify(showItemInfo));
    var trueInfo = '';
    var likeButton = '';
    var countShowButton = '';
    var videoDurationButton = '';
    var accessButton = '';
    var repostButton = '';
    var shareButton = '';
    //var accessIcon = '';
    var item_count_show = 0;
    var video_duration = '-';
    var likes_count = 0;
    var reposts_count = 0;
    var ext_links = '';
    if (!$.isEmptyObject(showItemInfo.item_count_show)) {
        //trueInfo += '<i class="fa fa-eye videme_item_info_icon"></i> ' + showItemInfo.item_count_show + ' ';
        item_count_show = showItemInfo.item_count_show;
    } /!*else {
        trueInfo += '<i class="fa fa-eye videme_item_info_icon"></i> 0 ';
    }*!/
    if (!$.isEmptyObject(showItemInfo.video_duration)) {
        //trueInfo += '<i class="fa fa-clock-o videme_item_info_icon"></i> ' + sec2str(showItemInfo.video_duration) + ' ';
        video_duration = sec2str(showItemInfo.video_duration);
    } /!*else {
        trueInfo += '<i class="fa fa-clock-o videme_item_info_icon"></i> - ';
    }*!/
    //if (!$.isEmptyObject(showItemInfo.access)) {
    /!*if (showItemInfo.access == 'public')
        trueInfo += '<i class="fa fa fa-unlock"></i> ' + showItemInfo.access + ' ';
    if (showItemInfo.access == 'friends')
        trueInfo += '<i class="fa fa fa-users"></i> ' + showItemInfo.access + ' ';
    if (showItemInfo.access == 'private')
        trueInfo += '<i class="fa fa fa-unlock-alt"></i> ' + showItemInfo.access + ' ';*!/
    //trueInfo += accessToIcon(showItemInfo) + '&nbsp;';
    //}
    if (!$.isEmptyObject(showItemInfo.likes_count)) {
        //trueInfo += '<i class="fa fa-thumbs-o-up videme_item_info_icon"></i> ' + showItemInfo.likes_count + ' ';
        likes_count = showItemInfo.likes_count;
    } /!*else {
        //trueInfo += '<i class="fa fa-thumbs-o-up videme_item_info_icon"></i> 0 ';
        likes_count = 0;
    }*!/
    if (!$.isEmptyObject(showItemInfo.reposts_count)) {
        //trueInfo += '<i class="fa fa-share-alt videme_item_info_icon"></i> ' + showItemInfo.reposts_count + ' ';
        reposts_count = showItemInfo.reposts_count;
    } /!*else {
        trueInfo += '<i class="fa fa-share-alt videme_item_info_icon"></i> 0 ';
    }*!/
    countShowButton = '<div class="videme_item_info_element"><i class="fa fa-eye"></i><div class="videme_item_info_val">' + nFormatter(item_count_show, 2) + '</div></div>';
    videoDurationButton = '<div class="videme_item_info_element"><i class="fa fa-clock-o"></i><div class="videme_item_info_val">' + video_duration + '</div></div>';
    //accessButton = '<div class="videme_item_info_element">' + accessToIcon(showItemInfo) + '</div>';

    if (!$.isEmptyObject(showItemInfo.actionUrlClass)) {

        if (showItemInfo.actionUrlClass == 'file-my-url' && showItemInfo.actionUrlClass == 'post-my-url') {
            accessButton = '<div class="videme_item_info_element">' + accessToIcon(showItemInfo) + '</div>';
        }
    }

    if (!$.isEmptyObject(showItemInfo.its_like)) {
        //likeButton = '<button type="button" class="btn btn-primary btn-sm set_like disabled" id="like_list-group_13_0" >You did like</button>';
        likeButton = '<div class="videme_item_info_element"><i class="fa fa-thumbs-up btn-link videme_item_info_icon" item_id="' + showItemInfo.item_id + '" href="#" role="button"></i><div class="videme_item_info_val">' + likes_count + '</div></div>';
    } else {
        //likeButton = '<button type="button" class="btn btn-primary btn-sm set_like" id="like_list-group_13_0" item_id="' + showItemInfo.item_id + '">Like</button>';
        likeButton = '<div class="videme_item_info_element"><i class="fa fa-thumbs-o-up btn-link set_like videme_item_info_icon" likes_count="' + likes_count + '" item_id="' + showItemInfo.item_id + '" href="#" role="button"></i><div class="videme_item_info_val">' + likes_count + '</div></div>';
    }
    repostButton = '<div class="videme_item_info_element"><a class="fa fa-retweet btn-link list-url videme_item_info_icon" item_id="' + showItemInfo.item_id + '" href="https://api.vide.me/v2/reposts/item/?item_id=' + showItemInfo.item_id + '&nad=' + $.cookie('vide_nad') + '" role="button"></a><div class="videme_item_info_val">' + reposts_count + '</div></div>';
    //console.log('showItemInfo repostButton ---> ' + repostButton);
    shareButton = '<div class="videme_item_info_element"><i class="fa fa-share btn-link share-to-fb-toggle videme_item_info_icon" item_id="' + showItemInfo.item_id + '"  data-toggle="modal" data-target="#modal-share-to-fb"></i><div class="videme_item_info_val"></div></div>';

    if (!$.isEmptyObject(showItemInfo.ext_links)) { // TODO: Dobble
        //console.log("showItemInfo ----->" + JSON.stringify(showItemInfo.ext_links));
        var links = '';
        array_ext_links = $.parseJSON(showItemInfo.ext_links);
        $.each(array_ext_links, function (key, value) {
            //console.log("$.fn.showcaseText tags -----> " + value);
            links += '<a href="' + value.link + '" target="_blank" class="badge badge-pill badge-primary">' + value.title + '</span>&nbsp;';
        });
        //ext_links = '<div class="videme_item_info_element"><i class="fa fa-external-link videme_item_info_icon" item_id="' + showItemInfo.item_id + '"><div class="videme_item_info_val">' + links + '</div></i></div>';
        ext_links = '<div class="videme_item_info_element">' + links + '</div>';
    }

    /!*trueInfo += countShowButton + videoDurationButton + accessButton + likeButton +
        '&nbsp;'
        + repostButton +
        '&nbsp;' + shareButton;*!/
    //console.log('showItemInfo trueInfo ---> ' + trueInfo);
    if (showItemInfo.embed) {
        return countShowButton + videoDurationButton + accessButton + ext_links;
    } else {
        return countShowButton + videoDurationButton + accessButton + likeButton + repostButton + shareButton + ext_links;
    }
    //return countShowButton + videoDurationButton + accessButton + likeButton + repostButton + shareButton + ext_links;
}*/

function showItemInfoShowcase(showItemInfo) { // 01082022
    //console.log('showItemInfoShowcase ---> ' + JSON.stringify(showItemInfo));
    var trueInfo = '';
    var likeButton = '';
    var countShowButton = '';
    var videoDurationButton = '';
    var accessButton = '';
    var repostButton = '';
    var shareButton = '';
    //var accessIcon = '';
    var item_count_show = 0;
    var video_duration = '-';
    var likes_count = 0;
    var reposts_count = 0;
    var ext_links = '';
    if (!$.isEmptyObject(showItemInfo.item_count_show)) {
        //trueInfo += '<i class="fa fa-eye videme_item_info_icon"></i> ' + showItemInfo.item_count_show + ' ';
        item_count_show = showItemInfo.item_count_show;
    } /*else {
        trueInfo += '<i class="fa fa-eye videme_item_info_icon"></i> 0 ';
    }*/
    if (!$.isEmptyObject(showItemInfo.video_duration)) {
        //trueInfo += '<i class="fa fa-clock-o videme_item_info_icon"></i> ' + sec2str(showItemInfo.video_duration) + ' ';
        video_duration = sec2str(showItemInfo.video_duration);
    } /*else {
        trueInfo += '<i class="fa fa-clock-o videme_item_info_icon"></i> - ';
    }*/
    //if (!$.isEmptyObject(showItemInfo.access)) {
    /*if (showItemInfo.access == 'public')
        trueInfo += '<i class="fa fa fa-unlock"></i> ' + showItemInfo.access + ' ';
    if (showItemInfo.access == 'friends')
        trueInfo += '<i class="fa fa fa-users"></i> ' + showItemInfo.access + ' ';
    if (showItemInfo.access == 'private')
        trueInfo += '<i class="fa fa fa-unlock-alt"></i> ' + showItemInfo.access + ' ';*/
    //trueInfo += accessToIcon(showItemInfo) + '&nbsp;';
    //}
    if (!$.isEmptyObject(showItemInfo.likes_count)) {
        //trueInfo += '<i class="fa fa-thumbs-o-up videme_item_info_icon"></i> ' + showItemInfo.likes_count + ' ';
        likes_count = showItemInfo.likes_count;
    } /*else {
        //trueInfo += '<i class="fa fa-thumbs-o-up videme_item_info_icon"></i> 0 ';
        likes_count = 0;
    }*/
    if (!$.isEmptyObject(showItemInfo.reposts_count)) {
        //trueInfo += '<i class="fa fa-share-alt videme_item_info_icon"></i> ' + showItemInfo.reposts_count + ' ';
        reposts_count = showItemInfo.reposts_count;
    } /*else {
        trueInfo += '<i class="fa fa-share-alt videme_item_info_icon"></i> 0 ';
    }*/
    countShowButton = '<div class="videme_item_info_element_showcase"><i class="fa fa-eye videme_item_info_icon_showcase_showcase_nobtn"></i><div class="videme_item_info_val_showcase_nobtn">' + nFormatter(item_count_show, 2) + '</div></div>';
    videoDurationButton = '<div class="videme_item_info_element_showcase"><i class="fa fa-clock-o videme_item_info_icon_showcase_showcase_nobtn"></i><div class="videme_item_info_val_showcase_nobtn">' + video_duration + '</div></div>';
    //accessButton = '<div class="videme_item_info_element">' + accessToIcon(showItemInfo) + '</div>';

    if (!$.isEmptyObject(showItemInfo.actionUrlClass)) {

        if (showItemInfo.actionUrlClass == 'file-my-url' && showItemInfo.actionUrlClass == 'post-my-url') {
            accessButton = '<div class="videme_item_info_element_showcase">' + accessToIcon(showItemInfo) + '</div>';
        }
    }

    /*if (!$.isEmptyObject(showItemInfo.its_like)) {
        //likeButton = '<button type="button" class="btn btn-primary btn-sm set_like disabled" id="like_list-group_13_0" >You did like</button>';
        likeButton = '<div class="videme_item_info_element"><i class="fa fa-thumbs-up btn-link videme_item_info_icon" item_id="' + showItemInfo.item_id + '" href="#" role="button"><div class="videme_item_info_val">' + likes_count + '</div></i></div>';
    } else {
        //likeButton = '<button type="button" class="btn btn-primary btn-sm set_like" id="like_list-group_13_0" item_id="' + showItemInfo.item_id + '">Like</button>';
        likeButton = '<div class="videme_item_info_element"><i class="fa fa-thumbs-o-up btn-link set_like videme_item_info_icon" likes_count="' + likes_count + '" item_id="' + showItemInfo.item_id + '" href="#" role="button"><div class="videme_item_info_val">' + likes_count + '</div></i></div>';
    }
    repostButton = '<div class="videme_item_info_element"><a class="fa fa-retweet btn-link list-url videme_item_info_icon" item_id="' + showItemInfo.item_id + '" href="https://api.vide.me/v2/reposts/item/?item_id=' + showItemInfo.item_id + '&nad=' + $.cookie('vide_nad') + '" role="button"><div class="videme_item_info_val">' + reposts_count + '</div></a></div>';
    //console.log('showItemInfo repostButton ---> ' + repostButton);
    shareButton = '<div class="videme_item_info_element"><i class="fa fa-share btn-link share-to-fb-toggle videme_item_info_icon" item_id="' + showItemInfo.item_id + '"  data-toggle="modal" data-target="#modal-share-to-fb"><div class="videme_item_info_val"></div></i></div>';
*/
    if (!$.isEmptyObject(showItemInfo.ext_links)) { // TODO: Dobble
        //console.log("showItemInfo ----->" + JSON.stringify(showItemInfo.ext_links));
        var links = '';
        array_ext_links = $.parseJSON(showItemInfo.ext_links);
        $.each(array_ext_links, function (key, value) {
            //console.log("$.fn.showcaseText tags -----> " + value);
            links += '<a href="' + value.link + '" target="_blank" class="badge badge-pill badge-primary">' + value.title + '</span>&nbsp;';
        });
        //ext_links = '<div class="videme_item_info_element"><i class="fa fa-external-link videme_item_info_icon" item_id="' + showItemInfo.item_id + '"><div class="videme_item_info_val">' + links + '</div></i></div>';
        //==================ext_links = '<div class="videme_item_info_element">' + links + '</div>';
    }

    /*trueInfo += countShowButton + videoDurationButton + accessButton + likeButton +
        '&nbsp;'
        + repostButton +
        '&nbsp;' + shareButton;*/
    //console.log('showItemInfo trueInfo ---> ' + trueInfo);
    /*if (showItemInfo.embed) {
        return countShowButton + videoDurationButton + accessButton + ext_links;
    } else {
        return countShowButton + videoDurationButton + accessButton + likeButton + repostButton + shareButton + ext_links;
    }*/
    //return countShowButton + videoDurationButton + accessButton + likeButton + repostButton + shareButton + ext_links;
    return countShowButton + videoDurationButton + accessButton + ext_links;
}

function accessToIcon(accessToIcon) { // 01082022 ??
    if (!$.isEmptyObject(accessToIcon.access)) {
        /*if (accessToIcon.access == 'public')
            return '<i class="fa fa fa-unlock videme_item_info_icon"></i>';
        if (accessToIcon.access == 'friends')
            return '<i class="fa fa fa-users videme_item_info_icon"></i>';
        if (accessToIcon.access == 'private')
            return '<i class="fa fa fa-unlock-alt videme_item_info_icon"></i>';*/

        switch (accessToIcon.access) {
            case 'public':
                return '<i class="fa fa-unlock videme_item_info_icon"></i>';
                break;
            case 'friends':
                return '<i class="fa fa-users videme_item_info_icon"></i>';
                break
            case 'private':
                return '<i class="fa fa-lock videme_item_info_icon"></i>';
                break;
            default:
                return '<i class="fa fa-unlock videme_item_info_icon"></i>';
                break;
        }
    } else {
        return '';
    }
}

function showItemInfoV3(showItemInfo) { // 01082022
    //console.log('showItemInfoV3 ---> ' + JSON.stringify(showItemInfo));
    var trueInfo = '';
    var likeButton = '';
    var starButton = '';
    var tagButton = '';
    var countShowButton = '';
    var videoDurationButton = '';
    var accessButton = '';
    var repostButton = '';
    var shareButton = '';
    //var accessIcon = '';
    var item_count_show = 0;
    var video_duration = '-';
    var likes_count = 0;
    var stars_count = 0;
    var tags_count = 0;
    var reposts_count = 0;
    var ext_links = '';
    if (!$.isEmptyObject(showItemInfo.item_count_show)) {
        //trueInfo += '<i class="fa fa-eye videme_item_info_icon"></i> ' + showItemInfo.item_count_show + ' ';
        item_count_show = showItemInfo.item_count_show;
    } /*else {
        trueInfo += '<i class="fa fa-eye videme_item_info_icon"></i> 0 ';
    }*/
    if (!$.isEmptyObject(showItemInfo.video_duration)) {
        //trueInfo += '<i class="fa fa-clock-o videme_item_info_icon"></i> ' + sec2str(showItemInfo.video_duration) + ' ';
        video_duration = sec2str(showItemInfo.video_duration);
    } /*else {
        trueInfo += '<i class="fa fa-clock-o videme_item_info_icon"></i> - ';
    }*/
    //if (!$.isEmptyObject(showItemInfo.access)) {
    /*if (showItemInfo.access == 'public')
        trueInfo += '<i class="fa fa fa-unlock"></i> ' + showItemInfo.access + ' ';
    if (showItemInfo.access == 'friends')
        trueInfo += '<i class="fa fa fa-users"></i> ' + showItemInfo.access + ' ';
    if (showItemInfo.access == 'private')
        trueInfo += '<i class="fa fa fa-unlock-alt"></i> ' + showItemInfo.access + ' ';*/
    //trueInfo += accessToIcon(showItemInfo) + '&nbsp;';
    //}
    if (!$.isEmptyObject(showItemInfo.likes_count)) {
        //trueInfo += '<i class="fa fa-thumbs-o-up videme_item_info_icon"></i> ' + showItemInfo.likes_count + ' ';
        likes_count = showItemInfo.likes_count;
    } /*else {
        //trueInfo += '<i class="fa fa-thumbs-o-up videme_item_info_icon"></i> 0 ';
        likes_count = 0;
    }*/
    if (!$.isEmptyObject(showItemInfo.stars_count)) {
        //trueInfo += '<i class="fa fa-thumbs-o-up videme_item_info_icon"></i> ' + showItemInfo.likes_count + ' ';
        stars_count = showItemInfo.stars_count;

    } /*else {
        //trueInfo += '<i class="fa fa-thumbs-o-up videme_item_info_icon"></i> 0 ';
        likes_count = 0;
    }*/
    if (stars_count > 0) {
        starButton = '<div class="videme-tile-v3-item_info_element"><i class="fa fa-star btn-link2 set_like2 videme-tile-v3-item_info_icon" stars_count="' + stars_count + '" item_id="' + showItemInfo.item_id + '" href="#" role="button"></i><div class="videme-tile-v3-item_info_val">' + stars_count + '</div></div>';
    }
    if (!$.isEmptyObject(showItemInfo.tags_conf)) {
        //trueInfo += '<i class="fa fa-thumbs-o-up videme_item_info_icon"></i> ' + showItemInfo.likes_count + ' ';
        tags_count = showItemInfo.tags_conf;

    } /*else {
        //trueInfo += '<i class="fa fa-thumbs-o-up videme_item_info_icon"></i> 0 ';
        likes_count = 0;
    }*/
    if (tags_count > 0) {
        tagButton = '<div class="videme-tile-v3-item_info_element"><i class="fa fa-hashtag btn-link2 set_like2 videme-tile-v3-item_info_icon" tags_count="' + tags_count + '" item_id="' + showItemInfo.item_id + '" href="#" role="button"></i><div class="videme-tile-v3-item_info_val">' + tags_count + '</div></div>';
    }
    if (!$.isEmptyObject(showItemInfo.reposts_count)) {
        //trueInfo += '<i class="fa fa-share-alt videme_item_info_icon"></i> ' + showItemInfo.reposts_count + ' ';
        reposts_count = showItemInfo.reposts_count;
    } /*else {
        trueInfo += '<i class="fa fa-share-alt videme_item_info_icon"></i> 0 ';
    }*/
    countShowButton = '<div class="videme-tile-v3-item_info_element"><i class="fa fa-eye"></i><div class="videme-tile-v3-item_info_val">' + nFormatter(item_count_show, 2) + '</div></div>';
    videoDurationButton = '<div class="videme-tile-v3-item_info_element"><i class="fa fa-clock-o"></i><div class="videme-tile-v3-item_info_val">' + video_duration + '</div></div>';
    //accessButton = '<div class="videme_item_info_element">' + accessToIcon(showItemInfo) + '</div>';

    if (!$.isEmptyObject(showItemInfo.actionUrlClass)) {

        if (showItemInfo.actionUrlClass == 'file-my-url' && showItemInfo.actionUrlClass == 'post-my-url') {
            accessButton = '<div class="videme-tile-v3-item_info_element">' + accessToIcon(showItemInfo) + '</div>';
        }
    }

    if (!$.isEmptyObject(showItemInfo.its_like)) {
        //likeButton = '<button type="button" class="btn btn-primary btn-sm set_like disabled" id="like_list-group_13_0" >You did like</button>';
        likeButton = '<div class="videme-tile-v3-item_info_element"><i class="fa fa-thumbs-up btn-link2 videme-tile-v3-item_info_icon" item_id="' + showItemInfo.item_id + '" href="#" role="button"></i><div class="videme-tile-v3-item_info_val">' + likes_count + '</div></div>';
    } else {
        //likeButton = '<button type="button" class="btn btn-primary btn-sm set_like" id="like_list-group_13_0" item_id="' + showItemInfo.item_id + '">Like</button>';
        likeButton = '<div class="videme-tile-v3-item_info_element"><i class="fa fa-thumbs-o-up btn-link2 set_like2 videme-tile-v3-item_info_icon" likes_count="' + likes_count + '" item_id="' + showItemInfo.item_id + '" href="#" role="button"></i><div class="videme-tile-v3-item_info_val">' + likes_count + '</div></div>';
    }


    repostButton = '<div class="videme-tile-v3-item_info_element"><a class="fa fa-retweet btn-link list-url videme-tile-v3-item_info_icon" item_id="' + showItemInfo.item_id + '" href="https://api.vide.me/v2/reposts/item/?item_id=' + showItemInfo.item_id + '&nad=' + $.cookie('vide_nad') + '" role="button"></a><div class="videme-tile-v3-item_info_val">' + reposts_count + '</div></div>';
    //console.log('showItemInfo repostButton ---> ' + repostButton);
    shareButton = '<div class="videme-tile-v3-item_info_element"><i class="fa fa-share btn-link share-to-fb-toggle videme-tile-v3-item_info_icon" item_id="' + showItemInfo.item_id + '"  data-toggle="modal" data-target="#modal-share-to-fb"></i><div class="videme-tile-v3-item_info_val"></div></div>';

    if (!$.isEmptyObject(showItemInfo.ext_links)) { // TODO: Dobble
        //console.log("showItemInfo ----->" + JSON.stringify(showItemInfo.ext_links));
        var links = '';
        array_ext_links = $.parseJSON(showItemInfo.ext_links);
        $.each(array_ext_links, function (key, value) {
            //console.log("$.fn.showcaseText tags -----> " + value);
            links += '<a href="' + value.link + '" target="_blank" class="badge badge-pill badge-primary">' + value.title + '</span>&nbsp;';
        });
        //ext_links = '<div class="videme_item_info_element"><i class="fa fa-external-link videme_item_info_icon" item_id="' + showItemInfo.item_id + '"><div class="videme_item_info_val">' + links + '</div></i></div>';
        ext_links = '<div class="videme-tile-v3-item_info_element">' + links + '</div>';
    }

    /*trueInfo += countShowButton + videoDurationButton + accessButton + likeButton +
        '&nbsp;'
        + repostButton +
        '&nbsp;' + shareButton;*/
    //console.log('showItemInfo trueInfo ---> ' + trueInfo);
    if (showItemInfo.embed) {
        return countShowButton + videoDurationButton + accessButton + ext_links;
    } else {
        //return countShowButton + videoDurationButton + accessButton + likeButton + repostButton + shareButton + ext_links;
        //return countShowButton + videoDurationButton + accessButton;
        //return starButton + countShowButton + videoDurationButton + accessButton;
        return countShowButton + tagButton + videoDurationButton + accessButton;
        //return starButton + countShowButton + likeButton + videoDurationButton + accessButton;
    }
    //return countShowButton + videoDurationButton + accessButton + likeButton + repostButton + shareButton + ext_links;
}

/* 01082022 function returnSetStarButton(returnSetStarButton) {
    return '<div class="videme_item_info_element_showcase">' +
        '<i class="fa fa-star btn-link videme_item_info_icon_showcase set_star" stars_count="' + returnSetStarButton.stars_count + '" item_id="' + returnSetStarButton.item_id + '" href="#" role="button" aria-hidden="true">' +
        '</i>' +
        '<div class="videme_item_info_val_showcase">' + returnSetStarButton.stars_count + '</div>' +
        '</div>';
}*/

/* 01082022 function returnSetStarButtonV3(returnSetStarButtonV3) {
    return '<a feedback="https://www.vide.me/v?i=' +
        returnSetStarButtonV3.item_id + '" class="btn btn-outline-primary btn-sm videme-round-button">' +
        '<i class="fa fa-star btn-link videme_item_info_icon_showcase set_star" stars_count="' + returnSetStarButtonV3.stars_count + '" item_id="' + returnSetStarButtonV3.item_id + '" href="#" role="button" aria-hidden="true">' +
        '</i>' +
        '<div class="videme_item_info_val_showcase-v3" id="videme-showcase-item-stars_count-val">' + returnSetStarButtonV3.stars_count + '</div></a>';
}*/

/* 01082022 function returnDeleteStarButtonV3(returnDeleteStarButtonV3) {
    return '<a feedback="https://www.vide.me/v?i=' +
        returnDeleteStarButtonV3.item_id + '" class="btn btn-outline-primary btn-sm videme-round-button">' +
        '<i class="fa fa-star btn-link videme_item_info_icon_showcase text-danger delete_star" stars_count="' + returnDeleteStarButtonV3.stars_count + '" item_id="' + returnDeleteStarButtonV3.item_id + '" href="#" role="button" aria-hidden="true">' +
        '</i>' +
        '<div class="text-danger videme_item_info_val_showcase-v3" id="videme-showcase-item-stars_count-val">' + returnDeleteStarButtonV3.stars_count + '</div></a>';
}*/

function returnSetFollowButtonV3(returnSetFollowButtonV3) { // 01082022 ???
    //console.info('returnSetFollowButtonV3 ' + JSON.stringify(returnSetFollowButtonV3));
    return '<a class="btn btn-sm btn-outline-success videme-relation-card-button-connect relation_connect" user_id="' + returnSetFollowButtonV3.owner_id + '" href="https://api.vide.me/v2/relation/connect/?user_id=' + returnSetFollowButtonV3.owner_id + '&nad=' + $.cookie('vide_nad') + '">Follow</a>';

}

/* 01082022 function returnDeleteStarButton(returnDeleteStarButton) {
    return '<div class="videme_item_info_element_showcase">' +
        '<i class="fa fa-star-o btn-link videme_item_info_icon_showcase delete_star" stars_count="' + returnDeleteStarButton.stars_count + '" item_id="' + returnDeleteStarButton.item_id + '" href="#" role="button" aria-hidden="true">' +
        '</i>' +
        '<div class="videme_item_info_val_showcase">' + returnDeleteStarButton.stars_count + '</div>' +
        '</div>';
}*/

/* 01082022 function returnSetLikeButton(returnSetLikeButton) {
    return '<div class="videme_item_info_element_showcase">' +
        '<i class="fa fa-thumbs-up btn-link videme_item_info_icon_showcase set_like_showcase" likes_count="' + returnSetLikeButton.likes_count + '" item_id="' + returnSetLikeButton.item_id + '" href="#" role="button" aria-hidden="true">' +
        '</i>' +
        '<div class="videme_item_info_val_showcase">' + returnSetLikeButton.likes_count + '</div>' +
        '</div>';
}*/

/* 01082022 function returnDeleteLikeButton(returnDeleteStarButton) {
    return '<div class="videme_item_info_element_showcase">' +
        '<i class="fa fa-thumbs-o-up btn-link videme_item_info_icon_showcase delete_like_showcase" likes_count="' + returnDeleteStarButton.likes_count + '" item_id="' + returnDeleteStarButton.item_id + '" href="#" role="button" aria-hidden="true">' +
        '</i>' +
        '<div class="videme_item_info_val_showcase">' + returnDeleteStarButton.likes_count + '</div>' +
        '</div>';
}*/

function showcaseTagsUsers(showcaseTagsSettings) { // 01082022
    //showcaseTagsSettings = $.extend({}, options);
    //if (!$.isEmptyObject(showcaseTagsSettings.tags)) {
    //var tags = [];
    //var html = [];
    //var oldTags = [];
    //if (!$.isEmptyObject(showcaseTagsSettings)) {
    console.log("$.fn.showcaseTagsUsers showcaseTagsSettings -----> " + JSON.stringify(showcaseTagsSettings));
    //console.log("$.fn.showcaseTagsUsers showItemTagsUsersSettings -----> " + JSON.stringify(showItemTagsUsersSettings));
    //console.log("$.fn.showcaseTagsUsers showItemTagsUsersSettings.tags -----> " + JSON.stringify(showItemTagsUsersSettings.tags));
    //var tagsOldArray = showItemTagsUsersSettings.tags;
    //console.log("$.fn.showcaseTagsUsers tagsOldArray -----> " + tagsOldArray);

    $(".videme-showcase-tags-item").removeClass('hidden'); // TODO: do <--------------------------------------
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
                $('.videme-showcase-tags-item_place').html(fShowcaseEachTagButtonAuth(showcaseTagsSettings, JSON_tags_my));
                if (!$.isEmptyObject(JSON_tags_my)) {
                    $('.videme-showcase-tags-user_place').html(fShowcaseEachMyTagButton(showcaseTagsSettings, JSON_tags_my));
                    $('.videme-showcase-tags-user').removeClass('hidden');
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
        $('.videme-showcase-tags-item_place').html(fShowcaseEachTagButton(showcaseTagsSettings));
    }

    /*} else {
        //console.log("$.fn.showcaseText showcaseTextSettings.tags -----> empty");
    }*/
    //return html;
};

function fShowcaseEachTagButton(showcaseEachTagButton) { // 01082022
    console.log("fShowcaseEachTagButton showcaseEachTagButton -----> " + JSON.stringify(showcaseEachTagButton));
    //console.log("fShowcaseEachTagButton showcaseEachTagButton.length -----> " + showcaseEachTagButton.length);

    var html = [];
    if (showcaseEachTagButton.length > 0) $('#videme-showcase-tags-item_count').html(showcaseEachTagButton.length + '&nbsp;');

    $.each(showcaseEachTagButton, function (key, value) {
        //$.each(concTags, function (key, value) {
        //console.log("$.fn.showcaseTagsUsers value -----> " + JSON.stringify(value));
        //$(".videme-showcase-tags").append('&nbsp;<a href="https://vide.me/search/?q=' + value + '" class="badge badge-primary">#' + value + '</span> ');
        //$(".videme-showcase-tags-users").append('&nbsp;<a href="https://vide.me/search/?q=' + value.tag + '" class="videme-sidebar-hot-tags">#' + value.tag + '</a> ');
        /*if (!$.isEmptyObject(value.its_tag)) {
            /!*html.push('<span class="badge badge-pill badge-primary videme-badge-tallent service1">' +
                value.tag +
                '<a class="delete_service_action" href="https://api.vide.me/v2/tags/delete/?item_id=' + value.item_id + 'tag=' + value.tag + '&nad=' + $.cookie('vide_nad') + '" tag="' + value.tag + '"><i class="fa fa-remove"></i>' + value.tags_count + '</a>' +
                '</span>');*!/
            html.push(returnDeleteTagButton(value));
        } else {
            //html.push('&nbsp;<a href="https://vide.me/search/?q=' + value.tag + '" class="videme-sidebar-hot-tags">#' + value.tag + '</a> ');
            /!*html.push('<span class="badge badge-pill badge-primary videme-badge-service service1">' +
                value.tag +
                '<a class="delete_service_action" href="https://api.vide.me/v2/tags/set/?item_id=' + value.item_id + 'tag=' + value.tag + '&nad=' + $.cookie('vide_nad') + '" tag="' + value.tag + '"><i class="fa fa-check-circle"></i>' + value.tags_count + '</a>' +
                '</span>');*!/
            html.push(returnSetTagButton(value));
        }*/
        html.push(returnSetTagButtonNOA(value));
    });
    return html;
}

function fShowcaseEachConfirmTagButton(ShowcaseEachConfirmTagButton) { // 01082022
    console.log("fShowcaseEachConfirmTagButton ShowcaseEachConfirmTagButton -----> " + JSON.stringify(ShowcaseEachConfirmTagButton));
    var html = [];
    $.each(ShowcaseEachConfirmTagButton, function (key, value) {
        html.push(returnConfirmTagButton(value));
    });
    return html;
}

function fShowcaseEachConfirmTagForSpringButton(ShowcaseEachConfirmTagForSpringButton) { // 01082022
    console.log("fShowcaseEachConfirmTagForSpringButton ShowcaseEachConfirmTagForSpringButton -----> " + JSON.stringify(ShowcaseEachConfirmTagForSpringButton));
    var html = [];
    $.each(ShowcaseEachConfirmTagForSpringButton, function (key, value) {
        html.push(returnConfirmTagForSpringButton(value));
    });
    return html;
}

function fShowcaseEachAllTagForSpringButton(ShowcaseEachAllTagForSpringButton, spring) { // 01082022
    console.log("fShowcaseEachAllTagForSpringButton ShowcaseEachAllTagForSpringButton -----> " + JSON.stringify(ShowcaseEachAllTagForSpringButton));
    var html = [];
    $.each(ShowcaseEachAllTagForSpringButton, function (key, value) {
        value.spring = spring;
        html.push(returnAllTagForSpringButton(value));
    });
    return html;
}

function fShowcaseEachMyTagButton(showcaseTagsSettings, showcaseEachMyTagButton) { // 01082022
    //console.log("fShowcaseEachMyTagButton showcaseEachMyTagButton -----> " + JSON.stringify(showcaseEachMyTagButton));
    var html = [];
    var alreadyTag = false;
    var newTagMy = true;
    var myTagStat = 'myTagNew' // myTagAlready, myTadEq
    //var showNewTag = false;
    /*$.each(showcaseEachMyTagButton, function (key, value) {
        value.item_id = showcaseTagsSettings[0].item_id;
        html.push(returnMyTagButton(value));
    });*/
    if (showcaseEachMyTagButton.length > 0) $('#videme-showcase-tags-user_count').html(showcaseEachMyTagButton.length + '&nbsp;');
    $.each(showcaseEachMyTagButton, function (key, value) {
        $.each(showcaseTagsSettings, function (key2, value2) {
            //console.log("fShowcaseEachMyTagButton fShowcaseEachTagButtonAuth value2 -----> " + JSON.stringify(value2));
            //console.log("fShowcaseEachMyTagButton showcaseTagsSettings -----> key " + key + " value.tag " + value.tag + ' key2 ' + key2 + ' value2.tag ' + value2.tag);
            //console.log("fShowcaseEachMyTagButton showcaseTagsSettings value2.its_tag -----> " + value2.its_tag + ' value2.tag ' + value2.tag + ' key2 ' + key2);
            if (value.tag == value2.tag) {
                //if (value2.its_tag && value2.its_tag !== 'null' && value2.its_tag !== null) {
                if (value2.its_tag !== null) {
                    alreadyTag = true;
                    newTagMy = false;
                    //console.log("fShowcaseEachMyTagButton alreadyTag -----> " + alreadyTag + " tag: " + value.tag + ' value2.its_tag ' + value2.its_tag);
                    myTagStat = 'myTagAlready';
                    return false;
                } else {
                    alreadyTag = false;
                    newTagMy = true;
                    myTagStat = 'myTadEq';
                    return false;
                }
            } else {
                /*newTagMy = true;
                if (value2.its_tag !== null) {
                    alreadyTag = true;
                    console.log("fShowcaseEachMyTagButton alreadyTag -----> " + alreadyTag + " tag: " + value.tag + ' value2.its_tag ' + value2.its_tag);
                    return false;
                }
                return false;*/
            }

        });
        //console.log("fShowcaseEachMyTagButton showcaseEachMyTagButton value -----> " + JSON.stringify(value));
        //console.log("fShowcaseEachMyTagButton showcaseEachMyTagButton value.tag -----> " + JSON.stringify(value.tag) + ' newTagMy ' + newTagMy);
        //console.log("fShowcaseEachMyTagButton showcaseEachMyTagButton value.tag -----> " + JSON.stringify(value.tag) + ' alreadyTag ' + alreadyTag);
        value.item_id = showcaseTagsSettings[0].item_id;
        value.tags_count = value.tag_count;
        //console.log("fShowcaseEachMyTagButton myTagStat -----> " + myTagStat + " tag: " + value.tag);

        /*if (newTagMy) {
            html.push(returnMyTagButton(value));
        } else {*/
        /*if (alreadyTag == true) {
            html.push(returnBanTagButton(value));
            //html.push(returnMyTagButton(value));
        } else {
            //showNewTag = true;
            //html.push(returnSetTagButton(value)); // TODO: nooo
        }
    if (newTagMy) {
        html.push(returnMyTagButton(value));
    } else {
        //if (!showNewTag) {
        if (alreadyTag !== true) {
            html.push(returnSetTagButton(value)); // TODO: nooo
        }
        //}
    }*/
        //}
        if (value.tags_count > 0) {
            switch (myTagStat) {
                case 'myTagAlready':
                    //html.push(returnBanTagButton(value));
                    html.push(returnDeleteTagButton(value));
                    break;
                case 'myTadEq':
                    //html.push(returnSetTagButton(value));
                    //html.push(returnMyTagButton(value));
                    html.push(returnMyTagButtonEq(value));
                    break;
                default:
                    html.push(returnMyTagButton(value));
            }
        }
        alreadyTag = false;
        newTagMy = true;
        var myTagStat = 'myTagNew' // myTagAlready, myTadEq
        //showNewTag = false;
    });
    return html;
}

function fShowcaseEachTagButtonAuth(showcaseEachTagButtonAuth, fShowcaseEachTagButtonAuth) { // 01082022
    var html = [];
    var canTag = false;
    //console.log("fShowcaseEachTagButtonAuth fShowcaseEachTagButtonAuth -----> " + JSON.stringify(fShowcaseEachTagButtonAuth));
    if (showcaseEachTagButtonAuth.length > 0) $('#videme-showcase-tags-item_count').html(showcaseEachTagButtonAuth.length + '&nbsp;');
    $.each(showcaseEachTagButtonAuth, function (key, value) {
        $.each(fShowcaseEachTagButtonAuth, function (key, value2) {
            //console.log("fShowcaseEachTagButtonAuth fShowcaseEachTagButtonAuth value2 -----> " + JSON.stringify(value2));
            //console.log("fShowcaseEachTagButtonAuth fShowcaseEachTagButtonAuth value2,tag -----> " + value2.tag);
            if (value.tag == value2.tag) {
                canTag = true;
                //console.log("fShowcaseEachTagButtonAuth canTag -----> " + canTag + " tag: " + value.tag);
                return false;
            }
        });
        //console.log("fShowcaseEachTagButtonAuth canTag -----> " + canTag);

        //$(".videme-showcase-tags").append('&nbsp;<a href="https://vide.me/search/?q=' + value + '" class="badge badge-primary">#' + value + '</span> ');
        //$(".videme-showcase-tags-users").append('&nbsp;<a href="https://vide.me/search/?q=' + value.tag + '" class="videme-sidebar-hot-tags">#' + value.tag + '</a> ');
        if (!$.isEmptyObject(value.its_tag)) {
            /*html.push('<span class="badge badge-pill badge-primary videme-badge-tallent service1">' +
                value.tag +
                '<a class="delete_service_action" href="https://api.vide.me/v2/tags/delete/?item_id=' + value.item_id + 'tag=' + value.tag + '&nad=' + $.cookie('vide_nad') + '" tag="' + value.tag + '"><i class="fa fa-remove"></i>' + value.tags_count + '</a>' +
                '</span>');*/
            html.push(returnDeleteTagButton(value));
        } else {
            //console.log("fShowcaseEachTagButtonAuth each1 canTag -----> " + canTag);
            //html.push('&nbsp;<a href="https://vide.me/search/?q=' + value.tag + '" class="videme-sidebar-hot-tags">#' + value.tag + '</a> ');
            /*html.push('<span class="badge badge-pill badge-primary videme-badge-service service1">' +
                value.tag +
                '<a class="delete_service_action" href="https://api.vide.me/v2/tags/set/?item_id=' + value.item_id + 'tag=' + value.tag + '&nad=' + $.cookie('vide_nad') + '" tag="' + value.tag + '"><i class="fa fa-check-circle"></i>' + value.tags_count + '</a>' +
                '</span>');*/
            if (canTag) {
                /*if (value.tags_count > 0)*/
                html.push(returnSetTagButton(value));
            } else {
                html.push(returnBanTagButton(value));
            }
        }
        canTag = false;
    });
    return html;
}

function fShowcaseEachEarnedTagButton(ShowcaseEachEarnedTagButton) { // 01082022
    console.log("fShowcaseEachEarnedTagButton ShowcaseEachEarnedTagButton -----> " + JSON.stringify(ShowcaseEachEarnedTagButton));
    var html = [];
    $.each(ShowcaseEachEarnedTagButton, function (key, value) {
        html.push(returnEarnedTagButton(value));
    });
    return html;
}

function returnSetTagButton(returnSetTagButtonSettings) { // 01082022
    return '<span class="badge badge-pill badge-primary videme-badge-tag videme-badge-tag-set service1" id="videme-showcase-tag-badge_' + returnSetTagButtonSettings.tag + '">#' +
        returnSetTagButtonSettings.tag +
        '<i class="fa fa-check-circle btn-link videme-showcase-tag-btn-icon set_tag_showcase" id="videme-showcase-tag-btn_' + returnSetTagButtonSettings.tag + '" item_id="' + returnSetTagButtonSettings.item_id + '" tag="' + returnSetTagButtonSettings.tag + '" tags_count="' + returnSetTagButtonSettings.tags_count + '" href="#" role="button" aria-hidden="true"></i>' +
        '<div class="videme-showcase-tag-proress-place" id="videme-showcase-tag-progress-place_' + returnSetTagButtonSettings.tag + '"></div><div class="videme-badge-tag-count" id="videme-showcase-tag-count_' + returnSetTagButtonSettings.tag + '">' + returnSetTagButtonSettings.tags_count + '</div>' +
        '</span>';
}

function returnSetTagButtonNOA(returnSetTagButtonSettingsNOA) { // 01082022
    return '<span class="badge badge-pill badge-primary videme-badge-tag videme-badge-tag-set-noa service1" id="videme-showcase-tag-badge_' + returnSetTagButtonSettingsNOA.tag + '">#' +
        returnSetTagButtonSettingsNOA.tag +
        '<i class="fa fa-check-circle-o btn-link videme-showcase-tag-btn-icon set_tag_noa_showcase" id="videme-showcase-tag-btn_' + returnSetTagButtonSettingsNOA.tag + '" item_id="' + returnSetTagButtonSettingsNOA.item_id + '" tag="' + returnSetTagButtonSettingsNOA.tag + '" tags_count="' + returnSetTagButtonSettingsNOA.tags_count + '" href="#" role="button" aria-hidden="true"></i>' +
        '<div class="videme-showcase-tag-proress-place" id="videme-showcase-tag-progress-place_' + returnSetTagButtonSettingsNOA.tag + '"></div><div class="videme-badge-tag-count" id="videme-showcase-tag-count_' + returnSetTagButtonSettingsNOA.tag + '">' + returnSetTagButtonSettingsNOA.tags_count + '</div>' +
        '</span>';
}

function returnBanTagButton(returnBanTagButtonSettings) { // 01082022
    return '<span class="badge badge-pill badge-primary videme-badge-tag videme-badge-tag-ban service1" id="videme-showcase-tag-badge_' + returnBanTagButtonSettings.tag + '">#' +
        returnBanTagButtonSettings.tag +
        '<i class="fa fa-ban btn-link videme-showcase-tag-btn-icon ban_tag_showcase" id="videme-showcase-tag-btn_' + returnBanTagButtonSettings.tag + '" item_id="' + returnBanTagButtonSettings.item_id + '" tag="' + returnBanTagButtonSettings.tag + '" tags_count="' + returnBanTagButtonSettings.tags_count + '" href="#" role="button" aria-hidden="true"></i><div class="videme-badge-tag-count" id="videme-showcase-tag-count_' + returnBanTagButtonSettings.tag + '">' + returnBanTagButtonSettings.tags_count + '</div>' +
        '</span>';
}

function returnDeleteTagButton(returnDeleteTagButtonSettings) { // 01082022
    //console.log("returnDeleteTagButtonSettings returnDeleteTagButtonSettings -----> " + JSON.stringify(returnDeleteTagButtonSettings));
    return '<span class="badge badge-pill badge-primary videme-badge-tag videme-badge-tag-delete service1" id="videme-showcase-tag-badge_' + returnDeleteTagButtonSettings.tag + '">#' +
        returnDeleteTagButtonSettings.tag +
        '<i class="fa fa-remove btn-link videme-showcase-tag-btn-icon delete_tag_showcase" id="videme-showcase-tag-btn_' + returnDeleteTagButtonSettings.tag + '" item_id="' + returnDeleteTagButtonSettings.item_id + '" tag="' + returnDeleteTagButtonSettings.tag + '" tags_count="' + returnDeleteTagButtonSettings.tags_count + '" href="#" role="button" aria-hidden="true"></i><div class="videme-badge-tag-count" id="videme-showcase-tag-count_' + returnDeleteTagButtonSettings.tag + '">' + returnDeleteTagButtonSettings.tags_count + '</div>' +
        '</span>';
}

function returnMyTagButton(returnMyTagButtonSettings) { // 01082022
    return '<span class="badge badge-pill badge-primary videme-badge-tag videme-badge-tag-my service1" id="videme-showcase-tag-my-badge_' + returnMyTagButtonSettings.tag + '">#' +
        returnMyTagButtonSettings.tag +
        '<i class="fa fa-arrow-up btn-link videme-showcase-tag-btn-icon set_tag_my_showcase" id="videme-showcase-tag-my-btn_' + returnMyTagButtonSettings.tag + '" item_id="' + returnMyTagButtonSettings.item_id + '" tag="' + returnMyTagButtonSettings.tag + '" tags_count="' + returnMyTagButtonSettings.tag_count + '" href="#" role="button" aria-hidden="true"></i>' +
        '<div class="videme-showcase-tag-proress-place" id="videme-showcase-tag-my-progress-place_' + returnMyTagButtonSettings.tag + '"></div><div class="videme-badge-tag-count" id="videme-showcase-tag-my-count_' + returnMyTagButtonSettings.tag + '">' + returnMyTagButtonSettings.tag_count + '</div>' +
        '</span>';
}

function returnMyTagButtonEq(returnMyTagButtonSettings) { // 01082022
    return '<span class="badge badge-pill badge-primary videme-badge-tag videme-badge-tag-my-eq service1" id="videme-showcase-tag-my-badge_' + returnMyTagButtonSettings.tag + '">#' +
        returnMyTagButtonSettings.tag +
        '<i class="fa fa-check-circle-o btn-link videme-showcase-tag-btn-icon set_tag_showcase" id="videme-showcase-tag-my-btn_' + returnMyTagButtonSettings.tag + '" item_id="' + returnMyTagButtonSettings.item_id + '" tag="' + returnMyTagButtonSettings.tag + '" tags_count="' + returnMyTagButtonSettings.tag_count + '" href="#" role="button" aria-hidden="true"></i>' +
        '<div class="videme-showcase-tag-proress-place" id="videme-showcase-tag-my-progress-place_' + returnMyTagButtonSettings.tag + '"></div><div class="videme-badge-tag-count" id="videme-showcase-tag-my-count_' + returnMyTagButtonSettings.tag + '">' + returnMyTagButtonSettings.tag_count + '</div>' +
        '</span>';
}

function returnConfirmTagButton(returnConfirmTagButtonSettings) { // 01082022
    return '<span class="badge badge-pill badge-primary videme-badge-tag videme-badge-tag-my service1" id="videme-showcase-tag-my-badge_' + returnConfirmTagButtonSettings.tag + '">#' +
        returnConfirmTagButtonSettings.tag +
        '<i class="btn-link videme-showcase-tag-btn-icon show_tag_items_showcase" id="videme-showcase-tag-my-btn_' + returnConfirmTagButtonSettings.tag + '" item_id="' + returnConfirmTagButtonSettings.item_id + '" tag="' + returnConfirmTagButtonSettings.tag + '" tags_count="' + returnConfirmTagButtonSettings.tag_count + '" href="#" role="button" aria-hidden="true">+</i>' +
        '<div class="videme-showcase-tag-proress-place" id="videme-showcase-tag-my-progress-place_' + returnConfirmTagButtonSettings.tag + '"></div><div class="videme-badge-tag-count" id="videme-showcase-tag-my-count_' + returnConfirmTagButtonSettings.tag + '">' + returnConfirmTagButtonSettings.tag_count + '</div>' +
        '</span>';
}

function returnConfirmTagForSpringButton(returnConfirmTagForSpringButtonSettings) { // 01082022
    return '<span class="badge badge-pill badge-primary videme-badge-tag videme-badge-tag-my service1" id="videme-showcase-tag-my-badge_' + returnConfirmTagForSpringButtonSettings.tag + '">#' +
        returnConfirmTagForSpringButtonSettings.tag +
        '<i class="btn-link videme-showcase-tag-btn-icon show_tag_items_for_spring" id="videme-showcase-tag-my-btn_' + returnConfirmTagForSpringButtonSettings.tag + '" item_id="' + returnConfirmTagForSpringButtonSettings.item_id + '" tag="' + returnConfirmTagForSpringButtonSettings.tag + '" tags_count="' + returnConfirmTagForSpringButtonSettings.tag_count + '" href="#" role="button" aria-hidden="true">+</i>' +
        '<div class="videme-showcase-tag-proress-place" id="videme-showcase-tag-my-progress-place_' + returnConfirmTagForSpringButtonSettings.tag + '"></div><div class="videme-badge-tag-count" id="videme-showcase-tag-my-count_' + returnConfirmTagForSpringButtonSettings.tag + '">' + returnConfirmTagForSpringButtonSettings.tag_count + '</div>' +
        '</span>';
}

function returnAllTagForSpringButton(returnAllTagForSpringButtonSettings) { // 01082022
    console.log("returnAllTagForSpringButton ----->" + JSON.stringify(returnAllTagForSpringButtonSettings));
    return '<a class="badge badge-pill badge-primary videme-badge-tag videme-badge-tag-my service1" id="videme-showcase-tag-my-badge_' + returnAllTagForSpringButtonSettings.tag + '" href="https://www.vide.me/' + returnAllTagForSpringButtonSettings.spring + '/?tag=' + returnAllTagForSpringButtonSettings.tag + '">#' +
        returnAllTagForSpringButtonSettings.tag +
        '<i class="btn-link videme-showcase-tag-btn-icon show_tag_items_for_spring_action" id="videme-showcase-tag-my-btn_' + returnAllTagForSpringButtonSettings.tag + '" item_id="' + returnAllTagForSpringButtonSettings.item_id + '" tag="' + returnAllTagForSpringButtonSettings.tag + '" tags_count="' + returnAllTagForSpringButtonSettings.tag_count + '" href="https://www.vide.me/' + returnAllTagForSpringButtonSettings.spring + '/?tag=' + returnAllTagForSpringButtonSettings.tag + '" role="button" aria-hidden="true"></i>' +
        '<div class="videme-showcase-tag-proress-place" id="videme-showcase-tag-my-progress-place_' + returnAllTagForSpringButtonSettings.tag + '"></div><div class="videme-badge-tag-count" id="videme-showcase-tag-my-count_' + returnAllTagForSpringButtonSettings.tag + '">' + returnAllTagForSpringButtonSettings.tag_count + '</div>' +
        '</a>';
}

function returnEarnedTagButton(returnEarnedTagButtonSettings) { // 01082022
    return '<span class="badge badge-pill badge-primary videme-badge-tag videme-badge-tag-my service1" id="videme-showcase-tag-my-badge_' + returnEarnedTagButtonSettings.tag + '">#' +
        returnEarnedTagButtonSettings.tag +
        '<i class="btn-link show_tag_items_showcase" id="videme-showcase-tag-my-btn_' + returnEarnedTagButtonSettings.tag + '" item_id="' + returnEarnedTagButtonSettings.item_id + '" tag="' + returnEarnedTagButtonSettings.tag + '" tags_count="' + returnEarnedTagButtonSettings.tag_count + '" href="#" role="button" aria-hidden="true"></i>' +
        '<div class="videme-showcase-tag-proress-place" id="videme-showcase-tag-my-progress-place_' + returnEarnedTagButtonSettings.tag + '"></div><div class="videme-badge-tag-count" id="videme-showcase-tag-my-count_' + returnEarnedTagButtonSettings.tag + '">' + returnEarnedTagButtonSettings.tag_count + '</div>' +
        '</span>';
}

function returnLinkTagButtonNOA(returnLinkTagButtonSettingsNOA) { // 01082022
    return '<a href="https://www.vide.me/search/?q=' + returnLinkTagButtonSettingsNOA.tag + '" class="badge badge-pill badge-primary videme-badge-tag videme-badge-tag-link-noa service1" id="videme-showcase-tag-badge_' + returnLinkTagButtonSettingsNOA.tag + '">#' +
        returnLinkTagButtonSettingsNOA.tag +
        '</a>';
}

/*function returnSetRepostButton(returnSetRepostButton) {
    return '<div class="videme_item_info_element_showcase">' +
        '<i class="fa fa-retweet btn-link videme-showcase-tag-btn-icon videme_item_info_icon_showcase set_repost_showcase" reposts_count="' + returnSetRepostButton.reposts_count + '" item_id="' + returnSetRepostButton.item_id + '" href="#" role="button" aria-hidden="true">' +
        '</i>' +
        '<div class="videme_item_info_val_showcase">' + returnSetRepostButton.reposts_count + '</div>' +
        '</div>';
}*/

function returnSetRepostButtonV3(returnSetRepostButtonV3) { // 01082022 add to web, not used
    return '<a feedback="https://www.vide.me/v?i=' +
        returnSetRepostButtonV3.item_id + '" class="btn btn-outline-primary btn-sm videme-round-button">' +
        '<i class="fa fa-retweet btn-link videme-showcase-tag-btn-icon videme_item_info_icon_showcase set_repost_showcase" reposts_count="' + returnSetRepostButtonV3.reposts_count + '" item_id="' + returnSetRepostButtonV3.item_id + '" href="#" role="button" aria-hidden="true">' +
        '</i>' +
        '<div class="videme_item_info_val_showcase-v3" id="videme-showcase-item-reposts_count-val">' + returnSetRepostButtonV3.reposts_count + '</div></a>';
}

/* 01082022 function returnShareButton(returnSetRepostButton) {
    return '<div class="videme_item_info_element_showcase">' +
        '<i class="fa fa-share btn-link videme-showcase-tag-btn-icon videme_item_info_icon_showcase share-to-fb-toggle" item_id="' + returnSetRepostButton.item_id + '" href="#" role="button" aria-hidden="true"' +
        '  data-toggle="modal" data-target="#modal-share-to-fb">' +
        '</i>' +
        '</div>';
}*/

function sec2str(t) { // 01082022
    var d = Math.floor(t / 86400),
        h = ('0' + Math.floor(t / 3600) % 24).slice(-2),
        m = ('0' + Math.floor(t / 60) % 60).slice(-2),
        s = ('0' + t % 60).slice(-2);
    //return (d>0?d+'d ':'')+(h>0?h+':':'')+(m>0?m+':':'')+(t>60?s:s+'s');
    return (d > 0 ? d + 'd ' : '') + (h > 0 ? h + ':' : '') + (m > 0 ? m + ':' : '') + (t > 60 ? s : s + 's');
}

function parseMyTaskForDoorbellSign(parseMyTaskForDoorbellSign) {  // 26072022 ???? showMyTaskActive ?
    console.log("parseMyTaskForDoorbellSign");
    //console.log("parseMyTaskForDoorbellSign ----->" + JSON.stringify(parseMyTaskForDoorbellSign));
    //if ($.isPlainObject(parseMyTaskForDoorbellSign)) {
    let newArray = [];
    let newArrayTrue = [];

    $.each(parseMyTaskForDoorbellSign, function (key, value) {
        //console.log("parseMyTaskForDoorbellSign -----> $.each(parseMyTaskForDoorbellSign", JSON.stringify(value));
        //console.log("parseMyTaskForDoorbellSign value.task_type -----> ", value.task_type);
        //var trueUserInfo = paddingUserInfo(value);

        var taskImage = '',
            taskIcon = '',
            percentage = '',
            task_status = 'test',
            title = 'Uploading process',
            count = '';
        if (!$.isEmptyObject(value)) {

            if (!$.isEmptyObject(value.task_type)) {
                if (value.task_type == 'fileUploadVideoPre') {
                    taskIcon = 'cloud-upload';
                }
                /*if (value.task_type == 'fileUploadVideo_force_mp4') {
                    taskIcon = 'clock-o';
                }*/
                //if (value.task_type == 'fileUploadVideo' || value.task_type == 'fileUploadVideoTest') {
                if (value.task_type == 'fileUploadVideo' || value.task_type == 'fileUploadVideo_force_mp4') {
                    //console.log("parseMyTaskForDoorbellSign -----> value.task_type", value.task_type);

                    if (value.task_status == 'awaiting') {
                        taskIcon = 'clock-o';
                    }
                    if (value.task_status == 'worked') {
                        taskIcon = 'cogs';
                    }
                }
                if (value.task_type == 'fileSendToS3') {
                    if (value.task_status == 'success') {
                        taskImage = value.task_item_id + '.jpg';
                    }
                    if (value.task_status == 'awaiting') {
                        taskIcon = 'cloud-upload';
                    }
                }
                /*if (value.task_type == 'fileSendBases') {
                    if (value.task_status == 'success') {
                        taskImage = value.task_item_id + '.jpg';
                    } else {
                        taskIcon = 'external-link-square';
                    }
                }*/
                //if (!$.isEmptyObject(value.task_status)) {
                //if (value.task_status) {
                if (value.task_status == 'awaiting') {
                    //taskIcon = 'clock-o';
                    task_status == 'awaiting';
                }
                if (value.task_status == 'worked') {
                    //taskImage = 'https://lh3.googleusercontent.com/Q-TyP-0iMexxAQDt7N81PLjLCrkoBkZVuSxP_1laOHxmctHhwJKsOXC9DYeBGXs8NIM=w300';
                    //taskIcon = 'cogs';
                    task_status == 'worked';
                }
                if (value.task_status == 'success') { // TODO: remove
                    taskImage = value.task_item_id + '.jpg';
                }
                if (value.task_status == 'error') {
                    taskIcon = 'frown-o';
                    task_status == 'error';
                }
                //}
                if (!$.isEmptyObject(value.percentage)) {
                    if (value.percentage < 98) percentage = '(' + value.percentage + '%) ';
                }
                if (!$.isEmptyObject(value.title)) {
                    title = value.title;
                }
            }
        }
        // itemTileElementCardA(tempObject, key, value, actionUrlClass, href, img, user_display_name, post_spring, post_user_picture, video_thumbnail, item_type, post_user_display_name)
        /*parseMyTaskForDoorbellSign[key] = {
            //'a': value.ToUserName,
            'image': taskImage,
            'icon': taskIcon,
            'task_id': value.task_id,
            'task_status': value.task_status,
            'task_type': value.task_type,
            'percentage': value.percentage,
            'cover': '',
            'title': percentage + ' ' + title,
            'access': value.access,
            /!*'href': value.title,*!/
            'href': value.task_item_id,
            'additional': value.task_status,
            //'count': sec2str(value.video_duration),
            //'date': value.created_at,
            'count': timeToWord(value.created_at),
            'buttons': {'button': 'del_task'},
            'key': key,
            'img': taskImage
        };*/
        /*newArray.push(key, value);
        $.each(parseMyTaskForDoorbellSign, function (key2, value2) {
            newArrayTrue.push(key2, value2);
        });*/
        //parseMyTaskForDoorbellSign.buttons = {'button': 'del_task'};
        parseMyTaskForDoorbellSign[key].item_id = value.task_item_id;
        /*parseMyTaskForDoorbellSign[key].image = taskImage;
        parseMyTaskForDoorbellSign[key].icon = taskIcon;
        parseMyTaskForDoorbellSign[key].task_id = taskIcon;
        parseMyTaskForDoorbellSign[key].buttons = {'button': 'del_task'};*/
    });
    /*} else {
        console.error("parseMyTaskForDoorbellSign -----> not plaint object " + parseMyTaskForDoorbellSign);
    }*/
    //delete parseSignsForDoorbellSign.results;
    //console.log("parseSignsForDoorbellSign ----->" + JSON.stringify(parseMyTaskForDoorbellSign));
    //console.log("parseSignsForDoorbellSign newArray ----->" + JSON.stringify(newArrayTrue));
    parseMyTaskForDoorbellSign.forEach(object => {
        object.buttons = {'button': 'del_task'};
    });
    //console.log("parseMyTaskForDoorbellSign parseMyTaskForDoorbellSign ----->" + JSON.stringify(parseMyTaskForDoorbellSign));
    return parseMyTaskForDoorbellSign;
}

function parseMyChartItemsForDoorbellSign(parseMyChartItemsForDoorbellSign) {  // 01082022 recreate
    console.log("parseMyChartItemsForDoorbellSign parseMyChartItemsForDoorbellSign ----->" + JSON.stringify(parseMyChartItemsForDoorbellSign));
    parseMyChartItemsForDoorbellSign.forEach(object => {
        object.buttons = {
            'button': 'chart_item_mel_toggle'
        };
        object.footer = {
            'second_line': 'chart_item_mel_toggle'
        };
    });
    //console.log("parseMyTaskForDoorbellSign parseMyTaskForDoorbellSign ----->" + JSON.stringify(parseMyTaskForDoorbellSign));
    return parseMyChartItemsForDoorbellSign;
}

function parseItemsForDoorbellSign(parseItemsForDoorbellSign) {
    //console.log("parseMyTaskForDoorbellSign ----->" + JSON.stringify(parseMyTaskForDoorbellSign));
    //if ($.isPlainObject(parseMyTaskForDoorbellSign)) {
    $.each(parseItemsForDoorbellSign, function (key, value) {
        //console.log("parseMyTaskForDoorbellSign -----> $.each(parseMyTaskForDoorbellSign", JSON.stringify(value));
        //console.log("parseMyTaskForDoorbellSign value.task_type -----> ", value.task_type);

        var taskImage = '',
            taskIcon = '',
            percentage = '',
            task_status = 'test',
            title = 'Uploading process',
            count = '';
        if (!$.isEmptyObject(value)) {

            if (!$.isEmptyObject(value.task_type)) {
                if (value.task_type == 'fileUploadVideoPre') {
                    taskIcon = 'cloud-upload';
                }
                /*if (value.task_type == 'fileUploadVideo_force_mp4') {
                    taskIcon = 'clock-o';
                }*/
                //if (value.task_type == 'fileUploadVideo' || value.task_type == 'fileUploadVideoTest') {
                if (value.task_type == 'fileUploadVideo' || value.task_type == 'fileUploadVideo_force_mp4') {
                    //console.log("parseMyTaskForDoorbellSign -----> value.task_type", value.task_type);

                    if (value.task_status == 'awaiting') {
                        taskIcon = 'clock-o';
                    }
                    if (value.task_status == 'worked') {
                        taskIcon = 'cogs';
                    }
                }
                if (value.task_type == 'fileSendToS3') {
                    if (value.task_status == 'success') {
                        taskImage = value.task_item_id + '.jpg';
                    }
                    if (value.task_status == 'awaiting') {
                        taskIcon = 'cloud-upload';
                    }
                }
                /*if (value.task_type == 'fileSendBases') {
                    if (value.task_status == 'success') {
                        taskImage = value.task_item_id + '.jpg';
                    } else {
                        taskIcon = 'external-link-square';
                    }
                }*/
                //if (!$.isEmptyObject(value.task_status)) {
                //if (value.task_status) {
                if (value.task_status == 'awaiting') {
                    //taskIcon = 'clock-o';
                    task_status == 'awaiting';
                }
                if (value.task_status == 'worked') {
                    //taskImage = 'https://lh3.googleusercontent.com/Q-TyP-0iMexxAQDt7N81PLjLCrkoBkZVuSxP_1laOHxmctHhwJKsOXC9DYeBGXs8NIM=w300';
                    //taskIcon = 'cogs';
                    task_status == 'worked';
                }
                if (value.task_status == 'success') { // TODO: remove
                    taskImage = value.task_item_id + '.jpg';
                }
                if (value.task_status == 'error') {
                    taskIcon = 'frown-o';
                    task_status == 'error';
                }
                //}
                if (!$.isEmptyObject(value.percentage)) {
                    if (value.percentage < 98) percentage = '(' + value.percentage + '%) ';
                }
                if (!$.isEmptyObject(value.title)) {
                    title = value.title;
                }
            }
        }
        // itemTileElementCardA(tempObject, key, value, actionUrlClass, href, img, user_display_name, post_spring, post_user_picture, video_thumbnail, item_type, post_user_display_name)
        parseItemsForDoorbellSign[key] = {
            //'a': value.ToUserName,
            'image': taskImage,
            'icon': taskIcon,
            'task_id': value.task_id,
            'task_status': value.task_status,
            'task_type': value.task_type,
            'percentage': value.percentage,
            'cover': '',
            'title': percentage + ' ' + title,
            'access': value.access,
            /*'href': value.title,*/
            'href': value.task_item_id,
            'additional': value.task_status,
            //'count': sec2str(value.video_duration),
            //'date': value.created_at,
            'count': timeToWord(value.created_at),
            'buttons': {'button': 'del_task'},
            'key': key,
            'img': taskImage
        };

    });
    /*} else {
        console.error("parseMyTaskForDoorbellSign -----> not plaint object " + parseMyTaskForDoorbellSign);
    }*/
    //delete parseSignsForDoorbellSign.results;
    //console.log("parseSignsForDoorbellSign ----->" + JSON.stringify(parseMyTaskForDoorbellSign));
    return parseItemsForDoorbellSign;
}

/* 01082022 function parseMyStarredForDoorbellSign(parseMyStarredForDoorbellSign) {
    //console.log("parseMyTaskForDoorbellSign ----->" + JSON.stringify(parseMyTaskForDoorbellSign));
    //if ($.isPlainObject(parseMyTaskForDoorbellSign)) {
    $.each(parseMyStarredForDoorbellSign, function (key, value) {
        //console.log("parseMyTaskForDoorbellSign -----> $.each(parseMyTaskForDoorbellSign", JSON.stringify(value));
        if (!$.isEmptyObject(value.cover)) {
            img = value.cover;
        } else {
            img = value.item_id + ".jpg";
        }
        parseMyStarredForDoorbellSign[key] = {
            //'a': value.ToUserName,
            'image': img,
            //'icon': taskIcon,
            'item_id': value.item_id,
            //'task_status': value.task_status,
            //'task_type': value.task_type,
            //'percentage': value.percentage,
            //'cover': '',
            'title': value.title,
            'access': value.access,
            /!*'href': value.title,*!/
            //'additional': value.task_status,
            //'count': sec2str(value.video_duration),
            //'date': value.created_at,
            'stars_count': value.stars_count,
            'count': timeToWord(value.star_created_at),
            'buttons': {'button': 'del_star'}
        };

    });
    return parseMyStarredForDoorbellSign;
}*/

function parseMyTaggedForDoorbellSign(parseMyTaggedForDoorbellSign) { // 01082022
    //console.log("parseMyTaggedForDoorbellSign ----->" + JSON.stringify(parseMyTaggedForDoorbellSign));
    //if ($.isPlainObject(parseMyTaskForDoorbellSign)) {
    /*$.each(parseMyTaggedForDoorbellSign, function (key, value) {
        //console.log("parseMyTaggedForDoorbellSign -----> $.each(parseMyTaggedForDoorbellSign value.tag ", value.tag);
        if (!$.isEmptyObject(value.cover)) {
            img = value.cover;
        } else {
            img = value.item_id + ".jpg";
        }
        parseMyTaggedForDoorbellSign[key] = {
            //'a': value.ToUserName,
            'image': img,
            //'icon': taskIcon,
            'item_id': value.item_id,
            //'task_status': value.task_status,
            //'task_type': value.task_type,
            //'percentage': value.percentage,
            //'cover': '',
            'title': value.title,
            //'access': value.access,
            'tag': value.tag,
            /!*'href': value.title,*!/
            //'additional': value.task_status,
            //'count': sec2str(value.video_duration),
            //'date': value.created_at,
            //'stars_count': value.stars_count,
            //'count': value.tags_count,
            'tags_count': '',
            'count': timeToWord(value.tag_created_at),
            'buttons': {'button': 'del_tag'}
        };
        //parseMyTaggedForDoorbellSign[key].buttons = "{'button': 'del_tag'}";
        //parseMyTaggedForDoorbellSign[key].push({'buttons': {'button': 'del_tag'}});
        //parseMyTaggedForDoorbellSign.push({'buttons': {'button': 'del_tag'}});
        //parseMyTaggedForDoorbellSign.buttons = {'button': 'del_tag'};

    });*/
    /* etalon array adding key */
    //const arr = [{id: 1}, {id: 2}];
    parseMyTaggedForDoorbellSign.forEach(object => {
        object.buttons = {'button': 'del_tag'};
    });

    return parseMyTaggedForDoorbellSign;
}

/* 01082022 function parseMyLikesForDoorbellSign(parseMyLikesForDoorbellSign) {
    //console.log("parseMyTaskForDoorbellSign ----->" + JSON.stringify(parseMyTaskForDoorbellSign));
    //if ($.isPlainObject(parseMyTaskForDoorbellSign)) {
    $.each(parseMyLikesForDoorbellSign, function (key, value) {
        //console.log("parseMyTaskForDoorbellSign -----> $.each(parseMyTaskForDoorbellSign", JSON.stringify(value));
        if (!$.isEmptyObject(value.cover)) {
            img = value.cover;
        } else {
            img = value.item_id + ".jpg";
        }
        parseMyLikesForDoorbellSign[key] = {
            //'a': value.ToUserName,
            'image': img,
            //'icon': taskIcon,
            'item_id': value.item_id,
            //'task_status': value.task_status,
            //'task_type': value.task_type,
            //'percentage': value.percentage,
            //'cover': '',
            'title': value.title,
            'access': value.access,
            'spring': value.spring,
            /!*'href': value.title,*!/
            //'additional': value.task_status,
            //'count': sec2str(value.video_duration),
            //'date': value.created_at,
            'likes_count': value.likes_count,
            //'count': timeToWord(value.like_created_at),
            'count': timeToWord(value.created_at),
            'buttons': {'button': 'del_like'}
        };

    });
    return parseMyLikesForDoorbellSign;
}*/

/* 01082022 function parseMyRelationsForDoorbellSign(parseMyRelationsForDoorbellSign) {
    //console.log("parseMyRelationsForDoorbellSign ----->" + JSON.stringify(parseMyRelationsForDoorbellSign));
    $.each(parseMyRelationsForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parseMyRelationsForDoorbellSign[key] = {
            'image': origin_img_vide_me + trueUserInfo.user_picture,
            'cover': '',
            'title': trueUserInfo.user_display_name,
            'additional': trueUserInfo.relation_email,
            'from_user_id': trueUserInfo.from_user_id,
            'to_user_id': trueUserInfo.to_user_id,
            'relation': trueUserInfo.relation,
            'relation_email': trueUserInfo.relation_email,
            /!*'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*!/
            'date': trueUserInfo.created_at,
            'dropdown': {'dd_item': 'edit_relation'}, // <-- work
            'buttons': {'button': 'send_message'}
        };
    });
    return parseMyRelationsForDoorbellSign;
}*/

function parseMyRelationsForDoorbellSignShare(parseMyRelationsForDoorbellSignShare, item_id) { // 01082022 ??? .contact-toggle
    //console.log("parseMyRelationsForDoorbellSignShare ----->" + JSON.stringify(parseMyRelationsForDoorbellSignShare));
    $.each(parseMyRelationsForDoorbellSignShare, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parseMyRelationsForDoorbellSignShare[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'title': trueUserInfo.user_display_name,
            //'additional': trueUserInfo.relation_email,
            'item_id': item_id,
            //'href': value.spring + '/?album=' + value.title,
            //'from_user_id': trueUserInfo.from_user_id,
            //'to_user_id': trueUserInfo.to_user_id,
            'to_user_id': trueUserInfo.user_id,
            //'relation': trueUserInfo.relation,
            //'relation_email': trueUserInfo.relation_email,
            /*'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            'date': trueUserInfo.created_at,
            //'dropdown': {'dd_item': 'edit_relation'}, // <-- work
            'buttons': {'button': 'item_send_message'}
        };
    });
    return parseMyRelationsForDoorbellSignShare;
}

function parseRelationsForMeForDoorbellSign(parseRelationsToMeForDoorbellSign) { // 01082022
    //console.log("parseMyRelationsForDoorbellSign ----->" + JSON.stringify(parseRelationsToMeForDoorbellSign));
    $.each(parseRelationsToMeForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parseRelationsToMeForDoorbellSign[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'href': trueUserInfo.spring,
            'title': trueUserInfo.user_display_name,
            'additional': trueUserInfo.relation_email,
            //'from_user_id': trueUserInfo.from_user_id,
            'user_id': trueUserInfo.user_id,
            'spring': trueUserInfo.spring,
            'country': trueUserInfo.country,
            'city': trueUserInfo.city,
            'relation': trueUserInfo.relation,
            'relation_email': trueUserInfo.relation_email,
            /*'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            'date': trueUserInfo.created_at,
            'buttons': {'button': 'relation_delete'}
        };
    });
    //console.log("parseRelationsForMeForDoorbellSign ----->" + JSON.stringify(parseRelationsToMeForDoorbellSign));
    return parseRelationsToMeForDoorbellSign;
}

function parseRelationsToMeForDoorbellSign(parseRelationsToMeForDoorbellSign) { // 01082022
    //console.log("parseMyRelationsForDoorbellSign ----->" + JSON.stringify(parseRelationsToMeForDoorbellSign));
    $.each(parseRelationsToMeForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parseRelationsToMeForDoorbellSign[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'href': trueUserInfo.spring,
            'title': trueUserInfo.user_display_name,
            'spring': trueUserInfo.spring,
            'country': trueUserInfo.country,
            'city': trueUserInfo.city,
            'additional': trueUserInfo.relation_email,
            'from_user_id': trueUserInfo.from_user_id,
            'to_user_id': trueUserInfo.to_user_id,
            'user_id': trueUserInfo.user_id,
            'relation': trueUserInfo.relation,
            'relation_email': trueUserInfo.relation_email,
            /*'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            'date': trueUserInfo.created_at,
            'buttons': {'button': 'friendship'}
        };
    });
    return parseRelationsToMeForDoorbellSign;
}

function parseFriendshipMyForDoorbellSign(parseFriendshipMyForDoorbellSign) { // 01082022
    //console.log("parseMyRelationsForDoorbellSign ----->" + JSON.stringify(parseRelationsToMeForDoorbellSign));
    $.each(parseFriendshipMyForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parseFriendshipMyForDoorbellSign[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'href': trueUserInfo.spring,
            'title': trueUserInfo.user_display_name,
            //'additional': trueUserInfo.relation_email,
            //'from_user_id': trueUserInfo.from_user_id,
            'user_display_name': trueUserInfo.user_display_name,
            'user_id': trueUserInfo.user_id,
            'spring': trueUserInfo.spring,
            'country': trueUserInfo.country,
            'city': trueUserInfo.city,
            //'to_user_id': trueUserInfo.to_user_id,
            //'relation': trueUserInfo.relation,
            //'relation_email': trueUserInfo.relation_email,
            /*'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            'date': dateFromPG(trueUserInfo),
            /*'dropdown': {'dd_item': 'del_friendship'}*/ // <-- work
            /*'dropdown': {'dd_item': 'edit_relation'}, // <-- work
            'buttons': {'button': 'friendship_accept'}*/
            'buttons': {'button': 'del_friendship'}
        };
    });
    return parseFriendshipMyForDoorbellSign;
}

function parseUserForDoorbellSign(parseFriendshipMyForDoorbellSign) { // 01082022
    //console.log("parseMyRelationsForDoorbellSign ----->" + JSON.stringify(parseRelationsToMeForDoorbellSign));
    $.each(parseFriendshipMyForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parseFriendshipMyForDoorbellSign[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'href': trueUserInfo.spring,
            'title': trueUserInfo.user_display_name,
            //'additional': trueUserInfo.relation_email,
            //'from_user_id': trueUserInfo.from_user_id,
            'user_display_name': trueUserInfo.user_display_name,
            'user_id': trueUserInfo.user_id,
            'spring': trueUserInfo.spring,
            //'to_user_id': trueUserInfo.to_user_id,
            //'relation': trueUserInfo.relation,
            //'relation_email': trueUserInfo.relation_email,
            /*'additional': trueUserInfo.task_status,*/
            'count': '@' + trueUserInfo.spring,
            'date': dateFromPG(trueUserInfo),
            /*'dropdown': {'dd_item': 'del_friendship'} // <-- work
            'dropdown': {'dd_item': 'edit_relation'}, // <-- work
            'buttons': {'button': 'friendship_accept'}*/
        };
    });
    return parseFriendshipMyForDoorbellSign;
}

function parseFriendshipForDoorbellSign(parseFriendshipMyForDoorbellSign) { // 01082022
    //console.log("parseMyRelationsForDoorbellSign ----->" + JSON.stringify(parseRelationsToMeForDoorbellSign));
    $.each(parseFriendshipMyForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parseFriendshipMyForDoorbellSign[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'href': trueUserInfo.spring,
            'title': trueUserInfo.user_display_name,
            'spring': trueUserInfo.spring,
            'country': trueUserInfo.country,
            'city': trueUserInfo.city,
            //'additional': trueUserInfo.relation_email,
            //'from_user_id': trueUserInfo.from_user_id,
            'user_id': trueUserInfo.user_id,
            //'to_user_id': trueUserInfo.to_user_id,
            //'relation': trueUserInfo.relation,
            //'relation_email': trueUserInfo.relation_email,
            /*'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            'date': dateFromPG(trueUserInfo),
            /*'dropdown': {'dd_item': 'edit_relation'},*/ // <-- work
            'buttons': {'button': 'friendship'}

        };
    });
    return parseFriendshipMyForDoorbellSign;
}

function parseFriendshipAcceptForDoorbellSign(parseFriendshipAcceptForDoorbellSign) { // 01082022
    //console.log("parseMyRelationsForDoorbellSign ----->" + JSON.stringify(parseRelationsToMeForDoorbellSign));
    $.each(parseFriendshipAcceptForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parseFriendshipAcceptForDoorbellSign[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'title': trueUserInfo.user_display_name,
            'href': trueUserInfo.spring,
            'spring': trueUserInfo.spring,
            'country': trueUserInfo.country,
            'city': trueUserInfo.city,
            //'additional': trueUserInfo.relation_email,
            //'from_user_id': trueUserInfo.from_user_id,
            'user_id': trueUserInfo.user_id,
            //'to_user_id': trueUserInfo.to_user_id,
            //'relation': trueUserInfo.relation,
            //'relation_email': trueUserInfo.relation_email,
            /*'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            'date': dateFromPG(trueUserInfo),
            /*'dropdown': {'dd_item': 'edit_relation'}, // <-- work */
            'buttons': {
                'button': 'friendship_accept',
                'button2': 'friendship_declined'
            }
        };
    });
    return parseFriendshipAcceptForDoorbellSign;
}

function parseRecommConnectForDoorbellSign(parseRecommConnectForDoorbellSign) { // 01082022
    //console.log("parseMyRelationsForDoorbellSign ----->" + JSON.stringify(parseRelationsToMeForDoorbellSign));
    $.each(parseRecommConnectForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parseRecommConnectForDoorbellSign[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'title': trueUserInfo.user_display_name,
            'href': trueUserInfo.spring,
            'spring': trueUserInfo.spring,
            'country': trueUserInfo.country,
            'city': trueUserInfo.city,
            //'additional': trueUserInfo.relation_email,
            //'from_user_id': trueUserInfo.from_user_id,
            'user_id': trueUserInfo.user_id,
            //'to_user_id': trueUserInfo.to_user_id,
            //'relation': trueUserInfo.relation,
            //'relation_email': trueUserInfo.relation_email,
            /*'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            'date': trueUserInfo.created_at,
            /*'dropdown': {'dd_item': 'edit_relation'}, // <-- work */
            'buttons': {
                'button': 'follow'
            }
        };
    });
    return parseRecommConnectForDoorbellSign;
}

function parseRecommFriendsForDoorbellSign(parseRecommFriendsForDoorbellSign) { // 01082022
    //console.log("parseMyRelationsForDoorbellSign ----->" + JSON.stringify(parseRelationsToMeForDoorbellSign));
    $.each(parseRecommFriendsForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parseRecommFriendsForDoorbellSign[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'title': trueUserInfo.user_display_name,
            'href': trueUserInfo.spring,
            'spring': trueUserInfo.spring,
            'country': trueUserInfo.country,
            'city': trueUserInfo.city,
            //'additional': trueUserInfo.relation_email,
            //'from_user_id': trueUserInfo.from_user_id,
            'user_id': trueUserInfo.user_id,
            //'to_user_id': trueUserInfo.to_user_id,
            //'relation': trueUserInfo.relation,
            //'relation_email': trueUserInfo.relation_email,
            /*'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            'date': trueUserInfo.created_at,
            /*'dropdown': {'dd_item': 'edit_relation'}, // <-- work */
            'buttons': {
                'button': 'friendship'
            }
        };
    });
    return parseRecommFriendsForDoorbellSign;
}

function parseMyRequestsFriendshipForDoorbellSign(parseFriendshipAcceptForDoorbellSign) { // 01082022
    //console.log("parseMyRelationsForDoorbellSign ----->" + JSON.stringify(parseRelationsToMeForDoorbellSign));
    $.each(parseFriendshipAcceptForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parseFriendshipAcceptForDoorbellSign[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'title': trueUserInfo.user_display_name,
            'href': trueUserInfo.spring, // TODO: remove
            'spring': trueUserInfo.spring,
            'country': trueUserInfo.country,
            'city': trueUserInfo.city,
            //'additional': trueUserInfo.relation_email,
            //'from_user_id': trueUserInfo.from_user_id,
            'user_id': trueUserInfo.user_id,
            //'to_user_id': trueUserInfo.to_user_id,
            //'relation': trueUserInfo.relation,
            //'relation_email': trueUserInfo.relation_email,
            /*'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            'date': trueUserInfo.created_at,
            /*'dropdown': {'dd_item': 'edit_relation'}, // <-- work */
            /*'buttons': {
                'button': 'friendship_accept',
                'button2': 'friendship_declined'
            }*/
        };
    });
    return parseFriendshipAcceptForDoorbellSign;
}

function parseSearchPeoplesForDoorbellSign(parseSearchPeoplesForDoorbellSign) { // 01082022
    //console.log("parseSearchPeoplesForDoorbellSign ----->" + JSON.stringify(parseSearchPeoplesForDoorbellSign));
    $.each(parseSearchPeoplesForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parseSearchPeoplesForDoorbellSign[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'title': trueUserInfo.user_display_name,
            'additional': trueUserInfo.city,
            'user_id': trueUserInfo.user_id,
            /*'count': trueUserInfo.country,*/
            /*'from_user_id': trueUserInfo.from_user_id,
            'to_user_id': trueUserInfo.to_user_id,
            'relation': trueUserInfo.relation,
            'relation_email': trueUserInfo.relation_email,
            'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            'date': trueUserInfo.created_at,
            'spring': trueUserInfo.spring,
            'href': trueUserInfo.spring,
            'country': trueUserInfo.country,
            'city': trueUserInfo.city,
            'bio': trueUserInfo.bio
            //'dropdown': {'dd_item': 'edit_relation'} // <-- work
            //'buttons': {'button': 'essence_join'}
        };
    });
    return parseSearchPeoplesForDoorbellSign;
}

function parseSearchEssencesForDoorbellSign(parseSearchPeoplesForDoorbellSign) { // 01082022
    //console.log("parseSearchPeoplesForDoorbellSign ----->" + JSON.stringify(parseSearchPeoplesForDoorbellSign));
    $.each(parseSearchPeoplesForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parseSearchPeoplesForDoorbellSign[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'title': trueUserInfo.user_display_name,
            'additional': trueUserInfo.city,
            'user_id': trueUserInfo.user_id,
            /*'count': trueUserInfo.country,*/
            /*'from_user_id': trueUserInfo.from_user_id,
            'to_user_id': trueUserInfo.to_user_id,
            'relation': trueUserInfo.relation,
            'relation_email': trueUserInfo.relation_email,
            'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            'date': trueUserInfo.created_at,
            'spring': trueUserInfo.spring,
            'href': trueUserInfo.spring,
            'country': trueUserInfo.country,
            'city': trueUserInfo.city,
            'bio': trueUserInfo.bio,
            'ue_id': trueUserInfo.ue_id,
            //'dropdown': {'dd_item': 'edit_relation'} // <-- work
            'buttons': {'button': 'essence_join'}
        };
    });
    return parseSearchPeoplesForDoorbellSign;
}

function parseSearchPartnersItemsForDoorbellSign(parseSearchPartnersItemsForDoorbellSign) { // 01082022
    //console.log("parseSearchPeoplesForDoorbellSign ----->" + JSON.stringify(parseSearchPeoplesForDoorbellSign));
    $.each(parseSearchPartnersItemsForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parseSearchPartnersItemsForDoorbellSign[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'title': trueUserInfo.user_display_name,
            'additional': trueUserInfo.city,
            'user_id': trueUserInfo.user_id,
            /*'from_user_id': trueUserInfo.from_user_id,
            'to_user_id': trueUserInfo.to_user_id,
            'relation': trueUserInfo.relation,
            'relation_email': trueUserInfo.relation_email,
            'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            'date': trueUserInfo.created_at,
            'spring': trueUserInfo.spring,
            'href': trueUserInfo.spring,
            'user_display_name': trueUserInfo.user_display_name,
            'user_picture': trueUserInfo.user_picture,
            'country': trueUserInfo.country,
            'city': trueUserInfo.city,
            'item_id': parseSearchPartnersItemsForDoorbellSign.item_id,
            //--'item_id': trueUserInfo.item_id,
            'bio': trueUserInfo.bio,
            //'ue_id': trueUserInfo.ue_id,
            //'dropdown': {'dd_item': 'edit_relation'} // <-- work
            'buttons': {'button': 'partner_invite'}
        };
    });
    return parseSearchPartnersItemsForDoorbellSign;
}

/* 01082022 function parsePartnersItemsForDoorbellSignDelete(parseSearchPartnersItemsForDoorbellSign) {
    //console.log("parseSearchPeoplesForDoorbellSign ----->" + JSON.stringify(parseSearchPeoplesForDoorbellSign));
    $.each(parseSearchPartnersItemsForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parseSearchPartnersItemsForDoorbellSign[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'title': trueUserInfo.user_display_name,
            'additional': trueUserInfo.city,
            'user_id': trueUserInfo.user_id,
            /!*'from_user_id': trueUserInfo.from_user_id,
            'to_user_id': trueUserInfo.to_user_id,
            'relation': trueUserInfo.relation,
            'relation_email': trueUserInfo.relation_email,
            'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*!/
            'date': trueUserInfo.created_at,
            'spring': trueUserInfo.spring,
            'status': trueUserInfo.status,
            'href': trueUserInfo.spring,
            'country': trueUserInfo.country,
            'city': trueUserInfo.city,
            'bio': trueUserInfo.bio,
            'item_id': trueUserInfo.item_id,
            'partner_id': trueUserInfo.partner_id,
            //'ue_id': trueUserInfo.ue_id,
            //'dropdown': {'dd_item': 'edit_relation'} // <-- work
            'buttons': {'button': 'partner_delete'}
            //'footer': {'button': 'partner_edit'}
        };
    });
    return parseSearchPartnersItemsForDoorbellSign;
}*/

function parsePartnersItemsForDoorbellSignInteractive(parsePartnersItemsForDoorbellSignInteractive) { // 01082022
    console.log("parsePartnersItemsForDoorbellSignInteractive ----->" + JSON.stringify(parsePartnersItemsForDoorbellSignInteractive));
    $.each(parsePartnersItemsForDoorbellSignInteractive, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        var buttons = autoselectPartnerButton(trueUserInfo);
        parsePartnersItemsForDoorbellSignInteractive[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'title': trueUserInfo.user_display_name,
            'additional': trueUserInfo.city,
            'user_id': trueUserInfo.user_id,
            /*'from_user_id': trueUserInfo.from_user_id,
            'to_user_id': trueUserInfo.to_user_id,
            'relation': trueUserInfo.relation,
            'relation_email': trueUserInfo.relation_email,
            'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            'date': trueUserInfo.created_at,
            'spring': trueUserInfo.spring,
            'partner_status': trueUserInfo.partner_status,
            'href': trueUserInfo.spring,
            'country': trueUserInfo.country,
            'city': trueUserInfo.city,
            'bio': trueUserInfo.bio,
            'item_id': trueUserInfo.item_id,
            'partner_id': trueUserInfo.partner_id,
            //'ue_id': trueUserInfo.ue_id,
            //'dropdown': {'dd_item': 'edit_relation'} // <-- work
            'buttons': buttons
            //'footer': {'button': 'partner_edit'}
        };
    });
    return parsePartnersItemsForDoorbellSignInteractive;
}

function parsePartnersItemsForDoorbellSign(parsePartnersItemsForDoorbellSign) { // 01082022
    //console.log("parseSearchPeoplesForDoorbellSign ----->" + JSON.stringify(parseSearchPeoplesForDoorbellSign));
    $.each(parsePartnersItemsForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parsePartnersItemsForDoorbellSign[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'title': trueUserInfo.user_display_name,
            'additional': trueUserInfo.city,
            'user_id': trueUserInfo.user_id,
            /*'from_user_id': trueUserInfo.from_user_id,
            'to_user_id': trueUserInfo.to_user_id,
            'relation': trueUserInfo.relation,
            'relation_email': trueUserInfo.relation_email,
            'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            'date': trueUserInfo.created_at,
            'spring': trueUserInfo.spring,
            'status': trueUserInfo.status,
            'href': trueUserInfo.spring,
            'country': trueUserInfo.country,
            'city': trueUserInfo.city,
            'bio': trueUserInfo.bio,
            'item_id': trueUserInfo.item_id,
            'partner_id': trueUserInfo.partner_id
            //'ue_id': trueUserInfo.ue_id,
            //'dropdown': {'dd_item': 'edit_relation'} // <-- work
            //'buttons': {'button': 'partner_delete'}
            //'footer': {'button': 'partner_edit'}
        };
    });
    return parsePartnersItemsForDoorbellSign;
}

function parsePartnersPendingFromMeForDoorbellSignDelete(parsePartnersPendingFromMeForDoorbellSignDelete) { // 01082022
    console.log("parsePartnersPendingFromMeForDoorbellSignDelete ----->" + JSON.stringify(parsePartnersPendingFromMeForDoorbellSignDelete));
    /*if (!$.isEmptyObject(parsePartnersPendingFromMeForDoorbellSignDelete.callback_function)) {
        console.log("parsePartnersPendingFromMeForDoorbellSignDelete callback_function ----->" + parsePartnersPendingFromMeForDoorbellSignDelete.callback_function);
        //delete parsePartnersPendingFromMeForDoorbellSignDelete.callback_function;
    }*/
    $.each(parsePartnersPendingFromMeForDoorbellSignDelete, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parsePartnersPendingFromMeForDoorbellSignDelete[key] = {
            'image': trueUserInfo.partner_user_picture,
            'cover': '',
            'title': trueUserInfo.partner_user_display_name + ' request partnership',
            'additional': trueUserInfo.city,
            'user_id': trueUserInfo.user_id,
            /*'from_user_id': trueUserInfo.from_user_id,
            'to_user_id': trueUserInfo.to_user_id,
            'relation': trueUserInfo.relation,
            'relation_email': trueUserInfo.relation_email,
            'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            'date': trueUserInfo.created_at,
            'spring': trueUserInfo.partner_spring,
            'partner_status': trueUserInfo.partner_status,
            'href': trueUserInfo.partner_spring,
            'country': trueUserInfo.partner_country,
            'city': trueUserInfo.partner_city,
            'bio': trueUserInfo.bio,
            'ip_id': trueUserInfo.ip_id,
            'item_id': trueUserInfo.item_id,
            'partner_id': trueUserInfo.partner_id,
            //'ue_id': trueUserInfo.ue_id,
            //'dropdown': {'dd_item': 'edit_relation'} // <-- work
            'buttons': {'button': 'partner_delete'},
            /*'additional_item': {
                'item_id': trueUserInfo.item_id,
                'spring': trueUserInfo.spring}*/
            'additional_item': trueUserInfo
            //'callback_function': parsePartnersPendingFromMeForDoorbellSignDelete.callback_function
            //'additional_item': $.fn.provideVidemeFunction('', trueUserInfo)
            //'footer': {'button': 'partner_edit'}
        };
    });
    console.log("parsePartnersPendingFromMeForDoorbellSignDelete ----->" + JSON.stringify(parsePartnersPendingFromMeForDoorbellSignDelete));
    return parsePartnersPendingFromMeForDoorbellSignDelete;
}

function parsePartnersPendingForDoorbellSignInteractive(parsePartnersPendingForDoorbellSignInteractive) { // 01082022
    //console.log("parseSearchPeoplesForDoorbellSign ----->" + JSON.stringify(parseSearchPeoplesForDoorbellSign));
    $.each(parsePartnersPendingForDoorbellSignInteractive, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        var button = autoselectPartnerButton(trueUserInfo);
        var sign = autoselectPartnerSign(trueUserInfo);
        parsePartnersPendingForDoorbellSignInteractive[key] = {
            'image': trueUserInfo.partner_user_picture,
            'cover': '',
            'title': trueUserInfo.partner_user_display_name + sign,
            'additional': trueUserInfo.city,
            'user_id': trueUserInfo.user_id,
            /*'from_user_id': trueUserInfo.from_user_id,
            'to_user_id': trueUserInfo.to_user_id,
            'relation': trueUserInfo.relation,
            'relation_email': trueUserInfo.relation_email,
            'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            'date': trueUserInfo.created_at,
            'spring': trueUserInfo.partner_spring,
            'partner_status': trueUserInfo.partner_status,
            'ip_id': trueUserInfo.ip_id,
            'href': trueUserInfo.partner_spring,
            'country': trueUserInfo.partner_country,
            'city': trueUserInfo.partner_city,
            //'bio': trueUserInfo.bio,
            'item_id': trueUserInfo.item_id,
            'partner_id': trueUserInfo.partner_id,
            //'ue_id': trueUserInfo.ue_id,
            //'dropdown': {'dd_item': 'edit_relation'} // <-- work
            'buttons': button,
            /*'additional_item': {
                'item_id': trueUserInfo.item_id,
                'spring': trueUserInfo.spring}*/
            'additional_item': trueUserInfo
            //'footer': {'button': 'partner_edit'}
        };
    });
    return parsePartnersPendingForDoorbellSignInteractive;
}

function parsePartnersInviteRequestForDoorbellSign(parsePartnersInviteRequestForDoorbellSign) { // 01082022
    //console.log("parsePartnersInviteRequestForDoorbellSign before ----->" + JSON.stringify(parsePartnersInviteRequestForDoorbellSign));
    $.each(parsePartnersInviteRequestForDoorbellSign, function (key, value) {
        //console.log("parsePartnersInviteRequestForDoorbellSign value ----->" + JSON.stringify(value));

        var trueUserInfo = paddingUserInfo(value.partner_info);
        var itemInfo = value.item_info;
        console.log("parsePartnersInviteRequestForDoorbellSign trueUserInfo ----->" + JSON.stringify(trueUserInfo));
        console.log("parsePartnersInviteRequestForDoorbellSign itemInfo ----->" + JSON.stringify(itemInfo));

        parsePartnersInviteRequestForDoorbellSign[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'title': trueUserInfo.user_display_name,
            'additional': trueUserInfo.city,
            'user_id': trueUserInfo.user_id,
            /*'from_user_id': trueUserInfo.from_user_id,
            'to_user_id': trueUserInfo.to_user_id,
            'relation': trueUserInfo.relation,
            'relation_email': trueUserInfo.relation_email,
            'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            'date': trueUserInfo.created_at,
            'spring': trueUserInfo.spring,
            'status': trueUserInfo.status,
            'href': trueUserInfo.spring,
            'country': trueUserInfo.country,
            'city': trueUserInfo.city,
            'bio': trueUserInfo.bio,
            'item_id': trueUserInfo.item_id
            //'partner_id': trueUserInfo.partner_id,
            //'ue_id': trueUserInfo.ue_id,
            //'dropdown': {'dd_item': 'edit_relation'} // <-- work
            //'buttons': {'button': 'partner_delete'}
            /*'additional_item': {
                'item_id': trueUserInfo.item_id,
                'spring': trueUserInfo.spring}*/
            //'additional_item': itemInfo
            //'footer': {'button': 'partner_edit'}
        };
    });
    console.log("parsePartnersInviteRequestForDoorbellSign after ----->" + JSON.stringify(parsePartnersInviteRequestForDoorbellSign));

    return parsePartnersInviteRequestForDoorbellSign;
}

function parseEssencesMyRefForDoorbellSign(parseEssencesMyRefForDoorbellSign) { // 01082022
    //console.log("parseSearchPeoplesForDoorbellSign ----->" + JSON.stringify(parseSearchPeoplesForDoorbellSign));
    $.each(parseEssencesMyRefForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parseEssencesMyRefForDoorbellSign[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'title': trueUserInfo.user_display_name,
            'additional': trueUserInfo.city,
            'user_id': trueUserInfo.user_id,
            /*'count': trueUserInfo.country,*/
            /*'from_user_id': trueUserInfo.from_user_id,
            'to_user_id': trueUserInfo.to_user_id,
            'relation': trueUserInfo.relation,
            'relation_email': trueUserInfo.relation_email,
            'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            'date': trueUserInfo.created_at,
            'spring': trueUserInfo.spring,
            'href': trueUserInfo.spring,
            'country': trueUserInfo.country,
            'city': trueUserInfo.city,
            'bio': trueUserInfo.bio,
            'owner_display_name': trueUserInfo.owner_display_name,
            'owner_picture': trueUserInfo.owner_picture,
            'owner_spring': trueUserInfo.owner_spring,
            'essence_title': trueUserInfo.essence_title,
            'ref_title': trueUserInfo.ref_title,
            'dbs_type': 'essence_from',
            'ure_id': trueUserInfo.ure_id,
            'ue_id': trueUserInfo.ue_id,
            //'dropdown': {'dd_item': 'edit_relation'} // <-- work
            'buttons': {'button': 'essence_from_me_delete'}
        };
    });
    return parseEssencesMyRefForDoorbellSign;
}

function parseEssencesMySpringRefForDoorbellSign(parseEssencesMySpringRefForDoorbellSign) { // 01082022
    //console.log("parseSearchPeoplesForDoorbellSign ----->" + JSON.stringify(parseSearchPeoplesForDoorbellSign));
    $.each(parseEssencesMySpringRefForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parseEssencesMySpringRefForDoorbellSign[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'title': trueUserInfo.user_display_name,
            //'additional': trueUserInfo.city,
            //'user_id': trueUserInfo.user_id,
            /*'count': trueUserInfo.country,*/
            /*'from_user_id': trueUserInfo.from_user_id,
            'to_user_id': trueUserInfo.to_user_id,
            'relation': trueUserInfo.relation,
            'relation_email': trueUserInfo.relation_email,
            'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            //'date': trueUserInfo.created_at,
            'spring': trueUserInfo.spring,
            'href': trueUserInfo.spring,
            //'country': trueUserInfo.country,
            //'city': trueUserInfo.city,
            //'bio': trueUserInfo.bio,
            'owner_display_name': trueUserInfo.owner_display_name,
            'owner_picture': trueUserInfo.owner_picture,
            'owner_spring': trueUserInfo.owner_spring,
            'essence_title': trueUserInfo.essence_title,
            'ref_title': trueUserInfo.ref_title,
            'dbs_type': 'essence_from',
            'ure_id': trueUserInfo.ure_id,
            'ue_id': trueUserInfo.ue_id
            //'dropdown': {'dd_item': 'edit_relation'} // <-- work
            //'buttons': {'button': 'essence_from_me_delete'}
        };
    });
    return parseEssencesMySpringRefForDoorbellSign;
}

function parseEssencesMySpringRefToDoorbellSign(parseEssencesMySpringRefToDoorbellSign) { // 01082022
    //console.log("parseSearchPeoplesForDoorbellSign ----->" + JSON.stringify(parseSearchPeoplesForDoorbellSign));
    $.each(parseEssencesMySpringRefToDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parseEssencesMySpringRefToDoorbellSign[key] = {
            'image': trueUserInfo.owner_picture,
            'cover': '',
            //'title': trueUserInfo.owner_display_name,
            //'additional': trueUserInfo.city,
            //'user_id': trueUserInfo.user_id,
            /*'count': trueUserInfo.country,*/
            /*'from_user_id': trueUserInfo.from_user_id,
            'to_user_id': trueUserInfo.to_user_id,
            'relation': trueUserInfo.relation,
            'relation_email': trueUserInfo.relation_email,
            'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            //'date': trueUserInfo.created_at,
            'spring': trueUserInfo.owner_spring,
            'href': trueUserInfo.spring,
            //'country': trueUserInfo.country,
            //'city': trueUserInfo.city,
            //'bio': trueUserInfo.bio,
            'user_display_name': trueUserInfo.owner_display_name,
            'user_picture': trueUserInfo.owner_picture,
            'user_spring': trueUserInfo.owner_spring,
            'owner_display_name': trueUserInfo.user_display_name,
            'owner_picture': trueUserInfo.user_picture,
            'owner_spring': trueUserInfo.spring,
            'essence_title': trueUserInfo.essence_title,
            'ref_title': trueUserInfo.ref_title,
            'dbs_type': 'essence_to',
            'ure_id': trueUserInfo.ure_id,
            'ue_id': trueUserInfo.ue_id
            //'dropdown': {'dd_item': 'edit_relation'} // <-- work
            //'buttons': {'button': 'essence_from_me_delete'}
        };
    });
    return parseEssencesMySpringRefToDoorbellSign;
}

function parsEssencesToMeRefForDoorbellSign(parsEssencesToMeRefForDoorbellSign) { // 01082022
    //console.log("parseSearchPeoplesForDoorbellSign ----->" + JSON.stringify(parseSearchPeoplesForDoorbellSign));
    $.each(parsEssencesToMeRefForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parsEssencesToMeRefForDoorbellSign[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'title': trueUserInfo.user_display_name,
            'additional': trueUserInfo.city,
            'user_id': trueUserInfo.user_id,
            /*'count': trueUserInfo.country,*/
            /*'from_user_id': trueUserInfo.from_user_id,
            'to_user_id': trueUserInfo.to_user_id,
            'relation': trueUserInfo.relation,
            'relation_email': trueUserInfo.relation_email,
            'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            'date': trueUserInfo.created_at,
            'spring': trueUserInfo.spring,
            'href': trueUserInfo.spring,
            'country': trueUserInfo.country,
            'city': trueUserInfo.city,
            'bio': trueUserInfo.bio,
            'owner_display_name': trueUserInfo.owner_display_name,
            'owner_picture': trueUserInfo.owner_picture,
            'owner_spring': trueUserInfo.owner_spring,
            'essence_title': trueUserInfo.essence_title,
            'ref_title': trueUserInfo.ref_title,
            'dbs_type': 'essence_to',
            'ure_id': trueUserInfo.ure_id,
            'ue_id': trueUserInfo.ue_id,
            //'dropdown': {'dd_item': 'edit_relation'} // <-- work
            'buttons': {'button': 'essence_to_me_delete'}
        };
    });
    return parsEssencesToMeRefForDoorbellSign;
}

function parseEssencesFromMePendingForDoorbellSign(parseEssencesFromMePendingForDoorbellSign) { // 01082022
    //console.log("parseSearchEssencesFromMePendingForDoorbellSign ----->" + JSON.stringify(parseSearchEssencesFromMePendingForDoorbellSign));
    $.each(parseEssencesFromMePendingForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parseEssencesFromMePendingForDoorbellSign[key] = {
            'image': trueUserInfo.user_picture,
            'cover': '',
            'title': trueUserInfo.user_display_name,
            'additional': trueUserInfo.city,
            'user_id': trueUserInfo.user_id,
            /*'count': trueUserInfo.country,*/
            /*'from_user_id': trueUserInfo.from_user_id,
            'to_user_id': trueUserInfo.to_user_id,
            'relation': trueUserInfo.relation,
            'relation_email': trueUserInfo.relation_email,
            'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,*/
            'date': trueUserInfo.created_at,
            'spring': trueUserInfo.spring,
            'href': trueUserInfo.spring,
            'country': trueUserInfo.country,
            'city': trueUserInfo.city,
            'bio': trueUserInfo.bio,
            'owner_display_name': trueUserInfo.owner_display_name,
            'owner_picture': trueUserInfo.owner_picture,
            'owner_spring': trueUserInfo.owner_spring,
            'essence_title': trueUserInfo.essence_title,
            'ref_title': trueUserInfo.ref_title,
            'dbs_type': 'essence_from',
            'ure_id': trueUserInfo.ure_id,
            'ue_id': trueUserInfo.ue_id,
            //'dropdown': {'dd_item': 'edit_relation'} // <-- work
            'buttons': {'button': 'essence_from_me_accept_ref', 'button2': 'essence_from_me_delete'}
        };
    });
    return parseEssencesFromMePendingForDoorbellSign;
}

/* 01082022 function parsePopRelationsForDoorbellSign(parsePopRelationsForDoorbellSign) {
    //console.log("parsePopRelationsForDoorbellSign ----->" + JSON.stringify(parsePopRelationsForDoorbellSign));
    $.each(parsePopRelationsForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parsePopRelationsForDoorbellSign[key] = {
            'image': origin_img_vide_me + trueUserInfo.user_picture,
            'cover': '',
            'title': trueUserInfo.user_display_name,
            'user_id': trueUserInfo.user_id,
            'spring': trueUserInfo.spring,
            /!*'href': trueUserInfo.relation_email,
            'additional': trueUserInfo.task_status,
            'count': trueUserInfo.video_duration,
            'date': trueUserInfo.created_at,*!/
            'edit_button': 'pop_relations'
        };
    });
    return parsePopRelationsForDoorbellSign;
}*/

/* 01082022 function parseMyTaskSendmailForDoorbellSign(parseMyTaskSendmailForDoorbellSign) { // TODO: remove?
    //console.log("parseMyTaskSendmailForDoorbellSign ----->" + JSON.stringify(parseMyTaskSendmailForDoorbellSign));
    //if ($.isPlainObject(parseMyTaskSendmailForDoorbellSign)) {
    $.each(parseMyTaskSendmailForDoorbellSign, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        var taskImage = '';
        var taskIcon = '';
        if (!$.isEmptyObject(trueUserInfo.task_status)) {
            if (trueUserInfo.task_status == 'awaiting') {
                //taskImage = 'https://lh3.googleusercontent.com/Q-TyP-0iMexxAQDt7N81PLjLCrkoBkZVuSxP_1laOHxmctHhwJKsOXC9DYeBGXs8NIM=w300';
                taskIcon = 'clock-o';
            }
            if (trueUserInfo.task_status == 'worked') {
                //taskImage = 'https://lh3.googleusercontent.com/Q-TyP-0iMexxAQDt7N81PLjLCrkoBkZVuSxP_1laOHxmctHhwJKsOXC9DYeBGXs8NIM=w300';
                taskIcon = 'cogs';
            }
            if (trueUserInfo.task_status == 'success') {
                //taskImage = 'https://s3.amazonaws.com/img.vide.me/' + trueUserInfo.task_item_id + '.jpg';
                taskImage = trueUserInfo.task_item_id + '.jpg';
            }
            if (trueUserInfo.task_status == 'error') {
                taskIcon = 'frown-o';
            }
        }
        parseMyTaskSendmailForDoorbellSign[key] = {
            //'a': trueUserInfo.ToUserName,
            'image': taskImage,
            'icon': taskIcon,
            'cover': '',
            'title': trueUserInfo.title,
            'href': trueUserInfo.title,
            'additional': trueUserInfo.task_status,
            'count': trueUserInfo.to_user_email,
            'date': trueUserInfo.created_at,
            'edit_button': ''
        };

    });
    /!*} else {
        console.error("parseMyTaskSendmailForDoorbellSign -----> not plaint object " + parseMyTaskSendmailForDoorbellSign);
    }*!/
    //delete parseSignsForDoorbellSign.results;
    //console.log("parseSignsForDoorbellSign ----->" + JSON.stringify(parseMyTaskSendmailForDoorbellSign));
    return parseMyTaskSendmailForDoorbellSign;
}*/

/* 0108202 function parseSendForDoorbellSign(parseSendForDoorbellSign) {
    console.log("parseSendForDoorbellSign ----->" + JSON.stringify(parseSendForDoorbellSign));
    var date = new Date(2011, 0, 1, 0, 0, 0, 0);
    parseSendForDoorbellSign = {
        'icon': 'cogs',
        'cover': '',
        'title': parseSendForDoorbellSign.title,
        /!*'href': parseMyTaskForDoorbellSign.title,*!/
        'additional': 'send',
        'count': parseSendForDoorbellSign.to_user_email,
        'date': date,
        'edit_button': ''
    };
    return parseSendForDoorbellSign;
}*/

/* 01082022 function parseSignsForDoorbellSign(parseSignsForDoorbellSign) {
    console.log("parseSignsForDoorbellSign Before----->" + JSON.stringify(parseSignsForDoorbellSign));
    $.each(parseSignsForDoorbellSign, function (key, value) {
        parseSignsForDoorbellSign[key] = {
            //'a': value.ToUserName,
            'image': value.cover,
            /!*'cover': value.cover,*!/
            'title': value.title,
            'href': value.spring + '/?album=' + value.title,
            'additional': value.access,
            'count': value.count,
            'date': value.created_at,
            'created_at': value.created_at,
            'updated_at': value.updated_at,
            'access': value.access,
            //'buttons': {'album_edit'},
            'dropdown': {'dd_item': 'album'},
            //'dbs_type': 'album_edit'
            'buttons': {'button': 'album_edit'}
        };
    });
    //delete parseSignsForDoorbellSign.results;
    //console.log("parseSignsForDoorbellSign ----->" + JSON.stringify(parseSignsForDoorbellSign));
    return parseSignsForDoorbellSign;
}*/

function parseSignsForDoorbellSignManager(parseSignsForDoorbellSignManager) { // 01082022
    //console.log("parseSignsForDoorbellSignManager Before----->" + JSON.stringify(parseSignsForDoorbellSignManager));
    $.each(parseSignsForDoorbellSignManager, function (key, value) {
        parseSignsForDoorbellSignManager[key] = {
            //'a': value.ToUserName,
            'image': value.cover,
            /*'cover': value.cover,*/
            'title': value.title,
            'href': value.spring + '/?album=' + value.title,
            'additional': value.access,
            'count': value.count,
            'date': value.created_at,
            'created_at': value.created_at,
            'updated_at': value.updated_at,
            'access': value.access,
            //'buttons': {'album_edit'},
            'dropdown': {'dd_item': 'album'},
            'dbs_type': 'album_manager',
            'buttons': {'button': 'album_edit'}
        };
    });
    //delete parseSignsForDoorbellSign.results;
    //console.log("parseSignsForDoorbellSign ----->" + JSON.stringify(parseSignsForDoorbellSignManager));
    return parseSignsForDoorbellSignManager;
}

function parseSignsForDoorbellSignSpring(parseSignsForDoorbellSignSpring) { // 01082022
    //console.log("parseSignsForDoorbellSign Before----->" + JSON.stringify(parseSignsForDoorbellSign));
    $.each(parseSignsForDoorbellSignSpring, function (key, value) {
        parseSignsForDoorbellSignSpring[key] = {
            //'a': value.ToUserName,
            'image': value.cover,
            /*'image': value.image,
            'cover': value.cover,*/
            'title': value.title,
            'href': value.spring + '/?album=' + value.title,
            'additional': value.access,
            'count': value.count,
            'created_at': value.created_at,
            'updated_at': value.updated_at,
            'access': value.access,
            'dbs_type': 'square'
            /*'buttons': {'sign'},
            'dropdown': {'dd_item': 'album'}*/
        };
    });
    //delete parseSignsForDoorbellSign.results;
    //console.log("parseSignsForDoorbellSign ----->" + JSON.stringify(parseSignsForDoorbellSign));
    return parseSignsForDoorbellSignSpring;
}

function parseSignsForDoorbellSignShare(parseSignsForDoorbellSignShare, item_id) { // 01082022
    //console.log("parseSignsForDoorbellSignShare ----->");
    //console.log("parseSignsForDoorbellSignShare Before----->" + JSON.stringify(parseSignsForDoorbellSignShare));
    $.each(parseSignsForDoorbellSignShare, function (key, value) {
        parseSignsForDoorbellSignShare[key] = {
            //'a': value.ToUserName,
            'image': value.cover,
            /*'cover': value.cover,*/
            'title': value.title,
            'href': value.spring + '/?album=' + value.title,
            //'additional': value.access,
            'count': value.count,
            'date': value.created_at,
            'access': value.access,
            'item_id': item_id,
            'album_id': value.album_id,
            'buttons': {'button': 'item_add_to_album'}
        };
    });
    //delete parseSignsForDoorbellSign.results;
    //console.log("parseSignsForDoorbellSign ----->" + JSON.stringify(parseSignsForDoorbellSign));
    return parseSignsForDoorbellSignShare;
}

function parseTrendsItemsForShowTrendsTile(parseTrendsItemsForShowTrendsTile) { // 01082022
    //console.log("parseMyRelationsForDoorbellSign ----->" + JSON.stringify(parseRelationsToMeForDoorbellSign));
    $.each(parseTrendsItemsForShowTrendsTile, function (key, value) {
        var trueUserInfo = paddingUserInfo(value);
        parseTrendsItemsForShowTrendsTile[key] = {
            'item_id': trueUserInfo.item_id,
            'title': trueUserInfo.title,
            'type_item': trueUserInfo.type_item,
            'user_display_name': trueUserInfo.user_display_name,
            'spring': trueUserInfo.spring,
            'user_picture': trueUserInfo.user_picture,
            'count_view': trueUserInfo.count_view
        };
    });
    return parseTrendsItemsForShowTrendsTile;
}

/* 01082022 function showSendVideo(showSendVideo) {
    if ($.fn.getAuthorized()) {

    } else {
        console.log("showSendVideo -----> " + JSON.stringify(showSendVideo));
        var showTileDoorbellSignSmall = parseSendForDoorbellSign(showSendVideo);
        //$.each(showTileDoorbellSignSmall, function (key, value) {
        var trueValue = paddingUserInfo(showTileDoorbellSignSmall);
        //return showDoorbellSignSmall(trueValue);
        /!*return showTileTasks(trueValue);*!/
        let html = [];
        html.push("<li type=\"button\" class=\"list-group-item list-group-item-action videme-card-list-group\">");
        html.push(showTask(trueValue));
        html.push("</li>");
        return html;
    }

}*/

/* 01082022 function urlExists(url) {
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
    /!*$.ajax({
        url: url,
        type: "HEAD"
    }).then(
        function() { console.log("File is present"); },
        function() { console.log("File not present"); }
    );*!/
    /!*var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;*!/
}*/


/* If User autorisid */
/* 01082022 function ifAutorisedGotoUrl(target) {
    if ($.cookie('vide_nad')) {
        window.location = target.attr('href');
        //windo

    } else {
        //$('#modal-signin').modal('show');
        gotoLogin();
    }
}*/


function showError(data) { // 01082022 recreate
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

/*function showEmpty(data) {
    return '';
}*/

/* 01082022 function sidebarToggleShow() {
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
}*/

/* 01082022function paddingButtonInbox(paddingButtonInbox) {
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
}*/

function paddingButtonSent(paddingButtonSend) { // 02082022 why for (not working v if turnoff)
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
            'item_id': paddingButtonMy.item_id/*,
            'cover': paddingButtonMy.cover,
            'title': paddingButtonMy.title,
            'content': paddingButtonMy.content,
            'access': paddingButtonMy.access,
            'tags': paddingButtonMy.tags,
            'ext_links': paddingButtonMy.ext_links*/
        }
    };
    return paddingButtonMy;
}

/* 01082022 function paddingButtonMyPosts(paddingButtonMyPosts) {
    //console.log("paddingButtonMy -----> " + JSON.stringify(paddingButtonMy));
    paddingButtonMyPosts.showcaseButton = {
        'contact-toggle': {
            'item_id': paddingButtonMyPosts.item_id,
            'title': paddingButtonMyPosts.title,
            'content': paddingButtonMyPosts.content,
            'created_at': paddingButtonMyPosts.created_at,
            'updated_at': paddingButtonMyPosts.updated_at
        },
        'fb-send-message': {
            'item_id': paddingButtonMyPosts.item_id,
            'created_at': paddingButtonMyPosts.created_at,
            'updated_at': paddingButtonMyPosts.updated_at
        },
        'list-toggle': {
            'item_id': paddingButtonMyPosts.item_id,
            'title': paddingButtonMyPosts.title,
            'content': paddingButtonMyPosts.content,
            'created_at': paddingButtonMyPosts.created_at,
            'updated_at': paddingButtonMyPosts.updated_at
        },
        'del-my-post-toggle': {
            'item_id': paddingButtonMyPosts.item_id,
            'user_display_name': paddingButtonMyPosts.user_display_name,
            'title': paddingButtonMyPosts.title,
            'content': paddingButtonMyPosts.content,
            'created_at': paddingButtonMyPosts.created_at,
            'updated_at': paddingButtonMyPosts.updated_at
        }
    };
    return paddingButtonMyPosts;
}*/

function paddingUserInfo(paddingUserInfo) { // 01082022
    //console.log('paddingUserInfo paddingUserInfo ---> ' + JSON.stringify(paddingUserInfo));
    if (!$.isEmptyObject(paddingUserInfo)) {
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
            //trueUserInfo.user_display_name = 'No name';
            trueUserInfo.user_display_name = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.item_user_display_name)) {
            trueUserInfo.item_user_display_name = paddingUserInfo.item_user_display_name;
        } else {
            //trueUserInfo.item_user_display_name = 'No name';
        }
        if (!$.isEmptyObject(paddingUserInfo.post_user_display_name)) {
            trueUserInfo.post_user_display_name = paddingUserInfo.post_user_display_name;
        } else {
            //trueUserInfo.post_user_display_name = 'No name';
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
        if (!$.isEmptyObject(paddingUserInfo.user_picture) && paddingUserInfo.user_picture !== null) {
            //console.info('paddingUserInfo paddingUserInfo.user_picture !== null ' + paddingUserInfo.user_picture);
            trueUserInfo.user_picture = paddingUserInfo.user_picture;
        } else {
            //console.info('paddingUserInfo null ' + paddingUserInfo.user_picture);
            trueUserInfo.user_picture = 'nonname.jpg';
        }
        //console.log('paddingUserInfo trueUserInfo 1 ---> ' + JSON.stringify(trueUserInfo));

        if (!$.isEmptyObject(paddingUserInfo.item_user_picture)) {
            trueUserInfo.item_user_picture = paddingUserInfo.item_user_picture;
        } else {
            //trueUserInfo.item_user_picture = 'nonname.jpg';
        }
        if (!$.isEmptyObject(paddingUserInfo.post_user_picture)) {
            trueUserInfo.post_user_picture = paddingUserInfo.post_user_picture;
        } else {
            //trueUserInfo.post_user_picture = 'nonname.jpg';
        }
        if (!$.isEmptyObject(paddingUserInfo.spring)) {
            trueUserInfo.spring = paddingUserInfo.spring;
        } else {
            trueUserInfo.spring = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.item_spring)) {
            trueUserInfo.item_spring = paddingUserInfo.item_spring;
        } else {
            trueUserInfo.item_spring = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.post_spring)) {
            trueUserInfo.post_spring = paddingUserInfo.post_spring;
        } else {
            trueUserInfo.post_spring = '';
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
        if (!$.isEmptyObject(paddingUserInfo.user_cover_top)) {
            trueUserInfo.user_cover_top = paddingUserInfo.user_cover_top;
        } else {
            trueUserInfo.user_cover_top = getRandomCover();
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
        if (!$.isEmptyObject(paddingUserInfo.slogan)) {
            trueUserInfo.slogan = paddingUserInfo.slogan;
        } else {
            trueUserInfo.slogan = '';
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
        if (!$.isEmptyObject(paddingUserInfo.post_type)) {
            trueUserInfo.post_type = paddingUserInfo.post_type;
        } else {
            trueUserInfo.post_type = '';
        }
        /* ****************************************** */
        if (!$.isEmptyObject(paddingUserInfo.video)) {
            trueUserInfo.video = paddingUserInfo.video;
        } else {
            trueUserInfo.video = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.src)) {
            trueUserInfo.src = paddingUserInfo.src;
        } else {
            trueUserInfo.src = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.message_id)) {
            trueUserInfo.message_id = paddingUserInfo.message_id;
        } else {
            trueUserInfo.message_id = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.created_at)) {
            trueUserInfo.created_at = paddingUserInfo.created_at;
        } else {
            trueUserInfo.created_at = null;
        }
        if (!$.isEmptyObject(paddingUserInfo.updated_at)) {
            trueUserInfo.updated_at = paddingUserInfo.updated_at;
        } else {
            trueUserInfo.updated_at = null;
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

        if (!$.isEmptyObject(paddingUserInfo.dbs_type)) {
            trueUserInfo.dbs_type = paddingUserInfo.dbs_type;
        } else {
            trueUserInfo.dbs_type = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.href)) {
            trueUserInfo.href = paddingUserInfo.href;
        } else {
            trueUserInfo.href = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.image)) {
            trueUserInfo.image = origin_img_vide_me + paddingUserInfo.image;
        } else {
            trueUserInfo.image = getRandomImage();
        }
        /*if (!$.isEmptyObject(paddingUserInfo.cover)) {
            trueUserInfo.cover = paddingUserInfo.cover;
        } else {
            trueUserInfo.cover = getRandomCover();
        }*/
        if (!$.isEmptyObject(paddingUserInfo.cover)) {
            trueUserInfo.cover = paddingUserInfo.cover;
        } else {
            trueUserInfo.cover = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.cover_video)) {
            trueUserInfo.cover_video = paddingUserInfo.cover_video;
        } else {
            trueUserInfo.cover_video = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.started_at)) {
            trueUserInfo.started_at = paddingUserInfo.started_at;
        } else {
            trueUserInfo.started_at = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.stopped_at)) {
            trueUserInfo.stopped_at = paddingUserInfo.stopped_at;
        } else {
            trueUserInfo.stopped_at = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.item_country)) {
            trueUserInfo.item_country = paddingUserInfo.item_country;
        } else {
            trueUserInfo.item_country = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.item_city)) {
            trueUserInfo.item_city = paddingUserInfo.item_city;
        } else {
            trueUserInfo.item_city = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.place)) {
            trueUserInfo.place = paddingUserInfo.place;
        } else {
            trueUserInfo.place = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.access)) {
            trueUserInfo.access = paddingUserInfo.access;
        } else {
            trueUserInfo.access = null;
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
        if (!$.isEmptyObject(paddingUserInfo.tags)) {
            trueUserInfo.tags = paddingUserInfo.tags;
        } else {
            trueUserInfo.tags = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.array_tags)) {
            trueUserInfo.array_tags = paddingUserInfo.array_tags;
        } else {
            trueUserInfo.array_tags = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.tag)) {
            trueUserInfo.tag = paddingUserInfo.tag;
        } else {
            trueUserInfo.tag = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.tag_count)) {
            trueUserInfo.tag_count = paddingUserInfo.tag_count;
        } else {
            trueUserInfo.tag_count = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.tags_count)) {
            trueUserInfo.tags_count = paddingUserInfo.tags_count;
        } else {
            trueUserInfo.tags_count = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.tags_conf)) {
            trueUserInfo.tags_conf = paddingUserInfo.tags_conf;
        } else {
            trueUserInfo.tags_conf = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.user_tags_conf)) {
            trueUserInfo.user_tags_conf = paddingUserInfo.user_tags_conf;
        } else {
            trueUserInfo.user_tags_conf = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.user_tags_conf_new)) {
            trueUserInfo.user_tags_conf_new = paddingUserInfo.user_tags_conf_new;
        } else {
            trueUserInfo.user_tags_conf_new = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.tags_conf_count)) {
            trueUserInfo.tags_conf_count = paddingUserInfo.tags_conf_count;
        } else {
            trueUserInfo.tags_conf_count = 0;
        }
        if (!$.isEmptyObject(paddingUserInfo.tags_view_count)) {
            trueUserInfo.tags_view_count = paddingUserInfo.tags_view_count;
        } else {
            trueUserInfo.tags_view_count = 0;
        }
        if (!$.isEmptyObject(paddingUserInfo.ext_links)) {
            trueUserInfo.ext_links = paddingUserInfo.ext_links;
        } else {
            trueUserInfo.ext_links = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.album_id)) {
            trueUserInfo.album_id = paddingUserInfo.album_id;
        } else {
            trueUserInfo.album_id = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.album)) {
            trueUserInfo.album = paddingUserInfo.album;
        } else {
            trueUserInfo.album = '';
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
        if (!$.isEmptyObject(paddingUserInfo.footer)) {
            trueUserInfo.footer = paddingUserInfo.footer;
        } else {
            trueUserInfo.footer = '';
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
        /* Connect pop */
        if (!$.isEmptyObject(paddingUserInfo.post_owner_id)) {
            trueUserInfo.post_owner_id = paddingUserInfo.post_owner_id;
        } else {
            trueUserInfo.post_owner_id = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.posts_count)) {
            trueUserInfo.posts_count = paddingUserInfo.posts_count;
        } else {
            trueUserInfo.posts_count = '';
        }
        /* Doorbell Task ****************************************** */

        if (!$.isEmptyObject(paddingUserInfo.video_duration)) {
            trueUserInfo.video_duration = paddingUserInfo.video_duration;
        } else {
            trueUserInfo.video_duration = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.width)) {
            trueUserInfo.width = paddingUserInfo.width;
        } else {
            trueUserInfo.width = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.height)) {
            trueUserInfo.height = paddingUserInfo.height;
        } else {
            trueUserInfo.height = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.task_id)) {
            trueUserInfo.task_id = paddingUserInfo.task_id;
        } else {
            trueUserInfo.task_id = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.task_status)) {
            trueUserInfo.task_status = paddingUserInfo.task_status;
        } else {
            trueUserInfo.task_status = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.task_type)) {
            trueUserInfo.task_type = paddingUserInfo.task_type;
        } else {
            trueUserInfo.task_type = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.task_item_id)) {
            trueUserInfo.task_item_id = paddingUserInfo.task_item_id;
        } else {
            trueUserInfo.task_item_id = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.percentage)) {
            trueUserInfo.percentage = paddingUserInfo.percentage;
        } else {
            trueUserInfo.percentage = '';
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
        /* likes ****************************************** */
        if (!$.isEmptyObject(paddingUserInfo.likes_count)) {
            trueUserInfo.likes_count = paddingUserInfo.likes_count;
        } else {
            trueUserInfo.likes_count = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.its_like)) {
            trueUserInfo.its_like = paddingUserInfo.its_like;
        } else {
            trueUserInfo.its_like = '';
        }
        /* Reposts  ****************************************** */
        if (!$.isEmptyObject(paddingUserInfo.reposts_count)) {
            trueUserInfo.reposts_count = paddingUserInfo.reposts_count;
        } else {
            trueUserInfo.reposts_count = '';
        }
        /* Trends tile  ****************************************** */
        if (!$.isEmptyObject(paddingUserInfo.type_item)) {
            trueUserInfo.type_item = paddingUserInfo.type_item;
        } else {
            trueUserInfo.type_item = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.count_view)) {
            trueUserInfo.count_view = paddingUserInfo.count_view;
        } else {
            trueUserInfo.count_view = '';
        }
        if (paddingUserInfo.embed) {
            trueUserInfo.embed = paddingUserInfo.embed;
        } else {
            trueUserInfo.embed = false;
        }
        /* Stars *****  ****************************************** */
        //if (paddingUserInfo.stars_count) {
        if (!$.isEmptyObject(paddingUserInfo.stars_count)) {
            trueUserInfo.stars_count = paddingUserInfo.stars_count;
        } else {
            trueUserInfo.stars_count = false;
            //trueUserInfo.stars_count = 0;
        }
        if (paddingUserInfo.views_stars) {
            trueUserInfo.views_stars = paddingUserInfo.views_stars;
        } else {
            trueUserInfo.views_stars = false;
        }
        if (paddingUserInfo.pre_v_w320) {
            trueUserInfo.pre_v_w320 = paddingUserInfo.pre_v_w320;
        } else {
            trueUserInfo.pre_v_w320 = false;
        }
        if (paddingUserInfo.pre_i_w320) {
            trueUserInfo.pre_i_w320 = paddingUserInfo.pre_i_w320;
        } else {
            trueUserInfo.pre_i_w320 = false;
        }
        if (paddingUserInfo.spr_w120) {
            trueUserInfo.spr_w120 = paddingUserInfo.spr_w120;
        } else {
            trueUserInfo.spr_w120 = false;
        }
        if (paddingUserInfo.vtt_w120) {
            trueUserInfo.vtt_w120 = paddingUserInfo.vtt_w120;
        } else {
            trueUserInfo.vtt_w120 = false;
        }
        /* Albums **********************************************/
        if (paddingUserInfo.albums_sets_id) {
            trueUserInfo.albums_sets_id = paddingUserInfo.albums_sets_id;
        } else {
            trueUserInfo.albums_sets_id = '';
        }
        if (paddingUserInfo.albums_title) {
            trueUserInfo.albums_title = paddingUserInfo.albums_title;
        } else {
            trueUserInfo.albums_title = '';
        }
        /* Essences *************************************************/
        if (!$.isEmptyObject(paddingUserInfo.ue_id)) {
            trueUserInfo.ue_id = paddingUserInfo.ue_id;
        } else {
            trueUserInfo.ue_id = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.ure_id)) {
            trueUserInfo.ure_id = paddingUserInfo.ure_id;
        } else {
            trueUserInfo.ure_id = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.owner_display_name)) {
            trueUserInfo.owner_display_name = paddingUserInfo.owner_display_name;
        } else {
            trueUserInfo.owner_display_name = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.owner_picture)) {
            trueUserInfo.owner_picture = paddingUserInfo.owner_picture;
        } else {
            trueUserInfo.owner_picture = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.owner_spring)) {
            trueUserInfo.owner_spring = paddingUserInfo.owner_spring;
        } else {
            trueUserInfo.owner_spring = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.essence_title)) {
            trueUserInfo.essence_title = paddingUserInfo.essence_title;
        } else {
            trueUserInfo.essence_title = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.ref_title)) {
            trueUserInfo.ref_title = paddingUserInfo.ref_title;
        } else {
            trueUserInfo.ref_title = '';
        }
        /*if (!$.isEmptyObject(paddingUserInfo.raw_json)) {
            trueUserInfo.raw_json = paddingUserInfo.raw_json;
        } else {
            trueUserInfo.raw_json = '';
        }*/
        /* Partners *************************************************/
        if (!$.isEmptyObject(paddingUserInfo.ip_id)) {
            trueUserInfo.ip_id = paddingUserInfo.ip_id;
        } else {
            trueUserInfo.ip_id = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.partner_id)) {
            trueUserInfo.partner_id = paddingUserInfo.partner_id;
        } else {
            trueUserInfo.partner_id = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.partner_spring)) {
            trueUserInfo.partner_spring = paddingUserInfo.partner_spring;
        } else {
            trueUserInfo.partner_spring = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.partner_user_display_name)) {
            trueUserInfo.partner_user_display_name = paddingUserInfo.partner_user_display_name;
        } else {
            trueUserInfo.partner_user_display_name = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.partner_user_picture)) {
            trueUserInfo.partner_user_picture = paddingUserInfo.partner_user_picture;
        } else {
            trueUserInfo.partner_user_picture = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.partner_country)) {
            trueUserInfo.partner_country = paddingUserInfo.partner_country;
        } else {
            trueUserInfo.partner_country = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.partner_city)) {
            trueUserInfo.partner_city = paddingUserInfo.partner_city;
        } else {
            trueUserInfo.partner_city = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.additional_item)) {
            trueUserInfo.additional_item = paddingUserInfo.additional_item;
        } else {
            trueUserInfo.additional_item = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.partner_status)) {
            trueUserInfo.partner_status = paddingUserInfo.partner_status;
        } else {
            trueUserInfo.partner_status = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.its_my_pend)) {
            trueUserInfo.its_my_pend = paddingUserInfo.its_my_pend;
        } else {
            trueUserInfo.its_my_pend = '';
        }
        if (!$.isEmptyObject(paddingUserInfo.status)) {
            trueUserInfo.status = paddingUserInfo.status;
        } else {
            trueUserInfo.status = '';
        }
        //console.log('paddingUserInfo trueUserInfo ---> ' + JSON.stringify(trueUserInfo));
        return trueUserInfo;
    } else {
        return false;
    }
}

function parseDropdown(actionUrlClass, key, value) { // 01082022
    var my_item_edit_type = '';
    switch (value.type) { // TODO: whyfor?
        case 'artilce':
            if (value.post_type == 'update') my_item_edit_type = 'edit_my_article';
            break;
        case 'video':
            if (value.post_type == 'update') my_item_edit_type = 'edit_my_video';
            break;
        case 'image':
            if (value.post_type == 'update') my_item_edit_type = 'edit_my_video';
            break;
        case 'event':
            if (value.post_type == 'update') my_item_edit_type = 'edit_my_event';
            break;
        default:
        //alert( "Нет таких значений" );
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
    if (actionUrlClass == 'partner-req-url') {
        value.dropdown = {
            'dd_item_1': 'send',
            'dd_item_2': 'share',
            'dd_item_3': my_item_edit_type,
            'dd_item_4': 'delete_my_partner_req',
            'dd_item_5': 'copy_link'
        };
        value.key = key;
        value = paddingButtonMy(value);
    }
    if (actionUrlClass == 'album-manage-url') {
        value.dropdown = {
            'dd_item_1': 'send',
            'dd_item_2': 'share',
            'dd_item_3': 'delete_my_album_set',
            'dd_item_4': 'copy_link'
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
        /*value.dropdown = {
            'dd_item_1': 'send',
            'dd_item_2': share,
            'dd_item_3': 'embed',
            'dd_item_5': 'copy_link'
        };
        value.key = key;
        value = paddingButtonSent(value);*/
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
    /*if (actionUrlClass == 'my-posts-url') {
        value.dropdown = {
            'dd_item_1': 'send',
            'dd_item_2': 'share',
            'dd_item_3': 'delete-my-post'
        };
        value.key = key;
        value = paddingButtonMyPosts(value);
        //console.log("showTile value -----> " + JSON.stringify(value));
    }*/
    if (actionUrlClass == 'item-card') {
        value.dropdown = {};
    }
    return value;
}

function itemTileParamFirstSet(value) { // 01082022
    //console.log('itemTileParamFirstSet ---> ' + JSON.stringify(value));
    var retFirstSet = [];

    if (!$.isEmptyObject(value.user_display_name)) {
        retFirstSet.user_display_name = value.user_display_name;
    }

    if (!$.isEmptyObject(value.item_user_display_name)) {
        retFirstSet.user_display_name = value.item_user_display_name;
    }

    if (!$.isEmptyObject(value.item_user_display_name) &&
        value.post_type != 'update' &&
        value.post_type != 'update_user_picture' &&
        value.post_type != 'update_user_cover' &&
        value.post_type != 'user_cover_top') {
        retFirstSet.item_user_display_name = value.item_user_display_name;
        //user_display_name = value.item_user_display_name;
    }
    if (!$.isEmptyObject(value.item_user_picture) &&
        value.post_type != 'update' &&
        value.post_type != 'update_user_picture' &&
        value.post_type != 'update_user_cover' &&
        value.post_type != 'user_cover_top') {
        retFirstSet.item_user_picture = value.item_user_picture;
    }
    if (!$.isEmptyObject(value.item_spring) &&
        value.post_type != 'update' &&
        value.post_type != 'update_user_picture' &&
        value.post_type != 'update_user_cover' &&
        value.post_type != 'user_cover_top') {
        retFirstSet.item_spring = value.item_spring;
    }
    if (!$.isEmptyObject(value.post_user_display_name)) {
        retFirstSet.post_user_display_name = value.post_user_display_name;
    } else {
        retFirstSet.post_user_display_name = value.user_display_name;
    }
    if (!$.isEmptyObject(value.post_user_picture)) {
        retFirstSet.post_user_picture = value.post_user_picture;
    } else {
        retFirstSet.post_user_picture = value.user_picture;
    }
    if (!$.isEmptyObject(value.post_spring)) { // TODO: why?
        retFirstSet.post_spring = value.post_spring;
    } else {
        retFirstSet.post_spring = value.spring;
    }

    if (!$.isEmptyObject(value.post_user_picture)) {
        retFirstSet.post_user_picture = value.post_user_picture;
    }
    if (!$.isEmptyObject(value.post_spring)) { // TODO: why?
        retFirstSet.post_spring = value.post_spring;
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
    if (!$.isEmptyObject(value.user_tags_conf)) {
        retFirstSet.user_tags_conf = '<div class="videme-tile-v3-user-tags-conf d-flex text-muted"><div class="videme-tile-v3-user-tags-conf-icon"><i class="fa fa-check-circle-o" aria-hidden="true"></i></div><div class="videme-tile-v3-user-tags-conf-val">' + value.user_tags_conf + '</div></div>';
        //retFirstSet.user_tags_conf = '';
    } else {
        retFirstSet.user_tags_conf = '';
    }
    if (!$.isEmptyObject(value.user_tags_conf_new)) {
        if (value.user_tags_conf_new > 0) {
            retFirstSet.user_tags_conf_new = '<div class="badge badge-pill videme-badge-for-tile" >\n' +
                '<i class="fa fa-check-circle-o fa-lg"></i>\n' +
                '<span class="badge badge-light videme_nav_badge_tags_conf_count spring_activity_tags_confirmed_value">+' + value.user_tags_conf_new + '</span>\n' +
                '</div>';
            //retFirstSet.user_tags_conf = '';
        } else {
            retFirstSet.user_tags_conf_new = '';
        }
    } else {
        retFirstSet.user_tags_conf_new = '';
    }
    if (!$.isEmptyObject(value.started_at)) {
        retFirstSet.started_at = value.started_at;
    }
    if (!$.isEmptyObject(value.stopped_at)) {
        retFirstSet.stopped_at = value.stopped_at;
    }

    if (value.likes_count == 0) { // TODO: remove to showItemInfoV3
        retFirstSet.likes = '';
    } else {
        retFirstSet.likes = value.likes_count;
    }
    if (value.reposts_count == 0) {
        retFirstSet.reposts_count = '';
    } else {
        retFirstSet.reposts_count = value.reposts_count;
    }
    /*if (value.post_type == 'update') { // TODO: its true?
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
    }*/
    return retFirstSet;
}

function itemTileParamSet(value) { // 01082022
    //console.log('itemTileParamSet value ---> ' + JSON.stringify(value));
    var retSet = [];
    var pgwBrowser = $.pgwBrowser();
    retSet.item_video = value.item_id;
    retSet.item_type = '';
    retSet.item_id = '';
    if (value.item_id) retSet.item_id = value.item_id;
    if (value.type === 'article') {
        if (value.post_id && value.post_id != "undefined") {
            retSet.href = "https://www.vide.me/a/?a=" + value.href + "&post_id=" + value.post_id;
        } else {
            retSet.href = "https://www.vide.me/a/?a=" + value.href;
        }
        //img = value.cover;
        //==retSet.img = 'https://s3.amazonaws.com/img.vide.me/' + value.cover;
        retSet.img = origin_img_vide_me + value.cover;
        retSet.trueActionClass = 'article-url';
        retSet.videme_tile_class = 'videme_tile_box_img';
        retSet.videme_tile_boxInner_class = 'videme_tile_boxInner_img';
        retSet.mainInsert = "<img class='videme_tile_img_class' src='" + retSet.img + "' alt=''></img>";
        retSet.item_type = 'article';

        //if (value.post_type == 'update') my_item_edit_type = 'edit_my_article';
    } else if (value.type === 'video') {
        if (value.message_id && value.message_id != "undefined") {
            retSet.href = "https://www.vide.me/v?m=" + value.href + "&message_id=" + value.message_id;
        } else {
            retSet.href = "https://www.vide.me/v?m=" + value.href;
        }
        if (value.post_id && value.post_id != "undefined") {
            retSet.href = "https://www.vide.me/v?m=" + value.href + "&post_id=" + value.post_id;
        } else {
            retSet.href = "https://www.vide.me/v?m=" + value.href;
        }
        if (!$.isEmptyObject(value.ip_id)) {
            retSet.href = "https://www.vide.me/v?m=" + value.item_id + "&ip_id=" + value.ip_id;
        } else {
            retSet.href = "https://www.vide.me/v?m=" + value.item_id;
        }
        if (!$.isEmptyObject(value.pre_i_w320)) {
            //img = "https://s3.amazonaws.com/pre-image-w320.vide.me/" + value.item_id + "-pre-i-w320.jpg";
            if (!$.isEmptyObject(value.cover)) {
                //==retSet.img = "https://s3.amazonaws.com/img.vide.me/" + value.cover;
                retSet.img = origin_img_vide_me + value.cover;
            } else {
                //==retSet.img = "https://s3.amazonaws.com/pre-image-w320.vide.me/" + value.item_id + "-pre-i-w320.jpg";
                retSet.img = origin_pre_image_w320_vide_me + value.item_id + "-pre-i-w320.jpg";
            }
        } else {
            if (!$.isEmptyObject(value.cover)) {
                //retSet.img = "https://s3.amazonaws.com/img.vide.me/" + value.cover;
                retSet.img = origin_img_vide_me + value.cover;
            } else {
                //retSet.img = "https://s3.amazonaws.com/img.vide.me/" + value.item_id + ".jpg";
                retSet.img = origin_img_vide_me + value.item_id + ".jpg";
            }
        }
        if (!$.isEmptyObject(value.width) && !$.isEmptyObject(value.height)) {
            //console.log("value.width " + value.width + " value.height " + value.height);

            /*var aspect_percent = Math.round(value.width / 100);
            var height_percent = Math.round(value.height / aspect_percent);*/
            retSet.aspect_percent = Math.round(value.width / 100);
            retSet.height_percent = Math.round(value.height / retSet.aspect_percent);
            //css_aspect_percent = 'style="padding-bottom: ' + height_percent + '%;"';
            //var video_height = Math.round(width / aspect);
            console.log("css_aspect_percent " + value.css_aspect_percent);

        }
        retSet.trueActionClass = 'multi_video'; // TODO: whyfor

        /*if (detectBrowser() == 'safari') {
            mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'>" +
                "<source src='https://s3.amazonaws.com/video.vide.me/" + item_video + ".m3u8' type='application/x-mpegURL'>" +
                "</video>";
        } else {
            mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'></video>";
        }*/

        if (pgwBrowser.os.group !== 'Android' && pgwBrowser.browser.group !== 'Chrome') { // TODO: remove
            //==retSet.source_src = "<source src='https://s3.amazonaws.com/video.vide.me/" + retSet.item_video + ".m3u8' type='application/x-mpegURL'>";
            retSet.source_src = "<source src='" + origin_video_vide_me + retSet.item_video + ".m3u8' type='application/x-mpegURL'>";
        }
        /*mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'>" +
            source_src +
            "</video>";*/
        /*retSet.item_video = value.item_id;
        retSet.item_type = '';*/

        //if (value.post_type == 'update') my_item_edit_type = 'edit_my_video';
        // https://s3.amazonaws.com/pre-video.vide.me/7207783801bb-240out.mp4
        if (!$.isEmptyObject(value.pre_v_w320)) {
            //console.log("showTileTestV4 value.pre_v_w320 " + value.pre_v_w320);
            /*retSet.video_thumbnail = '<div class="videme-v4-tile-video_thumbnail-outer"><div class="videme-v4-tile-video_thumbnail-middle"><div class="videme-v4-tile-video_thumbnail-inner"><video item_id="' + value.item_id + '" src="https://s3.amazonaws.com/pre-video-w320.vide.me/' + value.item_id + '-pre-v-w320.mp4" poster="' + retSet.img + '" loop muted class="videme-v4-tile-video"></video></div></div></div>' +
                '<div class="progress videme-v4-tile-video_thumbnail-load-progress hidden" id="videme-v4-tile-video_thumbnail-load-progress-item-' + value.item_id + '">' +
                '  <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" id="videme-v4-tile-video_thumbnail-load-progress-item-now-' + value.item_id + '"></div>' +
                '</div>';*/
            /* 25082022 retSet.video_thumbnail = '<div class="videme-v4-tile-video_thumbnail-outer"><div class="videme-v4-tile-video_thumbnail-middle"><div class="videme-v4-tile-video_thumbnail-inner"><video item_id="' + value.item_id + '" src="" poster="' + retSet.img + '" loop muted class="videme-v4-tile-video"></video></div></div></div>' +
                '<div class="progress videme-v4-tile-video_thumbnail-load-progress hidden" id="videme-v4-tile-video_thumbnail-load-progress-item-' + value.item_id + '">' +
                '  <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" id="videme-v4-tile-video_thumbnail-load-progress-item-now-' + value.item_id + '"></div>' +
                '</div>';*/
            retSet.class_thumbnail = 'videme-v4-tile-video_thumbnail-toggle';
            /*retSet.video_thumbnail = '<div class="videme-v4-tile-video_thumbnail-outer" id="videme-v4-tile-video_thumbnail-outer_' + retSet.item_id + '"><div class="videme-v4-tile-video_thumbnail-middle" id="videme-v4-tile-video_thumbnail-middle_' + retSet.item_id + '"><div class="videme-v4-tile-video_thumbnail-inner" id="videme-v4-tile-video_thumbnail-inner_' + retSet.item_id + '"></div></div></div>' +
                '<div class="progress videme-v4-tile-video_thumbnail-load-progress hidden" id="videme-v4-tile-video_thumbnail-load-progress-item-' + value.item_id + '">' +
                '  <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" id="videme-v4-tile-video_thumbnail-load-progress-item-now-' + value.item_id + '"></div>' +
                '</div>';*/
            retSet.video_thumbnail = '<div class="d-flex justify-content-center videme-v4-tile-video_thumbnail-wall hidden" item_id="' + retSet.item_id + '" id="videme-v4-tile-video_thumbnail-wall_' + retSet.item_id + '"></div>' +
                '<div class="videme-v4-tile-video_thumbnail-inner hidden" item_id="' + retSet.item_id + '" id="videme-v4-tile-video_thumbnail-inner_' + retSet.item_id + '"></div>' +
                '<div class="progress videme-v4-tile-video_thumbnail-load-progress hidden" id="videme-v4-tile-video_thumbnail-load-progress-item-' + value.item_id + '">' +
                '  <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" id="videme-v4-tile-video_thumbnail-load-progress-item-now-' + value.item_id + '"></div>' +
                '</div>';
        } else {
            //console.log("showTileTestV4 value.pre_v_w320 empty");
        }

    } else if (value.type === 'image') {
        if (value.message_id && value.message_id != "undefined") {
            retSet.href = "https://www.vide.me/i/?i=" + value.href + "&message_id=" + value.message_id;
        } else {
            retSet.href = "https://www.vide.me/i/?i=" + value.href;
        }
        if (value.post_id && value.post_id != "undefined") {
            retSet.href = "https://www.vide.me/i/?i=" + value.href + "&post_id=" + value.post_id;
        } else {
            retSet.href = "https://www.vide.me/i/?i=" + value.href;
        }
        //==retSet.img = "https://s3.amazonaws.com/img.vide.me/" + value.cover;
        retSet.img = origin_img_vide_me + value.cover;
        retSet.trueActionClass = 'image-url';
        retSet.videme_tile_class = 'videme_tile_box_img';
        retSet.videme_tile_boxInner_class = 'videme_tile_boxInner_img';
        retSet.mainInsert = "<img class='videme_tile_img_class' src='" + retSet.img + "' alt=''></img>";
        //videme_tile_img_class = 'videme_tile_img_class';
        retSet.item_type = 'image';

        //if (value.post_type == 'update') my_item_edit_type = 'edit_my_video';
    } else if (value.type === 'event') {
        if (!$.isEmptyObject(value.cover)) {
            //==retSet.img = "https://s3.amazonaws.com/img.vide.me/" + value.cover;
            retSet.img = origin_img_vide_me + value.cover;
            retSet.trueActionClass = 'event_go_url';
            retSet.videme_tile_class = 'videme_tile_box_img';
            retSet.videme_tile_boxInner_class = 'videme_tile_boxInner_img';
            retSet.mainInsert = "<img class='videme_tile_img_class' src='" + retSet.img + "' alt=''></img>";
            //videme_tile_class = 'videme_tile_box_img';
            //videme_tile_boxInner_class = 'videme_tile_boxInner_img';
        }
        if (!$.isEmptyObject(value.cover_video)) {
            if (!$.isEmptyObject(value.cover)) {
                //==retSet.img = "https://s3.amazonaws.com/img.vide.me/" + value.cover;
                retSet.img = origin_img_vide_me + value.cover;
            } else {
                //retSet.img = "https://s3.amazonaws.com/img.vide.me/" + value.cover_video + ".jpg";
                retSet.img = origin_img_vide_me + value.cover_video + ".jpg";
            }
            retSet.trueActionClass = 'multi_video';
            /*if (detectBrowser() == 'safari') {
                mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'>" +
                    "<source src='https://s3.amazonaws.com/video.vide.me/" + item_video + ".m3u8' type='application/x-mpegURL'>" +
                    "</video>";
            } else {
                mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'></video>";
            }*/
            if (pgwBrowser.os.group !== 'Android' && pgwBrowser.browser.group !== 'Chrome') {
                //==retSet.source_src = "<source src='https://s3.amazonaws.com/video.vide.me/" + retSet.item_video + ".m3u8' type='application/x-mpegURL'>";
                retSet.source_src = "<source src='" + origin_video_vide_me + retSet.item_video + ".m3u8' type='application/x-mpegURL'>";
            }
            /*mainInsert = "<video id='tile_multiple_video_" + id_list_group + "_" + courent_id + "' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' poster='" + img + "'>" +
                source_src +
                "</video>";*/
            retSet.its_video = true;
            retSet.item_video = value.cover_video;

        }
        if (!$.isEmptyObject(value.post_id)) {
            retSet.href = "https://www.vide.me/a/?e=" + value.item_id + "&post_id=" + value.post_id;
        } else {
            retSet.href = "https://www.vide.me/a/?e=" + value.item_id;
        }
        //img = "https://s3.amazonaws.com/img.vide.me/" + value.cover;
        //href = "https://www.vide.me/i/?i=" + value.href;
        //trueActionClass = 'image-url';
        //trueActionClass = 'multi_video';
        //trueActionClass = 'event-url';

        //mainInsert = "<img class='videme_tile_img_class' src='" + img + "' alt=''></img>";
        //videme_tile_img_class = 'videme_tile_img_class';
        retSet.item_type = 'event';

        //if (value.post_type == 'update') my_item_edit_type = 'edit_my_event';
    }

    if (!$.isEmptyObject(value.src)) {
        //console.log("value.src -----> " + JSON.stringify(value.src));
        var array_src = [];
        array_src = $.parseJSON(value.src);
        //source_src += "<source src=\"" + sourseURL + showcaseVideoSettings.video + "\" type=\"video/mp4\">";
        $.each(array_src, function (key, value) {
            //console.log("$.fn.showPopTags data.tags -----> cnt: " + value.cnt + " tag " + value.tag);
            //console.log("$.fn.showPopTags each value -----> " + JSON.stringify(value));
            //retSet.source_src += "<source src=\"https://s3.amazonaws.com/video.vide.me/" + value + "\" type=\"video/mp4\">";
            retSet.source_src += "<source src=\"" + origin_video_vide_me + value + "\" type=\"video/mp4\">";
        });
    }
    //console.log('itemTileParamSet retSet ---> ' + JSON.stringify(retSet));
    return retSet;
}

/*function itemTileElementReturn(tempObject, key, value, actionUrlClass, href, img, user_display_name, post_spring, post_user_picture, video_thumbnail, item_type, post_user_display_name) { // TODO: remove
    tempObject.append(
        '<div class="ml-1 mr-1 mb-2 videme-tile-v3-card">' +
        itemTileElementCardA(tempObject, key, value, actionUrlClass, href, img, user_display_name, post_spring, post_user_picture, video_thumbnail, item_type, post_user_display_name) +
        '<div class="videme-tile-v3-card-block">' +
        '   <div class="videme-tile-v3-card-title"><p><span><a class="videme-v3-link shownext" href="' + href + '">' + value.title + '</a></span></p></div>' +
        '<div class="row videme-ralation-card-small222 videme-tile-v3-card-user-place">' +
        '<div class="col-2 videme-relation-card-1-column222 videme-tile-v3-profile2">' +
        '<img src="' + origin_img_vide_me + post_user_picture + '" class="rounded-circle videme-relation-card-img-tile-v3 profile-avatar2" alt="">' +
        '</div>' +
        '<div class="col-8 videme-relation-card-2-column222">' +
        '<div class="d-flex justify-content-between align-items-center  meta2 videme-tile-v3-card-text-user_display_name2">' +
        '<a class="videme-v3-link" href="https://www.vide.me/' + post_spring + '">' + post_user_display_name + '</a>' +
        '</div>' +
        '<div class="d-flex justify-content-between align-items-center videme-tile-v3-card-text-date"><p><small>' +
        timeToWord(value.created_at) +
        '</small></p></div>' +
        '</div>' +
        '<div class="col-2 videme-relation-card-1-column222 videme-tile-v3-profile2>" >' +
        '<div class="show_action_button_showcase videme-v3-item-action-button">' +
        showDropdownForDoorbelSignV3(value) +
        '</div>' +
        '</div>' +
        '<div class="videme-tile-v3-card-footer">' +
        '<!---<small>Last updated 3 mins ago</small>' +
        '<button class="btn btn-info float-right btn-sm">Follow</button>-->' +
        showItemInfoV3(value) +
        '</div>' +
        '</div>' +
        '</div>');
}*/
function itemTileElementReturn(tempObject, key, value, actionUrlClass, href, img, user_display_name, post_spring, post_user_picture, video_thumbnail, item_type, post_user_display_name, user_tags_conf, user_tags_conf_new, retSet) { // 01082022
    tempObject.append(
        '<div class="ms-1 me-1 mb-2 videme-tile-v3-card">' +
        itemTileElementCardA(tempObject, key, value, actionUrlClass, href, img, user_display_name, post_spring, post_user_picture, video_thumbnail, item_type, post_user_display_name, user_tags_conf_new, retSet) +
        '<div class="videme-tile-v3-card-block">' +
        itemTileElementCardTitle(value, href) +
        itemTileElementCardUserCard(value, post_spring, post_user_picture, post_user_display_name, user_tags_conf) +
        '<div class="videme-tile-v3-card-footer">' +
        '<!---<small>Last updated 3 mins ago</small>' +
        '<button class="btn btn-info float-right btn-sm">Follow</button>-->' +
        showItemInfoV3(value) +
        '<div class="show_action_button_showcase videme-v3-item-action-button">' +
        showDropdownForDoorbelSignV3(value) +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');
}

function itemTileElementCardA(tempObject, key, value, actionUrlClass, href, img, user_display_name, post_spring, post_user_picture, video_thumbnail, item_type, post_user_display_name, user_tags_conf_new, retSet) { // 01082022
    //console.log('itemTileElementCardA ---> ok');
    //console.log('itemTileElementCardA ---> ' + JSON.stringify(showTask));
    return '<a class="' + actionUrlClass + '"' +
        ' action_url_class="' + actionUrlClass + '"' +
        ' video="' + value.video + '"' +
        ' type="' + value.type + '"' +
        ' message_id="' + value.message_id + '"' +
        ' user_display_name="' + user_display_name + '"' +
        ' created_at="' + value.created_at + '"' +
        ' updated_at="' + value.updated_at + '"' +
        ' title="' + value.title + '"' +
        ' content="' + value.content + '"' +
        ' cover="' + value.cover + '"' +
        ' item_id="' + value.item_id + '"' +
        ' post_id="' + value.post_id + '"' +
        ' spring="' + post_spring + '"' +
        ' user_picture = "' + post_user_picture + '"' +
        ' to_user_id="' + value.to_user_id + '"' +
        ' from_user_id="' + value.from_user_id + '"' +
        ' from_user_display_name="' + value.from_user_display_name + '"' +
        ' from_user_name="' + value.user_display_name + '"' +
        ' file="' + value.item_id + '"' +
        ' video_duration="' + value.video_duration + '"' +
        ' item_count_show="' + value.item_count_show + '"' +
        ' access="' + value.access + '"' +
        //'tags="' + tags + '"' +
        //'ext_links="' + ext_links + '"' +
        ' href="' + href + '" id="el_' + key + '">' +
        '<div class="videme-tile-v3-wrap-card-img-top" id="videme-tile-v3-wrap-card-img-top_' + retSet.item_id + '" item_id="' + retSet.item_id + '" style="background-image: url(\'' + img + '\')">' +
        '<!--<img class="videme-tile-v3-card-img-top" src="' + img + '"/>-->' +
        '<img src="' + img + '" class="videme-tile-v3-wrap-card-top-img ' + retSet.class_thumbnail + '"  id="' + retSet.class_thumbnail + '_' + retSet.item_id + '" item_id="' + retSet.item_id + '" />' +
        video_thumbnail +
        '<div class="videme-tile-v3-card-item-type">' + item_type + '</div>' +
        user_tags_conf_new +
        '</div>' +
        '</a>';
}

function itemMediaListImage(img) { // 01082022
    //console.log('itemTileElementCardA ---> ok');
    //console.log('itemTileElementCardA ---> ' + JSON.stringify(showTask));
    return '<img src="' + img + '" class="img-fluid" alt="">';
}

function itemTileElementCardTitle(value, href) { // 01082022
    //console.log('itemTileElementCardA ---> ok');
    //console.log('itemTileElementCardA ---> ' + JSON.stringify(showTask));
    return '<div class="videme-tile-v3-card-title"><p><span><a class="videme-v3-link shownext" href="' + href + '">' + value.title + '</a></span></p></div>';
}

function itemTileElementCardUserCard(value, post_spring, post_user_picture, post_user_display_name, user_tags_conf) { // 01082022
    //console.log('itemTileElementCardA ---> ok');
    //console.log('itemTileElementCardA ---> ' + JSON.stringify(showTask));
    if (!user_tags_conf) user_tags_conf = '';
    return '<div class="row videme-ralation-card-small222 videme-tile-v3-card-user-place">' +
        '<div class="col-2 videme-relation-card-1-column222 videme-tile-v3-profile2">' +
        '<img src="' + origin_img_vide_me + post_user_picture + '" class="rounded-circle videme-relation-card-img-tile-v3 profile-avatar2" alt="">' +
        '</div>' +
        '<div class="col-10 videme-relation-card-2-column222">' +
        '<div class="d-flex justify-content-between align-items-center meta2 videme-tile-v3-card-text-user_display_name2">' +
        '<a class="videme-v3-link d-flex" href="https://www.vide.me/' + post_spring + '"><div class="videme-tile-user-spring">' + post_user_display_name + '</div>' + user_tags_conf + '</a>' +
        '</div>' +
        '<div class="d-flex justify-content-between align-items-center videme-tile-v3-card-text-date"><p><small>' +
        timeToWord(value.created_at) +
        '</small></p></div>' +
        '</div>' +
        '</div>';

}

function videoThumbnail() { // 01082022 // remove? 13092022
    //const videos = document.querySelectorAll("video");
    const videos = document.querySelectorAll("video.videme-v4-tile-video");
    //const videos = $('.videme-v4-tile-video');
    return true; // <---------------------

    videos.forEach(video => {
        video.addEventListener("mouseover", function () {
            //this.play();
            console.log('showTileTestV4 play');
            console.log('hoverVideo src ' + $(this).data("src"));
            var $this = this;
            //console.log('hoverVideo $this src ' + $this.data("src"));
            //console.log('hoverVideo attr src ' + $this.attr("src"));
            //scr = origin_pre_video_w320_vide_me + value.item_id + '-pre-v-w320.mp4';
            $(this).attr("src", origin_pre_video_w320_vide_me + $this.getAttribute('item_id') + '-pre-v-w320.mp4');
            console.log('hoverVideo attr src ' + $(this).attr("src"));
            $("#videme-v4-tile-video_thumbnail-load-progress-item-" + $this.getAttribute('item_id')).removeClass('hidden');
            this.play();
        })

        video.addEventListener("mouseout", function () {
            this.pause();
            var $this = this;
            $("#videme-v4-tile-video_thumbnail-load-progress-item-" + $this.getAttribute('item_id')).addClass('hidden');
        })

        video.addEventListener("touchstart", function () {
            this.play()
        })

        video.addEventListener("touchend", function () {
            this.pause()
        })
        /*===================================================*/
        video.addEventListener('loadstart', handleEvent);
        video.addEventListener('progress', handleEvent);
        video.addEventListener('canplay', handleEvent);
        video.addEventListener('canplaythrough', handleEvent);

        video.addEventListener('progress', function () {
            var loadedPercentagePre = this.buffered.end(0) / this.duration;
            //console.log('showTileTestV4 addEventListener this.buffered.end(0) ---> ' + this.buffered.end(0));
            //console.log('showTileTestV4 addEventListener this.duration ---> ' + this.duration);
            //console.log('showTileTestV4 addEventListener loadedPercentagePre ---> ' + loadedPercentagePre);
            var $this = this;
            //console.log('showTileTestV4 addEventListener $this ---> ' + $this);
            //console.log('showTileTestV4 addEventListener $this.attr(\'item_id\') ---> ' + $this.attr('item_id'));
            //==console.log('showTileTestV4 addEventListener $this.getAttribute ---> ' + $this.getAttribute('item_id'));
            //console.log('showTileTestV4 addEventListener this.attr ---> ' + this.attr('item_id'));
            //console.log('showTileTestV4 addEventListener this.getAttribute ---> ' + this.getAttribute('item_id'));
            var loadedPercentage = Math.round(loadedPercentagePre * 100);
            console.log('videoThumbnail addEventListener loadedPercentage ---> ' + $this.getAttribute('item_id') + ' %' + loadedPercentage);
            $("#videme-v4-tile-video_thumbnail-load-progress-item-now-" + $this.getAttribute('item_id'))
                .css('width', loadedPercentage + '%')
                .attr('aria-valuenow', loadedPercentage);
            if (loadedPercentage > 90) $("#videme-v4-tile-video_thumbnail-load-progress-item-" + $this.getAttribute('item_id')).addClass('hidden');

        });
        /*===================================================*/
    });
}
/* skin tile preview start */
function returnVideoPreview(param) {
    console.log( "returnVideoPreview param -----> " + param + retTimeForLog());
    //is_played = true;
    //console.log( "returnVideoPreview is_played -----> " + is_played + " <-----");
    //console.log( "returnVideoPreview is_pre_played -----> " + is_pre_played + " <-----");
    return "<video item_id='" + param + "' src='" + origin_pre_video_w320_vide_me + param + "-pre-v-w320.mp4' poster='' loop muted autoplay='' class='videme-v4-tile-video' id='videme-v4-tile-video_" + param + "'></video>";
}
function checkBuffered (param) {
    console.log( "checkBuffered -----> " + JSON.stringify(param) + retTimeForLog());
    //console.log( "checkBuffered is_played -----> " + is_played + " <-----");
    //console.log( "checkBuffered is_pre_played -----> " + is_pre_played + " <-----");
//==        if (!is_played) {
    var buffPerc = player.bufferedPercent();
    // rest of your code without setTimeout/setInterval
    console.log( "checkBuffered player buffPerc -----> " + buffPerc + retTimeForLog());

    var loadedPercentage = Math.round(buffPerc * 100);
    //$("#videme-v4-tile-video_thumbnail-load-progress-item-" + param.item_id).removeClass('hidden');
    var is_pre_played_state = videmeSkinTileGetStateVideoPreviewPre(param);
    if (is_pre_played_state == 'true') {
        videmeSkinTileShowProgress(param);
    }

    console.log('videoThumbnail addEventListener loadedPercentage ---> ' + param.item_id + ' %' + loadedPercentage + retTimeForLog());
    $("#videme-v4-tile-video_thumbnail-load-progress-item-now-" + param.item_id)
        .css('width', loadedPercentage + '%')
        .attr('aria-valuenow', loadedPercentage);

    if (loadedPercentage > 50) {
    }
//==                }
}

function openVideo (param) {
    //var buffPerc = player.bufferedPercent();
    // rest of your code without setTimeout/setInterval
    console.log( "openVideo -----> " + JSON.stringify(param) + retTimeForLog());

    //$('#videme-v4-tile-video_thumbnail-wall_' + param.item_id).addClass('hidden');
    videmeSkinTileHideWall(param);
    $('#videme-v4-tile-video_thumbnail-inner_' + param.item_id).removeClass('hidden');
    //$("#videme-v4-tile-video_thumbnail-load-progress-item-" + param.item_id).addClass('hidden');
    videmeSkinTileHideProgress(param);
    player.play();
    is_played = true;
    is_pre_played = false;
    videmeSkinTileSetStateVideoPreviewPre({'item_id': param.item_id, 'is_pre_played_state': 'false'});
}

function removeVideo (param) {
    //var buffPerc = player.bufferedPercent();
    // rest of your code without setTimeout/param
    console.log( "removeVideo -----> " + JSON.stringify(param) + retTimeForLog());
    player.dispose();
    $('#videme-v4-tile-video_thumbnail-toggle_' + param.item_id).removeClass('hidden');
    $('#videme-v4-tile-video_thumbnail-wall_' + param.item_id).addClass('hidden');
    videmeSkinTileHideWall(param);
    $('#videme-v4-tile-video_thumbnail-inner_' + param.item_id).addClass('hidden').empty();
    is_played = false;
    is_pre_played = false;
    videmeSkinTileSetStateVideoPreview({'item_id': param.item_id, 'is_played_state': 'false'});
    videmeSkinTileSetStateVideoPreviewPre({'item_id': param.item_id, 'is_pre_played_state': 'false'});
}
function videmeSkinTileHideWall(param) {
    console.log( "videmeSkinTileHideWall -----> " + JSON.stringify(param) + retTimeForLog());

    $('#videme-v4-tile-video_thumbnail-wall_' + param.item_id).addClass('hidden');

}
function videmeSkinTileShowWall(param) {
    console.log( "videmeSkinTileShowWall -----> " + JSON.stringify(param) + retTimeForLog());

    $('#videme-v4-tile-video_thumbnail-wall_' + param.item_id).removeClass('hidden');

}
function videmeSkinTileSetStateVideoPreview(param) {
    console.log( "videmeSkinTileSetStateVideoPreview -----> " + JSON.stringify(param) + retTimeForLog());

    $('#videme-v4-tile-video_thumbnail-inner_' + param.item_id).attr('is_played_state', param.is_played_state);

}
function videmeSkinTileGetStateVideoPreview(param) {
    console.log( "videmeSkinTileGetStateVideoPreview -----> " + JSON.stringify(param) + retTimeForLog());

    return   $('#videme-v4-tile-video_thumbnail-inner_' + param.item_id).attr('is_played_state');

}
function videmeSkinTileSetStateVideoPreviewPre(param) {
    console.log( "videmeSkinTileSetStateVideoPreviewPre -----> " + JSON.stringify(param) + retTimeForLog());

    $('#videme-v4-tile-video_thumbnail-inner_' + param.item_id).attr('is_pre_played_state', param.is_pre_played_state);

}
function videmeSkinTileGetStateVideoPreviewPre(param) {
    console.log( "videmeSkinTileGetStateVideoPreviewPre -----> " + JSON.stringify(param) + retTimeForLog());

    return   $('#videme-v4-tile-video_thumbnail-inner_' + param.item_id).attr('is_pre_played_state');

}
function retTimeForLog() {
    return " time: " + performance.now();

}
function videmeSkinTileShowProgress(param) {
    console.log( "videmeSkinTileShowProgress -----> " + JSON.stringify(param) + retTimeForLog());
    $("#videme-v4-tile-video_thumbnail-load-progress-item-" + param.item_id).removeClass('hidden');
}
function videmeSkinTileHideProgress(param) {
    console.log( "videmeSkinTileHideProgress -----> " + JSON.stringify(param) + retTimeForLog());
    $("#videme-v4-tile-video_thumbnail-load-progress-item-" + param.item_id).addClass('hidden');
}
/* skin tile preview stop */


function handleEvent(event) { // 02082022 why for?
    //eventLog.textContent = eventLog.textContent + `${event.type}\n`;
    console.log('showTileTestV4 handleEvent event --->' + event.type);
}

function getRandomCover() { // 01082022 recreate
    /*var cover = [
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
    ];*/
    /*var cover = [
        'https://s3.amazonaws.com/img.vide.me/interest_flowers.jpg',
        'https://s3.amazonaws.com/img.vide.me/kiwi-fruit-228928.jpg',
        'https://s3.amazonaws.com/img.vide.me/aquatic-animals.jpg',
        'https://s3.amazonaws.com/img.vide.me/800px_COLOURBOX2255721.jpg',
        'https://s3.amazonaws.com/img.vide.me/burrowing-owls-parliament.jpg.653x0_q80_crop-smart.jpg',
        'https://s3.amazonaws.com/img.vide.me/trees.jpg',
        'https://s3.amazonaws.com/img.vide.me/78809294.jpg',
        'https://s3.amazonaws.com/img.vide.me/sand-01_1024x1024.jpg',
        'https://s3.amazonaws.com/img.vide.me/winter-scene.jpg',
        'https://s3.amazonaws.com/img.vide.me/nemophila-hitachi-seaside-park-japan-GettyImages-545033958.jpg',
        'https://s3.amazonaws.com/img.vide.me/hot1.jpg',
        'https://s3.amazonaws.com/img.vide.me/12734-fall-landscape-reflecting-on-a-lake-pv.jpg'
    ];*/
    var cover = [
        'sunset-1373171_960_720.jpg',
        'fall-leaves-3744649_960_720.jpg',
        'landscape-2090495_960_720.jpg',
        'windrader-1048981_960_720.jpg',
        'wave-3473335_960_720.jpg'
    ];
    return cover[Math.floor(Math.random() * cover.length)];
}

function getRandomImage() { // 01082022 recreate
    var image = [
        'https://kolonial.no/media/uploads/public/132/24/643224-f617a-product_detail.jpg',
        'https://www.freewebheaders.com/wordpress/wp-content/gallery/clouds-sky/clouds-sky-header-2067-1024x300.jpg',
        'https://www.agropopular.com/wp-content/audios_agropopular/2017/04/6naranja-696x708.png'
    ];
    return image[Math.floor(Math.random() * image.length)];
}

/* 02082022 function paddingButtonMySpring(paddingButtonMySpring) {
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
}*/

/* 02082022 function paddingButtonSpring(paddingButtonSpring) { // not work into jquery block
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
}*/

function sidebarToggleButton() { /* why for???*/
    $('#videme-sidebar-button-icon').toggleClass('glyphicon-menu-hamburger');
    $('#videme-sidebar-button-icon').toggleClass('glyphicon-menu-left');
}

function sidebarToggleHidde() { // 02082022 whu for???
    /*$('.tmpEvent').animate(
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
    );*/
    return false;
}

function goToUrl(goToUrl) { // 02082022
    var jqxhr = $.getJSON(goToUrl, function () {
        console.log("goToUrl success");
    })
        .done(function () {
            console.log("goToUrl second success");
            return jqxhr;
        })
        .fail(function () {
            console.log("goToUrl error");
        })
        .always(function () {
            console.log("goToUrl complete");
        });

// Perform other work here ...

// Set another completion function for the request above
    /*jqxhr.complete(function() {
        console.log( "goToUrl second complete" );
    });*/
}

function item_count_add(item_id) { // 02082022
    //var ret = goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + item_id + "&nad=" + $.cookie('vide_nad'));
    //console.log("item_count_add ret " + JSON.stringify(ret));
    //var jqxhr = $.getJSON('https://api.vide.me/system/items/item_count_add/?item=' + item_id + "&nad=" + $.cookie('vide_nad'), function () {
    var urlI = 'https://api.vide.me/system/items/item_count_add/?item=' + item_id + "&nad=" + $.cookie('vide_nad');
    console.log("item_count_add goToUrl urlI " + urlI);
    var next_item_id = getParameterByName('m');
    $.cookie('vide_prev_item_id', next_item_id, {expires: 14, path: '/', domain: 'vide.me', secure: true});

    var jqxhr = $.getJSON(urlI, function (jsonData) {
        if (jsonData) {
            console.log("item_count_add goToUrl success");
            console.log("item_count_add jsonData " + JSON.stringify(jsonData));
            if (!$.isEmptyObject(jsonData.response)) {
                if (jsonData.response == 'new_view') {
                    console.log("item_count_add new_view jsonData.views_stars " + jsonData.views_stars);
                }
            }
            if (!$.isEmptyObject(jsonData.response)) {
                if (jsonData.response == 'new_views_stars') {
                    console.log("item_count_add new_views_stars jsonData.views_stars " + jsonData.views_stars);
                    $('.videme_nav_badge_views_stars').addClass('text-danger').html(jsonData.views_stars);
                }
            }

        }

    })
        .done(function () {
            console.log("goToUrl second success");
            //return jqxhr;

        })
        .fail(function () {
            console.log("item_count_add goToUrl error");
        })
        .always(function () {
            console.log("item_count_add goToUrl complete");
        });

}

/***************************************************************************
 * Выжимка Id видео из ссылки/вставки youtube
 ***************************************************************************/
// TODO: Добавить - (минус) в ссылке
// https://gist.githubusercontent.com/takien/4077195/raw/0a02f407796f8d538531821ab99109b57924f607/youtubeID.js
function YouTubeGetID(url) { // 02082022
    var ID = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_]/i);
        ID = ID[0];
    } else {
        ID = url;
    }
    return ID;
}

/***************************************************************************
 * Узнать дату
 ***************************************************************************/
function getRealDate() { // 02082022 TODO: remove from
    /*var now = new Date();
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
    return getRealDate;*/
    return false;
}

/***************************************************************************
 * Узнать время
 ***************************************************************************/
 function getRealTime() { // 02082022 TODO: remove from
    /*var now = new Date();
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
    return getRealTime;*/
    return false;
}

function timeToWord(timeToWord) { // 02082022
    /* work
    var current = Math.floor(Date.now() / 1000);
    timeToWord = timeToWord.substr(0, 19);
    if (detectBrowser() === 'ie' || detectBrowser() === 'safary') timeToWord = parseDate(timeToWord);
    var previousMs = new Date(timeToWord);
    //console.log("timeToWord previousMs --->" + previousMs);
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
    }*/
    var true_created_at = moment(timeToWord);
    return true_created_at.fromNow();

}

function periodToWord(startTime, stopTime) { // 02082022 recreate
    /*    var current = Math.floor(Date.now() / 1000);
        timeToWord = timeToWord.substr(0, 19);
        if (detectBrowser() === 'ie' || detectBrowser() === 'safary') timeToWord = parseDate(timeToWord);
        var previousMs = new Date(timeToWord);
        //console.log("timeToWord previousMs --->" + previousMs);
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
        }*/

    var startTimeM = moment(startTime);
    var stopTimeM = moment(stopTime);
    console.log("periodToWord startTime --->" + startTime);
    console.log("periodToWord startTime .day() --->" + startTimeM.date());
// month
    /*if (date('Y', $startTime) != date('Y', $endTime)) {
            // в разные годы
            // Y 	Порядковый номер года, 4 цифры
            //echo date('F j, Y',$startTime) . " to " . date('F j, Y',$endTime);
            return date('F j, Y', $startTime) . " to " . date('F j, Y', $endTime);
        } else {
            if ((date('j', $startTime) == 1) && (date('j', $endTime) == date('t', $endTime))) {
                // Первый и послений день месяца
                // j День месяца без ведущего нуля && t Количество дней в указанном месяце
                //echo date('F',$startTime) . " to " . date('F, Y',$endTime);
                return date('F', $startTime) . " to " . date('F, Y', $endTime);
            } else {
                if (date('m', $startTime) != date('m', $endTime)) {
                    // месяц старта не равен месяцу конца
                    // m 	Порядковый номер месяца с ведущим нулём
                    //echo date('F j',$startTime) . " to " . date('F j, Y',$endTime);
                    return date('F j', $startTime) . " to " . date('F j, Y', $endTime);
                } else {
                    //echo date('F j',$startTime) . " to " . date('j, Y',$endTime);
                    return date('F j', $startTime) . " to " . date('j, Y', $endTime);
                }
            }
        }
        // F 	Полное наименование месяца, например*/
    if (startTimeM.year() !== stopTimeM.year()) {
        // в разные годы
        return startTimeM.format("dddd, MMMM Do YYYY, h:mm:ss a") + ' to ' + stopTimeM.format("dddd, MMMM Do YYYY, h:mm:ss a");
    } else {
        // в один год
        if (startTimeM.date() == 1 && (stopTimeM.date() == stopTimeM.daysInMonth())) {
            // Первый и послений день месяца
            return startTimeM.format("MMMM ") + ' to ' + stopTimeM.format("MMMM Do YYYY");
        } else {
            if (startTimeM.month() !== stopTimeM.month()) {
                // месяц старта не равен месяцу конца
                return startTimeM.format("dddd, MMMM") + ' to ' + stopTimeM.format("dddd, MMMM");
            } else {
                if (startTimeM.date() == stopTimeM.date()) {
                    // это один и тотже день
                    return startTimeM.format("MMMM, Do");
                } else {
                    return startTimeM.format("MMMM, Do") + ' to ' + stopTimeM.format("Do");
                }
            }
        }
    }
}

function text_overlay(text_overlay) { // 02082022 recreate
    //var text_overlayTrue = paddingUserInfo(text_overlay);
    //console.log("text_overlay text_overlayTrue --->" + JSON.stringify(text_overlayTrue));
    if ($.isEmptyObject(text_overlay.started_at) &&
        $.isEmptyObject(text_overlay.stopped_at) &&
        $.isEmptyObject(text_overlay.item_country) &&
        $.isEmptyObject(text_overlay.item_city) &&
        $.isEmptyObject(text_overlay.place)) return '';
    var item_country = '';
    var item_city = '';
    var place = '';
    var commonDate = '';
    if (!$.isEmptyObject(text_overlay.started_at) && !$.isEmptyObject(text_overlay.stopped_at))
        commonDate = periodToWord(text_overlay.started_at, text_overlay.stopped_at);
    if (!$.isEmptyObject(text_overlay.item_country))
        item_country = text_overlay.item_country + ', ';
    if (!$.isEmptyObject(text_overlay.item_city))
        item_city = text_overlay.item_city + ', ';
    if (!$.isEmptyObject(text_overlay.place))
        place = text_overlay.place;
    return '<a class="event_go_url" href="https://www.vide.me/a/?e=' + text_overlay.item_id + '"><div class="videme-tile-signboard-overlay">' +
        '<div class="videme-tile-signboard-overlay-1st">' + item_country +
        item_city +
        place + '</div>' +
        '</br>' +
        '<div class="videme-tile-signboard-overlay-2nd">' + commonDate + '</div>' +
        '</div></a>';
}

function embed_text_overlay(embed_text_overlay) { // 02082022 recreate
    //var text_overlayTrue = paddingUserInfo(text_overlay);
    //console.log("text_overlay text_overlayTrue --->" + JSON.stringify(text_overlayTrue));
    /*if ($.isEmptyObject(text_overlay.started_at) &&
        $.isEmptyObject(text_overlay.stopped_at) &&
        $.isEmptyObject(text_overlay.item_country) &&
        $.isEmptyObject(text_overlay.item_city) &&
        $.isEmptyObject(text_overlay.place)) return '';
    var item_country = '';
    var item_city = '';
    var place = '';
    var commonDate = '';
    if (!$.isEmptyObject(text_overlay.started_at) && !$.isEmptyObject(text_overlay.stopped_at))
        commonDate = periodToWord(text_overlay.started_at, text_overlay.stopped_at);
    if (!$.isEmptyObject(text_overlay.item_country))
        item_country = text_overlay.item_country + ', ';
    if (!$.isEmptyObject(text_overlay.item_city))
        item_city = text_overlay.item_city + ', ';
    if (!$.isEmptyObject(text_overlay.place))
        place = text_overlay.place;*/
    var title = embed_text_overlay.title;
    var title_embed = title.slice(0, 50);
    //var title_embed = title;
    return '<a class="event_go_url" target="_blank" href="https://www.vide.me/a/?v=' + embed_text_overlay.item_id + '"><div class="videme-tile-signboard-overlay"><div class="videme-tile-signboard-overlay-1st">Vide.me | ' + title_embed + '</div></div></a>';
}

function embed_text_overlay_next(embed_text_overlay_next) { // 02082022 recreate
    //console.log("embed_text_overlay_next ---> " + JSON.stringify(embed_text_overlay_next));

    var title = embed_text_overlay_next.title;
    var title_embed = title.slice(0, 50);
    //var title_embed = title;
    return '<div class="videme-tile-signboard-overlay" style="background-image: url(\'' + origin_img_vide_me + embed_text_overlay_next.item_id + '.jpg\');width: 15em;height: 8em; background-repeat: no-repeat;background-size: 15em auto;">\n' +
        '<a class="event_go_url" href="https://www.vide.me/v?m=' + embed_text_overlay_next.item_id + '" style="left: 4px;position: absolute;right: 4px;top: 4px;">\n' +
        '<div class="videme-tile-signboard-overlay-1st" style="float: right">' + title_embed + '</div>\n' +
        '</a>\n' +
        '<div id="countdownCancel" style="float: left;position: absolute;bottom: 4px;left: 4px;" type="button" class="btn btn-secondary btn-sm">\n' +
        '<div class="countdownShowcase" style="padding-left: .1rem;float: left;padding-right: .5rem;"></div>\n' +
        'Cancel</div>\n' +
        '</div>';
    // Run countdown function
    //countdownShowcase();
}

//var countdownShowcaseButton = $("#countdownCancel")
// Do countdown
var statusCountdown = true; // 02082022 parent above

// handle click and add class
//countdownShowcaseButton.on("click", function(){
$(document).on('click', '#countdownCancel', function (event) { // 02082022 parent above
    //console.log("countdownShowcaseButton ---> ");
    //banner.addClass("alt");
    statusCountdown = false;
})

// Total seconds to wait
var countdownShowcaseSeconds = 10;

function countdownShowcase(countdownShowcaseVar) { // 02082022 recreate  parent above
    console.log("function countdownShowcase ---> " + countdownShowcaseSeconds);
    /*if (statusCountdown) {
        countdownShowcaseSeconds = countdownShowcaseSeconds - 1;
        setInterval(function () {
        if (countdownShowcaseSeconds < 0) {
            // Chnage your redirection link here
            //window.location = "https://www.vide.me/v?m=" + countdownShowcaseVar.item_id;
        } else {
            //countdownShowcaseSeconds = countdownShowcaseSeconds - 1;

            // Update remaining seconds
            //document.getElementById("countdown").innerHTML = seconds;
            // Count down using javascript
            //window.setTimeout("countdownShowcase()", 1000);
            //window.setTimeout(countdownShowcase(countdownShowcaseVar), 10000);
            //window.setTimeout("countdownShowcase(countdownShowcaseVar)", 1000);
            countdownShowcase(countdownShowcaseVar);
        }
        }, 1000);
    }
    // Update remaining seconds
    //document.getElementById("countdownShowcase").innerHTML = countdownShowcaseSeconds;
    $("#countdownShowcase").html(countdownShowcaseSeconds);*/
    var showcase_next_item = $('#showcaseNext').data('showcase_next_item');
    console.log("function countdownShowcase showcase_next_item ---> " + JSON.stringify(showcase_next_item));

    if (!$.isEmptyObject(showcase_next_item.item_id)) {
        var timeleft = 9;
        var downloadTimer = setInterval(function () {
            if (timeleft <= 0) {
                console.log("function countdownShowcase timeleft ---> Finished");
                clearInterval(downloadTimer);
                //document.getElementById("countdownShowcase").innerHTML = "Finished";
                $(".countdownShowcase").html("0");
                window.location = "https://www.vide.me/v?m=" + showcase_next_item.item_id;
            } else {
                console.log("function countdownShowcase timeleft ---> " + timeleft);
                //document.getElementById("countdownShowcase").innerHTML = timeleft + " seconds remaining";
                $(".countdownShowcase").html(timeleft);
            }
            if (statusCountdown) {
                timeleft -= 1;
            }
        }, 1000);
    } else {
        console.log("function countdownShowcase showcase_next_item ---> empty");
    }
}

// https://stackoverflow.com/questions/44314288/ie-date-parse-returns-nan
/*  02082022 function parseDate(parseDate) {
    var str = parseDate.replace(/^(.*-[0-9][0-9])(\ )([0-9][0-9]\:.*$)/, '$1T$3')
    var d = Date.parse(str);
    return d;
}*/

/*
 How can I get query string values in JavaScript?
 */
function getParameterByName(name, url) { // 02082022
    console.log('videme_func1.js function getParameterByName name: ' + name);
    /*if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));*/
    /*https://stackoverflow.com/questions/5237725/take-a-url-variable-with-regex*/
    if (typeof (url) === 'undefined')
        url = window.location.href;
    var match = url.match('[?&]' + name + '=([^&]+)');
    return match ? match[1] : null;
}

/* 02082022 function getUrlParameter(sParam) { // another  function above
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
}*/

/* 02082022 function urlIfParamExist(paramName) {
    var url = window.location.href;
    if (url.indexOf('?' + paramName + '=') != -1)
        return true;
    else if (url.indexOf('&' + paramName + '=') != -1)
        return true;
    return false
}*/

/* 02082022 function getContactsGoogle() {
    var config = {
        'client_id': '415758327138-lddhq1t058os5o8b6lrmja75t56hi0el.apps.googleusercontent.com',
        'scope': 'https://www.google.com/m8/feeds'
    };
    gapi.auth.authorize(config, function () {
        fetch(gapi.auth.getToken());

    });
}*/

/* 02082022 function fetch(token) {
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
                    /!*for (var j = 0, item; item = link[j]; j++) {
                     console.log("contact item -----> " + JSON.stringify(item));
                     console.log("contact item.type -----> " + item.type);
                     $('#videme-showcontacts').append("<a href=\"\"class='showContactsItem' email='" + contact.name + "'>GET CONTACTS FEED</a><br>name: " + contact.name + " email " + JSON.stringify(contact.emails)+ "<br>");
                     if (item.type == 'image/!*') {
                     //if (item.type == 'href') {
                     console.log("contact image/!* -----> " + item.href);
                     //$('#videme-showcontacts').append("<br>image<img src='" + item.href + "&access_token=" + token.access_token + "' width='189' height='255' alt=''><br>");
                     }
                     }*!/
                    console.log("contact contact -----> " + JSON.stringify(contact));
                }
                contacts.push(contact);
            });
        }
    });
}*/

/* 02082022 function filter_array(test_array) {
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
}*/

/* 02082022 function filter_obj(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
}*/

/* 02082022 function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};*/

/* 02082022 function padding_item_object(padding_item_object) { // TODO: delete
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
    if (padding_item_object.ext_links)
        true_item.ext_links = padding_item_object.ext_links;
}*/

var videmeUI = new Thing('Joe');

function Thing(name333) {
    //console.log('Thing this ' + this);

    this.name333 = name333;
    //console.log('Thing this.name333 ' + this.name333);

}

function dateFromPG(dateFromPG) { // 02082022
    var datePG;
    if (!$.isEmptyObject(dateFromPG.created_at)) {
        datePG = dateFromPG.created_at;
    }
    if (!$.isEmptyObject(dateFromPG.updated_at)) {
        datePG = dateFromPG.updated_at;
    }
    console.log('datePG', datePG);
    return datePG;
}

/*function parseUrl() {
    var parseUrl = {};
    parseUrl.location = window.location.pathname;
    parseUrl.path = parseUrl.location.substring(0, parseUrl.location.lastIndexOf("/"));
    //springRaw = parseUrl.path.substring(parseUrl.path.lastIndexOf("/")+1);
    parseUrl.spring = parseUrl.location.replace(/^\/|\/$/g, '');
    if (getParameterByName('album')) {
        parseUrl.album = getParameterByName('album');
    } else {
        parseUrl.album = '';
    }
    return parseUrl;
}*/
function parseUrl() { // 02082022
    console.log('videme_func1.js function parseUrl');
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
}

function eventScroll() { // 02082022 TODO: recreate
//    ga('send', 'event', 'scroll', 'down');
}

function makeid() { // 02082022
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 12; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

/*function removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}*/
function removeURLParameter(url, parameter) { // 02082022 TODO: recreate public function htmlButtonSocShareAllNoLabel
    //prefer to use l.search if you have a location/link object
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
        for (var i = pars.length; i-- > 0;) {
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }

        return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
    }
    return url;
}

function nFormatter(num, digits) { // 02082022 TODO: why for
    var si = [
        {value: 1, symbol: ""},
        {value: 1E3, symbol: "K"},
        {value: 1E6, symbol: "M"},
        {value: 1E9, symbol: "G"},
        {value: 1E12, symbol: "T"},
        {value: 1E15, symbol: "P"},
        {value: 1E18, symbol: "E"}
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

function fReturnButton_friend_request(data) { // 02082022
    var html = '';
    if (!$.isEmptyObject(data.user_id)) {
        html = '<a class="btn btn-sm btn-outline-success videme-relation-card-button-connect friend_request" user_id="' + data.user_id + '" href="https://api.vide.me/v2/friendship/request/?user_id=' + data.user_id + '&nad=' + $.cookie('vide_nad') + '">Add friend</a><a class="btn btn-sm btn-outline-success videme-relation-card-button-connect-small videme-round-button friend_request" user_id="' + data.user_id + '" href="https://api.vide.me/v2/friendship/request/?user_id=' + data.user_id + '&nad=' + $.cookie('vide_nad') + '"><i class="fa fa-user-plus" aria-hidden="true"></i></a>';
    }
    return html;
}

function fReturnButton_friend_pending() { // 02082022
    return '<a class="btn btn-sm btn-outline-success videme-relation-card-button-connect disabled">Pending</a><a class="btn btn-sm btn-outline-success videme-relation-card-button-connect-small videme-round-button disabled"><i class="fa fa-user-plus" aria-hidden="true"></i></a>';
}

function modalPartnerDeletePadding(params) { // 02082022
    console.log('modalPartnerDeletePadding params ---> ' + JSON.stringify(params));
    if ($.cookie('vide_nad')) {
        if (params.ip_id) {
            $('#modal-partner-delete').modal('show');
            $.fn.showUserCardBySpring({spring: params.spring})
            //$('.videme-modal-friend-delete-place').html($this.attr('user_display_name'));
            //var title = $('#create-new-essence-to-me-title').val();
            $('#partner-delete-ip_id').val(params.ip_id);
            $('#partner-delete-item_id').val(params.item_id);
            $('#partner-delete-partner_id').val(params.partner_id);
            //console.log("a.essence_join title -----> " + title);
            //$('.partner-invite_submit').attr('href', 'https://api.vide.me/v2/partners/invite/?item_id=' + $this.attr('item_id') + '&partner_id=' + $this.attr('partner_id') + '&nad=' + $.cookie('vide_nad'));
        } else {
            $('.partner-delete_submit').html('Error');
        }
    } else {
        gotoLogin();
    }
}

function autoselectPartnerButton(trueUserInfo) { // 02082022
    var buttons = {};
    if (trueUserInfo.its_my_pend == 'f') buttons.button = 'partner_accept';
    if (trueUserInfo.partner_status == '0') buttons.button2 = 'partner_decline';
    if (trueUserInfo.partner_status == '1') buttons.button2 = 'partner_delete';
    return buttons;
}

function autoselectPartnerSign(trueUserInfo) { // 02082022
    var sign = ' invited to partnership';
    if (trueUserInfo.its_my_pend == 'f') sign = ' requested partnership';
    return sign;
}

/* Essences start *************************************************************/
/* 02082022 $(function () {
    function split(val) {
        return val.split(/,\s*!/);
    }

    function extractLast(term) {
        return split(term).pop();
    }

    $("#videme_new_essences")
        // don't navigate away from the field on tab when selecting an item
        .on("keydown", function (event) {
            if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).autocomplete("instance").menu.active) {
                event.preventDefault();
            }
        })
        .autocomplete({
            source: function (request, response) {
                $.getJSON("https://api.vide.me/v2/essences/search_title?q=" + request.term, function (data) {
                    response($.map(data, function (value, key) {
                        return {
                            label: value.title,
                            value: value.essence_id
                        };
                    }));
                });
            },
            search: function () {
                // custom minLength
                var term = extractLast(this.value);
                //var term = extractLast(this.title);
                console.log('search term ' + JSON.stringify(term))
                if (term.length < 2) {
                    return false;
                }
            },
            focus: function () {
                // prevent value inserted on focus
                return false;
            },
            select: function (event, ui) {
                var terms = split(this.value);
                //var terms = split(this.title);
                console.log('select terms ' + JSON.stringify(terms));
                // remove the current input
                terms.pop();
                // add the selected item
                //terms.push(ui.item.value);
                terms.push(ui.item.label);
                // add placeholder to get the comma-and-space at the end
                terms.push("");
                this.value = terms.join(", ");
                //this.value = terms.join("; ");
                return false;
            }
        });
});*/

/* Essences end *************************************************************/

function functionAfterLogin(responseObject) { // 02082022
    if (responseObject.web_theme) {
        if (responseObject.web_theme == 'dark') {
            localStorage.setItem('preferred-color-scheme', 'dark');
            $.cookie('preferred-color-scheme', 'dark', {
                expires: 14,
                path: '/; SameSite=None',
                domain: 'vide.me',
                secure: true
            });
        } else {
            localStorage.setItem('preferred-color-scheme', 'light');
            $.cookie('preferred-color-scheme', 'light', {
                expires: 14,
                path: '/; SameSite=None',
                domain: 'vide.me',
                secure: true
            });
        }
        //initColorCSS(responseObject.web_theme);
    }
    if (responseObject.login) {
        $.cookie('vide_nad', responseObject.login, {
            expires: 14,
            path: '/; SameSite=None',
            domain: 'vide.me',
            secure: true
        });
    }
}


function parseDataArrayToObject(parseDataArrayToObject) { // TODO: why for?! 02082022 recreate
    //console.log("parseDataArrayToObject before -----> " + JSON.stringify(parseDataArrayToObject));
    console.log('videme_func1.js function parseDataArrayToObject');
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
            'ip_id': value.ip_id,
            'title_array': value.title_array,
            'content_array': value.content_array,
            'items_array': value.items_array
        };
    });
    //delete parseFileInbox.results;
    //console.log("parseDataArrayToObject after ----->" + JSON.stringify(parseDataArrayToObject));
    return parseDataArrayToObject;
}

/**
 * http://stackoverflow.com/a/10997390/11236
 */
function updateURLParameter(url, param, paramVal) { // 02082022
    var TheAnchor = null;
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";

    if (additionalURL) {
        var tmpAnchor = additionalURL.split("#");
        var TheParams = tmpAnchor[0];
        TheAnchor = tmpAnchor[1];
        if (TheAnchor)
            additionalURL = TheParams;

        tempArray = additionalURL.split("&");

        for (var i = 0; i < tempArray.length; i++) {
            if (tempArray[i].split('=')[0] != param) {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    } else {
        var tmpAnchor = baseURL.split("#");
        var TheParams = tmpAnchor[0];
        TheAnchor = tmpAnchor[1];

        if (TheParams)
            baseURL = TheParams;
    }

    if (TheAnchor)
        paramVal += "#" + TheAnchor;

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}

function URLUpdate(param, value) { // 02082022
    window.history.replaceState('', '', updateURLParameter(window.location.href, param, value));
}

function removeURLparam(paramName) { // 02082022
    var re = new RegExp("[&\?]" + paramName + "=\\d+");
    //var newUrl = "http://example.com/home.php?course_id=12&id=1&branch_id=4&course_id=5";
    var oldURL = window.location.href;
    //return newUrl.replace(re, '');
    var newUrl = oldURL.replace(re, '');
    //console.log(newUrl);
    window.history.replaceState('', '', newUrl);
}

function titleUpdate(titleUpdate) { // 02082022
    document.title = titleUpdate.title + ' | Vide.me';
}

function activeLiSelect(liClassId, value) { // 02082022
    $('.' + liClassId).removeClass('active');
    $('#' + liClassId + '_' + value).addClass('active');
}