function moveDiv() {
	if ($(window).width() < 651) {
		$(".how-it-works__item--three").appendTo($(".how-it-works__items-box"));
	} else {
		$(".how-it-works__item--three").appendTo($(".how-it-works__items"));
	}
}
moveDiv();
$(window).resize(moveDiv);