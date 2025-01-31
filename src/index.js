import { initialCards } from './scripts/cards.js';
import '../src/pages/index.css';
import { createCard, handleLikeCard, handleCardDelete } from './scripts/card.js';
import { openPopup, closePopup, overlayListener} from './scripts/modal.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popup = document.querySelector('.popup');

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

// @todo: обработка клика по изображению
function handleImageClick(cardImage, cardTitle) {
  const popupImage = document.querySelector('.popup_type_image');
  const imageContainer = document.querySelector('.popup__content_content_image')
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardTitle.textContent;
  openPopup(imageContainer);
}

overlayListener(popup);
export default popup;