import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const settings = {
    fieldsetSelector: ".form__fieldset",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "form__submit_inactive",
    inputErrorClass: "form__input-error",
    inputErrorRedLine: "form__input_theme_red",
    errorClass: "form__input-error_active"
}

const addPlaceForm = document.querySelector(".popup_type_add-place");
const addPlaceFormValidator = new FormValidator(settings, addPlaceForm);
const editProfileForm = document.querySelector(".popup_type_edit-profile");
const editProfileFormValidator = new FormValidator(settings, editProfileForm);
addPlaceFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

const cardTemplate = document.querySelector("#card").content;
const imagePopup = document.querySelector(".popup_type_image-popup");
const largeImageData = imagePopup.querySelector(".imageLarge__image");
const largeImageName = imagePopup.querySelector(".imageLarge__name");
const cards = document.querySelector(".cards");
const openEditProfileFormBtn = document.querySelector(".profile__edit");
const openAddPlaceFormBtn = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputName = document.querySelector(".form__input_field_name");
const inputDescription = document.querySelector(".form__input_field_description");
const inputImageTitle = document.querySelector(".form__input_field_title");
const inputImageLink = document.querySelector(".form__input_field_link");
const closeAddPlaceButton = document.querySelector(".popup__closeBtn_add-place");
const closeEditProfileButton = document.querySelector(".popup__closeBtn_edit-profile");
const closeImagePopup = document.querySelector(".popup__closeBtn_theme_image");
const submitEditForm = document.querySelector(".form_type_edit-profile");
const submitNewPlaceForm = document.querySelector(".form_type_add-place");
const editProfileOverlay = editProfileForm.querySelector(".popup__overlay");
const newPlaceOverlay = addPlaceForm.querySelector(".popup__overlay");
const largeImageOverlay = imagePopup.querySelector(".popup__overlay");

function openPopup(popup) {
    document.addEventListener("keydown", escKeyListener);
    popup.classList.add("popup_opened");
}

function closePopup(popup) {
    document.removeEventListener("keydown", escKeyListener);
    popup.classList.remove("popup_opened");
}

function escKeyListener(event) {
    if (event.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup)
    }
}

function openEditProfilePopup() {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
    editProfileFormValidator.enableValidation();
    openPopup(editProfileForm);
}

function closeEditProfilePopup() {
    editProfileFormValidator.resetValidation();
    closePopup(editProfileForm);
}

function openAddPlacePopup() {
    openPopup(addPlaceForm);
}

function closeAddPlacePopup() {
    inputImageTitle.value ="";
    inputImageLink.value ="";
    addPlaceFormValidator.resetValidation();
    closePopup(addPlaceForm);
}

function openImagePopup(event) {
    largeImageData.src = event.target.currentSrc;
    largeImageData.alt = event.target.alt;
    largeImageName.textContent = event.target.alt;
    openPopup(imagePopup);
}

function closeLargeImagePopup() {
    closePopup(imagePopup);
}

function submitEditProfileForm(event) {
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    event.preventDefault();
    closeEditProfilePopup();
}

function submitAddNewPlaceForm(event) {
    const item = {
        name: addPlaceForm.querySelector(".form__input_field_title").value,
        link: addPlaceForm.querySelector(".form__input_field_link").value
    }
    const card = cloneCard(item, cardTemplate);
    cards.prepend(card);
    event.preventDefault();
    closeAddPlacePopup();
}

function cloneCard(item, cardTemplate) {
    const card = new Card(item, cardTemplate);
    const cardElement = card.generateCard();
    return cardElement;
}

const items = initialCards.map(item => cloneCard(item, cardTemplate));

cards.append(...items);

openEditProfileFormBtn.addEventListener("click", openEditProfilePopup);
openAddPlaceFormBtn.addEventListener("click", openAddPlacePopup);
closeAddPlaceButton.addEventListener("click", closeAddPlacePopup);
newPlaceOverlay.addEventListener("click", closeAddPlacePopup);
closeEditProfileButton.addEventListener("click", closeEditProfilePopup);
editProfileOverlay.addEventListener("click", closeEditProfilePopup);
largeImageOverlay.addEventListener("click", closeLargeImagePopup);
closeImagePopup.addEventListener("click", closeLargeImagePopup);
submitEditForm.addEventListener("submit", submitEditProfileForm);
submitNewPlaceForm.addEventListener("submit", submitAddNewPlaceForm);

export { openImagePopup };

