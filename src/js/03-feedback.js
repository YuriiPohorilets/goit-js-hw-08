import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const userData = {};
const refs = {
  form: document.querySelector('.feedback-form'),
};

restoreUserData();

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
  let savedUserData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedUserData) {
    Object.entries(savedUserData).forEach(([name, value]) => {
      userData[name] = value;
      refs.form.elements[name].value = value;
    });
  }
}

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormChange, 500));
