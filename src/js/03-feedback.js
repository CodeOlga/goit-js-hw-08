import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
const { email, message } = form.elements;

populateInputs();

function onFormInput() {
  formData = { email: email.value, message: message.value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateInputs() {
  if (formData) {
    email.value = formData.email || '';
    message.value = formData.message || '';
  }
}
function onFormSubmit(e) {
  e.preventDefault();
  console.log({ email: email.value, message: message.value });

  //----------if need check filling all the fields--------
  if (!email.value || !message.value) {
    return alert('Please, fill in all the fields!');
  }

  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
  // formData = {};
}
