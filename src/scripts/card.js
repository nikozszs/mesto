// @todo: Функция создания карточки
const cardTemplate = document.querySelector('#card-template').content;
const getCardTemplate = () => {
    return cardTemplate.querySelector('.card').cloneNode(true);
};

export const createCard = (card, deleteButtonFunction, handleImageClick, handleLikesCount, userId) => {
    const cloneCard = getCardTemplate();
    const cardImage = cloneCard.querySelector('.card__image');
    const cardTitle = cloneCard.querySelector('.card__title');
    const deleteButton = cloneCard.querySelector('.card__delete-button');
    const buttonLike = cloneCard.querySelector('.card__like-button');
    const likeCount = cloneCard.querySelector('.card__like-counter');
    const ownerId = card.owner._id || card.owner;

    cardImage.alt = card.name;
    cardImage.src = card.link;
    cardTitle.textContent = card.name;
    cloneCard.dataset.cardId = card._id;
    likeCount.textContent = card.likes.length;
    const isLiked = card.likes.some(like => like._id === userId);

    if (isLiked) {
      buttonLike.classList.add('card__like-button_is-active');
    } else {
      buttonLike.classList.remove('card__like-button_is-active');
    }

    if (ownerId === userId) {
      deleteButton.addEventListener('click', () => deleteCard(cloneCard, card._id, deletePopup));
    } else {
      deleteButton.remove();
    }

    cloneCard.addEventListener('click', () => handleImageClick(card.link, card.name));

    cardImage.addEventListener ('click',() => handleLikesCount(card));
  return cloneCard; 
}

// @todo: Подсчет лайков
export function handleLikesCount(card) {
  const buttonLike = document.querySelector('.card__like-button');
  const likeCount = document.querySelector('.card__like-counter'); 
  const isLiked = buttonLike.classList.contains('card__like-button_is-active');
  const toggleLike = (isLiked) => {
    const method = isLiked ? 'DELETE' : 'PUT';
    return fetch(`https://nomoreparties.co/v1/wff-cohort-32/cards/likes/cardId`, {
      method: method,
      headers: {
        authorization: "865b937a-fd53-4f83-93da-735ab4a82871",
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((data) => {
      likeCount.textContent = data.likes.length;
      buttonLike.classList.toggle('card__like-button_is-active');
    })
    .catch((err) => {
      console.log('Ошибка при обновлении лайка:', err);
    });
  };
  toggleLike(card, isLiked);
}

// @todo: Удаление карточки на сервере DELETE
const deletePopup = document.querySelector('.popup_type_delete-card');
const popupButton = deletePopup.querySelector('.popup__button');
export const deleteCard = (card, cardId) => {
  const deleteCardOnServer = () => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    }).then(response => {
      if (response.ok) {
          card.remove();
          closePopup(deletePopup);
      }
  })
    .catch(error => console.log('Ошибка:', error))
    .finally(() => {
      popupButton.removeEventListener('click', deleteCardOnServer);
    });
  }

  popupButton.addEventListener('click', () => {
    deleteCard(card, cardId)
    openPopup(deletePopup);
  })
}