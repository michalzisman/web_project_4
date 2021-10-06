export default class Popup {
    constructor(popUp, closeIcon, overlay) {
        this._popUp = popUp;
        this._closeIcon = closeIcon;
        this._overlay = overlay;
        this._boundEventHandler = this._handleEscClose.bind(this); // removeEventListener only works with this.
    }

    open() {
        this.setEventListeners();
        this._popUp.classList.add("popup_opened");
    }

    close() {
        document.removeEventListener("keydown", this._boundEventHandler);
        this._popUp.classList.remove("popup_opened");
    }

    setEventListeners() {
        document.addEventListener("keydown", this._boundEventHandler);
        this._closeIcon.addEventListener("click", () =>{
            this.close();
        });
        this._overlay.addEventListener("click", () =>{
            this.close();
        });
    }

    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.close()
        }
    }
}