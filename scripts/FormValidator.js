class FormValidator {
    constructor(settings, formElement) {
        this.settings = settings;
        this.formElement = formElement;
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _checkInputValidity(fieldset, inputElement, variables) {
        if (!inputElement.validity.valid) {
            this._showInputError(fieldset, inputElement, inputElement.validationMessage, variables);
        } else {
            this._hideInputError(fieldset, inputElement, variables);
        }
    }

    _showInputError(fieldset, inputElement, errorMessage, variables) {
        const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(variables.errorClass);
        inputElement.classList.add(variables.inputErrorRedLine);
    }

    _hideInputError(fieldset, inputElement, variables) {
        const errorElement = fieldset.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = "";
        errorElement.classList.remove(variables.errorClass);
        inputElement.classList.remove(variables.inputErrorRedLine);
    }
    
    _toggleButtonState(inputList, buttonElement, variables) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.disabled = true;
            buttonElement.classList.add(variables.inactiveButtonClass);
        } else {
            buttonElement.disabled = false;
            buttonElement.classList.remove(variables.inactiveButtonClass);
        }
    }

    resetValidation() {
        this.inputList.forEach(input => {
            this._hideInputError(this.formElement, input, this.settings)
        })
    }

    _setEventListeners(formElement, variables) {
        this.inputList = Array.from(formElement.querySelectorAll(variables.inputSelector));
        const buttonElement = formElement.querySelector(variables.submitButtonSelector);
        this._toggleButtonState(this.inputList, buttonElement, variables);
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(formElement, inputElement, variables);
                this._toggleButtonState(this.inputList, buttonElement, variables);
            });
        });
    }

    enableValidation() {
        this.formElement.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });
    
        const fieldsetList = Array.from(this.formElement.querySelectorAll(this.settings.fieldsetSelector));
    
        fieldsetList.forEach((fieldset) => {
            this._setEventListeners(fieldset, this.settings);
        });
    }
}

export { FormValidator };