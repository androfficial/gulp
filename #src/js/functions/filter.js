const newFilter = () => {
	const allBtns  = document.querySelector('.catalog__btns');
	const allItems = document.querySelectorAll('.catalog__item');

	allBtns.addEventListener('click', (e) => {
		let target = e.target;
		if (target.classList.contains('catalog__country-btn')) {
			document.querySelector('.catalog__country-btn._active').classList.remove('_active');
			target.classList.add('_active');
			let btnAttr = target.getAttribute('data-filter');
			for (let item of allItems) {
				let itemAttr = item.getAttribute('data-country');
				if (btnAttr !== itemAttr && btnAttr !== 'all') {
					item.classList.add('_hide');
				} else {
					item.classList.remove('_anime');
					item.classList.remove('_hide');
				}
			}
		}
	});

};

newFilter();