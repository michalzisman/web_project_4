const cardTemplate = document.querySelector("#card").content;
const addPlaceForm = document.querySelector(".popup_type_add-place");
const editProfileForm = document.querySelector(".popup_type_edit-profile");
const imagePopup = document.querySelector(".popup_type_image-popup");
const largeImageData = imagePopup.querySelector(".imageLarge__image");
const largeImageName = imagePopup.querySelector(".imageLarge__name");
const cards = document.querySelector(".cards");
const openEditProfileFormBtn = document.querySelector(".profile__edit");
const openAddPlaceFormBtn = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const popupAddPlace = document.querySelector(".popup_add-place");
const inputName = document.querySelector(".form__input_field_name");
const inputDescription = document.querySelector(".form__input_field_description");
const inputImageTitle = document.querySelector(".form__input_field_title");
const inputImageLink = document.querySelector(".form__input_field_link");
const closeAddPlaceButton = document.querySelector(".popup__closeBtn_add-place");
const closeEditProfileButton = document.querySelector(".popup__closeBtn_edit-profile");
const closeImagePopup = document.querySelector(".popup__closeBtn_theme_image");
const submitEditForm = document.querySelector(".form_type_edit-profile");
const submitNewPlaceForm = document.querySelector(".form_type_add-place");
const editProfileSubmitBtn = editProfileForm.querySelector(".form__submit");
const editProfileOverlay = editProfileForm.querySelector(".popup__overlay");
const newPlaceSubmitBtn = addPlaceForm.querySelector(".form__submit");
const newPlaceOverlay = addPlaceForm.querySelector(".popup__overlay");
const largeImageOverlay = imagePopup.querySelector(".popup__overlay");

function openPopup(popup) {
    document.addEventListener("keydown", escKeyListener)
    popup.classList.add("popup_opened");
}

function closePopup(popup) {
    document.removeEventListener("keydown", escKeyListener);
    popup.classList.remove("popup_opened");
}

function escKeyListener(event) {
    let element;
    if (event.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup)
    }
}

function openEditProfilePopup() {
    editProfileSubmitBtn.classList.remove("form__submit_inactive");
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
    editProfileSubmitBtn.disabled = false;
    openPopup(editProfileForm);
}

function closeEditProfilePopup() {
    closePopup(editProfileForm);
}

function openAddPlacePopup() {
    newPlaceSubmitBtn.classList.add("form__submit_inactive")
    newPlaceSubmitBtn.disabled = true;
    // hasInvalidInput();
    openPopup(addPlaceForm);
}

function closeAddPlacePopup() {
    inputImageTitle.value ="";
    inputImageLink.value ="";
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
    const card = cloneCard(addPlaceForm.querySelector(".form__input_field_title").value, addPlaceForm.querySelector(".form__input_field_link").value)
    cards.prepend(card);
    event.preventDefault();
    closeAddPlacePopup();
}

function toggleLike(event) {
    event.target.classList.toggle("card__like_active");
}

function deleteCard(event) {
    event.target.parentNode.remove();
}

function cloneCard(item, inputDescription) {
    const card = cardTemplate.cloneNode(true);
    card.querySelector(".card__title").textContent = item;
    const cardImage = card.querySelector(".card__image");
    cardImage.src = inputDescription;
    cardImage.alt = item;
    cardImage.addEventListener("click", openImagePopup);
    card.querySelector(".card__like").addEventListener("click", toggleLike);
    card.querySelector(".card__delete").addEventListener("click", deleteCard);
    return card;
}

const items = initialCards.map(item => cloneCard(item.name, item.link));
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