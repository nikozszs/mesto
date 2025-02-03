// @todo: открыть попап
export const openPopup = popup => {
    popup.classList.add('popup_is-opened'); 
    popup.classList.add('popup_is-animated');
    popup.addEventListener('keydown',closePopupByEsc)
};

// @todo: закрыть попап
export const closePopup = popup => {
  popup.classList.remove('popup_is-opened');
  popup.classList.remove('popup_is-animated');
  popup.removeEventListener('keydown', closePopupByEsc);
};
  // через esc
const closePopupByEsc = evt => {
  if (evt.key === 'Escape') { 
    closePopup(popup);
  }
}
  // через оверлей
export function overlayListener(overlay) {
  overlay.addEventListener('click', () => {
    closePopup(popup);
  });
  }