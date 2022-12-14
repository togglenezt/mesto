export const popupImageOverlay = document.querySelector('.pop-up-overlay');
export const popUpImageContainer = document.querySelector('.pop-up__image-container');
export const popUpAvatarContainer = document.querySelector('.pop-up-avatar'); // Форма редактирования аватарки пользователя
export const buttonAvatarEdit = document.querySelector('.profile__avatar-edit');
export const formProfileElement = document.forms.formEdit; //Форма редактирования профиля
export const nameInput = formProfileElement.elements.name; //Поле имени формы редактирования профиля
export const jobInput =  formProfileElement.elements.about; //Поле рода занятий формы редактирования профиля
export const placeForm = document.forms.formAddPlace; // Форма добавления карточки
export const fieldPlaceName = placeForm.elements.name; // Поле имени формы добавления карточки
export const fieldPlaceLink = placeForm.elements.link; // Поле ссылки формы добавления карточки
export const profileName = document.querySelector('.profile__title'); // Поле имени профиля
export const profileJob = document.querySelector('.profile__subtitle'); // Поле рода занятий
export const popUpPlaceContainer = document.querySelector('.pop-up-add-place-container');
export const buttonEdit = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
export const popUpContainerEditProfile = document.querySelector('.pop-up-container-edit-profile'); //Форма для редактирования профиля
export const buttonAddPlace = document.querySelector('.profile__add-button'); // Кнопка добавления карточки 
export const placeTemplate = document.querySelector('#place-template'); // Шаблон карточки
export const gallery = document.querySelector('.gallery'); // Контейнер для вставки карточек
export const cardsConatinerSelector = '.gallery';
export const formValidators = {};
export const serverUrl = 'https://mesto.nomoreparties.co/v1/cohort-52'; // Адрес сервера
export const serverToken = '44789594-7e2d-4206-b282-20acc9a01a01';//токен авторизации
export const popupFormDelete = document.querySelector('.pop-up-place-delete'); // Форма подтверждения удаления карточки