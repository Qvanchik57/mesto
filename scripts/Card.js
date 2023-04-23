export class Card {
  constructor(name, link, templateSelector, cardSettings) {
    this._templateSelector = templateSelector;
    this._cardLink = link;
    this._cardName = name;
    this._photosImage = cardSettings.selectors.photosImage;
    this._photosName = cardSettings.selectors.photosName;
    this._photosButtonLike = cardSettings.selectors.photosButtonLike;
    this._photosButtonDelete = cardSettings.selectors.photosButtonDelete;
    this._photoElement = cardSettings.selectors.photosElement;
    this._photosButtonLikeActive =
      cardSettings.selectors.photosButtonLikeActive;
    this._imagePopup = cardSettings.selectors.imagePopup;
    this._imageDiscovery = cardSettings.selectors.imageDiscovery;
    this._discoveryDescription = cardSettings.selectors.discoveryDescription;
    this._openPopup = cardSettings.selectors.openPopup;
  }

  _getTemplate() {
    const cardElement = this._templateSelector.content.cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._photoElement = this._getTemplate();
    this._image = this._photoElement.querySelector(this._photosImage);
    this._image.src = this._cardLink;
    this._image.alt = this._cardName;
    this._photoElement.querySelector(this._photosName).textContent =
      this._cardName;
    this._checkLike(this._photosButtonLikeActive);
    this._openDiscoveryPhoto(
      this._imagePopup,
      this._imageDiscovery,
      this._image,
      this._discoveryDescription
    );
    this._deletePhotoElement(this._photoElement, this._photosButtonDelete);
    return this._photoElement;
  }

  _checkLike(activeClass) {
    this._photoElement
      .querySelector(this._photosButtonLike)
      .addEventListener("click", function () {
        this.classList.toggle(activeClass);
      });
  }

  _deletePhotoElement(element, button) {
    element.querySelector(button).addEventListener("click", function (e) {
      e.target.parentElement.remove();
    });
  }

  _openDiscoveryPhoto(popup, srcImg, image, description) {
    image.addEventListener("click", function () {
      document.querySelector(popup).classList.add("popup_open");
      document.querySelector(srcImg).src = image.src;
      document.querySelector(srcImg).alt = image.alt;
      document.querySelector(description).textContent = image.alt;
    });
  }
}