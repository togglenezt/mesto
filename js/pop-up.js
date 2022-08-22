// Находим форму в DOM
let formElement = document.querySelector('.form');
// Находим overlay pop-up в DOM
let popUp = document.querySelector('.pop-up'); 
// Находим кнопки открытия и закрытия pop-up в DOM
let buttonEdit = document.querySelector('.profile__edit-button');
let buttonEditClose = document.querySelector('.pop-up__close-button');
// Находим кнопку сохранить в formElement
let saveEdit = formElement.querySelector('.form__submit-button');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.form__field_type_name');
let jobInput =  formElement.querySelector('.form__field_type_job');
// Находим поля Профиля в DOM
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
const popUpContainer = document.querySelector('.pop-up__container');
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

// Находим шаблон 
const placeTemplate = document.querySelector('#place-template').content;
//место куда будет вставляться шаблон
const gallery = document.querySelector('.gallery');

//Код для вставки шаблонов при загрузке страницы 
initialCards.forEach(function(item){
    //// клонируем содержимое тега template
    const placeElement = placeTemplate.querySelector('.place').cloneNode(true);

    placeElement.querySelector('.place__image').src = item.link;
    placeElement.querySelector('.place__image').alt = item.name;
    placeElement.querySelector('.place__title').textContent = item.name;

    placeElement.querySelector('.place__like').addEventListener('click', function(evt){
      evt.target.classList.toggle('place__like_click_active');
  });

    const deliteButton =  placeElement.querySelector('.place__delite-button');
    deliteButton.addEventListener('click',function(){
        const placeRemove = deliteButton.closest('.place');
        placeRemove.remove();
    });

    gallery.append(placeElement);

    placeElement.querySelector('.place__image').addEventListener('click', function(evt){
      document.querySelector('.pop-up__image').src = evt.target.src;
      document.querySelector('.pop-up__text-image').textContent = evt.target.alt;
      popUp.classList.toggle('pop-up_opened');
      popUp.querySelector('.pop-up__container').classList.add('pop-up__image-container_open');
      popUp.querySelector('.pop-up__image-container').classList.add('pop-up__image-container_visible');
    });

});


const addPlaceForm = document.querySelector('.form-add-place');
const fieldPlaceName = addPlaceForm.querySelector('.form__field_type_place-name');
const fieldPlaceLink = addPlaceForm.querySelector('.form__field_type_place-link');

const addButtonPlace = document.querySelector('.profile__add-button');
addButtonPlace.addEventListener('click', function(){
    popUp.classList.toggle('pop-up_opened');
    popUpContainer.querySelector('.form-add-place').classList.add('form_visible');
    fieldPlaceName.value = '';
    fieldPlaceLink.value = '';
});


function formAddPlace (evt){
    evt.preventDefault();
    //// клонируем содержимое тега template
    const placeElement = placeTemplate.querySelector('.place').cloneNode(true);

    placeElement.querySelector('.place__image').src = fieldPlaceLink.value;
    placeElement.querySelector('.place__image').alt = fieldPlaceName.value;
    placeElement.querySelector('.place__title').textContent = fieldPlaceName.value;

    placeElement.querySelector('.place__like').addEventListener('click', function(evt){
        evt.target.classList.toggle('place__like_click_active');
    });

    const deliteButton =  placeElement.querySelector('.place__delite-button');
    deliteButton.addEventListener('click',function(){
        const placeRemove = deliteButton.closest('.place');
        placeRemove.remove();
    });

    gallery.prepend(placeElement);
    popUp.classList.remove('pop-up_opened');

    placeElement.querySelector('.place__image').addEventListener('click', function(evt){
      document.querySelector('.pop-up__image').src = evt.target.src;
      document.querySelector('.pop-up__text-image').textContent = evt.target.alt;
      popUp.classList.toggle('pop-up_opened');
      popUpContainer.querySelector('.form-add-place').classList.remove('form_visible');
      popUp.querySelector('.pop-up__container').classList.add('pop-up__image-container_open');
      popUp.querySelector('.pop-up__image-container').classList.add('pop-up__image-container_visible');
    });

}


addPlaceForm.addEventListener('submit', formAddPlace);

/*-------------------------------------- Спринт 4 ----------------------------------*/
function popUpOpen() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;    
    popUp.classList.toggle('pop-up_opened');
    popUpContainer.querySelector('.form').classList.add('form_visible');
    popUpContainer.querySelector('.form-add-place').classList.remove('form_visible');

}

function popUpClose() {
    popUp.classList.toggle('pop-up_opened');
    popUpContainer.querySelector('.form').classList.remove('form_visible');
    popUpContainer.querySelector('.form-add-place').classList.remove('form_visible');
    popUp.querySelector('.pop-up__container').classList.remove('pop-up__image-container_open');
    popUp.querySelector('.pop-up__image-container').classList.remove('pop-up__image-container_visible');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popUp.classList.remove('pop-up_opened');
    popUpContainer.querySelector('.form').classList.remove('form_visible');
    popUpContainer.querySelector('.form-add-place').classList.remove('form_visible');
}

formElement.addEventListener('submit', formSubmitHandler);
buttonEdit.addEventListener('click', popUpOpen);
buttonEditClose.addEventListener('click', popUpClose);