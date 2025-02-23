const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-32',
    headers: {
      authorization: "865b937a-fd53-4f83-93da-735ab4a82871",
      'Content-Type': 'application/json'
    }
}
const handleResponse = (response) => {
    return response.json();
}

// @todo: Загрузка информации о пользователе с сервера GET
export const getUserInfo = () => {
      return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          authorization: config.headers.authorization,
          'Content-Type': 'application/json'
        }
      }).then(handleResponse)
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
      }); 
}

// @todo: Загрузка карточек с сервера GET
export const getInitialCards = () => {
      return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: {
          authorization: config.headers.authorization,
          'Content-Type': 'application/json'
        }
      }).then(handleResponse)
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
      }); 
}

Promise.all([getInitialCards(), getUserInfo()])
  .then(([allCards, user]) => {
    return ({allCards, user})
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });

// @todo: Редактирование профиля PATCH
const patchUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: config.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        about: 'Physicist and Chemist'
      })
    }).then(handleResponse)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
    }); 
}

// @todo: Добавление новой карточки POST
export const createCardOnServer = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: "Пример",
      link: "Ссылка"
    }),
  }).then(handleResponse)
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
  }); 
}

// @todo: Отображение количества лайков карточки GET
const getLikes = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'GET',
      headers: {
        authorization: config.headers.authorization,
        'Content-Type': 'application/json'
      },
    }).then(handleResponse)
      .then((data) => {
        const likesCount = data.likes.length;
        return likesCount;
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
    }); 
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
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
  }).then(handleResponse)
    .then((data) => {
      const likesCount = data.likes.length;
      return likesCount;
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
  }); 
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

// // @todo: CARDS API
// const makeCrudAPI = (base) => ({
//     getList: (query) => get(base + "/" + stringifyQuery(query)),
//     getItem: (id) => get(base + `/${id}`),
//     createItem: (data) => postMessage(base + "/", data),
//     updateItem: (id, data, isPatch = false) => 
//         post(base + `/${id}`, data, isPatch ? "PATCH" : "PUT"),
//     deleteItem: (id) => post(base + `/${id}`, {}, "DELETE")
// });

// export const cardsAPI = makeCrudAPI("/cards");
