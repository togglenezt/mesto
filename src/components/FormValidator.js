export default class FormValidator {
    constructor(config, formElement) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._popupErrorSelector = config.popupErrorSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
        this._submitBtn = formElement.querySelector(this._submitButtonSelector);
    }
    
    // Показать сообщение ошибки валидации +  
    _showInputError(inputElement, errorMessage) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(this._inputErrorClass); 
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add(this._errorClass);
    }

    // Скрыть сообщение ошибки валидации +
    _hideInputError(inputElement) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        
        inputElement.classList.remove(this._inputErrorClass); 
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent ='';
    }
    
    // Валидация поля +
    _checkInputValidity(inputElement) {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
        else {
            this._hideInputError(inputElement);
        }
    }

    //блокировка кнопки отправки
    _toggleButtonState() {
        if(!this._formElement.checkValidity()) {
            this._submitBtn.classList.add(this._inactiveButtonClass);
            this._submitBtn.disabled = true;
          }
          else {
            this._submitBtn.classList.remove(this._inactiveButtonClass);
            this._submitBtn.disabled = false;
          }
    }

    // выбор всех полей (внутри формы) и их валидация 
    _setEventListeners(formElement) {
        this._inputList =  Array.from(formElement.querySelectorAll(this._inputSelector));
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
              });    
        });
    }

    //отоброжение ошибки не заполненного поля при открытии формы 
    resetValidation() {
        this._inputList.forEach((inputElement) =>{
            this._hideInputError(inputElement);
        });
        this._toggleButtonState();
    }

    //выбор всех Форм и их валидация 
    enableValidation() {
              this._setEventListeners(this._formElement);
    }
 }
