console.log("videme_jq_docready.js");


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
    };

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
    //$.fn.getAuthorized(); <-------------------------------------------------------------------------------------------

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
     Событие 2: multi_video
     **************************************************************/
    $(document).on('click', 'a.multi_video', function (event) {
        console.log('a.multi_video click');
        event.preventDefault();
        var $this = $(this);
        var href = $this.attr('href');
        //window.location.href = href;
    });
    /*************************************************************
     Click on tile item owner
     **************************************************************/
    $(document).on('click', 'a.tile-item-owner', function (event) {
        console.log('a.tile-item-owner');
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
    $(document).on('click', 'a.showpop-url', function (event) { // TODO: Remove
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
    /*$(document).on('click', 'a.file-spring-url', function (event) {
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
    });*/

    /*************************************************************
     v2 Событие 4: Item edit
     **************************************************************/
    $('#item-edit-form').validate({
        /*rules: {
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
        },*/
        submitHandler: function (form) {
            var feedback = 'https://www.vide.me';
            if ($('#item_type').val() === 'video') feedback = 'https://www.vide.me/web/my_video/';
            if ($('#item_type').val() === 'image') feedback = 'https://www.vide.me/web/my_image/';
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/items/update/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    //$('#modal-item-edit').modal('hide');
                    window.location.href = feedback;
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    //$('#modal-item-edit').modal('hide');
                    window.location.href = feedback;
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });

    /*************************************************************
     v2 Событие 4: Event create
     **************************************************************/
    $('#event-edit-form').validate({
        /*rules: {
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
        },*/
        submitHandler: function (form) {
            /*var feedback = 'https://www.vide.me';
            if ($('#item_type').val() === 'video') feedback = 'https://www.vide.me/web/my_video/';
            if ($('#item_type').val() === 'image') feedback = 'https://www.vide.me/web/my_image/';*/
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/events/create/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    //$('#modal-item-edit').modal('hide');
                    window.location.href = 'https://www.vide.me/web/my_event/';
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    //$('#modal-item-edit').modal('hide');
                    window.location.href = 'https://www.vide.me/web/my_event/';
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });
    /*************************************************************
     v2 Событие 4: Event edit
     **************************************************************/
    $('#event-update-form').validate({ // V3
        /*rules: {
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
        },*/
        submitHandler: function (form) {
            /*var feedback = 'https://www.vide.me';
            if ($('#item_type').val() === 'video') feedback = 'https://www.vide.me/web/my_video/';
            if ($('#item_type').val() === 'image') feedback = 'https://www.vide.me/web/my_image/';*/
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/events/update/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    //$('#modal-item-edit').modal('hide');
                    window.location.href = 'https://www.vide.me/web/my_event/';
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    //$('#modal-item-edit').modal('hide');
                    window.location.href = 'https://www.vide.me/web/my_event/';
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
    $(document).on('click', '.album-edit-toggle', function (event) {
        event.preventDefault();
        var $this = $(this);
        //var list = $this.attr('list');
        console.log(".album-edit-toggle click list: -----> " + $this.attr('title'));
        //list.replace(/.*(?=#[^\s]+$)/, '');
        $('#nad').val($.cookie('vide_nad'));
        $('#edit_album').val($this.attr('title'));
        $('#new_title').val($this.attr('title'));
        $('#access').val($this.attr('access'));
        $(".list-del-toggle").attr("title", $this.attr('title'));
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
                url: 'https://api.vide.me/v2/albums/update/',
                timeout: 20000,
                //data: $(form).serialize(),
                data: $(form).serialize() + "&cover=" + $(".image-picker").val() + "&nad=" + $.cookie('vide_nad'),
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
        $('.videme-display').html($(".list-del-toggle").attr("title"));
        $('#del-list').val($(".list-del-toggle").attr("title"));
    });

    /*************************************************************
     v2 Событие 5: нажата кнопка удалить List во втором модальном окне
     **************************************************************/
    $('#list-del-form').validate({
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
                type: "POST",
                url: 'https://api.vide.me/v2/albums/delete/',
                timeout: 20000,
                data: $(form).serialize() + "&nad=" + $.cookie('vide_nad'),
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
            "album": {
                required: true,
                //email:true,
                maxlength: 40
            }
        },
        messages: {
            "album": {
                required: "<-"
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/albums/create/',
                timeout: 20000,
                data: $(form).serialize() + "&cover=" + $(".image-picker-create-album").val() + "&nad=" + $.cookie('vide_nad'),
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
            console.log('login');
            var $this = $(this);
            var feedback = 'https://www.vide.me';
            if ($('.feedback').val()) {
                feedback = $('.feedback').val();
            }
            console.info('user-login-form feedback ---> ' + feedback);
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
                    //$.cookie('vide_nad', msg, {expires: 14, path: '/; SameSite=None', domain: 'vide.me', secure: true});
                    //document.location.reload(true);
                    console.info('user-login-form feedback ajax success ---> ' + feedback);
                    functionAfterLogin(msg);
                    window.location = feedback;
                },
                error: function (msg) {
                    $.fn.errorNotification({
                        //msg: msg
                        msg: 'Wrong passord'
                    });
                }
            });
        }
    });
    /*************************************************************
     Событие XX: нажата кнопка Login V2 reCAPTCHA v2
     **************************************************************/
    $('#user-login-form_v2').validate({
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
            console.log('login');
            var $this = $(this);
            var feedback = 'https://www.vide.me';
            if ($('.feedback').val()) {
                feedback = $('.feedback').val();
            }
            console.info('user-login-form_v2 feedback ---> ' + feedback);
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/user/login_v2/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $.fn.successNotification({
                        msg: msg
                    });
                    //$.cookie('vide_nad', msg, {expires: 14, path: '/', domain: 'vide.me', secure: true});
                    $.cookie('vide_nad', msg, {expires: 14, path: '/; SameSite=None', domain: 'vide.me', secure: true});
                    //document.location.reload(true);
                    console.info('user-login-form_v2 feedback ajax success ---> ' + feedback);
                    window.location = feedback;
                },
                error: function (msg) {
                    $.fn.errorNotification({
                        //msg: msg
                        msg: 'Wrong passord'
                    });
                }
            });
        }
    });
    $('#user-login-form-modal').validate({ // TODO: remove if recaptcha working
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
            console.log('login');
            var $this = $(this);
            var feedback = 'https://www.vide.me';
            if ($('.feedback').val()) {
                feedback = $('.feedback').val();
            }
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
                    $.cookie('vide_nad', msg, {expires: 14, path: '/', domain: 'vide.me', secure: true});
                    //document.location.reload(true);
                    window.location = feedback;
                },
                error: function (msg) {
                    $.fn.errorNotification({
                        //msg: msg
                        msg: 'Wrong passord'
                    });
                }
            });
        }
    });
    /*************************************************************
     Modal Signin
     **************************************************************/
    $('#signin').validate({ // TODO: remove
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
                        //msg: msg
                        msg: 'Wrong passord'
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
     Событие XX: нажата кнопка изменить информацию о пользователе
     **************************************************************/
    $('#user-subscriptions-form').validate({
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/subscriptions/update/',
                timeout: 20000,
                data: $(form).serialize() + "&nad=" + $.cookie('vide_nad'),
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
     Событие XX: нажата кнопка изменить информацию Map
     **************************************************************/
    $('#user-map-form').validate({
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/user/update/map/',
                timeout: 20000,
                data: $(form).serialize() + "&nad=" + $.cookie('vide_nad'),
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
        rules: {
            "spring": {
                required: true,
                maxlength: 24
            }
        },
        messages: {
            "spring": {
                required: "",
                email: "Enter true Spring"
            }
        },
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
        rules: {
            "newpassword": {
                required: true,
                maxlength: 24
            }
        },
        messages: {
            "newpassword": {
                required: "",
                email: "Enter password"
            }
        },
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
                    document.location.reload();
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
     v2 videme-essences-select
     **************************************************************/
    $('#videme-essences-select').validate({
        rules: {
            "videme_new_essences": {
                required: true,
                maxlength: 60
            }
        },
        messages: {
            "videme_new_essences": {
                required: "<-",
                //email: "Enter true title"
            }
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/essences/create/',
                timeout: 20000,
                data: $(form).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    console.log('videme-essences-select msg ' + msg)
                    //$('#modal-item-edit').modal('hide');
                    /*window.location.href = feedback;*/
                    $('#videme-my-essence-tile').showEssenceMy({});
                    $('#videme_new_essences').val('');
                    $.fn.successNotification({
                        msg: 'Success'
                    });
                },
                error: function (msg) {
                    //$('#modal-item-edit').modal('hide');
                    //window.location.href = feedback;
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });

    /*************************************************************
     Событие XX: form upload_public send data
     Событие XX: form fileupload send data
     **************************************************************/
    //$('#user-info-form').validate({
    /*$('#upload_public').validate({
        /!*rules: {
            "videme-upload-video-ticket_id": {
                required: true
            },
            "videme-upload-video-ticket": {
                required: true
            }
        },
        messages: {
            "videme-upload-video-ticket_id": {
                required: "<---"
            },
            "videme-upload-video-ticket": {
                required: "<--"
            }
        },*!/
        submitHandler: function (form) {
            //var phone = $("input#phone").val();
            console.log("#upload_public submitHandler videme-upload-video-ticket_id -----> ", $('#videme-upload-video-ticket_id').val());
            console.log("#upload_public submitHandler videme-upload-video-ticket -----> ", $('#videme-upload-video-ticket').val());
            if ($.cookie('vide_nad')) {
                $.ajax({
                    type: "POST",
                    url: 'https://api.vide.me/system/items/upload_public/',
                    timeout: 20000,
                    data: $(form).serialize() + '&nad=' + $.cookie('vide_nad'),
                    //data: $(form).serialize() + '&ticket_id=' + $('#videme-upload-video-ticket_id').val() + '&ticket=' + $('#videme-upload-video-ticket').val(),
                    //data: $('#upload_public').serialize(),
                    //data: 'ticket_id=' + $('#videme-upload-video-ticket_id').val() + '&ticket=' + $('#videme-upload-video-ticket').val(),
                    beforeSend: function () {
                        $.fn.processNotification();
                    },
                    success: function (msg) {
                        $.fn.successNotification({
                            msg: msg
                        });
                        $('.videme-download-template-common').empty();
                        $('.videme-upload-user-form').addClass('hidden');
                    },
                    error: function (msg) {
                        $.fn.errorNotification({
                            msg: msg
                        });
                    }
                });

                /!***************************************************!/
                /!*$('#fileupload').fileupload({
                    //filesContainer: $('table.files'),
                    filesContainer: $('.files'),
                    //uploadTemplateId: null,
                    downloadTemplateId: null});

                }*!/
            }
        }
    });*/
    //$('button#upload_public_submit').click(function() {
    /*$('#upload_public').submit(function(){
    $.ajax({
        url: 'https://api.vide.me/system/items/upload_public_video/',
        type: 'POST',
        //dataType: 'json',
        timeout: 20000,
        data: $('form#upload_public').serialize() + '&nad=' + $.cookie('vide_nad'),
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $.fn.successNotification({
                msg: msg
            });
            $('.videme-download-template-common').empty();
            $('.videme-upload-user-form').addClass('hidden');
        },
        error: function (msg) {
            $.fn.errorNotification({
                msg: msg
            });
        }
    });
});*/
    /* Cancel video upload and publish*/
    /*$(document).on('click', 'a.videme-upload-video-cancel', function (event) {
        event.preventDefault();
        console.log("a.videme-upload-video-cancel -----> click");
        var $this = $(this);
        //var href = $this.attr('href');
        var ticket_id = $this.attr('ticket_id');
        console.log("a.videme-upload-video-cancel -----> ticket_id " + ticket_id);
        document.title = 'Vide.me';
        $.ajax({
            url: 'https://api.vide.me/system/items/upload_cancel/?ticket_id=' + ticket_id + '&nad=' + $.cookie('vide_nad'),
            type: 'post',
            dataType: 'json',
            //data: '',
            success: function(msg) {
                console.log("videme-upload-video-cancel success -----> ", msg);
                $('.videme-upload-user-form').addClass('hidden');
                $.fn.successNotification({
                    msg: msg
                });

            },
            error: function (msg) {
                console.log("videme-upload-video-cancel error -----> ", msg);
                $.fn.errorNotification({
                    msg: msg
                });
            }
        });

    });

    $('button#upload_public_image_submit').click(function() {
        //$('#upload_public').submit(function(){
        $.ajax({
            url: 'https://api.vide.me/system/items/upload_public_image/',
            type: 'POST',
            //dataType: 'json',
            timeout: 20000,
            data: $('form#upload_public').serialize(),
            beforeSend: function () {
                $.fn.processNotification();
            },
            success: function (msg) {
                $.fn.successNotification({
                    msg: msg
                });
                //$('.videme-download-template-common').empty();
                //$('.videme-upload-user-form').addClass('hidden');
            },
            error: function (msg) {
                $.fn.errorNotification({
                    msg: msg
                });
            }
        });
    });*/

    /*************************************************************
     modal-form-partner-invite
     **************************************************************/
    $('#modal-form-partner-invite').validate({ // remove 27072022
        /*rules: {
            "item_id": {
                required: true,
                //email:true,
                maxlength: 12
            },
        "partner_id": {
            required: true,
                //email:true,
                maxlength: 12
        }
        },
        messages: {
            "item_id": {
                required: "<-"
                //email:"Enter true list"
            },
                "partner_id": {
                    required: "<-"
                    //email:"Enter true list"
                }
        },*/
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/partners/invite/',
                timeout: 20000,
                data: $(form).serialize() + "&nad=" + $.cookie('vide_nad'),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $('#modal-partner-invite').modal('hide');
                    //$.fn.showList();
                    $.fn.showPartnersAll({'item_id': $('#partner-invite-item_id').val()});
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    $('#modal-partner-invite').modal('hide');
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });

    /*************************************************************
     modal-form-partner-delete
     **************************************************************/
    $('#modal-form-partner-delete').validate({
        /*rules: {
            "item_id": {
                required: true,
                //email:true,
                maxlength: 12
            },
        "partner_id": {
            required: true,
                //email:true,
                maxlength: 12
        }
        },
        messages: {
            "item_id": {
                required: "<-"
                //email:"Enter true list"
            },
                "partner_id": {
                    required: "<-"
                    //email:"Enter true list"
                }
        },*/
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/v2/partners/delete/',
                timeout: 20000,
                data: $(form).serialize() + "&nad=" + $.cookie('vide_nad'),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $('#modal-partner-delete').modal('hide');
                    //$.fn.showList();
                    //var item_id = getParameterByName('i');
                    //var form_data = $(form).serialize();
                    //var item_id = getParameterByName('i');
                    var target = '';
                    target = $('#videme-modal-partnership-status').attr('videme-callback-function');
                    //[fn][target]();
                    $.fn[target]();
                    // 27072022 $.fn.showPartnersAll({'item_id': $('#partner-delete-item_id').val()});
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    $('#modal-partner-delete').modal('hide');
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
    $("#NewArticleDate").val(getRealDate()); // 02082022 TODO: remove from
    $("#NewArticleTime").val(getRealTime()); // 02082022 TODO: remove from
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
  <div class=\"portlet-header ui-widget-header ui-corner-all\">Youtube URL\
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

        /*************************************************************
         **************************************************************/
        $(document).on('click', '.NewVidemeVideoEmbed', function (event) {
            event.preventDefault();
            console.log(".NewVidemeVideoEmbed -----> click");
            var $this = $(this);
            event.preventDefault();
            var item_id = $('select[name=video-picker-create-article]').val();
            //EmbeditemCount++;
            var element = "\
<div class=\"portlet ui-widget ui-widget-content ui-helper-clearfix ui-corner-all\">\
  <div class=\"portlet-header ui-widget-header ui-corner-all\">Embed You video\
    <span class='ui-icon ui-icon-closethick portlet-close'></span>\
  </div>\
    <div class=\"portlet-content\">\
        <div class=\"fixed-aspect-wrapper\">\
            <div class=\"fixed-aspect-padder\">\
                <iframe src=\"https://www.vide.me/embed/?m=" + item_id +
                "\" frameborder=\"0\" class='whatever-needs-the-fixed-aspect' allowfullscreen></iframe>" +
                "<input type=\"hidden\" id=\"VMVideo\" name=\"article[body][][VMVideo]\" value=\"" + item_id + "\">\
            </div>\
        </div>\
    </div>\
</div>\
";

            $(".column").append(element);
            $('#modal-select-video').modal('hide');

            //element.hide().slideDown(500);
        });

        /*************************************************************
         v2 Событие 4: нажата ссылка из списка контактов Contact
         **************************************************************/
        $(document).on('click', '.NewVidemeImageEmbed', function (event) {
            event.preventDefault();
            console.log(".NewVidemeImageEmbed -----> click");
            var $this = $(this);
            event.preventDefault();
            var item_id = $('select[name=my-image-picker-create-article]').val();
            console.log(".NewVidemeImageEmbed -----> item_id " + item_id);
            //EmbeditemCount++;
            var element = "\
<div class=\"portlet ui-widget ui-widget-content ui-helper-clearfix ui-corner-all\">\
  <div class=\"portlet-header ui-widget-header ui-corner-all\">Embed You image\
    <span class='ui-icon ui-icon-closethick portlet-close'></span>\
  </div>\
    <div class=\"portlet-content\">\
<img src='" + origin_img_vide_me + item_id + ".jpg'>\
<input type='hidden' id='VMImage' name='article[body][][VMImage]' value='" + item_id + "'>\
    </div>\
</div>\
";

            $(".column").append(element);
            $('#modal-select-my-image').modal('hide');

            //element.hide().slideDown(500);
        });

        $("body").on('click', '.column .SetEmbedURL', function () {

            $(this).siblings(".NewEmbedPlace").append("\
			        <div class=\"fixed-aspect-wrapper\">\
			        <div class=\"fixed-aspect-padder\">\
			<iframe src=\"https://www.youtube.com/embed/"
                + YouTubeGetID($(this).parent().find('#EmbedURL').val()) +
                "\" frameborder=\"0\" class='whatever-needs-the-fixed-aspect' allowfullscreen></iframe></div></div>");

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
            if ($("#TagValue").val()) {
                var web_id = makeid();
                var element = $("\
<input type='hidden' name='tags[" + $("#TagValue").val() + "]' value='" + $("#TagValue").val() + "' class='" + web_id + "'>\
<span class=\"badge badge-primary videme-edit-tag " + web_id + "\"> " + $("#TagValue").val() + "</span><a class=\"tag_remove\" href=\"#\" tag_remove_title=\"" + web_id + "\"><i class=\"fa fa-remove\"></i></a>\
");
                $("#TagValue").val('');
                //$(".tag").append('&nbsp;', element);
                $("#videme-item-edit-tags").append('&nbsp;', element);
                element.hide().slideDown(500);
            }
        });

        $("#EditItemTag").click(function (event) {
            event.preventDefault();
            if ($("#EditTagValue").val()) {
                var web_id = makeid();
                var element = $("\
<input type='hidden' name='tags[" + $("#EditTagValue").val() + "]' value='" + $("#EditTagValue").val() + "' class='" + web_id + "'>\
<span class=\"badge badge-primary videme-edit-tag " + web_id + "\"> " + $("#EditTagValue").val() + "</span><a class=\"tag_remove\" href=\"#\" tag_remove_title=\"" + web_id + "\"><i class=\"fa fa-remove\"></i></a>\
");
                $("#EditTagValue").val('');
                //$(".tag").append('&nbsp;', element);
                $("#videme-item-edit-tags_edit").append('&nbsp;', element);
                element.hide().slideDown(500);
            }
        });


        $("#NewArticleTag").click(function (event) {
            event.preventDefault();
            if ($("#ArticleTagValue").val()) {
                console.info('NewArticleTag.click ' + $("#ArticleTagValue").val());
                var web_id = makeid();
                var element = $("\
<input type='hidden' name='article[tags][" + $("#ArticleTagValue").val() + "]' value='" + $("#ArticleTagValue").val() + "' class='" + web_id + "'>\
<span class=\"badge badge-primary videme-edit-tag " + web_id + "\"> " + $("#ArticleTagValue").val() + "</span><a class=\"tag_remove\" href=\"#\" tag_remove_title=\"" + web_id + "\"><i class=\"fa fa-remove\"></i></a>\
");
                $(".tag").append('&nbsp;', element);
                $("#ArticleTagValue").val('');
                element.hide().slideDown(500);
            } else {
                console.info('NewArticleTag.click NO value');
            }
        });

        $("#NewItemExtLink").click(function (event) {
            event.preventDefault();
            //var ext_link_id = 1
            if ($("#ext_link_title").val() && $("#ext_link_link").val()) {
                console.log('NewItemExtLink ext_link_title ' + $("#ext_link_title").val() + ' ext_link_link ' + $("#ext_link_link").val());
                //var ext_link_id = Math.floor(Math.random() * 100);
                var web_id = makeid();
                var element = $("\
<input type=\"hidden\" name=\"ext_links[" + $("#ext_link_title").val() + "][title]\" value=\"" + $("#ext_link_title").val() + "\" class='" + web_id + "'>\
<input type=\"hidden\" name=\"ext_links[" + $("#ext_link_title").val() + "][link]\" value=\"" + $("#ext_link_link").val() + "\" class='" + web_id + "'>\
<a class=\"badge badge-primary videme-edit-ext_link " + $("#ext_link_title").val() + "\" href='" + $("#ext_link_link").val() + "' target='_blank'> " + $("#ext_link_title").val() + "<a class=\"ext_link_remove\" href=\"#\" ext_link_title=\"" + web_id + "\"><i class=\"fa fa-remove\"></i></a></a>\
");
                $("#add_ext_links").append('&nbsp;', element);
                element.hide().slideDown(500);
                //ext_link_id++;
            } else {
                console.log('NewItemExtLink empty ext_link_title or ext_link_link');
            }
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
    $('#article-update').validate({ // V3
        submitHandler: function (form) {
            /*$("textarea").each(function(){ // TODO: why?
                //this.value = this.value.replace("AFFURL",prodUrl );
                //this.value = this.value.toString().replace('"', '\\"')
                this.value = '';
            });*/
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
                    window.location.href = "https://www.vide.me/web/my_article/";
                },
                error: function (msg) {
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        }
    });

    /*$("#article-update-submit").on('click', function () {
    //    $("#article-update").submit(function(event){
    //        event.preventDefault()
        //$(function(){
            //var prodUrl = "test.com";
            $("textarea").each(function(){
                //this.value = this.value.replace("AFFURL",prodUrl );
                //this.value = this.value.toString().replace('"', '\\"')
                this.value = this.value.toString().replace('"', ' ')
                //this.value = '';
            });
            $.ajax({
                type: "POST",
                url: 'https://api.vide.me/article/new/',
                timeout: 20000,
                //data: $(form).serialize(),
                data:$("#article-update").serialize(),
                //data:$(this).serialize(),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    //window.location.href = 'https://www.vide.me/web/my_article/';
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
        //});
    });*/
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
                    window.location.href = 'https://www.vide.me/web/my_article/';
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
                    $('.videme-send-feedback-spinner').removeClass('hidden');
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $('.videme-send-feedback-spinner').addClass('hidden');
                    $('#modal-feedback').modal('hide');
                    $.fn.successNotification({
                        msg: msg
                    });
                },
                error: function (msg) {
                    $('.videme-send-feedback-spinner').addClass('hidden');
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
        console.log("a.showContactsItem -----> click");
        var $this = $(this);
        //var href = $this.attr('href');
        var email = $this.attr('email');
        $('#email-to').html(email);
        $('#modal-contacts').modal('hide');
        console.log("a.showContactsItem -----> email" + email);


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

    /*************************************************************
     Upload user_picture
     **************************************************************/
    $("#upload_user_picture").click(function () {
        $('#upload_type').val('upload_user_picture');
        $('#nad').val($.cookie('vide_nad'));
        $('#access').val('public');
        setUploadModal();
        formCropImageInit();
    });
    /*************************************************************
     Upload user_cover
     **************************************************************/
    $("#upload_user_cover").click(function () {
        $('#upload_type').val('upload_user_cover');
        $('#nad').val($.cookie('vide_nad'));
        $('#access').val('public');
        setUploadModal();
        formCropImageInit();
    });
    /*************************************************************
     Upload user_cover_top
     **************************************************************/
    $("#upload_user_cover_top").click(function () {
        $('#upload_type').val('upload_user_cover_top');
        $('#nad').val($.cookie('vide_nad'));
        $('#access').val('public');
        setUploadModal();
        formCropImageInit();
    });
    /*************************************************************
     Upload image
     **************************************************************/
    $("#upload_image").click(function () { // TODO:remove
        if ($.cookie('vide_nad')) {
            $('#modal-cropper').modal('show');
            $('#upload_type').val('upload_image');
            $('#nad').val($.cookie('vide_nad'));
            $('#access').val('public');
            setUploadModal();
        } else {
            //$('#modal-signin').modal('show');
            //$('#feedback').val(window.location.href);
            gotoLogin();
        }
    });
    /*************************************************************
     Upload Video or image
     **************************************************************/
    $("#videme_upload_video_image").click(function (event) {
        event.preventDefault();
        if ($.cookie('vide_nad')) {
            require(['videme_upload'], function(videme_upload) {
                videme_upload.uploadItint();
            });
            $('#modal-videme_upload_video_image').modal('show');
            //$('#upload_type').val('upload_image');
            $('#nad').val($.cookie('vide_nad'));
            //$('#access').val('public');
            //setUploadModal();
        } else {
            //$('#modal-signin').modal('show');
            //$('#feedback').val(window.location.href);
            gotoLogin();
        }
    });
    function setUploadModal() {

        upload_type = $('#upload_type').val();
        console.log("upload_type -----> " + upload_type);

        switch (upload_type) {
            case 'upload_user_picture':
                opt = {
                    aspectRatio: 1,
                    zoomable: false
                };
                //hiddeTitleContent();
                break;
            case 'upload_user_cover':
                opt = {
                    //aspectRatio: 16 / 9,
                    aspectRatio: 16 / 16,
                    zoomable: false
                };
                //hiddeTitleContent();
                break;
            case 'upload_user_cover_top':
                opt = {
                    aspectRatio: 5 / 2,
                    zoomable: false
                };
                //hiddeTitleContent();
                break;
            case 'upload_image':
                opt = {
                    zoomable: false,
                    autoCropArea: 1
                };
                //hiddeTitleContent();
                break;
            //default:
            //dropdownDS = " ";
        }
    }
    $("#videme-form-essences-search").submit(function( event ) { // 26072022
        event.preventDefault();
// your code here
        $.fn.showSearchEssences({'q': $("#videme-form-essences-search-input").val()});
    });

    //$("#videme-form-partners-search").submit(function( event ) {
    $("#videme-form-partners-search-btn").click(function( event ) { // 26072022
        //event.preventDefault();
        var $this = $(this);
        var item_id = $this.attr('item_id');
        $.fn.showSearchUsersForPartners({'q': $("#videme-form-partners-search-input").val(),
            'item_id': item_id});
    });

    //$(".videme_profile_state").change(function() {
    $('.videme_profile_state').on('change', function(){ // on change of state
        console.log('videme_profile_state attr ' + $(this).val());

        if(this.checked) {
            console.log('videme_profile_state');
            if($("#videme_profile_state").attr("checked") != 'checked') {
                //console.log('videme_profile_state false');
                if ($.cookie('vide_nad')) {
                    $.getJSON("https://api.vide.me/v2/user/profile_state/?profile_state=true&nad=" + $.cookie('vide_nad') + "&videmecallback=?",
                        function (data) {
                            $.fn.successNotification({
                                msg: 'Success'
                            });
                        })
                        .done(function (data) {
                        })
                        .fail(function (data) {
                        })
                        .always(function () {
                        });
                }
            }
        } else {
            console.log('videme_profile_state true');
            if ($.cookie('vide_nad')) {
                $.getJSON("https://api.vide.me/v2/user/profile_state/?profile_state=false&nad=" + $.cookie('vide_nad') + "&videmecallback=?",
                    function (data) {
                        $.fn.successNotification({
                            msg: 'Success'
                        });
                    })
                    .done(function (data) {
                    })
                    .fail(function (data) {
                    })
                    .always(function () {
                    });
            }
        }
    });

    $('#videme-dark-mode-toggle-btn').on('change', function(){ // on change to dark theme
        //console.log('videme-dark-mode-toggle-btn attr ' + $(this).val());
        //console.log('videme-dark-mode-toggle-btn attr this ' + this);
        let value = '';
        if(this.checked) {
            //console.log('videme-dark-mode-toggle-btn attr ' + $(this).val());
            value = 'dark';
        } else {
            value = 'light';
        }
        if ($.cookie('vide_nad')) {
            $.getJSON("https://api.vide.me/v2/user/settings/set/?key=web_theme&value=" + value + "&nad=" + $.cookie('vide_nad') + "&videmecallback=?",
                function (data) {
                    $.fn.successNotification({
                        msg: 'Success'
                    });
                })
                .done(function (data) {
                })
                .fail(function (data) {
                })
                .always(function () {
                });
        } else {
            //$('#modal-signin').modal('show');
            //$('#feedback').val(window.location.href);
            gotoLogin();
        }
    });



    /* Dark theme ****************************************************************/
    /*!
 * Dark Mode Switch v1.0.1 (https://github.com/coliff/dark-mode-switch)
 * Copyright 2021 C.Oliff
 * Licensed under MIT (https://github.com/coliff/dark-mode-switch/blob/main/LICENSE)
 */
/*
    var darkSwitch = document.getElementById("darkSwitch");
    window.addEventListener("load", function () {
        if (darkSwitch) {
            initTheme();
            darkSwitch.addEventListener("change", function () {
                resetTheme();
            });
        }
    });

    /!**
     * Summary: function that adds or removes the attribute 'data-theme' depending if
     * the switch is 'on' or 'off'.
     *
     * Description: initTheme is a function that uses localStorage from JavaScript DOM,
     * to store the value of the HTML switch. If the switch was already switched to
     * 'on' it will set an HTML attribute to the body named: 'data-theme' to a 'dark'
     * value. If it is the first time opening the page, or if the switch was off the
     * 'data-theme' attribute will not be set.
     * @return {void}
     *!/
    function initTheme() {
        var darkThemeSelected =
            localStorage.getItem("darkSwitch") !== null &&
            localStorage.getItem("darkSwitch") === "dark";
        darkSwitch.checked = darkThemeSelected;
        darkThemeSelected
            ? document.body.setAttribute("data-theme", "dark")
            : document.body.removeAttribute("data-theme");
    }

    /!**
     * Summary: resetTheme checks if the switch is 'on' or 'off' and if it is toggled
     * on it will set the HTML attribute 'data-theme' to dark so the dark-theme CSS is
     * applied.
     * @return {void}
     *!/
    function resetTheme() {
        if (darkSwitch.checked) {
            document.body.setAttribute("data-theme", "dark");
            localStorage.setItem("darkSwitch", "dark");
        } else {
            document.body.removeAttribute("data-theme");
            localStorage.removeItem("darkSwitch");
        }
    }*/
    /* ****************************************************************/

    /*test autoplay start ****************************************************************/


    $('#videme-dark-mode-toggle-btn').on('change', function() {

    });


    /*test autoplay stop  ****************************************************************/


// Конец автозагрузки
});
