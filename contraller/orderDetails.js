import {order} from "../db/db.js";


const loadOrderTable = () => {
    console.log("clicked order table items")
    $("#order-table-body").empty();
    order.map((item) => {
        let data = `<tr>
            <td>${item.oid}</td>
            <td>${item.cid}</td>
            <td>${item.iid}</td>
            <td>${item.qty}</td>
            <td>${item.tot}</td>  
            </tr>`;
        $("#order-table-body").append(data);
    });
};

$(document).ready(function () {
    $("#orderdetail-nav").on("click", function (event) {
        loadOrderTable();
    })
})