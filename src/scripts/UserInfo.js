import PopupWithForm from "./PopupWithForm.js";

export default class UserInfo extends PopupWithForm {
    constructor({ profileName, profileDescription }) {
        super();
        this._profileName = profileName;
        this._profileDescription = profileDescription;
    }

    getUserInfo() {
        const data = {
            name: this._profileName,
            description: this._profileDescription,
        }
        return data;
    }

    setUserInfo({name, about}) {
        this._profileName = name;
        this._profileDescription = about;
    }
}