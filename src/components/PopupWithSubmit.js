import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
    constructor(callback, popUp, closeIcon) {
        super(popUp, closeIcon);
        this._submit = callback;
    }

    open(event, data) {
        this._data = data;
        this._trigger = event;
        super.open();
    }

    _submitForm() {
        this._submit(this._trigger, this._data);
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popUp.addEventListener("submit", (e) =>{
            e.preventDefault();
            this._submitForm();
        });
    }
}