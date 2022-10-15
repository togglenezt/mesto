export const popUpOverlay = document.querySelector('.pop-up-overlay');
export const popUpImageContainer = document.querySelector('.pop-up__image-container');
export const popUpImage = popUpImageContainer.querySelector('.pop-up__image');
export const popUpTextImage = popUpImageContainer.querySelector('.pop-up__text-image');

//Форма редактирования профиля и её поля
export const formProfileElement = document.forms.formEdit;
export const nameInput = formProfileElement.elements.profileName;
export const jobInput =  formProfileElement.elements.profileJob;
// Форма добавления карточки и её поля
export const placeForm = document.forms.formAddPlace;
export const fieldPlaceName = placeForm.elements.placeName;
export const fieldPlaceLink = placeForm.elements.placeLink;
// Находим поля Профиля
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__subtitle');
export const popUpPlaceContainer = document.querySelector('.pop-up-add-place-container');
// Находим кнопку редактирования профиля
export const buttonEdit = document.querySelector('.profile__edit-button');
//Находим форму для редактирования профиля
export const popUpContainerEditProfile = document.querySelector('.pop-up-container-edit-profile');
// Находим кнопку добавления карточки 
export const buttonAddPlace = document.querySelector('.profile__add-button');
//Находим шаблон карточки
export const placeTemplate = document.querySelector('#place-template');
//Контейнер для вставки карточек
export const gallery = document.querySelector('.gallery');
export const cardContent = document.querySelector('#place-template').content;
export const containerSelector = '.gallery';
//Модальные окна
export const popUps = document.querySelectorAll('.pop-up');

export const formValidators = {};