
const BodyContent = document.querySelector('.travels-body__content');
const input       = document.querySelector('.travels-body__select');
const arrowDown   = input.nextElementSibling;
const subMenu     = document.querySelector('.travels-body__menu');

BodyContent.addEventListener('click', (e) => {
   if (e.target.classList.contains('travels-body__select') || e.target.classList.contains('_arrow-down') && !e.target.classList.contains('_people')) {
      if (input.classList.contains('_init')) {
         BodyContent.classList.remove('_init');
         input.classList.remove('_init');
         arrowDown.classList.remove('_init');
      } else {
         BodyContent.classList.add('_init');
         input.classList.add('_init');
         arrowDown.classList.add('_init');
      }
      subMenu.classList.toggle('_show');
      clickToClose(subMenu);
   }
});

if (document.querySelector('.menu-body__btns')) {
   const menuBnts = document.querySelectorAll('.menu-body__btns');
   
   for (let menuBtn of menuBnts) {
      menuBtn.addEventListener('click', (e) => {
         getCurrentCount = menuBtn.previousElementSibling;
         if (e.target.closest('.menu-body__btn')) {
            getIdBtn = e.target.id;
            if (getIdBtn === 'minus') {
               let number = +getCurrentCount.innerHTML;
               if (number > 0) {
                  let resultMinus = number - 1;
                  let string = String(resultMinus);
                  getCurrentCount.innerHTML = string;
               }
            } else if (getIdBtn === 'plus') {
               let number = +getCurrentCount.innerHTML;
               if (number < 999) {
                  let resultMinus = number + 1;
                  let string = String(resultMinus);
                  getCurrentCount.innerHTML = string;
               }   
            }
         }
      }); 
   }
}

   
const clickToClose = (object) => {
   document.addEventListener('click', (e) => {
      if (!e.target.closest('.travels-body__menu') && !e.target.closest('.travels-body__content')) {
         object.classList.remove('_show');
         BodyContent.classList.remove('_init');
         input.classList.remove('_init');
         arrowDown.classList.remove('_init');
      }
      if (!e.target.closest('.body-content__select-date')) {
         object.classList.remove('_init');
      }
   });
};