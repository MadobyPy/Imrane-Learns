$(document).ready(function() {
	var contents = ["Hello!", "My class", "My colours", "My toys", "My house", "My body", "Toy animals", "My food"],
		actFolderName = 'KB_INT_2E_EM_LSU0[%UNIT%]EX[%ACT%]_ALPHA',
		actPerUnit = 5;
	$('.start_button').click(function(e) {
		e.preventDefault();
		start();
	});
	$('.units_menu ul li a').click(function(e) {
		e.preventDefault();
		var r = $(this).parent().attr('data-rel');
		show_content(r);
	});
	$(document).on('click', '.unit_content .activities .activity', function(e) {
		e.preventDefault();
		var u = $(this).attr('data-unit'),
			a = $(this).attr('data-activity');
		show_activity(u,a)
	});
	function isTouch() {
		return 'ontouchstart' in window
			|| 'onmsgesturechange' in window;
	}
	function start() {
		$('.start_button').hide();
		var t = 200,
			l = $('.units_menu ul > li').length;
		for (var i=1;i<=l;i++) {
			anim(i,t);
		}
	}
	function anim (i,t) {
		var to=(t*i)/1.5;
		setTimeout(function(){$('.units_menu ul li[data-rel="'+i+'"]').animate({left:20}, t);},to);
	}
	function show_content(r) {
		fill_unit_content(r)
		$('.unit_content').css('right', '-600px').stop().animate({right:40}, 500);
	}
	function fill_unit_content(r) {
		var $e = $('.unit_content');
		$e.find('h1').html(contents[(r-1)]);
		$e.find('.activities').html(fill_unit_activities(r));
	}
	function fill_unit_activities(r) {
		var toret = '';
		for(var i=1;i<=actPerUnit;i++) {
			toret += '<div class="activity" data-unit="'+r+'" data-activity="'+i+'"><img src="resources/images/act/0'+r+'0'+i+'.jpg" border="0"/><br/>Activity '+i+'</div>';
		}
		return toret;
	}
	function show_activity(u,a) {
		var s = actFolderName.replace("[%UNIT%]", u).replace("[%ACT%]", a);
		$('.window .iframe iframe').attr('src', 'resources/act/'+s+'/index.html');
		$('.window').fadeIn(500);
		$('.content_wrapper').css('min-height', '1240px');
		$('.window .title .close').on('click', function() {close_activity();});
		if(isTouch()) {
			$('.window .iframe').attr('style', 'overflow: auto; -webkit-overflow-scrolling:touch;');
		}
	}
	function close_activity() {
		$('.window .iframe iframe').attr('src', 'about:blank');
		$('.window').fadeOut(500);
		$('.content_wrapper').css('min-height', '850px');
	}
});