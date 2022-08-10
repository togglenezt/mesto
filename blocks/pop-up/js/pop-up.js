// Находим форму в DOM
let formElement = document.querySelector('.pop-up__container');
// Находим overlay pop-up в DOM
let popUp = document.querySelector('.pop-up'); 
// Находим кнопки открытия и закрытия pop-up в DOM
let buttonEdit = document.querySelector('.profile__edit-button');
let buttonEditClose = formElement.querySelector('.pop-up__close-button');
// Находим кнопку сохранить в formElement
let saveEdit = formElement.querySelector('.pop-up__submit-button');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.nameInput');
let jobInput =  formElement.querySelector('.jobInput');
// Находим поля Профиля в DOM
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');



buttonEdit.addEventListener('click', popUpOpenClose);
buttonEditClose.addEventListener('click', popUpOpenClose);
saveEdit.addEventListener('click', formSubmitHandler);

function popUpOpenClose() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;    
    popUp.classList.toggle('pop-up_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    

    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popUp.classList.remove('pop-up_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);