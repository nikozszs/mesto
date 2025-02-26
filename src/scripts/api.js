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

// @todo: Функция GET
export function updateUserInfo(user) {
  const userName = document.querySelector('.profile__title');
  const userDescription = document.querySelector('.profile__description')

  userName.textContent = user.name;
  userDescription.textContent = user.description;
}
getUserInfo()
.then((user) => {
  updateUserInfo(user);
})
.catch((err) => {
  console.log('Ошибка при загрузке данных пользователя:', err);
})

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
const getLikes = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'GET',
      headers: config.headers,
      body: JSON.stringify({
        _id: ""
      }),
    }).then(handleResponse)
      .then((data) => {
        const likesCount = data.likes.length;
        return likesCount;
      })
}

Promise.all([createCardOnServer()])
  .then(([card]) => {
    if (card && card._id) {
      const promises = [getLikes(card._id)];
      return Promise.all(promises).then(([likesCount]) => {
        card.likesCount = likesCount;
        return card;
      });
    } else {
      console.log('Ошибка: карточка не содержит _id');
      return null;
    }
  })
  .then((card) => {
    if (card) {
      console.log(card);
    }
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
});

// @todo: Удаление карточки на сервере DELETE
export const deleteCardOnServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(handleResponse)
    .then((data) => {
      const likesCount = data.likes.length;
      return likesCount;
    })
}

// @todo: фун для обработки удаления карточки DELETE
const openDeleteConfirmationPopup = (onConfirm) => {
  const popup = document.querySelector('.popup_type_confirm-delete');
  const confirmButton = popup.querySelector('.popup__confirm-button');

  const handleConfirm = () => {
    onConfirm();
    closePopup(popup);
  };

  confirmButton.addEventListener('click', handleConfirm);
  openPopup(popup);
};

const handleCardDelete = (cardId) => {
  openDeleteConfirmationPopup(() => {
    deleteCardOnServer(cardId)
      .then(() => {
        const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
        if (cardElement) {
          cardElement.remove();
        }
        console.log('Карточка успешно удалена');
      })
      .catch((err) => {
        console.log('Ошибка при удалении карточки:', err);
      });
  });
};

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