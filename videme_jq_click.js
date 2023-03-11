console.log("videme_jq_click.js");

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
    console.log("a.contact-showContactsItem -----> click");
    var $this = $(this);
    //var href = $this.attr('href');
    var email = $this.attr('email');
    $('#email').val(email);
    $('#modal-contacts').modal('hide');
    console.log("a.showContactsItem-url -----> email" + email);
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
$(document).on('click', 'a.file-inbox-url', function (event) { // remove 26072022
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
$(document).on('click', 'a.file-sent-url', function (event) { // remove 26072022
    console.log("a.file-sent-url -----> click");
    event.preventDefault();
    $('html, body').animate({scrollTop: '0px'}, 300);
    $.fn.showcaseVideoTextButton(paddingButtonSent($(this).getAttributes()));
});

/*************************************************************
 v2 Событие 2: нажата ссылка на файл из плитки My,
 отрисовка текста и кнопок в панель
 **************************************************************/
$(document).on('click', 'a.file-my-url', function (event) { // remove 26072022
    console.log("a.file-my-url -----> click");
    event.preventDefault();
    $('html, body').animate({scrollTop: '0px'}, 300);
    $.fn.showcaseVideoTextButton(paddingButtonMy($(this).getAttributes()));
});

/*************************************************************
 v2 my-posts-url
 **************************************************************/
$(document).on('click', 'a.my-posts-url', function (event) { // remove 26072022
    console.log("a.my-posts-url -----> click");
    event.preventDefault();
    $('html, body').animate({scrollTop: '0px'}, 300);
    $('.itemscope').removeClass('hidden');
    $.fn.showcaseVideoTextButton(paddingButtonMy($(this).getAttributes()));
});
/*************************************************************
 v3 videme-v3-my-posts-url
 **************************************************************/
$(document).on('click', 'a.videme-v3-my-posts-url_old', function (event) { // at 26042020
    console.log("a.videme-v3-my-posts-url -----> click");
    console.log("a.videme-v3-my-posts-url getAttributes -----> " + JSON.stringify($(this).getAttributes()));
    event.preventDefault();
    if (showcasePlayer) {
        console.log("$.fn.showcaseVideoV3Static showcasePlayer -----> already exist");
        showcasePlayer.dispose();
    } else {
        console.log("$.fn.showcaseVideoV3Static showcasePlayer -----> no exist");
        var showcasePlayer;
    };
    $('html, body').animate({scrollTop: '0px'}, 300);
    $('.itemscope').removeClass('hidden'); // why?
    //$('.videme-showcase-video').empty();
    // /$.fn.showcaseVideoTextButton(paddingButtonMy($(this).getAttributes()));
    //$.fn.oneTimeV3($(this).getAttributes());
    var attr = $(this).getAttributes();
    attr.action_url_class = 'videme-v3-my-posts-url';
    $.fn.oneTimeV3(attr);
});

$(document).on('click', 'a.videme-v3-my-posts-url-test', function (event) {
    console.log("a.videme-v3-my-posts-url -----> click");
    console.log("a.videme-v3-my-posts-url getAttributes -----> " + JSON.stringify($(this).getAttributes()));
    event.preventDefault();
    $('.itemscope').removeClass('hidden');

    var player = videojs('my-player');
    player.pause();
    var attr = $(this).getAttributes();
    var new_url = origin_img_vide_me + $(this).attr("item_id") + '.m3u8';
    //var new_url = 'https://s3.amazonaws.com/video.vide.me/' + attr.item_id + '.m3u8';
    //player.src(new_url);
    player.reset();
    player.src({ // work!
        src: new_url,
        type: "application/x-mpegURL",
    });
    // set src track corresponding to new movie //
    player.load();
    player.play();
});

/*************************************************************
 v3 event-url
 **************************************************************/
$(document).on('click', 'a.event-url', function (event) {
    console.log("a.event-url -----> click");
    console.log("a.event-url getAttributes -----> " + JSON.stringify($(this).getAttributes()));
    event.preventDefault();
    var param = $(this).getAttributes();
    //console.log("a.event-url param.item_id -----> " + param.item_id);
    //location.href('https://www.vide.me/web/my_event/?item=' + param.item_id);
    window.location = 'https://www.vide.me/web/my_event/?item=' + param.item_id;
});

/*************************************************************
 v3 videme-v3-my-article-url
 **************************************************************/
$(document).on('click', 'a.videme-v3-my-article-url', function (event) {
    console.log("a.videme-v3-my-article-url -----> click");
    console.log("a.videme-v3-my-article-url getAttributes -----> " + JSON.stringify($(this).getAttributes()));
    event.preventDefault();
    var param = $(this).getAttributes();
    //console.log("a.videme-v3-my-article-url param.item_id -----> " + param.item_id);
    //location.href('https://www.vide.me/web/my_event/?item=' + param.item_id);
    window.location = 'https://www.vide.me/web/my_article/?item=' + param.item_id;
});

/*************************************************************
 v3 videme-v3-my-image-url
 **************************************************************/
$(document).on('click', 'a.videme-v3-my-image-url', function (event) {
    console.log("a.videme-v3-my-image-url -----> click");
    console.log("a.videme-v3-my-image-url getAttributes -----> " + JSON.stringify($(this).getAttributes()));
    event.preventDefault();
    var param = $(this).getAttributes();
    //console.log("a.videme-v3-my-image-url param.item_id -----> " + param.item_id);
    //location.href('https://www.vide.me/web/my_event/?item=' + param.item_id);
    window.location = 'https://www.vide.me/web/my_image/?item=' + param.item_id;
});

/*************************************************************
 v3 videme-v3-my-post-url
 **************************************************************/
$(document).on('click', 'a.videme-v3-my-post-url', function (event) {
    console.log("a.videme-v3-my-post-url -----> click");
    console.log("a.videme-v3-my-post-url getAttributes -----> " + JSON.stringify($(this).getAttributes()));
    event.preventDefault();
    var param = $(this).getAttributes();
    //console.log("a.videme-v3-my-image-url param.item_id -----> " + param.item_id);
    //location.href('https://www.vide.me/web/my_event/?item=' + param.item_id);
    window.location = 'https://www.vide.me/web/posts/my/?item=' + param.item_id + '&post=' + param.post_id;
});

/*************************************************************
 v3 videme-v3-my-item-url
 **************************************************************/
$(document).on('click', 'a.videme-v3-my-item-url', function (event) {
    console.log("a.videme-v3-my-item-url -----> click");
    console.log("a.videme-v3-my-item-url getAttributes -----> " + JSON.stringify($(this).getAttributes()));
    event.preventDefault();
    var param = $(this).getAttributes();
    //console.log("a.videme-v3-my-image-url param.item_id -----> " + param.item_id);
    //location.href('https://www.vide.me/web/my_event/?item=' + param.item_id);
    window.location = 'https://www.vide.me/web/my_video/?item=' + param.item_id;
});

/*************************************************************
 v2 Событие 2: нажата ссылка на файл из плитки MySpring,
 отрисовка текста и кнопок в панель
 **************************************************************/
$(document).on('click', 'a.file-myspring-url', function (event) { // remove 26072022
    console.log("a.file-myspring-url -----> click");
    event.preventDefault();
    $('html, body').animate({scrollTop: '0px'}, 300);
    $.fn.showcaseVideoTextButton(paddingButtonMySpring($(this).getAttributes()));
});

/*************************************************************
 v2 Событие 2: нажата ссылка на файл из плитки Spring,
 отрисовка текста и кнопок в панель
 **************************************************************/
$(document).on('click', 'a.file-spring-url', function (event) { // remove 26072022
    console.log("a.file-spring-url -----> click");
    event.preventDefault();
    $('html, body').animate({scrollTop: '0px'}, 300);
    $('.itemscope').removeClass('hidden');
    $.fn.showcaseVideoTextButton(paddingButtonSpring($(this).getAttributes()));
});
/*************************************************************
 image-url for modal
 **************************************************************/
$(document).on('click', '.image-url', function (event) {
    console.log(".image-url -----> click");
    //event.stopPropagation();
    event.preventDefault();

    var $this = $(this);
    $('#modal-show-image').modal('show');

    //if ($.cookie('vide_nad')) {
    if ($this.attr('item_id')) {
        goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + $this.attr('item_id') + '&title=' + $this.attr('title') + '&user_display_name=' + $this.attr('user_display_name') + '&spring=' + $this.attr('spring') + '&user_picture=' + $this.attr('user_picture') + '&type_item=image' + '&nad=' + $.cookie('vide_nad'));

        //$(".videme-list-list").html(VidemeProgress);
        $(".videme-modal-item-image-place").html(VidemeProgress);
        var trueCover = '';
        if ($this.attr('cover')) {
            trueCover = $this.attr('cover');
            console.log(".image-url cover yes trueCover -----> " + trueCover);
        } else { // TODO: why? every isset cover
            trueCover = $this.attr('item_id') + ".jpg";
            console.log(".image-url cover no trueCover -----> " + trueCover);
        }
        $(".videme-modal-item-image-place").html("<img src='" + origin_img_vide_me + trueCover + "' class='videme-modal-item-image'>");
        if ($this.attr('user_display_name')) $(".videme_img_modal_title").html($this.attr('user_display_name'));
        //if ($this.attr('item_user_display_name')) $(".videme_img_modal_title").html($this.attr('item_user_display_name'));
        if ($this.attr('title')) $(".videme-modal-item-title-place").html("<b>" + $this.attr('title') + "</b><br>");
        if ($this.attr('content')) $(".videme-modal-item-content-place").html($this.attr('content') + "<br>");
        if ($this.attr('created_at')) $(".videme-modal-item-created_at-place").html(timeToWord($this.attr('created_at')) + "<br>");

        if ($this.attr('ext_links')) { // TODO: dobble
            //console.log("item-edit-toggle ----->" + JSON.stringify($this.attr('ext_links')));
            //var links = '';
            var element = '';
            array_ext_links2 = $.parseJSON($this.attr('ext_links'));
            $.each(array_ext_links2, function (key, value) {
                //console.log("$.fn.showcaseText tags -----> " + value);
                //links += '&nbsp;<a href="' + value.link + '" target="_blank" class="badge badge-primary">' + value.title + '</span> ';
                element += "\
<a class=\"badge badge-primary videme-edit-ext_link\" href='" + value.link + "' target='_blank'> " +
                    value.title +
                    "</a>";

            });
            //$(".add_ext_links").append('<div class="videme_item_info_element"><i class="fa fa-external-link videme_item_info_icon" item_id="' + $this.attr('item_id') + '"><div class="videme_item_info_val">' + links + '</div></i></div>');


            $(".ext_links_modal_image_title").removeClass('hidden');
            $(".ext_links_modal_image").html('&nbsp;' + element);
            //element.hide().slideDown(500);
        } else {
            $(".ext_links_modal_image_title").addClass('hidden');
            $(".ext_links_modal_image").empty();
        }

        $("#videme-soc-share-all-modal-image").jsSocials({
            shares: ["twitter", "facebook", "googleplus", "linkedin", "email", "pinterest", "stumbleupon", "whatsapp"],
            url: "https://www.vide.me/a/?a=" + $this.attr('item_id'),
            showLabel: true,
            showCount: true,
            shareIn: 'popup'
        });

        //$(".videme-file-info").html("<b>" + $this.attr('title') + "</b><br>" + $this.attr('content') + "<br>" + $this.attr('created_at') + "<br>");
        $('#file').val($this.attr('file'));
        /*$.getJSON("https://api.vide.me/v2/albums/?videmecallback=?",
            function (data) {
                if (data) {
                    console.log(".list-toggle data -----> yes" + JSON.stringify(data));
                    var results = [];
                    $.each(data, function (key, value) {
                        results.push("<a class='list-url' href='https://api.vide.me/v2/items/share/?item_id=" + $this.attr('item_id') + "&album_id=" + value.album_id + "&nad=" + $.cookie('vide_nad') + "' target='_blank'><span class='label label-primary'>" + value.title + "</span></a> ");
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
            });*/
    } else {
        console.log(".image-url -----> no item_id");
        $('.videme-list-list').html(showError("No file"));
    }
    /*} else {
        $('#modal-list').modal('hide');
        $('#modal-signin').modal('show');
        $('#feedback').val(window.location.href);
    }*/
});

/*************************************************************
 article-url for modal
 **************************************************************/
$(document).on('click', '.article-url', function (event) {
    console.log(".article-url -----> click");
    //event.stopPropagation();
    event.preventDefault();

    var $this = $(this);
    $('#modal-show-article').modal('show');

    //if ($.cookie('vide_nad')) {
    if ($this.attr('item_id')) {

        /*var cover = '';
        var category = '';
        var title = '';*/
        //goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + $this.attr('item_id'));

        //$(".videme-list-list").html(VidemeProgress);
        //$(".videme-modal-article-content-place").html(VidemeProgress);
        $(".videme-modal-article-content-place").html("<img src='data:image/gif;base64,R0lGODlhQAAwAPQAAAAAAHx8fHl9j5WVlaCjraqqqrGxsby8vL+/v8jIyMvLy9ra2t3d3eLi4urq6vPz8/b29vf39/j4+Pn5+fr6+vz8/P7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+EUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAAQAAwAAAF/6AgjmRpnmiqosTqvvDbxnQNz3auk/ju172f0BUcGk/Fo1KUXB6bziE0+ptSd9ZrLqsFdpXc701sDJNX5nMqrUa2fYSLfE6v2+/4vD6vAPj/gIGCg4SFhoIBFwwDjI2Oj5CRkpOUkAYXFA+am5ydnp+goaKeEBd9h6ipqoaJDQWvsLGys7S1trezCHu7vL2+FQvBwsPExcbHyMnFDhcTB8/Q0dLT1NXW19MLvtvc3BQK4OHi4+Tl5ufo5A2Y6e3u7+nr3fP09fb3dRAB+/z9/v8AAwoc+E8XvoMIEyLUR7Chw4cDDSqcSLFingiVMmrcWCnBBQujQoocOUqCxZMMIQ2qXElQ4smXMGPK9BUCADs=' />");
        /*if ($this.attr('cover')) cover = $this.attr('cover');
        if ($this.attr('category')) category = $this.attr('category');
        if ($this.attr('title')) title = $this.attr('title');*/
        //$(".videme-modal-item-image-place").html("<img src='https://s3.amazonaws.com/img.vide.me/" + $this.attr('item_id') + ".jpg' class='videme-modal-item-image'>");
        //console.log(".article-url -----> ", '"https://s3.amazonaws.com/img.vide.me/' + cover + '"');
        /*if ($this.attr('title')) $(".videme-modal-item-title-place").append("<b>" + $this.attr('title') + "</b><br>");
        if ($this.attr('content')) $(".videme-modal-item-content-place").append($this.attr('content') + "<br>");
        if ($this.attr('created_at')) $(".videme-modal-item-created_at-place").append($this.attr('created_at') + "<br>");*/

        $.getJSON("https://api.vide.me/v2/items/info/?item_id=" + $this.attr('item_id') + "&videmecallback=?",
            function (data) {
                $(".videme-modal-article-content-place").empty();

                console.log("article-url data -----> " + JSON.stringify(data));

                //var data = parseDataArrayToObject(data);
                //data = JSON.stringify(data);
                //if ($.isEmptyObject(data)) {
                if (!$.isEmptyObject(data)) {
                    //console.log("article-url data -----> " + JSON.stringify(data));
                    goToUrl('https://api.vide.me/system/items/item_count_add/?item=' + data.item_id + '&title=' + data.title + '&user_display_name=' + data.user_display_name + '&spring=' + data.spring + '&user_picture=' + $this.attr('user_picture') + '&type_item=article' + '&nad=' + $.cookie('vide_nad'));

                    if (!$.isEmptyObject(data.user_display_name)) $(".videme_img_modal_title").html(data.user_display_name);
                    $(".videme-modal-article-content-place").append(
                        '<div class="videme-cover-image" style="background-image: url(\'' + origin_img_vide_me + data.cover + '\')">' +
                        /*'<div class="category">' + data.category + '</div>' +*/
                        '</div>' +
                        '<h3>' + data.title + '</h3>' +
                        '<div class="videme-article-center">');

                    //var body = $.parseJSON(data.body);
                    var bodyJ = JSON.stringify(data.body);
                    //tags = $.parseJSON(tagsR);
                    var body = $.parseJSON(bodyJ);
                    console.log("article-url body -----> " + JSON.stringify(body));


                    $.each(body, function (key, value) {
                        $.each(value, function (key2, value2) {
                            /*if (value.text) {
                                $(".videme-modal-article-content-place").append('<p>' + value.text + '</p>');
                            }*/
                            console.log("article-url value2 -----> " + JSON.stringify(value2));

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
            })
            .done(function (data) {
            })
            .fail(function (data) {
                return false;
            });


    } else {
        console.log(".article-url -----> no item_id");
        $('.videme-modal-article-content-place').html(showError("No file"));
    }
    /*} else {
        $('#modal-list').modal('hide');
        $('#modal-signin').modal('show');
        $('#feedback').val(window.location.href);
    }*/
});

$(document).on('click', 'a.event_go_url', function (event) {
    console.log('a.event_go_url');
    event.preventDefault();
    var $this = $(this);
    var href = $this.attr('href');
    window.location.href = href;
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
$(document).on('click', '.contact-toggle', function (event) { // ?? 01082022 function parseMyRelationsForDoorbellSignShare(parseMyRelationsForDoorbellSignShare
    console.log(".contact-toggle -----> click");
    event.stopPropagation();
    var $this = $(this);
    //var feedback = $this.attr('feedback');
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            var item_id = $this.attr('item_id');
            console.log(".contact-toggle -----> item_id: ", item_id);

            //=== Preview item ??? $(".videme_item_card_contact").showItemCard({'item_id': $this.attr('item_id')});
            //$(".videme_item_card").itemCard($this);
            $(".videme-contact-list").html(VidemeProgress);
            //$.getJSON("https://api.vide.me/v2/relation/?videmecallback=?",
            $.getJSON("https://api.vide.me/v2/friendship/my/?videmecallback=?",
                function (data) {
                    // TODO: Попробовать без куки nad
                    if (!$.isEmptyObject(data)) {
                        console.log(".contact-toggle data -----> yes" + JSON.stringify(data));
                        /*results = [];
                        $.each(data, function (key, value) {
                            if ($.isEmptyObject(value.user_display_name)) {
                                var user_display_name = value.user_email;
                            } else {
                                var user_display_name = value.user_display_name;
                            }
                            results.push("<a class='badge badge-primary contact-url' href='https://api.vide.me/v2/email/share/?user_id=" + value.user_id + "&item_id=" + $this.attr('item_id') + "&subject=Re: " + $this.attr('title') + "&message=" + $this.attr('content') + "&nad=" + $.cookie('vide_nad') + "' target='_blank'>" + user_display_name + "</a> ");
                        });
                        $('.videme-contact-list').html(results.join(""));*/
                        $('.videme-contact-list').html(
                            /*showTileDoorbellSignSmall(
                                parseSignsForDoorbellSignShare(data, item_id), $('.videme-list-list')
                            )*/
                            showTileDoorbellSignSmall(
                                parseMyRelationsForDoorbellSignShare(data, item_id), $('.videme-contact-list')
                            )
                        );
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
        //$('#modal-contact').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();

    }
});

/*************************************************************
 v2 Событие 3: нажата кнопка вызова и отрисовки листов в модальном окне
 **************************************************************/
$(document).on('click', '.list-toggle', function (event) { // 01082022
    console.log(".list-toggle -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            /*$(".videme-list-list").html(VidemeProgress);
            $(".videme-mini-img").html(VidemeProgress);
            $(".videme-mini-img").html("<img src='https://s3.amazonaws.com/img.vide.me/" + $this.attr('item_id') + ".jpg' class='videme-img-tile-my' width='190' height='108'>");
            if ($this.attr('title')) $(".videme-file-info").append("<b>" + $this.attr('title') + "</b><br>");
            if ($this.attr('content')) $(".videme-file-info").append($this.attr('content') + "<br>");
            if ($this.attr('created_at')) $(".videme-file-info").append($this.attr('created_at') + "<br>");*/

            var item_id = $this.attr('item_id');
            //=== Preview item ??? $(".videme_item_card_album").showItemCard({'item_id': $this.attr('item_id')});
            /*$("#videme-soc-share-all-modal").jsSocials({
                shares: ["twitter", "facebook", "googleplus", "linkedin", "email",  "pinterest", "stumbleupon", "whatsapp"],
                url: "https://www.vide.me/a/?a=" + $this.attr('item_id')
            });*/

            //$(".videme-file-info").html("<b>" + $this.attr('title') + "</b><br>" + $this.attr('content') + "<br>" + $this.attr('created_at') + "<br>");
            $('#file').val($this.attr('file'));
            /*$.getJSON("https://api.vide.me/v2/albums/?videmecallback=?",
                function (data) {
                    if (data) {
                        console.log(".list-toggle data -----> yes" + JSON.stringify(data));
                        var results = [];
                        $.each(data, function (key, value) {
                            results.push("<a class='list-url' href='https://api.vide.me/v2/items/share/?item_id=" + $this.attr('item_id') + "&album_id=" + value.album_id + "&nad=" + $.cookie('vide_nad') + "' target='_blank'><span class='label label-primary'>" + value.title + "</span></a> ");
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
                });*/
            $.getJSON("https://api.vide.me/v2/albums/?videmecallback=?",
                function (data) {
                    if (!$.isEmptyObject(data)) {
                        //console.log("$.fn.showList data -----> yes " + JSON.stringify(data));
                        $('.videme-list-list').html(
                            /*showTileDoorbellSignSmall(
                                parseSignsForDoorbellSignShare(data, item_id), $('.videme-list-list')
                            )*/
                            showTileRelationModernAlbums(
                                parseSignsForDoorbellSignShare(data, item_id), $('.videme-list-list')
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
            /*$('.videme-list-list').showList({
                //limit: 6
            });*/
        } else {
            $('.videme-list-list').html(showError("No file"));
        }
    } else {
        //$('#modal-list').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

/*************************************************************
 v2 Событие 3: нажата кнопка вызова и отрисовки листов в модальном окне
 **************************************************************/
$(document).on('click', '.share-to-fb-toggle', function (event) {
    console.log(".share-to-fb-toggle -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($this.attr('item_id')) {
        var item_id = $this.attr('item_id');
        $(".videme_item_card_share_to_fb").showItemCard({'item_id': $this.attr('item_id')});
        $("#videme-soc-share-all-modal").jsSocials({
            shares: ["twitter", "facebook", "googleplus", "linkedin", "email", "pinterest", "stumbleupon", "whatsapp"],
            url: "https://www.vide.me/a/?a=" + $this.attr('item_id'),
            showLabel: true,
            showCount: true,
            shareIn: 'popup'
        });
    }
});

/*************************************************************
 v2 ext_link_remove
 **************************************************************/
$(document).on('click', '.ext_link_remove', function (event) {
    console.log(".ext_link_remove -----> click");
    //event.stopPropagation();
    event.preventDefault();
    var $this = $(this);
    //var order_key = $this.attr('order_key');
    //$('.service2').addClass('hidden');
    $("." + $this.attr('ext_link_title')).remove();
    $this.remove();
});

/*************************************************************
 v2 tag_remove
 **************************************************************/
$(document).on('click', '.tag_remove', function (event) {
    console.log(".tag_remove -----> click");
    //event.stopPropagation();
    event.preventDefault();
    var $this = $(this);
    //var order_key = $this.attr('order_key');
    //$('.service2').addClass('hidden');
    $("." + $this.attr('tag_remove_title')).remove();
    $this.remove();
});

/*************************************************************
 Item edit, remove partner from dinamic list
 **************************************************************/
//--$(".partner_add").click(function (event) {
/*$(document).on('click', '.partner_add', function (event) {
    console.log(".partner_add -----> click");
    event.preventDefault();
    var $this = $(this);
    var web_parent_id = $this.attr('web_parent_id');
    //var user_id = $this.attr('user_id');
    //console.info('partner_add.click user_id ' + user_id);
    //var web_id = makeid();
    /!*var element = $("\
<input type='hidden' name='partners[" + user_id + "]' value='" + user_id + "' class='" + web_id + "'>\
<span class=\"badge badge-primary videme-edit-tag " + web_id + "\"> " + user_id + "</span><a class=\"tag_remove\" href=\"#\" tag_remove_title=\"" + web_id + "\"><i class=\"fa fa-remove\"></i></a>\
");*!/
    var tempObject = $(".videme-form-partners-list");
    //var element = $("<input type='hidden2' name='partners[" + user_id + "][user_id]' value='" + user_id + "' class='" + web_id + "'/>");
    //$(".videme-form-partners-list").append('&nbsp;', element);
    //element.hide().slideDown(500);
    /!*$('.videme-form-partners-list').append($('#' + user_id).clone());
    $('#partner_add-' + user_id).addClass('hidden');
    $('#partner_remove-' + user_id).removeClass('hidden');
    $('#videme-partner-item-edit-panel_' + user_id).removeClass('hidden');*!/
    var JSONdata = {};
    var data = {};
    $(this).each(function() {
        $.each(this.attributes, function() {
            // this.attributes is not a plain object, but an array
            // of attribute nodes, which contain both the name and value
            if(this.specified) {
                console.log(this.name, this.value);
                data[this.name] = this.value;            }
        });
    });
    JSONdata[0] = data;
    //--JSONdata.push(data);
    //console.log('partner_add JSONdata ---> ' + JSON.stringify(JSONdata));
    //console.log('partner_add JSONdata[0][\'web_parent_id\'] ---> ' + JSONdata[0]['web_parent_id']);
    //console.log('partner_add web_parent_id ---> ' + web_parent_id);
    tempObject.append(
        showTileDoorbellSignSmall(
            parsePartnersItemsForDoorbellSignDelete(JSONdata), tempObject
        )
    );
    //--$('#' + JSONdata[0]['web_parent_id']).empty();
    $('#' + web_parent_id).remove();
});*/

/*$(document).on('click', '.partner_remove', function (event) {
    console.log(".partner_add -----> click");
    event.preventDefault();
    var $this = $(this);
    var web_parent_id = $this.attr('web_parent_id');
    $('#' + web_parent_id).remove();
});*/

/*************************************************************
 v2 service1
 **************************************************************/
$(document).on('click', '.service1', function (event) {
    console.log(".service1 -----> click");
    event.stopPropagation();
    var $this = $(this);
    var order_key = $this.attr('order_key');
    $('.service2').addClass('hidden');
    $("." + order_key).removeClass('hidden');
});

/*************************************************************
 v2 service1 add_service_action
 **************************************************************/
$(document).on('click', 'a.add_service_action', function (event) {
    console.log(".add_service_action -----> click");
    //event.stopPropagation();
    event.preventDefault();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        //if ($this.attr('service_id')) {
        //var content = $this.text();
        var content = $this.children();
        $this.html(VidemeProgress);
        $.ajax({
            url: $this.attr('href'),
            beforeSend: function () {
                $.fn.processNotification();
            },
            success: function (msg) {
                $.fn.showServiceMy();
                $.fn.showTalentsMy();
                $.fn.showEssenceMy();
                //$('#' + $this.attr('service_id')).addClass('hidden');
                //$this.addClass('hidden');
                $.fn.successNotification();
                $this.html(content);
            },
            error: function (msg) {
                //$('#modal-list').modal('hide');
                $.fn.errorNotification({
                    msg: msg
                });
            }
        });
        //} else {
        //$('.videme-list-list').html(showError("No file"));
        //}
    } else {
        //$('#modal-list').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
    return false;
});

/*************************************************************
 v2 service1 delete_service_action
 **************************************************************/
$(document).on('click', 'a.delete_service_action', function (event) {
    console.log(".delete_service_action -----> click");
    //event.stopPropagation();
    event.preventDefault();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        //if ($this.attr('users_service_id')) {
        $this.html(VidemeProgress);
        $.ajax({
            url: $this.attr('href'),
            beforeSend: function () {
                $.fn.processNotification();
            },
            success: function (msg) {
                //$('#' + $this.attr('users_service_id')).addClass('hidden');
                $.fn.showServiceMy();
                $.fn.showTalentsMy();
                $.fn.showEssenceMy();
                $.fn.successNotification();
            },
            error: function (msg) {
                $('#modal-list').modal('hide');
                $.fn.errorNotification({
                    msg: msg
                });
            }
        });
        //} else {
        //$('.videme-list-list').html(showError("No file"));
        //}
    } else {
        //$('#modal-list').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
    return false;
});

/*************************************************************
 v2 Set Like
 **************************************************************/
$(document).on('click', '.set_like', function (event) {
    console.log(".set_like -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            $this.html(VidemeProgress);
            //$(".videme-mini-img").html(VidemeProgress);


            //$(".videme-file-info").html("<b>" + $this.attr('title') + "</b><br>" + $this.attr('content') + "<br>" + $this.attr('created_at') + "<br>");
            $('#file').val($this.attr('file'));
            $.getJSON("https://api.vide.me/v2/likes/set/?item_id=" + $this.attr('item_id') + "&videmecallback=?",
                function (data) {
                    if (data) {
                        console.log(".set_like data -----> yes" + JSON.stringify(data));
                        /*var results = [];
                        $.each(data, function (key, value) {
                            results.push("<a class='list-url' href='https://api.vide.me/v2/items/share/?item_id=" + $this.attr('item_id') + "&album_id=" + value.album_id + "&nad=" + $.cookie('vide_nad') + "' target='_blank'><span class='label label-primary'>" + value.title + "</span></a> ");
                        });*/
                        //$(".videme-list-list").html("empty");
                        //$('.videme-list-list').html(results.join(""));
                    } else {
                        console.log(".list-toggle data -----> no");
                        //$this.html('You did it!');
                        //$this.html(sum($this.attr('likes_count'), 1));
                    }
                })
                .done(function (data) {
                    //$this.html('Liked');
                    $this.html(parseFloat($this.attr('likes_count')) + 1);
                    $this.addClass('disabled');
                    $this.addClass('fa-thumbs-up');
                })
                .fail(function (data) {
                    $this.html('-');
                })
                .always(function () {
                });
        } else {
            //$('.videme-list-list').html(showError("No file"));
        }
    } else {
        //$('#modal-list').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

/*************************************************************
 v4 album_manager_open
 **************************************************************/
$(document).on('click', '.album_manager_open', function (event) {
    console.log(".album_manager_open -----> click");
    event.preventDefault();
    event.stopPropagation();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        //console.log(".album_manager_open href -----> " + $this.attr('href'));
        if ($this.attr('album')) {
            //console.log(".album_manager_open album -----> " + $this.attr('album'));
            $('#videme-title-album').html($this.attr('album'));
            $('#videme-tile-album-manager').empty().postsOfAlbumMyScrollV3({'album': $this.attr('album')});
        } else {
            console.log(".album_manager_open album -----> empty");
            //$('.videme-list-list').html(showError("No file"));
        }
    } else {
        gotoLogin();
    }
});

/*************************************************************
 v2 Set Star
 **************************************************************/
$(document).on('click', '.set_star', function (event) {
    console.log(".set_star -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            //$this.html(VidemeProgress);
            //$(".videme-mini-img").html(VidemeProgress);
            $("#videme-showcase-item-stars_count-val").html(VidemeProgress);
            //$(".videme-file-info").html("<b>" + $this.attr('title') + "</b><br>" + $this.attr('content') + "<br>" + $this.attr('created_at') + "<br>");
            //$('#file').val($this.attr('file'));
            $.getJSON("https://api.vide.me/v2/stars/set/?item_id=" + $this.attr('item_id') + "&nad="+ $.cookie('vide_nad') + "&videmecallback=?",
                function (data) {
                    if (data) {
                        console.log(".set_star data -----> yes " + JSON.stringify(data));
                        /*var resp = JSON.stringify(data);
                        console.log(".set_star resp -----> " + resp);
                        if (resp = 'No stars') {
                            $('#modal-show-no-stars').modal('show');
                        }*/
                        if (!$.isEmptyObject(data.status)) {
                            if (data.status == 'success') {
                                if (!$.isEmptyObject(data.response)) {
                                    if (data.response == 'star sending') {
                                        //var stars_count = parseFloat($this.attr('stars_count')) + 1;
                                        /*var returnDeleteStarButtonArray = [];
                                        returnDeleteStarButtonArray.stars_count = parseFloat($this.attr('stars_count')) + 1;
                                        returnDeleteStarButtonArray.item_id = $this.attr('item_id');*/
                                        var showcaseStarsSettings = [];
                                        showcaseStarsSettings.stars_count = parseFloat($this.attr('stars_count')) + 1;
                                        showcaseStarsSettings.item_id = $this.attr('item_id');
                                        /*$(".videme-showcase-stars").html('<div class="btn-group" role="group" aria-label="Stars">\
                    <button type="button" class="btn btn-secondary btn-sm delete_star" stars_count="' + stars_count + '" item_id="' + $this.attr('item_id') + '"><i id="videme_showcase_stars_icon" class="fa fa-star-o" aria-hidden="true"></i>&nbsp;Unstar</button>\
                    <button type="button" class="btn btn-light btn-sm">' + stars_count + '</button>\
                    </div>');*/
                                        //$(".videme-showcase-stars").html(returnDeleteStarButton(returnDeleteStarButtonArray));
                                        //console.log(".set_star showcaseStarsSettings -----> " + JSON.stringify(showcaseStarsSettings));
                                        console.log(".set_star parseFloat(data.views_stars) - 1 -----> " + JSON.stringify(parseFloat(data.views_stars) - 1));
                                        //$(".videme-showcase-stars-v3").html(returnSetStarButtonV3(showcaseStarsSettings));
                                        $(".videme-showcase-stars-v3").html(returnDeleteStarButtonV3(showcaseStarsSettings));
                                        //$('.videme_nav_badge_views_stars').addClass('text-danger').html(parseFloat(data.views_stars) - 1);
                                        $('.videme_nav_badge_views_stars').addClass('text-danger').html(data.views_stars);
                                    }
                                    if (data.response == 'already exist view') {
                                    }
                                    if (data.response == 'no star') {
                                        $('#modal-show-no-stars').modal('show');

                                    }
                                }

                            }
                        }
                        /*var results = [];
                        $.each(data, function (key, value) {
                            results.push("<a class='list-url' href='https://api.vide.me/v2/items/share/?item_id=" + $this.attr('item_id') + "&album_id=" + value.album_id + "&nad=" + $.cookie('vide_nad') + "' target='_blank'><span class='label label-primary'>" + value.title + "</span></a> ");
                        });*/
                        //$(".videme-list-list").html("empty");
                        //$('.videme-list-list').html(results.join(""));
                    } else {
                        console.log(".list-toggle data -----> no");
                        //$this.html('You did it!');
                        //$this.html(sum($this.attr('likes_count'), 1));
                    }
                })
                .done(function (data) {
                    //$this.html('Liked');
                    /*$('.videme_showcase_stars_count').html(parseFloat($this.attr('stars_count')) + 1);
                    $this.addClass('disabled');
                    $('#videme_showcase_stars_icon').addClass('fa-star-o');*/
                    /*var stars_count = parseFloat($this.attr('stars_count')) + 1;
                    $(".videme-showcase-stars").html('<div class="btn-group" role="group" aria-label="Stars">\
                    <button type="button" class="btn btn-secondary btn-sm delete_star" stars_count="' + stars_count + '" item_id="' + $this.attr('item_id') + '"><i id="videme_showcase_stars_icon" class="fa fa-star-o" aria-hidden="true"></i>Unstar</button>\
                    <button type="button" class="btn btn-light btn-sm">' + stars_count + '</button>\
                    </div>');*/
                })
                .fail(function (data) {
                    $this.html('-');
                })
                .always(function () {
                });
        } else {
            //$('.videme-list-list').html(showError("No file"));
        }
    } else {
        //$('#modal-list').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

/*************************************************************
 v2 Set Like Showcase
 **************************************************************/
$(document).on('click', '.set_like_showcase', function (event) {
    console.log(".set_like_showcase -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            //$this.html(VidemeProgress);
            //$(".videme-mini-img").html(VidemeProgress);


            //$(".videme-file-info").html("<b>" + $this.attr('title') + "</b><br>" + $this.attr('content') + "<br>" + $this.attr('created_at') + "<br>");
            //$('#file').val($this.attr('file'));
            $.getJSON("https://api.vide.me/v2/likes/set/?item_id=" + $this.attr('item_id') + "&nad="+ $.cookie('vide_nad') + "&videmecallback=?",
                function (data) {
                    if (data) {
                        console.log(".set_like_showcase data -----> yes" + JSON.stringify(data));
                        /*var resp = JSON.stringify(data);
                        console.log(".set_star resp -----> " + resp);
                        if (resp = 'No stars') {
                            $('#modal-show-no-stars').modal('show');
                        }*/
                        /*if (!$.isEmptyObject(data.status)) {
                            if (data.status == 'success') {
                                if (!$.isEmptyObject(data.response)) {
                                    if (data.response == 'like sending') {
                                        var likes_count = parseFloat($this.attr('likes_count')) + 1;
                                        $(".videme-showcase-likes").html('<div class="btn-group" role="group" aria-label="likes">\
                    <button type="button" class="btn btn-secondary btn-sm delete_like" likes_count="' + likes_count + '" item_id="' + $this.attr('item_id') + '"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>&nbsp;Dislike</button>\
                    <button type="button" class="btn btn-light btn-sm">' + likes_count + '</button>\
                    </div>');
                                    }
                                    if (data.response == 'already exist view') {
                                    }
                                    /!*if (data.response == 'no star') {
                                        $('#modal-show-no-stars').modal('show');

                                    }*!/
                                }

                            }
                        }*/
                        /*var results = [];
                        $.each(data, function (key, value) {
                            results.push("<a class='list-url' href='https://api.vide.me/v2/items/share/?item_id=" + $this.attr('item_id') + "&album_id=" + value.album_id + "&nad=" + $.cookie('vide_nad') + "' target='_blank'><span class='label label-primary'>" + value.title + "</span></a> ");
                        });*/
                        //$(".videme-list-list").html("empty");
                        //$('.videme-list-list').html(results.join(""));
                    } else {
                        console.log(".list-toggle data -----> no");
                        //$this.html('You did it!');
                        //$this.html(sum($this.attr('likes_count'), 1));
                    }
                })
                .done(function (data) {
                    /*var likes_count = parseFloat($this.attr('likes_count')) + 1;
                    $(".videme-showcase-likes").html('<div class="btn-group" role="group" aria-label="likes">\
                    <button type="button" class="btn btn-secondary btn-sm delete_like_showcase" likes_count="' + likes_count + '" item_id="' + $this.attr('item_id') + '"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>&nbsp;Dislike</button>\
                    <button type="button" class="btn btn-light btn-sm">' + likes_count + '</button>\
                    </div>');*/
                    /*$(".videme-showcase-reposts").html('<div class="btn-group" role="group" aria-label="reposts">\
                    <button type="button" class="btn btn-secondary btn-sm" reposts_count="' + reposts_count + '" item_id="' + showcaseRepostsSettings.item_id + '"><i class="fa fa-retweet" aria-hidden="true"></i>&nbsp;Repost</button>\
                    <button type="button" class="btn btn-light btn-sm">' + reposts_count + '</button>\
                    </div>');*/
                    var returnDeleteLikeButtonArray = [];
                    returnDeleteLikeButtonArray.likes_count = parseFloat($this.attr('likes_count')) + 1;
                    returnDeleteLikeButtonArray.item_id = $this.attr('item_id');
                    $(".videme-showcase-likes").html(returnDeleteLikeButton(returnDeleteLikeButtonArray));
                })
                .fail(function (data) {
                    $this.html('-');
                })
                .always(function () {
                });
        } else {
            //$('.videme-list-list').html(showError("No file"));
        }
    } else {
        //$('#modal-list').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

/*************************************************************
 v2 Set tag Showcase
 **************************************************************/
$(document).on('click', '.set_tag_showcase', function (event) {
    console.log(".set_tag_showcase -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            $.getJSON("https://api.vide.me/v2/tags/set/?item_id=" + $this.attr('item_id') + "&tag=" + $this.attr('tag') + "&nad="+ $.cookie('vide_nad') + "&videmecallback=?",
                function (data) {
                    $("#videme-showcase-tag-btn_" + $this.attr('tag')).addClass('hidden');
                    $("#videme-showcase-tag-progress-place_" + $this.attr('tag')).html(VidemeProgress);
                    if (data) {
                        console.log(".set_tag_showcase data -----> yes" + JSON.stringify(data));
                    } else {
                        console.log(".list-toggle data -----> no");
                    }
                })
                .done(function (data) {
                    if (!$.isEmptyObject(data.status)) {
                        if (data.status == 'success') {
                            //if (!$.isEmptyObject(data.response)) {
                            //if (data.response == 'like sending') {
                            var tags_count = parseFloat($this.attr('tags_count')) + 1;
                            var tags_count_my = parseFloat($("#videme-showcase-tag-my-btn_" + $this.attr('tag')).attr('tags_count')) - 1;
                            console.log(".set_tag_showcase -----> tags_count " + tags_count);
                            console.log(".set_tag_showcase -----> tags_count_my " + tags_count_my);
                            $("#videme-showcase-tag-badge_" + $this.attr('tag'))
                                .removeClass('videme-badge-tag-set')
                                .addClass('videme-badge-tag-delete');
                            $("#videme-showcase-tag-btn_" + $this.attr('tag'))
                                .removeClass('fa-check-circle')
                                .removeClass('set_tag_showcase')
                                .addClass('fa-remove')
                                .addClass('delete_tag_showcase')
                                .removeClass('hidden');
                            $("#videme-showcase-tag-count_" + $this.attr('tag')).html(tags_count);
                            $("#videme-showcase-tag-my-count_" + $this.attr('tag')).html(tags_count_my);
                            $("#videme-showcase-tag-progress-place_" + $this.attr('tag')).empty();
                            $("#videme-showcase-tag-btn_" + $this.attr('tag')).attr('tags_count', tags_count);
                            $("#videme-showcase-tag-my-btn_" + $this.attr('tag')).attr('tags_count', tags_count_my);
                            //}
                            if (data.response == 'already exist view') {
                            }
                            /*if (data.response == 'no star') {
                                $('#modal-show-no-stars').modal('show');

                            }*/
                            //}

                        }
                    }
                })
                .fail(function (data) {
                    $this.html('-');
                })
                .always(function () {
                });
        } else {
            //$('.videme-list-list').html(showError("No file"));
            console.log(".set_tag_showcase -----> click no item_id");

        }
    } else {
        //$('#modal-list').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

/*************************************************************
 v2 Set tag NOA Showcase
 **************************************************************/
$(document).on('click', '.set_tag_noa_showcase', function (event) {
    console.log(".set_tag_noa_showcase -----> click");
    event.stopPropagation();
    var $this = $(this);
    $('.videme-showcase-tags-alert').html(VidemeAlertLogin);

});

/*************************************************************
 v2 Set tag my Showcase
 **************************************************************/
$(document).on('click', '.set_tag_my_showcase', function (event) {
    console.log(".set_tag_my_showcase -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            if ($this.attr('tags_count') > 0) {
                $.getJSON("https://api.vide.me/v2/tags/set/?item_id=" + $this.attr('item_id') + "&tag=" + $this.attr('tag') + "&nad="+ $.cookie('vide_nad') + "&videmecallback=?",
                    function (data) {
                        $("#videme-showcase-tag-my-btn_" + $this.attr('tag')).addClass('hidden');
                        $("#videme-showcase-tag-my-progress-place_" + $this.attr('tag')).html(VidemeProgress);
                        if (data) {
                            console.log(".set_tag_my_showcase data -----> yes" + JSON.stringify(data));
                        } else {
                            console.log(".set_tag_my_showcase data -----> no");
                        }
                    })
                    .done(function (data) {
                        if (!$.isEmptyObject(data.status)) {
                            if (data.status == 'success') {
                                //if (!$.isEmptyObject(data.response)) {
                                //if (data.response == 'like sending') {
                                var tags_count = parseFloat($this.attr('tags_count')) + 1;
                                var tags_count_my = parseFloat($("#videme-showcase-tag-my-btn_" + $this.attr('tag')).attr('tags_count')) - 1;
                                console.log(".set_tag_my_showcase -----> tags_count " + tags_count);
                                console.log(".set_tag_my_showcase -----> tags_count_my " + tags_count_my);
                                $("#videme-showcase-tag-my-badge_" + $this.attr('tag'))
                                    .removeClass('videme-badge-tag-my')
                                    .addClass('videme-badge-tag-delete');
                                $("#videme-showcase-tag-my-btn_" + $this.attr('tag'))
                                    .removeClass('fa-arrow-up')
                                    .removeClass('set_tag_showcase')
                                    .addClass('fa-remove')
                                    .addClass('delete_tag_showcase')
                                    .removeClass('hidden');
                                //$("#videme-showcase-tag-count_" + $this.attr('tag')).html(tags_count);
                                $("#videme-showcase-tag-my-count_" + $this.attr('tag')).html(tags_count_my);
                                $("#videme-showcase-tag-my-progress-place_" + $this.attr('tag')).empty();
                                //$("#videme-showcase-tag-btn_" + $this.attr('tag')).attr('tags_count', tags_count);
                                $("#videme-showcase-tag-my-btn_" + $this.attr('tag')).attr('tags_count', tags_count_my);
                                var returnDeleteTagButtonParam = [];
                                returnDeleteTagButtonParam.tag = $this.attr('tag');
                                returnDeleteTagButtonParam.item_id = $this.attr('item_id');
                                returnDeleteTagButtonParam.tags_count = $this.attr('tags_count');
                                $(".videme-showcase-tags-item_place").append(returnDeleteTagButton(returnDeleteTagButtonParam));
                                //}
                                if (data.response == 'already exist view') {
                                }
                                /*if (data.response == 'no star') {
                                    $('#modal-show-no-stars').modal('show');

                                }*/
                                //}

                            }
                        }
                    })
                    .fail(function (data) {
                        $this.html('-');
                    })
                    .always(function () {
                    });

            } else {
                //$('.videme-list-list').html(showError("No file"));
                console.log(".tags_count -----> 0");

            }
        } else {
            //$('.videme-list-list').html(showError("No file"));
            console.log(".set_tag_showcase -----> click no item_id");

        }
    } else {
        //$('#modal-list').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

/*************************************************************
 v2 Delete tag Showcase
 **************************************************************/
$(document).on('click', '.delete_tag_showcase', function (event) {
    console.log(".delete_tag_showcase -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            $.getJSON("https://api.vide.me/v2/tags/delete/?item_id=" + $this.attr('item_id') + "&tag=" + $this.attr('tag') + "&nad="+ $.cookie('vide_nad') + "&videmecallback=?",
                function (data) {
                    $("#videme-showcase-tag-btn_" + $this.attr('tag')).addClass('hidden');
                    $("#videme-showcase-tag-progress-place_" + $this.attr('tag')).html(VidemeProgress);
                    if (data) {
                        console.log(".set_tag_showcase data -----> yes" + JSON.stringify(data));
                    } else {
                        console.log(".delete_tag_showcase data -----> no");
                    }
                })
                .done(function (data) {
                    if (!$.isEmptyObject(data.status)) {
                        if (data.status == 'success') {
                            //if (!$.isEmptyObject(data.response)) {
                            //if (data.response == 'like sending') {
                            var tags_count = parseFloat($this.attr('tags_count')) - 1;
                            var tags_count_my = parseFloat($("#videme-showcase-tag-my-btn_" + $this.attr('tag')).attr('tags_count')) + 1;
                            console.log(".delete_tag_showcase -----> tags_count " + tags_count);
                            console.log(".delete_tag_showcase -----> tags_count_my " + tags_count_my);
                            $("#videme-showcase-tag-badge_" + $this.attr('tag'))
                                .removeClass('videme-badge-tag-delete')
                                .addClass('videme-badge-tag-set');
                            $("#videme-showcase-tag-btn_" + $this.attr('tag'))
                                .removeClass('fa-remove')
                                .removeClass('delete_tag_showcase')
                                .addClass('fa-check-circle')
                                .addClass('set_tag_showcase')
                                .removeClass('hidden');
                            $("#videme-showcase-tag-count_" + $this.attr('tag')).html(tags_count);
                            $("#videme-showcase-tag-my-count_" + $this.attr('tag')).html(tags_count_my);
                            $("#videme-showcase-tag-progress-place_" + $this.attr('tag')).empty();
                            $("#videme-showcase-tag-btn_" + $this.attr('tag')).attr('tags_count', tags_count);
                            $("#videme-showcase-tag-my-btn_" + $this.attr('tag')).attr('tags_count', tags_count_my);

                            //}
                            if (data.response == 'already exist view') {
                            }
                            /*if (data.response == 'no star') {
                                $('#modal-show-no-stars').modal('show');

                            }*/
                            //}

                        }
                    }
                })
                .fail(function (data) {
                    $this.html('-');
                })
                .always(function () {
                });
        } else {
            console.log(".delete_tag_showcase -----> click no item_id");

        }
    } else {
        //$('#modal-list').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

/*************************************************************
 V4 Delete item from album
 **************************************************************/
$(document).on('click', '.delete_my_album_set', function (event) {
    console.log(".delete_my_album_set -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        if ($this.attr('albums_sets_id')) {
            $.getJSON("https://api.vide.me/v2/albums/items/delete/?albums_sets_id=" + $this.attr('albums_sets_id') + "&nad="+ $.cookie('vide_nad') + "&videmecallback=?",
                function (data) {
                    //$("#videme-showcase-tag-btn_" + $this.attr('tag')).addClass('hidden');
                    //$("#videme-showcase-tag-progress-place_" + $this.attr('tag')).html(VidemeProgress);
                    console.log(".delete_my_album_set data -----> " + JSON.stringify(data));
                    if (data) {
                        console.log(".delete_my_album_set data -----> yes" + JSON.stringify(data));
                    } else {
                        console.log(".delete_my_album_set data -----> no");
                    }
                })
                .done(function (data) {
                    if (!$.isEmptyObject(data.status)) {
                        if (data.status == 'success') {
                            //$('#videme-title-album').html($this.attr('album'));
                            $('#videme-tile-album-manager').empty().postsOfAlbumMyScrollV3({'album': $this.attr('album')});
                            $('#videme-tile-album').showList({
                                //limit: 6
                            });
                        }
                    }
                })
                .fail(function (data) {
                    $this.html('-');
                })
                .always(function () {
                });
        } else {
            console.log(".delete_my_album_set -----> click no albums_sets_id");
        }
    } else {
        //$('#modal-list').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

/*************************************************************
 v2 Show tag items Showcase
 **************************************************************/
$(document).on('click', '.show_tag_items_showcase', function (event) {
    console.log(".show_tag_items_showcase -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($this.attr('item_id') && $this.attr('tag')) {
        $('#videme-tile-v3').empty().postsShowItemsByTagV4({'tag': $this.attr('tag')});
    } else {
        console.log(".delete_tag_showcase -----> click no item_id");
    }
});

/*************************************************************
 v2 Show tag items for spring
 **************************************************************/
$(document).on('click', '.show_tag_items_for_spring', function (event) {
    console.log(".show_tag_items_for_spring -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($this.attr('item_id') && $this.attr('tag')) {
        $('#videme-tile-v3').empty().postsShowItemsByTagForSpringV4({'tag': $this.attr('tag')});
    } else {
        console.log(".delete_tag_showcase -----> click no item_id");
    }
});
/*************************************************************
 v2 Show tag items for spring ACTION
 **************************************************************/
$(document).on('click', '.show_tag_items_for_spring_action', function (event) {
    console.log(".show_tag_items_for_spring_action -----> click");
    event.stopPropagation();
    var $this = $(this);
    /*if ($this.attr('item_id') && $this.attr('tag')) {
        $('#videme-tile-v3').empty().postsShowItemsByTagForSpringV4({'tag': $this.attr('tag')});
    } else {
        console.log(".delete_tag_showcase -----> click no item_id");
    }*/
    window.location.href = href;
});

/*************************************************************
 v2 Set Repost Showcase
 **************************************************************/
$(document).on('click', '.set_repost_showcase', function (event) { // 01082022 add to web, not used
    console.log(".set_repost_showcase -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            //$this.html(VidemeProgress);
            //$(".videme-mini-img").html(VidemeProgress);
            $("#videme-showcase-item-reposts_count-val").html(VidemeProgress);


            //$(".videme-file-info").html("<b>" + $this.attr('title') + "</b><br>" + $this.attr('content') + "<br>" + $this.attr('created_at') + "<br>");
            //$('#file').val($this.attr('file'));
            $.getJSON("https://api.vide.me/v2/reposts/item/?item_id=" + $this.attr('item_id') + "&nad="+ $.cookie('vide_nad') + "&videmecallback=?",
                function (data) {
                    if (data) {
                        console.log(".set_repost_showcase data -----> yes" + JSON.stringify(data));
                        /*var resp = JSON.stringify(data);
                        console.log(".set_star resp -----> " + resp);
                        if (resp = 'No stars') {
                            $('#modal-show-no-stars').modal('show');
                        }*/
                        /*if (!$.isEmptyObject(data.status)) {
                            if (data.status == 'success') {
                                if (!$.isEmptyObject(data.response)) {
                                    if (data.response == 'like sending') {
                                        var likes_count = parseFloat($this.attr('likes_count')) + 1;
                                        $(".videme-showcase-likes").html('<div class="btn-group" role="group" aria-label="likes">\
                    <button type="button" class="btn btn-secondary btn-sm delete_like" likes_count="' + likes_count + '" item_id="' + $this.attr('item_id') + '"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>&nbsp;Dislike</button>\
                    <button type="button" class="btn btn-light btn-sm">' + likes_count + '</button>\
                    </div>');
                                    }
                                    if (data.response == 'already exist view') {
                                    }
                                    /!*if (data.response == 'no star') {
                                        $('#modal-show-no-stars').modal('show');

                                    }*!/
                                }

                            }
                        }*/
                        /*var results = [];
                        $.each(data, function (key, value) {
                            results.push("<a class='list-url' href='https://api.vide.me/v2/items/share/?item_id=" + $this.attr('item_id') + "&album_id=" + value.album_id + "&nad=" + $.cookie('vide_nad') + "' target='_blank'><span class='label label-primary'>" + value.title + "</span></a> ");
                        });*/
                        //$(".videme-list-list").html("empty");
                        //$('.videme-list-list').html(results.join(""));
                    } else {
                        console.log(".list-toggle data -----> no");
                        //$this.html('You did it!');
                        //$this.html(sum($this.attr('likes_count'), 1));
                    }
                })
                .done(function (data) {
                    //var reposts_count = parseFloat($this.attr('reposts_count')) + 1;
                    /*$(".videme-showcase-reposts").html('<div class="btn-group" role="group" aria-label="reposts">\
                    <button type="button" class="btn btn-secondary btn-sm" reposts_count="' + reposts_count + '" item_id="' + $this.attr('item_id') + '"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>&nbsp;Dislike</button>\
                    <button type="button" class="btn btn-light btn-sm">' + likes_count + '</button>\
                    </div>');*/
                    var returnSetRepostButtonArray = [];
                    returnSetRepostButtonArray.reposts_count = parseFloat($this.attr('reposts_count')) + 1;
                    returnSetRepostButtonArray.item_id = $this.attr('item_id');
                    //$(".videme-showcase-reposts").html(returnSetRepostButton(returnSetRepostButtonArray));
                    $(".videme-showcase-reposts-v3").html(returnSetRepostButtonV3(returnSetRepostButtonArray));
                })
                .fail(function (data) {
                    $this.html('-');
                })
                .always(function () {
                });
        } else {
            //$('.videme-list-list').html(showError("No file"));
        }
    } else {
        //$('#modal-list').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

/*************************************************************
 v2 Set Repost Showcase
 **************************************************************/
$(document).on('click', '.show_comment_showcase', function (event) {
    console.log(".show_comment_showcase -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            $('#modal-show-comments').modal('show');

        } else {
            //$('.videme-list-list').html(showError("No file"));
        }
    } else {
        //$('#modal-list').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

/*************************************************************
 v2 Set Star multiple
 **************************************************************/
$(document).on('click', '.set_star_multy', function (event) {
    console.log(".set_star_multy -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            //$this.html(VidemeProgress);
            //$(".videme-mini-img").html(VidemeProgress);


            //$(".videme-file-info").html("<b>" + $this.attr('title') + "</b><br>" + $this.attr('content') + "<br>" + $this.attr('created_at') + "<br>");
            //$('#file').val($this.attr('file'));
            $.getJSON("https://api.vide.me/v2/stars/set/?item_id=" + $this.attr('item_id') + "&nad="+ $.cookie('vide_nad') + "&videmecallback=?",
                function (data) {
                    if (data) {
                        console.log(".set_star_multy data -----> yes" + JSON.stringify(data));
                        /*var resp = JSON.stringify(data);
                        console.log(".set_star resp -----> " + resp);
                        if (resp = 'No stars') {
                            $('#modal-show-no-stars').modal('show');
                        }*/
                        if (!$.isEmptyObject(data.status)) {
                            if (data.status == 'success') {
                                if (!$.isEmptyObject(data.response)) {
                                    if (data.response == 'star sending') {
                                        var stars_count = parseFloat($this.attr('stars_count')) + 1;
                                        $('#' + $this.attr('btn_group_stars_id')).html('<div class="btn-group float-right" role="group" aria-label="Stars" id="' + $this.attr('btn_group_stars_id') + '">\
                    <button type="button" class="btn btn-secondary btn-sm videme-relation-card-button-connect delete_star_multy" \
                    stars_count="' + stars_count + '" item_id="' + $this.attr('item_id') + '"\
                    btn_group_stars_id="' + $this.attr('btn_group_stars_id') + '">\
                    <i id="videme_showcase_stars_icon" class="fa fa-star-o" aria-hidden="true"></i>&nbsp;Unstar</button>\
                    <button type="button" class="btn btn-light btn-sm videme_showcase_stars_count">' + stars_count + '</button>\
                    </div>');
                                    }
                                    if (data.response == 'already exist view') {
                                    }
                                    if (data.response == 'no star') {
                                        $('#modal-show-no-stars').modal('show');

                                    }
                                }

                            }
                        }
                        /*var results = [];
                        $.each(data, function (key, value) {
                            results.push("<a class='list-url' href='https://api.vide.me/v2/items/share/?item_id=" + $this.attr('item_id') + "&album_id=" + value.album_id + "&nad=" + $.cookie('vide_nad') + "' target='_blank'><span class='label label-primary'>" + value.title + "</span></a> ");
                        });*/
                        //$(".videme-list-list").html("empty");
                        //$('.videme-list-list').html(results.join(""));
                    } else {
                        console.log(".list-toggle data -----> no");
                        //$this.html('You did it!');
                        //$this.html(sum($this.attr('likes_count'), 1));
                    }
                })
                .done(function (data) {
                    //$this.html('Liked');
                    /*$('.videme_showcase_stars_count').html(parseFloat($this.attr('stars_count')) + 1);
                    $this.addClass('disabled');
                    $('#videme_showcase_stars_icon').addClass('fa-star-o');*/
                    /*var stars_count = parseFloat($this.attr('stars_count')) + 1;
                    $(".videme-showcase-stars").html('<div class="btn-group" role="group" aria-label="Stars">\
                    <button type="button" class="btn btn-secondary btn-sm delete_star" stars_count="' + stars_count + '" item_id="' + $this.attr('item_id') + '"><i id="videme_showcase_stars_icon" class="fa fa-star-o" aria-hidden="true"></i>Unstar</button>\
                    <button type="button" class="btn btn-light btn-sm">' + stars_count + '</button>\
                    </div>');*/
                })
                .fail(function (data) {
                    $this.html('-');
                })
                .always(function () {
                });
        } else {
            //$('.videme-list-list').html(showError("No file"));
        }
    } else {
        //$('#modal-list').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

/*************************************************************
 v2 Set Like multiple
 **************************************************************/
$(document).on('click', '.set_like_multy', function (event) {
    console.log(".set_like_multy -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            //$this.html(VidemeProgress);
            //$(".videme-mini-img").html(VidemeProgress);


            //$(".videme-file-info").html("<b>" + $this.attr('title') + "</b><br>" + $this.attr('content') + "<br>" + $this.attr('created_at') + "<br>");
            //$('#file').val($this.attr('file'));
            $.getJSON("https://api.vide.me/v2/likes/set/?item_id=" + $this.attr('item_id') + "&nad="+ $.cookie('vide_nad') + "&videmecallback=?",
                function (data) {
                    if (data) {
                        console.log(".set_like_multy data -----> yes" + JSON.stringify(data));
                        /*var resp = JSON.stringify(data);
                        console.log(".set_star resp -----> " + resp);
                        if (resp = 'No stars') {
                            $('#modal-show-no-stars').modal('show');
                        }*/
                        if (!$.isEmptyObject(data.status)) {
                            if (data.status == 'success') {
                                if (!$.isEmptyObject(data.response)) {
                                    /*if (data.response == 'like sending') {
                                        var likes_count = parseFloat($this.attr('likes_count')) + 1;
                                        $('#' + $this.attr('btn_group_likes_id')).html('<div class="btn-group float-right" role="group" aria-label="likes" id="' + $this.attr('btn_group_likes_id') + '">\
                    <button type="button" class="btn btn-secondary btn-sm videme-relation-card-button-connect delete_like_multy" \
                    likes_count="' + likes_count + '" item_id="' + $this.attr('item_id') + '"\
                    btn_group_likes_id="' + $this.attr('btn_group_likes_id') + '">\
                    <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>&nbsp;Dislike</button>\
                    <button type="button" class="btn btn-light btn-sm videme_showcase_likes_count">' + likes_count + '</button>\
                    </div>');
                                    }*/
                                    /*if (data.response == 'already exist view') {
                                    }
                                    if (data.response == 'no star') {
                                        $('#modal-show-no-stars').modal('show');

                                    }*/
                                }

                            }
                        }
                        /*var results = [];
                        $.each(data, function (key, value) {
                            results.push("<a class='list-url' href='https://api.vide.me/v2/items/share/?item_id=" + $this.attr('item_id') + "&album_id=" + value.album_id + "&nad=" + $.cookie('vide_nad') + "' target='_blank'><span class='label label-primary'>" + value.title + "</span></a> ");
                        });*/
                        //$(".videme-list-list").html("empty");
                        //$('.videme-list-list').html(results.join(""));
                    } else {
                        console.log(".list-toggle data -----> no");
                        //$this.html('You did it!');
                        //$this.html(sum($this.attr('likes_count'), 1));
                    }
                })
                .done(function (data) {
                    var likes_count = parseFloat($this.attr('likes_count')) + 1;
                    $('#' + $this.attr('btn_group_likes_id')).html('<div class="btn-group float-right" role="group" aria-label="likes" id="' + $this.attr('btn_group_likes_id') + '">\
                    <button type="button" class="btn btn-secondary btn-sm videme-relation-card-button-connect delete_like_multy" \
                    likes_count="' + likes_count + '" item_id="' + $this.attr('item_id') + '"\
                    btn_group_likes_id="' + $this.attr('btn_group_likes_id') + '">\
                    <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>&nbsp;Dislike</button>\
                    <button type="button" class="btn btn-light btn-sm videme_showcase_likes_count">' + likes_count + '</button>\
                    </div>');
                })
                .fail(function (data) {
                    $this.html('-');
                })
                .always(function () {
                });
        } else {
            //$('.videme-list-list').html(showError("No file"));
        }
    } else {
        //$('#modal-list').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

/*************************************************************
 v2 Delete Star
 **************************************************************/
$(document).on('click', '.delete_star', function (event) {
//$('.delete_star').on('click', function(event) {
    console.log(".delete_star -----> click");
    //event.preventDefault(); // To prevent following the link (optional)
    event.stopPropagation();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            //$this.html(VidemeProgress);
            //$(".videme-mini-img").html(VidemeProgress);
            $("#videme-showcase-item-stars_count-val").html(VidemeProgress);
            //$(".videme-file-info").html("<b>" + $this.attr('title') + "</b><br>" + $this.attr('content') + "<br>" + $this.attr('created_at') + "<br>");
            //$('#file').val($this.attr('file'));
            $.getJSON("https://api.vide.me/v2/stars/delete/?item_id=" + $this.attr('item_id') + "&nad="+ $.cookie('vide_nad') + "&videmecallback=?",
                function (data) {
                    if (data) {
                        console.log(".delete_star data -----> yes" + JSON.stringify(data));
                        /*var results = [];
                        $.each(data, function (key, value) {
                            results.push("<a class='list-url' href='https://api.vide.me/v2/items/share/?item_id=" + $this.attr('item_id') + "&album_id=" + value.album_id + "&nad=" + $.cookie('vide_nad') + "' target='_blank'><span class='label label-primary'>" + value.title + "</span></a> ");
                        });*/
                        //$(".videme-list-list").html("empty");
                        //$('.videme-list-list').html(results.join(""));
                    } else {
                        //console.log(".list-toggle data -----> no");
                        //$this.html('You did it!');
                        //$this.html(sum($this.attr('likes_count'), 1));
                    }
                })
                .done(function (data) {
                    //$this.html('Liked');
                    //$('.videme_showcase_stars_count').html(parseFloat($this.attr('stars_count')) + 1);
                    //var stars_count = parseFloat($this.attr('stars_count')) - 1;
                    //$this.addClass('disabled');
                    //$('#videme_showcase_stars_icon').addClass('fa-star-o');
                    /*$(".videme-showcase-stars").html('<div class="btn-group" role="group" aria-label="Stars">\
                    <button type="button" class="btn btn-secondary btn-sm set_star" stars_count="' + stars_count + '" item_id="' + $this.attr('item_id') + '"><i id="videme_showcase_stars_icon" class="fa fa-star" aria-hidden="true"></i>&nbsp;Star</button>\
                    <button type="button" class="btn btn-light btn-sm videme_showcase_stars_count">' + stars_count + '</button>\
                    </div>');*/
                    var returnSetStarButtonArray = [];
                    returnSetStarButtonArray.stars_count = parseFloat($this.attr('stars_count')) - 1;
                    returnSetStarButtonArray.item_id = $this.attr('item_id');
                    //$(".videme-showcase-stars").html(returnSetStarButton(returnSetStarButtonArray));
                    $(".videme-showcase-stars-v3").html(returnSetStarButtonV3(returnSetStarButtonArray));
                    //$('.videme_nav_badge_views_stars').addClass('text-danger').html(parseFloat(data.views_stars) + 1);
                    $('.videme_nav_badge_views_stars').addClass('text-danger').html(data.views_stars);

                })
                .fail(function (data) {
                    $this.html('-');
                })
                .always(function () {
                });
        } else {
            //$('.videme-list-list').html(showError("No file"));
        }
    } else {
        //$('#modal-list').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

/*************************************************************
 v2 Delete Like showcase
 **************************************************************/
$(document).on('click', '.delete_like_showcase', function (event) {
    console.log(".delete_star -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            //$this.html(VidemeProgress);
            //$(".videme-mini-img").html(VidemeProgress);
            //$(".videme-file-info").html("<b>" + $this.attr('title') + "</b><br>" + $this.attr('content') + "<br>" + $this.attr('created_at') + "<br>");
            //$('#file').val($this.attr('file'));
            $.getJSON("https://api.vide.me/v2/likes/delete/?item_id=" + $this.attr('item_id') + "&nad="+ $.cookie('vide_nad') + "&videmecallback=?",
                function (data) {
                    if (data) {
                        console.log(".delete_like_showcase data -----> yes" + JSON.stringify(data));
                        /*var results = [];
                        $.each(data, function (key, value) {
                            results.push("<a class='list-url' href='https://api.vide.me/v2/items/share/?item_id=" + $this.attr('item_id') + "&album_id=" + value.album_id + "&nad=" + $.cookie('vide_nad') + "' target='_blank'><span class='label label-primary'>" + value.title + "</span></a> ");
                        });*/
                        //$(".videme-list-list").html("empty");
                        //$('.videme-list-list').html(results.join(""));
                    } else {
                        //console.log(".list-toggle data -----> no");
                        //$this.html('You did it!');
                        //$this.html(sum($this.attr('likes_count'), 1));
                    }
                })
                .done(function (data) {
                    //$this.html('Liked');
                    //$('.videme_showcase_stars_count').html(parseFloat($this.attr('stars_count')) + 1);
                    //=var likes_count = parseFloat($this.attr('likes_count')) - 1;
                    //$this.addClass('disabled');
                    //$('#videme_showcase_stars_icon').addClass('fa-star-o');
                    /*$(".videme-showcase-likes").html('<div class="btn-group" role="group" aria-label="likes">\
                    <button type="button" class="btn btn-secondary btn-sm set_like_showcase" likes_count="' + likes_count + '" item_id="' + $this.attr('item_id') + '"><i class="fa fa-thumbs-up" aria-hidden="true"></i>&nbsp;Like</button>\
                    <button type="button" class="btn btn-light btn-sm videme_showcase_likes_count">' + likes_count + '</button>\
                    </div>');*/
                    var returnSetLikeButtonArray = [];
                    returnSetLikeButtonArray.likes_count = parseFloat($this.attr('likes_count')) - 1;
                    returnSetLikeButtonArray.item_id = $this.attr('item_id');
                    $(".videme-showcase-likes").html(returnSetLikeButton(returnSetLikeButtonArray));
                })
                .fail(function (data) {
                    $this.html('-');
                })
                .always(function () {
                });
        } else {
            //$('.videme-list-list').html(showError("No file"));
        }
    } else {
        //$('#modal-list').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

/*************************************************************
 v2 Delete Star Multy button
 **************************************************************/
$(document).on('click', '.delete_star_multy', function (event) {
    console.log(".delete_star_multy -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            //$this.html(VidemeProgress);
            //$(".videme-mini-img").html(VidemeProgress);
            //$(".videme-file-info").html("<b>" + $this.attr('title') + "</b><br>" + $this.attr('content') + "<br>" + $this.attr('created_at') + "<br>");
            //$('#file').val($this.attr('file'));
            $.getJSON("https://api.vide.me/v2/stars/delete/?item_id=" + $this.attr('item_id') + "&nad="+ $.cookie('vide_nad') + "&videmecallback=?",
                function (data) {
                    if (data) {
                        console.log(".delete_star_multy data -----> yes" + JSON.stringify(data));
                        /*var results = [];
                        $.each(data, function (key, value) {
                            results.push("<a class='list-url' href='https://api.vide.me/v2/items/share/?item_id=" + $this.attr('item_id') + "&album_id=" + value.album_id + "&nad=" + $.cookie('vide_nad') + "' target='_blank'><span class='label label-primary'>" + value.title + "</span></a> ");
                        });*/
                        //$(".videme-list-list").html("empty");
                        //$('.videme-list-list').html(results.join(""));
                    } else {
                        //console.log(".list-toggle data -----> no");
                        //$this.html('You did it!');
                        //$this.html(sum($this.attr('likes_count'), 1));
                    }
                })
                .done(function (data) {
                    //$this.html('Liked');
                    //$('.videme_showcase_stars_count').html(parseFloat($this.attr('stars_count')) + 1);
                    var stars_count = parseFloat($this.attr('stars_count')) - 1;
                    //$this.addClass('disabled');
                    //$('#videme_showcase_stars_icon').addClass('fa-star-o');
                    /*$(".videme-showcase-stars").html('<div class="btn-group" role="group" aria-label="Stars">\
                    <button type="button" class="btn btn-secondary btn-sm set_star" stars_count="' + stars_count + '" item_id="' + $this.attr('item_id') + '"><i id="videme_showcase_stars_icon" class="fa fa-star" aria-hidden="true"></i>&nbsp;Star</button>\
                    <button type="button" class="btn btn-light btn-sm videme_showcase_stars_count">' + stars_count + '</button>\
                    </div>');
                    $this.html();*/
                    $('#' + $this.attr('btn_group_stars_id')).html('<div class="btn-group float-right" role="group" aria-label="Stars" id="' + $this.attr('btn_group_stars_id') + '">\
                    <button type="button" class="btn btn-secondary btn-sm videme-relation-card-button-connect set_star_multy" \
                    stars_count="' + stars_count + '" item_id="' + $this.attr('item_id') + '"\
                    btn_group_stars_id="' + $this.attr('btn_group_stars_id') + '">\
                    <i id="videme_showcase_stars_icon" class="fa fa-star" aria-hidden="true"></i>&nbsp;Star</button>\
                    <button type="button" class="btn btn-light btn-sm videme_showcase_stars_count">' + stars_count + '</button>\
                    </div>');
                })
                .fail(function (data) {
                    $this.html('-');
                })
                .always(function () {
                });
        } else {
            //$('.videme-list-list').html(showError("No file"));
        }
    } else {
        //$('#modal-list').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

/*************************************************************
 v2 Delete Star Multy button
 **************************************************************/
$(document).on('click', '.delete_like_multy', function (event) {
    console.log(".delete_like_multy -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            //$this.html(VidemeProgress);
            //$(".videme-mini-img").html(VidemeProgress);
            //$(".videme-file-info").html("<b>" + $this.attr('title') + "</b><br>" + $this.attr('content') + "<br>" + $this.attr('created_at') + "<br>");
            //$('#file').val($this.attr('file'));
            $.getJSON("https://api.vide.me/v2/likes/delete/?item_id=" + $this.attr('item_id') + "&nad="+ $.cookie('vide_nad') + "&videmecallback=?",
                function (data) {
                    if (data) {
                        console.log(".delete_like_multy data -----> yes" + JSON.stringify(data));
                        /*var results = [];
                        $.each(data, function (key, value) {
                            results.push("<a class='list-url' href='https://api.vide.me/v2/items/share/?item_id=" + $this.attr('item_id') + "&album_id=" + value.album_id + "&nad=" + $.cookie('vide_nad') + "' target='_blank'><span class='label label-primary'>" + value.title + "</span></a> ");
                        });*/
                        //$(".videme-list-list").html("empty");
                        //$('.videme-list-list').html(results.join(""));
                    } else {
                        //console.log(".list-toggle data -----> no");
                        //$this.html('You did it!');
                        //$this.html(sum($this.attr('likes_count'), 1));
                    }
                })
                .done(function (data) {
                    //$this.html('Liked');
                    //$('.videme_showcase_stars_count').html(parseFloat($this.attr('stars_count')) + 1);
                    var likes_count = parseFloat($this.attr('likes_count')) - 1;
                    //$this.addClass('disabled');
                    //$('#videme_showcase_stars_icon').addClass('fa-star-o');
                    /*$(".videme-showcase-stars").html('<div class="btn-group" role="group" aria-label="Stars">\
                    <button type="button" class="btn btn-secondary btn-sm set_star" stars_count="' + stars_count + '" item_id="' + $this.attr('item_id') + '"><i id="videme_showcase_stars_icon" class="fa fa-star" aria-hidden="true"></i>&nbsp;Star</button>\
                    <button type="button" class="btn btn-light btn-sm videme_showcase_stars_count">' + stars_count + '</button>\
                    </div>');
                    $this.html();*/
                    $('#' + $this.attr('btn_group_likes_id')).html('<div class="btn-group float-right" role="group" aria-label="likes" id="' + $this.attr('btn_group_likes_id') + '">\
                    <button type="button" class="btn btn-secondary btn-sm videme-relation-card-button-connect set_like_multy" \
                    likes_count="' + likes_count + '" item_id="' + $this.attr('item_id') + '"\
                    btn_group_likes_id="' + $this.attr('btn_group_likes_id') + '">\
                    <i class="fa fa-thumbs-up" aria-hidden="true"></i>&nbsp;Like</button>\
                    <button type="button" class="btn btn-light btn-sm videme_showcase_likes_count">' + likes_count + '</button>\
                    </div>');
                })
                .fail(function (data) {
                    $this.html('-');
                })
                .always(function () {
                });
        } else {
            //$('.videme-list-list').html(showError("No file"));
        }
    } else {
        //$('#modal-list').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
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
    if ($.cookie('vide_nad')) {
        if ($this.attr('message_id')) {
            $(".videme_item_card_messages").showItemCard({'item_id': $this.attr('item_id')});
            $('.videme-del-list').html("\
                <div class='videme-progress'></div>\
                <button type='button' class='btn btn-primary' data-dismiss='modal'>\
                Сancel\
                </button> \
                <a class='del-inbox-url' href='https://api.vide.me/v2/message/inbox/delete/?message_id=" + $this.attr('message_id') + "&nad=" + $.cookie('vide_nad') + "' target='_blank'>\
                <button type='button' class='btn btn-danger' id='do'>\
                Delete\
                </button>\
                </a>");
        } else {
            $('.videme-del-list').html(showError("No message"));
        }
    } else {
        //$('#modal-del-inbox').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

/*************************************************************
 v2 Событие 3: нажата кнопка вызова и отрисовки
 кнопки удалить Sent в модальном окне
 **************************************************************/
$(document).on('click', '.del-sent-toggle', function (event) {
    console.log(".del-sent-toggle -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        if ($('.del-sent-toggle').attr('message_id')) {
            $(".videme_item_card_messages").showItemCard({'item_id': $this.attr('item_id')});
            $('.videme-del-list').html("\
                <div class='videme-progress'></div>\
                <button type='button' class='btn btn-primary' data-dismiss='modal'>\
                Сancel\
                </button> \
                <a class='del-sent-url' href='https://api.vide.me/v2/message/sent/delete/?message_id=" + $('.del-sent-toggle').attr('message_id') + "&nad=" + $.cookie('vide_nad') + "' target='_blank'>\
                <button type='button' class='btn btn-danger' id='do'>\
                Delete\
                </button>\
                </a>");
        } else {
            $('.videme-del-list').html(showError("No file"));
        }
    } else {
        //$('#modal-del-sent').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
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
    var feedback = 'https://www.vide.me/web/posts/my/';
    if (!$.isEmptyObject($this.attr('feedback'))) {
        feedback = $this.attr('feedback');
    }
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            var item_id = $this.attr('item_id');
            console.log(".del-my-toggle -----> item_id: ", item_id);
            $(".videme_item_card_del").showItemCard({'item_id': $this.attr('item_id')});
            $('.videme-del-list').html("\
                <div class='videme-progress'></div>\
                <button type='button' class='btn btn-primary' data-dismiss='modal'>\
                    Сancel\
                </button> \
                <a class='del-my-url' item_id='https://api.vide.me/v2/items/my/delete/?item_id=" + $this.attr('item_id') + "&nad=" + $.cookie('vide_nad') + "' target='_blank' feedback='" + feedback + "'>\
                <button type='button' class='btn btn-danger' id='do'>\
                Delete\
                </button>\
                </a>");
        } else {
            $('.videme-contact-list').html(showError("No file"));
        }
    } else {
        //$('#modal-del').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

/*************************************************************
 v2 del-my-post-toggle
 **************************************************************/
$(document).on('click', '.del-my-post-toggle', function (event) {
    console.log(".del-my-post-toggle -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            //$(".videme_item_card").itemCard($this);
            $('.videme-del-list').html("\
                <div class='videme-progress'></div>\
                <button type='button' class='btn btn-primary' data-dismiss='modal'>\
                    Сancel\
                </button> \
                <a class='del-my-post-url' href='https://api.vide.me/v2/posts/my/delete/?post_id=" + $this.attr('post_id') + "&nad=" + $.cookie('vide_nad') + "' target='_blank'>\
                <button type='button' class='btn btn-danger' id='do'>\
                Delete\
                </button>\
                </a>");
        } else {
            $('.videme-del-list').html(showError("No file"));
        }
    } else {
        //$('#modal-del-post').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

/*************************************************************
 v2 Событие 2: нажата кнопка вызова и отрисовки
 кнопки удалить Relation в модальном окне
 **************************************************************/
$(document).on('click', '.friendship-del-toggle', function (event) {
    console.log(".friendship-del-toggle -----> click");
    event.stopPropagation();
    var $this = $(this);
    var feedback = 'https://www.vide.me/web/my_friends/';
    if (!$.isEmptyObject($this.attr('feedback'))) {
        feedback = $this.attr('feedback');
    }
    if ($.cookie('vide_nad')) {
        if ($this.attr('user_id')) {
            //var item_id = $this.attr('item_id');
            //console.log(".del-my-toggle -----> item_id: ", item_id);
            //$(".videme_item_card_del").showItemCard({'item_id': $this.attr('item_id')});
            /*$('.videme-del-list').html("\
                <div class='videme-progress'></div>\
                <button type='button' class='btn btn-primary' data-dismiss='modal'>\
                    Сancel\
                </button> \
                <a class='del-my-url' href='https://api.vide.me/v2/relation/delete/?user_id=" +  $this.attr('user_id') + "' target='_blank' feedback='" + feedback + "'>\
                <button type='button' class='btn btn-danger' id='do'>\
                Delete\
                </button>\
                </a>");*/
            $.fn.showUserCardBySpring({
                showcaseSpringCard: '.videme_spring_card',
                spring: $this.attr('spring')
            })
            $('.videme-modal-friend-delete-place').html($this.attr('user_display_name'));
            $('#videme_friendship_del_submit').attr('href', 'https://api.vide.me/v2/friendship/delete/?to_user_id=' +  $this.attr('user_id') + '&nad=' + $.cookie('vide_nad')).attr('feedback', feedback);
        } else {
            $('#videme_friendship_del_submit').html('Error');
        }
    } else {
        //$('#modal-del-friendship').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

/*************************************************************
 v2 embed-code-toggle
 **************************************************************/
$(document).on('click', '.embed-code-toggle', function (event) {
    console.log(".embed-code-toggle -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($this.attr('item_id')) {
        var nest_li = $this.attr('nest_li');
        console.log('toggle nest_li ' + nest_li);
        var li_width = Math.round($('#' + nest_li).width());
        var li_height = Math.round($('#' + nest_li).height()) + 17;
        console.log('1 ' + nest_li + ' 1 --- ' + li_width + 'x' + li_height);
        //$(".videme_item_card").itemCard($this);
        /*$('.videme-embed-code').html("<textarea name='embed' rows='3' class='input_embed'>" +
            "<iframe src='https://api.vide.me/embed/?i=" + $this.attr('item_id') + "' width='" + li_width + "' height='" + li_height + "' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\n" +
            "<p><a href='https://vide.me/v/?m=" + $this.attr('item_id') + "'>" + $this.attr('title') + "</a> from user <a href=\"https://vide.me/" + $this.attr('spring') + "\">" + $this.attr('user_display_name') + "</a> on <a href=\"https://vide.me\">Vide.me</a>.</p>" +
            "</textarea></p>");*/
        $('.videme-embed-code').html("<textarea name='embed' rows='3' class='input_embed'>" +
            "<iframe src='https://api.vide.me/embed/?i=" + $this.attr('item_id') + "' width='" + li_width + "' height='" + li_height + "' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>" +
            "</textarea></p>");
    } else {
        $('.videme-del-list').html(showError("No file"));
    }
});

/*************************************************************
 v3 embed-code-toggle-v3
 **************************************************************/
$(document).on('click', '.embed-code-toggle-v3', function (event) {
    console.log(".embed-code-toggle-v3 -----> click");
    event.stopPropagation();
    var $this = $(this);
    if ($this.attr('item_id')) {
        //console.info('embed-code-toggle-v3 click itemscope.width ' + $('#itemscope').width());
        //console.info('embed-code-toggle-v3 click itemscope.height ' + $('#itemscope').height());
        //var embed_width = Math.round($('#itemscope').width());
        var embed_width = 560;
        //var embed_height = Math.round($('#itemscope').height() * (560 / Math.round($('#itemscope').width())));
        var embed_height = Math.round($('#videme-showcase-item-cover').height() * (560 / Math.round($('#videme-showcase-item-cover').width())));
        var iframe = "<iframe src='https://api.vide.me/embed/?i=" + $this.attr('item_id') + "' width='" + embed_width + "' height='" + embed_height + "' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen scrolling='no'></iframe>";
        $('.videme-embed-example').html(iframe);
        $('.videme-embed-code').html("<textarea name='embed' rows='3' class='input_embed'>" + iframe + "</textarea>");
    } else {
        $('.videme-embed-example').html(showError("No file"));
    }
});

/*************************************************************
 v2 ecopy-link-toggle
 **************************************************************/
$(document).on('click', '.copy-link-toggle', function (event) {
    console.log(".copy-link-toggle -----> click");
    event.stopPropagation();
    var $this = $(this);
    var link = "https://www.vide.me/v/m=" + $this.attr('item_id') + "'>https://www.vide.me/v/m=" + $this.attr('item_id');
    if (!$.isEmptyObject($this.attr('item_id'))) {
        if (!$.isEmptyObject($this.attr('type'))) {
            switch ($this.attr('type')) {
                case 'video':
                    link = "https://www.vide.me/v/m=" + $this.attr('item_id');
                    break;
                case 'image':
                    link = "https://www.vide.me/i/i=" + $this.attr('item_id');
                    break;
                case 'article':
                    link = "https://www.vide.me/a/a=" + $this.attr('item_id');
                    break;
                case 'event':
                    link = "https://www.vide.me/a/e=" + $this.attr('item_id');
                    break;
            }
        }
        $('.videme-copy-link').html("<a class='videme-copy-link-title' href='" + link + "'>" + $this.attr('title') + "</a><p>" + link + "</p><div class='videme-copy-link-target hidden' id='videme-copy-link-target'>" + link + "</div>");
        $('.videme-copy-link-result').empty();
    } else {
        $('.videme-copy-link-result').html(showError("No item"));
    }
});

//Developed by Giri Annamalai M
//This is simple jquery plugin to copy the text inside a text box or textarea.
//Its simple code to starters who want to create jquery plugins on their own.
//Happy Coding!

$.fn.copyme = function () {
    $('span[id^="success-alert"]').remove();
    this.select();
    $(this).focus();
    document.execCommand("copy");
    document.getSelection().removeAllRanges();
    $(this).after('<span id="success-alert"><br>Copied to clipboard</span>');
    $('#success-alert').css("color", "green");
};

function copyToClipboard(elem) {
    // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }

    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    //$(this).after('<span id="success-alert"><br>Copied to clipboard</span>');
    //$('#success-alert').css("color", "green");
    return succeed;
}

$(document).on('click', '.embed_copy', function (event) {
    $('textarea').copyme();
});

$(document).on('click', '.copy_link', function (event) {
    console.log(".copy_link -----> click");
    //$('a.videme-copy-link-target').copyme();
    copyToClipboard(document.getElementById("videme-copy-link-target"));
    $('.videme-copy-link-result').html('<span id="success-alert"><br>Copied to clipboard</span>').css("color", "green");
});

/*************************************************************
 v2 Событие 1: нажата кнопка вызова и отрисовки
 кнопки edit MY
 **************************************************************/
$(document).on('click', '.item-edit-toggle', function (event) {
    console.log(".item-edit-toggle -----> click");
    //event.stopPropagation();
    var $this = $(this);
    /*    if ($this.attr('item_id')) {
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
        }*/

    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            var item_id = $this.attr('item_id');
            console.log(".contact-toggle -----> item_id: ", item_id);

            /*$(".videme_item_card_edit").showItemCard({'item_id': $this.attr('item_id')});*/
            //$(".videme_item_card").itemCard($this);
            $('#nad').val($.cookie('vide_nad'));
            $('#item_id').val($this.attr('item_id'));

            if ($this.attr('cover')) {
                $('#videme_item_edit_image').attr('src', origin_img_vide_me + $this.attr('cover'));
                //$('#videme_item_edit_image_now').attr('src', 'https://s3.amazonaws.com/img.vide.me/' + $this.attr('cover'));
            } else {
                $('#videme_item_edit_image').attr('src', origin_static_vide_me + 'select_image.png');
                //$('#videme_item_edit_image_now').attr('src', 'https://s3.amazonaws.com/img.vide.me/' + $this.attr('item_id') + '.jpg');
            }
            $('#videme_item_edit_image_item').attr('src', origin_img_vide_me + $this.attr('item_id') + '.jpg');

            $('#cover').val($this.attr('cover'));
            $('#title').val($this.attr('title'));
            $('#content').val($this.attr('content'));
            //$('#access').val($this.attr('access'));
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
                    $("#tags").html('<a href="https://www.vide.me/search/?q=' + value + '" class="badge badge-primary">' + value + '</span> ');

                });
            } else {
                //console.log("$.fn.showcaseText showcaseTextSettings.tags -----> empty");
            }
            if ($this.attr('ext_links')) { // TODO: dobble
                console.log("item-edit-toggle ----->" + JSON.stringify($this.attr('ext_links')));
                var links = '';
                var element = '';
                array_ext_links2 = $.parseJSON($this.attr('ext_links'));
                $.each(array_ext_links2, function (key, value) {
                    //console.log("$.fn.showcaseText tags -----> " + value);
                    //links += '&nbsp;<a href="' + value.link + '" target="_blank" class="badge badge-primary">' + value.title + '</span> ';
                    element += '&nbsp;' + "\
<input type=\"hidden\" name=\"ext_links[" + value.title + "][title]\" value=\"" + value.title + "\" class='" + value.title + "'\">\
<input type=\"hidden\" name=\"ext_links[" + value.title + "][link]\" value=\"" + value.link + "\" class='" + value.title + "'\">\
<a class=\"badge badge-primary " + value.title + "\" href='" + value.link + "' target='_blank'> " +
                        value.title +
                        "<a class=\"ext_link_remove\" href=\"#\" ext_link_title=\"" + value.title + "\"><i class=\"fa fa-remove\"></i></a></a>";

                });
                //$(".add_ext_links").append('<div class="videme_item_info_element"><i class="fa fa-external-link videme_item_info_icon" item_id="' + $this.attr('item_id') + '"><div class="videme_item_info_val">' + links + '</div></i></div>');


                $(".add_ext_links").html(element);
                //element.hide().slideDown(500);
            }
        } else {
            $('.videme-contact-list').html(showError("No file"));
        }
    } else {
        console.log("item-edit-toggle -----> no login");
        //$('#modal-item-edit').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

$(document).on('click', '.article-edit-toggle', function (event) {
    console.log(".article-edit-toggle -----> click");
    event.stopPropagation();
    var $this = $(this);

    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            var item_id = $this.attr('item_id');
            console.log(".contact-toggle -----> item_id: ", item_id);

            $(".videme_item_card_edit").showItemCard({'item_id': $this.attr('item_id')});
            //$(".videme_item_card").itemCard($this);
            $('#nad').val($.cookie('vide_nad'));
            $('#item_id').val($this.attr('item_id'));

            if ($this.attr('cover')) {
                $('#videme_item_edit_image').attr('src', origin_img_vide_me + $this.attr('cover'));
                //$('#videme_item_edit_image_now').attr('src', 'https://s3.amazonaws.com/img.vide.me/' + $this.attr('cover'));
            } else {
                $('#videme_item_edit_image').attr('src', origin_static_vide_me + 'select_image.png');
                //$('#videme_item_edit_image_now').attr('src', 'https://s3.amazonaws.com/img.vide.me/' + $this.attr('item_id') + '.jpg');
            }
            $('#videme_item_edit_image_item').attr('src', origin_img_vide_me + $this.attr('item_id') + '.jpg');

            $('#cover').val($this.attr('cover'));
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
                    $("#tags").html('<a href="https://www.vide.me/search/?q=' + value + '" class="badge badge-primary">' + value + '</span> ');

                });
            } else {
                //console.log("$.fn.showcaseText showcaseTextSettings.tags -----> empty");
            }
        } else {
            $('.videme-contact-list').html(showError("No file"));
        }
    } else {
        //$('#modal-item-edit').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

$(document).on('click', '.videme_select_image_submit', function (event) {
    console.log(".videme_select_image_submit -----> click");
    //event.stopPropagation();
    //var $this = $(this);
    //if ($this.attr('item_id')) {
    //$('#modal-select-image').modal('hide');
    $('.sel-image').html($(".image-picker").val());
    $('#cover').val($(".image-picker").val());
    //$('.card-img-top').attr('src', $( ".image-picker" ).val());
    $('#videme_item_edit_image').attr('src', origin_img_vide_me + $(".image-picker").val()).removeClass('hidden');
    $('#videme_item_edit_image_now').attr('src', origin_img_vide_me + $(".image-picker").val());
    var item_id = $('select[name=image-picker]').val();
    console.log(".videme_select_image_submit -----> click", $(".image-picker").val());
    console.log(".videme_select_image_submit -----> item_id " + item_id);
    console.log(".videme_select_image_submit -----> cover", $(".image-picker").val('cover'));
    console.log(".videme_select_image_submit -----> text", $(".image-picker").text());

    //$( ".image-picker" ).val();
    //} else {
    $('#modal-select-image').modal('hide');
    //$('#modal-signin').modal('show');
    //$('#feedback').val(window.location.href);
    //}
});

$(document).on('click', '.videme_select_video_submit', function (event) {
    console.log(".videme_select_video_submit -----> click");
    //event.stopPropagation();
    //var $this = $(this);
    //if ($this.attr('item_id')) {
    //$('#modal-select-image').modal('hide');
    //$('.sel-image').html($(".image-picker").val());
    $('#cover_video').val($(".video-picker-create-article").val());
    //$('.card-img-top').attr('src', $( ".image-picker" ).val());
    $('#videme_item_edit_video').attr('src', origin_img_vide_me + $(".video-picker-create-article").val() + '.jpg').removeClass('hidden');
    //$('#videme_item_edit_image_now').attr('src', 'https://s3.amazonaws.com/img.vide.me/' + $(".image-picker").val());

    console.log(".videme_select_video_submit -----> click", $(".image-picker").val());
    console.log(".videme_select_video_submit -----> cover", $(".image-picker").val('cover'));
    console.log(".videme_select_video_submit -----> text", $(".image-picker").text());

    //$( ".image-picker" ).val();
    //} else {
    $('#modal-select-video-true').modal('hide');
    //$('#modal-signin').modal('show');
    //$('#feedback').val(window.location.href);
    //}
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
$(document).on('click', '.del-article-toggle', function (event) { // TODO: remove
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
                //==$this.addClass('hidden');
                $this.removeClass('btn-outline-primary');
                $this.removeClass('relation_connect');
                $this.addClass('btn-primary');
                //$('.spring_relation').html('<a class="btn btn-sm btn-primary videme-relation-card-button-connect" user_id="" href="">Followed</a>');
                $this.html('Followed');
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
        //$('#modal-signin').modal('show');
        //$('#feedback').val(feedback);
        gotoLogin();
    }
});

/*************************************************************
 v2 Press button friend request
 **************************************************************/
$(document).on('click', 'a.friend_request', function (event) {
    console.log("a.friend_request -----> click");
    event.preventDefault();
    var $this = $(this);
    var feedback = $this.attr('feedback');
    if ($.cookie('vide_nad')) {
        var user_id = $this.attr('user_id');
        user_id.replace(/.*(?=#[^\s]+$)/, '');
        $.ajax({
            //type: 'post',
            url: 'https://api.vide.me/v2/friendship/request/?user_id=' + user_id + '&nad=' + $.cookie('vide_nad'),
            beforeSend: function () {
                $.fn.processNotification();
            },
            success: function (msg) {
                //$('#modal-del').modal('hide');
                //$.fn.showRelation();
                /*$.fn.successNotification({
                    msg: msg
                });*/
                $this.addClass('hidden');
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
        //$('#modal-signin').modal('show');
        //$('#feedback').val(feedback);
        gotoLogin();
    }
});
/*************************************************************
 v2 Press button friend accept
 **************************************************************/
$(document).on('click', 'a.friendship_accept', function (event) {
    console.log("a.friendship_accept -----> click");
    event.preventDefault();
    var $this = $(this);
    var feedback = $this.attr('feedback');
    if ($.cookie('vide_nad')) {
        var user_id = $this.attr('user_id');
        user_id.replace(/.*(?=#[^\s]+$)/, '');
        $.ajax({
            //type: 'post',
            url: 'https://api.vide.me/v2/friendship/accept/?user_id=' + user_id + '&nad=' + $.cookie('vide_nad'),
            beforeSend: function () {
                $.fn.processNotification();
            },
            success: function (msg) {
                //$('#modal-del').modal('hide');
                //$.fn.showRelation();
                $.fn.successNotification({
                    msg: msg
                });
                $this.addClass('hidden');
                $.fn.myNetworkActivity();
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
        //$('#modal-signin').modal('show');
        //$('#feedback').val(feedback);
        gotoLogin();
    }
});
/*************************************************************
 v2 Press button friend declined
 **************************************************************/
$(document).on('click', 'a.friendship_declined', function (event) {
    console.log("a.friendship_declined -----> click");
    event.preventDefault();
    var $this = $(this);
    var feedback = $this.attr('feedback');
    if ($.cookie('vide_nad')) {
        var user_id = $this.attr('user_id');
        user_id.replace(/.*(?=#[^\s]+$)/, '');
        $.ajax({
            //type: 'post',
            url: 'https://api.vide.me/v2/friendship/declined/?user_id=' + user_id + '&nad=' + $.cookie('vide_nad'),
            beforeSend: function () {
                $.fn.processNotification();
            },
            success: function (msg) {
                //$('#modal-del').modal('hide');
                //$.fn.showRelation();
                $.fn.successNotification({
                    msg: msg
                });
                $this.addClass('hidden');
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
        //$('#modal-signin').modal('show');
        //$('#feedback').val(feedback);
        gotoLogin();
    }
});
/*************************************************************
 v2 Press button Unfollow relation delete
 **************************************************************/
$(document).on('click', 'a.relation_delete', function (event) {
    console.log("a.relation_delete -----> click");
    event.preventDefault();
    var $this = $(this);
    var feedback = 'https://www.vide.me/web/my_friends/';
    if (!$.isEmptyObject($this.attr('feedback'))) {
        feedback = $this.attr('feedback');
    }
    if ($.cookie('vide_nad')) {
        var user_id = $this.attr('user_id');
        //user_id.replace(/.*(?=#[^\s]+$)/, '');
        $.ajax({
            //type: 'post',
            //url: 'https://api.vide.me/v2/relation/delete/?to_user_id=' + user_id + '&nad=' + $.cookie('vide_nad'),
            url: $this.attr('href'),
            beforeSend: function () {
                //$.fn.processNotification();
                //$('.videme-nav-spinner').removeClass('hidden');
            },
            success: function (msg) {
                //$('#modal-del').modal('hide');
                //$.fn.showRelation();
                /*$.fn.successNotification({
                    msg: msg
                });*/
                //$this.addClass('hidden');
                //$.fn.showImFollowing();
                //$('.videme-nav-spinner').addClass('hidden');
                $this.html('Unwollowed');
            },
            error: function (msg) {
                //$('#modal-del').modal('hide');
                //$.fn.showRelation();
                //$('.videme-nav-spinner').addClass('hidden');
                /*$.fn.errorNotification({
                    msg: msg
                });*/
            }
        });
    } else {
        //$('#modal-signin').modal('show');
        //$('#feedback').val(feedback);
        gotoLogin();
    }
});

/*************************************************************
 v2 Press button essence_join
 **************************************************************/
$(document).on('click', 'a.essence_join', function (event) {
    console.log("a.essence_join -----> click");
    event.preventDefault();
    var $this = $(this);
    //$('#modal-create-new-essence-to-me').modal('show');
    var feedback = 'https://www.vide.me/web/my_friends/';
    if (!$.isEmptyObject($this.attr('feedback'))) {
        feedback = $this.attr('feedback');
    }
    if ($.cookie('vide_nad')) {
        if ($this.attr('ue_id')) {
            $.fn.showUserCardBySpring({
                showcaseSpringCard: '.videme_spring_card',
                spring: $this.attr('spring')
            })
            //$('.videme-modal-friend-delete-place').html($this.attr('user_display_name'));
            //var title = $('#create-new-essence-to-me-title').val();
            //console.log("a.essence_join title -----> " + title);
            $('.create-new-essence-to-me_submit').attr('href', 'https://api.vide.me/v2/essences/join/?ue_id=' + $this.attr('ue_id') + '&nad=' + $.cookie('vide_nad'));
        } else {
            $('.create-new-essence-to-me_submit').html('Error');
        }
    } else {
        //$('#modal-del-friendship').modal('hide');
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});
/*************************************************************
 v2 Press button partner_invite
 **************************************************************/
$(document).on('click', 'a.partner_invite', function (event) {
    console.log("a.partner_invite -----> click");
    event.preventDefault();
    var $this = $(this);
    //$('#modal-create-new-essence-to-me').modal('show');
    //var feedback = 'https://www.vide.me/web/my_friends/';
    /*if (!$.isEmptyObject($this.attr('feedback'))) {
        feedback = $this.attr('feedback');
    }*/
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            $.fn.showUserCardBySpring({spring: $this.attr('spring')})
            //$('.videme-modal-friend-delete-place').html($this.attr('user_display_name'));
            //var title = $('#create-new-essence-to-me-title').val();
            $('#partner-invite-item_id').val($this.attr('item_id'));
            $('#partner-invite-partner_id').val($this.attr('partner_id'));
            //console.log("a.essence_join title -----> " + title);
            //$('.partner-invite_submit').attr('href', 'https://api.vide.me/v2/partners/invite/?item_id=' + $this.attr('item_id') + '&partner_id=' + $this.attr('partner_id') + '&nad=' + $.cookie('vide_nad'));
        } else {
            $('.partner-invite_submit').html('Error');
        }
    } else {
        gotoLogin();
    }
});
/*************************************************************
 v2 Press button partner_invite_request
 **************************************************************/
$(document).on('click', 'a.partner_invite_request', function (event) {
    console.log("a.partner_invite_request -----> click");
    event.preventDefault();
    var $this = $(this);
    //$('#modal-create-new-essence-to-me').modal('show');
    //var feedback = 'https://www.vide.me/web/my_friends/';
    /*if (!$.isEmptyObject($this.attr('feedback'))) {
        feedback = $this.attr('feedback');
    }*/
    if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            //$.fn.showUserCardBySpring({spring: $this.attr('spring')})
            //$('.videme-modal-friend-delete-place').html($this.attr('user_display_name'));
            //var title = $('#create-new-essence-to-me-title').val();
            $('#partner-invite-item_id').val($this.attr('item_id'));
            $('#partner-invite-partner_id').val($this.attr('partner_id'));
            //console.log("a.essence_join title -----> " + title);
            //$('.partner-invite_submit').attr('href', 'https://api.vide.me/v2/partners/invite/?item_id=' + $this.attr('item_id') + '&partner_id=' + $this.attr('partner_id') + '&nad=' + $.cookie('vide_nad'));
            $.ajax({
                //type: 'post',
                url: 'https://api.vide.me/v2/partners/join/request/?item_id=' + $this.attr('item_id') + '&nad=' + $.cookie('vide_nad'),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    //$('#modal-del').modal('hide');
                    //$.fn.showRelation();
                    $.fn.successNotification({
                        msg: msg
                    });
                    //$this.addClass('hidden');
                    //$.fn.showEssenceFromMePending();
                    if (!$.isEmptyObject(msg)) {
                        var tempObject = $('.videme_user_card');
                        if (!$.isEmptyObject(msg.partner_info)) {
                            // new partnership
                            $('#modal-partner-invite').modal('show');
                            tempObject.html(showTileDoorbellSignSmall(
                                parsePartnersInviteRequestForDoorbellSign({0: msg}), tempObject
                            ));
                        } else {
                            // exist partnership
                            //tempObject.html('');
                            //modalPartnerDeletePadding($this);
                            /*modalPartnerDeletePadding({'partner-invite-item_id': $this.attr('item_id'),
                            'partner-invite-partner_id': $this.attr('partner_id')});*/
                            if (msg.status == 0) {
                                modalPartnerDeletePadding(msg);
                                $('.videme-modal-partnership-status').html('Partnership pending');
                            }
                            if (msg.status == 1) {
                                modalPartnerDeletePadding(msg);
                                $('.videme-modal-partnership-status').html('Partnership confirm');
                            }
                            if (msg.status == 2) {
                                modalPartnerDeletePadding(msg);
                                $('.videme-modal-partnership-status').html('Partnership declined');
                            }
                        }
                    } else {
                        console.warn("$.fn.showFriendsMy data -----> no");
                        //tempObject.html("No friends");
                        tempObject.html("");
                    }
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
            $('.partner-invite_submit').html('Error');
        }
    } else {
        gotoLogin();
    }
});

/*************************************************************
 v2 Press button partner_delete
 **************************************************************/
$(document).on('click', 'a.partner_delete', function (event) {
    console.log("a.partner_delete -----> click");
    event.preventDefault();
    var $this = $(this);
    //$('#modal-create-new-essence-to-me').modal('show');
    //var feedback = 'https://www.vide.me/web/my_friends/';
    /*if (!$.isEmptyObject($this.attr('feedback'))) {
        feedback = $this.attr('feedback');
    }*/
    /*if ($.cookie('vide_nad')) {
        if ($this.attr('item_id')) {
            $.fn.showUserCardBySpring({spring: $this.attr('spring')})
            //$('.videme-modal-friend-delete-place').html($this.attr('user_display_name'));
            //var title = $('#create-new-essence-to-me-title').val();
            $('#partner-delete-item_id').val($this.attr('item_id'));
            $('#partner-delete-partner_id').val($this.attr('partner_id'));
            //console.log("a.essence_join title -----> " + title);
            //$('.partner-invite_submit').attr('href', 'https://api.vide.me/v2/partners/invite/?item_id=' + $this.attr('item_id') + '&partner_id=' + $this.attr('partner_id') + '&nad=' + $.cookie('vide_nad'));
        } else {
            $('.partner-delete_submit').html('Error');
        }
    } else {
        gotoLogin();
    }*/
    modalPartnerDeletePadding({'spring': $this.attr('spring'), 'ip_id': $this.attr('ip_id'), 'item_id': $this.attr('item_id'), 'partner_id': $this.attr('partner_id')});
});



/*************************************************************
 v2 Press button partner_accept
 **************************************************************/
$(document).on('click', 'a.partner_accept', function (event) { // 27072022
    console.log("a.partner_accept -----> click");
    event.preventDefault();
    var $this = $(this);
    var ip_id = $this.attr('ip_id');
    if ($.cookie('vide_nad')) {
        if ($this.attr('ip_id')) {
            $.ajax({
                //type: 'post',
                url: 'https://api.vide.me/v2/partners/accept/?ip_id=' + ip_id + '&nad=' + $.cookie('vide_nad'),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    //$('#modal-del').modal('hide');
                    //$.fn.showRelation();
                    $.fn.successNotification({
                        msg: msg
                    });
                    $this.addClass('hidden');
                    $.fn.showPartnersPendingToMe();
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
            //$('.partner-delete_submit').html('Error');
        }
    } else {
        gotoLogin();
    }
});

/*************************************************************
 v2 Press button partner_decline
 **************************************************************/
$(document).on('click', 'a.partner_decline', function (event) {
    console.log("a.partner_decline -----> click");
    event.preventDefault();
    var $this = $(this);
    var ip_id = $this.attr('ip_id');
    if ($.cookie('vide_nad')) {
        if ($this.attr('ip_id')) {
            $.ajax({
                //type: 'post',
                url: 'https://api.vide.me/v2/partners/decline/?ip_id=' + ip_id + '&nad=' + $.cookie('vide_nad'),
                beforeSend: function () {
                    $.fn.processNotification();
                },
                success: function (msg) {
                    $.fn.successNotification({
                        msg: msg
                    });
                    $this.addClass('hidden');
                    $.fn.showPartnersPendingToMe();
                },
                error: function (msg) {
                    $.fn.errorNotification({
                        msg: msg
                    });
                }
            });
        } else {
            //$('.partner-delete_submit').html('Error');
        }
    } else {
        gotoLogin();
    }
});

/*************************************************************
 v2 Press button essence ref accept
 **************************************************************/
$(document).on('click', 'a.essence_from_me_accept_ref', function (event) {
    console.log("a.essence_from_me_accept_ref -----> click");
    event.preventDefault();
    var $this = $(this);
    //var feedback = $this.attr('feedback');
    if ($.cookie('vide_nad')) {
        var ure_id = $this.attr('ure_id');
        var ue_id = $this.attr('ue_id');
        //user_id.replace(/.*(?=#[^\s]+$)/, '');
        $.ajax({
            //type: 'post',
            url: 'https://api.vide.me/v2/essences/accept/?ure_id=' + ure_id + '&ue_id=' + ue_id + '&nad=' + $.cookie('vide_nad'),
            beforeSend: function () {
                $.fn.processNotification();
            },
            success: function (msg) {
                //$('#modal-del').modal('hide');
                //$.fn.showRelation();
                $.fn.successNotification({
                    msg: msg
                });
                $this.addClass('hidden');
                $.fn.showEssenceFromMePending();
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
        //$('#modal-signin').modal('show');
        //$('#feedback').val(feedback);
        gotoLogin();
    }
});

/*************************************************************
 v2 Press button essence delete from me
 **************************************************************/
$(document).on('click', 'a.essence_from_me_delete', function (event) {
    console.log("a.essence_from_me_delete -----> click");
    event.preventDefault();
    var $this = $(this);
    var feedback = $this.attr('feedback');
    if ($.cookie('vide_nad')) {
        var ure_id = $this.attr('ure_id');
        var ue_id = $this.attr('ue_id');
        //user_id.replace(/.*(?=#[^\s]+$)/, '');
        $.ajax({
            //type: 'post',
            url: 'https://api.vide.me/v2/essences/delete_from/?ure_id=' + ure_id + '&ue_id=' + ue_id + '&nad=' + $.cookie('vide_nad'),
            beforeSend: function () {
                $.fn.processNotification();
            },
            success: function (msg) {
                //$('#modal-del').modal('hide');
                //$.fn.showRelation();
                $.fn.successNotification({
                    msg: msg
                });
                $this.addClass('hidden');
                $.fn.showEssenceFromMePending();
                $.fn.showEssenceFromMe();
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
        //$('#modal-signin').modal('show');
        //$('#feedback').val(feedback);
        gotoLogin();
    }
});

/*************************************************************
 v2 Press button essence delete to me
 **************************************************************/
$(document).on('click', 'a.essence_to_me_delete', function (event) {
    console.log("a.essence_to_me_delete -----> click");
    event.preventDefault();
    var $this = $(this);
    var feedback = $this.attr('feedback');
    if ($.cookie('vide_nad')) {
        var ure_id = $this.attr('ure_id');
        //var ue_id = $this.attr('ue_id');
        //user_id.replace(/.*(?=#[^\s]+$)/, '');
        $.ajax({
            //type: 'post',
            url: 'https://api.vide.me/v2/essences/delete_to/?ure_id=' + ure_id + '&nad=' + $.cookie('vide_nad'),
            beforeSend: function () {
                $.fn.processNotification();
            },
            success: function (msg) {
                //$('#modal-del').modal('hide');
                //$.fn.showRelation();
                $.fn.successNotification({
                    msg: msg
                });
                $this.addClass('hidden');
                $.fn.showEssenceToMePending();
                $.fn.showEssenceToMe();
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
        //$('#modal-signin').modal('show');
        //$('#feedback').val(feedback);
        gotoLogin();
    }
});

/*************************************************************
 v2 Press button show chart for item
 **************************************************************/
$(document).on('click', 'button.chart_item_mel_toggle', function (event) {
    console.log("button.chart_item_mel_toggle -----> click");
    event.preventDefault();
    let $this = $(this);
    let item_id = $this.attr('item_id');
    var toggled = $('#videme-chart-stump_' + item_id).attr('toggled');
    if ($.isEmptyObject(toggled) || toggled == 'true') {
        $('#videme-chart-stump_' + item_id).attr('toggled', 'true');
        $('#videme-chart-button-1st1months_' + item_id).removeClass('text-bg-secondary').addClass('text-bg-primary');
        $('#videme-chart-stump_' + item_id).attr('time_shift_type', 'm_stop').attr('time_shift_val', '1');
        $.fn.showChartShareItem({
            item: item_id,
            showChartShareItemId: 'videme-item-chart-canvas_' + item_id,
            m_stop: '1'
        });
        $.fn.showChartPopStates({
            item: item_id,
            showChartPopStatesId: 'videme-chart-pop-states-place_' + item_id
        });
    }
});

/*************************************************************
 Nas second Press button partners to me
 **************************************************************/
$(document).on('click', 'a.videme-nav-partners-pending-to-me', function (event) {
    console.log("a.videme-nav-partners-pending-to-me -----> click");
    event.preventDefault();
    //var $this = $(this);
    if ($.cookie('vide_nad')) {
        $('#videme-modal-partnership-status').attr('videme-callback-function', 'showPartnersPendingToMe');
        $.fn.showPartnersPendingToMe({});
    } else {
        //$('#modal-signin').modal('show');
        //$('#feedback').val(feedback);
        gotoLogin();
    }
});
/*************************************************************
 Nas second Press button partners common
 **************************************************************/
$(document).on('click', 'a.videme-nav-partners-pending', function (event) {  // 27072022
    console.log("a.videme-nav-partners-pending -----> click");
    event.preventDefault();
    //var $this = $(this);
    if ($.cookie('vide_nad')) {
        $('#videme-modal-partnership-status').attr('videme-callback-function', 'showPartnersPending');
        $.fn.showPartnersPending({});
    } else {
        //$('#modal-signin').modal('show');
        //$('#feedback').val(feedback);
        gotoLogin();
    }
});
/*************************************************************
 Nas second Press button partners declined
 **************************************************************/
$(document).on('click', 'a.videme-nav-partners-declined', function (event) { // 27072022
    console.log("a.videme-nav-partners-declined -----> click");
    event.preventDefault();
    //var $this = $(this);
    if ($.cookie('vide_nad')) {
        $('#videme-modal-partnership-status').attr('videme-callback-function', 'showPartnersDeclined');
        $.fn.showPartnersDeclined({});
    } else {
        //$('#modal-signin').modal('show');
        //$('#feedback').val(feedback);
        gotoLogin();
    }
});
/*************************************************************
 Nas second Press button partners accepted
 **************************************************************/
$(document).on('click', 'a.videme-nav-partners-accepted', function (event) { // 27072022
    console.log("a.videme-nav-partners-accepted -----> click");
    event.preventDefault();
    //var $this = $(this);
    //var feedback = $this.attr('feedback');
    if ($.cookie('vide_nad')) {
        $('#videme-modal-partnership-status').attr('videme-callback-function', 'showPartnersAccepted');
        $.fn.showPartnersAccepted({});
    } else {
        //$('#modal-signin').modal('show');
        //$('#feedback').val(feedback);
        gotoLogin();
    }
});
/*************************************************************
 Nas second Press button partners from me
 **************************************************************/
$(document).on('click', 'a.videme-nav-partners-pending-from-me', function (event) { // 27072022
    console.log("a.videme-nav-partners-pending-from-me -----> click");
    event.preventDefault();
    //var $this = $(this);
    if ($.cookie('vide_nad')) {
        //$.fn.itemsMyPartnersPendingFromMeScrollV3({});
        $('#videme-modal-partnership-status').attr('videme-callback-function', 'showPartnersPendingFromMe');
        $.fn.showPartnersPendingFromMe({});
    } else {
        //$('#modal-signin').modal('show');
        //$('#feedback').val(feedback);
        gotoLogin();
    }
});

/*************************************************************
 v2 Press button partner delete
 **************************************************************/
//$(document).on('click', 'a.partner_delete', function (event) {
/*$(document).on('click', '.partner_delete', function (event) {
    console.log("a.partner_delete -----> click");
    event.preventDefault();
    var $this = $(this);
    //var feedback = $this.attr('feedback');
    if ($.cookie('vide_nad')) {
        //var ure_id = $this.attr('ure_id');
        //var ue_id = $this.attr('ue_id');
        //user_id.replace(/.*(?=#[^\s]+$)/, '');
        $.ajax({
            //type: 'post',
            url: 'https://api.vide.me/v2/partners/delete/?item_id=' + $this.attr('item_id') + '&partner_id=' + $this.attr('partner_id') + '&nad=' + $.cookie('vide_nad'),
            beforeSend: function () {
                $.fn.processNotification();
            },
            success: function (msg) {
                //$('#modal-del').modal('hide');
                //$.fn.showRelation();
                $.fn.successNotification({
                    msg: msg
                });
                //$this.addClass('hidden');
                var item_id = getParameterByName('i');
                $.fn.showPartnersAll({'item_id': item_id});
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
        //$('#modal-signin').modal('show');
        //$('#feedback').val(feedback);
        gotoLogin();
    }
});*/
/*************************************************************
 v2 Press button task delete
 **************************************************************/
$(document).on('click', 'a.task_delete', function (event) {
    console.log("a.task_delete -----> click");
    event.preventDefault();
    var $this = $(this);
    /*var feedback = 'https://www.vide.me/web/my_friends/';
    if (!$.isEmptyObject($this.attr('feedback'))) {
        feedback = $this.attr('feedback');
    }*/
    if ($.cookie('vide_nad')) {
        //var user_id = $this.attr('user_id');
        //user_id.replace(/.*(?=#[^\s]+$)/, '');
        $.ajax({
            //type: 'post',
            //url: 'https://api.vide.me/v2/relation/delete/?to_user_id=' + user_id + '&nad=' + $.cookie('vide_nad'),
            url: $this.attr('href'),
            beforeSend: function () {
                //$.fn.processNotification();
                //$('.videme-nav-spinner').removeClass('hidden');
            },
            success: function (msg) {
                $.fn.showMyTaskActiveOnly({
                    limit: 6,
                    showcaseMyTask: "#videme-tile-my-tasks"
                });
            },
            error: function (msg) {
                //$('#modal-del').modal('hide');
                //$.fn.showRelation();
                //$('.videme-nav-spinner').addClass('hidden');
                /*$.fn.errorNotification({
                    msg: msg
                });*/
                $this.html('error');
            }
        });
    } else {
        //$('#modal-signin').modal('show');
        //$('#feedback').val(feedback);
        gotoLogin();
    }
});

/******************************************************
 v2 share-panel-button
 **************************************************************/
$(document).on('click', 'a.share-panel-button', function (event) {
    console.log("a.share-panel-button -----> click");
    event.preventDefault();
    var $this = $(this);
    var href = $this.attr('href');
    var feedback = $this.attr('feedback');
    if ($.cookie('vide_nad')) {
        window.location.href = href;
    } else {
        //$('#modal-signin').modal('show');
        //$('#feedback').val(href);
        gotoLogin();
    }
});
/******************************************************
 v2 videme_select_image
 **************************************************************/
$(document).on('click', 'input.videme_select_image', function (event) {
    console.log("a.videme_select_image -----> click");
    //event.preventDefault();
    var $this = $(this);
    //var href = $this.attr('href');
    //var feedback = $this.attr('feedback');
    if ($.cookie('vide_nad')) {
        //window.location.href = href;
        $('#modal-select-image').modal('show');

    } else {
        //$('#modal-signin').modal('show');
        //$('#feedback').val(href);
        gotoLogin();
    }
});
$(document).on('click', 'input.videme_select_image_item', function (event) {
    console.log("a.videme_select_image_item -----> click");
    //event.preventDefault();
    var $this = $(this);
    $('#cover').val('');
});
/*$(document).on('click', '.videme_select_image', function (event) {
    console.log("a.videme_select_image -----> click");
    //event.preventDefault();
    var $this = $(this);
    //var href = $this.attr('href');
    //var feedback = $this.attr('feedback');
    if ($.cookie('vide_nad')) {
        //window.location.href = href;
        $('#modal-select-image').modal('show');

    } else {
        $('#modal-signin').modal('show');
        $('#feedback').val(href);
    }
});*/

$(document).on('click', '.videme_select_video', function (event) {
    console.log("a.videme_select_video -----> click");
    //event.preventDefault();
    var $this = $(this);
    //var href = $this.attr('href');
    //var feedback = $this.attr('feedback');
    if ($.cookie('vide_nad')) {
        //window.location.href = href;
        $('#modal-select-video-true').modal('show');

    } else {
        //$('#modal-signin').modal('show');
        //$('#feedback').val(href);
        gotoLogin();
    }
});


/*************************************************************
 v2 click on create_new_article
 **************************************************************/
$(document).on('click', 'a.create_new_article', function (event) { // 01082022 remove W.A.F
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
    //var href = $this.attr('message_id');
    //var href = $this.attr('href');
    //href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        //type: 'post',
        url: $this.attr('href'),
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $('#modal-del-inbox').modal('hide');
            $.fn.itemsInboxScroll();
            $.fn.successNotification({
                msg: msg
            });
        },
        error: function (msg) {
            $('#modal-del-inbox').modal('hide');
            $.fn.itemsInboxScroll();
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
    //var href = $this.attr('message_id');
    //href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        type: 'post',
        url: $this.attr('href'),
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $('#modal-del-sent').modal('hide');
            $.fn.itemsSentScroll();
            $.fn.successNotification({
                msg: msg
            });
        },
        error: function (msg) {
            $('#modal-del-sent').modal('hide');
            $.fn.itemsSentScroll();
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
    var feedback = 'https://www.vide.me/web/posts/my/';
    if (!$.isEmptyObject($this.attr('feedback'))) {
        feedback = $this.attr('feedback');
    }
    $.ajax({
        type: 'post',
        url: href,
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $('#modal-del').modal('hide');
            //$.fn.fileMy();
            //window.location.reload()
            //window.location.href = "https://www.vide.me/web/my_article/";
            window.location.href = feedback;
            $.fn.successNotification({
                msg: msg
            });
        },
        error: function (msg) {
            $('#modal-del').modal('hide');
            //$.fn.fileMy();
            //window.location.reload()
            window.location.href = feedback; // TODO: wrong responce from server
            $.fn.errorNotification({
                msg: msg
            });
        }
    });
});
/*************************************************************
 v2 Событие 4: нажата ссылка из кнопки удалить файл My
 **************************************************************/
$(document).on('click', 'a.uni-url', function (event) {
    console.log("a.uni-url -----> click");
    event.preventDefault();
    var $this = $(this);
    //var href = $this.attr('item_id');
    //href.replace(/.*(?=#[^\s]+$)/, '');
    var feedback = 'https://www.vide.me/web/posts/my/';
    if (!$.isEmptyObject($this.attr('feedback'))) {
        feedback = $this.attr('feedback');
    }
    if (!$.isEmptyObject($this.attr('href'))) {

        $.ajax({
            type: 'post',
            url: $this.attr('href'),
            beforeSend: function () {
                $.fn.processNotification();
            },
            success: function (msg) {
                $('#modal-del').modal('hide');
                //$.fn.fileMy();
                //window.location.reload()
                //window.location.href = "https://www.vide.me/web/my_article/";
                window.location.href = feedback;
                $.fn.successNotification({
                    msg: msg
                });
            },
            error: function (msg) {
                $('#modal-del').modal('hide');
                //$.fn.fileMy();
                //window.location.reload()
                window.location.href = feedback; // TODO: wrong responce from server
                $.fn.errorNotification({
                    msg: msg
                });
            }
        });
    }
});

/*************************************************************
 v2 del-my-post-url
 **************************************************************/
$(document).on('click', 'a.del-my-post-url', function (event) {
    console.log("a.del-my-post-url -----> click");
    event.preventDefault();
    var $this = $(this);
    var href = $this.attr('href');
    href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        type: 'post',
        url: href,
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $('#modal-del-post').modal('hide');
            $.fn.itemsMyPostsScroll();
            $.fn.successNotification({
                msg: msg
            });
        },
        error: function (msg) {
            $('#modal-del-post').modal('hide');
            $.fn.itemsMyPostsScroll();
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
            window.location.href = "https://www.vide.me/web/my_article/";
        },
        error: function (msg) {
            $('#modal-del-article').modal('hide');
            $.fn.errorNotification({
                msg: msg
            });
            window.location.href = "https://www.vide.me/web/my_article/";
        }
    });
});

/*************************************************************
 v2 Событие 4: нажата ссылка из списка контактов
 **************************************************************/
$(document).on('click', 'a.contact-url', function (event) { //TODO: remove
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
                msg: ''
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
 v2 Событие 4: нажата ссылка из списка контактов
 **************************************************************/
$(document).on('click', 'a.videme_friendship_del_submit', function (event) {
    console.log("a.videme_friendship_del_submit -----> click");
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
            $('#modal-del-friendship').modal('hide');
            $.fn.successNotification({
                msg: ''
            });
        },
        error: function (msg) {
            $('#modal-del-friendship').modal('hide');
            $.fn.errorNotification({
                msg: msg
            });
        }
    });
});

/*************************************************************
 v2 Событие 4: essence_join
 **************************************************************/
$(document).on('click', 'a.create-new-essence-to-me_submit', function (event) {
//$("#create-new-essence-to-me_submit").click(function(event) {
    console.log("create-new-essence-to-me_submit -----> click");
    event.preventDefault();
    var $this = $(this);
    var href = $this.attr('href');
    href += '&title=' + $('#create-new-essence-to-me-title').val();
    href += '&content=' + $('#create-new-essence-to-me-content').val();
    href.replace(/.*(?=#[^\s]+$)/, '');
    $.ajax({
        type: 'get',
        url: href,
        beforeSend: function () {
            $.fn.processNotification();
        },
        success: function (msg) {
            $('#modal-create-new-essence-to-me').modal('hide');
            $.fn.successNotification({
                msg: ''
            });
        },
        error: function (msg) {
            $('#modal-create-new-essence-to-me').modal('hide');
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
    if ($.cookie('vide_nad')) {
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
    } else {
        //$('#modal-signin').modal('show');
        //$('#feedback').val(window.location.href);
        gotoLogin();
    }
});

//$(document).on('click', 'span.videme-chart-button-1st2weeks', function (event) {
$(document).on('click', 'span.videme-chart-button', function (event) {
    //event.preventDefault();
    var $this = $(this);
    var item_id = $this.attr('item_id');
    var time_shift_type = $this.attr('time_shift_type');
    var time_shift_val = $this.attr('time_shift_val');
    var state = $('#videme-chart-stump_' + item_id).attr('state');
    var toggled = $('#videme-chart-stump_' + item_id).attr('toggled');
    if (toggled == 'false') {
        removeURLparam('d_start');
        removeURLparam('d_stop');
        removeURLparam('w_start');
        removeURLparam('w_stop');
        removeURLparam('m_start');
        removeURLparam('m_stop');
        URLUpdate(time_shift_type, time_shift_val);
    }
    $('#videme-chart-stump_' + item_id).attr('time_shift_type', time_shift_type).attr('time_shift_val', time_shift_val);
    //$('.videme-chart-button').removeClass('text-bg-primary').addClass('text-bg-secondary');
    $('.videme-chart-button_' + item_id).removeClass('text-bg-primary').addClass('text-bg-secondary');
    //$('#videme-chart-button-1st2weeks_' + item_id).removeClass('text-bg-secondary').addClass('text-bg-primary');
    $(this).removeClass('text-bg-secondary').addClass('text-bg-primary');
    //$('#videme-item-chart-canvas_' + item_id).remove();
    //$('#videme-item-chart-canvas-place_' + item_id).append('<canvas id="videme-item-chart-canvas_' + item_id + '"></canvas>');
    var param = {
        item: item_id,
        showChartShareItemId: 'videme-item-chart-canvas_' + item_id,
        [time_shift_type]: time_shift_val,
        state: state
    };
    console.log('click span.videme-chart-button-1st2weeks param: ' + JSON.stringify(param));
    $('#videme-item-chart-canvas_' + item_id).showChartShareItem(param);
});
$(document).on('click', 'span.videme-chart-pop-state-button', function (event) {
    //event.preventDefault();
    var $this = $(this);
    var item_id = $this.attr('item_id');
    var state = $this.attr('state');
    var time_shift_val = $('#videme-chart-stump_' + item_id).attr('time_shift_val');
    var time_shift_type = $('#videme-chart-stump_' + item_id).attr('time_shift_type');
    $('#videme-chart-stump_' + item_id).attr('state', state);
    //$('.videme-chart-button').removeClass('text-bg-primary').addClass('text-bg-secondary');
    $('.videme-chart-pop-state-button_' + item_id).removeClass('text-bg-primary').addClass('text-bg-secondary');
    //$('#videme-chart-button-1st2weeks_' + item_id).removeClass('text-bg-secondary').addClass('text-bg-primary');
    $(this).removeClass('text-bg-secondary').addClass('text-bg-primary');
    //$('#videme-item-chart-canvas_' + item_id).remove();
    //$('#videme-item-chart-canvas-place_' + item_id).append('<canvas id="videme-item-chart-canvas_' + item_id + '"></canvas>');
    var param = {
        item: item_id,
        showChartShareItemId: 'videme-item-chart-canvas_' + item_id,
        [time_shift_type]: time_shift_val,
        state: state
    };
    console.log('click span.videme-chart-button-1st2weeks param: ' + JSON.stringify(param));
    $('#videme-item-chart-canvas_' + item_id).showChartShareItem(param);
});
/*
$(document).on('click', 'span.videme-chart-button-1st1months', function (event) {
    //event.preventDefault();
    var $this = $(this);
    var item_id = $this.attr('item_id');
    $('.videme-chart-button').removeClass('text-bg-primary').addClass('text-bg-secondary');
    $('#videme-chart-button-1st1months_' + item_id).removeClass('text-bg-secondary').addClass('text-bg-primary');
    $('#videme-item-chart-canvas_' + item_id).remove();
    $('#videme-item-chart-canvas-place_' + item_id).append('<canvas id="videme-item-chart-canvas_' + item_id + '"></canvas>');
    $('#videme-item-chart-canvas_' + item_id).showChartShareItem({
        item: item_id,
        m_stop: '1'
    });
});
$(document).on('click', 'span.videme-chart-button-last2weeks', function (event) {
    //event.preventDefault();
    var $this = $(this);
    var item_id = $this.attr('item_id');
    $('.videme-chart-button').removeClass('text-bg-primary').addClass('text-bg-secondary');
    $('#videme-chart-button-last2weeks_' + item_id).removeClass('text-bg-secondary').addClass('text-bg-primary');
    $('#videme-item-chart-canvas_' + item_id).remove();
    $('#videme-item-chart-canvas-place_' + item_id).append('<canvas id="videme-item-chart-canvas_' + item_id + '"></canvas>');
    $('#videme-item-chart-canvas_' + item_id).showChartShareItem({
        item: item_id,
        w_stop: '-2'
    });
});
$(document).on('click', 'span.videme-chart-button-last1months', function (event) {
    //event.preventDefault();
    var $this = $(this);
    var item_id = $this.attr('item_id');
    $('.videme-chart-button').removeClass('text-bg-primary').addClass('text-bg-secondary');
    $('#videme-chart-button-last1months_' + item_id).removeClass('text-bg-secondary').addClass('text-bg-primary');
    $('#videme-item-chart-canvas_' + item_id).remove();
    $('#videme-item-chart-canvas-place_' + item_id).append('<canvas id="videme-item-chart-canvas_' + item_id + '"></canvas>');
    $('#videme-item-chart-canvas_' + item_id).showChartShareItem({
        item: item_id,
        m_stop: '-1'
    });
});*/

/* skin tile preview start */


//$('.videme-v4-tile-video_thumbnail-toggle').on('mouseover touchstart touchend touchmove', function(event) {
$(document).on('mouseover touchstart touchend touchmove', '.videme-v4-tile-video_thumbnail-toggle', function (event) {

//var player;
//is_played = false;
//is_pre_played = false;
    var $this = $(this);
    console.log( "toggle <--- mouseover " + $this.attr("item_id") + " time: " + retTimeForLog());
    //==if (!is_pre_played) {
    $('#videme-v4-tile-video_thumbnail-toggle_' + $this.attr("item_id")).addClass('hidden');
    //$('#videme-v4-tile-video_thumbnail-wall_' + $this.attr("item_id")).removeClass('hidden');
    videmeSkinTileShowWall({'item_id': $this.attr("item_id")});
    //==}
    /*      videmeSkinTileSetStateVideoPreview({'item_id': $this.attr("item_id"), 'is_played_state': 'false'});
    var is_played_state = videmeSkinTileGetStateVideoPreview({'item_id': $this.attr("item_id")});
      var is_pre_played_state = videmeSkinTileGetStateVideoPreviewPre({'item_id': $this.attr("item_id")});
          if (is_pre_played_state == 'false') {
          $('#videme-v4-tile-video_thumbnail-toggle_' + $this.attr("item_id")).addClass('hidden');
          videmeSkinTileShowWall({'item_id': $this.attr("item_id")});
        }
            console.log( "toggle mouseover is_played_state -----> " + is_played_state + " <-----" + retTimeForLog());
    $('#videme-v4-tile-video_thumbnail-wall_' + $this.attr("item_id")).removeClass('hidden').html(returnVideoPreview($this.attr("item_id")));*/
    //$('#videme-v4-tile-video_thumbnail-inner_' + $this.attr("item_id")).html(returnVideoPreview($this.attr("item_id")));
    //console.log( "toggle mouseover is_played -----> " + is_played + " <-----");
    //console.log( "toggle mouseover is_pre_played -----> " + is_pre_played + " <-----");
    var is_pre_played_state = videmeSkinTileGetStateVideoPreviewPre({'item_id': $this.attr("item_id")});
    console.log( "toggle mouseover is_pre_played_state -----> " + is_pre_played_state + " <-----" + retTimeForLog());
});
//$('.videme-v4-tile-video_thumbnail-toggle').on('mouseout', function(event) { // remove???
$(document).on('mouseout', '.videme-v4-tile-video_thumbnail-toggle', function (event) {

    var $this = $(this);
    console.log( "toggle ---> mouseout " + $this.attr("item_id") + retTimeForLog());
    //    if (is_pre_played) {
    //      removeVideo({'item_id': $this.attr("item_id")});
    //                  $('#videme-v4-tile-video_thumbnail-wall_' + param.item_id).addClass('hidden');
    //    }
    //console.log( "toggle mouseout is_played -----> " + is_played + " <-----");
    //console.log( "toggle mouseout is_pre_played -----> " + is_pre_played + " <-----");
    /*var is_played_state = videmeSkinTileGetStateVideoPreview({'item_id': $this.attr("item_id")});
          if (is_played_state == 'false') {
          //=== ???? removeVideo({'item_id': $this.attr("item_id")});
        }
          console.log( "toggle mouseout is_played_state -----> " + is_played_state + " <-----" + retTimeForLog());*/

    var is_pre_played_state = videmeSkinTileGetStateVideoPreviewPre({'item_id': $this.attr("item_id")});
    console.log( "toggle mouseout is_pre_played_state -----> " + is_pre_played_state + " <-----" + retTimeForLog());
});

//$('.videme-v4-tile-video_thumbnail-inner').on('mouseover touchstart touchend touchmove', function(event) {
$(document).on('mouseover touchstart touchend touchmove', '.videme-v4-tile-video_thumbnail-inner', function (event) {

    var $this = $(this);
    console.log( "inner <--- mouseover " + $this.attr("item_id") + retTimeForLog());
    //console.log( "inner mouseover is_played -----> " + is_played + " <-----");
    //console.log( "inner mouseover is_pre_played -----> " + is_pre_played + " <-----");

    var is_pre_played_state = videmeSkinTileGetStateVideoPreviewPre({'item_id': $this.attr("item_id")});
    console.log( "inner mouseover is_pre_played_state -----> " + is_pre_played_state + " <-----" + retTimeForLog());
});

//$('.videme-v4-tile-video_thumbnail-inner').on('mouseout', function(event) {
$(document).on('mouseout', '.videme-v4-tile-video_thumbnail-inner', function (event) {

    var $this = $(this);
    console.log( "inner ---> mouseout " + $this.attr("item_id") + retTimeForLog());
    //if (is_pre_played) {
    //removeVideo({'item_id': $this.attr("item_id")});
    //   $('#videme-v4-tile-video_thumbnail-wall_' + param.item_id).addClass('hidden');
    //}
    //removeVideo({'item_id': $this.attr("item_id")});
    //console.log( "inner mouseout is_played -----> " + is_played + " <-----");
    //console.log( "inner mouseout is_pre_played -----> " + is_pre_played + " <-----");

    //var is_played_state = videmeSkinTileGetStateVideoPreview({'item_id': $this.attr("item_id")});
    //var is_pre_played_state = videmeSkinTileGetStateVideoPreviewPre({'item_id': $this.attr("item_id")});
    //if (is_pre_played_state) {
    removeVideo({'item_id': $this.attr("item_id")});
    // $('#videme-v4-tile-video_thumbnail-wall_' + param.item_id).addClass('hidden');
    //}

    //console.log( "inner <--- mouseout is_played_state -----> " + is_played_state + " <-----" + retTimeForLog());
    //console.log( "inner <--- mouseout is_pre_played_state -----> " + is_pre_played_state + " <-----" + retTimeForLog());
    videmeSkinTileHideProgress({'item_id': $this.attr("item_id")});
    var is_pre_played_state = videmeSkinTileGetStateVideoPreviewPre({'item_id': $this.attr("item_id")});
    console.log( "inner mouseout is_pre_played_state -----> " + is_pre_played_state + " <-----" + retTimeForLog());
});

//$('.videme-v4-tile-video').on('mouseout', function(event) {
$(document).on('mouseout', '.videme-v4-tile-video', function (event) {

        var $this = $(this);
    console.log( "videme-v4-tile-video ---> mouseout " + $this.attr("item_id") + retTimeForLog());
    //var is_played_state = videmeSkinTileGetStateVideoPreview({'item_id': $this.attr("item_id")});
    //console.log( "videme-v4-tile-video <--- mouseout is_played_state -----> " + is_played_state + " <-----");
});

var player;
var is_played = false;
var is_pre_played = false;

//$('.videme-v4-tile-video_thumbnail-wall').on('mouseover touchstart touchend touchmove', function(event) {
$(document).on('mouseover touchstart touchend touchmove', '.videme-v4-tile-video_thumbnail-wall', function (event) {

        var $this = $(this);
    console.log( "wall <--- mouseover " + $this.attr("item_id") + retTimeForLog());
    var item_id = $this.attr("item_id");
    $('#videme-v4-tile-video_thumbnail-inner_' + $this.attr("item_id")).html(returnVideoPreview(item_id));

    require(['videojs', 'videojs-vtt-thumbnails', 'videojs-hls-quality-selector', 'videojs-overlay.min', 'videojs-playlist'], function(videojs) {
        var options = {};

        player = videojs('videme-v4-tile-video_' + $this.attr("item_id"), options, function onPlayerReady() {
            videojs.log('Your player is ready!');
        });
        // In this context, `this` is the player that was created by Video.js.
        //player.play();
        //is_played = true;
        is_pre_played = true;
        videmeSkinTileSetStateVideoPreviewPre({'item_id': $this.attr("item_id"), 'is_pre_played_state': 'true'});

        player.on('play', function() {
            videojs.log('play -----> ');
            var is_played_state = videmeSkinTileGetStateVideoPreview({'item_id': $this.attr("item_id")});
            console.log( "wall <--- mouseover player event play is_played_state -----> " + is_played_state + " <-----" + retTimeForLog());
        });
        // How about an event listener?
        player.on('ended', function() {
            videojs.log('Awww...over so soon?!');
        });
        player.on('loadedmetadata', function(){
            videojs.log('this.on loadedmetadata -------');
            //checkBuffered();
        });
        player.on('progress', function(){
            videojs.log('this.on progress -------');
            checkBuffered({'item_id': $this.attr("item_id")});
        });
        player.on('canplay', function(){
            videojs.log('this.on canplay -------');
            //checkBuffered();
        });
        player.on('canplaythrough', function(){
            videojs.log('this.on canplaythrough -------');
            openVideo({'item_id': $this.attr("item_id")});
        });


    });
//player.on('progress', checkBuffered);


    //console.log( "wall mouseover is_played -----> " + is_played + " <-----");
    //console.log( "wall mouseover is_pre_played -----> " + is_pre_played + " <-----");

    var is_pre_played_state = videmeSkinTileGetStateVideoPreviewPre({'item_id': $this.attr("item_id")});
    console.log( "wall mouseover is_pre_played_state -----> " + is_pre_played_state + " <-----" + retTimeForLog());
});

//$('.videme-v4-tile-video_thumbnail-wall').on('mouseout', function(event) {
$(document).on('mouseout', '.videme-v4-tile-video_thumbnail-wall', function (event) {

        var $this = $(this);
    console.log( "wall ---> mouseout " + $this.attr("item_id") + retTimeForLog());
    //console.log( "wall mouseout is_played -----> " + is_played + " <-----");
    //console.log( "wall mouseout is_pre_played -----> " + is_pre_played + " <-----");

//                $('#videme-v4-tile-video_thumbnail-wall_' + $this.attr("item_id")).addClass('hidden');
//===                  videmeSkinTileHideWall({'item_id': $this.attr("item_id")});
//==        if (is_pre_played) {
//==        removeVideo({'item_id': $this.attr("item_id")});
//==      }
    var is_pre_played_state = videmeSkinTileGetStateVideoPreviewPre({'item_id': $this.attr("item_id")});
    if (is_pre_played_state == 'true') {
        removeVideo({'item_id': $this.attr("item_id")});
    } else {
        $('#videme-v4-tile-video_thumbnail-wall_' + $this.attr("item_id")).addClass('hidden');
    }
    console.log( "wall mouseout is_pre_played_state -----> " + is_pre_played_state + " <-----" + retTimeForLog());
    var is_played_state = videmeSkinTileGetStateVideoPreview({'item_id': $this.attr("item_id")});
    /*if (is_played_state == 'false') {
    removeVideo({'item_id': $this.attr("item_id")});
  }*/
    videmeSkinTileHideProgress({'item_id': $this.attr("item_id")});
    console.log( "wall mouseout is_played_state -----> " + is_played_state + " <-----" + retTimeForLog());
});
/* skin tile preview stop */
