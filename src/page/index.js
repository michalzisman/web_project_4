import { Card } from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import "../vendor/normalize.css";
import '../../src/index.css';
import "../page/index.css";
import "../styles/variables.css";
import { initialCards } from '../utils/initial-cards.js';
import logo from '../images/logo.svg';
import avatar from '../images/avatar.jpg';
import 
{ settings, addPlaceForm, editProfileForm, cardTemplate, imagePopup, 
    cards, openEditProfileFormBtn, openAddPlaceFormBtn, profileName, profileDescription,
    inputName, inputDescription, inputImageTitle, inputImageLink, logoImage, avatarImage
} from '../utils/constants.js';

logoImage.src = logo;
avatarImage.src = avatar;


const addPlaceFormValidator = new FormValidator(settings, addPlaceForm);
const editProfileFormValidator = new FormValidator(settings, editProfileForm);
addPlaceFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

const defaultCards = new Section({
    items: initialCards,
    renderer: item => {
        return cloneCard(item, cardTemplate)
    },
}, cards);
defaultCards.renderItems();

const userInfo = new UserInfo(".profile__name", ".profile__description");

const userInfoElement = new PopupWithForm(submitUserInfo, editProfileForm);
userInfoElement.setEventListeners();

const newPlaceElement = new PopupWithForm(submitAddNewPlaceForm, addPlaceForm);
newPlaceElement.setEventListeners();

const largeImage = new PopupWithImage(imagePopup);
largeImage.setEventListeners();


function openEditProfilePopup() {
    const { name, description } = userInfo.getUserInfo();
    inputName.value = name;
    inputDescription.value = description;
    editProfileFormValidator.resetValidation();
    userInfoElement.open();
}

function openAddPlacePopup() {
    addPlaceFormValidator.resetValidation();
    newPlaceElement.open();
}

function openImagePopup(event) {
    largeImage.open(event.target);
}

function submitUserInfo({about, name}) {
    userInfo.setUserInfo({about, name})
}

function submitAddNewPlaceForm({ link, name }) {
    const card = cloneCard({ link, name }, cardTemplate);
    defaultCards.addItem(card);
}

function cloneCard(item, cardTemplate) {
    const card = new Card(item, cardTemplate, openImagePopup);
    const cardElement = card.generateCard();
    return cardElement;
}

openEditProfileFormBtn.addEventListener("click", openEditProfilePopup);
openAddPlaceFormBtn.addEventListener("click", openAddPlacePopup);

export { settings, addPlaceFormValidator, editProfileFormValidator };

