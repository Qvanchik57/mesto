const settings = {
    selectors: {
        inputError: 'popup__input-text-type-error',
        spanError: 'popup__input-text-error_active',
        inputClass: '.popup__input-text',
        buttonClass: '.popup__button-save',
        popupFormClass: '.popup__form',
        buttonInactive: 'popup__button-save_inactive',
        disabledButton: 'disabled',
        idError: '-error',
    }
}

const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}${settings.selectors.idError}`);
    inputElement.classList.add(settings.selectors.inputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.selectors.spanError);
};
  
const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}${settings.selectors.idError}`);
    inputElement.classList.remove(settings.selectors.inputError);
    errorElement.textContent = '';
    errorElement.classList.remove(settings.selectors.spanError);
};
  
const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
};
  
  const setEventListener =(formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.selectors.inputClass));
    const buttonElement = formElement.querySelector(settings.selectors.buttonClass);
    toogleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputElement) => {
      checkInputValidity(formElement, inputElement, settings);
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, settings);
        toogleButtonState(inputList, buttonElement, settings);
      });
    });
  }
  
  const enableValidation = (settings) => {
    const popupFormList = Array.from(document.querySelectorAll(settings.selectors.popupFormClass));
    popupFormList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListener(formElement, settings);
    });
  };
  
  const invalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  const toogleButtonState = (inputList, buttonElement, settings) => {
    if (invalidInput(inputList)) {
      buttonElement.classList.add(settings.selectors.buttonInactive);
      buttonElement.setAttribute(settings.selectors.disabledButton, '');
    } else {
      buttonElement.classList.remove(settings.selectors.buttonInactive);
      buttonElement.removeAttribute(settings.selectors.disabledButton);
    }
  }
  
  enableValidation(settings);