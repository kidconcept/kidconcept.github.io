var capslock = (function() {

	/*========================== Preamble ==========================*/
	//===============================================================

	//Assign Elements
	var topBar = document.getElementById( "topBar" );
	var logo = document.getElementById("navLogo");
	var slides = document.getElementsByClassName("slide");

	//Init Variables
	var global = {};
	var currentSlide = 0;
	var navOpen = true;
	var slideSpeed = 4200;
	var slideWidth = 915;


	/*========================== Hero Slider ==========================*/
	//===================================================================

	//establish left/right slides
	function initSlides() {
		slideWidth = slides[1].offsetWidth;
		for (var i=0;i<slides.length;i++) {
			slides[i].left = slides[i].classList.contains('left');
			slides[i].right = slides[i].classList.contains('right');
			searchChildren(slides[i], i);
		};
	}

	//recurse through slides to get animated elements
	function searchChildren(element, slideNumber) {
		for(var i=0;i<element.children.length;i++) {
			if (element.children[i]) searchChildren(element.children[i], slideNumber);
		}
		if (element.classList.contains('headlines')) slides[slideNumber].headlines = element;
		if (element.classList.contains('readon')) slides[slideNumber].readon = element;
		if (element.classList.contains('slidetitle')) {
			slides[slideNumber].slidetitle = element;
			for(var j=0;j<element.children.length;j++) {
				slides[slideNumber].slidetitle[j] = element.children[j];
			}
		}
	}

	function prepNextSlide(slide) {
		var nextSlide;
		currentSlide < slides.length-1 ? nextSlide = currentSlide+1 : nextSlide = 0;
		slides[nextSlide].style.opacity = 1;
		if (slides[nextSlide].right) {
			slides[nextSlide].readon.style.transform = "translateX("+slideWidth+"px)";
			slides[nextSlide].headlines.style.transform = "translateX("+slideWidth+"px)";
		} else if (slides[nextSlide].left) {
			slides[nextSlide].readon.style.transform = "translateX(-"+slideWidth+"px)";
			slides[nextSlide].headlines.style.transform = "translateX(-"+slideWidth+"px)";
		}
		if ( slides[nextSlide].slidetitle ) {
			for (var i=0;i<slides[nextSlide].slidetitle.children.length;i++) {
				slides[nextSlide].slidetitle[i].style.opacity = 0;
				slides[nextSlide].slidetitle[i].style.transform = "translateY(-255px)";
			}
		}
	}

	function resetSlide(slide) {
		slide.classList.remove('open');
		slide.style.opacity = 0;
	}

	// Animate the slide elements and show the new slide
	function animateSlide() {
		slides[currentSlide].classList.add('open');
		if (slides[currentSlide].left || slides[currentSlide].right) {
			slides[currentSlide].left ? xPos = "-"+slideWidth+"px" : xPos = slideWidth+"px";
			Velocity(slides[currentSlide].headlines, {translateX: [0,xPos]}, {duration:300, complete:animateTitles});
		}

		function animateTitles() {
			var delay = 0;
			for (var i=0;i<slides[currentSlide].slidetitle.children.length;i++) {
				Velocity(slides[currentSlide].slidetitle[i], { opacity: 1,translateY: [0,"-255px"] }, {duration:200, delay:delay} );
				delay += 200;
				if(i+1===slides[currentSlide].slidetitle.children.length) setTimeout(animateReadon, delay);
			}
		}

		function animateReadon() {
			Velocity(slides[currentSlide].readon, {translateX: [0,xPos]}, {duration:300});

		}
	}

	// Slide Loop
	function changeSlides() {
		prepNextSlide();
		Velocity(slides[currentSlide], { opacity: 0 }, {duration:400,complete:nextSlide});
		function nextSlide() {
			resetSlide(slides[currentSlide]);
			currentSlide < slides.length-1 ? currentSlide++ : currentSlide = 0;
			animateSlide();
			setTimeout(changeSlides, slideSpeed);
		};
	};

	// Init Slider
	global.slider = function() {
		initSlides();
		setTimeout(changeSlides, slideSpeed);
	}

	/*========================== Simplefader ==========================*/
	//===================================================================
	global.simplefader = function() {
		initSimplefades();
	}

	function initSimplefades() {
		var simplefader = document.getElementById('simplefader');
	}


	/*========================== Logo Hider ==========================*/
	//===================================================================
	function scrollEvents() {
		var scrollPosition = window.scrollY;
		if ( scrollPosition > 0 && navOpen === true ) {
			hideTopBar();
		} else if ( scrollPosition === 0 && navOpen === false ) {
			showTopBar();
		};
	}

	function hideTopBar() {
		Velocity(navLogo, { top: "48px" }, 200);
		Velocity(topBar, { top: "-40px" }, 200);
		navOpen = false;
	}

	function showTopBar() {
		Velocity(navLogo, { top: "16px" }, 200);
		Velocity(topBar, { top: "0px" }, 200);
		navOpen = true;
	}

	global.nav = function() {
		//document.addEventListener('scroll', scrollEvents);
	}

	return global;

})();
