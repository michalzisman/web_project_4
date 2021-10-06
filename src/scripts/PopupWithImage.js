import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({ currentSrc, alt }) {
        super();
        this._currentSrc = currentSrc;
        this._alt = alt;
    }

    open(largeImageData, largeImageName) {
        largeImageData.src = this._currentSrc;
        largeImageData.alt = this._currentSrc;
        largeImageName.textContent = this._alt;
    }
}