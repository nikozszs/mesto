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

    buttonLike.addEventListener ('click', () => {
        handleLikeCard(cloneCard);
    }); 

  return cloneCard; 
};

const buttonLike = document.querySelector('.card__like-button');
// @todo: Поставить лaйк
export function handleLikeCard() {
    if (buttonLike.classList.contains('card__like-button_is-active')) {
        buttonLike.classList.remove('card__like-button_is-active');
    } else {
        buttonLike.classList.add('card__like-button_is-active');
    }
}

// @todo: обработка клика по изображению
export function handleImageClick(cardImage, cardTitle) {
    const popupImage = document.querySelector('.popup_type_image');
    const imageContainer = document.querySelector('.popup__content_content_image')
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardTitle.textContent;
    openModal(imageContainer);
}

// @todo: Удалить карточку
export function handleCardDelete(cloneCard) {
    //показать модал окно
    //делаем запрос на бэкенд
    cloneCard.remove();
    //что то запустить
}
  