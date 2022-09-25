import {Card} from './Card';
import {initialCards} from './cards';
import {FormValidator} from './FormValidator';
import {enableValidationSetting} from './validate';



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
const buttonEditClose = popUpContainerEditProfile.querySelector('.form__close-button');

// Находим поля Профиля в DOM
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const popUpPlaceContainer = document.querySelector('.pop-up-add-place-container');



// Находим Кнопку добавления карточки 
const buttonAddPlace = document.querySelector('.profile__add-button');

const pleaceCloseButton = popUpPlaceContainer.querySelector('.form__close-button');
const popUpImageOverlay = document.querySelector('.pop-up-overlay');
const buttonCloseImageContainer = popUpImageOverlay.querySelector('.pop-up__close-button');

//место куда будет вставляться шаблон
const gallery = document.querySelector('.gallery');
/* ------------ Блок Функций ------------ */


// Функция отрисовки карточки в DOM +
function renderCard(card, container) {
  container.prepend(card);
}
// Функция открытия popUp +
function openPopUp (popUp) {
  popUp.classList.add('pop-up_opened');
  document.addEventListener('keydown',closeByEsc);
}
//Функция закрытия popUp +
function closePopUp (popUp){
  popUp.classList.remove('pop-up_opened'); 
  document.removeEventListener('keydown',closeByEsc)
}
//Функция закрытия popUp при нажатии ESC +
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.pop-up_opened');
    closePopUp(openedPopup); 
  }
}
// Функция открытия формы для редактирования профиля +
function openEditProfileContainer() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;   

  openPopUp(popUpContainerEditProfile);
  const formValidator = new FormValidator(enableValidationSetting, formProfileElement);
  formValidator.enableValidation();
  formValidator.isValidFilds(formProfileElement);
}
// Функция принятия изменений в форме редактирования профиля +
function submitHandlerForm (evt) {
  evt.preventDefault(); 

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopUp(popUpContainerEditProfile);
}
// Функция для добавления новой карточки пользователем
function submitCardForm(evt) {
  evt.preventDefault();

  const card = new UserCard(fieldPlaceName.value, fieldPlaceLink.value);
  const cardElement = card.generateCard();
  renderCard(cardElement, gallery);
  closePopUp(popUpPlaceContainer);
}


// Функция закрытия popUP при клике на overlay +
function closePopUpByOverlay(){
  const popUpList = Array.from(document.querySelectorAll('.pop-up'));

  popUpList.forEach((popUpElement) => {
    popUpElement.addEventListener('mousedown', function(evt){
      if(evt.target.classList.contains('pop-up_opened')){
        popUpElement.classList.remove('pop-up_opened');
      }
    });
  })
}

// Обходим массив с данными карточек
initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();

  // Добавляем в DOM
  renderCard(cardElement, gallery);
});

/* ------------ Конец блока функций ------------ */


buttonAddPlace.addEventListener('click', function(){
  placeForm.reset();
  
  openPopUp(popUpPlaceContainer);
  const formValidator = new FormValidator(enableValidationSetting, placeForm);
  formValidator.enableValidation();
});

buttonCloseImageContainer.addEventListener('click', function() {
  closePopUp(popUpImageOverlay);
});

placeForm.addEventListener('submit', submitCardForm);
formProfileElement.addEventListener('submit', submitHandlerForm);
buttonEdit.addEventListener('click',openEditProfileContainer);

buttonEditClose.addEventListener('click', function(){
  closePopUp(popUpContainerEditProfile);
});
pleaceCloseButton.addEventListener('click', function(){
  closePopUp(popUpPlaceContainer);
});

closePopUpByOverlay();
