import ItemModel from '../models/ItemModel.js';
import { customerary, itemary } from "../db/db.js";

let itemindex;

// Load table
const loadItemTable = () => {
    $("#itemTableBody").empty();

    itemary.map((item) => {
        let data = `<tr>
            <td>${item.id}</td>
            <td>${item.des}</td>
            <td>${item.qty}</td>
            <td>${item.price}</td>
        </tr>`;
        $("#itemTableBody").append(data);
    });
};

// Clear inputs
function clear() {
    $("#iid").val('');
    $("#iname").val('');
    $("#iqty").val('');
    $("#iprice").val('');
}

// Validate Item ID
const validIId = (iid) => {
    const iidregex = /^I\d+$/;
    return iidregex.test(iid);
};

// Save Item
$("#itemsave").on('click', function (event) {
    event.preventDefault();

    let id = $("#iid").val();
    let des = $("#iname").val();
    let qty = $("#iqty").val();
    let price = $("#iprice").val();

    if (!validIId(id)) {
        Swal.fire("Invalid Item ID", "", "warning");
    } else if (des.length === 0) {
        Swal.fire("Item Description cannot be empty", "", "warning");
    } else if (qty.length === 0) {
        Swal.fire("Item Quantity cannot be empty", "", "warning");
    } else if (price.length === 0) {
        Swal.fire("Unit Price cannot be empty", "", "warning");
    } else {
        let itemModel = new ItemModel(id, des, qty, price);
        itemary.push(itemModel);
        loadItemTable();
        clear();
        Swal.fire("Item saved successfully!", "", "success");
    }
});

// Search Item
$("#itemsearch").on('click', function (event) {
    event.preventDefault();

    let id = $("#iid").val();
    let found = false;

    for (let i = 0; i < itemary.length; i++) {
        if (itemary[i].id === id) {
            itemindex = i;
            $("#iname").val(itemary[i].des);
            $("#iqty").val(itemary[i].qty);
            $("#iprice").val(itemary[i].price);
            found = true;
            break;
        }
    }

    if (!found) {
        Swal.fire("Item not found!", "", "error");
    }
});

// Delete Item
$("#itemdelete").on('click', function (event) {
    event.preventDefault();

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel"
    }).then((result) => {
        if (result.isConfirmed) {
            itemary.splice(itemindex, 1);
            loadItemTable();
            clear();
            Swal.fire("Deleted!", "Item has been deleted!.", "success");
        }
    });
});

// Update Item
$("#itemupdate").on('click', function (event) {
    event.preventDefault();

    let id = $("#iid").val();
    let des = $("#iname").val();
    let qty = $("#iqty").val();
    let price = $("#iprice").val();

    if (!validIId(id)) {
        Swal.fire("Invalid Item ID", "", "warning");
    } else if (des.length === 0) {
        Swal.fire("Item Description cannot be empty", "", "warning");
    } else if (qty.length === 0) {
        Swal.fire("Item Quantity cannot be empty", "", "warning");
    } else if (price.length === 0) {
        Swal.fire("Unit Price cannot be empty", "", "warning");
    } else {
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            if (result.isConfirmed) {
                itemary[itemindex].id = id;
                itemary[itemindex].des = des;
                itemary[itemindex].qty = qty;
                itemary[itemindex].price = price;

                loadItemTable();
                clear();
                Swal.fire("Item Updated!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }
});

$('#itemTableBody').on("click", 'tr', function (event) {
    event.preventDefault();
    itemindex = $(this).index();

    $("#iid").val(itemary[itemindex].id);
    $("#iname").val(itemary[itemindex].des);
    $("#iqty").val(itemary[itemindex].qty);
    $("#iprice").val(itemary[itemindex].price);
});

$("#item").on("click", function (event) {
    event.preventDefault();
    loadItemTable();
});
