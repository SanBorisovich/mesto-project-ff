import { addLikeCard, apiRemoveCard } from "./api";
// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

function createCard(element, userId, removeCard, likeCard, openPopup) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;
  cardElement.querySelector('.card__like-count').textContent = element.likes.length;
  cardElement.dataset.id = element._id;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const image = cardElement.querySelector('.card__image');

  if (element.owner._id !== userId) {
    deleteButton.classList.add('card__delete-button-hidden');
  };

  if (element.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  };

  likeButton.addEventListener('click', () => {
    likeCard(cardElement);
  });
  
  deleteButton.addEventListener('click', () => {
    removeCard(cardElement);
  });

  image.addEventListener('click', () => {
    openPopup(element);
  });

  return cardElement;
}

// @todo: Функция лайка карточки

// function likeCard(item) {
//   const likeButton = item.querySelector('.card__like-button');
//   const isLiked = likeButton.classList.contains("card__like-button_is-active");
//   if (isLiked) {
//     likeButton.classList.remove("card__like-button_is-active");
//   } else {
//     likeButton.classList.add("card__like-button_is-active");
//   };
// }

function likeCard(cardElement) {
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardId = cardElement.dataset.id;
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  // Используем функцию addLikeCard из api.js
  addLikeCard(cardId, isLiked)
    .then(updatedCard => {
      const likeCount = cardElement.querySelector('.card__like-count');
      likeCount.textContent = updatedCard.likes.length;
      if (isLiked) {
        likeButton.classList.remove("card__like-button_is-active");
      } else {
        likeButton.classList.add("card__like-button_is-active");
      }
    })
    .catch(err => {
      console.error(`Ошибка: ${err}`);
    });
}

// @todo: Функция удаления карточки

// function removeCard(item) {
//   item.remove();
// }

function removeCard(cardElement) {
  const cardId = cardElement.dataset.id;
  apiRemoveCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });
}

export { createCard , removeCard , likeCard};