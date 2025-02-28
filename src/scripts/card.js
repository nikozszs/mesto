// @todo: Функция создания карточки
const cardTemplate = document.querySelector('#card-template').content;

const getCardTemplate = () => {
    return cardTemplate.querySelector('.card').cloneNode(true);
};

export const createCard = (card, deleteButtonFunction, handleImageClick, handleLikesCount, userId) => {
    const cloneCard = getCardTemplate();
    const cardImage = cloneCard.querySelector('.card__image');
    cardImage.setAttribute('alt', card.description);
    const cardTitle = cloneCard.querySelector('.card__title');
    cardTitle.textContent = card.name;
    cardImage.src = card.link;

    const deleteButton = cloneCard.querySelector('.card__delete-button');
    deleteButton.addEventListener ('click', () => {
        deleteButtonFunction(cloneCard);
    });
    
    const buttonLike = cloneCard.querySelector('.card__like-button');
    buttonLike.addEventListener ('click', handleLikesCount);

    cardImage.addEventListener ('click', () => {
        handleImageClick(cardImage, cardTitle);
    });

    // const likeCount = cardElement.querySelector('.card__like-counter');
    // likeCount.textContent = card.likes.length;
    // if (card.likes.some((like) => like._id === userId)) {
    //     buttonLike.classList.add('card__like-button_is-active');
    //   }
    //   if (card.owner._id !== userId) {
    //     deleteButton.remove();
    //   }
  return cloneCard; 
}

// @todo: Подсчет лайков
export function handleLikesCount(evt) {
  const buttonLike = evt.target;
  const cardElement = buttonLike.closest('.card');
  const likeCount = cardElement.querySelector('.card__like-counter');
  const isLiked = buttonLike.classList.contains('card__like-button_is-active');
  if (isLiked) {
    likeCount.textContent = parseInt(likeCount.textContent) - 1;
    } else {
      likeCount.textContent = parseInt(likeCount.textContent) + 1;
  }
  
  buttonLike.classList.toggle('card__like-button_is-active');
}

// @todo: Удалить карточку
export function handleCardDelete(cloneCard) {
    cloneCard.remove();
}