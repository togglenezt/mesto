
export default class Section {
    constructor({items, renderer}) {
        this._items = items;
        this._renderer = renderer;
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderItems(data) {
        data.forEach((item) => {
            this._renderer(item);
        });
    }
}