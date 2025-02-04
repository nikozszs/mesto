import { initialCards } from './scripts/cards.js';
import '../src/pages/index.css';
import { createCard, handleLikeCard, handleCardDelete } from './scripts/card.js';
import { openPopup, closePopup, overlayListener } from './scripts/modal.js';

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

function submitFormEditProfile(evt) {
  evt.preventDefault();
  const nameInput = document.querySelector('.popup__input_type_name').value;
  const jobInput = document.querySelector('.popup__input_type_description').value;
  const profileName= document.getElementById("name");
  const profileJob = document.getElementById("description");
  profileName.textContent = nameInput;
  profileJob.textContent = jobInput;
  closePopup(popupProfileEdit);
}
formEdit.addEventListener('submit', submitFormEditProfile);

// @todo: Форма добавления карточки
const formAdd = document.forms['new-place'];
const buttonNewCard = document.querySelector('.popup_type_new-card');

function submitFormNewCard(evt) {
  evt.preventDefault();

  const newCardName = document.querySelector('.popup__input_type_card-name').value;
  const newCardLink = document.querySelector('.popup__input_type_url').value;
  const placeName= document.getElementById("place-name");
  const placeLink = document.getElementById("link");

  const newCard = {
    name: newCardName.value,
    link: newCardLink.value
  };
  initialCards.unshift(newCard);

  placeName.textContent = newCardName;
  placeLink.textContent = newCardLink;
  closePopup(buttonNewCard);
}
formAdd.addEventListener('submit', submitFormNewCard);

// @todo: обработка клика по изображению
function handleImageClick(cardImage, cardTitle) {
  const popupImage = document.querySelector('.popup__image');
  const imageContainer = document.querySelector('.popup__content_content_image');
  const popupCaption = document.querySelector('.popup__caption');
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardTitle.textContent;
  openPopup(imageContainer);
}

popups.forEach(function (popup) {
  overlayListener(popup);
});

