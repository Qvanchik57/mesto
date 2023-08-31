export default class Section {
    constructor (renderer, selector) {
        this._renderer = renderer;
        this._container = document.querySelector(selector);
        this.renderItems = this.renderItems.bind(this);
    }

    renderItems(items) {
        items.reverse().forEach(item => {
            this.addItem(this._renderer(item));
        })
    }

    addItem(item) {
        this._container.prepend(item);
    }
}