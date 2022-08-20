import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const userData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  inputEmail: document.querySelector('.feedback-form [name=email]'),
  inputTextarea: document.querySelector('.feedback-form [name=message]'),
};

function onFormChange(e) {
  userData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
}

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
}

function restoreUserData() {
  const savedUserData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedUserData) {
    refs.inputEmail.value = savedUserData.email;
    refs.inputTextarea.value = savedUserData.message;
  }
}

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormChange, 500));
restoreUserData();
