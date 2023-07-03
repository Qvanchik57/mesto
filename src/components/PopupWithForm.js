import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, submit) {
        super(selector);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputsForm = this._form.querySelectorAll('.popup__input-text');
        this.closePopup = this.closePopup.bind(this);
        this._buttonSave = this._form.querySelector('.popup__button-save');
    }

    _getInputValues() {
        this._arrValuesInputs = {}
        this._inputsForm.forEach((input) => {
            this._arrValuesInputs[input.name] = input.value;
        })
        return this._arrValuesInputs;
    }

    setInputValues(data) {
        this._inputsForm.forEach(input => {
            input.value = data[input.name];
        }) 
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this._getInputValues());
            console.log(this._getInputValues());
            this.closePopup();
        })
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
        this._buttonSave.classList.add('popup__button-save_inactive');
    }
}