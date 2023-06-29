export default class Popup {
    constructor (selector) {
        this._popup = document.querySelector(selector);
        this._button = this._popup.querySelector('.popup__profile-close');
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }
    
    openPopup() {
        this._popup.classList.add("popup_open");
        this._setDefEventListeners();
    }

    closePopup() {
        this._popup.classList.remove("popup_open");
        this._deleteDefEventListeners();
      }

    _closeByEscape = (evt) => {
        if (evt.key === "Escape") {
          this.closePopup();
        }
    }
    
    _handleOverlayClose = (evt) => {
        if (evt.target === this._popup) {
            this.closePopup();
        }
    }

    _setDefEventListeners() {
        document.addEventListener('keydown', this._closeByEscape);
        this._popup.addEventListener('mousedown', this._handleOverlayClose);
    }

    _deleteDefEventListeners() {
        document.removeEventListener('keydown', this._closeByEscape);
        this._popup.removeEventListener('mousedown', this._handleOverlayClose);
    }

    setEventListeners() {
        this._button.addEventListener('click', () => {
            this.closePopup()
        })
    }
}