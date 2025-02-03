import { initialCards } from './scripts/cards.js';
import '../src/pages/index.css';
import { createCard, handleLikeCard, handleCardDelete } from './scripts/card.js';
import { openPopup, closePopup, overlayListener } from './scripts/modal.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popup = document.querySelector('.popup');

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
  const cloneCard = createCard(card, handleCardDelete, handleLikeCard);
  placesList.append(cloneCard);
});

// @todo: Редактирование имени и информации о себе
const formEdit = document.forms['edit-profile'];
const buttonProfileEdit = document.querySelector('.popup_type_edit');

function FormEditProfile(evt) {
  evt.preventDefault();
  const nameInput = document.querySelector('.popup__input_type_name').value;
  const jobInput = document.querySelector('.popup__input_type_description').value;
  const profileName= document.getElementById("name");
  const profileJob = document.getElementById("description");
  profileName.textContent = nameInput;
  profileJob.textContent = jobInput;
  closePopup(buttonProfileEdit);
}
formEdit.addEventListener('submit', FormEditProfile);

// @todo: Редактирование имени и информации о себе
const formAdd = document.forms['new-place'];
const buttonNewCard = document.querySelector('.popup_type_new-card');

function FormNewCard(evt) {
  evt.preventDefault();
  const placeNameInput = document.querySelector('.popup__input_type_card-name').value;
  const linkInput = document.querySelector('.popup__input_type_url').value;
  const placeName= document.getElementById("place-name");
  const placeLink = document.getElementById("link");
  placeName.textContent = placeNameInput;
  placeLink.textContent = linkInput;
  closePopup(buttonNewCard);
}
formAdd.addEventListener('submit', FormNewCard);

// @todo: обработка клика по изображению
function handleImageClick(cardImage, cardTitle) {
  const popupImage = document.querySelector('.popup__image');
  const imageContainer = document.querySelector('.popup__content_content_image')
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardTitle.textContent;
  openPopup(imageContainer);
}

overlayListener(popup);
export default popup;

