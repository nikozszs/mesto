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

function submitFormEditProfile(evt) {
  evt.preventDefault();

  const popupProfileEdit = document.querySelector('.popup_type_edit');
  const nameInput = document.querySelector('.popup__input_type_name').value;
  const jobInput = document.querySelector('.popup__input_type_description').value;
  const profileName= document.getElementById("name");
  const profileJob = document.getElementById("description");
  profileName.textContent = nameInput;
  profileJob.textContent = jobInput;
  openPopup(popupProfileEdit);
}
formEdit.addEventListener('submit', submitFormEditProfile);

// @todo: Форма добавления карточки
const formAdd = document.forms['new-place'];

function submitFormNewCard(evt) {
  evt.preventDefault();

  const buttonNewCard = document.querySelector('.popup_type_new-card');
  const newCardName= document.getElementById("place-name").value;
  const newCardLink = document.getElementById("link").value;

  const newCards = {
    name: newCardName.value,
    link: newCardLink.value
  };

  document.querySelector('.places__list').appendChild(createNewCard(initialCards[0]));
  openPopup(buttonNewCard);
}

function createNewCard (data) {
  const newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.textContent = data.name;
  return newCard;
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

