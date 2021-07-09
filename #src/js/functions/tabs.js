if (window.innerWidth < 992 && isMobile.any()) {
   document.querySelector('.sub__top').addEventListener('click', (e) => {
      if (e.target.classList.contains('sub__subtitle')) {
         const currentTarget = e.target === document.querySelector('.sub__top').firstElementChild;
         if (currentTarget === true) {
            e.target.classList.remove('_active');
            e.target.nextElementSibling.classList.add('_active');
         } else {
            e.target.classList.remove('_active');
            e.target.previousElementSibling.classList.add('_active');
         }
         const targetAttr = e.target.getAttribute('data-type');
         const allItems = document.querySelectorAll('.form-sub__contacts');
         for (let item of allItems) {
            let itemAttr = item.getAttribute('data-show');
            if (targetAttr !== itemAttr) {
               item.classList.remove('_show');
               item.classList.add('_hide');
            } else {
               //e.target.classList.add('_active');
               item.classList.remove('_hide');
               item.classList.add('_show');
            }
         }
      }
   });
}