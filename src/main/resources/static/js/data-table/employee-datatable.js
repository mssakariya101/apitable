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
                    "sortDir": dir
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
            {
              data: "fields.projects",
                render: function(data) {
                    return '<a project-ids="' + data + '" class="view-projects btn btn-primary btn-sm mb-3" data-toggle="modal" data-target="#projectModal">View Projects</a>';
                }
            },
            {
              data: "recordId",
                "render": function(data) {
                    return `
                        <a href="/api/employee/${data}" class="btn btn-info btn-sm mb-3">
                            <i class="fa fa-eye"></i>
                        </a>
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
        "order": [[0, 'asc']] // Optional: Set the default sorting order
    });
});


$('#excelButton').click(function() {
    downloadFile('xlsx');
});

$('#pdfButton').click(function() {
    downloadFile('pdf');
});

 $(document).on('click', '.view-projects', function() {
        var projectIds = $(this).attr('project-ids');
        console.log(projectIds);
        // Clear any existing rows in the table
        $('#projectTableBody').empty();

            $.ajax({
                url: '/api/project/' + projectIds,  // Adjust this URL to match your backend API
                type: 'GET',
                success: function(response) {

                    // Assuming response contains the project details
                    var row = '<tr>' +
                        '<td>' + response.records.title + '</td>' +
                        '<td>' + response.records.description + '</td>' +
                        '</tr>';
                    $('#projectTableBody').append(row);
                },
                error: function() {
                    alert('Error retrieving project data.');
                }
            });

    });

function downloadFile(filetype){
    var users = [];
    document.querySelectorAll('#dataTable tbody tr').forEach(function(row) {
        var user = {
            id: row.cells[0].innerText,
            name: row.cells[1].innerText,
            username: row.cells[2].innerText,
            email: row.cells[3].innerText,
            phone: row.cells[4].innerText,
            website: row.cells[5].innerText
        };
        users.push(user);
    });

    fetch('/users/download/'+filetype, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(users)
    })
    .then(response => response.blob())
    .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'users.'+filetype;
        document.body.appendChild(a);
        a.click();
        a.remove();
    })
    .catch(error => console.error('Error:', error));
}

