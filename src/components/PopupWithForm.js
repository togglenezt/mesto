import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({popup, handleFormSubmit}) {
        super(popup);
        this.handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.form__field');
        this._submitButton = this._form.querySelector('.form__submit-button');
        this._submitDefaulText =  this._submitButton.textContent;
    }
    
    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    renderLoading(loading) {
        this._loadingMessage = 'Сохранение... ';

        loading ?
        this._submitButton .textContent = this._loadingMessage :
        this._submitButton.textContent = this._submitDefaulText;
    }

    close(){
        super.close();
        this.renderLoading(false);
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            
            this.handleFormSubmit(this._getInputValues());
        });
    }
}