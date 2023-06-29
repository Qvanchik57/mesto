import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(selector) {
        super(selector);
        this._image = this._popup.querySelector('.discovery__img');
        this._subtitle = this._popup.querySelector('.discovery__description');
        this.openPopup = this.openPopup.bind(this);
    }

    openPopup(link, name) {
        super.openPopup();
        this._image.src = link;
        this._image.alt = name;
        this._subtitle.textContent = name;
    }
}