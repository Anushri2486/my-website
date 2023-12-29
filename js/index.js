$(document).on('submit', '#myForm', function (event) {
    event.preventDefault()
});

// reset the form field on click on modal close button
const closeButton = document.querySelectorAll("#exampleModal .close-button,.cross-button"); 
//event listener to the close button/icon:
closeButton[0].addEventListener("click", resetForm);
closeButton[1].addEventListener("click", resetForm);
//hide the table on page load and show the table on the click the option in dropdown
$(".table--section").hide();
userTable();

function userTable() {
    $(".dropdown--menu-link").on('click', function () {
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
            error: function (error) {
                // Handle any errors during the request
                console.error('Error:', error);
            },
        });
        
    });
}

function appendData(response) {
    let tableBody = document.getElementById('tableData');
    tb1 = $(".table--section-body");
    tb1.empty();
    response.forEach(obj => {
        let tableRow = document.createElement('tr');
        
        let idCell = document.createElement('td');
        idCell.textContent = obj.id;

        let nameCell = document.createElement('td');
        nameCell.textContent = obj.name;

        let usernameCell = document.createElement('td');
        usernameCell.textContent = obj.username;

        let emailCell = document.createElement('td');
        emailCell.textContent = obj.email;

        let phoneCell = document.createElement('td');
        phoneCell.textContent = obj.phone;

        let addressCell = document.createElement('td');
        addressCell.textContent = obj.address.city;


        tableRow.appendChild(idCell);
        tableRow.appendChild(nameCell);
        tableRow.appendChild(usernameCell);
        tableRow.appendChild(emailCell);
        tableRow.appendChild(phoneCell);
        tableRow.appendChild(addressCell);
        tableBody.appendChild(tableRow);
    });
    $(".table--section").show();
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
        document.getElementById('firstNameError').innerHTML = "First Name cannot be empty";
    }
    else if (firstname) {
        if (!firstname.match(nameRegex)) {
            validationErrorExists = true;
            document.getElementById('firstNameError').innerHTML = "Enter alphabets only";
        } else {
            document.getElementById('firstNameError').innerHTML = "";
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
        document.getElementById('lastNameError').innerHTML = "Last Name cannot be empty";
    }
    else if (lastname) {
        if (!lastname.match(nameRegex)) {
            validationErrorExists = true;
            document.getElementById('lastNameError').innerHTML = "Enter alphabets only";
        } else {
            document.getElementById('lastNameError').innerHTML = "";
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
        document.getElementById('emailError').innerHTML = "Email cannot be empty";
    }
    else if (email) {
        if (!email.match(emailRegex)) {
            validationErrorExists = true;
            document.getElementById('emailError').innerHTML = "Enter Valid Email Id";
        } else {
            document.getElementById('emailError').innerHTML = "";
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
        document.getElementById('phoneError').innerHTML = "Phone number cannot be empty";
    }
    else if (phone) {
        if (!phone.match(phoneRegex)) {
            validationErrorExists = true;
            document.getElementById('phoneError').innerHTML = "Enter Valid Phone number";
        } else {
            document.getElementById('phoneError').innerHTML = "";
        }
    }
    return validationErrorExists;
}

function validateAddress() {
    var address = $("#address").val();
    var validationErrorExists = false;
    if (address == '') {
        validationErrorExists = true;
        document.getElementById('addressError').innerHTML = "Address cannot be empty";
    }
    else if (address) {
        document.getElementById('addressError').innerHTML = "";
    }
    return validationErrorExists;
}

// Render the data in modal body from form input field
function populateModal(formData) {
    var modalBody = $('.modal-body');
    modalBody.empty();
    var tb1 = document.createElement('table');
    Object.keys(formData).forEach(element => {
        var tr1 = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        td1.innerText = element;
        td2.innerText = formData[element];
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tb1.appendChild(tr1);

    });
    modalBody[0].appendChild(tb1);
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







