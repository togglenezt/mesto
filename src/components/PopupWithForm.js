import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popup, handleFormSubmit) {
        super(popup);
        this.handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.form__field');
    }
    
    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    close(){
        super.close();
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