class FormValidator {
    constructor(settings, formElement) {
        this.settings = settings;
        this.formElement = formElement;
    }

    _hasInvalidInput() {
        return this.inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.settings.errorClass);
        inputElement.classList.add(this.settings.inputErrorRedLine);
    }

    _hideInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = "";
        errorElement.classList.remove(this.settings.errorClass);
        inputElement.classList.remove(this.settings.inputErrorRedLine);
    }
    
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.buttonElement.disabled = true;
            this.buttonElement.classList.add(this.settings.inactiveButtonClass);
        } else {
            this.buttonElement.disabled = false;
            this.buttonElement.classList.remove(this.settings.inactiveButtonClass);
        }
    }

    resetValidation() {
        this.inputList.forEach(input => {
            this._hideInputError(input)
        })
    }

    _setEventListeners() {
        this.inputList = Array.from(this.formElement.querySelectorAll(this.settings.inputSelector));
        this.buttonElement = this.formElement.querySelector(this.settings.submitButtonSelector);
        this._toggleButtonState();
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this.formElement.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });
    
        this._setEventListeners();
    }
}

export { FormValidator };