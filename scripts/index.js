// @todo: Темплейт карточки
const cardsTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const card = createCard(cardData, removeCard);
const cardTemplate = document.querySelector('.card')

// @todo: Функция создания карточки
function createCard(cardData, deleteCallback) {
    const cardTemplate = document.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardTemplate.querySelector('.card__delete-button');
    cardTemplate.querySelector('.card__image').src = cardData.link;
    cardTemplate.querySelector('.card__image').alt = cardData.name;
    cardTemplate.querySelector('.card__title').textContent = cardData.name;
    cardDeleteButton.addEventListener('click', function() {
        deleteCallback(cardTemplate);
    });
    return cardTemplate;
}

// @todo: Функция удаления карточки
function removeCard(card) {
    card.remove();
}


// @todo: Вывести карточки на страницу
const placesList = document.querySelector('.places__list');
initialCards.forEach(function (cardData) {
    const card = createCard(cardData, removeCard);
    placesList.appendChild(card);
})