let edit = document.querySelector(".profile__edit");
let add = document.querySelector(".profile__add-button");
let closeButton = document.querySelector(".popup__close");
let popup = document.querySelector(".popup");
let popupContainer = document.querySelector(".popup__container");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let inputName = document.querySelector(".form__input_field_name");
let inputDescription = document.querySelector(".form__input_field_description");
let title = document.querySelector(".form__input_field_title");
let link = document.querySelector(".form__input_field_link");
let form = document.querySelector(".form");
let imageLarge = document.querySelector(".imageLarge");
let cards = document.querySelector(".cards");
let cardTemplate = document.querySelector("#card").content;
let submit = document.querySelector(".form");

function openPopup(event) {
    if (event.target.className === "card__image") {
        openImage(event);
    } else {
        openForm(event);
    }
    popupContainer.classList.add("popup__container_opened");
    popup.style.opacity = "1";
    popup.classList.add("popup_opened");
}

function openImage(event) {
    imageLarge.classList.add("imageLarge_opened");
    closeButton.classList.add("popup__close_theme_image");
    form.classList.remove("form_opened");
    imageLarge.querySelector("img").src = event.target.currentSrc;
    imageLarge.querySelector("img").alt = event.target.alt;
    imageLarge.querySelector("p").textContent = event.target.alt;
}

function openForm(event) {
    form.classList.add("form_opened");
    closeButton.classList.remove("popup__close_theme_image");
    imageLarge.classList.remove("imageLarge_opened");
    if (event.target.ariaLabel==="Edit") {
        form.querySelector(".form__heading").textContent = "Edit profile"
        form.querySelector(".form__submit").textContent = "Save";
        inputName.value = profileName.textContent;
        inputDescription.value = profileDescription.textContent;
    } else {
        form.querySelector(".form__heading").textContent = "New place"
        form.querySelector(".form__input_field_name").placeholder = "Title";
        form.querySelector(".form__input_field_description").placeholder = "Image link";
        form.querySelector(".form__submit").textContent = "Create";
        inputName.value = "";
        inputDescription.value = "";
    }
}

function closePopup() {
    //using JS to change the style, as well as having a setTimeout for the modifier
    //was the only way I was able to get a smooth effect for when the user closes the popup.
    //I tried adding transition to the _opened modifier, but it didn't help.
    setTimeout(function(){ popupContainer.classList.remove("popup__container_opened"); }, 200);
    popup.style.opacity = "0";
    popup.style.transition = "opacity 0.3s linear";
    setTimeout(function(){ popup.classList.remove("popup_opened"); }, 300);
}

function submitForm(event) {
    if (form.querySelector(".form__submit").textContent === "Create") {
        const card = cloneCard(inputName.value, inputDescription.value)
        cards.prepend(card);
    } else {
        profileName.textContent = inputName.value;
        profileDescription.textContent = inputDescription.value;
    }
    event.preventDefault();
    closePopup();
}

function toggleLike(event) {
    return (event.target.className === "card__like" ? event.target.classList.add("card__like_active") : event.target.classList.remove("card__like_active"))
}

function deleteCard(event) {
    event.target.parentNode.remove();
}

function cloneCard(item, inputDescription) {
    const card = cardTemplate.cloneNode(true);
    card.querySelector("img").src = inputDescription;
    card.querySelector("img").alt = item;
    card.querySelector("h2").textContent = item;
    card.querySelector(".card__image").addEventListener("click", openPopup);
    card.querySelector(".card__like").addEventListener("click", toggleLike);
    card.querySelector(".card__delete").addEventListener("click", deleteCard);
    return card;
}

const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
      name: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

const items = initialCards.map(item => cloneCard(item.name, item.link));

cards.append(...items);

edit.addEventListener("click", openPopup);
add.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
submit.addEventListener("submit", submitForm);