import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popUp) {
    super(popUp);
    this._largeImageData = this._popUp.querySelector(".imageLarge__image");
    this._largeImageName = this._popUp.querySelector(".imageLarge__name");
  }

  open({ currentSrc, alt }) {
    this._largeImageData.src = currentSrc;
    this._largeImageData.alt = currentSrc;
    this._largeImageName.textContent = alt;
    super.open();
  }
}
