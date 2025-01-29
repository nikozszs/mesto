import { initialCards } from './scripts/cards.js';
import '../src/pages/index.css';
import { createCard, handleLikeCard, handleCardDelete, handleImageClick} from './scripts/card.js';
import { openModal, closeModal} from './scripts/modal.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
  const cloneCard = createCard(card, handleCardDelete);
  placesList.append(cloneCard);
});


const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

function handleFormSubmit(evt) {
    evt.preventDefault();
    const nameInput = nameInput.value;
    const jobInput = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
