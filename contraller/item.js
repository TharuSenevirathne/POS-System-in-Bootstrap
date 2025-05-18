import ItemModel from '../models/ItemModel.js';
import {customerary,itemary} from "../db/db.js";

let itemindex;

const loadItemTable = () => {
    $("#itemTableBody").empty();

    itemary.map((item) => {
        let data = `<tr>
            <td>${item.id}</td>
            <td>${item.des}</td>
            <td>${item.qty}</td>
            <td>${item.price}</td>
        </tr>`

        $("#itemTableBody").append(data);
    });
};

function clear() {
    $("#iid").val('');
    $("#iname").val('');
    $("#iqty").val('');
    $("#iprice").val('');
}

// Save Item
$("#itemsave").on('click', function(event) {
    event.preventDefault();

    let id = $("#iid").val();
    let des = $("#iname").val();
    let qty = $("#iqty").val();
    let price = $("#iprice").val();

    if (!validIId(id)) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "invalid Item ID",
            showConfirmButton: false,
            timer: 1500
        });
    } else if(des.length === 0) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Item Description cannot be empty",
            showConfirmButton: false,
            timer: 1500
        });
    } else if(qty.length === 0) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Item Quantity cannot be empty",
            showConfirmButton: false,
            timer: 1500
        });
    } else if(price.length === 0) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Item Price cannot be empty",
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        let itemModel = new ItemModel(id, des , qty,price);
        itemary.push(itemModel);

        loadItemTable();
        clear();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Item saved successfully",
            showConfirmButton: false,
            timer: 1500
        });
    }


});

const validIId = (iid) => {
    const iidregex = /^I\d+$/;
    return iidregex.test(iid);
}

$("#item").on("click", function (event) {
    event.preventDefault();
    loadItemTable();
});

// Search Item
$("#itemsearch").on('click', function(event) {
    event.preventDefault();

    let id = $("#iid").val();

    for (let i = 0; i < itemary.length; i++) {
        if (itemary[i].id === id) {
            itemindex = i;
            $("#iname").val(itemary[i].des);
            $("#iqty").val(itemary[i].qty);
            $("#iprice").val(itemary[i].price);
        } else{
            alert("Item not found.");
        }
    }

});

// Delete Item
$("#itemdelete").on('click', function(event) {
    event.preventDefault();


    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            itemary.splice(itemary[itemindex] , 1);
            loadItemTable();
            clear();
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });


});

// Update Item
$("#itemupdate").on('click', function(event) {
    event.preventDefault();

    let id = $("#iid").val();
    let des = $("#iname").val();
    let qty = $("#iqty").val();
    let price = $("#iprice").val();

    if (!validIId(id)) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "invalid Item ID",
            showConfirmButton: false,
            timer: 1500
        });
    } else if(des.length === 0) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Item Description cannot be empty",
            showConfirmButton: false,
            timer: 1500
        });
    } else if(qty > 0) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Item Quantity cannot be empty",
            showConfirmButton: false,
            timer: 1500
        });
    } else if(price > 0) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Item Price cannot be empty",
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                itemary[itemindex].id = id
                itemary[itemindex].des = des;
                itemary[itemindex].qty = qty;
                itemary[itemindex].price = price;

                loadItemTable();
                clear();
                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

});

$('#itemTableBody').on("click" ,'tr', function (event) {
    event.preventDefault();
    itemindex = $(this).index();

    $("#iid").val(itemary[itemindex].id);
    $("#iname").val(itemary[itemindex].des);
    $("#iqty").val(itemary[itemindex].qty);
    $("#iprice").val(itemary[itemindex].price);
});
