export const imageTemplate = document.querySelector("#card");
export const profileEditButton = document.querySelector(".profile__edit-button");
export const photoAddButton = document.querySelector(".profile__add-button");
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const profileInputTitle = document.querySelector("#name");
export const profileInputSubtitle = document.querySelector("#descrip");
export const popupProfile = document.querySelector(".popup-profile");
export const popupProfileName = ".popup-profile";
export const profileFormElement = popupProfile.querySelector(".popup__form");
export const photosContainer = ".photos__grid";
export const popupPhoto = document.querySelector(".popup-photo");
export const popupPhotoName = ".popup-photo";
export const photoFormElement = popupPhoto.querySelector(".popup__form");
export const photoName = document.querySelector("#mesto");
export const photoLink = document.querySelector("#link");
const popups = Array.from(document.querySelectorAll(".popup"));
export const imagePopup = document.querySelector(".discovery");
export const imageDiscovery = imagePopup.querySelector(".discovery__img");
export const discoveryDescription = imagePopup.querySelector(
  ".discovery__description"
);
export const validationArr = [];

export const cardSettings = {
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

export const validateSettings = {
  selectors: {
    inputError: "popup__input-text-type-error",
    spanError: "popup__input-text-error_active",
    inputClass: ".popup__input-text",
    buttonClass: ".popup__button-save",
    popupFormClass: ".popup__form",
    buttonInactive: "popup__button-save_inactive",
    disabledButton: "disabled",
    idError: "-error",
    photoAddButton: photoAddButton,
  },
};

export {popups as aria};

export const initialCards = [
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