if (window.innerWidth < 481 && isMobile.any()) {
   const items = document.querySelector('.footer__items');
   items.addEventListener('click', (e) => {
      if (e.target.classList.contains('footer__title') || e.target.classList.contains('_arrow-down')) {
         const parent      = e.target.parentNode;
         const lastElement = parent.lastElementChild;

         parent.classList.toggle('_show');
         if (!lastElement.classList.contains('_show')) {
            lastElement.classList.add('_show');
            lastElement.style.height = 'auto'; // устанавливаем высоту авто

            const height = lastElement.clientHeight + 'px'; // получаем высоту элемента

            lastElement.style.height = '0px'; // устанавлиаем высоту 0 пикселей

            setTimeout(() => {
               lastElement.style.height = height; // устанавлиаем высоту полученого элемента
            }, 0);
         } else {
            lastElement.style.height = '0px';

            lastElement.addEventListener('transitionend', (e) => {
               lastElement.classList.remove('_show');
            }, {
               once: true
            });
         }
      }
   });
}