// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = (card) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardItem = document.createElement('div');
    cardItem.classList.add('card');
    cardItem.querySelector('.card__image').src = card.link;
    cardItem.querySelector('.card__title').textContent = card.name;
    const deleteButton = cardTemplate.querySelector('.card__delete-button').cloneNode(true);
    deleteButton.addEventListener('click', () => {
        card.remove();
    });
    return cardItem;
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
    createCard(card); 
  });
