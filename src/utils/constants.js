export const settings = {
    fieldsetSelector: ".form__fieldset",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "form__submit_inactive",
    inputErrorClass: "form__input-error",
    inputErrorRedLine: "form__input_theme_red",
    errorClass: "form__input-error_active"
}

export const addPlaceForm = document.querySelector(".popup_type_add-place");
export const editProfileForm = document.querySelector(".popup_type_edit-profile");
export const cardTemplate = document.querySelector("#card").content;
export const imagePopup = document.querySelector(".popup_type_image-popup");
export const cards = document.querySelector(".cards");
export const openEditProfileFormBtn = document.querySelector(".profile__edit");
export const openAddPlaceFormBtn = document.querySelector(".profile__add-button");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__description");
export const inputName = editProfileForm.querySelector(".form__input_field_name");
export const inputDescription = editProfileForm.querySelector(".form__input_field_description");
export const inputImageTitle = addPlaceForm.querySelector(".form__input_field_title");
export const inputImageLink = addPlaceForm.querySelector(".form__input_field_link");
export const logoImage = document.getElementById("logo");
export const avatarImage = document.getElementById("avatar");






