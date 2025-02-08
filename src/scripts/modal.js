// @todo: открыть попап
export const openPopup = popup => {
    popup.classList.add('popup_is-opened'); 
    popup.classList.add('popup_is-animated');
    popup.addEventListener('keydown',closePopupByEsc)
};

// @todo: закрыть попап
export const closePopup = popup => {
  popup.classList.remove('.popup_is-opened');
  popup.classList.remove('.popup_is-animated');
  popup.removeEventListener('keydown', closePopupByEsc);
};

  // через esc
const closePopupByEsc = evt => {
  if (evt.key === 'Escape') { 
    closePopup(document.querySelector('.popup_is-opened'));
  }
};

  // через оверлей
export function addOverlayListener(overlay) {
  overlay.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('.popup_is-opened')) {
      closePopup(evt.target);
    }
  });
}