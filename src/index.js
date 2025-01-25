import { initialCards } from './scripts/cards.js';
import '../src/pages/index.css';

// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const buttonProfileEdit = document.querySelector('.popup_type_edit');
const buttonProfileAdd = document.querySelector('.popup_type_new-card');
const cardPopup = document.querySelector('.popup_type_image');
const popup = document.querySelector('.popup');
const buttonClose = document.querySelector('.popup__close');


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

// @todo: открыть попап

buttonProfileEdit.addEventListener ('click', () => {
  popup.classList.add('popup_is-opened');
})

// @todo: закрыть попап
// через крестик
buttonProfileEdit.addEventListener ('click', () => {
  popup.classList.remove('popup_is-opened');
})
// через esc
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    popup.classList.remove('popup_is-opened');
  }
});
// через оверлей
