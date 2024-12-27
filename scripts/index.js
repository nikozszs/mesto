// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = (card, deleteCard) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardItem = document.querySelector('.card').cloneNode(true);
    const deleteButton = cardTemplate.querySelector('.card__delete-button');
    cardItem.querySelector('.card__image').src = card.link;
    cardItem.querySelector('.card__title').textContent = card.name;
    deleteButton.addEventListener('click', () => {
        deleteCard(card);
    });
    return cardItem;
}

// @todo: Функция удаления карточки
const removeCard = (card) => {
    card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
    placesList.append(card);
})
console.log(initialCards);