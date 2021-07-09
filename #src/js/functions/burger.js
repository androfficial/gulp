const body   = document.querySelector('body');
const burger = document.querySelector('.menu__icon');
const menu   = document.querySelector('.menu__body');

burger.addEventListener('click', () => {
   body.classList.toggle('_lock');
   burger.classList.toggle('_active');
   menu.classList.toggle('_active');
});