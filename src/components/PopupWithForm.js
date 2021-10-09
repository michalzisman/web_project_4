import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(callback, popUp, closeIcon) {
        super(popUp, closeIcon);
        this._submit = callback;
        this.closeIcon = closeIcon;
        this._form = this._popUp.querySelector(".form");
    }

    close() {
        this._form.reset();
        super.close();
    }

    _getInputValues() {
        const inputs = [...this._popUp.querySelectorAll('.form__input')];
        const inputValues = {};

        inputs.forEach((input) => {
            inputValues[input.name] = input.value
        })
        return inputValues;
    }

    _submitForm() {
        this._submit(this._getInputValues());
        this.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popUp.addEventListener("submit", () =>{
            this._submitForm();
        });
    }
}