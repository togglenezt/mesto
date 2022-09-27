import {Card} from './Card.js';
import {initialCards, userData} from './cards.js';
import {FormValidator} from './FormValidator.js';
import {config} from './validate.js';

const placeTemplate = document.querySelector('#place-template');
const gallery = document.querySelector('.gallery');
const popUps = document.querySelectorAll('.pop-up');
const formValidators = {};
/*-------------------------------------------------------------------*/
// Форма добавления карточки и её поля
const placeForm = document.forms.formAddPlace;
const fieldPlaceName = placeForm.elements.placeName;
const fieldPlaceLink = placeForm.elements.placeLink;

//Форма редактирования профиля и её поля
const formProfileElement = document.forms.formEdit;
const nameInput = formProfileElement.elements.profileName;
const jobInput =  formProfileElement.elements.profileJob;

// Находим кнопки открытия и закрытия pop-up в DOM
const buttonEdit = document.querySelector('.profile__edit-button');
const popUpContainerEditProfile = document.querySelector('.pop-up-container-edit-profile');

// Находим поля Профиля в DOM
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const popUpPlaceContainer = document.querySelector('.pop-up-add-place-container');

// Находим Кнопку добавления карточки 
const buttonAddPlace = document.querySelector('.profile__add-button');


/* ------------ Блок Функций ------------ */

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    console.log(formValidators);
   validator.enableValidation();
  });
};

enableValidation(config);

// Функция создание карточки
function renderCard(item, container) {
  container.prepend(item);
}

// Функция открытия popUp 
function openPopUp (popUp) {
  popUp.classList.add('pop-up_opened');
  document.addEventListener('keydown',closeByEsc);
}
//Функция закрытия popUp 
function closePopUp (popUp){
  popUp.classList.remove('pop-up_opened'); 
  document.removeEventListener('keydown',closeByEsc)
}
//Функция закрытия popUp при нажатии ESC 
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.pop-up_opened');
    closePopUp(openedPopup); 
  }
}
// Функция открытия формы для редактирования профиля 
function openEditProfileContainer() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;   

  openPopUp(popUpContainerEditProfile);
  formValidators['formEdit'].resetValidation();
}
// Функция принятия изменений в форме редактирования профиля 
function handleProfileFormSubmit (evt) { 
  evt.preventDefault(); 

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopUp(popUpContainerEditProfile);
}
// Функция для добавления новой карточки пользователем
function submitCardForm(evt) {
  evt.preventDefault();
  
  userData.name = fieldPlaceName.value;
  userData.link = fieldPlaceLink.value;
  const card = new Card(userData, placeTemplate, openPopUp);
  
  // Добавляем в DOM
  renderCard(card.generateCard(), gallery); 
  closePopUp(popUpPlaceContainer);
}

// Обходим массив с данными карточек
initialCards.forEach((item) => {
  const card = new Card(item, placeTemplate, openPopUp);

  // Добавляем в DOM
  renderCard(card.generateCard(), gallery);
});

//Закрытие модальных окон
popUps.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('pop-up_opened')) {
        closePopUp(popup);
    }
    if (evt.target.classList.contains('pop-up__close-button')) {
      closePopUp(popup);
    }
  });
});

/* ------------ Конец блока функций ------------ */


buttonAddPlace.addEventListener('click', function(){
  placeForm.reset();
  openPopUp(popUpPlaceContainer);
  formValidators['formAddPlace'].resetValidation();
});

placeForm.addEventListener('submit', submitCardForm);
formProfileElement.addEventListener('submit', handleProfileFormSubmit);
buttonEdit.addEventListener('click',openEditProfileContainer);

