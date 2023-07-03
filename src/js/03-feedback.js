import throttle from 'lodash.throttle';
const LOCAL_KEY = 'feedback-form-state';
 let formData = {};

 const refs = {
   form: document.querySelector('.feedback-form'),
   input: document.querySelector('.feedback-form  input'),
   textarea: document.querySelector('.feedback-form textarea'),
 };

 refs.form.addEventListener('input', throttle(onInputData, 500));
 refs.form.addEventListener('submit', onFormSubmit);

 populateFeedbackForm();

 function onInputData(e) {
   formData = {
     email: refs.input.value.trim(),
     message: refs.textarea.value.trim(),
   };
   formData[e.target.name] = e.target.value.trim(); // виводить в localStorage лише один ключ з значенням, якщо інший не заповнений
   localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
 }

 function onFormSubmit(e) {
   e.preventDefault();

   const { email, message } = e.currentTarget.elements;
   console.log({ email: email.value.trim(), message: message.value.trim() });

   if (localStorage.getItem(LOCAL_KEY)) {
     // let data = JSON.parse(localStorage.getItem(LOCAL_KEY));
     // console.log(data);
     localStorage.removeItem(LOCAL_KEY);
   }
   e.currentTarget.reset();
   formData = {};
 }

 function populateFeedbackForm() {
   let data = localStorage.getItem(LOCAL_KEY);
   if (!data) return;
   formData = JSON.parse(data);
   refs.input.value = formData.email ?? '';
   refs.textarea.value = formData.message ?? '';
 }