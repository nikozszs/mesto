// @todo: Темплейт карточки
const cardsTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы


// @todo: Функция создания карточки
function createCard(cardData, deleteCallback) {
    const cardTemplate = document.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardTemplate.querySelector('.card__delete-button');
    cardTemplate.querySelector('.card__image').src = cardData.link;
    cardTemplate.querySelector('.card__image').alt = cardData.name;
    cardTemplate.querySelector('.card__title').textContent = cardData.name;
    cardDeleteButton.addEventListener('click', deleteCallback);
    return cardTemplate;
}

// @todo: Функция удаления карточки


// @todo: Вывести карточки на страницу
const placesList = document.querySelector('.places__list');
initialCards.forEach(function (cardData) {
    const card = createCard(cardData);
    placesList.appendChild(card);
})