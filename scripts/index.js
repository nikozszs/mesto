// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const cardItem = document.createElement('div');
cardItem.classList.add('card');

// @todo: Функция создания карточки
const createCard = (card) => {
    cardTemplate.querySelector('.card').cloneNode(true);
    const createCardImage = cardItem.querySelector('.card__image');
    const createCardTitle = cardItem.querySelector('.card__title');
    createCardTitle.textContent = card.name;
    createCardImage.src = card.link;
    const deleteButton = cardTemplate.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        cardItem.remove();
    });
    return cardItem;
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
    createCard(card); 
    placesList.append(cardItem); 
  });
