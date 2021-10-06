import { Card } from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import Section from './scripts/Section.js';
import Popup from './scripts/Popup.js';
import UserInfo from './scripts/UserInfo.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import "./vendor/normalize.css";
import "./pages/index.css";
import "./styles/variables.css";
import { initialCards } from './scripts/initial-cards';
import logo from './images/logo.svg';
import avatar from './images/avatar.jpg';

const settings = {
    fieldsetSelector: ".form__fieldset",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "form__submit_inactive",
    inputErrorClass: "form__input-error",
    inputErrorRedLine: "form__input_theme_red",
    errorClass: "form__input-error_active"
}

const logoImage = document.getElementById("logo");
logoImage.src = logo;
const avatarImage = document.getElementById("avatar");
avatarImage.src = avatar; 

const addPlaceForm = document.querySelector(".popup_type_add-place");
const editProfileForm = document.querySelector(".popup_type_edit-profile");
const addPlaceFormValidator = new FormValidator(settings, addPlaceForm);
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
const inputName = editProfileForm.querySelector(".form__input_field_name");
const inputDescription = editProfileForm.querySelector(".form__input_field_description");
const inputImageTitle = addPlaceForm.querySelector(".form__input_field_title");
const inputImageLink = addPlaceForm.querySelector(".form__input_field_link");
const closeAddPlaceButton = addPlaceForm.querySelector(".popup__closeBtn_add-place");
const closeEditProfileButton = editProfileForm.querySelector(".popup__closeBtn_edit-profile");
const closeImagePopup = imagePopup.querySelector(".popup__closeBtn_theme_image");
const editProfileOverlay = editProfileForm.querySelector(".popup__overlay");
const newPlaceOverlay = addPlaceForm.querySelector(".popup__overlay");
const largeImageOverlay = imagePopup.querySelector(".popup__overlay");

const defaultCards = new Section({ 
    items: initialCards,
    renderer: item => {
        return cloneCard(item, cardTemplate)
    },                                       
}, cards);

defaultCards.renderItems();

export const userInfo = new UserInfo({
    profileName: profileName.textContent,
    profileDescription: profileDescription.textContent
});

const userInfoElement = new PopupWithForm(submitUserInfo, editProfileForm, closeEditProfileButton);
userInfoElement.setEventListeners();

const newPlaceElement = new PopupWithForm(submitAddNewPlaceForm, addPlaceForm, closeAddPlaceButton);
newPlaceElement.setEventListeners();

function openPopup(popup, closeIcon, overlay) {
    const element = new Popup(popup, closeIcon, overlay);
    element.open();
}

function openEditProfilePopup() {
    const { name, description } = userInfo.getUserInfo();
    inputName.value = name;
    inputDescription.value = description;
    editProfileFormValidator.resetValidation();
    openPopup(editProfileForm, closeEditProfileButton, editProfileOverlay);
}

function openAddPlacePopup() {
    inputImageTitle.value ="";
    inputImageLink.value ="";
    addPlaceFormValidator.resetValidation();
    openPopup(addPlaceForm, closeAddPlaceButton, newPlaceOverlay);
}

function openImagePopup(event) {
    openPopup(imagePopup, closeImagePopup, largeImageOverlay);
    const element = new PopupWithImage(event.target);
    element.open(largeImageData, largeImageName);
}

function submitUserInfo(event, {about, name}) {
    userInfo.setUserInfo({about, name})
    profileName.textContent = name;
    profileDescription.textContent = about;
    event.preventDefault();
}

function submitAddNewPlaceForm(event, { link, title }) {
    const card = cloneCard({ link, title }, cardTemplate);
    defaultCards.addItem(card);
    event.preventDefault();
}

function cloneCard(item, cardTemplate) {
    const card = new Card(item, cardTemplate);
    const cardElement = card.generateCard();
    return cardElement;
}

openEditProfileFormBtn.addEventListener("click", openEditProfilePopup);
openAddPlaceFormBtn.addEventListener("click", openAddPlacePopup);

export { openImagePopup, settings, addPlaceFormValidator, editProfileFormValidator };

