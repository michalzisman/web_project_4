function showInputError(fieldset, inputElement, errorMessage, variables) {
    const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(variables.errorClass);
}

function hideInputError(fieldset, inputElement, variables) {
    const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(variables.errorClass);
}

function checkInputValidity(fieldset, inputElement, variables) {
    if (!inputElement.validity.valid) {
        showInputError(fieldset, inputElement, inputElement.validationMessage, variables);
    } else {
        hideInputError(fieldset, inputElement, variables);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement, variables) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(variables.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(variables.inactiveButtonClass);
    }
}

function setEventListeners(formElement, variables) {
    const inputList = Array.from(formElement.querySelectorAll(variables.inputSelector));
    const buttonElement = formElement.querySelector(variables.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, variables);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement, variables);
            toggleButtonState(inputList, buttonElement, variables);
        });
    });
}

function enableValidation(variables) {
    const formList = Array.from(document.querySelectorAll(variables.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function (evt) {
          evt.preventDefault();
        });
    
        const fieldsetList = Array.from(formElement.querySelectorAll(variables.fieldsetSelector));
    
        fieldsetList.forEach((fieldset) => {
          setEventListeners(fieldset, variables);
        });
    });
}

const variables = {
    formSelector: ".form",
    fieldsetSelector: ".form__fieldset",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "form__submit_inactive",
    inputErrorClass: "form__input-error",
    errorClass: "form__input-error_active"
}

enableValidation(variables);