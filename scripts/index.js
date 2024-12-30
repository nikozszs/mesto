// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const cardItem = document.createElement('div');
cardItem.classList.add('card');

// @todo: Функция создания карточки
const createCard = (card, deleteButtonFunction) => {
    const cloneCard = cardTemplate.querySelector('.card').cloneNode(true);
    const createCardImage = cloneCard.querySelector('.card__image');
    const createCardTitle = cloneCard.querySelector('.card__title');
    createCardTitle.textContent = card.name;
    createCardImage.src = card.link;
    const deleteButton = cloneCard.querySelector('.card__delete-button');
    deleteButton.addEventListener ('click', () => {
      deleteButtonFunction();
  }); 

  return cloneCard; 
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  const cardItem = createCard(card, () => cardItem.remove());
    placesList.append(cardItem);  
  }); 