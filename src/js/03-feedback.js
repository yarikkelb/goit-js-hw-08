import throttle from 'lodash.throttle';
const LOCAL_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
populateFeedbackForm();
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInputData, 500));

function onFormSubmit(e) {
    e.preventDefault();
   const { email, message } = e.currentTarget.elements;
   console.log({ email: email.value, message: message.value });
   if (localStorage.getItem(LOCAL_KEY)) {
     localStorage.removeItem(LOCAL_KEY);
   }
   e.currentTarget.reset();
 }
 function onInputData(e) {
   let data = localStorage.getItem(LOCAL_KEY);
  data = data ? JSON.parse(data) : {};
   data[e.target.name] = e.target.value.trim();
   localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
 }

 function populateFeedbackForm() {
   let data = localStorage.getItem(LOCAL_KEY);
   if (!data) return;
   data = JSON.parse(data);
    Object.entries(data).forEach(([name, value]) => {
     form.elements[name].value = value || '';
  });
  for (const key in data) {
    form.elements[key].value = data[key] || '';
   }
 }