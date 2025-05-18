
export default class CustomerModel{
    constructor(id , name , address , salary ) {
        this._cid = id;
        this._cname = name;
        this._caddress = address;
        this._csalary = salary;
    }


    get cid() {
        return this._cid;
    }

    set cid(value) {
        this._cid = value;
    }

    get cname() {
        return this._cname;
    }

    set cname(value) {
        this._cname = value;
    }

    get caddress() {
        return this._caddress;
    }

    set caddress(value) {
        this._caddress = value;
    }

    get csalary() {
        return this._csalary;
    }

    set csalary(value) {
        this._csalary = value;
    }
}