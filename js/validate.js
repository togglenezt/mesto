const enableValidationSetting = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit-button',
  popupErrorSelector: '.form__text-error',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field_type_active'
};




// Показать сообщение ошибки валидации +
const showInputError = (formElement, inputElement, settings, errorMessage) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 

  inputElement.classList.add(settings.inputErrorClass); 
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

// Скрыть сообщение ошибки валидации +
const hideInputError = (formElement, inputElement, settings) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 

  inputElement.classList.remove(settings.inputErrorClass); 
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent ='';
  };

// Валидация поля +
  const checkInputValidity = (formElement, inputElement, settings) => {
    if(!inputElement.validity.valid){
      showInputError(formElement, inputElement, settings, inputElement.validationMessage);
    }
    else{
      hideInputError(formElement, inputElement, settings);
    }
  };

  // Функция выбора всех полей (внутри формы) и их валидация +
  function setEventListeners (formElement, settings){
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    
    inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
    });
  }); 
}

//Функция валидации полей при открытии формы +
function isValidFilds(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement, settings);
  });
}


//Функция блокировки кнопки отправки +
function stateSubmitButton (formElement, settings) {
  const submitBtn = formElement.querySelector(settings.submitButtonSelector);

  if(!formElement.checkValidity()){
    submitBtn.classList.add(settings.inactiveButtonClass);
    submitBtn.setAttribute('disabled', true);
  }
  else{
    submitBtn.classList.remove(settings.inactiveButtonClass);
    submitBtn.removeAttribute('disabled');
  }
}

// Функция выбора всех Форм и их валидация +
function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
formList.forEach((formElement) => {
  formElement.addEventListener('input', (evt) => {
    evt.preventDefault();
    stateSubmitButton(formElement, settings);
  });
  setEventListeners(formElement, settings);
});
}

enableValidation(enableValidationSetting);

