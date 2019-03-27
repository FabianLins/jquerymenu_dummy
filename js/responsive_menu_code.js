/*JS file of the Responsive jQuery Fixed Drop Down Menu by Fabian Lins*/

$(document).ready(function() {

	/*Change this variable to adjust the width for the mobile view. Make sure you keep the qutation marks and px - for example: "1023px".*/
	change_menu_to_mobile_view="1023px";

	/*Change this variable to adjust the speed for sliding up/ down the burger menu. Only affects the mobile view.*/
	burger_menu_slide_speed=330;

	/*Change this variable to adjust the speed when you scroll to the same page.*/
	menu_scroll_speed=500;

	/*Change this variable to adjust the speed when the menu gets put to the top.*/
	menu_to_top_scroll_speed=menu_scroll_speed/5

	/*DON'T CHANGE THIS VARIABLE!*/
	fixed_menu_onclick=false;

	/*DON'T CHANGE THIS VARIABLE!*/
	burger_menu_expanded=false;

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
		$(".menu").css({"border-radius":"0px 0px var(--row_01-content_rounded_corners) var(--row_01-content_rounded_corners)"});
		$(".burger_menu_icon_row:eq(0),.burger_menu_icon_row:eq(2),.burger_menu_icon_row:eq(4)").addClass("burger_menu_icon_active_color");
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
		current_menu_height=($(".menu").outerHeight());
		$(".avoid_jump").css({"height":current_menu_height+"px"});
	}

	/* Compares the y-position to the bottom position of the menu (var menu-bottom), when the page is loaded (important for refreshing!).*/
	function yoffset(){
		if (window.pageYOffset >= menu_bottom) {
			$(".menu").addClass("fixed_menu");
			fixed_menu_active=true;
		}
		else {
			$(".menu").removeClass("fixed_menu");
			fixed_menu_active=false;
		}
	}

	/* Checks for the screen size and decides either the desktop or burger menu needs to be used.*/
	function mediaQueryMenu(){
		if (window.matchMedia("(max-width:"+change_menu_to_mobile_view+")").matches) {
			$(".row_01").addClass("hide");
			$(".row_01-content").addClass("hide");
			$("#burger_menu_icon").removeClass("hide");
			$(".menu").removeClass("fixed_menu");
			menuBottom();
			yoffset();
			burger_menu_active=true;
		} else {
			$(".menu").removeClass("fixed_menu");
			burgerMenuUnactive();
			$(".row_01").removeClass("hide");
			$("#burger_menu_icon").addClass("hide");
			$(".menu_content").css({"display":"block"});
			menuBottom();
			yoffset();
			burger_menu_active=false;
			burger_menu_expanded=false;
		}
	}

	function burgerMenuIconClick(){
		if (burger_menu_expanded===false) {
			burgerMenuActive();
			$(".menu").css({"border-radius":"0px 0px var(--row_01-content_rounded_corners) var(--row_01-content_rounded_corners)"});	
			burger_menu_expanded=true;
		}
		else {
			slideBurgerMenuUp();
		}
	}

	function slideBurgerMenuUp(){
		$(".menu_content").slideUp(burger_menu_slide_speed);
		setTimeout(function(){
			burgerMenuUnactive();
		},burger_menu_slide_speed+50);
		burger_menu_expanded=false;
	}

	mediaQueryMenu();

	yoffset();

	$(window).on("resize", function(){
		mediaQueryMenu();
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

	/* Keyboard accessibility */
	$(document).keydown(function(e) {
		var key_pressed = e.keykey_pressed || e.which;
		/* Tab Key */
		if (key_pressed == "9") {
			$(".row_01-content:eq("+current_index+")").each(
				function() {
					last_element_of_content=(($("a", $(this)).length)-1).toString();
				});
				if(burger_menu_active===true){
						if ($(".row_01-content:eq("+last_point+") a:eq(+"+last_element_of_content+")").is(":focus")) {
							burgerMenuIconClick();
						}
				}
				if ($(".row_01-content:eq("+current_index+") a:eq(+"+last_element_of_content+")").is(":focus")) {
					$(".row_01:eq("+current_index+"), .row_01 a:eq("+current_index+")").removeClass("row_01-mouseover");
					$(".row_01-content").addClass("hide");
				}
		}
		else{
			/* Esc Key */
			if (key_pressed == "27") {
				if(burger_menu_expanded===true) {
					slideBurgerMenuUp();
				}
				else{
					$(".row_01-content").addClass("hide");
					$(".row_01, .row_01 a").removeClass("row_01-mouseover")
				}
			}
		}
	});

	/* When you move the mouse over a menu point (row_01)*/
	$(".row_01").on(
	"mouseenter focusin", function () {
		if (burger_menu_active===false){
			current_index=$(this).parent().children(".row_01").index(this).toString();
			current_position=($(".row_01:eq("+current_index+")").offset().left-$(".row_01").offset().left).toString();
			$(".row_01-content").css({"margin-left": current_position+"px"});
			$(".row_01-content:eq("+current_index+")").removeClass("hide");
			$(".row_01-content:eq("+current_index+")").css({"max-height":$(window).outerHeight(true)-($(".menu").outerHeight(true))});
			$(".row_01:eq("+current_index+"), .row_01 a:eq("+current_index+")").addClass("row_01-mouseover");
			$(".row_01-content:eq("+current_index+")").each(
				function() {
					last_element_of_content=(($("a", $(this)).length)-1).toString();
				}
			);
			$(".row_01-content:eq("+current_index+") a:eq("+last_element_of_content+")").css({"border-radius":"0px 0px var(--row_01-content_rounded_corners) var(--row_01-content_rounded_corners)"});
			for (var i = 0; i < $(".row_01").length; ++i) {
				if(i!=current_index){
					$(".row_01:eq("+i+"), .row_01:eq("+i+") a").removeClass("row_01-mouseover");
					$(".row_01-content:eq("+i+")").addClass("hide");
				}
			}
		}
		else{
			current_index=$(this).parent().children(".row_01").index(this).toString();
			$(".row_01:eq("+current_index+"), .row_01 a:eq("+current_index+")").addClass("row_01-mouseover");
			$(".row_01:eq("+current_index+")").removeClass("burger_menu_row_01");
		}
	});

	/* Removes the focus when you move the mouse over a menu point*/
	$(".row_01, .row_01-content").on(
	"mouseenter ", function () {
		document.activeElement.blur();
	});

	/* When you move the mouse out of a menu point (row_01) */
	$(".row_01").on(
	"mouseleave focusout", function () {
		if (burger_menu_active===true){
			current_index=$(this).parent().children(".row_01").index(this).toString();
			$(".row_01:eq("+current_index+"), .row_01 a:eq("+current_index+")").removeClass("row_01-mouseover");
			$(".row_01:eq("+current_index+")").addClass("burger_menu_row_01");
		}
	});

	/* When you move the mouse out of a menu point (row_01) second part*/
	$(".row_01").on(
	"mouseleave", function () {
		if (burger_menu_active===false){
			$(".row_01:eq("+current_index+"), .row_01 a:eq("+current_index+")").removeClass("row_01-mouseover");
			$(".row_01-content:eq("+current_index+")").addClass("hide");
		}
	});

	/* When you moue the mouse over a part of the dropdown points (row_01-content)*/
	$(".row_01-content").on(
		"mouseenter focusin", function () {
		if (burger_menu_active===false){
			$(".row_01-content:eq("+current_index+")").removeClass("hide");
			$(".row_01:eq("+current_index+"), .row_01 a:eq("+current_index+")").addClass("row_01-mouseover");
		}
	});

	/* When you move the mouse out of a part of the dropdown points (row_01-content)*/
	$(".row_01-content").on(
	"mouseleave", function () {
		if (burger_menu_active===false){
			$(".row_01-content:eq("+current_index+")").addClass("hide");
			$(".row_01:eq("+current_index+"), .row_01 a:eq("+current_index+")").removeClass("row_01-mouseover");
			$(".row_01-content:eq("+current_index+")").css({"max-height":""});
		}
	});

	/* When you click on the burger menu icon*/
	$("#burger_menu_icon").on(
	"click keypress", function () {
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

	/* When you click on a link.*/
	$(".row_01-content a, .row_01 a, .row_01").click(function(e){
		if ($(":animated").length) {
        	return false;
    	}
		$(".row_01-content").addClass("hide");
		$(".row_01, .row_01 a").removeClass("row_01-mouseover");
		if (burger_menu_active===true) {
			slideBurgerMenuUp();
			burger_menu_active=true;
		}
		var this_href = $(this).attr("href");
		if (typeof this_href==="undefined") {
			this_href = $(this).find("a").attr("href");
		}
		if(fixed_menu_active===true) {
			$("html, body").animate({
				scrollTop: $(this_href).offset().top-current_menu_height			
			}, menu_scroll_speed);
		}
		else{
			e.preventDefault();
			$(this).prop('disabled', true);
			if (burger_menu_active===false) {
				$(".row_01-content:eq("+current_index+")").addClass("hide");
			}
			fixed_menu_onclick=true;
			var current_menu_top_position=($(".menu").offset().top)+"px";
			$(".menu").addClass("menu_top_transform");
			$(".menu_top_transform").css({"top":current_menu_top_position});
			$(".menu_top_transform").animate({
				top: $(document).scrollTop()+"px"
			},menu_to_top_scroll_speed);
			setTimeout(function(){
				$(".menu_top_transform").css({"top":current_menu_top_position});
				$(".menu").removeClass("menu_top_transform");
				$(".menu").addClass("fixed_menu");
				$("html, body").animate({
					scrollTop: $(this_href).offset().top-current_menu_height
				}, menu_scroll_speed);
				setTimeout(function(){
					fixed_menu_onclick=false;
					burger_menu_active=false;
				},menu_scroll_speed);
			},menu_to_top_scroll_speed+50);
		}
		burger_menu_expanded=false;
		document.activeElement.blur();
	});
});