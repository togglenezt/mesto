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
// Находим шаблон 
const placeTemplate = document.querySelector('#place-template').content;
//место куда будет вставляться шаблон
const gallery = document.querySelector('.gallery');


/* ------------ Блок Функций ------------ */

/*Функция для вставки карточек из массива*/
function createCardPlace (name, link) {
  //// клонируем содержимое тега template
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  const placeImage = placeElement.querySelector('.place__image');
  const placeTitle = placeElement.querySelector('.place__title');
  
  placeImage.src = link;
  placeImage.alt = name;
  placeTitle.textContent = name;

  placeElement.querySelector('.place__like').addEventListener('click', function(evt){
    evt.target.classList.toggle('place__like_click_active');
  });

  const deliteButton =  placeElement.querySelector('.place__delite-button');
  deliteButton.addEventListener('click',function(){
    placeElement.remove();
  });

  placeElement.querySelector('.place__image').addEventListener('click', function(evt){
    openClosePopUp(popUpImageOverlay);
    document.querySelector('.pop-up__image').src = link;
    document.querySelector('.pop-up__text-image').textContent = name;
    document.querySelector('.pop-up__image').alt = name;
  });

  return placeElement;
}

// Функция создание карточки
function renderCard(card, container) {
  container.prepend(card);
}
// Функция открытия popUp
function openPopUp (popUp) {
  popUp.classList.add('pop-up_opened');
}
//Функция закрытия popUp
function closePopUp (popUp){
  popUp.classList.remove('pop-up_opened');
}
//Функция закрытия popUp при нажатии ESC
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.pop-up_opened');
    closePopUp(openedPopup); 
  }
}

// Функция открытия и закрытия popUp
function openClosePopUp(container) {
  container.classList.toggle('pop-up_opened');
}

// Функция открытия формы для редактирования профиля
function openEditProfileContainer() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;   

  openPopUp(popUpContainerEditProfile);
 stateSubmitButton(formProfileElement, enableValidationSetting);
  isValidFilds(formProfileElement, enableValidationSetting);
  }

// Функция принятия изменений в форме редактирования профиля
function submitHandlerForm (evt) {
 evt.preventDefault(); 

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopUp(popUpContainerEditProfile);
}

 // Функция для добавления новой карточки пользователем
 function submitCardForm (evt){
  evt.preventDefault();
  renderCard(createCardPlace(fieldPlaceName.value, fieldPlaceLink.value), gallery);
  closePopUp(popUpPlaceContainer);
}

//Функция для вставки шаблонов при загрузке страницы 
initialCards.forEach(function(item){
  renderCard(createCardPlace(item.name, item.link),gallery);
}); 

// Функция закрытия popUP при клике на overlay
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

/* ------------ Конец блока функций ------------ */


buttonAddPlace.addEventListener('click', function(){
  placeForm.reset();
  
  openPopUp(popUpPlaceContainer);
  stateSubmitButton(placeForm, enableValidationSetting);
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
document.addEventListener('keydown',closeByEsc);
closePopUpByOverlay();