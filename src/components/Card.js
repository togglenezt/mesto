
export default class Card {
    constructor(data, template,  handleCardClick) {
        this._cardData = data;
        this._title = this._cardData.name;
        this._link = this._cardData.link;
        this._template = template;
        this._handleCardClick = handleCardClick;
    }
    
    //Получение шаблона
    _getTemplate() {
        return this._template.cloneNode(true).content;
    }
    
    //Создание карточки
    generateCard() {
        this._element = this._getTemplate();
        this._placeImage =  this._element.querySelector('.place__image');
        this._deleteButton = this._element.querySelector('.place__delite-button');
        this._likeButton = this._element.querySelector('.place__like');
        this._placeImage.src = this._link;
        this._placeImage.alt = this._title;
        this._element.querySelector('.place__title').textContent = this._title;

        this._setEventListeners();
        return this._element;
    } 

    //Медот отметки like
    _toggleLike() {
        this._likeButton.classList.toggle('place__like_click_active');
    }

    //Медот удалиния карточки
    _deleteCard() {
        this._deleteButton.closest('.place').remove();
    }
    
    //Сбор обработчиков
    _setEventListeners() {
        //Открытие модального окна с картинкой
        this._placeImage.addEventListener('click', () => this._handleCardClick(this._cardData));
        //удаление карточки
        this._deleteButton.addEventListener('click', this._deleteCard.bind(this));
        // Отменка like
        this._likeButton.addEventListener('click', this._toggleLike.bind(this));
    }
}
