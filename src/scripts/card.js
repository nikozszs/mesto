// @todo: Функция создания карточки
const cardTemplate = document.querySelector('#card-template').content;
const getCardTemplate = () => {
    return cardTemplate.querySelector('.card').cloneNode(true);
};

export const createCard = (card, deleteCard, handleImageClick, handleLikesCount, userId) => {
    const cloneCard = getCardTemplate();
    const cardImage = cloneCard.querySelector('.card__image');
    const cardTitle = cloneCard.querySelector('.card__title');
    const deleteButton = cloneCard.querySelector('.card__delete-button');
    const buttonLike = cloneCard.querySelector('.card__like-button');
    const likeCount = cloneCard.querySelector('.card__like-counter');
    const ownerId = card.owner.id || card.owner;
    const cardId = card.id;

    cardImage.alt = card.name;
    cardImage.src = card.link;
    cardTitle.textContent = card.name;
    cloneCard.dataset.cardId = card.id;
    likeCount.textContent = card.likes.length;
    const isLiked = card.likes.some(like => like.id === userId);

    if (isLiked) {
      buttonLike.classList.add('card__like-button_is-active');
    } else {
      buttonLike.classList.remove('card__like-button_is-active');
    }

    if (ownerId === userId) {
      deleteButton.remove();
    } else {
      const deletePopup = document.querySelector('.popup_type_delete-card');
      deleteButton.addEventListener('click', () => deleteCard(cloneCard, cardId, deletePopup));
    }

    cardImage.addEventListener('click', () => handleImageClick(card.link, card.name));

    buttonLike.addEventListener ('click', () => handleLikesCount(likeCount, buttonLike, cardId));
  return cloneCard; 
}