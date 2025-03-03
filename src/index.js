import '../src/pages/index.css';
import { createCard } from './scripts/card.js';
import { openPopup, closePopup, addOverlayListener } from './scripts/modal.js';
import { clearValidation, enableValidation, validationConfig, toggleButtonState } from './scripts/validation.js';
import { getInitialCards, createCardOnServer, patchAvatar, getUserInfo, updateProfileInfo, addLike, removeLike} from './scripts/api.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close');
enableValidation(validationConfig);

// @todo: Вывести карточки на страницу
function renderCards(allCards, userId) {
  placesList.innerHTML = '';
  allCards.forEach((card) => {
    const cardElement = createCard(card, handleImageClick, handleLikesCount, userId);
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
const formEditProfile = document.forms['edit-profile'];
const popupProfileEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const nameInput = popupProfileEdit.querySelector('.popup__input_type_name'); 
const jobInput = popupProfileEdit.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent; 
  jobInput.value= profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openPopup(popupProfileEdit);
});

const submitEditProfileForm = (evt) => {
  evt.preventDefault();

  const buttonPopup = formEditProfile.querySelector('.popup__button');
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileDescription.textContent = jobValue;
  buttonPopup.textContent = "Сохранение...";

  updateProfileInfo(nameValue, jobValue)
      .then((user) => {
          updateUserInfo(user);
          closePopup(popupProfileEdit);
          formEditProfile.reset();
      })
      .catch((err) => {
          console.error('Ошибка при обновлении данных:', err);
      })
      .finally(() => {
        buttonPopup.textContent = "Сохранить";
      });
};

formEditProfile.addEventListener('submit', submitEditProfileForm);

// Функция GET
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__description');

function updateUserInfo(user) {
  userName.textContent = user.name;
  userDescription.textContent = user.about;
}

// @todo: Форма обновления аватара
const formAvatar = document.forms['edit-avatar'];
const popupAvatar = document.querySelector('.popup_type_edit-avatar');
const profileAvatar = document.querySelector('.profile__image');
const avatarInput = document.querySelector('.popup__input_type_edit-avatar')

profileAvatar.addEventListener('click', () => {
  avatarInput.value = '';
  clearValidation(formAvatar, validationConfig);
  toggleButtonState([avatarInput], formAvatar.querySelector('.popup__button'), validationConfig);
  openPopup(popupAvatar);
});

function submitEditAvatar(evt) {
  evt.preventDefault();
  
  const buttonPopup = formAvatar.querySelector('.popup__button');
  const avatarValue = avatarInput.value
  buttonPopup.textContent = "Сохранение...";

  patchAvatar(avatarValue)
  .then((data) => {
    profileAvatar.style.backgroundImage = `url(${data.avatar})`;
    closePopup(popupAvatar);
    formAvatar.reset();
    clearValidation(formAvatar, validationConfig);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    buttonPopup.textContent = "Сохранить";
  })
}

formAvatar.addEventListener('submit', submitEditAvatar);

// @todo: Кнопка закрытия
popupCloseButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
})

// @todo: Форма добавления карточки
const formAddCard = document.forms['new-place'];
const popupNewCard = document.querySelector('.popup_type_new-card');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');
const newCardNameInput = popupNewCard.querySelector(".popup__input_type_card-name"); 
const newCardLinkInput = popupNewCard.querySelector(".popup__input_type_url");

buttonOpenAddCardForm.addEventListener('click', () => {
  openPopup(popupNewCard);
});

function submitFormNewCard(evt) {
  evt.preventDefault();

  const name = newCardNameInput.value;
  const link = newCardLinkInput.value;

  createCardOnServer(name, link)
  .then((allCards) => {
    const cardElement = createCard(allCards);
    const placesList = document.querySelector('.places__list');
    placesList.prepend(cardElement);
    closePopup(popupNewCard);
    formAddCard.reset();
    clearValidation(formAddCard, validationConfig);
  })
  .catch((err) => {
    console.error('Ошибка при создании карточки:', err);
  })
}

formAddCard.addEventListener('submit', submitFormNewCard);

// @todo: обработка клика по изображению
const popupTypeImage = document.querySelector('.popup_type_image');
const popupCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');

function handleImageClick(link, name) {
  popupImage.src = link;
  popupImage.alt = name; 
  popupCaption.textContent = name;
  openPopup(popupTypeImage);
}

popups.forEach (function (popup) {
  addOverlayListener(popup);
});

// @todo: Подсчет лайков
function handleLikesCount(likeCount, buttonLike, cardId) {
  const isLiked = buttonLike.classList.contains('card__like-button_is-active');
  if (isLiked) {
    removeLike(cardId)
    .then(data => {
      buttonLike.classList.remove('card__like-button_is-active');
      likeCount.textContent = data.likes.length;
    })
    .catch(err => console.log(err));
  } else {
    addLike(cardId)
    .then(data => {
      buttonLike.classList.add('card__like-button_is-active');
      likeCount.textContent = data.likes.length;
    })
  }
}
