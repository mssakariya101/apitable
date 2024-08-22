$(document).ready(function() {
    $('#loader').removeClass('d-none');
    $('#employeeTable').DataTable({

        "serverSide": true,
        "ajax": {
            "url": "/api/employee/list",
            "type": "GET",
            "data": function(d) {
                var order = d.order[0];
                var column = d.columns[order.column].data;
                var dir = order.dir;
                return $.extend({}, d, {
                    "search": d.search.value,
                    "start": d.start,
                    "length": d.length,
                    "page": (d.start / d.length) + 1,
                    "sortColumn": column,
                    "sortDirection": dir
                });
            },
            "dataSrc": function(json) {
                $('#loader').addClass('d-none');

                return json.data.records; // Path to the records array in your response
            }
        },
        "columns": [
             {
               data: null, // This column will not use any data source property
               render: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
               },
               orderable: false,  // Disable sorting on this column
               searchable: false  // Disable searching on this column
            },
            { data: "fields.fullName" },
            { data: "fields.workEmail" },
            { data: "fields.phoneNumber" },
            { data: "fields.companyName" },

            {
              data: "fields.projects",
                render: function(data) {
                    return '<a project-ids="' + data + '" class="view-projects btn btn-primary btn-sm mb-3" >View Projects</a>';
                }
            },
            {
              data: "recordId",
                "render": function(data) {
                    return `
                        <a href="/api/employee/edit-form/${data}" id="btn-edit" class="btn btn-primary btn-sm mb-3">
                            <i class="fas fa-edit"></i>
                        </a>
                        <a href="/api/employee/delete/${data}" class="btn btn-danger btn-delete btn-sm mb-3">
                            <i class="fas fa-trash"></i>
                        </a>
                        `;
                }
            }
        ],
        "order": [[1, 'asc']] // Optional: Set the default sorting order
    });
});



$(document).on('click', '.view-projects', function() {
    var projectIds = $(this).attr('project-ids');
    $('#loader').removeClass('d-none');

    // Clear any existing rows in the table
    $('#projectTableBody').empty();

    $.ajax({
        url: '/api/project/' + projectIds,  // Adjust this URL to match your backend API
        type: 'GET',
        success: function(response) {
            $('#loader').addClass('d-none');
           $('#projectModal').modal('show');


            // Iterate over each record in the response
            response.records.forEach(function(record) {
                var fields = record.fields;

                // Create a new row for each project
                var row = '<tr>' +
                    '<td>' + fields.title + '</td>' +
                    '<td>' + fields.description + '</td>' +
                    '</tr>';

                // Append the row to the table body
                $('#projectTableBody').append(row);
            });
        },
        error: function() {
            alert('Error retrieving project data.');
        }
    });
});

$('#excelButton').click(function() {
    downloadFile('xlsx');
});

$('#pdfButton').click(function() {
    downloadFile('pdf');
});

function downloadFile(filetype){
    var employees = [];
    document.querySelectorAll('#employeeTable tbody tr').forEach(function(row) {
        var employee = {
            fullName: row.cells[1].innerText,
            workEmail: row.cells[2].innerText,
            phoneNumber: row.cells[3].innerText,
            jobTitleOrDepartment: row.cells[3].innerText,
            companyName: row.cells[4].innerText
        };
        employees.push(employee);
    });

    fetch('/download/'+filetype+'/employee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employees)
    })
    .then(response => response.blob())
    .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'employee.'+filetype;
        document.body.appendChild(a);
        a.click();
        a.remove();
    })
    .catch(error => console.error('Error:', error));
}

