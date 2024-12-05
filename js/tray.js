/* Expands the little tray */

$(function() {

	$( ".trigger" ).click(function() {
		if ( $( ".tray" ).is( ":hidden" ) ) {
			$( ".tray" ).slideDown();
			$( ".trigger" ).toggleClass( "open" );
		} else {
			$( ".tray" ).slideUp();
			$( ".trigger" ).toggleClass( "open" );
		}
	});

});

