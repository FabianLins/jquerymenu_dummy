/*JS file of the Responsive jQuery Fixed Navigation Menu by Fabian Lins*/

$(document).ready(function() {

	/*Change this variable to adjust the width for the mobile view. Make sure you keep the qutation marks and px.*/
	change_menu_to_mobile_view="1023px";

	/*Change this variable to adjust the speed for sliding up/ down the burger menu. Only affects the mobile view.*/
	burger_menu_slide_speed=330;

	/*Change this variable to adjust the speed when you scroll to the same page.*/
	scroll_speed=500;

	/*DON'T CHANGE THIS VARIABLE!*/
	burger_menu_active=false;

	/*DON'T CHANGE THIS VARIABLE!*/
	fixed_menu_onclick=false;

	/*When the burger menu is getting activated*/
	function burgerMenuActive(){
		burger_menu_active=true;
		$(".menu_content").css({"display":"none"});
		menu_original_height=($(".menu").outerHeight()).toString()+"px";
		last_point=(($(".row_01-content").length)-1).toString();
		$(".row_01-content").css({"margin-left":"0px"});
		$(".row_01-content").addClass("row_01-content_no_boders");
		$(".row_01-content:eq("+last_point+")").removeClass("row_01-content_no_boders");
		$(".row_01").addClass("burger_menu_row_01");
		$(".row_01, .row_01-content").addClass("burger_menu_active");
		$(".menu").addClass("burger_menu_active_color");
		$(".menu").css({"border-radius":"0px 0px var(--row_01-content_rounded_corners) var(--row_01-content_rounded_corners)"});
		$(".burger_menu_icon_row:eq(0),.burger_menu_icon_row:eq(2),.burger_menu_icon_row:eq(4)").addClass("burger_menu_icon_active_color");
		$(".burger_menu_background_height").css("cssText", "background-size: 100%"+menu_original_height+"!important");
		$(".menu").addClass("burger_menu_background_height");
		$(".menu_content").slideDown(burger_menu_slide_speed);
		$(".menu_content").addClass("no_menu_content");
	
	}

	/*When the burger menu is getting deactivated*/
	function burgerMenuUnactive(){
		burger_menu_active=false;
		$(".menu").removeClass("burger_menu_original_height");
		$(".menu").css({"border-radius":"0px"});
		$(".row_01").removeClass("burger_menu_row_01");
		$(".row_01, .row_01-content").removeClass("burger_menu_active");
		$(".menu").removeClass("burger_menu_active_color");
		$(".burger_menu_icon_row:eq(0),.burger_menu_icon_row:eq(2),.burger_menu_icon_row:eq(4)").removeClass("burger_menu_icon_active_color");
		$(".row_01-content").removeClass("row_01-content_no_boders");
		$(".menu").removeClass("scrollbar");
		$(".menu_content").removeClass("no_menu_content");
	}

	/* Defines the menu_bottom value. If the navi is at the top it fixes at the bottom of the navi, if the navi is set lower, it fixes at the top of the navi.*/
	function menuBottom(){
		if ($(".menu").outerHeight()>$(".menu").offset().top){
			menu_bottom=$(".menu").outerHeight()+$(".menu").offset().top;
		}
		else {
			menu_bottom=$(".menu").offset().top;
		}
	}

	/* Compares the y-position to the bottom position of the menu (var menu-bottom), when the page is loaded (important for refreshing!).*/
	function yoffset(){
		if (window.pageYOffset >= menu_bottom) {
			$(".menu").addClass("fixed_menu");
			fixed_menu_active=true;
			current_menu_height=($(".menu").outerHeight()).toString()+"px";
			$(".menu_height").css({"height":current_menu_height});
			$(".avoid_jump").show();
		}
		else {
			$(".menu").removeClass("fixed_menu");
			fixed_menu_active=false;
			$(".avoid_jump").hide();
		}
	}

	/* Checks for the screen size and decides either the desktop or burger menu needs to be used.*/
	function mediaQuery(){
		if (window.matchMedia("(max-width:"+change_menu_to_mobile_view+")").matches) {
			$(".row_01").addClass("hide");
			$("#burger_menu_icon").removeClass("hide");
		/* Get the height of the mobile menu and adds the top position to the value.*/
			$(".menu").removeClass("fixed_menu");
			menuBottom();
			yoffset();
		} else {
		/* Get the height of the desktop menu and adds the top position to the value.*/	
			$(".menu").removeClass("fixed_menu");
			burgerMenuUnactive();
			$(".row_01").removeClass("hide");
			$("#burger_menu_icon").addClass("hide");
			$(".menu_content").css({"display":"block"});
			menuBottom();
			yoffset();
		}
	}

	function burgerMenuIconClick(){
		if (burger_menu_active===false) {
			burgerMenuActive();
			$(".burger_menu_background_height").css("cssText", "background-size: 100%"+menu_original_height+"!important");
			$(".menu").addClass("burger_menu_background_height");
			$(".menu").css({"border-radius":"0px 0px var(--row_01-content_rounded_corners) var(--row_01-content_rounded_corners)"});	
		}
		else {
			$(".menu_content").slideUp(burger_menu_slide_speed);
			burgerMenuUnactive();
		}
	}

	mediaQuery();

	yoffset();

	$(window).on('resize', function(){
		mediaQuery();
		if (burger_menu_active===true){
			burgerMenuUnactive();
		}		
  	});

	/* When the user scrolls, compare the y-position of the window to the bottom posistion (var menu_bottom) of the menu.*/
	window.onscroll = function() {
		if(fixed_menu_onclick===false)
		{
			yoffset();
		}
	};

	/* When you move the mouse over a menu point (row_01)*/
	$(".row_01").hover(function(){
		if (burger_menu_active===false){
			current_index=$(this).parent().children(".row_01").index(this).toString();
			current_position=($(".row_01:eq("+current_index+")").offset().left-$(".row_01").offset().left).toString();
			$(".row_01-content").css({"margin-left": current_position+"px"});
			$(".row_01-content:eq("+current_index+")").removeClass("hide");
			$(".row_01:eq("+current_index+"), .row_01 a:eq("+current_index+")").addClass("row_01-mouseover");
			$(".row_01-content:eq("+current_index+")").each(
				function() {
					last_element_of_content=(($("a", $(this)).length)-1).toString();
				}
			);
			$(".row_01-content:eq("+current_index+") a:eq("+last_element_of_content+")").css({"border-radius":"0px 0px var(--row_01-content_rounded_corners) var(--row_01-content_rounded_corners)"});
		}
	},
	/* When you move the mouse out of a menu point (row_01) */
	function() {
		if (burger_menu_active===false){
			$(".row_01-content:eq("+current_index+")").addClass("hide");
			$(".row_01:eq("+current_index+"), .row_01 a:eq("+current_index+")").removeClass("row_01-mouseover");
			$(".row_01-content:eq("+current_index+") a:eq("+last_element_of_content+")").css({"border-radius":"0px"});
		}
	});

	/* When you moue the mouse over a part of the dropdown points (row_01-content)*/
	$(".row_01-content").hover(function(){
		if (burger_menu_active===false){
			$(".row_01-content:eq("+current_index+")").removeClass("hide");
			$(".row_01:eq("+current_index+"), .row_01 a:eq("+current_index+")").addClass("row_01-mouseover");
		}
	},
	/* When you move the mouse out of a part of the dropdown points (row_01-content)*/
	function() {
		if (burger_menu_active===false){
			$(".row_01-content:eq("+current_index+")").addClass("hide");
			$(".row_01:eq("+current_index+"), .row_01 a:eq("+current_index+")").removeClass("row_01-mouseover");

		}
	});

	/* When you click on the burger menu icon*/
	$("#burger_menu_icon").click(function(){
		burgerMenuIconClick();
		setTimeout(function(){
			if($(".menu").outerHeight()>$(window).outerHeight())
			{
				$(".menu").addClass("scrollbar");
			}
		},300);
	});

	/* Fixes the round borders of the menu.*/
	$(".row_01-content a").hover(function(){
		if (burger_menu_active===true) {
			last_point_num=(($(".row_01-content").length));
			for (var i = 0; i < last_point_num-1; ++i) {
				var current_point=i.toString();
				$(".row_01-content:eq("+current_point+")").each(
					function() {
						last_element_of_content=(($("a", $(this)).length)-1).toString();
					});
					$(".row_01-content:eq("+current_point+") a:eq("+last_element_of_content+")").css({"border-radius":"0px 0px 0px 0px"});
			}
			last_point=(($(".row_01-content").length)-1).toString();
			$(".row_01-content:eq("+last_point+")").each(
				function() {
					last_element_of_content=(($("a", $(this)).length)-1).toString();
				});
			$(".row_01-content:eq("+last_point+") a:eq(+"+last_element_of_content+")").hover(function(){
				$(this).css({"border-radius":"0px 0px var(--row_01-content_rounded_corners) var(--row_01-content_rounded_corners)"});
			},
			function(){
				$(this).css({"border-radius":"0px 0px var(--row_01-content_rounded_corners) var(--row_01-content_rounded_corners)"});
			});
		}
		else {
			last_point_num=(($(".row_01-content").length));
			for (var i = 0; i < last_point_num; ++i) {
				var current_point=i.toString();
				$(".row_01-content:eq("+current_point+")").each(
					function() {
						last_element_of_content=(($("a", $(this)).length)-1).toString();
					});
					$(".row_01-content:eq("+current_point+") a:eq("+last_element_of_content+")").css({"border-radius":"0px 0px var(--row_01-content_rounded_corners) var(--row_01-content_rounded_corners)"});
			}
		}
	});

	/* When you click on a link in the first row.*/
	$(".row_01-content a, .row_01 a, .row_01").click(function(){
		if (burger_menu_active===true) {
			$(".menu_content").slideUp(burger_menu_slide_speed);
			burgerMenuUnactive();
		}
		var this_href = $(this).attr("href");
		if (typeof this_href==="undefined") {
			this_href = $(this).find("a").attr("href");
		}
		if(fixed_menu_active===true) {
			$("html, body").animate({
				scrollTop: $(this_href).offset().top-$(".menu").outerHeight()
			}, scroll_speed);
		}
		else{
			fixed_menu_onclick=true;
			var top = ($(document).scrollTop()).toString();
				$(".menu").addClass("fixed_menu");
				current_menu_height=($(".menu").outerHeight()).toString()+"px";
				$(".menu_height").css({"height":current_menu_height});
				$(".avoid_jump").show();
				$("html, body").animate({
					scrollTop: $(this_href).offset().top-$(".menu").outerHeight()
				}, scroll_speed);
				$(".menu").removeClass("menu_smooth_transition");
				$(".menu").removeClass("transform");
				setTimeout(function(){
					fixed_menu_onclick=false;
				},scroll_speed);
		}
	});
});