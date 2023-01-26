let profileEditButton = document.querySelector(".profile__edit-button");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let profileInputTitle = document.querySelector("#name");
let profileInputSubtitle = document.querySelector("#descrip");
let popupProfile = document.querySelector(".popup");

profileEditButton.addEventListener("click", function () {
    profileInputTitle.value = profileTitle.textContent;
    profileInputSubtitle.value = profileSubtitle.textContent;
    openPopup("popup_open");
});

let profileFormElement = popupProfile.querySelector(".popup__form");

profileFormElement.addEventListener("submit", function (e) {
    e.preventDefault();
    saveProfile();
    closePopup("popup_open");
});

let popupProfileCloseButton = document.querySelector(".popup__profile-close");

popupProfileCloseButton.addEventListener("click", function() {
    closePopup("popup_open");
});

let imageLikeButton = document.querySelectorAll(".photos__button-like");

for (let i = 0; i < imageLikeButton.length; i++) {
    imageLikeButton[i].addEventListener("click", function() {
        return imageLikeButton[i].classList.toggle("photos__button-like_active");
    });
}

function openPopup(div) {
    popupProfile.classList.add(div);
}

function closePopup(div) {
    popupProfile.classList.remove(div);
}

function saveProfile() {
    profileTitle.textContent = profileInputTitle.value;
    profileSubtitle.textContent = profileInputSubtitle.value;
}