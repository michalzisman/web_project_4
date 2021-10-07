export class UserInfo {
    constructor(profileName, profileDescription) {
        this._profileName = document.querySelector(profileName);
        this._profileDescription = document.querySelector(profileDescription);
    }

    getUserInfo() {
        const data = {
            name: this._profileName.textContent,
            description: this._profileDescription.textContent,
        }
        return data;
    }

    setUserInfo({name, about}) {
        this._profileName.textContent = name;
        this._profileDescription.textContent = about;
    }
}