export class Popup {
    constructor(popUp) {
        this._popUp = popUp;
        this._boundEventHandler = this._handleEscClose.bind(this); // removeEventListener only works with this.
    }

    open() {
        document.addEventListener("keydown", this._boundEventHandler);
        this._popUp.classList.add("popup_opened");
    }

    close() {
        document.removeEventListener("keydown", this._boundEventHandler);
        this._popUp.classList.remove("popup_opened");
    }

    setEventListeners() {
        this._popUp.querySelector(".popup__closeBtn").addEventListener("click", () =>{
            this.close();
        });
        this._popUp.querySelector(".popup__overlay").addEventListener("click", () =>{
            this.close();
        });
        this._popUp.addEventListener("submit", () =>{
            this._submitForm();
        });
    }

    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.close()
        }
    }
}