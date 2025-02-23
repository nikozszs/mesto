// @todo: Функция создания карточки
const cardTemplate = document.querySelector('#card-template').content;

export const createCard = (card, deleteButtonFunction, handleLikeCard, handleImageClick, currentUserId) => {
    const cloneCard = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cloneCard.querySelector('.card__image');
    cardImage.setAttribute('alt', card.description);
    const cardTitle = cloneCard.querySelector('.card__title');
    cardTitle.textContent = card.name;
    cardImage.src = card.link;

    const deleteButton = cloneCard.querySelector('.card__delete-button');
    if (cloneCard.ownerId === currentUserId) {
        deleteButton.addEventListener ('click', () => {
            deleteButtonFunction(cloneCard);
        }); 
    } else {
        deleteButton.style.display = 'none';
    }
    
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

// @todo: Подсчет лайков
export function handleLikesCount(likeCount, buttonLike, cards) {
    if (buttonLike.classList.contains('card__like-button_is-active')) {
        deleteButtonFunction(cards._id)
        .then((res) => {
            buttonLike.classList.toggle('card__like-button_is-active');
            const likeCount = document.querySelector('.card__like-counter');
            likeCount.textContent = res.likes.length;
        })
        .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ', err);
        });
    } else {
        handleLikeCard(cards._id)
        .then((res) => {
            buttonLike.classList.toggle('card__like-button_is-active');
            likeCount.textContent = res.likes.length
        })
        .catch((err) => 
            console.log('Ошибка. Запрос не выполнен: ', err)
    )}
}

// @todo: Удалить карточку
export function handleCardDelete(cloneCard) {
    cloneCard.remove();
}
  