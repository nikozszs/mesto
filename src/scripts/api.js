const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-32',
    headers: {
      authorization: "865b937a-fd53-4f83-93da-735ab4a82871",
      'Content-Type': 'application/json'
    }
}

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
};

// @todo: Загрузка информации о пользователе с сервера GET
export const getUserInfo = () => {
      return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers,
      }).then(handleResponse)
}

// @todo: Загрузка карточек с сервера GET
export const getInitialCards = () => {
      return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
      }).then(handleResponse)
}

// @todo: Редактирование профиля PATCH
export function updateProfileInfo (name, description) {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: description
      })
    }).then(handleResponse)
}

// @todo: Добавление новой карточки POST
export function createCardOnServer (name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    }),
  }).then(handleResponse)
}

// @todo: Отображение количества лайков карточки GET
const getLikes = (_id) => {
    return fetch(`${config.baseUrl}/cards/${_id}`, {
      method: 'GET',
      headers: config.headers,
      body: JSON.stringify({
        _id: _id
      }),
    }).then(handleResponse)
}

// @todo: Удаление карточки на сервере DELETE
export const deleteCardOnServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(handleResponse)
}

// Постановка лайка PUT
export const getLikesOnServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(handleResponse)
}

// Cнятие лайка DELETE
export const deleteLikes = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(handleResponse)
}

// Обновление аватара пользователя PATCH
export const patchAvatar = (avatarValue) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarValue }),
  }).then(handleResponse)
}