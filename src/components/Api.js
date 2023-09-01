export default class Api {
    constructor (data) {
        this._baseUrl = data.myUrl;
        this._headers = data.headers;
        this._setData = this._setData.bind(this);
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка ${res}`)
    }

    _getData(url, method) {
        return fetch(`${this._baseUrl}/${url}`, {
            method: method,
            headers: this._headers
        })
            .then((data) => this._checkResponse(data))
    }

    _setData(url, method, data) {
        return fetch(`${this._baseUrl}/${url}`, {
            method: method,
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._checkResponse)
    }

    getStartDataUser() {
        return this._getData('users/me', 'GET');
    }

    editUser(data) {
        return this._setData('users/me', 'PATCH', data);
    }

    getCards() {
        return this._getData('cards', 'GET');
    }

    createNewCard(data) {
        return this._setData('cards', 'POST', data);
    }

    deleteLike(_id) {
        return this._getData(`cards/${_id}/likes`, 'DELETE');
    }

    putLike(_id) {
        return this._getData(`cards/${_id}/likes`, 'PUT');
    }

    deleteCard(id) {
        return this._getData(`cards/${id}`, 'DELETE');
    }

    patchAvatar({avatar: url}) {
        return this._setData(`users/me/avatar`, 'PATCH', {avatar: url});
    }
}