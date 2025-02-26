import '../src/pages/index.css';
import { createCard, handleLikesCount, handleCardDelete } from './scripts/card.js';
import { openPopup, closePopup, addOverlayListener } from './scripts/modal.js';
import { clearValidation, enableValidation, validationConfig } from './scripts/validation.js';
import { getInitialCards, createCardOnServer, patchAvatar, getUserInfo, updateUserInfo, updateProfileInfo} from './scripts/api.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close');

// @todo: Вывести карточки на страницу
function renderCards(allCards, userId) {
  placesList.innerHTML = '';
  allCards.forEach((card) => {
    const cardElement = createCard(card, userId, handleLikesCount, handleCardDelete);
    placesList.append(cardElement);
  });
}

Promise.all([getInitialCards(), getUserInfo()])
  .then(([allCards, user]) => {
    updateUserInfo(user);
    renderCards(allCards, user._id);
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });

// @todo: Редактирование имени и информации о себе
const formEdit = document.forms['edit-profile'];
const popupProfileEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const nameInput = popupProfileEdit.querySelector('.popup__input_type_name'); 
const jobInput = popupProfileEdit.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent; 
  jobInput.value= profileDescription.textContent;
  clearValidation(formEdit, validationConfig);
  openPopup(popupProfileEdit);
});

formEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameValue = nameInput.value; 
  const jobValue = jobInput.value; 
  profileName.textContent = nameValue;
  profileDescription.textContent = jobValue;
  updateProfileInfo(nameValue, jobValue)
  .then((user) => {
    updateUserInfo(user);
    enableValidation(validationConfig);
    formEdit.reset();
    closePopup(popupProfileEdit);
  })
  .catch((err) => {
    console.error('Ошибка при обновлении данных:', err);
  })
});

// @todo: Форма обновления аватара
const formAvatar = document.forms['edit-avatar'];
const popupAvatar = document.querySelector('.popup_type_edit-avatar');
const profileAvatar = document.querySelector('.profile__image');
const avatarInput = document.querySelector('.popup__input_type_edit-avatar')

profileAvatar.addEventListener('click', () => {
  clearValidation(formAvatar, validationConfig);
  openPopup(popupAvatar);
});

function submitEditAvatar(evt) {
  const buttonPopup = document.querySelector('.popup__button');
  buttonPopup.textContent = "Сохранение...";
  evt.preventDefault();

  patchAvatar(avatarValue)
  .then((data) => {
    avatarValue.setAttribute(
      'style',
      `background-image: url(${data.avatar})`
    );
  })
  .catch((err) => {
    console.log(err);
  })
  .finnaly(() => {
    clearValidation(formAvatar, validationConfig);
    formAvatar.reset();
    closePopup(evt.target.closest('.popup'));
    buttonPopup.textContent = 'Сохранить';
  })
}

formAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const avatarValue = avatarInput.value
  profileAvatar.src = avatarValue;
  enableValidation(validationConfig);
  closePopup(popupAvatar);
  formAvatar.reset();
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
const newCardNameInput = popupNewCard.querySelector(".popup__input_type_card-name"); 
const newCardLinkInput = popupNewCard.querySelector(".popup__input_type_url");

profileAddButton.addEventListener('click', () => {
  clearValidation(formAdd, validationConfig);
  openPopup(popupNewCard);
});

function submitFormNewCard() {
  const name = newCardNameInput.value;
  const link = newCardLinkInput.value;
  createCardOnServer(name, link)
  .then((allCards) => {
    const userId = user._id;
    const cardElement = createCard(allCards, userId);
    const placesList = document.querySelector('.places__list');
    placesList.prepend(cardElement);
    enableValidation(validationConfig);
    closePopup(popupNewCard);
    formAdd.reset();
  })
  .catch((err) => {
    console.error('Ошибка при создании карточки:', err);
  })
}

formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitFormNewCard();
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