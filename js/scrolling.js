/* Animates the logo as you scroll down the page */

$(function() {

	/* Scrolling functions */
	var exposeLogo = $( window ).height() * .5;
	var logoShowing = false;

	$( window ).scroll(function() {

		/* Gets current scroll position */
		scrollPosition = $( window ).scrollTop();

		/* Swaps contact from with video as screen is scrolled */
		if ( scrollPosition > exposeLogo && logoShowing == false ) {

			$( ".logo img" ).animate( { top: "16px" }, 200);
			logoShowing = true;

		} else if ( scrollPosition < exposeLogo && logoShowing == true ) {


			$( ".logo img" ).animate( { top: "48px" }, 200);
			logoShowing = false;

		};

	});

});

