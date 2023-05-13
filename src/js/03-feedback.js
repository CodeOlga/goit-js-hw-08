import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

populateInputs();

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

function populateInputs() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage) {
    refs.form.value = savedMessage;
  }
}
