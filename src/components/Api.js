const customFetch = (url, headers, body) =>
  fetch(url, headers, body)
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`)
    )
    .catch((err) => {
      return err;
    });

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  setUserInfo(data) {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  getUserInfo() {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  setProfilePic(avatar) {
    return customFetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(avatar),
    });
  }

  getInitialCards() {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  createCard(data) {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  deleteCard(id) {
    return customFetch(`${this._baseUrl}/cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  toggleLike(event, cardId) {
    return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: event.target.classList.contains("card__like_active")
        ? "PUT"
        : "DELETE",
    });
  }
}

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: " 978f0b2f-5c84-4cbe-bdf4-1813c3f57b95",
    "Content-Type": "application/json",
  },
});
