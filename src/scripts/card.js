// @todo: Функция создания карточки
const cardTemplate = document.querySelector('#card-template').content;
const getCardTemplate = () => {
    return cardTemplate.querySelector('.card').cloneNode(true);
};

export const createCard = (card, handleImageClick, handleLikesCount, userId) => {
    const cloneCard = getCardTemplate();
    const cardImage = cloneCard.querySelector('.card__image');
    const cardTitle = cloneCard.querySelector('.card__title');
    const deleteButton = cloneCard.querySelector('.card__delete-button');
    const buttonLike = cloneCard.querySelector('.card__like-button');
    const likeCount = cloneCard.querySelector('.card__like-counter');
    const ownerId = card.owner._id || card.owner;
    const cardId = card._id;

    cardImage.alt = card.name;
    cardImage.src = card.link;
    cardTitle.textContent = card.name;
    cloneCard.dataset.cardId = card._id;
    likeCount.textContent = card.likes.length;
    const isLiked = card.likes.some(like => like.id === userId);

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

    cardImage.addEventListener('click', () => handleImageClick(card.link, card.name));

    buttonLike.addEventListener ('click', () => handleLikesCount(likeCount, buttonLike, cardId));
  return cloneCard; 
}

// @todo: Удаление карточки на сервере DELETE
const deletePopup = document.querySelector('.popup_type_delete-card');
const popupButton = deletePopup.querySelector('.popup__button');

popupButton.addEventListener('click', () => {
  deleteCard(card, cardId)
  openPopup(deletePopup);
});

const deleteCard = (card, cardId) => {
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
}