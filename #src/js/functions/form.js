// const forms = document.getElementById('form');

// form.addEventListener('submit', (e) => {
//    e.preventDefault();
   
//    let error = checkValueInput(form);
//    if (error === 0) {
//       console.log('Спасибо за подписку!');
//    } else {
//       console.log('Пожалуйста, заполните поля.');
//    }
// });

// const checkValueInput = (form) => { 
//    let error = 0;
//    const inputs = form.querySelectorAll('._req');

//    for (let input of inputs) {
//       input.parentElement.classList.remove('_error', '_fld-email');
//       if (input.classList.contains('_email')) {
//          if (emailTest(input)) {
//             input.parentElement.classList.add('_error', '_fld-email');
//             error++;
//          }
//       } else {
//          if (input.value === '') {
//             input.parentElement.classList.add('_error');
//             error++;
//          }
//       }

//    }

//    return error;
   
// };

// function emailTest(input) {
//    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
// }

// В случае если не все поля обязательно заполнять
const form   = document.querySelector('.form-sub');
const inputs = form.querySelectorAll('input');

form.addEventListener('click', (e) => { // submit
   e.preventDefault();
   if (e.target.classList.contains('form-sub__btn') && e.target.previousElementSibling.value === '') {
      e.target.parentElement.classList.add('_error');
   }
   onChange();
});

const onChange = () => {
   if (inputs.length > 0) {
      for (let input of inputs) {
         input.addEventListener('blur', (e) => {
            input.parentElement.classList.remove('_error');
            if (input.classList.contains('_email')) {
               if(emailTest(input)) {
                  input.parentElement.classList.add('_error');
               }
            } else if (input.value === '') {
               input.parentElement.classList.add('_error');
            }
         });
      }
   }
};

onChange();

function emailTest(input) {
   return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}