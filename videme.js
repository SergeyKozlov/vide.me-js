/***************************************************************************
 *  Jquery plugin Vide.me
 * *************************************************************************/

(function ($) {
    $.fn.getAttributes = function () {
        var attributes = {};
        if (this.length) {
            $.each(this[0].attributes, function (index, attr) {
                attributes[attr.name] = attr.value;
            });
        }
        return attributes;
    };

    $.fn.oneTimeInbox = function (options) {
        oneTimeInboxSettings = $.extend({
            authorized: false
        }, options);
        $.fn.showcaseVideoTextButton(oneTimeInboxSettings);
    };

    $.fn.fileInbox = function (options) {
        console.log("$.fn.fileInbox -----> ok");
        fileInboxSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            console.log("$.fn.fileInbox $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.fileInbox $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileInboxSettings.showcaseVideo);
        }
        console.log("$.fn.fileInbox tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        //==return this.each(function () {
        //var tempObject = $(this);
        $.getJSON("https://api.vide.me/file/inbox/?limit=" + fileInboxSettings.limit + "&videmecallback=?",
            function (data) {
                if (data.results) {
                    console.log("$.fn.fileInbox data -----> yes" + JSON.stringify(data));
                    tempObject.html(showTile(parseFileInbox(data), tempObject, "file-inbox-url"));
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
            console.log("$.fn.fileSent $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.fileSent $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileSentSettings.showcaseVideo);
        }
        console.log("$.fn.fileSent tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/file/sent/?limit=" + fileSentSettings.limit + "&videmecallback=?",
            function (data) {
                if (data.results) {
                    console.log("$.fn.fileSent data -----> yes" + JSON.stringify(data));
                    tempObject.html(showTile(parseFileSent(data), tempObject, "file-sent-url"));
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
            console.log("$.fn.fileMy $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.fileMy $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileMySettings.showcaseVideo);
        }
        console.log("$.fn.fileMy tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/file/my/?limit=" + fileMySettings.limit + "&videmecallback=?",
            function (data) {
                if (data.results) {
                    console.log("$.fn.fileMy data -----> yes" + JSON.stringify(data));
                    tempObject.html(showTile(parseFileMy(data), tempObject, "file-my-url"));
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

    $.fn.fileMySpring = function (options) {
        fileMySpringSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showcaseVideo: "#videme-tile"
        }, options);
        if ($(this).length) {
            console.log("$.fn.fileMySpring $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.fileMySpring $(this) -----> nooo! " + $(this).length);
            var tempObject = $(fileMySpringSettings.showcaseVideo);
        }
        console.log("$.fn.fileMySpring tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/file/myspring/?limit=" + fileMySpringSettings.limit + "&videmecallback=?",
            function (data) {
                if (data.results) {
                    console.log("$.fn.fileMySpring data -----> yes" + JSON.stringify(data));
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

    $.fn.showNewVideoPagination = function (options) {
        console.log("$.fn.showNewVideoPagination -----> ok");
        showNewVideoPaginationSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showNewVideo: ".videme-shownew-tile"
        }, options);
        /*        if ($(this).length) {
         console.log("$.fn.showNewVideo $(this) -----> yes " + $(this).length);
         var tempObject = $(this);
         } else {
         console.log("$.fn.showNewVideo $(this) -----> nooo! " + $(this).length);
         var tempObject = $(showNewVideoPaginationSettings.showNewVideo);
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

        $.getJSON("https://api.vide.me/file/shownew/?videmecallback=?",
            function (b) {
                /* Показать первый расклад */
                var a = [];
                $.each(b.results, function (d, c) {
                    /* Выйти после 3 интерации */
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
			<img src=\"https://75b93e15e684d3801ba7-714352ced5791c91ade7d6cf443a6b98.ssl.cf1.rackcdn.com/" + c.File + ".jpg\" alt=\"" + c.updatedAt + "\" title=\"" + c.updatedAt + "\" onerror='imgError(this);'>\
		<div class='videme-tile-signboard-true'>" + c.updatedAt + "</div>\
		<div class=''>" + c.File + "</div>\
		</a>\
	</div>\
</div>\
				")
                });
                /* Всё слепить и показать */
                $(".videme-shownew-tile").html(a.join(""));
                /* Вычисилить максимальное число страниц */
                var pagetotal = Math.ceil(b.results.length / 3);
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
                        $.getJSON("https://api.vide.me/file/shownew/?skip=" + skip + "&videmecallback=?",
                            function (b) {
                                var a = [];
                                $.each(b.results, function (d, c) {
                                    /* Выйти после 3 интерации */
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
			<img src=\"https://75b93e15e684d3801ba7-714352ced5791c91ade7d6cf443a6b98.ssl.cf1.rackcdn.com/" + c.File + ".jpg\" alt=\"" + c.updatedAt + "\" title=\"" + c.updatedAt + "\" onerror='imgError(this);'>\
		<div class='videme-tile-signboard-true'>" + c.updatedAt + "</div>\
		<div class=''>" + c.File + "</div>\
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

    $.fn.showPopVideoPagination = function (options) {
        console.log("$.fn.showNewVideoPagination -----> ok");
        showPopVideoPaginationSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showPopVideo: ".videme-showpop-tile"
        }, options);
        /*        if ($(this).length) {
         console.log("$.fn.showNewVideo $(this) -----> yes " + $(this).length);
         var tempObject = $(this);
         } else {
         console.log("$.fn.showNewVideo $(this) -----> nooo! " + $(this).length);
         var tempObject = $(showNewVideoPaginationSettings.showNewVideo);
         }
         console.log("$.fn.showNewVideo tempObject -----> " + tempObject.length);
         tempObject.html(VidemeProgress);*/
        //==return this.each(function () {
        //var tempObject = $(this);
        /* Сделать запрос */
        /*
         var data = $.fn.showNewVideo({
         //msg: msg
         });*/
        //console.log("$.fn.showPopVideoPagination showPopVideoPaginationSettings -----> " + JSON.stringify(showPopVideoPaginationSettings));
        //console.log("$.fn.showPopVideoPagination data -----> " + JSON.stringify(data));

        $.getJSON("https://api.vide.me/file/showpop/?videmecallback=?",
            function (b) {
                var a = [];
                $.each(b.results, function (d, c) {
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
			<img src=\"https://75b93e15e684d3801ba7-714352ced5791c91ade7d6cf443a6b98.ssl.cf1.rackcdn.com/" + c.File + ".jpg\" alt=\"" + c.updatedAt + "\" title=\"" + c.updatedAt + "\" onerror='imgError(this);'>\
		<div class='videme-tile-signboard-true'>" + c.updatedAt + "</div>\
		<div class=''>" + c.File + "</div>\
		</a>\
	</div>\
</div>\
			")
                });
                $(".videme-showpop-tile").html(a.join(""));

                var pagetotal = Math.ceil(b.results.length / 3); //example=2

                $('.videme-showpop-pagination').jqPagination({
                    //link_string	: '/?page={page_number}',
                    max_page: pagetotal,
                    paged: function (page) {
                        var skip = (page - 1) * 3;
                        $.getJSON("https://api.vide.me/file/showpop/?skip=" + skip + "&videmecallback=?",
                            function (b) {
                                var a = [];
                                $.each(b.results, function (d, c) {
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
			<img src=\"https://75b93e15e684d3801ba7-714352ced5791c91ade7d6cf443a6b98.ssl.cf1.rackcdn.com/" + c.File + ".jpg\" alt=\"" + c.updatedAt + "\" title=\"" + c.updatedAt + "\" onerror='imgError(this);'>\
		<div class='videme-tile-signboard-true'>" + c.updatedAt + "</div>\
		<div class=''>" + c.File + "</div>\
		</a>\
	</div>\
</div>\
			")
                                });
                                $(".videme-showpop-tile").html(a.join(""));
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

    $.fn.showNextVideoPagination = function (options) {
        console.log("$.fn.showNewVideoPagination -----> ok");
        showNextVideoPaginationSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showNextVideo: ".videme-shownext-tile"
        }, options);
        /*        if ($(this).length) {
         console.log("$.fn.showNewVideo $(this) -----> yes " + $(this).length);
         var tempObject = $(this);
         } else {
         console.log("$.fn.showNewVideo $(this) -----> nooo! " + $(this).length);
         var tempObject = $(showNewVideoPaginationSettings.showNewVideo);
         }
         console.log("$.fn.showNewVideo tempObject -----> " + tempObject.length);
         tempObject.html(VidemeProgress);*/
        //==return this.each(function () {
        //var tempObject = $(this);
        /* Сделать запрос */
        /*
         var data = $.fn.showNewVideo({
         //msg: msg
         });*/
        //console.log("$.fn.showPopVideoPagination showPopVideoPaginationSettings -----> " + JSON.stringify(showPopVideoPaginationSettings));
        //console.log("$.fn.showPopVideoPagination data -----> " + JSON.stringify(data));
        var prevfile = $.cookie('vide_prev_file');
        var file = showNextVideoPaginationSettings.file;
        var ticketname = showNextVideoPaginationSettings.ticketName;
        var messageid = showNextVideoPaginationSettings.messageid;
        $.cookie("vide_prev_file", file);

//	var updatedAt = $this.attr('updatedAt-value');
//	var Subject = $this.attr('Subject-value');
//	var Message = $this.attr('Message-value');
//	var href = $this.attr('href');


        /*
         $('.videme-video-element-center').html("\
         <video controls autoplay>\
         <source src='https://gu.vide.me/vi?m=" + ticketname + "&messageid=" + messageid + "' type='video/mp4'>\
         Your browser does not support the <code>video</code> element.\
         </video>\
         ");
         */


        /* ==
         $('.videme-panel-actor2').html(b['results'][0]['FromUserName']);
         $('.videme-panel-date2').html(b['results'][0]['updatedAt']);
         $('.videme-panel-subject2').html(b['results'][0]['Subject']);
         $('.videme-panel-message2').html(b['results'][0]['Message']);
         */
        $(".videme-shownext-tile").html("<img src='data:image/gif;base64,R0lGODlhDQAMAKIAAP///7W1ta2trXNzczExMf4BAgAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAFACwAAAAADQAMAAADIgi6zCIghDilejRbgK2fHPRloVaB3Umm5iWqGzuW49bcQAIAIfkEBQoABQAsAAABAAMACgAAAwhYRMrb8ElHEwAh+QQFCgAFACwAAAEADAAKAAADHlgzRVRCQLnai1Mxl3HlmLddkmh11IhqZ5i25QvGCQAh+QQFCgAFACwAAAEACQAKAAADGVgiNVOEKOagXO3FmS2vGwZelEZ2YemJZgIAIfkEBQoABQAsBAABAAgACgAAAxYYUTNFRDEHZXtx3appnpjliWFXglACACH5BAUKAAUALAcAAQAFAAoAAAMNGFEzym61N2WE9FZsEwA7' />");

        /* Вставить проверку одинаковости файлов*/

        /* Сделать запрос */
        $.getJSON("https://api.vide.me/file/shownext/?limit=12&prevfile=" + prevfile + "&file=" + file + "&videmecallback=?",
            function (b) {

                if (b.results.length > 2) {

                    /* Показать первый расклад */
                    var a = [];
                    $.each(b.results, function (d, c) {
                        /* Выйти после 3 интерации */
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
			<img src=\"https://75b93e15e684d3801ba7-714352ced5791c91ade7d6cf443a6b98.ssl.cf1.rackcdn.com/" + c.File + ".jpg\" alt=\"" + c.updatedAt + "\" title=\"" + c.updatedAt + "\" onerror='imgError(this);'>\
		<div class='videme-tile-signboard-true'>" + c.updatedAt + "</div>\
		<div class=''>" + c.File + "</div>\
		</a>\
	</div>\
</div>\
				")
                    });
                    /* Всё слепить и показать */
                    $(".videme-shownext-tile").html(a.join(""));
                    /* Вычисилить максимальное число страниц */
                    var pagetotal = Math.ceil(b.results.length / 3); //example=2
                    /* Объявить экземпляр пейджинатора */
                    $('.videme-shownext-pagination').jqPagination({
                        //link_string	: '/?page={page_number}',
                        max_page: pagetotal,
                        paged: function (page) {
                            /* Пропустить страниц = текущая страница * элементов на странице */
                            //var skip = (page - 1) * 4;
                            var skip = (page - 1) * 3;
                            $.getJSON("https://api.vide.me/file/shownext/?limit=12&skip=" + skip + "&prevfile=" + prevfile + "&file=" + file + "&videmecallback=?",
                                function (b) {

                                    var a = [];
                                    $.each(b.results, function (d, c) {
                                        /* Выйти после 3 интерации */
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
			<img src=\"https://75b93e15e684d3801ba7-714352ced5791c91ade7d6cf443a6b98.ssl.cf1.rackcdn.com/" + c.File + ".jpg\" alt=\"" + c.updatedAt + "\" title=\"" + c.updatedAt + "\" onerror='imgError(this);'>\
		<div class='videme-tile-signboard-true'>" + c.updatedAt + "</div>\
		<div class=''>" + c.File + "</div>\
		</a>\
	</div>\
</div>\
					")
                                    });
                                    /* Всё слепить и показать */
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

    function showTile(showFile, tempObject, actionUrlClass) {
        if (tempObject.width() < 500) {
            var tempObjectClass = " videme-narrow-tile";
        } else {
            var tempObjectClass = "";
        }
        var html = [];
        $.each(showFile, function (key, value) {
            //console.log("value.Message --- " + JSON.stringify(value.Message));
            html.push("\
				<div class='box" + tempObjectClass + "'>\
				<div class='boxInner'>\
				<a class='" + actionUrlClass + "' \
						file='" + value.file + "' \
						messageid='" + value.messageid + "' \
						fromUserName='" + value.fromUserName + "' \
						toUserName='" + value.toUserName + "' \
						updatedAt='" + value.updatedAt + "' \
						subject='" + value.subject + "' \
						message='" + value.message + "' \
						href='https://vide.me/v?m=" + value.href + "&messageid=" + value.messageid + "' target='_blank'>\
			<div class='titleTop'>\
						 " + value.a + "<br>\
						 " + value.b + "<br>\
						 " + value.c + "<br>\
						 " + value.d + "<br>\
			</div>\
						 <img src='https://75b93e15e684d3801ba7-714352ced5791c91ade7d6cf443a6b98.ssl.cf1.rackcdn.com/" + value.img + ".jpg' alt=''>\
						 </img>\
					<div class='videme-tile-signboard-true'>\
					</div>\
			</a>\
				</div>\
		 	")
        });
        return html;
    }

    function parseFileInbox(parseFileInbox) {
        $.each(parseFileInbox.results, function (key, value) {
            console.log("parseFileInbox.results[key] ----->" + JSON.stringify(parseFileInbox.results[key]));
            parseFileInbox[key] = {
                'a': value.FromUserName,
                'b': value.Subject,
                'c': value.Message,
                'd': value.updatedAt,
                'img': value.File,
                'href': value.File,
                'fromUserName': value.FromUserName,
                'subject': value.Subject,
                'message': value.Message,
                'updatedAt': value.updatedAt,
                'file': value.File,
                'messageid': value.objectId
            };
        });
        delete parseFileInbox.results;
        console.log("parseFileInbox ----->" + JSON.stringify(parseFileInbox));
        return parseFileInbox;
    }

    function parseFileSent(parseFileSent) {
        $.each(parseFileSent.results, function (key, value) {
            parseFileSent[key] = {
                'a': value.ToUserName,
                'b': value.Subject,
                'c': value.Message,
                'd': value.updatedAt,
                'img': value.File,
                'href': value.File,
                'toUserName': value.ToUserName,
                'subject': value.Subject,
                'message': value.Message,
                'updatedAt': value.updatedAt,
                'file': value.File,
                //'objectId': value.objectId
                'messageid': value.objectId
            };
        });
        delete parseFileSent.results;
        return parseFileSent;
    }

    function parseFileMy(parseFileMy) {
        $.each(parseFileMy.results, function (key, value) {
            parseFileMy[key] = {
                //'a': value.ToUserName,
                'a': value.Subject,
                'b': value.Message,
                'c': value.updatedAt,
                'img': value.File,
                'href': value.File,
                //'toUserName': value.ToUserName,
                'subject': value.Subject,
                'message': value.Message,
                'updatedAt': value.updatedAt,
                'file': value.File
            };
        });
        delete parseFileMy.results;
        return parseFileMy;
    }

    function parseFileMySpring(parseFileMySpring) {
        $.each(parseFileMySpring.results, function (key, value) {
            console.log("parseFileMySpring.results[key] ----->" + JSON.stringify(parseFileMySpring.results[key]));
            parseFileMySpring[key] = {
                //'a': value.ToUserName,
                'a': value.Subject,
                'b': value.Message,
                'c': value.updatedAt,
                'img': value.File,
                'href': value.File,
                //'toUserName': value.ToUserName,
                'subject': value.Subject,
                'message': value.Message,
                'updatedAt': value.updatedAt,
                'file': value.File
            };
        });
        delete parseFileMySpring.results;
        console.log("parseFileMySpring ----->" + JSON.stringify(parseFileMySpring));
        return parseFileMySpring;
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
                'updatedAt': value.updatedAt,
                'file': value.File
            };
        });
        delete parseShowNewVideo.results;
        console.log("parseShowNewVideo ----->" + JSON.stringify(parseShowNewVideo));
        return parseShowNewVideo;
    }

    function paddingButtonInbox(paddingButtonInbox) {
        paddingButtonInbox.showcaseButton = {
            'contact-toggle': {
                'file': paddingButtonInbox.file,
                'subject': paddingButtonInbox.subject,
                'message': paddingButtonInbox.message
            },
            'del-inbox-toggle': {
                'file': paddingButtonInbox.file,
                'messageid': paddingButtonInbox.messageid
            }
        };
        return paddingButtonInbox;
    }

    function paddingButtonSent(paddingButtonSend) {
        paddingButtonSend.showcaseButton = {
            'contact-toggle': {
                'file': paddingButtonSend.file,
                'subject': paddingButtonSend.subject,
                'message': paddingButtonSend.message
            },
            'list-toggle': {
                'file': paddingButtonSend.file,
                'subject': paddingButtonSend.subject,
                'message': paddingButtonSend.message
            },
            'del-sent-toggle': {
                'file': paddingButtonSend.file,
                'messageid': paddingButtonSend.messageid
            }
        };
        return paddingButtonSend;
    }

    function paddingButtonMy(paddingButtonMy) {
        paddingButtonMy.showcaseButton = {
            'contact-toggle': {
                'file': paddingButtonMy.file,
                'subject': paddingButtonMy.subject,
                'message': paddingButtonMy.message
            },
            'list-toggle': {
                'file': paddingButtonMy.file,
                'subject': paddingButtonMy.subject,
                'message': paddingButtonMy.message
            },
            'del-my-toggle': {
                'file': paddingButtonMy.file
            }
        };
        return paddingButtonMy;
    }

    function paddingButtonMySpring(paddingButtonMySpring) {
        console.log("paddingButtonMySpring -----> " + JSON.stringify(paddingButtonMySpring));
        paddingButtonMySpring.showcaseButton = {
            'contact-toggle': {
                'file': paddingButtonMySpring.file,
                'subject': paddingButtonMySpring.subject,
                'message': paddingButtonMySpring.message
            },
            'list-toggle': {
                'file': paddingButtonMySpring.file,
                'subject': paddingButtonMySpring.subject,
                'message': paddingButtonMySpring.message
            },
            'del-sharefile-toggle': {
                'file': paddingButtonMySpring.file
            }
        };
        return paddingButtonMySpring;
    }

    $.fn.showcaseVideo = function (options) {
        showcaseVideoSettings = $.extend({
            file: "9566b5a3475c25aa",
            miniVideo: true,
            //showcaseVideo: "videme-showcase-video",
            showcaseVideo: "#videme-showcase-video",
            authorized: true
        }, options);

        if (showcaseVideoSettings.authorized) {
            console.log("authorized -----> true");
            var sourseURL = "http://gum.vide.me/vi?m=";
        } else {
            console.log("authorized -----> false");
            var sourseURL = "http://gu.vide.me/vi?m=";
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
            resizeVideoJS(showcasePlayerFunc);
            showcasePlayerFunc.src({
                type: "video/mp4",
                src: sourseURL + showcaseVideoSettings.file + "&messageid=" + showcaseVideoSettings.messageid
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
        $(".videme-showcase-subject").html(showcaseTextSettings.subject);
        $(".videme-showcase-message").html(showcaseTextSettings.message);
        $(".videme-showcase-updatedat").html(showcaseTextSettings.updatedAt);
    };

    $.fn.showcaseButton = function (options) {
        showcaseButtonSettings = $.extend({}, options);
        console.log("$.fn.showcaseButton showcaseButtonSettings -----> " + JSON.stringify(showcaseButtonSettings));
        if (showcaseButtonSettings.showcaseButton['contact-toggle']) $(".contact-toggle").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['contact-toggle']);
        if (showcaseButtonSettings.showcaseButton['list-toggle']) $(".list-toggle").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['list-toggle']);
        if (showcaseButtonSettings.showcaseButton['del-inbox-toggle']) $(".del-inbox-toggle").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['del-inbox-toggle']);
        if (showcaseButtonSettings.showcaseButton['del-sent-toggle']) $(".del-sent-toggle").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['del-sent-toggle']);
        if (showcaseButtonSettings.showcaseButton['del-my-toggle']) $(".del-my-toggle").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['del-my-toggle']);
        if (showcaseButtonSettings.showcaseButton['del-sharefile-toggle']) $(".del-sharefile-toggle").removeClass("hidden").attr(showcaseButtonSettings.showcaseButton['del-sharefile-toggle']);
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
        $.fn.showcaseVideo(showcaseVideoTextButtonSettings);
        $.fn.showcaseText(showcaseVideoTextButtonSettings);
        $.fn.showcaseButton(showcaseVideoTextButtonSettings);
    };

    $.fn.showNewArticle = function (options) {
        articleShowNewSettings = $.extend({
            limit: 3
        }, options);
        $(this).html(VidemeProgress);
        return this.each(function () {
            var TempObject = $(this);
            $.getJSON("https://api.vide.me/article/shownew/?limit=" + articleShowNewSettings.limit + "&videmecallback=?",
                function (data) {
                    TempObject.html($.fn.showArticle({
                        showArticle: parseArticleShowNew(data),
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

    $.fn.showMyArticle = function (options) {
        articleShowMySettings = $.extend({
            limit: 12
        }, options);
        $(this).html(VidemeProgress);
        //return this.each(function () {
            var TempObject = $(this);
            $.getJSON("https://api.vide.me/article/my/?limit=" + articleShowMySettings.limit + "&videmecallback=?",
                function (data) {
                    TempObject.html($.fn.showArticle({
                        showArticle: parseArticleShowNew(data),
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
                        console.log("$.fn.showCountUserArticle data -----> no" + obj.length);
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
        showTileButtonSettings = $.extend({
        }, options);
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

    $.fn.showArticle = function (options) {
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

        $.each(showArticleSettings.showArticle, function (key, value) {
            showArticleSettings.article = value.href;

            html.push("\
				<div class='box" + tempObjectClass + "'>\
									<a class='' href='https://vide.me/article/" + value.href + "'>\
				<div class='boxInner'>\
					<div class='titleTop'>\
						 " + value.a + "<br>\
						 " + value.b + "<br>\
						 " + value.c + "<br>\
					</div>\
						 <img src='" + value.img + "' alt=''>\
					 <div class='videme-tile-signboard-true'></div>\
				</div>\
									</a>\
									"
                + $.fn.showTileButton(showArticleSettings) +
         "</div>\
		 	");
        });
        return html;
    };

    function parseArticleShowNew(parseArticleShowNew) {
        console.log("parseArticleShowNew -----> " + JSON.stringify(parseArticleShowNew));
        $.each(parseArticleShowNew, function (key, value) {
            parseArticleShowNew[key] = {
                'a': value.value.date,
                'b': value.value.username,
                'c': value.value.title,
                'img': value.value.cover,
                'href': value.id
            };
        });
        return parseArticleShowNew;
    }

    /***************************************************************************
     v2 Функция показать Контакты
     ***************************************************************************/
    $.fn.showContact = function (options) {
        console.log("$.fn.showContact -----> ok");
        showContactSettings = $.extend({
            // TODO: добавить limit в NAD
            limit: 6,
            showContact: "#videme-tile"
        }, options);
        if ($(this).length) {
            console.log("$.fn.showContact $(this) -----> yes " + $(this).length);
            var tempObject = $(this);
        } else {
            console.log("$.fn.showContact $(this) -----> nooo! " + $(this).length);
            var tempObject = $(showContactSettings.showContact);
        }
        console.log("$.fn.showContact tempObject -----> " + tempObject.length);
        tempObject.html(VidemeProgress);
        $.getJSON("https://api.vide.me/contact/?limit=" + showContactSettings.limit + "&videmecallback=?",
            function (data) {
                // TODO: Попробовать без куки nad
                if (data.results) {
                    console.log("$.fn.showContact data -----> yes" + JSON.stringify(data));
                    var results = [];
                    //$.each(data['results'], function (key, value) {
                    $.each(data.results, function (key, value) {
                        results.push("\
                        <div class='well well-lg'>\
                            <span class=\"badge\">" + (key + 1) + "</span>\
	<a href='https://vide.me/rec.html?email=" + value.Email + "'>\
		" + value.Email + "\
		<button type='button' \
			class='btn btn-default pull-right btn-sm' data-toggle='modal' \
			email-value='#" + value.Email + "'> \
			<span class='glyphicon glyphicon-envelope'></span> Send video email\
		</button>\
	</a>\
	<button type='button' \
		class='btn btn-default pull-right btn-sm contact-edit-toggle' data-toggle='modal' \
		data-target='#modal-edit-contact' \
		email='" + value.Email + "'>\
		<span class='glyphicon glyphicon-edit'></span> Edit\
	</button>\
</div>\
");
                    });
                    tempObject.html(results.join(""));
                } else {
                    console.log("$.fn.showContact data -----> no");
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
        console.log("$.fn.showContact -----> ok");
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
        $.getJSON("https://api.vide.me/list/?limit=" + showListSettings.limit + "&videmecallback=?",
            function (data) {
                if (data.results) {
                    console.log("$.fn.showList data -----> yes" + JSON.stringify(data));
                    var results = [];
                    //$.each(data['results'], function (key, value) {
                    $.each(data.results, function (key, value) {
                        results.push("\
<div class='well well-lg'>\
  <span class=\"badge\">" + (key + 1) + "</span>\
	<a href='https://vide.me/rec.html?email=" + value.ListName + "'>\
		" + value.ListName + "\
	</a>\
	<button type='button' \
		class='btn btn-primary pull-right list-edit-toggle' data-toggle='modal' \
		data-target='#modal-edit-list' \
		list='" + value.ListName + "'>\
		<span class='glyphicon glyphicon-edit'></span> Edit\
	</button>\
</div>\
");
                    });
                    tempObject.html(results.join(""));
                } else {
                    console.log("$.fn.showList data -----> no");
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

    /*************************************************************
     v2 Событие 2: нажата кнопка Редактировать контакт,
     отрисовка формы и кнопок в модальное окно
     **************************************************************/
    $(document).on('click', '.contact-edit-toggle', function (event) {
        event.preventDefault();
        var $this = $(this);
        var email = $this.attr('email');
        $('#email').val(email);
        $('#newemail').val(email);
        $(".contact-del-toggle").attr("email", email);
    });

    /*************************************************************
     v2 Событие 4: нажата кнопка вызова и отрисовки
     кнопки удалить Contact во втором модальном окне
     **************************************************************/
    $(document).on('click', '.contact-del-toggle', function (event) {
        event.stopPropagation();
        $('.videme-display').html($(".contact-del-toggle").attr("email"));
        $('#del-email').val($(".contact-del-toggle").attr("email"));
    });

    /*************************************************************
     v2 Событие 2: нажата ссылка на файл из плитки Inbox,
     отрисовка текста и кнопок в панель
     **************************************************************/
    $(document).on('click', 'a.file-inbox-url', function (event) {
        console.log("a.file-inbox-url -----> click");
        console.log("a.file-inbox-url $(this).getAttributes() -----> " + JSON.stringify($(this).getAttributes()));
        event.preventDefault();
        $.fn.showcaseVideoTextButton(paddingButtonInbox($(this).getAttributes()));
    });

    /*************************************************************
     v2 Событие 2: нажата ссылка на файл из плитки Sent,
     отрисовка текста и кнопок в панель
     **************************************************************/
    $(document).on('click', 'a.file-sent-url', function (event) {
        console.log("a.file-sent-url -----> click");
        event.preventDefault();
        $.fn.showcaseVideoTextButton(paddingButtonSent($(this).getAttributes()));
    });

    /*************************************************************
     v2 Событие 2: нажата ссылка на файл из плитки My,
     отрисовка текста и кнопок в панель
     **************************************************************/
    $(document).on('click', 'a.file-my-url', function (event) {
        console.log("a.file-my-url -----> click");
        event.preventDefault();
        $.fn.showcaseVideoTextButton(paddingButtonMy($(this).getAttributes()));
    });

    /*************************************************************
     v2 Событие 2: нажата ссылка на файл из плитки MySpring,
     отрисовка текста и кнопок в панель
     **************************************************************/
    $(document).on('click', 'a.file-myspring-url', function (event) {
        console.log("a.file-myspring-url -----> click");
        event.preventDefault();
        $.fn.showcaseVideoTextButton(paddingButtonMySpring($(this).getAttributes()));
    });

    /*************************************************************
     v2 Событие 3: нажата кнопка вызова и отрисовки контактов в модальном окне
     **************************************************************/
        // TODO: Попробовать так:
    $('#myTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    });

    $(document).on('click', '.contact-toggle', function (event) {
        console.log(".contact-toggle -----> click");
        event.stopPropagation();
        if ($('.contact-toggle').attr('file')) {
            $(".videme-contact-list").html(VidemeProgress);
            $(".videme-mini-img").html(VidemeProgress); // TODO: Проверить, может убрать
            $(".videme-mini-img").html("<img src='https://75b93e15e684d3801ba7-714352ced5791c91ade7d6cf443a6b98.ssl.cf1.rackcdn.com/" + $('.contact-toggle').attr('file') + ".jpg' class='videme-img-tile-my' width='190' height='108'>");
            $.getJSON("https://api.vide.me/contact/?videmecallback=?",
                function (data) {
                    // TODO: Попробовать без куки nad
                    if (data.results) {
                        console.log(".contact-toggle data -----> yes" + JSON.stringify(data));
                        var results = [];
                        $.each(data.results, function (key, value) {
                            results.push("<a class='contact-url' href='https://api.vide.me/file/resend/?email=" + value.Email + "&file=" + $('.contact-toggle').attr('file') + "&subject=Re: " + $('.contact-toggle').attr('subject') + "&message=" + $('.contact-toggle').attr('message') + "&nad=" + $.cookie('vide_nad') + "' target='_blank'><span class='label label-primary'>" + value.Email + "</span></a> ");
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
        if ($('.list-toggle').attr('file')) {
            $(".videme-list-list").html(VidemeProgress);
            $(".videme-mini-img").html(VidemeProgress);
            $(".videme-mini-img").html("<img src='https://75b93e15e684d3801ba7-714352ced5791c91ade7d6cf443a6b98.ssl.cf1.rackcdn.com/" + $('.list-toggle').attr('file') + ".jpg' class='videme-img-tile-my' width='190' height='108'>");
            $(".videme-file-info").html("<b>" + $('.list-toggle').attr('subject') + "</b><br>" + $('.list-toggle').attr('message') + "<br>" + $('.list-toggle').attr('updatedat') + "<br>");
            $('#file').val($('.list-toggle').attr('file'));
            $.getJSON("https://api.vide.me/list/?videmecallback=?",
                function (data) {
                    if (data.results) {
                        console.log(".list-toggle data -----> yes" + JSON.stringify(data));
                        var results = [];
                        $.each(data['results'], function (key, value) {
                            results.push("<a class='list-url' href='https://api.vide.me/file/share/?file=" + $('.list-toggle').attr('file') + "&list=" + value.ListName + "&nad=" + $.cookie('vide_nad') + "' target='_blank'><span class='label label-primary'>" + value.ListName + "</span></a> ");
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
        if ($('.del-inbox-toggle').attr('file')) {
            $(".videme-mini-img").html(VidemeProgress);
            $(".videme-mini-img").html("<img src='https://75b93e15e684d3801ba7-714352ced5791c91ade7d6cf443a6b98.ssl.cf1.rackcdn.com/" + $('.del-inbox-toggle').attr('file') + ".jpg' class='videme-mini-img' width='190' height='108'>");
            $('.videme-del-list').html("\
<button type='button' class='btn btn-primary' data-dismiss='modal'>\
	Сancel\
</button> \
<a class='del-inbox-url' file='https://api.vide.me/file/delinbox/?messageid=" + $('.del-inbox-toggle').attr('messageid') + "&nad=" + $.cookie('vide_nad') + "' target='_blank'>\
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
     v2 Событие 3: нажата кнопка вызова и отрисовки
     кнопки удалить Sent в модальном окне
     **************************************************************/
    $(document).on('click', '.del-sent-toggle', function (event) {
        console.log(".del-sent-toggle -----> click");
        event.stopPropagation();
        if ($('.del-sent-toggle').attr('file')) {
            $(".videme-mini-img").html(VidemeProgress);
            $(".videme-mini-img").html("<img src='https://75b93e15e684d3801ba7-714352ced5791c91ade7d6cf443a6b98.ssl.cf1.rackcdn.com/" + $('.del-sent-toggle').attr('file') + ".jpg' class='videme-mini-img' width='190' height='108'>");
            $('.videme-del-list').html("\
<button type='button' class='btn btn-primary' data-dismiss='modal'>\
	Сancel\
</button> \
<a class='del-sent-url' file='https://api.vide.me/file/delsent/?messageid=" + $('.del-sent-toggle').attr('messageid') + "&nad=" + $.cookie('vide_nad') + "' target='_blank'>\
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
     v2 Событие 3: нажата кнопка вызова и отрисовки
     кнопки удалить MY в модальном окне
     **************************************************************/
    $(document).on('click', '.del-my-toggle', function (event) {
        console.log(".del-my-toggle -----> click");
        event.stopPropagation();
        if ($('.del-my-toggle').attr('file')) {
            $(".videme-mini-img").html(VidemeProgress);
            $(".videme-mini-img").html("<img src='https://75b93e15e684d3801ba7-714352ced5791c91ade7d6cf443a6b98.ssl.cf1.rackcdn.com/" + $('.del-my-toggle').attr('file') + ".jpg' class='videme-mini-img' width='190' height='108'>");
            $('.videme-del-list').html("\
<button type='button' class='btn btn-primary' data-dismiss='modal'>\
	Сancel\
</button> \
<a class='del-my-url' file='https://api.vide.me/file/delfile/?file=" + $('.del-my-toggle').attr('file') + "&nad=" + $.cookie('vide_nad') + "' target='_blank'>\
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
     v2 Событие 3: нажата кнопка вызова и отрисовки
     кнопки удалить sharefile в модальное окно
     **************************************************************/
    $(document).on('click', '.del-sharefile-toggle', function (event) {
        console.log(".del-sharefile-toggle -----> click");
        event.stopPropagation();
        $(".videme-mini-img").html(VidemeProgress);
        $(".videme-mini-img").html("<img src='https://75b93e15e684d3801ba7-714352ced5791c91ade7d6cf443a6b98.ssl.cf1.rackcdn.com/" + $('.del-sharefile-toggle').attr('file') + ".jpg' class='videme-mini-img' width='190' height='108'>");
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
     v2 Событие 4: нажата ссылка из кнопки удалить файл Inbox
     **************************************************************/
    $(document).on('click', 'a.del-inbox-url', function (event) {
        console.log("a.del-inbox-url -----> click");
        event.preventDefault();
        var $this = $(this);
        var href = $this.attr('file');
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

})
(jQuery);

/***************************************************************************
 *  Конец Jquery plugin Vide.me
 * *************************************************************************/

/************************************************************************
 * Vide.me
 * **********************************************************************/

var VidemeProgress = "<img src='data:image/gif;base64,R0lGODlhDQAMAKIAAP///7W1ta2trXNzczExMf4BAgAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAFACwAAAAADQAMAAADIgi6zCIghDilejRbgK2fHPRloVaB3Umm5iWqGzuW49bcQAIAIfkEBQoABQAsAAABAAMACgAAAwhYRMrb8ElHEwAh+QQFCgAFACwAAAEADAAKAAADHlgzRVRCQLnai1Mxl3HlmLddkmh11IhqZ5i25QvGCQAh+QQFCgAFACwAAAEACQAKAAADGVgiNVOEKOagXO3FmS2vGwZelEZ2YemJZgIAIfkEBQoABQAsBAABAAgACgAAAxYYUTNFRDEHZXtx3appnpjliWFXglACACH5BAUKAAUALAcAAQAFAAoAAAMNGFEzym61N2WE9FZsEwA7' />";

$(document).ready(function () {
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

    /*******************************************************************************
     Поставить условие если есть кука
     *******************************************************************************/
    if ($.cookie('vide_nad')) {
        $.getJSON("https://api.vide.me/user/info/?videmecallback=?",
            function (data) {
                if (data.UserPicture === '') {
                    $('#user_brand').html("<a href='https://api.vide.me/' target='_blank'> <img src='https://ea1116048a2ffc61f8b7-d479f182e30f6e6ac2ebc5ce5ab9de7b.ssl.cf1.rackcdn.com/avatar.png' width='48' height='48' alt='" + data.UserDisplayName + "'></a>");
                } else {
                    $('#user_brand').html("<a href='" + data.UserLink + "' target='_blank'> <img src='" + data.UserPicture + "' width='48' height='48' alt='" + data.UserDisplayName + "'></a>");
                }
                $('#user_name').html("<a href='" + data.UserLink + "' target='_blank'>" + data.UserDisplayName + "</a>");
                $('#user_email').html(data.username);
                if (data.UserPicture === '') {
                    $('#form_user_brand').html("<a href='" + data.UserLink + "' target='_blank'> <img src='https://ea1116048a2ffc61f8b7-d479f182e30f6e6ac2ebc5ce5ab9de7b.ssl.cf1.rackcdn.com/avatar.png' alt='" + data.UserDisplayName + "'></a>");
                } else {
                    $('#form_user_brand').html("<a href='" + data.UserLink + "' target='_blank'> <img src='" + data.UserPicture + "' alt='" + data.UserDisplayName + "'></a>");
                }
                $('#form_user_name').html("<a href='" + data.UserLink + "' target='_blank'>" + data.UserDisplayName + "</a>");
                $('#form_user_email').html(data.username);
            }
        );
        /*Волшебное использование куки ===============================================*/
        $('#nad').val($.cookie('vide_nad'));
        /*============================================================================*/
    }
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
                url: 'https://sm.vide.me/sendmail/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $("#submit").attr('disabled', true);
                    $('#videme-progress').html(VidemeProgress);
                },
                success: function (msg) {
                    //console.log("Data Saved: " + msg);
                    $('#videme-progress').empty();
                    $('#cform').hide('slow');
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
                url: 'https://sm.vide.me/sendmail/testmail/',
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
        image.src = "https://75b93e15e684d3801ba7-714352ced5791c91ade7d6cf443a6b98.ssl.cf1.rackcdn.com/undefined.gif";
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
  <source src='https://gu.vide.me/vi?m=" + file.substr(1) + "&messageid=" + messageid.substr(1) + "' type='video/mp4'>\
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
			<img src=\"https://75b93e15e684d3801ba7-714352ced5791c91ade7d6cf443a6b98.ssl.cf1.rackcdn.com/" + c.File + ".jpg\" alt=\"" + c.updatedAt + "\" title=\"" + c.updatedAt + "\" onerror='imgError(this);'>\
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
			<img src=\"https://75b93e15e684d3801ba7-714352ced5791c91ade7d6cf443a6b98.ssl.cf1.rackcdn.com/" + c.File + ".jpg\" alt=\"" + c.updatedAt + "\" title=\"" + c.updatedAt + "\" onerror='imgError(this);'>\
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
//	$(".video-container").html("<img src='https://75b93e15e684d3801ba7-714352ced5791c91ade7d6cf443a6b98.ssl.cf1.rackcdn.com/" + file.substr(1) + ".jpg'");

        $('.videme-brand-panel-element-left').html("\
<div class='videme-panel-date'>" + updatedAt.substr(1) + "</div>\
");

        $('.videme-brand-panel-element-center').html("\
<video controls autoplay>\
  <source src='https://gum.vide.me/vi?m=" + file.substr(1) + "&messageid=" + messageid.substr(1) + "' type='video/mp4'>\
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
                    $.fn.showContact();
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
                url: 'https://api.vide.me/contact/remove/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $('#modal-del-contact').modal('hide');
                    $('#modal-edit-contact').modal('hide');
                    $.fn.showContact();
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
                    $.fn.showContact();
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
        list.replace(/.*(?=#[^\s]+$)/, '');
        $('#list').val(list);
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
                url: 'https://api.vide.me/list/update/',
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
                url: 'https://api.vide.me/list/remove/',
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
                url: 'https://api.vide.me/list/create/',
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
        //$('#user_pas_nad').val($.cookie('vide_nad'));
        //$('#user_info_submit').removeAttr('disabled');
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
                email: "Enter true email"
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/user/login/',
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

    // Возможно удалить
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
<input type=\"hidden\" name=\"article[tags][][tag]\" value=\"" + $("#TagValue").val() + "\">\
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
        $(this).find('#list').focus();
    });
    $("#modal-edit-list").on('shown.bs.modal', function () {
        $(this).find('#newlist').focus();
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
				Network error. <a href=\"" + document.URL + "\" class=\"alert-link\">Please reload the page.</a>\
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
