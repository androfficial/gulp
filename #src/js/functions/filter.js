function testFilter() {
	const buttons = document.querySelectorAll('.gallery__btn');
	const items   = document.querySelectorAll('.gallery__item');

	function filter(currentCategory, cards) {
		const isShowAll = currentCategory === 'all';
		cards.forEach(function(card) {
			const category  = card.dataset.set;
			if (currentCategory != category && isShowAll == false) {
				card.classList.add('_hide')
			} else {
				card.classList.remove('_hide')
			}
		});
	};

	buttons.forEach(function(btn) {
		btn.addEventListener('click', function(clickBtn) {
			document.querySelector('.gallery__btn._active').classList.remove('_active');
			btn.classList.add('_active');
			const currentCategory = btn.dataset.filter;
			filter(currentCategory, items);
		});
	});
}

testFilter();