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

  //----------if need check filling all the fields--------
  // if (refs.form.email.value && refs.form.message.value) {
  //   console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  //   e.currentTarget.reset();
  //   localStorage.removeItem(STORAGE_KEY);
  // } else {
  //   return alert('Please, fill in all the fields!');
  // }

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

function populateInputs() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage) {
    refs.form.email.value = savedMessage.email || '';
    refs.form.message.value = savedMessage.message || '';
  }
}
