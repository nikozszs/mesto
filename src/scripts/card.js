// @todo: Функция создания карточки
const cardTemplate = document.querySelector('#card-template').content;

export const createCard = (card, deleteButtonFunction, handleLikeCard, handleImageClick) => {
    const cloneCard = cardTemplate.querySelector('.card').cloneNode(true);
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
    buttonLike.addEventListener ('click', handleLikeCard);

    cardImage.addEventListener ('click', () => {
        handleImageClick(cardImage, cardTitle);
    });
    
  return cloneCard; 
}

// @todo: Поставить лaйк
export function handleLikeCard(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
}

// @todo: Удалить карточку
export function handleCardDelete(cloneCard) {
    cloneCard.remove();
}
  