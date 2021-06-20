$(function() {
	$('.questions__list-item-header').on('click', function(){
		$(this).toggleClass('_active');
		$(this).next().toggleClass('_active');
	});
})