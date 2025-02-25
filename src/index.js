import { initialCards } from './scripts/cards.js';
import '../src/pages/index.css';
import { createCard, handleLikeCard, handleCardDelete, handleLikesCount } from './scripts/card.js';
import { openPopup, closePopup, addOverlayListener } from './scripts/modal.js';
import { clearValidation, enableValidation, validationConfig } from './scripts/validation.js';
import { getInitialCards, createCardOnServer} from './scripts/api.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close');

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
  const cloneCard = createCard(card, handleCardDelete, handleLikeCard, handleImageClick, handleLikesCount);
  placesList.append(cloneCard);
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
  enableValidation(validationConfig);
  formEdit.reset();
  closePopup(popupProfileEdit);
});

// @todo: Форма обновления аватара
const formAvatar = document.forms['edit-avatar'];
const popupAvatar = document.querySelector('.popup_type_edit-avatar');
const profileAvatar = document.querySelector('.profile__image');
const avatarUrlInput = document.querySelector('.popup__input_type_edit-avatar')

profileAvatar.addEventListener('click', () => {
  clearValidation(formAvatar, validationConfig);
  openPopup(popupAvatar);
});

formAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const avatarValue = avatarUrlInput.value
  profileAvatar.src = avatarValue;
  enableValidation(validationConfig);
  formAvatar.reset();
  closePopup(popupAvatar);
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
  const newCards = {
    name: newCardNameInput.value,
    link: newCardLinkInput.value
  };
  createCardOnServer(newCards)
  .then((createdCard) => {
    const cardElement = createCard(createdCard, handleCardDelete, handleLikeCard, handleImageClick, handleLikesCount)
    document.querySelector('.places__list').appendChild(cardElement);
  })
  .catch((err) => {
    console.error('Ошибка при создании карточки:', err);
  })
}

formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitFormNewCard();
  enableValidation(validationConfig);
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

// @todo: Запросы карточек API 
getInitialCards().then((data) => {
  data.forEach(function (card) {
    createCard(card, handleCardDelete, handleLikeCard, handleImageClick);
    placesList.append(card);
  })
})
//чтобы созд карточку, нужно будет получ сам список карточек и инфу о себе как пользователя. 
//удалять можно ток свои карточки. у карточки будет айдишник владельца карточкию
//нужно при созд каротчки сверять это ваша каротчка или нет. если ваша - оставлять корзинку, если нет - удаляем корзинку на карточке.
//для этого нужно долждиться и инфу о пользорвателе и о карточке и будем одновременно работать

// // @todo: добавить API чтения
// cardsAPI.getList().then((allCards) => {
//   allCards.forEach(elem => {
//     const newCardAPI = card.createItem(
//       elem.id, 
//       elem.title, 
//       elem.completed)
//   });
//   newCardAPI.append(newCardAPI);
// })

// cardsAPI.createItem({
//   title: value,
//   completed: false,
// }).then((newCardAPI) => {
//   newCardAPI.createItem({
//     id: newCardAPI.id,
//     value: newCardAPI.title,
//     input
//   });
// })