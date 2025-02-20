// @todo: Валидация формы
export const validationConfig = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  buttonElement: '.popup__button',
  buttonElementdisabled: 'popup__button_disabled',
  errorMessage: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector('.popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};
  
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector('.popup__input_type_error');
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};
  
export const clearValidation = (formElement, inputElement) => {
    if (!inputElement.validity) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, buttonElementdisabled) => {
  if (hasInvalidInput(inputList)) {
    buttonElementdisabled = true;
    buttonElement.classList.add('popup__button');
  } else {
    buttonElementdisabled = false;
    buttonElement.classList.remove('popup__button');
  }
};

export const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      clearValidation(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__form'));
      fieldsetList.forEach((fieldSet) => {
        setEventListeners(fieldSet, validationConfig);
      });
    });
};