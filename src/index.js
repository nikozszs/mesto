import { initialCards } from './scripts/cards.js';
import '../src/pages/index.css';
import { createCard, handleLikeCard, handleCardDelete } from './scripts/card.js';
import { openPopup, closePopup, addOverlayListener } from './scripts/modal.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
  const cloneCard = createCard(card, handleCardDelete, handleLikeCard, handleImageClick);
  placesList.append(cloneCard);
});

// @todo: Редактирование имени и информации о себе
const formEdit = document.forms['edit-profile'];
const popupProfileEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', () => {
  openPopup(popupProfileEdit);
});

function submitFormEditProfile(evt, data) {
  evt.preventDefault();

  const profileName = document.forms.formEdit.name;
  const profileJob = document.forms.formEdit.description;
  profileName.textContent = data.name;
  profileJob.textContent = data.job;
  closePopup(popupProfileEdit);
}
formEdit.addEventListener('submit', submitFormEditProfile);


// @todo: Форма добавления карточки
const formAdd = document.forms['new-place'];
const popupNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', () => {
  openPopup(popupNewCard);
});

function submitFormNewCard(evt) {
  evt.preventDefault();

  const newCardName= document.getElementById("place-name");
  const newCardLink = document.getElementById("link");

  const newCards = {
    name: newCardName,
    link: newCardLink
  };

  document.querySelector('.places__list').appendChild(createCard(newCards, handleCardDelete, handleLikeCard, handleImageClick));
  closePopup(popupNewCard);
}
formAdd.addEventListener('submit', submitFormNewCard);

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

