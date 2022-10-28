import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
    constructor(popup) {
        super(popup);
    }

    open(data) {
        super.open();
        this._setSubmitHandler = data;
    }

    setEventListeners() {
        super.setEventListeners();
    
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._setSubmitHandler();
        });
    }
}