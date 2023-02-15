const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const imageTemplate = document.querySelector("#card").content;
const profileEditButton = document.querySelector(".profile__edit-button");
const photoAddButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileInputTitle = document.querySelector("#name");
const profileInputSubtitle = document.querySelector("#descrip");
const popupProfile = document.querySelector(".popup-profile");
const profileFormElement = popupProfile.querySelector(".popup__form");
const popupProfileCloseButton = document.querySelector(".popup__profile-close");
const popupPhotoCloseButton = document.querySelector('.popup__photo-close');
const photosContainer = document.querySelector('.photos__grid');
const popupPhoto = document.querySelector('.popup-photo');
const photoFormElement = popupPhoto.querySelector('.popup__form');
const photoName = document.querySelector('#mesto');
const photoLink = document.querySelector('#link');
const imagePopup = document.querySelector('.discovery');
const imageDiscovery = document.querySelector('.discovery__img');
const imageDescr = document.querySelector('.discovery__description');
const discoveryButtonClose = document.querySelector('.discovery__close');

function dropPhoto (cardLink, cardName) {
    const photoElement = imageTemplate.cloneNode(true);
    const image = photoElement.querySelector('.photos__image');
    image.src = cardLink;
    image.alt = cardName;
    photoElement.querySelector('.photos__name').textContent = cardName;
    photoElement.querySelector('.photos__button-like').addEventListener('click', likeButton);
    image.addEventListener('click', function() {
      openPhoto(image.src, image.alt);
    })
    photoElement.querySelector('.photos__button-delete').addEventListener('click', function(e) {
      e.target.closest('.photos__element').remove();
    })
    return photoElement;
}

initialCards.forEach(function(i) {
    photosContainer.prepend(dropPhoto(i.link, i.name));
})

function openPopup(block) {
    block.classList.add("popup_open");
};

function closePopup(block) {
    block.classList.remove("popup_open");
};

function saveProfile() {
    profileTitle.textContent = profileInputTitle.value;
    profileSubtitle.textContent = profileInputSubtitle.value;
};

function prevent(block) {
    block.preventDefault();
    saveProfile();
    closePopup(popupProfile);
};

function likeButton(e) {
    e.target.classList.toggle("photos__button-like_active");
};

function openPhoto(link, name) {
  imageDiscovery.src = link;
  imageDiscovery.alt = name;
  imageDescr.textContent = name;  
  openPopup(imagePopup);
}

profileEditButton.addEventListener('click', function () {
  profileInputTitle.value = profileTitle.textContent;
  profileInputSubtitle.value = profileSubtitle.textContent;
  openPopup(popupProfile);
});

profileFormElement.addEventListener('submit', prevent);

popupProfileCloseButton.addEventListener('click', function () {
  closePopup(popupProfile);
});

photoAddButton.addEventListener('click', function() {
  openPopup(popupPhoto);
});

photoFormElement.addEventListener('submit', function(block) {
  block.preventDefault();
  console.log(photoName, photoLink);
  photosContainer.prepend(dropPhoto(photoLink.value, photoName.value));
  closePopup(popupPhoto);
  photoLink.value = null;
  photoName.value = null;
})

popupPhotoCloseButton.addEventListener('click', function() {
  closePopup(popupPhoto);
})

discoveryButtonClose.addEventListener('click', function() {
  closePopup(imagePopup);
})