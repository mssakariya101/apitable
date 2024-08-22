$(document).ready(function() {
    $('#projectSelect').select2();

$.get("/api/project/all", function(response) {
    const records = response.records;
    $('#projectSelect').select2({
        placeholder: "Select options"
//                allowClear: true
    });
    records.forEach(function(record) {
        var newOption = new Option(record.fields.title,record.recordId, false, false);
        $('#projectSelect').append(newOption).trigger('change');
    });
});

// Initialize recordId from hidden input field
var recordId = $('#recordId').val();

// Function to populate the form fields with employee data
function populateFormFields(record) {
    var fields = record.fields;
    $('#recordId').val(record.recordId);
    $('#fullName').val(fields.fullName);
    $('#workEmail').val(fields.workEmail);
    $('#jobTitleOrDepartment').val(fields.jobTitleOrDepartment);
    $('#phoneNumber').val(fields.phoneNumber);
    $('#companySize').val(fields.companySize);
    $('#companyName').val(fields.companyName);
    $('#projectSelect').val(fields.projects);
}

// Function to handle AJAX errors
function handleError(message) {
    $('#loader').addClass('d-none');
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
    });
}
    // Fetch employee data if recordId is present
    if (recordId) {
        $('#loader').removeClass('d-none');
        $.ajax({
            url: '/api/employee/' + recordId,
            type: 'GET',
            success: function(response) {
                $('#loader').addClass('d-none');
                if (response && response.records && response.records.length > 0) {
                    populateFormFields(response.records[0]);
                } else {
                    handleError('No employee data found.');
                }
            },
            error: function() {
                handleError('Error retrieving employee data.');
            }
        });
    }

    // jQuery Validation
    $('#employeeForm').validate({
        rules: {
            fullName: {
                required: true,
                minlength: 2
            },
            workEmail: {
                required: true,
                email: true
            },
            jobTitleOrDepartment: {
                required: true,
                minlength: 2
            },
            phoneNumber: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 15
            },
            companySize: {
                required: true
            },
            companyName:{
                 required:true,
            },
             projectSelect: {
                required: true
            }
        },
        messages: {
            fullName: "Please enter at least 2 characters for the full name",
            workEmail: "Please enter a valid email address",
            jobTitleOrDepartment: "Please enter at least 2 characters for the job title",
            phoneNumber: {
                required: "Please enter a phone number",
                digits: "Please enter only digits",
                minlength: "Phone number should be at least 10 digits",
                maxlength: "Phone number should not exceed 15 digits"
            },
            companySize: "Please enter company size",
            companyName:"Please enter company name",
            projectSelect: {
                required: "Please select at least one project"
            }
        },
        submitHandler: function(form) {
            // AJAX submission
        var employeeData = {
                records: [{
                    fields: {
                        fullName: $('#fullName').val(),
                        workEmail: $('#workEmail').val(),
                        jobTitleOrDepartment: $('#jobTitleOrDepartment').val(),
                        phoneNumber: $('#phoneNumber').val(),
                        companySize: $('#companySize').val(),
                        companyName: $('#companyName').val(),
                        projects: $('#projectSelect').val()
                    }
                }]
            };

            if (recordId) {
                employeeData.records[0].recordId = recordId;
            }

            var ajaxUrl = recordId ? '/api/employee/update'  : '/api/employee/save';
            var method = recordId ? 'PUT' : 'POST';

            $.ajax({
                url: ajaxUrl,
                type: method,
                contentType: 'application/json',
                data: JSON.stringify(employeeData),
                success: function(response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: response.message
                    }).then(() => {
                        // Redirect to a different page or clear the form after success
                        window.location.href = '/api/employee/show'; // Adjust this URL as needed
                    });
                },
                error: function() {
                    handleError('Error saving employee data.');
                }
            });
            return false;
        }
    });
});
