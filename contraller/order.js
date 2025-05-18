import OrderModel from '../models/orderModel.js';
import CartModel from '../models/cartModel.js';
import { customerary, itemary, order , cart } from "../db/db.js";


let grandtotal = 0;
let itemindex ;
const loadOrderTable = () => {
    $("#orderTableBody").empty();
    cart.map((item) => {
        let data = `<tr>
            <td>${item.cid}</td>
            <td>${item.iid}</td>
            <td>${item.qty}</td>
            <td>${item.unitprice}</td>
            <td>${item.total}</td>  
            </tr>`;
        $("#orderTableBody").append(data);
    });
};

const clearOrderForm = () => {
    $("#customerSelect").val("");
    $("#customerName").val("");
    $("#itemSelect").val("");
    $("#unitPrice").val("");
    $("#quantity").val("");
    $("#qtyOnHand").val("");
};

const loadCustomerselect = () => {
    $("#customerSelect").empty();
    $("#customerSelect").append('<option value="">Select Customer</option>'); // Add default option

    customerary.map((item) => {
        let data = `<option>
                    ${item.cid}
                    </option>`;
        $("#customerSelect").append(data);
    });
};

const loadItemselect = () => {
    $("#itemSelect").empty();
    $("#itemSelect").append('<option value="">Select Item</option>');
    itemary.map((item) => {
        let data = `<option value="${item.id}">
                    ${item.id}
                    </option>`;
        $("#itemSelect").append(data);
    });
};

$("#customerSelect").on("change", function (event) {
    event.preventDefault();
    let index = $(this).prop('selectedIndex');
    if (index > 0) {
        $("#customerName").val(customerary[index - 1].cname);  // Ensure correct index
    }
});

$("#itemSelect").on("change", function (event) {
    event.preventDefault();
    itemindex = $(this).prop('selectedIndex');
    if (itemindex > 0) {
        $("#qtyOnHand").val(itemary[itemindex - 1].qty);
        $("#unitPrice").val(itemary[itemindex - 1].price);
    }
});

$("#addcart").on("click", function (event) {
    event.preventDefault();

    let cid = $("#customerSelect").val();
    let iid = $("#itemSelect").val();
    let qtyOnHand = parseInt($("#qtyOnHand").val()); // Convert qtyOnHand to a number
    let unitprice = parseFloat($("#unitPrice").val()); // Convert unitprice to a number
    let quantity = parseInt($("#quantity").val()); // Convert quantity to a number
    let tot = unitprice * quantity;

    // Check if customer and item are selected and if quantity is valid
    if (cid.length !== 0 && iid.length !== 0 && quantity > 0) {
        if (quantity > qtyOnHand) {
            Swal.fire({
                position: "center",
                icon: "error",  // Fix icon name (lowercase)
                title: "Quantity not available",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            let cartdata = new CartModel(cid, iid, quantity, unitprice, tot);

            // Update item quantity
            updateItem(iid, quantity);

            /*
            // Uncomment this if you are updating qtyOnHand dynamically
            $("#qtyOnHand").val(itemary[itemindex - 1].qty);  // Set updated qtyOnHand value
            */

            console.log(cartdata);
            cart.push(cartdata);

            // Update the grand total
            grandtotal += tot;
            $("#orderTotal").empty();
            $("#orderTotal").append("Total : " + grandtotal.toFixed(2) + "/="); // Keep 2 decimal places

            // Reload the order table with new data
            loadOrderTable();

            // Clear the order form after adding item to the cart
            clearOrderForm();
        }
    } else {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Please select customer and item",
            showConfirmButton: false,
            timer: 1500
        });
    }
});

function updateItem(iid, quantity) {
    for (let i = 0; i < itemary.length; i++) {
        if (iid === itemary[i].id) {
            itemary[i].qty = itemary[i].qty - quantity;  // Update quantity in itemary
        }
    }
}


$(document).ready(function () {
    $("#order").on("click", function (event) {
        event.preventDefault();
        loadCustomerselect();
        loadItemselect();
    });
});

$("#placeOrder").on("click", function (event) {
    event.preventDefault();

    console.log("dfghjk")
    $("#orderTableBody tr").each(function () {
        let cid = $(this).find("td:eq(0)").text(); // Get customer id from the first column
        let iid = $(this).find("td:eq(1)").text(); // Get item id from the second column
        let qty = $(this).find("td:eq(2)").text(); // Get quantity from the third column
        let unitprice = $(this).find("td:eq(3)").text(); // Get unit price from the fourth column
        let total = $(this).find("td:eq(4)").text(); // Get total from the fifth column

        let orderData = new OrderModel( order.length+1 , cid, iid, qty, unitprice, total);
        order.push(orderData);
    });



    $("#orderTableBody").empty();
    $("#orderTotal").empty();
    $("#orderTotal").append("Total : 0.00/=");

    clearOrderForm();
    cart.splice(0 , cart.length);
    console.log(order);
    Swal.fire({
        position: "success",
        icon: "success",
        title: "Order placed successfully",
        showConfirmButton: false,
        timer: 1500
    });
});
