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
        profileName,
        profileJob,
        popUpPlaceContainer,
        buttonEdit,
        popUpContainerEditProfile,
        buttonAddPlace,
        placeTemplate,
        cardsConatinerSelector,
        popupImageOverlay,
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

const createCard = function (inputValues) {
  return new Card({
    name: inputValues.name,
    link: inputValues.link,
  }, placeTemplate, (cardData) => {
    popupImage.open({ name: cardData.name, link: cardData.link });
  })
    .generateCard();
}

//Вставка карточек при загрузке страницы
const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => cardsSection.addItem(createCard(item))
}, cardsConatinerSelector); 

cardsSection.renderItems();

const popupImage = new PopupWithImage(popupImageOverlay);
const userInfo = new UserInfo(profileName, profileJob);


  const popupEdit = new PopupWithForm(popUpContainerEditProfile, (inputValues => {
    userInfo.setUserInfo(inputValues);
    popupEdit.close();
  }));


  const popupAddForm = new PopupWithForm(popUpPlaceContainer, (inputValues => {
    cardsSection.addItem(createCard(inputValues));
    popupAddForm.close();
  }));

//Функция редактирования профиля
const handleEditButtonClick = function () {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  formValidators['formEdit'].resetValidation();
  popupEdit.open();
}

/*--------------------------------------------------------*/

//Кнопка открытия формы редактирования профиля
buttonEdit.addEventListener('click',handleEditButtonClick);

popupEdit.setEventListeners();
popupImage.setEventListeners();
popupAddForm.setEventListeners();

buttonAddPlace.addEventListener('click', function(){
  popupAddForm.open();
  formValidators['formAddPlace'].resetValidation();
});



/*--- Webpack ---*/

import './pages/index.css';

/*--- end Webpack ---*/









