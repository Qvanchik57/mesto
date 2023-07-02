export class Card {
  constructor(
    name,
    link,
    templateSelector,
    cardSettings,
    handleCardClick,
    handleLikeCard,
    handleDeleteCard
  ) {
    this._templateSelector = templateSelector;
    this._cardLink = link;
    this._cardName = name;
    this._photosImageSelector = cardSettings.selectors.photosImage;
    this._photosNameSelector = cardSettings.selectors.photosName;
    this._photosButtonLikeSelector = cardSettings.selectors.photosButtonLike;
    this._photosButtonDeleteSelector =
      cardSettings.selectors.photosButtonDelete;
    this._photoElement = document.querySelector(cardSettings.selectors.photosElement);
    this._photosButtonLikeActiveSelector =
      cardSettings.selectors.photosButtonLikeActive;
    this._imagePopupSelector = cardSettings.selectors.imagePopup;
    this._imageDiscoverySelector = cardSettings.selectors.imageDiscovery;
    this._discoveryDescriptionSelector =
      cardSettings.selectors.discoveryDescription;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteCard = handleDeleteCard;
    this.deleteCard = this.deleteCard.bind(this)
  }

  _getTemplate() {
    const cardElement = this._templateSelector.content.cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._photoElement = this._getTemplate();
    this._image = this._photoElement.querySelector(this._photosImageSelector);
    this._image.src = this._cardLink;
    this._image.alt = this._cardName;
    this._buttonLike = this._photoElement.querySelector(".photos__button-like");
    this._cardItem = this._photoElement.querySelector('.photos__element')
    this._buttonDelete = this._photoElement.querySelector(
      ".photos__button-delete"
    );
    this._photoElement.querySelector(this._photosNameSelector).textContent =
      this._cardName;
    this._photoElementLike = this._photoElement.querySelector(
      this._photosButtonLikeSelector
    );
    this._photoElementDelete = this._photoElement.querySelector(
      this._photosButtonDeleteSelector
    );
    this._setEventListeners();
    return this._photoElement;
  }

  updateLikes() {
    this._buttonLike.classList.toggle(this._photosButtonLikeActiveSelector);
  }

  deleteCard() {
    this._cardItem.remove()
  }

  _setEventListeners() {
    this._buttonDelete.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });
    this._photoElementLike.addEventListener("click", () => {
      this._handleLikeCard(this);
    });
    this._image.addEventListener("click", () =>  this._handleCardClick(this._cardLink, this._cardName));   }
}
