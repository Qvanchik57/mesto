export default class UserInfo {
    constructor (selector) {
        this._title = document.querySelector(selector.title);
        this._subtitle = document.querySelector(selector.subtitle);
        this._avatar = document.querySelector(selector.avatar);
        this.setUserInfo = this.setUserInfo.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
    }
    getUserInfo() {
        return {
            name: this._title.textContent,
            about: this._subtitle.textContent
        };
    }

    setUserInfo({name, about, avatar}) {
        this._title.textContent = name;
        this._subtitle.textContent = about;
        this._avatar.src = avatar;
    }
}