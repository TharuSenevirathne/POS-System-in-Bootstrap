export default class CartModel{

    constructor(cid , iid , qty , unitprice , total) {
        this._cid = cid;
        this._iid = iid;
        this._qty = qty;
        this._unitprice = unitprice;
        this._total = total;
    }


    get cid() {
        return this._cid;
    }

    set cid(value) {
        this._cid = value;
    }

    get iid() {
        return this._iid;
    }

    set iid(value) {
        this._iid = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

    get unitprice() {
        return this._unitprice;
    }

    set unitprice(value) {
        this._unitprice = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}