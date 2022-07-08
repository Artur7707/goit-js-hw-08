import { Notify } from 'notiflix/build/notiflix-notify-aio';
import throttle from 'lodash.throttle';
import localStorApi from './storage';

const formRef = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';
initForm();

const handleSubmit = event => {
  event.preventDefault();
  const { email, message } = event.target.elements;

  if (email.value === '' || message.value === '') {
    Notify.failure('Fill all the forms, and try again!');
    return;
  }

  const userData = {};

  const formData = new FormData(formRef);
  formData.forEach((value, name) => {
    userData[name] = value;
  });

  event.currentTarget.reset();
  localStorApi.remove(LOCAL_STORAGE_KEY);
  Notify.success('Success!!');
};

const handleInput = event => {
  const { name, value } = event.target;
  let persistedData = localStorApi.load(LOCAL_STORAGE_KEY);
  persistedData = persistedData ? persistedData : {};

  persistedData[name] = value;
  localStorApi.save(LOCAL_STORAGE_KEY, persistedData);
};

formRef.addEventListener('input', throttle(handleInput, 500));
formRef.addEventListener('submit', handleSubmit);

function initForm() {
  let persistedData = localStorApi.load(LOCAL_STORAGE_KEY);
  if (persistedData) {
    Object.entries(persistedData).forEach(([name, value]) => {
      formRef.elements[name].value = value;
    });
  }
}
