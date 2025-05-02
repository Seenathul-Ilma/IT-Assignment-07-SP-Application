//////////////////// Item Related jQueries /////////////////////////////

// To store item details on an array / db
let item_db = [];

generateNextItemId();

// to load stored item details on the table
function loadItemsOnTable() {

    $('#item_tbody').empty();

    item_db.map((item, index) => {
        let name = item.name;
        let price = item.price;
        let qoh = item.qoh;

        let data = `<tr>
                      <td>${'I' + String(index + 1).padStart(3, '0')}</td>
                      <td>${name}</td>
                      <td>${price}</td>
                      <td>${qoh}</td>
                  </tr>`

        $('#item_tbody').append(data);
    });
}

// to generate item ids automatically
function generateNextItemId() {
    const nextItemId = 'I' + String(item_db.length + 1).padStart(3, '0');
    $('#nextItemId').val(nextItemId);
}

// When Save a new item
$('#item_save').on('click', function () {
    let id = $('#nextItemId').val();
    let name = $('#newItemName').val();
    let price = $('#newItemPrice').val();
    let qoh = $('#newItemQoh').val();

    if (name === '' || price === '' || qoh === '') {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Please enter valid inputs..!"
        });
    } else {
        let item_data = {
            id: id,
            name: name,
            price: price,
            qoh: qoh
        };

        item_db.push(item_data);
        console.log(item_db);

        loadItemsOnTable();

        Swal.fire({
            title: "Item Added successfully..!",
            icon: "success",
            draggable: true
        });
    }

    $('#newItemName').val("");
    $('#newItemPrice').val("");
    $('#newItemQoh').val("");

    generateNextItemId();
});

// to update item details
$('#item_update').on('click', function () {
    let id = $('#id').val();
    let name = $('#item_name').val();
    let price = $('#price').val();
    let qoh = $('#qoh').val();


    if (name === '' || price === '' || qoh === '') {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Please enter valid inputs..!"
        });
    } else if (selectedItemIndex !== -1) {

        item_db[selectedItemIndex] = {
            id: id,
            name: name,
            price: price,
            qoh: qoh
        };

        loadItemsOnTable();

        console.log(item_db);

        Swal.fire({
            title: "Item updated successfully..!",
            icon: "success",
            draggable: true
        });

        $('#id').val("");
        $('#item_name').val("");
        $('#price').val("");
        $('#qoh').val("");

        // Reset form and index
        $('#item_form_fieldset').prop('disabled', true);
        $('#item_reset').click();
        selectedItemIndex = -1;

    } else {
        Swal.fire({
            icon: "warning",
            title: "No item selected!",
            text: "Please select an item to update."
        });
    }
});

// Reset the form
$('#item_reset').on('click', function () {
    $('#id').val("");
    $('#item_name').val("");
    $('#price').val("");
    $('#qoh').val("");
});

$('#item_delete').on('click', function () {
    if (selectedItemIndex !== -1) {
        // selected index and range (ensure only selected item deleting)
        item_db.splice(selectedItemIndex, 1);
        loadItemsOnTable();

        Swal.fire({
            title: "Deleted!",
            text: "Item has been deleted successfully.",
            icon: "success"
        });

        // reset form
        $('#item_form_fieldset').prop('disabled', true);
        $('#item_reset').click();
        selectedItemIndex = -1;
    }
});


// select an item by click on a table row
$('#item_tbody').on('click', 'tr', function () {
    //const index = $(this).index();
    //const selectedItem = item_db[index];
    selectedItemIndex = $(this).index();
    const selectedItem = item_db[selectedItemIndex];

    // to fill the form with selected customer's data
    $('#id').val(selectedItem.id);
    $('#item_name').val(selectedItem.name);
    $('#price').val(selectedItem.price);
    $('#qoh').val(selectedItem.qoh);

    $('#item_form_fieldset').prop('disabled', false);
});

// to search items by a data
$(document).ready(function () {
    function filterItems() {
        var value = $(this).val().toLowerCase();
        $("#item_tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    }

    // to filter items at live (while typing)
    $("#search_item_input").on("keyup", filterItems);

    // to filter items after click search btn
    $('#search_item_btn').on('click', function (e) {
        e.preventDefault();
        filterItems();
    });
});


//////////////////// Customer Related jQueries /////////////////////////////

    // To store customer details on an array / db
    let customer_db = [];

    generateNextCustomerId();

    // to load stored customer details on the table
    function loadCustomersOnTable() {

    $('#customer_tbody').empty();

    customer_db.map((item, index) => {
    let name = item.name;
    let phone = item.phone;
    let address = item.address;

    let data = `<tr>
                      <td>${'C' + String(index + 1).padStart(3, '0')}</td>
                      <td>${name}</td>
                      <td>${phone}</td>
                      <td>${address}</td>
                  </tr>`

    $('#customer_tbody').append(data);
});
}

    // to generate customer ids automatically
    function generateNextCustomerId() {
    const nextId = 'C' + String(customer_db.length + 1).padStart(3, '0');
    $('#nextId').val(nextId);
}

    // When Save a new Customer
    $('#customer_save').on('click', function () {
    let id = $('#nextId').val();
    let name = $('#newName').val();
    let phone = $('#newPhone').val();
    let address = $('#newAddress').val();

    // console.log(`fname: ${fname}, lname: ${lname}, address: ${address}`);

    if(name === '' || phone === '' || address === '') {
    Swal.fire({
    icon: "error",
    title: "Error!",
    text: "Please enter valid inputs..!"
});
} else {
    let customer_data = {
    id: id,
    name: name,
    phone: phone,
    address: address
};

    customer_db.push(customer_data);
    console.log(customer_db);

    loadCustomersOnTable();


    Swal.fire({
    title: "Customer Added successfully..!",
    icon: "success",
    draggable: true
});
}

    $('#newName').val("");
    $('#newAddress').val("");
    $('#newPhone').val("");

    generateNextCustomerId();
});

    // to update customer details
    $('#customer_update').on('click', function () {
    let id = $('#customer_id').val();
    let name = $('#name').val();
    let phone = $('#phone').val();
    let address = $('#address').val();


    if (name === '' || phone === '' || address === '') {
    Swal.fire({
    icon: "error",
    title: "Error!",
    text: "Please enter valid inputs..!"
});
} else if (selectedCustomerIndex !== -1) {

    customer_db[selectedCustomerIndex] = {
    id: id,
    name: name,
    phone: phone,
    address: address
};

    loadCustomersOnTable();

    console.log(customer_db);

    Swal.fire({
    title: "Customer updated successfully..!",
    icon: "success",
    draggable: true
});

    $('#customer_id').val("");
    $('#name').val("");
    $('#address').val("");
    $('#phone').val("");

    // Reset form and index
    $('#customer_form_fieldset').prop('disabled', true);
    $('#customer_reset').click();
    selectedCustomerIndex = -1;

} else {
    Swal.fire({
    icon: "warning",
    title: "No customer selected!",
    text: "Please select a customer to update."
});
}
});

    // Reset the form
    $('#customer_reset').on('click', function () {
    $('#customer_id').val("");
    $('#name').val("");
    $('#address').val("");
    $('#phone').val("");
});

    $('#customer_delete').on('click', function () {
    if (selectedCustomerIndex !== -1) {
    // selected index and range (ensure only that customer deleting)
    customer_db.splice(selectedCustomerIndex, 1);
    loadCustomersOnTable();

    Swal.fire({
    title: "Deleted!",
    text: "Customer has been deleted successfully.",
    icon: "success"
});

    // reset form
    $('#customer_form_fieldset').prop('disabled', true);
    $('#customer_reset').click();
    selectedCustomerIndex = -1;
}
});

    // select a customer by click on a table row
    $('#customer_tbody').on('click', 'tr', function () {
    //const index = $(this).index();
    //const selectedCustomer = customer_db[index];
    selectedCustomerIndex = $(this).index();
    const selectedCustomer = customer_db[selectedCustomerIndex];

    // to fill the form with selected customer's data
    $('#customer_id').val(selectedCustomer.id);
    $('#name').val(selectedCustomer.name);
    $('#phone').val(selectedCustomer.phone);
    $('#address').val(selectedCustomer.address);

    $('#customer_form_fieldset').prop('disabled', false);
});

    // to search customer by a data
    $(document).ready(function(){
    function filterCustomers() {
        var value = $(this).val().toLowerCase();
        $("#customer_tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    }

    // to filter customer at live (while typing)
    $("#search_input").on("keyup", filterCustomers);

    // to filter customer after click search btn
    $('#search_btn').on('click', function (e) {
    e.preventDefault();
    filterCustomers();
});
});
