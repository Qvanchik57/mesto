export class FormValidator {
  constructor(settings, formElement) {
    this._inputError = settings.selectors.inputError;
    this._spanError = settings.selectors.spanError;
    this._inputClass = settings.selectors.inputClass;
    this._buttonClass = settings.selectors.buttonClass;
    this._popupFormClass = settings.selectors.popupFormClass;
    this._buttonInactive = settings.selectors.buttonInactive;
    this._disabledButton = settings.selectors.disabledButton;
    this._idError = settings.selectors.idError;
    this._formElement = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(settings.selectors.inputClass)
    );
    this._buttonElement = formElement.querySelector(
      settings.selectors.buttonClass
    );
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}${this._idError}`
    );
    inputElement.classList.add(this._inputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._spanError);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}${this._idError}`
    );
    errorElement.textContent = "";
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListener = () => {
    this._buttonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._buttonState();
      });
    });
  };

  enableValidation() {
    this._setEventListener();
  }

  _invalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _buttonState = () => {
    if (this._invalidInput()) {
      this._buttonElement.classList.add(this._buttonInactive);
      this._buttonElement.setAttribute(this._disabledButton, "");
    } else {
      this._buttonElement.classList.remove(this._buttonInactive);
      this._buttonElement.removeAttribute(this._disabledButton);
    }
  };

  _resetValidation() {
    this._buttonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }

  clearValidation() {
    this._resetValidation();
  }
}
