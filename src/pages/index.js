import * as constants from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import '../pages/index.css';
import PopupWithDeleteCard from "../components/PopupWithDeleteCard.js";

const api = new Api(constants.settingsApi);
const openPopupImage = new PopupWithImage(constants.cardSettings.selectors.imagePopup);
const userInfo = new UserInfo({title: ".profile__title", subtitle: ".profile__subtitle", avatar: ".profile__avatar"});
const section = new Section(createCard, constants.photosContainer);
const popupFormProfile = new PopupWithForm(constants.popupProfileName, handleSubmitUser);
const popupFormCards = new PopupWithForm(constants.popupPhotoName, handleSubmitCards);
const popupDeleteCard = new PopupWithDeleteCard('.popup-delete-card', null);
const popupFormAvatar = new PopupWithForm(constants.popupAvatar, handleSubmitAvatar);

const popupFormList = Array.from(
  document.querySelectorAll(constants.validateSettings.selectors.popupFormClass)
);

function createCard (item) {
  const card = new Card(item, constants.userId, constants.imageTemplate, constants.cardSettings, openPopupImage.openPopup, handleLikeCard, handleSubmitDeleteCard);
  return card.createCard();
}

const enableValidation = (config) => {
  popupFormList.forEach((popupForm) => {
    const validator = new FormValidator(config, popupForm);
    const formName = popupForm.getAttribute('name');
    constants.formValidators[formName] = validator;
    validator.enableValidation();
  })
}

enableValidation(constants.validateSettings);

function handleSubmitUser(data) {
  popupFormProfile.rendererLoading(true);
  api.editUser(data)
    .then((user) => {
    userInfo.setUserInfo(user);
    popupFormProfile.closePopup();
  })
  .catch(err => console.log(err))
  .finally(() => popupFormProfile.rendererLoading(false))
  
}

function handleSubmitCards(data) {
  popupFormCards.rendererLoading(true, 'Создание...');
  api.createNewCard(data)
    .then((res) => {
      section.addItem(createCard(res));
      popupFormCards.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => popupFormCards.rendererLoading(false, 'Создать'))
}

function handleLikeCard (card) {
  const data = card.statusLike() ? api.deleteLike(card._id) : api.putLike(card._id);
  data
    .then((res) => {
      card.likes = res.likes;
      card.updateLikes();
    })
    .catch(err => console.log(err));
}

function handleSubmitDeleteCard (cardInstance) {
  popupDeleteCard.openPopup();
  popupDeleteCard.setActionSubmit(() => {
    api.deleteCard(cardInstance.getId())
      .then(() => {
        cardInstance.deleteCard();
        popupDeleteCard.closePopup();
    })
    .catch((err) => console.log(err));
  });
}

function handleSubmitAvatar (data) {
  popupFormAvatar.rendererLoading(true, 'Создание...');
  api.patchAvatar(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupFormAvatar.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => popupFormAvatar.rendererLoading(false, 'Создать'));
}

constants.profileEditButton.addEventListener("click", function () {
  popupFormProfile.openPopup();
  popupFormProfile.setInputValues(userInfo.getUserInfo());
  constants.formValidators.profile.clearValidation();
});

constants.photoAddButton.addEventListener("click", function () {
  popupFormCards.openPopup();
  constants.formValidators.photo.clearValidation();
});

constants.avatarEditButton.addEventListener("click", function () {
  popupFormAvatar.openPopup();
  constants.formValidators.avatar.clearValidation();
})

openPopupImage.setEventListeners();
popupFormProfile.setEventListeners();
popupFormCards.setEventListeners();
popupDeleteCard.setEventListeners();
popupFormAvatar.setEventListeners();

Promise.allSettled([api.getStartDataUser(), api.getCards()])
  .then(([{value: user}, {value: cards}]) => {
    userInfo.setUserInfo(user);
    constants.userId._id = user._id;
    section.renderItems(cards);
  })