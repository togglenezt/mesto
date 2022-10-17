export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  //Открытие PopUp
  open() {
    this._popup.classList.add('pop-up_opened');
    document.addEventListener("keydown", this._handleEscClose);
  }
  //Закрытие PopUp
  close() {
    this._popup.classList.remove('pop-up_opened');
    document.removeEventListener("keydown", this._handleEscClose);
  }
  //Закрытие popUp при нажатии ESC 
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains('pop-up_opened') || evt.target.classList.contains('pop-up__close-button')) {
        this.close();
      }
    });
  }
}