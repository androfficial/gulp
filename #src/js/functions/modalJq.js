$(function() {
	const modalCall = $("[data-modal]");
	const modalClose = $("[data-close]");

	modalCall.on("click", function(event) {
		event.preventDefault();

		let $this = $(this);
		let modalId = $this.data('modal');

		$(modalId).addClass('_show');
		$('body').addClass('_lock');
		$('.slick-slider').slick('setPosition');
	});

	modalClose.on("click", function(event) {
		event.preventDefault();

		let $this = $(this);
		let modalParent = $this.parents('.modal');

		modalParent.removeClass('_show');
		$('body').removeClass('_lock');
	});

	/*Close modal click on window
	===============================================*/
	$(".modal").on("click", function(event) {
		$(this).removeClass('_show');
		$('body').removeClass('_lock');
	});

	$(".modal__dialog").on("click", function(event) {
		event.stopPropagation();
	});
}