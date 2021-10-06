import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(callback, popUp, closeIcon) {
        super(popUp, closeIcon);
        this._submit = callback;
        this.closeIcon = closeIcon;
    }

    close() {
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

    _submitForm(event) {
        this._submit(event, this._getInputValues());
        this.close();
    }

    setEventListeners() {
        this._popUp.addEventListener("submit", (event) =>{
            this._submitForm(event);
        });
        this._closeIcon.addEventListener("click", () =>{
            this.close();
        });
    }
}