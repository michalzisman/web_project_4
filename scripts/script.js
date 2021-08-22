let edit = document.querySelector(".profile__edit");
let closButton = document.querySelector(".popup__close");
let popup = document.querySelector(".popup");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let inputName = document.querySelector(".form__input_field_name");
let inputDescription = document.querySelector(".form__input_field_description");
let submit = document.querySelector(".form");

function editProfile() {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
    popup.classList.add(`popup_opened`);
}

function closePopup() {
    inputName.textContent = "";
    inputDescription.textContent = "";
    popup.classList.remove(`popup_opened`);
}

function saveChanges(event) {
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    event.preventDefault();
    closePopup();
}

edit.addEventListener("click", editProfile);
closButton.addEventListener("click", closePopup);
submit.addEventListener("submit", saveChanges);