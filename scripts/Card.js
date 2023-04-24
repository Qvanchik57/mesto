export class Card {
  constructor(name, link, templateSelector, cardSettings) {
    this._templateSelector = templateSelector;
    this._cardLink = link;
    this._cardName = name;
    this._photosImageSelector = cardSettings.selectors.photosImage;
    this._photosNameSelector = cardSettings.selectors.photosName;
    this._photosButtonLikeSelector = cardSettings.selectors.photosButtonLike;
    this._photosButtonDeleteSelector =
      cardSettings.selectors.photosButtonDelete;
    this._photoElementSelector = cardSettings.selectors.photosElement;
    this._photosButtonLikeActiveSelector =
      cardSettings.selectors.photosButtonLikeActive;
    this._imagePopupSelector = cardSettings.selectors.imagePopup;
    this._imageDiscoverySelector = cardSettings.selectors.imageDiscovery;
    this._discoveryDescriptionSelector =
      cardSettings.selectors.discoveryDescription;
    this._openPopupSelector = cardSettings.selectors.openPopup;
  }

  _getTemplate() {
    const cardElement = this._templateSelector.content.cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._photoElementSelector = this._getTemplate();
    this._image = this._photoElementSelector.querySelector(
      this._photosImageSelector
    );
    this._image.src = this._cardLink;
    this._image.alt = this._cardName;
    this._photoElementSelector.querySelector(
      this._photosNameSelector
    ).textContent = this._cardName;
    this._setEventListeners(
      this._photosButtonLikeActiveSelector,
      this._image,
      this._photoElementSelector,
      this._photosButtonDeleteSelector
    );
    return this._photoElementSelector;
  }

  _setEventListeners(activeClass, image, element, button) {
    this._photoElementSelector
      .querySelector(this._photosButtonLikeSelector)
      .addEventListener("click", function () {
        this.classList.toggle(activeClass);
      });
    element.querySelector(button).addEventListener("click", function () {
      this.parentElement.remove();
    });
    image.addEventListener("click", () => {
      this._imagePopupSelector.classList.add("popup_open");
      this._imageDiscoverySelector.src = image.src;
      this._imageDiscoverySelector.alt = image.alt;
      this._discoveryDescriptionSelector.textContent = image.alt;
      document.addEventListener("keydown", closePopup)
    });
    const closePopup = (evt) => {
      if (evt.key === "Escape") {
        this._imagePopupSelector.classList.remove("popup_open");
      }
    }
  }
}
