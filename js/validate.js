
// Показать сообщение ошибки валидации
const showInputError = (formElement, inputElement, errorMessage) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 

  inputElement.classList.add('form__field_type_error'); 
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__field_type_active');
};

// Скрыть сообщение ошибки валидации
const hideInputError = (formElement, inputElement) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 

  inputElement.classList.remove('form__input_type_error'); 
  errorElement.classList.remove('form__field_type_active');
  errorElement.textContent ='';
  };

// Валидация поля
  const checkInputValidity = (formElement, inputElement) => {
    if(!inputElement.validity.valid){
      showInputError(formElement, inputElement, inputElement.validationMessage);
    }
    else{
      hideInputError(formElement, inputElement);
    }
  };

  // Функция выбора всех полей (внутри формы) и их валидация
  function setEventListeners (formElement){
    const inputList = Array.from(formElement.querySelectorAll('.form__field'));
    
    inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
    });
  }); 
}

//Функция валидации полей при открытии формы
function isValidFilds(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__field'));
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);
  });
}


//Функция блокировки кнопки отправки
function stateSubmitButton (formElement){
  const submitBtn = formElement.querySelector('.form__submit-button');

  if(!formElement.checkValidity()){
    submitBtn.classList.add('form__submit-button_disabled');
    submitBtn.setAttribute('disabled', true);
  }
  else{
    submitBtn.classList.remove('form__submit-button_disabled');
    submitBtn.removeAttribute('disabled');
  }
}

// Функция выбора всех Форм и их валидация
function enableValidation(){
  const formList = Array.from(document.querySelectorAll('.form'));
  
formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  formElement.addEventListener('input', (evt) => {
    evt.preventDefault();
    stateSubmitButton(formElement);
  });
  setEventListeners(formElement);
});
}

enableValidation();