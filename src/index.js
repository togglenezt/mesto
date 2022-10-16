import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';

import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

import {initialCards} from './Data/cards.js';
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



/*--- Webpack ---*/
/*
import '../pages/index.css';

const addButon = new URL('../images/add-button.svg', import.meta.url);
const closeIcon = new URL('../images/Close-Icon.svg', import.meta.url);
const deliteButton = new URL('../images/delite-place.svg', import.meta.url);
const likeButton = new URL('../images/like.svg', import.meta.url);
const avatar = new URL('../images/profile__avatar.jpg', import.meta.url);
const union = new URL('../images/Union.svg', import.meta.url);
const vector = new URL('../images/Vector.svg', import.meta.url);

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'addButon', image: addButon },
  { name: 'closeIcon', link: closeIcon },
  { name: 'deliteButton', link: deliteButton },
  { name: 'likeButton', link: likeButton },
  { name: 'avatar', link: avatar },
  { name: 'union', link: union },
  { name: 'vector', link: vector },
];
*/
/*--- end Webpack ---*/









