export default class ItemModel{
    constructor(id , des , qty , price) {
        this._id = id;
        this._des = des;
        this._qty = qty;
        this._price = price;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get des() {
        return this._des;
    }

    set des(value) {
        this._des = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }
}