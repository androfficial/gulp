$(function() {
	$('.menu__icon').on('click', function() {
	  this.toggleClass('_active');
	  $('.menu__list').toggleClass('_active');
	  $('body').toggleClass('_lock');
	});
}