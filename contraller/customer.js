import CustomerModel from '../models/CustomerModel.js';
import {customerary} from "../db/db.js";
let csindex;

const loadCustomerTable = () => {
    $("#customerTableBody").empty();

    customerary.map((item) => {
        let data = `<tr>
            <td>${item.cid}</td>
            <td>${item.cname}</td>
            <td>${item.caddress}</td>
            <td>${item.csalary}</td>
        </tr>`;
        $("#customerTableBody").append(data);
    });
};

function clearcustomer(){
    $("#id").val('');
    $("#name").val('');
    $("#address").val('');
    $("#salary").val('');
}

$("#customersave").on("click", function (event) {
    event.preventDefault();

    let cid = $("#id").val();
    let cname = $("#name").val();
    let caddress = $("#address").val();
    let csalary = $("#salary").val();

    if (!validCId(cid)){
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "invalid Customer ID",
            showConfirmButton: false,
            timer: 1500
        });
    }else if(!cname.length > 0){
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "invalid Name",
            showConfirmButton: false,
            timer: 1500
        });
    }else if(!caddress.length > 0){
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "invalid Address",
            showConfirmButton: false,
            timer: 1500
        });
    }else if(!csalary.length > 0){
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "invalid Phone No",
            showConfirmButton: false,
            timer: 1500
        });
    }else{
        let cus = new CustomerModel(
            cid,
            cname,
            caddress,
            csalary
        );
        customerary.push(cus);
        loadCustomerTable();
        clearcustomer();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
        });

    }

});

const vallidnumber = (number) => {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(number);
}
const validCId = (cid) => {
    const cidregex = /^C\d+$/;
    return cidregex.test(cid);
}

$("#customerupdate").on("click", function (event) {
    event.preventDefault();
    let cid = $("#id").val();
    let cname = $("#name").val();
    let caddress = $("#address").val();
    let csalary = $("#salary").val();


    if (!validCId(cid)){
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "invalid Customer ID",
            showConfirmButton: false,
            timer: 1500
        });
    }else if(!cname.length > 0){
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "invalid Name",
            showConfirmButton: false,
            timer: 1500
        });
    }else if(!caddress.length > 0){
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "invalid Address",
            showConfirmButton: false,
            timer: 1500
        });
    }else if(!vallidnumber(csalary)){
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "invalid Phone No",
            showConfirmButton: false,
            timer: 1500
        });
    }else{

        Swal.fire({
            title: "Do you want to save the changes ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            if (result.isConfirmed) {
                customerary[csindex].cid = cid
                customerary[csindex].cname = cname;
                customerary[csindex].caddress = caddress;
                customerary[csindex].csalary = csalary;

                loadCustomerTable();
                clearcustomer();
                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

});

$("#customersearch").on("click", function (event) {
    event.preventDefault();
    let cid = $("#id").val();

    for (let i = 0; i < customerary.length; i++) {
        if (customerary[i].cid === cid){
            csindex = i;
            console.log(customerary[i]);
            $("#name").val(customerary[i].cname);
            $("#address").val(customerary[i].caddress);
            $("#salary").val(customerary[i].csalary);
        }
    }
});

$("#customerdelete").on("click", function (event) {
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
            customerary.splice(customerary[csindex] , 1);
            loadCustomerTable();
            clearcustomer();
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
});

$('#customerTableBody').on("click" ,'tr', function (event) {
    event.preventDefault();
    console.log("click")
    let index = $(this).index();
    csindex = $(this).index();

    console.log(csindex)

    $("#id").val(customerary[index].cid);
    $("#name").val(customerary[index].cname);
    $("#address").val(customerary[index].caddress);
    $("#salary").val(customerary[index].csalary);
});
