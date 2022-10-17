import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor (popup) {
        super (popup);
        this._image = this._popup.querySelector('.pop-up__image');
        this._title = this._popup.querySelector('.pop-up__text-image');
    }

    open ({name, link}) {
        super.open();
        this._title.textContent = name;
        this._image.src = link;
        this._image.alt = name;
    }

    close() {
        super.close();
    }
}