import { initialCards } from './scripts/cards.js';
import '../src/pages/index.css';
import { createCard, handleLikeCard, handleCardDelete } from './scripts/card.js';
import { openPopup, closePopup, addOverlayListener } from './scripts/modal.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close');

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
  const cloneCard = createCard(card, handleCardDelete, handleLikeCard, handleImageClick);
  placesList.append(cloneCard);
});

// @todo: Редактирование имени и информации о себе
const formEdit = document.forms['edit-profile'];
const popupProfileEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const nameInput = popupProfileEdit.querySelector('.popup__input_type_name');
const jobInput = popupProfileEdit.querySelector('.popup__input_type_description');
profileEditButton.addEventListener('click', () => {
  openPopup(popupProfileEdit);
});

formEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  nameInput.value = nameValue;
  jobInput.value = jobValue;
  formEdit.reset();
  closePopup(popupProfileEdit);
});

// @todo: Кнопка закрытия
popupCloseButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
})

// @todo: Форма добавления карточки
const formAdd = document.forms['new-place'];
const popupNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const newCardName = popupNewCard.querySelector(".popup__input_type_card-name").value;
const newCardLink = popupNewCard.querySelector(".popup__input_type_url").value;
profileAddButton.addEventListener('click', () => {
  openPopup(popupNewCard);
});

function submitFormNewCard() {
  const newCards = {
    name: newCardName,
    link: newCardLink
  };
  
  document.querySelector('.places__list').appendChild(createCard(newCards, handleCardDelete, handleLikeCard, handleImageClick));
}

formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitFormNewCard();
  formAdd.reset();
  closePopup(popupNewCard);
});

// @todo: обработка клика по изображению
function handleImageClick(cardImage, cardTitle) {
  const popupTypeImage = document.querySelector('.popup_type_image');
  const popupCaption = document.querySelector('.popup__caption');
  const popupImage = document.querySelector('.popup__image');
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt; 
  popupCaption.textContent = cardTitle.textContent;
  openPopup(popupTypeImage);
}


popups.forEach (function (popup) {
  addOverlayListener(popup);
});

