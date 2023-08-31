import Popup from "./Popup";

export default class PopupWithDeleteCard extends Popup {
    constructor(selector, submit = null) {
        super(selector);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
    }

    setActionSubmit(callback) {
        this._submit = callback;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit();
        })
    }
}