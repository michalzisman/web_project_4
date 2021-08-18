let edit = document.querySelector(".profile__edit");
let closButton = document.querySelector(".popup__close");
let popup = document.querySelector(".popup");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let inputName = document.getElementById("form__name");
let inputDescription = document.getElementById("form__description");
let saveEdit = document.querySelector(".form__submit");

function editProfile() {
    inputName.value = profileName.innerHTML;
    inputDescription.value = profileDescription.innerHTML;
    popup.className = popup.className + ` popup_opened`;
}

function closePopup() {
    inputName.innerHTML = "";
    inputDescription.innerHTML = "";
    popup.className = `popup`;
}

function saveChanges() {
    popup.className = `popup`;
    profileName.innerHTML = inputName.value;
    profileDescription.innerHTML = inputDescription.value;
    closePopup();
}

edit.addEventListener("click", editProfile);
closButton.addEventListener("click", closePopup);
saveEdit.addEventListener("click", saveChanges);