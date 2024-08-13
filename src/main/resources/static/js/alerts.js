$(document).on('click', '.btn-delete', function (e) {
    e.preventDefault();
    var url = $(this).attr('href');
//    var csrfToken = $('meta[name="_csrf"]').attr('content');
//    var csrfHeader = $('meta[name="_csrf_header"]').attr('content');

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url,
                type: 'DELETE',
//                 beforeSend: function (xhr) {
//                    xhr.setRequestHeader(csrfHeader, csrfToken);
//                 },
                success: function (response) {
                    Swal.fire({
                        title: response.success ? 'Success' : 'Error',
                        text: response.message,
                        icon: response.success ? 'success' : 'error',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        location.reload();
                    });
                },
                error: function (xhr, status, error) {
                    var response = JSON.parse(xhr.responseText);
                    var errorMessage = response.message || 'An unexpected error occurred.';

                    Swal.fire({
                        title: 'Error',
                        text: errorMessage,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            });
        }
    });
});