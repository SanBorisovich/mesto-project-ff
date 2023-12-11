// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(element) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector(".card__title").textContent = element.name;
  cardElement.querySelector(".card__image").src = element.link;
  cardElement.querySelector(".card__image").alt = element.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener('click', function() {
    cardElement.remove();
  });

  return cardElement;
}

// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу

function renderCards(cards) {
  cards.forEach((item) => {
    placesList.append(createCard(item));
  });
}

renderCards(initialCards);