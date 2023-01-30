let profileEditButton = document.querySelector(".profile__edit-button");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let profileInputTitle = document.querySelector("#name");
let profileInputSubtitle = document.querySelector("#descrip");
let popupProfile = document.querySelector(".popup");
let profileFormElement = popupProfile.querySelector(".popup__form");
let popupProfileCloseButton = document.querySelector(".popup__profile-close");
let imageLikeButton = document.querySelectorAll(".photos__button-like");

function openPopup() {
    profileInputTitle.value = profileTitle.textContent;
    profileInputSubtitle.value = profileSubtitle.textContent;
    popupProfile.classList.add("popup_open");
};

function closePopup() {
    popupProfile.classList.remove("popup_open");
};

function saveProfile() {
    profileTitle.textContent = profileInputTitle.value;
    profileSubtitle.textContent = profileInputSubtitle.value;
};

function prevent(e) {
    e.preventDefault();
    saveProfile();
    closePopup("popup_open");
};

profileEditButton.addEventListener('click', openPopup);

profileFormElement.addEventListener('submit', prevent);

popupProfileCloseButton.addEventListener('click', closePopup);

for (let i = 0; i < imageLikeButton.length; i++) {
    imageLikeButton[i].addEventListener("click", function() {
        return imageLikeButton[i].classList.toggle("photos__button-like_active");
    });
}