$(document).ready(function() {
    $('.delete-restaurant').on('click', function() {
        console.log($(this).data('id'));

        $.ajax({
            url: "/admin/delete/" + $(this).data('id'),
            type: "DELETE",
            success: function() {
                console.log("success");
            },
            error: function() {
                console.log("failed");
            }
        })
    })
})