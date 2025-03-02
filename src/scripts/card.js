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
      deleteButton.addEventListener('click', () => deleteButtonFunction(cloneCard, card._id));
    } else {
      deleteButton.remove();
    }

    buttonLike.addEventListener('click', handleLikesCount);

    cardImage.addEventListener ('click', () => {
      handleImageClick(card.link, card.name)
    });

  return cloneCard; 
}

// @todo: Подсчет лайков
export function handleLikesCount(evt) {
  const buttonLike = evt.currentTarget;
  const cardElement = buttonLike.closest('.card');
  const likeCount = cardElement.querySelector('.card__like-counter');
  const isLiked = buttonLike.classList.contains('card__like-button_is-active');
  const currentCount = parseInt(likeCount.textContent, 100);
  toggleLike(cardElement.dataset.cardId, isLiked);
  if (isLiked) {
    likeCount.textContent = currentCount - 1;
  } else {
    likeCount.textContent = currentCount + 1;
  }
  buttonLike.classList.toggle('card__like-button_is-active');
}

// @todo: Удаление карточки на сервере DELETE
export const deleteCard = (card, cardId) => {
  const deletePopup = document.querySelector('.popup_type_delete-card');
  const popupButton = deletePopup.querySelector('.popup__button');
  openPopup(deletePopup);
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

  popupButton.addEventListener('click', deleteCardOnServer);
}