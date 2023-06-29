export default class Section {
    constructor (objectSection, selector) {
        this._initialArray = objectSection.constants.initialCards;
        this._renderer = objectSection.createCard;
        this._container = document.querySelector(selector);
        this.renderItems = this.renderItems.bind(this);
    }

    renderItems() {
        this._initialArray.forEach(item => {
            this.addItem(this._renderer(item.name, item.link));
        })
    }

    addItem(item) {
        this._container.prepend(item);
    }
}