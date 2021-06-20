function checkScroll() {
	const header = document.querySelector('.header');
	const page   = document.querySelector('.page');

	if (window.pageYOffset > 120) {
		header.classList.add('_sticky');
	} else {
		header.classList.remove('_sticky');
	}
}
checkScroll();
window.addEventListener('scroll', checkScroll)