const popUpOverlay = document.querySelector('.pop-up-overlay');
const popUpImageContainer = document.querySelector('.pop-up__image-container');
const popUpImage = popUpImageContainer.querySelector('.pop-up__image');
const popUpTextImage = popUpImageContainer.querySelector('.pop-up__text-image');
const gallery = document.querySelector('.gallery');


export class Card {
    constructor(data, template, popUp) {
        this._title = data.name;
        this._link = data.link;
        this._template = template;
        this._popUp = popUp;

        this._gallery = gallery;
        this._popUpOverlay = popUpOverlay;
        this._popUpImageContainer = popUpImageContainer
        this._popUpImage = popUpImage;
        this._popUpTextImage = popUpTextImage;
    }
    
    //Получение шаблона
    _getTemplate() {
        return this._template.cloneNode(true).content;
    }
    
    //Создание карточки
    _generateCard() {
        this._element = this._getTemplate();
        this._placeImage =  this._element.querySelector('.place__image');

        this._placeImage.src = this._link;
        this._placeImage.alt = this._title;
        this._element.querySelector('.place__title').textContent = this._title;

        this._setEventListeners();
        return this._element;
    } 

    //Медот отметки like
    _toggleLike(evt) {
        evt.target.classList.toggle('place__like_click_active');
    }

    //Медот удалиния карточки
    _deleteCard(evt) {
        evt.target.closest('.place').remove();
    }

    //открытие модального окна с картинкой
    _handleOpenPopup(evt) {
        this._popUp(this._popUpOverlay);
        this._popUpImage.src = evt.target.src;
        this._popUpImage.alt = evt.target.alt;
        this._popUpTextImage.textContent = evt.target.alt;
    }

    //Сбор обработчиков
    _setEventListeners() {

        //Открытие модального окна с картинкой
        this._element.querySelector('.place__image').addEventListener('click', this._handleOpenPopup.bind(this));

        //удаление карточки
        this._element.querySelector('.place__delite-button').addEventListener('click', this._deleteCard);

        // Отменка like
        this._element.querySelector('.place__like').addEventListener('click', this._toggleLike);
    }

    renderCard() {
        this._gallery.prepend(this._generateCard());
    }
}
