export class Card {
  constructor(
    {name, link, likes, owner, _id},
    _userId,
    templateSelector,
    cardSettings,
    handleCardClick,
    handleLikeCard,
    handleCardDelete
  ) {
    this._templateSelector = templateSelector;
    this._link = link;
    this._name = name;
    this.likes = likes;
    this._owner = owner;
    this._id = _id;
    this._userId = _userId;
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
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    const cardElement = this._templateSelector.content.cloneNode(true);
    return cardElement;
  }

  createCard() {
    this._photoElement = this._templateSelector.content.cloneNode(true);
    this._image = this._photoElement.querySelector(this._photosImageSelector);
    this._image.src = this._link;
    this._image.alt = this._name;
    this._buttonLike = this._photoElement.querySelector(".photos__button-like");
    this._cardItem = this._photoElement.querySelector('.photos__element')
    this._buttonDelete = this._photoElement.querySelector(
      ".photos__button-delete"
    );
    this._countLike = this._photoElement.querySelector(".photos__like-count");
    this._photoElement.querySelector(this._photosNameSelector).textContent =
      this._name;
    this._photoElementLike = this._photoElement.querySelector(
      this._photosButtonLikeSelector
    );
    this._photoElementDelete = this._photoElement.querySelector(
      this._photosButtonDeleteSelector
    );
    this._setEventListeners();
    this.updateLikes();
    this._compareId();
    return this._photoElement;
  }

  updateLikes() {
    if (this.statusLike()) {
      this._buttonLike.classList.add(this._photosButtonLikeActiveSelector);
      this._countLike.textContent = this.likes.length;
    }
    else if (!this.statusLike()) {
      this._buttonLike.classList.remove(this._photosButtonLikeActiveSelector);
      this._countLike.textContent = this.likes.length;
    }
  }

  _compareId() {
    if (this._owner._id !== this._userId._id) {
      this._buttonDelete.remove();
    }
  }

  getId() {
    return this._id;
  }

  deleteCard () {
    this._cardItem.remove();
  }

  statusLike() {
    return (this.likes.find((card) => card._id === this._userId._id))
  }

  _setEventListeners() {
    this._buttonDelete.addEventListener("click", () => {
      this._handleCardDelete(this);
    });
    this._photoElementLike.addEventListener("click", () => {
      this._handleLikeCard(this);
    });
    this._image.addEventListener("click", () =>  this._handleCardClick(this._link, this._name));
  }
}
