class Card {
    constructor({ name, link }, cardTemplate, openImagePopup) {
        this._text = name;
        this._image = link;
        this._cardTemplate = cardTemplate;
        this._openImagePopup = openImagePopup;
    }

    _getTemplate() {
        const cardElement = this._cardTemplate.cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".card__image");
        this._cardLike = this._element.querySelector(".card__like");
        this._cardDelete = this._element.querySelector(".card__delete");
        this._setEventListeners(); 
        this._cardImage.src = this._image;
        this._cardImage.alt = this._text;
        this._element.querySelector(".card__title").textContent = this._text;
        return this._element;
    }

    _setEventListeners() {
        this._cardImage.addEventListener("click", (event) => {
            this._openImagePopup(event);
        });
        this._cardLike.addEventListener("click", (event) => {
            this._toggleLike(event);
        });
        this._cardDelete.addEventListener("click", (event) => {
            this._deleteCard(event);
        });
    }

    _deleteCard(event) {
        event.target.parentNode.remove();
    }

    _toggleLike(event) {
        event.target.classList.toggle("card__like_active");
    }
}

export { Card };