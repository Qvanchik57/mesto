export default class UserInfo {
    constructor (selector) {
        this._title = document.querySelector(selector.title);
        this._subtitle = document.querySelector(selector.subtitle);
        this.setUserInfo = this.setUserInfo.bind(this);
    }

    getUserInfo() {
        return {
            profile_name: this._title.textContent,
            profile_descrip: this._subtitle.textContent
        };
    }

    setUserInfo({profile_name, profile_descrip}) {
        this._title.textContent = profile_name;
        this._subtitle.textContent = profile_descrip;
    }
}