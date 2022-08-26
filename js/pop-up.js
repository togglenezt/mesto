// Находим форму в DOM
const formElement = document.querySelector('.form-edit-profile');
// Находим overlay pop-up в DOM
const popUp = document.querySelector('.pop-up'); 
// Находим кнопки открытия и закрытия pop-up в DOM
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonEditClose = document.querySelector('.pop-up__close-button');
// Находим кнопку сохранить в formElement
const saveEdit = formElement.querySelector('.form__submit-button');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.form__field_type_name');
const jobInput =  formElement.querySelector('.form__field_type_job');
// Находим поля Профиля в DOM
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const popUpContainerEditProfile = document.querySelector('.pop-up__container-edit-profile');
const editProfileContainer = popUp.querySelector('.pop-up__container-edit-profile');
const addPlaceContainer = popUp.querySelector('.pop-up__add-place-container');
const addPlaceForm = document.querySelector('.form-add-place');
const fieldPlaceName = addPlaceForm.querySelector('.form__field_type_place-name');
const fieldPlaceLink = addPlaceForm.querySelector('.form__field_type_place-link');
const addButtonPlace = document.querySelector('.profile__add-button');
const pleaceCloseButton = document.querySelector('.pop-up__add-pleace-close');
const popUpImageOverlay = document.querySelector('.pop-up__image-container');
const closeBottunImageContainer = popUpImageOverlay.querySelector('.pop-up__image-container-close-button');
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
    popUpOpenClose();
    popUpContainerVisible(popUpImageOverlay);
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
function popUpOpenClose() {
  popUp.classList.toggle('pop-up_opened');
}
// Функция видимости для контейнеров
function popUpContainerVisible(container) {
  container.classList.toggle('pop-up__container_visible');
}
// Функция открытия формы для редактирования профиля
function popUpEditProfileContainerOpen() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;   

  popUpOpenClose();
  popUpContainerVisible(editProfileContainer);
}

// Функция редактирования профиля
function formSubmitHandler (evt) {
  evt.preventDefault(); 

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popUpOpenClose();
  popUpContainerVisible(editProfileContainer);
}

 // Функция для добавления новой карточки пользователем
function submitCardForm (evt){
  evt.preventDefault();
  createCardPlace(fieldPlaceName.value, fieldPlaceLink.value);
  renderCard(createCardPlace(fieldPlaceName.value, fieldPlaceLink.value), gallery);
  popUpOpenClose();
  popUpContainerVisible(addPlaceContainer);
}

//Функция для вставки шаблонов при загрузке страницы 
initialCards.forEach(function(item){
  createCardPlace(item.name, item.link);
  renderCard(createCardPlace(item.name, item.link),gallery);
}); 

addButtonPlace.addEventListener('click', function(){
  popUpOpenClose();
  popUpContainerVisible(addPlaceContainer);
  fieldPlaceName.value = '';
  fieldPlaceLink.value = '';
});

closeBottunImageContainer.addEventListener('click', function() {
  popUpOpenClose();
  popUpContainerVisible(popUpImageOverlay);
});
addPlaceForm.addEventListener('submit', submitCardForm);
formElement.addEventListener('submit', formSubmitHandler);
buttonEdit.addEventListener('click',popUpEditProfileContainerOpen);
buttonEditClose.addEventListener('click', function(){
  popUpOpenClose();
  popUpContainerVisible(editProfileContainer);
});
pleaceCloseButton.addEventListener('click', function(){
  popUpOpenClose();
  popUpContainerVisible(addPlaceContainer);
});