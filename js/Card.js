export class Card {
    constructor(data) {
        this._title = data.name;
        this._link = data.link;
        this._popUpImageContainer = document.querySelector('.pop-up__image-container');
        this._popUpImage = this._popUpImageContainer.querySelector('.pop-up__image');
        this._popUpTextImage = this._popUpImageContainer.querySelector('.pop-up__text-image');
    }
    
    //Получение шаблона
    _getTemplate() {
        const cardElement = document
        .querySelector('#place-template')
        .content
        .querySelector('.place')
        .cloneNode(true);

        return cardElement;
    }
    
    //Создание карточки
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.place__image').src = this._link;
        this._element.querySelector('.place__image').alt = this._title;
        this._element.querySelector('.place__title').textContent = this._title;

        return this._element;
    } 
    
    //открытие модального окна с картинкой
    _handleOpenPopup() {
        this._popUpImage.src = this._link;
        this._popUpImage.alt = this._title;
        this._popUpTextImage.textContent = this._title;
        openPopUp(popUpImageOverlay);
    }
    
    //закрытие модального окна с картинкой
    _handleClosePopup() {
        this._popUpImage.src = '';
        this._popUpImage.alt = '';
        this._popUpTextImage.textContent = '';
        closePopUp(popUpImageOverlay);
    }

    //Сбор обработчиков
    _setEventListeners() {

        this._element.querySelector('.place__image').addEventListener('click', () => {
            this._handleOpenPopup();
        });

        buttonCloseImageContainer.addEventListener('click', () => {
            this._handleClosePopup();
        });

        //удаление карточки
        this._element.querySelector('.place__delite-button').addEventListener('click', () => {
            this._element.remove();
        });

        // Отменка like
        this._element.querySelector('.place__like').addEventListener('click', (evt) => {
            evt.target.classList.toggle('place__like_click_active');
        });
    }
}

//Класс для карточки пользователя(добовление карточки)
class UserCard extends Card {
    constructor(name, link) {
        super(name, link)
        this._title = name;
        this._link = link;
    }

    //Создание карточки
    generateCard() {
        //Ссылается на родительский метод
        return super.generateCard();  
    }
}
