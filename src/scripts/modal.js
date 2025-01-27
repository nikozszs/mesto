const buttonProfileEdit = document.querySelector('.popup_type_edit');
const buttonProfileAdd = document.querySelector('.popup_type_new-card');
const popup = document.querySelector('.popup');

// @todo: открыть попап
export function openModal () {
    buttonProfileEdit.addEventListener ('click', () => {
        popup.classList.add('popup_is-opened');
        popup.classList.add('popup_is-animated');
    })
    buttonProfileAdd.addEventListener ('click', () => {
        popup.classList.add('popup_is-opened');
        popup.classList.add('popup_is-animated');
    })
}

// @todo: закрыть попап
export function closeModal () {
    const buttonClose = document.querySelector('.popup__close');
// через крестик
    buttonClose.addEventListener ('click', () => {
        popup.classList.remove('popup_is-opened');
        popup.classList.add('popup_is-animated');
  })
  // через esc
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      popup.classList.remove('popup_is-opened');
      popup.classList.add('popup_is-animated');
    }
  });
  // через оверлей
}