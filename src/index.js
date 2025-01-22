import { initialCards } from './scripts/cards.js';
import '../src/pages/index.css';

// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = (card, deleteButtonFunction) => {
    const cloneCard = cardTemplate.querySelector('.card').cloneNode(true);
    const createCardImage = cloneCard.querySelector('.card__image');
    createCardImage.setAttribute('alt', card.description);
    const createCardTitle = cloneCard.querySelector('.card__title');
    createCardTitle.textContent = card.name;
    createCardImage.src = card.link;
    const deleteButton = cloneCard.querySelector('.card__delete-button');
    deleteButton.addEventListener ('click', () => {
      deleteButtonFunction(cloneCard);
  }); 

  return cloneCard; 
};

// @todo: Вывести карточки на страницу
function handleCardDelete(cloneCard) {
  cloneCard.remove();
}

initialCards.forEach(function (card) {
  const cloneCard = createCard(card, handleCardDelete);
  placesList.append(cloneCard);
});