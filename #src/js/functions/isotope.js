const elem = document.querySelector('.catalog__items');
const iso  = new Isotope( elem, {
  // options
  itemSelector: '.catalog__item',
  layoutMode: 'fitRows'
});

// Работаем с кнопками фильтров
const allBtns = document.querySelector('.catalog__btns');
allBtns.addEventListener('click', (e) => {
   if (e.target.classList.contains('catalog__country-btn')) {
      document.querySelector('.catalog__country-btn._active').classList.remove('_active');
      e.target.classList.add('_active');
      let btnAttr = e.target.getAttribute('data-filter');
      iso.arrange({
         filter: btnAttr
     });
   }
});