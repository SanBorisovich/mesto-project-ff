//Настройки 
const config = {
    baseUrl: "https://nomoreparties.co/v1/cohort-magistr-2",
    headers: {
        authorization: "52c33c8e-9ff5-4713-8630-816491acbdcf",
        "Content-Type": "application/json",
    },
};

// Проверка ответа 
function checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  }

// Загрузка информации о пользователе с сервера
const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    }).then(checkResponse);
};

// Загрузка карточек с сервера
const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    }).then(checkResponse);
};

// Обновление данных профиля 
const patchUserData = (data) => {
    return fetch (`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify(data),
    }).then(checkResponse);
};

//Добавление новой карточки
const postNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({ name, link }),
    }).then(checkResponse);
};

//Удаление карточки 
const apiRemoveCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: config.headers,
    }).then(checkResponse);
};

//Постановка и снятие лайка
const addLikeCard = (id, isLiked) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: isLiked ? "DELETE" : "PUT",
        headers: config.headers,
    }).then(checkResponse);
};

//Обновление аватара пользователя
const updateAvatar = (data) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify(data),
    }).then(checkResponse);
};

export {getUserData, getInitialCards, patchUserData, postNewCard, addLikeCard, apiRemoveCard, updateAvatar}