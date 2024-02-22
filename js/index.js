$(document).on('submit', '#myForm', function (event) {
    event.preventDefault()
});
var tableSection = $(".table--section").hide();
var loader= $(".loaderIcon").hide();
// reset the form field on click on modal close button
const closeButton = document.querySelectorAll("#exampleModal .close-button,.cross-button"); 
//event listener to the close button/icon:
closeButton[0].addEventListener("click", resetForm);
closeButton[1].addEventListener("click", resetForm);
//hide the table on page load and show the table on the click the option in dropdown

userTable();
function userTable() {
    $(".dropdown--menu-link").on('click', function () {
        $(loader).show();
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/users",
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                // Store the response data in an object
                const responseData = {
                    success: true, // Flag for successful response
                    data: response // Actual data from the server
                };
                appendData(response);
                console.log('Successfully retrieved data:', responseData);
            },
            complete: function(){
                $(loader).hide();
            },
            error: function (error) {
                // Handle any errors during the request
                console.error('Error:', error);
            }
        });
        
    });
}

function appendData(response) {
    var tableData = "";
    var tableRow = "";
    tableBody = $(".table--section-body");
    tableBody.empty();
    response.forEach(obj => {
        tableRow = '<tr><td>'+ obj.id +'</td><td>'+ obj.name +'</td><td>'+ obj.username +'</td><td>'+ obj.email +'</td><td>'+ obj.phone +'</td><td>'+ obj.address.city +'</td></tr>';
        
        tableData = tableData + tableRow;
    });
    tableBody.html(tableData);
    $(tableSection).show();
    location.href = "#userService";
}

// Validates the form input field on submit and on blur 
function validateForm() {
    var firstname = $("#firstName").val();
    var lastname = $("#lastName").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var address = $("#address").val();
    var validationErrorExists = false;

    var myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {});
    
    validationErrorExists = validateFirstName();
    validationErrorExists = validateLastName();
    validationErrorExists = validateEmailAddress();
    validationErrorExists = validatePhone();
    validationErrorExists = validateAddress();
    makeAjaxCall(validationErrorExists, firstname, lastname, email, phone, address, myModal);
    return;

}

function validateFirstName() {
    var firstname = $("#firstName").val();
    var validationErrorExists = false;
    var nameRegex = /^[a-zA-Z\s]+$/;
    if (firstname == '') {
        validationErrorExists = true;
        $('#firstNameError').text("First Name cannot be empty");
    }
    else if (firstname) {
        if (!firstname.match(nameRegex)) {
            validationErrorExists = true;
            $('#firstNameError').text("Enter alphabets only");
        } else {
            $('#firstNameError').text("");
        }
    }
    return validationErrorExists;
}

function validateLastName() {
    var lastname = $("#lastName").val();
    var validationErrorExists = false;
    var nameRegex = /^[a-zA-Z\s]+$/;
    if (lastname == '') {
        validationErrorExists = true;
        $('#lastNameError').text("Last Name cannot be empty");
    }
    else if (lastname) {
        if (!lastname.match(nameRegex)) {
            validationErrorExists = true;
            $('#lastNameError').text("Enter alphabets only");
        } else {
            $('#lastNameError').text("");
        }
    }
    return validationErrorExists;
}

function validateEmailAddress() {
    var email = $("#email").val();
    var validationErrorExists = false;
    var emailRegex = /\S+@\S+\.\S+/;
    if (email == '') {
        validationErrorExists = true;
        $('#emailError').text("Email cannot be empty");
    }
    else if (email) {
        if (!email.match(emailRegex)) {
            validationErrorExists = true;
            $('#emailError').text("Enter Valid Email ID");
        } else {
            $('#emailError').text("");
        }
    }
    return validationErrorExists;
}

function validatePhone() {
    var phone = $("#phone").val();
    var validationErrorExists = false;
    var phoneRegex = /^\d{10}$/;
    if (phone == '') {
        validationErrorExists = true;
        $('#phoneError').text("Phone number cannot be empty");
    }
    else if (phone) {
        if (!phone.match(phoneRegex)) {
            validationErrorExists = true;
            $('#phoneError').text("Enter Valid Phone number");
        } else {
            $('#phoneError').text("");
        }
    }
    return validationErrorExists;
}

function validateAddress() {
    var address = $("#address").val();
    var validationErrorExists = false;
    if (address == '') {
        validationErrorExists = true;
        $('#addressError').text("Address cannot be empty");
    }
    else if (address) {
        $('#addressError').text("");
    }
    return validationErrorExists;
}

// Render the data in modal body from form input field
function populateModal(formData) {
    var modalBody = $('.modal-body');
    modalBody.empty();
    var div1 = document.createElement('div');
    $(div1).addClass("table-responsive");
    var tb1 = document.createElement('table');
    $(tb1).addClass("table table-bordered border-dark table-light table-striped table-hover");
    var tBody = document.createElement('tbody');
    $(tBody).addClass("table-group-divider table--section-body");
    Object.keys(formData).forEach(element => {
        var tr1 = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        td1.innerText = element;
        td2.innerText = formData[element];
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tBody.appendChild(tr1);

    });
    tb1.appendChild(tBody);
    div1.appendChild(tb1);
    modalBody[0].appendChild(div1);
}

function resetForm() {
  const form = document.getElementById("myForm");
  form.reset();
}

function makeAjaxCall(validationErrorExists, firstname, lastname, email, phone, address, myModal) {
    if (!validationErrorExists) {

        let formData = {
            "First Name": firstname,
            "Last Name": lastname,
            "Email": email,
            "Phone": phone,
            "Address": address
        };

        populateModal(formData);
        myModal.show();

    } else {
    }
}







