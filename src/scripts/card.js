// @todo: Функция создания карточки
const cardTemplate = document.querySelector('#card-template').content;

export const createCard = (card, deleteButtonFunction, handleLikeCard, handleImageClick) => {
    const cloneCard = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cloneCard.querySelector('.card__image');
    cardImage.addEventListener('click', () => {
        handleImageClick(cardImage, cardTitle);
    });
    cardImage.setAttribute('alt', card.description);
    const cardTitle = cloneCard.querySelector('.card__title');
    cardTitle.textContent = card.name;
    cardImage.src = card.link;

    const deleteButton = cloneCard.querySelector('.card__delete-button');
    deleteButton.addEventListener ('click', () => {
        deleteButtonFunction(cloneCard);
    }); 
    
    const buttonLike = cloneCard.querySelector('.card__like-button');
    buttonLike.addEventListener ('click', () => {
        handleLikeCard(cloneCard);
    });

  return cloneCard; 
}

// @todo: Поставить лaйк
export function handleLikeCard(event) {
    event.target.classList.toggle('card__like-button_is-active');
}

// @todo: Удалить карточку
export function handleCardDelete(cloneCard) {
    cloneCard.remove();
}
  