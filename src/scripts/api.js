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
          authorization: "865b937a-fd53-4f83-93da-735ab4a82871",
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
          authorization: '865b937a-fd53-4f83-93da-735ab4a82871',
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
export const patchUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: "865b937a-fd53-4f83-93da-735ab4a82871",
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
export const createNewCard = () => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: '865b937a-fd53-4f83-93da-735ab4a82871',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: "",
        link: ""
      }),
    }).then(handleResponse)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
    }); 
}

// @todo: Отображение количества лайков карточки GET
export const getLikes = (cardId) => {
    return fetch(`${config.baseUrl}/${cardId}`, {
      method: 'GET',
      headers: {
        authorization: '865b937a-fd53-4f83-93da-735ab4a82871',
        'Content-Type': 'application/json'
      },
    }).then(handleResponse)
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
    }); 
}

Promise.all([createNewCard(), getLikes()])
.then(([cards, user]) => {
    cards.forEach(card => {
        getLikes(card._id).then(likes => {
            card.likesCount = likes.length;
        });
    });
    console.log(cards);
    console.log(user);
})
.catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
}); 

// @todo: CARDS API
const makeCrudAPI = (base) => ({
    getList: (query) => get(base + "/" + stringifyQuery(query)),
    getItem: (id) => get(base + `/${id}`),
    createItem: (data) => postMessage(base + "/", data),
    updateItem: (id, data, isPatch = false) => 
        post(base + `/${id}`, data, isPatch ? "PATCH" : "PUT"),
    deleteItem: (id) => post(base + `/${id}`, {}, "DELETE")
});

export const cardsAPI = makeCrudAPI("/cards");
