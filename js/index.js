import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';

import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

import {initialCards, userData} from './Data/cards.js';
import {config} from './Data/config.js';
import {
        nameInput,
        jobInput,
        fieldPlaceName,
        fieldPlaceLink,
        profileName,
        profileJob,
        popUpPlaceContainer,
        buttonEdit,
        popUpContainerEditProfile,
        buttonAddPlace,
        placeTemplate,
        gallery,
        containerSelector,
        popUpOverlay,
        formValidators} from './utils/constants.js';

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
   validator.enableValidation();
  });
};

enableValidation(config);

// Функция создание карточки
function renderCard(item, container) {
  container.prepend(item);
}



/* ---- Удалить -------*/

/*-----------------------*/
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



/* ------------ Конец блока функций ------------ */





/*-----------------------  ПР8  -----------------------------*/
const handleCardClick = function (item) {
  popupImage.open(item.name, item.link);
}

//Вставка карточек при загрузке страницы
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card (item, placeTemplate, handleCardClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, containerSelector); 

cardList.renderItems();

const popupImage = new PopupWithImage(popUpOverlay);
const userInfo = new UserInfo({name: profileName, job: profileJob});

 
const popupEdit = new PopupWithForm(popUpContainerEditProfile, 
  {
    handleFormSubmit: (item) => {
      userInfo.setUserInfo(item);
      popupEdit.close();
    }
  });

const popupAddForm = new PopupWithForm(popUpPlaceContainer, {handleFormSubmit: () => {
  const newCardAdder = new Card( {name:fieldPlaceName.value, link:fieldPlaceLink.value}, placeTemplate, handleCardClick);
  const cardElement = newCardAdder.generateCard();

  cardList.addItem(cardElement);
  popupAddForm.close();
}})





//Функция редактирования профиля
const handleEditButton = function () {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  formValidators['formEdit'].resetValidation();
  popupEdit.open();
}


/*--------------------------------------------------------*/

//Кнопка открытия формы редактирования профиля
buttonEdit.addEventListener('click',handleEditButton);

popupEdit.setEventListeners();
popupImage.setEventListeners();
popupAddForm.setEventListeners();





buttonAddPlace.addEventListener('click', function(){
  popupAddForm.open();
  formValidators['formAddPlace'].resetValidation();
});











