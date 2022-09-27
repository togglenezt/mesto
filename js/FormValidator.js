export class FormValidator {
    constructor(config, formElement) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._popupErrorSelector = config.popupErrorSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
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

    // выбор всех полей (внутри формы) и их валидация 
    _setEventListeners(formElement) {
        this._inputList =  Array.from(formElement.querySelectorAll(this._inputSelector));
        this._submitBtn = formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(this._formElement, this._submitBtn);

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState(this._formElement, this._submitBtn);
              });    
        });
    }

     
    //отоброжение ошибки не заполненного поля при открытии формы 
    resetValidation() {
        this._inputList.forEach((inputElement) =>{
            this._hideInputError(this._formElement, inputElement);
        });
        this._toggleButtonState(this._formElement, this._submitBtn);
    }

    //выбор всех Форм и их валидация 
    enableValidation() {
              this._setEventListeners(this._formElement);
    }

 }
