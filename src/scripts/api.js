const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-34',
    headers: {
      authorization: "aa25305d-cc4d-48dc-9b4f-5f6c6376e287",
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
      })
      .then(handleResponse)
}

// @todo: Загрузка карточек с сервера GET
export const getInitialCards = () => {
      return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
      })
      .then(handleResponse)
}

// @todo: Редактирование профиля PATCH
export function updateProfileInfo (name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(handleResponse)
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
  })
  .then(handleResponse)
}

// убрать лайк DELETE
export const removeLike = (cardId) => { 
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, { 
    method: 'DELETE', 
    headers: config.headers, 
  }) 
  .then(handleResponse) 
} 

// поставить лайк PUT
export const addLike = (cardId) => { 
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, { 
    method: 'PUT', 
    headers: config.headers, 
  }) 
  .then(handleResponse) 
} 

// Обновление аватара пользователя PATCH
export const patchAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl }),
  })
  .then(handleResponse)
}

// Удаление карточки DELETE
export const deleteCardOnServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
      body: JSON.stringify({ id: cardId }),
    })
    .then(handleResponse)
  }