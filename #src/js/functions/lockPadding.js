function addPadding() {
	const headerBtn     	 = document.querySelector('.header__btn');
	const rightsideMenu 	 = document.querySelector('.rightside-menu');
	const body 				 = document.querySelector('body');
	const rightsideMenuClose = document.querySelector('.rightside-menu__close');
	const lockPadding 	     = document.querySelectorAll('._lock-padding');
	const wrapper 		     = document.querySelector('.wrapper');

	const lockPaddingValue   = window.innerWidth - wrapper.offsetWidth + 'px';
	//console.log(window.innerWidth);
	//console.log(wrapper.offsetWidth + 'px');
	//console.log(lockPaddingValue);

	headerBtn.addEventListener('click', function() {
		for (let i = 0; i < lockPadding.length; i++) {
			lockPadding[i].style.paddingRight = lockPaddingValue;
		}
		body.style.paddingRight = lockPaddingValue;
		rightsideMenu.classList.add('_active');
		body.classList.add('_lock');
	});

	rightsideMenuClose.addEventListener('click', function() {
		rightsideMenu.classList.remove('_active');
		setTimeout(function() {
			for (let i = 0; i < lockPadding.length; i++) {
				lockPadding[i].style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove('_lock');
		}, 600);
	})

}

addPadding();