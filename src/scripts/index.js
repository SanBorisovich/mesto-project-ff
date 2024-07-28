import '../pages/index.css';
import { createCard , removeCard , likeCard} from "./card.js";
import { openPopup , closePopup } from "./modal.js";
import { enableValidation, clearValidation, validationSettings } from './validation.js';
import { getUserData, getInitialCards, patchUserData, postNewCard, updateAvatar} from './api.js';

// DOM-узлы
const placesList = document.querySelector('.places__list');
// Профиль
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
let userId = "";
let userAvatar = "";

//Попап "Аватар профиля"
const popupProfileAvatar = document.querySelector(".popup_type-avatar");
const profileAvatar = document.querySelector(".profile__image");
const avatarForm = popupProfileAvatar.querySelector(".popup__form");
const avatarInput = avatarForm.querySelector(".popup__input_type_url")

//Попап "Редактирование профиля"
const profileEditButton = document.querySelector(".profile__edit-button");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const profileForm = popupProfileEdit.querySelector(".popup__form");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_description");

//Попап "Добавление карточки"
const profileAddButton = document.querySelector(".profile__add-button");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const addNewCardForm = popupAddNewCard.querySelector(".popup__form");
const cardNameInput = addNewCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addNewCardForm.querySelector(".popup__input_type_url");

//Попап изображения
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

//Слушатель для кнопки закрытия попапа
function setupPopupCloseListener(modalWindow) {
    const popupCloseButton = modalWindow.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', () => closePopup(modalWindow));
}

document.querySelectorAll('.popup').forEach(popup => {
    setupPopupCloseListener(popup)
})

//Добавление плавности
document.querySelectorAll('.popup').forEach(popup => {
    popup.classList.add('popup_is-animated');
});

function openImagePopup(evt) {
    openPopup(imagePopup);
    popupImage.src = evt.link;
    popupImage.alt = evt.name;
    popupCaption.textContent = evt.name;
}

// Вывод карточек на страницу
function renderCards(cards, openPopup) {
    cards.forEach((item) => {
      placesList.append(createCard(item, userId, removeCard, likeCard, openPopup));
    });
}

// Получение данных пользователя и карточек с сервера
Promise.all([getUserData(), getInitialCards()])
    .then(([userData, initialCards]) => {
        userAvatar = userData.avatar;
        userId = userData._id;
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
        renderCards(initialCards, openImagePopup);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });

//открытие попапов
profileAvatar.addEventListener("click", () => {
    openPopup(popupProfileAvatar);
    clearValidation(popupProfileAvatar, validationSettings);
})

profileEditButton.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupProfileEdit);
    clearValidation(popupProfileEdit, validationSettings);
})

profileAddButton.addEventListener("click", () => { 
    addNewCardForm.reset();
    openPopup(popupAddNewCard);
    clearValidation(popupAddNewCard, validationSettings);
});

// Обработчик формы ред.проф.
// function handleProfileFormSubmit(evt) {
//     evt.preventDefault();
//     profileTitle.textContent = nameInput.value;
//     profileDescription.textContent = jobInput.value;
//     closePopup(popupProfileEdit);
// }
function handleProfileFormSubmit(evt) {
    evt.submitter.textContent = "Сохранение...";
    evt.preventDefault();
    const newProfileData = {
        name: nameInput.value,
        about: jobInput.value,
    };

    patchUserData(newProfileData)
        .then((updatedUserData) => {
            profileTitle.textContent = updatedUserData.name;
            profileDescription.textContent = updatedUserData.about;
            closePopup(popupProfileEdit);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            evt.submitter.textContent = "Сохранить";
        });
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

// Обработчик формы добавления карточки 
// function handleNewCardForm (evt) {
//     evt.preventDefault();
//     const newCard = {};
//     newCard.name = cardNameInput.value;
//     newCard.link = cardLinkInput.value;

//     placesList.prepend(createCard(newCard, removeCard, likeCard, openImagePopup));
//     closePopup(popupAddNewCard);
// }

function handleNewCardForm (evt) {
    evt.submitter.textContent = "Сохранение...";
    evt.preventDefault();
    const newCard = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };

    postNewCard(newCard.name, newCard.link)
        .then((cardData) => {
            placesList.prepend(createCard(cardData, userId, removeCard, likeCard, openImagePopup));
            closePopup(popupAddNewCard);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            evt.submitter.textContent = "Сохранить";
        });
}

addNewCardForm.addEventListener('submit', handleNewCardForm);

//Обработчик обновления аватара

function handleUpdateAvatar (evt) {
    evt.submitter.textContent = "Сохранение...";
    evt.preventDefault();
    updateAvatar({ avatar: avatarInput.value })
        .then((data) => {
            profileAvatar.style = `background-image: url(${data.avatar})`;
            userAvatar = data.avatar;
            closePopup(popupProfileAvatar);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            evt.submitter.textContent = "Сохранить";
        });
};

avatarForm.addEventListener("submit", handleUpdateAvatar);


//Валидация форм
enableValidation(validationSettings);