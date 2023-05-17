// import throttle from 'lodash.throttle';

// const STORAGE_KEY = 'feedback-form-state';

// const form = document.querySelector('.feedback-form');

// form.addEventListener('submit', onFormSubmit);
// form.addEventListener('input', throttle(onFormInput, 500));

// let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
// const { email, message } = form.elements;

// populateInputs();

// function onFormInput() {
//   formData = { email: email.value, message: message.value };
//   console.log(formData);
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
// }
// //--------2 option--------------------------
// // function onFormInput(e) {
// //   formData[e.target.name] = e.target.value;
// //   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
// // }

// function populateInputs() {
//   if (formData) {
//     email.value = formData.email || '';
//     message.value = formData.message || '';
//   }
// }
// function onFormSubmit(e) {
//   e.preventDefault();
//   console.log(formData);
//   // console.log({ email: email.value, message: message.value });

//   //----------if need check filling all the fields--------
//   if (!email.value || !message.value) {
//     return alert('Please, fill in all the fields!');
//   }

//   localStorage.removeItem(STORAGE_KEY);
//   e.currentTarget.reset();
//   formData = {};
// }

//----------------------------2-----------------------------------
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

populateInputs();

//Функція, що зберігає дані з полів форми у localStorage

function onFormInput(e) {
  //в об'єкт formData з таким ключем покласти таке значення:
  //в email буде записуваться значення імейла, в message - значення месседжа
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Функція, яка зчитує localStorage. Якщо у localStorage зберігається інформація - то виводить її у відповідне поле/відповідні поля

function populateInputs() {
  //отримуємо в savedMessage (об'єкт) информацию из localStorage (це буде теж саме, що і об'єкт formData )
  //якщо в localStorage щось є, то в поля форми записуємо те що є в полях об'єкта savedMessage
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    form.email.value = savedMessage.email || '';
    form.message.value = savedMessage.message || '';
  }
}

//Функція, що спрацьовує при сабміті форми. Якщо всі поля заповнені, консолить значення localStorage, очищує поля форми, видаляє інформацію з localStorage

function onFormSubmit(e) {
  e.preventDefault();
  console.log(formData);

  if (!form.email.value || !form.message.value) {
    return alert('Please, fill in all the fields!');
  }

  //видаляє інформацію з localStorage
  localStorage.removeItem(STORAGE_KEY);
  //очищує поля форми
  e.currentTarget.reset();
  //обов'язково очищувати formData, щоб в нього не тягнулись частково дані з localStorage
  formData = {};
}
