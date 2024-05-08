// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

function createCard(element, removeCard, likeCard, openPopup) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const image = cardElement.querySelector('.card__image');

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

function likeCard(item) {
  const likeButton = item.querySelector('.card__like-button');
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  if (isLiked) {
    likeButton.classList.remove("card__like-button_is-active");
  } else {
    likeButton.classList.add("card__like-button_is-active");
  };
}

// @todo: Функция удаления карточки

function removeCard(item) {
  item.remove();
}

export { createCard , removeCard , likeCard};