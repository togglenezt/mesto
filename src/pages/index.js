import './index.css'; // Webpack

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelete from '../components/PopupWhithDelete.js';
import UserInfo from '../components/UserInfo.js';
import {config} from '../data/config.js';
import {
        nameInput,
        serverUrl,
        serverToken,
        jobInput,
        gallery,
        profileName,
        profileJob,
        popUpPlaceContainer,
        buttonEdit,
        popUpContainerEditProfile,
        buttonAddPlace,
        placeTemplate,
        buttonAvatarEdit,
        cardsConatinerSelector,
        popupImageOverlay,
        popUpAvatarContainer,
        popupFormDelete,
        formValidators} from '../utils/constants.js';

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

//Функция редактирования профиля
const handleEditButtonClick = function () {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  formValidators['formEdit'].resetValidation();
  popupEdit.open();
}

/* ------------ Конец блока функций ------------ */


/* ПР 9 */

const api = new Api({
  baseUrl: serverUrl,
  headers: {
    authorization: serverToken,
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo(profileName, profileJob);
const popupImage = new PopupWithImage(popupImageOverlay);

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([user, cards]) => {
        userInfo.setUserInfo(user);
        userInfo.setUserAvatar(user.avatar);
        initialCardsAdder.renderItems(cards);
  })
  .catch(err => console.log(`Ошибка.....: ${err}`))

// Редактирование данных о пользователе
const popupEdit = new PopupWithForm ({popup: popUpContainerEditProfile, handleFormSubmit: (item) => {
  popupEdit.renderLoading(true);
  api.setUserInfo(item)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
  }
});

// Обновление аватара пользователя
const popupAvatar = new PopupWithForm({popup: popUpAvatarContainer, handleFormSubmit: (item) => {
  popupAvatar.renderLoading(true);
    api.setAvatar(item)
      .then((data) => {
        userInfo.setUserAvatar(data.avatar);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
  }
});

// Добавление карточки пользователем
const popupAddForm = new PopupWithForm({popup: popUpPlaceContainer, handleFormSubmit: (item) => {
    popupAddForm.renderLoading(true);
    api.addCard(item)
      .then((res) => {
        createCard(res);
        addCard(createCard(res));
        popupAddForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
  }
});

const initialCardsAdder = new Section({
  renderer: (item) => {
    createCard(item);
    addCard(createCard(item));
  }
},cardsConatinerSelector);

//лайк карточки
function handleCardLike(card, data) {
  const likePromise = card.isLiked() ? api.dislike(data._id) : api.like(data._id);

  likePromise
    .then((data) => {
      card.setLike(data);
    })
    .catch((err) => {
      console.log(`${err}`);
  });
}

function addCard (card) {
  initialCardsAdder.addItem(card);
}

//создание карточки
function createCard(item) {
  const newCard = new Card(item, placeTemplate, userInfo.userId, (item) => {
    popupImage.open({ name: item.name, link: item.link });
    }, {handleCardDelete: () => {
      handleCardDelete(newCard);
    },
    handleLikeCard: () => {
      handleCardLike(newCard, item);
    }
  }
  );

  const cardElement = newCard.generateCard();
  return cardElement;
}

//удаление карточки
function handleCardDelete(card) {
  popupCardDelete.open(() => {
    api.deleteCard(card._cardData._id)
      .then(() => {
        card.deleteCard();
        popupCardDelete.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  })
}

const popupCardDelete = new PopupWithDelete(popupFormDelete);
/*---------*/

//Кнопка открытия формы редактирования профиля
buttonEdit.addEventListener('click',handleEditButtonClick);

popupEdit.setEventListeners();
popupImage.setEventListeners();
popupAddForm.setEventListeners();
popupAvatar.setEventListeners();
popupCardDelete.setEventListeners();

buttonAvatarEdit.addEventListener('click', () =>{
  popupAvatar.open();
  formValidators['avatar'].resetValidation();
});

buttonAddPlace.addEventListener('click', function(){
  popupAddForm.open();
  formValidators['formAddPlace'].resetValidation();
});

