$('.slider').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	infinite: true,
	fade: true,
	arrows: false,
	dots: true,
	responsive: [
		{
			breakpoint: 769,
			settings: {
				//arrows: false,
				//autoplay: true
			}
		},
	]
});