export class UserInfo {
  constructor(profileName, profileDescription, avatarImage) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
    this._avatar = avatarImage;
  }

  getUserInfo() {
    const data = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
      id: this._userId,
      avatar: this._avatarUrl,
    };
    return data;
  }

  setUserInfo({ name, about, _id, avatar }) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = about;
    this._userId = _id;
    this._avatarUrl = avatar;
  }
}
