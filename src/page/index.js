import { api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit.js";
import "../vendor/normalize.css";
import "../../src/index.css";
import "../page/index.css";
import "../styles/variables.css";
import logo from "../images/logo.svg";
import {
  settings,
  addPlaceForm,
  editProfileForm,
  deleteCardForm,
  editProfilePicForm,
  cardTemplate,
  imagePopup,
  cards,
  openEditProfileFormBtn,
  openAddPlaceFormBtn,
  inputProfilePicLink,
  inputName,
  inputDescription,
  logoImage,
  avatarImage,
} from "../utils/constants.js";

logoImage.src = logo;

const addPlaceFormValidator = new FormValidator(settings, addPlaceForm);
const editProfileFormValidator = new FormValidator(settings, editProfileForm);
const editProfilePicFormValidator = new FormValidator(
  settings,
  editProfilePicForm
);

addPlaceFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
editProfilePicFormValidator.enableValidation();

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardData, userData]) => {
    userId = userData._id;
    defaultCards.renderItems(cardData);
    avatarImage.style.backgroundImage = `url(${userData.avatar})`;
    userInfo.setUserInfo(userData, avatarImage);
  })
  .catch((err) => {
    console.log(err);
  });

const defaultCards = new Section(
  {
    renderer: (item) => {
      return cloneCard(item, cardTemplate);
    },
  },
  cards
);

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__description",
  avatarImage
);

const userInfoElement = new PopupWithForm(submitUserInfo, editProfileForm);
userInfoElement.setEventListeners();

const newPlaceElement = new PopupWithForm(submitAddNewPlaceForm, addPlaceForm);
newPlaceElement.setEventListeners();

const newProfilePic = new PopupWithForm(
  submitNewProfilePic,
  editProfilePicForm
);
newProfilePic.setEventListeners();

const deleteCardElement = new PopupWithSubmit(submitCardDelete, deleteCardForm);
deleteCardElement.setEventListeners();

const largeImage = new PopupWithImage(imagePopup);
largeImage.setEventListeners();

function openEditProfilePopup() {
  const { name, description } = userInfo.getUserInfo();
  inputName.value = name;
  inputDescription.value = description;
  editProfileFormValidator.resetValidation();
  userInfoElement.open();
}

function openEditProfilePicPopup() {
  const { avatar } = userInfo.getUserInfo();
  inputProfilePicLink.value = avatar;
  editProfilePicFormValidator.resetValidation();
  newProfilePic.open();
}

function openAddPlacePopup() {
  addPlaceFormValidator.resetValidation();
  newPlaceElement.open();
}

function openImagePopup(event) {
  largeImage.open(event.target);
}

function openDeleteForm(event, cardId) {
  deleteCardElement.open(event, cardId);
}

function submitUserInfo({ about, name }, event) {
  api.setUserInfo({ about, name }).then((res) => {
    userInfo.setUserInfo(res);
    event.submitter.textContent = "Save";
    userInfoElement.close();
  });
}

function submitNewProfilePic(avatar, event) {
  api.setProfilePic(avatar).then((res) => {
    avatarImage.style.backgroundImage = `url(${res.avatar})`;
    event.submitter.textContent = "Save";
    newProfilePic.close();
  });
}

function submitAddNewPlaceForm({ link, name }, event) {
  api.createCard({ link, name }).then((res) => {
    const card = cloneCard(res, cardTemplate);
    defaultCards.addItem(card);
    event.submitter.textContent = "Save";
    newPlaceElement.close();
  });
}

function submitCardDelete(event, selectedCard) {
  api.deleteCard(selectedCard).then((res) => {
    event.target.parentNode.remove();
    deleteCardElement.close();
  });
}

function updateLikes(event, cardId) {
  return api.toggleLike(event, cardId);
}

function cloneCard(item, cardTemplate) {
  const card = new Card(
    item,
    cardTemplate,
    openImagePopup,
    openDeleteForm,
    updateLikes,
    userId
  );
  const cardElement = card.generateCard();
  return cardElement;
}

openEditProfileFormBtn.addEventListener("click", openEditProfilePopup);
avatarImage.addEventListener("click", openEditProfilePicPopup);
openAddPlaceFormBtn.addEventListener("click", openAddPlacePopup);

export { settings, addPlaceFormValidator, editProfileFormValidator };
