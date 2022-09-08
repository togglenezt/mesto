// Форма добавления карточки и её поля
const placeForm = document.forms.formAddPlace;
const fieldPlaceName = placeForm.elements.placeName;
const fieldPlaceLink = placeForm.elements.placeLink;

//Форма редактирования профиля и её поля
const formProfileElement = document.forms.formEdit;
const nameInput = formProfileElement.elements.profileName;
const jobInput =  formProfileElement.elements.profileJob;

// Находим overlay pop-up в DOM
const popUp = document.querySelector('.pop-up'); 
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
// Массив картинок, появляются при загрузке страницы
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

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
    const placeRemove = deliteButton.closest('.place');
    placeRemove.remove();
  });

  placeElement.querySelector('.place__image').addEventListener('click', function(evt){
    openClosePopUp(popUpImageOverlay);
    document.querySelector('.pop-up__image').src = evt.target.src;
    document.querySelector('.pop-up__text-image').textContent = evt.target.alt;
    document.querySelector('.pop-up__image').alt = evt.target.alt;
  });

  return placeElement;
}

// Функция создание карточки
function renderCard(card, container) {
  container.prepend(card);
}

// Функция открытия и закрытия popUp
function openClosePopUp(container) {
  container.classList.toggle('pop-up_opened');
}

// Функция открытия формы для редактирования профиля
function openEditProfileContainer() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;   

  openClosePopUp(popUpContainerEditProfile);
  stateSubmitButton(formProfileElement);
  isValidFilds(formProfileElement);
  }

// Функция принятия изменений в фоме редактирования профиля
function submitHandlerForm () {
 // evt.preventDefault(); 

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  openClosePopUp(popUpContainerEditProfile);
}

 // Функция для добавления новой карточки пользователем
 function submitCardForm (evt){
  evt.preventDefault();
  renderCard(createCardPlace(fieldPlaceName.value, fieldPlaceLink.value), gallery);
  openClosePopUp(popUpPlaceContainer);
}

//Функция для вставки шаблонов при загрузке страницы 
initialCards.forEach(function(item){
  renderCard(createCardPlace(item.name, item.link),gallery);
}); 

// Функция закрытия popUP при клике на overlay
function closeoverlay(){
  const popUpList = Array.from(document.querySelectorAll('.pop-up'));

  popUpList.forEach((popUpElement) => {
    popUpElement.addEventListener('click', function(evt){
      if(evt.target.classList.contains('pop-up_opened')){
        popUpElement.classList.remove('pop-up_opened');
      }
    });
  })
}

/* ------------ Конец блока функций ------------ */


buttonAddPlace.addEventListener('click', function(){
  placeForm.reset();
  openClosePopUp(popUpPlaceContainer);
  stateSubmitButton(placeForm);
});

buttonCloseImageContainer.addEventListener('click', function() {
  openClosePopUp(popUpImageOverlay);
});

placeForm.addEventListener('submit', submitCardForm);
formProfileElement.addEventListener('submit', submitHandlerForm);
buttonEdit.addEventListener('click',openEditProfileContainer);

buttonEditClose.addEventListener('click', function(){
  openClosePopUp(popUpContainerEditProfile);
});
pleaceCloseButton.addEventListener('click', function(){
  openClosePopUp(popUpPlaceContainer);
});

//  закрытие popUp через кнопку ESC
document.addEventListener('keydown', function(evt){
  const popUpList = Array.from(document.querySelectorAll('.pop-up'));

  popUpList.forEach((popUpElement) => {
    if(popUpElement.classList.contains('pop-up_opened')){
      if(evt.key === 'Escape'){
        popUpElement.classList.remove('pop-up_opened');
      }
    }
  })
});

closeoverlay();