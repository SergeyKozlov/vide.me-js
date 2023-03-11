/**
 * Created by sergey on 07.11.15.
 */


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
            if (this.canvas.getContext)if (this.elapsed_time =
                    (new Date - this.initial_time) / 1E3, this.current_value = 360 * Math.max(0, this.settings.seconds - this.elapsed_time) / this.settings.seconds, 0 >= this.current_value)clearInterval(this.interval_id), this.canvas.width = this.settings.width, d.isFunction(this.callback) && this.callback.call(), this.is_paused = !0; else {
                this.canvas.width = this.settings.width;
                var b = this.canvas.getContext("2d"), a = [this.canvas.width, this.canvas.height], c = Math.min(a[0], a[1]) / 2, a = [a[0] / 2, a[1] / 2], h = this.is_reversed;
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
            if (!c)return !0;
            c[b].apply(c, a)
        })
    };
    d.fn.pietimer =
        function (b) {
            return "object" === typeof b || !b ? l.apply(this, arguments) : m.apply(this, arguments)
        }
})(jQuery);

function showNewDraft() {

    $(".videme-right-panel").html(VidemeProgress);
    $.getJSON("https://api.vide.me/article/cm/shownew/?limit=16&videmecallback=?",
        function (obj) {
            var htmlResult = [];
            $.each(obj, function (key, value) {
                console.log("api.vide.me/article/cm/shownew/ key -----> " + JSON.stringify(key));
                console.log("api.vide.me/article/cm/shownew/ value -----> " + JSON.stringify(value));
                htmlResult.push("\
    <a  class=\"videme-text-black\" href=\"https://api.vide.me/system/cm/?article=" + value.id + "\">\
  <article class=\"videme-article-right-panel-cover\" style='background-image: url(\"" + value.value['cover'] + "\")'>\
    <div class=\"videme-article-right-panel-content\">\
      <div class=\"category\">\
        Digest\
      </div>\
        <p><h4>" + value.value['title'] + "</h4></p>\
        <p>" + value.value['date'] + "</p>\
    </div>\
    <a class=\"btn btn-danger btn-xs article-fast-refuse-url\" href=\"https://api.vide.me/article/cm/refuse/?article=" + value.id + "\">Refuse</a>\
  </article>\
    </a>\
			")

            });
            $(".videme-right-panel").html(htmlResult.join(""));
        });
}

function showNewShareVideoDraft() {

    $(".videme-right-panel").html(VidemeProgress);
    $.getJSON("https://api.vide.me/system/cm/sharevideo/shownew/?limit=16&videmecallback=?",
        function (obj) {
            var htmlResult = [];
            $.each(obj, function (key, value) {
                console.log("api.vide.me/system/cm/sharevideo/shownew/ key -----> " + JSON.stringify(key));
                console.log("api.vide.me/system/cm/sharevideo/shownew/ value -----> " + JSON.stringify(value));
                htmlResult.push("\
    <a  class=\"videme-text-black\" href=\"https://api.vide.me/system/cm/sharevideo/?docid=" + value.id + "\">\
  <article class=\"videme-article-right-panel-cover\" style='background-image: url(\"http://img.youtube.com/vi/" + value.value['file'] + "/hqdefault.jpg\")'>\
    <div class=\"videme-article-right-panel-content\">\
      <div class=\"category\">\
        Digest\
      </div>\
        <p><h4>" + value.value['subject'] + "</h4></p>\
        <p>" + convertTimestamp(value.value['createdAt']) + "</p>\
    </div>\
    <a class=\"btn btn-danger btn-xs sharevideo-fast-refuse-url\" href=\"https://api.vide.me/system/cm/sharevideo/refuse/?docid=" + value.id + "\">Refuse</a>\
  </article>\
    </a>\
			")

            });
            $(".videme-right-panel").html(htmlResult.join(""));
        });
}

function showLog(message, limit) {
    console.log("showLog -----> message=" + message + " limit " + limit);

    //$(".log").html(VidemeProgress);
    // Что-то не получилось с разбега
    //var obj = JSON.stringify(getJsonDataUrl("http://api.vide.me/system/log/getevent/?limit=" + limit + "&videmecallback=?"));
    //console.log("showLog -----> obj " +  JSON.stringify(obj));

    $.getJSON("https://api.vide.me/system/log/getlog/?message=" + message + "&limit=" + limit + "&videmecallback=?",
        function (obj) {
            /*            if (isJSON(obj)) {
             console.log("showLog obj -----> JSON");
             } else {
             console.log("showLog obj -----> NOT JSON");
             }*/
            var htmlResult = [];
            var rowClass;
            $.each(obj, function (key, value) {
                console.log("showLog value.value.type -----> " + JSON.stringify(value.value.type));
                switch (value.value.type) {
                    case "info":
                        rowClass = "info";
                        break;
                    case "error":
                        rowClass = "danger";
                        break;
                    case "PEBKAC":
                        rowClass = "active";
                        break;
                    case "success":
                        rowClass = "success";
                        break;
                    case "warning":
                        rowClass = "warning";
                        break;
                    case "IDS":
                        rowClass = "danger";
                        break;
                    default:
                        rowClass = "";
                }
                console.log("showLog api.vide.me/system/log/getevent/ value -----> " + JSON.stringify(value));
                // Date(value.value['createdAt'])
                htmlResult.push("\
                    <tr class=\"" + rowClass + "\">\
                        <td>" + value.value['docId'] + "</td>\
                        <td>" + convertTimestamp(value.value['createdAt']) + "</td>\
                        <td>" + value.value['type'] + "</td>\
                        <td>" + value.value['message'] + "</td>\
                        <td>" + value.value['val'] + "</td>\
                        <td>" + value.value['file'] + "</td>\
                        <td>" + value.value['class'] + "</td>\
                        <td>" + value.value['funct'] + "</td>\
                        <td>" + value.value['request'] + "</td>\
                        <td>" + value.value['ip'] + "</td>\
                    </tr>")
            });
            console.log("showLog value -----> html" + "<table>" + htmlResult.join("") + "</table>");

            $(".log").html("<table class=\"table\" style='word-wrap:break-word'>\
                                <tr class=\"\">\
                        <td>docId</td>\
                        <td>createdAt</td>\
                        <td>type</td>\
                        <td>message</td>\
                        <td>val</td>\
                        <td>file</td>\
                        <td>class</td>\
                        <td>funct</td>\
                        <td>request</td>\
                        <td>ip</td>\
                    </tr>" + htmlResult.join("") + "</table>");
        });
}

function showInfo(limit) {
    console.log("showInfo( -----> limit " + limit);

    $.getJSON("https://api.vide.me/system/log/getinfo/?limit=" + limit + "&videmecallback=?",
        function (obj) {
            /*            if (isJSON(obj)) {
             console.log("showLog obj -----> JSON");
             } else {
             console.log("showLog obj -----> NOT JSON");
             }*/
            var htmlResult = [];
            var rowClass;
            $.each(obj, function (key, value) {
                console.log("showLog value.value.type -----> " + JSON.stringify(value.value.type));
                switch (value.value.type) {
                    case "info":
                        rowClass = "info";
                        break;
                    case "error":
                        rowClass = "danger";
                        break;
                    case "PEBKAC":
                        rowClass = "active";
                        break;
                    case "success":
                        rowClass = "success";
                        break;
                    case "warning":
                        rowClass = "warning";
                        break;
                    case "IDS":
                        rowClass = "danger";
                        break;
                    default:
                        rowClass = "";
                }
                console.log("showLog api.vide.me/system/log/getevent/ value -----> " + JSON.stringify(value));
                // Date(value.value['createdAt'])
                htmlResult.push("\
                    <tr class=\"" + rowClass + "\">\
                        <td>" + value.value['docId'] + "</td>\
                        <td>" + convertTimestamp(value.value['createdAt']) + "</td>\
                        <td>" + value.value['type'] + "</td>\
                        <td>" + value.value['message'] + "</td>\
                        <td>" + value.value['val'] + "</td>\
                        <td>" + value.value['file'] + "</td>\
                        <td>" + value.value['class'] + "</td>\
                        <td>" + value.value['funct'] + "</td>\
                        <td>" + value.value['request'] + "</td>\
                        <td>" + value.value['ip'] + "</td>\
                    </tr>")
            });
            console.log("showLog value -----> html" + "<table>" + htmlResult.join("") + "</table>");

            $(".log").html("<table class=\"table\" style='word-wrap:break-word'>\
                                <tr class=\"\">\
                        <td>docId</td>\
                        <td>createdAt</td>\
                        <td>type</td>\
                        <td>message</td>\
                        <td>val</td>\
                        <td>file</td>\
                        <td>class</td>\
                        <td>funct</td>\
                        <td>request</td>\
                        <td>ip</td>\
                    </tr>" + htmlResult.join("") + "</table>");
        });
}

function showTask(limit) {
    console.log("showTask -----> limit " + limit);

    //$(".log").html(VidemeProgress);
    // Что-то не получилось с разбега
    //var obj = JSON.stringify(getJsonDataUrl("http://api.vide.me/system/log/getevent/?limit=" + limit + "&videmecallback=?"));
    //console.log("showLog -----> obj " +  JSON.stringify(obj));

    $.getJSON("https://api.vide.me/system/log/gettask/?limit=" + limit + "&videmecallback=?",
        function (obj) {
            /*            if (isJSON(obj)) {
             console.log("showLog obj -----> JSON");
             } else {
             console.log("showLog obj -----> NOT JSON");
             }*/
            var htmlResult = [];
            var rowClass;
            $.each(obj, function (key, value) {
                console.log("showTask value.value.type -----> " + JSON.stringify(value.value.type));
                console.log("showTask value.value.status -----> " + JSON.stringify(value.value.status));
                //switch (value.value.type) {
                switch (value.value.status) {
                    case "awaiting":
                        rowClass = "info";
                        break;
                    case "success":
                        rowClass = "active";
                        break;
                    case "error":
                        rowClass = "danger";
                        break;/*
                    case "done":
                        rowClass = "success";
                        break;
                    case "warning":
                        rowClass = "warning";
                        break;*/
                    default:
                        rowClass = "";
                }
                console.log("showLog api.vide.me/system/log/gettask/ value -----> " + JSON.stringify(value));
                // Date(value.value['createdAt'])
                htmlResult.push("\
                    <tr class=\"" + rowClass + "\">\
                        <td>" + value.value['docId'] + "</td>\
                        <td>" + convertTimestamp(value.value['createdAt']) + "</td>\
                        <td>" + value.value['type'] + "</td>\
                        <td>" + value.value['status'] + "</td>\
                        <!--<td>" + value.value['attempt'] + "</td>-->\
                        <td>" + value.value['fileSizeStart'] + "</td>\
                        <td>" + value.value['fileSizeDone'] + "</td>\
                        <td>" + value.value['file'] + "</td>\
                        <td>" + value.value['subject'] + "</td>\
                        <td>" + value.value['message'] + "</td>\
                        <td>" + value.value['ownerId'] + "</td>\
                        <td>" + value.value['videoDuration'] + "</td>\
                        <td>" + value.value['listId'] + "</td>\
                    </tr>")
            });
            console.log("showTask value -----> html" + "<table>" + htmlResult.join("") + "</table>");

            $(".log").html("<table class=\"table\" style='word-wrap:break-word'>\
                                <tr class=\"\">\
                        <td>docId</td>\
                        <td>createdAt</td>\
                        <td>type</td>\
                        <td>status</td>\
                        <!--<td>attempt</td>-->\
                        <td>fileSizeStart</td>\
                        <td>fileSizeDone</td>\
                        <td>file</td>\
                        <td>subject</td>\
                        <td>message</td>\
                        <td>ownerId</td>\
                        <td>videoDuration</td>\
                        <td>listId</td>\
                    </tr>" + htmlResult.join("") + "</table>");
        });
}

function showStack(limit) {
    console.log("showStack -----> limit " + limit);

    //$(".log").html(VidemeProgress);
    // Что-то не получилось с разбега
    //var obj = JSON.stringify(getJsonDataUrl("http://api.vide.me/system/log/getevent/?limit=" + limit + "&videmecallback=?"));
    //console.log("showLog -----> obj " +  JSON.stringify(obj));

    $.getJSON("https://api.vide.me/system/stack/getstack/?limit=" + limit + "&videmecallback=?",
        function (obj) {
            /*            if (isJSON(obj)) {
             console.log("showLog obj -----> JSON");
             } else {
             console.log("showLog obj -----> NOT JSON");
             }*/
            var htmlResult = [];
            var rowClass;
            $.each(obj, function (key, value) {
                console.log("showStack value.value.type -----> " + JSON.stringify(value.value.type));
                switch (value.value.type) {
                    case "info":
                        rowClass = "info";
                        break;
                    case "error":
                        rowClass = "danger";
                        break;
                    case "PEBKAC":
                        rowClass = "active";
                        break;
                    case "success":
                        rowClass = "success";
                        break;
                    case "warning":
                        rowClass = "warning";
                        break;
                    case "IDS":
                        rowClass = "danger";
                        break;
                    default:
                        rowClass = "";
                }
                console.log("showStack api.vide.me/system/stack/getstack/ value -----> " + JSON.stringify(value));
                // Date(value.value['createdAt'])
                htmlResult.push("\
                    <tr class=\"" + rowClass + "\">\
                        <td>" + value.value['docId'] + "</td>\
                        <td>" + convertTimestamp(value.value['createdAt']) + "</td>\
                        <td>" + value.value['type'] + "</td>\
                        <td>" + value.value['message'] + "</td>\
                        <td>" + value.value['val'] + "</td>\
                        <td>" + value.value['file'] + "</td>\
                        <td>" + value.value['class'] + "</td>\
                        <td>" + value.value['funct'] + "</td>\
                        <td>" + value.value['request'] + "</td>\
                        <td>" + value.value['ip'] + "</td>\
                    </tr>")
            });
            console.log("showStack value -----> html" + "<table>" + htmlResult.join("") + "</table>");

            $(".log").html("<table class=\"table\" style='word-wrap:break-word'>\
                                <tr class=\"\">\
                        <td>docId</td>\
                        <td>createdAt</td>\
                        <td>type</td>\
                        <td>message</td>\
                        <td>val</td>\
                        <td>file</td>\
                        <td>class</td>\
                        <td>funct</td>\
                        <td>request</td>\
                        <td>ip</td>\
                    </tr>" + htmlResult.join("") + "</table>");
        });
}


function isJSON(something) {
    if (typeof something != 'string')
        something = JSON.stringify(something);

    try {
        JSON.parse(something);
        return true;
    } catch (e) {
        return false;
    }
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

/*************************************************************
 нажата ссылка fast-refuse из article
 **************************************************************/
$(document).on('click', 'a.article-fast-refuse-url', function (event) {
    console.log("a.article-fast-refuse-url -----> click");
    event.preventDefault();
    var $this = $(this);
    var href = $this.attr('href') + '&nad=' + $.cookie('vide_nad');
    console.log("a.article-fast-refuse-url -----> href " + href);
    href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        //type: 'post',
        url: href,
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $.fn.successNotification({
                msg: msg
            });
            showNewDraft();
        },
        error: function (msg) {
            $.fn.errorNotification({
                msg: msg
            });
        }
    });
});

/*************************************************************
 нажата ссылка refuse из article
 **************************************************************/
$(document).on('click', 'a.article-refuse-url', function (event) {
    console.log("a.article-refuse-url -----> click");
    event.preventDefault();
    var $this = $(this);
    var href = $this.attr('href') + '&nad=' + $.cookie('vide_nad');
    console.log("a.article-refuse-url -----> href " + href);
    href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        //type: 'post',
        url: href,
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $.fn.successNotification({
                msg: msg
            });
            console.log("a.article-refuse-url -----> success");
            $('#timer').pietimer('start');
        },
        error: function (msg) {
            $.fn.errorNotification({
                msg: msg
            });
        }
    });
});

/*************************************************************
 нажата ссылка fast-refuse из article
 **************************************************************/
$(document).on('click', 'a.sharevideo-fast-refuse-url', function (event) {
    console.log("a.sharevideo-fast-refuse-url -----> click");
    event.preventDefault();
    var $this = $(this);
    var href = $this.attr('href') + '&nad=' + $.cookie('vide_nad');
    console.log("a.sharevideo-fast-refuse-url -----> href " + href);
    href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        //type: 'post',
        url: href,
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $.fn.successNotification({
                msg: msg
            });
            showNewShareVideoDraft();
        },
        error: function (msg) {
            $.fn.errorNotification({
                msg: msg
            });
        }
    });
});

/*************************************************************
 нажата ссылка refuse из article
 **************************************************************/
$(document).on('click', 'a.sharevideo-refuse-url', function (event) {
    console.log("a.sharevideo-refuse-url -----> click");
    event.preventDefault();
    var $this = $(this);
    var href = $this.attr('href') + '&nad=' + $.cookie('vide_nad');
    console.log("a.sharevideo-refuse-url -----> href " + href);
    href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        //type: 'post',
        url: href,
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $.fn.successNotification({
                msg: msg
            });
            console.log("a.sharevideo-refuse-url -----> success");
            $('#timer').pietimer('start');
        },
        error: function (msg) {
            $.fn.errorNotification({
                msg: msg
            });
        }
    });
});

/*************************************************************
 нажата ссылка fast-delete из sharevideo
 **************************************************************/
$(document).on('click', 'a.sharevideo-fast-delete-url', function (event) {
    console.log("a.sharevideo-fast-delete-url -----> click");
    event.preventDefault();
    var $this = $(this);
    var href = $this.attr('href') + '&nad=' + $.cookie('vide_nad');
    console.log("a.sharevideo-fast-delete-url -----> href " + href);
    href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        //type: 'post',
        url: href,
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $.fn.successNotification({
                msg: msg
            });
            $.fn.showNewVideoPaginationStaf({});
        },
        error: function (msg) {
            $.fn.errorNotification({
                msg: msg
            });
        }
    });
});


/*************************************************************
 нажата ссылка fast-refuse из article
 **************************************************************/
$(document).on('click', 'a.sharevideo-confirm-url', function (event) {
    console.log("a.sharevideo-confirm-url -----> click");
    event.preventDefault();
    var $this = $(this);
    var href = $this.attr('href') + '&nad=' + $.cookie('vide_nad');
    console.log("a.sharevideo-confirm-url -----> href " + href);
    href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        //type: 'post',
        url: href,
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $.fn.successNotification({
                msg: msg
            });
            $('#timer').pietimer('start');
        },
        error: function (msg) {
            $.fn.errorNotification({
                msg: msg
            });
        },
        timeout: 1000*60*5
    });
});

/*************************************************************
 нажата ссылка bucket-setstatus из sync
 **************************************************************/
$(document).on('click', 'a.bucket-setstatus', function (event) {
    console.log("a.bucket-setstatus -----> click");
    event.preventDefault();
    var $this = $(this);
    var href = $this.attr('href');
    console.log("a.bucket-setstatus -----> href " + href);
    href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        //type: 'post',
        url: href,
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $.fn.successNotification({
                msg: msg
            });
            console.log("a.bucket-setstatus -----> success");
            //$('#timer').pietimer('start');
        },
        error: function (msg) {
            $.fn.errorNotification({
                msg: msg
            });
        }
    });
});

/*************************************************************
 нажата ссылка sync-mode из sync
 **************************************************************/
$(document).on('click', 'a.sync-mode', function (event) {
    console.log("a.sync-mode -----> click");
    event.preventDefault();
    var $this = $(this);
    var href = $this.attr('href');
    console.log("a.sync-mode -----> href " + href);
    href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        //type: 'post',
        url: href,
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $.fn.successNotification({
                msg: msg
            });
            console.log("a.sync-mode -----> success");
            //$('#timer').pietimer('start');
        },
        error: function (msg) {
            $.fn.errorNotification({
                msg: msg
            });
        }
    });
});

$.fn.parseCBProgressBar = function (options) {
    parseCBProgressBar = $.extend({
        showcaseProgressBar: "#videme-progress-bar"
    }, options);
    console.log("$.fn.parseCBProgressBar -----> parseCBProgressBar.class " + parseCBProgressBar.class);
    console.log("$.fn.parseCBProgressBar -----> parseCBProgressBar.bucket " + parseCBProgressBar.bucket);
    if (parseCBProgressBar.class && parseCBProgressBar.bucket) {
        console.log("$.fn.parseCBProgressBar -----> parseCBProgressBar.class " + parseCBProgressBar.class);
        console.log("$.fn.parseCBProgressBar -----> parseCBProgressBar.bucket " + parseCBProgressBar.bucket);
        console.log("$.fn.parseCBProgressBar -----> parseCBProgressBar.showcaseProgressBar " + parseCBProgressBar.showcaseProgressBar);
        /*setInterval(function () {
         $('#' + parseCBProgressBar.showcaseProgressBar).pietimer({
         seconds: 30,
         color: 'rgba(102, 0, 255, 0.8)',
         height: 20,
         width: 20
         },
         function () {*/
        console.log("$.fn.parseCBProgressBar -----> setInterval");
        //$('#' + parseCBProgressBar.showcaseProgressBar).html(VidemeProgress);
        var max = JSON.stringify(getJsonDataUrl("https://api.vide.me/system/sync/totalparse/?class=" + parseCBProgressBar.class + "&videmecallback=?"));
        var now = JSON.stringify(getJsonDataUrl("https://api.vide.me/system/sync/totalcb/?class=" + parseCBProgressBar.class + "&videmecallback=?"));
        var state = JSON.stringify(getJsonDataUrl("https://api.vide.me/system/sync/getstate/?bucket=" + parseCBProgressBar.bucket + "&videmecallback=?"));
        $.fn.showcaseProgressBar({
            max: max,
            now: now,
            state: state,
            bucket: parseCBProgressBar.bucket,
            showcaseProgressBar: parseCBProgressBar.showcaseProgressBar
        });
        /*});
         $('#' + parseCBProgressBar.showcaseProgressBar).pietimer('start');
         }, 2000);*/
    } else {
        $('#' + parseCBProgressBar.showcaseProgressBar).append("No bucket");
    }
};

$.fn.showSyncMode = function (options) {
    showSyncMode = $.extend({
        showcaseMode: "sync-mode"
    }, options);
    /*
     setInterval(function () {
     $('#' + showSyncMode.showcaseMode).pietimer({
     seconds: 40,
     color: 'rgba(102, 0, 255, 0.8)',
     height: 20,
     width: 20
     },
     function () {*/
    console.log("$.fn.parseCBProgressBa -----> pietimer" + '#' + showSyncMode.showcaseMode);
    //$('#' + showSyncMode.showcaseMode).html(VidemeProgress);
    var mode = JSON.stringify(getJsonDataUrl("https://api.vide.me/system/sync/getmode/?videmecallback=?"));
    $.fn.showcaseMode({
        mode: mode,
        showcaseMode: showSyncMode.showcaseMode
    });
    /*});
     $('#' + showSyncMode.showcaseMode).pietimer('start');
     }, 2000);*/
};

$.fn.showLimitMode = function (options) {
    showLimitMode = $.extend({
        showcaseLimitMode: "limit-mode"
    }, options);
    /*    setInterval(function () {
     $('#' + showLimitMode.showcaseLimitMode).pietimer({
     seconds: 5,
     color: 'rgba(102, 0, 255, 0.8)',
     height: 20,
     width: 20
     },
     function () {
     console.log("$.fn.showLimitMode -----> pietimer" + '#' + showLimitMode.showcaseLimitMode);
     $('#' + showLimitMode.showcaseLimitMode).html(VidemeProgress);*/
    var limit = JSON.stringify(getJsonDataUrl("https://api.vide.me/system/sync/getlimit/?videmecallback=?"));
    $.fn.showcaseLimitMode({
        limit: limit,
        showcaseLimitMode: showLimitMode.showcaseLimitMode
    });
    /* });
     $('#' + showLimitMode.showcaseLimitMode).pietimer('start');
     }, 5000);*/
};

/*

 $.fn.showLog = function (options) {
 showLog = $.extend({
 showcaseLog: "log"
 }, options);
 /!*    setInterval(function () {
 $('#' + showLimitMode.showcaseLimitMode).pietimer({
 seconds: 5,
 color: 'rgba(102, 0, 255, 0.8)',
 height: 20,
 width: 20
 },
 function () {
 console.log("$.fn.showLimitMode -----> pietimer" + '#' + showLimitMode.showcaseLimitMode);
 $('#' + showLimitMode.showcaseLimitMode).html(VidemeProgress);*!/
 var log = JSON.stringify(getJsonDataUrl("hhttp://api.vide.me/system/log/getevent/?videmecallback=?"));
 $.fn.showcaseLog({
 limit: log,
 showcaseLog: showLog.showcaseLog
 });
 /!* });
 $('#' + showLimitMode.showcaseLimitMode).pietimer('start');
 }, 5000);*!/
 };
 */

$.fn.showBucketPagination = function (options) {
    console.log("$.fn.showBucketPagination -----> start");
    showBucketPaginationSettings = $.extend({
        bucket: "user",
        limit: 16,
        showBucketPagination: ".videme-bucket-pagination",
        showBucket: ".videme-bucket"
    }, options);
    if ($(this).length) {
        console.log("$.fn.showBucketPagination $(this) -----> yes " + $(this).length);
        var tempObject = $(this);
    } else {
        console.log("$.fn.showBucketPagination $(this) -----> nooo! " + $(this).length);
        var tempObject = $(showBucketPaginationSettings.showBucket);
    }
    console.log("$.fn.showBucketPagination tempObject -----> " + tempObject.length);
    tempObject.html(VidemeProgress);
    /* Сделать запрос */
    console.log("$.fn.showBucketPagination showBucketPaginationSettings.bucket -----> " + showBucketPaginationSettings.bucket);
    $.getJSON("https://api.vide.me/system/console/" + showBucketPaginationSettings.bucket + "/?limit=100000&videmecallback=?",
        //$.getJSON("https://api.vide.me/system/console/user/?limit=16&videmecallback=?",
        function (data) {
            console.log("$.fn.showBucketPagination data.length -----> " + data.length);
            /* Показать первый расклад */
            tempObject.html(parseDataForBucket(data, showBucketPaginationSettings));
            /* Вычисилить максимальное число страниц */
            var pagetotal = Math.ceil(data.length / showBucketPaginationSettings.limit);
            /* Объявить экземпляр пейджинатора */
            $(showBucketPaginationSettings.showBucketPagination).jqPagination({
                //link_string	: '/?page={page_number}',
                max_page: pagetotal,
                paged: function (page) {
                    //console.log("$.fn.showBucketPagination -----> paged: function (page)");

                    /* Пропустить страниц = текущая страница * элементов на странице */
                    var skip = (page - 1) * showBucketPaginationSettings.limit;
//alert("\n\r shownew pagetotal = " + pagetotal +
//"\n\r shownew page = " + page +
//"\n\r shownew skip = " + skip
//);
                    tempObject.html(VidemeProgress);
                    $.getJSON("https://api.vide.me/system/console/" + showBucketPaginationSettings.bucket + "/?limit=" + showBucketPaginationSettings.limit + "&skip=" + skip + "&videmecallback=?",
                        function (data) {
                            tempObject.html(parseDataForBucket(data, showBucketPaginationSettings));
                        });
                }
            });
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


$.fn.showCountUserLists = function (options) {
    showCountUserLists = $.extend({
        limit: 100,
        showcaseCount: "#videme-list-user-lists"
    }, options);
    if ($(this).length) {
        console.log("$.fn.showCountUserLists $(this) -----> yes " + $(this).length);
        var tempObject = $(this);
    } else {
        console.log("$.fn.showCountUserLists $(this) -----> nooo! " + $(this).length);
        var tempObject = $(showCountUserLists.showcaseCount);
    }
    if (showCountUserLists.userId) {
        console.log("$.fn.showCountUserLists  -----> showCountUserLists.userId " + showCountUserLists.userId);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/system/cm/sharevideo/showlists/?userid=" + showCountUserLists.userId + "&limit=" + showCountUserLists.limit + "&videmecallback=?",
            function (obj) {
                console.log("$.fn.showCountUserLists -----> obj " + obj);
                var htmlResult = [];
                $.each(obj, function (key, value) {
                    console.log("api.vide.me/system/cm/sharevideo/showlists/ value -----> " + JSON.stringify(value.value));
                    console.log("api.vide.me/system/cm/sharevideo/showlists/ userId -----> " + JSON.stringify(value.value['ownerId']));
                    console.log("api.vide.me/system/cm/sharevideo/showlists/ key -----> " + JSON.stringify(key));
                    console.log("api.vide.me/system/cm/sharevideo/showlists/ value -----> " + JSON.stringify(value));
                    // Асинхронная getJSON использует последнее значение showCountUserLists.userId
                    htmlResult.push("\
    <a class=\"btn btn-danger btn-xs sharevideo-confirm-url\" href=\"https://api.vide.me/system/cm/sharevideo/confirm/?docid=" + showCountUserLists.docId + "&userid=" + value.value['ownerId'] + "&list=" + value.value['list'] + "\">" + value.value['list'] + "</a>\
  ")
                });
                if (obj.length) {
                    console.log("$.fn.showCountUserLists length -----> " + obj.length);
                    tempObject.html("#: " + obj.length + " " + htmlResult);
                } else {
                    console.log("$.fn.showCountUserLists data -----> no");
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

$.fn.showSchedulerMode = function (options) {
    showSchedulerMode = $.extend({
        showcaseShedulerMode: "scheduler-mode"
    }, options);
    /*
     setInterval(function () {
     $('#' + showSyncMode.showcaseMode).pietimer({
     seconds: 40,
     color: 'rgba(102, 0, 255, 0.8)',
     height: 20,
     width: 20
     },
     function () {*/
    console.log("$.fn.showSchedulerMode -----> showSchedulerMode.showcaseShedulerMode" + showSchedulerMode.showcaseShedulerMode);
    //$('#' + showSyncMode.showcaseMode).html(VidemeProgress);
    var mode = JSON.stringify(getJsonDataUrl("https://api.vide.me/system/log/getschedulermode/?videmecallback=?"));
    console.log("$.fn.showSchedulerMode -----> getJsonDataUrl mode" + mode);

    $.fn.showcaseMode({
        mode: mode,
        showcaseMode: showSchedulerMode.showcaseShedulerMode
    });
    /*});
     $('#' + showSyncMode.showcaseMode).pietimer('start');
     }, 2000);*/
};

/*************************************************************
 нажата ссылка scheduler-mode из Scheduler
 **************************************************************/
// TODO: сделать один a.scheduler-mode с a.sync-mode
$(document).on('click', 'a.scheduler-mode', function (event) {
    console.log("a.scheduler-mode -----> click");
    event.preventDefault();
    var $this = $(this);
    var href = $this.attr('href');
    console.log("a.scheduler-mode -----> href " + href);
    //href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        //type: 'post',
        url: href,
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $.fn.successNotification({
                msg: msg
            });
            console.log("a.scheduler-mode -----> success");
            //$('#timer').pietimer('start');
        },
        error: function (msg) {
            $.fn.errorNotification({
                msg: msg
            });
        }
    });
});


$.fn.showNewVideoPaginationStaf = function (options) {
    console.log("$.fn.showNewVideoPagination -----> ok");
    showNewVideoPaginationStafSettings = $.extend({
        // TODO: добавить limit в NAD
        limit: 6,
        showNewVideo: ".videme-shownew-tile"
    }, options);
    /*        if ($(this).length) {
     console.log("$.fn.showNewVideo $(this) -----> yes " + $(this).length);
     var tempObject = $(this);
     } else {
     console.log("$.fn.showNewVideo $(this) -----> nooo! " + $(this).length);
     var tempObject = $(showNewVideoPaginationStafSettings.showNewVideo);
     }
     console.log("$.fn.showNewVideo tempObject -----> " + tempObject.length);
     tempObject.html(VidemeProgress);*/
    //==return this.each(function () {
    //var tempObject = $(this);
    /* Сделать запрос */

    var data = $.fn.showNewVideo({
        //msg: msg
    });
    console.log("$.fn.showNewVideoPagination showNewVideoSettings -----> " + JSON.stringify(showNewVideoSettings));
    console.log("$.fn.showNewVideoPagination data -----> " + JSON.stringify(data));

    $.getJSON("https://api.vide.me/file/shownew/?limit=3&videmecallback=?",
        function (b) {
            /* Показать первый расклад */
            var a = [];
            $.each(b, function (d, c) {
                /* Выйти после 3 интерации */
                if (d > 2) return false;
                a.push("\
             <div class='box'>\
                <div class='boxInner'>\
                    <a class='shownext' \
                         file-value='#" + c.value.file + "' \
                         messageid-value='#" + c.value.docId + "' \
                         FromUserName-value='#' \
                         updatedAt-value='#" + c.value.updatedAt + "' \
                         Subject-value='#" + c.value.subject + "' \
                         Message-value='#" + c.value.message + "' \
                         href='https://vide.me/v?m=" + c.value.file + "' \
                         target='_blank'>\
                         <img src=\"https://api.vide.me/img/?i=" + c.value.file + ".jpg\" alt=\"" + c.value.updatedAt + "\" title=\"" + c.value.updatedAt + "\" onerror='imgError(this);'>\
                        <div class='videme-tile-signboard-true'>" + c.value.updatedAt + "</div>\
                                            </a>\
                        <div class=''>" + c.value.file + "</div>\
                </div>\
             <a class=\"btn btn-danger btn-xs sharevideo-fast-delete-url\" href=\"https://api.vide.me/system/cm/sharevideo/delete/?file=" + c.value.file + "\">Delete</a>\
             </div>\
             ")


            });
            $(".videme-shownew-tile").html(a.join(""));
            /* Всё слепить и показать */


            /* Вычисилить максимальное число страниц */
            var pagetotal = Math.ceil(b.length / 3);
            /* Объявить экземпляр пейджинатора */
            $('.videme-shownew-pagination').jqPagination({
                //link_string	: '/?page={page_number}',
                max_page: pagetotal,
                paged: function (page) {
                    /* Пропустить страниц = текущая страница * элементов на странице */
                    var skip = (page - 1) * 3;
//alert("\n\r shownew pagetotal = " + pagetotal +
//"\n\r shownew page = " + page +
//"\n\r shownew skip = " + skip
//);
                    $.getJSON("https://api.vide.me/file/shownew/?limit=3&skip=" + skip + "&videmecallback=?",
                        function (b) {
                            var a = [];
                            $.each(b, function (d, c) {
                                /* Выйти после 3 интерации */
                                if (d > 2) return false;
                                a.push("\
<div class='box'>\
	<div class='boxInner'>\
		<a class='shownext' \
file-value='#" + c.value.file + "' \
messageid-value='#" + c.value.docId + "' \
FromUserName-value='#' \
updatedAt-value='#" + c.value.updatedAt + "' \
Subject-value='#" + c.value.subject + "' \
Message-value='#" + c.value.message + "' \
href='https://vide.me/v?m=" + c.value.file + "' \
target='_blank'>\
			<img src=\"https://api.vide.me/img/?i=" + c.value.file + ".jpg\" alt=\"" + c.value.updatedAt + "\" title=\"" + c.value.updatedAt + "\" onerror='imgError(this);'>\
		<div class='videme-tile-signboard-true'>" + c.value.updatedAt + "</div>\
		<div class=''>" + c.value.file + "</div>\
		</a>\
	</div>\
</div>\
					")
                            });
                            /* Всё слепить и показать */
                            $(".videme-shownew-tile").html(a.join(""));
                        });
                }
            });
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


function parseDataForBucket(parseDataForBucket, parseDataForBucketSettings) {
    console.log("parseDataForBucket parseDataForBucketSettings -----> " + JSON.stringify(parseDataForBucketSettings));
    console.log("parseDataForBucket parseDataForBucket -----> " + JSON.stringify(parseDataForBucket));
    var result = [];
    $.each(parseDataForBucket, function (key, value) {
        /* Выйти после 3 интерации */
        if (key > parseDataForBucketSettings.limit) return false;
        console.log("$.fn.showNewVideoPagination value.value -----> " + JSON.stringify(value.value));
        if (value.value.hasOwnProperty("userPicture")) {
            //console.log("parseDataForBucket userPicture set");
            var userPicture = value.value['userPicture'];
        } else {
            //console.log("parseDataForBucket userPicture empty");
            var userPicture = "http://bestuniversities.com.ua/sites/default/files/empty-ava.png";
        }
        // if ($.inArray("microsoft", value.value)) {
        var socialPrefix = "free";
        if (value.value.hasOwnProperty("google")) {
            socialPrefix = "google";
        }
        if (value.value.hasOwnProperty("facebook")) {
            socialPrefix = "facebook";
        }
        if (value.value.hasOwnProperty("microsoft")) {
            socialPrefix = "microsoft";
        }
        switch (parseDataForBucketSettings.bucket) {
            case "user":
                result.push("\
                        [ docId <a target='_blank' href='http://194.8.153.6:8091/ui/index.html#/documents/" + value.id + "?documentsBucket=file'>" + value.id + "</a> ]\
                        [ <img src=\"" + userPicture + "\" height=\"42\" width=\"42\"> ]\
                        [ " + value.value['userEmail'] + " ]\
                        [ " + convertTimestamp(value.value['createdAt']) + " ]\
                        [ " + socialPrefix + " ] <br>\
                    ");
                break;
            case "fileActivity":
                result.push("\
                        [ docId <a target='_blank' href='http://194.8.153.6:8091/ui/index.html#/documents/" + value.id + "?documentsBucket=file'>" + value.id + "</a> ]\
                        [ <a target='_blank' href='https://vide.me/v?m=" + value.value['file'] + "'><img src=\"" + value.value['file'] + ".jpg\" height=\"42\" width=\"42\"></a> ]\
                        [ file <a target='_blank' href='https://vide.me/v?m=" + value.value['file'] + "'>" + value.value['file'] + "</a> ]\
                        [ subject " + value.value['subject'] + " ]\
                        [ message " + value.value['message'] + " ]\
                        [ fromUserName " + value.value['fromUserName'] + " ]\
                        [ toUserName " + value.value['toUserName'] + " ]\
                        [ read " + value.value['read'] + " ]\
                        [ " + convertTimestamp(value.value['createdAt']) + " ] <br>\
                    ");
                break;
            default:
                result.push("Not define parseDataForBucketSettings");
        }
    });
    /* Всё слепить и показать */
    return result.join("");
}

function getJsonDataUrl(getJsonDataUrl) {
    console.log("getJsonDataUrl -----> " + getJsonDataUrl);

    var result;

    $.ajax({
        async: false,
        dataType: "json",
        url: getJsonDataUrl,
        beforeSend: function () {
            //$.fn.processNotification();
        },
        success: function (msg) {
            //tempObject.append("success ajax msg: " + JSON.stringify(msg));
            result = msg;
            //$.fn.successNotification({
            //    msg: msg
            //});
            //var me1 = msg;
            console.log("getJsonDataUrl -----> success msg: " + msg);
            console.log("getJsonDataUrl -----> JSON.stringify: " + JSON.stringify(msg));
            //$('#timer').pietimer('start');
        },
        error: function (msg) {
            //tempObject.append("error ajax msg: " + JSON.stringify(msg));
            result = msg;
            //$.fn.errorNotification({
            //    msg: msg
            //});
        }
    });
    console.log("getJsonDataUrl -----> typeof result : " + typeof result);
    // Что-то не получилось с разбега
    if (result) {
        return result;
    } else if (typeof(result) === 'object') {
        return JSON.stringify(result);
    } else {
        return false;
    }
}


$.fn.showcaseProgressBar = function (options) {
    showcaseProgressBar = $.extend({
        min: 0,
        max: 100,
        now: 0,
        state: "stop",
        showcaseProgressBar: "videme-progress-bar"
    }, options);
    /*
     if ($(this).length) {
     console.log("$.fn.showcaseProgressBar $(this) -----> yes " + $(this).length);
     var tempObject = $(this);
     } else {
     console.log("$.fn.showcaseProgressBar $(this) -----> nooo! " + $(this).length);
     var tempObject = $(showcaseProgressBar.showcaseProgressBar);
     }

     tempObject.append("Start: ");
     */
    console.log("$.fn.showcaseProgressBar -----> showcaseProgressBar.now " + showcaseProgressBar.now);
    console.log("$.fn.showcaseProgressBar -----> showcaseProgressBar.max " + showcaseProgressBar.max);
    //tempObject.html(VidemeProgress);
    //var percent = showcaseProgressBar.max / 100;
    //var nowTrue = showcaseProgressBar.now / percent;
    var nowTrue = Math.round(showcaseProgressBar.now / (showcaseProgressBar.max / 100));
    //tempObject.append("min: " + showcaseProgressBar.min + " now: " + showcaseProgressBar.now + " max: " + showcaseProgressBar.max + " state: " + showcaseProgressBar.state);
    console.log("$.fn.showcaseProgressBar -----> switch: " + showcaseProgressBar.state);


    $("#panel-" + showcaseProgressBar.showcaseProgressBar).removeClass("panel-defaults");
    $("#panel-" + showcaseProgressBar.showcaseProgressBar).removeClass("panel-info");
    $("#panel-" + showcaseProgressBar.showcaseProgressBar).removeClass("panel-danger");
    $("#panel-" + showcaseProgressBar.showcaseProgressBar).removeClass("panel-warning");


    $("#btn-sync-" + showcaseProgressBar.showcaseProgressBar).removeClass("active");
    $("#btn-remove-" + showcaseProgressBar.showcaseProgressBar).removeClass("active");
    $("#btn-stop-" + showcaseProgressBar.showcaseProgressBar).removeClass("active");


    switch (showcaseProgressBar.state) {
        case "\"sync\"":
            panelClass = "panel-info";
            progressClass = "progress-bar-info active";
            $("#btn-sync-" + showcaseProgressBar.showcaseProgressBar).addClass("active");

            break;
        case "\"remove\"":
            panelClass = "panel-danger";
            progressClass = "progress-bar-danger active";
            $("#btn-remove-" + showcaseProgressBar.showcaseProgressBar).addClass("active");

            break;
        case "\"stop\"":
            console.log("$.fn.showcaseProgressBar -----> switch: stop");

            panelClass = "panel-warning";
            progressClass = "progress-bar-warning";
            $("#btn-stop-" + showcaseProgressBar.showcaseProgressBar).addClass("active");

            break;
        default:
            panelClass = "panel-default";
            progressClass = "";
    }
    console.log("$.fn.showcaseProgressBar -----> switch (showcaseProgressBar.state):" + showcaseProgressBar.state + " panelClass: " + panelClass);

    $("#panel-" + showcaseProgressBar.showcaseProgressBar).addClass(panelClass);

    $("#panel-title-" + showcaseProgressBar.showcaseProgressBar).html("Bucket: " + showcaseProgressBar.bucket);

    $("#progress-" + showcaseProgressBar.showcaseProgressBar).addClass(progressClass).css('width', nowTrue + '%').attr('aria-valuenow', nowTrue);


    $("#complete-" + showcaseProgressBar.showcaseProgressBar).html(nowTrue + "% Complete");
    //$("#panel-footer-" + showcaseProgressBar.showcaseProgressBar).html("State: " + showcaseProgressBar.state);
    $("#panel-footer-" + showcaseProgressBar.showcaseProgressBar).html("State: " + showcaseProgressBar.state + "min: " + showcaseProgressBar.min + " now: " + showcaseProgressBar.now + " max: " + showcaseProgressBar.max + " %: " + nowTrue);


    //$("#" + showcaseProgressBar.showcaseProgressBar).append("#progress-" + showcaseProgressBar.showcaseProgressBar + "min: " + showcaseProgressBar.min + " now: " + showcaseProgressBar.now + " max: " + showcaseProgressBar.max + " state: " + showcaseProgressBar.state);

};

$.fn.showcaseMode = function (options) {
    showcaseMode = $.extend({
        mode: "stop",
        showcaseMode: "sync-mode"
    }, options);
    /*
     if ($(this).length) {
     console.log("$.fn.showcaseMode $(this) -----> yes " + $(this).length);
     var tempObject = $(this);
     } else {
     console.log("$.fn.showcaseMode $(this) -----> nooo! " + $(this).length);
     var tempObject = $(showcaseMode.showcaseMode);
     }

     tempObject.append("Start: ");
     */
    console.log("$.fn.showcaseMode -----> showcaseMode.mode " + showcaseMode.mode);
    console.log("$.fn.showcaseMode -----> showcaseMode.showcaseMode " + showcaseMode.showcaseMode);


    $("#panel-" + showcaseMode.showcaseMode).removeClass("panel-defaults");
    $("#panel-" + showcaseMode.showcaseMode).removeClass("panel-info");
    $("#panel-" + showcaseMode.showcaseMode).removeClass("panel-danger");
    $("#panel-" + showcaseMode.showcaseMode).removeClass("panel-warning");


    $("#btn-sync-" + showcaseMode.showcaseMode).removeClass("active");
    $("#btn-purge-" + showcaseMode.showcaseMode).removeClass("active");
    $("#btn-work-" + showcaseMode.showcaseMode).removeClass("active");
    $("#btn-stop-" + showcaseMode.showcaseMode).removeClass("active");


    switch (showcaseMode.mode) {
        case "\"sync\"":
            panelClass = "panel-info";
            $("#btn-sync-" + showcaseMode.showcaseMode).addClass("active");
            break;
        case "\"purge\"":
            panelClass = "panel-danger";
            $("#btn-purge-" + showcaseMode.showcaseMode).addClass("active");
            break;
        case "\"work\"":
            panelClass = "panel-info";
            $("#btn-work-" + showcaseMode.showcaseMode).addClass("active");
            break;
        case "\"stop\"":
            panelClass = "panel-warning";
            $("#btn-stop-" + showcaseMode.showcaseMode).addClass("active");
            break;
        default:
            panelClass = "panel-default";
    }
    console.log("$.fn.showcaseMode -----> switch (showcaseMode.mode):" + showcaseMode.mode + " panelClass: " + panelClass);

    $("#panel-" + showcaseMode.showcaseMode).addClass(panelClass);

    $("#panel-title-" + showcaseMode.showcaseMode).html("Current mode: " + showcaseMode.mode);


    $("#panel-footer-" + showcaseMode.showcaseMode).html("Mode: " + showcaseMode.mode);


    //$("#" + showcaseMode.showcaseMode).append("#progress-" + showcaseMode.showcaseMode + "min: " + showcaseMode.min + " now: " + showcaseMode.now + " max: " + showcaseMode.max + " mode: " + showcaseMode.mode);

};

$.fn.showcaseLimitMode = function (options) {
    showcaseLimitMode = $.extend({
        limit: "10",
        showcaseLimitMode: "limit-mode"
    }, options);
    console.log("$.fn.showcaseLimitMode -----> showcaseLimitMode.limit " + showcaseLimitMode.limit);
    console.log("$.fn.showcaseLimitMode -----> showcaseLimitMode.showcaseLimitMode " + showcaseLimitMode.showcaseLimitMode);
    // TODO: Потому что, навпрху не правильно, предыдущее всё стирают по шаблону
    //$("#panel-" + showcaseLimitMode.showcaseLimitMode).addClass("panel-defaults");

    $("#panel-title-" + showcaseLimitMode.showcaseLimitMode).html("Limit mode: " + showcaseLimitMode.limit);
    $("#control-label-" + showcaseLimitMode.showcaseLimitMode).html("Limit mode: " + showcaseLimitMode.limit);
    $("#input-" + showcaseLimitMode.showcaseLimitMode).html(showcaseLimitMode.limit);
    $("#panel-footer-" + showcaseLimitMode.showcaseLimitMode).html("Limit: " + showcaseLimitMode.limit);
};

/*
 $.fn.showcaseLog = function (options) {
 showcaseLog = $.extend({
 limit: "10",
 showcaseLog: "log"
 }, options);
 console.log("$.fn.showcaseLog -----> showcaseLog.limit " + showcaseLog.limit);
 console.log("$.fn.showcaseLog -----> showcaseLog.showcaseLog " + showcaseLog.showcaseLog);
 // TODO: Потому что, навпрху не правильно, предыдущее всё стирают по шаблону
 $("#panel-" + showcaseMode.showcaseMode).removeClass("panel-defaults");
 $("#panel-" + showcaseMode.showcaseMode).removeClass("panel-info");
 $("#panel-" + showcaseMode.showcaseMode).removeClass("panel-danger");
 $("#panel-" + showcaseMode.showcaseMode).removeClass("panel-warning");


 $("#btn-sync-" + showcaseMode.showcaseMode).removeClass("active");
 $("#btn-purge-" + showcaseMode.showcaseMode).removeClass("active");
 $("#btn-stop-" + showcaseMode.showcaseMode).removeClass("active");


 switch (showcaseMode.mode) {
 case "\"sync\"":
 panelClass = "panel-info";
 $("#btn-sync-" + showcaseMode.showcaseMode).addClass("active");
 break;
 case "\"purge\"":
 panelClass = "panel-danger";
 $("#btn-purge-" + showcaseMode.showcaseMode).addClass("active");
 break;
 case "\"stop\"":
 panelClass = "panel-warning";
 $("#btn-stop-" + showcaseMode.showcaseMode).addClass("active");
 break;
 default:
 panelClass = "panel-default";
 }
 console.log("$.fn.showcaseMode -----> switch (showcaseMode.mode):" + showcaseMode.mode + " panelClass: " + panelClass);

 $("#panel-" + showcaseMode.showcaseMode).addClass(panelClass);

 $("#panel-title-" + showcaseMode.showcaseMode).html("Sync mode: " + showcaseMode.mode);


 $("#panel-footer-" + showcaseMode.showcaseMode).html("Mode: " + showcaseMode.mode);
 };
 */

/*************************************************************
 нажата ссылка remove-bucket
 **************************************************************/
$(document).on('click', 'a.bucket-del-url', function (event) {
    event.preventDefault();
    console.log("a.bucket-del-url -----> click");
    var $this = $(this);
    var href = $this.attr('href') + '?bucket=' + $('#bucket').val();
    console.log("a.bucket-del-url -----> href " + href);
    href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        //type: 'post',
        url: href,
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $.fn.successNotification({
                msg: msg
            });
            showNewDraft();
        },
        error: function (msg) {
            $.fn.errorNotification({
                msg: msg
            });
        }
    });
});



$(document).ready(function () {

    /*************************************************************
     Нажата кнопка формы удалить bucket
     **************************************************************/
    $('#bucket-del-form').validate({
        /*rules: {
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
         },*/
        submitHandler: function (form) {
            $.ajax({
                type: "GET",
                url: 'https://api.vide.me/system/sync/removebucket/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    //$.fn.processNotification();
                },
                success: function (msg) {
                    $('.videme-display').html(msg);

                    /*$('#modal-del-list').modal('hide');
                     $('#modal-edit-list').modal('hide');
                     $.fn.showList();
                     $.fn.successNotification({
                     msg: msg
                     });*/
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
     нажата кнопка confirm article
     **************************************************************/
    $('#article-confirm-form').validate({
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
                url: 'https://api.vide.me/article/cm/confirm/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $.fn.successNotification({
                        msg: msg
                    });
                    $('#timer').pietimer('start');
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
     нажата кнопка
     **************************************************************/
    $('#set-limit-form').validate({
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
                type: "get",
                url: 'https://api.vide.me/system/sync/setlimit/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $.fn.successNotification({
                        msg: msg
                    });
                    $('#timer').pietimer('start');
                },
                error: function (msg) {
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });


    /* Тестовая отправка писем ===================================================*/
    $('#testmail').validate({
        rules: {
            "name": {
                //required:true,
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
                url: 'https://api.vide.me/sendmail/testmail/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $("#submit").attr('disabled', true);
                    $('#videme-progress').html(VidemeProgress);
                },
                success: function (msg) {
                    //console.log("Data Saved: " + msg);
                    $('#videme-progress').empty();
                    $('#testmail').hide('slow');
                    $('#progress').hide('slow');
                    $('#result').html(msg);
                },
                error: function (msg) {
                    //$('#cform').find(':input').prop('disabled', true);
                    $('#submit').attr('disabled', true);
                    $('#result').html("<div class='alert alert-error span3'>Failed from timeout. Please try again later. <span id='timer'></span> sec.</div><script type='text/javascript'>setTimeout('window.location.reload()', 6000); var t=5; function refr_time(){ if (t>1) { t--;  document.getElementById('timer').innerHTML=t; document.getElementById('timer').style.color = '#FF0000'; } else { document.getElementById('timer').style.color = '#FFA122'; } } var tm=setInterval('refr_time();' ,1000); </script>");
                }
            });
        }
    });



    /*************************************************************
     нажата form "Get document"
     **************************************************************/
    $('#doceditor').validate({
        rules: {
            "bucket": {
                required: true/*,
                maxlength: 16*/
            },
            "docid": {
                required: false/*,
                maxlength: 16*/
            },
            "video": {
                required: false/*,
                maxlength: 16*/
            }
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
                //type: "get",
                url: 'https://api.vide.me/system/doceditor/getdocument/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $.fn.successNotification({
                        msg: msg
                    });
                    $('#newdocument').html(msg);

                    $('#timer').pietimer('start');
                },
                error: function (msg) {
                    $.fn.errorNotification({
                        msg: msg
                    });
                    $('#newdocument').html(msg);

                }
            });
        }
    });


    /*************************************************************
     нажата form "Save new document"
     **************************************************************/
    $('#savenewdocument').validate({
        rules: {
            "bucket": {
                required: true,
                maxlength: 16
            },
            "newdocument": {
                required: true,
                maxlength: 1600
            }
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
                //type: "get",
                url: 'https://api.vide.me/system/doceditor/savedocument/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $.fn.successNotification({
                        msg: msg
                    });
                    $('#newdocument').html(msg);

                    $('#timer').pietimer('start');
                },
                error: function (msg) {
                    $.fn.errorNotification({
                        msg: msg
                    });
                    $('#newdocument').html(msg);

                }
            });
        }
    });


});

        