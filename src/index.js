import { initialCards } from './scripts/cards.js';
import '../src/pages/index.css';
import { createCard, handleLikeCard, handleCardDelete, handleImageClick} from './scripts/card.js';
import { openModal, closeModal} from './scripts/modal.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const newCard = 

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
  const cloneCard = createCard(card, handleCardDelete);
  placesList.append(cloneCard);
});
