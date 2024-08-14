$(document).ready(function() {
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
        $('#prefill').val(fields.prefill);
        $('#stage').val(fields.stage);
        $('#visitRecords').val(fields.visitRecords.join(', '));
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
            url: '/api/employee/fetch/' + recordId,
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

    // Handle form submission for saving or updating employee data
    $('#employeeForm').submit(function(event) {
        event.preventDefault();

        var employeeData = {
            records: [{
                fields: {
                    fullName: $('#fullName').val(),
                    workEmail: $('#workEmail').val(),
                    jobTitleOrDepartment: $('#jobTitleOrDepartment').val(),
                    phoneNumber: $('#phoneNumber').val(),
                    companySize: $('#companySize').val(),
                    prefill: $('#prefill').val(),
                    stage: $('#stage').val()
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
    });
});
