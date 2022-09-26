export class FormValidator {
    constructor(settings, formElement) {
        this._formSelector = settings.formSelector;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._popupErrorSelector = settings.popupErrorSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._formElement = formElement;
    }
    
    // Показать сообщение ошибки валидации +  
    _showInputError(formElement, inputElement, errorMessage) {
        this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(this._inputErrorClass); 
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add(this._errorClass);
    }

    // Скрыть сообщение ошибки валидации +
    _hideInputError(formElement, inputElement) {
        this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        
        inputElement.classList.remove(this._inputErrorClass); 
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent ='';
    }
    
    // Валидация поля +
    _checkInputValidity(formElement, inputElement) {
        if(!inputElement.validity.valid){
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
          }
          else{
            this._hideInputError(formElement, inputElement);
          }
    }
    
    // выбор всех полей (внутри формы) и их валидация 
    _setEventListeners(formElement) {
        this._inputList =  Array.from(formElement.querySelectorAll(this._inputSelector));
        this._submitBtn = formElement.querySelector(this._submitButtonSelector);

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
              });    
        });
    }

    //отоброжение ошибки не заполненного поля при открытии формы 
    resetValidation(formElement) {
        this._inputList =  Array.from(formElement.querySelectorAll(this._inputSelector));

        this._inputList.forEach((inputElement) =>{
            this._hideInputError(formElement, inputElement);
        });
        
        this._toggleButtonState(this._formElement, this._submitBtn);
    }

    //блокировка кнопки отправки
    _toggleButtonState(formElement, submitBtn) {
        if(!formElement.checkValidity()){
            submitBtn.classList.add(this._inactiveButtonClass);
            submitBtn.setAttribute('disabled', true);
          }
          else{
            submitBtn.classList.remove(this._inactiveButtonClass);
            submitBtn.removeAttribute('disabled');
          }
    }

    //выбор всех Форм и их валидация 
    enableValidation() {
            this._formElement.addEventListener('input', (evt) => {
                evt.preventDefault();
                this._toggleButtonState(this._formElement, this._submitBtn);
              });
              this._setEventListeners(this._formElement);
    }

 }
