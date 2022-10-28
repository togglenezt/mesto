
export default class Card {
    constructor(data, template, userId, handleCardClick, { handleCardDelete, handleLikeCard }) {
        this._cardData = data;
        this._template = template;
        this._handleCardClick = handleCardClick;
        this._userId = userId;
        this._handleCardDelete = handleCardDelete;
        this._handleLikeCard = handleLikeCard;
        this._title = this._cardData.name;
        this._link = this._cardData.link; 
    }
    
    //Получение шаблона
    _getTemplate() {
        return this._template.cloneNode(true).content;
    }
    
    //получение карточки
    generateCard() {
        this._element = this._getTemplate();

        this._placeImage =  this._element.querySelector('.place__image');
        this._deleteButton = this._element.querySelector('.place__delite-button');
        this._likeButton = this._element.querySelector('.place__like');
        this._placeTitle = this._element.querySelector('.place__title');
        this._likeCounter = this._element.querySelector('.place__like-counter');

        this._likeCounter.textContent = this._cardData.likes.length;
        this._placeImage.src = this._link;
        this._placeImage.alt = this._title;
        this._placeTitle.textContent = this._title;

        this._setDeleteButton();
        this._setEventListeners();
        return this._element;
        
    } 

    // отображение кнопки удалить
    _setDeleteButton() {
        if (this._cardData.owner._id !== this._userId) {
            this._deleteButton.remove();
        }
    }

    // Счетчик лайка
    setLike(data) {
         this._isLiked = data.likes.filter((item) => {
            return item._id == this._userId
        }).length > 0;
        this._likeCounter.textContent = data.likes.length;
        
        this._isLiked ? 
        this._likeButton.classList.add('place__like_click_active'):
        this._likeButton.classList.remove('place__like_click_active');
        console.log(this._isLiked);  

       /* this._isLiked = data.likes.some((item) => {
            return item._id == this._userId
        });
        this._likeCounter.textContent = data.likes.length;
        this._isLiked ? 
        this._likeButton.classList.add('place__like_click_active'):
        this._likeButton.classList.remove('place__like_click_active');
        console.log(this._isLiked); */
    }

    isLiked() {
        return this._isLiked; 
    }

    //Медот удалиния карточки
    deleteCard() {
        this._deleteButton.closest('.place').remove();
    }
    
    //Сбор обработчиков
    _setEventListeners() {
        //Открытие модального окна с картинкой
        this._placeImage.addEventListener('click', () => this._handleCardClick(this._cardData));
        //удаление карточки
        this._deleteButton.addEventListener('click', this._handleCardDelete);
        // Отменка like
        this._likeButton.addEventListener('click', this._handleLikeCard);
    }
}
