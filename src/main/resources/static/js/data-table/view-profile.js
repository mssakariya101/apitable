$(document).ready(function() {
    $('#postForm').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting via the browser

        var title = $('#title').val();
        var body = $('#body').val();
        var userId=$('#userId').text();
        var formData = {
            title: title,
            body: body,
            userId:userId
        };

        $.ajax({
            type: 'POST',
            url: '/posts/save',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(response) {
                $('#postModal').modal('hide');
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Post saved successfully'
                });
            },
            error: function(xhr, status, error) {
                // Handle error
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: xhr.responseText
                });
            }
        });
    });

    $('#todoForm').submit(function(event) {
            event.preventDefault(); // Prevent the form from submitting via the browser

            var title = $('#title').val();
            var userId=$('#userId').text();
            var formData = {
                title: title,
                userId:userId
            };

            $.ajax({
                type: 'POST',
                url: '/todos/save',
                data: JSON.stringify(formData),
                contentType: 'application/json',
                success: function(response) {
                    $('#todoModal').modal('hide');

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Todo saved successfully'
                    });
                },
                error: function(xhr, status, error) {
                    // Handle error
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: xhr.responseText
                    });
                }
            });
        });
});

function fetchComments(button) {
    var postId = $(button).data("post-id");
    $.ajax({
        url: "/posts/" + postId + "/comments",
        method: "GET",
        success: function(comments) {
            displayComments(comments);
        },
        error: function() {
            console.error('Error fetching comments.');
        }
    });
}

function displayComments(comments) {
        var commentsSection = $('#comments-section');
        commentsSection.empty();
        var ul = $('<ul class="list-group">');
        comments.forEach(function(comment) {
            var commentGroup = $('<div class="comment-group">');
            var liName = $('<li class="list-group-item">').css("border", "1px solid blue").html('<b>Name:</b> ' + comment.name);
            var liEmail = $('<li class="list-group-item">').css("border", "none").html('<b>Email:</b> ' + comment.email);
            var liBody = $('<li class="list-group-item">').css("border", "none").html('<b>Comment:</b> ' + comment.body);
            commentGroup.append(liName).append(liEmail).append(liBody);
            ul.append(commentGroup);
        });
        commentsSection.append(ul);
    }

    $('.update-todo').on('click', function() {
        var todoId = $(this).data('todo-id');
        var selectedStatus = $(this).closest('.row').find('.status-dropdown').val();
        var data = {
            id: todoId,
            completed: selectedStatus === 'true'
        };

        $.ajax({
            type: 'PUT',
            url: '/todos/update',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: "Update successfully"
                });
            },
            error: function(xhr, status, error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: xhr.responseText
                });
            }

    });
});
  $('.delete-todo').on('click', function() {
    var todoId = $(this).data('todo-id');

    $.ajax({
        type: 'POST',
        url: '/todos/delete/'+todoId,
        contentType: 'application/json',
        success: function(response) {
        Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: "Todo delete Successfully"
                });
            $(this).closest('.list-group-item').remove();
        },
        error: function(xhr, status, error) {
        }
    });
});
