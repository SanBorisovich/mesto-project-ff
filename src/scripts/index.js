import '../pages/index.css';
import { renderCards , createCard , removeCard , likeCard} from "./card.js";
import { initialCards } from "./cards";
import { openPopup , closePopup } from "./modal.js";

// DOM-узлы
const placesList = document.querySelector('.places__list');
// Профиль
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

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

renderCards(initialCards, openImagePopup);

//открытие попапов

profileEditButton.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupProfileEdit);
})

profileAddButton.addEventListener("click", () => { 
    openPopup(popupAddNewCard); 
});

// Обработчик формы ред.проф.

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup();
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

// Обработчик формы добавления карточки 

function handleNewCardForm (evt) {
    evt.preventDefault();
    const newCard = {};
    newCard.name = cardNameInput.value;
    newCard.link = cardLinkInput.value;

    placesList.prepend(createCard(newCard, removeCard, likeCard, openImagePopup));
    closePopup();
    addNewCardForm.reset();
    
}

addNewCardForm.addEventListener('submit', handleNewCardForm);