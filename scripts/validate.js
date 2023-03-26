function keyHandler (evt, block) {
    if (evt.key === 'Escape') {
      closePopup(block);
    }
  }
  
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input-text-type-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-text-error_active');
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input-text-type-error');
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input-text-error_active');
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  const setEventListener =(formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input-text'));
    const buttonElement = formElement.querySelector('.popup__button-save');
    buttonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      checkInputValidity(formElement, inputElement);
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        buttonState(inputList, buttonElement);
      });
    });
  }
  
  const enableValidation = () => {
    const popupFormList = Array.from(document.querySelectorAll('.popup__form'));
    popupFormList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListener(formElement);
      let parentForm = formElement.parentElement.parentElement;
      parentForm.addEventListener('click', function(evt) {
        if (!evt.target.classList.contains('popup')) {
          return 0;
        } else {
          closePopup(parentForm);
        };
      })
      document.addEventListener('keydown', function(evt) {
        keyHandler(evt, formElement.parentElement.parentElement);
      })
    });
  };
  
  const invalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  const buttonState = (inputList, buttonElement) => {
    if (invalidInput(inputList)) {
      buttonElement.classList.add('popup__button-save_inactive');
    } else {
      buttonElement.classList.remove('popup__button-save_inactive');
    }
  }
  
  enableValidation();