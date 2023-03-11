define('videme_upload', function(videme_upload) {
    //require(['videme', 'jquery.fileupload'], function(videme, jquery_fileupload) {
    //??==require(['videme', 'jquery.fileupload'], function(videme) {
//var upload_player;
var studio_upload = 'https://test.vide.me';


        var videme_upload = {
            formUploadInit: function () {
                //console.log('formUploadInit *************************************************** ');
                // console.log('t_id ' + $('#videme-upload-video-ticket_id').val() + ' t_id_2 ' + $('#videme-upload-video-ticket_id_for_uploader').val());
                /*if (!$.isEmptyObject(upload_player)) {
                    upload_player.dispose();
                }*/
                $('#title').addClass('hidden').val(''); // TODO: why?
                $('.videme-upload-progress').addClass('hidden');
                $('.videme-upload-form-spinner').addClass('hidden');
                $('#videme_upload_progress_modal').css('width', 0 + '%').attr('aria-valuenow', 0);

                $('#videme-upload-video-ticket_id_for_uploader').val('');
                $('#videme-upload-video-ticket_id').val('');
                $('#item_edit_content').empty();
                $('#collapseExample').removeClass('show');
                //$('#content').val('');
                $('.videme-preview-unavailable-panel').removeClass('hidden');
                $('.videme-upload-video-preview').addClass('hidden');
                $('.videme-upload-image-preview-panel').addClass('hidden');
                //$('#videme-browse-media-button').removeClass('hidden').attr('disabled', false);
                $('.videme-browse-media-button').removeClass('hidden').attr('disabled', false);
                $(".upload_public_submit").addClass('hidden').attr('disabled', true);
                //$(".upload_public_video_submit").addClass('hidden').attr('disabled', true);
                //$(".upload_public_image_submit").addClass('hidden').attr('disabled', true);
                $(".videme-file-input").prop('disabled', true);

                $('.videme-preview-unavailable-icon').html('<i class="fa fa-cloud-upload" aria-hidden="true"></i>');
                $('.videme-preview-unavailable-status').html('<p class="h6">Select your media file</p>');
                this.albumIdUpdate();
                this.noPostToggle();
                $('#no_post').prop('checked', false);
                /* ********************************************************/
                var pgwBrowser = $.pgwBrowser();
                if (pgwBrowser.browser.group === 'Explorer') {
                    //console.log('formUploadInit pgwBrowser.browser.group == Explorer *************************************************** ');
                    $('.videme_upload_video_file_all').addClass('hidden');
                    $('.videme_upload_video_file_ie').removeClass('hidden');
                }
                $('.videme_upload_alert').addClass('hidden');

                $('.videme-upload-video-preview-collection-panel').addClass('hidden');
                $('.videme-upload-video-preview-collection-tile-image-picker').empty();

            },

            uploadItint: function () {
                /* Get ticket **********************************************************************************/
                if ($.cookie('vide_nad')) {
                    /*$('#videme-upload-video-ticket_id').val('');
                    $('#videme-upload-video-ticket').val('');*/
                    //$.getJSON('https://api.vide.me/system/items/upload_init/?nad=' + $.cookie('vide_nad'),
                    $.getJSON( studio_upload + '/system/items/upload_init/?nad=' + $.cookie('vide_nad'),
                        function (data) {
                            if (!$.isEmptyObject(data)) {
                                console.log("videme-browse-media-button " + JSON.stringify(data));

                                //var trueUserInfo = paddingUserInfo(data);

                                console.log("#videme-button-upload-video -----> data.key: ", data.key);
                                console.log("#videme-button-upload-video -----> data.value: ", data.value);
                                $('#videme-upload-video-ticket_id').val(data.key).attr('ticket_id', data.key);
                                //$('#videme-upload-video-ticket').val(data.value).attr('ticket', data.value);
                                $('#videme-upload-video-ticket_id_for_uploader').val(data.key);
                                //$('#videme-upload-video-ticket_id_for_uploader').val('');
                                //$('#videme-upload-video-ticket_id').val('');
                                $('#videme-upload-video-cancel').attr('ticket_id', data.key);
                            }
                        }
                    ).done(function (data) {
                        console.log("uploadItint done " + JSON.stringify(data));
                        if (!$.isEmptyObject(data.value)) {
                            $(".videme-file-input").prop('disabled', false);
                        } else {
                            console.log("uploadItint empty");
                        }
                    })
                        .fail(function () {
                            console.log("uploadItint error");
                        })
                        .always(function () {
                            //console.log("uploadItint complete");
                        });
                }
            },

            formUploadInputSet: function (e) {
                console.log('formUploadInputSet *************************************************** ');
                var fullFileName = e.files[0].name;
                var fileName = fullFileName.split('.').slice(0, -1).join('.');
                console.log('formUploadInputSet fullFileName ' + fullFileName);
                console.log('formUploadInputSet fileName ' + fileName);
                $("#title_for_video").val(fileName);
                $("#title_image").val(fileName);
            },

            formUploadFileSelect: function (fileSelect) {
                console.log('formUploadFileSelect *************************************************** ');
                $('#title').removeClass('hidden'); // TODO: why?
                $('.videme-preview-unavailable-panel').addClass('hidden');
                $('#videme-upload-video-ticket_id_for_uploader').val($('#videme-upload-video-ticket_id').attr('ticket_id'));
                //$('#videme-browse-media-button').addClass('hidden');
                $('.videme-browse-media-button').addClass('hidden');
                $('.videme-preview-unavailable-icon').html('<i class="fa fa-cloud-upload" aria-hidden="true"></i>');
                $('.videme-preview-unavailable-status').html('<p class="h6">Upload...</p>');
                $('.videme-upload-image-preview-panel').addClass('hidden');
                $('.videme-upload-video-preview').removeClass('hidden');
                //console.log('formUploadFileSelect *************************************************** fileSelect.files[0].name ', JSON.stringify(fileSelect.files[0].name));

                $("#title").val(this.getFileName(fileSelect));

                if (fileSelect.files[0].type.match('image.*')) {
                    console.log("formUploadFileSelect image");
                    $('#upload_type').val('upload_image');
                    //$('#upload_public_image_submit').removeClass('hidden').attr('disabled', true);
                    $('#upload_public_image_submit').removeClass('hidden');
                    this.showImage(fileSelect);
                    $('#videme-upload-video-ticket_id_for_uploader').attr('upload_type', 'image');
                }
                if (fileSelect.files[0].type.match('video.*')) {
                    console.log("formUploadFileSelect video");
                    $('#upload_type').val('upload_video');
                    //$('#upload_public_video_submit').removeClass('hidden').attr('disabled', true);
                    $('#upload_public_video_submit').removeClass('hidden');
                    this.showVideoPreview(fileSelect);
                    $('#videme-upload-video-ticket_id_for_uploader').attr('upload_type', 'video');
                }
                $(".upload_public_submit").attr('disabled', true).html('<span class="spinner-border spinner-border-sm videme-upload-form-spinner" role="status" aria-hidden="true"></span> Wait...');
                $('.videme_upload_alert').addClass('hidden');

            },

            getFileName: function (getFileName) {
                console.log('getFileName *************************************************** ');

                var fileName = '';
                if (!$.isEmptyObject(getFileName.files[0])) {
                    var fullFileName = getFileName.files[0].name;
                    fileName = fullFileName.split('.').slice(0, -1).join('.');
                }
                return fileName;
            },

            formUploadFileUploadStart: function () {
                console.log('formUploadFileUploadStart *************************************************** ');
                $('.videme-upload-progress')
                    .removeClass('hidden')
                    .addClass('progress-bar-striped')
                    .addClass('progress-bar-animated');
                //$('#videme-browse-media-button').attr('disabled', true);
                $('.videme-browse-media-button').attr('disabled', true);
                this.formUploadSpinnerShow();
            },

            formUploadFileUploadStop: function () {
                console.log('formUploadFileUploadStop *************************************************** ');
                $('#videme_upload_progress_modal')
                    /*.html('Ready for publication')*/
                    .removeClass('progress-bar-striped')
                    .removeClass('progress-bar-animated');
                //$(".upload_public_submit").attr('disabled', false);
                $(".upload_public_submit").attr('disabled', false).html('Publish');
                $('.videme-preview-unavailable-icon').html('<i class="fa fa-check-square-o" aria-hidden="true"></i>');
                $('.videme-preview-unavailable-status').html('<p class="h6">Ready for publication</p>');
                //$('.videme-upload-form-spinner').addClass('hidden');
                this.formUploadSpinnerHide();
                if ($('#videme-upload-video-ticket_id_for_uploader').attr('upload_type') == 'video') {
                    this.formUploadPreviewCollectionShow();
                }
                //$('#upload_public_video_submit').attr('disabled', false);
                //$('#upload_public_image_submit').attr('disabled', false);
            },

            formUploadPublishStart: function () {
                console.log('formUploadPublishStart *************************************************** ');
            },

            formUploadpublishStop: function () {
                console.log('formUploadpublishStop *************************************************** ');
                $('#modal-videme_upload_video_image').modal('hide');
                $('#videme-toast-upload-success-body').html('<p><b>' + $("#title").val() + '</b></p> Uploaded successfully.');
                $('#videme-toast-upload-success').toast('show');
                this.formUploadInit();
            },

            formUploadPreviewVideoShow: function () {
                console.log('formUploadPreviewVideoShow *************************************************** ');
                this.formUploadPreviewImageHide();
                $('.videme-upload-video-preview').removeClass('hidden');
            },

            formUploadPreviewVideoHide: function () {
                console.log('formUploadPreviewVideoHide *************************************************** ');
                $('.videme-upload-video-preview').addClass('hidden');
            },

            formUploadPreviewVideoUnavailableShow: function () {
                console.log('formUploadPreviewVideoUnavailableShow *************************************************** ');
                $('.videme-upload-video-preview').addClass('hidden');
                $('.videme-preview-unavailable-panel').removeClass('hidden');
                $('.videme-preview-unavailable-icon').html('<img src="https://ea1116048a2ffc61f8b7-d479f182e30f6e6ac2ebc5ce5ab9de7b.ssl.cf1.rackcdn.com/videme_bf.svg" class="mx-auto d-block videme-preview-unavailable-img" alt=""/>');
                $('.videme-preview-unavailable-status').html('<p class="h6">There is no preview for this file type</p>');
            },

            formUploadPreviewImageShow: function () {
                console.log('formUploadPreviewImageShow *************************************************** ');
                this.formUploadPreviewVideoHide();
                $('.videme-upload-image-preview-panel').removeClass('hidden');
            },

            formUploadPreviewImageHide: function () {
                console.log('formUploadPreviewImageHide *************************************************** ');
                $('.videme-upload-image-preview-panel').addClass('hidden');
            },

            formUploadSpinnerShow: function () {
                console.log('formUploadSpinnerShow *************************************************** ');
                $('.videme-upload-form-spinner').removeClass('hidden');
            },

            formUploadSpinnerHide: function () { // TODO: recreat
                console.log('formUploadSpinnerHide *************************************************** ');
                $('.videme-upload-form-spinner').addClass('hidden');
            },

            formLoadImageCollectionSpinnerShow: function () {
                console.log('formLoadImageCollectionSpinnerShow *************************************************** ');
                $('.videme-load-image-colletion-form-spinner').removeClass('hidden');
            },

            formLoadImageCollectionSpinnerHide: function () {
                console.log('formLoadImageCollectionSpinnerHide *************************************************** ');
                $('.videme-load-image-colletion-form-spinner').addClass('hidden');
            },

            formUploadPreviewCollectionShow: function () {
                console.log('formUploadPreviewCollectionShow *************************************************** ');
                //$('.videme-upload-form-spinner').removeClass('hidden');
                var ticket_id = $('#videme-upload-video-ticket_id').val();
                $('.videme-upload-video-preview-collection-panel').removeClass('hidden');
                this.formLoadImageCollectionSpinnerShow();

                $.getJSON(studio_upload + "/system/items/get_image/?ticket_id=" + ticket_id + "&limit=6&videmecallback=?",
                    function (data) {
                        console.log('formUploadPreviewCollectionShow data ' + JSON.stringify(data));
                        /*$('#videme-upload-video-preview-collection-tile').selectFromMyImages({
                            limit: 18
                        });*/
                        //this.showItemPrevCollection(data);
                        videme_upload.showItemPrevCollection(data);
                        $(".videme-upload-video-preview-collection-tile-image-picker").imagepicker();

                        /*$.fn.successNotification({
                            msg: 'Success'
                        });*/
                    })
                    .done(function (data) {
                        videme_upload.formLoadImageCollectionSpinnerHide();
                    })
                    .fail(function (data) {
                        videme_upload.formLoadImageCollectionSpinnerHide();
                        $('.videme-upload-video-preview-collection-panel').addClass('hidden');
                    })
                    .always(function () {
                    });
            },

            showItemPrevCollection: function (showItemPrev) {
                var html = [];
                //html.push('<div class="container"><select class="image-picker" multiple>');
                $.each(showItemPrev, function (key, value) {
                    console.log('showTileRelation each key ---> ' + key + ' value: ' + value);
                    //console.log('showTileRelation each value ---> ' + JSON.stringify(value));
                    //var trueValue = paddingUserInfo(value);
                    //var trueValue = JSON.stringify(value);
                    //html.push("<option data-img-src=\"https://s3.amazonaws.com/img.vide.me/" + trueValue.cover + "\" alt=\"" + trueValue.title + "\" class=\"videme-item-prev-img img-thumbnail\" value='" + trueValue.item_id + "'>");
                    $('.videme-upload-video-preview-collection-tile-image-picker')
                        //tempObject
                        .append($("<option data-img-src='" + studio_upload + "/pre-image-w320/" + value + ".jpg' data-img-class=\"\"></option>")
                            //.attr("name", 'cover')
                            .attr("value", value)
                            .text(value));
                    /*html.push(
                        showTileDoorbellSignSmall(
                            parsePopRelationsForDoorbellSign(relationArray)
                    ));*/
                });
                //html.push('</select></div>');
                //console.log('showSelectImage html ---> ' + html);
                //return html.join('');
            },

            formUploadProgress: function (data) { //TODO: error console
                //console.log('formUploadProgress *************************************************** ');
                var progress = data.loaded / data.total;
                var timeSpent = new Date().getTime() - data.submitted;
                var secondsRemaining = Math.round(((timeSpent / progress) - timeSpent) / 1000);
                var percentage = Math.round(progress * 100);
                //console.log("$('#fileupload').fileupload .bind fileuploadprogress percentage " + percentage);
                //console.log("$('#fileupload').fileupload .bind fileuploadprogress secondsRemaining " + secondsRemaining);
                if (percentage > 99) {
                    /*$('#videme_upload_progress')
                        /!*.html('Ready for publication')*!/
                        .removeClass('progress-bar-striped')
                        .removeClass('progress-bar-animated');*/
                    //formUploadSpinnerHide();
                } else {
                    /*$('#videme_upload_progress')
                        .html('Uploading ' + bytesToSize(glotest.size) + ' ' + percentage + '%' + ' eta ' + sec2str(secondsRemaining) + ' sec.');*/
                    //$('.videme-upload-form-spinner').removeClass('hidden');
                    //formUploadSpinnerHide();
                }
                $('#videme_upload_progress_modal')
                    /*.removeClass('bg-success')
                    .addClass('progress-bar-striped')
                    .addClass('progress-bar-animated')*/
                    .css('width', percentage + '%')
                    .attr('aria-valuenow', percentage);
            },

            showImage: function (e) {
                console.log('showImage *************************************************** ');
                this.cookieLastUploadRemove();
                this.formUploadPreviewImageShow();
                var fileUrl = URL.createObjectURL(e.files[0]);
                console.log('fileUrl', fileUrl);
                $('.videme-upload-image-preview').attr('src', fileUrl);
            },

            showVideoPreview: function (e) {
                console.log('showVideoPreview *************************************************** ');
                this.formUploadPreviewVideoShow();
                var fileUrl = URL.createObjectURL(e.files[0]);
                console.log('fileUrl', fileUrl);
                var fileType = e.files[0].type;
                console.log('fileType', fileType);
                var options = {};
                /* ************************************************************/
                /*var oldPlayer = document.getElementById('my-video_upload');
                videojs(oldPlayer).dispose();*/
                /* ************************************************************/
                if (upload_player) {
                    upload_player.dispose();
                } else {
                    var upload_player;
                    /* ************************************************************/
                    //var player = videojs('my-video_upload', options, function onPlayerReady() {
                    //==require(['video.js', 'videojs-vtt-thumbnails', 'videojs-hls-quality-selector'], function(videojs) {
                    require(['video.js'], function(videojs) {

                        upload_player = videojs('my-video_upload', options, function onPlayerReady() {
                        //videojs('my-video_upload', options, function onPlayerReady() {
                        this.src({
                            'type': fileType,
                            'src': fileUrl
                        });
                        //==this.currentTime(3);
                        this.autoplay(true);
                        this.muted(true);
                        this.on("pause", function () {
                            this.bigPlayButton.show();
                        });
                        this.on('ended', function () {
                            videojs.log('?!');
                        });
                        this.player().on('error', function (e) {
                            console.log(e);
                            e.stopImmediatePropagation();
                            var error = this.player().error();
                            console.log('error!', error.code, error.type, error.message);
                            this.formUploadPreviewVideoUnavailableShow();
                        });
                    });
                    });
                }

            },

            cookieLastUploadSet: function () {
                console.log('cookieLastUploadSet *************************************************** ');
                if ($('#upload_type').val() === 'upload_video') {
                    //$('.videme-browse-media-button').attr('disabled', true);

                    var ticket_id = $('#videme-upload-video-ticket_id').val();
                    console.log('cookieLastUploadSet ticket_id *************************************************** ', ticket_id);
                    $.cookie("videme_last_upload", ticket_id, {expires: 1, path: '/', domain: 'vide.me', secure: true});
                    this.lastUploadGetInfo(); // NOO dobble
                }
            },

            cookieLastUploadRemove: function () {
                console.log('cookieLastUploadRemove *************************************************** ');
                //$.removeCookie("videme_last_upload");
                //$.removeCookie("videme_last_upload", { path: '/' });
                //$.cookie('videme_last_upload', '', { expires: -1, path: '/'});
                //$.cookie("videme_last_upload", null, { path: '/' });
                $.cookie("videme_last_upload", null, {expires: -1, path: '/', domain: 'vide.me', secure: true});

                console.log('cookieLastUploadRemove ***************************************** videme_last_upload ' + $.cookie("videme_last_upload"));

                $('.videme_nav_badge_last_upload').empty();
                //$('.videme-browse-media-button').attr('disabled', false); // <--------------------------- 1 upload
                //$('.videme-file-input').attr('disabled', false); // <--------------------------- 1 upload
                $('#videme-toast-upload-success-body').html('<p><b>' + $("#title").val() + '</b></p> Converted successfully.');
                $('#videme-toast-upload-success').toast('show');
            },

            lastUploadGetInfo: function () {
                //console.log('lastUploadGetInfo *************************************************** ');
                if ($.cookie('videme_last_upload')) {
                    //console.log('lastUploadGetInfo videme_last_upload *************************************************** ');
                    $('#timer').pietimer({
                            seconds: 5,
                            color: 'rgba(102, 0, 255, 0.8)',
                            height: 40,
                            width: 40
                        },
                        function () {
                            console.log("pietimer -----> location.reload();");
                        });
                    setInterval(function () {
                        $.fn.showMyTaskById({
                            task_id: $.cookie("videme_last_upload"),
                            showcaseMyTask: "#videme_last_task"
                        });
                        $('#timer').pietimer('start');
                    }, 5000);
                }
            },

            albumIdUpdate: function () {
                //console.log('albumIdUpdate *************************************************** ');
                var arrayAccess = [];
                arrayAccess.access = $('#album_id').val();
                //console.log("albumIdUpdate arrayAccess -----> ", JSON.stringify(arrayAccess));
                $('#videme-form-upload-select-assess').html(accessToIcon(arrayAccess));
            },

            noPostToggle: function () {
                //var access = $('#album_id').val();
                switch ($('#album_id').val()) {
                    case 'public':
                        $('#videme-upload-no-post').removeClass('hidden');
                        break;
                    case 'friends':
                        $('#videme-upload-no-post').removeClass('hidden');
                        break
                    case 'private':
                        $('#videme-upload-no-post').addClass('hidden');
                        break;
                    default:
                        $('#videme-upload-no-post').removeClass('hidden');
                        break;
                }
            }
        };

        $(document).ready(function () {
            var glotest = 'test';

            //$("#file-input").on('click',function () {
            $(".videme-browse-media-button").on('click', function () {
                //data.submit();
                console.log(".videme-browse-media-button -----> click");
                /* Get ticket **********************************************************************************/
                /*        if ($.cookie('vide_nad')) {
                            /!*$('#videme-upload-video-ticket_id').val('');
                            $('#videme-upload-video-ticket').val('');*!/
                            $.getJSON('https://api.vide.me/system/items/upload_init/?nad=' + $.cookie('vide_nad'),
                                function (data) {
                                    if (!$.isEmptyObject(data)) {
                                        console.log( "videme-browse-media-button " + JSON.stringify(data));

                                        //var trueUserInfo = paddingUserInfo(data);

                                        console.log("#videme-button-upload-video -----> data.key: ", data.key);
                                        console.log("#videme-button-upload-video -----> data.value: ", data.value);
                                        $('#videme-upload-video-ticket_id').val(data.key).attr('ticket_id', data.key);
                                        //$('#videme-upload-video-ticket').val(data.value).attr('ticket', data.value);
                                        $('#videme-upload-video-ticket_id_for_uploader').val(data.key);
                                        //$('#videme-upload-video-ticket_id_for_uploader').val('');
                                        //$('#videme-upload-video-ticket_id').val('');
                                        $('#videme-upload-video-cancel').attr('ticket_id', data.key);
                                    }
                                }
                            )  .done(function(data) {
                                console.log( "videme-browse-media-button done " + JSON.stringify(data));

                            })
                                .fail(function() {
                                    console.log( "error" );
                                })
                                .always(function() {
                                    console.log( "complete" );
                                });
                        }*/
            });

            $(function () {
                'use strict';
                // Initialize the jQuery File Upload widget:
                $('#fileupload').fileupload({
                //jquery_fileupload('#fileupload').fileupload({
                    // Uncomment the following to send cross-domain cookies:
                    //xhrFields: {withCredentials: true},
                    //url: 'server/php/'
                    //url: 'https://api.vide.me/upload/'
                    url: studio_upload + '/upload/'
                });
                // Enable iframe cross-domain access via redirect option:
                $('#fileupload').fileupload(
                //jquery_fileupload('#fileupload').fileupload(
                    'option',
                    'redirect',
                    window.location.href.replace(
                        /\/[^\/]*$/,
                        '/cors/result.html?%s'
                    )
                );
                //var formData = $('form').serializeArray();
                var formData = $(this).serializeArray();
                //if (window.location.hostname === 'api.vide.me') {
                //if (window.location.hostname === 'www.vide.me') {

                $('#fileupload').fileupload('option', {
                //jquery_fileupload('#fileupload').fileupload('option', {
                    /*$('#fileupload').fileupload({
                        add: function(e, data) {
                            var uploadErrors = [];
                            var acceptFileTypes = /^image\/(gif|jpe?g|png)$/i;
                            /!*if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
                                uploadErrors.push('Not an accepted file type');
                            }*!/
                            if(data.originalFiles[0]['size'].length && data.originalFiles[0]['size'] > 310000000) {
                                uploadErrors.push('File size is too big');
                            }
                            if(uploadErrors.length > 0) {
                                //alert(uploadErrors.join("\n"));
                                console.error(uploadErrors.join("\n"));
                            } else {
                                data.submit();
                            }
                        },*/
                    /*add: function(e, data) {
                        var uploadErrors = [];
                        var acceptFileTypes = /^video\/(mp4|3gp)$/i;
                        if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
                            uploadErrors.push('Not an accepted file type');
                        }
                        if(data.originalFiles[0]['size'].length && data.originalFiles[0]['size'] > 310000000) {
                            uploadErrors.push('Filesize is too big');
                        }
                        if(uploadErrors.length > 0) {
                            //alert(uploadErrors.join("\n"));
                        } else {
                            data.submit();
                        }
                    },*/
                    xhrFields: {
                        withCredentials: true
                    },
                    //url: 'https://api.vide.me/upload/',
                    url: studio_upload + '/upload/',
                    // Enable image resizing, except for Android and Opera,
                    // which actually support image resizing, but fail to
                    // send Blob objects via XHR requests:
                    disableImageResize: /Android(?!.*Chrome)|Opera/
                        .test(window.navigator.userAgent),
                    maxFileSize: 310000000,
                    //loadVideoMaxFileSize: 310000000,
                    autoUpload: true,
                    //autoUpload: false,
                    dropZone: $('#dropzone'),
                    acceptFileTypes: /(\.|\/)(mp4|3gp|mkv|webm|flv|mpg|mpeg|wmf|avi|mov|vob|rm|rmvb)$/i
                })
                    .bind('fileuploadchange', function (e, data) {
                        console.log("$('#fileupload').fileupload .bind fileuploadchange ");
                        videme_upload.formUploadFileSelect(data);
                        videme_upload.formUploadInputSet(data);
                        //var jqXHR = data.submit();

                        $.each(data.files, function (index, file) {
                            console.log('Selected file: ' + file.name);
                            /******************************************/
                            /*if (file.size > 310000000) {
                                //if(file.size > 250000000) {
                                console.error('File size is too big');
                                $('.videme_upload_alert').removeClass('hidden');
                                jqXHR.abort();
                            } else {
                                console.log('File have true size');
                                //uploadErrors.push('File not have size');
                            }*/
                            /******************************************/
                        });
                    })
                    .bind('fileuploadstart', function (e) {
                        videme_upload.formUploadFileUploadStart();
                    })
                    .bind('fileuploadstop', function (e) {
                        videme_upload.formUploadFileUploadStop();
                    })
                    .bind('fileuploadalways', function (e, data) {
                    })
                    .bind('fileuploadadd', function (e, data) {
                        console.log("$('#fileupload').fileupload .bind fileuploadadd ");
                        var uploadErrors = [];
                        var jqXHR = data.submit();
                        var file2 = data.files[0];
                        if (file2.size > 310000000) {
                            //if(file.size > 250000000) {
                            console.error('file2 size is too big 22222222');
                            jqXHR.abort();
                        }
                        $.each(data.files, function (index, file) {
                            console.log('Selected file: ' + JSON.stringify(file));
                            console.log('Selected file.name: ' + file.name);
                            console.log('Selected file.url: ' + file.url);
                            console.log('Selected file.size: ' + file.size);
                            console.log("$('#fileupload').fileupload .bind fileuploadadd glotest " + glotest);
                            glotest = file;
                            console.log("$('#fileupload').fileupload .bind fileuploadadd glotest " + glotest);
                            /* *****************************************/
                            //if(file.size.length && file.size > 310000000) {
                            if (file.size > 310000000) {
                                //if(file.size > 250000000) {
                                console.error('File size is too big');
                                $('.videme_upload_alert').removeClass('hidden');
                                uploadErrors.push('File size is too big');
                                /* ********************************************************/

                                $('.upload_public_submit').addClass('hidden');
                                $('.videme-browse-media-button').removeClass('hidden').attr('disabled', false);

                                var pgwBrowser = $.pgwBrowser();

                                if (pgwBrowser.browser.group === 'Explorer') {
                                    //console.log('formUploadInit pgwBrowser.browser.group == Explorer *************************************************** ');
                                    $('.videme_upload_video_file_ie').removeClass('hidden');
                                } else {
                                    $('.videme_upload_video_file_all').removeClass('hidden');
                                }
                                /* ********************************************************/

                                data.abort();
                                data.context.remove();
                                //var jqXHR = data.submit();
                                jqXHR.abort();
                            } else {
                                console.log('File have true size');
                                //uploadErrors.push('File not have size');
                            }
                            /* *****************************************/

                        });
                        console.log('input[type]: ' + $('input[type="file"]').val()); // TODO: why?
                        data.submitted = new Date().getTime();
                        //data.submit();
                        /* *****************************************/
                        if (uploadErrors.length > 0) {
                            //alert(uploadErrors.join("\n"));
                            //console.error(uploadErrors.join("\n"));
                            //data.abort();
                            //data.context.remove();
                            //var jqXHR = data.submit();
                            //jqXHR.abort();
                            //jqXHR.abort();

                        } else {
                            //data.submit();
                        }
                        /* *****************************************/
                    })
                    .bind('fileuploadprogress', function (e, data) {
                        videme_upload.formUploadProgress(data); // TODO: work? yes!
                    });
                // Upload server status check for browsers with CORS support:
                if ($.support.cors) {
                    $.ajax({
                        //url: 'https://api.vide.me/upload/',
                        url: studio_upload + '/upload/',
                        type: 'HEAD'
                    }).fail(function () {
                        $('<div class="alert alert-danger"/>')
                            .text('Upload server currently unavailable - ' +
                                new Date())
                            .appendTo('#fileupload');
                    });
                }
                /***************************************************/
                $('#fileupload').fileupload({
                //jquery_fileupload('#fileupload').fileupload({
                    filesContainer: $('.files'),
                    downloadTemplateId: null
                });
                /***************************************************/
                /*} else {
                    // Load existing files:
                    /!*$('#fileupload').addClass('fileupload-processing');
                    $.ajax({
                        // Uncomment the following to send cross-domain cookies:
                        //xhrFields: {withCredentials: true},
                        url: $('#fileupload').fileupload('option', 'url'),
                        dataType: 'json',
                        context: $('#fileupload')[0]
                    }).always(function () {
                        $(this).removeClass('fileupload-processing');
                    }).done(function (result) {
                        $(this).fileupload('option', 'done')
                            .call(this, $.Event('done'), {result: result});
                    });*!/
                    //window.location.href = "https://www.vide.me";
                }*/
            });


            /* ********************************************************/
            var pgwBrowser = $.pgwBrowser();
            //console.log('pgwBrowser.browser.group == *************************************************** ', pgwBrowser.os.group);

            /*if (pgwBrowser.browser.group == 'Explorer') {
                console.log('pgwBrowser.browser.group == Explorer *************************************************** ');
                //$('.videme_upload_video_file_all').addClass('hidden');
                //$('.videme_upload_video_file_ie').removeClass('hidden');
            $("#videme-browse-media-button").on("click", function(e) {
                console.log('button#videme-browse-media-button on click *************************************************** ');

                //$("#file-input").trigger("click");
                e.preventDefault();
                $('#file-input').click();
            });
            }*/

//$('#modal-cropper').on('hidden.bs.modal', function (e) {
//$('.videme-upload-form-modal-close-button').on('click', function (e) {
            $('#videme-upload-form-modal-close-button').on('click', function (e) {
                //event.preventDefault();
                console.log("videme-upload-form-modal-close-button -----> click");
                var ticket_id = $('#videme-upload-video-ticket_id').val();
                console.log("modal-videme_upload_video_image -----> ticket_id " + ticket_id);
                document.title = 'Vide.me';
                videme_upload.formUploadInit();
                $.ajax({
                    //url: 'https://api.vide.me/system/items/upload_cancel/?ticket_id=' + ticket_id + '&nad=' + $.cookie('vide_nad'),
                    url: studio_upload + '/system/items/upload_cancel/?ticket_id=' + ticket_id + '&nad=' + $.cookie('vide_nad'),
                    type: 'post',
                    //dataType: 'json',
                    //data: '',
                    success: function (msg) {
                        console.log("videme-upload-video-cancel success -----> ", msg);
                    },
                    error: function (msg) {
                        console.log("videme-upload-video-cancel error -----> ", msg);
                        $.fn.errorNotification({
                            msg: msg
                        });
                    }
                });
            });
            $('#videme-upload-form-modal-close-button-alert').on('click', function (e) {
                //event.preventDefault();
                console.log("videme-upload-form-modal-close-button-alert -----> click");
                var ticket_id = $('#videme-upload-video-ticket_id').val();
                console.log("modal-videme_upload_video_image -----> ticket_id " + ticket_id);
                document.title = 'Vide.me';
                videme_upload.formUploadInit();
                $.ajax({
                    //url: 'https://api.vide.me/system/items/upload_cancel/?ticket_id=' + ticket_id + '&nad=' + $.cookie('vide_nad'),
                    url: studio_upload + '/system/items/upload_cancel/?ticket_id=' + ticket_id + '&nad=' + $.cookie('vide_nad'),
                    type: 'post',
                    //dataType: 'json',
                    //data: '',
                    success: function (msg) {
                        console.log("videme-upload-video-cancel success -----> ", msg);
                        videme_upload.formUploadInit();
                    },
                    error: function (msg) {
                        console.log("videme-upload-video-cancel error -----> ", msg);
                        $.fn.errorNotification({
                            msg: msg
                        });
                        location.reload();
                    }
                });
            });
            $('button#upload_public_video_submit').click(function () {
                //$('#upload_public').submit(function(){
                $.ajax({
                    //url: 'https://api.vide.me/system/items/upload_public_video/',
                    url: studio_upload + '/system/items/upload_public_video/',
                    type: 'POST',
                    //dataType: 'json',
                    timeout: 20000,
                    data: $('form#upload_public').serialize() + '&album_id=' + $('#album_id').val() + '&nad=' + $.cookie('vide_nad'),
                    beforeSend: function () {
                        $.fn.processNotification();
                        //$('.videme-upload-form-spinner').removeClass('hidden');
                        //formUploadSpinnerShow();
                        videme_upload.formUploadSpinnerShow();
                    },
                    success: function (msg) {
                        $.fn.successNotification({
                            msg: msg
                        });
                        //$('.videme-download-template-common').empty();
                        //$('.videme-upload-user-form').addClass('hidden');
                        //$('.videme-upload-form-spinner').addClass('hidden');
                        //formUploadSpinnerHide();
                        videme_upload.cookieLastUploadSet();
                        videme_upload.formUploadpublishStop();
                    },
                    error: function (msg) {
                        $.fn.errorNotification({
                            msg: msg
                        });
                    }
                });
            });
            $('button#upload_public_image_submit').click(function () {
                console.log("aupload_public_image_submit -----> click ", $('#album_id').val());
                $.ajax({
                    //url: 'https://api.vide.me/system/items/upload_public_image/',
                    url: studio_upload + '/system/items/upload_public_image/',
                    type: 'POST',
                    //dataType: 'json',
                    timeout: 20000,
                    data: $('form#upload_public').serialize() + '&album_id=' + $('#album_id').val() + '&nad=' + $.cookie('vide_nad'),
                    beforeSend: function () {
                        $.fn.processNotification();
                        videme_upload.formUploadSpinnerShow();
                    },
                    success: function (msg) {
                        $.fn.successNotification({
                            msg: msg
                        });
                        //formUploadSpinnerHide();
                        videme_upload.formUploadpublishStop();
                    },
                    error: function (msg) {
                        $.fn.errorNotification({
                            msg: msg
                        });
                    }
                });
            });

            $(document).bind('dragover', function (e) {
                console.log("dragover ----->");
                var dropZone = $('#dropzone'),
                    timeout = window.dropZoneTimeout;
                if (timeout) {
                    clearTimeout(timeout);
                } else {
                    dropZone.addClass('in');
                }
                var hoveredDropZone = $(e.target).closest(dropZone);
                dropZone.toggleClass('hover', hoveredDropZone.length);
                window.dropZoneTimeout = setTimeout(function () {
                    window.dropZoneTimeout = null;
                    dropZone.removeClass('in hover');
                }, 100);
            });
            $('#dropzone').bind('dragover drop', function (event) {
                console.log("dragover drop ----->");
                event.stopPropagation();
                event.preventDefault();
                if (event.type == 'drop') {
                    console.log("dragover drop -----> event.type == 'drop'");
                    console.log(event.originalEvent.dataTransfer.files);
                    videme_upload.formUploadFileSelect(event.originalEvent.dataTransfer);
                    videme_upload.formUploadInputSet(event.originalEvent.dataTransfer);
                }
            });
            $('#album_id').on('change', function () {
                console.log("album_id change ----->", this.value);
                var arrayAccess = [];
                arrayAccess.access = this.value;
                console.log("album_id change arrayAccess -----> ", JSON.stringify(arrayAccess));
                $('#videme-form-upload-select-assess').html(accessToIcon(arrayAccess));
                videme_upload.noPostToggle();
            });

//$(document).ready(function () {
            videme_upload.formUploadInit();
            videme_upload.lastUploadGetInfo();
            //require(['jquery.hashtags', 'jquery.autosize'], function(hashtags, autosize) {

              $('#item_edit_content').hashtags();
        //});
        });
    //$('#item_edit_content').hashtags();

    return videme_upload;
    //});
});
