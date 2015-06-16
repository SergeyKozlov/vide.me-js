
/***************************************************************************
 *  Jquery plugin Vide.me
 * *************************************************************************/

(function ($) {
	$.fn.getAttributes = function() {
		var attributes = {};

		if( this.length ) {
			$.each( this[0].attributes, function( index, attr ) {
				attributes[ attr.name ] = attr.value;
			} );
		}

		return attributes;
	};

	$.fn.fileInbox = function (options) {
		settings = $.extend({
			// TODO: добавить limit в NAD
			limit: 6,
			showcaseVideo: "videme-showcase-video"
		}, options);

		$(this).html(VidemeProgress);

		return this.each(function () {
			var tempObject = $(this);
			$.getJSON("http://api.vide.me/file/inbox/?limit=" + settings.limit + "&videmecallback=?",
				function (data) {
					tempObject.html(showTile(parseFileInbox(data), tempObject));
				})
				.done(function (data) {
					data[0].showcaseButton = {
						'contact-toggle': {
							'file': data[0].file,
							'subject': data[0].subject,
							'message': data[0].message
						},
						'del-inbox-toggle': {
							'file': data[0].file,
							'messageid': data[0].messageid
						}
					};
					console.log("$.fn.fileInbox data[0] ---> " + JSON.stringify(data[0]));
					$.fn.showcaseVideoTextButton(data[0]);
				})
				.fail(function (data) {
					tempObject.html(showError(data));
				})
				.always(function () {
				});
		});
	};

	function showTile(showFile, tempObject) {
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
				<a class='file-inbox-url2' \
						file='" + value.file + "' \
						messageid='" + value.objectId + "' \
						fromUserName='" + value.fromUserName + "' \
						toUserName='" + value.toUserName + "' \
						updatedAt='" + value.updatedAt + "' \
						subject='" + value.subject + "' \
						message='" + value.message + "' \
						href='http://vide.me/v?m=" + value.href + "' target='_blank'>\
			<div class='titleTop'>\
						 " + value.a + "<br>\
						 " + value.b + "<br>\
						 " + value.c + "<br>\
						 " + value.d + "<br>\
			</div>\
						 <img src='http://img.vide.me/" + value.img + ".jpg' alt=''>\
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
			//var obj = jQuery.parseJSON(ParseFileInbox.results[key]);
			//console.log("obj.value.Message ---" + obj.value.Message);

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
				'objectId': value.objectId
			};
		});
		return parseFileInbox;
	}

	$.fn.showcaseVideo = function (options) {
		settings = $.extend({
			file: "9566b5a3475c25aa",
			miniVideo: true
		}, options);

		$(this).html(VidemeProgress);
/*
		console.log("$.fn.showcaseVideo ---> start");
		var tempObject = $(this);
		console.log("$.fn.showcaseVideo tempObject ---> " + tempObject);
		console.log("$.fn.showcaseVideo tempObject.length ---> " + tempObject.length);
		console.log("$.fn.showcaseVideo $(this).length ---> " + $(this).length);
*/
		//var tempObject = $("#videme-showcase-video");

		if ($(this).length) {
			console.log("$.fn.showcaseVideo $(this) ---> yes " + $(this).length);
			var tempObject = $(this);
		} else {
			console.log("$.fn.showcaseVideo $(this) ---> nooo! " + $(this).length);
			//ar this = $("#videme-showcase-video");
			var tempObject = $("#videme-showcase-video");
			//var tempObject = $("#videme-showcase-video").attr('id');
			console.log("$.fn.showcaseVideo tempObject ---> " + tempObject.length);
			//console.log("$.fn.showcaseVideo JSON.stringify(tempObject) ---> " + JSON.stringify(tempObject.attr));

		}
/*		tempObject.html("<video id=\"my_video1\" class=\"video-js vjs-default-skin\"></video>" +
			"<div id=\"videme-minivideo\"><div>");*/
		//=return this.each(function () {

			console.log("$.fn.showcaseVideo settings.file ---> " + settings.file);

			//var tempObject = $(this);
			//console.log("$.fn.showcaseVideo tempObject ---> " + tempObject);

			tempObject.html("<video id=\"my_video1\" class=\"video-js vjs-default-skin\"></video>" +
				"<div id=\"videme-minivideo\"><div>");
			var oldShowcasePlayer = document.getElementById('my_video1');
			//var oldPlayer1 = $('#my_video1');
			videojs(oldShowcasePlayer).dispose();
			tempObject.html("<video id=\"my_video1\" class=\"video-js vjs-default-skin\"></video>" +
				"<div id=\"videme-minivideo\"><div>");

			if ($('#my_video1').length) {
				console.log("$.fn.showcaseVideo (\"#my_video1\").length) ---> yes " + $("#my_video1").length);
				//var oldPlayer1 = document.getElementById('my_video1');
				//videojs(oldPlayer1).dispose();
			} else {
				console.log("$.fn.showcaseVideo (\"#my_video1\").length) ---> nooo! " + $("#my_video1").length);
				//TempObject.html("<video id=\"my_video1\" class=\"video-js vjs-default-skin\"></video>" +
				//	"<div id=\"videme-minivideo\"><div>");
			}

			var showcasePlayer = videojs('my_video1', {
				/* Options */
			}, function () {
				var showcasePlayerFunc = this;
				resizeVideoJS(showcasePlayerFunc);
				showcasePlayerFunc.src({
					type: "video/mp4",
					src: "http://gu.vide.me/vi?m=" + settings.file
				});
				showcasePlayerFunc.controls(true);
				showcasePlayerFunc.load();
				showcasePlayerFunc.play();
				showcasePlayerFunc.on('ended', function () {
					showcasePlayerFunc.src({
						type: "video/mp4",
						src: "http://7652b4c7a21e4ee2c1c0-b1986b3a7e22b6d15c9fa96ff70c1457.r7.cf1.rackcdn.com/07aebdc55f2163de.mp4"
					});
					showcasePlayerFunc.load();
					showcasePlayerFunc.play();
				});
			});

			$(window).resize(function () {
				resizeVideoJS(showcasePlayer);
			});

			console.log("$.fn.showcaseVideo settings.miniVideo ---> " + settings.miniVideo);

			if (settings.miniVideo) {
				/*
				 $("<video id=\"my_video2\" class=\"video-js vjs-default-skin video-down\"></video> \
				 <button id=\"closevideo\" type=\"button\" class=\"close closevideo hidden\" aria-label=\"Close\"> \
				 <span aria-hidden=\"true\">&times;</span> \
				 </button> \
				 ").appendTo("body");
				 */

				/*
				 TempObject.html("<video id=\"my_video2\" class=\"video-js vjs-default-skin video-down\"></video> \
				 <button id=\"closevideo\" type=\"button\" class=\"close closevideo hidden\" aria-label=\"Close\"> \
				 <span aria-hidden=\"true\">&times;</span> \
				 </button> \
				 ");
				 */
				$("#videme-minivideo").html("<video id=\"my_video2\" class=\"video-js vjs-default-skin video-down\"></video> \
				<button id=\"closevideo\" type=\"button\" class=\"close closevideo hidden\" aria-label=\"Close\"> \
					<span aria-hidden=\"true\">&times;</span> \
				</button> \
			");

				var oldMiniPlayer = document.getElementById('my_video2');
				//console.log("$.fn.showcaseVideo var oldPlayer2 ---> " + oldMiniPlayer);

				videojs(oldMiniPlayer).dispose();

				console.log("$.fn.showcaseVideo settings.file ---> " + settings.file);


				/*				if ($('#my_video2').length) {
				 console.log("$.fn.showcaseVideo (\"#my_video2\").length) ---> yes " + $("#my_video2").length);
				 var oldPlayer2 = document.getElementById('my_video2');
				 console.log("$.fn.showcaseVideo var oldPlayer2 ---> " + oldPlayer2);

				 videojs(oldPlayer2).dispose();
				 } else {
				 console.log("$.fn.showcaseVideo (\"#my_video2\").length) ---> nooo! " + $("#my_video2").length);
				 $("#videme-minivideo").html("<video id=\"my_video2\" class=\"video-js vjs-default-skin video-down\"></video> \
				 <button id=\"closevideo\" type=\"button\" class=\"close closevideo hidden\" aria-label=\"Close\"> \
				 <span aria-hidden=\"true\">&times;</span> \
				 </button> \
				 ");
				 }*/

				$("#videme-minivideo").html("<video id=\"my_video2\" class=\"video-js vjs-default-skin video-down\"></video> \
				<button id=\"closevideo\" type=\"button\" class=\"close closevideo hidden\" aria-label=\"Close\"> \
					<span aria-hidden=\"true\">&times;</span> \
				</button> \
			");
				/*
				 $("<video id=\"my_video2\" class=\"video-js vjs-default-skin video-down\"></video> \
				 <button id=\"closevideo\" type=\"button\" class=\"close closevideo hidden\" aria-label=\"Close\"> \
				 <span aria-hidden=\"true\">&times;</span> \
				 </button> \
				 ").appendTo("body");
				 */


				/*				TempObject.html("<video id=\"my_video2\" class=\"video-js vjs-default-skin video-down\"></video> \
				 <button id=\"closevideo\" type=\"button\" class=\"close closevideo hidden\" aria-label=\"Close\"> \
				 <span aria-hidden=\"true\">&times;</span> \
				 </button> \
				 ");*/


				//console.log("oldPlayer2 ---" + oldPlayer2);
				/*			if (typeof miniPlayer !== "undefined") {
				 console.log("miniPlayer --- yes");
				 videojs(oldPlayer2).dispose();
				 } else {
				 console.log("miniPlayer --- no");
				 }*/

				var miniPlayer = videojs('my_video2', {
					/* Options */
				}, function () {

					var miniPlayerFunc = this;

					scrollSetting(miniPlayerFunc);

					//miniPlayer.hide();
					miniPlayerFunc.muted(true);
					miniPlayerFunc.src({type: "video/mp4", src: "http://gu.vide.me/vi?m=" + settings.file});
					miniPlayerFunc.load();
					miniPlayerFunc.play();
					miniPlayerFunc.on('ended', function () {
						miniPlayerFunc.src({
							type: "video/mp4",
							src: "http://7652b4c7a21e4ee2c1c0-b1986b3a7e22b6d15c9fa96ff70c1457.r7.cf1.rackcdn.com/07aebdc55f2163de.mp4"
						});
						miniPlayerFunc.load();
						miniPlayerFunc.play();
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
				console.log("$.fn.showcaseVideo ---> no miniVideo");
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
				//console.log('width ' + $(this).parent().width() + "<>" + width + ' aspectRatio ' + (360 / 640));
				myPlayer.width(width).height(width * (360 / 640));
			}

			function scrollSetting(miniPlayer) {
				if ($(window).scrollTop() > 100) {
					//console.log("my_video2 show " + $(window).scrollTop());
					$("#closevideo").removeClass('hidden');
					miniPlayer.show();
				} else {
					//console.log("my_video2 hide");
					$("#closevideo").addClass('hidden');
					// $( \"video-down\" ).addClass(\"my_video_hidden\");
					miniPlayer.hide();
				}
				//return html;
				//console.log("scrollSetting ---> OK!!!");
			}

		//=});
	};

	$.fn.showcaseText = function (options) {
		settings = $.extend({}, options);
		$(".videme-showcase-subject").html(settings.subject);
		$(".videme-showcase-message").html(settings.message);
		$(".videme-showcase-updatedat").html(settings.updatedAt);
	};

	$.fn.showcaseButton = function (options) {
		settings = $.extend({}, options);
		if (settings.showcaseButton['del-inbox-toggle']) $(".del-inbox-toggle").removeClass("hidden").attr(settings.showcaseButton['del-inbox-toggle']);
		if (settings.showcaseButton['contact-toggle']) $(".contact-toggle").removeClass("hidden").attr(settings.showcaseButton['contact-toggle']);
	};

	$.fn.showcaseVideoTextButton = function (options) {
		settings = $.extend({}, options);
		//console.log("$.fn.showcaseVideoTextButton ---> " + JSON.stringify(settings));
		//$("#videme-showcase-video").showcaseVideo(settings);
		$.fn.showcaseVideo(settings);
		$.fn.showcaseText(settings);
		$.fn.showcaseButton(settings);
	};

	$.fn.articleShowNew = function (options) {
		settings = $.extend({
			limit: 3
		}, options);

		$(this).html(VidemeProgress);

		return this.each(function () {
			var TempObject = $(this);
			$.getJSON("http://api.vide.me/article/shownew/?limit=" + settings.limit + "&videmecallback=?",
				function (data) {
					TempObject.html(showArticle(parseArticleShowNew(data), TempObject));
				})
				.done(function () {
				})
				.fail(function (data) {
					// Внещгяя функция
					TempObject.html(showError(data));
				})
				.always(function () {
				});
		});
	};

	function showArticle(showArticle, tempObject) {
		// TODO: при развороте на большой экран маленькие артикли становятся очень маленькими
		if (tempObject.width() < 500) {
			var tempObjectClass = " videme-narrow-tile";
		} else {
			var tempObjectClass = "";
		}
		var html = [];
		$.each(showArticle, function (key, value) {
			html.push("\
				<div class='box" + tempObjectClass + "'>\
				<div class='boxInner'>\
					<div class='titleTop'>\
						 " + value.a + "<br>\
						 " + value.b + "<br>\
						 " + value.c + "<br>\
					</div>\
					<a class='' href='http://vide.me/article/" + value.href + "' target='_blank'>\
						 <img src='" + value.img + "' alt=''>\
					</a>\
					 <div class='videme-tile-signboard-true'></div>\
				</div>\
		 	")
		});
		return html;
	}

	function parseArticleShowNew(parseArticleShowNew) {
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

})(jQuery);

/***************************************************************************
 *  Конец Jquery plugin Vide.me
 * *************************************************************************/

/************************************************************************
 * Vide.me
 * **********************************************************************/

var VidemeProgress = "<img src='data:image/gif;base64,R0lGODlhDQAMAKIAAP///7W1ta2trXNzczExMf4BAgAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAFACwAAAAADQAMAAADIgi6zCIghDilejRbgK2fHPRloVaB3Umm5iWqGzuW49bcQAIAIfkEBQoABQAsAAABAAMACgAAAwhYRMrb8ElHEwAh+QQFCgAFACwAAAEADAAKAAADHlgzRVRCQLnai1Mxl3HlmLddkmh11IhqZ5i25QvGCQAh+QQFCgAFACwAAAEACQAKAAADGVgiNVOEKOagXO3FmS2vGwZelEZ2YemJZgIAIfkEBQoABQAsBAABAAgACgAAAxYYUTNFRDEHZXtx3appnpjliWFXglACACH5BAUKAAUALAcAAQAFAAoAAAMNGFEzym61N2WE9FZsEwA7' />";

$(document).ready(function() {
/*
	theDate = new Date();
	theHours = theDate.getHours();
	if (theHours >= 0 ) {$('body').css('background-image', 'url(http://src.vide.me/bgn.png)');}
	if (theHours >= 0 ) {$('body').css('background-color', '#9baecb');}
	if (theHours >= 0 ) {$('.navbar-inner').css('background-image', 'url(http://src.vide.me/bgn.png)');}
	if (theHours >= 4 ) {$('body').css('background-image', 'url(http://src.vide.me/bgm.png)');}
	if (theHours >= 4 ) {$('body').css('background-color', '#c2cd7b');}
	if (theHours >= 4 ) {$('.navbar-inner').css('background-image', 'url(http://src.vide.me/bgm.png)');}
	if (theHours >= 9 ) {$('body').css('background-image', 'url(http://src.vide.me/bgd.png)');}
	if (theHours >= 9 ) {$('body').css('background-color', '#d9eefa');}
	if (theHours >= 9 ) {$('.navbar-inner').css('background-image', 'url(http://src.vide.me/bgd.png)');}
	if (theHours >= 18 ) {$('body').css('background-image', 'url(http://src.vide.me/bge.png)');}
	if (theHours >= 18 ) {$('body').css('background-color', '#bcd9ea');}
	if (theHours >= 18 ) {$('.navbar-inner').css('background-image', 'url(http://src.vide.me/bge.png)');}
	if (theHours >= 22 ) {$('body').css('background-image', 'url(http://src.vide.me/bgn.png)');}
	if (theHours >= 22 ) {$('body').css('background-color', '#9baecb');}
	if (theHours >= 22 ) {$('.navbar-inner').css('background-image', 'url(http://src.vide.me/bgn.png)');}
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
	$.getJSON("http://api.vide.me/user/info/?videmecallback=?",
		function(data) {
			if (data.UserPicture === '') {
				$('#user_brand').html("<a href='http://pas.vide.me/' target='_blank'> <img src='http://src.vide.me/avatar.png' width='48' height='48' alt='" + data.UserDisplayName + "'></a>");
			} else {
				$('#user_brand').html("<a href='" + data.UserLink + "' target='_blank'> <img src='" + data.UserPicture + "' width='48' height='48' alt='" + data.UserDisplayName + "'></a>");
			}
			$('#user_name').html("<a href='" + data.UserLink + "' target='_blank'>" + data.UserDisplayName + "</a>");
			$('#user_email').html(data.username);
			if (data.UserPicture === '') {
				$('#form_user_brand').html("<a href='" + data.UserLink + "' target='_blank'> <img src='http://src.vide.me/avatar.png' alt='" + data.UserDisplayName + "'></a>");
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
		rules:{
			"name":{
				required:true,
				maxlength:40
			},
			"femail":{
				required:true,
				email:true,
				maxlength:60
			},
			"email":{
				required:true,
				email:true,
				maxlength:60
			},
			"subject":{
				required:true,
				maxlength:40
			},
			"message":{
				maxlength:100
			},
			"lang":{
			}
		},/*
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
		submitHandler: function(form) {
			$.ajax({
				type: "POST",
				url: 'http://sm.vide.me/sendmail/',
				timeout: 20000,
				data: $(form).serialize(),
				beforeSend: function() {
					$("#submit").attr('disabled', true);
					$('#videme-progress').html(VidemeProgress);
				},
				success: function(msg){
					//console.log("Data Saved: " + msg);
					$('#videme-progress').empty();
					$('#cform').hide('slow');
					$('#progress').hide('slow');
					$('#result').html(msg);
				},
				error: function(msg){
					//$('#cform').find(':input').prop('disabled', true);
					$('#submit').attr('disabled', true);
					$('#result').html("<div class='alert alert-error span3'>Failed from timeout. Please try again later. <span id='timer'></span> sec.</div><script type='text/javascript'>setTimeout('window.location.reload()', 6000); var t=5; function refr_time(){ if (t>1) { t--;  document.getElementById('timer').innerHTML=t; document.getElementById('timer').style.color = '#FF0000'; } else { document.getElementById('timer').style.color = '#FFA122'; } } var tm=setInterval('refr_time();' ,1000); </script>");
				}
			});
		}
	});

/* Тестовая отправка писем ===================================================*/
	$('#testmail').validate({
		rules:{
			"name":{
				//required:true,
				maxlength:40
			},
			"femail":{
				required:true,
				email:true,
				maxlength:60
			},
			"email":{
				required:true,
				email:true,
				maxlength:60
			},
			"subject":{
				required:true,
				maxlength:40
			},
			"message":{
				maxlength:100
			},
			"lang":{
			}
		},/*
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
		submitHandler: function(form) {
			$.ajax({
				type: "POST",
				url: 'http://sm.vide.me/sendmail/testmail/',
				timeout: 20000,
				data: $(form).serialize(),
				beforeSend: function() {
					$("#submit").attr('disabled', true);
					$('#videme-progress').html(VidemeProgress);
				},
				success: function(msg){
					//console.log("Data Saved: " + msg);
					$('#videme-progress').empty();
					$('#testmail').hide('slow');
					$('#progress').hide('slow');
					$('#result').html(msg);
				},
				error: function(msg){
					//$('#cform').find(':input').prop('disabled', true);
					$('#submit').attr('disabled', true);
					$('#result').html("<div class='alert alert-error span3'>Failed from timeout. Please try again later. <span id='timer'></span> sec.</div><script type='text/javascript'>setTimeout('window.location.reload()', 6000); var t=5; function refr_time(){ if (t>1) { t--;  document.getElementById('timer').innerHTML=t; document.getElementById('timer').style.color = '#FF0000'; } else { document.getElementById('timer').style.color = '#FFA122'; } } var tm=setInterval('refr_time();' ,1000); </script>");
				}
			});
		}
	});
/*============================================================================*/

	$('#user_info_nad').val($.cookie('vide_nad'));
	//$('#user_info_submit').removeAttr('disabled');
	$('#user_info_form').validate({
/*
		rules:{
			"name":{
				required:true,
				maxlength:40
			},
			"femail":{
				required:true,
				email:true,
				maxlength:60
			},
			"email":{
				required:true,
				email:true,
				maxlength:60
			},
			"subject":{
				required:true,
				maxlength:40
			},
			"message":{
				maxlength:100
			}
		},
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
		submitHandler: function(form) {
			$.ajax({
				type: "POST",
				url: 'http://pas.vide.me/user/update/info/',
				timeout: 20000,
				data: $(form).serialize(),
				beforeSend: function() {
					$("#user_info_submit").attr('disabled', true);
					$('#user_info_submit').html("Sending <img src='http://src.vide.me/loadr.gif' border='0'/>");
				},
				success: function(msg){
					console.log("Data Saved: " + msg);
					$("#user_info_submit").attr('disabled', false);
					$('#user_info_submit').html("Success!");
					//$('#user_info_form').hide('slow');
					//$('#user_info_progress').hide('slow');
					$('#user_info_result').html(msg);
		var   json = $.getJSON("http://api.vide.me/user/info/?videmecallback=?",
            function (data) {
                //if (typeof data['results'][0]['UserPicture'] === 'undefined') {
                if (data.UserPicture === '') {
                    $('#user_brand').html("<a href='" + data.UserLink + "' target='_blank'> <img src='http://src.vide.me/avatar.png' alt='" + data.UserDisplayName + "'></a>");
                } else {
                    $('#user_brand').html("<a href='" + data.UserLink + "' target='_blank'> <img src='" + data.UserPicture + "' alt='" + data.userdisplayname + "'></a>");
                }
                $('#user_name').html("<a href='" + data.UserLink + "' target='_blank'>" + data.UserDisplayName + "</a>");
                $('#user_email').html(data.username);
                if (data.UserPicture === '') {
                    $('#form_user_brand').html("<a href='" + data.UserLink + "' target='_blank'> <img src='http://src.vide.me/avatar.png' alt='" + data.UserDisplayName + "'></a>");
                } else {
                    $('#form_user_brand').html("<a href='" + data.UserLink + "' target='_blank'> <img src='" + data.UserPicture + "' alt='" + data.UserDisplayName + "'></a>");
                }
                $('#form_user_name').html("<a href='" + data.UserLink + "' target='_blank'>" + data.UserDisplayName + "</a>");
                $('#form_user_email').html(data.username);

                if (data.spring === '') {
                    //$('#videme-myspring').html("<a href='http://vide.me/myspring.html'>" + data.spring + "'></a>");
                } else {
                    $('#videme-myspring').html("<a href='http://vide.me/myspring.html'>" + data.spring + "'></a>");
                }

            }
        );
				},
				error: function(msg){
					//$('#cform').find(':input').prop('disabled', true);
					//$('#user_info_submit').attr('disabled', true);
					$('#user_info_result').html("<div class='alert alert-error span3'>Failed from timeout. Please try again later. <span id='timer'></span> sec.</div><script type='text/javascript'>setTimeout('window.location.reload()', 6000); var t=5; function refr_time(){ if (t>1) { t--;  document.getElementById('timer').innerHTML=t; document.getElementById('timer').style.color = '#FF0000'; } else { document.getElementById('timer').style.color = '#FFA122'; } } var tm=setInterval('refr_time();' ,1000); </script>");
				}
			});
		}
	});
	$('a.set_language_en').click(function(){
		//$.cookie("vide_lang", "en");
		//$.cookie("vide_lang", "en", { expires: 7, path: '/', domain: 'vide.me', secure: false });
//$.cookie("vide_lang", "en", {path: '/', domain: 'vide.me', expires: 14, secure: false});
		$.cookie("vide_lang", "en");
//$.cookie('vide_lang', 'en', {
//    expires: 5,
//    path: '/',
//    domain: 'pas.vide.me',
//    secure: true
//});
		location.reload();
	});
	$('a.set_language_ru').click(function(){
//$.cookie("vide_lang", "ru", {path: '/', domain: 'vide.me', expires: 14, secure: false});
		$.cookie("vide_lang", "ru");
		location.reload();
	});
	$('a.set_language_es').click(function(){
//$.cookie("vide_lang", "es", {path: '/', domain: 'vide.me', expires: 14, secure: false});
		$.cookie("vide_lang", "es");
		location.reload();
	});
	$('a.set_language_pt').click(function(){
		$.cookie("vide_lang", "pt");
		location.reload();
	});
	$('a.set_language_fr').click(function(){
		$.cookie("vide_lang", "fr");
		location.reload();
	});
	$('a.set_language_zh').click(function(){
		$.cookie("vide_lang", "zh");
		location.reload();
	});
	$('a.set_language_cs').click(function(){
//$.cookie("vide_lang", "cs", {path: '/', domain: 'vide.me', expires: 14, secure: false});
		$.cookie("vide_lang", "cs");
		location.reload();
	});

function imgError(image) {
    image.onerror = "";
    image.src = "http://img.vide.me/undefined.gif";
    return true;
}

/*************************************************************
v1 Событие 2: нажата ссылка на файл из плитки Inbox,
           отрисовка текста и кнопок в панель
**************************************************************/
$(document).on('click', 'a.file-inbox-url', function(event) {
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

	var nad = $.cookie('vide_nad');

//	$(".video-container").html(VidemeProgress);
//	$(".video-container").html("<img src='http://img.vide.me/" + file.substr(1) + ".jpg'");

	$('.videme-brand-panel-element-center').html("\
<video controls autoplay>\
  <source src='http://gum.vide.me/vi?m=" + file.substr(1) + "&messageid=" + messageid.substr(1) + "' type='video/mp4' autoplay>\
  Your browser does not support the <code>video</code> element.\
</video>\
");
	$('.videme-brand-panel-element-left').html("\
<div class='videme-panel-actor'>" + FromUserName.substr(1) + "</div>\
<div class='videme-panel-date'>" + updatedAt.substr(1) + "</div>\
<div class='videme-panel-subject'>" + Subject.substr(1) + "</div>\
<div class='videme-panel-message'>" + Message.substr(1) + "</div>\
");
	$('.videme-brand-panel-element-right').html("\
<div class='videme-panel-message'>Share: </div>\
<br>\
<button type='button' \
class='btn btn-primary contact-toggle' data-toggle='modal' \
data-target='#modal-contact'>\
<span class='glyphicon glyphicon-envelope'></span> contact\
</button>\
<hr class='visible-xs'>\
<button type='button' \
class='btn btn-danger pull-right hidden-xs del-inbox-toggle' data-toggle='modal' \
data-target='#modal-del'> \
<span class='glyphicon glyphicon-remove'></span> delete\
</button>\
<button type='button' \
class='btn btn-danger pull-left visible-xs del-inbox-toggle' data-toggle='modal' \
data-target='#modal-del'> \
<span class='glyphicon glyphicon-remove'></span> delete\
</button>\
");
	$(".contact-toggle").data("file-value", file.substr(1));
	$(".contact-toggle").data("subject-value", Subject.substr(1));
	$(".contact-toggle").data("message-value", Message.substr(1));
	$(".del-inbox-toggle").data("file-value", file.substr(1));
	$(".del-inbox-toggle").data("messageid-value", messageid.substr(1));
});

	/*************************************************************
	 v2 Событие 2: нажата ссылка на файл из плитки Inbox,
	 отрисовка текста и кнопок в панель
	 **************************************************************/
		//$(".file-inbox-url2").click(function(event) {
	$(document).on('click', 'a.file-inbox-url2', function(event) {
		event.preventDefault();
		//var nad = $.cookie('vide_nad');
		var attrArray = $(this).getAttributes();
		// TODO: вместо 'file-value' надо 'file'
		attrArray.showcaseButton = {
			'contact-toggle': {
				'file-value': $(this).getAttributes().file,
				'subject-value': $(this).getAttributes().subject,
				'message-value': $(this).getAttributes().message
			},
			'del-inbox-toggle': {
				'file-value': $(this).getAttributes().file,
				'messageid-value': $(this).getAttributes().messageid
			}
		};
		//console.log("$.file-inbox-url2  attrArray ---> " + JSON.stringify(attrArray));
		$.fn.showcaseVideoTextButton(attrArray);
	});

/*************************************************************
Событие 2: нажата ссылка на файл из плитки Sent, 
           отрисовка текста и кнопок в панель
**************************************************************/
$(document).on('click', 'a.file-sent-url', function(event) {
	event.preventDefault();
	var $this = $(this);
	var file = $this.attr('file-value');
	var messageid = $this.attr('messageid-value');
	var ToUserName = $this.attr('ToUserName-value');
	var updatedAt = $this.attr('updatedAt-value');
	var Subject = $this.attr('Subject-value');
	var Message = $this.attr('Message-value');
	var href = $this.attr('href');

	file.replace(/.*(?=#[^\s]+$)/, '');
	messageid.replace(/.*(?=#[^\s]+$)/, '');
	ToUserName.replace(/.*(?=#[^\s]+$)/, '');
	updatedAt.replace(/.*(?=#[^\s]+$)/, '');
	Subject.replace(/.*(?=#[^\s]+$)/, '');
	Message.replace(/.*(?=#[^\s]+$)/, '');

	var nad = $.cookie('vide_nad');

//	console.log("Subject1 " + Subject);

//	$(".video-container").html(VidemeProgress);
//	$(".video-container").html("<img src='http://img.vide.me/" + file.substr(1) + ".jpg'");

	$('.videme-brand-panel-element-center').html("\
<video controls autoplay>\
  <source src='http://gum.vide.me/vi?m=" + file.substr(1) + "&messageid=" + messageid.substr(1) + "' type='video/mp4' autoplay>\
  Your browser does not support the <code>video</code> element.\
</video>\
");
	$('.videme-brand-panel-element-left').html("\
<div class='videme-panel-actor'>" + ToUserName.substr(1) + "</div>\
<div class='videme-panel-date'>" + updatedAt.substr(1) + "</div>\
<div class='videme-panel-subject'>" + Subject.substr(1) + "</div>\
<div class='videme-panel-message'>" + Message.substr(1) + "</div>\
");
	$('.videme-brand-panel-element-right').html("\
<div class='videme-panel-message'>Share: </div>\
<br>\
<button type='button' \
class='btn btn-primary contact-toggle' data-toggle='modal' \
data-target='#modal-contact'>\
<span class='glyphicon glyphicon-envelope'></span> contact\
</button>\
&nbsp\
<button type='button' \
class='btn btn-primary list-toggle' data-toggle='modal' \
data-target='#modal-list'>\
<span class='glyphicon glyphicon-list'></span> list\
</button>\
<hr class='visible-xs'>\
<button type='button' \
class='btn btn-danger pull-right hidden-xs del-sent-toggle' data-toggle='modal' \
data-target='#modal-del'> \
<span class='glyphicon glyphicon-remove'></span> delete\
</button>\
<button type='button' \
class='btn btn-danger pull-left visible-xs del-sent-toggle' data-toggle='modal' \
data-target='#modal-del'> \
<span class='glyphicon glyphicon-remove'></span> delete\
</button>\
");
	$(".contact-toggle").data("file-value", file.substr(1));
	$(".contact-toggle").data("subject-value", Subject.substr(1));
	$(".contact-toggle").data("message-value", Message.substr(1));
	$(".list-toggle").data("file-value", file.substr(1));
	$(".list-toggle").data("subject-value", Subject.substr(1));
	$(".list-toggle").data("message-value", Message.substr(1));
	$(".del-sent-toggle").data("file-value", file.substr(1));
	$(".del-sent-toggle").data("messageid-value", messageid.substr(1));
});
/*************************************************************
Событие 2: нажата ссылка на файл из плитки My, 
           отрисовка текста и кнопок в панель
**************************************************************/
$(document).on('click', 'a.file-my-url', function(event) {
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

	var nad = $.cookie('vide_nad');

//	$(".video-container").html(VidemeProgress);
//	$(".video-container").html("<img src='http://img.vide.me/" + file.substr(1) + ".jpg'");

	$('.videme-brand-panel-element-center').html("\
<video controls autoplay>\
  <source src='http://gum.vide.me/vi?m=" + file.substr(1) + "&messageid=" + messageid.substr(1) + "' type='video/mp4'>\
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
&nbsp\
<button type='button' \
class='btn btn-primary list-toggle' data-toggle='modal' \
data-target='#modal-list'>\
<span class='glyphicon glyphicon-list'></span> list\
</button>\
<hr class='visible-xs'>\
<button type='button' \
class='btn btn-danger pull-right hidden-xs del-my-toggle' data-toggle='modal' \
data-target='#modal-del'>\
<span class='glyphicon glyphicon-remove'></span> delete\
</button>\
<button type='button' \
class='btn btn-danger pull-left visible-xs del-my-toggle' data-toggle='modal' \
data-target='#modal-del'>\
<span class='glyphicon glyphicon-remove'></span> delete\
</button>\
");
	$(".contact-toggle").data("file-value", file.substr(1));
	$(".contact-toggle").data("subject-value", Subject.substr(1));
	$(".contact-toggle").data("message-value", Message.substr(1));
	$(".list-toggle").data("file-value", file.substr(1));
	$(".list-toggle").data("subject-value", Subject.substr(1));
	$(".list-toggle").data("message-value", Message.substr(1));
	$(".del-my-toggle").data("file-value", file.substr(1));
	$(".del-my-toggle").data("messageid-value", messageid.substr(1));
});
/*************************************************************
Событие 2: нажата ссылка на файл из плитки MySpring, 
           отрисовка текста и кнопок в панель
**************************************************************/
$(document).on('click', 'a.file-myspring-url', function(event) {
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

	var nad = $.cookie('vide_nad');

//	$(".video-container").html(VidemeProgress);
//	$(".video-container").html("<img src='http://img.vide.me/" + file.substr(1) + ".jpg'");

	$('.videme-brand-panel-element-left').html("\
<div class='videme-panel-date'>" + updatedAt.substr(1) + "</div>\
");

	$('.videme-brand-panel-element-center').html("\
<video controls autoplay>\
  <source src='http://gum.vide.me/vi?m=" + file.substr(1) + "&messageid=" + messageid.substr(1) + "' type='video/mp4'>\
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
&nbsp\
<button type='button' \
class='btn btn-primary list-toggle' data-toggle='modal' \
data-target='#modal-list' \
file-value='#" + file.substr(1) + "' \
subject-value='#" + Subject.substr(1) + "' \
message-value='#" + Message.substr(1) + "'>\
<span class='glyphicon glyphicon-list'></span> list\
</button>\
<hr class='visible-xs'>\
<button type='button' \
class='btn btn-primary pull-right hidden-xs del-sharefile-toggle' data-toggle='modal' \
data-target='#modal-del' \
file-value='#" + file.substr(1) + "'>\
<span class='glyphicon glyphicon-ban-circle'></span> Close Share\
</button>\
<button type='button' \
class='btn btn-primary pull-left visible-xs del-sharefile-toggle' data-toggle='modal' \
data-target='#modal-del' \
file-value='#" + file.substr(1) + "'>\
<span class='glyphicon glyphicon-ban-circle'></span> Close Share\
</button>\
");
	$(".contact-toggle").data("file-value", file.substr(1));
	$(".contact-toggle").data("subject-value", Subject.substr(1));
	$(".contact-toggle").data("message-value", Message.substr(1));
	$(".list-toggle").data("file-value", file.substr(1));
	$(".list-toggle").data("subject-value", Subject.substr(1));
	$(".list-toggle").data("message-value", Message.substr(1));
	$(".del-sharefile-toggle").data("file-value", file.substr(1));
});

/*************************************************************
Событие 2: нажата ссылка на файл из плитки Next
**************************************************************/
$(document).on('click', 'a.shownext', function(event) {
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
$(document).on('click', 'a.showpop-url', function(event) {
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

	var nad = $.cookie('vide_nad');

//	$(".video-container").html(VidemeProgress);
//	$(".video-container").html("<img src='http://img.vide.me/" + file.substr(1) + ".jpg'");

	$('.videme-brand-panel-element-center').html("\
<video controls autoplay>\
  <source src='http://gu.vide.me/vi?m=" + file.substr(1) + "&messageid=" + messageid.substr(1) + "' type='video/mp4'>\
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

	$.getJSON("http://api.vide.me/file/shownext/?number=12&prev_file=" + prev_file + "&file=" + file.substr(1) + "&videmecallback=?",
		function(b) {
			$(".prev_file-value").data("prev_file-value", b['results'][0]['File']);

			$('.videme-prev').html(prev_file);
			$('.videme-this').html(file.substr(1));

alert("bbb = " + b.results.length);
			if (b.results.length > 3) {



	var a=[];
	$.each(b.results, function(d,c) {
/* Выйти после третей интерации */
				if (d > 3) return false;
	a.push("\
<div class='box'>\
	<div class='boxInner'>\
		<a class='showpop-url' \
file-value='#"+c.File+"' \
messageid-value='#"+c.objectId+"' \
FromUserName-value='#"+c.FromUserName+"' \
updatedAt-value='#"+c.updatedAt+"' \
Subject-value='#"+c.Subject+"' \
Message-value='#"+c.Message+"' \
href='http://vide.me/v?m="+c.File+"&messageid="+c.objectId+"' \
target='_blank'>\
			<img src=\"http://img.vide.me/"+c.File+".jpg\" alt=\"" + c.updatedAt + "\" title=\"" + c.updatedAt + "\" onerror='imgError(this);'>\
		<div class='videme-tile-signboard-true'><span class=\"label label-primary\">"+c.Case+"</span>"+c.updatedAt+"</div>\
		</a>\
	</div>\
</div>\
			")
	});
/* Всё слепить и показать */
	$(".videme-shownext-tile").html(a.join(""));

/* Вычисилить максимальное число страниц */
			var pagetotal=Math.ceil(b.results.length / 4); 
/* Объявить экземпляр пейджинатора */
			$('.videme-shownext-pagination').jqPagination({
			//link_string	: '/?page={page_number}',
			max_page	: pagetotal,
			paged		: function(page) {
/* Пропустить страниц = текущая страница * элементов на странице */
			var skip = page * 4;
			$.getJSON("http://api.vide.me/file/shownext/?skip=" + skip + "&videmecallback=?",
			function(b) {
				var a=[];
				$.each(b.results, function(d,c) {
/* Выйти после третей интерации */
					if (d > 3) return false;
					a.push("\
<div class='box'>\
	<div class='boxInner'>\
		<a class='showpop-url' \
file-value='#"+c.File+"' \
messageid-value='#"+c.objectId+"' \
FromUserName-value='#"+c.FromUserName+"' \
updatedAt-value='#"+c.updatedAt+"' \
Subject-value='#"+c.Subject+"' \
Message-value='#"+c.Message+"' \
href='http://vide.me/v?m="+c.File+"' \
target='_blank'>\
			<img src=\"http://img.vide.me/"+c.File+".jpg\" alt=\"" + c.updatedAt + "\" title=\"" + c.updatedAt + "\" onerror='imgError(this);'>\
		<div class='videme-tile-signboard-true'>"+c.updatedAt+"</div>\
		<div class=''>"+c.File+"</div>\
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
$(document).on('click', 'a.file-spring-url', function(event) {
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

	var nad = $.cookie('vide_nad');

//	$(".video-container").html(VidemeProgress);
//	$(".video-container").html("<img src='http://img.vide.me/" + file.substr(1) + ".jpg'");

	$('.videme-brand-panel-element-left').html("\
<div class='videme-panel-date'>" + updatedAt.substr(1) + "</div>\
");

	$('.videme-brand-panel-element-center').html("\
<video controls autoplay>\
  <source src='http://gum.vide.me/vi?m=" + file.substr(1) + "&messageid=" + messageid.substr(1) + "' type='video/mp4'>\
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
Событие 2: нажата кнопка Редактировать контакт, 
           отрисовка формы и кнопок в модальное окно
**************************************************************/
$(document).on('click', '.contact-edit-toggle', function(event) {
	event.preventDefault();
	var $this = $(this);
	var email = $this.attr('email-value');

	email.replace(/.*(?=#[^\s]+$)/, '');

	var nad = $.cookie('vide_nad');

	$('#email').val(email.substr(1));
	$('#newemail').val(email.substr(1));
	$(".contact-del-toggle").data("email-value", email.substr(1));
});
/*************************************************************
Событие 3: нажата кнопка вызова и отрисовки контактов
**************************************************************/
$(document).on('click', '.contact-toggle', function(event) {
	event.stopPropagation();
	var $this = $(this);
	$(".videme-contact-list").html(VidemeProgress);
	$(".videme-mini-img").html(VidemeProgress);
	$(".videme-mini-img").html("<img src='http://img.vide.me/" + $('.contact-toggle').data('file-value') + ".jpg' class='videme-img-tile-my' width='190' height='108'>");

	$.getJSON("http://api.vide.me/contact/?videmecallback=?",
		function(data){
			var nad = $.cookie('vide_nad');
			var results = [];
				$.each(data['results'], function(i, result) {
					results.push("<a class='contact-url' href='http://api.vide.me/file/resend/?email=" + result.Email + "&file=" + $('.contact-toggle').data('file-value') + "&subject=Re: " + $('.contact-toggle').data('subject-value') + "&message=" + $('.contact-toggle').data('message-value') + "&nad=" + nad + "' target='_blank'><span class='label label-primary'>" + result.Email + "</span></a> ");
				});
				$('.videme-contact-list').html(results.join(""));
		}
	);
});
/*************************************************************
Событие 3: нажата кнопка вызова и отрисовки листов
**************************************************************/
$(document).on('click', '.list-toggle', function(event) {
	event.stopPropagation();
	var $this = $(this);

	$(".videme-list-list").html(VidemeProgress);
	$(".videme-mini-img").html(VidemeProgress);
	$(".videme-mini-img").html("<img src='http://img.vide.me/" + $('.list-toggle').data('file-value') + ".jpg' class='videme-img-tile-my' width='190' height='108'>");
	$(".videme-file-info").html("<b>" + $('.list-toggle').data('subject-value') + "</b><br>" + $('.list-toggle').data('message-value') + "<br>" + $('.list-toggle').data('updatedat-value') + "<br>");

	$('#file').val($('.list-toggle').data('file-value'));


	$.getJSON("http://api.vide.me/list/?videmecallback=?",
		function(data){
			var nad = $.cookie('vide_nad');
			var results = [];
				$.each(data['results'], function(i, result) {
					results.push("<a class='list-url' href='http://api.vide.me/file/share/?file=" + $('.list-toggle').data('file-value') + "&list=" + result.ListName + "&nad=" + nad + "' target='_blank'><span class='label label-primary'>" + result.ListName + "</span></a> ");
				});

				$(".videme-list-list").html("empty");
				$('.videme-list-list').html(results.join(""));
		}
	);
});
/*************************************************************
Событие 3: нажата кнопка вызова и отрисовки 
           кнопки удалить Inbox в модальном окне
**************************************************************/
$(document).on('click', '.del-inbox-toggle', function(event) {
	event.stopPropagation();
	var $this = $(this);
	var nad = $.cookie('vide_nad');

	$(".videme-del-list").html(VidemeProgress);
	$(".videme-mini-img").html(VidemeProgress);
	$(".videme-mini-img").html("<img src='http://img.vide.me/" + $('.del-inbox-toggle').data('file-value') + ".jpg' class='videme-mini-img' width='190' height='108'>");

	$('.videme-del-list').html("\
<button type='button' class='btn btn-primary' data-dismiss='modal'>\
	Сancel\
</button> \
<a class='del-inbox-url' file-value='http://api.vide.me/file/delinbox/?messageid=" + $('.del-inbox-toggle').data('messageid-value') + "&nad=" + nad + "' target='_blank'>\
<button type='button' class='btn btn-danger videme-progress'>\
Delete\
</button>\
</a>\
");
});
/*************************************************************
Событие 3: нажата кнопка вызова и отрисовки 
          кнопки удалить Sent в модальном окне
**************************************************************/
$(document).on('click', '.del-sent-toggle', function(event) {
	event.stopPropagation();
	var $this = $(this);
	var nad = $.cookie('vide_nad');

	$(".videme-del-list").html(VidemeProgress);
	$(".videme-mini-img").html(VidemeProgress);
	$(".videme-mini-img").html("<img src='http://img.vide.me/" + $('.del-sent-toggle').data('file-value') + ".jpg' class='videme-mini-img' width='190' height='108'>");

	$('.videme-del-list').html("\
<button type='button' class='btn btn-primary' data-dismiss='modal'>\
	Сancel\
</button> \
<a class='del-sent-url' file-value='http://api.vide.me/file/delsent/?messageid=" + $('.del-sent-toggle').data('messageid-value') + "&nad=" + nad + "' target='_blank'>\
<button type='button' class='btn btn-danger videme-progress'>\
Delete\
</button>\
</a>\
");
});
/*************************************************************
Событие 3: нажата кнопка вызова и отрисовки 
           кнопки удалить MY в модальном окне
**************************************************************/
$(document).on('click', '.del-my-toggle', function(event) {
	event.stopPropagation();
	var $this = $(this);
	$(".videme-del-list").html(VidemeProgress);
	$(".videme-mini-img").html(VidemeProgress);
	$(".videme-mini-img").html("<img src='http://img.vide.me/" + $('.del-my-toggle').data('file-value') + ".jpg' class='videme-mini-img' width='190' height='108'>");

	var nad = $.cookie('vide_nad');
	$('.videme-del-list').html("\
<button type='button' class='btn btn-primary' data-dismiss='modal'>\
	Сancel\
</button> \
<a class='del-my-url' file-value='http://api.vide.me/file/delfile/?file=" + $('.del-my-toggle').data('file-value') + "&nad=" + nad + "' target='_blank'>\
<button type='button' class='btn btn-danger videme-progress'>\
Delete\
</button>\
</a>\
");
});
/*************************************************************
Событие 4: нажата кнопка Сохранить Contact в первом модальном окне
**************************************************************/
$('#contact-edit-form').validate({
	rules:{
		"newemail":{
			required:true,
			email:true,
			maxlength:40
		}
	},
	messages:{
		"newemail":{
			required:"",
			email:"Enter true email"
		}
	},
	submitHandler: function(form) {
		$.ajax({
			type: "POST",
			url: 'http://pas.vide.me/contact/update/',
			timeout: 20000,
			data: $(form).serialize(),
			beforeSend: function() {
				$("#contact-edit-submit").attr('disabled', true);
				$('.videme-progress').html(VidemeProgress);
			},
			success: function(msg){
				//console.log("Data Saved: " + msg);
				$("#contact-edit-submit").attr('disabled', false);
				$('.videme-progress').empty();
				$('#modal-edit-contact').modal('hide');
				$('#videme-result').html(msg);
ShowMyContact();
			},
			error: function(msg){
				$("#contact-edit-submit").attr('disabled', false);
				$('.videme-progress').empty();
				$('#modal-edit-contact').modal('hide');
				$('#videme-result').html("<div class='alert alert-error span3'>Failed from timeout. Please try again later. <span id='timer'></span> sec.</div><script type='text/javascript'>setTimeout('window.location.reload()', 6000); var t=5; function refr_time(){ if (t>1) { t--;  document.getElementById('timer').innerHTML=t; document.getElementById('timer').style.color = '#FF0000'; } else { document.getElementById('timer').style.color = '#FFA122'; } } var tm=setInterval('refr_time();' ,1000); </script>");
			}
		});
	}
});
/*************************************************************
Событие 4: нажата кнопка вызова и отрисовки 
           кнопки удалить Contact во втором модальном окне
**************************************************************/
$(document).on('click', '.contact-del-toggle', function(event) {
	event.stopPropagation();

	$('.videme-display').html($(".contact-del-toggle").data("email-value"));
	$('#del-email').val($(".contact-del-toggle").data("email-value"));
});
/*************************************************************
Событие 5: нажата кнопка удалить Contact во втором модальном окне
**************************************************************/
$('#contact-del-form').validate({
	rules:{
		"email":{
			required:true,
			email:true,
			maxlength:40
		}
	},
	messages:{
		"email":{
			required:"",
			email:"Enter true email"
		}
	},
	submitHandler: function(form) {
		$.ajax({
			type: "POST",
			url: 'http://pas.vide.me/contact/remove/',
			timeout: 20000,
			data: $(form).serialize(),
			beforeSend: function() {
				$("#contact-del-submit").attr('disabled', true);
				$('.videme-progress').html(VidemeProgress);
			},
			success: function(msg){
				//console.log("Data Saved: " + msg);
				$("#contact-del-submit").attr('disabled', false);
				$('.videme-progress').empty();
				$('#modal-del-contact').modal('hide');
				$('#modal-edit-contact').modal('hide');
				$('#videme-result').html(msg);
ShowMyContact();
			},
			error: function(msg){
				$("#contact-del-submit").attr('disabled', false);
				$('.videme-progress').empty();
				$('#modal-del-contact').modal('hide');
				$('#modal-edit-contact').modal('hide');
				$('#videme-result').html("<div class='alert alert-error span3'>Failed from timeout. Please try again later. <span id='timer'></span> sec.</div><script type='text/javascript'>setTimeout('window.location.reload()', 6000); var t=5; function refr_time(){ if (t>1) { t--;  document.getElementById('timer').innerHTML=t; document.getElementById('timer').style.color = '#FF0000'; } else { document.getElementById('timer').style.color = '#FFA122'; } } var tm=setInterval('refr_time();' ,1000); </script>");
			}
		});
	}
});
/*************************************************************
Событие 3: нажата кнопка вызова и отрисовки 
           кнопки удалить sharefile в модальное окно
**************************************************************/
$(document).on('click', '.del-sharefile-toggle', function(event) {
	event.stopPropagation();
	var $this = $(this);
	var nad = $.cookie('vide_nad');

	$(".videme-del-list").html(VidemeProgress);
	$(".videme-mini-img").html(VidemeProgress);
	$(".videme-mini-img").html("<img src='http://img.vide.me/" + $('.del-sharefile-toggle').data('file-value') + ".jpg' class='videme-mini-img' width='190' height='108'>");

	$('.videme-del-list').html("\
<button type='button' class='btn btn-primary' data-dismiss='modal'>\
	Сancel\
</button> \
<a class='del-sharefile-url' file-value='http://api.vide.me/file/noshare/?file=" + $('.del-sharefile-toggle').data('file-value') + "&nad=" + nad + "' target='_blank'>\
<button type='button' class='btn btn-danger videme-progress'>\
Delete\
</button>\
</a>\
");
});
/*************************************************************
Событие 2: нажата кнопка создать Contact в 1 модальном окне
**************************************************************/
$('#contact-create-form').validate({
	rules:{
		"email":{
			required:true,
			email:true,
			maxlength:40
		}
	},
	messages:{
		"email":{
			required:"",
			email:"Enter true email"
		}
	},
	submitHandler: function(form) {
		$.ajax({
			type: "POST",
			url: 'http://pas.vide.me/contact/create/',
			timeout: 20000,
			data: $(form).serialize(),
			beforeSend: function() {
				$("#contact-create-submit").attr('disabled', true);
				$('.videme-progress').html(VidemeProgress);
			},
			success: function(msg){
				$("#contact-create-submit").attr('disabled', false);
				$('.videme-progress').empty();
				$('#modal-create-contact').modal('hide');
				$('#videme-result').html(msg);
ShowMyContact();
			},
			error: function(msg){
				$("#contact-create-submit").attr('disabled', false);
				$('.videme-progress').empty();
				$('#modal-create-contact').modal('hide');
				$('#videme-result').html("<div class='alert alert-error span3'>Failed from timeout. Please try again later. <span id='timer'></span> sec.</div><script type='text/javascript'>setTimeout('window.location.reload()', 6000); var t=5; function refr_time(){ if (t>1) { t--;  document.getElementById('timer').innerHTML=t; document.getElementById('timer').style.color = '#FF0000'; } else { document.getElementById('timer').style.color = '#FFA122'; } } var tm=setInterval('refr_time();' ,1000); </script>");
			}
		});
	}
});
/*************************************************************
Событие 4: нажата ссылка из списка контактов
**************************************************************/
$(document).on('click', 'a.contact-url', function(event) {
	event.preventDefault();
	var $this = $(this);
	var href = $this.attr('href');
	href.replace(/.*(?=#[^\s]+$)/, '');
	$.ajax({
//		type: 'post',
		url: href,
		beforeSend: function() {
			$(".videme-progress").html("Do..." + VidemeProgress);
			$('#process_notification').append();
			if ( !$('#process_notification').is( '.in' ) ) {
				$('#process_notification').addClass('in');
				setTimeout(function() {
					$('#process_notification').removeClass('in');
				}, 3200);
			}
		},
		success: function(msg){
			$('#modal-contact').modal('hide');
			$('#success_notification').append(msg + "<br>");
			if ( !$('#success_notification').is( '.in' ) ) {
				$('#success_notification').addClass('in');
				setTimeout(function() {
					$('#success_notification').removeClass('in');
				}, 3200);
			}
		},
		error: function(msg){
			$('#modal-contact').modal('hide');
			$('#error_notification').append(msg + "<br>");
			if ( !$('#error_notification').is( '.in' ) ) {
				$('#error_notification').addClass('in');
				setTimeout(function() {
					$('#error_notification').removeClass('in');
				}, 3200);
			}
		}
	});
});
/*************************************************************
Событие 2: нажата кнопка Редактировать контакт, 
           отрисовка формы и кнопок в модальное окно
**************************************************************/
$(document).on('click', '.list-edit-toggle', function(event) {
	event.preventDefault();
	var $this = $(this);
	var list = $this.attr('list-value');

	list.replace(/.*(?=#[^\s]+$)/, '');

	var nad = $.cookie('vide_nad');

	$('#list').val(list.substr(1));
	$('#newlist').val(list.substr(1));
	$(".list-del-toggle").data("list-value", list.substr(1));
});
/*************************************************************
Событие 4: нажата кнопка Сохранить List в первом модальном окне
**************************************************************/
$('#list-edit-form').validate({
	rules:{
		"newlist":{
			required:true,
			//email:true,
			maxlength:40
		}
	},
	messages:{
		"newlist":{
			required:"<-"
			//email:"Enter true list"
		}
	},
	submitHandler: function(form) {
		$.ajax({
			type: "POST",
			url: 'http://pas.vide.me/list/update/',
			timeout: 20000,
			data: $(form).serialize(),
			beforeSend: function() {
				$("#list-edit-submit").attr('disabled', true);
				$('.videme-progress').html(VidemeProgress);
			},
			success: function(msg){
				//console.log("Data Saved: " + msg);
				$("#list-edit-submit").attr('disabled', false);
				$('.videme-progress').empty();
				$('#modal-edit-list').modal('hide');
				$('#videme-result').html(msg);
ShowMyList();
			},
			error: function(msg){
				$("#list-edit-submit").attr('disabled', false);
				$('.videme-progress').empty();
				$('#modal-edit-list').modal('hide');
				$('#videme-result').html("<div class='alert alert-error span3'>Failed from timeout. Please try again later. <span id='timer'></span> sec.</div><script type='text/javascript'>setTimeout('window.location.reload()', 6000); var t=5; function refr_time(){ if (t>1) { t--;  document.getElementById('timer').innerHTML=t; document.getElementById('timer').style.color = '#FF0000'; } else { document.getElementById('timer').style.color = '#FFA122'; } } var tm=setInterval('refr_time();' ,1000); </script>");
			}
		});
	}
});
/*************************************************************
Событие 4: нажата кнопка вызова и отрисовки 
           кнопки удалить List во втором модальном окне
**************************************************************/
$(document).on('click', '.list-del-toggle', function(event) {
	event.stopPropagation();

	$('.videme-display').html($(".list-del-toggle").data("list-value"));
	$('#del-list').val($(".list-del-toggle").data("list-value"));
});
/*************************************************************
Событие 5: нажата кнопка удалить List во втором модальном окне
**************************************************************/
$('#list-del-form').validate({
	rules:{
		"list":{
			required:true,
			//email:true,
			maxlength:40
		}
	},
	messages:{
		"list":{
			required:"<-"
			//email:"Enter true list"
		}
	},
	submitHandler: function(form) {
		$.ajax({
			type: "POST",
			url: 'http://pas.vide.me/list/remove/',
			timeout: 20000,
			data: $(form).serialize(),
			beforeSend: function() {
				$("#list-del-submit").attr('disabled', true);
				$('.videme-progress').html(VidemeProgress);
			},
			success: function(msg){
				//console.log("Data Saved: " + msg);
				$("#list-del-submit").attr('disabled', false);
				$('.videme-progress').empty();
				$('#modal-del-list').modal('hide');
				$('#modal-edit-list').modal('hide');
				$('#videme-result').html(msg);
ShowMyList();
			},
			error: function(msg){
				$("#list-del-submit").attr('disabled', false);
				$('.videme-progress').empty();
				$('#modal-del-list').modal('hide');
				$('#modal-edit-list').modal('hide');
				$('#videme-result').html("<div class='alert alert-error span3'>Failed from timeout. Please try again later. <span id='timer'></span> sec.</div><script type='text/javascript'>setTimeout('window.location.reload()', 6000); var t=5; function refr_time(){ if (t>1) { t--;  document.getElementById('timer').innerHTML=t; document.getElementById('timer').style.color = '#FF0000'; } else { document.getElementById('timer').style.color = '#FFA122'; } } var tm=setInterval('refr_time();' ,1000); </script>");
			}
		});
	}
});
/*************************************************************
Событие 2: нажата кнопка создать List в 1 модальном окне
**************************************************************/
$('#list-create-form').validate({
	rules:{
		"list":{
			required:true,
			//email:true,
			maxlength:40
		}
	},
	messages:{
		"list":{
			required:"<-"
			//email:"Enter true list"
		}
	},
	submitHandler: function(form) {
		$.ajax({
			type: "POST",
			url: 'http://pas.vide.me/list/create/',
			timeout: 20000,
			data: $(form).serialize(),
			beforeSend: function() {
				$("#list-create-submit").attr('disabled', true);
				$('.videme-progress').html(VidemeProgress);
			},
			success: function(msg){
				$("#list-create-submit").attr('disabled', false);
				$('.videme-progress').empty();
				$('#modal-create-list').modal('hide');
				$('#videme-result').html(msg);
ShowMyList();
			},
			error: function(msg){
				$("#list-create-submit").attr('disabled', false);
				$('.videme-progress').empty();
				$('#modal-create-list').modal('hide');
				$('#videme-result').html("<div class='alert alert-error span3'>Failed from timeout. Please try again later. <span id='timer'></span> sec.</div><script type='text/javascript'>setTimeout('window.location.reload()', 6000); var t=5; function refr_time(){ if (t>1) { t--;  document.getElementById('timer').innerHTML=t; document.getElementById('timer').style.color = '#FF0000'; } else { document.getElementById('timer').style.color = '#FFA122'; } } var tm=setInterval('refr_time();' ,1000); </script>");
			}
		});
	}
});
/*************************************************************
Событие 4: нажата ссылка из списка листов
**************************************************************/
$(document).on('click', 'a.list-url', function(event) {
	var $this = $(this);
	var href = $this.attr('href');
	event.preventDefault();
	href.replace(/.*(?=#[^\s]+$)/, '');
	$.ajax({
//		type: 'post',
		url: href,
		beforeSend: function() {
			$(".videme-progress").html("Do..." + VidemeProgress);
			$('#process_notification').append();
			if ( !$('#process_notification').is( '.in' ) ) {
				$('#process_notification').addClass('in');
				setTimeout(function() {
					$('#process_notification').removeClass('in');
				}, 3200);
			}
		},
		success: function(msg){
			$('#modal-list').modal('hide');
			$('#success_notification').append(msg + "<br>");
			if ( !$('#success_notification').is( '.in' ) ) {
				$('#success_notification').addClass('in');
				setTimeout(function() {
					$('#success_notification').removeClass('in');
				}, 3200);
			}
		},
		error: function(msg){
			$('#modal-list').modal('hide');
			$('#error_notification').append(msg + "<br>");
			if ( !$('#error_notification').is( '.in' ) ) {
				$('#error_notification').addClass('in');
				setTimeout(function() {
					$('#error_notification').removeClass('in');
				}, 3200);
			}
		}
	});
});
/*************************************************************
Событие 4: нажата кнопка Сохранить В List в первом модальном окне
**************************************************************/
$('#list-form').validate({
/*
	rules:{
		"newlist":{
			required:true,
			//email:true,
			maxlength:40
		}
	},
	messages:{
		"newlist":{
			required:"<-",
			//email:"Enter true list"
		}
	},
*/
	submitHandler: function(form) {
		$.ajax({
			type: "POST",
			url: 'http://api.vide.me/file/share/',
			timeout: 20000,
			data: $(form).serialize(),
			beforeSend: function() {
				$(".videme-progress").html("Do..." + VidemeProgress);
				$('#process_notification').append();
				if ( !$('#process_notification').is( '.in' ) ) {
					$('#process_notification').addClass('in');
					setTimeout(function() {
						$('#process_notification').removeClass('in');
					}, 3200);
				}
			},
			success: function(msg){
				$('#modal-list').modal('hide');
				$('#success_notification').append(msg + "<br>");
//	ShowMySpring();
				if ( !$('#success_notification').is( '.in' ) ) {
					$('#success_notification').addClass('in');
					setTimeout(function() {
						$('#success_notification').removeClass('in');
					}, 3200);
				}
			},
			error: function(msg){
				$('#modal-list').modal('hide');
				$('#error_notification').append(msg + "<br>");
//	ShowMySpring();
				if ( !$('#error_notification').is( '.in' ) ) {
					$('#error_notification').addClass('in');
					setTimeout(function() {
						$('#error_notification').removeClass('in');
					}, 3200);
				}
			}
		});
	}
});
/*************************************************************
Событие 4: нажата ссылка из кнопки удалить файл Inbox
**************************************************************/
$(document).on('click', 'a.del-inbox-url', function(event) {
	event.preventDefault();
	var $this = $(this);
	var href = $this.attr('file-value');
	href.replace(/.*(?=#[^\s]+$)/, '');
	$.ajax({
//		type: 'post',
		url: href,
		beforeSend: function() {
			$(".videme-progress").html("Do..." + VidemeProgress);
			$('#process_notification').append();
			if ( !$('#process_notification').is( '.in' ) ) {
				$('#process_notification').addClass('in');
				setTimeout(function() {
					$('#process_notification').removeClass('in');
				}, 3200);
			}
		},
		success: function(msg){
			$('#modal-del').modal('hide');
			$('#success_notification').append(msg + "<br>");
ShowInbox();
			if ( !$('#success_notification').is( '.in' ) ) {
				$('#success_notification').addClass('in');
				setTimeout(function() {
					$('#success_notification').removeClass('in');
				}, 3200);
			}
		},
		error: function(msg){
			$('#modal-del').modal('hide');
			$('#error_notification').append(msg + "<br>");
ShowInbox();
			if ( !$('#error_notification').is( '.in' ) ) {
				$('#error_notification').addClass('in');
				setTimeout(function() {
					$('#error_notification').removeClass('in');
				}, 3200);
			}
		}
	});
});
/*************************************************************
Событие 4: нажата ссылка из кнопки удалить файл sharefile
**************************************************************/
$(document).on('click', 'a.del-sharefile-url', function(event) {
	event.preventDefault();
	var $this = $(this);
	var href = $this.attr('file-value');
	href.replace(/.*(?=#[^\s]+$)/, '');
	$.ajax({
		type: 'post',
		url: href,
		beforeSend: function() {
			$(".videme-progress").html("Do..." + VidemeProgress);
			$('#process_notification').append();
			if ( !$('#process_notification').is( '.in' ) ) {
				$('#process_notification').addClass('in');
				setTimeout(function() {
					$('#process_notification').removeClass('in');
				}, 3200);
			}
		},
		success: function(msg){
			$('#modal-del').modal('hide');
			$('#success_notification').append(msg + "<br>");
ShowMySpring();
			if ( !$('#success_notification').is( '.in' ) ) {
				$('#success_notification').addClass('in');
				setTimeout(function() {
					$('#success_notification').removeClass('in');
				}, 3200);
			}
		},
		error: function(msg){
			$('#modal-del').modal('hide');
			$('#error_notification').append(msg + "<br>");
ShowMySpring();
			if ( !$('#error_notification').is( '.in' ) ) {
				$('#error_notification').addClass('in');
				setTimeout(function() {
					$('#error_notification').removeClass('in');
				}, 3200);
			}
		}
	});
});
/*************************************************************
Событие 4: нажата ссылка из кнопки удалить файл Sent
**************************************************************/
$(document).on('click', 'a.del-sent-url', function(event) {
	event.preventDefault();
	var $this = $(this);
	var href = $this.attr('file-value');
	href.replace(/.*(?=#[^\s]+$)/, '');
	$.ajax({
		type: 'post',
		url: href,
		beforeSend: function() {
			$(".videme-progress").html("Do..." + VidemeProgress);
			$('#process_notification').append();
			if ( !$('#process_notification').is( '.in' ) ) {
				$('#process_notification').addClass('in');
				setTimeout(function() {
					$('#process_notification').removeClass('in');
				}, 3200);
			}
		},
		success: function(msg){
			$('#modal-del').modal('hide');
			$('#success_notification').append(msg + "<br>");
ShowSent();
			if ( !$('#success_notification').is( '.in' ) ) {
				$('#success_notification').addClass('in');
				setTimeout(function() {
					$('#success_notification').removeClass('in');
				}, 3200);
			}
		},
		error: function(msg){
			$('#modal-del').modal('hide');
			$('#error_notification').append(msg + "<br>");
ShowSent();
			if ( !$('#error_notification').is( '.in' ) ) {
				$('#error_notification').addClass('in');
				setTimeout(function() {
					$('#error_notification').removeClass('in');
				}, 3200);
			}
		}
	});
});
/*************************************************************
Событие 4: нажата ссылка из кнопки удалить файл My
**************************************************************/
$(document).on('click', 'a.del-my-url', function(event) {
	event.preventDefault();
	var $this = $(this);
	var href = $this.attr('file-value');
	href.replace(/.*(?=#[^\s]+$)/, '');
	$.ajax({
		type: 'post',
		url: href,
		beforeSend: function() {
			$(".videme-progress").html("Do..." + VidemeProgress);
			$('#process_notification').append();
			if ( !$('#process_notification').is( '.in' ) ) {
				$('#process_notification').addClass('in');
				setTimeout(function() {
					$('#process_notification').removeClass('in');
				}, 3200);
			}
		},
		success: function(msg){
			$('#modal-del').modal('hide');
			$('#success_notification').append(msg + "<br>");
ShowMy();
			if ( !$('#success_notification').is( '.in' ) ) {
				$('#success_notification').addClass('in');
				setTimeout(function() {
					$('#success_notification').removeClass('in');
				}, 3200);
			}
		},
		error: function(msg){
			$('#modal-del').modal('hide');
			$('#error_notification').append(msg + "<br>");
ShowMy();
			if ( !$('#error_notification').is( '.in' ) ) {
				$('#error_notification').addClass('in');
				setTimeout(function() {
					$('#error_notification').removeClass('in');
				}, 3200);
			}
		}
	});
});
/*************************************************************
Событие XX: нажата кнопка Login
**************************************************************/
	//$('#user_pas_nad').val($.cookie('vide_nad'));
	//$('#user_info_submit').removeAttr('disabled');
	$('#user-login-form').validate({
		rules:{
			"username":{
				required:true,
				email:true,
				maxlength:40
			},
			"password":{
				required:true,

				maxlength:60
			}
		},
		messages:{
			"username":{
				required:"",
				email:"Enter true email"
			},
			"password":{
				required:"",
				email:"Enter true email"
			}
		},
		submitHandler: function(form) {
			$.ajax({
				type: "POST",
				url: 'http://pas.vide.me/user/login/',
				timeout: 20000,
				data: $(form).serialize(),
				beforeSend: function() {
					$("#user-login-submit").attr('disabled', true);
					$('#videme-progress').html(VidemeProgress);
				},
				success: function(msg){
					//console.log("Data Saved: " + msg);
					$("#user-login-submit").attr('disabled', false);
					$('#videme-progress').empty();
					$('#login-result').html(msg);
				}
				/*
				error: function(msg){
					//$('#cform').find(':input').prop('disabled', true);
					//$('#user_info_submit').attr('disabled', true);
					$('#login-result').html("<div class='alert alert-error span3'>Failed from timeout. Please try again later. <span id='timer'></span> sec.</div><script type='text/javascript'>setTimeout('window.location.reload()', 6000); var t=5; function refr_time(){ if (t>1) { t--;  document.getElementById('timer').innerHTML=t; document.getElementById('timer').style.color = '#FF0000'; } else { document.getElementById('timer').style.color = '#FFA122'; } } var tm=setInterval('refr_time();' ,1000); </script>");
				}
*/
			});
		}
	});
/*************************************************************
Событие XX: нажата кнопка изменить пароль
**************************************************************/
	$('#user_pas_nad').val($.cookie('vide_nad'));
	//$('#user_info_submit').removeAttr('disabled');
	$('#user-pas-form').validate({
/*
		rules:{
			"name":{
				required:true,
				maxlength:40
			},
			"femail":{
				required:true,
				email:true,
				maxlength:60
			},
			"email":{
				required:true,
				email:true,
				maxlength:60
			},
			"subject":{
				required:true,
				maxlength:40
			},
			"message":{
				maxlength:100
			}
		},
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
		submitHandler: function(form) {
			$.ajax({
				type: "POST",
				url: 'http://pas.vide.me/user/update/pas/',
				timeout: 20000,
				data: $(form).serialize(),
				beforeSend: function() {
					$("#user-pas-submit").attr('disabled', true);
					$('#videme-progress').html(VidemeProgress);
				},
				success: function(msg){
					//console.log("Data Saved: " + msg);
					$("#user-pas-submit").attr('disabled', false);
					$('#videme-progress').empty();
					//$('#user-pas-submit').html("Save");
					$('#pas-result').html(msg);
				},
				error: function(msg){
					//$('#cform').find(':input').prop('disabled', true);
					//$('#user_info_submit').attr('disabled', true);
					$('#pas-result').html("<div class='alert alert-error span3'>Failed from timeout. Please try again later. <span id='timer'></span> sec.</div><script type='text/javascript'>setTimeout('window.location.reload()', 6000); var t=5; function refr_time(){ if (t>1) { t--;  document.getElementById('timer').innerHTML=t; document.getElementById('timer').style.color = '#FF0000'; } else { document.getElementById('timer').style.color = '#FFA122'; } } var tm=setInterval('refr_time();' ,1000); </script>");
				}
			});
		}
	});

/*==============================================================================

==============================================================================*/
	$('.new_list_submit').removeAttr('disabled');
$(document).on('click', '.new_list_form', function(event) {
				$('#user_nad').val($.cookie('vide_nad'));
    $(this).validate({
		submitHandler: function(form) {
			$.ajax({
				type: "GET",
				url: "http://api.vide.me/list/create/",
				timeout: 20000,
				data: $(form).serialize(),
				beforeSend: function() {
					$(".new_list_submit").attr("disabled", true);
					$(".new_list_submit").html("Sending <img src='http://src.vide.me/loadr.gif' border='0'/>");
					$('#process_notification').append();

					if ( !$('#process_notification').is( '.in' ) ) {
						$('#process_notification').addClass('in');

						setTimeout(function() {
							$('#process_notification').removeClass('in');
						}, 3200);
					}
				},
				success: function(msg){
					console.log("Data Saved: " + msg);
					$(".new_list_submit").attr('disabled', false);
					$(".new_list_submit").html("New list");
					//$('#share_file_form').hide('slow');
					//$('#user_info_progress').hide('slow');
					$(".new_list_result").html(msg);
					$('#success_notification').append(msg + "<br>");

					if ( !$('#success_notification').is( '.in' ) ) {
						$('#success_notification').addClass('in');

						setTimeout(function() {
							$('#success_notification').removeClass('in');
						}, 3200);
					}
				},
				error: function(msg){
				//	$(".new_list_submit").attr("disabled", true);
				//	$(".new_list_submit").html("Error");
					$('#success_notification').append(msg + "<br>");

					if ( !$('#success_notification').is( '.in' ) ) {
						$('#success_notification').addClass('in');

						setTimeout(function() {
							$('#success_notification').removeClass('in');
						}, 3200);
					}
				}
			});
		}
	});

});


	$('#remove_list_submit').removeAttr('disabled');
$(document).on('click', '.remove_list_form', function(event) {
				$('.user_nad').val($.cookie('vide_nad'));
    $(this).validate({
		submitHandler: function(form) {
			$.ajax({
				type: "GET",
				url: "http://api.vide.me/list/remove/",
				timeout: 20000,
				data: $(form).serialize(),
				beforeSend: function() {
					$(".remove_list_submit").attr("disabled", true);
					$(".remove_list_submit").html("Sending <img src='http://src.vide.me/loadr.gif' border='0'/>");
					$('#process_notification').append();

					if ( !$('#process_notification').is( '.in' ) ) {
						$('#process_notification').addClass('in');

						setTimeout(function() {
							$('#process_notification').removeClass('in');
						}, 3200);
					}
				},
				success: function(msg){
					console.log("Data Saved: " + msg);
					$(".remove_list_submit").attr('disabled', false);
					$(".remove_list_submit").html("Remove list");
					//$('#share_file_form').hide('slow');
					//$('#user_info_progress').hide('slow');
					$(".remove_list_result").html(msg);
					$('#success_notification').append(msg + "<br>");

					if ( !$('#success_notification').is( '.in' ) ) {
						$('#success_notification').addClass('in');

						setTimeout(function() {
							$('#success_notification').removeClass('in');
						}, 3200);
					}
				},
				error: function(msg){
				//	$(".remove_list_submit").attr("disabled", true);
				//	$(".remove_list_submit").html("Error");
					$('#success_notification').append(msg + "<br>");

					if ( !$('#success_notification').is( '.in' ) ) {
						$('#success_notification').addClass('in');

						setTimeout(function() {
							$('#success_notification').removeClass('in');
						}, 3200);
					}
				}
			});
		}
	});
});

	$('#rename_list_submit').removeAttr('disabled');
$(document).on('click', '.rename_list_form', function(event) {
				$('.user_nad').val($.cookie('vide_nad'));
    $(this).validate({
		submitHandler: function(form) {
			$.ajax({
				type: "GET",
				url: "http://api.vide.me/list/update/",
				timeout: 20000,
				data: $(form).serialize(),
				beforeSend: function() {
					$(".rename_list_submit").attr("disabled", true);
					$(".rename_list_submit").html("Sending <img src='http://src.vide.me/loadr.gif' border='0'/>");
				},
				success: function(msg){
					console.log("Data Saved: " + msg);
					$(".rename_list_submit").attr('disabled', false);
					$(".rename_list_submit").html("Rename list");
					//$('#share_file_form').hide('slow');
					//$('#user_info_progress').hide('slow');
					$(".rename_list_result").html(msg);
				},
				error: function(msg){
				//	$(".rename_list_submit").attr("disabled", true);
				//	$(".rename_list_submit").html("Error");
					$('#success_notification').append(msg + "<br>");

					if ( !$('#success_notification').is( '.in' ) ) {
						$('#success_notification').addClass('in');

						setTimeout(function() {
							$('#success_notification').removeClass('in');
						}, 3200);
					}
				}
			});
		}
	});
});

/*==============================================================================
Удалить файл:
В форме класса "del_inbox_form" нажата кнопка "удалить", 
сериализовано собираются все поля "user_nad", "file" и отправляются
==============================================================================*/
/*Удалить (стереть)*/
	$('#del_inbox_submit').removeAttr('disabled');
$(document).on('click', '.del_inbox_form', function(event) {
				$('.user_nad').val($.cookie('vide_nad'));
    $(this).validate({
		submitHandler: function(form) {
			$.ajax({
				type: "GET",
				url: "http://api.vide.me/file/delinbox/",
				timeout: 20000,
				data: $(form).serialize(),
				beforeSend: function() {
					$(".del_inbox_submit").attr("disabled", true);
					$(".del_inbox_submit").html("Sending <img src='http://src.vide.me/loadr.gif' border='0'/>");
					$('#process_notification').append();

					if ( !$('#process_notification').is( '.in' ) ) {
						$('#process_notification').addClass('in');

						setTimeout(function() {
							$('#process_notification').removeClass('in');
						}, 3200);
					}
				},
				success: function(msg){
					console.log("Data Saved: " + msg);
					$(".del_inbox_submit").attr('disabled', false);
					$(".del_inbox_submit").html("File remove");
					$(".del_inbox_result").html(msg);
					$('#success_notification').append(msg + "<br>");

					if ( !$('#success_notification').is( '.in' ) ) {
						$('#success_notification').addClass('in');

						setTimeout(function() {
							$('#success_notification').removeClass('in');
						}, 3200);
					}
				},
				error: function(msg){
				//	$(".del_inbox_submit").attr("disabled", true);
				//	$(".del_inbox_submit").html("Error");
					$('#success_notification').append(msg + "<br>");

					if ( !$('#success_notification').is( '.in' ) ) {
						$('#success_notification').addClass('in');

						setTimeout(function() {
							$('#success_notification').removeClass('in');
						}, 3200);
					}
				}
			});
		}
	});
});

/*Удалить (стереть)*/
	$('#del_send_submit').removeAttr('disabled');
$(document).on('click', '.del_send_form', function(event) {
				$('.user_nad').val($.cookie('vide_nad'));
    $(this).validate({
		submitHandler: function(form) {
			$.ajax({
				type: "GET",
				url: "http://api.vide.me/file/delsend/",
				timeout: 20000,
				data: $(form).serialize(),
				beforeSend: function() {
					$(".del_send_submit").attr("disabled", true);
					$(".del_send_submit").html("Send <img src='http://src.vide.me/loadr.gif' border='0'/>");
					$('#process_notification').append();

					if ( !$('#process_notification').is( '.in' ) ) {
						$('#process_notification').addClass('in');

						setTimeout(function() {
							$('#process_notification').removeClass('in');
						}, 3200);
					}
				},
				success: function(msg){
					console.log("Data Saved: " + msg);
					$(".del_send_submit").attr('disabled', false);
					$(".del_send_submit").html("File remove");
					//$('#share_file_form').hide('slow');
					//$('#user_info_progress').hide('slow');
					$(".del_send_result").html(msg);
					$('#success_notification').append(msg + "<br>");

					if ( !$('#success_notification').is( '.in' ) ) {
						$('#success_notification').addClass('in');

						setTimeout(function() {
							$('#success_notification').removeClass('in');
						}, 3200);
					}
				},
				error: function(msg){
				//	$(".del_send_submit").attr("disabled", true);
				//	$(".del_send_submit").html("Error");
					$('#success_notification').append(msg + "<br>");

					if ( !$('#success_notification').is( '.in' ) ) {
						$('#success_notification').addClass('in');

						setTimeout(function() {
							$('#success_notification').removeClass('in');
						}, 3200);
					}
				}
			});
		}
	});
});
/*Удалить (стереть)*/
	$('#del_file_submit').removeAttr('disabled');
$(document).on('click', '.del_file_form', function(event) {
				$('.user_nad').val($.cookie('vide_nad'));
    $(this).validate({
		submitHandler: function(form) {
			$.ajax({
				type: "GET",
				url: "http://api.vide.me/file/delfile/",
				timeout: 20000,
				data: $(form).serialize(),
				beforeSend: function() {
					$(".del_file_submit").attr("disabled", true);
					$(".del_file_submit").html("Do <img src='http://src.vide.me/loadr.gif' border='0'/>");
					$('#process_notification').append();
					if ( !$('#process_notification').is( '.in' ) ) {
						$('#process_notification').addClass('in');
						setTimeout(function() {
							$('#process_notification').removeClass('in');
						}, 3200);
					}
				},
				success: function(msg){
					console.log("Data Saved: " + msg);
					$(".del_file_submit").attr('disabled', false);
					$(".del_file_submit").html("File remove");
					$('#success_notification').append(msg + "<br>");
					if ( !$('#success_notification').is( '.in' ) ) {
						$('#success_notification').addClass('in');
						setTimeout(function() {
							$('#success_notification').removeClass('in');
						}, 3200);
					}
				},
				error: function(msg){
				//	$(".del_file_submit").attr("disabled", true);
				//	$(".del_file_submit").html("Error");
					$('#success_notification').append(msg + "<br>");

					if ( !$('#success_notification').is( '.in' ) ) {
						$('#success_notification').addClass('in');

						setTimeout(function() {
							$('#success_notification').removeClass('in');
						}, 3200);
					}
				}
			});
		}
	});
});


	/***************************************************************************
	 Редактор артиклей
	 ***************************************************************************/

//var articleDate = $(document.getElementById(\"article[date]\");

	/*

	 */
//var itemCount = 3;
//var EmbeditemCount = 3;
	/* При переносе в большой файл
	 var awaitingCopy = false;

	 $(init);

	 function init() {
	 */
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
		/*
		 rules:{
		 "name":{
		 required:true,
		 maxlength:40
		 },
		 "femail":{
		 required:true,
		 email:true,
		 maxlength:60
		 },
		 "email":{
		 required:true,
		 email:true,
		 maxlength:60
		 },
		 "subject":{
		 required:true,
		 maxlength:40
		 },
		 "message":{
		 maxlength:100
		 }
		 },
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
				url: 'http://api.vide.me/article/update/',
				timeout: 20000,
				data: $(form).serialize(),
				beforeSend: function () {
					$("#user-pas-submit").attr('disabled', true);
					$('#videme-progress').html(VidemeProgress);

				},
				success: function (msg) {
					//console.log("Data Saved: " + msg);
					$("#user-pas-submit").attr('disabled', false);
					$('#videme-progress').empty();
					//$('#user-pas-submit').html("Save");
					$('#article-update-result').html(msg);
					//$('#article-update-result2').html(msg + " serializeArray:<br>" + $(form).serializeArray());
				},
				error: function (msg) {
					//$('#cform').find(':input').prop('disabled', true);
					//$('#user_info_submit').attr('disabled', true);
					$('#article-update-result').html(msg);
				}
			});
		}
	});


	$('#article-new').validate({
		/*
		 rules:{
		 "name":{
		 required:true,
		 maxlength:40
		 },
		 "femail":{
		 required:true,
		 email:true,
		 maxlength:60
		 },
		 "email":{
		 required:true,
		 email:true,
		 maxlength:60
		 },
		 "subject":{
		 required:true,
		 maxlength:40
		 },
		 "message":{
		 maxlength:100
		 }
		 },
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
				url: 'http://api.vide.me/article/new/',
				timeout: 20000,
				data: $(form).serialize(),
				beforeSend: function () {
					$("#user-pas-submit").attr('disabled', true);
					$('#videme-progress').html(VidemeProgress);

				},
				success: function (msg) {
					//console.log("Data Saved: " + msg);
					$("#user-pas-submit").attr('disabled', false);
					$('#videme-progress').empty();
					//$('#user-pas-submit').html("Save");
					$('#article-update-result').html(msg);
					//$('#article-update-result2').html(msg + " serializeArray:<br>" + $(form).serializeArray());
				},
				error: function (msg) {
					//$('#cform').find(':input').prop('disabled', true);
					//$('#user_info_submit').attr('disabled', true);
					$('#article-update-result').html(msg);
				}
			});
		}
	});
	/*
	 }
	 */

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
		//console.log("window).resize ---> tmpEvent').animate");
		sidebarToggleHidde();
		sidebarToggleButton();
	});

/***************************************************************************
 * Конец Sidebar
 ***************************************************************************/

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
};

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
};

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

/***************************************************************************
 * Функция показать файлы Inbox
***************************************************************************/
function ShowInbox() {
	$(".videme-tile").html(VidemeProgress);
	$.getJSON("http://api.vide.me/file/inbox/?videmecallback=?",
		function(b) {
	$('.videme-brand-panel-element-center').html("\
<video controls>\
  <source src='http://gum.vide.me/vi?m=" + b['results'][0]['File'] + "&messageid=" + b['results'][0]['objectId'] + "' type='video/mp4'>\
  Your browser does not support the <code>video</code> element.\
</video>\
");
	$('.videme-brand-panel-element-left').html("\
<div class='videme-panel-actor'>" + b['results'][0]['FromUserName'] + "</div>\
<div class='videme-panel-date'>" + b['results'][0]['updatedAt'] + "</div>\
<div class='videme-panel-subject'>" + b['results'][0]['Subject'] + "</div>\
<div class='videme-panel-message'>" + b['results'][0]['Message'] + "</div>\
");
	$('.videme-brand-panel-element-right').html("\
<div class='videme-panel-message'>Share: </div>\
<button type='button' \
class='btn btn-primary contact-toggle' data-toggle='modal' \
data-target='#modal-contact' \
file-value='#" + b['results'][0]['File'] + "' \
subject-value='#" + b['results'][0]['Subject'] + "' \
message-value='#" + b['results'][0]['Message'] + "'>\
<span class='glyphicon glyphicon-envelope'></span> contact\
</button>\
<hr class='visible-xs'>\
<button type='button' \
class='btn btn-danger pull-right hidden-xs del-inbox-toggle' data-toggle='modal' \
data-target='#modal-del' \
file-value='#" + b['results'][0]['File'] + "'>\
<span class='glyphicon glyphicon-remove'></span> delete\
</button>\
<button type='button' \
class='btn btn-danger pull-left visible-xs del-inbox-toggle' data-toggle='modal' \
data-target='#modal-del' \
file-value='#" + b['results'][0]['File'] + "' \
messageid-value='#" + b['results'][0]['objectId'] + "'>\
<span class='glyphicon glyphicon-remove'></span> delete\
</button>\
");
	var a=[];
	$.each(b.results, function(d,c) {
	a.push("\
<div class='box'>\
	<div class='boxInner'>\
		<a class='file-inbox-url' \
file-value='#"+c.File+"' \
messageid-value='#"+c.objectId+"' \
FromUserName-value='#"+c.FromUserName+"' \
updatedAt-value='#"+c.updatedAt+"' \
Subject-value='#"+c.Subject+"' \
Message-value='#"+c.Message+"' \
href='http://vide.me/v?m="+c.File+"&messageid="+c.objectId+"' \
target='_blank'>\
			<img src=\"http://img.vide.me/"+c.File+".jpg\" alt=\"" + c.updatedAt + "\" title=\"" + c.updatedAt + "\" onerror='imgError(this);'>\
		</a>\
		<div class='videme-tile-signboard-"+c.Read+"'>"+c.FromUserName+"</div>\
	</div>\
</div>\
			")
	});
	$(".videme-tile").html(a.join(""));
	})
}
/***************************************************************************
Функция показать файлы Sent
***************************************************************************/
function ShowSent() {
	$(".videme-tile").html(VidemeProgress);
	$.getJSON("http://api.vide.me/file/sent/?videmecallback=?",
		function(b) {
	$('.videme-brand-panel-element-center').html("\
<video controls>\
  <source src='http://gum.vide.me/vi?m=" + b['results'][0]['File'] + "&messageid=" + b['results'][0]['objectId'] + "' type='video/mp4'>\
  Your browser does not support the <code>video</code> element.\
</video>\
");
	$('.videme-brand-panel-element-left').html("\
<div class='videme-panel-actor'>" + b['results'][0]['ToUserName'] + "</div>\
<div class='videme-panel-date'>" + b['results'][0]['updatedAt'] + "</div>\
<div class='videme-panel-subject'>" + b['results'][0]['Subject'] + "</div>\
<div class='videme-panel-message'>" + b['results'][0]['Message'] + "</div>\
");
	$('.videme-brand-panel-element-right').html("\
<div class='videme-panel-message'>Share: </div>\
<button type='button' \
class='btn btn-primary contact-toggle' data-toggle='modal' \
data-target='#modal-contact' \
file-value='#" + b['results'][0]['File'] + "' \
subject-value='#" + b['results'][0]['Subject'] + "' \
message-value='#" + b['results'][0]['Message'] + "'>\
<span class='glyphicon glyphicon-envelope'></span> contact\
</button>\
&nbsp\
<button type='button' \
class='btn btn-primary list-toggle' data-toggle='modal' \
data-target='#modal-list' \
file-value='#" + b['results'][0]['File'] + "' \
subject-value='#" + b['results'][0]['Subject'] + "' \
message-value='#" + b['results'][0]['Message'] + "'>\
<span class='glyphicon glyphicon-list'></span> list\
</button>\
<hr class='visible-xs'>\
<button type='button' \
class='btn btn-danger pull-right hidden-xs del-inbox-toggle' data-toggle='modal' \
data-target='#modal-del' \
file-value='#" + b['results'][0]['File'] + "'>\
<span class='glyphicon glyphicon-remove'></span> delete\
</button>\
<button type='button' \
class='btn btn-danger pull-left visible-xs del-inbox-toggle' data-toggle='modal' \
data-target='#modal-del' \
file-value='#" + b['results'][0]['File'] + "' \
messageid-value='#" + b['results'][0]['objectId'] + "'>\
<span class='glyphicon glyphicon-remove'></span> delete\
</button>\
");
	var a=[];
	$.each(b.results, function(d,c) {
	a.push("\
<div class='box'>\
	<div class='boxInner'>\
		<a class='file-sent-url' \
file-value='#"+c.File+"' \
messageid-value='#"+c.objectId+"' \
ToUserName-value='#"+c.ToUserName+"' \
updatedAt-value='#"+c.updatedAt+"' \
Subject-value='#"+c.Subject+"' \
Message-value='#"+c.Message+"' \
href='http://vide.me/v?m="+c.File+"&messageid="+c.objectId+"' \
target='_blank'>\
			<img src=\"http://img.vide.me/"+c.File+".jpg\" alt=\"" + c.updatedAt + "\" title=\"" + c.updatedAt + "\" onerror='imgError(this);'>\
		</a>\
		<div class='videme-tile-signboard-"+c.Read+"'>"+c.ToUserName+"</div>\
	</div>\
</div>\
			")

	});
	$(".videme-tile").html(a.join(""));
	})
}
/***************************************************************************
Функция показать файлы My
***************************************************************************/
function ShowMy() {
	$(".videme-tile").html(VidemeProgress);
	$.getJSON("http://api.vide.me/file/my/?videmecallback=?",
		function(b) {
	$('.videme-brand-panel-element-center').html("\
<video controls>\
  <source src='http://gum.vide.me/vi?m=" + b['results'][0]['File'] + "&messageid=" + b['results'][0]['objectId'] + "' type='video/mp4'>\
  Your browser does not support the <code>video</code> element.\
</video>\
");
	$('.videme-brand-panel-element-right').html("\
<div class='videme-panel-message'>Share: </div>\
<button type='button' \
class='btn btn-primary contact-toggle' data-toggle='modal' \
data-target='#modal-contact' \
file-value='#" + b['results'][0]['File'] + "' \
subject-value='#" + b['results'][0]['Subject'] + "' \
message-value='#" + b['results'][0]['Message'] + "'>\
<span class='glyphicon glyphicon-envelope'></span> contact\
</button>\
&nbsp\
<button type='button' \
class='btn btn-primary list-toggle' data-toggle='modal' \
data-target='#modal-list' \
file-value='#" + b['results'][0]['File'] + "' \
subject-value='#" + b['results'][0]['Subject'] + "' \
message-value='#" + b['results'][0]['Message'] + "'>\
<span class='glyphicon glyphicon-list'></span> list\
</button>\
<hr class='visible-xs'>\
<button type='button' \
class='btn btn-danger pull-right hidden-xs del-my-toggle' data-toggle='modal' \
data-target='#modal-del' \
file-value='#" + b['results'][0]['File'] + "'>\
<span class='glyphicon glyphicon-remove'></span> delete\
</button>\
<button type='button' \
class='btn btn-danger pull-left visible-xs del-my-toggle' data-toggle='modal' \
data-target='#modal-del' \
file-value='#" + b['results'][0]['File'] + "'>\
<span class='glyphicon glyphicon-remove'></span> delete\
</button>\
");
	var a=[];
	$.each(b.results, function(d,c) {
	a.push("\
<div class='box'>\
	<div class='boxInner'>\
		<a class='file-my-url' \
file-value='#"+c.File+"' \
messageid-value='#"+c.objectId+"' \
FromUserName-value='#"+c.FromUserName+"' \
updatedAt-value='#"+c.updatedAt+"' \
Subject-value='#"+c.Subject+"' \
Message-value='#"+c.Message+"' \
href='http://vide.me/v?m="+c.File+"&messageid="+c.objectId+"' \
target='_blank'>\
			<img src=\"http://img.vide.me/"+c.File+".jpg\" alt=\"" + c.updatedAt + "\" title=\"" + c.updatedAt + "\" onerror='imgError(this);'>\
			<div class='videme-tile-signboard-true'>"+c.updatedAt+"</div>\
		</a>\
	</div>\
</div>\
			")
	});
	$(".videme-tile").html(a.join(""));
	})
}
/***************************************************************************
Функция показать файлы MySpring
***************************************************************************/
function ShowMySpring() {
	$(".videme-tile").html(VidemeProgress);
	$.getJSON("http://api.vide.me/file/myspring/?videmecallback=?",
		function(b) {
	$('.videme-brand-panel-element-center').html("\
<video controls>\
  <source src='http://gum.vide.me/vi?m=" + b['results'][0]['File'] + "&messageid=" + b['results'][0]['objectId'] + "' type='video/mp4'>\
  Your browser does not support the <code>video</code> element.\
</video>\
");
	$('.videme-brand-panel-element-right').html("\
<div class='videme-panel-message'>Share: </div>\
<button type='button' \
class='btn btn-primary contact-toggle' data-toggle='modal' \
data-target='#modal-contact' \
file-value='#" + b['results'][0]['File'] + "' \
subject-value='#" + b['results'][0]['Subject'] + "' \
message-value='#" + b['results'][0]['Message'] + "'>\
<span class='glyphicon glyphicon-envelope'></span> contact\
</button>\
&nbsp\
<button type='button' \
class='btn btn-primary list-toggle' data-toggle='modal' \
data-target='#modal-list' \
file-value='#" + b['results'][0]['File'] + "' \
subject-value='#" + b['results'][0]['Subject'] + "' \
message-value='#" + b['results'][0]['Message'] + "'>\
<span class='glyphicon glyphicon-list'></span> list\
</button>\
<hr class='visible-xs'>\
<button type='button' \
class='btn btn-primary pull-right hidden-xs del-sharefile-toggle' data-toggle='modal' \
data-target='#modal-del' \
file-value='#" + b['results'][0]['File'] + "'>\
<span class='glyphicon glyphicon-ban-circle'></span> Close Share\
</button>\
<button type='button' \
class='btn btn-primary pull-left visible-xs del-sharefile-toggle' data-toggle='modal' \
data-target='#modal-del' \
file-value='#" + b['results'][0]['File'] + "'>\
<span class='glyphicon glyphicon-ban-circle'></span> Close Share\
</button>\
");

	$(".contact-toggle").data("file-value", b['results'][0]['File']);
	$(".contact-toggle").data("subject-value", b['results'][0]['Subject']);
	$(".contact-toggle").data("message-value", b['results'][0]['Message']);
	$(".list-toggle").data("file-value", b['results'][0]['File']);
	$(".list-toggle").data("subject-value", b['results'][0]['Subject']);
	$(".list-toggle").data("message-value", b['results'][0]['Message']);
	$(".del-sharefile-toggle").data("file-value", b['results'][0]['File']);

	var a=[];
	$.each(b.results, function(d,c) {
	a.push("\
<div class='box'>\
	<div class='boxInner'>\
		<a class='file-myspring-url' \
file-value='#"+c.File+"' \
messageid-value='#"+c.objectId+"' \
FromUserName-value='#"+c.FromUserName+"' \
updatedAt-value='#"+c.updatedAt+"' \
Subject-value='#"+c.Subject+"' \
Message-value='#"+c.Message+"' \
href='http://vide.me/v?m="+c.File+"&messageid="+c.objectId+"' \
target='_blank'>\
			<img src=\"http://img.vide.me/"+c.File+".jpg\" alt=\"" + c.updatedAt + "\" title=\"" + c.updatedAt + "\" onerror='imgError(this);'>\
		</a>\
	</div>\
</div>\
			");
	});
	$(".videme-tile").html(a.join(""));
	})
}
/***************************************************************************
Функция показать Контакты
***************************************************************************/
function ShowMyContact() {
	$("#contact").html(VidemeProgress);
				$.getJSON("http://api.vide.me/contact/?videmecallback=?",
					function(data){
						var results = [];
						$.each(data['results'], function(i, result) {
						results.push("\
<div class='well well-lg'>\
	<a href='http://vide.me/rec.html?email=" + result.Email + "'>\
		" + result.Email + "\
		<button type='button' \
			class='btn btn-default pull-right btn-sm' data-toggle='modal' \
			email-value='#" + result.Email + "'>\
			<span class='glyphicon glyphicon-envelope'></span> Send video email\
		</button>\
	</a>\
	<button type='button' \
		class='btn btn-default pull-right btn-sm contact-edit-toggle' data-toggle='modal' \
		data-target='#modal-edit-contact' \
		email-value='#" + result.Email + "'>\
		<span class='glyphicon glyphicon-edit'></span> Edit\
	</button>\
</div>\
");
						});
						$('#contact').html(results.join(""));
					}
				);
}
/***************************************************************************
Функция показать List
***************************************************************************/
function ShowMyList() {
	$("#list-list").html(VidemeProgress);
				$.getJSON("http://api.vide.me/list/?videmecallback=?",
					function(data){

						var results = [];
						$.each(data['results'], function(i, result) {

						results.push("\
<div class='well well-lg'>\
	<a href='http://vide.me/rec.html?email=" + result.ListName + "'>\
		" + result.ListName + "\
	</a>\
	<button type='button' \
		class='btn btn-primary pull-right list-edit-toggle' data-toggle='modal' \
		data-target='#modal-edit-list' \
		list-value='#" + result.ListName + "'>\
		<span class='glyphicon glyphicon-edit'></span> Edit\
	</button>\
</div>\
");
						});

						$('#list-list').html(results.join(""));

					}
				);
}
/***************************************************************************
Функция построить панель
***************************************************************************/
function VidemePanelLayout() {
	var DocWidth = $(document).width();
	if (DocWidth < 767) {
		var ActorFontSize = DocWidth / 55;
		var DateFontSize = DocWidth / 55;
		var SubjectFontSize = DocWidth / 34;
		var MessageFontSize = DocWidth / 45;
/*
alert('DocWidthSize =' + DocWidth + 
'\r\nActorFontSize =' + ActorFontSize + 
'\r\nDateFontSize =' + DateFontSize + 
'\r\nSubjectFontSize =' + SubjectFontSize + 
'\r\nMessageFontSize =' + MessageFontSize);
*/
	} else {
		var ActorFontSize = DocWidth / 65;
		var DateFontSize = DocWidth / 65;
		var SubjectFontSize = DocWidth / 58;
		var MessageFontSize = DocWidth / 65;
/*
alert('DocWidthSize =' + DocWidth + 
'\r\nActorFontSize =' + ActorFontSize + 
'\r\nDateFontSize =' + DateFontSize + 
'\r\nSubjectFontSize =' + SubjectFontSize + 
'\r\nMessageFontSize =' + MessageFontSize);
*/
	}
	$('.videme-panel-actor').css('font-size', ActorFontSize + 'px');
	$('.videme-panel-date').css('font-size', DateFontSize + 'px');
	$('.videme-panel-subject').css('font-size', SubjectFontSize + 'px');
	$('.videme-panel-message').css('font-size', MessageFontSize + 'px');
};
/***************************************************************************
Функция перерисовать панель
***************************************************************************/
function VidemePanelRefresh() {
	var ImageURL = $('.videme-brand-panel-top').css('background-image'),
		ActualImage;
	// Remove url() or in case of Chrome url("")
	ImageURL = ImageURL.match(/^url\("?(.+?)"?\)$/);
	if (ImageURL[1]) {
		ImageURL = ImageURL[1];
		ActualImage = new Image();

		// just in case it is not already loaded
		$(ActualImage).load(function () {
			var VidemeBrandPanelHeight = $('.videme-brand-panel').height();
			var DocWidth = $(document).width();
			var AspectImage = (ActualImage.height / (ActualImage.width / DocWidth)) / 2 - (VidemeBrandPanelHeight / 2);
			$('.videme-brand-panel-top').css('background-position', 'center -' + AspectImage + 'px');
			if (($(document).width()) < 767) {
				if (ActualImage.width / ActualImage.height < 2.759  ) {
					$('.videme-brand-panel').css('background-size' , '100% auto');
					$('.videme-brand-panel-top').css('background-size' , '100% auto');
				} else {
					$('.videme-brand-panel').css('background-size' , 'auto 100%');
					$('.videme-brand-panel-top').css('background-size' , 'auto 100%');
				}
			}
		});
	ActualImage.src = ImageURL;
	}
};
