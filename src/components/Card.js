class Card {
  constructor(
    { name, link, likes, owner, _id },
    cardTemplate,
    openImagePopup,
    openDeleteForm,
    updateLikes,
    userId
  ) {
    this._text = name;
    this._image = link;
    this._likes = likes;
    this._owner = owner._id;
    this._cardId = _id;
    this._userId = userId;
    this._cardTemplate = cardTemplate;
    this._openImagePopup = openImagePopup;
    this._openDeleteForm = openDeleteForm;
    this._updateLikes = updateLikes;
    this._activeCard = "card__like_active";
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    if (this._owner === this._userId) {
      this._cardDelete = this._element.querySelector(".card__delete");
      this._cardDelete.classList.add("card__delete_visible");
      this._cardDelete.addEventListener("click", (event) => {
        this._openDeleteForm(event, this._cardId);
      });
    }
    this._cardImage = this._element.querySelector(".card__image");
    this._cardLike = this._element.querySelector(".card__like");
    if (this._likes.some((element) => element["_id"] === this._userId)) {
      this._cardLike.classList.toggle(this._activeCard);
    }
    this._setEventListeners();
    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;
    this._element.querySelector(".card__title").textContent = this._text;
    this._element.querySelector(".card__likesNumber").textContent =
      this._likes.length;
    return this._element;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", (event) => {
      this._openImagePopup(event);
    });
    this._cardLike.addEventListener("click", (event) => {
      this._toggleLike(event);
    });
  }

  _toggleLike(event) {
    event.target.classList.toggle(this._activeCard);
    this._updateLikes(event, this._cardId).then((res) => {
      event.target.parentNode.querySelector(".card__likesNumber").textContent =
        res.likes.length;
    });
  }
}

export { Card };
