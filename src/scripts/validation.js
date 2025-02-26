// @todo: Валидация формы
export const validationConfig = {
  inputElement: '.popup__input',
  formElement: '.popup__form',
  buttonElement: '.popup__button',
  buttonDisabledClass: 'popup__button_disabled',
  errorClass: 'popup__input_type_error',
  errorMessage: 'popup__error_visible'
}

const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement  = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorMessage);
};
  
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement  = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.setCustomValidity("");
  inputElement.classList.remove(validationConfig.errorClass);
  errorElement.classList.remove(validationConfig.errorMessage);
  errorElement.textContent = '';
};
  
const validity = (formElement, inputElement, validationConfig) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, errorMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
  if (hasInvalidInput) {
    buttonElement.classList.add(validationConfig.buttonDisabledClass);
  } else {
    buttonElement.classList.remove(validationConfig.buttonDisabledClass);
  }
};

export const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputElement));
  const buttonElement = formElement.querySelector(validationConfig.buttonElement);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      validity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

export const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formElement));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(validationConfig.formElement));
      fieldsetList.forEach((fieldSet) => {
        setEventListeners(fieldSet, validationConfig);
      });
    });
};