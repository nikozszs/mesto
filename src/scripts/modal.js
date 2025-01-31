const buttonProfileEdit = document.querySelector('.popup_type_edit');
const buttonProfileAdd = document.querySelector('.popup_type_new-card');

// @todo: открыть попап
export const openPopup = popup => {
    popup.classList.add('popup_is-opened'); 
    popup.classList.add('popup_is-animated');
    document.addEventListener('keydown',closePopupByEsc)
};

// @todo: закрыть попап
export const closePopup = popup => {
  popup.classList.remove('popup_is-opened');
  popup.classList.remove('popup_is-animated');
  document.removeEventListener('keydown', closePopupByEsc);
};
  // через esc
const closePopupByEsc = evt => {
  if (evt.key === 'Escape') { 
    closePopup(document.querySelector('.popup'))
  }
}
  // через оверлей
export function overlayListener(overlay) {
  overlay.addEventListener('click', () => {
    closePopup(document.querySelector('.popup'));
  });
  }