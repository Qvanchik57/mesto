import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const imageTemplate = document.querySelector("#card");
const profileEditButton = document.querySelector(".profile__edit-button");
const photoAddButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileInputTitle = document.querySelector("#name");
const profileInputSubtitle = document.querySelector("#descrip");
const popupProfile = document.querySelector(".popup-profile");
const profileFormElement = popupProfile.querySelector(".popup__form");
const photosContainer = document.querySelector(".photos__grid");
const popupPhoto = document.querySelector(".popup-photo");
const photoFormElement = popupPhoto.querySelector(".popup__form");
const photoName = document.querySelector("#mesto");
const photoLink = document.querySelector("#link");
const popups = Array.from(document.querySelectorAll(".popup"));

const cardSettings = {
  selectors: {
    photosImage: ".photos__image",
    photosName: ".photos__name",
    photosButtonLike: ".photos__button-like",
    photosButtonDelete: ".photos__button-delete",
    photosElement: ".photos__element",
    photosButtonLikeActive: "photos__button-like_active",
    imagePopup: ".discovery",
    imageDiscovery: ".discovery__img",
    discoveryDescription: ".discovery__description",
    openPopup: ".popup_open",
  },
};

const validateSettings = {
  selectors: {
    inputError: "popup__input-text-type-error",
    spanError: "popup__input-text-error_active",
    inputClass: ".popup__input-text",
    buttonClass: ".popup__button-save",
    popupFormClass: ".popup__form",
    buttonInactive: "popup__button-save_inactive",
    disabledButton: "disabled",
    idError: "-error",
  },
};

const popupFormList = Array.from(
  document.querySelectorAll(validateSettings.selectors.popupFormClass)
);

initialCards.forEach(function (card) {
  const cards = new Card(card.name, card.link, imageTemplate, cardSettings);
  const cardsElement = cards.createCard();
  photosContainer.prepend(cardsElement);
});

popupFormList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });
  const inputList = Array.from(
    formElement.querySelectorAll(validateSettings.selectors.inputClass)
  );  
  const buttonElement = formElement.querySelector(validateSettings.selectors.buttonClass); 
  const validator = new FormValidator (validateSettings, formElement, inputList, buttonElement);
  validator.enableValidation();
})

function openPopup(block) {
  block.classList.add("popup_open");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(block) {
  block.classList.remove("popup_open");
  document.removeEventListener("keydown", closeByEscape);
}

function saveProfile() {
  profileTitle.textContent = profileInputTitle.value;
  profileSubtitle.textContent = profileInputSubtitle.value;
}

function submitFormProfile(e) {
  e.preventDefault();
  saveProfile();
  closePopup(popupProfile);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_open");
    closePopup(openedPopup);
  }
}

document.addEventListener("keydown", closeByEscape);

profileEditButton.addEventListener("click", function () {
  profileInputTitle.value = profileTitle.textContent;
  profileInputSubtitle.value = profileSubtitle.textContent;
  openPopup(popupProfile);
});

profileFormElement.addEventListener("submit", submitFormProfile);

photoAddButton.addEventListener("click", function () {
  openPopup(popupPhoto);
});

photoFormElement.addEventListener("submit", function (e) {
  e.preventDefault();
  const cards = new Card(
    photoName.value,
    photoLink.value,
    imageTemplate,
    cardSettings
  );
  const cardsElement = cards.createCard();
  photosContainer.prepend(cardsElement);
  closePopup(popupPhoto);
  e.target.reset();
  photoFormElement
    .querySelector(validateSettings.selectors.buttonClass)
    .setAttribute(validateSettings.selectors.disabledButton, "");
  photoFormElement
    .querySelector(validateSettings.selectors.buttonClass)
    .classList.add(validateSettings.selectors.buttonInactive);
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_open")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__profile-close")) {
      closePopup(popup);
    }
  });
});


